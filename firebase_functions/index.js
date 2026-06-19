const { onSchedule } = require("firebase-functions/v2/scheduler");
const admin = require("firebase-admin");

admin.initializeApp();

/**
 * 🔄 ROTACIÓN AUTOMÁTICA PROFESIONAL - RutaGo
 *
 * EJECUCIÓN: Todos los días a las 7:00 PM (Hora Bogotá).
 * PROPÓSITO:
 * 1. Rotar los turnos de los conductores para el día siguiente.
 * 2. Limpiar la disponibilidad de asientos (resetear a 13).
 * 3. Actualizar estados de actividad (Active/Inactive) según carga.
 * 4. Notificar a conductores y pasajeros sobre los nuevos horarios.
 */
exports.automatedRotation = onSchedule({
    schedule: "0 19 * * *", // 19:00 = 7:00 PM Bogotá
    timeZone: "America/Bogota",
    memory: "256MiB"
}, async (event) => {
    const db = admin.database();
    const messaging = admin.messaging();

    try {
        console.log("🔄 Iniciando ciclo de rotación nocturna...");

        // 1. DEFINICIÓN DE ESCALAFÓN (Día 9 es descanso)
        const ROTATING_SHIFTS = [
            ["h009"],                 // Día 1: ENTRADA
            ["h010", "h008", "h018"], // Día 2
            ["h007", "h017"],         // Día 3
            ["h006", "h016"],         // Día 4
            ["h004", "h014"],         // Día 5
            ["h003", "h013"],         // Día 6
            ["h002", "h012"],         // Día 7
            ["h001", "h011"],         // Día 8
            []                        // Día 9: DESCANSO
        ];

        // 2. CARGA DE DATOS (Sync Total)
        const [conductoresSnap, horariosSnap, usuariosSnap] = await Promise.all([
            db.ref('conductores').once('value'),
            db.ref('horarios').once('value'),
            db.ref('usuarios').once('value')
        ]);

        const tokenMap = {};
        usuariosSnap.forEach(uSnap => {
            if (uSnap.val().tokenFCM) tokenMap[uSnap.key] = uSnap.val().tokenFCM;
        });

        const conductoresParaRotar = [];
        const tokensPasajeros = [];
        let brayanId = null;

        // Clasificar conductores y capturar tokens
        conductoresSnap.forEach((snap) => {
            const data = snap.val();
            const uid = snap.key;
            const token = data.tokenFCM || tokenMap[uid]; // Buscar en ambos nodos

            if (data.nombre && data.nombre.toLowerCase().includes("brayan")) {
                brayanId = uid;
            } else {
                conductoresParaRotar.push({ id: uid, nombre: data.nombre, token: token });
            }
        });

        // Recopilar tokens de pasajeros
        usuariosSnap.forEach((uSnap) => {
            const uData = uSnap.val();
            if (uData.rol === "usuario" && uData.tokenFCM) {
                tokensPasajeros.push(uData.tokenFCM);
            }
        });

        conductoresParaRotar.sort((a, b) => a.id.localeCompare(b.id));

        const updates = {};
        const dayCounter = Math.floor(Date.now() / (24 * 60 * 60 * 1000));
        const notificationPromises = [];

        // 3. ASIGNACIÓN FIJA (REGLA BRAYAN)
        if (brayanId) {
            const horariosFijos = ["h005", "h015"];
            updates[`conductores/${brayanId}/horariosAsignados`] = horariosFijos;
            updates[`conductores/${brayanId}/status`] = "active";
            updates[`usuarios/${brayanId}/status`] = "active";
            horariosFijos.forEach(hId => { updates[`horarios/${hId}/conductorId`] = brayanId; });

            const bToken = tokenMap[brayanId];
            if (bToken) {
                notificationPromises.push(
                    messaging.send({
                        token: bToken,
                        notification: { title: "Turnos Actualizados", body: "Tus turnos fijos están listos para mañana." },
                        data: { type: "ROTACION_NOTIFICACION", target_activity: "driver_home" }
                    }).catch(e => console.error("Error notif Brayan:", e))
                );
            }
        }

        // 4. ALGORITMO DE ESCALAFÓN Y NOTIFICACIÓN A CONDUCTORES
        conductoresParaRotar.forEach((c, index) => {
            const shiftIndex = (index + dayCounter) % ROTATING_SHIFTS.length;
            const misHorarios = ROTATING_SHIFTS[shiftIndex];
            const esDescanso = misHorarios.length === 0;

            updates[`conductores/${c.id}/horariosAsignados`] = misHorarios;
            updates[`conductores/${c.id}/status`] = esDescanso ? "inactive" : "active";
            updates[`usuarios/${c.id}/status`] = esDescanso ? "inactive" : "active";

            misHorarios.forEach(hId => { updates[`horarios/${hId}/conductorId`] = c.id; });

            if (c.token) {
                notificationPromises.push(
                    messaging.send({
                        token: c.token,
                        notification: {
                            title: esDescanso ? "Manana Descansas" : "Turnos Actualizados",
                            body: esDescanso ? `Hola ${c.nombre}, mañana descansas. ¡Disfrútalo!` : "Turnos listos para mañana. Revisa tus horarios en la app."
                        },
                        data: { type: "ROTACION_NOTIFICACION", target_activity: "driver_home" }
                    }).catch(e => console.error(`Error notif ${c.nombre}:`, e))
                );
            }
        });

        // 5. NOTIFICACIÓN MASIVA A PASAJEROS (Sin Emojis)
        if (tokensPasajeros.length > 0) {
            for (let i = 0; i < tokensPasajeros.length; i += 500) {
                const chunk = tokensPasajeros.slice(i, i + 500);
                notificationPromises.push(
                    messaging.sendEachForMulticast({
                        tokens: chunk,
                        notification: {
                            title: "Horarios Listos",
                            body: "Ya puedes reservar tu viaje para mañana en RutaGo. Asegura tu cupo."
                        },
                        data: { type: "HORARIOS_DISPONIBLES", target_activity: "passenger_home" }
                    }).catch(e => console.error("Error notif masiva pasajeros:", e))
                );
            }
        }

        // 6. LIMPIEZA DE ASIENTOS (RESET TOTAL)
        const dispUpdates = {};
        horariosSnap.forEach(hSnap => {
            const hId = hSnap.key;
            dispUpdates[`${hId}/asientosOcupados`] = null;
            dispUpdates[`${hId}/asientosDisponibles`] = 13;
            dispUpdates[`${hId}/totalAsientos`] = 13;
        });

        // 7. EJECUCIÓN ATÓMICA FINAL
        await Promise.all([
            db.ref().update(updates),
            db.ref('disponibilidadAsientos').update(dispUpdates),
            ...notificationPromises
        ]);

        console.log(`✅ Ciclo completado. ${tokensPasajeros.length} pasajeros y conductores procesados.`);

    } catch (error) {
        console.error('❌ ERROR CRÍTICO EN ROTACIÓN:', error);
    }
});

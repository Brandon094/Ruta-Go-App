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
 * 3. Notificar a conductores sobre su nuevo estado.
 * 4. Notificar a pasajeros que los horarios están listos.
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

        // 1. DEFINICIÓN DE BLOQUES DE TURNOS (Tus parejas correctas)
        // 1. EL CAMINO DEL CONDUCTOR (Escalafón Ascendente Real)
        const ROTATING_SHIFTS = [
            ["h009"],                 // Día 1: ENTRADA (5 PM). Duerme en La Plata.
            ["h010", "h008", "h018"], // Día 2: REGRESA (7:30 AM) + TURNO 3 PM.
            ["h007", "h017"],         // Día 3: TURNO 1 PM.
            ["h006", "h016"],         // Día 4: TURNO 11 AM.
            ["h004", "h014"],         // Día 5: TURNO 9:30 AM.
            ["h003", "h013"],         // Día 6: TURNO 8:30 AM.
            ["h002", "h012"],         // Día 7: TURNO 7:15 AM.
            ["h001", "h011"],         // Día 8: TURNO 6:15 AM (Último antes de descanso).
            []                        // Día 9: DESCANSO.
        ];

        // 2. CARGA DE DATOS DESDE REALTIME DATABASE
        const [conductoresSnap, horariosSnap, usuariosSnap] = await Promise.all([
            db.ref('conductores').once('value'),
            db.ref('horarios').once('value'),
            db.ref('usuarios').once('value')
        ]);

        const conductoresParaRotar = [];
        const tokensPasajeros = [];
        let brayanId = null;

        // Clasificar conductores
        conductoresSnap.forEach((snap) => {
            const data = snap.val();
            if (data.nombre && data.nombre.toLowerCase().includes("brayan")) {
                brayanId = snap.key;
            } else {
                conductoresParaRotar.push({
                    id: snap.key,
                    nombre: data.nombre,
                    token: data.tokenFCM
                });
            }
        });

        // Recopilar tokens de pasajeros para notificación masiva
        usuariosSnap.forEach((uSnap) => {
            const uData = uSnap.val();
            if (uData.rol === "usuario" && uData.tokenFCM) {
                tokensPasajeros.push(uData.tokenFCM);
            }
        });

        // Ordenar conductores por ID para asegurar consistencia
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
            horariosFijos.forEach(hId => {
                updates[`horarios/${hId}/conductorId`] = brayanId;
            });
        }

        // 4. ALGORITMO DE ESCALAFÓN Y NOTIFICACIÓN A CONDUCTORES
        conductoresParaRotar.forEach((c, index) => {
            const shiftIndex = (index + dayCounter) % ROTATING_SHIFTS.length;
            const misHorarios = ROTATING_SHIFTS[shiftIndex];
            const esDescanso = misHorarios.length === 0;

            updates[`conductores/${c.id}/horariosAsignados`] = misHorarios;
            updates[`conductores/${c.id}/status`] = esDescanso ? "inactive" : "active";
            updates[`usuarios/${c.id}/status`] = esDescanso ? "inactive" : "active";

            misHorarios.forEach(hId => {
                updates[`horarios/${hId}/conductorId`] = c.id;
            });

            if (c.token) {
                const esDescanso = misHorarios.length === 0;
                notificationPromises.push(
                    messaging.send({
                        token: c.token,
                        notification: {
                            title: esDescanso ? "😴 ¡Mañana Descansas!" : "🔄 Turnos Actualizados",
                            body: esDescanso ? `Hola ${c.nombre}, mañana descansas. ¡Disfrútalo!` : `✅ Turnos listos para mañana. Revisa tus horarios en la app.`
                        },
                        data: { type: "ROTACION_NOTIFICACION", click_action: "OPEN_DRIVER_PANEL" }
                    }).catch(e => console.error(`Error notif ${c.nombre}:`, e))
                );
            }
        });

        // 5. NOTIFICACIÓN MASIVA A PASAJEROS
        if (tokensPasajeros.length > 0) {
            for (let i = 0; i < tokensPasajeros.length; i += 500) {
                const chunk = tokensPasajeros.slice(i, i + 500);
                notificationPromises.push(
                    messaging.sendEachForMulticast({
                        tokens: chunk,
                        notification: {
                            title: "¡Horarios Listos! 🚗",
                            body: "Ya puedes reservar tu viaje para mañana en RutaGo. ¡Asegura tu cupo!"
                        },
                        data: { type: "HORARIOS_DISPONIBLES", click_action: "OPEN_PASSENGER_DASHBOARD" }
                    }).catch(e => console.error("❌ Error notif masiva pasajeros:", e))
                );
            }
        }

        // 6. LIMPIEZA DE ASIENTOS (RESET PARA MAÑANA)
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

        console.log(`✅ Ciclo completado. ${tokensPasajeros.length} pasajeros y conductores notificados.`);

    } catch (error) {
        console.error('❌ ERROR CRÍTICO EN ROTACIÓN:', error);
    }
});
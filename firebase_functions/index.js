const { onSchedule } = require("firebase-functions/v2/scheduler");
const admin = require("firebase-admin");

admin.initializeApp();

/**
 * 🔄 ROTACIÓN AUTOMÁTICA PROFESIONAL - Ecosistema Go
 *
 * EJECUCIÓN: Todos los días a las 7:00 PM (Hora Bogotá).
 */
exports.automatedRotation = onSchedule({
    schedule: "0 19 * * *",
    timeZone: "America/Bogota",
    memory: "256MiB"
}, async (event) => {
    const db = admin.database();
    const messaging = admin.messaging();

    try {
        console.log("🔄 Iniciando ciclo de rotación nocturna...");

        const ROTATING_SHIFTS = [
            ["h009"],                 // Día 1
            ["h010", "h008", "h018"], // Día 2
            ["h007", "h017"],         // Día 3
            ["h006", "h016"],         // Día 4
            ["h004", "h014"],         // Día 5
            ["h003", "h013"],         // Día 6
            ["h002", "h012"],         // Día 7
            ["h001", "h011"],         // Día 8
            []                        // Día 9: DESCANSO
        ];

        // 1. CARGA DE DATOS COMPLETA
        const [conductoresSnap, horariosSnap, usuariosSnap, vehiculosSnap] = await Promise.all([
            db.ref('conductores').once('value'),
            db.ref('horarios').once('value'),
            db.ref('usuarios').once('value'),
            db.ref('vehiculos').once('value')
        ]);

        const tokenMap = {};
        usuariosSnap.forEach(uSnap => {
            if (uSnap.val().tokenFCM) tokenMap[uSnap.key] = uSnap.val().tokenFCM;
        });

        const vehiculosMap = {};
        vehiculosSnap.forEach(vSnap => {
            vehiculosMap[vSnap.key] = vSnap.val();
        });

        const conductoresParaRotar = [];
        const tokensPasajeros = [];
        let brayanId = null;

        conductoresSnap.forEach((snap) => {
            const data = snap.val();
            const uid = snap.key;
            const token = data.tokenFCM || tokenMap[uid];
            if (data.nombre && data.nombre.toLowerCase().includes("brayan")) {
                brayanId = uid;
            } else {
                conductoresParaRotar.push({ id: uid, nombre: data.nombre, token: token, vehiculoId: data.vehiculoId });
            }
        });

        usuariosSnap.forEach((uSnap) => {
            const uData = uSnap.val();
            if (uData.rol === "usuario" && uData.tokenFCM) tokensPasajeros.push(uData.tokenFCM);
        });

        conductoresParaRotar.sort((a, b) => a.id.localeCompare(b.id));

        const updates = {};
        const dayCounter = Math.floor(Date.now() / (24 * 60 * 60 * 1000));
        const notificationPromises = [];
        const dispUpdates = {};

        // 2. ASIGNACIÓN FIJA (BRAYAN)
        if (brayanId) {
            const horariosFijos = ["h005", "h015"];
            updates[`conductores/${brayanId}/horariosAsignados`] = horariosFijos;
            updates[`conductores/${brayanId}/status`] = "active";
            horariosFijos.forEach(hId => { updates[`horarios/${hId}/conductorId`] = brayanId; });
        }

        // 3. ALGORITMO DE ESCALAFÓN Y RESET DE CAPACIDAD DINÁMICO
        conductoresParaRotar.forEach((c, index) => {
            const shiftIndex = (index + dayCounter) % ROTATING_SHIFTS.length;
            const misHorarios = ROTATING_SHIFTS[shiftIndex];
            const esDescanso = misHorarios.length === 0;

            updates[`conductores/${c.id}/horariosAsignados`] = misHorarios;
            updates[`conductores/${c.id}/status`] = esDescanso ? "inactive" : "active";

            // Obtener capacidad real del bus del conductor
            let capacidadReal = 13;
            if (c.vehiculoId && vehiculosMap[c.vehiculoId]) {
                capacidadReal = vehiculosMap[c.vehiculoId].capacidad || 13;
            }

            misHorarios.forEach(hId => {
                updates[`horarios/${hId}/conductorId`] = c.id;
                // Preparar reset de asientos basado en la capacidad real de este bus
                dispUpdates[`${hId}/asientosOcupados`] = null;
                dispUpdates[`${hId}/asientosDisponibles`] = capacidadReal;
                dispUpdates[`${hId}/totalAsientos`] = capacidadReal;
            });

            if (c.token) {
                notificationPromises.push(
                    messaging.send({
                        token: c.token,
                        notification: {
                            title: esDescanso ? "Mañana Descansas" : "Turnos Actualizados",
                            body: esDescanso ? `Hola ${c.nombre}, mañana descansas. ¡Disfrútalo!` : "Turnos listos para mañana. Revisa tus horarios en la app."
                        },
                        data: { type: "ROTACION_NOTIFICACION", target_activity: "driver_home" }
                    }).catch(e => console.error(`Error notif ${c.nombre}:`, e))
                );
            }
        });

        // 4. LIMPIEZA DE HORARIOS SIN CONDUCTOR (LIBRES)
        horariosSnap.forEach(hSnap => {
            const hId = hSnap.key;
            if (!dispUpdates[hId]) { // Si no fue reseteado arriba por un conductor asignado
                updates[`horarios/${hId}/conductorId`] = "";
                dispUpdates[`${hId}/asientosOcupados`] = null;
                dispUpdates[`${hId}/asientosDisponibles`] = 0;
                dispUpdates[`${hId}/totalAsientos`] = 0;
            }
        });

        // 5. NOTIFICACIÓN MASIVA PASAJEROS
        if (tokensPasajeros.length > 0) {
            for (let i = 0; i < tokensPasajeros.length; i += 500) {
                const chunk = tokensPasajeros.slice(i, i + 500);
                notificationPromises.push(
                    messaging.sendEachForMulticast({
                        tokens: chunk,
                        notification: { title: "Horarios Listos", body: "Ya puedes reservar tu viaje para mañana en RutaGo." },
                        data: { type: "HORARIOS_DISPONIBLES", target_activity: "passenger_home" }
                    }).catch(e => console.error("Error notif masiva:", e))
                );
            }
        }

        // EJECUCIÓN ATÓMICA
        await Promise.all([
            db.ref().update(updates),
            db.ref('disponibilidadAsientos').update(dispUpdates),
            ...notificationPromises
        ]);

        console.log(`✅ Ciclo completado exitosamente.`);

    } catch (error) {
        console.error('❌ ERROR CRÍTICO EN ROTACIÓN:', error);
    }
});

/**
 * 🧹 LIMPIEZA SEMANAL DE CUENTAS (Domingos 3:00 AM)
 */
exports.cleanupMarkedAccounts = onSchedule({
    schedule: "0 3 * * 0",
    timeZone: "America/Bogota",
    memory: "256MiB"
}, async (event) => {
    const db = admin.database();
    const auth = admin.auth();
    const now = Date.now();
    const GRACE_PERIOD = 30 * 24 * 60 * 60 * 1000;
    const limitTimestamp = now - GRACE_PERIOD;

    console.log("🧹 Iniciando limpieza de cuentas...");

    const performDeletion = async (uid, node) => {
        try {
            if (node === 'conductores') {
                const driverSnap = await db.ref(`conductores/${uid}`).once('value');
                const plate = driverSnap.val()?.placaVehiculo;
                if (plate) await db.ref(`vehiculos/${plate}`).remove();
            }
            await db.ref(`${node}/${uid}`).remove();
            await auth.deleteUser(uid);
            return `✅ ${uid} eliminado.`;
        } catch (e) {
            return `❌ Error en ${uid}: ${e.message}`;
        }
    };

    try {
        const [uSnap, cSnap] = await Promise.all([
            db.ref('usuarios').orderByChild('solicitudBorrado').equalTo(true).once('value'),
            db.ref('conductores').orderByChild('solicitudBorrado').equalTo(true).once('value')
        ]);

        const deletionPromises = [];
        uSnap.forEach(snap => {
            if (snap.val().fechaSolicitudBorrado <= limitTimestamp) deletionPromises.push(performDeletion(snap.key, 'usuarios'));
        });
        cSnap.forEach(snap => {
            if (snap.val().fechaSolicitudBorrado <= limitTimestamp) deletionPromises.push(performDeletion(snap.key, 'conductores'));
        });

        const results = await Promise.all(deletionPromises);
        console.log("Resumen de limpieza:", results);

    } catch (error) {
        console.error('❌ ERROR CRÍTICO EN LIMPIEZA:', error);
    }
});

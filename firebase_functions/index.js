const { onSchedule } = require("firebase-functions/v2/scheduler");
const admin = require("firebase-admin");

admin.initializeApp();

/**
 * 🔄 ROTACIÓN AUTOMÁTICA PROFESIONAL - Ecosistema Go
 *
 * EJECUCIÓN: Todos los días a las 7:00 PM (Hora Bogotá).
 * PROPÓSITO:
 * 1. Implementar el algoritmo de escalafón para conductores (Rotación de turnos).
 * 2. Resetear la disponibilidad técnica de asientos basada en la capacidad real de cada bus.
 * 3. Gestionar estados de actividad (Active/Inactive) para perfiles operativos.
 * 4. Despachar notificaciones Push masivas (FCM) a conductores y pasajeros sobre la nueva jornada.
 * 5. Realizar limpieza de horarios huérfanos sin conductor asignado.
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

        // Definición del escalafón cíclico de 9 días (Día 9 es descanso)
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

        // 1. CARGA DE DATOS COMPLETA (Sync Total para evitar condiciones de carrera)
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

        // Clasificación de conductores y captura de tokens de notificación
        conductoresSnap.forEach((snap) => {
            const data = snap.val();
            const uid = snap.key;
            const token = data.tokenFCM || tokenMap[uid];

            // Regla de Negocio Especial: Asignación fija para el conductor Brayan
            if (data.nombre && data.nombre.toLowerCase().includes("brayan")) {
                brayanId = uid;
            } else {
                conductoresParaRotar.push({ id: uid, nombre: data.nombre, token: token, vehiculoId: data.vehiculoId });
            }
        });

        // Recopilación de tokens para notificación masiva a pasajeros
        usuariosSnap.forEach((uSnap) => {
            const uData = uSnap.val();
            if (uData.rol === "usuario" && uData.tokenFCM) tokensPasajeros.push(uData.tokenFCM);
        });

        // Ordenamiento determinista para asegurar consistencia en el escalafón
        conductoresParaRotar.sort((a, b) => a.id.localeCompare(b.id));

        const updates = {};
        const horariosAsignadosSet = new Set();
        const dayCounter = Math.floor(Date.now() / (24 * 60 * 60 * 1000));
        const notificationPromises = [];
        const dispUpdates = {};

        // 2. ASIGNACIÓN FIJA (BRAYAN - Horarios h005, h015)
        if (brayanId) {
            const horariosFijos = ["h005", "h015"];
            updates[`conductores/${brayanId}/horariosAsignados`] = horariosFijos;
            updates[`conductores/${brayanId}/status`] = "active";
            horariosFijos.forEach(hId => {
                updates[`horarios/${hId}/conductorId`] = brayanId;
                horariosAsignadosSet.add(hId);
            });
        }

        // 3. ALGORITMO DE ESCALAFÓN Y RESET DE CAPACIDAD DINÁMICO
        conductoresParaRotar.forEach((c, index) => {
            const shiftIndex = (index + dayCounter) % ROTATING_SHIFTS.length;
            const misHorarios = ROTATING_SHIFTS[shiftIndex];
            const esDescanso = misHorarios.length === 0;

            // Actualización de estado y agenda en el perfil del conductor
            updates[`conductores/${c.id}/horariosAsignados`] = misHorarios;
            updates[`conductores/${c.id}/status`] = esDescanso ? "inactive" : "active";

            // Recuperación de la capacidad técnica del bus asignado
            let capacidadReal = 13;
            if (c.vehiculoId && vehiculosMap[c.vehiculoId]) {
                capacidadReal = vehiculosMap[c.vehiculoId].capacidad || 13;
            }

            misHorarios.forEach(hId => {
                updates[`horarios/${hId}/conductorId`] = c.id;
                horariosAsignadosSet.add(hId);
                // Reset atómico de la disponibilidad de asientos
                dispUpdates[`${hId}/asientosOcupados`] = null;
                dispUpdates[`${hId}/asientosDisponibles`] = capacidadReal;
                dispUpdates[`${hId}/totalAsientos`] = capacidadReal;
            });

            // Despacho de notificación personalizada al conductor
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

        // 4. LIMPIEZA DE HORARIOS SIN CONDUCTOR (Turnos sobrantes)
        horariosSnap.forEach(hSnap => {
            const hId = hSnap.key;
            if (!horariosAsignadosSet.has(hId)) {
                updates[`horarios/${hId}/conductorId`] = "";
                dispUpdates[`${hId}/asientosOcupados`] = null;
                dispUpdates[`${hId}/asientosDisponibles`] = 0;
                dispUpdates[`${hId}/totalAsientos`] = 0;
            }
        });

        // 5. NOTIFICACIÓN MASIVA A PASAJEROS (Por lotes de 500 para cumplir cuotas FCM)
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

        // 6. EJECUCIÓN ATÓMICA FINAL
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
 * 🧹 LIMPIEZA SEMANAL DE CUENTAS (Derecho al Olvido)
 *
 * EJECUCIÓN: Todos los domingos a las 3:00 AM (Hora Bogotá).
 * PROPÓSITO:
 * 1. Localizar cuentas marcadas con 'solicitudBorrado: true'.
 * 2. Validar que el periodo de gracia de 30 días se haya cumplido.
 * 3. Ejecutar borrado en cascada: Vehículo -> Perfil DB -> Firebase Auth.
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

    console.log("🧹 Iniciando mantenimiento de cuentas marcadas...");

    const performDeletion = async (uid, node) => {
        try {
            // Borrado del activo vehicular si es conductor
            if (node === 'conductores') {
                const driverSnap = await db.ref(`conductores/${uid}`).once('value');
                const plate = driverSnap.val()?.placaVehiculo;
                if (plate) await db.ref(`vehiculos/${plate}`).remove();
            }
            // Borrado del perfil en Realtime Database
            await db.ref(`${node}/${uid}`).remove();
            // Borrado de la identidad en Firebase Auth (Definitivo)
            await auth.deleteUser(uid);
            return `✅ ${uid} eliminado permanentemente.`;
        } catch (e) {
            return `❌ Fallo al eliminar ${uid}: ${e.message}`;
        }
    };

    try {
        // Búsqueda indexada de solicitudes pendientes
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

        // Ejecución en paralelo de todas las eliminaciones calificadas
        const results = await Promise.all(deletionPromises);
        console.log("📊 Resumen de limpieza semanal:", results);

    } catch (error) {
        console.error('❌ ERROR CRÍTICO EN PROCESO DE LIMPIEZA:', error);
    }
});

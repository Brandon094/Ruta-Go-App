const { onSchedule } = require("firebase-functions/v2/scheduler");
const { onValueCreated } = require("firebase-functions/v2/database");
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
            const val = uSnap.val();
            tokenMap[uSnap.key] = {
                mobile: val.tokenFCM || null,
                web: val.tokenFCM_Web || null
            };
        });

        const vehiculosMap = {};
        vehiculosSnap.forEach(vSnap => {
            vehiculosMap[vSnap.key] = vSnap.val();
        });

        const conductoresParaRotar = [];
        const tokensMulticast = []; // Para pasajeros (Web + Mobile)

        // 🧠 Identificación Dinámica del Conductor Fijo (Ancla: h005)
        const fixedConductorId = horariosSnap.child('h005').child('conductorId').val();
        let brayanId = null;

        conductoresSnap.forEach((snap) => {
            const data = snap.val();
            const uid = snap.key;
            const profileTokens = tokenMap[uid] || {};

            const tokens = [];
            if (data.tokenFCM) tokens.push(data.tokenFCM);
            if (data.tokenFCM_Web) tokens.push(data.tokenFCM_Web);
            if (profileTokens.mobile && !tokens.includes(profileTokens.mobile)) tokens.push(profileTokens.mobile);
            if (profileTokens.web && !tokens.includes(profileTokens.web)) tokens.push(profileTokens.web);

            if (uid === fixedConductorId) {
                brayanId = uid;
            } else {
                conductoresParaRotar.push({
                    id: uid,
                    nombre: data.nombre,
                    tokens: tokens,
                    vehiculoId: data.vehiculoId,
                    posicionEscalafon: data.posicionEscalafon
                });
            }
        });

        // Recopilación de tokens para notificación masiva a pasajeros
        usuariosSnap.forEach((uSnap) => {
            const uData = uSnap.val();
            if (uData.rol === "usuario" || uData.rol === "pasajero") {
                if (uData.tokenFCM) tokensMulticast.push(uData.tokenFCM);
                if (uData.tokenFCM_Web) tokensMulticast.push(uData.tokenFCM_Web);
            }
        });

        const updates = {};
        const horariosAsignadosSet = new Set();
        const dayCounter = Math.floor(Date.now() / (24 * 60 * 60 * 1000));
        const notificationPromises = [];
        const dispUpdates = {};

        // 2. ASIGNACIÓN FIJA (Dedicada - Horarios h005, h015)
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
        conductoresParaRotar.forEach((c) => {
            // Leemos el número de escalafón fijo asignado en la web (por defecto 0)
            const posicionFija = c.posicionEscalafon || 0;

            // Reemplazamos el 'index' por 'posicionFija' en la fórmula matemática
            const shiftIndex = (posicionFija + dayCounter) % ROTATING_SHIFTS.length;
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

            // Despacho de notificación personalizada al conductor (Multi-Token)
            if (c.tokens && c.tokens.length > 0) {
                c.tokens.forEach(t => {
                    notificationPromises.push(
                        messaging.send({
                            token: t,
                            notification: {
                                title: esDescanso ? "Mañana Descansas" : "Turnos Actualizados",
                                body: esDescanso ? `Hola ${c.nombre}, mañana descansas. ¡Disfrútalo!` : "Turnos listos para mañana. Revisa tus horarios en la app."
                            },
                            data: { type: "ROTACION_NOTIFICACION", target_activity: "driver_home" }
                        }).catch(e => console.error(`Error notif ${c.nombre} (Token: ${t}):`, e))
                    );
                });
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
        if (tokensMulticast.length > 0) {
            for (let i = 0; i < tokensMulticast.length; i += 500) {
                const chunk = tokensMulticast.slice(i, i + 500);
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

/**
 * 💬 NOTIFICACIÓN DE CHAT EN TIEMPO REAL
 *
 * Se activa cuando se crea un nuevo mensaje en /chats/{reservationId}/mensajes/{messageId}
 */
exports.onChatMessageCreated = onValueCreated("/chats/{reservationId}/mensajes/{messageId}", async (event) => {
    const { reservationId } = event.params;
    const messageData = event.data.val();
    const db = admin.database();
    const messaging = admin.messaging();

    try {
        console.log(`📩 Nuevo mensaje detectado en reserva: ${reservationId}`);

        // 1. Obtener datos de la reserva para saber quién es el receptor
        const resSnap = await db.ref(`reservas/${reservationId}`).once('value');
        if (!resSnap.exists()) {
            console.log("❌ Reserva no encontrada. Abortando notificación.");
            return;
        }

        const resData = resSnap.val();
        const senderId = messageData.senderId;

        // Identificar quién debe recibir el mensaje (si el emisor es el pasajero, recibe el conductor y viceversa)
        const isPassengerSender = (senderId === resData.userId);
        const receptorId = isPassengerSender ? resData.driverId : resData.userId;
        const senderName = isPassengerSender ? (resData.name || "Pasajero") : (resData.conductorNombre || "Conductor");

        if (!receptorId) {
            console.log("❌ No se pudo determinar el receptorId.");
            return;
        }

        // 2. Buscar tokens del receptor (Mobile + Web)
        const [uSnap, cSnap] = await Promise.all([
            db.ref(`usuarios/${receptorId}`).once('value'),
            db.ref(`conductores/${receptorId}`).once('value')
        ]);

        const tokens = [];
        const uData = uSnap.val();
        const cData = cSnap.val();

        if (uData?.tokenFCM) tokens.push(uData.tokenFCM);
        if (uData?.tokenFCM_Web) tokens.push(uData.tokenFCM_Web);
        if (cData?.tokenFCM) tokens.push(cData.tokenFCM);
        if (cData?.tokenFCM_Web) tokens.push(cData.tokenFCM_Web);

        // Eliminar duplicados y nulos
        const uniqueTokens = [...new Set(tokens.filter(t => !!t))];

        if (uniqueTokens.length === 0) {
            console.log(`⚠️ No hay tokens registrados para el receptor ${receptorId}`);
            return;
        }

        // 3. Enviar notificación push
        const payload = {
            notification: {
                title: `Mensaje de ${senderName}`,
                body: messageData.text.length > 50 ? messageData.text.substring(0, 47) + "..." : messageData.text
            },
            data: {
                type: "chat_message",
                reservationId: reservationId,
                target_activity: "chat",
                timestamp: String(Date.now())
            }
        };

        const notificationPromises = uniqueTokens.map(token =>
            messaging.send({ token, ...payload }).catch(e => console.error(`Error enviando a ${token}:`, e))
        );

        await Promise.all(notificationPromises);
        console.log(`✅ Notificación de chat enviada a ${uniqueTokens.length} dispositivos del usuario ${receptorId}`);

    } catch (error) {
        console.error("❌ Error en onChatMessageCreated:", error);
    }
});

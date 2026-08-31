const { onSchedule } = require("firebase-functions/v2/scheduler");
const { onValueCreated, onValueUpdated } = require("firebase-functions/v2/database");
const admin = require("firebase-admin");

admin.initializeApp();

/**
 * 🎨 HELPER: Genera un payload con la identidad visual de Ruta-Go
 */
const getBrandedPayload = (title, body, data = {}) => {
    return {
        notification: {
            title: title,
            body: body
        },
        android: {
            notification: {
                color: "#FF7A1A",
                icon: "ic_notification"
            }
        },
        webpush: {
            notification: {
                icon: "/assets/logo_icon.png",
                badge: "/assets/logo_icon.png",
                vibrate: [200, 100, 200]
            }
        },
        data: {
            ...data,
            timestamp: String(Date.now())
        }
    };
};

/**
 * 🔄 ROTACIÓN AUTOMÁTICA PROFESIONAL - Ecosistema Go v2.0
 * Ejecución: 7:00 PM (Hora Bogotá).
 * Soporta esquema unificado NoSQL v2.0 (/users/ con role === "driver", /schedules/, /vehicles/).
 */
exports.automatedRotation = onSchedule({
    schedule: "0 19 * * *",
    timeZone: "America/Bogota",
    memory: "256MiB"
}, async (event) => {
    const db = admin.database();
    const messaging = admin.messaging();

    try {
        console.log("🔄 Iniciando ciclo de rotación nocturna NoSQL v2.0...");

        const ROTATING_SHIFTS = [
            ["h009"], ["h010", "h008", "h018"], ["h007", "h017"],
            ["h006", "h016"], ["h004", "h014"], ["h003", "h013"],
            ["h002", "h012"], ["h001", "h011"], []
        ];

        const [usersSnap, conductoresSnap, schedulesSnap, horariosSnap, vehiclesSnap, vehiculosSnap] = await Promise.all([
            db.ref('users').once('value'),
            db.ref('conductores').once('value'),
            db.ref('schedules').once('value'),
            db.ref('horarios').once('value'),
            db.ref('vehicles').once('value'),
            db.ref('vehiculos').once('value')
        ]);

        const driversMap = {};
        const passTokens = [];

        // 1. Cargar usuarios del nodo unificado /users/
        usersSnap.forEach(snap => {
            const val = snap.val();
            const uid = snap.key;
            const role = (val.role || val.rol || "").toLowerCase();

            if (role === "driver" || role === "conductor") {
                const tokens = [];
                if (val.fcmToken || val.tokenFCM) tokens.push(val.fcmToken || val.tokenFCM);
                if (val.fcmTokenWeb || val.tokenFCM_Web) tokens.push(val.fcmTokenWeb || val.tokenFCM_Web);

                driversMap[uid] = {
                    id: uid,
                    name: val.name || val.nombre || "Conductor",
                    tokens: [...new Set(tokens.filter(Boolean))],
                    vehicleId: val.vehicleId || val.vehiculoId || val.vehiclePlate || val.placaVehiculo,
                    rankingPosition: val.rankingPosition ?? val.posicionEscalafon ?? 0
                };
            } else if (role === "passenger" || role === "usuario" || role === "pasajero") {
                if (val.fcmToken || val.tokenFCM) passTokens.push(val.fcmToken || val.tokenFCM);
                if (val.fcmTokenWeb || val.tokenFCM_Web) passTokens.push(val.fcmTokenWeb || val.tokenFCM_Web);
            }
        });

        // Fallback a /conductores/ si hay conductores legados
        conductoresSnap.forEach(snap => {
            const val = snap.val();
            const uid = snap.key;
            if (!driversMap[uid]) {
                const tokens = [];
                if (val.tokenFCM) tokens.push(val.tokenFCM);
                if (val.tokenFCM_Web) tokens.push(val.tokenFCM_Web);

                driversMap[uid] = {
                    id: uid,
                    name: val.nombre || "Conductor",
                    tokens: [...new Set(tokens.filter(Boolean))],
                    vehicleId: val.vehiculoId || val.placaVehiculo,
                    rankingPosition: val.posicionEscalafon ?? 0
                };
            }
        });

        // Map de vehículos
        const vehiclesMap = {};
        vehiclesSnap.forEach(vSnap => { vehiclesMap[vSnap.key] = vSnap.val(); });
        vehiculosSnap.forEach(vSnap => { if (!vehiclesMap[vSnap.key]) vehiclesMap[vSnap.key] = vSnap.val(); });

        const driversToRotate = [];
        const fixedDriverId = schedulesSnap.child('h005').child('driverId').val() || horariosSnap.child('h005').child('conductorId').val();
        let fixedBrayanId = null;

        Object.values(driversMap).forEach(d => {
            if (d.id === fixedDriverId) {
                fixedBrayanId = d.id;
            } else {
                driversToRotate.push(d);
            }
        });

        const updates = {};
        const assignedSchedulesSet = new Set();
        const dayCounter = Math.floor(Date.now() / (24 * 60 * 60 * 1000));
        const notificationPromises = [];
        const dispUpdates = {};

        if (fixedBrayanId) {
            const fixedShifts = ["h005", "h015"];
            updates[`users/${fixedBrayanId}/assignedSchedules`] = fixedShifts;
            updates[`users/${fixedBrayanId}/status`] = "active";
            updates[`conductores/${fixedBrayanId}/horariosAsignados`] = fixedShifts;
            updates[`conductores/${fixedBrayanId}/status`] = "active";

            fixedShifts.forEach(hId => {
                updates[`schedules/${hId}/driverId`] = fixedBrayanId;
                updates[`horarios/${hId}/conductorId`] = fixedBrayanId;
                assignedSchedulesSet.add(hId);
            });
        }

        driversToRotate.forEach(c => {
            const pos = c.rankingPosition || 0;
            const shiftIndex = (pos + dayCounter) % ROTATING_SHIFTS.length;
            const myShifts = ROTATING_SHIFTS[shiftIndex];
            const isOff = myShifts.length === 0;

            updates[`users/${c.id}/assignedSchedules`] = myShifts;
            updates[`users/${c.id}/status`] = isOff ? "inactive" : "active";
            updates[`conductores/${c.id}/horariosAsignados`] = myShifts;
            updates[`conductores/${c.id}/status`] = isOff ? "inactive" : "active";

            let capacity = 13;
            if (c.vehicleId && vehiclesMap[c.vehicleId]) {
                capacity = vehiclesMap[c.vehicleId].capacity || vehiclesMap[c.vehicleId].capacidad || 13;
            }

            myShifts.forEach(hId => {
                updates[`schedules/${hId}/driverId`] = c.id;
                updates[`horarios/${hId}/conductorId`] = c.id;
                assignedSchedulesSet.add(hId);
                dispUpdates[`${hId}/asientosOcupados`] = null;
                dispUpdates[`${hId}/asientosDisponibles`] = capacity;
                dispUpdates[`${hId}/totalAsientos`] = capacity;
            });

            if (c.tokens && c.tokens.length > 0) {
                const title = isOff ? "Mañana Descansas" : "Turnos Actualizados";
                const body = isOff ? `Hola ${c.name}, mañana descansas. ¡Disfrútalo!` : "Turnos listos para mañana. Revisa tus horarios en la app.";
                const payload = getBrandedPayload(title, body, { type: "ROTACION_NOTIFICACION", target_activity: "driver_home" });
                c.tokens.forEach(t => {
                    notificationPromises.push(messaging.send({ token: t, ...payload }).catch(e => console.error(`Error notif ${c.name}:`, e)));
                });
            }
        });

        // Limpiar turnos no asignados
        schedulesSnap.forEach(sSnap => {
            const hId = sSnap.key;
            if (!assignedSchedulesSet.has(hId)) {
                updates[`schedules/${hId}/driverId`] = "";
                updates[`horarios/${hId}/conductorId`] = "";
                dispUpdates[`${hId}/asientosOcupados`] = null;
                dispUpdates[`${hId}/asientosDisponibles`] = 0;
                dispUpdates[`${hId}/totalAsientos`] = 0;
            }
        });

        if (passTokens.length > 0) {
            const basePayload = getBrandedPayload("Horarios Listos", "Ya puedes reservar tu viaje para mañana.", { type: "HORARIOS_DISPONIBLES", target_activity: "passenger_home" });
            const uniquePassTokens = [...new Set(passTokens)];
            for (let i = 0; i < uniquePassTokens.length; i += 500) {
                const chunk = uniquePassTokens.slice(i, i + 500);
                notificationPromises.push(messaging.sendEachForMulticast({ tokens: chunk, ...basePayload }).catch(e => console.error("Error notif masiva:", e)));
            }
        }

        await Promise.all([
            db.ref().update(updates),
            db.ref('disponibilidadAsientos').update(dispUpdates),
            db.ref('seatAvailability').update(dispUpdates),
            ...notificationPromises
        ]);
        console.log(`✅ Ciclo NoSQL v2.0 completado.`);
    } catch (error) { console.error('❌ ERROR CRÍTICO EN ROTACIÓN:', error); }
});

/**
 * 🧹 LIMPIEZA SEMANAL DE CUENTAS MARCADAS PARA BORRADO
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

    const performDeletion = async (uid) => {
        try {
            const uSnap = await db.ref(`users/${uid}`).once('value');
            const plate = uSnap.val()?.vehiclePlate || uSnap.val()?.placaVehiculo;
            if (plate) {
                await db.ref(`vehicles/${plate}`).remove();
                await db.ref(`vehiculos/${plate}`).remove();
            }
            await db.ref(`users/${uid}`).remove();
            await db.ref(`usuarios/${uid}`).remove();
            await db.ref(`conductores/${uid}`).remove();
            await auth.deleteUser(uid);
            return `✅ ${uid} eliminado.`;
        } catch (e) { return `❌ Fallo al eliminar ${uid}: ${e.message}`; }
    };

    try {
        const [uSnap, usersSnap] = await Promise.all([
            db.ref('usuarios').orderByChild('solicitudBorrado').equalTo(true).once('value'),
            db.ref('users').orderByChild('deletionRequested').equalTo(true).once('value')
        ]);
        const deletionPromises = [];
        uSnap.forEach(snap => { if (snap.val().fechaSolicitudBorrado <= limitTimestamp) deletionPromises.push(performDeletion(snap.key)); });
        usersSnap.forEach(snap => { if (snap.val().deletionRequestedDate <= limitTimestamp) deletionPromises.push(performDeletion(snap.key)); });
        await Promise.all(deletionPromises);
    } catch (error) { console.error('❌ ERROR EN LIMPIEZA:', error); }
});

/**
 * 💬 NOTIFICACIÓN DE CHAT EN TIEMPO REAL (Compatibilidad dual /chats/{id}/messages y /chats/{id}/mensajes)
 */
const handleChatMessageCreated = async (event) => {
    const { reservationId } = event.params;
    const messageData = event.data.val();
    const db = admin.database();
    const messaging = admin.messaging();

    try {
        let resSnap = await db.ref(`reservations/${reservationId}`).once('value');
        if (!resSnap.exists()) {
            resSnap = await db.ref(`reservas/${reservationId}`).once('value');
        }
        if (!resSnap.exists()) return;

        const resData = resSnap.val();
        const senderId = messageData.senderId;
        const isPassengerSender = (senderId === (resData.userId || resData.usuarioId));
        const receptorId = isPassengerSender ? (resData.driverId || resData.conductorId) : (resData.userId || resData.usuarioId);
        const senderName = isPassengerSender ? (resData.passengerName || resData.name || resData.nombre || "Pasajero") : (resData.driverName || resData.driver || resData.conductorNombre || "Conductor");

        if (!receptorId) return;

        const [uSnap, userSnap] = await Promise.all([
            db.ref(`usuarios/${receptorId}`).once('value'),
            db.ref(`users/${receptorId}`).once('value')
        ]);

        const tokens = [];
        const uVal = uSnap.val() || {};
        const userVal = userSnap.val() || {};

        if (userVal.fcmToken) tokens.push(userVal.fcmToken);
        if (userVal.fcmTokenWeb) tokens.push(userVal.fcmTokenWeb);
        if (uVal.tokenFCM) tokens.push(uVal.tokenFCM);
        if (uVal.tokenFCM_Web) tokens.push(uVal.tokenFCM_Web);

        const uniqueTokens = [...new Set(tokens.filter(Boolean))];
        if (uniqueTokens.length === 0) return;

        const body = messageData.text.length > 50 ? messageData.text.substring(0, 47) + "..." : messageData.text;
        const payload = getBrandedPayload(`Mensaje de ${senderName}`, body, { type: "chat_message", reservationId, target_activity: "chat" });

        await Promise.all(uniqueTokens.map(token => messaging.send({ token, ...payload }).catch(() => {})));
    } catch (error) { console.error("❌ Error en chat:", error); }
};

exports.onChatMessageCreatedLegacy = onValueCreated("/chats/{reservationId}/mensajes/{messageId}", handleChatMessageCreated);
exports.onChatMessageCreated = onValueCreated("/chats/{reservationId}/messages/{messageId}", handleChatMessageCreated);

/**
 * 🔔 NOTIFICACIÓN Y REPARACIÓN AL CREAR RESERVA (Soporta /reservations/{id} y /reservas/{id})
 */
const handleReservationCreated = async (event) => {
    const resData = event.data.val();
    const { id } = event.params;
    const db = admin.database();
    const messaging = admin.messaging();

    try {
        const driverId = resData.driverId || resData.conductorId;
        const passengerName = resData.passengerName || resData.name || resData.nombre || "Pasajero";

        if (!driverId) return;

        const [uSnap, cSnap] = await Promise.all([
            db.ref(`users/${driverId}`).once('value'),
            db.ref(`conductores/${driverId}`).once('value')
        ]);

        const tokens = [];
        if (uSnap.val()?.fcmToken) tokens.push(uSnap.val().fcmToken);
        if (uSnap.val()?.fcmTokenWeb) tokens.push(uSnap.val().fcmTokenWeb);
        if (uSnap.val()?.tokenFCM) tokens.push(uSnap.val().tokenFCM);
        if (cSnap.val()?.tokenFCM) tokens.push(cSnap.val().tokenFCM);
        if (cSnap.val()?.tokenFCM_Web) tokens.push(cSnap.val().tokenFCM_Web);

        const uniqueTokens = [...new Set(tokens.filter(Boolean))];
        if (uniqueTokens.length === 0) return;

        const route = `${resData.origin || resData.origen || ""} -> ${resData.destination || resData.destino || ""}`;
        const payload = getBrandedPayload("¡Nueva Reserva Recibida!", `${passengerName} ha reservado para la ruta ${route}.`, { type: "new_reservation", reservationId: id, target_activity: "driver_reservations" });

        await Promise.all(uniqueTokens.map(token => messaging.send({ token, ...payload }).catch(() => {})));
    } catch (error) { console.error("❌ Error en reserva:", error); }
};

exports.onReservationCreatedLegacy = onValueCreated("/reservas/{id}", handleReservationCreated);
exports.onReservationCreated = onValueCreated("/reservations/{id}", handleReservationCreated);

/**
 * 🔔 NOTIFICACIÓN DE CAMBIO DE ESTADO DE RESERVA
 */
const handleReservationStatusChanged = async (event) => {
    const beforeData = event.data.before.val();
    const afterData = event.data.after.val();
    const { id } = event.params;
    const db = admin.database();
    const messaging = admin.messaging();

    const oldStatus = beforeData.status || beforeData.reservationStatus || beforeData.estadoReserva;
    const newStatus = afterData.status || afterData.reservationStatus || afterData.estadoReserva;

    if (oldStatus === newStatus) return;

    try {
        if (newStatus !== "confirmed" && newStatus !== "Confirmada" && newStatus !== "cancelled" && newStatus !== "Cancelada") return;

        const userId = afterData.userId || afterData.usuarioId;
        if (!userId) return;

        const uSnap = await db.ref(`users/${userId}`).once('value');
        const legacyUSnap = await db.ref(`usuarios/${userId}`).once('value');

        const tokens = [];
        if (uSnap.val()?.fcmToken) tokens.push(uSnap.val().fcmToken);
        if (uSnap.val()?.fcmTokenWeb) tokens.push(uSnap.val().fcmTokenWeb);
        if (legacyUSnap.val()?.tokenFCM) tokens.push(legacyUSnap.val().tokenFCM);
        if (legacyUSnap.val()?.tokenFCM_Web) tokens.push(legacyUSnap.val().tokenFCM_Web);

        const uniqueTokens = [...new Set(tokens.filter(Boolean))];
        if (uniqueTokens.length === 0) return;

        const isConfirmed = (newStatus === "confirmed" || newStatus === "Confirmada");
        const body = isConfirmed ? "¡Tu viaje ha sido confirmado! Revisa los detalles en la app." : "Lamentamos informarte que tu reserva ha sido cancelada.";
        const statusLabel = isConfirmed ? "Confirmada" : "Cancelada";
        const payload = getBrandedPayload(`Tu reserva ha sido ${statusLabel}`, body, { type: "reservation_status_update", reservationId: id, status: newStatus, target_activity: "passenger_reservations" });

        await Promise.all(uniqueTokens.map(token => messaging.send({ token, ...payload }).catch(() => {})));
    } catch (error) { console.error("❌ Error en status change:", error); }
};

exports.onReservationStatusChangedLegacy = onValueUpdated("/reservas/{id}", handleReservationStatusChanged);
exports.onReservationStatusChanged = onValueUpdated("/reservations/{id}", handleReservationStatusChanged);

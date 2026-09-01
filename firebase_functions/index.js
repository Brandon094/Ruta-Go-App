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
 * 🔄 ROTACIÓN AUTOMÁTICA PROFESIONAL - Ecosistema Go v2.0 (Inteligente & Focalizada)
 * Ejecución: 7:00 PM (Hora Bogotá).
 * Soporta esquema unificado NoSQL v2.0 (/users/, /schedules/, /seatAvailability/, /vehicles/).
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

        // 1. Obtener Snapshots de la Base de Datos
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

        // Cargar usuarios del nodo /users/
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
            const val = snap.key;
            if (!driversMap[val]) {
                const cVal = snap.val();
                const tokens = [];
                if (cVal.tokenFCM) tokens.push(cVal.tokenFCM);
                if (cVal.tokenFCM_Web) tokens.push(cVal.tokenFCM_Web);

                driversMap[val] = {
                    id: val,
                    name: cVal.nombre || "Conductor",
                    tokens: [...new Set(tokens.filter(Boolean))],
                    vehicleId: cVal.vehiculoId || cVal.placaVehiculo,
                    rankingPosition: cVal.posicionEscalafon ?? 0
                };
            }
        });

        // Cargar Mapa de Vehículos
        const vehiclesMap = {};
        vehiclesSnap.forEach(vSnap => { vehiclesMap[vSnap.key] = vSnap.val(); });
        vehiculosSnap.forEach(vSnap => { if (!vehiclesMap[vSnap.key]) vehiclesMap[vSnap.key] = vSnap.val(); });

        // Helper para normalizar texto
        const norm = (str) => (str || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();

        // 2. Clasificar Horarios (/schedules/) entre Ruta Principal (Nátaga ➔ La Plata) y Rutas Adicionales
        const natagaSchedules = [];
        const additionalSchedules = [];

        schedulesSnap.forEach(sSnap => {
            const sVal = sSnap.val();
            const sId = sSnap.key;
            const routeStr = norm(sVal.route || sVal.ruta || "");

            // Verificar si pertenece al corredor principal Nátaga ➔ La Plata
            const isNatagaLP = routeStr.includes("nataga") && routeStr.includes("la plata");

            const scheduleObj = {
                id: sId,
                route: sVal.route || sVal.ruta || "",
                time: sVal.time || sVal.hora || "08:00 AM",
                driverId: sVal.driverId || sVal.conductorId || "",
                vehicleId: sVal.vehicleId || sVal.vehiculoId || ""
            };

            if (isNatagaLP) {
                natagaSchedules.push(scheduleObj);
            } else {
                additionalSchedules.push(scheduleObj);
            }
        });

        // 3. Agrupar Horarios de Nátaga ➔ La Plata por Hora de Salida en Grupos Rotativos (Turnos 1 al 8)
        const getMinutes = (hStr) => {
            try {
                const [time, ampm] = hStr.trim().split(" ");
                let [hrs, mins] = time.split(":").map(Number);
                if (ampm === "PM" && hrs < 12) hrs += 12;
                if (ampm === "AM" && hrs === 12) hrs = 0;
                return hrs * 60 + (mins || 0);
            } catch (e) { return 0; }
        };

        natagaSchedules.sort((a, b) => getMinutes(a.time) - getMinutes(b.time));

        // Construir la Rueda de Turnos Rotativos para Nátaga
        const rotShifts = [];
        const natagaIds = natagaSchedules.map(s => s.id);

        for (let i = 0; i < natagaIds.length; i += 2) {
            if (i + 1 < natagaIds.length) {
                rotShifts.push([natagaIds[i], natagaIds[i + 1]]);
            } else {
                rotShifts.push([natagaIds[i]]);
            }
        }
        // Día de descanso (posición final del ciclo)
        rotShifts.push([]);

        // Rellenar hasta asegurar mínimo 9 posiciones de rotación
        while (rotShifts.length < 9) {
            rotShifts.push([]);
        }

        const updates = {};
        const dispUpdates = {};
        const dayCounter = Math.floor(Date.now() / (24 * 60 * 60 * 1000));
        const notificationPromises = [];

        // 4. Rotar únicamente a los Conductores de la Flota Nátaga ➔ La Plata
        const allDrivers = Object.values(driversMap);

        allDrivers.forEach(c => {
            const pos = c.rankingPosition || 0;
            const shiftIndex = (pos + dayCounter) % rotShifts.length;
            const myShifts = rotShifts[shiftIndex] || [];
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

                dispUpdates[`seatAvailability/${hId}/availableSeats`] = capacity;
                dispUpdates[`seatAvailability/${hId}/totalSeats`] = capacity;
                dispUpdates[`seatAvailability/${hId}/occupiedSeats`] = null;

                dispUpdates[`disponibilidadAsientos/${hId}/asientosDisponibles`] = capacity;
                dispUpdates[`disponibilidadAsientos/${hId}/totalAsientos`] = capacity;
                dispUpdates[`disponibilidadAsientos/${hId}/asientosOcupados`] = null;
            });

            if (c.tokens && c.tokens.length > 0) {
                const title = isOff ? "Mañana Descansas" : "Turnos Actualizados";
                const body = isOff ? `Hola ${c.name}, mañana descansas. ¡Disfrútalo!` : "Turnos listos para mañana. Revisa tus horarios en la app.";
                const payload = getBrandedPayload(title, body, { type: "ROTACION_NOTIFICACION", target_activity: "driver_home" });
                c.tokens.forEach(t => {
                    notificationPromises.push(messaging.send({ token: t, ...payload }).catch(() => {}));
                });
            }
        });

        // 5. Preservar y Reseteo Aislado para Rutas Adicionales / Dinámicas (Neiva, Gallego, etc.)
        additionalSchedules.forEach(s => {
            const hId = s.id;
            let capacity = 13;
            if (s.vehicleId && vehiclesMap[s.vehicleId]) {
                capacity = vehiclesMap[s.vehicleId].capacity || vehiclesMap[s.vehicleId].capacidad || 13;
            }

            // MANTENER el driverId y vehicleId existente
            dispUpdates[`seatAvailability/${hId}/availableSeats`] = capacity;
            dispUpdates[`seatAvailability/${hId}/totalSeats`] = capacity;
            dispUpdates[`seatAvailability/${hId}/occupiedSeats`] = null;

            dispUpdates[`disponibilidadAsientos/${hId}/asientosDisponibles`] = capacity;
            dispUpdates[`disponibilidadAsientos/${hId}/totalAsientos`] = capacity;
            dispUpdates[`disponibilidadAsientos/${hId}/asientosOcupados`] = null;
        });

        // 6. Notificaciones Masivas a Pasajeros
        if (passTokens.length > 0) {
            const basePayload = getBrandedPayload("Horarios Listos", "Ya puedes reservar tu viaje para mañana.", { type: "HORARIOS_DISPONIBLES", target_activity: "passenger_home" });
            const uniquePassTokens = [...new Set(passTokens)];
            for (let i = 0; i < uniquePassTokens.length; i += 500) {
                const chunk = uniquePassTokens.slice(i, i + 500);
                notificationPromises.push(messaging.sendEachForMulticast({ tokens: chunk, ...basePayload }).catch(() => {}));
            }
        }

        await Promise.all([
            db.ref().update(updates),
            db.ref().update(dispUpdates),
            ...notificationPromises
        ]);

        console.log(`✅ Ciclo NoSQL v2.0 completado exitosamente para Nátaga y Rutas Adicionales.`);
    } catch (error) {
        console.error('❌ ERROR CRÍTICO EN ROTACIÓN:', error);
    }
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

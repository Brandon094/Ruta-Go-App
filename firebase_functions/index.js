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
 * 🔄 ROTACIÓN AUTOMÁTICA PROFESIONAL - Ecosistema Go
 * Ejecución: 7:00 PM (Hora Bogotá).
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
            ["h009"], ["h010", "h008", "h018"], ["h007", "h017"],
            ["h006", "h016"], ["h004", "h014"], ["h003", "h013"],
            ["h002", "h012"], ["h001", "h011"], []
        ];

        const [conductoresSnap, horariosSnap, usuariosSnap, vehiculosSnap] = await Promise.all([
            db.ref('conductores').once('value'),
            db.ref('horarios').once('value'),
            db.ref('usuarios').once('value'),
            db.ref('vehiculos').once('value')
        ]);

        const tokenMap = {};
        usuariosSnap.forEach(uSnap => {
            const val = uSnap.val();
            tokenMap[uSnap.key] = { mobile: val.tokenFCM || null, web: val.tokenFCM_Web || null };
        });

        const vehiculosMap = {};
        vehiculosSnap.forEach(vSnap => { vehiculosMap[vSnap.key] = vSnap.val(); });

        const conductoresParaRotar = [];
        const tokensMulticast = [];

        const fixedConductorId = horariosSnap.child('h005').child('conductorId').val();
        let brayanId = null;

        conductoresSnap.forEach((snap) => {
            const data = snap.val();
            const uid = snap.key;
            const profileTokens = tokenMap[uid] || {};
            const tokens = [];
            if (data.tokenFCM) tokens.push(data.tokenFCM);
            if (data.tokenFCM_Web) tokens.push(data.tokenFCM_Web);
            if (profileTokens.mobile) tokens.push(profileTokens.mobile);
            if (profileTokens.web) tokens.push(profileTokens.web);

            if (uid === fixedConductorId) { brayanId = uid; }
            else {
                conductoresParaRotar.push({ id: uid, nombre: data.nombre, tokens: [...new Set(tokens)], vehiculoId: data.vehiculoId, posicionEscalafon: data.posicionEscalafon });
            }
        });

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

        if (brayanId) {
            const horariosFijos = ["h005", "h015"];
            updates[`conductores/${brayanId}/horariosAsignados`] = horariosFijos;
            updates[`conductores/${brayanId}/status`] = "active";
            horariosFijos.forEach(hId => { updates[`horarios/${hId}/conductorId`] = brayanId; horariosAsignadosSet.add(hId); });
        }

        conductoresParaRotar.forEach((c) => {
            const posicionFija = c.posicionEscalafon || 0;
            const shiftIndex = (posicionFija + dayCounter) % ROTATING_SHIFTS.length;
            const misHorarios = ROTATING_SHIFTS[shiftIndex];
            const esDescanso = misHorarios.length === 0;

            updates[`conductores/${c.id}/horariosAsignados`] = misHorarios;
            updates[`conductores/${c.id}/status`] = esDescanso ? "inactive" : "active";

            let capacidadReal = 13;
            if (c.vehiculoId && vehiculosMap[c.vehiculoId]) { capacidadReal = vehiculosMap[c.vehiculoId].capacidad || 13; }

            misHorarios.forEach(hId => {
                updates[`horarios/${hId}/conductorId`] = c.id;
                horariosAsignadosSet.add(hId);
                dispUpdates[`${hId}/asientosOcupados`] = null;
                dispUpdates[`${hId}/asientosDisponibles`] = capacidadReal;
                dispUpdates[`${hId}/totalAsientos`] = capacidadReal;
            });

            if (c.tokens && c.tokens.length > 0) {
                const title = esDescanso ? "Mañana Descansas" : "Turnos Actualizados";
                const body = esDescanso ? `Hola ${c.nombre}, mañana descansas. ¡Disfrútalo!` : "Turnos listos para mañana. Revisa tus horarios en la app.";
                const payload = getBrandedPayload(title, body, { type: "ROTACION_NOTIFICACION", target_activity: "driver_home" });
                c.tokens.forEach(t => { notificationPromises.push(messaging.send({ token: t, ...payload }).catch(e => console.error(`Error notif ${c.nombre}:`, e))); });
            }
        });

        horariosSnap.forEach(hSnap => {
            const hId = hSnap.key;
            if (!horariosAsignadosSet.has(hId)) {
                updates[`horarios/${hId}/conductorId`] = "";
                dispUpdates[`${hId}/asientosOcupados`] = null;
                dispUpdates[`${hId}/asientosDisponibles`] = 0;
                dispUpdates[`${hId}/totalAsientos`] = 0;
            }
        });

        if (tokensMulticast.length > 0) {
            const basePayload = getBrandedPayload("Horarios Listos", "Ya puedes reservar tu viaje para mañana.", { type: "HORARIOS_DISPONIBLES", target_activity: "passenger_home" });
            const uniquePassTokens = [...new Set(tokensMulticast)];
            for (let i = 0; i < uniquePassTokens.length; i += 500) {
                const chunk = uniquePassTokens.slice(i, i + 500);
                notificationPromises.push(messaging.sendEachForMulticast({ tokens: chunk, ...basePayload }).catch(e => console.error("Error notif masiva:", e)));
            }
        }

        await Promise.all([db.ref().update(updates), db.ref('disponibilidadAsientos').update(dispUpdates), ...notificationPromises]);
        console.log(`✅ Ciclo completado.`);
    } catch (error) { console.error('❌ ERROR CRÍTICO EN ROTACIÓN:', error); }
});

/**
 * 🧹 LIMPIEZA SEMANAL DE CUENTAS
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
        } catch (e) { return `❌ Fallo al eliminar ${uid}: ${e.message}`; }
    };

    try {
        const [uSnap, cSnap] = await Promise.all([
            db.ref('usuarios').orderByChild('solicitudBorrado').equalTo(true).once('value'),
            db.ref('conductores').orderByChild('solicitudBorrado').equalTo(true).once('value')
        ]);
        const deletionPromises = [];
        uSnap.forEach(snap => { if (snap.val().fechaSolicitudBorrado <= limitTimestamp) deletionPromises.push(performDeletion(snap.key, 'usuarios')); });
        cSnap.forEach(snap => { if (snap.val().fechaSolicitudBorrado <= limitTimestamp) deletionPromises.push(performDeletion(snap.key, 'conductores')); });
        await Promise.all(deletionPromises);
    } catch (error) { console.error('❌ ERROR EN LIMPIEZA:', error); }
});

/**
 * 💬 NOTIFICACIÓN DE CHAT EN TIEMPO REAL
 */
exports.onChatMessageCreated = onValueCreated("/chats/{reservationId}/mensajes/{messageId}", async (event) => {
    const { reservationId } = event.params;
    const messageData = event.data.val();
    const db = admin.database();
    const messaging = admin.messaging();

    try {
        const resSnap = await db.ref(`reservas/${reservationId}`).once('value');
        if (!resSnap.exists()) return;

        const resData = resSnap.val();
        const senderId = messageData.senderId;
        const isPassengerSender = (senderId === (resData.userId || resData.usuarioId));
        const receptorId = isPassengerSender ? (resData.driverId || resData.conductorId) : (resData.userId || resData.usuarioId);
        const senderName = isPassengerSender ? (resData.name || resData.nombre || "Pasajero") : (resData.conductorNombre || resData.driver || "Conductor");

        if (!receptorId) return;

        const [uSnap, cSnap] = await Promise.all([db.ref(`usuarios/${receptorId}`).once('value'), db.ref(`conductores/${receptorId}`).once('value')]);
        const tokens = [];
        if (uSnap.val()?.tokenFCM) tokens.push(uSnap.val().tokenFCM);
        if (uSnap.val()?.tokenFCM_Web) tokens.push(uSnap.val().tokenFCM_Web);
        if (cSnap.val()?.tokenFCM) tokens.push(cSnap.val().tokenFCM);
        if (cSnap.val()?.tokenFCM_Web) tokens.push(cSnap.val().tokenFCM_Web);

        const uniqueTokens = [...new Set(tokens.filter(t => !!t))];
        if (uniqueTokens.length === 0) return;

        const body = messageData.text.length > 50 ? messageData.text.substring(0, 47) + "..." : messageData.text;
        const payload = getBrandedPayload(`Mensaje de ${senderName}`, body, { type: "chat_message", reservationId, target_activity: "chat" });

        await Promise.all(uniqueTokens.map(token => messaging.send({ token, ...payload }).catch(() => {})));
    } catch (error) { console.error("❌ Error en chat:", error); }
});

/**
 * 🔔 MODO ESPEJO: SINCRO Y NOTIFICACIÓN DE RESERVA
 */
exports.onReservationCreated = onValueCreated("/reservas/{id}", async (event) => {
    const resData = event.data.val();
    const { id } = event.params;
    const db = admin.database();
    const messaging = admin.messaging();

    try {
        const driverId = resData.driverId || resData.conductorId;
        const passengerName = resData.name || resData.nombre || "Pasajero";

        // --- 🛠 MODO ESPEJO: Auto-reparar llaves bilingües ---
        const repairUpdates = {};
        if (resData.driverId && !resData.conductorId) repairUpdates.conductorId = resData.driverId;
        if (resData.conductorId && !resData.driverId) repairUpdates.driverId = resData.conductorId;
        if (resData.userId && !resData.usuarioId) repairUpdates.usuarioId = resData.userId;
        if (resData.usuarioId && !resData.userId) repairUpdates.userId = resData.usuarioId;
        if (resData.reservationStatus && !resData.estadoReserva) repairUpdates.estadoReserva = resData.reservationStatus;
        if (resData.estadoReserva && !resData.reservationStatus) repairUpdates.reservationStatus = resData.estadoReserva;

        if (Object.keys(repairUpdates).length > 0) {
            await db.ref(`reservas/${id}`).update(repairUpdates);
        }
        // ----------------------------------------------------

        if (!driverId) return;

        const cSnap = await db.ref(`conductores/${driverId}`).once('value');
        const tokens = [];
        if (cSnap.val()?.tokenFCM) tokens.push(cSnap.val().tokenFCM);
        if (cSnap.val()?.tokenFCM_Web) tokens.push(cSnap.val().tokenFCM_Web);

        const uniqueTokens = [...new Set(tokens.filter(t => !!t))];
        if (uniqueTokens.length === 0) return;

        const route = `${resData.origin || resData.origen || ""} -> ${resData.destination || resData.destino || ""}`;
        const payload = getBrandedPayload("¡Nueva Reserva Recibida!", `${passengerName} ha reservado para la ruta ${route}.`, { type: "new_reservation", reservationId: id, target_activity: "driver_reservations" });

        await Promise.all(uniqueTokens.map(token => messaging.send({ token, ...payload }).catch(() => {})));
    } catch (error) { console.error("❌ Error en reserva:", error); }
});

/**
 * 🔔 MODO ESPEJO: SINCRO Y NOTIFICACIÓN DE CAMBIO DE ESTADO
 */
exports.onReservationStatusChanged = onValueUpdated("/reservas/{id}", async (event) => {
    const beforeData = event.data.before.val();
    const afterData = event.data.after.val();
    const { id } = event.params;
    const db = admin.database();
    const messaging = admin.messaging();

    const oldStatus = beforeData.reservationStatus || beforeData.estadoReserva;
    const newStatus = afterData.reservationStatus || afterData.estadoReserva;

    if (oldStatus === newStatus) return;

    try {
        // --- 🛠 MODO ESPEJO: Sincronizar llaves de estado ---
        const syncUpdates = {};
        if (afterData.reservationStatus !== afterData.estadoReserva) {
            // Si cambió en inglés (Web), actualizar español (Android)
            if (afterData.reservationStatus !== beforeData.reservationStatus) syncUpdates.estadoReserva = afterData.reservationStatus;
            // Si cambió en español (Android), actualizar inglés (Web)
            else syncUpdates.reservationStatus = afterData.estadoReserva;

            await db.ref(`reservas/${id}`).update(syncUpdates);
        }
        // ----------------------------------------------------

        if (newStatus !== "Confirmada" && newStatus !== "Cancelada") return;

        const userId = afterData.userId || afterData.usuarioId;
        if (!userId) return;

        const uSnap = await db.ref(`usuarios/${userId}`).once('value');
        const tokens = [];
        if (uSnap.val()?.tokenFCM) tokens.push(uSnap.val().tokenFCM);
        if (uSnap.val()?.tokenFCM_Web) tokens.push(uSnap.val().tokenFCM_Web);

        const uniqueTokens = [...new Set(tokens.filter(t => !!t))];
        if (uniqueTokens.length === 0) return;

        const body = newStatus === "Confirmada" ? "¡Tu viaje ha sido confirmado! Revisa los detalles en la app." : "Lamentamos informarte que tu reserva ha sido cancelada.";
        const payload = getBrandedPayload(`Tu reserva ha sido ${newStatus}`, body, { type: "reservation_status_update", reservationId: id, status: newStatus, target_activity: "passenger_reservations" });

        await Promise.all(uniqueTokens.map(token => messaging.send({ token, ...payload }).catch(() => {})));
    } catch (error) { console.error("❌ Error en status change:", error); }
});

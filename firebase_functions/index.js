const { onSchedule } = require("firebase-functions/v2/scheduler");
const admin = require("firebase-admin");

admin.initializeApp();

/**
 * ✅ ROTACIÓN AUTOMÁTICA DE HORARIOS (Gen 2)
 * Se ejecuta todos los días a las 00:00 AM (Hora Colombia)
 * Nuevo nombre para evitar conflictos de actualización: automatedRotation
 */
exports.automatedRotation = onSchedule({
    schedule: "0 0 * * *",
    timeZone: "America/Bogota",
    memory: "256MiB"
}, async (event) => {
    const db = admin.database();

    try {
        console.log("🔄 Iniciando rotación programada (automatedRotation)...");

        // 1. Obtener datos actuales
        const [conductoresSnap, horariosSnap] = await Promise.all([
            db.ref('conductores').once('value'),
            db.ref('horarios').once('value')
        ]);

        if (!conductoresSnap.exists()) {
            console.log("No hay conductores para rotar.");
            return;
        }

        const conductores = [];
        let brayanId = null;

        conductoresSnap.forEach((snap) => {
            const data = snap.val();
            if (data.nombre && data.nombre.trim().toLowerCase() === "brayan alvarado") {
                brayanId = snap.key;
            } else {
                // Guardamos el ID y los datos
                conductores.push({ id: snap.key, data: data });
            }
        });

        // 2. Identificar horarios fijos
        const idsFijosBrayan = [];
        const todosLosIds = [];
        horariosSnap.forEach((snap) => {
            const h = snap.val();
            todosLosIds.push(snap.key);
            if (h.hora && h.ruta &&
               ((h.hora === "10:00 AM" && h.ruta.includes("La Plata")) ||
                (h.hora === "02:00 PM" && h.ruta.includes("Natagá")))) {
                idsFijosBrayan.push(snap.key);
            }
        });

        // 3. Preparar Rotación
        const asignacionesAyer = conductores.map(c => ({
            id: c.id,
            // Accedemos a c.data.horariosAsignados
            horarios: (c.data.horariosAsignados || []).filter(hId => !idsFijosBrayan.includes(hId))
        }));

        const updates = {};

        // Regla Brayan (Fijo)
        if (brayanId) {
            updates[`conductores/${brayanId}/horariosAsignados`] = idsFijosBrayan;
            idsFijosBrayan.forEach(hId => {
                updates[`horarios/${hId}/conductorId`] = brayanId;
            });
        }

        // Rotación circular para los demás
        const n = asignacionesAyer.length;
        if (n > 0) {
            for (let i = 0; i < n; i++) {
                const idHoy = asignacionesAyer[i].id;
                const idAyer = asignacionesAyer[(i - 1 + n) % n].id;
                const recordAyer = asignacionesAyer.find(a => a.id === idAyer);
                const horariosDeHoy = recordAyer ? recordAyer.horarios : [];

                updates[`conductores/${idHoy}/horariosAsignados`] = horariosDeHoy;
                if (horariosDeHoy) {
                    horariosDeHoy.forEach(hId => {
                        updates[`horarios/${hId}/conductorId`] = idHoy;
                    });
                }
            }
        }

        // Limpieza de horarios que ya no tienen conductor
        todosLosIds.forEach(id => {
            if (!Object.keys(updates).some(k => k.startsWith(`horarios/${id}/conductorId`))) {
                updates[`horarios/${id}/conductorId`] = null;
            }
        });

        // 4. Ejecutar cambios y reiniciar asientos
        await db.ref().update(updates);
        await db.ref('asientos_ocupados').remove();

        console.log('✅ automatedRotation exitosa y asientos reiniciados.');

    } catch (error) {
        console.error('❌ Error crítico en rotación:', error);
    }
});

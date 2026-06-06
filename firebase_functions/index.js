const { onSchedule } = require("firebase-functions/v2/scheduler");
const admin = require("firebase-admin");

admin.initializeApp();

/**
 * 🔄 ROTACIÓN AUTOMÁTICA Y LIMPIEZA DE ASIENTOS
 * Ejecución: Todos los días a las 12:00 PM (Mediodía)
 */
exports.automatedRotation = onSchedule({
    schedule: "0 12 * * *",
    timeZone: "America/Bogota",
    memory: "256MiB"
}, async (event) => {
    const db = admin.database();

    try {
        console.log("🔄 Iniciando ciclo de rotación y limpieza de asientos...");

        // 1. Definición de Bloques (Ida -> Regreso)
        // G9 es el que entra a las 5pm y se devuelve mañana a las 7:30am
        const ROTATING_SHIFTS = [
            ["h009", "h010"], // G9: 5:00 PM -> 07:30 AM (Mañana)
            ["h008", "h018"], // G8: 3:30 PM -> 06:00 PM
            ["h007", "h017"], // G7: 1:00 PM -> 05:00 PM
            ["h006", "h016"], // G6: 11:00 AM -> 03:30 PM
            ["h004", "h014"], // G4: 9:15 AM -> 01:00 PM
            ["h003", "h013"], // G3: 8:30 AM -> 11:45 AM
            ["h002", "h012"], // G2: 7:15 AM -> 10:30 AM
            ["h001", "h011"], // G1: 6:15 AM -> 09:15 AM
            []                // DESCANSO
        ];

        const [conductoresSnap, horariosSnap] = await Promise.all([
            db.ref('conductores').once('value'),
            db.ref('horarios').once('value')
        ]);

        const conductores = [];
        let brayanId = null;

        conductoresSnap.forEach((snap) => {
            const data = snap.val();
            // Excluir a Brayan de la rotación (él es fijo)
            if (data.nombre && data.nombre.trim().toLowerCase().includes("brayan")) {
                brayanId = snap.key;
            } else {
                conductores.push({ id: snap.key, nombre: data.nombre });
            }
        });

        // Ordenar conductores alfabéticamente por ID para rotación constante
        conductores.sort((a, b) => a.id.localeCompare(b.id));

        const updates = {};

        // 2. REGLA BRAYAN (Fijo en 10:00 AM y 02:00 PM)
        if (brayanId) {
            updates[`conductores/${brayanId}/horariosAsignados`] = ["h005", "h015"];
            updates[`horarios/h005/conductorId`] = brayanId;
            updates[`horarios/h015/conductorId`] = brayanId;
        }

        // 3. ROTACIÓN DE CONDUCTORES
        const dayCounter = Math.floor(Date.now() / (24 * 60 * 60 * 1000));

        conductores.forEach((c, index) => {
            const shiftIndex = (index + dayCounter) % ROTATING_SHIFTS.length;
            const misHorarios = ROTATING_SHIFTS[shiftIndex];

            updates[`conductores/${c.id}/horariosAsignados`] = misHorarios;

            misHorarios.forEach(hId => {
                updates[`horarios/${hId}/conductorId`] = c.id;
            });
        });

        // 4. ACTUALIZAR CONDUCTORES Y HORARIOS
        await db.ref().update(updates);

        // 5. LIMPIEZA DE ASIENTOS (Preparar el nuevo ciclo)
        // Reiniciamos todos los horarios en 'disponibilidadAsientos'
        const dispSnap = await db.ref('disponibilidadAsientos').once('value');
        const dispUpdates = {};

        dispSnap.forEach(hSnap => {
            // Ponemos 'asientosOcupados' en null (vacío)
            // y reseteamos el contador a 13
            dispUpdates[`${hSnap.key}/asientosOcupados`] = null;
            dispUpdates[`${hSnap.key}/asientosDisponibles`] = 13;
        });

        await db.ref('disponibilidadAsientos').update(dispUpdates);

        console.log('✅ Rotación y Limpieza completada exitosamente.');

    } catch (error) {
        console.error('❌ Error crítico en la función:', error);
    }
});
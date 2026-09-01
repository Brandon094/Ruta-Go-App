import { ref, push, update } from "firebase/database";
import { db } from "../firebase";

/**
 * 🕒 Service: scheduleService
 * Motor de administración de itinerarios y despachos para el Admin Root.
 */
export const scheduleService = {
  /**
   * Crea un nuevo turno u horario de despacho con disponibilidad inicializada
   */
  createSchedule: async ({ route, time, price = 12000, duration = "60 min", driverId = "", vehicleId = "" }) => {
    try {
      const scheduleRef = push(ref(db, 'schedules'));
      const scheduleId = scheduleRef.key;

      const capacity = 13;
      const scheduleData = {
        id: scheduleId,
        route,
        time,
        price: String(price),
        duration,
        driverId: driverId || "",
        vehicleId: vehicleId || ""
      };

      // 1. Guardar en esquema v2.0 (/schedules y /seatAvailability)
      const primaryUpdates = {};
      primaryUpdates[`schedules/${scheduleId}`] = scheduleData;
      primaryUpdates[`seatAvailability/${scheduleId}`] = {
        availableSeats: capacity,
        totalSeats: capacity
      };

      await update(ref(db), primaryUpdates);

      // 2. Intentar guardar en nodos legados (/horarios y /disponibilidadAsientos)
      try {
        const legacyUpdates = {};
        legacyUpdates[`horarios/${scheduleId}`] = {
          id: scheduleId,
          ruta: route,
          hora: time,
          conductorId: driverId || "",
          vehiculoId: vehicleId || ""
        };
        legacyUpdates[`disponibilidadAsientos/${scheduleId}`] = {
          asientosDisponibles: capacity,
          totalAsientos: capacity
        };
        await update(ref(db), legacyUpdates);
      } catch (legacyErr) {
        console.info("ℹ️ Nodos legados no modificados (restringidos por reglas):", legacyErr.message);
      }

      return { success: true, scheduleId };
    } catch (error) {
      console.error("❌ Error creando horario:", error);
      throw error;
    }
  },

  /**
   * Actualiza un turno u horario de despacho existente
   */
  updateSchedule: async (scheduleId, { route, time, price, duration, driverId, vehicleId }) => {
    try {
      const scheduleData = {
        id: scheduleId,
        route,
        time,
        price: String(price || 12000),
        duration: duration || "60 min",
        driverId: driverId || "",
        vehicleId: vehicleId || ""
      };

      const primaryUpdates = {};
      primaryUpdates[`schedules/${scheduleId}`] = scheduleData;

      await update(ref(db), primaryUpdates);

      // Intentar actualizar nodos legados
      try {
        const legacyUpdates = {};
        legacyUpdates[`horarios/${scheduleId}`] = {
          id: scheduleId,
          ruta: route,
          hora: time,
          conductorId: driverId || "",
          vehiculoId: vehicleId || ""
        };
        await update(ref(db), legacyUpdates);
      } catch (legacyErr) {
        console.info("ℹ️ Nodos legados no modificados:", legacyErr.message);
      }

      return { success: true };
    } catch (error) {
      console.error("❌ Error actualizando horario:", error);
      throw error;
    }
  },

  /**
   * Elimina un horario de despacho de la plataforma
   */
  deleteSchedule: async (scheduleId) => {
    try {
      const primaryUpdates = {};
      primaryUpdates[`schedules/${scheduleId}`] = null;
      primaryUpdates[`seatAvailability/${scheduleId}`] = null;

      await update(ref(db), primaryUpdates);

      try {
        const legacyUpdates = {};
        legacyUpdates[`horarios/${scheduleId}`] = null;
        legacyUpdates[`disponibilidadAsientos/${scheduleId}`] = null;
        await update(ref(db), legacyUpdates);
      } catch (e) {
        // Ignorar restricción en nodos legados
      }

      return { success: true };
    } catch (error) {
      console.error("❌ Error eliminando horario:", error);
      throw error;
    }
  }
};

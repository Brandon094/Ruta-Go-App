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

      const updates = {};
      // 1. Guardar en schedules y horarios
      updates[`schedules/${scheduleId}`] = scheduleData;
      updates[`horarios/${scheduleId}`] = {
        id: scheduleId,
        ruta: route,
        hora: time,
        conductorId: driverId || "",
        vehiculoId: vehicleId || ""
      };

      // 2. Inicializar cupos de asientos
      updates[`seatAvailability/${scheduleId}`] = {
        availableSeats: capacity,
        totalSeats: capacity
      };
      updates[`disponibilidadAsientos/${scheduleId}`] = {
        asientosDisponibles: capacity,
        totalAsientos: capacity
      };

      await update(ref(db), updates);
      return { success: true, scheduleId };
    } catch (error) {
      console.error("❌ Error creando horario:", error);
      throw error;
    }
  },

  /**
   * Elimina un horario de despacho de la plataforma
   */
  deleteSchedule: async (scheduleId) => {
    try {
      const updates = {};
      updates[`schedules/${scheduleId}`] = null;
      updates[`horarios/${scheduleId}`] = null;
      updates[`seatAvailability/${scheduleId}`] = null;
      updates[`disponibilidadAsientos/${scheduleId}`] = null;

      await update(ref(db), updates);
      return { success: true };
    } catch (error) {
      console.error("❌ Error eliminando horario:", error);
      throw error;
    }
  }
};

import { ref, update, get, serverTimestamp, increment, push } from "firebase/database";
import { db } from "../firebase";

/**
 * 🎫 Service: reservationService
 * Maneja la lógica de confirmación, cancelación y liberación de asientos.
 */
export const reservationService = {
  /**
   * Crea una nueva reserva oficial en la base de datos (Motor de Reservas Web v1.6.0).
   */
  createReservation: async (reservationData, scheduleId, seatNumber) => {
    const updates = {};
    const resRef = push(ref(db, 'reservas'));
    const finalData = { ...reservationData, idReservation: resRef.key };

    // 1. Registro del tiquete
    updates[`reservas/${resRef.key}`] = finalData;

    // 2. Bloqueo físico del asiento
    updates[`disponibilidadAsientos/${scheduleId}/asientosOcupados/${seatNumber}`] = true;
    updates[`disponibilidadAsientos/${scheduleId}/asientosDisponibles`] = increment(-1);

    try {
      await update(ref(db), updates);
      return { success: true, id: resRef.key };
    } catch (error) {
      console.error("Error creando reserva:", error);
      throw error;
    }
  },

  /**
   * Confirma una reserva y actualiza las estadísticas del conductor.
   */
  confirmReservation: async (reservationId, driverId, price) => {
    const today = new Date().toISOString().split('T')[0];
    const updates = {};

    // 1. Cambiar estado de la reserva
    updates[`reservas/${reservationId}/estadoReserva`] = 'Confirmada';
    updates[`reservas/${reservationId}/reservationStatus`] = 'Confirmada';
    updates[`reservas/${reservationId}/ultimaActualizacion`] = Date.now();

    // 2. Incrementar estadísticas diarias del conductor
    updates[`estadisticas/${driverId}/${today}/ingresosDiarios`] = increment(Number(price || 0));
    updates[`estadisticas/${driverId}/${today}/reservasConfirmadas`] = increment(1);
    updates[`estadisticas/${driverId}/${today}/ultimaActualizacion`] = serverTimestamp();

    try {
      await update(ref(db), updates);
      return { success: true };
    } catch (error) {
      console.error("Error confirmando reserva:", error);
      throw error;
    }
  },

  /**
   * Cancela una reserva y libera el asiento automáticamente.
   */
  cancelReservation: async (reservationId, scheduleId, seatNumber) => {
    const updates = {};

    // 1. Cambiar estado de la reserva
    updates[`reservas/${reservationId}/estadoReserva`] = 'Cancelada';
    updates[`reservas/${reservationId}/reservationStatus`] = 'Cancelada';
    updates[`reservas/${reservationId}/ultimaActualizacion`] = Date.now();

    // 2. Liberar el asiento en el nodo de disponibilidad
    if (scheduleId && seatNumber !== undefined) {
      updates[`disponibilidadAsientos/${scheduleId}/asientosOcupados/${seatNumber}`] = false;

      // 3. Incrementar el contador de asientos disponibles (atómico)
      updates[`disponibilidadAsientos/${scheduleId}/asientosDisponibles`] = increment(1);
    }

    try {
      await update(ref(db), updates);
      return { success: true };
    } catch (error) {
      console.error("Error cancelando reserva:", error);
      throw error;
    }
  }
};

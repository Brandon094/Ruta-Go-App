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
    const resRef = push(ref(db, 'reservas'));
    const finalData = { ...reservationData, idReservation: resRef.key };

    const updates = {};
    updates[`reservas/${resRef.key}`] = finalData;

    try {
      // 1. Registro del tiquete
      await update(ref(db), updates);

      // 2. Bloqueo físico del asiento con transacción para mantener integridad del contador
      const dispRef = ref(db, `disponibilidadAsientos/${scheduleId}`);
      await runTransaction(dispRef, (current) => {
        if (!current) return current;
        if (!current.asientosOcupados) current.asientosOcupados = {};

        const idx = parseInt(seatNumber);
        if (Array.isArray(current.asientosOcupados)) {
          current.asientosOcupados[idx] = true;
        } else {
          current.asientosOcupados[seatNumber] = true;
        }

        const disp = current.asientosDisponibles || 0;
        current.asientosDisponibles = Math.max(0, disp - 1);
        return current;
      });

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

    // 1. Cambiar estado de la reserva (Soporte dual de keys)
    updates[`reservas/${reservationId}/estadoReserva`] = 'Confirmada';
    updates[`reservas/${reservationId}/reservationStatus`] = 'Confirmada';
    updates[`reservas/${reservationId}/ultimaActualizacion`] = Date.now();

    // 2. Incrementar estadísticas diarias del conductor (Atómico)
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
   * Cancela una reserva y libera el asiento automáticamente (Fix: Sync de contador).
   */
  cancelReservation: async (reservationId, scheduleId, seatNumber) => {
    const updates = {};

    // 1. Cambiar estado de la reserva
    updates[`reservas/${reservationId}/estadoReserva`] = 'Cancelada';
    updates[`reservas/${reservationId}/reservationStatus`] = 'Cancelada';
    updates[`reservas/${reservationId}/ultimaActualizacion`] = Date.now();

    try {
      // 1. Marcar cancelación en el tiquete
      await update(ref(db), updates);

      // 2. Liberación atómica del asiento
      if (scheduleId && seatNumber !== undefined) {
        const dispRef = ref(db, `disponibilidadAsientos/${scheduleId}`);
        await runTransaction(dispRef, (current) => {
          if (!current) return current;
          if (!current.asientosOcupados) return current;

          const idx = parseInt(seatNumber);
          const isOccupied = Array.isArray(current.asientosOcupados)
            ? current.asientosOcupados[idx] === true
            : current.asientosOcupados[seatNumber] === true;

          // Solo liberar si realmente estaba ocupado para evitar conteos falsos
          if (isOccupied) {
            if (Array.isArray(current.asientosOcupados)) {
              current.asientosOcupados[idx] = false;
            } else {
              current.asientosOcupados[seatNumber] = false;
            }
            current.asientosDisponibles = (current.asientosDisponibles || 0) + 1;
          }

          return current;
        });
      }

      return { success: true };
    } catch (error) {
      console.error("Error cancelando reserva:", error);
      throw error;
    }
  }
};

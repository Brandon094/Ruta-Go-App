import { ref, update, get, serverTimestamp, increment, push, runTransaction } from "firebase/database";
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
    try {
      const resRef = push(ref(db, 'reservas'));
      const finalData = { ...reservationData, idReservation: resRef.key };

      const updates = {};
      updates[`reservas/${resRef.key}`] = finalData;

      // 1. Registro del tiquete
      await update(ref(db), updates);

      // 2. Bloqueo físico del asiento con transacción auto-sanadora
      const dispRef = ref(db, `disponibilidadAsientos/${scheduleId}`);
      await runTransaction(dispRef, (current) => {
        if (!current) return current;
        if (!current.asientosOcupados) current.asientosOcupados = {};

        const idx = parseInt(seatNumber);

        // Marcar asiento como ocupado
        if (Array.isArray(current.asientosOcupados)) {
          current.asientosOcupados[idx] = true;
        } else {
          current.asientosOcupados[seatNumber] = true;
        }

        // RECALCULAR DISPONIBLES (Auto-sanación de contador)
        const total = current.totalAsientos || 13;
        const occupiedCount = Object.values(current.asientosOcupados).filter(v => v === true).length;
        current.asientosDisponibles = Math.max(0, total - occupiedCount);

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
   * Cancela una reserva y libera el asiento automáticamente (Fix: Sincronización Total).
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

      // 2. Liberación atómica del asiento con re-conteo
      if (scheduleId && seatNumber !== undefined) {
        const dispRef = ref(db, `disponibilidadAsientos/${scheduleId}`);
        await runTransaction(dispRef, (current) => {
          if (!current) return current;
          if (!current.asientosOcupados) return current;

          const idx = parseInt(seatNumber);

          // Liberar el asiento
          if (Array.isArray(current.asientosOcupados)) {
            current.asientosOcupados[idx] = false;
          } else {
            current.asientosOcupados[seatNumber] = false;
          }

          // RECALCULAR DISPONIBLES (Garantiza integridad del dashboard)
          const total = current.totalAsientos || 13;
          const occupiedCount = Object.values(current.asientosOcupados).filter(v => v === true).length;
          current.asientosDisponibles = Math.max(0, total - occupiedCount);

          return current;
        });
      }

      return { success: true };
    } catch (error) {
      console.error("Error cancelando reserva:", error);
      throw error;
    }
  },

  /**
   * Registra una nueva calificación para un viaje finalizado (Mirror RatingManager.java).
   */
  rateReservation: async (reservation, stars, comment) => {
    if (!reservation?.driverId) throw new Error("Datos de reserva inválidos para calificar.");

    const driverId = reservation.driverId;
    const ratingRef = push(ref(db, `calificaciones_conductores/${driverId}`));

    const ratingData = {
      id: ratingRef.key,
      userId: reservation.userId,
      userName: reservation.name || "Usuario Web",
      driverId: driverId,
      reservationId: reservation.idReservation || reservation.id,
      routeName: reservation.ruta || `${reservation.origin} ➔ ${reservation.destination}`,
      rating: stars,
      comment: comment,
      timestamp: serverTimestamp()
    };

    const updates = {};
    // 1. Guardar en el nodo de reputación del conductor
    updates[`calificaciones_conductores/${driverId}/${ratingRef.key}`] = ratingData;

    // 2. Marcar reserva como calificada (Dual keys para paridad)
    const resPath = `reservas/${reservation.idReservation || reservation.id}`;
    updates[`${resPath}/rated`] = true;
    updates[`${resPath}/calificada`] = true;
    updates[`${resPath}/rating`] = stars;
    updates[`${resPath}/calificacion`] = stars;

    try {
      await update(ref(db), updates);
      return { success: true };
    } catch (error) {
      console.error("Error calificando viaje:", error);
      throw error;
    }
  }
};

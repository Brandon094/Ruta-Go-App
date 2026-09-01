import { ref, update, get, serverTimestamp, increment, push, runTransaction } from "firebase/database";
import { db } from "../firebase";

/**
 * 🎫 Service: reservationService (v2.0 Clean English Schema)
 * Maneja la lógica de confirmación, cancelación y liberación de asientos.
 */
export const reservationService = {
  /**
   * Crea una nueva reserva oficial en /reservations/ y actualiza /seatAvailability/
   */
  createReservation: async (reservationData, scheduleId, seatNumber) => {
    try {
      const uuid = crypto.randomUUID();
      const finalData = {
        id: uuid,
        userId: reservationData.userId || "",
        passengerName: reservationData.passengerName || reservationData.name || "",
        passengerPhone: reservationData.passengerPhone || reservationData.phone || "",
        driverId: reservationData.driverId || "",
        driverName: reservationData.driverName || reservationData.driver || "",
        scheduleId: scheduleId,
        origin: reservationData.origin || "",
        destination: reservationData.destination || "",
        departureTime: reservationData.departureTime || reservationData.time || "",
        estimatedDuration: reservationData.estimatedDuration || "60 min",
        status: "pending",
        reservedSeat: Number(seatNumber),
        price: Number(reservationData.price || 12000),
        reservationDate: Date.now(),
        isRated: false,
        rating: 0,
        vehiclePlate: reservationData.vehiclePlate || "",
        vehicleModel: reservationData.vehicleModel || "",
        paymentMethod: reservationData.paymentMethod || "efectivo"
      };

      const updates = {};
      updates[`reservations/${uuid}`] = finalData;

      // 1. Registro del tiquete
      await update(ref(db), updates);

      // 2. Bloqueo físico del asiento en /seatAvailability/
      const dispRef = ref(db, `seatAvailability/${scheduleId}`);
      await runTransaction(dispRef, (current) => {
        if (!current) return current;
        if (!current.occupiedSeats) current.occupiedSeats = {};

        const idx = parseInt(seatNumber);

        if (Array.isArray(current.occupiedSeats)) {
          current.occupiedSeats[idx] = true;
        } else {
          current.occupiedSeats[seatNumber] = true;
        }

        const total = current.totalSeats || 13;
        const occupiedCount = Object.values(current.occupiedSeats).filter(v => v === true).length;
        current.availableSeats = Math.max(0, total - occupiedCount);

        return current;
      });

      return { success: true, id: uuid };
    } catch (error) {
      console.error("Error creando reserva:", error);
      throw error;
    }
  },

  /**
   * Confirma una reserva y actualiza las estadísticas del conductor en /stats/
   */
  confirmReservation: async (reservationId, driverId, price) => {
    const today = new Date().toISOString().split('T')[0];
    const updates = {};

    // 1. Cambiar estado de la reserva
    updates[`reservations/${reservationId}/status`] = 'confirmed';
    updates[`reservations/${reservationId}/lastUpdate`] = Date.now();

    // 2. Incrementar estadísticas diarias en /stats/
    if (driverId) {
      updates[`stats/${driverId}/${today}/dailyRevenue`] = increment(Number(price || 0));
      updates[`stats/${driverId}/${today}/confirmedReservations`] = increment(1);
      updates[`stats/${driverId}/${today}/lastUpdate`] = serverTimestamp();
    }

    try {
      await update(ref(db), updates);
      return { success: true };
    } catch (error) {
      console.error("Error confirmando reserva:", error);
      throw error;
    }
  },

  /**
   * Cancela una reserva y libera el asiento en /seatAvailability/
   */
  cancelReservation: async (reservationId, scheduleId, seatNumber) => {
    const updates = {};

    // 1. Cambiar estado de la reserva
    updates[`reservations/${reservationId}/status`] = 'cancelled';
    updates[`reservations/${reservationId}/lastUpdate`] = Date.now();

    try {
      await update(ref(db), updates);

      if (scheduleId && seatNumber !== undefined) {
        const dispRef = ref(db, `seatAvailability/${scheduleId}`);
        await runTransaction(dispRef, (current) => {
          if (!current) return current;
          if (!current.occupiedSeats) return current;

          const idx = parseInt(seatNumber);

          if (Array.isArray(current.occupiedSeats)) {
            current.occupiedSeats[idx] = false;
          } else {
            current.occupiedSeats[seatNumber] = false;
          }

          const total = current.totalSeats || 13;
          const occupiedCount = Object.values(current.occupiedSeats).filter(v => v === true).length;
          current.availableSeats = Math.max(0, total - occupiedCount);

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
   * Registra una nueva calificación en /driverRatings/
   */
  rateReservation: async (reservation, stars, comment) => {
    if (!reservation?.driverId) throw new Error("Datos de reserva inválidos para calificar.");

    const driverId = reservation.driverId;
    const ratingRef = push(ref(db, `driverRatings/${driverId}`));

    const ratingData = {
      id: ratingRef.key,
      passengerId: reservation.userId,
      passengerName: reservation.passengerName || reservation.name || "Usuario Web",
      driverId: driverId,
      reservationId: reservation.id,
      route: reservation.route || `${reservation.origin} -> ${reservation.destination}`,
      rating: stars,
      comment: comment,
      date: Date.now()
    };

    const updates = {};
    updates[`driverRatings/${driverId}/${ratingRef.key}`] = ratingData;

    const resPath = `reservations/${reservation.id}`;
    updates[`${resPath}/isRated`] = true;
    updates[`${resPath}/rating`] = stars;

    try {
      await update(ref(db), updates);
      return { success: true };
    } catch (error) {
      console.error("Error calificando viaje:", error);
      throw error;
    }
  }
};

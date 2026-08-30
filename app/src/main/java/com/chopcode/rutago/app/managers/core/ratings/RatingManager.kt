package com.chopcode.rutago.app.managers.core.ratings

import android.util.Log
import com.chopcode.rutago.app.config.MyApp
import com.chopcode.rutago.app.models.Rating
import com.chopcode.rutago.app.models.Reservation
import com.google.firebase.database.DatabaseReference

/**
 * ⭐ Rating Manager (Singleton)
 * Responsable de la gestión del feedback y reputación de los conductores.
 * Normalizado a Inglés con soporte legacy.
 */
class RatingManager private constructor() {

    private val ratingsRef: DatabaseReference = MyApp.getDatabaseReference("calificaciones_conductores")
    private val reservesRef: DatabaseReference = MyApp.getDatabaseReference("reservas")

    companion object {
        @Volatile
        private var instance: RatingManager? = null

        fun getInstance(): RatingManager {
            return instance ?: synchronized(this) {
                instance ?: RatingManager().also { instance = it }
            }
        }
    }

    interface RatingCallback {
        fun onSuccess()
        fun onError(error: String?)
    }

    /**
     * Registra una nueva calificación para un viaje finalizado.
     */
    fun calificarViaje(reservation: Reservation, stars: Float, comment: String, callback: RatingCallback?) {
        val driverId = reservation.driverId.ifEmpty { return }
        val userId = MyApp.getCurrentUserId() ?: return

        val rating = Rating(
            userId,
            reservation.passengerName,
            driverId,
            reservation.id,
            reservation.origin + " → " + reservation.destination,
            stars,
            comment
        )

        val ref = ratingsRef.child(driverId).push()
        rating.id = ref.key

        ref.setValue(rating).addOnSuccessListener {
            markAsRated(reservation.id, stars, callback)
        }.addOnFailureListener { e ->
            callback?.onError(e.message)
        }
    }

    private fun markAsRated(reservationId: String, stars: Float, callback: RatingCallback?) {
        val updates = mapOf(
            "isRated" to true,
            "rated" to true, // Legacy
            "calificada" to true, // Legacy
            "rating" to stars,
            "calificacion" to stars // Legacy
        )

        reservesRef.child(reservationId).updateChildren(updates)
            .addOnSuccessListener { callback?.onSuccess() }
            .addOnFailureListener { e ->
                Log.e("RatingManager", "❌ Error al marcar reserva: ${e.message}")
                callback?.onError("No se pudo actualizar el estado de la reserva.")
            }
    }
}

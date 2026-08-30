package com.chopcode.rutago.app.services.reservations.common

import android.content.Context
import android.util.Log
import android.widget.Toast
import com.chopcode.rutago.app.R
import com.chopcode.rutago.app.config.MyApp
import com.chopcode.rutago.app.engines.seats.SeatDataProcessor
import com.chopcode.rutago.app.models.Reservation
import com.google.firebase.database.*
import java.util.*

/**
 * 🛰️ SERVICE: ReservationService (Kotlin)
 * Motor transaccional para la gestión del ciclo de vida de los pasajes.
 * Normalizado a Inglés con soporte legacy.
 */
class ReservationService {

    private val db: DatabaseReference = MyApp.getDatabaseReference("")
    private val seatsProcessor = SeatDataProcessor()

    interface ReservationCallback {
        fun onSuccess()
        fun onError(error: String?)
    }

    interface HistoryCallback {
        fun onHistoryLoaded(reservations: List<Reservation>?)
        fun onError(error: String?)
    }

    /**
     * Registra una nueva reserva con integridad transaccional.
     */
    fun createReservation(
        context: Context?,
        reservation: Reservation,
        callback: ReservationCallback
    ) {
        val resId = if (reservation.id.isEmpty()) UUID.randomUUID().toString() else reservation.id
        reservation.id = resId
        reservation.reservationDate = System.currentTimeMillis()

        // 🛡️ Doble escritura para normalización (Inglés + Legacy)
        val ref = db.child("reservas").child(resId)
        
        // Bloqueo físico del asiento primero
        seatsProcessor.reserveSeat(reservation.scheduleId, reservation.reservedSeat, object : SeatDataProcessor.SeatReservationCallback {
            override fun onSuccess() {
                ref.setValue(reservation).addOnSuccessListener {
                    context?.let { Toast.makeText(it, R.string.reserva_exitosa, Toast.LENGTH_SHORT).show() }
                    callback.onSuccess()
                }.addOnFailureListener { e ->
                    // Rollback si falla la escritura
                    seatsProcessor.freeSeat(reservation.scheduleId, reservation.reservedSeat, null)
                    callback.onError(e.message)
                }
            }

            override fun onError(error: String?) {
                callback.onError(error)
            }
        })
    }

    /**
     * Escucha el historial de un pasajero en tiempo real.
     */
    fun listenPassengerHistory(userId: String, callback: HistoryCallback): ValueEventListener {
        val query = db.child("reservas").orderByChild("userId").equalTo(userId).limitToLast(100)
        
        val listener = object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                val list = mutableListOf<Reservation>()
                for (ds in snapshot.children) {
                    val r = ds.getValue(Reservation::class.java)
                    if (r != null) {
                        if (r.id.isEmpty()) r.id = ds.key ?: ""
                        list.add(r)
                    }
                }
                list.sortByDescending { it.reservationDate }
                callback.onHistoryLoaded(list)
            }

            override fun onCancelled(error: DatabaseError) {
                callback.onError(error.message)
            }
        }
        
        query.addValueEventListener(listener)
        return listener
    }

    /**
     * Recupera una reserva única por ID.
     */
    fun getReservationById(reservationId: String, callback: HistoryCallback) {
        db.child("reservas").child(reservationId).addListenerForSingleValueEvent(object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                val r = snapshot.getValue(Reservation::class.java)
                if (r != null) {
                    if (r.id.isEmpty()) r.id = snapshot.key ?: ""
                    callback.onHistoryLoaded(listOf(r))
                } else {
                    callback.onError("Reserva no encontrada")
                }
            }

            override fun onCancelled(error: DatabaseError) {
                callback.onError(error.message)
            }
        })
    }
}

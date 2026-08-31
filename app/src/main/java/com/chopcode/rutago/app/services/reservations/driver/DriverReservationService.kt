package com.chopcode.rutago.app.services.reservations.driver

import android.content.Context
import com.chopcode.rutago.app.config.MyApp
import com.chopcode.rutago.app.data.models.Reservation
import com.google.firebase.database.*
import java.text.SimpleDateFormat
import java.util.*

/**
 * 🛰️ SERVICE: DriverReservationService (Kotlin)
 * Gestión logística desde la perspectiva del conductor.
 */
class DriverReservationService {

    private val db: DatabaseReference = MyApp.getDatabaseReference("")

    // =========================================================================
    // 🌍 INTERFACES (Compatibility Bridge)
    // =========================================================================

    interface ReservationUpdateCallback {
        fun onSuccess()
        fun onError(error: String?)
    }

    interface RealTimeStatsListener {
        fun onStatsUpdated(stats: CompleteDriverStats)
        fun onError(error: String?)
    }

    interface CompleteStatsCallback {
        fun onCompleteStatsLoaded(stats: CompleteDriverStats)
        fun onError(error: String?)
    }

    interface ReservationsCallback {
        fun onReservationsLoaded(reservations: List<Reservation>)
        fun onError(error: String?)
    }

    data class CompleteDriverStats(
        var confirmedReservations: Int = 0,
        var pendingReservations: Int = 0,
        var totalEarnings: Double = 0.0,
        var pendingReservationsList: List<Reservation> = emptyList(),
        var allReservations: List<Reservation> = emptyList()
    )

    // =========================================================================
    // 🛠️ MÉTODOS CORE
    // =========================================================================

    /**
     * Escucha las estadísticas del conductor y reservas pendientes en tiempo real.
     */
    fun listenDriverStats(driverId: String, schedules: List<String>, listener: RealTimeStatsListener): ValueEventListener {
        val query = db.child("reservas").orderByChild("driverId").equalTo(driverId).limitToLast(100)
        
        val valueListener = object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                val stats = CompleteDriverStats()
                val pendingList = mutableListOf<Reservation>()
                val allList = mutableListOf<Reservation>()
                
                for (ds in snapshot.children) {
                    val r = ds.getValue(Reservation::class.java)
                    if (r != null) {
                        if (r.id.isEmpty()) r.id = ds.key ?: ""
                        
                        val isFromDriver = (r.driverId == driverId) || (schedules.contains(r.scheduleId))
                        
                        if (isFromDriver) {
                            allList.add(r)
                            val status = r.status.lowercase()
                            when {
                                status.contains("confirmad") -> {
                                    stats.confirmedReservations++
                                    stats.totalEarnings += r.price
                                }
                                status.contains("confirmar") || status == "pending" -> {
                                    stats.pendingReservations++
                                    pendingList.add(r)
                                }
                            }
                        }
                    }
                }
                
                pendingList.sortByDescending { it.reservationDate }
                allList.sortByDescending { it.reservationDate }
                stats.pendingReservationsList = pendingList
                stats.allReservations = allList
                listener.onStatsUpdated(stats)
            }

            override fun onCancelled(error: DatabaseError) {
                listener.onError(error.message)
            }
        }
        
        query.addValueEventListener(valueListener)
        return valueListener
    }

    /**
     * Carga reservas filtradas (Legacy implementation).
     */
    fun cargarReservasConductorFiltradas(
        driverIdentifier: String,
        assignedSchedules: List<String>?,
        statusFilter: String?,
        isUID: Boolean,
        callback: ReservationsCallback
    ) {
        db.child("reservas").addListenerForSingleValueEvent(object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                val list = mutableListOf<Reservation>()
                for (ds in snapshot.children) {
                    val r = ds.getValue(Reservation::class.java)
                    if (r != null) {
                        if (r.id.isEmpty()) r.id = ds.key ?: ""
                        
                        val dId = if (isUID) r.driverId else r.driverName
                        val isFromDriver = if (isUID) {
                            (dId == driverIdentifier) || (assignedSchedules?.contains(r.scheduleId) == true)
                        } else {
                            dId.equals(driverIdentifier, true)
                        }

                        val statusMatches = statusFilter == null || statusFilter == "TODAS" || 
                                           r.status.equals(statusFilter, true)

                        if (isFromDriver && statusMatches) list.add(r)
                    }
                }
                list.sortByDescending { it.reservationDate }
                callback.onReservationsLoaded(list)
            }

            override fun onCancelled(error: DatabaseError) {
                callback.onError(error.message)
            }
        })
    }

    /**
     * Obtiene estadísticas avanzadas por rango de fecha (Premium).
     */
    fun getAdvancedStats(driverId: String, start: Long, end: Long, callback: CompleteStatsCallback) {
        db.child("reservas").orderByChild("driverId").equalTo(driverId)
            .addListenerForSingleValueEvent(object : ValueEventListener {
                override fun onDataChange(snapshot: DataSnapshot) {
                    val stats = CompleteDriverStats()
                    val all = mutableListOf<Reservation>()
                    for (ds in snapshot.children) {
                        val r = ds.getValue(Reservation::class.java)
                        if (r != null) {
                            if (r.id.isEmpty()) r.id = ds.key ?: ""
                            if (r.reservationDate in start..end) {
                                all.add(r)
                                val status = r.status.lowercase()
                                if (status.contains("confirmad")) {
                                    stats.confirmedReservations++
                                    stats.totalEarnings += r.price
                                }
                            }
                        }
                    }
                    all.sortByDescending { it.reservationDate }
                    stats.allReservations = all
                    callback.onCompleteStatsLoaded(stats)
                }

                override fun onCancelled(error: DatabaseError) {
                    callback.onError(error.message)
                }
            })
    }

    /**
     * Actualiza el estado de una reserva (Soporte para Java).
     */
    fun actualizarEstadoReserva(context: Context?, reservationId: String, newStatus: String, callback: ReservationUpdateCallback) {
        updateReservationStatus(reservationId, newStatus, callback)
    }

    /**
     * Actualiza el estado de una reserva (Core).
     */
    fun updateReservationStatus(reservationId: String, newStatus: String, callback: ReservationUpdateCallback) {
        val updates = mapOf(
            "status" to newStatus,
            "reservationStatus" to newStatus,
            "estadoReserva" to newStatus
        )
        
        db.child("reservas").child(reservationId).updateChildren(updates)
            .addOnSuccessListener { callback.onSuccess() }
            .addOnFailureListener { e -> callback.onError(e.message) }
    }

    /**
     * Cancela reserva y libera asiento (Soporte para Java).
     */
    fun cancelarReservaConLiberacion(context: Context?, reservationId: String, scheduleId: String, seatNumber: Int, callback: ReservationUpdateCallback) {
        cancelReservationWithRelease(scheduleId, seatNumber, reservationId, callback)
    }

    /**
     * Cancela reserva y libera asiento (Core).
     */
    fun cancelReservationWithRelease(scheduleId: String, seatNumber: Int, reservationId: String, callback: ReservationUpdateCallback) {
        updateReservationStatus(reservationId, "Cancelada", object : ReservationUpdateCallback {
            override fun onSuccess() {
                db.child("disponibilidadAsientos").child(scheduleId).child("asientosOcupados").child(seatNumber.toString())
                    .setValue(false).addOnSuccessListener {
                        updateAvailableCounter(scheduleId, 1, callback)
                    }.addOnFailureListener { e -> callback.onError(e.message) }
            }
            override fun onError(error: String?) { callback.onError(error) }
        })
    }

    /**
     * Registra una venta manual en las estadísticas diarias.
     */
    fun registerManualSale(driverId: String, price: Double) {
        val today = SimpleDateFormat("yyyy-MM-dd", Locale.getDefault()).format(Date())
        val ref = db.child("estadisticas").child(driverId).child(today)
        
        val updates = mapOf(
            "ingresosDiarios" to ServerValue.increment(price),
            "reservasConfirmadas" to ServerValue.increment(1),
            "ultimaActualizacion" to ServerValue.TIMESTAMP
        )
        ref.updateChildren(updates)
    }

    /**
     * Revierte una venta manual.
     */
    fun removeManualSale(driverId: String, price: Double) {
        val today = SimpleDateFormat("yyyy-MM-dd", Locale.getDefault()).format(Date())
        val ref = db.child("estadisticas").child(driverId).child(today)
        
        val updates = mapOf(
            "ingresosDiarios" to ServerValue.increment(-price),
            "reservasConfirmadas" to ServerValue.increment(-1),
            "ultimaActualizacion" to ServerValue.TIMESTAMP
        )
        ref.updateChildren(updates)
    }

    private fun updateAvailableCounter(scheduleId: String, delta: Int, callback: ReservationUpdateCallback) {
        val ref = db.child("disponibilidadAsientos").child(scheduleId).child("asientosDisponibles")
        ref.runTransaction(object : Transaction.Handler {
            override fun doTransaction(data: MutableData): Transaction.Result {
                val current = data.getValue(Int::class.java) ?: 0
                data.value = current + delta
                return Transaction.success(data)
            }
            override fun onComplete(error: DatabaseError?, committed: Boolean, snapshot: DataSnapshot?) {
                if (committed) callback.onSuccess() else callback.onError(error?.message)
            }
        })
    }
}

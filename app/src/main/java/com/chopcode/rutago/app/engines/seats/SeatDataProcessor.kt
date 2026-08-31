package com.chopcode.rutago.app.engines.seats

import android.util.Log
import com.chopcode.rutago.app.config.MyApp
import com.google.firebase.database.DataSnapshot
import com.google.firebase.database.DatabaseError
import com.google.firebase.database.DatabaseReference
import com.google.firebase.database.MutableData
import com.google.firebase.database.Transaction
import com.google.firebase.database.ValueEventListener

/**
 * 🛰️ Seat Data Processor (Seat Engine Core)
 *
 * Motor de bajo nivel encargado de la integridad transaccional del inventario de asientos.
 * Responsabilidades:
 * - Ejecutar reservas atómicas mediante runTransaction() para evitar condiciones de carrera.
 * - Sincronizar dinámicamente la capacidad de los vehículos con los despachos programados.
 * - Implementar lógica de recuperación y reparación de estructuras de datos NoSQL.
 * - Proveer flujos de validación de disponibilidad en tiempo real.
 */
class SeatDataProcessor {

    private val databaseReference: DatabaseReference = MyApp.getDatabaseReference("")

    init {
        Log.d(TAG, "🚀 SeatDataProcessor inicializado")
    }

    interface SeatsDataCallback {
        fun onSeatsDataLoaded(occupiedSeats: Set<Int>, availableSeats: Int)
        fun onError(error: String?)
    }

    interface SeatAvailabilityCallback {
        fun onSeatAvailable(available: Boolean)
        fun onError(error: String?)
    }

    interface SeatReservationCallback {
        fun onSuccess()
        fun onError(error: String?)
    }

    /**
     * Carga el estado actual de ocupación para un despacho específico.
     * @param horarioId Identificador del turno a consultar.
     */
    fun loadSeatsDataForSchedule(horarioId: String, callback: SeatsDataCallback?) {
        val scheduleRef = databaseReference.child("disponibilidadAsientos").child(horarioId)

        scheduleRef.addListenerForSingleValueEvent(object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                if (!snapshot.exists()) {
                    callback?.onSeatsDataLoaded(HashSet(), 13)
                    return
                }

                try {
                    val occupiedSeats = HashSet<Int>()
                    val occupiedSnapshot = snapshot.child("asientosOcupados")

                    if (occupiedSnapshot.exists()) {
                        for (seatSnapshot in occupiedSnapshot.children) {
                            try {
                                val seatKey = seatSnapshot.key
                                val isOccupied = seatSnapshot.getValue(Boolean::class.java)
                                if (seatKey != null && isOccupied == true) {
                                    occupiedSeats.add(seatKey.toInt())
                                }
                            } catch (ignored: Exception) {}
                        }
                    }

                    var availableSeats = 0
                    val availableSnapshot = snapshot.child("asientosDisponibles")
                    if (availableSnapshot.exists()) {
                        val available = availableSnapshot.getValue(Int::class.java)
                        availableSeats = available ?: 0
                    }

                    callback?.onSeatsDataLoaded(occupiedSeats, availableSeats)
                } catch (e: Exception) {
                    callback?.onError("Error al procesar datos de asientos: ${e.message}")
                }
            }

            override fun onCancelled(error: DatabaseError) {
                callback?.onError(error.message)
            }
        })
    }

    /**
     * Consulta rápida de disponibilidad para un asiento individual.
     */
    fun checkSeatAvailability(horarioId: String, seatNumber: Int, callback: SeatAvailabilityCallback?) {
        val seatRef = databaseReference.child("disponibilidadAsientos").child(horarioId)
            .child("asientosOcupados").child(seatNumber.toString())

        seatRef.addListenerForSingleValueEvent(object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                val isOccupied = snapshot.exists() && snapshot.getValue(Boolean::class.java) == true
                callback?.onSeatAvailable(!isOccupied)
            }

            override fun onCancelled(error: DatabaseError) {
                callback?.onError(error.message)
            }
        })
    }

    /**
     * 🛡️ Reserva un asiento de forma atómica.
     * Utiliza runTransaction() para garantizar que el decremento de disponibilidad y el marcado 
     * de ocupación ocurran como una única operación indivisible en el servidor.
     */
    fun reserveSeat(horarioId: String, seatNumber: Int, callback: SeatReservationCallback?) {
        val scheduleRef = databaseReference.child("disponibilidadAsientos").child(horarioId)

        scheduleRef.runTransaction(object : Transaction.Handler {
            override fun doTransaction(currentData: MutableData): Transaction.Result {
                val occupiedRef = currentData.child("asientosOcupados").child(seatNumber.toString())

                if (occupiedRef.getValue(Boolean::class.java) == true) {
                    return Transaction.abort()
                }

                occupiedRef.value = true

                val available = currentData.child("asientosDisponibles").getValue(Int::class.java)
                if (available != null) {
                    currentData.child("asientosDisponibles").value = Math.max(0, available - 1)
                }

                return Transaction.success(currentData)
            }

            override fun onComplete(error: DatabaseError?, committed: Boolean, currentData: DataSnapshot?) {
                if (committed) {
                    Log.d(TAG, "✅ Asiento $seatNumber reservado con éxito")
                    callback?.onSuccess()
                } else {
                    val errorMsg = error?.message ?: "El asiento fue ocupado por otro usuario."
                    callback?.onError(errorMsg)
                }
            }
        })
    }

    /**
     * 🛡️ Libera un asiento de forma atómica.
     * Incrementa la disponibilidad técnica y remueve la marca de ocupación.
     */
    fun freeSeat(horarioId: String, seatNumber: Int, callback: SeatReservationCallback?) {
        val scheduleRef = databaseReference.child("disponibilidadAsientos").child(horarioId)

        scheduleRef.runTransaction(object : Transaction.Handler {
            override fun doTransaction(currentData: MutableData): Transaction.Result {
                val occupiedRef = currentData.child("asientosOcupados").child(seatNumber.toString())
                if (occupiedRef.getValue(Boolean::class.java) != true) {
                    return Transaction.success(currentData)
                }

                occupiedRef.value = false

                val available = currentData.child("asientosDisponibles").getValue(Int::class.java)
                var total = currentData.child("totalAsientos").getValue(Int::class.java)
                if (total == null) total = 13

                if (available != null && available < total) {
                    currentData.child("asientosDisponibles").value = available + 1
                }

                return Transaction.success(currentData)
            }

            override fun onComplete(error: DatabaseError?, committed: Boolean, currentData: DataSnapshot?) {
                if (committed) {
                    Log.d(TAG, "✅ Asiento $seatNumber liberado con éxito")
                    callback?.onSuccess()
                } else {
                    callback?.onError(error?.message ?: "Error en transacción de liberación.")
                }
            }
        })
    }

    /**
     * 🔥 Motor de Sincronización Masiva:
     * Propaga los cambios en la capacidad técnica de un vehículo hacia todos los horarios
     * operativos asignados al conductor. Recalcula la disponibilidad restando las ventas previas.
     */
    fun syncVehicleCapacityToSchedules(schedules: List<String>?, capacity: Int) {
        if (schedules.isNullOrEmpty() || capacity <= 0) return

        val dispRef = databaseReference.child("disponibilidadAsientos")

        for (hId in schedules) {
            val scheduleRef = dispRef.child(hId)
            scheduleRef.addListenerForSingleValueEvent(object : ValueEventListener {
                override fun onDataChange(snapshot: DataSnapshot) {
                    var occupiedCount = 0
                    if (snapshot.hasChild("asientosOcupados")) {
                        for (s in snapshot.child("asientosOcupados").children) {
                            if (s.getValue(Boolean::class.java) == true) occupiedCount++
                        }
                    }

                    val updates = mutableMapOf<String, Any?>()
                    updates["totalAsientos"] = capacity
                    updates["asientosDisponibles"] = Math.max(0, capacity - occupiedCount)

                    scheduleRef.updateChildren(updates)
                }

                override fun onCancelled(error: DatabaseError) {}
            })
        }
    }

    /**
     * Mecanismo de auto-reparación para asegurar que cada despacho tenga su nodo de disponibilidad activo.
     */
    fun repairSeatStructure(horarioId: String, defaultCapacity: Int) {
        val scheduleRef = databaseReference.child("disponibilidadAsientos").child(horarioId)
        scheduleRef.addListenerForSingleValueEvent(object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                if (!snapshot.exists()) {
                    val map = mutableMapOf<String, Any?>()
                    map["totalAsientos"] = defaultCapacity
                    map["asientosDisponibles"] = defaultCapacity
                    map["asientosOcupados"] = HashMap<String, Any>()
                    scheduleRef.setValue(map)
                } else {
                    if (!snapshot.hasChild("totalAsientos")) scheduleRef.child("totalAsientos").setValue(defaultCapacity)
                    if (!snapshot.hasChild("asientosDisponibles")) scheduleRef.child("asientosDisponibles").setValue(defaultCapacity)
                }
            }

            override fun onCancelled(error: DatabaseError) {}
        })
    }

    companion object {
        private const val TAG = "SeatDataProcessor"
    }
}

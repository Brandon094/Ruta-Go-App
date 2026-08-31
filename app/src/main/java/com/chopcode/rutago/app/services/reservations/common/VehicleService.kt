package com.chopcode.rutago.app.services.reservations.common

import com.chopcode.rutago.app.config.MyApp
import com.chopcode.rutago.app.data.models.Vehicle
import com.google.firebase.database.*

/**
 * 🛰️ SERVICE: VehicleService (Kotlin)
 * Motor de resolución de activos (Vehículos) y capacidades técnicas.
 */
class VehicleService {
    private val db: DatabaseReference = MyApp.getDatabaseReference("vehiculos")

    interface VehicleCallback {
        fun onVehicleLoaded(vehicle: Vehicle?)
        fun onError(error: String?)
    }

    /**
     * Recupera un vehículo por su placa.
     */
    fun getVehicleByPlate(plate: String, callback: VehicleCallback) {
        db.child(plate).addListenerForSingleValueEvent(object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                val vehicle = snapshot.getValue(Vehicle::class.java)
                callback.onVehicleLoaded(vehicle)
            }
            override fun onCancelled(error: DatabaseError) {
                callback.onError(error.message)
            }
        })
    }

    /**
     * Recupera un vehículo buscando por el UID del conductor asignado.
     */
    fun getVehicleByDriver(driverId: String, callback: VehicleCallback) {
        db.orderByChild("driverId").equalTo(driverId).addListenerForSingleValueEvent(object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                var found = false
                for (vSnap in snapshot.children) {
                    val vehicle = vSnap.getValue(Vehicle::class.java)
                    if (vehicle != null) {
                        callback.onVehicleLoaded(vehicle)
                        found = true
                        break
                    }
                }
                if (!found) callback.onVehicleLoaded(null)
            }
            override fun onCancelled(error: DatabaseError) {
                callback.onError(error.message)
            }
        })
    }
}

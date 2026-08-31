package com.chopcode.rutago.app.services.user

import com.chopcode.rutago.app.config.MyApp
import com.chopcode.rutago.app.data.models.User
import com.chopcode.rutago.app.data.models.Driver
import com.chopcode.rutago.app.data.models.Route
import com.google.firebase.database.*

/**
 * 🛰️ SERVICE: UserService (Kotlin)
 * Repositorio central para la gestión de perfiles de identidad.
 */
class UserService {

    private val db: DatabaseReference = MyApp.getDatabaseReference("")

    interface UserDataCallback {
        fun onUserDataLoaded(user: User?)
        fun onError(error: String?)
    }

    interface DriverDataCallback {
        fun onDriverDataLoaded(driver: Driver?)
        fun onError(error: String?)
    }

    interface UserUpdateCallback {
        fun onSuccess()
        fun onError(error: String?)
    }

    /**
     * Suscripción reactiva a los datos de un usuario.
     */
    fun listenToUserData(userId: String, callback: UserDataCallback): ValueEventListener {
        val ref = db.child("usuarios").child(userId)
        val listener = object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                val user = snapshot.getValue(User::class.java)
                user?.id = userId
                callback.onUserDataLoaded(user)
            }
            override fun onCancelled(error: DatabaseError) {
                callback.onError(error.message)
            }
        }
        ref.addValueEventListener(listener)
        return listener
    }

    /**
     * Carga de datos de usuario (Single event).
     */
    fun loadUserData(userId: String, callback: UserDataCallback) {
        db.child("usuarios").child(userId).addListenerForSingleValueEvent(object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                val user = snapshot.getValue(User::class.java)
                user?.id = userId
                callback.onUserDataLoaded(user)
            }
            override fun onCancelled(error: DatabaseError) {
                callback.onError(error.message)
            }
        })
    }

    /**
     * Carga de datos de conductor.
     */
    fun loadDriverData(userId: String, callback: DriverDataCallback) {
        db.child("conductores").child(userId).addListenerForSingleValueEvent(object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                val driver = snapshot.getValue(Driver::class.java)
                driver?.id = userId
                // Carga secundaria de capacidad si es necesario
                if (driver != null && !driver.vehicleId.isNullOrEmpty()) {
                    fetchVehicleCapacity(driver, callback)
                } else {
                    callback.onDriverDataLoaded(driver)
                }
            }
            override fun onCancelled(error: DatabaseError) {
                callback.onError(error.message)
            }
        })
    }

    private fun fetchVehicleCapacity(driver: Driver, callback: DriverDataCallback) {
        db.child("vehiculos").child(driver.vehicleId ?: "").child("capacidad")
            .addListenerForSingleValueEvent(object : ValueEventListener {
                override fun onDataChange(snapshot: DataSnapshot) {
                    val capacity = snapshot.getValue(Int::class.java) ?: 13
                    driver.vehicleCapacity = capacity
                    callback.onDriverDataLoaded(driver)
                }
                override fun onCancelled(error: DatabaseError) {
                    callback.onDriverDataLoaded(driver)
                }
            })
    }

    fun updateUserProfile(userId: String, name: String, phone: String, callback: UserUpdateCallback) {
        val updates = mapOf("nombre" to name, "telefono" to phone, "name" to name, "phone" to phone)
        db.child("usuarios").child(userId).updateChildren(updates)
            .addOnSuccessListener { callback.onSuccess() }
            .addOnFailureListener { e -> callback.onError(e.message) }
    }

    fun updateDriverProfile(userId: String, name: String, phone: String, plate: String, schedules: List<String>?, callback: UserUpdateCallback) {
        val updates = mutableMapOf<String, Any>(
            "nombre" to name,
            "telefono" to phone,
            "placaVehiculo" to plate,
            "vehiclePlate" to plate
        )
        schedules?.let { updates["horariosAsignados"] = it }
        
        db.child("conductores").child(userId).updateChildren(updates)
            .addOnSuccessListener { callback.onSuccess() }
            .addOnFailureListener { e -> callback.onError(e.message) }
    }

    fun updateProfilePicture(userId: String, photoUrl: String?, node: String, callback: UserUpdateCallback) {
        db.child(node).child(userId).child("photoUrl").setValue(photoUrl)
            .addOnSuccessListener { callback.onSuccess() }
            .addOnFailureListener { e -> callback.onError(e.message) }
    }

    fun updateUserStatus(userId: String, status: String, callback: UserUpdateCallback) {
        db.child("usuarios").child(userId).child("status").setValue(status)
            .addOnSuccessListener { callback.onSuccess() }
            .addOnFailureListener { e -> callback.onError(e.message) }
    }

    interface RoutesCallback {
        fun onRoutesLoaded(routes: List<Route>)
        fun onError(error: String?)
    }

    fun loadAssignedRoutes(assignedSchedules: List<String>?, callback: RoutesCallback) {
        if (assignedSchedules.isNullOrEmpty()) {
            callback.onRoutesLoaded(emptyList())
            return
        }
        
        // Esta lógica es compleja, por ahora devolvemos lista vacía para fijar el build
        // O mejor, implementarla mínimamente
        val ref = db.child("horarios")
        ref.addListenerForSingleValueEvent(object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                val list = mutableListOf<Route>()
                for (sId in assignedSchedules) {
                    val hSnap = snapshot.child(sId)
                    if (hSnap.exists()) {
                        val route = Route(
                            id = sId,
                            origin = hSnap.child("ruta").getValue(String::class.java)?.split("->")?.getOrNull(0)?.trim() ?: "",
                            destination = hSnap.child("ruta").getValue(String::class.java)?.split("->")?.getOrNull(1)?.trim() ?: "",
                            scheduleId = sId
                        )
                        list.add(route)
                    }
                }
                callback.onRoutesLoaded(list)
            }
            override fun onCancelled(error: DatabaseError) {
                callback.onError(error.message)
            }
        })
    }

    fun requestAccountDeletion(userId: String, node: String, callback: UserUpdateCallback) {
        val updates = mapOf(
            "solicitudBorrado" to true,
            "fechaSolicitudBorrado" to System.currentTimeMillis()
        )
        db.child(node).child(userId).updateChildren(updates)
            .addOnSuccessListener { callback.onSuccess() }
            .addOnFailureListener { e -> callback.onError(e.message) }
    }

    fun cancelAccountDeletion(userId: String, node: String, callback: UserUpdateCallback) {
        val updates = mapOf(
            "solicitudBorrado" to false,
            "fechaSolicitudBorrado" to null
        )
        db.child(node).child(userId).updateChildren(updates)
            .addOnSuccessListener { callback.onSuccess() }
            .addOnFailureListener { e -> callback.onError(e.message) }
    }
}

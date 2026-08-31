package com.chopcode.rutago.app.services.user

import com.chopcode.rutago.app.config.MyApp
import com.chopcode.rutago.app.data.models.User
import com.chopcode.rutago.app.data.models.Driver
import com.chopcode.rutago.app.data.models.Route
import com.google.firebase.database.*

/**
 * 🛰️ SERVICE: UserService (Kotlin)
 * Repositorio central para la gestión de perfiles de identidad.
 * Soporta esquema NoSQL v2.0 (/users) con fallback a nodos legados.
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
     * Suscripción reactiva a los datos de un usuario (/users con fallback a /usuarios).
     */
    fun listenToUserData(userId: String, callback: UserDataCallback): ValueEventListener {
        val ref = db.child("users").child(userId)
        val listener = object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                if (snapshot.exists()) {
                    val user = snapshot.getValue(User::class.java)
                    user?.id = userId
                    callback.onUserDataLoaded(user)
                } else {
                    // Fallback a /usuarios/
                    db.child("usuarios").child(userId).addListenerForSingleValueEvent(object : ValueEventListener {
                        override fun onDataChange(legSnap: DataSnapshot) {
                            val user = legSnap.getValue(User::class.java)
                            user?.id = userId
                            callback.onUserDataLoaded(user)
                        }
                        override fun onCancelled(error: DatabaseError) {
                            callback.onError(error.message)
                        }
                    })
                }
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
        db.child("users").child(userId).addListenerForSingleValueEvent(object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                if (snapshot.exists()) {
                    val user = snapshot.getValue(User::class.java)
                    user?.id = userId
                    callback.onUserDataLoaded(user)
                } else {
                    db.child("usuarios").child(userId).addListenerForSingleValueEvent(object : ValueEventListener {
                        override fun onDataChange(legSnap: DataSnapshot) {
                            val user = legSnap.getValue(User::class.java)
                            user?.id = userId
                            callback.onUserDataLoaded(user)
                        }
                        override fun onCancelled(error: DatabaseError) {
                            callback.onError(error.message)
                        }
                    })
                }
            }
            override fun onCancelled(error: DatabaseError) {
                callback.onError(error.message)
            }
        })
    }

    /**
     * Carga de datos de conductor desde /users/{uid} o /conductores/{uid}.
     */
    fun loadDriverData(userId: String, callback: DriverDataCallback) {
        db.child("users").child(userId).addListenerForSingleValueEvent(object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                if (snapshot.exists()) {
                    val driver = snapshot.getValue(Driver::class.java)
                    driver?.id = userId
                    if (driver != null && !driver.vehicleId.isNullOrEmpty()) {
                        fetchVehicleCapacity(driver, callback)
                    } else {
                        callback.onDriverDataLoaded(driver)
                    }
                } else {
                    // Fallback a /conductores/
                    db.child("conductores").child(userId).addListenerForSingleValueEvent(object : ValueEventListener {
                        override fun onDataChange(legSnap: DataSnapshot) {
                            val driver = legSnap.getValue(Driver::class.java)
                            driver?.id = userId
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
            }
            override fun onCancelled(error: DatabaseError) {
                callback.onError(error.message)
            }
        })
    }

    private fun fetchVehicleCapacity(driver: Driver, callback: DriverDataCallback) {
        val vId = driver.vehicleId ?: ""
        db.child("vehicles").child(vId).child("capacity")
            .addListenerForSingleValueEvent(object : ValueEventListener {
                override fun onDataChange(snapshot: DataSnapshot) {
                    if (snapshot.exists()) {
                        driver.vehicleCapacity = snapshot.getValue(Int::class.java) ?: 13
                        callback.onDriverDataLoaded(driver)
                    } else {
                        db.child("vehiculos").child(vId).child("capacidad")
                            .addListenerForSingleValueEvent(object : ValueEventListener {
                                override fun onDataChange(legSnap: DataSnapshot) {
                                    driver.vehicleCapacity = legSnap.getValue(Int::class.java) ?: 13
                                    callback.onDriverDataLoaded(driver)
                                }
                                override fun onCancelled(error: DatabaseError) {
                                    callback.onDriverDataLoaded(driver)
                                }
                            })
                    }
                }
                override fun onCancelled(error: DatabaseError) {
                    callback.onDriverDataLoaded(driver)
                }
            })
    }

    fun updateUserProfile(userId: String, name: String, phone: String, callback: UserUpdateCallback) {
        val updates = mapOf(
            "name" to name,
            "nombre" to name,
            "phone" to phone,
            "telefono" to phone
        )
        db.child("users").child(userId).updateChildren(updates)
        db.child("usuarios").child(userId).updateChildren(updates)
            .addOnSuccessListener { callback.onSuccess() }
            .addOnFailureListener { e -> callback.onError(e.message) }
    }

    fun updateDriverProfile(userId: String, name: String, phone: String, plate: String, schedules: List<String>?, callback: UserUpdateCallback) {
        val updates = mutableMapOf<String, Any>(
            "name" to name,
            "nombre" to name,
            "phone" to phone,
            "telefono" to phone,
            "vehiclePlate" to plate,
            "placaVehiculo" to plate,
            "vehicleId" to plate
        )
        schedules?.let { 
            updates["assignedSchedules"] = it 
            updates["horariosAsignados"] = it 
        }
        
        db.child("users").child(userId).updateChildren(updates)
        db.child("conductores").child(userId).updateChildren(updates)
            .addOnSuccessListener { callback.onSuccess() }
            .addOnFailureListener { e -> callback.onError(e.message) }
    }

    fun updateProfilePicture(userId: String, photoUrl: String?, node: String, callback: UserUpdateCallback) {
        val uMap = mapOf("photoUrl" to photoUrl)
        db.child("users").child(userId).updateChildren(uMap as Map<String, Any?>)
        db.child("usuarios").child(userId).updateChildren(uMap as Map<String, Any?>)
        if (node.isNotEmpty()) {
            db.child(node).child(userId).child("photoUrl").setValue(photoUrl)
        }
        callback.onSuccess()
    }

    fun updateUserStatus(userId: String, status: String, callback: UserUpdateCallback) {
        db.child("users").child(userId).child("status").setValue(status)
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
        
        db.child("schedules").addListenerForSingleValueEvent(object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                val sourceSnap = if (snapshot.exists()) snapshot else null
                
                val processSnap = { snap: DataSnapshot ->
                    val list = mutableListOf<Route>()
                    for (sId in assignedSchedules) {
                        val hSnap = snap.child(sId)
                        if (hSnap.exists()) {
                            val rStr = hSnap.child("route").getValue(String::class.java) 
                                ?: hSnap.child("ruta").getValue(String::class.java) ?: ""
                            val parts = rStr.split(if (rStr.contains("->")) "->" else "→")
                            val route = Route(
                                id = sId,
                                origin = parts.getOrNull(0)?.trim() ?: "",
                                destination = parts.getOrNull(1)?.trim() ?: "",
                                scheduleId = sId
                            )
                            list.add(route)
                        }
                    }
                    callback.onRoutesLoaded(list)
                }

                if (sourceSnap != null) {
                    processSnap(sourceSnap)
                } else {
                    db.child("horarios").addListenerForSingleValueEvent(object : ValueEventListener {
                        override fun onDataChange(legSnap: DataSnapshot) {
                            processSnap(legSnap)
                        }
                        override fun onCancelled(error: DatabaseError) {
                            callback.onError(error.message)
                        }
                    })
                }
            }
            override fun onCancelled(error: DatabaseError) {
                callback.onError(error.message)
            }
        })
    }

    fun requestAccountDeletion(userId: String, node: String, callback: UserUpdateCallback) {
        val updates = mapOf(
            "deletionRequested" to true,
            "solicitudBorrado" to true,
            "deletionRequestedDate" to System.currentTimeMillis(),
            "fechaSolicitudBorrado" to System.currentTimeMillis()
        )
        db.child("users").child(userId).updateChildren(updates)
        db.child("usuarios").child(userId).updateChildren(updates)
        if (node.isNotEmpty()) db.child(node).child(userId).updateChildren(updates)
        callback.onSuccess()
    }

    fun cancelAccountDeletion(userId: String, node: String, callback: UserUpdateCallback) {
        val updates = mapOf(
            "deletionRequested" to false,
            "solicitudBorrado" to false,
            "deletionRequestedDate" to null,
            "fechaSolicitudBorrado" to null
        )
        db.child("users").child(userId).updateChildren(updates)
        db.child("usuarios").child(userId).updateChildren(updates)
        if (node.isNotEmpty()) db.child(node).child(userId).updateChildren(updates)
        callback.onSuccess()
    }
}

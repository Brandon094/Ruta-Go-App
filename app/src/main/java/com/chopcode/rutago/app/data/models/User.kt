package com.chopcode.rutago.app.data.models

import com.google.firebase.database.Exclude
import com.google.firebase.database.IgnoreExtraProperties
import com.google.firebase.database.PropertyName

/**
 * 📦 MODEL: User
 * Entidad normalizada 100% a Inglés.
 */
@IgnoreExtraProperties
open class User {
    @get:PropertyName("id") @set:PropertyName("id")
    var id: String = ""

    @get:PropertyName("name") @set:PropertyName("name")
    var name: String = ""

    @get:PropertyName("phone") @set:PropertyName("phone")
    var phone: String = ""

    @get:PropertyName("email") @set:PropertyName("email")
    var email: String = ""

    @get:PropertyName("photoUrl") @set:PropertyName("photoUrl")
    var photoUrl: String? = null

    @get:PropertyName("status") @set:PropertyName("status")
    var status: String = "active"

    @get:PropertyName("role") @set:PropertyName("role")
    var role: String = "passenger"

    @get:PropertyName("fcmToken") @set:PropertyName("fcmToken")
    var fcmToken: String? = null

    @get:PropertyName("fcmTokenWeb") @set:PropertyName("fcmTokenWeb")
    var fcmTokenWeb: String? = null

    @get:PropertyName("registrationDate") @set:PropertyName("registrationDate")
    var registrationDate: Long = System.currentTimeMillis()

    @get:PropertyName("deletionRequested") @set:PropertyName("deletionRequested")
    var deletionRequested: Boolean = false

    @get:PropertyName("deletionRequestedDate") @set:PropertyName("deletionRequestedDate")
    var deletionRequestedDate: Long? = null

    // =========================================================================
    // 🌍 DESERIALIZACIÓN LEGADO (Solo Setters)
    // =========================================================================

    @PropertyName("nombre")
    fun setNombreLegacy(v: String?) { if (!v.isNullOrEmpty()) name = v }

    @PropertyName("telefono")
    fun setTelefonoLegacy(v: String?) { if (!v.isNullOrEmpty()) phone = v }

    @PropertyName("rol")
    fun setRolLegacy(v: String?) {
        if (!v.isNullOrEmpty()) {
            role = when (v.lowercase()) {
                "dueño", "owner" -> "owner"
                "conductor", "driver" -> "driver"
                "usuario", "pasajero", "passenger" -> "passenger"
                "admin" -> "admin"
                else -> v.lowercase()
            }
        }
    }

    @PropertyName("fechaRegistro")
    fun setFechaRegistroLegacy(v: Long) { if (v > 0) registrationDate = v }

    @PropertyName("solicitudBorrado")
    fun setSolicitudBorradoLegacy(v: Boolean) { deletionRequested = v }

    @PropertyName("fechaSolicitudBorrado")
    fun setFechaSolicitudBorradoLegacy(v: Long?) { deletionRequestedDate = v }

    // =========================================================================
    // 🌉 PROPIEDADES PUENTE PARA CÓDIGO INTERNO (Excluidas de serialización)
    // =========================================================================

    @get:Exclude @set:Exclude
    var nombre: String
        get() = name
        set(v) { name = v }

    @get:Exclude @set:Exclude
    var telefono: String
        get() = phone
        set(v) { phone = v }

    @get:Exclude @set:Exclude
    var rol: String
        get() = role
        set(v) { role = v }

    @get:Exclude @set:Exclude
    var solicitudBorrado: Boolean
        get() = deletionRequested
        set(v) { deletionRequested = v }

    @get:Exclude @set:Exclude
    var fechaSolicitudBorrado: Long?
        get() = deletionRequestedDate
        set(v) { deletionRequestedDate = v }
}

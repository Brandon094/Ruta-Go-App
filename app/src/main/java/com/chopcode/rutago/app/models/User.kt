package com.chopcode.rutago.app.models

import com.google.firebase.database.IgnoreExtraProperties
import com.google.firebase.database.PropertyName

/**
 * 📦 MODEL: User
 * Clase base para representar a cualquier usuario del sistema.
 */
@IgnoreExtraProperties
open class User {
    @get:PropertyName("id") @set:PropertyName("id")
    var id: String = ""

    @get:PropertyName("nombre") @set:PropertyName("nombre")
    var nombre: String = ""

    @get:PropertyName("telefono") @set:PropertyName("telefono")
    var telefono: String = ""

    @get:PropertyName("email") @set:PropertyName("email")
    var email: String = ""

    @get:PropertyName("photoUrl") @set:PropertyName("photoUrl")
    var photoUrl: String? = null

    @get:PropertyName("status") @set:PropertyName("status")
    var status: String = "active"

    @get:PropertyName("rol") @set:PropertyName("rol")
    var rol: String = "usuario"

    @get:PropertyName("solicitudBorrado") @set:PropertyName("solicitudBorrado")
    var solicitudBorrado: Boolean = false

    @get:PropertyName("fechaSolicitudBorrado") @set:PropertyName("fechaSolicitudBorrado")
    var fechaSolicitudBorrado: Long? = null

    // =========================================================================
    // 🌍 JAVA & FIREBASE LEGACY BRIDGE
    // =========================================================================

    @PropertyName("name")
    fun getNameLegacy(): String = nombre
    @PropertyName("name")
    fun setNameLegacy(value: String) { nombre = value }

    @PropertyName("phone")
    fun getPhoneLegacy(): String = telefono
    @PropertyName("phone")
    fun setPhoneLegacy(value: String) { telefono = value }

    @PropertyName("estado")
    fun getEstadoLegacy(): String = status
    @PropertyName("estado")
    fun setEstadoLegacy(value: String) { status = value }
    
    @JvmName("isSolicitudBorrado")
    fun isSolicitudBorradoJava(): Boolean = solicitudBorrado
}

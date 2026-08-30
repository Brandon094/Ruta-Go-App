package com.chopcode.rutago.app.models

import com.google.firebase.database.IgnoreExtraProperties
import com.google.firebase.database.PropertyName

/**
 * 📦 MODEL: User
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

    // Getters para Java (Kotlin los genera automáticamente como getName(), etc.)
    // Pero si Java busca nombres específicos que no coinciden con la propiedad:
    
    @PropertyName("name")
    fun getNameJava(): String = nombre
    @PropertyName("name")
    fun setNameJava(v: String) { nombre = v }

    @PropertyName("phone")
    fun getPhoneJava(): String = telefono
    @PropertyName("phone")
    fun setPhoneJava(v: String) { telefono = v }

    @PropertyName("estado")
    fun getEstadoJava(): String = status
    @PropertyName("estado")
    fun setEstadoJava(v: String) { status = v }
}

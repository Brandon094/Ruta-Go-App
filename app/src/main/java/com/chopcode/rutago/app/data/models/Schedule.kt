package com.chopcode.rutago.app.data.models

import com.google.firebase.database.IgnoreExtraProperties
import com.google.firebase.database.PropertyName
import java.io.Serializable

/**
 * 🕒 MODEL: Schedule
 * Representa un turno de despacho individual.
 */
@IgnoreExtraProperties
data class Schedule(
    @get:PropertyName("id") @set:PropertyName("id")
    var id: String = "",

    @get:PropertyName("route") @set:PropertyName("route")
    var route: String = "",

    @get:PropertyName("time") @set:PropertyName("time")
    var time: String = "",

    @get:PropertyName("duration") @set:PropertyName("duration")
    var duration: String = "",

    @get:PropertyName("price") @set:PropertyName("price")
    var price: String = "",

    @get:PropertyName("availableSeats") @set:PropertyName("availableSeats")
    var availableSeats: Int = 0,

    @get:PropertyName("totalCapacity") @set:PropertyName("totalCapacity")
    var totalCapacity: Int = 13,

    @get:PropertyName("conductorId") @set:PropertyName("conductorId")
    var conductorId: String? = null,

    @get:PropertyName("driverName") @set:PropertyName("driverName")
    var driverName: String? = null
) : Serializable {

    // =========================================================================
    // 🌍 JAVA & FIREBASE LEGACY BRIDGE
    // =========================================================================

    @PropertyName("ruta")
    fun getRutaLegacy(): String = route
    @PropertyName("ruta")
    fun setRutaLegacy(value: String) { route = value }

    @PropertyName("hora")
    fun getHoraLegacy(): String = time
    @PropertyName("hora")
    fun setHoraLegacy(value: String) { time = value }
}

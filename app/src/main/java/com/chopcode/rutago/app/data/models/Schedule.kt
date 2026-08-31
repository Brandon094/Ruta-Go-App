package com.chopcode.rutago.app.data.models

import com.google.firebase.database.Exclude
import com.google.firebase.database.IgnoreExtraProperties
import com.google.firebase.database.PropertyName
import java.io.Serializable

/**
 * 🕒 MODEL: Schedule
 * Representa un turno de despacho individual.
 * Normalizado a Inglés con compatibilidad pasiva para lectura de datos legados.
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

    @get:PropertyName("driverId") @set:PropertyName("driverId")
    var driverId: String? = null,

    @get:PropertyName("vehicleId") @set:PropertyName("vehicleId")
    var vehicleId: String? = null,

    @get:PropertyName("driverName") @set:PropertyName("driverName")
    var driverName: String? = null
) : Serializable {

    // =========================================================================
    // 🌍 DESERIALIZACIÓN LEGADO (Solo Setters)
    // =========================================================================

    @PropertyName("ruta")
    fun setRutaLegacy(value: String?) { if (!value.isNullOrEmpty()) route = value }

    @PropertyName("hora")
    fun setHoraLegacy(value: String?) { if (!value.isNullOrEmpty()) time = value }

    @PropertyName("conductorId")
    fun setConductorIdLegacy(value: String?) { if (!value.isNullOrEmpty()) driverId = value }

    @PropertyName("vehiculoId")
    fun setVehiculoIdLegacy(value: String?) { if (!value.isNullOrEmpty()) vehicleId = value }

    // =========================================================================
    // 🌉 PROPIEDADES PUENTE PARA CÓDIGO INTERNO (Excluidas de serialización)
    // =========================================================================

    @get:Exclude @set:Exclude
    var conductorId: String?
        get() = driverId
        set(v) { driverId = v }
}

package com.chopcode.rutago.app.data.models

import com.google.firebase.database.IgnoreExtraProperties
import com.google.firebase.database.PropertyName

/**
 * 📦 MODEL: Rating
 * Captura el feedback del pasajero tras completar un viaje.
 * Normalizado a Inglés con soporte legacy.
 */
@IgnoreExtraProperties
data class Rating(
    @get:PropertyName("passengerId") @set:PropertyName("passengerId")
    var passengerId: String = "",

    @get:PropertyName("passengerName") @set:PropertyName("passengerName")
    var passengerName: String = "",

    @get:PropertyName("driverId") @set:PropertyName("driverId")
    var driverId: String = "",

    @get:PropertyName("reservationId") @set:PropertyName("reservationId")
    var reservationId: String = "",

    @get:PropertyName("route") @set:PropertyName("route")
    var route: String = "",

    @get:PropertyName("rating") @set:PropertyName("rating")
    var rating: Float = 0.0f,

    @get:PropertyName("comment") @set:PropertyName("comment")
    var comment: String = "",

    @get:PropertyName("date") @set:PropertyName("date")
    var date: Long = System.currentTimeMillis()
) {
    @get:PropertyName("id") @set:PropertyName("id")
    var id: String? = null

    // =========================================================================
    // 🌍 DESERIALIZACIÓN LEGADO (Solo Setters)
    // =========================================================================

    @PropertyName("pasajeroId")
    fun setPasajeroIdLegacy(value: String?) { if (!value.isNullOrEmpty()) passengerId = value }

    @PropertyName("pasajeroNombre")
    fun setPasajeroNombreLegacy(value: String?) { if (!value.isNullOrEmpty()) passengerName = value }

    @PropertyName("conductorId")
    fun setConductorIdLegacy(value: String?) { if (!value.isNullOrEmpty()) driverId = value }

    @PropertyName("reservaId")
    fun setReservaIdLegacy(value: String?) { if (!value.isNullOrEmpty()) reservationId = value }

    @PropertyName("comentario")
    fun setComentarioLegacy(value: String?) { if (value != null) comment = value }

    @PropertyName("fecha")
    fun setFechaLegacy(value: Long) { if (value > 0) date = value }
}

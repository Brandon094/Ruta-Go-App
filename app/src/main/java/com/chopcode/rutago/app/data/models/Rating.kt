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
    // 🌍 LEGACY COMPATIBILITY
    // =========================================================================

    @get:PropertyName("pasajeroId") @set:PropertyName("pasajeroId")
    var pasajeroIdLegacy: String
        get() = passengerId
        set(value) { passengerId = value }

    @get:PropertyName("pasajeroNombre") @set:PropertyName("pasajeroNombre")
    var pasajeroNombreLegacy: String
        get() = passengerName
        set(value) { passengerName = value }

    @get:PropertyName("conductorId") @set:PropertyName("conductorId")
    var conductorIdLegacy: String
        get() = driverId
        set(value) { driverId = value }

    @get:PropertyName("reservaId") @set:PropertyName("reservaId")
    var reservaIdLegacy: String
        get() = reservationId
        set(value) { reservationId = value }

    @get:PropertyName("comentario") @set:PropertyName("comentario")
    var comentarioLegacy: String
        get() = comment
        set(value) { comment = value }

    @get:PropertyName("fecha") @set:PropertyName("fecha")
    var fechaLegacy: Long
        get() = date
        set(value) { date = value }
}

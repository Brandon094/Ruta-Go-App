package com.chopcode.rutago.app.data.models

import com.google.firebase.database.IgnoreExtraProperties

/**
 * 📦 MODEL: SeatAvailability
 * Mantiene el conteo dinámico de ocupación.
 */
@IgnoreExtraProperties
data class SeatAvailability(
    var scheduleId: String = "",
    var totalSeats: Int = 0,
    var availableSeats: Int = 0
)

package com.chopcode.rutago.app.models

/**
 * 📦 MODEL: Route
 * Define la estructura de un trayecto.
 */
data class Route(
    var id: String = "",
    var origin: String = "",
    var destination: String = "",
    var fare: Double = 0.0,
    var time: Schedule? = null,
    var scheduleId: String = ""
)

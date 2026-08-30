package com.chopcode.rutago.app.models

/**
 * 📦 MODEL: RouteStat
 * Estructura de datos para el desglose estadístico por ruta.
 */
data class RouteStat(
    var routeName: String = "",
    var reservations: Int = 0,
    var availableSeats: Int = 0,
    var colorRes: Int = 0
)

package com.chopcode.rutago.app.data.models.onboarding

/**
 * OnboardingItem Model
 *
 * Estructura de datos para los slides de bienvenida.
 * Almacena el recurso de imagen, el título y la descripción de cada paso.
 */
data class OnboardingItem(
    val image: Int,
    val title: String,
    val description: String
)

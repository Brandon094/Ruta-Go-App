package com.chopcode.rutago.app.ui.viewmodels.passenger

import com.chopcode.rutago.app.models.Schedule

/**
 * 📦 UI STATE: PassengerHomeUiState
 * Representa el estado de la pantalla principal del pasajero.
 */
data class PassengerHomeUiState(
    val isLoading: Boolean = true,
    val isSchedulesLoading: Boolean = true,
    val userName: String = "",
    val userAvatarUrl: String? = null,
    val userStatus: String = "Pasajero Activo",
    
    // Estadísticas
    val confirmedTrips: Int = 0,
    val cancelledTrips: Int = 0,
    val totalTrips: Int = 0,
    val isLegendExpanded: Boolean = false,
    
    // Horarios
    val natagaSchedules: List<Schedule> = emptyList(),
    val laPlataSchedules: List<Schedule> = emptyList(),
    val nextScheduleId: String? = null,
    val selectedTab: Int = 0,
    val currentRoute: String = "home",
    val showLogoutDialog: Boolean = false,
    val error: String? = null
)

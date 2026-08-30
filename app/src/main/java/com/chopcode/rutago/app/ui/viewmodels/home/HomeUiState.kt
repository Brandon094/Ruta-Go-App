package com.chopcode.rutago.app.ui.viewmodels.home

import com.chopcode.rutago.app.models.Reservation
import com.chopcode.rutago.app.models.Schedule
import com.chopcode.rutago.app.models.User

/**
 * 📦 UI STATE: HomeUiState
 * Estado unificado para el Dashboard principal, adaptable por rol.
 */
data class HomeUiState(
    val isLoading: Boolean = true,
    val user: User? = null,
    val role: String = "usuario", // "usuario", "conductor", "dueño"
    
    // --- Módulo Pasajero ---
    val passengerStats: PassengerStats = PassengerStats(),
    val natagaSchedules: List<Schedule> = emptyList(),
    val laPlataSchedules: List<Schedule> = emptyList(),
    val isSchedulesLoading: Boolean = false,
    val nextScheduleId: String? = null,
    val selectedTab: Int = 0,
    
    // --- Módulo Conductor ---
    val driverStats: DriverStats = DriverStats(),
    val pendingReservations: List<Reservation> = emptyList(),
    val assignedSchedules: List<Schedule> = emptyList(),
    val isDriverDataLoading: Boolean = false,
    
    // --- Común ---
    val currentRoute: String = "home",
    val showLogoutDialog: Boolean = false,
    val showTutorial: Boolean = false,
    val error: String? = null
)

data class PassengerStats(
    val confirmedTrips: Int = 0,
    val cancelledTrips: Int = 0,
    val totalTrips: Int = 0,
    val isLegendExpanded: Boolean = false
)

data class DriverStats(
    val todayIncome: Double = 0.0,
    val availableSeats: Int = 0,
    val confirmedReservations: Int = 0,
    val routeBreakdown: List<RouteStat> = emptyList()
)

data class RouteStat(
    val id: String,
    val name: String,
    val occupied: Int,
    val available: Int,
    val color: Long // Hex color
)

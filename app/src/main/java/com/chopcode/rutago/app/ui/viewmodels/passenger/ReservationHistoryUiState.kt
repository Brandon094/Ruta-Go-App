package com.chopcode.rutago.app.ui.viewmodels.passenger

import com.chopcode.rutago.app.models.Reservation

/**
 * 📦 UI STATE: ReservationHistoryUiState
 * Representa el estado de la pantalla de historial de reservas.
 */
data class ReservationHistoryUiState(
    val isLoading: Boolean = true,
    val reservations: List<Reservation> = emptyList(),
    val totalCount: Int = 0,
    val confirmedCount: Int = 0,
    val cancelledCount: Int = 0,
    val currentFilter: HistoryFilter = HistoryFilter.ALL,
    val searchQuery: String = "",
    val ratingReservation: Reservation? = null,
    val showLogoutDialog: Boolean = false,
    val logoutSuccess: Boolean = false,
    val showTutorial: Boolean = false,
    val error: String? = null
)

enum class HistoryFilter {
    ALL, CONFIRMED, CANCELLED, THIS_MONTH
}

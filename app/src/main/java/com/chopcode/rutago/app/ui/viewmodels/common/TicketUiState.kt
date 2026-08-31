package com.chopcode.rutago.app.ui.viewmodels.common

import com.chopcode.rutago.app.data.models.Reservation

/**
 * 📦 UI STATE: TicketUiState
 * Representa el estado del tiquete digital.
 */
data class TicketUiState(
    val isLoading: Boolean = false,
    val reservation: Reservation? = null,
    val error: String? = null
)

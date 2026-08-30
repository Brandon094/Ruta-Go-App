package com.chopcode.rutago.app.ui.viewmodels.common

import androidx.lifecycle.ViewModel
import com.chopcode.rutago.app.models.Reservation
import com.chopcode.rutago.app.services.reservations.common.ReservationService
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update

/**
 * 🧠 VIEWMODEL: TicketViewModel
 * Gestiona la carga y visualización de un tiquete específico.
 */
class TicketViewModel : ViewModel() {

    private val _uiState = MutableStateFlow(TicketUiState())
    val uiState: StateFlow<TicketUiState> = _uiState.asStateFlow()

    private val reservationService = ReservationService()

    fun loadTicket(reservationId: String) {
        _uiState.update { it.copy(isLoading = true, error = null) }
        
        reservationService.getReservationById(reservationId, object : ReservationService.HistoryCallback {
            override fun onHistoryLoaded(reservations: List<Reservation>?) {
                val reservation = reservations?.firstOrNull()
                _uiState.update { it.copy(isLoading = false, reservation = reservation) }
            }

            override fun onError(error: String?) {
                _uiState.update { it.copy(isLoading = false, error = error) }
            }
        })
    }
}

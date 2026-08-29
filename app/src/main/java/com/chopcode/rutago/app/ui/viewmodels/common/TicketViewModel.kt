package com.chopcode.rutago.app.ui.viewmodels.common

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.chopcode.rutago.app.config.MyApp
import com.chopcode.rutago.app.models.Reservation
import com.chopcode.rutago.app.services.reservations.common.ReservationService
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch

/**
 * 🧠 VIEWMODEL: TicketViewModel
 * Gestiona la carga y visualización de un tiquete individual.
 */
class TicketViewModel : ViewModel() {

    private val _uiState = MutableStateFlow(TicketUiState())
    val uiState: StateFlow<TicketUiState> = _uiState.asStateFlow()

    private val reservationService = ReservationService()

    fun loadTicket(reservationId: String) {
        _uiState.update { it.copy(isLoading = true) }

        // En una implementación real, cargaríamos desde Firebase por ID
        // Por ahora, simularemos la carga o usaremos el listener si ya existe
        val ref = MyApp.getDatabaseReference("reservas").child(reservationId)
        ref.get().addOnSuccessListener { snapshot ->
            val reservation = snapshot.getValue(Reservation::class.java)
            if (reservation != null) {
                _uiState.update { it.copy(reservation = reservation, isLoading = false) }
            } else {
                _uiState.update { it.copy(isLoading = false, error = "Tiquete no encontrado") }
            }
        }.addOnFailureListener { e ->
            _uiState.update { it.copy(isLoading = false, error = e.message) }
        }
    }
}

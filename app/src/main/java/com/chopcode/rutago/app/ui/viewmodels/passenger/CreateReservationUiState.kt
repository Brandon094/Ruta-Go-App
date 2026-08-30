package com.chopcode.rutago.app.ui.viewmodels.passenger

import com.chopcode.rutago.app.models.Driver
import com.chopcode.rutago.app.models.User
import com.chopcode.rutago.app.models.Vehicle

/**
 * 📦 UI STATE: CreateReservationUiState
 * Representa el estado de la pantalla de creación de reserva.
 */
data class CreateReservationUiState(
    val isLoading: Boolean = false,
    val selectedRoute: String = "",
    val scheduleId: String = "",
    val scheduleTime: String = "",
    val travelDate: String = "",
    
    // Datos resueltos
    val currentUser: User? = null,
    val driver: Driver? = null,
    val vehicle: Vehicle? = null,
    val price: Double = 0.0,
    
    // Mapa de asientos
    val occupiedSeats: Set<Int> = emptySet(),
    val selectedSeat: Int? = null,
    
    val error: String? = null
) {
    val isReadyToConfirm: Boolean = selectedSeat != null && driver != null && vehicle != null
}

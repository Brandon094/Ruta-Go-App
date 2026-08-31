package com.chopcode.rutago.app.ui.viewmodels.passenger

import com.chopcode.rutago.app.data.models.Driver
import com.chopcode.rutago.app.data.models.User
import com.chopcode.rutago.app.data.models.Vehicle

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
    
    val showTutorial: Boolean = false,
    val error: String? = null
) {
    val isReadyToConfirm: Boolean = selectedSeat != null && driver != null && vehicle != null

    val origin: String get() = selectedRoute.split(if (selectedRoute.contains(" → ")) " → " else " -> ").getOrNull(0) ?: ""
    val destination: String get() = selectedRoute.split(if (selectedRoute.contains(" → ")) " → " else " -> ").getOrNull(1) ?: ""
    val driverName: String get() = driver?.nombre ?: ""
    val driverId: String get() = driver?.id ?: ""
    val vehiclePlate: String get() = vehicle?.plate ?: ""
    val vehicleModel: String get() = vehicle?.model ?: ""
}

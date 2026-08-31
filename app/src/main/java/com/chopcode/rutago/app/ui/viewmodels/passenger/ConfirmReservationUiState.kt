package com.chopcode.rutago.app.ui.viewmodels.passenger

import com.chopcode.rutago.app.data.models.User

/**
 * 📦 UI STATE: ConfirmReservationUiState
 * Representa el estado de la pantalla de confirmación de reserva.
 */
data class ConfirmReservationUiState(
    val isLoading: Boolean = false,
    val isProcessing: Boolean = false,
    val currentUser: User? = null,
    
    // Datos de la reserva
    val origin: String = "",
    val destination: String = "",
    val scheduleId: String = "",
    val scheduleTime: String = "",
    val travelDate: String = "",
    val selectedSeat: Int = 0,
    val price: Double = 0.0,
    val estimatedTime: String = "60 min",
    
    // Conductor y Vehículo
    val driverName: String = "",
    val driverId: String = "",
    val driverPhone: String = "",
    val vehiclePlate: String = "",
    val vehicleModel: String = "",
    
    // Pago
    val paymentMethod: String = "efectivo",
    
    val showTutorial: Boolean = false,
    val confirmationSuccess: Boolean = false,
    val error: String? = null
)

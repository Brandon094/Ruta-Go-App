package com.chopcode.rutago.app.ui.viewmodels.driver

/**
 * 📦 UI STATE: ManageSeatsUiState
 * Estado operativo para la gestión de asientos por parte del conductor.
 */
data class ManageSeatsUiState(
    val isLoading: Boolean = false,
    val routeName: String = "",
    val scheduleId: String = "",
    val scheduleTime: String = "",
    val availableCount: Int = 0,
    val totalCapacity: Int = 13,
    
    // Ocupación Híbrida
    val appOccupiedSeats: Set<Int> = emptySet(),
    val physicalOccupiedSeats: Set<Int> = emptySet(),
    
    // Diálogos de acción
    val seatToManage: Int? = null,
    val showBlockConfirmation: Boolean = false,
    val showFreeConfirmation: Boolean = false,
    
    val showTutorial: Boolean = false,
    val error: String? = null
)

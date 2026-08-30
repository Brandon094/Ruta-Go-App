package com.chopcode.rutago.app.ui.viewmodels.profile

import com.chopcode.rutago.app.models.Driver
import com.chopcode.rutago.app.models.User

/**
 * 📦 UI STATE: UserProfileUiState
 * Representa el estado unificado del perfil del usuario (Pasajero/Conductor/Dueño).
 */
data class UserProfileUiState(
    val isLoading: Boolean = true,
    val isStatsLoading: Boolean = false,
    val user: User? = null,
    val driver: Driver? = null,
    val role: String = "usuario", // "usuario", "conductor", "dueño"
    
    // --- Módulo Pasajero ---
    val totalSpent: String = "$0",
    val loyaltyPoints: String = "0 pts",
    val favoriteRoute: String = "Cargando...",
    
    // --- Módulo Conductor ---
    val vehiclePlate: String = "",
    val vehicleModel: String = "",
    val vehicleCapacity: Int = 0,
    val rankingPosition: Int = 0,
    
    // Estados de acción
    val uploadStatus: String? = null,
    val accountDeletionSuccess: Boolean = false,
    val error: String? = null,
    
    // Diálogos
    val showDeleteConfirmation: Boolean = false,
    val showLogoutDialog: Boolean = false,
    val showTutorial: Boolean = false,
    val logoutSuccess: Boolean = false
)

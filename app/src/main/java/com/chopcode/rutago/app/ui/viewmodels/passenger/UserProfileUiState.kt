package com.chopcode.rutago.app.ui.viewmodels.passenger

import com.chopcode.rutago.app.models.User

/**
 * 📦 UI STATE: UserProfileUiState
 * Representa el estado de la pantalla de perfil del pasajero.
 */
data class UserProfileUiState(
    val isLoading: Boolean = true,
    val isStatsLoading: Boolean = false,
    val user: User? = null,
    
    // Estadísticas Premium
    val totalSpent: String = "$0",
    val loyaltyPoints: String = "0 pts",
    val favoriteRoute: String = "Cargando...",
    
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

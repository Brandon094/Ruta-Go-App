package com.chopcode.rutago.app.ui.viewmodels.auth

/**
 * 🔒 UI STATE: LoginUiState
 * Representa el estado inmutable de la pantalla de Login.
 */
data class LoginUiState(
    val email: String = "",
    val password: String = "",
    val emailError: String? = null,
    val passwordError: String? = null,
    val isLoading: Boolean = false,
    val error: String? = null,
    val isSuccess: Boolean = false,
    val userType: String? = null,
    val isFormValid: Boolean = false
)

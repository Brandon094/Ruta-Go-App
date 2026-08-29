package com.chopcode.rutago.app.ui.viewmodels.auth

/**
 * 🔑 UI STATE: ForgotPasswordUiState
 */
data class ForgotPasswordUiState(
    val email: String = "",
    val emailError: String? = null,
    val isLoading: Boolean = false,
    val error: String? = null,
    val isSuccess: Boolean = false,
    val isFormValid: Boolean = false
)

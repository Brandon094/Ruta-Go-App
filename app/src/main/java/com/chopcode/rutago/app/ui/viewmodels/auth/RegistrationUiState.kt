package com.chopcode.rutago.app.ui.viewmodels.auth

/**
 * 📝 UI STATE: RegistrationUiState
 */
data class RegistrationUiState(
    val name: String = "",
    val email: String = "",
    val phone: String = "",
    val password: String = "",
    val confirmPassword: String = "",
    val nameError: String? = null,
    val emailError: String? = null,
    val phoneError: String? = null,
    val passwordError: String? = null,
    val confirmPasswordError: String? = null,
    val termsAccepted: Boolean = false,
    val isLoading: Boolean = false,
    val error: String? = null,
    val isSuccess: Boolean = false,
    val isFormValid: Boolean = false
)

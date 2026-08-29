package com.chopcode.rutago.app.ui.viewmodels.passenger

/**
 * 📦 UI STATE: EditProfileUiState
 * Representa el estado de la pantalla de edición de perfil.
 */
data class EditProfileUiState(
    val isLoading: Boolean = false,
    val name: String = "",
    val phone: String = "",
    val email: String = "",
    val currentName: String = "Cargando...",
    val currentPhone: String = "Cargando...",
    val currentEmail: String = "Cargando...",
    val updateSuccess: Boolean = false,
    val error: String? = null
) {
    val isFormValid: Boolean = name.trim().isNotEmpty() && phone.trim().isNotEmpty()
}

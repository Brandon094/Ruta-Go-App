package com.chopcode.rutago.app.ui.viewmodels.profile

/**
 * 📦 UI STATE: EditProfileUiState (Unified)
 * Representa el estado de la pantalla de edición de perfil para todos los roles.
 */
data class EditProfileUiState(
    val isLoading: Boolean = false,
    val role: String = "usuario",
    
    // Campos editables
    val name: String = "",
    val phone: String = "",
    val vehiclePlate: String = "",
    val vehicleModel: String = "",
    
    // Datos actuales (Referencia)
    val email: String = "",
    val currentName: String = "Cargando...",
    val currentPhone: String = "Cargando...",
    val currentEmail: String = "Cargando...",
    val currentPlate: String = "",
    val currentModel: String = "",
    
    val updateSuccess: Boolean = false,
    val error: String? = null
) {
    val isFormValid: Boolean = name.trim().isNotEmpty() && phone.trim().isNotEmpty() && 
        (role == "usuario" || (vehiclePlate.trim().isNotEmpty() && vehicleModel.trim().isNotEmpty()))
}

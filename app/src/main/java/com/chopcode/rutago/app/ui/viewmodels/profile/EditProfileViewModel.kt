package com.chopcode.rutago.app.ui.viewmodels.profile

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.chopcode.rutago.app.config.MyApp
import com.chopcode.rutago.app.data.models.Driver
import com.chopcode.rutago.app.data.models.User
import com.chopcode.rutago.app.services.user.UserService
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import kotlinx.coroutines.tasks.await

/**
 * 🧠 VIEWMODEL: EditProfileViewModel (Unified)
 * Gestor del flujo de actualización de información básica basado en roles.
 */
class EditProfileViewModel : ViewModel() {

    private val _uiState = MutableStateFlow(EditProfileUiState())
    val uiState: StateFlow<EditProfileUiState> = _uiState.asStateFlow()

    private val userService = UserService()

    init {
        loadUserProfile()
    }

    fun loadUserProfile() {
        val userId = MyApp.getCurrentUserId() ?: return
        _uiState.update { it.copy(isLoading = true) }
        
        userService.loadUserData(userId, object : UserService.UserDataCallback {
            override fun onUserDataLoaded(user: User?) {
                user?.let { u ->
                    viewModelScope.launch {
                        // 🛡️ Resolución de Rol para habilitar campos extra
                        val isDriver = MyApp.getDatabaseReference("conductores").child(userId).get().await().exists()
                        val role = if (isDriver) "conductor" else u.rol ?: "usuario"

                        if (isDriver) {
                            loadDriverData(userId, u, role)
                        } else {
                            _uiState.update { 
                                it.copy(
                                    isLoading = false,
                                    role = role,
                                    currentName = u.nombre ?: "N/A",
                                    currentPhone = u.telefono ?: "N/A",
                                    currentEmail = u.email ?: "N/A",
                                    name = u.nombre ?: "",
                                    phone = u.telefono ?: "",
                                    email = u.email ?: ""
                                )
                            }
                        }
                    }
                }
            }

            override fun onError(errorMsg: String?) {
                _uiState.update { it.copy(isLoading = false, error = errorMsg) }
            }
        })
    }

    private fun loadDriverData(userId: String, u: User, role: String) {
        userService.loadDriverData(userId, object : UserService.DriverDataCallback {
            override fun onDriverDataLoaded(driver: Driver?) {
                driver?.let { d ->
                    _uiState.update { 
                        it.copy(
                            isLoading = false,
                            role = role,
                            currentName = u.nombre ?: "N/A",
                            currentPhone = u.telefono ?: "N/A",
                            currentEmail = u.email ?: "N/A",
                            currentPlate = d.vehiclePlate ?: "",
                            currentModel = d.vehicleModel ?: "",
                            name = u.nombre ?: "",
                            phone = u.telefono ?: "",
                            email = u.email ?: "",
                            vehiclePlate = d.vehiclePlate ?: "",
                            vehicleModel = d.vehicleModel ?: ""
                        )
                    }
                }
            }
            override fun onError(error: String?) {
                _uiState.update { it.copy(isLoading = false, error = error) }
            }
        })
    }

    fun onNameChange(newName: String) { _uiState.update { it.copy(name = newName) } }
    fun onPhoneChange(newPhone: String) { _uiState.update { it.copy(phone = newPhone) } }
    fun onPlateChange(newPlate: String) { _uiState.update { it.copy(vehiclePlate = newPlate) } }
    fun onModelChange(newModel: String) { _uiState.update { it.copy(vehicleModel = newModel) } }

    fun updateProfile() {
        val userId = MyApp.getCurrentUserId() ?: return
        val state = _uiState.value
        if (!state.isFormValid) return

        _uiState.update { it.copy(isLoading = true) }
        
        if (state.role == "usuario") {
            userService.updateUserProfile(userId, state.name, state.phone, object : UserService.UserUpdateCallback {
                override fun onSuccess() {
                    _uiState.update { it.copy(isLoading = false, updateSuccess = true) }
                }
                override fun onError(errorMsg: String?) {
                    _uiState.update { it.copy(isLoading = false, error = errorMsg) }
                }
            })
        } else {
            // Actualizar perfil de conductor
            userService.updateDriverProfile(userId, state.name, state.phone, state.vehiclePlate, null, object : UserService.UserUpdateCallback {
                override fun onSuccess() {
                    _uiState.update { it.copy(isLoading = false, updateSuccess = true) }
                }
                override fun onError(errorMsg: String?) {
                    _uiState.update { it.copy(isLoading = false, error = errorMsg) }
                }
            })
        }
    }
}

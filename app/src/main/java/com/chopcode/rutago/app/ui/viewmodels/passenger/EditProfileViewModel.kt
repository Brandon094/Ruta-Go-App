package com.chopcode.rutago.app.ui.viewmodels.passenger

import android.util.Log
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.chopcode.rutago.app.R
import com.chopcode.rutago.app.config.MyApp
import com.chopcode.rutago.app.models.User
import com.chopcode.rutago.app.services.user.UserService
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch

/**
 * 🧠 VIEWMODEL: EditProfileViewModel
 * Gestor del flujo de actualización de información básica del pasajero.
 */
class EditProfileViewModel : ViewModel() {

    private val _uiState = MutableStateFlow(EditProfileUiState())
    val uiState: StateFlow<EditProfileUiState> = _uiState.asStateFlow()

    private val userService = UserService()

    init {
        loadUserProfile()
    }

    fun loadUserProfile() {
        val userId = MyApp.getCurrentUserId()
        if (userId == null) {
            _uiState.update { it.copy(error = "Usuario no autenticado") }
            return
        }

        _uiState.update { it.copy(isLoading = true) }
        
        userService.loadUserData(userId, object : UserService.UserDataCallback {
            override fun onUserDataLoaded(user: User?) {
                user?.let { u ->
                    _uiState.update { 
                        it.copy(
                            isLoading = false,
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

            override fun onError(errorMsg: String?) {
                _uiState.update { it.copy(isLoading = false, error = errorMsg) }
            }
        })
    }

    fun onNameChange(newName: String) {
        _uiState.update { it.copy(name = newName) }
    }

    fun onPhoneChange(newPhone: String) {
        _uiState.update { it.copy(phone = newPhone) }
    }

    fun updateProfile() {
        val userId = MyApp.getCurrentUserId() ?: return
        val state = _uiState.value
        
        if (!state.isFormValid) return

        _uiState.update { it.copy(isLoading = true) }
        
        userService.updateUserProfile(userId, state.name, state.phone, object : UserService.UserUpdateCallback {
            override fun onSuccess() {
                _uiState.update { it.copy(isLoading = false, updateSuccess = true) }
            }

            override fun onError(errorMsg: String?) {
                _uiState.update { it.copy(isLoading = false, error = errorMsg) }
            }
        })
    }
}

package com.chopcode.rutago.app.ui.viewmodels.auth

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import com.chopcode.rutago.app.ui.utils.ValidatorUtils
import com.chopcode.rutago.app.data.repositories.auth.AuthRepository
import com.chopcode.rutago.app.data.repositories.auth.AuthRepositoryImpl

/**
 * 🧠 VIEWMODEL: ForgotPasswordViewModel (Kotlin)
 */
class ForgotPasswordViewModel(
    private val repository: AuthRepository = AuthRepositoryImpl()
) : ViewModel() {

    private val _uiState = MutableStateFlow(ForgotPasswordUiState())
    val uiState: StateFlow<ForgotPasswordUiState> = _uiState.asStateFlow()

    fun onEmailChanged(email: String) {
        val isValid = ValidatorUtils.isValidEmail(email)
        _uiState.update { 
            it.copy(
                email = email, 
                emailError = if (email.isNotEmpty() && !isValid) "Correo inválido" else null,
                error = null,
                isFormValid = isValid
            ) 
        }
    }

    fun recoverPassword() {
        val currentState = _uiState.value
        viewModelScope.launch {
            _uiState.update { it.copy(isLoading = true, error = null) }
            
            val result = repository.recoverPassword(currentState.email)
            
            result.onSuccess {
                _uiState.update { it.copy(isLoading = false, isSuccess = true) }
            }.onFailure { e ->
                _uiState.update { it.copy(isLoading = false, error = e.message ?: "Error al enviar correo") }
            }
        }
    }
}

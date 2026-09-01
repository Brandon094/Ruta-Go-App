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
 * 🧠 VIEWMODEL: LoginViewModel (Kotlin)
 * Gestiona la lógica de autenticación y emite estados de UI.
 */
class LoginViewModel(
    private val repository: AuthRepository = AuthRepositoryImpl()
) : ViewModel() {

    private val _uiState = MutableStateFlow(LoginUiState())
    val uiState: StateFlow<LoginUiState> = _uiState.asStateFlow()

    fun onEmailChanged(email: String) {
        val isValid = ValidatorUtils.isValidEmail(email)
        _uiState.update { 
            it.copy(
                email = email, 
                emailError = if (email.isNotEmpty() && !isValid) "Correo inválido" else null,
                error = null,
                isFormValid = isValid && ValidatorUtils.isValidPassword(it.password)
            ) 
        }
    }

    fun onPasswordChanged(password: String) {
        val isValid = ValidatorUtils.isValidPassword(password)
        _uiState.update { 
            it.copy(
                password = password, 
                passwordError = if (password.isNotEmpty() && !isValid) "Mínimo 6 caracteres" else null,
                error = null,
                isFormValid = ValidatorUtils.isValidEmail(it.email) && isValid
            ) 
        }
    }

    fun login() {
        val currentState = _uiState.value
        viewModelScope.launch {
            _uiState.update { it.copy(isLoading = true, error = null) }
            
            val result = repository.login(currentState.email, currentState.password)
            
            result.onSuccess { userType ->
                _uiState.update { it.copy(isLoading = false, isSuccess = true, userType = userType) }
            }.onFailure { e ->
                _uiState.update { it.copy(isLoading = false, error = e.message ?: "Error al iniciar sesión") }
            }
        }
    }

    fun onGoogleSignInStarted() {
        _uiState.update { it.copy(isLoading = true, error = null) }
    }

    fun onGoogleSignInError(errorMsg: String) {
        _uiState.update { it.copy(isLoading = false, error = errorMsg) }
    }

    fun onGoogleSignInCanceled() {
        _uiState.update { it.copy(isLoading = false, error = "Inicio de sesión con Google cancelado") }
    }

    fun loginWithGoogle(idToken: String) {
        viewModelScope.launch {
            _uiState.update { it.copy(isLoading = true, error = null) }
            val result = repository.loginWithGoogle(idToken)
            result.onSuccess { userType ->
                _uiState.update { it.copy(isLoading = false, isSuccess = true, userType = userType) }
            }.onFailure { e ->
                _uiState.update { it.copy(isLoading = false, error = e.message ?: "Error con Google") }
            }
        }
    }

    fun resetError() {
        _uiState.update { it.copy(error = null) }
    }
}

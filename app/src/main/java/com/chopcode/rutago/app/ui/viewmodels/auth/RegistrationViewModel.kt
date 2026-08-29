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
 * 🧠 VIEWMODEL: RegistrationViewModel (Kotlin)
 */
class RegistrationViewModel(
    private val repository: AuthRepository = AuthRepositoryImpl()
) : ViewModel() {

    private val _uiState = MutableStateFlow(RegistrationUiState())
    val uiState: StateFlow<RegistrationUiState> = _uiState.asStateFlow()

    fun onNameChanged(name: String) {
        val isValid = ValidatorUtils.isValidName(name)
        _uiState.update { it.copy(
            name = name, 
            nameError = if (name.isNotEmpty() && !isValid) "Nombre muy corto" else null,
            error = null, 
            isFormValid = validate(it.copy(name = name))
        ) }
    }

    fun onEmailChanged(email: String) {
        val isValid = ValidatorUtils.isValidEmail(email)
        _uiState.update { it.copy(
            email = email, 
            emailError = if (email.isNotEmpty() && !isValid) "Correo inválido" else null,
            error = null, 
            isFormValid = validate(it.copy(email = email))
        ) }
    }

    fun onPhoneChanged(phone: String) {
        val isValid = ValidatorUtils.isValidPhone(phone)
        _uiState.update { it.copy(
            phone = phone, 
            phoneError = if (phone.isNotEmpty() && !isValid) "Mínimo 10 dígitos" else null,
            error = null, 
            isFormValid = validate(it.copy(phone = phone))
        ) }
    }

    fun onPasswordChanged(password: String) {
        val isValid = ValidatorUtils.isValidPassword(password)
        _uiState.update { it.copy(
            password = password, 
            passwordError = if (password.isNotEmpty() && !isValid) "Mínimo 6 caracteres" else null,
            error = null, 
            isFormValid = validate(it.copy(password = password))
        ) }
    }

    fun onConfirmPasswordChanged(confirm: String) {
        _uiState.update { it.copy(
            confirmPassword = confirm, 
            confirmPasswordError = if (confirm.isNotEmpty() && confirm != it.password) "Las contraseñas no coinciden" else null,
            error = null, 
            isFormValid = validate(it.copy(confirmPassword = confirm))
        ) }
    }

    fun onTermsAcceptedChanged(accepted: Boolean) {
        _uiState.update { it.copy(termsAccepted = accepted, error = null, isFormValid = validate(it.copy(termsAccepted = accepted))) }
    }

    private fun validate(s: RegistrationUiState): Boolean {
        return ValidatorUtils.isValidName(s.name) && 
               ValidatorUtils.isValidEmail(s.email) && 
               ValidatorUtils.isValidPhone(s.phone) &&
               ValidatorUtils.isValidPassword(s.password) && 
               s.password == s.confirmPassword &&
               s.termsAccepted
    }

    fun register() {
        val s = _uiState.value
        viewModelScope.launch {
            _uiState.update { it.copy(isLoading = true, error = null) }
            
            val result = repository.register(s.name, s.email, s.phone, s.password)
            
            result.onSuccess {
                _uiState.update { it.copy(isLoading = false, isSuccess = true) }
            }.onFailure { e ->
                _uiState.update { it.copy(isLoading = false, error = e.message ?: "Error al registrarse") }
            }
        }
    }
}

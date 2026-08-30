package com.chopcode.rutago.app.ui.viewmodels.auth

import androidx.lifecycle.ViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import com.chopcode.rutago.app.R
import com.chopcode.rutago.app.config.MyApp
import com.chopcode.rutago.app.data.repositories.settings.SettingsRepository
import com.chopcode.rutago.app.data.repositories.settings.SettingsRepositoryImpl

/**
 * 🧠 VIEWMODEL: OnboardingViewModel (Kotlin)
 */
class OnboardingViewModel(
    private val repository: SettingsRepository = SettingsRepositoryImpl(MyApp.getAppContext())
) : ViewModel() {

    private val _uiState = MutableStateFlow(OnboardingUiState())
    val uiState: StateFlow<OnboardingUiState> = _uiState.asStateFlow()

    init {
        loadPages()
    }

    private fun loadPages() {
        val pages = listOf(
            OnboardingPage(
                imageRes = R.drawable.ic_bus,
                title = "Bienvenido a Ruta-Go",
                description = "La forma más fácil y rápida de asegurar tu viaje intermunicipal entre Natagá y La Plata."
            ),
            OnboardingPage(
                imageRes = R.drawable.ic_seat,
                title = "Reserva tu asiento",
                description = "Elige tu puesto favorito en tiempo real y evita filas. Tu viaje está a un clic de distancia."
            ),
            OnboardingPage(
                imageRes = R.drawable.ic_check,
                title = "Seguridad y Confianza",
                description = "Conoce a tu conductor y califica tu experiencia. Viajamos juntos, viajamos seguros."
            )
        )
        _uiState.update { it.copy(pages = pages) }
    }

    fun onPageChanged(page: Int) {
        _uiState.update { 
            it.copy(
                currentPage = page,
                isLastPage = page == it.pages.size - 1
            ) 
        }
    }

    fun onNextClick() {
        val current = _uiState.value.currentPage
        val total = _uiState.value.pages.size
        
        if (current < total - 1) {
            _uiState.update { it.copy(currentPage = current + 1) }
        } else {
            completeOnboarding()
        }
    }

    fun onSkipClick() {
        completeOnboarding()
    }

    private fun completeOnboarding() {
        repository.setFirstTimeLaunch(false)
        _uiState.update { it.copy(navigateToLogin = true) }
    }
}

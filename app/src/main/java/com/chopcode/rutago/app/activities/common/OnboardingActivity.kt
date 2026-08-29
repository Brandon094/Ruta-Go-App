package com.chopcode.rutago.app.activities.common

import android.content.Intent
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.viewModels
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import com.chopcode.rutago.app.data.repositories.settings.SettingsRepositoryImpl
import com.chopcode.rutago.app.ui.screens.auth.OnboardingScreen
import com.chopcode.rutago.app.ui.theme.RutaGoTheme
import com.chopcode.rutago.app.ui.viewmodels.auth.OnboardingViewModel

/**
 * 🚀 OnboardingActivity (Kotlin + Compose)
 */
class OnboardingActivity : ComponentActivity() {

    private val viewModel: OnboardingViewModel by viewModels {
        object : ViewModelProvider.Factory {
            override fun <T : ViewModel> create(modelClass: Class<T>): T {
                return OnboardingViewModel(SettingsRepositoryImpl(applicationContext)) as T
            }
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        setContent {
            RutaGoTheme {
                val uiState by viewModel.uiState.collectAsState()
                
                // Efecto de navegación
                if (uiState.navigateToLogin) {
                    navigateToLogin()
                }

                OnboardingScreen(
                    uiState = uiState,
                    onPageChanged = { viewModel.onPageChanged(it) },
                    onNextClick = { viewModel.onNextClick() },
                    onSkipClick = { viewModel.onSkipClick() }
                )
            }
        }
    }

    private fun navigateToLogin() {
        startActivity(Intent(this, LoginActivity::class.java))
        finish()
    }
}

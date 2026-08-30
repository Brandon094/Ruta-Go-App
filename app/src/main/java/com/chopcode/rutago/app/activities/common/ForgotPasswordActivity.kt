package com.chopcode.rutago.app.activities.common

import android.os.Bundle
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.lifecycle.viewmodel.compose.viewModel
import com.chopcode.rutago.app.ui.screens.auth.ForgotPasswordScreen
import com.chopcode.rutago.app.ui.theme.RutaGoTheme
import com.chopcode.rutago.app.ui.viewmodels.auth.ForgotPasswordViewModel

/**
 * 🔑 ACTIVITY: ForgotPasswordActivity (Kotlin + Compose)
 * Pantalla para recuperar la contraseña del usuario.
 */
class ForgotPasswordActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        enableEdgeToEdge()
        super.onCreate(savedInstanceState)

        val prefilledEmail = intent.getStringExtra("email") ?: ""

        setContent {
            RutaGoTheme {
                val viewModel: ForgotPasswordViewModel = viewModel()
                val uiState by viewModel.uiState.collectAsState()

                // Prefijar correo si viene de Login
                LaunchedEffect(Unit) {
                    if (prefilledEmail.isNotEmpty()) {
                        viewModel.onEmailChanged(prefilledEmail)
                    }
                }

                ForgotPasswordScreen(
                    uiState = uiState,
                    onEmailChange = { viewModel.onEmailChanged(it) },
                    onRecoverClick = { viewModel.recoverPassword() },
                    onBackClick = { finish() },
                    onUnderstoodClick = { finish() }
                )
            }
        }
    }
}

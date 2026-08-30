package com.chopcode.rutago.app.activities.common

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.result.IntentSenderRequest
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.lifecycle.viewmodel.compose.viewModel
import com.chopcode.rutago.app.R
import com.chopcode.rutago.app.managers.core.permissions.PermissionManager
import com.chopcode.rutago.app.services.auth.GoogleLoginService
import com.chopcode.rutago.app.ui.screens.auth.LoginScreen
import com.chopcode.rutago.app.ui.theme.RutaGoTheme
import com.chopcode.rutago.app.ui.viewmodels.auth.LoginViewModel
import com.google.android.gms.auth.api.identity.Identity

/**
 * 🚀 ACTIVITY: LoginActivity (Kotlin + Compose)
 * Punto de entrada para la autenticación de usuarios.
 */
class LoginActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        enableEdgeToEdge()
        super.onCreate(savedInstanceState)
        
        PermissionManager.requestNotificationPermission(this)

        setContent {
            RutaGoTheme {
                val viewModel: LoginViewModel = viewModel()
                val uiState by viewModel.uiState.collectAsState()

                val googleLoginService = GoogleLoginService(this)
                val oneTapClient = Identity.getSignInClient(this)

                val googleLauncher = rememberLauncherForActivityResult(
                    contract = ActivityResultContracts.StartIntentSenderForResult()
                ) { result ->
                    if (result.resultCode == RESULT_OK) {
                        try {
                            val credential = oneTapClient.getSignInCredentialFromIntent(result.data)
                            val idToken = credential.googleIdToken
                            if (idToken != null) {
                                viewModel.loginWithGoogle(idToken)
                            }
                        } catch (e: Exception) {
                            Toast.makeText(this, "Error con Google: ${e.message}", Toast.LENGTH_SHORT).show()
                        }
                    }
                }

                if (uiState.isSuccess) {
                    LaunchedEffect(Unit) {
                        startActivity(Intent(this@LoginActivity, HomeActivity::class.java))
                        finish()
                    }
                }

                LoginScreen(
                    uiState = uiState,
                    onEmailChange = { viewModel.onEmailChanged(it) },
                    onPasswordChange = { viewModel.onPasswordChanged(it) },
                    onLoginClick = { viewModel.login() },
                    onGoogleLoginClick = {
                        oneTapClient.beginSignIn(googleLoginService.getSignInRequest())
                            .addOnSuccessListener { result ->
                                googleLauncher.launch(
                                    IntentSenderRequest.Builder(result.pendingIntent.intentSender).build()
                                )
                            }
                            .addOnFailureListener { e ->
                                Toast.makeText(this, "Error One Tap: ${e.message}", Toast.LENGTH_SHORT).show()
                            }
                    },
                    onRegisterClick = {
                        startActivity(Intent(this, RegistrationActivity::class.java))
                    },
                    onForgotPasswordClick = {
                        val intent = Intent(this, ForgotPasswordActivity::class.java).apply {
                            putExtra("email", uiState.email)
                        }
                        startActivity(intent)
                    }
                )
            }
        }
    }
}

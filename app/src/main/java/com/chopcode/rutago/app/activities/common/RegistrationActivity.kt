package com.chopcode.rutago.app.activities.common

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.webkit.WebView
import android.widget.Toast
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.lifecycle.viewmodel.compose.viewModel
import com.chopcode.rutago.app.R
import com.chopcode.rutago.app.ui.screens.auth.RegistrationScreen
import com.chopcode.rutago.app.ui.theme.RutaGoTheme
import com.chopcode.rutago.app.ui.viewmodels.auth.RegistrationViewModel
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import java.util.*

/**
 * 📝 ACTIVITY: RegistrationActivity (Kotlin + Compose)
 * Pantalla de registro para nuevos usuarios.
 */
class RegistrationActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        enableEdgeToEdge()
        super.onCreate(savedInstanceState)

        setContent {
            RutaGoTheme {
                val viewModel: RegistrationViewModel = viewModel()
                val uiState by viewModel.uiState.collectAsState()

                if (uiState.isSuccess) {
                    LaunchedEffect(Unit) {
                        Toast.makeText(this@RegistrationActivity, R.string.user_registered_success, Toast.LENGTH_SHORT).show()
                        startActivity(Intent(this@RegistrationActivity, LoginActivity::class.java))
                        finish()
                    }
                }

                RegistrationScreen(
                    uiState = uiState,
                    onNameChange = { viewModel.onNameChanged(it) },
                    onEmailChange = { viewModel.onEmailChanged(it) },
                    onPhoneChange = { viewModel.onPhoneChanged(it) },
                    onPasswordChange = { viewModel.onPasswordChanged(it) },
                    onConfirmPasswordChange = { viewModel.onConfirmPasswordChanged(it) },
                    onTermsAcceptedChange = { viewModel.onTermsAcceptedChanged(it) },
                    onRegisterClick = { viewModel.register() },
                    onLoginClick = {
                        startActivity(Intent(this, LoginActivity::class.java))
                        finish()
                    },
                    onShowTerms = { showLegalDialog(R.raw.terms_conditions, getString(R.string.terms_and_conditions), viewModel) },
                    onShowPrivacy = { showLegalDialog(R.raw.privacy_policy, getString(R.string.privacy_policy), viewModel) }
                )
            }
        }
    }

    private fun showLegalDialog(rawResourceId: Int, title: String, viewModel: RegistrationViewModel) {
        val dialogView = LayoutInflater.from(this).inflate(R.layout.dialog_privacy_policy, null)
        val webView = dialogView.findViewById<WebView>(R.id.webViewPrivacy)
        try {
            val inputStream = resources.openRawResource(rawResourceId)
            val scanner = Scanner(inputStream).useDelimiter("\\A")
            val htmlContent = if (scanner.hasNext()) scanner.next() else ""
            inputStream.close()
            webView.loadDataWithBaseURL(null, htmlContent, "text/html", "UTF-8", null)
            
            MaterialAlertDialogBuilder(this, R.style.AppDialogTheme)
                .setTitle(title)
                .setView(dialogView)
                .setPositiveButton(R.string.legal_accept) { _, _ -> 
                    viewModel.onTermsAcceptedChanged(true)
                }
                .setNegativeButton(R.string.close, null)
                .show()
        } catch (e: Exception) {
            Toast.makeText(this, "Error al cargar documento legal", Toast.LENGTH_SHORT).show()
        }
    }
}

package com.chopcode.rutago.app.services.auth

import android.content.Context
import android.content.Intent
import androidx.activity.result.IntentSenderRequest
import com.google.android.gms.auth.api.identity.BeginSignInRequest
import com.google.android.gms.auth.api.identity.Identity
import com.google.android.gms.auth.api.identity.SignInClient
import com.google.android.gms.common.api.ApiException

/**
 * 🛰️ SERVICE: GoogleLoginService (Kotlin)
 * Implementación de autenticación mediante Google One Tap para Jetpack Compose.
 */
class GoogleLoginService(context: Context) {

    companion object {
        private const val CLIENT_ID = "175264872585-abombvqq36bqqeet86onnhkf7uep6c60.apps.googleusercontent.com"
    }

    private val oneTapClient: SignInClient = Identity.getSignInClient(context)
    private val signInRequest: BeginSignInRequest = BeginSignInRequest.builder()
        .setGoogleIdTokenRequestOptions(
            BeginSignInRequest.GoogleIdTokenRequestOptions.builder()
                .setSupported(true)
                .setServerClientId(CLIENT_ID)
                .setFilterByAuthorizedAccounts(false)
                .build()
        )
        .build()

    fun startSignIn(
        onLaunchIntentSender: (IntentSenderRequest) -> Unit,
        onError: (String) -> Unit
    ) {
        oneTapClient.beginSignIn(signInRequest)
            .addOnSuccessListener { result ->
                try {
                    val intentSenderRequest = IntentSenderRequest.Builder(result.pendingIntent.intentSender).build()
                    onLaunchIntentSender(intentSenderRequest)
                } catch (e: Exception) {
                    onError(e.message ?: "Error al iniciar flujo de Google")
                }
            }
            .addOnFailureListener { e ->
                onError(e.message ?: "Error al conectar con Google One Tap")
            }
    }

    fun getGoogleIdTokenFromIntent(data: Intent?): String? {
        if (data == null) return null
        return try {
            val credential = oneTapClient.getSignInCredentialFromIntent(data)
            credential.googleIdToken
        } catch (e: ApiException) {
            null
        }
    }
}

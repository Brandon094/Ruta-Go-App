package com.chopcode.rutago.app.services.auth

import android.app.Activity
import android.content.Intent
import android.util.Log
import com.chopcode.rutago.app.R
import com.chopcode.rutago.app.config.MyApp
import com.google.android.gms.auth.api.identity.BeginSignInRequest
import com.google.android.gms.auth.api.identity.Identity
import com.google.android.gms.auth.api.identity.SignInClient
import com.google.android.gms.common.api.ApiException
import com.google.android.gms.common.api.CommonStatusCodes
import com.google.firebase.auth.GoogleAuthProvider

/**
 * 🛰️ SERVICE: GoogleLoginService (Kotlin)
 * Implementación de autenticación mediante Google One Tap.
 */
class GoogleLoginService(private val activity: Activity) {

    companion object {
        const val REQ_ONE_TAP = 123
        private const val CLIENT_ID = "175264872585-abombvqq36bqqeet86onnhkf7uep6c60.apps.googleusercontent.com"
    }

    private val oneTapClient: SignInClient = Identity.getSignInClient(activity)
    private val signInRequest: BeginSignInRequest = BeginSignInRequest.builder()
        .setGoogleIdTokenRequestOptions(
            BeginSignInRequest.GoogleIdTokenRequestOptions.builder()
                .setSupported(true)
                .setServerClientId(CLIENT_ID)
                .setFilterByAuthorizedAccounts(false)
                .build()
        )
        .setAutoSelectEnabled(true)
        .build()

    fun startSignInFlow(onIntentReady: (Intent) -> Unit, onError: (String?) -> Unit) {
        oneTapClient.beginSignIn(signInRequest)
            .addOnSuccessListener(activity) { result ->
                try {
                    onIntentReady(result.pendingIntent.intentSender.run { 
                        // No podemos devolver un IntentSender directamente para rememberLauncherForActivityResult
                        // Pero sí podemos dispararlo desde la Activity
                        null // Placeholder
                    } ?: return@addOnSuccessListener)
                } catch (e: Exception) {
                    onError(e.message)
                }
            }
            .addOnFailureListener(activity) { e ->
                onError(e.message)
            }
    }

    // Simplificado para Compose: La Activity maneja el Result
    fun getOneTapClient() = oneTapClient
    fun getSignInRequest() = signInRequest
}

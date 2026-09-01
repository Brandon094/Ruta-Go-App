package com.chopcode.rutago.app.services.auth

import android.content.Context
import android.content.Intent
import android.util.Log
import androidx.activity.result.IntentSenderRequest
import com.google.android.gms.auth.api.identity.BeginSignInRequest
import com.google.android.gms.auth.api.identity.Identity
import com.google.android.gms.auth.api.identity.SignInClient
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInClient
import com.google.android.gms.auth.api.signin.GoogleSignInOptions
import com.google.android.gms.common.api.ApiException

/**
 * 🛰️ SERVICE: GoogleLoginService (Kotlin)
 * Implementación de autenticación mediante Google One Tap con fallback a GoogleSignIn.
 */
class GoogleLoginService(private val context: Context) {

    companion object {
        private const val CLIENT_ID = "175264872585-abombvqq36bqqeet86onnhkf7uep6c60.apps.googleusercontent.com"
        private const val TAG = "GoogleLoginService"
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

    private val googleSignInClient: GoogleSignInClient by lazy {
        val gso = GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
            .requestIdToken(CLIENT_ID)
            .requestEmail()
            .build()
        GoogleSignIn.getClient(context, gso)
    }

    fun startSignIn(
        onLaunchIntentSender: (IntentSenderRequest) -> Unit,
        onLaunchStandardSignIn: (Intent) -> Unit,
        onError: (String) -> Unit
    ) {
        Log.d(TAG, "🚀 Iniciando flujo de inicio de sesión con Google...")
        // 1. Intentar con Google One Tap primero
        oneTapClient.beginSignIn(signInRequest)
            .addOnSuccessListener { result ->
                try {
                    val intentSenderRequest = IntentSenderRequest.Builder(result.pendingIntent.intentSender).build()
                    Log.d(TAG, "✅ IntentSender de One Tap obtenido exitosamente")
                    onLaunchIntentSender(intentSenderRequest)
                } catch (e: Exception) {
                    Log.w(TAG, "⚠️ Error al crear IntentSender de One Tap, usando fallback estándar: ${e.message}")
                    launchStandardFallback(onLaunchStandardSignIn)
                }
            }
            .addOnFailureListener { e ->
                Log.w(TAG, "⚠️ One Tap no disponible o enfriado, usando fallback estándar: ${e.message}")
                launchStandardFallback(onLaunchStandardSignIn)
            }
    }

    private fun launchStandardFallback(onLaunchStandardSignIn: (Intent) -> Unit) {
        try {
            val signInIntent = googleSignInClient.signInIntent
            Log.d(TAG, "🚀 Lanzando Selector de Cuentas estándar de Google")
            onLaunchStandardSignIn(signInIntent)
        } catch (e: Exception) {
            Log.e(TAG, "❌ Error al iniciar GoogleSignInClient: ${e.message}")
        }
    }

    fun getGoogleIdTokenFromOneTapIntent(data: Intent?): String? {
        if (data == null) return null
        return try {
            val credential = oneTapClient.getSignInCredentialFromIntent(data)
            credential.googleIdToken
        } catch (e: ApiException) {
            Log.w(TAG, "⚠️ Fallo al extraer token de One Tap intent: ${e.message}")
            null
        }
    }

    fun getGoogleIdTokenFromStandardIntent(data: Intent?): String? {
        if (data == null) return null
        return try {
            val task = GoogleSignIn.getSignedInAccountFromIntent(data)
            val account = task.getResult(ApiException::class.java)
            account?.idToken
        } catch (e: ApiException) {
            Log.e(TAG, "❌ Fallo al extraer token de Standard Sign-In intent: statusCode=${e.statusCode}, msg=${e.message}")
            null
        }
    }
}

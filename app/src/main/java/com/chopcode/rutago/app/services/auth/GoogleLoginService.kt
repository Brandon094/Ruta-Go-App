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
        oneTapClient.beginSignIn(signInRequest)
            .addOnSuccessListener { result ->
                try {
                    val intentSenderRequest = IntentSenderRequest.Builder(result.pendingIntent.intentSender).build()
                    Log.d(TAG, "✅ IntentSender de One Tap obtenido exitosamente")
                    onLaunchIntentSender(intentSenderRequest)
                } catch (e: Exception) {
                    Log.w(TAG, "⚠️ Error al crear IntentSender de One Tap, usando fallback estándar: ${e.message}")
                    launchStandardFallback(onLaunchStandardSignIn, onError)
                }
            }
            .addOnFailureListener { e ->
                Log.w(TAG, "⚠️ One Tap no disponible o enfriado, usando fallback estándar: ${e.message}")
                launchStandardFallback(onLaunchStandardSignIn, onError)
            }
    }

    private fun launchStandardFallback(
        onLaunchStandardSignIn: (Intent) -> Unit,
        onError: (String) -> Unit
    ) {
        try {
            val signInIntent = googleSignInClient.signInIntent
            Log.d(TAG, "🚀 Lanzando Selector de Cuentas estándar de Google")
            onLaunchStandardSignIn(signInIntent)
        } catch (e: Exception) {
            Log.e(TAG, "❌ Error al iniciar GoogleSignInClient: ${e.message}")
            onError(e.message ?: "Error al conectar con Google Sign-In")
        }
    }

    fun getGoogleIdTokenFromOneTapIntent(data: Intent?, onError: (String) -> Unit): String? {
        if (data == null) {
            onError("No se recibió respuesta del servicio de Google")
            return null
        }
        return try {
            val credential = oneTapClient.getSignInCredentialFromIntent(data)
            credential.googleIdToken ?: run {
                onError("No se obtuvo el token de autenticación de Google")
                null
            }
        } catch (e: ApiException) {
            Log.w(TAG, "⚠️ Fallo al extraer token de One Tap intent: code=${e.statusCode}, msg=${e.message}")
            val userMsg = mapApiExceptionToMessage(e)
            onError(userMsg)
            null
        }
    }

    fun getGoogleIdTokenFromStandardIntent(data: Intent?, onError: (String) -> Unit): String? {
        if (data == null) {
            onError("No se recibió respuesta del selector de Google")
            return null
        }
        return try {
            val task = GoogleSignIn.getSignedInAccountFromIntent(data)
            val account = task.getResult(ApiException::class.java)
            account?.idToken ?: run {
                onError("No se pudo obtener el token de Google")
                null
            }
        } catch (e: ApiException) {
            Log.e(TAG, "❌ Fallo al extraer token de Standard Sign-In: statusCode=${e.statusCode}, msg=${e.message}")
            val userMsg = mapApiExceptionToMessage(e)
            onError(userMsg)
            null
        }
    }

    private fun mapApiExceptionToMessage(e: ApiException): String {
        return when (e.statusCode) {
            12500 -> "Error de configuración Google (SHA-1). Contacta al administrador."
            12501 -> "Inicio de sesión cancelado por el usuario"
            12502 -> "Inicio de sesión con Google en progreso..."
            7 -> "Sin conexión a Internet. Verifica tu red."
            10 -> "Fallo de desarrollador en cliente Google."
            else -> e.message ?: "Error de autenticación con Google (Código: ${e.statusCode})"
        }
    }
}

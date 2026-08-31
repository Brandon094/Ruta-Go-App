package com.chopcode.rutago.app.managers.core.auth

import android.content.Context
import android.content.Intent
import android.util.Log
import android.widget.Toast
import com.chopcode.rutago.app.activities.common.MainActivity
import com.chopcode.rutago.app.config.MyApp
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseUser

/**
 * Auth Manager (Singleton)
 *
 * Componente central para la gestión del ciclo de vida de la sesión del usuario.
 */
class AuthManager private constructor() {

    private val auth: FirebaseAuth
        get() = MyApp.getFirebaseAuthInstance()

    val currentUser: FirebaseUser?
        get() = auth.currentUser

    val isUserLoggedIn: Boolean
        get() = currentUser != null

    val userId: String?
        get() = currentUser?.uid

    val isEmailVerified: Boolean
        get() = currentUser?.isEmailVerified == true

    fun validateLogin(context: Context): Boolean {
        if (!isUserLoggedIn) {
            Toast.makeText(context, "Debes iniciar sesión", Toast.LENGTH_SHORT).show()
            redirectToLogin(context)
            return false
        }
        return true
    }

    fun redirectToLogin(context: Context) {
        try {
            val intent = Intent(context, MainActivity::class.java).apply {
                flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
            }
            context.startActivity(intent)
        } catch (e: Exception) {
            Log.e(TAG, "❌ Error fatal en redirección: ${e.message}")
        }
    }

    fun signOut(context: Context) {
        try {
            auth.signOut()
            redirectToLogin(context)
        } catch (e: Exception) {
            Log.e(TAG, "💥 Error al cerrar sesión: ${e.message}")
        }
    }

    companion object {
        private const val TAG = "AuthManager"

        @Volatile
        private var instance: AuthManager? = null

        @JvmStatic
        fun getInstance(): AuthManager {
            return instance ?: synchronized(this) {
                instance ?: AuthManager().also { instance = it }
            }
        }
    }
}

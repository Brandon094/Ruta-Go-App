package com.chopcode.rutago.app.activities.common

import android.annotation.SuppressLint
import android.content.Intent
import android.os.Bundle
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
import androidx.lifecycle.lifecycleScope
import com.chopcode.rutago.app.activities.common.HomeActivity
import com.chopcode.rutago.app.config.MyApp
import com.chopcode.rutago.app.managers.core.settings.SessionManager
import com.google.firebase.database.DataSnapshot
import com.google.firebase.database.DatabaseError
import com.google.firebase.database.ValueEventListener
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

/**
 * 🚀 SplashActivity (Kotlin)
 * Punto de entrada frío de la aplicación. Gestiona la lógica de sesión y onboarding inicial.
 */
@SuppressLint("CustomSplashScreen")
class SplashActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        installSplashScreen()
        enableEdgeToEdge()
        super.onCreate(savedInstanceState)

        lifecycleScope.launch {
            delay(1500) // Animación mínima del logo
            checkSession()
        }
    }

    private fun checkSession() {
        val sessionManager = SessionManager(this)
        
        if (sessionManager.isFirstTimeLaunch) {
            navigateTo(OnboardingActivity::class.java)
        } else {
            checkAuthAndNavigate()
        }
    }

    private fun checkAuthAndNavigate() {
        val auth = MyApp.getFirebaseAuthInstance()
        if (auth.currentUser != null) {
            // El Home unificado se encarga de resolver el rol internamente
            navigateTo(HomeActivity::class.java)
        } else {
            navigateTo(LoginActivity::class.java)
        }
    }

    private fun navigateTo(destination: Class<*>) {
        val intent = Intent(this, destination)
        intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
        startActivity(intent)
        finish()
    }
}

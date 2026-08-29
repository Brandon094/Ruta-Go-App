package com.chopcode.rutago.app.activities.common

import android.annotation.SuppressLint
import android.content.Intent
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
import androidx.lifecycle.lifecycleScope
import com.chopcode.rutago.app.activities.driver.DriverHomeActivity
import com.chopcode.rutago.app.activities.passenger.PassengerHomeActivity
import com.chopcode.rutago.app.config.MyApp
import com.chopcode.rutago.app.managers.core.settings.SessionManager
import com.google.firebase.database.DataSnapshot
import com.google.firebase.database.DatabaseError
import com.google.firebase.database.ValueEventListener
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

/**
 * 🚀 SplashActivity (Kotlin + Splash API)
 * Punto de entrada premium del ecosistema Ruta-Go.
 */
@SuppressLint("CustomSplashScreen")
class SplashActivity : ComponentActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        // 1. Instalar el Splash Oficial de Android
        val splashScreen = installSplashScreen()
        super.onCreate(savedInstanceState)

        // 2. Mantenerlo visible un poco para branding si es necesario
        // O dejarlo hasta que se cargue la data
        
        checkSession()
    }

    private fun checkSession() {
        val user = MyApp.getCurrentUser()
        val sessionManager = SessionManager(this)

        lifecycleScope.launch {
            delay(1000) // Branding delay

            if (user == null) {
                if (sessionManager.isFirstTimeLaunch) {
                    startActivity(Intent(this@SplashActivity, OnboardingActivity::class.java))
                } else {
                    startActivity(Intent(this@SplashActivity, LoginActivity::class.java))
                }
                finish()
            } else {
                resolveUserRole(user.uid)
            }
        }
    }

    private fun resolveUserRole(uid: String) {
        val db = MyApp.getDatabaseReference("")
        
        // Verificar en conductores
        db.child("conductores").child(uid).addListenerForSingleValueEvent(object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                if (snapshot.exists()) {
                    navigateTo(DriverHomeActivity::class.java)
                } else {
                    // Si no es conductor, asumimos pasajero
                    navigateTo(PassengerHomeActivity::class.java)
                }
            }
            override fun onCancelled(error: DatabaseError) {
                navigateTo(LoginActivity::class.java)
            }
        })
    }

    private fun navigateTo(activityClass: Class<*>) {
        startActivity(Intent(this, activityClass))
        finish()
    }
}

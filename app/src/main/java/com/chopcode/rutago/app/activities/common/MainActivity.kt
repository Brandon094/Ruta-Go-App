package com.chopcode.rutago.app.activities.common

import android.os.Bundle
import android.widget.Toast
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.compose.rememberNavController
import com.chopcode.rutago.app.config.MyApp
import com.chopcode.rutago.app.data.repositories.settings.SettingsRepository
import com.chopcode.rutago.app.data.repositories.settings.SettingsRepositoryImpl
import com.chopcode.rutago.app.ui.nav.Destination
import com.chopcode.rutago.app.ui.nav.RutaGoNavHost
import com.chopcode.rutago.app.ui.theme.RutaGoTheme
import com.chopcode.rutago.app.ui.viewmodels.profile.UserProfileViewModel

/**
 * 🚀 ACTIVITY: MainActivity (Kotlin + Compose + Navigation)
 * Único punto de entrada tras el Splash. Orquesta toda la navegación del ecosistema.
 */
class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        enableEdgeToEdge()
        super.onCreate(savedInstanceState)
        
        val settingsRepository: SettingsRepository = SettingsRepositoryImpl(this)
        
        // Determinar destino inicial jerárquicamente
        val startDest = when {
            settingsRepository.isFirstTimeLaunch() -> Destination.Onboarding
            MyApp.getCurrentUserId() != null -> Destination.Home
            else -> Destination.Login
        }

        setContent {
            RutaGoTheme {
                val navController = rememberNavController()
                
                // Launcher para fotos de perfil (Compartido para el NavHost)
                val profileViewModel: UserProfileViewModel = viewModel()
                val imagePickerLauncher = rememberLauncherForActivityResult(
                    contract = ActivityResultContracts.GetContent()
                ) { uri ->
                    uri?.let { profileViewModel.uploadProfilePicture(it) }
                }

                RutaGoNavHost(
                    navController = navController,
                    startDestination = startDest, 
                    onAvatarClick = { imagePickerLauncher.launch("image/*") },
                    onShareTicket = { reservationId ->
                        shareTicket(reservationId)
                    }
                )
            }
        }
    }

    private fun shareTicket(reservationId: String) {
        Toast.makeText(this, "Compartiendo tiquete $reservationId...", Toast.LENGTH_SHORT).show()
        // TODO: Implement real sharing logic using SharingUtils.kt
    }
}

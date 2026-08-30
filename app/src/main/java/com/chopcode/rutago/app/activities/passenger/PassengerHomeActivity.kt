package com.chopcode.rutago.app.activities.passenger

import android.content.Intent
import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.lifecycle.viewmodel.compose.viewModel
import com.chopcode.rutago.app.activities.common.LoginActivity
import com.chopcode.rutago.app.activities.passenger.history.ReservationHistoryActivity
import com.chopcode.rutago.app.activities.passenger.profile.UserProfileActivity
import com.chopcode.rutago.app.activities.passenger.reservation.createReservation.CreateReservationActivity
import com.chopcode.rutago.app.models.User
import com.chopcode.rutago.app.ui.screens.passenger.PassengerHomeScreen
import com.chopcode.rutago.app.ui.theme.RutaGoTheme
import com.chopcode.rutago.app.ui.viewmodels.passenger.PassengerHomeViewModel

/**
 * 🚀 ACTIVITY: PassengerHomeActivity
 * Punto de entrada principal para la experiencia del pasajero.
 */
class PassengerHomeActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        enableEdgeToEdge()
        super.onCreate(savedInstanceState)
        
        setContent {
            RutaGoTheme {
                val viewModel: PassengerHomeViewModel = viewModel()
                val uiState by viewModel.uiState.collectAsState()
                
                PassengerHomeScreen(
                    uiState = uiState,
                    onExpandLegend = { viewModel.toggleLegend() },
                    onTabSelected = { viewModel.onTabSelected(it) },
                    onNavigate = { route ->
                        if (route == "logout") {
                            viewModel.onNavigate(route)
                        } else {
                            viewModel.onNavigate(route)
                            when(route) {
                                "history" -> {
                                    startActivity(Intent(this, ReservationHistoryActivity::class.java))
                                    overridePendingTransition(0, 0)
                                }
                                "profile" -> {
                                    startActivity(Intent(this, UserProfileActivity::class.java))
                                    overridePendingTransition(0, 0)
                                }
                            }
                        }
                    },
                    onLogoutConfirm = {
                        viewModel.logout()
                        startActivity(Intent(this, LoginActivity::class.java).apply {
                            flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
                        })
                        finish()
                    },
                    onLogoutDismiss = { viewModel.dismissLogoutDialog() },
                    onTutorialDismiss = { viewModel.onTutorialDismiss() },
                    onReserveClick = { schedule ->
                        val intent = Intent(this, CreateReservationActivity::class.java).apply {
                            putExtra("horarioId", schedule.id)
                            putExtra("horarioHora", schedule.time)
                            putExtra("rutaSeleccionada", schedule.route)
                            putExtra("precioSeleccionado", schedule.price?.toDoubleOrNull() ?: 12000.0)
                        }
                        startActivity(intent)
                    }
                )
            }
        }
    }

    /**
     * Puente legacy para compatibilidad con fragmentos antiguos (si se requieren).
     */
    fun getUserActual(): User? {
        return null // Implementar si es necesario para fragmentos legacy
    }
}

package com.chopcode.rutago.app.activities.common

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.lifecycle.viewmodel.compose.viewModel
import com.chopcode.rutago.app.activities.common.history.HistoryActivity
import com.chopcode.rutago.app.activities.common.profile.ProfileActivity
import com.chopcode.rutago.app.activities.passenger.reservation.createReservation.CreateReservationActivity
import com.chopcode.rutago.app.activities.driver.manager.ManageSeatsActivity
import com.chopcode.rutago.app.ui.screens.common.HomeScreen
import com.chopcode.rutago.app.ui.theme.RutaGoTheme
import com.chopcode.rutago.app.ui.viewmodels.home.HomeViewModel

/**
 * 🚀 ACTIVITY: HomeActivity (Unified)
 * Punto de entrada principal para todos los roles (Pasajero/Conductor).
 */
class HomeActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        enableEdgeToEdge()
        super.onCreate(savedInstanceState)
        
        setContent {
            RutaGoTheme {
                val viewModel: HomeViewModel = viewModel()
                val uiState by viewModel.uiState.collectAsState()
                
                HomeScreen(
                    uiState = uiState,
                    onExpandLegend = { viewModel.togglePassengerLegend() },
                    onTabSelected = { viewModel.onTabSelected(it) },
                    onNavigate = { route ->
                        if (route == "logout") {
                            viewModel.onNavigate(route)
                        } else {
                            viewModel.onNavigate(route)
                            when(route) {
                                "history" -> {
                                    startActivity(Intent(this, HistoryActivity::class.java))
                                    overridePendingTransition(0, 0)
                                }
                                "profile" -> {
                                    startActivity(Intent(this, ProfileActivity::class.java))
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
                            putExtra("precioSeleccionado", schedule.price.toDoubleOrNull() ?: 12000.0)
                        }
                        startActivity(intent)
                    },
                    onConfirmReservation = { reservation ->
                        viewModel.onConfirmReservation(reservation)
                    },
                    onCancelReservation = { reservation ->
                        viewModel.onCancelReservation(reservation)
                    },
                    onManageSeatsClick = { schedule ->
                        val intent = Intent(this, ManageSeatsActivity::class.java).apply {
                            putExtra("horarioId", schedule.id)
                            putExtra("horarioHora", schedule.time)
                            putExtra("rutaNombre", schedule.route)
                        }
                        startActivity(intent)
                    }
                )
            }
        }
    }
}

package com.chopcode.rutago.app.activities.passenger.history

import android.content.Intent
import android.os.Bundle
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.compose.foundation.layout.padding
import androidx.compose.ui.Modifier
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.lifecycle.viewmodel.compose.viewModel
import com.chopcode.rutago.app.activities.common.ChatActivity
import com.chopcode.rutago.app.activities.common.LoginActivity
import com.chopcode.rutago.app.activities.common.TicketActivity
import com.chopcode.rutago.app.activities.passenger.PassengerHomeActivity
import com.chopcode.rutago.app.activities.passenger.profile.UserProfileActivity
import com.chopcode.rutago.app.ui.components.molecules.RutaGoBottomBar
import com.chopcode.rutago.app.ui.screens.passenger.ReservationHistoryScreen
import com.chopcode.rutago.app.ui.theme.RutaGoTheme
import com.chopcode.rutago.app.ui.viewmodels.passenger.ReservationHistoryViewModel

/**
 * 📊 ACTIVITY: ReservationHistoryActivity
 * Pantalla de historial de viajes para el pasajero.
 */
class ReservationHistoryActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        enableEdgeToEdge()
        super.onCreate(savedInstanceState)

        setContent {
            RutaGoTheme {
                val viewModel: ReservationHistoryViewModel = viewModel()
                val uiState by viewModel.uiState.collectAsState()

                ReservationHistoryScreen(
                    uiState = uiState,
                    onBackClick = { finish() },
                    onFilterChange = { viewModel.setFilter(it) },
                    onSearchChange = { viewModel.setSearchQuery(it) },
                    onNavigate = { route ->
                        if (route == "logout") {
                            viewModel.onLogoutClick()
                        } else {
                            when(route) {
                                "home" -> {
                                    startActivity(Intent(this, PassengerHomeActivity::class.java).apply {
                                        flags = Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_SINGLE_TOP
                                    })
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
                    onReserveNowClick = {
                        val intent = Intent(this, PassengerHomeActivity::class.java)
                        intent.flags = Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_SINGLE_TOP
                        startActivity(intent)
                        finish()
                    },
                    onReservationClick = { reservation ->
                        val intent = Intent(this, TicketActivity::class.java).apply {
                            putExtra("reservationId", reservation.idReservation)
                        }
                        startActivity(intent)
                    },
                    onChatClick = { reservation ->
                        val intent = Intent(this, ChatActivity::class.java).apply {
                            putExtra("reservationId", reservation.idReservation)
                            putExtra("receiverId", reservation.driverId)
                            putExtra("receiverName", reservation.driver)
                            putExtra("senderName", reservation.name)
                            putExtra("scheduleTime", reservation.departureTime)
                        }
                        startActivity(intent)
                    },
                    onRateClick = { reservation ->
                        viewModel.onShowRatingDialog(reservation)
                    },
                    onRatingConfirm = { stars, comment ->
                        viewModel.submitRating(stars, comment)
                    },
                    onRatingDismiss = {
                        viewModel.onShowRatingDialog(null)
                    }
                )
            }
        }
    }
}

package com.chopcode.rutago.app.activities.common

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.lifecycle.viewmodel.compose.viewModel
import com.chopcode.rutago.app.ui.screens.common.TicketScreen
import com.chopcode.rutago.app.ui.theme.RutaGoTheme
import com.chopcode.rutago.app.ui.viewmodels.common.TicketViewModel

import android.view.View
import androidx.compose.foundation.layout.width
import androidx.compose.ui.platform.ComposeView
import androidx.compose.ui.unit.dp
import com.chopcode.rutago.app.ui.components.organisms.TicketCard
import com.chopcode.rutago.app.utils.ui.SharingUtils

/**
 * 🎟️ ACTIVITY: TicketActivity
 * Muestra el comprobante digital de una reserva en Jetpack Compose.
 */
class TicketActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        enableEdgeToEdge()
        super.onCreate(savedInstanceState)

        val reservationId = intent.getStringExtra("reservationId")
        if (reservationId == null) {
            Toast.makeText(this, "Error: No se encontró el ID de reserva", Toast.LENGTH_SHORT).show()
            finish()
            return
        }

        setContent {
            RutaGoTheme {
                val viewModel: TicketViewModel = viewModel()
                val uiState by viewModel.uiState.collectAsState()

                // Cargar datos al iniciar
                LaunchedEffect(reservationId) {
                    viewModel.loadTicket(reservationId)
                }

                TicketScreen(
                    uiState = uiState,
                    onBackClick = { finish() },
                    onShareClick = {
                        val reservation = uiState.reservation
                        if (reservation != null) {
                            // Captura del tiquete off-screen para compartirlo
                            val shareView = ComposeView(this).apply {
                                setContent {
                                    RutaGoTheme {
                                        TicketCard(
                                            reservation = reservation,
                                            modifier = androidx.compose.ui.Modifier.width(350.dp)
                                        )
                                    }
                                }
                            }
                            
                            // Medir y maquetar la vista antes de capturarla
                            shareView.measure(
                                View.MeasureSpec.makeMeasureSpec(1000, View.MeasureSpec.AT_MOST),
                                View.MeasureSpec.makeMeasureSpec(0, View.MeasureSpec.UNSPECIFIED)
                            )
                            shareView.layout(0, 0, shareView.measuredWidth, shareView.measuredHeight)

                            SharingUtils.shareView(this, shareView, "Ticket_${reservation.id}")
                        }
                    },
                    onChatClick = {
                        val reservation = uiState.reservation
                        if (reservation != null) {
                            val intent = Intent(this, ChatActivity::class.java).apply {
                                putExtra("reservationId", reservation.id)
                                putExtra("receiverId", reservation.driverId)
                                putExtra("receiverName", reservation.driverName)
                                putExtra("senderName", reservation.passengerName)
                                putExtra("scheduleTime", reservation.departureTime)
                            }
                            startActivity(intent)
                        }
                    }
                )
            }
        }
    }
}

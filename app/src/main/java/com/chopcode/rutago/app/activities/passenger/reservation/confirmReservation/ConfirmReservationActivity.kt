package com.chopcode.rutago.app.activities.passenger.reservation.confirmReservation

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
import com.chopcode.rutago.app.activities.passenger.PassengerHomeActivity
import com.chopcode.rutago.app.ui.screens.passenger.ConfirmReservationScreen
import com.chopcode.rutago.app.ui.theme.RutaGoTheme
import com.chopcode.rutago.app.ui.viewmodels.passenger.ConfirmReservationViewModel

/**
 * 🚌 ACTIVITY: ConfirmReservationActivity
 * Etapa final de la pasarela de reserva de Ruta-Go.
 */
class ConfirmReservationActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        enableEdgeToEdge()
        super.onCreate(savedInstanceState)

        setContent {
            RutaGoTheme {
                val viewModel: ConfirmReservationViewModel = viewModel()
                val uiState by viewModel.uiState.collectAsState()

                // Procesar el intent solo una vez
                LaunchedEffect(Unit) {
                    viewModel.processIntent(intent)
                }

                if (uiState.confirmationSuccess) {
                    LaunchedEffect(Unit) {
                        Toast.makeText(this@ConfirmReservationActivity, "Reserva exitosa", Toast.LENGTH_SHORT).show()
                        val intent = Intent(this@ConfirmReservationActivity, PassengerHomeActivity::class.java).apply {
                            flags = Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_NEW_TASK
                        }
                        startActivity(intent)
                        finish()
                    }
                }

                ConfirmReservationScreen(
                    uiState = uiState,
                    onPaymentMethodChange = { viewModel.setPaymentMethod(it) },
                    onConfirmClick = { viewModel.confirmReservation() },
                    onBackClick = { finish() }
                )
            }
        }
    }
}

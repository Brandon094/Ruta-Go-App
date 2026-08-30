package com.chopcode.rutago.app.activities.passenger.reservation.createReservation

import android.content.Intent
import android.os.Bundle
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.lifecycle.viewmodel.compose.viewModel
import com.chopcode.rutago.app.activities.passenger.reservation.confirmReservation.ConfirmReservationActivity
import com.chopcode.rutago.app.ui.screens.passenger.CreateReservationScreen
import com.chopcode.rutago.app.ui.theme.RutaGoTheme
import com.chopcode.rutago.app.ui.viewmodels.passenger.CreateReservationViewModel

/**
 * 🚌 ACTIVITY: CreateReservationActivity
 * Pantalla interactiva para la selección táctil de asientos.
 */
class CreateReservationActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        enableEdgeToEdge()
        super.onCreate(savedInstanceState)

        val route = intent.getStringExtra("rutaSeleccionada")
        val scheduleId = intent.getStringExtra("horarioId")
        val scheduleTime = intent.getStringExtra("horarioHora")
        val initialPrice = intent.getDoubleExtra("precioSeleccionado", 12000.0)

        setContent {
            RutaGoTheme {
                val viewModel: CreateReservationViewModel = viewModel()
                val uiState by viewModel.uiState.collectAsState()

                // Inicializar datos si no están cargados
                if (uiState.scheduleId.isEmpty()) {
                    viewModel.init(route, scheduleId, scheduleTime, initialPrice)
                }

                CreateReservationScreen(
                    uiState = uiState,
                    onSeatClick = { viewModel.onSeatSelected(it) },
                    onConfirmClick = {
                        val reservation = uiState
                        val intent = Intent(this, ConfirmReservationActivity::class.java).apply {
                            putExtra("origen", reservation.selectedRoute.split(" -> ")[0])
                            putExtra("destino", reservation.selectedRoute.split(" -> ")[1])
                            putExtra("horarioId", reservation.scheduleId)
                            putExtra("horarioHora", reservation.scheduleTime)
                            putExtra("asientoSeleccionado", reservation.selectedSeat)
                            putExtra("precio", reservation.price)
                            putExtra("conductorNombre", reservation.driver?.nombre)
                            putExtra("conductorId", reservation.driver?.id)
                            putExtra("conductorTelefono", reservation.driver?.telefono)
                            putExtra("vehiculoPlaca", reservation.vehicle?.plate)
                            putExtra("vehiculoModelo", reservation.vehicle?.model)
                            putExtra("fechaViaje", reservation.travelDate)
                            putExtra("usuarioNombre", reservation.currentUser?.nombre)
                            putExtra("usuarioTelefono", reservation.currentUser?.telefono)
                            putExtra("usuarioId", reservation.currentUser?.id)
                        }
                        startActivity(intent)
                    },
                    onBackClick = { finish() }
                )
            }
        }
    }
}

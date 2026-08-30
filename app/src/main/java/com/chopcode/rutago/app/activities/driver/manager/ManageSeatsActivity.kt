package com.chopcode.rutago.app.activities.driver.manager

import android.os.Bundle
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.lifecycle.viewmodel.compose.viewModel
import com.chopcode.rutago.app.ui.screens.driver.ManageSeatsScreen
import com.chopcode.rutago.app.ui.theme.RutaGoTheme
import com.chopcode.rutago.app.ui.viewmodels.driver.ManageSeatsViewModel

/**
 * 🚌 ACTIVITY: ManageSeatsActivity
 * Panel de control táctico para la gestión de inventario de asientos en tiempo real (Compose).
 */
class ManageSeatsActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        enableEdgeToEdge()
        super.onCreate(savedInstanceState)

        val scheduleId = intent.getStringExtra("horarioId")
        val routeName = intent.getStringExtra("rutaNombre")
        val scheduleTime = intent.getStringExtra("horarioHora")
        val routePrice = intent.getDoubleExtra("rutaPrecio", 12000.0)

        setContent {
            RutaGoTheme {
                val viewModel: ManageSeatsViewModel = viewModel()
                val uiState by viewModel.uiState.collectAsState()

                // Inicializar datos si es necesario
                if (uiState.scheduleId.isEmpty()) {
                    viewModel.init(scheduleId, routeName, scheduleTime, routePrice)
                }

                ManageSeatsScreen(
                    uiState = uiState,
                    onSeatClick = { viewModel.onSeatClick(it) },
                    onConfirmBlock = { viewModel.confirmBlock() },
                    onConfirmFree = { viewModel.confirmFree() },
                    onDismissDialogs = { viewModel.dismissDialogs() },
                    onTutorialDismiss = { viewModel.onTutorialDismiss() },
                    onBackClick = { finish() }
                )
            }
        }
    }
}

package com.chopcode.rutago.app.activities.common

import android.os.Bundle
import android.widget.Toast
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.lifecycle.viewmodel.compose.viewModel
import com.chopcode.rutago.app.ui.screens.common.ChatScreen
import com.chopcode.rutago.app.ui.theme.RutaGoTheme
import com.chopcode.rutago.app.ui.viewmodels.common.ChatViewModel

/**
 * 💬 ACTIVITY: ChatActivity
 * Pantalla de conversación en tiempo real vinculada a una reserva en Jetpack Compose.
 */
class ChatActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        enableEdgeToEdge()
        super.onCreate(savedInstanceState)

        val reservationId = intent.getStringExtra("reservationId")
        val receiverId = intent.getStringExtra("receiverId")
        val receiverName = intent.getStringExtra("receiverName")
        val scheduleTime = intent.getStringExtra("scheduleTime")

        if (reservationId == null) {
            Toast.makeText(this, "Error: No se encontró el ID de conversación", Toast.LENGTH_SHORT).show()
            finish()
            return
        }

        setContent {
            RutaGoTheme {
                val viewModel: ChatViewModel = viewModel()
                val uiState by viewModel.uiState.collectAsState()

                // Inicializar chat si no está inicializado
                LaunchedEffect(reservationId) {
                    viewModel.initChat(reservationId, receiverId, receiverName, scheduleTime)
                }

                ChatScreen(
                    uiState = uiState,
                    onBackClick = { finish() },
                    onSendMessage = { viewModel.sendMessage(it) }
                )
            }
        }
    }
}

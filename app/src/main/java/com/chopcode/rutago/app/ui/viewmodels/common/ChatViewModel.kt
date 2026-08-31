package com.chopcode.rutago.app.ui.viewmodels.common

import androidx.lifecycle.ViewModel
import com.chopcode.rutago.app.config.MyApp
import com.chopcode.rutago.app.data.models.ChatMessage
import com.chopcode.rutago.app.services.chat.ChatService
import com.google.firebase.database.ValueEventListener
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update

/**
 * 🧠 VIEWMODEL: ChatViewModel
 * Motor de comunicación en tiempo real para el sistema de mensajería.
 */
class ChatViewModel : ViewModel() {

    private val _uiState = MutableStateFlow(ChatUiState())
    val uiState: StateFlow<ChatUiState> = _uiState.asStateFlow()

    private val chatService = ChatService()
    private var chatListener: ValueEventListener? = null
    private var currentReservationId: String? = null
    private var receiverId: String? = null

    fun initChat(reservationId: String, rId: String?, rName: String?, sTime: String?) {
        currentReservationId = reservationId
        receiverId = rId
        
        _uiState.update { 
            it.copy(
                receiverName = rName ?: "Chat de Viaje",
                scheduleTime = sTime ?: ""
            )
        }

        startListening(reservationId)
    }

    private fun startListening(reservationId: String) {
        if (chatListener != null) return

        chatListener = chatService.listenMessages(reservationId, object : ChatService.MessagesCallback {
            override fun onMessagesUpdated(list: List<ChatMessage>?) {
                _uiState.update { it.copy(messages = list ?: emptyList()) }
            }

            override fun onError(err: String?) {
                _uiState.update { it.copy(error = err) }
            }
        })
    }

    fun sendMessage(text: String) {
        val uid = MyApp.getCurrentUserId()
        val resId = currentReservationId
        if (uid != null && resId != null) {
            chatService.sendMessage(resId, uid, text)
        }
    }

    override fun onCleared() {
        super.onCleared()
        currentReservationId?.let { resId ->
            chatListener?.let { chatService.stopListening(resId, it) }
        }
    }
}

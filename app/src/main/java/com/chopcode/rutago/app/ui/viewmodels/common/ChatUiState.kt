package com.chopcode.rutago.app.ui.viewmodels.common

import com.chopcode.rutago.app.models.ChatMessage

/**
 * 📦 UI STATE: ChatUiState
 * Representa el estado de una conversación en tiempo real.
 */
data class ChatUiState(
    val messages: List<ChatMessage> = emptyList(),
    val isLoading: Boolean = false,
    val error: String? = null,
    val receiverName: String = "",
    val scheduleTime: String = ""
)

package com.chopcode.rutago.app.models

import com.google.firebase.database.IgnoreExtraProperties

/**
 * 📦 MODEL: ChatMessage
 * Representa un mensaje individual dentro de una conversación.
 */
@IgnoreExtraProperties
data class ChatMessage(
    var id: String = "",
    var senderId: String = "",
    var text: String = "",
    var timestamp: Long = 0
)

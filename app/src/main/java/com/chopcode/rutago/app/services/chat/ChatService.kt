package com.chopcode.rutago.app.services.chat

import android.util.Log
import com.chopcode.rutago.app.config.MyApp
import com.chopcode.rutago.app.data.models.ChatMessage
import com.google.firebase.database.*

/**
 * 🛰️ SERVICE: ChatService (Kotlin)
 * Motor de mensajería instantánea para la coordinación logística de viajes.
 */
class ChatService {
    private val chatsRef: DatabaseReference = MyApp.getDatabaseReference("chats")

    interface MessagesCallback {
        fun onMessagesUpdated(messages: List<ChatMessage>?)
        fun onError(error: String?)
    }

    /**
     * Persiste un mensaje en Firebase.
     */
    fun sendMessage(reservationId: String, senderId: String, text: String) {
        if (reservationId.isEmpty() || text.trim().isEmpty()) return

        val ref = chatsRef.child(reservationId).child("mensajes").push()
        val messageId = ref.key ?: ""
        val message = ChatMessage(messageId, senderId, text, System.currentTimeMillis())

        ref.setValue(message).addOnFailureListener { e ->
            Log.e("ChatService", "❌ Error al enviar mensaje: ${e.message}")
        }
    }

    /**
     * Establece un túnel de escucha reactiva.
     */
    fun listenMessages(reservationId: String, callback: MessagesCallback): ValueEventListener {
        val listener = object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                val list = mutableListOf<ChatMessage>()
                for (ds in snapshot.children) {
                    val msg = ds.getValue(ChatMessage::class.java)
                    if (msg != null) list.add(msg)
                }
                callback.onMessagesUpdated(list)
            }

            override fun onCancelled(error: DatabaseError) {
                callback.onError(error.message)
            }
        }

        chatsRef.child(reservationId).child("mensajes").addValueEventListener(listener)
        return listener
    }

    fun stopListening(reservationId: String, listener: ValueEventListener) {
        chatsRef.child(reservationId).child("mensajes").removeEventListener(listener)
    }
}

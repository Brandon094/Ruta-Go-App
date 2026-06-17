package com.chopcode.rutago.app.services.chat;

import android.util.Log;
import androidx.annotation.NonNull;
import com.chopcode.rutago.app.config.MyApp;
import com.chopcode.rutago.app.models.ChatMessage;
import com.google.firebase.database.*;
import java.util.ArrayList;
import java.util.List;

/**
 * 💬 Chat Service
 * 
 * Orquesta la mensajería en tiempo real entre pasajeros y conductores.
 * Los mensajes se agrupan por el ID único de la reserva.
 */
public class ChatService {
    private static final String TAG = "ChatService";
    private final DatabaseReference chatsRef;

    public interface MessagesCallback {
        void onMessagesUpdated(List<ChatMessage> messages);
        void onError(String error);
    }

    public ChatService() {
        this.chatsRef = MyApp.getDatabaseReference("chats");
    }

    /**
     * Envía un nuevo mensaje a la conversación.
     */
    public void sendMessage(String reservationId, String senderId, String text) {
        if (reservationId == null || text.trim().isEmpty()) return;

        DatabaseReference ref = chatsRef.child(reservationId).child("mensajes").push();
        String messageId = ref.getKey();
        ChatMessage message = new ChatMessage(messageId, senderId, text, System.currentTimeMillis());

        ref.setValue(message).addOnFailureListener(e -> Log.e(TAG, "Error sending message: " + e.getMessage()));
    }

    /**
     * Escucha los mensajes de una reserva en tiempo real.
     */
    public ValueEventListener listenMessages(String reservationId, MessagesCallback callback) {
        ValueEventListener listener = new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                List<ChatMessage> list = new ArrayList<>();
                for (DataSnapshot ds : snapshot.getChildren()) {
                    ChatMessage msg = ds.getValue(ChatMessage.class);
                    if (msg != null) list.add(msg);
                }
                callback.onMessagesUpdated(list);
            }

            @Override public void onCancelled(@NonNull DatabaseError error) { callback.onError(error.getMessage()); }
        };

        chatsRef.child(reservationId).child("mensajes").addValueEventListener(listener);
        return listener;
    }

    public void stopListening(String reservationId, ValueEventListener listener) {
        if (reservationId != null && listener != null) {
            chatsRef.child(reservationId).child("mensajes").removeEventListener(listener);
        }
    }
}

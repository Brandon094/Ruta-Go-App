package com.chopcode.rutago.app.services.chat;

import android.util.Log;
import androidx.annotation.NonNull;
import com.chopcode.rutago.app.config.MyApp;
import com.chopcode.rutago.app.managers.notifications.NotificationManager;
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
     * Envía un nuevo mensaje y dispara notificación al receptor.
     */
    public void sendMessage(String reservationId, String senderId, String senderName, String receiverId, String text) {
        if (reservationId == null || text.trim().isEmpty()) {
            Log.e(TAG, "❌ No se puede enviar: Datos incompletos (ResID o Texto vacío)");
            return;
        }

        Log.d(TAG, "📤 Enviando mensaje a la reserva: " + reservationId);
        DatabaseReference ref = chatsRef.child(reservationId).child("mensajes").push();
        String messageId = ref.getKey();
        ChatMessage message = new ChatMessage(messageId, senderId, text, System.currentTimeMillis());

        ref.setValue(message).addOnSuccessListener(aVoid -> {
            Log.d(TAG, "✅ Mensaje guardado en Firebase exitosamente");
            // Disparar notificación push al receptor
            if (receiverId != null && !receiverId.isEmpty()) {
                Log.d(TAG, "🔔 Notificando al receptor: " + receiverId);
                NotificationManager.getInstance(MyApp.getAppContext())
                        .notificarNuevoMensaje(receiverId, senderId, senderName, text, reservationId, null);
            }
        }).addOnFailureListener(e -> {
            Log.e(TAG, "❌ FATAL: Error al guardar en Firebase: " + e.getMessage());
        });
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

package com.chopcode.rutago.app.services.chat;

import android.util.Log;
import androidx.annotation.NonNull;
import com.chopcode.rutago.app.config.MyApp;

import com.chopcode.rutago.app.models.ChatMessage;
import com.google.firebase.database.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Chat Service
 *
 * Motor de mensajería instantánea para la coordinación logística de viajes.
 * Responsabilidades:
 * - Centralizar el envío de mensajes asíncronos vinculados a una reserva activa.
 * - Gestionar suscripciones reactivas (listeners) para la actualización en tiempo real de la conversación.
 * - Integrar el sistema de notificaciones Push (FCM) para alertar al receptor sobre nuevos mensajes.
 * - Garantizar la integridad de los datos en el nodo /chats/ de Realtime Database.
 */
public class ChatService {
    private static final String TAG = "ChatService";
    private final DatabaseReference chatsRef;

    /** Interfaz para la recepción de flujos de mensajes. */
    public interface MessagesCallback {
        /** @param messages Lista cronológica de mensajes actualizados. */
        void onMessagesUpdated(List<ChatMessage> messages);
        void onError(String error);
    }

    public ChatService() {
        this.chatsRef = MyApp.getDatabaseReference("chats");
    }

    /**
     * Persiste un mensaje en Firebase y dispara la notificación push correspondiente.
     * @param reservationId Identificador de la reserva (contexto de la charla).
     * @param senderId UID del emisor.
     * @param text Contenido textual del mensaje.
     */
    public void sendMessage(String reservationId, String senderId, String text) {
        if (reservationId == null || text.trim().isEmpty()) {
            Log.e(TAG, "❌ No se puede enviar: Faltan metadatos críticos o el texto es nulo.");
            return;
        }

        Log.d(TAG, "📤 Despachando mensaje para reserva: " + reservationId);
        DatabaseReference ref = chatsRef.child(reservationId).child("mensajes").push();
        String messageId = ref.getKey();
        ChatMessage message = new ChatMessage(messageId, senderId, text, System.currentTimeMillis());

        ref.setValue(message).addOnSuccessListener(aVoid -> {
            Log.d(TAG, "✅ Mensaje persistido exitosamente (La Cloud Function se encargará de la notificación).");
        }).addOnFailureListener(e -> {
            Log.e(TAG, "❌ Fallo en la persistencia del mensaje: " + e.getMessage());
        });
    }

    /**
     * Establece un túnel de escucha reactiva sobre la colección de mensajes.
     * @return El listener creado para su posterior liberación (Higiene de memoria).
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

            @Override public void onCancelled(@NonNull DatabaseError error) { 
                Log.e(TAG, "❌ Suscripción de chat cancelada: " + error.getMessage());
                callback.onError(error.getMessage()); 
            }
        };

        chatsRef.child(reservationId).child("mensajes").addValueEventListener(listener);
        return listener;
    }

    /**
     * Remueve el listener activo de Firebase para optimizar el consumo de batería y datos.
     */
    public void stopListening(String reservationId, ValueEventListener listener) {
        if (reservationId != null && listener != null) {
            chatsRef.child(reservationId).child("mensajes").removeEventListener(listener);
        }
    }
}

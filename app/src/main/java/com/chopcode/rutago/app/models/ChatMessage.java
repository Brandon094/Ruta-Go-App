package com.chopcode.rutago.app.models;

import com.google.firebase.database.IgnoreExtraProperties;

/**
 * Chat Message Model
 *
 * Representa un mensaje individual dentro de una conversación
 * entre pasajero y conductor vinculada a una reserva.
 */
@IgnoreExtraProperties
public class ChatMessage {
    private String id;
    private String senderId;
    private String text;
    private long timestamp;

    /**
     * Constructor vacío requerido por Firebase.
     */
    public ChatMessage() {}

    public ChatMessage(String id, String senderId, String text, long timestamp) {
        this.id = id;
        this.senderId = senderId;
        this.text = text;
        this.timestamp = timestamp;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    /**
     * @return UID del usuario que envió el mensaje.
     */
    public String getSenderId() { return senderId; }
    public void setSenderId(String senderId) { this.senderId = senderId; }

    /**
     * @return Contenido textual del mensaje.
     */
    public String getText() { return text; }
    public void setText(String text) { this.text = text; }

    /**
     * @return Momento de envío en formato epoch (ms).
     */
    public long getTimestamp() { return timestamp; }
    public void setTimestamp(long timestamp) { this.timestamp = timestamp; }
}

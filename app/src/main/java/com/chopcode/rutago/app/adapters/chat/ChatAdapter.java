package com.chopcode.rutago.app.adapters.chat;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.config.MyApp;
import com.chopcode.rutago.app.models.ChatMessage;
import com.chopcode.rutago.app.utils.ui.FormatUtils;
import java.util.ArrayList;
import java.util.List;

/**
 * Chat Adapter
 *
 * Especialista en el renderizado de la conversación bidireccional entre pasajero y conductor.
 * Responsabilidades:
 * - Gestionar la visualización diferenciada de mensajes enviados (Me) y recibidos (Other) mediante ViewTypes.
 * - Sincronizar el historial de mensajes reactivamente desde el ViewModel.
 * - Formatear las marcas de tiempo (Timestamps) en formato 12h legible.
 * - Asegurar una burbuja de chat fluida y consistente con la identidad visual del app.
 */
public class ChatAdapter extends RecyclerView.Adapter<ChatAdapter.ChatViewHolder> {

    private static final int VIEW_TYPE_ME = 1;
    private static final int VIEW_TYPE_OTHER = 2;

    private List<ChatMessage> messages = new ArrayList<>();
    private final String currentUserId;

    public ChatAdapter() {
        this.currentUserId = MyApp.getCurrentUserId();
    }

    /**
     * Determina si el mensaje fue enviado por el usuario actual para elegir el layout adecuado.
     */
    @Override
    public int getItemViewType(int position) {
        if (messages.get(position).getSenderId().equals(currentUserId)) {
            return VIEW_TYPE_ME;
        } else {
            return VIEW_TYPE_OTHER;
        }
    }

    @NonNull
    @Override
    public ChatViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view;
        if (viewType == VIEW_TYPE_ME) {
            view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_message_me, parent, false);
        } else {
            view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_message_other, parent, false);
        }
        return new ChatViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ChatViewHolder holder, int position) {
        holder.bind(messages.get(position));
    }

    @Override
    public int getItemCount() { return messages.size(); }

    /**
     * Refresca la lista completa de mensajes y notifica el cambio al RecyclerView.
     */
    public void setMessages(List<ChatMessage> list) {
        this.messages = list;
        notifyDataSetChanged();
    }

    /**
     * ViewHolder especializado en la burbuja de texto y metadatos del mensaje.
     */
    static class ChatViewHolder extends RecyclerView.ViewHolder {
        TextView tvMessage, tvTime;

        ChatViewHolder(View itemView) {
            super(itemView);
            tvMessage = itemView.findViewById(R.id.tvMessage);
            tvTime = itemView.findViewById(R.id.tvTime);
        }

        void bind(ChatMessage message) {
            tvMessage.setText(message.getText());
            tvTime.setText(FormatUtils.formatearHora12hDeTimestamp(message.getTimestamp()));
        }
    }
}

package com.chopcode.rutago.app.viewmodels.common;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;
import com.chopcode.rutago.app.models.ChatMessage;
import com.chopcode.rutago.app.services.chat.ChatService;
import com.chopcode.rutago.app.config.MyApp;
import com.google.firebase.database.ValueEventListener;
import java.util.ArrayList;
import java.util.List;

/**
 * 💬 Chat ViewModel
 * 
 * Gestiona el flujo de mensajes para la vista de chat.
 * Expone los mensajes en un LiveData para que la UI reaccione automáticamente.
 */
public class ChatViewModel extends ViewModel {
    private final MutableLiveData<List<ChatMessage>> messages = new MutableLiveData<>(new ArrayList<>());
    private final MutableLiveData<String> error = new MutableLiveData<>();
    private final ChatService chatService;
    private ValueEventListener chatListener;
    private String currentReservationId;

    public ChatViewModel() {
        this.chatService = new ChatService();
    }

    public LiveData<List<ChatMessage>> getMessages() { return messages; }
    public LiveData<String> getError() { return error; }

    public void startChat(String reservationId) {
        if (reservationId == null) return;
        this.currentReservationId = reservationId;
        
        chatListener = chatService.listenMessages(reservationId, new ChatService.MessagesCallback() {
            @Override
            public void onMessagesUpdated(List<ChatMessage> list) {
                messages.postValue(list);
            }

            @Override public void onError(String err) { error.postValue(err); }
        });
    }

    public void sendMessage(String text) {
        String uid = MyApp.getCurrentUserId();
        if (uid != null && currentReservationId != null) {
            chatService.sendMessage(currentReservationId, uid, text);
        }
    }

    @Override
    protected void onCleared() {
        super.onCleared();
        if (currentReservationId != null && chatListener != null) {
            chatService.stopListening(currentReservationId, chatListener);
        }
    }
}

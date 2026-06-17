package com.chopcode.rutago.app.viewmodels.common;

import android.util.Log;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;
import com.chopcode.rutago.app.models.ChatMessage;
import com.chopcode.rutago.app.models.Reservation;
import com.chopcode.rutago.app.services.chat.ChatService;
import com.chopcode.rutago.app.services.reservations.ReservationService;
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
    private final ReservationService reservationService;
    private ValueEventListener chatListener;
    private String currentReservationId;
    private String receiverId;
    private String senderName;

    public ChatViewModel() {
        this.chatService = new ChatService();
        this.reservationService = new ReservationService();
    }

    public LiveData<List<ChatMessage>> getMessages() { return messages; }
    public LiveData<String> getError() { return error; }

    public void initChat(String reservationId, String rId, String sName) {
        this.currentReservationId = reservationId;
        this.receiverId = rId;
        this.senderName = sName;
        
        Log.d("ChatVM", "initChat - resId: " + reservationId + ", receiver: " + rId + ", sender: " + sName);
        
        if (currentReservationId == null) return;
        
        // Corrección de identidad si el receptor es el mismo emisor
        String myUid = MyApp.getCurrentUserId();
        if (myUid != null && myUid.equals(receiverId)) {
            Log.w("ChatVM", "Receiver ID is same as current user. Triggering auto-fix...");
            receiverId = null; // Forzar recarga
        }

        // Si faltan datos clave, los cargamos de la reserva
        if (receiverId == null || senderName == null) {
            loadMissingData(reservationId);
        }
        
        startListening();
    }

    private void loadMissingData(String reservationId) {
        reservationService.getReservationById(reservationId, new ReservationService.HistoryCallback() {
            @Override
            public void onHistoryLoaded(List<Reservation> reservations) {
                if (!reservations.isEmpty()) {
                    Reservation r = reservations.get(0);
                    String currentUid = MyApp.getCurrentUserId();
                    if (currentUid != null) {
                        boolean isPassenger = currentUid.equals(r.getUserId());
                        receiverId = isPassenger ? r.getDriverId() : r.getUserId();
                        senderName = isPassenger ? r.getName() : r.getDriver();
                        Log.d("ChatVM", "Auto-fixed data. I am " + (isPassenger ? "Passenger" : "Driver") + ". Receiver: " + receiverId);
                    }
                }
            }
            @Override public void onError(String err) { 
                Log.e("ChatVM", "Error loading data from reservas: " + err);
                checkArchivedForMissingData(reservationId);
            }
        });
    }

    private void checkArchivedForMissingData(String reservationId) {
        MyApp.getDatabaseReference("reservas_archivadas/" + reservationId)
                .addListenerForSingleValueEvent(new com.google.firebase.database.ValueEventListener() {
                    @Override
                    public void onDataChange(@androidx.annotation.NonNull com.google.firebase.database.DataSnapshot snapshot) {
                        if (snapshot.exists()) {
                            Reservation r = snapshot.getValue(Reservation.class);
                            if (r != null) {
                                String currentUid = MyApp.getCurrentUserId();
                                if (currentUid != null) {
                                    boolean isPassenger = currentUid.equals(r.getUserId());
                                    receiverId = isPassenger ? r.getDriverId() : r.getUserId();
                                    senderName = isPassenger ? r.getName() : r.getDriver();
                                    Log.d("ChatVM", "Auto-fixed from ARCHIVE. Receiver: " + receiverId);
                                }
                            }
                        }
                    }
                    @Override public void onCancelled(@androidx.annotation.NonNull com.google.firebase.database.DatabaseError error) {}
                });
    }

    private void startListening() {
        if (currentReservationId == null) return;
        
        chatListener = chatService.listenMessages(currentReservationId, new ChatService.MessagesCallback() {
            @Override
            public void onMessagesUpdated(List<ChatMessage> list) {
                messages.postValue(list);
            }

            @Override public void onError(String err) { error.postValue(err); }
        });
    }

    public void sendMessage(String text) {
        String uid = MyApp.getCurrentUserId();
        Log.d("ChatVM", "Attempting to send. uid: " + uid + ", resId: " + currentReservationId + ", receiver: " + receiverId);
        
        if (uid != null && currentReservationId != null && receiverId != null) {
            String name = (senderName != null && !senderName.isEmpty()) ? senderName : "Usuario";
            chatService.sendMessage(currentReservationId, uid, name, receiverId, text);
        } else {
            String errorMsg = "Error: Faltan datos del destinatario";
            if (currentReservationId == null) errorMsg = "Error: Sesión de chat no válida";
            Log.e("ChatVM", errorMsg);
            error.postValue(errorMsg);
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

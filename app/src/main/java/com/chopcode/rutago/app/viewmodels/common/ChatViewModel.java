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
        
        if (currentReservationId == null) {
            Log.e("ChatVM", "initChat failed: reservationId is null");
            return;
        }
        
        String myUid = MyApp.getCurrentUserId();
        Log.d("ChatVM", "Current User UID: " + myUid);

        // Si el receptor es el mismo que yo, o si faltan datos, forzamos carga de Firebase
        boolean needsFix = (myUid != null && myUid.equals(receiverId)) || receiverId == null || senderName == null;
        
        if (needsFix) {
            Log.w("ChatVM", "Identity issue detected. Triggering auto-fix (needsFix=" + needsFix + ")...");
            loadMissingData(reservationId);
        }
        
        startListening();
    }

    private void loadMissingData(String reservationId) {
        Log.d("ChatVM", "Loading missing data for resId: " + reservationId);
        reservationService.getReservationById(reservationId, new ReservationService.HistoryCallback() {
            @Override
            public void onHistoryLoaded(List<Reservation> reservations) {
                if (!reservations.isEmpty()) {
                    Reservation r = reservations.get(0);
                    String currentUid = MyApp.getCurrentUserId();
                    if (currentUid != null) {
                        // Si soy el pasajero, el receptor es el conductor. Si soy el conductor, el receptor es el pasajero.
                        boolean isPassenger = currentUid.equals(r.getUserId());
                        receiverId = isPassenger ? r.getDriverId() : r.getUserId();
                        senderName = isPassenger ? r.getName() : r.getDriver();
                        
                        Log.d("ChatVM", "✅ Auto-fix success! I am " + (isPassenger ? "Passenger" : "Driver"));
                        Log.d("ChatVM", "✅ Resolved -> Receiver: " + receiverId + ", SenderName: " + senderName);
                    }
                } else {
                    Log.w("ChatVM", "Reservation not found in active node, checking archive...");
                    checkArchivedForMissingData(reservationId);
                }
            }
            @Override public void onError(String err) { 
                Log.e("ChatVM", "Error loading from active node: " + err);
                checkArchivedForMissingData(reservationId);
            }
        });
    }

    private void checkArchivedForMissingData(String reservationId) {
        Log.d("ChatVM", "Checking archive for resId: " + reservationId);
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
                                    Log.d("ChatVM", "✅ Auto-fix ARCHIVE success! Receiver: " + receiverId);
                                }
                            }
                        } else {
                            Log.e("ChatVM", "❌ FATAL: Reservation not found anywhere!");
                        }
                    }
                    @Override public void onCancelled(@androidx.annotation.NonNull com.google.firebase.database.DatabaseError error) {
                        Log.e("ChatVM", "Archive search cancelled: " + error.getMessage());
                    }
                });
    }

    private void startListening() {
        if (currentReservationId == null) return;
        Log.d("ChatVM", "Started listening to messages for: " + currentReservationId);
        
        chatListener = chatService.listenMessages(currentReservationId, new ChatService.MessagesCallback() {
            @Override
            public void onMessagesUpdated(List<ChatMessage> list) {
                Log.d("ChatVM", "Messages updated. Total: " + list.size());
                messages.postValue(list);
            }

            @Override public void onError(String err) { 
                Log.e("ChatVM", "Chat Listener Error: " + err);
                error.postValue(err); 
            }
        });
    }

    public void sendMessage(String text) {
        String uid = MyApp.getCurrentUserId();
        Log.d("ChatVM", "--- ATTEMPTING SEND ---");
        Log.d("ChatVM", "UID: " + uid);
        Log.d("ChatVM", "ResId: " + currentReservationId);
        Log.d("ChatVM", "ReceiverId: " + receiverId);
        Log.d("ChatVM", "SenderName: " + senderName);
        
        if (uid != null && currentReservationId != null && receiverId != null) {
            String name = (senderName != null && !senderName.isEmpty()) ? senderName : "Usuario";
            chatService.sendMessage(currentReservationId, uid, name, receiverId, text);
        } else {
            String errorMsg = "Error: Faltan datos para enviar (Destinatario: " + (receiverId == null ? "NULL" : "OK") + ")";
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

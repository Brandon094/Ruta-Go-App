package com.chopcode.rutago.app.viewmodels.common;

import android.util.Log;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;
import com.chopcode.rutago.app.models.ChatMessage;
import com.chopcode.rutago.app.models.Reservation;
import com.chopcode.rutago.app.services.chat.ChatService;
import com.chopcode.rutago.app.services.reservations.common.ReservationService;
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
        if (reservationId == null) {
            android.util.Log.e("ChatVM", "❌ initChat ABORTADO: reservationId es NULL");
            return;
        }

        this.currentReservationId = reservationId;
        this.receiverId = rId;
        this.senderName = sName;
        
        android.util.Log.e("ChatVM", "💬 initChat - resId: " + reservationId + ", receiver: " + rId);
        
        String myUid = MyApp.getCurrentUserId();
        android.util.Log.e("ChatVM", "👤 Mi UID: " + myUid);

        // Siempre cargamos la data de la reserva para asegurar que senderName y receiverId 
        // son correctos según el rol actual (conductor/pasajero)
        loadMissingData(reservationId);
        
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
        android.util.Log.e("ChatVM", "📡 Iniciando escucha de Firebase para: " + currentReservationId);
        
        chatListener = chatService.listenMessages(currentReservationId, new ChatService.MessagesCallback() {
            @Override
            public void onMessagesUpdated(List<ChatMessage> list) {
                android.util.Log.e("ChatVM", "📊 Mensajes recibidos: " + list.size());
                messages.postValue(list);
            }

            @Override public void onError(String err) { 
                android.util.Log.e("ChatVM", "❌ Error en listener de mensajes: " + err);
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
        Log.d("ChatVM", "SenderName (Me): " + senderName);
        
        if (uid != null && currentReservationId != null && receiverId != null) {
            // Si el receptor soy yo mismo, algo está mal en la carga inicial
            if (uid.equals(receiverId)) {
                Log.w("ChatVM", "⚠️ Error de identidad: El receptor soy yo mismo. Reintentando sincronización...");
                loadMissingData(currentReservationId);
                error.postValue("Sincronizando chat... Por favor, intenta enviar de nuevo.");
                return;
            }
            
            String name = (senderName != null && !senderName.isEmpty()) ? senderName : "Usuario";
            chatService.sendMessage(currentReservationId, uid, name, receiverId, text);
        } else {
            String errorMsg = "Faltan datos: Res=" + (currentReservationId != null) + ", Rec=" + (receiverId != null);
            Log.e("ChatVM", "❌ " + errorMsg);
            error.postValue(errorMsg);
            // Intentar recuperar datos para el próximo intento
            if (currentReservationId != null) loadMissingData(currentReservationId);
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

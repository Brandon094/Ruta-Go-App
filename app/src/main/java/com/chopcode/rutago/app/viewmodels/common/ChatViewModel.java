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
 * Chat ViewModel
 *
 * Motor de comunicación en tiempo real para el sistema de mensajería contextual.
 * Responsabilidades:
 * - Gestionar la suscripción reactiva al nodo NoSQL de mensajes para una reserva específica.
 * - Realizar el "Auto-Fix" de identidad: detecta dinámicamente quién es el emisor y el receptor
 *   basado en el UID actual y el rol (Pasajero/Conductor).
 * - Orquestar el envío de nuevos mensajes con metadatos de sincronización.
 * - Liberar listeners de Firebase al destruir el ViewModel para evitar fugas de memoria.
 */
public class ChatViewModel extends ViewModel {
    private static final String TAG = "ChatVM";
    
    /** Colección reactiva de mensajes de la conversación actual. */
    private final MutableLiveData<List<ChatMessage>> messages = new MutableLiveData<>(new ArrayList<>());
    
    /** Notifica fallos de conexión o errores en el envío. */
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

    /**
     * Inicializa el estado del chat para una reserva determinada.
     * @param reservationId ID de la reserva vinculada al chat.
     * @param rId ID sugerido del receptor.
     * @param sName Nombre sugerido del emisor.
     */
    public void initChat(String reservationId, String rId, String sName) {
        if (reservationId == null) {
            Log.e(TAG, "❌ initChat ABORTADO: reservationId es NULL");
            return;
        }

        this.currentReservationId = reservationId;
        this.receiverId = rId;
        this.senderName = sName;
        
        // Sincronización proactiva de metadatos de identidad
        loadMissingData(reservationId);
        
        startListening();
    }

    /**
     * Mecanismo de Auto-Corrección:
     * Consulta el estado actual de la reserva para validar los roles y asegurar que 
     * el canal de comunicación sea bidireccional y correcto.
     */
    private void loadMissingData(String reservationId) {
        Log.d(TAG, "🔍 Sincronizando metadatos de identidad para reserva: " + reservationId);
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
                        
                        Log.d(TAG, "✅ Identidad resuelta -> Rol: " + (isPassenger ? "Pasajero" : "Conductor"));
                    }
                } else {
                    Log.w(TAG, "⚠️ Reserva no encontrada en nodo activo, verificando histórico...");
                    checkArchivedForMissingData(reservationId);
                }
            }
            @Override public void onError(String err) { 
                Log.e(TAG, "❌ Error al cargar reserva: " + err);
                checkArchivedForMissingData(reservationId);
            }
        });
    }

    /**
     * Busca la reserva en el nodo de archivadas si no se encuentra en el activo.
     */
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
                                    Log.d(TAG, "✅ Identidad recuperada desde archivo.");
                                }
                            }
                        } else {
                            Log.e(TAG, "❌ ERROR FATAL: La reserva no existe en ningún nodo del sistema.");
                        }
                    }
                    @Override public void onCancelled(@androidx.annotation.NonNull com.google.firebase.database.DatabaseError error) {
                        Log.e(TAG, "❌ Búsqueda en archivo cancelada: " + error.getMessage());
                    }
                });
    }

    /**
     * Activa el listener de Firebase para recibir actualizaciones en tiempo real.
     */
    private void startListening() {
        if (currentReservationId == null) return;
        Log.d(TAG, "📡 Activando suscripción reactiva para: " + currentReservationId);
        
        chatListener = chatService.listenMessages(currentReservationId, new ChatService.MessagesCallback() {
            @Override
            public void onMessagesUpdated(List<ChatMessage> list) {
                messages.postValue(list);
            }

            @Override public void onError(String err) { 
                Log.e(TAG, "❌ Fallo en el stream de mensajes: " + err);
                error.postValue(err); 
            }
        });
    }

    /**
     * Envía un mensaje de texto al receptor validado.
     */
    public void sendMessage(String text) {
        String uid = MyApp.getCurrentUserId();
        if (uid != null && currentReservationId != null && receiverId != null) {
            
            // Validación de eco (evitar enviarse mensajes a uno mismo)
            if (uid.equals(receiverId)) {
                Log.w(TAG, "⚠️ Error de identidad: Receptor == Emisor. Reintentando sincronización...");
                loadMissingData(currentReservationId);
                error.postValue("Sincronizando chat... Por favor, intenta de nuevo.");
                return;
            }
            

            chatService.sendMessage(currentReservationId, uid, text);
        } else {
            Log.e(TAG, "❌ No se puede enviar: Faltan metadatos críticos de sesión o destino.");
            if (currentReservationId != null) loadMissingData(currentReservationId);
        }
    }

    @Override
    protected void onCleared() {
        super.onCleared();
        if (currentReservationId != null && chatListener != null) {
            chatService.stopListening(currentReservationId, chatListener);
            Log.d(TAG, "🧹 Listener de chat removido satisfactoriamente.");
        }
    }
}

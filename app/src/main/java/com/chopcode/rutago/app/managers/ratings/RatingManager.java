package com.chopcode.rutago.app.managers.ratings;

import android.util.Log;
import androidx.annotation.NonNull;

import com.chopcode.rutago.app.config.MyApp;
import com.chopcode.rutago.app.models.Calificacion;
import com.chopcode.rutago.app.models.Reserva;
import com.google.firebase.database.DatabaseReference;

/**
 * Singleton Manager para gestionar todas las calificaciones de conductores
 */
public class RatingManager {
    private static final String TAG = "RatingManager";
    private static RatingManager instance;
    private final DatabaseReference ratingsRef;
    private final DatabaseReference reservasRef;

    private RatingManager() {
        this.ratingsRef = MyApp.getDatabaseReference("calificaciones_conductores");
        this.reservasRef = MyApp.getDatabaseReference("reservas");
        Log.d(TAG, "🚀 RatingManager Singleton inicializado");
    }

    public static synchronized RatingManager getInstance() {
        if (instance == null) {
            instance = new RatingManager();
        }
        return instance;
    }

    /**
     * Interfaz para notificar el resultado de la calificación
     */
    public interface RatingCallback {
        void onSuccess();
        void onError(String error);
    }

    /**
     * Guarda una calificación y actualiza el estado de la reserva
     */
    public void calificarViaje(Reserva reserva, float stars, String comentario, RatingCallback callback) {
        if (reserva == null || reserva.getConductorId() == null) {
            if (callback != null) callback.onError("Datos de reserva inválidos o sin conductor");
            return;
        }

        String conductorId = reserva.getConductorId();
        String currentUserId = MyApp.getCurrentUserId();

        // 1. Crear objeto calificación
        Calificacion calificacion = new Calificacion(
                currentUserId,
                reserva.getNombre(),
                conductorId,
                reserva.getIdReserva(),
                reserva.getNombreRuta(),
                stars,
                comentario
        );

        // 2. Generar ID único en el nodo del conductor
        DatabaseReference nuevaNotifRef = ratingsRef.child(conductorId).push();
        calificacion.setId(nuevaNotifRef.getKey());

        Log.d(TAG, "📤 Enviando calificación a Firebase...");

        // 3. Guardar calificación
        nuevaNotifRef.setValue(calificacion)
                .addOnSuccessListener(aVoid -> {
                    Log.d(TAG, "✅ Calificación guardada con éxito");
                    
                    // 4. Marcar la reserva como calificada
                    marcarReservaComoCalificada(reserva.getIdReserva(), callback);
                })
                .addOnFailureListener(e -> {
                    Log.e(TAG, "❌ Error guardando calificación: " + e.getMessage());
                    if (callback != null) callback.onError(e.getMessage());
                });
    }

    /**
     * Actualiza el flag 'calificada' en el nodo de reservas
     */
    private void marcarReservaComoCalificada(String reservaId, RatingCallback callback) {
        if (reservaId == null) return;

        reservasRef.child(reservaId).child("calificada").setValue(true)
                .addOnSuccessListener(aVoid -> {
                    Log.d(TAG, "✅ Reserva " + reservaId + " marcada como calificada");
                    if (callback != null) callback.onSuccess();
                })
                .addOnFailureListener(e -> {
                    Log.e(TAG, "⚠️ Calificación guardada pero no se pudo marcar la reserva: " + e.getMessage());
                    // Notificamos éxito de todos modos porque la calificación se guardó
                    if (callback != null) callback.onSuccess();
                });
    }
}

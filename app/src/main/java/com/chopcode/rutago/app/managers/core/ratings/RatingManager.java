package com.chopcode.rutago.app.managers.core.ratings;

import android.util.Log;
import com.chopcode.rutago.app.config.MyApp;
import com.chopcode.rutago.app.models.Rating;
import com.chopcode.rutago.app.models.Reservation;
import com.google.firebase.database.DatabaseReference;
import java.util.HashMap;
import java.util.Map;

/**
 * ⭐ Rating Manager (Singleton)
 *
 * Responsable de la gestión del feedback y reputación de los conductores.
 * Responsabilidades:
 * - Orquestar la creación de calificaciones vinculadas a una reserva específica.
 * - Asegurar la consistencia dual: guarda la reseña en el nodo de calificaciones y 
 *   marca la reserva como "calificada" simultáneamente.
 * - Implementar lógica de persistencia bilingüe (Mapeo dual para Firebase).
 */
public class RatingManager {
    private static final String TAG = "RatingManager";
    private static RatingManager instance;
    private final DatabaseReference ratingsRef;
    private final DatabaseReference reservesRef;

    private RatingManager() {
        this.ratingsRef = MyApp.getDatabaseReference("calificaciones_conductores");
        this.reservesRef = MyApp.getDatabaseReference("reservas");
    }

    /**
     * @return Instancia única del manager.
     */
    public static synchronized RatingManager getInstance() {
        if (instance == null) instance = new RatingManager();
        return instance;
    }

    public interface RatingCallback {
        void onSuccess();
        void onError(String error);
    }

    /**
     * Registra una nueva calificación para un viaje finalizado.
     * @param reservation Objeto reserva que sirve como contexto.
     * @param stars Puntuación numérica otorgada (1-5).
     * @param comment Observaciones cualitativas opcionales.
     */
    public void calificarViaje(Reservation reservation, float stars, String comment, RatingCallback callback) {
        if (reservation == null || reservation.getDriverId() == null) {
            if (callback != null) callback.onError("Datos de reserva inválidos para calificar.");
            return;
        }

        String driverId = reservation.getDriverId();
        String userId = MyApp.getCurrentUserId();

        Rating rating = new Rating(
                userId,
                reservation.getName(),
                driverId,
                reservation.getIdReservation(),
                reservation.getRouteName(),
                stars,
                comment
        );

        DatabaseReference ref = ratingsRef.child(driverId).push();
        rating.setId(ref.getKey());

        // 1. Guardar la calificación en el nodo maestro de reputación
        ref.setValue(rating)
                .addOnSuccessListener(aVoid -> markAsRated(reservation.getIdReservation(), stars, callback))
                .addOnFailureListener(e -> { if (callback != null) callback.onError(e.getMessage()); });
    }

    /**
     * Actualiza la reserva original para reflejar que ya ha sido calificada, 
     * evitando duplicidad de feedback.
     */
    private void markAsRated(String reservationId, float stars, RatingCallback callback) {
        if (reservationId == null) return;
        
        Map<String, Object> updates = new HashMap<>();
        updates.put("rated", true);
        updates.put("calificada", true);
        updates.put("rating", stars);
        updates.put("calificacion", stars);

        reservesRef.child(reservationId).updateChildren(updates)
                .addOnSuccessListener(aVoid -> { if (callback != null) callback.onSuccess(); })
                .addOnFailureListener(e -> { 
                    Log.e(TAG, "❌ Error al marcar reserva como calificada: " + e.getMessage());
                    if (callback != null) callback.onError("No se pudo actualizar el estado de la reserva.");
                });
    }
}

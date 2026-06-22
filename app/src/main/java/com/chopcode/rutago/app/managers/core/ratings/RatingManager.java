package com.chopcode.rutago.app.managers.core.ratings;

import android.util.Log;
import com.chopcode.rutago.app.config.MyApp;
import com.chopcode.rutago.app.models.Rating;
import com.chopcode.rutago.app.models.Reservation;
import com.google.firebase.database.DatabaseReference;
import java.util.HashMap;
import java.util.Map;

/**
 * Singleton Manager to handle driver ratings.
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

    public static synchronized RatingManager getInstance() {
        if (instance == null) instance = new RatingManager();
        return instance;
    }

    public interface RatingCallback {
        void onSuccess();
        void onError(String error);
    }

    public void calificarViaje(Reservation reservation, float stars, String comment, RatingCallback callback) {
        if (reservation == null || reservation.getDriverId() == null) {
            if (callback != null) callback.onError("Invalid reservation data");
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

        ref.setValue(rating)
                .addOnSuccessListener(aVoid -> markAsRated(reservation.getIdReservation(), stars, callback))
                .addOnFailureListener(e -> { if (callback != null) callback.onError(e.getMessage()); });
    }

    private void markAsRated(String reservationId, float stars, RatingCallback callback) {
        if (reservationId == null) return;
        
        Map<String, Object> updates = new HashMap<>();
        updates.put("rated", true);
        updates.put("calificada", true); // Compatibilidad dual
        updates.put("rating", stars);
        updates.put("calificacion", stars); // Compatibilidad dual

        reservesRef.child(reservationId).updateChildren(updates)
                .addOnSuccessListener(aVoid -> { if (callback != null) callback.onSuccess(); })
                .addOnFailureListener(e -> { 
                    Log.e(TAG, "Error marking as rated: " + e.getMessage());
                    if (callback != null) callback.onError("No se pudo marcar como calificada: " + e.getMessage()); 
                });
    }
}

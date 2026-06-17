package com.chopcode.rutago.app.services.audit;

import android.util.Log;
import androidx.annotation.NonNull;
import com.chopcode.rutago.app.config.MyApp;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.ValueEventListener;
import java.util.HashMap;
import java.util.Map;

/**
 * 🧹 Archive Service
 * 
 * Responsable de la limpieza y archivado de datos antiguos.
 * Mueve reservas con más de 30 días de antigüedad al nodo 'reservas_archivadas'
 * para mantener la base de datos principal ágil y económica.
 */
public class ArchiveService {
    private static final String TAG = "ArchiveService";
    private static final long THIRTY_DAYS_MS = 30L * 24 * 60 * 60 * 1000;

    public interface ArchiveCallback {
        void onArchiveComplete(int movedCount);
        void onError(String error);
    }

    /**
     * Ejecuta un barrido de reservas antiguas de forma atómica.
     */
    public void runReservationSweep(ArchiveCallback callback) {
        long cutoffDate = System.currentTimeMillis() - THIRTY_DAYS_MS;
        DatabaseReference rootRef = MyApp.getDatabaseReference("");
        DatabaseReference resRef = rootRef.child("reservas");

        Log.d(TAG, "🚀 Iniciando barrido de reservas anteriores a: " + cutoffDate);

        resRef.orderByChild("reservationDate").endAt(cutoffDate).addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                if (!snapshot.exists()) {
                    Log.d(TAG, "✨ No hay reservas antiguas para archivar.");
                    callback.onArchiveComplete(0);
                    return;
                }

                Map<String, Object> updates = new HashMap<>();
                int currentCount = 0;

                for (DataSnapshot ds : snapshot.getChildren()) {
                    String id = ds.getKey();
                    Object data = ds.getValue();
                    if (id != null && data != null) {
                        updates.put("reservas_archivadas/" + id, data);
                        updates.put("reservas/" + id, null);
                        currentCount++;
                    }
                }

                final int finalCount = currentCount;
                if (finalCount > 0) {
                    rootRef.updateChildren(updates)
                            .addOnSuccessListener(aVoid -> {
                                Log.d(TAG, "✅ Archivadas con éxito " + finalCount + " reservas.");
                                callback.onArchiveComplete(finalCount);
                            })
                            .addOnFailureListener(e -> callback.onError(e.getMessage()));
                } else {
                    callback.onArchiveComplete(0);
                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {
                callback.onError(error.getMessage());
            }
        });
    }
}

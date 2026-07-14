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
 * Archive Service
 *
 * Especialista en el mantenimiento preventivo y optimización de la base de datos NoSQL.
 * Responsabilidades:
 * - Identificar registros de reserva que han superado el periodo de vigencia operativa (30 días).
 * - Ejecutar la migración atómica de datos desde el nodo activo (/reservas/) hacia el 
 *   histórico frío (/reservas_archivadas/).
 * - Garantizar la ligereza del árbol de datos principal para reducir latencia y costos de lectura.
 */
public class ArchiveService {
    private static final String TAG = "ArchiveService";
    
    /** Periodo de gracia para considerar una reserva como histórica (30 días). */
    private static final long THIRTY_DAYS_MS = 30L * 24 * 60 * 60 * 1000;

    /** Interfaz para notificar el resultado del proceso de mantenimiento. */
    public interface ArchiveCallback {
        /** @param movedCount Cantidad de registros migrados exitosamente. */
        void onArchiveComplete(int movedCount);
        void onError(String error);
    }

    /**
     * Ejecuta una transacción multi-nodo para archivar datos obsoletos.
     * Utiliza un filtrado por rango de tiempo para seleccionar únicamente los registros calificados.
     * @param callback Retorno con el conteo de registros procesados.
     */
    public void runReservationSweep(ArchiveCallback callback) {
        long cutoffDate = System.currentTimeMillis() - THIRTY_DAYS_MS;
        DatabaseReference rootRef = MyApp.getDatabaseReference("");
        DatabaseReference resRef = rootRef.child("reservas");

        Log.d(TAG, "🚀 Iniciando barrido de reservas anteriores a: " + cutoffDate);

        // Consulta indexada por fecha de reserva
        resRef.orderByChild("reservationDate").endAt(cutoffDate).addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                if (!snapshot.exists()) {
                    Log.d(TAG, "✨ Base de datos optimizada: Sin registros pendientes de archivado.");
                    callback.onArchiveComplete(0);
                    return;
                }

                Map<String, Object> updates = new HashMap<>();
                int currentCount = 0;

                for (DataSnapshot ds : snapshot.getChildren()) {
                    String id = ds.getKey();
                    Object data = ds.getValue();
                    if (id != null && data != null) {
                        // Preparación de la escritura atómica dual
                        updates.put("reservas_archivadas/" + id, data);
                        updates.put("reservas/" + id, null);
                        currentCount++;
                    }
                }

                final int finalCount = currentCount;
                if (finalCount > 0) {
                    // Ejecución en un solo paso para garantizar consistencia
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
                Log.e(TAG, "❌ Fallo en el barrido de datos: " + error.getMessage());
                callback.onError(error.getMessage());
            }
        });
    }
}

package com.chopcode.rutago.app.services.reservations.passenger;

import android.util.Log;
import androidx.annotation.NonNull;
import com.chopcode.rutago.app.config.MyApp;
import com.chopcode.rutago.app.models.Reservation;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.ValueEventListener;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Passenger Reservation Service
 *
 * Repositorio de consultas logísticas centradas en la experiencia del cliente.
 * Responsabilidades:
 * - Recuperar el historial de tiquetes digitales filtrado por el UID del pasajero.
 * - Implementar motores de cálculo para métricas de fidelización (Gasto total y puntos acumulados).
 * - Realizar análisis de comportamiento mediante la detección de la ruta más frecuentada.
 * - Sincronizar el estado del historial con la visualización de perfiles premium.
 */
public class PassengerReservationService {

    private static final String TAG = "PassengerResService";

    public interface HistoryCallback {
        void onHistoryLoaded(List<Reservation> reservations);
        void onError(String error);
    }

    public interface PremiumStatsCallback {
        /** @param stats Mapa con claves: totalGastado, viajesConfirmados, rutaMasFrecuente, puntosLealtad. */
        void onStatsCalculated(Map<String, Object> stats);
        void onError(String error);
    }

    public PassengerReservationService() {}

    /**
     * Consulta el histórico de reservas personales.
     */
    public void getBasicHistory(String userId, HistoryCallback callback) {
        DatabaseReference ref = MyApp.getDatabaseReference("reservas");
        ref.orderByChild("userId").equalTo(userId)
                .addListenerForSingleValueEvent(new ValueEventListener() {
                    @Override
                    public void onDataChange(@NonNull DataSnapshot snapshot) {
                        List<Reservation> reservations = new ArrayList<>();
                        for (DataSnapshot ds : snapshot.getChildren()) {
                            Reservation r = ds.getValue(Reservation.class);
                            if (r != null) {
                                r.setIdReservation(ds.getKey());
                                reservations.add(r);
                            }
                        }
                        // Ordenamiento cronológico reverso
                        Collections.sort(reservations, (r1, r2) -> Long.compare(r2.getReservationDate(), r1.getReservationDate()));
                        callback.onHistoryLoaded(reservations);
                    }
                    @Override public void onCancelled(@NonNull DatabaseError error) { 
                        Log.e(TAG, "❌ Error al cargar historial básico: " + error.getMessage());
                        callback.onError(error.getMessage()); 
                    }
                });
    }

    /**
     * Procesa el historial del usuario para generar indicadores de valor agregado (Fase Premium).
     */
    public void getPremiumStats(String userId, PremiumStatsCallback callback) {
        getBasicHistory(userId, new HistoryCallback() {
            @Override
            public void onHistoryLoaded(List<Reservation> reservations) {
                double totalSpent = 0;
                int confirmedCount = 0;
                Map<String, Integer> routeFrequency = new HashMap<>();

                for (Reservation r : reservations) {
                    // Solo computamos métricas sobre viajes efectivamente realizados/confirmados
                    if ("Confirmada".equalsIgnoreCase(r.getReservationStatus())) {
                        totalSpent += r.getPrice();
                        confirmedCount++;
                        String route = r.getOrigin() + " - " + r.getDestination();
                        routeFrequency.put(route, routeFrequency.getOrDefault(route, 0) + 1);
                    }
                }

                Map<String, Object> stats = new HashMap<>();
                stats.put("totalGastado", totalSpent);
                stats.put("viajesConfirmados", confirmedCount);
                stats.put("rutaMasFrecuente", getMostFrequentRoute(routeFrequency));
                stats.put("puntosLealtad", confirmedCount * 10);
                callback.onStatsCalculated(stats);
            }
            @Override public void onError(String error) { callback.onError(error); }
        });
    }

    /**
     * Algoritmo de detección de frecuencia de uso por trayecto.
     */
    private String getMostFrequentRoute(Map<String, Integer> routes) {
        String principal = "N/A";
        int max = 0;
        for (Map.Entry<String, Integer> entry : routes.entrySet()) {
            if (entry.getValue() > max) {
                max = entry.getValue();
                principal = entry.getKey();
            }
        }
        return principal;
    }
}

package com.chopcode.trasnportenataga_laplata.services.reservations.passenger;

import android.util.Log;
import androidx.annotation.NonNull;
import com.chopcode.trasnportenataga_laplata.config.MyApp;
import com.chopcode.trasnportenataga_laplata.models.Reserva;
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
 * Servicio unificado para gestionar reservas desde la perspectiva del Pasajero.
 */
public class PassengerReservationService {

    private static final String TAG = "PassengerResService";

    public interface HistoryCallback {
        void onHistoryLoaded(List<Reserva> reservas);
        void onError(String error);
    }

    public interface PremiumStatsCallback {
        void onStatsCalculated(Map<String, Object> stats);
        void onError(String error);
    }

    public PassengerReservationService() {}

    /**
     * MÉTODO BÁSICO - Historial de reservas del pasajero
     * Devuelve todas las reservas ordenadas por fecha.
     */
    public void obtenerHistorialBasico(String usuarioId, HistoryCallback callback) {
        Log.d(TAG, "📋 Cargando historial básico para usuario: " + usuarioId);
        
        DatabaseReference ref = MyApp.getDatabaseReference("reservas");
        ref.orderByChild("usuarioId").equalTo(usuarioId)
                .addListenerForSingleValueEvent(new ValueEventListener() {
                    @Override
                    public void onDataChange(@NonNull DataSnapshot snapshot) {
                        List<Reserva> reservas = new ArrayList<>();
                        for (DataSnapshot ds : snapshot.getChildren()) {
                            Reserva r = ds.getValue(Reserva.class);
                            if (r != null) {
                                r.setIdReserva(ds.getKey());
                                reservas.add(r);
                            }
                        }
                        // Más reciente primero
                        Collections.sort(reservas, (r1, r2) -> Long.compare(r2.getFechaReserva(), r1.getFechaReserva()));
                        callback.onHistoryLoaded(reservas);
                    }

                    @Override
                    public void onCancelled(@NonNull DatabaseError error) {
                        callback.onError(error.getMessage());
                    }
                });
    }

    /**
     * MÉTODO PREMIUM - Estadísticas de ahorro y frecuencia
     * Calcula cuánto ha gastado el usuario y cuáles son sus rutas más comunes.
     */
    public void obtenerEstadisticasPremium(String usuarioId, PremiumStatsCallback callback) {
        Log.d(TAG, "💰 [PREMIUM] Calculando estadísticas para usuario: " + usuarioId);
        
        obtenerHistorialBasico(usuarioId, new HistoryCallback() {
            @Override
            public void onHistoryLoaded(List<Reserva> reservas) {
                double totalGastado = 0;
                int confirmados = 0;
                Map<String, Integer> frecuenciaRutas = new HashMap<>();

                for (Reserva r : reservas) {
                    if ("Confirmada".equals(r.getEstadoReserva())) {
                        totalGastado += r.getPrecio();
                        confirmados++;
                        String ruta = r.getOrigen() + " - " + r.getDestino();
                        frecuenciaRutas.put(ruta, frecuenciaRutas.getOrDefault(ruta, 0) + 1);
                    }
                }

                Map<String, Object> stats = new HashMap<>();
                stats.put("totalGastado", totalGastado);
                stats.put("viajesConfirmados", confirmados);
                stats.put("rutaMasFrecuente", encontrarRutaPrincipal(frecuenciaRutas));
                stats.put("puntosLealtad", confirmados * 10); // Ejemplo de sistema de puntos

                callback.onStatsCalculated(stats);
            }

            @Override
            public void onError(String error) {
                callback.onError(error);
            }
        });
    }

    private String encontrarRutaPrincipal(Map<String, Integer> rutas) {
        String principal = "N/A";
        int max = 0;
        for (Map.Entry<String, Integer> entry : rutas.entrySet()) {
            if (entry.getValue() > max) {
                max = entry.getValue();
                principal = entry.getKey();
            }
        }
        return principal;
    }
}

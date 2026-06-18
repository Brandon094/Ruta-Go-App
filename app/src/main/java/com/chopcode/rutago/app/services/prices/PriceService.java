package com.chopcode.rutago.app.services.prices;

import android.util.Log;
import androidx.annotation.NonNull;
import com.chopcode.rutago.app.config.MyApp;
import com.chopcode.rutago.app.utils.ui.FormatUtils;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.ValueEventListener;
import java.util.HashMap;
import java.util.Map;

/**
 * 💰 Price Service
 * 
 * Gestiona la consulta de tarifas dinámicas desde Firebase.
 * Permite que el sistema escale fácilmente añadiendo nuevas rutas y precios
 * sin modificar el código fuente.
 */
public class PriceService {
    private static final String TAG = "PriceService";
    private final DatabaseReference pricesRef;

    public interface PriceCallback {
        void onPriceLoaded(double price);
        void onError(String error);
    }

    public interface AllPricesCallback {
        void onPricesLoaded(Map<String, Map<String, Double>> prices);
        void onError(String error);
    }

    public PriceService() {
        this.pricesRef = MyApp.getDatabaseReference("precios");
    }

    public void getAllPrices(AllPricesCallback callback) {
        pricesRef.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                Map<String, Map<String, Double>> allPrices = new HashMap<>();
                if (snapshot.exists()) {
                    for (DataSnapshot originSnap : snapshot.getChildren()) {
                        String origin = originSnap.getKey();
                        if (origin == null || origin.equals("ruta")) continue;
                        
                        Map<String, Double> destPrices = new HashMap<>();
                        for (DataSnapshot destSnap : originSnap.getChildren()) {
                            String dest = destSnap.getKey();
                            Double price = convertToDouble(destSnap.getValue());
                            if (price != null) destPrices.put(dest, price);
                        }
                        allPrices.put(origin, destPrices);
                    }
                }
                callback.onPricesLoaded(allPrices);
            }

            @Override public void onCancelled(@NonNull DatabaseError error) { callback.onError(error.getMessage()); }
        });
    }

    private Double convertToDouble(Object value) {
        if (value instanceof Number) return ((Number) value).doubleValue();
        if (value instanceof String) {
            try { return Double.parseDouble((String) value); } catch (Exception e) { return null; }
        }
        return null;
    }

    /**
     * Obtiene el precio de una ruta basada en origen y destino.
     * Estructura en Firebase: precios / origen / destino
     */
    public void getRoutePrice(String origin, String destination, PriceCallback callback) {
        if (origin == null || destination == null) {
            callback.onPriceLoaded(12000.0);
            return;
        }

        String normOrigin = FormatUtils.normalizarTexto(origin);
        String normDest = FormatUtils.normalizarTexto(destination);
        String legacyKey = normOrigin + " -> " + normDest;

        Log.d(TAG, "🔍 Buscando precio para: " + normOrigin + " -> " + normDest);

        // Intentar primero con la estructura recomendada: precios/origen/destino
        pricesRef.child(normOrigin).child(normDest).addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                if (snapshot.exists()) {
                    resolvePrice(snapshot, callback);
                } else {
                    // Si no existe, intentar con la estructura de tu JSON: precios/ruta/origen -> destino
                    pricesRef.child("ruta").child(legacyKey).addListenerForSingleValueEvent(new ValueEventListener() {
                        @Override
                        public void onDataChange(@NonNull DataSnapshot snapshotLegacy) {
                            if (snapshotLegacy.exists()) {
                                resolvePrice(snapshotLegacy, callback);
                            } else {
                                Log.w(TAG, "⚠️ Precio no encontrado en ninguna estructura. Usando 12000.");
                                callback.onPriceLoaded(12000.0);
                            }
                        }
                        @Override public void onCancelled(@NonNull DatabaseError error) { callback.onPriceLoaded(12000.0); }
                    });
                }
            }
            @Override public void onCancelled(@NonNull DatabaseError error) { callback.onPriceLoaded(12000.0); }
        });
    }

    private void resolvePrice(DataSnapshot snapshot, PriceCallback callback) {
        try {
            Object value = snapshot.getValue();
            if (value instanceof Number) {
                callback.onPriceLoaded(((Number) value).doubleValue());
            } else if (value instanceof String) {
                callback.onPriceLoaded(Double.parseDouble((String) value));
            } else {
                callback.onPriceLoaded(12000.0);
            }
        } catch (Exception e) {
            Log.e(TAG, "❌ Error al convertir precio: " + e.getMessage());
            callback.onPriceLoaded(12000.0);
        }
    }
}

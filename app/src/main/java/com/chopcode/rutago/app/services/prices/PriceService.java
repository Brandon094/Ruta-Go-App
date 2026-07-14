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
 * Price Service
 *
 * Gestor de la política tarifaria del ecosistema.
 * Responsabilidades:
 * - Consultar en tiempo real las tarifas oficiales desde el nodo /precios/ de Firebase.
 * - Implementar lógica de normalización de nombres de rutas para asegurar el "Match" de precios.
 * - Proveer un mecanismo de "Fallback" con tarifas por defecto ante inconsistencias de red.
 * - Soportar esquemas de datos jerárquicos (Origen -> Destino) para máxima escalabilidad regional.
 */
public class PriceService {
    private static final String TAG = "PriceService";
    
    /** Tarifa base de seguridad en caso de fallo en la nube. */
    public static final double DEFAULT_PRICE = 12000.0;
    
    private final DatabaseReference pricesRef;

    public interface PriceCallback {
        void onPriceLoaded(double price);
        void onError(String error);
    }

    public interface AllPricesCallback {
        /** @param prices Mapa anidado con la estructura [Origen][Destino] = Tarifa. */
        void onPricesLoaded(Map<String, Map<String, Double>> prices);
        void onError(String error);
    }

    public PriceService() {
        this.pricesRef = MyApp.getDatabaseReference("precios");
    }

    /**
     * Recupera el catálogo completo de precios para cache local u optimización de UI.
     */
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

            @Override public void onCancelled(@NonNull DatabaseError error) { 
                Log.e(TAG, "❌ Fallo al cargar catálogo de precios: " + error.getMessage());
                callback.onError(error.getMessage()); 
            }
        });
    }

    /**
     * Convierte valores heterogéneos de Firebase (String/Long/Double) a Double seguro.
     */
    private Double convertToDouble(Object value) {
        if (value instanceof Number) return ((Number) value).doubleValue();
        if (value instanceof String) {
            try { return Double.parseDouble((String) value); } catch (Exception e) { return null; }
        }
        return null;
    }

    /**
     * Obtiene el precio específico de una ruta basándose en su origen y destino.
     * Implementa búsqueda dual para compatibilidad con esquemas legacy.
     */
    public void getRoutePrice(String origin, String destination, PriceCallback callback) {
        if (origin == null || destination == null) {
            callback.onPriceLoaded(DEFAULT_PRICE);
            return;
        }

        String normOrigin = FormatUtils.normalizarTexto(origin);
        String normDest = FormatUtils.normalizarTexto(destination);
        String legacyKey = normOrigin + " -> " + normDest;

        Log.d(TAG, "🔍 Resolviendo tarifa para trayecto: " + normOrigin + " -> " + normDest);

        // Intento 1: Estructura moderna jerárquica
        pricesRef.child(normOrigin).child(normDest).addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                if (snapshot.exists()) {
                    resolvePrice(snapshot, callback);
                } else {
                    // Intento 2: Estructura legacy plana
                    pricesRef.child("ruta").child(legacyKey).addListenerForSingleValueEvent(new ValueEventListener() {
                        @Override
                        public void onDataChange(@NonNull DataSnapshot snapshotLegacy) {
                            if (snapshotLegacy.exists()) {
                                resolvePrice(snapshotLegacy, callback);
                            } else {
                                Log.w(TAG, "⚠️ Ruta no tarifada. Aplicando DEFAULT: " + DEFAULT_PRICE);
                                callback.onPriceLoaded(DEFAULT_PRICE);
                            }
                        }
                        @Override public void onCancelled(@NonNull DatabaseError error) { callback.onPriceLoaded(DEFAULT_PRICE); }
                    });
                }
            }
            @Override public void onCancelled(@NonNull DatabaseError error) { callback.onPriceLoaded(DEFAULT_PRICE); }
        });
    }

    private void resolvePrice(DataSnapshot snapshot, PriceCallback callback) {
        try {
            Object value = snapshot.getValue();
            Double price = convertToDouble(value);
            if (price != null) {
                callback.onPriceLoaded(price);
            } else {
                callback.onPriceLoaded(DEFAULT_PRICE);
            }
        } catch (Exception e) {
            Log.e(TAG, "❌ Error de casteo en precio: " + e.getMessage());
            callback.onPriceLoaded(DEFAULT_PRICE);
        }
    }
}

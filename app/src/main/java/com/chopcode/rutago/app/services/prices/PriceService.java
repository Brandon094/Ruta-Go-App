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

    /**
     * Obtiene todos los precios para optimizar cargas en listas.
     */
    public void getAllPrices(AllPricesCallback callback) {
        pricesRef.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                Map<String, Map<String, Double>> allPrices = new HashMap<>();
                if (snapshot.exists()) {
                    for (DataSnapshot originSnap : snapshot.getChildren()) {
                        String origin = originSnap.getKey();
                        Map<String, Double> destPrices = new HashMap<>();
                        for (DataSnapshot destSnap : originSnap.getChildren()) {
                            String dest = destSnap.getKey();
                            try {
                                Double price = destSnap.getValue(Double.class);
                                if (price != null) destPrices.put(dest, price);
                            } catch (Exception ignored) {}
                        }
                        if (origin != null) allPrices.put(origin, destPrices);
                    }
                }
                callback.onPricesLoaded(allPrices);
            }

            @Override public void onCancelled(@NonNull DatabaseError error) { callback.onError(error.getMessage()); }
        });
    }

    /**
     * Obtiene el precio de una ruta basada en origen y destino.
     * Estructura en Firebase: precios / origen / destino
     */
    public void getRoutePrice(String origin, String destination, PriceCallback callback) {
        if (origin == null || destination == null) {
            callback.onPriceLoaded(12000.0); // Fallback por defecto
            return;
        }

        String normOrigin = FormatUtils.normalizarTexto(origin);
        String normDest = FormatUtils.normalizarTexto(destination);

        Log.d(TAG, "Fetching price for: " + normOrigin + " -> " + normDest);

        pricesRef.child(normOrigin).child(normDest).addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                if (snapshot.exists()) {
                    try {
                        Double price = snapshot.getValue(Double.class);
                        if (price != null) {
                            callback.onPriceLoaded(price);
                        } else {
                            callback.onPriceLoaded(12000.0);
                        }
                    } catch (Exception e) {
                        Log.e(TAG, "Error parsing price: " + e.getMessage());
                        callback.onPriceLoaded(12000.0);
                    }
                } else {
                    Log.w(TAG, "Price not found for route, using default.");
                    callback.onPriceLoaded(12000.0);
                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {
                Log.e(TAG, "Database error: " + error.getMessage());
                callback.onPriceLoaded(12000.0);
            }
        });
    }
}

package com.chopcode.rutago.app.services.reservations.common;

import android.util.Log;
import androidx.annotation.NonNull;
import com.chopcode.rutago.app.config.MyApp;
import com.chopcode.rutago.app.models.Schedule;
import com.chopcode.rutago.app.services.prices.PriceService;
import com.chopcode.rutago.app.utils.ui.FormatUtils;
import com.google.firebase.database.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * 🕒 Schedule Service
 * 
 * Gestiona el catálogo maestro de horarios y la disponibilidad global de asientos.
 */
public class ScheduleService {

    private static final String TAG = "ScheduleService";
    private final DatabaseReference databaseReference;
    private final PriceService priceService;

    public interface ScheduleCallback {
        void onSchedulesLoaded(List<Schedule> natagaList, List<Schedule> laPlataList);
        void onError(String error);
    }

    public interface GlobalSeatsCallback {
        void onSeatsUpdated(Map<String, Integer> availabilities, Map<String, Integer> totals);
    }

    public ScheduleService() {
        this.databaseReference = MyApp.getDatabaseReference("horarios");
        this.priceService = new PriceService();
    }

    public ValueEventListener listenGlobalAvailability(GlobalSeatsCallback callback) {
        DatabaseReference dispRef = MyApp.getDatabaseReference("disponibilidadAsientos");
        ValueEventListener listener = new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                Map<String, Integer> availMap = new java.util.HashMap<>();
                Map<String, Integer> totalMap = new java.util.HashMap<>();
                for (DataSnapshot hSnap : snapshot.getChildren()) {
                    String hId = hSnap.getKey();
                    Integer available = hSnap.child("asientosDisponibles").getValue(Integer.class);
                    Integer total = hSnap.child("totalAsientos").getValue(Integer.class);
                    if (hId != null) {
                        if (available != null) availMap.put(hId, available);
                        if (total != null) totalMap.put(hId, total);
                    }
                }
                callback.onSeatsUpdated(availMap, totalMap);
            }
            @Override public void onCancelled(@NonNull DatabaseError error) { Log.e(TAG, "Error: " + error.getMessage()); }
        };
        dispRef.addValueEventListener(listener);
        return listener;
    }

    public void loadSchedules(ScheduleCallback callback) {
        priceService.getAllPrices(new PriceService.AllPricesCallback() {
            @Override
            public void onPricesLoaded(Map<String, Map<String, Double>> allPrices) {
                // 🛡️ Sanity Check: Obtener conductores reales para filtrar IDs huérfanos
                MyApp.getDatabaseReference("conductores").addListenerForSingleValueEvent(new ValueEventListener() {
                    @Override
                    public void onDataChange(@NonNull DataSnapshot driversSnapshot) {
                        Set<String> validDrivers = new HashSet<>();
                        for (DataSnapshot d : driversSnapshot.getChildren()) validDrivers.add(d.getKey());

                        databaseReference.addValueEventListener(new ValueEventListener() {
                            @Override
                            public void onDataChange(DataSnapshot dataSnapshot) {
                                List<Schedule> natagaList = new ArrayList<>();
                                List<Schedule> laPlataList = new ArrayList<>();

                                for (DataSnapshot snapshot : dataSnapshot.getChildren()) {
                                    String time = snapshot.child("hora").getValue(String.class);
                                    String routeStr = snapshot.child("ruta").getValue(String.class);
                                    String condId = snapshot.child("conductorId").getValue(String.class);
                                    String id = snapshot.getKey();

                                    Schedule s = new Schedule();
                                    s.setId(id);
                                    s.setTime(time != null ? time : "--:--");
                                    s.setRoute(routeStr != null ? routeStr : "Ruta no disponible");
                                    
                                    // Solo asignar conductor si existe en el nodo /conductores/
                                    if (condId != null && validDrivers.contains(condId)) {
                                        s.setConductorId(condId);
                                    } else {
                                        s.setConductorId(null);
                                    }

                                    processPriceAndAddToList(s, routeStr, allPrices, natagaList, laPlataList);
                                }
                                callback.onSchedulesLoaded(natagaList, laPlataList);
                            }
                            @Override public void onCancelled(@NonNull DatabaseError e) { callback.onError(e.getMessage()); }
                        });
                    }
                    @Override public void onCancelled(@NonNull DatabaseError e) { callback.onError(e.getMessage()); }
                });
            }
            @Override public void onError(String error) { callback.onError(error); }
        });
    }

    private void processPriceAndAddToList(Schedule s, String routeStr, Map<String, Map<String, Double>> allPrices, List<Schedule> nL, List<Schedule> pL) {
        if (routeStr != null) {
            String origin = "Natagá", destination = "La Plata";
            if (routeStr.contains("->")) {
                String[] parts = routeStr.split("->");
                origin = parts[0].trim(); destination = parts[1].trim();
            } else if (routeStr.contains("→")) {
                String[] parts = routeStr.split("→");
                origin = parts[0].trim(); destination = parts[1].trim();
            }
            
            String nO = FormatUtils.normalizarTexto(origin);
            String nD = FormatUtils.normalizarTexto(destination);
            double p = PriceService.DEFAULT_PRICE;
            if (allPrices.containsKey(nO) && allPrices.get(nO).containsKey(nD)) p = allPrices.get(nO).get(nD);
            s.setPrice(String.valueOf(p));

            if (nO.contains("nataga")) nL.add(s); else pL.add(s);
        } else {
            s.setPrice(String.valueOf(PriceService.DEFAULT_PRICE));
            nL.add(s);
        }
    }
}

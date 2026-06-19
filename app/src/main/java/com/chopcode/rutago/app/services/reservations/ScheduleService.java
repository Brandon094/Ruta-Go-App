package com.chopcode.rutago.app.services.reservations;

import android.util.Log;

import androidx.annotation.NonNull;

import com.chopcode.rutago.app.config.MyApp;
import com.chopcode.rutago.app.models.Schedule;
import com.chopcode.rutago.app.services.prices.PriceService;
import com.chopcode.rutago.app.utils.ui.FormatUtils;
import com.google.firebase.database.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 🕒 Schedule Service
 * 
 * Gestiona el catálogo maestro de horarios y la disponibilidad global de asientos.
 * Proporciona listeners reactivos para que el Dashboard de horarios se actualice
 * automáticamente ante cualquier cambio en los nodos de Firebase.
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
        void onSeatsUpdated(java.util.Map<String, Integer> availabilities, java.util.Map<String, Integer> totals);
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
                java.util.Map<String, Integer> availMap = new java.util.HashMap<>();
                java.util.Map<String, Integer> totalMap = new java.util.HashMap<>();
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
            @Override public void onCancelled(@NonNull DatabaseError error) { Log.e(TAG, "Error listening global availability: " + error.getMessage()); }
        };
        dispRef.addValueEventListener(listener);
        return listener;
    }

    public void loadSchedules(ScheduleCallback callback) {
        priceService.getAllPrices(new PriceService.AllPricesCallback() {
            @Override
            public void onPricesLoaded(Map<String, Map<String, Double>> allPrices) {
                databaseReference.addValueEventListener(new ValueEventListener() {
                    @Override
                    public void onDataChange(DataSnapshot dataSnapshot) {
                        List<Schedule> natagaList = new ArrayList<>();
                        List<Schedule> laPlataList = new ArrayList<>();

                        for (DataSnapshot snapshot : dataSnapshot.getChildren()) {
                            String time = snapshot.child("hora").getValue(String.class);
                            String routeStr = snapshot.child("ruta").getValue(String.class);
                            String id = snapshot.getKey();

                            Schedule schedule = new Schedule();
                            schedule.setId(id);
                            schedule.setTime(time != null ? time : "--:--");
                            schedule.setRoute(routeStr != null ? routeStr : "Route not available");

                            // Resolver precio dinámico
                            if (routeStr != null) {
                                String origin, destination;
                                if (routeStr.contains("->")) {
                                    String[] parts = routeStr.split("->");
                                    origin = parts[0].trim();
                                    destination = parts[1].trim();
                                } else if (routeStr.contains("→")) {
                                    String[] parts = routeStr.split("→");
                                    origin = parts[0].trim();
                                    destination = parts[1].trim();
                                } else {
                                    origin = "Natagá";
                                    destination = "La Plata";
                                }
                                
                                String normOrigin = FormatUtils.normalizarTexto(origin);
                                String normDest = FormatUtils.normalizarTexto(destination);
                                
                                double price = PriceService.DEFAULT_PRICE;
                                if (allPrices.containsKey(normOrigin) && allPrices.get(normOrigin).containsKey(normDest)) {
                                    price = allPrices.get(normOrigin).get(normDest);
                                }
                                schedule.setPrice(String.valueOf(price));

                                if (normOrigin.contains("nataga")) natagaList.add(schedule);
                                else if (normOrigin.contains("plata")) laPlataList.add(schedule);
                                else natagaList.add(schedule);
                            } else {
                                schedule.setPrice(String.valueOf(PriceService.DEFAULT_PRICE));
                                natagaList.add(schedule);
                            }
                        }
                        callback.onSchedulesLoaded(natagaList, laPlataList);
                    }

                    @Override public void onCancelled(@NonNull DatabaseError databaseError) { callback.onError("Error loading schedules: " + databaseError.getMessage()); }
                });
            }

            @Override public void onError(String error) { /* Seguir sin precios dinámicos */ }
        });
    }
}

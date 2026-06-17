package com.chopcode.rutago.app.services.reservations;

import android.util.Log;

import androidx.annotation.NonNull;

import com.chopcode.rutago.app.config.MyApp;
import com.chopcode.rutago.app.models.Schedule;
import com.google.firebase.database.*;

import java.util.ArrayList;
import java.util.List;

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

    public interface ScheduleCallback {
        void onSchedulesLoaded(List<Schedule> natagaList, List<Schedule> laPlataList);
        void onError(String error);
    }

    public interface GlobalSeatsCallback {
        void onSeatsUpdated(java.util.Map<String, Integer> availabilities, java.util.Map<String, Integer> totals);
    }

    public ScheduleService() {
        this.databaseReference = MyApp.getDatabaseReference("horarios");
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

                    if (routeStr != null) {
                        routeStr = routeStr.trim();
                        if (routeStr.equals("Natagá -> La Plata")) natagaList.add(schedule);
                        else if (routeStr.equals("La Plata -> Natagá")) laPlataList.add(schedule);
                        else natagaList.add(schedule);
                    } else {
                        natagaList.add(schedule);
                    }
                }
                callback.onSchedulesLoaded(natagaList, laPlataList);
            }

            @Override public void onCancelled(@NonNull DatabaseError databaseError) { callback.onError("Error loading schedules: " + databaseError.getMessage()); }
        });
    }
}

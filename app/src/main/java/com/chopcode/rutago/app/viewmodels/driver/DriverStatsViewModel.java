package com.chopcode.rutago.app.viewmodels.driver;

import com.chopcode.rutago.app.models.Reservation;
import com.chopcode.rutago.app.services.reservations.driver.DriverReservationService;
import com.chopcode.rutago.app.viewmodels.BaseViewModel;
import com.chopcode.rutago.app.utils.ui.FormatUtils;

import android.util.Log;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * ViewModel specialized in calculating and managing driver statistics reactively.
 */
public class DriverStatsViewModel extends BaseViewModel {

    private static final String TAG = "DriverStatsVM";

    private int capacityPerRoute = 13;
    private final DriverReservationService driverReservationService;

    // General Statistics
    private final MutableLiveData<Integer> confirmedReservationsLiveData = new MutableLiveData<>(0);
    private final MutableLiveData<Integer> availableSeatsLiveData = new MutableLiveData<>(0);
    private final MutableLiveData<Double> earningsLiveData = new MutableLiveData<>(0.0);

    // Route 1 Statistics
    private final MutableLiveData<String> route1NameLiveData = new MutableLiveData<>("Natagá → La Plata");
    private final MutableLiveData<Integer> route1ReservationsLiveData = new MutableLiveData<>(0);
    private final MutableLiveData<Integer> route1AvailableSeatsLiveData = new MutableLiveData<>(13);

    // Route 2 Statistics
    private final MutableLiveData<String> route2NameLiveData = new MutableLiveData<>("La Plata → Natagá");
    private final MutableLiveData<Integer> route2ReservationsLiveData = new MutableLiveData<>(0);
    private final MutableLiveData<Integer> route2AvailableSeatsLiveData = new MutableLiveData<>(13);

    private String currentDriverId;
    private List<String> assignedSchedules;
    private ValueEventListener statsListener;

    public DriverStatsViewModel() {
        this.driverReservationService = new DriverReservationService();
    }

    public void setConductorActual(String driverId) {
        if (driverId != null && !driverId.equals(this.currentDriverId)) {
            this.currentDriverId = driverId;
            startRealTimeStats();
        }
    }

    public void setHorariosAsignados(List<String> schedules) {
        this.assignedSchedules = schedules;
        startRealTimeStats();
    }

    public void setCapacidadVehiculo(int capacity) {
        if (capacity > 0) {
            this.capacityPerRoute = capacity;
            refreshStatistics();
        }
    }

    public LiveData<Integer> getReservasConfirmadasLiveData() { return confirmedReservationsLiveData; }
    public LiveData<Integer> getAsientosDisponiblesLiveData() { return availableSeatsLiveData; }
    public LiveData<Double> getIngresosLiveData() { return earningsLiveData; }
    public LiveData<String> getNombreRuta1LiveData() { return route1NameLiveData; }
    public LiveData<Integer> getReservasRuta1LiveData() { return route1ReservationsLiveData; }
    public LiveData<Integer> getAsientosRuta1LiveData() { return route1AvailableSeatsLiveData; }
    public LiveData<String> getNombreRuta2LiveData() { return route2NameLiveData; }
    public LiveData<Integer> getReservasRuta2LiveData() { return route2ReservationsLiveData; }
    public LiveData<Integer> getAsientosRuta2LiveData() { return route2AvailableSeatsLiveData; }

    private void startRealTimeStats() {
        if (currentDriverId == null || currentDriverId.isEmpty()) return;
        
        stopRealTimeStats();
        
        Log.d(TAG, "Starting real-time stats for: " + currentDriverId);
        statsListener = driverReservationService.escucharEstadisticasCompletas(currentDriverId, assignedSchedules,
                new DriverReservationService.RealTimeStatsListener() {
                    @Override
                    public void onStatsUpdated(DriverReservationService.CompleteDriverStats stats) {
                        processStatsUpdate(stats);
                    }

                    @Override
                    public void onError(String error) {
                        setError(error);
                    }
                });
    }

    private void stopRealTimeStats() {
        if (statsListener != null) {
            com.chopcode.rutago.app.config.MyApp.getDatabaseReference("reservas").removeEventListener(statsListener);
            statsListener = null;
        }
    }

    private void processStatsUpdate(DriverReservationService.CompleteDriverStats stats) {
        // En esta etapa del proyecto, las estadísticas son "históricas" (sin filtro de fecha)
        // según lo solicitado anteriormente para pruebas.
        
        confirmedReservationsLiveData.postValue(stats.confirmedReservations);
        earningsLiveData.postValue(stats.totalEarnings);

        int numRoutes = (assignedSchedules != null && !assignedSchedules.isEmpty()) ? assignedSchedules.size() : 2;
        int totalOccupied = stats.confirmedReservations + stats.pendingReservations;
        availableSeatsLiveData.postValue(Math.max(0, numRoutes * capacityPerRoute - totalOccupied));

        processReservationsForDetailedStats(stats.confirmedReservationsList, stats.pendingReservationsList);
    }

    public void calculateRouteStatistics() {
        // En modo reactivo, esto ya se maneja por el listener.
        // Pero si es llamado explícitamente, refrescamos.
        refreshStatistics();
    }

    private void processReservationsForDetailedStats(List<Reservation> confirmed, List<Reservation> pending) {
        Map<String, Integer> resMap = new HashMap<>();
        Map<String, Integer> occMap = new HashMap<>();
        Map<String, String> names = new HashMap<>();
        
        for (Reservation r : confirmed) {
            String origin = r.getOrigin();
            String dest = r.getDestination();
            if (origin == null || origin.isEmpty()) origin = "N/A";
            if (dest == null || dest.isEmpty()) dest = "N/A";
            
            String key = FormatUtils.normalizarTexto(origin) + "|" + FormatUtils.normalizarTexto(dest);
            names.put(key, origin + " → " + dest);
            resMap.put(key, resMap.getOrDefault(key, 0) + 1);
            occMap.put(key, occMap.getOrDefault(key, 0) + 1);
        }
        
        for (Reservation r : pending) {
            String origin = r.getOrigin();
            String dest = r.getDestination();
            if (origin == null || origin.isEmpty()) origin = "N/A";
            if (dest == null || dest.isEmpty()) dest = "N/A";
            
            String key = FormatUtils.normalizarTexto(origin) + "|" + FormatUtils.normalizarTexto(dest);
            names.put(key, origin + " → " + dest);
            occMap.put(key, occMap.getOrDefault(key, 0) + 1);
        }
        
        updateRouteDetails(resMap, occMap, names);
    }

    private void updateRouteDetails(Map<String, Integer> resMap, Map<String, Integer> occMap, Map<String, String> names) {
        boolean f1 = false, f2 = false;
        
        for (String key : names.keySet()) {
            int res = resMap.getOrDefault(key, 0);
            int occ = occMap.getOrDefault(key, 0);
            int ava = Math.max(0, capacityPerRoute - occ);
            String name = names.get(key);
            
            if (key.startsWith("nataga") && key.contains("la plata")) {
                if (key.indexOf("nataga") < key.indexOf("la plata")) {
                    route1NameLiveData.postValue(name); route1ReservationsLiveData.postValue(res); route1AvailableSeatsLiveData.postValue(ava); f1 = true;
                } else {
                    route2NameLiveData.postValue(name); route2ReservationsLiveData.postValue(res); route2AvailableSeatsLiveData.postValue(ava); f2 = true;
                }
            }
        }
        
        if (!f1) { route1NameLiveData.postValue("Natagá → La Plata"); route1ReservationsLiveData.postValue(0); route1AvailableSeatsLiveData.postValue(capacityPerRoute); }
        if (!f2) { route2NameLiveData.postValue("La Plata → Natagá"); route2ReservationsLiveData.postValue(0); route2AvailableSeatsLiveData.postValue(capacityPerRoute); }
    }

    public void refreshStatistics() { 
        if (currentDriverId != null) startRealTimeStats(); 
    }

    @Override
    protected void onCleared() {
        super.onCleared();
        stopRealTimeStats();
    }
}

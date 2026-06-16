package com.chopcode.rutago.app.viewmodels.driver;

import com.chopcode.rutago.app.models.Reservation;
import com.chopcode.rutago.app.services.reservations.driver.DriverReservationService;
import com.chopcode.rutago.app.viewmodels.BaseViewModel;
import com.chopcode.rutago.app.utils.ui.FormatUtils;

import android.util.Log;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Locale;

/**
 * ViewModel specialized in calculating and managing driver statistics.
 */
public class DriverStatsViewModel extends BaseViewModel {

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

    public DriverStatsViewModel() {
        this.driverReservationService = new DriverReservationService();
    }

    public void setConductorActual(String driverId) {
        if (driverId != null && !driverId.equals(this.currentDriverId)) {
            this.currentDriverId = driverId;
            calculateRouteStatistics();
        }
    }

    public void setHorariosAsignados(List<String> schedules) {
        this.assignedSchedules = schedules;
        calculateRouteStatistics();
    }

    public void setCapacidadVehiculo(int capacity) {
        if (capacity > 0) {
            this.capacityPerRoute = capacity;
            calculateRouteStatistics();
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

    public void calculateRouteStatistics() {
        if (currentDriverId != null && !currentDriverId.isEmpty()) {
            loadDriverStatisticsFromFirebase();
        }
    }

    private void loadDriverStatisticsFromFirebase() {
        setLoading(true);
        driverReservationService.obtenerEstadisticasCompletas(currentDriverId, assignedSchedules,
                new DriverReservationService.CompleteStatsCallback() {
                    @Override
                    public void onCompleteStatsLoaded(DriverReservationService.CompleteDriverStats stats) {
                        List<Reservation> todayConfirmed = filterTodayReservations(stats.confirmedReservationsList);
                        List<Reservation> todayPending = filterTodayReservations(stats.pendingReservationsList);

                        int confirmedCount = todayConfirmed.size();
                        confirmedReservationsLiveData.postValue(confirmedCount);
                        earningsLiveData.postValue(calculateTodayEarnings(todayConfirmed));

                        int numRoutes = (assignedSchedules != null && !assignedSchedules.isEmpty()) ? assignedSchedules.size() : 2;
                        availableSeatsLiveData.postValue(Math.max(0, numRoutes * capacityPerRoute - (confirmedCount + todayPending.size())));

                        processReservationsForDetailedStatsOptimized(todayConfirmed, todayPending);
                        setLoading(false);
                    }
                    @Override public void onError(String error) { setError(error); setLoading(false); setDefaultRouteValues(); }
                });
    }

    private List<Reservation> filterTodayReservations(List<Reservation> reservations) {
        if (reservations == null) return new ArrayList<>();
        return new ArrayList<>(reservations);
    }

    private double calculateTodayEarnings(List<Reservation> confirmed) {
        double total = 0.0;
        for (Reservation r : confirmed) total += r.getPrice();
        return total;
    }

    private void processReservationsForDetailedStatsOptimized(List<Reservation> confirmed, List<Reservation> pending) {
        Log.d("DriverStatsVM", "Processing stats. Confirmed: " + confirmed.size() + ", Pending: " + pending.size());
        Map<String, Integer> resMap = new HashMap<>();
        Map<String, Integer> occMap = new HashMap<>();
        Map<String, String> names = new HashMap<>();
        
        for (Reservation r : confirmed) {
            String origin = r.getOrigin();
            String dest = r.getDestination();
            Log.d("DriverStatsVM", "Processing Confirmed: ID=" + r.getIdReservation() + ", Origin=" + origin + ", Dest=" + dest + ", Price=" + r.getPrice());
            
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
            Log.d("DriverStatsVM", "Processing Pending: ID=" + r.getIdReservation() + ", Origin=" + origin + ", Dest=" + dest);
            
            if (origin == null || origin.isEmpty()) origin = "N/A";
            if (dest == null || dest.isEmpty()) dest = "N/A";

            String key = FormatUtils.normalizarTexto(origin) + "|" + FormatUtils.normalizarTexto(dest);
            names.put(key, origin + " → " + dest);
            occMap.put(key, occMap.getOrDefault(key, 0) + 1);
        }
        
        processRouteStatistics(resMap, occMap, names);
    }

    private void processRouteStatistics(Map<String, Integer> resMap, Map<String, Integer> occMap, Map<String, String> names) {
        Log.d("DriverStatsVM", "Grouping stats for " + names.size() + " routes");
        boolean f1 = false, f2 = false;
        
        for (String key : names.keySet()) {
            int res = resMap.getOrDefault(key, 0);
            int occ = occMap.getOrDefault(key, 0);
            int ava = Math.max(0, capacityPerRoute - occ);
            String name = names.get(key);
            
            Log.d("DriverStatsVM", "Checking route key: [" + key + "] Name: " + name + " (Confirmed: " + res + ", Occupied: " + occ + ")");
            
            String k = key.toLowerCase();
            if (k.contains("natag") && k.contains("la plata")) {
                if (k.indexOf("natag") < k.indexOf("la plata")) {
                    Log.d("DriverStatsVM", "Found Route 1 Match");
                    route1NameLiveData.postValue(name); route1ReservationsLiveData.postValue(res); route1AvailableSeatsLiveData.postValue(ava); f1 = true;
                } else {
                    Log.d("DriverStatsVM", "Found Route 2 Match");
                    route2NameLiveData.postValue(name); route2ReservationsLiveData.postValue(res); route2AvailableSeatsLiveData.postValue(ava); f2 = true;
                }
            }
        }
        
        if (!f1) { Log.d("DriverStatsVM", "Route 1 defaults"); route1NameLiveData.postValue("Natagá → La Plata"); route1ReservationsLiveData.postValue(0); route1AvailableSeatsLiveData.postValue(capacityPerRoute); }
        if (!f2) { Log.d("DriverStatsVM", "Route 2 defaults"); route2NameLiveData.postValue("La Plata → Natagá"); route2ReservationsLiveData.postValue(0); route2AvailableSeatsLiveData.postValue(capacityPerRoute); }
    }

    private void setDefaultRouteValues() {
        route1NameLiveData.postValue("Natagá → La Plata"); route1ReservationsLiveData.postValue(0); route1AvailableSeatsLiveData.postValue(capacityPerRoute);
        route2NameLiveData.postValue("La Plata → Natagá"); route2ReservationsLiveData.postValue(0); route2AvailableSeatsLiveData.postValue(capacityPerRoute);
    }

    public void refreshStatistics() { if (currentDriverId != null && !currentDriverId.isEmpty()) loadDriverStatisticsFromFirebase(); }
}

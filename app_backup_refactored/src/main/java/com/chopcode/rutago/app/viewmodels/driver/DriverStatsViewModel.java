package com.chopcode.rutago.app.viewmodels.driver;

import com.chopcode.rutago.app.models.Reservation;
import com.chopcode.rutago.app.services.reservations.driver.DriverReservationService;
import com.chopcode.rutago.app.viewmodels.BaseViewModel;

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
    private final MutableLiveData<Integer> confirmedReservationsLiveData = new MutableLiveData<>();
    private final MutableLiveData<Integer> availableSeatsLiveData = new MutableLiveData<>();
    private final MutableLiveData<Double> earningsLiveData = new MutableLiveData<>();

    // Route 1 Statistics
    private final MutableLiveData<String> route1NameLiveData = new MutableLiveData<>();
    private final MutableLiveData<Integer> route1ReservationsLiveData = new MutableLiveData<>();
    private final MutableLiveData<Integer> route1AvailableSeatsLiveData = new MutableLiveData<>();

    // Route 2 Statistics
    private final MutableLiveData<String> route2NameLiveData = new MutableLiveData<>();
    private final MutableLiveData<Integer> route2ReservationsLiveData = new MutableLiveData<>();
    private final MutableLiveData<Integer> route2AvailableSeatsLiveData = new MutableLiveData<>();

    private String currentDriverId;
    private List<String> assignedSchedules;

    public DriverStatsViewModel() {
        this.driverReservationService = new DriverReservationService();
        confirmedReservationsLiveData.setValue(0);
        availableSeatsLiveData.setValue(0);
        earningsLiveData.setValue(0.0);
        route1ReservationsLiveData.setValue(0);
        route1AvailableSeatsLiveData.setValue(0);
        route2ReservationsLiveData.setValue(0);
        route2AvailableSeatsLiveData.setValue(0);
        route1NameLiveData.setValue("Nataga → La Plata");
        route2NameLiveData.setValue("La Plata → Nataga");
    }

    public void setConductorActual(String driverId) { this.currentDriverId = driverId; }
    public void setHorariosAsignados(List<String> schedules) { this.assignedSchedules = schedules; }
    public void setCapacidadVehiculo(int capacity) {
        if (capacity > 0) {
            this.capacityPerRoute = capacity;
            if (currentDriverId != null && !currentDriverId.isEmpty()) calculateRouteStatistics();
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
        if (currentDriverId != null && !currentDriverId.isEmpty()) loadDriverStatisticsFromFirebase();
        else setDefaultRouteValues();
    }

    private void loadDriverStatisticsFromFirebase() {
        setLoading(true);
        driverReservationService.obtenerEstadisticasCompletas(currentDriverId, assignedSchedules,
                new DriverReservationService.CompleteStatsCallback() {
                    @Override
                    public void onCompleteStatsLoaded(DriverReservationService.CompleteDriverStats stats) {
                        List<Reservation> todayConfirmed = filterTodayReservations(stats.confirmedReservationsList);
                        List<Reservation> todayPending = filterTodayReservations(stats.pendingReservationsList);
                        int count = todayConfirmed.size();
                        confirmedReservationsLiveData.postValue(count);
                        earningsLiveData.postValue(calculateTodayEarnings(todayConfirmed));
                        int numRoutes = (assignedSchedules != null && !assignedSchedules.isEmpty()) ? assignedSchedules.size() : 2;
                        availableSeatsLiveData.postValue(Math.max(0, numRoutes * capacityPerRoute - (count + todayPending.size())));
                        processReservationsForDetailedStatsOptimized(todayConfirmed, todayPending);
                        setLoading(false);
                    }
                    @Override public void onError(String error) { setError(error); setLoading(false); setDefaultRouteValues(); }
                });
    }

    private List<Reservation> filterTodayReservations(List<Reservation> reservations) {
        if (reservations == null) return new ArrayList<>();
        List<Reservation> filtered = new ArrayList<>();
        long start = getMidnightTimestamp();
        long end = start + (24 * 60 * 60 * 1000);
        for (Reservation r : reservations) if (r.getReservationDate() >= start && r.getReservationDate() < end) filtered.add(r);
        return filtered;
    }

    private double calculateTodayEarnings(List<Reservation> confirmed) {
        double total = 0.0;
        for (Reservation r : confirmed) total += r.getPrice();
        return total;
    }

    private long getMidnightTimestamp() {
        java.util.Calendar cal = java.util.Calendar.getInstance();
        cal.set(java.util.Calendar.HOUR_OF_DAY, 0);
        cal.set(java.util.Calendar.MINUTE, 0);
        cal.set(java.util.Calendar.SECOND, 0);
        cal.set(java.util.Calendar.MILLISECOND, 0);
        return cal.getTimeInMillis();
    }

    private void processReservationsForDetailedStatsOptimized(List<Reservation> confirmed, List<Reservation> pending) {
        Map<String, Integer> resMap = new HashMap<>();
        Map<String, Integer> occMap = new HashMap<>();
        Map<String, String> names = new HashMap<>();
        for (Reservation r : confirmed) {
            String origin = r.getOrigin() != null ? r.getOrigin() : "N/A", dest = r.getDestination() != null ? r.getDestination() : "N/A", key = origin + "|" + dest;
            names.put(key, origin + " → " + dest);
            resMap.put(key, resMap.getOrDefault(key, 0) + 1);
            occMap.put(key, occMap.getOrDefault(key, 0) + 1);
        }
        for (Reservation r : pending) {
            String origin = r.getOrigin() != null ? r.getOrigin() : "N/A", dest = r.getDestination() != null ? r.getDestination() : "N/A", key = origin + "|" + dest;
            names.put(key, origin + " → " + dest);
            occMap.put(key, occMap.getOrDefault(key, 0) + 1);
        }
        processRouteStatistics(resMap, occMap, names);
    }

    private void processRouteStatistics(Map<String, Integer> resMap, Map<String, Integer> occMap, Map<String, String> names) {
        boolean f1 = false, f2 = false;
        for (Map.Entry<String, Integer> entry : resMap.entrySet()) {
            String key = entry.getKey();
            int res = entry.getValue(), occ = occMap.getOrDefault(key, 0), ava = Math.max(0, capacityPerRoute - occ);
            String name = names.get(key);
            if (name == null) continue;
            if (name.contains("Nataga") && name.contains("La Plata") && name.indexOf("Nataga") < name.indexOf("La Plata")) {
                route1NameLiveData.postValue(name); route1ReservationsLiveData.postValue(res); route1AvailableSeatsLiveData.postValue(ava); f1 = true;
            } else if (name.contains("La Plata") && name.contains("Nataga") && name.indexOf("La Plata") < name.indexOf("Nataga")) {
                route2NameLiveData.postValue(name); route2ReservationsLiveData.postValue(res); route2AvailableSeatsLiveData.postValue(ava); f2 = true;
            }
        }
        if (!f1) { route1NameLiveData.postValue("Nataga → La Plata"); route1ReservationsLiveData.postValue(0); route1AvailableSeatsLiveData.postValue(capacityPerRoute); }
        if (!f2) { route2NameLiveData.postValue("La Plata → Nataga"); route2ReservationsLiveData.postValue(0); route2AvailableSeatsLiveData.postValue(capacityPerRoute); }
    }

    private void setDefaultRouteValues() {
        route1NameLiveData.postValue("N/A → N/A"); route1ReservationsLiveData.postValue(0); route1AvailableSeatsLiveData.postValue(capacityPerRoute);
        route2NameLiveData.postValue("N/A → N/A"); route2ReservationsLiveData.postValue(0); route2AvailableSeatsLiveData.postValue(capacityPerRoute);
    }

    public void refreshStatistics() { if (currentDriverId != null && !currentDriverId.isEmpty()) loadDriverStatisticsFromFirebase(); }
}

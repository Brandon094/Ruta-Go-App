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
 * 📊 Driver Stats ViewModel
 * 
 * Este ViewModel se encarga de la lógica reactiva del Dashboard del conductor.
 * Su propósito principal es calcular ingresos, asientos libres y reservas 
 * de forma dinámica basándose en los cambios de Firebase en tiempo real.
 */
public class DriverStatsViewModel extends BaseViewModel {

    private static final String TAG = "DriverStatsVM";

    private int capacityPerRoute = 13;
    private final DriverReservationService driverReservationService;

    // --- Estadísticas Generales (Dashboard Superior) ---
    private final MutableLiveData<Integer> confirmedReservationsLiveData = new MutableLiveData<>(0);
    private final MutableLiveData<Integer> availableSeatsLiveData = new MutableLiveData<>(0);
    private final MutableLiveData<Double> earningsLiveData = new MutableLiveData<>(0.0);

    // --- Estadísticas Ruta 1 (Natagá → La Plata) ---
    private final MutableLiveData<String> route1NameLiveData = new MutableLiveData<>("Natagá → La Plata");
    private final MutableLiveData<Integer> route1ReservationsLiveData = new MutableLiveData<>(0);
    private final MutableLiveData<Integer> route1AvailableSeatsLiveData = new MutableLiveData<>(13);

    // --- Estadísticas Ruta 2 (La Plata → Natagá) ---
    private final MutableLiveData<String> route2NameLiveData = new MutableLiveData<>("La Plata → Natagá");
    private final MutableLiveData<Integer> route2ReservationsLiveData = new MutableLiveData<>(0);
    private final MutableLiveData<Integer> route2AvailableSeatsLiveData = new MutableLiveData<>(13);

    private String currentDriverId;
    private List<String> assignedSchedules;
    private List<com.chopcode.rutago.app.models.Route> activeRoutes = new ArrayList<>();
    private ValueEventListener statsListener;

    public DriverStatsViewModel() {
        this.driverReservationService = new DriverReservationService();
    }

    /**
     * Establece las rutas activas para resolver datos faltantes en las reservas.
     */
    public void setRutasActivas(List<com.chopcode.rutago.app.models.Route> routes) {
        if (routes != null) {
            this.activeRoutes = routes;
            refreshStatistics();
        }
    }

    /**
     * Establece el ID del conductor y arranca la escucha en tiempo real.
     */
    public void setConductorActual(String driverId) {
        if (driverId != null && !driverId.equals(this.currentDriverId)) {
            this.currentDriverId = driverId;
            startRealTimeStats();
        }
    }

    /**
     * Vincula los horarios asignados para filtrar estadísticas específicas.
     */
    public void setHorariosAsignados(List<String> schedules) {
        this.assignedSchedules = schedules;
        startRealTimeStats();
    }

    /**
     * Actualiza la capacidad del cálculo dinámico según el vehículo cargado.
     */
    public void setCapacidadVehiculo(int capacity) {
        if (capacity > 0) {
            this.capacityPerRoute = capacity;
            refreshStatistics();
        }
    }

    // Getters para LiveData
    public LiveData<Integer> getReservasConfirmadasLiveData() { return confirmedReservationsLiveData; }
    public LiveData<Integer> getAsientosDisponiblesLiveData() { return availableSeatsLiveData; }
    public LiveData<Double> getIngresosLiveData() { return earningsLiveData; }
    public LiveData<String> getNombreRuta1LiveData() { return route1NameLiveData; }
    public LiveData<Integer> getReservasRuta1LiveData() { return route1ReservationsLiveData; }
    public LiveData<Integer> getAsientosRuta1LiveData() { return route1AvailableSeatsLiveData; }
    public LiveData<String> getNombreRuta2LiveData() { return route2NameLiveData; }
    public LiveData<Integer> getReservasRuta2LiveData() { return route2ReservationsLiveData; }
    public LiveData<Integer> getAsientosRuta2LiveData() { return route2AvailableSeatsLiveData; }

    /**
     * Inicia el listener de Firebase para que las estadísticas salten al instante.
     */
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

    /**
     * Remueve el listener de Firebase para liberar recursos.
     */
    private void stopRealTimeStats() {
        if (statsListener != null) {
            com.chopcode.rutago.app.config.MyApp.getDatabaseReference("reservas").removeEventListener(statsListener);
            statsListener = null;
        }
    }

    /**
     * Procesa los datos crudos de Firebase y los convierte en LiveData para la UI.
     */
    private void processStatsUpdate(DriverReservationService.CompleteDriverStats stats) {
        // En esta etapa del proyecto, las estadísticas son históricas (según solicitud)
        confirmedReservationsLiveData.postValue(stats.confirmedReservations);
        earningsLiveData.postValue(stats.totalEarnings);

        // Cálculo dinámico de asientos disponibles globales
        int numRoutes = (assignedSchedules != null && !assignedSchedules.isEmpty()) ? assignedSchedules.size() : 2;
        int totalOccupied = stats.confirmedReservations + stats.pendingReservations;
        availableSeatsLiveData.postValue(Math.max(0, numRoutes * capacityPerRoute - totalOccupied));

        // Procesar desglose individual por ruta
        processReservationsForDetailedStats(stats.confirmedReservationsList, stats.pendingReservationsList);
    }

    public void calculateRouteStatistics() {
        refreshStatistics();
    }

    /**
     * Agrupa las reservas por origen/destino usando normalización de texto (quitar tildes).
     */
    private void processReservationsForDetailedStats(List<Reservation> confirmed, List<Reservation> pending) {
        Map<String, Integer> resMap = new HashMap<>(); // Conteo de reservas
        Map<String, Integer> occMap = new HashMap<>(); // Conteo de ocupación total
        Map<String, String> names = new HashMap<>();  // Nombres descriptivos
        
        List<Reservation> allToProcess = new ArrayList<>(confirmed);
        allToProcess.addAll(pending);

        for (Reservation r : allToProcess) {
            String origin = r.getOrigin();
            String dest = r.getDestination();
            
            // 🔥 FIX: Si faltan datos, intentar resolver desde la lista de rutas usando scheduleId
            if ((origin == null || origin.isEmpty() || origin.equalsIgnoreCase("N/A")) && r.getScheduleId() != null) {
                for (com.chopcode.rutago.app.models.Route route : activeRoutes) {
                    if (r.getScheduleId().equals(route.getScheduleId())) {
                        origin = route.getOrigin();
                        dest = route.getDestination();
                        break;
                    }
                }
            }

            if (origin == null || origin.isEmpty()) origin = "N/A";
            if (dest == null || dest.isEmpty()) dest = "N/A";
            
            String key = FormatUtils.normalizarTexto(origin) + "|" + FormatUtils.normalizarTexto(dest);
            names.put(key, origin + " → " + dest);
            
            if (confirmed.contains(r)) {
                resMap.put(key, resMap.getOrDefault(key, 0) + 1);
            }
            occMap.put(key, occMap.getOrDefault(key, 0) + 1);
        }
        
        updateRouteDetails(resMap, occMap, names);
    }

    /**
     * Determina qué ruta es la 1 (Ida) y cuál es la 2 (Regreso) basándose en el nombre normalizado.
     */
    private void updateRouteDetails(Map<String, Integer> resMap, Map<String, Integer> occMap, Map<String, String> names) {
        boolean f1 = false, f2 = false;
        
        for (String key : names.keySet()) {
            int res = resMap.getOrDefault(key, 0);
            int occ = occMap.getOrDefault(key, 0);
            int ava = Math.max(0, capacityPerRoute - occ);
            String name = names.get(key);
            
            String normKey = FormatUtils.normalizarTexto(key);
            
            // Lógica de detección bidireccional mejorada
            if (normKey.contains("nataga") && normKey.contains("la plata")) {
                if (normKey.indexOf("nataga") < normKey.indexOf("la plata")) {
                    // Natagá -> La Plata (Ruta 1)
                    route1NameLiveData.postValue(name);
                    route1ReservationsLiveData.postValue(res);
                    route1AvailableSeatsLiveData.postValue(ava);
                    f1 = true;
                } else {
                    // La Plata -> Natagá (Ruta 2)
                    route2NameLiveData.postValue(name);
                    route2ReservationsLiveData.postValue(res);
                    route2AvailableSeatsLiveData.postValue(ava);
                    f2 = true;
                }
            }
        }
        
        // Valores por defecto si no hay datos detectados
        if (!f1) { 
            route1NameLiveData.postValue("Natagá → La Plata"); 
            route1ReservationsLiveData.postValue(0); 
            route1AvailableSeatsLiveData.postValue(capacityPerRoute); 
        }
        if (!f2) { 
            route2NameLiveData.postValue("La Plata → Natagá"); 
            route2ReservationsLiveData.postValue(0); 
            route2AvailableSeatsLiveData.postValue(capacityPerRoute); 
        }
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

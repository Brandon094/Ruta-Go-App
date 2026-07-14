package com.chopcode.rutago.app.viewmodels.driver;

import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.services.reservations.driver.DriverReservationService;
import com.chopcode.rutago.app.viewmodels.BaseViewModel;

import android.util.Log;
import androidx.annotation.NonNull;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Driver Stats ViewModel
 *
 * Motor analítico reactivo para el Dashboard del conductor.
 * Responsabilidades:
 * - Realizar agregaciones en tiempo real de ingresos diarios y ocupación de flota.
 * - Cruzar datos de reservas activas con el nodo de disponibilidad para detectar ventas físicas.
 * - Calcular métricas de rendimiento específicas para cada turno en la agenda.
 * - Gestionar suscripciones concurrentes a múltiples nodos NoSQL (Reservas + Disponibilidad).
 */
public class DriverStatsViewModel extends BaseViewModel {

    private static final String TAG = "DriverStatsVM";

    private int capacityPerRoute = 13;
    private final DriverReservationService driverReservationService;

    // --- Métricas Globales del Dashboard ---
    private final MutableLiveData<Integer> confirmedReservationsLiveData = new MutableLiveData<>(0);
    private final MutableLiveData<Integer> availableSeatsLiveData = new MutableLiveData<>(0);
    private final MutableLiveData<Double> earningsLiveData = new MutableLiveData<>(0.0);

    /** Lista procesada de estadísticas detalladas por cada despacho. */
    private final MutableLiveData<List<com.chopcode.rutago.app.models.RouteStat>> routeStatsLiveData = new MutableLiveData<>(new ArrayList<>());

    private String currentDriverId;
    private List<String> assignedSchedules;
    private List<com.chopcode.rutago.app.models.Route> activeRoutes = new ArrayList<>();
    private ValueEventListener statsListener;
    private ValueEventListener availabilityListener;
    
    /** Cache local de disponibilidad para cálculos transversales. */
    private final Map<String, Integer> scheduleAvailabilityMap = new HashMap<>();
    private final Map<String, Integer> scheduleTotalMap = new HashMap<>();

    public DriverStatsViewModel() {
        this.driverReservationService = new DriverReservationService();
    }

    /**
     * Vincula las rutas resueltas para asociar nombres y horarios a las métricas frías.
     */
    public void setRutasActivas(List<com.chopcode.rutago.app.models.Route> routes) {
        if (routes != null) {
            this.activeRoutes = routes;
            refreshStatistics();
        }
    }

    /**
     * Identifica al conductor y activa los túneles de escucha en tiempo real.
     */
    public void setConductorActual(String driverId) {
        if (driverId != null && !driverId.equals(this.currentDriverId)) {
            this.currentDriverId = driverId;
            startRealTimeStats();
        }
    }

    /**
     * Establece los horarios que deben ser monitoreados para este ciclo.
     */
    public void setHorariosAsignados(List<String> schedules) {
        this.assignedSchedules = schedules;
        startRealTimeStats();
    }

    /**
     * Ajusta la base de cálculo si la capacidad del bus cambia (ej: cambio de vehículo).
     */
    public void setCapacidadVehiculo(int capacity) {
        if (capacity > 0) {
            this.capacityPerRoute = capacity;
            refreshStatistics();
        }
    }

    public LiveData<Integer> getReservasConfirmadasLiveData() { return confirmedReservationsLiveData; }
    public LiveData<Integer> getAsientosDisponiblesLiveData() { return availableSeatsLiveData; }
    public LiveData<Double> getIngresosLiveData() { return earningsLiveData; }
    public LiveData<List<com.chopcode.rutago.app.models.RouteStat>> getRouteStatsLiveData() { return routeStatsLiveData; }

    /**
     * Configura los listeners de Firebase. Implementa limpieza previa para evitar duplicidad.
     */
    private void startRealTimeStats() {
        if (currentDriverId == null || currentDriverId.isEmpty()) return;
        
        stopRealTimeStats();
        
        Log.d(TAG, "📡 Iniciando monitoreo analítico para: " + currentDriverId);
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

        // Suscripción al nodo de disponibilidad para detectar bloqueos manuales
        startAvailabilityListener();
    }

    /**
     * Escucha cambios en el inventario de asientos (Ventas Físicas + App).
     */
    private void startAvailabilityListener() {
        if (assignedSchedules == null || assignedSchedules.isEmpty()) return;
        
        DatabaseReference dispRef = com.chopcode.rutago.app.config.MyApp.getDatabaseReference("disponibilidadAsientos");
        availabilityListener = new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull com.google.firebase.database.DataSnapshot snapshot) {
                for (String sid : assignedSchedules) {
                    com.google.firebase.database.DataSnapshot s = snapshot.child(sid);
                    if (s.exists()) {
                        Integer avail = s.child("asientosDisponibles").getValue(Integer.class);
                        Integer total = s.child("totalAsientos").getValue(Integer.class);
                        if (avail != null) scheduleAvailabilityMap.put(sid, avail);
                        if (total != null) scheduleTotalMap.put(sid, total);
                    }
                }
                calculateRouteStatistics();
            }

            @Override public void onCancelled(@NonNull com.google.firebase.database.DatabaseError error) {}
        };
        dispRef.addValueEventListener(availabilityListener);
    }

    private void stopRealTimeStats() {
        if (statsListener != null) {
            com.chopcode.rutago.app.config.MyApp.getDatabaseReference("reservas").removeEventListener(statsListener);
            statsListener = null;
        }
        if (availabilityListener != null) {
            com.chopcode.rutago.app.config.MyApp.getDatabaseReference("disponibilidadAsientos").removeEventListener(availabilityListener);
            availabilityListener = null;
        }
    }

    /**
     * Transforma los datos crudos en métricas visuales.
     */
    private void processStatsUpdate(DriverReservationService.CompleteDriverStats stats) {
        confirmedReservationsLiveData.postValue(stats.confirmedReservations);
        earningsLiveData.postValue(stats.totalEarnings);

        // Algoritmo de cálculo de puestos libres totales en la agenda del día
        int numRoutes = (assignedSchedules != null && !assignedSchedules.isEmpty()) ? assignedSchedules.size() : 2;
        int totalOccupied = stats.confirmedReservations + stats.pendingReservations;
        availableSeatsLiveData.postValue(Math.max(0, numRoutes * capacityPerRoute - totalOccupied));

        calculateRouteStatistics();
    }

    /**
     * Genera la lista de RouteStat cruzando la disponibilidad real de cada despacho.
     */
    public void calculateRouteStatistics() {
        if (activeRoutes == null || activeRoutes.isEmpty()) return;
        
        List<com.chopcode.rutago.app.models.RouteStat> newStats = new ArrayList<>();
        int[] brandColors = {R.color.primary_500, R.color.secondary_400, R.color.secondary_300};
        int colorIndex = 0;

        for (com.chopcode.rutago.app.models.Route route : activeRoutes) {
            String sid = route.getScheduleId();
            if (sid == null) continue;

            // Ocupación Real: total - disponibles (Captura tanto ventas digitales como físicas)
            Integer totalObj = scheduleTotalMap.get(sid);
            int total = (totalObj != null) ? totalObj : capacityPerRoute;
            
            Integer availObj = scheduleAvailabilityMap.get(sid);
            int available = (availObj != null) ? availObj : total;
            
            int realOccupied = Math.max(0, total - available);
            
            String time = (route.getTime() != null) ? route.getTime().getTime() : "--:--";
            String displayName = route.getOrigin() + " → " + route.getDestination() + " (" + time + ")";
            
            int color = brandColors[colorIndex % brandColors.length];
            newStats.add(new com.chopcode.rutago.app.models.RouteStat(displayName, realOccupied, available, color));
            colorIndex++;
        }
        
        routeStatsLiveData.postValue(newStats);
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

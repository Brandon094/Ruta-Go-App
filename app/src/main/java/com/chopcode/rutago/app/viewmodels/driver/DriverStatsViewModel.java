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

    // --- Desglose Dinámico por Ruta ---
    private final MutableLiveData<List<com.chopcode.rutago.app.models.RouteStat>> routeStatsLiveData = new MutableLiveData<>(new ArrayList<>());

    private String currentDriverId;
    private List<String> assignedSchedules;
    private List<com.chopcode.rutago.app.models.Route> activeRoutes = new ArrayList<>();
    private ValueEventListener statsListener;
    private ValueEventListener availabilityListener;
    private final Map<String, Integer> scheduleAvailabilityMap = new HashMap<>();
    private final Map<String, Integer> scheduleTotalMap = new HashMap<>();

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
    public LiveData<List<com.chopcode.rutago.app.models.RouteStat>> getRouteStatsLiveData() { return routeStatsLiveData; }

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

        // 🔥 NUEVO: Escuchar disponibilidad real de asientos (incluye ventas físicas)
        startAvailabilityListener();
    }

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
                // Forzar refresco del desglose con los nuevos datos de disponibilidad
                calculateRouteStatistics();
            }

            @Override public void onCancelled(@NonNull com.google.firebase.database.DatabaseError error) {}
        };
        dispRef.addValueEventListener(availabilityListener);
    }

    /**
     * Remueve el listener de Firebase para liberar recursos.
     */
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

        // 🔥 Disparar actualización del desglose detallado
        calculateRouteStatistics();
    }

    /**
     * 🔥 Genera dinámicamente la lista de estadísticas por ruta.
     * Mantiene el orden de activeRoutes y cruza datos de reservas con disponibilidad real.
     */
    public void calculateRouteStatistics() {
        if (activeRoutes == null || activeRoutes.isEmpty()) return;
        
        List<com.chopcode.rutago.app.models.RouteStat> newStats = new ArrayList<>();
        int[] brandColors = {R.color.primary_500, R.color.secondary_400, R.color.secondary_300};
        int colorIndex = 0;

        for (com.chopcode.rutago.app.models.Route route : activeRoutes) {
            String sid = route.getScheduleId();
            if (sid == null) continue;

            // 🔥 Ocupación Real: Obtenida directamente de la disponibilidad (incluye App y Ventas Físicas)
            Integer totalObj = scheduleTotalMap.get(sid);
            int total = (totalObj != null) ? totalObj : capacityPerRoute;
            
            Integer availObj = scheduleAvailabilityMap.get(sid);
            int available = (availObj != null) ? availObj : total;
            
            int realOccupied = Math.max(0, total - available);
            
            // Nombre descriptivo con horario para diferenciar turnos iguales
            String time = (route.getTime() != null) ? route.getTime().getTime() : "--:--";
            String displayName = route.getOrigin() + " → " + route.getDestination() + " (" + time + ")";
            
            int color = brandColors[colorIndex % brandColors.length];
            // 'realOccupied' ahora se muestra en el campo de 'reservations' de la tarjeta (representa pasajeros totales)
            newStats.add(new com.chopcode.rutago.app.models.RouteStat(displayName, realOccupied, available, color));
            colorIndex++;
        }
        
        // Fallback básico si la lista sigue vacía
        if (newStats.isEmpty()) {
            newStats.add(new com.chopcode.rutago.app.models.RouteStat("Natagá → La Plata", 0, capacityPerRoute, R.color.primary_500));
            newStats.add(new com.chopcode.rutago.app.models.RouteStat("La Plata → Natagá", 0, capacityPerRoute, R.color.secondary_400));
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

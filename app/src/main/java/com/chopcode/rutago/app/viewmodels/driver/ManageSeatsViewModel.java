package com.chopcode.rutago.app.viewmodels.driver;

import android.util.Log;
import androidx.annotation.NonNull;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import com.chopcode.rutago.app.config.MyApp;
import com.chopcode.rutago.app.engines.seats.SeatDataProcessor;
import com.chopcode.rutago.app.models.Reservation;
import com.chopcode.rutago.app.R;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.ValueEventListener;

import java.util.HashSet;
import java.util.Set;

/**
 * Manage Seats ViewModel (Driver)
 *
 * Motor de lógica para la gestión técnica de inventario de un despacho específico.
 * Responsabilidades:
 * - Clasificar en tiempo real los asientos entre "Ocupados por App" y "Bloqueados Físicamente".
 * - Proveer acciones para la venta manual (bloqueo) de puestos para pasajeros de terminal.
 * - Sincronizar el impacto financiero de las ventas físicas en el Dashboard diario.
 * - Mantener un cálculo exacto de la disponibilidad restando reservas activas y bloqueos.
 * - Gestionar suscripciones duales a Reservas y Disponibilidad NoSQL.
 */
public class ManageSeatsViewModel extends ViewModel {
    private static final String TAG = "ManageSeatsViewModel";

    /** Conjunto de asientos tomados por usuarios registrados desde la aplicación. */
    private final MutableLiveData<Set<Integer>> appOccupiedSeats = new MutableLiveData<>(new HashSet<>());
    
    /** Conjunto de asientos marcados manualmente por el conductor en el paradero. */
    private final MutableLiveData<Set<Integer>> physicalOccupiedSeats = new MutableLiveData<>(new HashSet<>());
    
    private final MutableLiveData<Integer> availableCount = new MutableLiveData<>(0);
    private final MutableLiveData<Integer> totalCapacity = new MutableLiveData<>(13);
    private final MutableLiveData<Boolean> isLoading = new MutableLiveData<>(false);
    private final MutableLiveData<String> error = new MutableLiveData<>();

    private final SeatDataProcessor seatsDataProcessor;
    private final com.chopcode.rutago.app.services.reservations.driver.DriverReservationService driverReservationService;
    private final com.chopcode.rutago.app.services.prices.PriceService priceService;
    private ValueEventListener seatsListener;
    private ValueEventListener reservesListener;
    private String currentScheduleId;
    private Set<Integer> lastTotalOccupied = new HashSet<>();
    private double routePrice = com.chopcode.rutago.app.services.prices.PriceService.DEFAULT_PRICE;

    public ManageSeatsViewModel() {
        this.seatsDataProcessor = new SeatDataProcessor();
        this.driverReservationService = new com.chopcode.rutago.app.services.reservations.driver.DriverReservationService();
        this.priceService = new com.chopcode.rutago.app.services.prices.PriceService();
    }

    /**
     * Obtiene la tarifa actual para registrar correctamente las ventas físicas en la contabilidad.
     */
    public void fetchRoutePrice(String routeName) {
        if (routeName == null || !routeName.contains("->")) return;
        String[] parts = routeName.split("->");
        if (parts.length == 2) {
            String origin = parts[0].trim();
            String destination = parts[1].trim();
            priceService.getRoutePrice(origin, destination, new com.chopcode.rutago.app.services.prices.PriceService.PriceCallback() {
                @Override
                public void onPriceLoaded(double price) {
                    routePrice = price;
                    Log.d(TAG, "💰 Tarifa sincronizada para venta física: " + price);
                }
                @Override public void onError(String errorMsg) { Log.e(TAG, "❌ Error al sincronizar tarifa: " + errorMsg); }
            });
        }
    }

    public void setRoutePrice(double price) { this.routePrice = price; }
    public LiveData<Set<Integer>> getAppOccupiedSeats() { return appOccupiedSeats; }
    public LiveData<Set<Integer>> getPhysicalOccupiedSeats() { return physicalOccupiedSeats; }
    public LiveData<Integer> getAvailableCount() { return availableCount; }
    public LiveData<Integer> getTotalCapacity() { return totalCapacity; }
    public LiveData<Boolean> getIsLoading() { return isLoading; }
    public LiveData<String> getError() { return error; }

    /**
     * Activa el monitoreo constante de ocupación para el itinerario seleccionado.
     */
    public void startListening(String scheduleId) {
        if (scheduleId == null) return;
        this.currentScheduleId = scheduleId;
        isLoading.setValue(true);
        setupReservesListener(scheduleId);
        setupSeatsListener(scheduleId);
    }

    /**
     * Filtra las reservas atómicas de Firebase para identificar cuáles pertenecen a este despacho.
     */
    private void setupReservesListener(String scheduleId) {
        DatabaseReference ref = MyApp.getDatabaseReference("reservas");
        reservesListener = new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                Set<Integer> appOccupied = new HashSet<>();
                long hace24h = System.currentTimeMillis() - (24 * 60 * 60 * 1000);
                for (DataSnapshot ds : snapshot.getChildren()) {
                    Reservation r = ds.getValue(Reservation.class);
                    if (r != null && scheduleId.equals(r.getScheduleId())) {
                        // Solo consideramos reservas vigentes (menos de 24h) y no canceladas
                        if (r.getReservationDate() > hace24h && !"Cancelada".equalsIgnoreCase(r.getReservationStatus())) {
                            appOccupied.add(r.getReservedSeat());
                        }
                    }
                }
                appOccupiedSeats.postValue(appOccupied);
                recalculatePhysicalSeats();
            }
            @Override public void onCancelled(@NonNull DatabaseError errorMsg) { error.postValue(errorMsg.getMessage()); }
        };
        ref.addValueEventListener(reservesListener);
    }

    /**
     * Escucha el nodo de disponibilidad técnica del horario.
     */
    private void setupSeatsListener(String scheduleId) {
        DatabaseReference ref = MyApp.getDatabaseReference("disponibilidadAsientos/" + scheduleId);
        seatsListener = new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                if (snapshot.exists()) {
                    Integer disp = snapshot.child("asientosDisponibles").getValue(Integer.class);
                    Integer total = snapshot.child("totalAsientos").getValue(Integer.class);
                    availableCount.postValue(disp != null ? disp : 0);
                    if (total != null && total > 0) totalCapacity.postValue(total);
                    
                    Set<Integer> allOccupied = new HashSet<>();
                    for (DataSnapshot s : snapshot.child("asientosOcupados").getChildren()) {
                        if (Boolean.TRUE.equals(s.getValue(Boolean.class))) {
                            try { allOccupied.add(Integer.parseInt(s.getKey())); } catch (Exception ignored) {}
                        }
                    }
                    lastTotalOccupied = allOccupied;
                    recalculatePhysicalSeats();
                }
                isLoading.postValue(false);
            }
            @Override public void onCancelled(@NonNull DatabaseError errorMsg) { error.postValue(errorMsg.getMessage()); }
        };
        ref.addValueEventListener(seatsListener);
    }

    /**
     * Lógica de Diferenciación:
     * Calcula qué asientos están ocupados físicamente restando los que están tomados por la App
     * del total de asientos marcados como ocupados en el nodo de disponibilidad.
     */
    private void recalculatePhysicalSeats() {
        Set<Integer> physical = new HashSet<>();
        Set<Integer> app = appOccupiedSeats.getValue();
        for (Integer seat : lastTotalOccupied) {
            if (app == null || !app.contains(seat)) physical.add(seat);
        }
        physicalOccupiedSeats.postValue(physical);
    }

    /**
     * Bloquea un asiento manualmente para una venta presencial.
     */
    public void reservePhysical(int seatNumber) {
        if (currentScheduleId == null) return;
        seatsDataProcessor.reserveSeat(currentScheduleId, seatNumber, new SeatDataProcessor.SeatReservationCallback() {
            @Override public void onSuccess() {
                String driverId = MyApp.getCurrentUserId();
                // Registro financiero inmediato de la venta manual
                if (driverId != null) driverReservationService.registrarVentaEnEstadisticas(driverId, routePrice);
            }
            @Override public void onError(String msg) { error.postValue(MyApp.getAppContext().getString(R.string.error_reserva_puesto, msg)); }
        });
    }

    /**
     * Libera un asiento que había sido bloqueado físicamente.
     */
    public void freePhysical(int seatNumber) {
        if (currentScheduleId == null) return;
        seatsDataProcessor.freeSeat(currentScheduleId, seatNumber, new SeatDataProcessor.SeatReservationCallback() {
            @Override public void onSuccess() {
                String driverId = MyApp.getCurrentUserId();
                // Ajuste contable al anular la venta manual
                if (driverId != null) driverReservationService.removerVentaDeEstadisticas(driverId, routePrice);
            }
            @Override public void onError(String msg) { error.postValue(MyApp.getAppContext().getString(R.string.error_liberacion_puesto, msg)); }
        });
    }

    @Override
    protected void onCleared() {
        super.onCleared();
        if (seatsListener != null) MyApp.getDatabaseReference("disponibilidadAsientos/" + currentScheduleId).removeEventListener(seatsListener);
        if (reservesListener != null) MyApp.getDatabaseReference("reservas").removeEventListener(reservesListener);
    }
}

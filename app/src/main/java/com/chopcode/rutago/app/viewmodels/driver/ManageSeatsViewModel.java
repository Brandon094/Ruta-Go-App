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
 * 💺 Manage Seats ViewModel (Driver)
 * 
 * Motor de lógica para la gestión técnica de asientos de un viaje.
 */
public class ManageSeatsViewModel extends ViewModel {
    private static final String TAG = "ManageSeatsViewModel";

    private final MutableLiveData<Set<Integer>> appOccupiedSeats = new MutableLiveData<>(new HashSet<>());
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
                    Log.d(TAG, "💰 Precio de ruta actualizado: " + price);
                }
                @Override public void onError(String errorMsg) { Log.e(TAG, "Error: " + errorMsg); }
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

    public void startListening(String scheduleId) {
        if (scheduleId == null) return;
        this.currentScheduleId = scheduleId;
        isLoading.setValue(true);
        setupReservesListener(scheduleId);
        setupSeatsListener(scheduleId);
    }

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

    private void recalculatePhysicalSeats() {
        Set<Integer> physical = new HashSet<>();
        Set<Integer> app = appOccupiedSeats.getValue();
        for (Integer seat : lastTotalOccupied) {
            if (app == null || !app.contains(seat)) physical.add(seat);
        }
        physicalOccupiedSeats.postValue(physical);
    }

    public void reservePhysical(int seatNumber) {
        if (currentScheduleId == null) return;
        seatsDataProcessor.reserveSeat(currentScheduleId, seatNumber, new SeatDataProcessor.SeatReservationCallback() {
            @Override public void onSuccess() {
                String driverId = MyApp.getCurrentUserId();
                if (driverId != null) driverReservationService.registrarVentaEnEstadisticas(driverId, routePrice);
            }
            @Override public void onError(String msg) { error.postValue(MyApp.getAppContext().getString(R.string.error_reserva_puesto, msg)); }
        });
    }

    public void freePhysical(int seatNumber) {
        if (currentScheduleId == null) return;
        seatsDataProcessor.freeSeat(currentScheduleId, seatNumber, new SeatDataProcessor.SeatReservationCallback() {
            @Override public void onSuccess() {
                String driverId = MyApp.getCurrentUserId();
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

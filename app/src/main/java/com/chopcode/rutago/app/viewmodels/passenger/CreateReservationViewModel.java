package com.chopcode.rutago.app.viewmodels.passenger;

import android.util.Log;
import androidx.annotation.NonNull;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import com.chopcode.rutago.app.models.User;
import com.chopcode.rutago.app.models.Driver;
import com.chopcode.rutago.app.models.Vehicle;
import com.chopcode.rutago.app.services.reservations.common.ReservationService;
import com.chopcode.rutago.app.services.reservations.common.VehicleService;
import com.chopcode.rutago.app.services.user.UserService;
import com.chopcode.rutago.app.services.prices.PriceService;
import com.chopcode.rutago.app.config.MyApp;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.ValueEventListener;

import java.util.HashSet;
import java.util.Set;

/**
 * Create Reservation ViewModel (Passenger)
 *
 * Motor de orquestación para la selección interactiva de asientos.
 * Responsabilidades:
 * - Mantener una suscripción en tiempo real al inventario de asientos ocupados por despacho.
 * - Realizar la resolución de identidades: vincula dinámicamente el horario con el conductor y su vehículo.
 * - Implementar un algoritmo de búsqueda exhaustiva para recuperar conductores en caso de inconsistencias en el nodo de horarios.
 * - Sincronizar tarifas dinámicas y perfiles de usuario para preparar el Payload de reserva.
 * - Garantizar la limpieza de listeners para optimizar el rendimiento del dispositivo.
 */
public class CreateReservationViewModel extends ViewModel {
    private static final String TAG = "CreateReservationVM";

    /** Conjunto reactivo de números de asiento no disponibles. */
    private final MutableLiveData<Set<Integer>> occupiedSeats = new MutableLiveData<>(new HashSet<>());
    
    private final MutableLiveData<User> currentUser = new MutableLiveData<>();
    private final MutableLiveData<Driver> currentDriver = new MutableLiveData<>();
    private final MutableLiveData<Vehicle> currentVehicle = new MutableLiveData<>();
    private final MutableLiveData<Double> routePrice = new MutableLiveData<>(PriceService.DEFAULT_PRICE);
    private final MutableLiveData<Boolean> isLoading = new MutableLiveData<>(false);
    private final MutableLiveData<String> error = new MutableLiveData<>();

    private final ReservationService reservationService;
    private final UserService userService;
    private final VehicleService vehicleService;
    private final PriceService priceService;
    private DatabaseReference seatsListenerRef;
    private ValueEventListener seatsValueListener;
    private DatabaseReference scheduleDriverRef;
    private ValueEventListener scheduleDriverListener;

    public CreateReservationViewModel() {
        this.reservationService = new ReservationService();
        this.userService = new UserService();
        this.vehicleService = new VehicleService();
        this.priceService = new PriceService();
    }

    public LiveData<Set<Integer>> getOccupiedSeats() { return occupiedSeats; }
    public LiveData<User> getCurrentUser() { return currentUser; }
    public LiveData<Driver> getCurrentDriver() { return currentDriver; }
    public LiveData<Vehicle> getCurrentVehicle() { return currentVehicle; }
    public LiveData<Double> getRoutePrice() { return routePrice; }
    public LiveData<Boolean> getIsLoading() { return isLoading; }
    public LiveData<String> getError() { return error; }

    public void setInitialPrice(double price) {
        routePrice.setValue(price);
    }

    /**
     * Consulta la tarifa vigente para el trayecto seleccionado.
     */
    public void loadPrice(String origin, String destination) {
        priceService.getRoutePrice(origin, destination, new PriceService.PriceCallback() {
            @Override public void onPriceLoaded(double price) { routePrice.postValue(price); }
            @Override public void onError(String error) { routePrice.postValue(PriceService.DEFAULT_PRICE); }
        });
    }

    /**
     * Recupera el perfil del pasajero logueado.
     */
    public void loadUserData() {
        String userId = MyApp.getCurrentUserId();
        if (userId == null) return;
        userService.loadUserData(userId, new UserService.UserDataCallback() {
            @Override public void onUserDataLoaded(User user) { currentUser.postValue(user); }
            @Override public void onError(String errorMsg) { error.postValue(errorMsg); }
        });
    }

    /**
     * Inicia el stream de datos de ocupación para el mapa de asientos.
     */
    public void startListeningSeats(String scheduleId) {
        if (scheduleId == null) return;
        stopListeningSeats();
        seatsListenerRef = MyApp.getDatabaseReference("disponibilidadAsientos/" + scheduleId + "/asientosOcupados");
        seatsValueListener = new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot snapshot) {
                Set<Integer> occupied = new HashSet<>();
                for (DataSnapshot seatSnap : snapshot.getChildren()) {
                    try {
                        if (Boolean.TRUE.equals(seatSnap.getValue(Boolean.class))) {
                            occupied.add(Integer.parseInt(seatSnap.getKey()));
                        }
                    } catch (Exception e) { Log.e(TAG, "❌ Error al procesar asiento: " + e.getMessage()); }
                }
                occupiedSeats.postValue(occupied);
            }
            @Override public void onCancelled(DatabaseError databaseError) { error.postValue(databaseError.getMessage()); }
        };
        seatsListenerRef.addValueEventListener(seatsValueListener);
    }

    public void stopListeningSeats() {
        if (seatsListenerRef != null && seatsValueListener != null) {
            seatsListenerRef.removeEventListener(seatsValueListener);
        }
    }

    /**
     * Orquesta la carga de información del operador (Conductor y Bus).
     * Implementa un mecanismo de redundancia que busca al conductor incluso si la referencia en el horario falla.
     */
    public void loadDriverAndVehicleInfo(String scheduleId) {
        if (scheduleId == null) return;
        isLoading.setValue(true);
        
        scheduleDriverRef = MyApp.getDatabaseReference("horarios/" + scheduleId + "/conductorId");
        scheduleDriverListener = new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                if (snapshot.exists()) {
                    String driverId = snapshot.getValue(String.class);
                    if (driverId != null) { loadDriverData(driverId); return; }
                }
                findDriverExhaustively(scheduleId);
            }
            @Override public void onCancelled(@NonNull DatabaseError e) { findDriverExhaustively(scheduleId); }
        };
        scheduleDriverRef.addValueEventListener(scheduleDriverListener);
    }

    /**
     * Búsqueda por fuerza bruta: Recorre todos los conductores para encontrar quién tiene asignado el horario.
     * Útil en escenarios de desincronización de base de datos.
     */
    private void findDriverExhaustively(String scheduleId) {
        MyApp.getDatabaseReference("conductores").addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                for (DataSnapshot dSnap : snapshot.getChildren()) {
                    DataSnapshot hSnap = dSnap.child("horariosAsignados");
                    for (DataSnapshot h : hSnap.getChildren()) {
                        if (scheduleId.equals(String.valueOf(h.getValue()))) {
                            loadDriverData(dSnap.getKey());
                            return;
                        }
                    }
                }
                isLoading.postValue(false);
            }
            @Override public void onCancelled(@NonNull DatabaseError e) { isLoading.postValue(false); }
        });
    }

    private void loadDriverData(String driverId) {
        userService.loadDriverData(driverId, new UserService.DriverDataCallback() {
            @Override
            public void onDriverDataLoaded(Driver driver) {
                if (driver != null) {
                    currentDriver.postValue(driver);
                    loadVehicleData(driverId, driver.getVehiclePlate());
                } else { isLoading.postValue(false); }
            }
            @Override public void onError(String msg) { error.postValue(msg); isLoading.postValue(false); }
        });
    }

    private void loadVehicleData(String driverId, String plate) {
        if (plate != null && !plate.isEmpty() && !"N/A".equals(plate)) {
            vehicleService.getVehicleByPlate(plate, new VehicleService.VehicleCallback() {
                @Override
                public void onVehicleLoaded(Vehicle vehicle) {
                    if (vehicle != null) { currentVehicle.postValue(vehicle); isLoading.postValue(false); }
                    else { fallbackVehicleLoad(driverId); }
                }
                @Override public void onError(String msg) { fallbackVehicleLoad(driverId); }
            });
        } else { fallbackVehicleLoad(driverId); }
    }

    private void fallbackVehicleLoad(String driverId) {
        vehicleService.getVehicleByDriver(driverId, new VehicleService.VehicleCallback() {
            @Override
            public void onVehicleLoaded(Vehicle vehicle) { currentVehicle.postValue(vehicle); isLoading.postValue(false); }
            @Override public void onError(String msg) { isLoading.postValue(false); }
        });
    }

    @Override
    protected void onCleared() {
        super.onCleared();
        stopListeningSeats();
        if (scheduleDriverRef != null && scheduleDriverListener != null) {
            scheduleDriverRef.removeEventListener(scheduleDriverListener);
        }
    }
}

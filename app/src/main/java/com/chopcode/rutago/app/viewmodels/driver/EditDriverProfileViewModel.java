package com.chopcode.rutago.app.viewmodels.driver;

import android.util.Log;
import androidx.annotation.NonNull;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import com.chopcode.rutago.app.config.MyApp;
import com.chopcode.rutago.app.models.Driver;
import com.chopcode.rutago.app.models.Vehicle;
import com.chopcode.rutago.app.services.user.UserService;
import com.chopcode.rutago.app.engines.seats.SeatDataProcessor;
import com.chopcode.rutago.app.R;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.ValueEventListener;

import java.util.HashMap;
import java.util.Map;

/**
 * Edit Driver Profile ViewModel
 *
 * Orquestador de la actualización masiva de perfiles operativos.
 * Responsabilidades:
 * - Cargar simultáneamente la información personal y la ficha técnica del vehículo.
 * - Sincronizar cambios técnicos (como la placa o capacidad) en todos los nodos vinculados.
 * - Disparar el motor de integridad para actualizar la capacidad de asientos en los horarios activos.
 * - Gestionar errores granulares por cada nodo de base de datos (conductores vs vehículos).
 */
public class EditDriverProfileViewModel extends ViewModel {
    private static final String TAG = "EditDriverProfileVM";

    private final MutableLiveData<Driver> driverData = new MutableLiveData<>();
    private final MutableLiveData<Vehicle> vehicleData = new MutableLiveData<>();
    private final MutableLiveData<Boolean> isLoading = new MutableLiveData<>(false);
    
    /** Notifica si la actualización multi-nodo fue exitosa. */
    private final MutableLiveData<Boolean> updateSuccess = new MutableLiveData<>(false);
    
    private final MutableLiveData<String> error = new MutableLiveData<>();
    private final SeatDataProcessor seatsDataProcessor;

    public EditDriverProfileViewModel() {
        this.seatsDataProcessor = new SeatDataProcessor();
    }

    public LiveData<Driver> getConductorData() { return driverData; }
    public LiveData<Vehicle> getVehiculoData() { return vehicleData; }
    public LiveData<Boolean> getIsLoading() { return isLoading; }
    public LiveData<Boolean> getUpdateSuccess() { return updateSuccess; }
    public LiveData<String> getError() { return error; }

    /**
     * Recupera el perfil del conductor desde Firebase.
     */
    public void loadData(String userId) {
        isLoading.setValue(true);
        
        DatabaseReference conductorRef = MyApp.getDatabaseReference("conductores/" + userId);
        conductorRef.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                if (snapshot.exists()) {
                    Driver driver = snapshot.getValue(Driver.class);
                    if (driver != null) {
                        driver.setId(userId);
                        driverData.postValue(driver);

                        if (driver.getVehicleId() != null && !driver.getVehicleId().isEmpty()) {
                            loadVehiculo(driver.getVehicleId());
                        } else {
                            isLoading.postValue(false);
                        }
                    } else {
                        error.postValue(MyApp.getAppContext().getString(R.string.error_parsing_driver_data));
                        isLoading.postValue(false);
                    }
                } else {
                    error.postValue(MyApp.getAppContext().getString(R.string.driver_data_not_found));
                    isLoading.postValue(false);
                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError errorMsg) {
                error.postValue(errorMsg.getMessage());
                isLoading.postValue(false);
            }
        });
    }

    /**
     * Recupera los detalles técnicos del vehículo.
     */
    private void loadVehiculo(String vehicleId) {
        DatabaseReference vehicleRef = MyApp.getDatabaseReference("vehiculos/" + vehicleId);
        vehicleRef.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                if (snapshot.exists()) {
                    Vehicle vehicle = new Vehicle();
                    vehicle.setId(vehicleId);
                    vehicle.setPlate(getStringSafely(snapshot.child("placa")));
                    vehicle.setBrand(getStringSafely(snapshot.child("marca")));
                    vehicle.setModel(getStringSafely(snapshot.child("modelo")));
                    vehicle.setColor(getStringSafely(snapshot.child("color")));
                    vehicle.setYear(getStringSafely(snapshot.child("ano")));
                    vehicle.setDriverId(getStringSafely(snapshot.child("conductorId")));
                    
                    Object cap = snapshot.child("capacidad").getValue();
                    if (cap instanceof Number) {
                        vehicle.setCapacity(((Number) cap).intValue());
                    }
                    
                    vehicleData.postValue(vehicle);
                }
                isLoading.postValue(false);
            }

            @Override
            public void onCancelled(@NonNull DatabaseError errorMsg) {
                error.postValue(errorMsg.getMessage());
                isLoading.postValue(false);
            }
        });
    }

    /**
     * Ejecuta una transacción coordinada para actualizar los datos en múltiples nodos.
     * Si la capacidad cambia, se propaga a los horarios del día.
     */
    public void updateProfile(String userId, Driver driver, Vehicle vehicle) {
        isLoading.setValue(true);
        Log.d(TAG, "🔄 Iniciando actualización masiva para conductor: " + userId);

        vehicle.setDriverId(userId);
        if (vehicle.getId() == null || vehicle.getId().isEmpty()) {
            vehicle.setId(vehicle.getPlate());
        }

        // 1. Actualizar nodo /vehiculos/
        DatabaseReference vehicleRef = MyApp.getDatabaseReference("vehiculos/" + vehicle.getId());
        vehicleRef.setValue(vehicle).addOnSuccessListener(aVoid -> {
            
            driver.setVehicleId(vehicle.getId());
            driver.setVehiclePlate(vehicle.getPlate());
            
            // Sincronización de capacidad en los despachos activos
            if (driver.getAssignedSchedules() != null && !driver.getAssignedSchedules().isEmpty()) {
                seatsDataProcessor.syncVehicleCapacityToSchedules(driver.getAssignedSchedules(), vehicle.getCapacity());
            }

            // 2. Actualizar nodo /conductores/
            DatabaseReference conductorRef = MyApp.getDatabaseReference("conductores/" + userId);
            conductorRef.setValue(driver).addOnSuccessListener(aVoid2 -> {
                isLoading.postValue(false);
                updateSuccess.postValue(true);
            }).addOnFailureListener(e -> {
                error.postValue(MyApp.getAppContext().getString(R.string.error_node_drivers, e.getMessage()));
                isLoading.postValue(false);
            });

        }).addOnFailureListener(e -> {
            error.postValue(MyApp.getAppContext().getString(R.string.error_node_vehicles, e.getMessage()));
            isLoading.postValue(false);
        });
    }

    private String getStringSafely(DataSnapshot snapshot) {
        Object value = snapshot.getValue();
        if (value == null) return "";
        return String.valueOf(value);
    }
}

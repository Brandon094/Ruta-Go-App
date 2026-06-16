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
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.ValueEventListener;

import java.util.HashMap;
import java.util.Map;

/**
 * ViewModel for editing driver profile and vehicle.
 */
public class EditDriverProfileViewModel extends ViewModel {
    private static final String TAG = "EditDriverProfileVM";

    private final MutableLiveData<Driver> driverData = new MutableLiveData<>();
    private final MutableLiveData<Vehicle> vehicleData = new MutableLiveData<>();
    private final MutableLiveData<Boolean> isLoading = new MutableLiveData<>(false);
    private final MutableLiveData<Boolean> updateSuccess = new MutableLiveData<>(false);
    private final MutableLiveData<String> error = new MutableLiveData<>();

    public EditDriverProfileViewModel() {
    }

    public LiveData<Driver> getConductorData() { return driverData; }
    public LiveData<Vehicle> getVehiculoData() { return vehicleData; }
    public LiveData<Boolean> getIsLoading() { return isLoading; }
    public LiveData<Boolean> getUpdateSuccess() { return updateSuccess; }
    public LiveData<String> getError() { return error; }

    public void loadData(String userId) {
        isLoading.setValue(true);
        
        DatabaseReference conductorRef = MyApp.getDatabaseReference("conductores/" + userId);
        conductorRef.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                if (snapshot.exists()) {
                    Driver driver = new Driver();
                    driver.setId(userId);
                    driver.setNombre(getStringSafely(snapshot.child("nombre")));
                    driver.setTelefono(getStringSafely(snapshot.child("telefono")));
                    driver.setEmail(getStringSafely(snapshot.child("email")));
                    driver.setVehicleId(getStringSafely(snapshot.child("vehiculoId")));
                    driver.setVehiclePlate(getStringSafely(snapshot.child("placaVehiculo")));
                    
                    driverData.postValue(driver);

                    if (driver.getVehicleId() != null && !driver.getVehicleId().isEmpty()) {
                        loadVehiculo(driver.getVehicleId());
                    } else {
                        isLoading.postValue(false);
                    }
                } else {
                    error.postValue("Driver data not found");
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

    public void updateProfile(String userId, Driver driver, Vehicle vehicle) {
        isLoading.setValue(true);
        Log.d(TAG, "🔄 Starting massive update for driver: " + userId);

        vehicle.setDriverId(userId);
        if (vehicle.getId() == null || vehicle.getId().isEmpty()) {
            vehicle.setId(vehicle.getPlate());
        }

        DatabaseReference vehicleRef = MyApp.getDatabaseReference("vehiculos/" + vehicle.getId());
        vehicleRef.setValue(vehicle).addOnSuccessListener(aVoid -> {
            
            driver.setVehicleId(vehicle.getId());
            driver.setVehiclePlate(vehicle.getPlate());
            
            DatabaseReference conductorRef = MyApp.getDatabaseReference("conductores/" + userId);
            conductorRef.setValue(driver).addOnSuccessListener(aVoid2 -> {
                
                DatabaseReference userRef = MyApp.getDatabaseReference("usuarios/" + userId);
                Map<String, Object> userUpdates = new HashMap<>();
                userUpdates.put("nombre", driver.getNombre());
                userUpdates.put("telefono", driver.getTelefono());
                
                userRef.updateChildren(userUpdates).addOnSuccessListener(aVoid3 -> {
                    isLoading.postValue(false);
                    updateSuccess.postValue(true);
                }).addOnFailureListener(e -> {
                    error.postValue("Error in users node: " + e.getMessage());
                    isLoading.postValue(false);
                });

            }).addOnFailureListener(e -> {
                error.postValue("Error in drivers node: " + e.getMessage());
                isLoading.postValue(false);
            });

        }).addOnFailureListener(e -> {
            error.postValue("Error in vehicles node: " + e.getMessage());
            isLoading.postValue(false);
        });
    }

    private String getStringSafely(DataSnapshot snapshot) {
        Object value = snapshot.getValue();
        if (value == null) return "";
        return String.valueOf(value);
    }
}

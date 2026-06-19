package com.chopcode.rutago.app.viewmodels.driver;

import android.util.Log;
import androidx.lifecycle.MutableLiveData;
import com.chopcode.rutago.app.viewmodels.BaseViewModel;
import com.chopcode.rutago.app.services.user.UserService;
import com.chopcode.rutago.app.models.Driver;
import com.chopcode.rutago.app.models.Vehicle;
import com.chopcode.rutago.app.services.storage.StorageService;
import com.chopcode.rutago.app.services.reservations.VehicleService;
import com.chopcode.rutago.app.managers.seats.dataprocessor.SeatsDataProcessor;
import java.util.ArrayList;
import java.util.List;

/**
 * 👤 Driver Profile ViewModel
 * 
 * Orquesta la carga de información del conductor y su vehículo.
 * Es el responsable de activar la sincronización de capacidad dinámica
 * apenas el perfil es cargado, asegurando que los horarios asignados
 * reflejen los puestos reales del vehículo en Firebase.
 */
public class DriverProfileViewModel extends BaseViewModel {

    private static final String TAG = "DriverProfileViewModel";

    private final UserService userService;
    private final StorageService storageService;
    private final VehicleService vehicleService;
    private final SeatsDataProcessor seatsDataProcessor;

    // --- LiveData para UI ---
    private final MutableLiveData<String> driverNameLiveData = new MutableLiveData<>();
    private final MutableLiveData<String> vehiclePlateLiveData = new MutableLiveData<>();
    private final MutableLiveData<Integer> vehicleCapacityLiveData = new MutableLiveData<>();
    private final MutableLiveData<List<String>> assignedSchedulesLiveData = new MutableLiveData<>();
    private final MutableLiveData<Driver> driverLiveData = new MutableLiveData<>();
    private final MutableLiveData<Vehicle> vehicleLiveData = new MutableLiveData<>();
    private final MutableLiveData<String> photoUploadStatus = new MutableLiveData<>();

    private String currentDriverUID;

    public DriverProfileViewModel() {
        this.userService = new UserService();
        this.storageService = new StorageService();
        this.vehicleService = new VehicleService();
        this.seatsDataProcessor = new SeatsDataProcessor();

        this.driverNameLiveData.setValue(null);
        this.vehiclePlateLiveData.setValue(null);
        this.assignedSchedulesLiveData.setValue(new ArrayList<>());
    }

    public MutableLiveData<String> getConductorNombreLiveData() { return driverNameLiveData; }
    public MutableLiveData<String> getPlacaVehiculoLiveData() { return vehiclePlateLiveData; }
    public MutableLiveData<Integer> getCapacidadVehiculoLiveData() { return vehicleCapacityLiveData; }
    public MutableLiveData<List<String>> getHorariosAsignadosLiveData() { return assignedSchedulesLiveData; }
    public MutableLiveData<Driver> getConductorLiveData() { return driverLiveData; }
    public MutableLiveData<Vehicle> getVehiculoLiveData() { return vehicleLiveData; }
    public MutableLiveData<String> getPhotoUploadStatus() { return photoUploadStatus; }

    /**
     * Carga todos los datos del conductor y dispara la sincronización de capacidad.
     */
    public void cargarDatosCompletos(String driverUID) {
        if (driverUID == null || driverUID.isEmpty()) {
            setError("Invalid Driver ID");
            return;
        }

        // 🔥 CACHE: Si ya tenemos los datos, no reiniciar carga ni Shimmer
        if (driverUID.equals(currentDriverUID) && driverLiveData.getValue() != null) {
            setLoading(false);
            return;
        }

        this.currentDriverUID = driverUID;
        setLoading(true);

        userService.loadDriverData(driverUID, new UserService.DriverDataCallback() {
            @Override
            public void onDriverDataLoaded(Driver driver) {
                Log.d(TAG, "Driver data loaded: " + driver.getNombre());

                driverNameLiveData.postValue(driver.getNombre());
                vehiclePlateLiveData.postValue(driver.getVehiclePlate());
                vehicleCapacityLiveData.postValue(driver.getVehicleCapacity());
                assignedSchedulesLiveData.postValue(driver.getAssignedSchedules() != null ? driver.getAssignedSchedules() : new ArrayList<>());
                driverLiveData.postValue(driver);

                // 🔥 SYNC ATÓMICO: Propagar capacidad del vehículo a los nodos de disponibilidad
                if (driver.getAssignedSchedules() != null && !driver.getAssignedSchedules().isEmpty() && driver.getVehicleCapacity() > 0) {
                    seatsDataProcessor.syncVehicleCapacityToSchedules(driver.getAssignedSchedules(), driver.getVehicleCapacity());
                }

                if (driver.getVehiclePlate() != null && !driver.getVehiclePlate().isEmpty()) {
                    cargarVehiculo(driver.getVehiclePlate());
                }
                setLoading(false);
            }

            @Override
            public void onError(String error) {
                setError(error);
                setLoading(false);
            }
        });
    }

    /**
     * Carga detalles técnicos del vehículo por placa.
     */
    private void cargarVehiculo(String plate) {
        vehicleService.getVehicleByPlate(plate, new VehicleService.VehicleCallback() {
            @Override
            public void onVehicleLoaded(Vehicle vehicle) {
                if (vehicle != null) {
                    vehicleLiveData.postValue(vehicle);
                    // Asegurar que la capacidad se actualice si el modelo de vehículo tiene el dato más fresco
                    if (vehicle.getCapacity() > 0) vehicleCapacityLiveData.postValue(vehicle.getCapacity());
                }
            }

            @Override
            public void onError(String error) {
                Log.e(TAG, "Error loading vehicle: " + error);
            }
        });
    }

    /**
     * Sube una foto a Storage y actualiza la referencia en la DB del conductor.
     */
    public void subirFotoPerfil(android.net.Uri uri) {
        if (currentDriverUID == null) return;
        photoUploadStatus.setValue("Uploading...");
        storageService.uploadProfilePicture(currentDriverUID, uri, new StorageService.UploadCallback() {
            @Override
            public void onSuccess(String downloadUrl) {
                userService.updateProfilePicture(currentDriverUID, downloadUrl, "conductores", new UserService.UserUpdateCallback() {
                    @Override
                    public void onSuccess() {
                        photoUploadStatus.postValue("Updated");
                        cargarDatosCompletos(currentDriverUID);
                    }
                    @Override public void onError(String error) { setError(error); }
                });
            }
            @Override public void onError(String error) { setError(error); }
            @Override public void onProgress(double progress) {}
        });
    }

    public void refrescarDatos() {
        if (currentDriverUID != null) cargarDatosCompletos(currentDriverUID);
    }

    public void limpiarDatos() {
        driverNameLiveData.postValue(null);
        vehiclePlateLiveData.postValue(null);
        assignedSchedulesLiveData.postValue(new ArrayList<>());
        driverLiveData.postValue(null);
        vehicleLiveData.postValue(null);
    }
}

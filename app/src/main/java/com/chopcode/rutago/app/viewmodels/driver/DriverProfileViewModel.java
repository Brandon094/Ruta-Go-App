package com.chopcode.rutago.app.viewmodels.driver;

import android.util.Log;
import androidx.lifecycle.MutableLiveData;
import com.chopcode.rutago.app.viewmodels.BaseViewModel;
import com.chopcode.rutago.app.services.user.UserService;
import com.chopcode.rutago.app.models.Driver;
import com.chopcode.rutago.app.models.Vehicle;
import com.chopcode.rutago.app.services.storage.StorageService;
import com.chopcode.rutago.app.services.reservations.VehicleService;
import java.util.ArrayList;
import java.util.List;

/**
 * ViewModel to manage driver profile information.
 */
public class DriverProfileViewModel extends BaseViewModel {

    private static final String TAG = "DriverProfileViewModel";

    private final UserService userService;
    private final StorageService storageService;
    private final VehicleService vehicleService;

    // LiveData
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

    public void cargarDatosCompletos(String driverUID) {
        if (driverUID == null || driverUID.isEmpty()) {
            setError("Invalid Driver ID");
            return;
        }

        this.currentDriverUID = driverUID;
        setLoading(true);

        userService.loadDriverData(driverUID, new UserService.DriverDataCallback() {
            @Override
            public void onDriverDataLoaded(Driver driver) {
                Log.d(TAG, "Driver data loaded: " + driver.getNombre());
                Log.d(TAG, "Assigned schedules: " + (driver.getAssignedSchedules() != null ? driver.getAssignedSchedules().toString() : "NULL"));

                driverNameLiveData.postValue(driver.getNombre());
                vehiclePlateLiveData.postValue(driver.getVehiclePlate());
                vehicleCapacityLiveData.postValue(driver.getVehicleCapacity());
                assignedSchedulesLiveData.postValue(driver.getAssignedSchedules() != null ? driver.getAssignedSchedules() : new ArrayList<>());
                driverLiveData.postValue(driver);

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

    private void cargarVehiculo(String plate) {
        vehicleService.getVehicleByPlate(plate, new VehicleService.VehicleCallback() {
            @Override
            public void onVehicleLoaded(Vehicle vehicle) {
                vehicleLiveData.postValue(vehicle);
            }

            @Override
            public void onError(String error) {
                Log.e(TAG, "Error loading vehicle: " + error);
            }
        });
    }

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

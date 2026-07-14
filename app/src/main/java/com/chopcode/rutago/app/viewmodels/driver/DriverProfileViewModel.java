package com.chopcode.rutago.app.viewmodels.driver;

import android.util.Log;
import androidx.lifecycle.MutableLiveData;
import com.chopcode.rutago.app.viewmodels.BaseViewModel;
import com.chopcode.rutago.app.services.user.UserService;
import com.chopcode.rutago.app.models.Driver;
import com.chopcode.rutago.app.models.Vehicle;
import com.chopcode.rutago.app.services.storage.StorageService;
import com.chopcode.rutago.app.services.reservations.common.VehicleService;
import com.chopcode.rutago.app.engines.seats.SeatDataProcessor;
import com.chopcode.rutago.app.config.MyApp;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;
import java.util.List;

/**
 * Driver Profile ViewModel
 *
 * Centro de gestión para la identidad digital y los activos del conductor.
 * Responsabilidades:
 * - Mantener una suscripción reactiva a los datos del perfil en /conductores/.
 * - Gestionar la sincronización de la capacidad del vehículo con los horarios asignados.
 * - Coordinar la carga asíncrona de fotografías a Firebase Storage.
 * - Implementar el flujo legal de "Derecho al Olvido" (Solicitud/Cancelación de borrado).
 * - Garantizar la liberación de recursos (listeners) al finalizar el ciclo de vida.
 */
public class DriverProfileViewModel extends BaseViewModel {

    private static final String TAG = "DriverProfileViewModel";

    private final UserService userService;
    private final StorageService storageService;
    private final VehicleService vehicleService;
    private final SeatDataProcessor seatsDataProcessor;

    /** Datos reactivos del perfil. */
    private final MutableLiveData<String> driverNameLiveData = new MutableLiveData<>();
    private final MutableLiveData<String> vehiclePlateLiveData = new MutableLiveData<>();
    private final MutableLiveData<Integer> vehicleCapacityLiveData = new MutableLiveData<>();
    private final MutableLiveData<List<String>> assignedSchedulesLiveData = new MutableLiveData<>();
    private final MutableLiveData<Driver> driverLiveData = new MutableLiveData<>();
    private final MutableLiveData<Vehicle> vehicleLiveData = new MutableLiveData<>();
    private final MutableLiveData<String> photoUploadStatus = new MutableLiveData<>();

    private String currentDriverUID;
    private ValueEventListener driverListener;
    private String currentVehiclePlate;
    private ValueEventListener vehicleListener;

    public DriverProfileViewModel() {
        this.userService = new UserService();
        this.storageService = new StorageService();
        this.vehicleService = new VehicleService();
        this.seatsDataProcessor = new SeatDataProcessor();
    }

    public MutableLiveData<String> getConductorNombreLiveData() { return driverNameLiveData; }
    public MutableLiveData<String> getPlacaVehiculoLiveData() { return vehiclePlateLiveData; }
    public MutableLiveData<Integer> getCapacidadVehiculoLiveData() { return vehicleCapacityLiveData; }
    public MutableLiveData<List<String>> getHorariosAsignadosLiveData() { return assignedSchedulesLiveData; }
    public MutableLiveData<Driver> getConductorLiveData() { return driverLiveData; }
    public MutableLiveData<Vehicle> getVehiculoLiveData() { return vehicleLiveData; }
    public MutableLiveData<String> getPhotoUploadStatus() { return photoUploadStatus; }

    /**
     * Sube una nueva foto de perfil y actualiza la URL en la base de datos.
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
                    }
                    @Override public void onError(String error) { setError(error); }
                });
            }
            @Override public void onError(String error) { setError(error); }
            @Override public void onProgress(double progress) {}
        });
    }

    /**
     * Inicializa la escucha reactiva de todos los datos vinculados al conductor.
     * Si la capacidad del vehículo cambia, dispara automáticamente una sincronización con los horarios.
     */
    public void cargarDatosCompletos(String driverUID) {
        if (driverUID == null || driverUID.isEmpty()) return;

        if (driverUID.equals(currentDriverUID) && driverListener != null) {
            if (driverLiveData.getValue() != null) {
                setLoading(false);
            }
            return; 
        }

        limpiarListener();
        this.currentDriverUID = driverUID;
        setLoading(true);

        driverListener = userService.listenToDriverData(driverUID, new UserService.DriverDataCallback() {
            @Override
            public void onDriverDataLoaded(Driver driver) {
                if (driver == null) { 
                    setLoading(false); 
                    setError("Error al cargar perfil.");
                    return; 
                }
                
                Log.d(TAG, "🔄 Perfil actualizado reactivamente: " + driver.getNombre());
                
                driverNameLiveData.postValue(driver.getNombre());
                vehiclePlateLiveData.postValue(driver.getVehiclePlate());
                vehicleCapacityLiveData.postValue(driver.getVehicleCapacity());
                assignedSchedulesLiveData.postValue(driver.getAssignedSchedules() != null ? driver.getAssignedSchedules() : new ArrayList<>());
                driverLiveData.postValue(driver);

                // ⚙️ Motor de integridad: Mantiene los horarios alineados con la capacidad del bus
                if (driver.getAssignedSchedules() != null && !driver.getAssignedSchedules().isEmpty() && driver.getVehicleCapacity() > 0) {
                    seatsDataProcessor.syncVehicleCapacityToSchedules(driver.getAssignedSchedules(), driver.getVehicleCapacity());
                }

                if (driver.getVehiclePlate() != null && !driver.getVehiclePlate().isEmpty()) {
                    cargarVehiculo(driver.getVehiclePlate());
                }
                setLoading(false);
            }
            @Override public void onError(String error) { setError(error); setLoading(false); }
        });
    }

    /**
     * Carga la ficha técnica del vehículo asignado.
     */
    private void cargarVehiculo(String plate) {
        if (plate == null || plate.isEmpty()) return;
        if (plate.equals(currentVehiclePlate) && vehicleListener != null) return;

        limpiarVehicleListener();
        this.currentVehiclePlate = plate;

        vehicleListener = vehicleService.listenToVehicleByPlate(plate, new VehicleService.VehicleCallback() {
            @Override
            public void onVehicleLoaded(Vehicle vehicle) {
                if (vehicle != null) {
                    vehicleLiveData.postValue(vehicle);
                    if (vehicle.getCapacity() > 0) vehicleCapacityLiveData.postValue(vehicle.getCapacity());
                }
            }
            @Override public void onError(String error) { Log.e(TAG, "❌ Error al cargar vehículo: " + error); }
        });
    }

    private void limpiarListener() {
        if (driverListener != null && currentDriverUID != null) {
            MyApp.getDatabaseReference("conductores/" + currentDriverUID).removeEventListener(driverListener);
            driverListener = null;
        }
        limpiarVehicleListener();
    }

    private void limpiarVehicleListener() {
        if (vehicleListener != null && currentVehiclePlate != null) {
            MyApp.getDatabaseReference("vehiculos/" + currentVehiclePlate).removeEventListener(vehicleListener);
            vehicleListener = null;
        }
    }

    public void refrescarDatos() { if (currentDriverUID != null) cargarDatosCompletos(currentDriverUID); }

    public void limpiarDatos() {
        driverNameLiveData.postValue(null);
        vehiclePlateLiveData.postValue(null);
        assignedSchedulesLiveData.postValue(new ArrayList<>());
        driverLiveData.postValue(null);
        vehicleLiveData.postValue(null);
    }

    /**
     * Marca el perfil para eliminación permanente (Periodo de gracia 30 días).
     */
    public void solicitarBorradoCuenta(UserService.UserUpdateCallback callback) {
        if (currentDriverUID == null) return;
        userService.requestAccountDeletion(currentDriverUID, "conductores", callback);
    }

    /**
     * Revierte una solicitud de borrado previa.
     */
    public void cancelarBorradoCuenta(UserService.UserUpdateCallback callback) {
        if (currentDriverUID == null) return;
        setLoading(true);
        userService.cancelAccountDeletion(currentDriverUID, "conductores", new UserService.UserUpdateCallback() {
            @Override public void onSuccess() { setLoading(false); callback.onSuccess(); }
            @Override public void onError(String error) { setLoading(false); callback.onError(error); }
        });
    }

    @Override
    protected void onCleared() {
        super.onCleared();
        limpiarListener();
    }
}

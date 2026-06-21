package com.chopcode.rutago.app.viewmodels.driver;

import android.util.Log;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import com.chopcode.rutago.app.config.MyApp;
import com.chopcode.rutago.app.managers.notificactions.NotificationManager;
import com.chopcode.rutago.app.services.auth.RegistrationService;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DatabaseReference;

import java.util.HashMap;
import java.util.Map;

/**
 * 🚛 Driver Registration ViewModel
 */
public class DriverRegistrationViewModel extends ViewModel {
    private static final String TAG = "DriverRegVM";

    private final MutableLiveData<Boolean> registrationSuccess = new MutableLiveData<>();
    private final MutableLiveData<String> registrationError = new MutableLiveData<>();
    private final MutableLiveData<Boolean> isLoading = new MutableLiveData<>(false);

    private final RegistrationService registrationService;

    public DriverRegistrationViewModel() {
        this.registrationService = new RegistrationService();
    }

    public LiveData<Boolean> getRegistrationSuccess() { return registrationSuccess; }
    public LiveData<String> getRegistrationError() { return registrationError; }
    public LiveData<Boolean> getIsLoading() { return isLoading; }

    public void registerDriver(String name, String email, String phone, String password, 
                               String plate, String model, String year, int capacity) {
        isLoading.setValue(true);
        registrationService.registrarUser(name, email, phone, password, new RegistrationService.RegistrationCallback() {
            @Override
            public void onSuccess() {
                saveDriverFullData(name, email, phone, plate, model, year, capacity);
            }

            @Override
            public void onFailure(String error) {
                isLoading.postValue(false);
                registrationError.postValue(error);
            }
        });
    }

    private void saveDriverFullData(String name, String email, String phone, 
                                    String plate, String model, String year, int capacity) {
        FirebaseUser user = MyApp.getCurrentUser();
        if (user == null) {
            isLoading.postValue(false);
            registrationError.postValue("Error: Session not found");
            return;
        }

        String userId = user.getUid();

        // 1. Guardar en /usuarios/
        saveToUsuarios(userId, name, email, phone);
        
        // 2. Guardar en /vehiculos/
        saveToVehiculos(userId, plate, model, year, capacity);
        
        // 3. Guardar en /conductores/
        saveToConductores(userId, name, email, phone, plate, model);

        NotificationManager.getInstance(MyApp.getAppContext()).saveFCMTokenToRealtimeDatabase(userId, "usuarios");

        isLoading.postValue(false);
        registrationSuccess.postValue(true);
    }

    private void saveToUsuarios(String userId, String name, String email, String phone) {
        DatabaseReference ref = MyApp.getDatabaseReference("usuarios/" + userId);
        Map<String, Object> data = new HashMap<>();
        data.put("id", userId);
        data.put("nombre", name);
        data.put("email", email);
        data.put("telefono", phone);
        data.put("rol", "conductor");
        data.put("status", "active");
        data.put("fechaRegistro", System.currentTimeMillis());
        ref.setValue(data);
    }

    private void saveToVehiculos(String userId, String plate, String model, String year, int capacity) {
        DatabaseReference ref = MyApp.getDatabaseReference("vehiculos/" + plate);
        Map<String, Object> data = new HashMap<>();
        data.put("id", plate);
        data.put("placa", plate);
        data.put("modelo", model);
        data.put("ano", year);
        data.put("capacidad", capacity);
        data.put("conductorId", userId);
        data.put("estado", "activo");
        ref.setValue(data);
    }

    private void saveToConductores(String userId, String name, String email, String phone, String plate, String model) {
        DatabaseReference ref = MyApp.getDatabaseReference("conductores/" + userId);
        Map<String, Object> data = new HashMap<>();
        data.put("id", userId);
        data.put("nombre", name);
        data.put("email", email);
        data.put("telefono", phone);
        data.put("placaVehiculo", plate);
        data.put("modeloVehiculo", model);
        data.put("vehiculoId", plate);
        data.put("status", "active");
        ref.setValue(data);
    }
}

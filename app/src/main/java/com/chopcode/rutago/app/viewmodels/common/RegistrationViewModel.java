package com.chopcode.rutago.app.viewmodels.common;

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
 * 📝 Registration ViewModel
 * 
 * Gestiona la lógica de negocio para el registro de nuevos pasajeros.
 * Responsabilidades:
 * - Orquestar la creación de credenciales en Firebase Auth.
 * - Persistir la información extendida del perfil en el nodo /usuarios/.
 * - Inicializar el token de notificaciones Push (FCM) para el nuevo usuario.
 * - Notificar a la UI sobre el progreso y resultado de la operación.
 */
public class RegistrationViewModel extends ViewModel {
    private static final String TAG = "RegistrationViewModel";

    private final MutableLiveData<Boolean> registrationSuccess = new MutableLiveData<>();
    private final MutableLiveData<String> registrationError = new MutableLiveData<>();
    private final MutableLiveData<Boolean> isLoading = new MutableLiveData<>(false);

    private final RegistrationService registrationService;

    public RegistrationViewModel() {
        this.registrationService = new RegistrationService();
    }

    public LiveData<Boolean> getRegistrationSuccess() { return registrationSuccess; }
    public LiveData<String> getRegistrationError() { return registrationError; }
    public LiveData<Boolean> getIsLoading() { return isLoading; }

    public void registerUser(String name, String email, String phone, String password) {
        isLoading.setValue(true);
        registrationService.registrarUser(name, email, phone, password, new RegistrationService.RegistrationCallback() {
            @Override
            public void onSuccess() {
                handleRegistrationSuccess(name, email, phone);
            }

            @Override
            public void onFailure(String error) {
                isLoading.postValue(false);
                registrationError.postValue(error);
            }
        });
    }

    private void handleRegistrationSuccess(String name, String email, String phone) {
        FirebaseUser user = MyApp.getCurrentUser();
        if (user == null) {
            isLoading.postValue(false);
            registrationError.postValue("Error: Session not found after registration");
            return;
        }

        String userId = user.getUid();
        saveExtraData(userId, name, email, phone);
        NotificationManager.getInstance(MyApp.getAppContext()).saveFCMTokenToRealtimeDatabase(userId, "usuarios");

        isLoading.postValue(false);
        registrationSuccess.postValue(true);
    }

    private void saveExtraData(String userId, String name, String email, String phone) {
        DatabaseReference userRef = MyApp.getDatabaseReference("usuarios/" + userId);
        Map<String, Object> userData = new HashMap<>();
        userData.put("nombre", name);
        userData.put("email", email);
        userData.put("id", userId);
        userData.put("telefono", phone);
        userData.put("fechaRegistro", System.currentTimeMillis());
        userData.put("rol", "usuario");
        userData.put("status", "active");
        userRef.setValue(userData).addOnFailureListener(e -> Log.e(TAG, "Error saving extra data: " + e.getMessage()));
    }
}

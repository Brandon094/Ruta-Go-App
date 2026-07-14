package com.chopcode.rutago.app.viewmodels.common;

import android.util.Log;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import com.chopcode.rutago.app.config.MyApp;
import com.chopcode.rutago.app.managers.core.notifications.NotificationManager;
import com.chopcode.rutago.app.services.auth.RegistrationService;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DatabaseReference;

import java.util.HashMap;
import java.util.Map;

/**
 * Registration ViewModel
 *
 * Especialista en el flujo de alta de nuevos pasajeros en el ecosistema.
 * Responsabilidades:
 * - Orquestar la creación de credenciales en la capa de Identidad (Firebase Auth).
 * - Sincronizar el perfil extendido en la base de datos distribuida (/usuarios/).
 * - Garantizar la disponibilidad del canal de notificaciones Push tras el alta.
 * - Gestionar estados visuales de progreso para la experiencia de usuario.
 */
public class RegistrationViewModel extends ViewModel {
    private static final String TAG = "RegistrationViewModel";

    /** Notifica a la vista que el proceso de registro terminó con éxito total. */
    private final MutableLiveData<Boolean> registrationSuccess = new MutableLiveData<>();
    
    /** Expone mensajes de error técnicos o de validación de negocio. */
    private final MutableLiveData<String> registrationError = new MutableLiveData<>();
    
    /** Controla la visibilidad del overlay de carga durante la transacción. */
    private final MutableLiveData<Boolean> isLoading = new MutableLiveData<>(false);

    private final RegistrationService registrationService;

    public RegistrationViewModel() {
        this.registrationService = new RegistrationService();
    }

    public LiveData<Boolean> getRegistrationSuccess() { return registrationSuccess; }
    public LiveData<String> getRegistrationError() { return registrationError; }
    public LiveData<Boolean> getIsLoading() { return isLoading; }

    /**
     * Inicia el proceso de registro asíncrono para un nuevo pasajero.
     */
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

    /**
     * Gestiona las acciones post-autenticación exitosa.
     */
    private void handleRegistrationSuccess(String name, String email, String phone) {
        FirebaseUser user = MyApp.getCurrentUser();
        if (user == null) {
            isLoading.postValue(false);
            registrationError.postValue("Error crítico: Sesión no encontrada tras el registro.");
            return;
        }

        String userId = user.getUid();
        saveExtraData(userId, name, email, phone);
        
        // Sincronización proactiva del token de notificaciones
        NotificationManager.getInstance(MyApp.getAppContext()).saveFCMTokenToRealtimeDatabase(userId, "usuarios");

        isLoading.postValue(false);
        registrationSuccess.postValue(true);
    }

    /**
     * Persiste los atributos de perfil en el nodo NoSQL correspondiente.
     */
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
        
        userRef.setValue(userData).addOnFailureListener(e -> Log.e(TAG, "❌ Error al persistir datos extra: " + e.getMessage()));
    }
}

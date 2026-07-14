package com.chopcode.rutago.app.viewmodels.passenger;

import android.util.Log;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import com.chopcode.rutago.app.config.MyApp;
import com.chopcode.rutago.app.models.User;
import com.chopcode.rutago.app.services.user.UserService;
import com.chopcode.rutago.app.R;

import java.util.HashMap;
import java.util.Map;

/**
 * Edit Profile ViewModel (Passenger)
 *
 * Gestor del flujo de actualización de información básica del pasajero.
 * Responsabilidades:
 * - Recuperar el estado actual del perfil para pre-cargar el formulario.
 * - Validar reglas de negocio sobre campos obligatorios (Nombre y Teléfono).
 * - Delegar al UserService la persistencia de cambios en el nodo /usuarios/.
 * - Proporcionar feedback reactivo sobre el éxito o fallo de la operación de edición.
 */
public class EditProfileViewModel extends ViewModel {
    private static final String TAG = "EditProfileVM";

    /** Datos actuales del usuario para inicializar la vista. */
    private final MutableLiveData<User> userData = new MutableLiveData<>();
    
    private final MutableLiveData<Boolean> isLoading = new MutableLiveData<>(false);
    
    /** Notifica el éxito de la transacción para cerrar la pantalla de edición. */
    private final MutableLiveData<Boolean> updateSuccess = new MutableLiveData<>(false);
    
    private final MutableLiveData<String> error = new MutableLiveData<>();

    private final UserService userService;

    public EditProfileViewModel() {
        this.userService = new UserService();
    }

    public LiveData<User> getUserData() { return userData; }
    public LiveData<Boolean> getIsLoading() { return isLoading; }
    public LiveData<Boolean> getUpdateSuccess() { return updateSuccess; }
    public LiveData<String> getError() { return error; }

    /**
     * Recupera la información de perfil del pasajero logueado.
     */
    public void loadUserProfile() {
        String userId = MyApp.getCurrentUserId();
        if (userId == null) {
            error.setValue(MyApp.getAppContext().getString(R.string.usuario_no_autenticado));
            return;
        }

        isLoading.setValue(true);
        userService.loadUserData(userId, new UserService.UserDataCallback() {
            @Override
            public void onUserDataLoaded(User usuario) {
                userData.postValue(usuario);
                isLoading.postValue(false);
            }

            @Override
            public void onError(String errorMsg) {
                Log.e(TAG, "❌ Error al cargar perfil: " + errorMsg);
                error.postValue(MyApp.getAppContext().getString(R.string.error_prefijo, errorMsg));
                isLoading.postValue(false);
            }
        });
    }

    /**
     * Ejecuta la validación y persistencia del nuevo perfil.
     * @param nuevoNombre Nombre actualizado del pasajero.
     * @param nuevoTelefono Número de contacto actualizado.
     */
    public void updateProfile(String nuevoNombre, String nuevoTelefono) {
        String userId = MyApp.getCurrentUserId();
        if (userId == null) {
            error.setValue(MyApp.getAppContext().getString(R.string.usuario_no_autenticado));
            return;
        }

        // Validaciones de integridad de datos
        if (nuevoNombre == null || nuevoNombre.trim().isEmpty()) {
            error.setValue(MyApp.getAppContext().getString(R.string.nombre_obligatorio));
            return;
        }

        if (nuevoTelefono == null || nuevoTelefono.trim().isEmpty()) {
            error.setValue(MyApp.getAppContext().getString(R.string.telefono_obligatorio));
            return;
        }

        isLoading.setValue(true);
        Log.d(TAG, "🔄 Persistiendo cambios de perfil para: " + userId);

        userService.updateUserProfile(userId, nuevoNombre, nuevoTelefono, new UserService.UserUpdateCallback() {
            @Override
            public void onSuccess() {
                updateSuccess.postValue(true);
                isLoading.postValue(false);
            }

            @Override
            public void onError(String errorMsg) {
                Log.e(TAG, "❌ Fallo en la actualización: " + errorMsg);
                error.postValue(MyApp.getAppContext().getString(R.string.error_actualizar, errorMsg));
                isLoading.postValue(false);
            }
        });
    }
}

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
 * 📝 Edit Profile ViewModel (Passenger)
 * 
 * Gestiona la lógica de negocio para la edición del perfil de usuario.
 * Responsabilidades:
 * - Recuperar la información actual del pasajero.
 * - Validar que los campos obligatorios no estén vacíos.
 * - Coordinar con el servicio de usuario para persistir los cambios en Firebase.
 */
public class EditProfileViewModel extends ViewModel {
    private static final String TAG = "EditProfileVM";

    private final MutableLiveData<User> userData = new MutableLiveData<>();
    private final MutableLiveData<Boolean> isLoading = new MutableLiveData<>(false);
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
     * Carga los datos del perfil del usuario actual.
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
                Log.e(TAG, "Error cargando datos: " + errorMsg);
                error.postValue(MyApp.getAppContext().getString(R.string.error_prefijo, errorMsg));
                isLoading.postValue(false);
            }
        });
    }

    /**
     * Actualiza el perfil del usuario con los nuevos datos.
     */
    public void updateProfile(String nuevoNombre, String nuevoTelefono) {
        String userId = MyApp.getCurrentUserId();
        if (userId == null) {
            error.setValue(MyApp.getAppContext().getString(R.string.usuario_no_autenticado));
            return;
        }

        if (nuevoNombre == null || nuevoNombre.isEmpty()) {
            error.setValue(MyApp.getAppContext().getString(R.string.nombre_obligatorio));
            return;
        }

        if (nuevoTelefono == null || nuevoTelefono.isEmpty()) {
            error.setValue(MyApp.getAppContext().getString(R.string.telefono_obligatorio));
            return;
        }

        isLoading.setValue(true);
        Log.d(TAG, "🔄 Actualizando perfil para: " + userId);

        userService.updateUserProfile(userId, nuevoNombre, nuevoTelefono, new UserService.UserUpdateCallback() {
            @Override
            public void onSuccess() {
                Log.d(TAG, "✅ Perfil actualizado correctamente");
                updateSuccess.postValue(true);
                isLoading.postValue(false);
            }

            @Override
            public void onError(String errorMsg) {
                Log.e(TAG, "❌ Error al actualizar: " + errorMsg);
                error.postValue(MyApp.getAppContext().getString(R.string.error_actualizar, errorMsg));
                isLoading.postValue(false);
            }
        });
    }
}

package com.chopcode.rutago.app.viewmodels.common;

import android.app.Activity;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import com.chopcode.rutago.app.managers.core.auth.AuthManager;
import com.chopcode.rutago.app.viewmodels.BaseViewModel;

/**
 * BottomNav ViewModel
 *
 * Orquestador de las acciones globales vinculadas a la navegación inferior.
 * Responsabilidades:
 * - Gestionar el ciclo de vida de la sesión (Sign-Out) de forma segura.
 * - Centralizar eventos de telemetría relacionados con la desconexión del usuario.
 * - Coordinar la limpieza de estados locales tras la salida del sistema.
 */
public class BottomNavViewModel extends BaseViewModel {
    
    /** Notifica a la actividad que el proceso de logout terminó correctamente. */
    private final MutableLiveData<Boolean> logoutSuccess = new MutableLiveData<>();
    private final AuthManager authManager;

    public BottomNavViewModel() {
        this.authManager = AuthManager.getInstance();
    }

    public LiveData<Boolean> getLogoutSuccess() {
        return logoutSuccess;
    }

    /**
     * Ejecuta el cierre de sesión atómico.
     * Limpia las credenciales de Firebase Auth y los metadatos locales (SharedPreferences).
     * @param activity Actividad que invoca la salida (requerida para limpiar Google One Tap).
     */
    public void logout(Activity activity) {
        setLoading(true);
        try {
            authManager.signOut(activity);
            logoutSuccess.postValue(true);
            
            // Registro de métrica de cierre de sesión
            registrarEventoAnalitico("logout", null, null);
            
        } catch (Exception e) {
            setError("Error al cerrar sesión: " + e.getMessage());
            logoutSuccess.postValue(false);
        } finally {
            setLoading(false);
        }
    }
}

package com.chopcode.rutago.app.viewmodels.common;

import android.app.Activity;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import com.chopcode.rutago.app.managers.auths.AuthManager;
import com.chopcode.rutago.app.viewmodels.BaseViewModel;

/**
 * 🧭 BottomNavViewModel
 * 
 * Gestiona la lógica de negocio para la barra de navegación inferior,
 * como el proceso de cierre de sesión y eventos de navegación.
 */
public class BottomNavViewModel extends BaseViewModel {
    
    private final MutableLiveData<Boolean> logoutSuccess = new MutableLiveData<>();
    private final AuthManager authManager;

    public BottomNavViewModel() {
        this.authManager = AuthManager.getInstance();
    }

    public LiveData<Boolean> getLogoutSuccess() {
        return logoutSuccess;
    }

    /**
     * Ejecuta el proceso de cierre de sesión.
     * @param activity Actividad desde la cual se solicita el cierre.
     */
    public void logout(Activity activity) {
        setLoading(true);
        try {
            authManager.signOut(activity);
            logoutSuccess.postValue(true);
            registrarEventoAnalitico("logout", null, null);
        } catch (Exception e) {
            setError(e.getMessage());
            logoutSuccess.postValue(false);
        } finally {
            setLoading(false);
        }
    }
}

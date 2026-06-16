package com.chopcode.rutago.app.viewmodels.common;

import android.app.Application;
import android.content.Context;
import android.content.SharedPreferences;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import com.chopcode.rutago.app.config.MyApp;
import com.google.firebase.auth.FirebaseUser;

/**
 * ViewModel para la pantalla de Splash.
 * 
 * Responsabilidades:
 * - Verificar el estado de la sesión del usuario.
 * - Determinar el destino de navegación (Login o Dashboard correspondiente).
 */
public class SplashViewModel extends AndroidViewModel {
    private static final String TAG = "SplashVM";

    private final MutableLiveData<String> navigationTarget = new MutableLiveData<>();
    
    private static final String PREFS_NAME = "UserPrefs";
    private static final String KEY_USER_ID = "user_id";
    private static final String KEY_USER_TYPE = "user_type";

    public SplashViewModel(@NonNull Application application) {
        super(application);
    }

    public LiveData<String> getNavigationTarget() {
        return navigationTarget;
    }

    /**
     * Verifica si existe una sesión válida y decide a dónde navegar.
     */
    public void checkSessionStatus() {
        SharedPreferences prefs = getApplication().getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        String savedUserId = prefs.getString(KEY_USER_ID, null);
        String savedUserType = prefs.getString(KEY_USER_TYPE, null);

        FirebaseUser currentUser = MyApp.getCurrentUser();

        if (currentUser != null && savedUserId != null && currentUser.getUid().equals(savedUserId) && savedUserType != null) {
            Log.d(TAG, "✅ Sesión válida encontrada para: " + savedUserType);
            navigationTarget.setValue(savedUserType);
        } else {
            Log.d(TAG, "ℹ️ No se encontró sesión activa o es inconsistente. Redirigiendo a Login.");
            navigationTarget.setValue("login");
        }
    }
}

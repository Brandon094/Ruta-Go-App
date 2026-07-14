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
import com.chopcode.rutago.app.services.audit.ArchiveService;
import com.google.firebase.auth.FirebaseUser;

/**
 * Splash ViewModel
 *
 * Orquestador del flujo de entrada a la aplicación.
 * Responsabilidades:
 * - Validación de consistencia entre sesión local (SharedPreferences) y remota (Firebase Auth).
 * - Determinación inteligente del destino de navegación (DriverHome, PassengerHome o Login).
 * - Disparo de tareas de mantenimiento asíncronas (Archivado de reservas obsoletas).
 */
public class SplashViewModel extends AndroidViewModel {
    private static final String TAG = "SplashVM";

    /** Notifica a la Vista el destino final de navegación. */
    private final MutableLiveData<String> navigationTarget = new MutableLiveData<>();
    
    private final ArchiveService archiveService;
    
    private static final String PREFS_NAME = "UserPrefs";
    private static final String KEY_USER_ID = "user_id";
    private static final String KEY_USER_TYPE = "user_type";

    public SplashViewModel(@NonNull Application application) {
        super(application);
        this.archiveService = new ArchiveService();
    }

    public LiveData<String> getNavigationTarget() {
        return navigationTarget;
    }

    /**
     * Realiza el chequeo de salud de la sesión y decide el siguiente paso.
     * Si los datos locales coinciden con los remotos, permite el autologin.
     */
    public void checkSessionStatus() {
        // Ejecución de barrido de datos para optimización de Realtime Database
        runArchiveSweep();

        SharedPreferences prefs = getApplication().getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        String savedUserId = prefs.getString(KEY_USER_ID, null);
        String savedUserType = prefs.getString(KEY_USER_TYPE, null);

        FirebaseUser currentUser = MyApp.getCurrentUser();

        if (currentUser != null && savedUserId != null && currentUser.getUid().equals(savedUserId) && savedUserType != null) {
            Log.d(TAG, "✅ Consistencia de sesión validada para: " + savedUserType);
            navigationTarget.setValue(savedUserType);
        } else {
            Log.d(TAG, "ℹ️ Sesión nula o inconsistente. Requiere autenticación manual.");
            navigationTarget.setValue("login");
        }
    }

    /**
     * Delega al ArchiveService la limpieza de registros antiguos para mantener la base de datos ligera.
     */
    private void runArchiveSweep() {
        archiveService.runReservationSweep(new ArchiveService.ArchiveCallback() {
            @Override public void onArchiveComplete(int movedCount) { Log.d(TAG, "🧹 Mantenimiento exitoso: " + movedCount + " registros procesados."); }
            @Override public void onError(String error) { Log.e(TAG, "🧹 Fallo en mantenimiento preventivo: " + error); }
        });
    }
}

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
 * ViewModel para la pantalla de Splash.
 * 
 * Responsabilidades:
 * - Verificar el estado de la sesión del usuario.
 * - Determinar el destino de navegación (Login o Dashboard correspondiente).
 * - Ejecutar tareas de mantenimiento (archivado de datos).
 */
public class SplashViewModel extends AndroidViewModel {
    private static final String TAG = "SplashVM";

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
     * Verifica si existe una sesión válida y decide a dónde navegar.
     * También dispara tareas de mantenimiento ligeras.
     */
    public void checkSessionStatus() {
        // Disparar limpieza de reservas antiguas (Hito 2 del Roadmap)
        runArchiveSweep();

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

    private void runArchiveSweep() {
        archiveService.runReservationSweep(new ArchiveService.ArchiveCallback() {
            @Override public void onArchiveComplete(int movedCount) { Log.d(TAG, "🧹 Limpieza terminada: " + movedCount + " reservadas archivadas."); }
            @Override public void onError(String error) { Log.e(TAG, "🧹 Error en limpieza: " + error); }
        });
    }
}

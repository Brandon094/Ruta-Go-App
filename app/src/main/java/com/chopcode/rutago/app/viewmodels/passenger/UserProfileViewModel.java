package com.chopcode.rutago.app.viewmodels.passenger;

import android.net.Uri;
import android.util.Log;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import com.chopcode.rutago.app.config.MyApp;
import com.chopcode.rutago.app.managers.core.auth.AuthManager;
import com.chopcode.rutago.app.models.User;
import com.chopcode.rutago.app.services.reservations.passenger.PassengerReservationService;
import com.chopcode.rutago.app.services.storage.StorageService;
import com.chopcode.rutago.app.services.user.UserService;
import com.google.firebase.database.ValueEventListener;

import java.util.Map;

/**
 * User Profile ViewModel (Passenger)
 *
 * Gestor reactivo para la identidad y métricas personales del pasajero.
 * Responsabilidades:
 * - Mantener una suscripción en tiempo real al perfil del usuario en /usuarios/.
 * - Orquestar el cálculo de estadísticas de fidelización (Premium Stats).
 * - Gestionar la carga de avatares a Firebase Storage y su posterior vinculación a la DB.
 * - Implementar el flujo legal de eliminación de cuenta y cambio de estado de actividad.
 * - Sincronizar el ID de usuario autenticado mediante el AuthManager.
 */
public class UserProfileViewModel extends ViewModel {
    private static final String TAG = "UserProfileVM";

    private final MutableLiveData<User> userData = new MutableLiveData<>();
    
    /** Métricas acumuladas de fidelización (Inversión total, Puntos, Rutas favoritas). */
    private final MutableLiveData<Map<String, Object>> premiumStats = new MutableLiveData<>();
    
    private final MutableLiveData<Boolean> isLoading = new MutableLiveData<>(false);
    private final MutableLiveData<Boolean> isStatsLoading = new MutableLiveData<>(false);
    private final MutableLiveData<String> uploadStatus = new MutableLiveData<>();
    private final MutableLiveData<String> error = new MutableLiveData<>();
    private final MutableLiveData<Boolean> accountDeletionSuccess = new MutableLiveData<>(false);

    private final UserService userService;
    private final StorageService storageService;
    private final PassengerReservationService passengerReservationService;
    private final AuthManager authManager;
    private ValueEventListener userListener;

    public UserProfileViewModel() {
        this.userService = new UserService();
        this.storageService = new StorageService();
        this.passengerReservationService = new PassengerReservationService();
        this.authManager = AuthManager.getInstance();
    }

    public LiveData<User> getUserData() { return userData; }
    public LiveData<Map<String, Object>> getPremiumStats() { return premiumStats; }
    public LiveData<Boolean> getIsLoading() { return isLoading; }
    public LiveData<Boolean> getIsStatsLoading() { return isStatsLoading; }
    public LiveData<String> getUploadStatus() { return uploadStatus; }
    public LiveData<String> getError() { return error; }
    public LiveData<Boolean> getAccountDeletionSuccess() { return accountDeletionSuccess; }

    /**
     * Activa la escucha reactiva del perfil del pasajero.
     * Al cargar los datos, dispara automáticamente la actualización de estadísticas.
     */
    public void loadProfile() {
        String userId = authManager.getUserId();
        if (userId == null) return;

        if (userListener != null) return;

        isLoading.setValue(true);
        userListener = userService.listenToUserData(userId, new UserService.UserDataCallback() {
            @Override public void onUserDataLoaded(User user) { 
                user.setId(userId);
                userData.postValue(user); 
                isLoading.postValue(false); 
                loadPremiumStats(userId); 
            }
            @Override public void onError(String errorMsg) { error.postValue(errorMsg); isLoading.postValue(false); }
        });
    }

    /**
     * Calcula métricas de uso históricas para el programa de fidelización.
     */
    private void loadPremiumStats(String userId) {
        isStatsLoading.setValue(true);
        passengerReservationService.getPremiumStats(userId, new PassengerReservationService.PremiumStatsCallback() {
            @Override public void onStatsCalculated(Map<String, Object> stats) { premiumStats.postValue(stats); isStatsLoading.postValue(false); }
            @Override public void onError(String errorMsg) { Log.e(TAG, "❌ Error al calcular estadísticas: " + errorMsg); isStatsLoading.postValue(false); }
        });
    }

    /**
     * Sube una nueva fotografía de perfil.
     */
    public void uploadProfilePicture(Uri uri) {
        String userId = authManager.getUserId();
        if (userId == null) return;
        uploadStatus.setValue("Uploading...");
        storageService.uploadProfilePicture(userId, uri, new StorageService.UploadCallback() {
            @Override public void onSuccess(String downloadUrl) { updateProfilePictureUrl(userId, downloadUrl); }
            @Override public void onError(String errorMsg) { error.postValue("Upload error: " + errorMsg); uploadStatus.postValue(null); }
            @Override public void onProgress(double progress) {}
        });
    }

    private void updateProfilePictureUrl(String userId, String downloadUrl) {
        userService.updateProfilePicture(userId, downloadUrl, "usuarios", new UserService.UserUpdateCallback() {
            @Override public void onSuccess() { uploadStatus.postValue("Updated"); }
            @Override public void onError(String errorMsg) { error.postValue("DB error: " + errorMsg); uploadStatus.postValue(null); }
        });
    }

    /**
     * Inicia el proceso de borrado con periodo de gracia.
     */
    public void requestAccountDeletion() {
        String userId = authManager.getUserId();
        if (userId == null) return;
        userService.requestAccountDeletion(userId, "usuarios", new UserService.UserUpdateCallback() {
            @Override public void onSuccess() { accountDeletionSuccess.postValue(true); }
            @Override public void onError(String errorMsg) { error.postValue(errorMsg); }
        });
    }

    /**
     * Reinstaura una cuenta que estaba marcada para eliminación.
     */
    public void cancelAccountDeletion() {
        String userId = authManager.getUserId();
        if (userId == null) return;
        isLoading.setValue(true);
        userService.cancelAccountDeletion(userId, "usuarios", new UserService.UserUpdateCallback() {
            @Override public void onSuccess() { isLoading.postValue(false); }
            @Override public void onError(String errorMsg) { error.postValue(errorMsg); isLoading.postValue(false); }
        });
    }

    /**
     * Cambia el estado del pasajero (Activo/Inactivo).
     * No disponible si la cuenta está bloqueada administrativamente.
     */
    public void toggleUserStatus() {
        User current = userData.getValue();
        if (current == null || "blocked".equals(current.getStatus())) return;
        String newStatus = "active".equals(current.getStatus()) ? "inactive" : "active";
        String userId = authManager.getUserId();
        if (userId == null) return;
        isLoading.postValue(true);
        userService.updateUserStatus(userId, newStatus, new UserService.UserUpdateCallback() {
            @Override public void onSuccess() { isLoading.postValue(false); }
            @Override public void onError(String errorMsg) { error.postValue(errorMsg); isLoading.postValue(false); }
        });
    }

    @Override
    protected void onCleared() {
        super.onCleared();
        if (userListener != null) {
            String uid = authManager.getUserId();
            if (uid != null) {
                MyApp.getDatabaseReference("usuarios/" + uid).removeEventListener(userListener);
                Log.d(TAG, "🧹 Listener de perfil de pasajero removido.");
            }
        }
    }
}

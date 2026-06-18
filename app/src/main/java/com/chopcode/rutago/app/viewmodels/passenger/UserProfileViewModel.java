package com.chopcode.rutago.app.viewmodels.passenger;

import android.net.Uri;
import android.util.Log;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import com.chopcode.rutago.app.managers.auths.AuthManager;
import com.chopcode.rutago.app.models.User;
import com.chopcode.rutago.app.services.reservations.passenger.PassengerReservationService;
import com.chopcode.rutago.app.services.storage.StorageService;
import com.chopcode.rutago.app.services.user.UserService;

import java.util.Map;

/**
 * 👤 User Profile ViewModel (Passenger)
 * 
 * Gestiona el estado y la lógica de negocio para la pantalla de perfil del pasajero.
 * Responsabilidades:
 * - Cargar datos de perfil y estadísticas Premium (calculadas mediante el servicio de reservas).
 * - Orquestar la subida de imágenes de perfil integrando Storage y Realtime Database.
 * - Gestionar solicitudes de borrado de cuenta para cumplimiento de privacidad.
 */
public class UserProfileViewModel extends ViewModel {
    private static final String TAG = "UserProfileVM";

    private final MutableLiveData<User> userData = new MutableLiveData<>();
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

    public void loadProfile() {
        String userId = authManager.getUserId();
        if (userId == null) return;
        isLoading.setValue(true);
        userService.loadUserData(userId, new UserService.UserDataCallback() {
            @Override public void onUserDataLoaded(User user) { userData.postValue(user); isLoading.postValue(false); loadPremiumStats(userId); }
            @Override public void onError(String errorMsg) { error.postValue(errorMsg); isLoading.postValue(false); }
        });
    }

    private void loadPremiumStats(String userId) {
        isStatsLoading.setValue(true);
        passengerReservationService.getPremiumStats(userId, new PassengerReservationService.PremiumStatsCallback() {
            @Override public void onStatsCalculated(Map<String, Object> stats) { premiumStats.postValue(stats); isStatsLoading.postValue(false); }
            @Override public void onError(String errorMsg) { Log.e(TAG, "Error stats: " + errorMsg); isStatsLoading.postValue(false); }
        });
    }

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
            @Override public void onSuccess() { loadProfile(); uploadStatus.postValue("Updated"); }
            @Override public void onError(String errorMsg) { error.postValue("DB error: " + errorMsg); uploadStatus.postValue(null); }
        });
    }

    public void requestAccountDeletion() {
        String userId = authManager.getUserId();
        if (userId == null) return;
        userService.requestAccountDeletion(userId, new UserService.UserUpdateCallback() {
            @Override public void onSuccess() { accountDeletionSuccess.postValue(true); }
            @Override public void onError(String errorMsg) { error.postValue(errorMsg); }
        });
    }

    /**
     * Alterna el estado del usuario entre "active" e "inactive".
     */
    public void toggleUserStatus() {
        User current = userData.getValue();
        if (current == null || "blocked".equals(current.getStatus())) return;

        String newStatus = "active".equals(current.getStatus()) ? "inactive" : "active";
        String userId = authManager.getUserId();
        if (userId == null) return;

        setLoading(true);
        userService.updateUserStatus(userId, newStatus, new UserService.UserUpdateCallback() {
            @Override
            public void onSuccess() {
                current.setStatus(newStatus);
                userData.postValue(current);
                setLoading(false);
            }

            @Override
            public void onError(String errorMsg) {
                error.postValue(errorMsg);
                setLoading(false);
            }
        });
    }

    private void setLoading(boolean loading) {
        isLoading.postValue(loading);
    }
}

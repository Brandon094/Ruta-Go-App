package com.chopcode.rutago.app.viewmodels.common;

import android.app.Activity;
import android.content.Intent;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import com.chopcode.rutago.app.config.MyApp;
import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.services.auth.EmailLoginService;
import com.chopcode.rutago.app.services.auth.GoogleLoginService;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DatabaseReference;

/**
 * 🔑 Login ViewModel
 * 
 * Gestiona la lógica de autenticación de usuarios.
 * Permite el acceso incluso si existe una solicitud de borrado pendiente.
 */
public class LoginViewModel extends ViewModel {
    private static final String TAG = "LoginViewModel";

    private final MutableLiveData<String> loginSuccess = new MutableLiveData<>();
    private final MutableLiveData<String> loginError = new MutableLiveData<>();
    private final MutableLiveData<Boolean> isLoading = new MutableLiveData<>(false);

    private EmailLoginService emailLoginService;
    private GoogleLoginService googleLoginService;

    public LiveData<String> getLoginSuccess() { return loginSuccess; }
    public LiveData<String> getLoginError() { return loginError; }
    public LiveData<Boolean> getIsLoading() { return isLoading; }

    public void init(Activity activity) {
        if (emailLoginService == null) emailLoginService = new EmailLoginService(activity);
        if (googleLoginService == null) googleLoginService = new GoogleLoginService(activity);
    }

    public void loginWithEmail(String email, String password) {
        isLoading.setValue(true);
        emailLoginService.login(email, password, new EmailLoginService.LoginCallback() {
            @Override public void onLoginSuccess(String userType) { syncFCMToken(userType); }
            @Override public void onLoginFailure(String error) { 
                isLoading.postValue(false); 
                loginError.postValue(error); 
            }
        });
    }

    public void loginWithGoogle() {
        isLoading.setValue(true);
        googleLoginService.startSignInFlow(new GoogleLoginService.LoginCallback() {
            @Override public void onLoginSuccess(String userType) { syncFCMToken(userType); }
            @Override public void onLoginFailure(String error) { 
                isLoading.postValue(false); 
                loginError.postValue(error); 
            }
        });
    }

    public void handleGoogleResult(Intent data) {
        isLoading.setValue(true);
        googleLoginService.handleSignInResult(data, new GoogleLoginService.LoginCallback() {
            @Override public void onLoginSuccess(String userType) { syncFCMToken(userType); }
            @Override public void onLoginFailure(String error) { 
                isLoading.postValue(false); 
                loginError.postValue(error); 
            }
        });
    }

    /**
     * Sincroniza el token FCM únicamente en el nodo correspondiente al rol del usuario.
     */
    private void syncFCMToken(String userType) {
        FirebaseUser user = MyApp.getCurrentUser();
        if (user == null) {
            isLoading.postValue(false);
            loginError.postValue(MyApp.getAppContext().getString(R.string.error_session_not_found));
            return;
        }

        String userId = user.getUid();
        String node = ("driver".equalsIgnoreCase(userType) || "conductor".equalsIgnoreCase(userType)) ? "conductores" : "usuarios";

        MyApp.getInstance().getFirebaseMessaging().getToken().addOnCompleteListener(task -> {
            if (task.isSuccessful() && task.getResult() != null) {
                String token = task.getResult();
                // 🛡️ SEGURIDAD: Solo escribir en el nodo que corresponde según el rol
                MyApp.getDatabaseReference(node + "/" + userId + "/tokenFCM").setValue(token);
            }
            loginSuccess.postValue(userType);
            isLoading.postValue(false);
        });
    }
}

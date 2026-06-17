package com.chopcode.rutago.app.viewmodels.common;

import android.app.Activity;
import android.content.Intent;
import android.util.Log;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import com.chopcode.rutago.app.config.MyApp;
import com.chopcode.rutago.app.services.auth.EmailLoginService;
import com.chopcode.rutago.app.services.auth.GoogleLoginService;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DatabaseReference;

/**
 * 🔑 Login ViewModel
 * 
 * Gestiona la lógica de negocio para la autenticación de usuarios.
 * Refactorizado para separar responsabilidades entre Email y Google.
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
        if (emailLoginService == null) {
            emailLoginService = new EmailLoginService(activity);
        }
        if (googleLoginService == null) {
            googleLoginService = new GoogleLoginService(activity);
        }
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

    private void syncFCMToken(String userType) {
        FirebaseUser user = MyApp.getCurrentUser();
        if (user == null) {
            isLoading.postValue(false);
            loginError.postValue("Error: Session not found after login");
            return;
        }

        String userId = user.getUid();
        MyApp.getInstance().getFirebaseMessaging().getToken().addOnCompleteListener(task -> {
            if (task.isSuccessful() && task.getResult() != null) {
                String token = task.getResult();
                DatabaseReference baseRef = MyApp.getDatabaseReference("");
                baseRef.child("usuarios").child(userId).child("tokenFCM").setValue(token);
                if ("driver".equalsIgnoreCase(userType) || "conductor".equalsIgnoreCase(userType)) {
                    baseRef.child("conductores").child(userId).child("tokenFCM").setValue(token);
                }
                loginSuccess.postValue(userType);
            } else {
                loginSuccess.postValue(userType);
            }
            isLoading.postValue(false);
        });
    }
}

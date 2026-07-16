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
 * Login ViewModel
 *
 * Orquestador de los flujos de autenticación (Email y Google One Tap).
 * Responsabilidades:
 * - Coordinar el inicio de sesión con servicios especializados.
 * - Asegurar la persistencia y sincronización del token de notificaciones FCM.
 * - Gestionar el estado de carga y comunicación de errores a la interfaz de usuario.
 */
public class LoginViewModel extends ViewModel {
    private static final String TAG = "LoginViewModel";

    /** Notifica el éxito del login y el tipo de rol detectado (driver/passenger). */
    private final MutableLiveData<String> loginSuccess = new MutableLiveData<>();
    
    /** Notifica mensajes de error descriptivos traducidos. */
    private final MutableLiveData<String> loginError = new MutableLiveData<>();
    
    /** Estado reactivo para el control del overlay de carga. */
    private final MutableLiveData<Boolean> isLoading = new MutableLiveData<>(false);

    private EmailLoginService emailLoginService;
    private GoogleLoginService googleLoginService;

    public LiveData<String> getLoginSuccess() { return loginSuccess; }
    public LiveData<String> getLoginError() { return loginError; }
    public LiveData<Boolean> getIsLoading() { return isLoading; }

    /**
     * Inicializa los servicios de autenticación con el contexto de la actividad.
     * @param activity Contexto necesario para el flujo de Google One Tap.
     */
    public void init(Activity activity) {
        if (emailLoginService == null) emailLoginService = new EmailLoginService(activity);
        if (googleLoginService == null) googleLoginService = new GoogleLoginService(activity);
    }

    /**
     * Ejecuta el flujo de login tradicional.
     */
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

    /**
     * Dispara el selector de cuentas de Google One Tap.
     */
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

    /**
     * Procesa el resultado devuelto por el flujo de Google.
     */
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
     * 🛡️ Seguridad y Sincronización:
     * Obtiene el token de Firebase Messaging y lo guarda exclusivamente en el nodo 
     * correspondiente al rol detectado para evitar conflictos de validación en la base de datos.
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
                // Escritura atómica del token en el perfil del usuario
                MyApp.getDatabaseReference(node + "/" + userId + "/tokenFCM").setValue(token);
            }
            loginSuccess.postValue(userType);
            isLoading.postValue(false);
        });
    }
}

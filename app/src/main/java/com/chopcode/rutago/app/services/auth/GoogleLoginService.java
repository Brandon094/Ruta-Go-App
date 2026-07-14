package com.chopcode.rutago.app.services.auth;

import android.app.Activity;
import android.content.Intent;
import android.content.IntentSender;
import androidx.annotation.NonNull;
import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.config.MyApp;
import com.google.android.gms.auth.api.identity.BeginSignInRequest;
import com.google.android.gms.auth.api.identity.Identity;
import com.google.android.gms.auth.api.identity.SignInClient;
import com.google.android.gms.auth.api.identity.SignInCredential;
import com.google.android.gms.common.api.ApiException;
import com.google.android.gms.common.api.CommonStatusCodes;
import com.google.firebase.auth.AuthCredential;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.auth.GoogleAuthProvider;

/**
 * Google Login Service
 *
 * Implementación de autenticación moderna mediante Google One Tap.
 * Responsabilidades:
 * - Orquestar el flujo de "Un Toque" para la selección de cuenta de Google.
 * - Validar el ID Token contra los servidores de Firebase Auth.
 * - Realizar la detección de rol post-login.
 * - Asegurar el registro automático ("Auto-Join") para nuevos usuarios sociales.
 */
public class GoogleLoginService {

    /** Código de solicitud para identificar el resultado de la actividad de One Tap. */
    public static final int REQ_ONE_TAP = 123;
    
    private final FirebaseAuth auth;
    private final Activity activity;
    private final SignInClient oneTapClient;
    private final BeginSignInRequest signInRequest;
    private final UserRoleService userRoleService;
    private final RegistrationService registrationService;

    public interface LoginCallback {
        void onLoginSuccess(String userType);
        void onLoginFailure(String error);
    }

    public GoogleLoginService(Activity activity) {
        this.activity = activity;
        this.auth = MyApp.getInstance().getFirebaseAuth();
        this.oneTapClient = Identity.getSignInClient(activity);
        this.userRoleService = new UserRoleService();
        this.registrationService = new RegistrationService();
        
        // Configuración estricta del cliente de Google para la suite "Go"
        this.signInRequest = BeginSignInRequest.builder()
                .setGoogleIdTokenRequestOptions(
                        BeginSignInRequest.GoogleIdTokenRequestOptions.builder()
                                .setSupported(true)
                                .setServerClientId("175264872585-abombvqq36bqqeet86onnhkf7uep6c60.apps.googleusercontent.com")
                                .setFilterByAuthorizedAccounts(false)
                                .build())
                .build();
    }

    /**
     * Lanza la interfaz nativa de selección de cuenta de Google.
     */
    public void startSignInFlow(@NonNull LoginCallback callback) {
        oneTapClient.beginSignIn(signInRequest)
                .addOnSuccessListener(activity, result -> {
                    try {
                        activity.startIntentSenderForResult(result.getPendingIntent().getIntentSender(), REQ_ONE_TAP, null, 0, 0, 0, null);
                    } catch (IntentSender.SendIntentException e) { callback.onLoginFailure(e.getMessage()); }
                })
                .addOnFailureListener(activity, e -> callback.onLoginFailure(e.getMessage()));
    }

    /**
     * Procesa la credencial devuelta por el sistema y autentica en Firebase.
     * @param data Intent devuelto por onActivityResult.
     */
    public void handleSignInResult(Intent data, @NonNull LoginCallback callback) {
        try {
            SignInCredential credential = oneTapClient.getSignInCredentialFromIntent(data);
            String idToken = credential.getGoogleIdToken();
            if (idToken != null) {
                AuthCredential firebaseCredential = GoogleAuthProvider.getCredential(idToken, null);
                auth.signInWithCredential(firebaseCredential).addOnCompleteListener(activity, task -> {
                    if (task.isSuccessful()) {
                        FirebaseUser user = auth.getCurrentUser();
                        if (user != null) {
                            userRoleService.detectUserType(user, new UserRoleService.UserTypeCallback() {
                                @Override public void onTypeDetected(String type) { callback.onLoginSuccess(type); }
                                @Override public void onError(String error) {
                                    // Nuevo usuario social: Se aprovisiona como Pasajero automáticamente
                                    registrationService.guardarUserSiNoExiste(user, new RegistrationService.RegistrationCallback() {
                                        @Override public void onSuccess() { callback.onLoginSuccess("passenger"); }
                                        @Override public void onFailure(String err) { callback.onLoginFailure(err); }
                                    });
                                }
                            });
                        }
                    } else {
                        String errorMsg = task.getException() != null ? 
                                task.getException().getMessage() : 
                                MyApp.getAppContext().getString(R.string.error_carga_datos);
                        callback.onLoginFailure(errorMsg);
                    }
                });
            }
        } catch (ApiException e) {
            if (e.getStatusCode() == CommonStatusCodes.CANCELED) {
                callback.onLoginFailure("CANCELED_BY_USER");
            } else {
                callback.onLoginFailure("Google Auth Error: " + e.getMessage());
            }
        } catch (Exception e) {
            callback.onLoginFailure(e.getMessage());
        }
    }
}

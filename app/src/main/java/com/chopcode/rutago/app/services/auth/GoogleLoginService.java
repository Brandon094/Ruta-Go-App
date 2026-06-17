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
import com.google.firebase.auth.AuthCredential;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.auth.GoogleAuthProvider;

/**
 * 🌐 Google Login Service
 * 
 * Gestiona la autenticación mediante Google One Tap.
 * Se encarga de iniciar el flujo de selección de cuenta, procesar la credencial
 * y asegurar que el usuario esté registrado en la base de datos.
 */
public class GoogleLoginService {

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
        this.signInRequest = BeginSignInRequest.builder()
                .setGoogleIdTokenRequestOptions(
                        BeginSignInRequest.GoogleIdTokenRequestOptions.builder()
                                .setSupported(true)
                                .setServerClientId(activity.getString(R.string.default_web_client_id))
                                .setFilterByAuthorizedAccounts(false)
                                .build())
                .build();
    }

    public void startSignInFlow(@NonNull LoginCallback callback) {
        oneTapClient.beginSignIn(signInRequest)
                .addOnSuccessListener(activity, result -> {
                    try {
                        activity.startIntentSenderForResult(result.getPendingIntent().getIntentSender(), REQ_ONE_TAP, null, 0, 0, 0, null);
                    } catch (IntentSender.SendIntentException e) { callback.onLoginFailure(e.getMessage()); }
                })
                .addOnFailureListener(activity, e -> callback.onLoginFailure(e.getMessage()));
    }

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
                                    // Nuevo usuario de Google -> Pasajero por defecto
                                    registrationService.guardarUserSiNoExiste(user, new RegistrationService.RegistrationCallback() {
                                        @Override public void onSuccess() { callback.onLoginSuccess("passenger"); }
                                        @Override public void onFailure(String err) { callback.onLoginFailure(err); }
                                    });
                                }
                            });
                        }
                    } else {
                        String errorMsg = task.getException() != null ? task.getException().getMessage() : MyApp.getAppContext().getString(R.string.error_carga_datos);
                        callback.onLoginFailure(errorMsg);
                    }
                });
            }
        } catch (Exception e) { callback.onLoginFailure(e.getMessage()); }
    }
}

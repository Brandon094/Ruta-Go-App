package com.chopcode.rutago.app.services.auth;

import android.app.Activity;
import android.content.Intent;
import android.content.IntentSender;
import android.util.Log;

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
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.ValueEventListener;

import androidx.annotation.NonNull;

/**
 * 🔐 Login Service
 * 
 * Este servicio gestiona el ciclo de vida de la autenticación (Email/Google).
 * Su característica más crítica es el "Motor de Detección de Rol", que analiza
 * los nodos de Firebase para decidir si el usuario es un Conductor o un Pasajero.
 */
public class LoginService {
    private static final String TAG = "LoginService";

    private FirebaseAuth auth;
    private Activity activity;
    private SignInClient oneTapClient;
    private BeginSignInRequest signInRequest;
    private RegistrationService registrationService;
    public static final int REQ_ONE_TAP = 123;

    public interface LoginCallback {
        void onLoginSuccess(String userType);
        void onLoginFailure(String error);
    }

    public interface UserTypeCallback {
        void onTypeDetected(String type);
        void onError(String error);
    }

    public LoginService(Activity activity) {
        this.activity = activity;
        this.auth = MyApp.getInstance().getFirebaseAuth();
        this.registrationService = new RegistrationService();
        this.oneTapClient = Identity.getSignInClient(activity);
        this.signInRequest = BeginSignInRequest.builder()
                .setGoogleIdTokenRequestOptions(
                        BeginSignInRequest.GoogleIdTokenRequestOptions.builder()
                                .setSupported(true)
                                .setServerClientId(activity.getString(R.string.default_web_client_id))
                                .setFilterByAuthorizedAccounts(false)
                                .build())
                .build();
    }

    /**
     * 🧠 Motor de Detección: Busca el UID en ambos nodos en paralelo.
     */
    public void detectUserType(FirebaseUser user, @NonNull UserTypeCallback callback) {
        String uid = user.getUid();
        DatabaseReference dbRef = MyApp.getDatabaseReference("");

        // Paso 1: Verificar en conductores
        dbRef.child("conductores").child(uid).addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshotDriver) {
                // Paso 2: Verificar en usuarios (pasajeros)
                dbRef.child("usuarios").child(uid).addListenerForSingleValueEvent(new ValueEventListener() {
                    @Override
                    public void onDataChange(@NonNull DataSnapshot snapshotUser) {
                        analyzeResults(uid, snapshotDriver, snapshotUser, callback);
                    }
                    @Override public void onCancelled(@NonNull DatabaseError error) { callback.onError(error.getMessage()); }
                });
            }
            @Override public void onCancelled(@NonNull DatabaseError error) { callback.onError(error.getMessage()); }
        });
    }

    /**
     * ⚖️ Analizador de Resultados: Heurística para decidir el rol.
     * Prioriza la existencia de datos técnicos (vehículo) para marcar como conductor.
     */
    private void analyzeResults(String uid, DataSnapshot snapshotDriver, DataSnapshot snapshotUser, UserTypeCallback callback) {
        // Si tiene perfil de usuario completo -> Pasajero
        if (snapshotUser.exists() && isUserComplete(snapshotUser)) {
            callback.onTypeDetected("passenger");
            return;
        }
        
        // Si tiene perfil de conductor con vehículo -> Conductor
        if (snapshotDriver.exists() && isDriverComplete(snapshotDriver)) {
            callback.onTypeDetected("driver");
            return;
        }
        
        // Casos ambiguos o de primer ingreso
        if (snapshotDriver.exists() && snapshotUser.exists()) {
            if (isDriverComplete(snapshotDriver)) callback.onTypeDetected("driver");
            else callback.onTypeDetected("passenger");
            return;
        }
        
        // Fallbacks
        if (snapshotUser.exists()) callback.onTypeDetected("passenger");
        else if (snapshotDriver.exists()) callback.onTypeDetected("passenger");
        else callback.onError("User data not found.");
    }

    private boolean isDriverComplete(DataSnapshot snapshot) {
        return snapshot.hasChild("nombre") && (snapshot.hasChild("placaVehiculo") || snapshot.hasChild("vehiculoId"));
    }

    private boolean isUserComplete(DataSnapshot snapshot) {
        return snapshot.hasChild("nombre");
    }

    /**
     * Inicio de sesión tradicional por Email.
     */
    public void loginWithEmail(String email, String password, @NonNull LoginCallback callback) {
        auth.signInWithEmailAndPassword(email, password)
                .addOnCompleteListener(activity, task -> {
                    if (task.isSuccessful()) {
                        FirebaseUser user = auth.getCurrentUser();
                        if (user != null) {
                            detectUserType(user, new UserTypeCallback() {
                                @Override public void onTypeDetected(String type) { callback.onLoginSuccess(type); }
                                @Override public void onError(String error) { callback.onLoginFailure(error); }
                            });
                        } else callback.onLoginFailure("Error obtaining user data");
                    } else {
                        callback.onLoginFailure(task.getException() != null ? task.getException().getMessage() : "Unknown error");
                    }
                });
    }

    /**
     * Inicia el flujo de Google One Tap.
     */
    public void loginWithGoogle(@NonNull LoginCallback callback) {
        oneTapClient.beginSignIn(signInRequest)
                .addOnSuccessListener(activity, result -> {
                    try {
                        activity.startIntentSenderForResult(result.getPendingIntent().getIntentSender(), REQ_ONE_TAP, null, 0, 0, 0, null);
                    } catch (IntentSender.SendIntentException e) { callback.onLoginFailure(e.getMessage()); }
                })
                .addOnFailureListener(activity, e -> callback.onLoginFailure(e.getMessage()));
    }

    /**
     * Procesa la credencial de Google y registra al usuario si es nuevo.
     */
    public void handleGoogleResult(Intent data, @NonNull LoginCallback callback) {
        try {
            SignInCredential credential = oneTapClient.getSignInCredentialFromIntent(data);
            String idToken = credential.getGoogleIdToken();
            if (idToken != null) {
                AuthCredential firebaseCredential = GoogleAuthProvider.getCredential(idToken, null);
                auth.signInWithCredential(firebaseCredential).addOnCompleteListener(activity, task -> {
                    if (task.isSuccessful()) {
                        FirebaseUser user = auth.getCurrentUser();
                        if (user != null) {
                            detectUserType(user, new UserTypeCallback() {
                                @Override public void onTypeDetected(String type) { callback.onLoginSuccess(type); }
                                @Override public void onError(String error) {
                                    // Si no se detecta tipo, es un usuario nuevo de Google (Pasajero por defecto)
                                    registrationService.guardarUserSiNoExiste(user, new RegistrationService.RegistrationCallback() {
                                        @Override public void onSuccess() { callback.onLoginSuccess("passenger"); }
                                        @Override public void onFailure(String err) { callback.onLoginFailure(err); }
                                    });
                                }
                            });
                        }
                    } else callback.onLoginFailure(task.getException() != null ? task.getException().getMessage() : "Unknown error");
                });
            }
        } catch (Exception e) { callback.onLoginFailure(e.getMessage()); }
    }
}

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
 * Service to handle user authentication.
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

    public void detectUserType(FirebaseUser user, @NonNull UserTypeCallback callback) {
        String uid = user.getUid();
        DatabaseReference dbRef = MyApp.getDatabaseReference("");

        dbRef.child("conductores").child(uid).addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshotDriver) {
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

    private void analyzeResults(String uid, DataSnapshot snapshotDriver, DataSnapshot snapshotUser, UserTypeCallback callback) {
        if (snapshotUser.exists() && isUserComplete(snapshotUser)) {
            callback.onTypeDetected("passenger");
            return;
        }
        if (snapshotDriver.exists() && isDriverComplete(snapshotDriver)) {
            callback.onTypeDetected("driver");
            return;
        }
        if (snapshotDriver.exists() && snapshotUser.exists()) {
            if (isDriverComplete(snapshotDriver)) callback.onTypeDetected("driver");
            else callback.onTypeDetected("passenger");
            return;
        }
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

    public void loginWithGoogle(@NonNull LoginCallback callback) {
        oneTapClient.beginSignIn(signInRequest)
                .addOnSuccessListener(activity, result -> {
                    try {
                        activity.startIntentSenderForResult(result.getPendingIntent().getIntentSender(), REQ_ONE_TAP, null, 0, 0, 0, null);
                    } catch (IntentSender.SendIntentException e) { callback.onLoginFailure(e.getMessage()); }
                })
                .addOnFailureListener(activity, e -> callback.onLoginFailure(e.getMessage()));
    }

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

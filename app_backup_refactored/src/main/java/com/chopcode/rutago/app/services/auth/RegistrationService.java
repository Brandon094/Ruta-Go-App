package com.chopcode.rutago.app.services.auth;

import androidx.annotation.NonNull;
import android.util.Log;

import com.chopcode.rutago.app.config.MyApp;
import com.chopcode.rutago.app.models.Passenger;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.ValueEventListener;

import java.util.HashMap;
import java.util.Map;

/**
 * Service to register users in Firebase.
 */
public class RegistrationService {

    private static final String TAG = "RegistrationService";
    private FirebaseAuth auth;
    private DatabaseReference databaseReference;

    public interface RegistrationCallback {
        void onSuccess();
        void onFailure(String error);
    }

    public RegistrationService() {
        auth = MyApp.getInstance().getFirebaseAuth();
        databaseReference = MyApp.getDatabaseReference("usuarios");
    }

    public void registrarUser(String name, String email, String phone, String password, RegistrationCallback callback) {
        auth.createUserWithEmailAndPassword(email, password)
                .addOnCompleteListener(task -> {
                    if (task.isSuccessful()) {
                        FirebaseUser currentUser = auth.getCurrentUser();
                        if (currentUser != null) {
                            String uid = currentUser.getUid();
                            Passenger passenger = new Passenger(uid, name, phone, email, password);
                            databaseReference.child(uid).setValue(passenger)
                                    .addOnSuccessListener(aVoid -> callback.onSuccess())
                                    .addOnFailureListener(e -> callback.onFailure(e.getMessage()));
                        } else {
                            callback.onFailure("User is null after creation");
                        }
                    } else {
                        callback.onFailure(task.getException() != null ? task.getException().getMessage() : "Unknown error");
                    }
                });
    }

    public void guardarUserSiNoExiste(FirebaseUser user, RegistrationCallback callback) {
        DatabaseReference rootRef = MyApp.getDatabaseReference("");
        String uid = user.getUid();

        rootRef.child("usuarios").child(uid).addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot userSnapshot) {
                if (userSnapshot.exists()) callback.onSuccess();
                else {
                    rootRef.child("conductores").child(uid).addListenerForSingleValueEvent(new ValueEventListener() {
                        @Override
                        public void onDataChange(@NonNull DataSnapshot driverSnapshot) {
                            if (driverSnapshot.exists()) callback.onSuccess();
                            else {
                                Passenger passenger = new Passenger(uid, user.getDisplayName(), user.getPhoneNumber(), user.getEmail());
                                Map<String, Object> userData = new HashMap<>();
                                userData.put("id", uid);
                                userData.put("nombre", passenger.getNombre());
                                userData.put("email", passenger.getEmail());
                                userData.put("telefono", passenger.getTelefono());
                                userData.put("rol", "usuario");
                                userData.put("fechaRegistro", System.currentTimeMillis());
                                if (user.getPhotoUrl() != null) userData.put("photoUrl", user.getPhotoUrl().toString());
                                rootRef.child("usuarios").child(uid).setValue(userData)
                                        .addOnSuccessListener(aVoid -> callback.onSuccess())
                                        .addOnFailureListener(e -> callback.onFailure(e.getMessage()));
                            }
                        }
                        @Override public void onCancelled(@NonNull DatabaseError error) { callback.onFailure(error.getMessage()); }
                    });
                }
            }
            @Override public void onCancelled(@NonNull DatabaseError error) { callback.onFailure(error.getMessage()); }
        });
    }
}

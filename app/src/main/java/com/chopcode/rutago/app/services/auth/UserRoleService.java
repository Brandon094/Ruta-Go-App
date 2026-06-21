package com.chopcode.rutago.app.services.auth;

import androidx.annotation.NonNull;
import com.chopcode.rutago.app.config.MyApp;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.ValueEventListener;

/**
 * 🧠 User Role Service
 * 
 * Responsable de detectar si un usuario es Conductor o Pasajero
 * analizando la estructura de la base de datos de Firebase.
 */
public class UserRoleService {

    public interface UserTypeCallback {
        void onTypeDetected(String type);
        void onError(String error);
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
                        analyzeResults(snapshotDriver, snapshotUser, callback);
                    }
                    @Override public void onCancelled(@NonNull DatabaseError error) { callback.onError(error.getMessage()); }
                });
            }
            @Override public void onCancelled(@NonNull DatabaseError error) { callback.onError(error.getMessage()); }
        });
    }

    private void analyzeResults(DataSnapshot snapshotDriver, DataSnapshot snapshotUser, UserTypeCallback callback) {
        // Prioridad 1: Es conductor si existe en el nodo conductores
        if (snapshotDriver.exists() && isDriverComplete(snapshotDriver)) {
            callback.onTypeDetected("driver");
            return;
        }
        
        // Prioridad 2: Es pasajero si existe en el nodo usuarios
        if (snapshotUser.exists()) {
            callback.onTypeDetected("passenger");
            return;
        }
        
        // Error: No está en ningún lado
        callback.onError("User data not found in system.");
    }

    private boolean isDriverComplete(DataSnapshot snapshot) {
        return snapshot.hasChild("nombre") && (snapshot.hasChild("placaVehiculo") || snapshot.hasChild("vehiculoId"));
    }

    private boolean isUserComplete(DataSnapshot snapshot) {
        return snapshot.hasChild("nombre");
    }
}

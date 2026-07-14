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
 * Registration Service
 *
 * Responsable de la creación y aprovisionamiento de perfiles de usuario.
 * Responsabilidades:
 * - Crear identidades en Firebase Auth mediante Email/Password.
 * - Sincronizar perfiles extendidos en el nodo /usuarios/ para pasajeros.
 * - Implementar lógica de persistencia condicional ("Aprovisionar solo si es nuevo") 
 *   para evitar la sobreescritura de perfiles de conductores existentes.
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

    /**
     * Registra un nuevo pasajero realizando la creación en Auth y DB secuencialmente.
     */
    public void registrarUser(String name, String email, String phone, String password, RegistrationCallback callback) {
        registrarSoloAuth(email, password, new RegistrationCallback() {
            @Override
            public void onSuccess() {
                FirebaseUser currentUser = auth.getCurrentUser();
                if (currentUser != null) {
                    String uid = currentUser.getUid();
                    Passenger passenger = new Passenger(uid, name, phone, email, password);
                    databaseReference.child(uid).setValue(passenger)
                            .addOnSuccessListener(aVoid -> callback.onSuccess())
                            .addOnFailureListener(e -> callback.onFailure(e.getMessage()));
                }
            }
            @Override public void onFailure(String error) { callback.onFailure(error); }
        });
    }

    /**
     * Realiza únicamente el alta en la capa de Identidad de Firebase.
     */
    public void registrarSoloAuth(String email, String password, RegistrationCallback callback) {
        auth.createUserWithEmailAndPassword(email, password)
                .addOnCompleteListener(task -> {
                    if (task.isSuccessful()) {
                        callback.onSuccess();
                    } else {
                        callback.onFailure(task.getException() != null ? 
                                task.getException().getMessage() : "Fallo en el servidor de autenticación.");
                    }
                });
    }

    /**
     * 🛡️ Lógica de Aprovisionamiento Seguro:
     * Verifica la existencia del perfil en los nodos de conductores y pasajeros antes de crear uno nuevo.
     * Previene que un conductor que entra por primera vez con Google pierda su perfil operativo.
     * @param user Usuario autenticado por Google One Tap.
     */
    public void guardarUserSiNoExiste(FirebaseUser user, RegistrationCallback callback) {
        DatabaseReference rootRef = MyApp.getDatabaseReference("");
        String uid = user.getUid();

        // 1. Verificación prioritaria en nodo de Conductores
        rootRef.child("conductores").child(uid).addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot driverSnapshot) {
                if (driverSnapshot.exists()) {
                    Log.d(TAG, "✅ Usuario identificado como Conductor. Omitiendo registro de pasajero.");
                    callback.onSuccess();
                } else {
                    // 2. Verificación secundaria en nodo de Usuarios
                    rootRef.child("usuarios").child(uid).addListenerForSingleValueEvent(new ValueEventListener() {
                        @Override
                        public void onDataChange(@NonNull DataSnapshot userSnapshot) {
                            if (userSnapshot.exists()) {
                                callback.onSuccess();
                            } else {
                                // 3. Aprovisionamiento de nuevo perfil de Pasajero (Rol por defecto)
                                Map<String, Object> userData = new HashMap<>();
                                userData.put("id", uid);
                                userData.put("nombre", user.getDisplayName());
                                userData.put("email", user.getEmail());
                                userData.put("telefono", user.getPhoneNumber());
                                userData.put("rol", "usuario");
                                userData.put("status", "active");
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

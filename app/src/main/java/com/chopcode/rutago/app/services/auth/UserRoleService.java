package com.chopcode.rutago.app.services.auth;

import androidx.annotation.NonNull;
import com.chopcode.rutago.app.config.MyApp;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.ValueEventListener;

/**
 * User Role Service
 *
 * Motor de resolución de identidades y roles del ecosistema.
 * Responsabilidades:
 * - Realizar la detección de rol (Pasajero/Conductor) mediante búsquedas secuenciales en Firebase.
 * - Implementar lógica de validación de integridad para asegurar que el perfil tenga los datos mínimos requeridos.
 * - Centralizar la lógica de "Match" entre el UID de Auth y el nodo correspondiente en Realtime Database.
 */
public class UserRoleService {

    /** Interfaz para retornar el resultado de la detección de rol. */
    public interface UserTypeCallback {
        /** @param type El rol resuelto: "driver" o "passenger". */
        void onTypeDetected(String type);
        void onError(String error);
    }

    /**
     * Inicia la búsqueda del perfil en los nodos paralelos de la base de datos.
     * Implementa una estrategia de "Prioridad Conductor": si un UID existe en ambos nodos, 
     * se asume el rol de conductor para permitir el acceso a las funciones operativas.
     */
    public void detectUserType(FirebaseUser user, @NonNull UserTypeCallback callback) {
        String uid = user.getUid();
        DatabaseReference dbRef = MyApp.getDatabaseReference("");

        // Búsqueda en cascada reactiva
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

    /**
     * Analiza las capturas de datos para determinar el rol legítimo del usuario.
     */
    private void analyzeResults(DataSnapshot snapshotDriver, DataSnapshot snapshotUser, UserTypeCallback callback) {
        // Validación técnica de perfil de conductor
        if (snapshotDriver.exists() && isDriverComplete(snapshotDriver)) {
            callback.onTypeDetected("driver");
            return;
        }
        
        // Validación de perfil de pasajero
        if (snapshotUser.exists()) {
            callback.onTypeDetected("passenger");
            return;
        }
        
        // El usuario está autenticado pero no tiene perfil en DB
        callback.onError("Perfil de usuario no encontrado en el sistema central.");
    }

    /**
     * Verifica que un conductor tenga la información técnica mínima para operar.
     */
    private boolean isDriverComplete(DataSnapshot snapshot) {
        return snapshot.hasChild("nombre") && (snapshot.hasChild("placaVehiculo") || snapshot.hasChild("vehiculoId"));
    }

    private boolean isUserComplete(DataSnapshot snapshot) {
        return snapshot.hasChild("nombre");
    }
}

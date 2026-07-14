package com.chopcode.rutago.app.services.reservations.common;

import android.util.Log;

import com.chopcode.rutago.app.config.MyApp;
import com.chopcode.rutago.app.models.Vehicle;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.ValueEventListener;

import java.util.HashMap;
import java.util.Map;

/**
 * Vehicle Service
 *
 * Repositorio especializado para la gestión de la flota vehicular.
 * Responsabilidades:
 * - Recuperar información técnica de buses mediante placa o UID del conductor.
 * - Gestionar la escucha reactiva (listeners) para cambios en el estado del vehículo.
 * - Implementar un motor de "Parsing" robusto para transformar DataSnapshots en modelos Vehicle.
 * - Sincronizar el ID del conductor propietario con la ficha técnica del activo.
 */
public class VehicleService {

    private static final String TAG = "VehicleService";

    public interface VehicleCallback {
        void onVehicleLoaded(Vehicle vehicle);
        void onError(String error);
    }

    public interface VehicleMapCallback {
        void onVehicleObtained(Map<String, Object> vehicle);
        void onError(String error);
    }

    /**
     * Establece una suscripción reactiva a un vehículo específico basándose en su placa.
     */
    public ValueEventListener listenToVehicleByPlate(String plate, VehicleCallback callback) {
        if (plate == null || plate.isEmpty()) {
            callback.onVehicleLoaded(null);
            return null;
        }

        DatabaseReference vehicleRef = MyApp.getDatabaseReference("vehiculos/" + plate);
        ValueEventListener listener = new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot snapshot) {
                if (snapshot.exists()) {
                    Vehicle vehicle = parseVehicle(snapshot);
                    callback.onVehicleLoaded(vehicle);
                } else {
                    callback.onVehicleLoaded(null);
                }
            }
            @Override public void onCancelled(DatabaseError error) { callback.onError(error.getMessage()); }
        };
        vehicleRef.addValueEventListener(listener);
        return listener;
    }

    /**
     * Consulta única para obtener la información de un vehículo por placa.
     */
    public void getVehicleByPlate(String plate, VehicleCallback callback) {
        if (plate == null || plate.isEmpty()) {
            callback.onVehicleLoaded(null);
            return;
        }

        DatabaseReference vehicleRef = MyApp.getDatabaseReference("vehiculos/" + plate);
        vehicleRef.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot snapshot) {
                if (snapshot.exists()) {
                    Vehicle vehicle = parseVehicle(snapshot);
                    callback.onVehicleLoaded(vehicle);
                } else {
                    callback.onVehicleLoaded(null);
                }
            }

            @Override
            public void onCancelled(DatabaseError error) {
                callback.onError(error.getMessage());
            }
        });
    }

    /**
     * Busca el vehículo vinculado a un conductor mediante una consulta indexada por conductorId.
     */
    public void getVehicleByDriver(String driverId, VehicleCallback callback) {
        if (driverId == null || driverId.isEmpty()) {
            callback.onVehicleLoaded(null);
            return;
        }

        DatabaseReference vehiclesRef = MyApp.getDatabaseReference("vehiculos");
        vehiclesRef.orderByChild("conductorId").equalTo(driverId)
                .addListenerForSingleValueEvent(new ValueEventListener() {
                    @Override
                    public void onDataChange(DataSnapshot snapshot) {
                        if (snapshot.exists()) {
                            for (DataSnapshot vehicleSnapshot : snapshot.getChildren()) {
                                Vehicle vehicle = parseVehicle(vehicleSnapshot);
                                if (vehicle != null) {
                                    callback.onVehicleLoaded(vehicle);
                                    return;
                                }
                            }
                            callback.onVehicleLoaded(null);
                        } else {
                            callback.onVehicleLoaded(null);
                        }
                    }

                    @Override
                    public void onCancelled(DatabaseError error) {
                        callback.onError(error.getMessage());
                    }
                });
    }

    /**
     * Transforma la estructura cruda NoSQL al modelo tipado de la aplicación.
     */
    private Vehicle parseVehicle(DataSnapshot snapshot) {
        if (!snapshot.exists()) return null;
        try {
            Vehicle vehicle = new Vehicle();
            vehicle.setId(snapshot.getKey());
            vehicle.setPlate(getStringSafely(snapshot.child("placa")));
            vehicle.setBrand(getStringSafely(snapshot.child("marca")));
            vehicle.setModel(getStringSafely(snapshot.child("modelo")));
            vehicle.setColor(getStringSafely(snapshot.child("color")));
            vehicle.setYear(getStringSafely(snapshot.child("ano")));
            vehicle.setDriverId(getStringSafely(snapshot.child("conductorId")));
            vehicle.setStatus(getStringSafely(snapshot.child("estado")));

            Object cap = snapshot.child("capacidad").getValue();
            if (cap instanceof Number) vehicle.setCapacity(((Number) cap).intValue());
            return vehicle;
        } catch (Exception e) {
            Log.e(TAG, "❌ Error al procesar datos de vehículo: " + e.getMessage());
            return null;
        }
    }

    private String getStringSafely(DataSnapshot snapshot) {
        Object value = snapshot.getValue();
        return value == null ? "" : String.valueOf(value);
    }
}

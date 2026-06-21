package com.chopcode.rutago.app.services.reservations;

import android.util.Log;

import com.chopcode.rutago.app.config.MyApp;
import com.chopcode.rutago.app.models.Vehicle;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.ValueEventListener;

import java.util.HashMap;
import java.util.Map;

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
            Log.e(TAG, "Error parsing vehicle: " + e.getMessage());
            return null;
        }
    }

    private String getStringSafely(DataSnapshot snapshot) {
        Object value = snapshot.getValue();
        return value == null ? "" : String.valueOf(value);
    }
}

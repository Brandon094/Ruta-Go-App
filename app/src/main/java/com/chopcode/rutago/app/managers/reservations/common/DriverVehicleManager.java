package com.chopcode.rutago.app.managers.reservations.common;

import android.content.Context;
import android.util.Log;
import android.widget.TextView;

import com.chopcode.rutago.app.config.MyApp;
import com.chopcode.rutago.app.engines.seats.SeatManager;
import com.chopcode.rutago.app.managers.analytics.ReservationAnalyticsHelper;
import com.chopcode.rutago.app.models.Driver;
import com.chopcode.rutago.app.models.Vehicle;
import com.chopcode.rutago.app.services.user.UserService;
import com.chopcode.rutago.app.services.reservations.common.VehicleService;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.ValueEventListener;

/**
 * 🚛 Driver Vehicle Manager (Common Utility)
 */
public class DriverVehicleManager {

    private static final String TAG = "DriverVehicleManager";
    private final Context context;
    private final ReservationAnalyticsHelper analyticsHelper;
    private final SeatManager seatManager;
    private final UserService userService;
    private final VehicleService vehicleService;

    public interface DriverVehicleCallback {
        void onDriverVehicleLoaded(String driverId, String driverName, String driverPhone, String plate, String model, Integer capacity);
        void onError(String error);
    }

    private TextView tvDriverName, tvVehicleInfo, tvCapacityInfo;
    private ValueEventListener driverListener;
    private DatabaseReference currentScheduleRef;

    private String driverId, driverName, driverPhone, vehiclePlate, vehicleModel;
    private Integer vehicleCapacity;

    public DriverVehicleManager(Context context, ReservationAnalyticsHelper analyticsHelper, SeatManager seatManager) {
        this.context = context;
        this.analyticsHelper = analyticsHelper;
        this.seatManager = seatManager;
        this.userService = new UserService();
        this.vehicleService = new VehicleService();
    }

    public void setUIReferences(TextView tvDriverName, TextView tvVehicleInfo, TextView tvCapacityInfo) {
        this.tvDriverName = tvDriverName;
        this.tvVehicleInfo = tvVehicleInfo;
        this.tvCapacityInfo = tvCapacityInfo;
    }

    public void loadDriverVehicleInfo(String scheduleId, DriverVehicleCallback callback) {
        if (scheduleId == null || scheduleId.isEmpty()) { callback.onError("Schedule ID is null or empty"); return; }
        buscarConductorPorHorario(scheduleId, callback);
    }

    private void buscarConductorPorHorario(String scheduleId, DriverVehicleCallback callback) {
        cleanup();
        currentScheduleRef = MyApp.getDatabaseReference("horarios/" + scheduleId);
        driverListener = new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot snapshot) {
                if (snapshot.exists() && snapshot.hasChild("conductorId")) {
                    String id = snapshot.child("conductorId").getValue(String.class);
                    if (id != null && !id.isEmpty()) {
                        driverId = id;
                        loadDriverInfo(driverId, callback);
                        return;
                    }
                }
                buscarConductorExhaustivamente(scheduleId, callback);
            }
            @Override public void onCancelled(DatabaseError error) { buscarConductorExhaustivamente(scheduleId, callback); }
        };
        currentScheduleRef.addValueEventListener(driverListener);
    }

    public void cleanup() {
        if (currentScheduleRef != null && driverListener != null) {
            currentScheduleRef.removeEventListener(driverListener);
            driverListener = null;
            currentScheduleRef = null;
        }
    }

    private void buscarConductorExhaustivamente(String scheduleId, DriverVehicleCallback callback) {
        DatabaseReference ref = MyApp.getDatabaseReference("conductores");
        ref.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot snapshot) {
                if (!snapshot.exists()) { setDefaults(); return; }
                boolean found = false;
                for (DataSnapshot dSnap : snapshot.getChildren()) {
                    DataSnapshot hSnap = dSnap.child("horariosAsignados");
                    if (hSnap.exists()) {
                        for (DataSnapshot h : hSnap.getChildren()) {
                            if (scheduleId.equals(String.valueOf(h.getValue()))) {
                                driverId = dSnap.getKey();
                                loadDriverInfo(driverId, callback);
                                found = true;
                                break;
                            }
                        }
                    }
                    if (found) break;
                }
                if (!found) { setDefaults(); if (callback != null) callback.onDriverVehicleLoaded(null, "Unassigned", "N/A", "N/A", "N/A", seatManager.getCapacidadTotal()); }
            }
            @Override public void onCancelled(DatabaseError error) { setDefaults(); if (callback != null) callback.onError(error.getMessage()); }
        });
    }

    private void loadDriverInfo(String driverId, DriverVehicleCallback callback) {
        userService.loadDriverData(driverId, new UserService.DriverDataCallback() {
            @Override
            public void onDriverDataLoaded(Driver driver) {
                if (driver != null && driver.getNombre() != null) {
                    driverName = driver.getNombre();
                    driverPhone = driver.getTelefono() != null ? driver.getTelefono() : "N/A";
                    vehiclePlate = driver.getVehiclePlate() != null ? driver.getVehiclePlate() : "N/A";
                    vehicleModel = driver.getVehicleModel() != null ? driver.getVehicleModel() : "N/A";
                    updateUI();
                    loadVehicleInfo(driverId, callback);
                } else { setDefaults(); if (callback != null) callback.onError("Incomplete driver data"); }
            }
            @Override public void onError(String error) { setDefaults(); if (callback != null) callback.onError(error); }
        });
    }

    private void loadVehicleInfo(String driverId, DriverVehicleCallback callback) {
        if (vehiclePlate != null && !vehiclePlate.isEmpty() && !vehiclePlate.equals("N/A")) {
            vehicleService.getVehicleByPlate(vehiclePlate, new VehicleService.VehicleCallback() {
                @Override public void onVehicleLoaded(Vehicle vehicle) {
                    if (vehicle != null) processLoadedVehicle(vehicle, driverId, callback);
                    else loadVehicleByDriverFallback(driverId, callback);
                }
                @Override public void onError(String error) { loadVehicleByDriverFallback(driverId, callback); }
            });
        } else loadVehicleByDriverFallback(driverId, callback);
    }

    private void loadVehicleByDriverFallback(String driverId, DriverVehicleCallback callback) {
        vehicleService.getVehicleByDriver(driverId, new VehicleService.VehicleCallback() {
            @Override public void onVehicleLoaded(Vehicle vehicle) { processLoadedVehicle(vehicle, driverId, callback); }
            @Override public void onError(String error) {
                vehicleCapacity = seatManager.getCapacidadTotal();
                updateUI();
                if (callback != null) callback.onDriverVehicleLoaded(driverId, driverName, driverPhone, vehiclePlate, vehicleModel, vehicleCapacity);
            }
        });
    }

    private void processLoadedVehicle(Vehicle vehicle, String driverId, DriverVehicleCallback callback) {
        if (vehicle != null) {
            vehicleModel = (vehicle.getModel() != null && !vehicle.getModel().isEmpty()) ? vehicle.getModel() : vehicleModel;
            vehiclePlate = (vehicle.getPlate() != null && !vehicle.getPlate().isEmpty()) ? vehicle.getPlate() : vehiclePlate;
            vehicleCapacity = vehicle.getCapacity() > 0 ? vehicle.getCapacity() : seatManager.getCapacidadTotal();
            updateUI();
        } else { vehicleCapacity = seatManager.getCapacidadTotal(); updateUI(); }
        if (callback != null) callback.onDriverVehicleLoaded(driverId, driverName, driverPhone, vehiclePlate, vehicleModel, vehicleCapacity);
    }

    private void updateUI() {
        if (tvDriverName != null) tvDriverName.setText(driverName != null ? driverName : "------");
        if (tvVehicleInfo != null) tvVehicleInfo.setText("Vehicle: " + (vehiclePlate != null ? vehiclePlate : "---") + " - " + (vehicleModel != null ? vehicleModel : "---"));
        if (tvCapacityInfo != null) tvCapacityInfo.setText("Capacity: " + (vehicleCapacity != null ? vehicleCapacity : seatManager.getCapacidadTotal()) + " seats");
    }

    private void setDefaults() {
        driverName = "Unassigned"; driverPhone = "N/A"; vehiclePlate = "N/A"; vehicleModel = "N/A"; vehicleCapacity = seatManager.getCapacidadTotal();
        updateUI();
    }

    public String getConductorId() { return driverId; }
    public String getConductorNombre() { return driverName; }
    public String getConductorTelefono() { return driverPhone; }
    public String getPlacaVehiculo() { return vehiclePlate; }
    public String getModeloVehiculo() { return vehicleModel; }
    public Integer getCapacidadVehiculo() { return vehicleCapacity; }
}

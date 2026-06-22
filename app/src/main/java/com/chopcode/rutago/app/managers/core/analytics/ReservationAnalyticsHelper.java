package com.chopcode.rutago.app.managers.core.analytics;

import android.util.Log;

import com.chopcode.rutago.app.config.MyApp;
import com.chopcode.rutago.app.models.Vehicle;

import java.util.HashMap;
import java.util.Map;

/**
 * Helper to handle reservation analytical events.
 */
public class ReservationAnalyticsHelper {
    private static final String TAG = "ReservationAnalytics";
    private final String screen;

    public ReservationAnalyticsHelper(String screen) {
        this.screen = screen;
    }

    public void logEvent(String event, Map<String, Object> params) {
        try {
            Map<String, Object> analyticsParams = new HashMap<>();
            analyticsParams.put("user_id", MyApp.getCurrentUserId());
            analyticsParams.put("screen", screen);
            analyticsParams.put("timestamp", System.currentTimeMillis());
            if (params != null) analyticsParams.putAll(params);
            MyApp.logEvent(event, analyticsParams);
        } catch (Exception e) { Log.e(TAG, "Error logging analytical event: " + e.getMessage()); }
    }

    public void logPantallaInicio() {
        Map<String, Object> params = new HashMap<>();
        params.put("action", "screen_start");
        logEvent("create_reservation_screen_start", params);
    }

    public void logDatosRecibidos(boolean hasRoute, boolean hasSchedule) {
        Map<String, Object> params = new HashMap<>();
        params.put("has_route", hasRoute ? 1 : 0);
        params.put("has_schedule", hasSchedule ? 1 : 0);
        logEvent("intent_data_received", params);
    }

    public void logClickBoton(String button) {
        Map<String, Object> params = new HashMap<>();
        params.put("button", button);
        logEvent("click_button_" + button, params);
    }

    public void logAsientoSeleccionado(int seat) {
        Map<String, Object> params = new HashMap<>();
        params.put("seat", seat);
        logEvent("seat_selected", params);
    }

    public void logUserCargado(String name, String phone) {
        Map<String, Object> params = new HashMap<>();
        params.put("user_name", name != null ? name : "N/A");
        params.put("user_phone", phone != null ? phone : "N/A");
        logEvent("user_loaded_create_reservation", params);
    }

    public void logConductorCargado(String driverId, String name, String phone) {
        Map<String, Object> params = new HashMap<>();
        params.put("driver_id", driverId);
        params.put("driver_name", name);
        params.put("driver_phone", phone != null ? phone : "N/A");
        logEvent("driver_loaded_create_reservation", params);
    }

    public void logVehiculoCargado(Vehicle vehicle, String driverId) {
        Map<String, Object> params = new HashMap<>();
        params.put("driver_id", driverId);
        params.put("vehicle_plate", vehicle.getPlate() != null ? vehicle.getPlate() : "N/A");
        params.put("vehicle_model", vehicle.getModel() != null ? vehicle.getModel() : "N/A");
        params.put("vehicle_capacity", vehicle.getCapacity());
        logEvent("vehicle_loaded_create_reservation", params);
    }

    public void logAsientosCargados(int occupiedSeats, int totalCapacity, String schedule) {
        Map<String, Object> params = new HashMap<>();
        params.put("occupied_seats", occupiedSeats);
        params.put("total_capacity", totalCapacity);
        params.put("available_seats", totalCapacity - occupiedSeats);
        params.put("schedule", schedule != null ? schedule : "N/A");
        logEvent("seats_loaded_create_reservation", params);
    }

    public void logValidacionExitosa(int seat, String route) {
        Map<String, Object> params = new HashMap<>();
        params.put("seat", seat);
        params.put("route", route != null ? route : "N/A");
        logEvent("validation_success_create_reservation", params);
    }

    public void logValidacionFallida(String reason) {
        Map<String, Object> params = new HashMap<>();
        params.put("reason", reason);
        logEvent("validation_failed", params);
    }

    public void logError(String errorType, String message) {
        Map<String, Object> params = new HashMap<>();
        params.put("error_type", errorType);
        params.put("message", message);
        logEvent("error_" + errorType, params);
    }
}

package com.chopcode.rutago.app.managers.reservations.dataprocessor;

import android.content.Intent;
import android.util.Log;

import com.chopcode.rutago.app.activities.passenger.reservation.confirmReservation.ConfirmReservationActivity;
import com.chopcode.rutago.app.managers.analytics.ReservationAnalyticsHelper;
import com.chopcode.rutago.app.managers.seats.SeatManager;

import java.util.HashMap;
import java.util.Map;

/**
 * Class to process and prepare reservation data.
 */
public class ReservationDataProcessor {

    private static final String TAG = "ReservationDataProcessor";
    private final ReservationAnalyticsHelper analyticsHelper;

    public ReservationDataProcessor(ReservationAnalyticsHelper analyticsHelper) {
        this.analyticsHelper = analyticsHelper;
    }

    public Intent prepareReservationConfirmation(
            android.content.Context context,
            SeatManager seatManager,
            String selectedRoute,
            String scheduleId,
            String scheduleTime,
            String driverName,
            String driverPhone,
            String driverId,
            String vehiclePlate,
            String vehicleModel,
            Integer vehicleCapacity,
            String userName,
            String userPhone,
            String userId,
            String travelDate,
            Double routePrice) {

        if (!validateRequiredData(seatManager, selectedRoute, scheduleId, scheduleTime)) return null;

        logReservationDataToAnalytics(seatManager.getAsientoSeleccionado(), selectedRoute, scheduleTime, driverName, vehiclePlate);

        Intent intent = new Intent(context, ConfirmReservationActivity.class);
        populateIntentWithReservationData(intent, seatManager, selectedRoute, scheduleId, scheduleTime, driverName, driverPhone, driverId, vehiclePlate, vehicleModel, vehicleCapacity, userName, userPhone, userId, travelDate, routePrice);

        return intent;
    }

    private boolean validateRequiredData(SeatManager seatManager, String selectedRoute, String scheduleId, String scheduleTime) {
        if (selectedRoute == null) { analyticsHelper.logValidacionFallida("sin_ruta"); return false; }
        if (!seatManager.hasAsientoSeleccionado()) { analyticsHelper.logValidacionFallida("sin_asiento"); return false; }
        if (scheduleId == null || scheduleTime == null) { analyticsHelper.logValidacionFallida("horario_incompleto"); return false; }
        analyticsHelper.logValidacionExitosa(seatManager.getAsientoSeleccionado(), selectedRoute);
        return true;
    }

    private void logReservationDataToAnalytics(int seat, String route, String time, String driver, String plate) {
        Map<String, Object> params = new HashMap<>();
        params.put("asiento", seat);
        params.put("accion", "envio_a_confirmar_reserva");
        analyticsHelper.logEvent("envio_a_confirmar_reserva", params);
    }

    private void populateIntentWithReservationData(
            Intent intent, SeatManager seatManager, String route, String sId, String sTime,
            String dName, String dPhone, String dId, String vPlate, String vModel, Integer vCap,
            String uName, String uPhone, String uId, String tDate, Double routePrice) {

        intent.putExtra("asientoSeleccionado", seatManager.getAsientoSeleccionado());
        intent.putExtra("rutaSeleccionada", route);
        intent.putExtra("horarioId", sId);
        intent.putExtra("horarioHora", sTime);
        intent.putExtra("fechaViaje", tDate);

        intent.putExtra("conductorNombre", dName);
        intent.putExtra("conductorTelefono", dPhone != null ? dPhone : "N/A");
        intent.putExtra("conductorId", dId);

        intent.putExtra("vehiculoPlaca", vPlate != null ? vPlate : "N/A");
        intent.putExtra("vehiculoModelo", vModel != null ? vModel : "N/A");
        intent.putExtra("vehiculoCapacidad", vCap != null ? vCap : seatManager.getCapacidadTotal());

        intent.putExtra("usuarioTelefono", uPhone != null ? uPhone : "N/A");
        intent.putExtra("usuarioId", uId);

        // ✅ CORRECCIÓN: Usar la flecha correcta (→) para separar origen y destino
        if (route != null) {
            String separator = " → "; 
            if (!route.contains(separator)) separator = " -> "; // Fallback por si acaso
            
            String[] parts = route.split(separator);
            if (parts.length == 2) {
                intent.putExtra("origen", parts[0].trim());
                intent.putExtra("destino", parts[1].trim());
            }
        }
        intent.putExtra("precio", routePrice != null ? routePrice : com.chopcode.rutago.app.services.prices.PriceService.DEFAULT_PRICE);
        intent.putExtra("tiempoEstimado", route != null && route.contains("Natagá") ? "60 min" : "55 min");
    }
}

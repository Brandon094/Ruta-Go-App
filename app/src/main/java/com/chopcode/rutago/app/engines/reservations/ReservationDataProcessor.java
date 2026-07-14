package com.chopcode.rutago.app.engines.reservations;

import android.content.Intent;
import android.util.Log;

import com.chopcode.rutago.app.activities.passenger.reservation.confirmReservation.ConfirmReservationActivity;
import com.chopcode.rutago.app.engines.seats.SeatManager;
import com.chopcode.rutago.app.managers.core.analytics.ReservationAnalyticsHelper;

import java.util.HashMap;
import java.util.Map;

/**
 * 🛰️ Reservation Data Processor (Reservation Engine Component)
 *
 * Especialista en la validación, empaquetado y transporte de datos de reserva entre contextos.
 * Responsabilidades:
 * - Realizar un Sanity Check sobre los datos antes de permitir el avance a la confirmación.
 * - Transformar estados complejos de la UI (como la selección del SeatManager) en un Payload transferible.
 * - Enriquecer el Intent con metadatos de telemetría y constantes de negocio (ej: tiempos estimados).
 * - Garantizar la integridad bilingüe de los campos durante el empaquetado de datos.
 */
public class ReservationDataProcessor {

    private static final String TAG = "ReservationDataProcessor";
    private final ReservationAnalyticsHelper analyticsHelper;

    public ReservationDataProcessor(ReservationAnalyticsHelper analyticsHelper) {
        this.analyticsHelper = analyticsHelper;
    }

    /**
     * Prepara el salto hacia la actividad de confirmación integrando todos los metadatos del viaje.
     * @return Intent configurado con los extras de reserva o null si la validación falla.
     */
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

        // Validación de requisitos mínimos para evitar tiquetes huérfanos
        if (!validateRequiredData(seatManager, selectedRoute, scheduleId, scheduleTime)) return null;

        logReservationDataToAnalytics(seatManager.getAsientoSeleccionado(), selectedRoute, scheduleTime, driverName, vehiclePlate);

        Intent intent = new Intent(context, ConfirmReservationActivity.class);
        populateIntentWithReservationData(intent, seatManager, selectedRoute, scheduleId, scheduleTime, driverName, driverPhone, driverId, vehiclePlate, vehicleModel, vehicleCapacity, userName, userPhone, userId, travelDate, routePrice);

        return intent;
    }

    /**
     * Verifica que el estado actual del flujo sea consistente (Ruta y Asiento presentes).
     */
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

    /**
     * Inyecta masivamente los datos en el Intent. Implementa lógica de normalización de cadenas.
     */
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

        // Descomposición del nombre de la ruta para obtener origen/destino puros
        if (route != null) {
            String separator = " → "; 
            if (!route.contains(separator)) separator = " -> ";
            
            String[] parts = route.split(separator);
            if (parts.length == 2) {
                intent.putExtra("origen", parts[0].trim());
                intent.putExtra("destino", parts[1].trim());
            }
        }
        intent.putExtra("precio", routePrice != null ? routePrice : com.chopcode.rutago.app.services.prices.PriceService.DEFAULT_PRICE);
        
        // Política de tiempos estimados basada en geografía local
        intent.putExtra("tiempoEstimado", route != null && route.contains("Natagá") ? "60 min" : "55 min");
    }
}

package com.chopcode.rutago.app.managers.reservations.dataprocessor;

import android.content.Intent;
import android.util.Log;

import com.chopcode.rutago.app.activities.passenger.reservation.confirmReservation.ConfirmarReservaActivity;
import com.chopcode.rutago.app.managers.analytics.ReservationAnalyticsHelper;
import com.chopcode.rutago.app.managers.seats.SeatManager;

import java.util.HashMap;
import java.util.Map;

/**
 * Clase encargada de procesar y preparar los datos de reserva para enviar a confirmación.
 */
public class ReservationDataProcessor {

    private static final String TAG = "ReservationDataProcessor";

    private final ReservationAnalyticsHelper analyticsHelper;

    public ReservationDataProcessor(ReservationAnalyticsHelper analyticsHelper) {
        this.analyticsHelper = analyticsHelper;
    }

    /**
     * Prepara y envía los datos de reserva a la actividad de confirmación
     */
    public Intent prepareReservationConfirmation(
            android.content.Context context,
            SeatManager seatManager,
            String rutaSeleccionada,
            String horarioId,
            String horarioHora,
            String conductorNombre,
            String conductorTelefono,
            String conductorId,
            String placaVehiculo,
            String modeloVehiculo,
            Integer capacidadVehiculo,
            String usuarioNombre,
            String usuarioTelefono,
            String usuarioId,
            String fechaViaje) {

        // Validar datos mínimos requeridos
        if (!validateRequiredData(seatManager, rutaSeleccionada, horarioId, horarioHora)) {
            return null;
        }

        // Log analytics
        logReservationDataToAnalytics(
                seatManager.getAsientoSeleccionado(),
                rutaSeleccionada,
                horarioHora,
                conductorNombre,
                placaVehiculo
        );

        // Crear Intent con todos los datos
        Intent confirmarReserva = new Intent(context, ConfirmarReservaActivity.class);
        populateIntentWithReservationData(
                confirmarReserva,
                seatManager,
                rutaSeleccionada,
                horarioId,
                horarioHora,
                conductorNombre,
                conductorTelefono,
                conductorId,
                placaVehiculo,
                modeloVehiculo,
                capacidadVehiculo,
                usuarioNombre,
                usuarioTelefono,
                usuarioId,
                fechaViaje
        );

        return confirmarReserva;
    }

    /**
     * Valida los datos mínimos requeridos para la reserva
     */
    private boolean validateRequiredData(
            SeatManager seatManager,
            String rutaSeleccionada,
            String horarioId,
            String horarioHora) {

        if (rutaSeleccionada == null) {
            Log.e(TAG, "Error: No hay ruta seleccionada");
            analyticsHelper.logValidacionFallida("sin_ruta");
            return false;
        }

        if (!seatManager.hasAsientoSeleccionado()) {
            Log.e(TAG, "Error: No hay asiento seleccionado");
            analyticsHelper.logValidacionFallida("sin_asiento");
            return false;
        }

        if (horarioId == null || horarioHora == null) {
            Log.e(TAG, "Error: Información de horario incompleta");
            analyticsHelper.logValidacionFallida("horario_incompleto");
            return false;
        }

        analyticsHelper.logValidacionExitosa(
                seatManager.getAsientoSeleccionado(),
                rutaSeleccionada
        );

        return true;
    }

    /**
     * Registra los datos de la reserva en analytics
     */
    private void logReservationDataToAnalytics(
            int asientoSeleccionado,
            String rutaSeleccionada,
            String horarioHora,
            String conductorNombre,
            String placaVehiculo) {

        Log.d(TAG, "📤 ENVIANDO DATOS A CONFIRMAR RESERVA:");
        Log.d(TAG, "  - Asiento: " + asientoSeleccionado);

        Map<String, Object> params = new HashMap<>();
        params.put("asiento", asientoSeleccionado);
        params.put("accion", "envio_a_confirmar_reserva");
        analyticsHelper.logEvent("envio_a_confirmar_reserva", params);

        Map<String, Object> detallesParams = new HashMap<>();
        detallesParams.put("asiento", asientoSeleccionado);
        detallesParams.put("ruta", rutaSeleccionada != null ? rutaSeleccionada : "N/A");
        detallesParams.put("horario", horarioHora != null ? horarioHora : "N/A");
        detallesParams.put("conductor_nombre", conductorNombre);
        detallesParams.put("vehiculo_placa", placaVehiculo);
        analyticsHelper.logEvent("detalles_reserva_crear", detallesParams);
    }

    /**
     * Popula el Intent con todos los datos de la reserva
     */
    private void populateIntentWithReservationData(
            Intent intent,
            SeatManager seatManager,
            String rutaSeleccionada,
            String horarioId,
            String horarioHora,
            String conductorNombre,
            String conductorTelefono,
            String conductorId,
            String placaVehiculo,
            String modeloVehiculo,
            Integer capacidadVehiculo,
            String usuarioNombre,
            String usuarioTelefono,
            String usuarioId,
            String fechaViaje) {

        // 1. Información básica del viaje
        addBasicTripInfo(
                intent,
                seatManager,
                rutaSeleccionada,
                horarioId,
                horarioHora,
                fechaViaje
        );

        // 2. Información del conductor
        addDriverInfo(
                intent,
                conductorNombre,
                conductorTelefono,
                conductorId
        );

        // 3. Información del vehículo
        addVehicleInfo(
                intent,
                placaVehiculo,
                modeloVehiculo,
                capacidadVehiculo != null ? capacidadVehiculo : seatManager.getCapacidadTotal()
        );

        // 4. Información del pasajero
        addPassengerInfo(
                intent,
                usuarioNombre,
                usuarioTelefono,
                usuarioId
        );

        // 5. Información adicional
        addAdditionalInfo(intent, rutaSeleccionada);
    }

    /**
     * Añade información básica del viaje al Intent
     */
    private void addBasicTripInfo(
            Intent intent,
            SeatManager seatManager,
            String rutaSeleccionada,
            String horarioId,
            String horarioHora,
            String fechaViaje) {

        intent.putExtra("asientoSeleccionado", seatManager.getAsientoSeleccionado());
        intent.putExtra("rutaSelecionada", rutaSeleccionada);
        intent.putExtra("horarioId", horarioId);
        intent.putExtra("horarioHora", horarioHora);
        intent.putExtra("fechaViaje", fechaViaje);

        // Capacidad y disponibilidad
        intent.putExtra("capacidadTotal", seatManager.getCapacidadTotal());
        intent.putExtra("capacidadDisponible", seatManager.getCapacidadDisponible());
        intent.putExtra("asientosOcupados", seatManager.getAsientosOcupadosCount());
    }

    /**
     * Añade información del conductor al Intent
     */
    private void addDriverInfo(
            Intent intent,
            String conductorNombre,
            String conductorTelefono,
            String conductorId) {

        intent.putExtra("conductorNombre", conductorNombre);
        intent.putExtra("conductorTelefono", conductorTelefono != null ? conductorTelefono : "No disponible");
        intent.putExtra("conductorId", conductorId);
    }

    /**
     * Añade información del vehículo al Intent
     */
    private void addVehicleInfo(
            Intent intent,
            String placaVehiculo,
            String modeloVehiculo,
            int capacidadVehiculo) {

        intent.putExtra("vehiculoPlaca", placaVehiculo != null ? placaVehiculo : "No disponible");
        intent.putExtra("vehiculoModelo", modeloVehiculo != null ? modeloVehiculo : "No disponible");
        intent.putExtra("vehiculoCapacidad", capacidadVehiculo);
    }

    /**
     * Añade información del pasajero al Intent
     */
    private void addPassengerInfo(
            Intent intent,
            String usuarioNombre,
            String usuarioTelefono,
            String usuarioId) {

        intent.putExtra("usuarioNombre", usuarioNombre != null ? usuarioNombre : "Usuario");
        intent.putExtra("usuarioTelefono", usuarioTelefono != null ? usuarioTelefono : "No disponible");
        intent.putExtra("usuarioId", usuarioId);
    }

    /**
     * Añade información adicional al Intent
     */
    private void addAdditionalInfo(Intent intent, String rutaSeleccionada) {
        // Extraer origen y destino
        if (rutaSeleccionada != null) {
            String[] partesRuta = rutaSeleccionada.split(" -> ");
            if (partesRuta.length == 2) {
                intent.putExtra("origen", partesRuta[0].trim());
                intent.putExtra("destino", partesRuta[1].trim());
            }
        }

        // Precio fijo
        intent.putExtra("precio", 12000.0);

        // Tiempo estimado basado en la ruta
        String tiempoEstimado = rutaSeleccionada != null && rutaSeleccionada.contains("Natagá -> La Plata")
                ? "60 min" : "55 min";
        intent.putExtra("tiempoEstimado", tiempoEstimado);
    }

    /**
     * Obtiene un resumen de la reserva para logging o debugging
     */
    public String getReservationSummary(
            SeatManager seatManager,
            String rutaSeleccionada,
            String horarioHora,
            String conductorNombre) {

        return String.format(
                "Resumen Reserva:\n" +
                        "- Asiento: %d\n" +
                        "- Ruta: %s\n" +
                        "- Horario: %s\n" +
                        "- Conductor: %s\n" +
                        "- Capacidad Disponible: %d/%d",
                seatManager.getAsientoSeleccionado(),
                rutaSeleccionada != null ? rutaSeleccionada : "N/A",
                horarioHora != null ? horarioHora : "N/A",
                conductorNombre != null ? conductorNombre : "N/A",
                seatManager.getCapacidadDisponible(),
                seatManager.getCapacidadTotal()
        );
    }
}

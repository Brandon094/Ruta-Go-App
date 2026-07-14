package com.chopcode.rutago.app.managers.ui.reservations.confirmation;

import com.chopcode.rutago.app.managers.core.analytics.ReservationAnalyticsHelper;
import java.util.HashMap;
import java.util.Map;

/**
 * Confirmation Analytics Helper
 *
 * Especialista en la telemetría granular para la etapa final de confirmación de reserva.
 * Responsabilidades:
 * - Registrar eventos de validación y clics en botones de acción.
 * - Rastrear la interacción con diálogos de cancelación y decisiones del usuario.
 * - Reportar errores técnicos surgidos durante la transacción final.
 * - Medir el rendimiento del flujo mediante el seguimiento de navegación y eventos de pantalla.
 */
public class ConfirmationAnalyticsHelper {

    private final ReservationAnalyticsHelper analyticsHelper;

    public ConfirmationAnalyticsHelper(ReservationAnalyticsHelper analyticsHelper) {
        this.analyticsHelper = analyticsHelper;
    }

    /**
     * Registra clics en elementos interactivos de la pantalla de confirmación.
     */
    public void logButtonClick(String accion) {
        Map<String, Object> params = new HashMap<>();
        params.put("accion", accion);
        analyticsHelper.logEvent("click_boton", params);
    }

    public void logValidationSuccess() {
        analyticsHelper.logEvent("validacion_exitosa", new HashMap<>());
    }

    public void logValidationFailed(String razon) {
        Map<String, Object> params = new HashMap<>();
        params.put("razon", razon);
        analyticsHelper.logEvent("validacion_fallida", params);
    }

    public void logCancellationDialogShown() {
        analyticsHelper.logEvent("dialogo_cancelacion_mostrado", new HashMap<>());
    }

    /**
     * Captura si el usuario finalmente canceló la reserva o decidió continuar.
     */
    public void logCancellationAction(String accion) {
        Map<String, Object> params = new HashMap<>();
        params.put("accion", accion);
        analyticsHelper.logEvent("cancelacion_reserva", params);
    }

    public void logNavigation(String destino) {
        Map<String, Object> params = new HashMap<>();
        params.put("destino", destino);
        analyticsHelper.logEvent("navegacion", params);
    }

    public void logError(String tipoError, String mensaje) {
        Map<String, Object> params = new HashMap<>();
        params.put("error", tipoError);
        params.put("mensaje", mensaje);
        analyticsHelper.logEvent("error", params);
    }

    public void logScreenEvent(String evento) {
        Map<String, Object> params = new HashMap<>();
        params.put("pantalla", "ConfirmarReserva");
        params.put("evento", evento);
        analyticsHelper.logEvent("pantalla_evento", params);
    }
}

package com.chopcode.rutago.app.managers.ui.reservations.confirmation;

import android.view.View;
import android.widget.ImageView;
import com.google.android.material.card.MaterialCardView;
import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.managers.core.analytics.ReservationAnalyticsHelper;
import java.util.HashMap;
import java.util.Map;

/**
 * Confirmation UI Manager
 *
 * Encargado de la lógica visual y el control de estados en la pantalla de confirmación de reserva.
 * Responsabilidades:
 * - Gestionar la selección del método de pago (Efectivo/Transferencia).
 * - Sincronizar los indicadores visuales (Check Icons) con la elección del usuario.
 * - Centralizar la telemetría sobre las preferencias de pago de los pasajeros.
 * - Notificar cambios de estado a la actividad mediante una interfaz de callback.
 */
public class ConfirmationUIManager {

    private final ReservationAnalyticsHelper analyticsHelper;
    private MaterialCardView cardEfectivo;
    private ImageView checkIconEfectivo;
    private String metodoPagoSeleccionado = "efectivo";
    private ConfirmationListener listener;

    /** Interfaz para la delegación de eventos de pago. */
    public interface ConfirmationListener {
        void onPaymentMethodChanged(String metodoPago);
    }

    public ConfirmationUIManager(ReservationAnalyticsHelper analyticsHelper) {
        this.analyticsHelper = analyticsHelper;
    }

    /**
     * Inicializa los componentes de la interfaz de pago.
     * @param cardEfectivo Tarjeta Material para la opción de pago en efectivo.
     * @param listener Callback para reaccionar a cambios en la selección.
     */
    public void init(MaterialCardView cardEfectivo, ConfirmationListener listener) {
        this.cardEfectivo = cardEfectivo;
        this.listener = listener;

        if (cardEfectivo != null) {
            this.checkIconEfectivo = cardEfectivo.findViewById(R.id.checkIconEfectivo);
            cardEfectivo.setOnClickListener(v -> selectPaymentMethod("efectivo"));
        }
        
        // Estado inicial persistente
        selectPaymentMethod("efectivo");
    }

    /**
     * Actualiza el estado lógico y visual del método de pago.
     */
    private void selectPaymentMethod(String metodo) {
        this.metodoPagoSeleccionado = metodo;
        
        if (cardEfectivo != null && metodo.equals("efectivo")) {
            if (checkIconEfectivo != null) checkIconEfectivo.setVisibility(View.VISIBLE);
        }

        if (listener != null) {
            listener.onPaymentMethodChanged(metodo);
        }
        
        logPaymentMethodSelected(metodo);
    }

    private void logPaymentMethodSelected(String metodoPago) {
        Map<String, Object> params = new HashMap<>();
        params.put("tipo", metodoPago.toLowerCase());
        analyticsHelper.logEvent("metodo_pago_seleccionado", params);
    }

    public String getSelectedPaymentMethod() {
        return metodoPagoSeleccionado;
    }
}

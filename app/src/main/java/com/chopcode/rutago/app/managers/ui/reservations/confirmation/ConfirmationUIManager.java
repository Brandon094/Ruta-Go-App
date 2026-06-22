package com.chopcode.rutago.app.managers.ui.reservations.confirmation;

import android.view.View;
import android.widget.ImageView;
import com.google.android.material.card.MaterialCardView;
import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.managers.core.analytics.ReservationAnalyticsHelper;
import java.util.HashMap;
import java.util.Map;

/**
 * 🛠️ Confirmation UI Manager
 * 
 * Gestiona la lógica visual simplificada de la selección de método de pago.
 */
public class ConfirmationUIManager {

    private final ReservationAnalyticsHelper analyticsHelper;
    private MaterialCardView cardEfectivo;
    private ImageView checkIconEfectivo;
    private String metodoPagoSeleccionado = "efectivo";
    private ConfirmationListener listener;

    public interface ConfirmationListener {
        void onPaymentMethodChanged(String metodoPago);
    }

    public ConfirmationUIManager(ReservationAnalyticsHelper analyticsHelper) {
        this.analyticsHelper = analyticsHelper;
    }

    /**
     * Inicializa los componentes necesarios para la gestión del pago.
     */
    public void init(MaterialCardView cardEfectivo, ConfirmationListener listener) {
        this.cardEfectivo = cardEfectivo;
        this.listener = listener;

        if (cardEfectivo != null) {
            this.checkIconEfectivo = cardEfectivo.findViewById(R.id.checkIconEfectivo);
            cardEfectivo.setOnClickListener(v -> selectPaymentMethod("efectivo"));
        }
        
        // Estado inicial
        selectPaymentMethod("efectivo");
    }

    private void selectPaymentMethod(String metodo) {
        this.metodoPagoSeleccionado = metodo;
        
        if (cardEfectivo != null && metodo.equals("efectivo")) {
            // Ya configurado en XML para respetar el tema
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

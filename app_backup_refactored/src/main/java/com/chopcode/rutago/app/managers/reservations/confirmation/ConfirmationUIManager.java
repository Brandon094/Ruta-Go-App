package com.chopcode.rutago.app.managers.reservations.confirmation;

import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;
import androidx.core.content.ContextCompat;
import com.google.android.material.card.MaterialCardView;
import com.google.android.material.floatingactionbutton.ExtendedFloatingActionButton;
import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.managers.analytics.ReservationAnalyticsHelper;
import java.util.HashMap;
import java.util.Map;

import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.managers.analytics.ReservationAnalyticsHelper;
import com.chopcode.rutago.app.utils.ui.FormatUtils;
import java.util.HashMap;
import java.util.Map;

public class ConfirmationUIManager {

    private final ReservationAnalyticsHelper analyticsHelper;

    // Referencias a vistas - NUEVO LAYOUT
    private TextView tvOrigen, tvDestino, tvFecha, tvHora, tvTiempoEstimado, tvPrecio, tvAsiento;
    private TextView tvUser, tvTelefonoP, tvConductor, tvTelefonoC, tvPlaca;
    private MaterialCardView cardEfectivo, cardTransferencia;
    private ExtendedFloatingActionButton fabAyuda;

    // Referencias a los ImageView de check
    private ImageView checkIconEfectivo, checkIconTransferencia;

    // Callbacks
    public interface ConfirmationListener {
        void onConfirmButtonClicked();
        void onCancelButtonClicked();
        void onPaymentMethodChanged(String metodoPago);
        void onHelpRequested(); // Nuevo callback para el FAB de ayuda
    }

    private ConfirmationListener listener;
    private String metodoPagoSeleccionado = "efectivo";

    public ConfirmationUIManager(ReservationAnalyticsHelper analyticsHelper) {
        this.analyticsHelper = analyticsHelper;
    }

    // NUEVO MÉTODO para el layout mejorado
    public void setNewViewReferences(
            TextView tvOrigen, TextView tvDestino, TextView tvFecha, TextView tvHora,
            TextView tvTiempoEstimado, TextView tvPrecio, TextView tvAsiento,
            TextView tvUser, TextView tvTelefonoP, TextView tvConductor,
            TextView tvTelefonoC, TextView tvPlaca,
            MaterialCardView cardEfectivo) {

        this.tvOrigen = tvOrigen;
        this.tvDestino = tvDestino;
        this.tvFecha = tvFecha;
        this.tvHora = tvHora;
        this.tvTiempoEstimado = tvTiempoEstimado;
        this.tvPrecio = tvPrecio;
        this.tvAsiento = tvAsiento;
        this.tvUser = tvUser;
        this.tvTelefonoP = tvTelefonoP;
        this.tvConductor = tvConductor;
        this.tvTelefonoC = tvTelefonoC;
        this.tvPlaca = tvPlaca;
        this.cardEfectivo = cardEfectivo;

        // Obtener referencias a los ImageView de check
        if (cardEfectivo != null) {
            this.checkIconEfectivo = cardEfectivo.findViewById(R.id.checkIconEfectivo);
        }
    }

    public void setConfirmationListener(ConfirmationListener listener) {
        this.listener = listener;
    }

    // NUEVO MÉTODO para el layout mejorado
    public void loadDataIntoNewUI(String usuarioNombre, String usuarioTelefono) {
        // Datos del usuario
        if (tvUser != null) {
            tvUser.setText(usuarioNombre);
        }

        if (tvTelefonoP != null) {
            tvTelefonoP.setText(usuarioTelefono);
        }

        // Configurar método de pago por defecto (efectivo)
        setupDefaultPaymentMethod();
    }

    // NUEVO MÉTODO para el layout mejorado
    public void setupNewListeners() {
        setupPaymentMethodListeners();
        setupHelpButtonListener();
    }

    private void setupPaymentMethodListeners() {
        if (cardEfectivo != null) {
            cardEfectivo.setOnClickListener(v -> {
                selectPaymentMethod("efectivo");
                logPaymentMethodSelected("efectivo");
            });
        }

        if (cardTransferencia != null) {
            cardTransferencia.setOnClickListener(v -> {
                selectPaymentMethod("transferencia");
                logPaymentMethodSelected("transferencia");
            });
        }

        // Establecer método por defecto
        selectPaymentMethod("efectivo");
    }

    private void setupHelpButtonListener() {
        if (fabAyuda != null && listener != null) {
            fabAyuda.setOnClickListener(v -> {
                logButtonClick("ayuda_solicitada");
                listener.onHelpRequested();
            });
        }
    }

    private void setupDefaultPaymentMethod() {
        selectPaymentMethod("efectivo");
    }

    private void selectPaymentMethod(String metodo) {
        this.metodoPagoSeleccionado = metodo;
        
        // Configurar UI visual para efectivo
        if (cardEfectivo != null) {
            if (metodo.equals("efectivo")) {
                cardEfectivo.setStrokeColor(ContextCompat.getColor(cardEfectivo.getContext(), R.color.primary_300));
                cardEfectivo.setCardBackgroundColor(ContextCompat.getColor(cardEfectivo.getContext(), R.color.primary_50));
                if (checkIconEfectivo != null) checkIconEfectivo.setVisibility(View.VISIBLE);
            } else {
                cardEfectivo.setStrokeColor(ContextCompat.getColor(cardEfectivo.getContext(), R.color.outline));
                cardEfectivo.setCardBackgroundColor(ContextCompat.getColor(cardEfectivo.getContext(), R.color.surface));
                if (checkIconEfectivo != null) checkIconEfectivo.setVisibility(View.GONE);
            }
        }

        // Configurar UI visual para transferencia
        if (cardTransferencia != null) {
            if (metodo.equals("transferencia")) {
                cardTransferencia.setStrokeColor(ContextCompat.getColor(cardTransferencia.getContext(), R.color.primary_300));
                cardTransferencia.setCardBackgroundColor(ContextCompat.getColor(cardTransferencia.getContext(), R.color.primary_50));
                if (checkIconTransferencia != null) checkIconTransferencia.setVisibility(View.VISIBLE);
            } else {
                cardTransferencia.setStrokeColor(ContextCompat.getColor(cardTransferencia.getContext(), R.color.outline));
                cardTransferencia.setCardBackgroundColor(ContextCompat.getColor(cardTransferencia.getContext(), R.color.surface));
                if (checkIconTransferencia != null) checkIconTransferencia.setVisibility(View.GONE);
            }
        }

        // Notificar al listener
        if (listener != null) {
            listener.onPaymentMethodChanged(metodo);
        }
    }

    // Métodos de analytics
    private void logPaymentMethodSelected(String metodoPago) {
        Map<String, Object> params = new HashMap<>();
        params.put("tipo", metodoPago.toLowerCase());
        analyticsHelper.logEvent("metodo_pago_seleccionado", params);
    }

    public void logButtonClick(String accion) {
        Map<String, Object> params = new HashMap<>();
        params.put("accion", accion);
        analyticsHelper.logEvent("click_boton", params);
    }

    // Método para obtener el método de pago seleccionado
    public String getSelectedPaymentMethod() {
        return metodoPagoSeleccionado;
    }
}

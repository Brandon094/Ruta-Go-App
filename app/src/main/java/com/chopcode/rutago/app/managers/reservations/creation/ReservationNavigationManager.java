package com.chopcode.rutago.app.managers.reservations.creation;

import android.content.Context;

import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.engines.seats.SeatManager;
import com.chopcode.rutago.app.managers.analytics.ReservationAnalyticsHelper;

import java.util.HashMap;
import java.util.Map;

/**
 * 🗺️ Reservation Navigation Manager (Creation Flow)
 */
public class ReservationNavigationManager {

    private final Context context;
    private final ReservationAnalyticsHelper analyticsHelper;
    private final SeatManager seatManager;

    public interface NavigationCallback {
        void onConfirmNavigation();
        void onCancelNavigation();
    }

    public ReservationNavigationManager(
            Context context,
            ReservationAnalyticsHelper analyticsHelper,
            SeatManager seatManager) {

        this.context = context;
        this.analyticsHelper = analyticsHelper;
        this.seatManager = seatManager;
    }

    public void handleBackAction(NavigationCallback callback) {
        if (seatManager.hasAsientoSeleccionado()) {
            showCancelSeatDialog(callback);
        } else {
            logSimpleNavigation();
            if (callback != null) {
                callback.onConfirmNavigation();
            }
        }
    }

    private void showCancelSeatDialog(NavigationCallback callback) {
        Map<String, Object> params = new HashMap<>();
        params.put("asiento", seatManager.getAsientoSeleccionado());
        analyticsHelper.logEvent("dialogo_cancelar_asiento", params);

        new androidx.appcompat.app.AlertDialog.Builder(context, R.style.AppDialogTheme)
                .setTitle("Cancelar selección")
                .setMessage("¿Estás seguro de que quieres cancelar la selección de asiento?")
                .setPositiveButton("Sí", (dialog, which) -> {
                    analyticsHelper.logEvent("cancelacion_asiento_confirmada", params);
                    if (callback != null) {
                        callback.onConfirmNavigation();
                    }
                })
                .setNegativeButton("No", (dialog, which) -> {
                    analyticsHelper.logEvent("cancelacion_asiento_rechazada", params);
                    if (callback != null) {
                        callback.onCancelNavigation();
                    }
                })
                .setIcon(R.drawable.ic_cancel)
                .show();
    }

    private void logSimpleNavigation() {
        Map<String, Object> params = new HashMap<>();
        params.put("accion", "navegacion_atras_simple");
        analyticsHelper.logEvent("navegacion_atras_simple", params);
    }

    public void logPhysicalBackButton() {
        Map<String, Object> params = new HashMap<>();
        params.put("accion", "boton_back_fisico");
        analyticsHelper.logEvent("boton_back_fisico", params);
    }
}

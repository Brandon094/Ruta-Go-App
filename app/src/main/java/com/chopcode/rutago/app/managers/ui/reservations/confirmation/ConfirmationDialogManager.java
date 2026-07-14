package com.chopcode.rutago.app.managers.ui.reservations.confirmation;

import android.app.AlertDialog;
import android.content.Context;

import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.managers.core.analytics.ReservationAnalyticsHelper;

import java.util.HashMap;
import java.util.Map;

/**
 * Confirmation Dialog Manager
 *
 * Especialista en la gestión de diálogos de interrupción y validación en el flujo de reserva.
 * Responsabilidades:
 * - Centralizar la creación y visualización de diálogos de confirmación (ej: Cancelar reserva).
 * - Garantizar una identidad visual consistente mediante el uso del tema AppDialogTheme.
 * - Integrar la telemetría analítica para rastrear el abandono o confirmación de acciones críticas.
 * - Proveer callbacks para delegar la ejecución lógica tras la decisión del usuario.
 */
public class ConfirmationDialogManager {

    private final Context context;
    private final ConfirmationAnalyticsHelper analyticsHelper;

    /** Interfaz para el manejo de las respuestas del usuario ante el diálogo. */
    public interface DialogCallback {
        void onPositiveAction();
        void onNegativeAction();
    }

    public ConfirmationDialogManager(Context context,
                                     ConfirmationAnalyticsHelper analyticsHelper) {
        this.context = context;
        this.analyticsHelper = analyticsHelper;
    }

    /**
     * Muestra un aviso de seguridad antes de proceder con la cancelación de un tiquete.
     */
    public void showCancellationDialog(DialogCallback callback) {
        analyticsHelper.logCancellationDialogShown();

        new androidx.appcompat.app.AlertDialog.Builder(context, R.style.AppDialogTheme)
                .setTitle("Cancelar reserva")
                .setMessage("¿Estás seguro de que quieres cancelar la reserva?")
                .setPositiveButton("Sí", (dialog, which) -> {
                    analyticsHelper.logCancellationAction("confirmada");
                    if (callback != null) {
                        callback.onPositiveAction();
                    }
                })
                .setNegativeButton("No", (dialog, which) -> {
                    analyticsHelper.logCancellationAction("rechazada");
                    if (callback != null) {
                        callback.onNegativeAction();
                    }
                })
                .setIcon(R.drawable.ic_cancel)
                .show();
    }
}

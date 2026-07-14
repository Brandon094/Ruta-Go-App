package com.chopcode.rutago.app.managers.ui.tutorials;

import android.app.Activity;
import android.os.Handler;
import android.os.Looper;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;
import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.managers.core.settings.SessionManager;
import com.google.android.material.button.MaterialButton;
import com.google.android.material.dialog.MaterialAlertDialogBuilder;

/**
 * Tutorial Manager (Centralized Guide Hub)
 *
 * Motor de capacitación interactiva para mejorar la curva de aprendizaje de los usuarios.
 * Responsabilidades:
 * - Centralizar los flujos de guías visuales para pasajeros y conductores.
 * - Coordinar la persistencia del estado de "visto" mediante el SessionManager para evitar redundancias.
 * - Implementar disparadores temporizados (Delayed Guides) que permiten a la UI renderizarse antes del diálogo.
 * - Gestionar la identidad visual de los tutoriales mediante diálogos personalizados y recursos Material3.
 */
public class TutorialManager {

    private final Activity activity;
    private final SessionManager sessionManager;

    public TutorialManager(Activity activity) {
        this.activity = activity;
        this.sessionManager = new SessionManager(activity);
    }

    // =========================================================================
    // 🚶 MÉTODOS PARA PASAJEROS
    // =========================================================================

    public void showPassengerHomeGuide() {
        showDelayedGuide(SessionManager.TUT_HOME, R.drawable.ic_time, 
            activity.getString(R.string.tut_home_title), activity.getString(R.string.tut_home_msg));
    }

    public void showPassengerSeatsGuide() {
        showDelayedGuide(SessionManager.TUT_SEATS, R.drawable.ic_seat, 
            activity.getString(R.string.tut_seats_title), activity.getString(R.string.tut_seats_msg));
    }

    public void showPassengerConfirmGuide() {
        showDelayedGuide(SessionManager.TUT_CONFIRM, R.drawable.ic_check, 
            activity.getString(R.string.tut_confirm_title), activity.getString(R.string.tut_confirm_msg));
    }

    public void showPassengerHistoryGuide() {
        showDelayedGuide(SessionManager.TUT_HISTORY, R.drawable.ic_history, 
            activity.getString(R.string.tut_history_title), activity.getString(R.string.tut_history_msg));
    }

    public void showPassengerProfileGuide() {
        showDelayedGuide(SessionManager.TUT_PROFILE, R.drawable.ic_person, 
            activity.getString(R.string.tut_profile_title), activity.getString(R.string.tut_profile_msg));
    }

    // =========================================================================
    // 👨‍✈️ MÉTODOS PARA CONDUCTORES
    // =========================================================================

    public void showDriverHomeGuide() {
        showDelayedGuide(SessionManager.TUT_DR_HOME, R.drawable.ic_checklist, 
            activity.getString(R.string.tut_dr_home_title), activity.getString(R.string.tut_dr_home_msg));
    }

    public void showDriverSeatsGuide() {
        showDelayedGuide(SessionManager.TUT_DR_SEATS, R.drawable.ic_cash, 
            activity.getString(R.string.tut_dr_seats_title), activity.getString(R.string.tut_dr_seats_msg));
    }

    public void showDriverHistoryGuide() {
        showDelayedGuide(SessionManager.TUT_DR_HISTORY, R.drawable.ic_report, 
            activity.getString(R.string.tut_dr_history_title), activity.getString(R.string.tut_dr_history_msg));
    }

    public void showDriverProfileGuide() {
        showDelayedGuide(SessionManager.TUT_DR_PROFILE, R.drawable.ic_bus, 
            activity.getString(R.string.tut_dr_profile_title), activity.getString(R.string.tut_dr_profile_msg));
    }

    // =========================================================================
    // ⚙️ MOTOR INTERNO DE VISUALIZACIÓN
    // =========================================================================

    /**
     * Lanza la guía con un retardo para asegurar que la actividad de fondo se haya estabilizado visualmente.
     */
    private void showDelayedGuide(String key, int icon, String title, String msg) {
        new Handler(Looper.getMainLooper()).postDelayed(() -> showGuide(key, icon, title, msg), 1200);
    }

    /**
     * Construye y muestra el paso del tutorial si el usuario no lo ha visto previamente.
     */
    private void showGuide(String key, int iconRes, String title, String message) {
        if (!sessionManager.shouldShowTutorial(key)) return;

        View dialogView = LayoutInflater.from(activity).inflate(R.layout.dialog_tutorial_step, null);
        ImageView ivIcon = dialogView.findViewById(R.id.ivTutorialIcon);
        TextView tvTitle = dialogView.findViewById(R.id.tvTutorialTitle);
        TextView tvMsg = dialogView.findViewById(R.id.tvTutorialMessage);
        MaterialButton btnUnderstand = dialogView.findViewById(R.id.btnUnderstand);

        ivIcon.setImageResource(iconRes);
        tvTitle.setText(title);
        tvMsg.setText(message);

        androidx.appcompat.app.AlertDialog dialog = new MaterialAlertDialogBuilder(activity, R.style.AppDialogTheme)
                .setView(dialogView).setCancelable(false).create();

        btnUnderstand.setOnClickListener(v -> {
            sessionManager.markTutorialAsSeen(key);
            dialog.dismiss();
        });

        if (dialog.getWindow() != null) {
            dialog.getWindow().setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
        }
        dialog.show();
    }
}

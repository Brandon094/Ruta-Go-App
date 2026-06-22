package com.chopcode.rutago.app.managers.ui.tutorial;

import android.app.Activity;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;
import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.managers.settings.SessionManager;
import com.google.android.material.button.MaterialButton;
import com.google.android.material.dialog.MaterialAlertDialogBuilder;

/**
 * 🎓 Tutorial Manager (Interactive Guide)
 * 
 * Se encarga de mostrar diálogos informativos paso a paso para guiar al 
 * pasajero en su primer recorrido por la aplicación.
 */
public class TutorialManager {

    private final Activity activity;
    private final SessionManager sessionManager;

    public TutorialManager(Activity activity) {
        this.activity = activity;
        this.sessionManager = new SessionManager(activity);
    }

    /**
     * Muestra una guía visual sobre un elemento o flujo específico.
     */
    public void showGuide(String key, int iconRes, String title, String message, Runnable onDismiss) {
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
                .setView(dialogView)
                .setCancelable(false)
                .create();

        btnUnderstand.setOnClickListener(v -> {
            sessionManager.markTutorialAsSeen(key);
            dialog.dismiss();
            if (onDismiss != null) onDismiss.run();
        });

        if (dialog.getWindow() != null) {
            dialog.getWindow().setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
        }

        dialog.show();
    }
}

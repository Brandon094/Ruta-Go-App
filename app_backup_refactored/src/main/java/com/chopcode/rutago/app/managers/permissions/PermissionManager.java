package com.chopcode.rutago.app.managers.permissions;

import android.Manifest;
import android.app.Activity;
import android.app.AlertDialog;
import android.content.Context;
import android.content.pm.PackageManager;
import android.os.Build;
import android.util.Log;

import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

public class PermissionManager {
    private static final String TAG = "PermissionManager";

    // ✅ ENFOCADO EN NOTIFICACIONES PARA ANDROID 13+
    public static final String[] NOTIFICATION_PERMISSIONS = {
            Manifest.permission.POST_NOTIFICATIONS  // Solo para Android 13+
    };

    public static final int NOTIFICATION_PERMISSION_REQUEST_CODE = 1002;

    /**
     * ✅ MÉTODO ESPECÍFICO PARA SOLICITAR PERMISO DE NOTIFICACIONES
     */
    public static void requestNotificationPermission(Activity activity) {
        // Solo en Android 13+
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            Log.d(TAG, "🔔 Solicitando permiso POST_NOTIFICATIONS (Android 13+)");

            // Verificar si ya está concedido
            if (ContextCompat.checkSelfPermission(activity,
                    Manifest.permission.POST_NOTIFICATIONS)
                    == PackageManager.PERMISSION_GRANTED) {
                Log.d(TAG, "✅ Permiso de notificaciones YA concedido");
                return;
            }

            // Mostrar explicación si es necesario
            if (ActivityCompat.shouldShowRequestPermissionRationale(activity,
                    Manifest.permission.POST_NOTIFICATIONS)) {

                // Mostrar diálogo explicativo
                showNotificationRationaleDialog(activity);
            } else {
                // Solicitar directamente
                ActivityCompat.requestPermissions(
                        activity,
                        new String[]{Manifest.permission.POST_NOTIFICATIONS},
                        NOTIFICATION_PERMISSION_REQUEST_CODE
                );
                Log.d(TAG, "📤 Solicitud de permiso enviada al sistema");
            }
        } else {
            Log.d(TAG, "📱 Android 12 o inferior - No se necesita permiso especial");
        }
    }

    /**
     * ✅ DIÁLOGO EXPLICATIVO PERSONALIZADO PARA NOTIFICACIONES
     */
    private static void showNotificationRationaleDialog(Activity activity) {
        AlertDialog.Builder builder = new AlertDialog.Builder(activity);
        builder.setTitle("🔔 Notificaciones Requeridas");
        builder.setMessage("Las notificaciones son esenciales para recibir:\n\n" +
                "• 📅 Nuevas reservas de pasajeros\n" +
                "• ✅ Confirmaciones de viaje\n" +
                "• ⚠️ Alertas importantes\n" +
                "• 🔄 Actualizaciones en tiempo real\n\n" +
                "Sin este permiso, NO recibirás ninguna notificación.");

        builder.setPositiveButton("CONCEDER PERMISO", (dialog, which) -> {
            // Solicitar permiso después de explicación
            ActivityCompat.requestPermissions(
                    activity,
                    new String[]{Manifest.permission.POST_NOTIFICATIONS},
                    NOTIFICATION_PERMISSION_REQUEST_CODE
            );
        });

        builder.setNegativeButton("AHORA NO", (dialog, which) -> {
            dialog.dismiss();
            Log.w(TAG, "⚠️ User pospuso permiso de notificaciones");
        });

        builder.setCancelable(false);
        builder.show();
    }

    /**
     * ✅ VERIFICAR SI EL PERMISO DE NOTIFICACIONES ESTÁ CONCEDIDO
     */
    public static boolean isNotificationPermissionGranted(Context context) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            return ContextCompat.checkSelfPermission(context,
                    Manifest.permission.POST_NOTIFICATIONS)
                    == PackageManager.PERMISSION_GRANTED;
        }
        // En Android 12 o inferior, siempre retorna true (no se necesita permiso)
        return true;
    }
}

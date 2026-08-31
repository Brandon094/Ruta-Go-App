package com.chopcode.rutago.app.managers.core.permissions

import android.Manifest
import android.app.Activity
import android.app.AlertDialog
import android.content.Context
import android.content.pm.PackageManager
import android.os.Build
import android.util.Log
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat

/**
 * Permission Manager
 *
 * Encargado de la gestión de permisos en tiempo de ejecución para cumplir con las políticas 
 * de seguridad modernas de Android.
 * Responsabilidades:
 * - Gestionar la solicitud del permiso de notificaciones (POST_NOTIFICATIONS) para Android 13+ (API 33).
 * - Implementar flujos de "Rationale": explicar al usuario por qué el permiso es vital para la operación del app.
 * - Centralizar la lógica de verificación de estados de permiso.
 */
object PermissionManager {
    private const val TAG = "PermissionManager"

    /** Colección de permisos requeridos para la funcionalidad de mensajería Push. */
    @JvmField
    val NOTIFICATION_PERMISSIONS: Array<String> = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
        arrayOf(Manifest.permission.POST_NOTIFICATIONS)
    } else {
        emptyArray()
    }

    /** Identificador único para el callback de resultados de permisos de notificación. */
    const val NOTIFICATION_PERMISSION_REQUEST_CODE = 1002

    /**
     * Solicita al sistema el permiso para enviar notificaciones Push.
     * Solo tiene efecto en dispositivos con Android 13 (Tiramisu) o superior.
     */
    @JvmStatic
    fun requestNotificationPermission(activity: Activity) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            Log.d(TAG, "🔔 Solicitando permiso POST_NOTIFICATIONS (Android 13+)")

            // Evitar re-solicitudes si ya se tiene el permiso.
            if (ContextCompat.checkSelfPermission(activity, Manifest.permission.POST_NOTIFICATIONS)
                == PackageManager.PERMISSION_GRANTED
            ) {
                Log.d(TAG, "✅ Permiso de notificaciones ya concedido.")
                return
            }

            // Lógica de persuasión: explicar beneficios antes de que el sistema bloquee permanentemente.
            if (ActivityCompat.shouldShowRequestPermissionRationale(
                    activity,
                    Manifest.permission.POST_NOTIFICATIONS
                )
            ) {
                showNotificationRationaleDialog(activity)
            } else {
                ActivityCompat.requestPermissions(
                    activity,
                    arrayOf(Manifest.permission.POST_NOTIFICATIONS),
                    NOTIFICATION_PERMISSION_REQUEST_CODE
                )
            }
        } else {
            Log.d(TAG, "📱 Android 12 o inferior: Permiso de notificaciones implícito.")
        }
    }

    /**
     * Muestra un diálogo educativo detallando por qué Ruta-Go necesita notificaciones.
     */
    private fun showNotificationRationaleDialog(activity: Activity) {
        val builder = AlertDialog.Builder(activity)
        builder.setTitle("🔔 Notificaciones Requeridas")
        builder.setMessage(
            "Las notificaciones son esenciales para recibir:\n\n" +
                    "• 📅 Nuevas reservas de pasajeros\n" +
                    "• ✅ Confirmaciones de viaje\n" +
                    "• ⚠️ Alertas importantes\n" +
                    "• 🔄 Actualizaciones en tiempo real\n\n" +
                    "Sin este permiso, la operatividad del servicio se verá afectada."
        )

        builder.setPositiveButton("CONCEDER PERMISO") { _, _ ->
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                ActivityCompat.requestPermissions(
                    activity,
                    arrayOf(Manifest.permission.POST_NOTIFICATIONS),
                    NOTIFICATION_PERMISSION_REQUEST_CODE
                )
            }
        }

        builder.setNegativeButton("AHORA NO") { dialog, _ ->
            dialog.dismiss()
            Log.w(TAG, "⚠️ Usuario pospuso el permiso de notificaciones.")
        }

        builder.setCancelable(false)
        builder.show()
    }

    /**
     * @return true si el permiso está concedido o si el dispositivo no lo requiere por su versión de OS.
     */
    @JvmStatic
    fun isNotificationPermissionGranted(context: Context): Boolean {
        return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            ContextCompat.checkSelfPermission(context, Manifest.permission.POST_NOTIFICATIONS) ==
                    PackageManager.PERMISSION_GRANTED
        } else {
            true
        }
    }
}

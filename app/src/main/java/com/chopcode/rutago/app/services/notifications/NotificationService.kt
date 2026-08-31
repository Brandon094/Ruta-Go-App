package com.chopcode.rutago.app.services.notifications

import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.os.Build
import android.util.Log
import androidx.core.app.NotificationCompat
import com.chopcode.rutago.app.R
import com.chopcode.rutago.app.activities.common.MainActivity
import com.chopcode.rutago.app.config.MyApp
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage

/**
 * Notification Service (FCM)
 *
 * Motor de recepción y despacho de notificaciones Push de Firebase.
 */
class NotificationService : FirebaseMessagingService() {

    override fun onCreate() {
        super.onCreate()
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val notificationManager =
                getSystemService(Context.NOTIFICATION_SERVICE) as? NotificationManager
            if (notificationManager != null) {
                createNotificationChannel(notificationManager)
            }
        }
    }

    override fun onMessageReceived(remoteMessage: RemoteMessage) {
        if (remoteMessage.data.isNotEmpty()) {
            val data = HashMap(remoteMessage.data)
            remoteMessage.notification?.let { notif ->
                if (!data.containsKey("title")) data["title"] = notif.title ?: ""
                if (!data.containsKey("body")) data["body"] = notif.body ?: ""
            }
            handleDataMessage(data)
            return
        }

        remoteMessage.notification?.let { notif ->
            sendNotification(
                notif.title ?: "",
                notif.body ?: "",
                null
            )
        }
    }

    override fun onNewToken(token: String) {
        sendRegistrationToServer(token)
    }

    private fun handleDataMessage(data: Map<String, String>) {
        try {
            val type = data["type"]
            var title = data["title"]
            var message = data["message"] ?: data["body"]

            if (type != null) {
                when (type) {
                    "reserva_confirmada" -> {
                        title = getString(R.string.notif_confirmada_title)
                        message = getString(
                            R.string.notif_confirmada_body,
                            data["ruta_nombre"] ?: "",
                            data["conductor_nombre"] ?: ""
                        )
                    }
                    "nueva_reserva" -> {
                        title = getString(R.string.notif_nueva_reserva_driver_title)
                        message = getString(
                            R.string.notif_nueva_reserva_body,
                            data["pasajero_nombre"] ?: "",
                            data["asiento_nombre"] ?: "",
                            data["ruta_nombre"] ?: ""
                        )
                    }
                }
            }

            if (title != null && message != null) {
                sendNotification(title, message, data)
            }
        } catch (e: Exception) {
            Log.e(TAG, "Error: ${e.message}")
        }
    }

    private fun sendNotification(title: String, messageBody: String, data: Map<String, String>?) {
        try {
            val intent = Intent(this, MainActivity::class.java).apply {
                addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_SINGLE_TOP)
                data?.forEach { (key, value) ->
                    putExtra(key, value)
                }
                if (data?.containsKey("target_activity") == true) {
                    putExtra("nav_target", data["target_activity"])
                }
            }

            val requestCode = System.currentTimeMillis().toInt()
            val pendingIntent = PendingIntent.getActivity(
                this,
                requestCode,
                intent,
                PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
            )

            val notificationBuilder = NotificationCompat.Builder(this, CHANNEL_ID)
                .setSmallIcon(R.drawable.ic_notification)
                .setColor(getColor(R.color.primary_500))
                .setContentTitle(title)
                .setContentText(messageBody)
                .setAutoCancel(true)
                .setContentIntent(pendingIntent)
                .setPriority(NotificationCompat.PRIORITY_HIGH)
                .setVisibility(NotificationCompat.VISIBILITY_PUBLIC)

            val notificationManager =
                getSystemService(Context.NOTIFICATION_SERVICE) as? NotificationManager

            notificationManager?.notify(
                System.currentTimeMillis().toInt(),
                notificationBuilder.build()
            )
        } catch (e: Exception) {
            Log.e(TAG, "Error: ${e.message}")
        }
    }

    private fun createNotificationChannel(notificationManager: NotificationManager) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                CHANNEL_ID,
                CHANNEL_NAME,
                NotificationManager.IMPORTANCE_HIGH
            )
            notificationManager.createNotificationChannel(channel)
        }
    }

    private fun sendRegistrationToServer(token: String) {
        val user = FirebaseAuth.getInstance().currentUser
        if (user != null) {
            val userId = user.uid
            val db = MyApp.getDatabaseReference("")
            val tokenMap = mapOf<String, Any>("fcmToken" to token, "tokenFCM" to token)
            db.child("users").child(userId).updateChildren(tokenMap)
            db.child("usuarios").child(userId).updateChildren(tokenMap)
            db.child("conductores").child(userId).updateChildren(tokenMap)
        }
    }

    companion object {
        private const val TAG = "NotificationService"
        private const val CHANNEL_ID = "high_priority_channel"
        private const val CHANNEL_NAME = "Notificaciones Importantes"
    }
}

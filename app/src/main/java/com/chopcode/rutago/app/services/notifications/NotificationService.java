package com.chopcode.rutago.app.services.notifications;

import android.app.NotificationChannel;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Build;
import android.util.Log;

import androidx.core.app.NotificationCompat;

import com.chopcode.rutago.app.activities.common.MainActivity;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;
import com.chopcode.rutago.app.R;

import java.util.Map;

/**
 * Notification Service (FCM)
 *
 * Motor de recepción y despacho de notificaciones Push de Firebase.
 */
public class NotificationService extends FirebaseMessagingService {

    private static final String TAG = "NotificationService";
    private static final String CHANNEL_ID = "high_priority_channel";
    private static final String CHANNEL_NAME = "Notificaciones Importantes";
    private static final String PREFS_NAME = "UserPrefs";
    private static final String KEY_USER_ID = "user_id";

    @Override
    public void onCreate() {
        super.onCreate();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            android.app.NotificationManager notificationManager =
                    (android.app.NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
            createNotificationChannel(notificationManager);
        }
    }

    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        if (remoteMessage.getData().size() > 0) {
            Map<String, String> data = new java.util.HashMap<>(remoteMessage.getData());
            if (remoteMessage.getNotification() != null) {
                if (!data.containsKey("title")) data.put("title", remoteMessage.getNotification().getTitle());
                if (!data.containsKey("body")) data.put("body", remoteMessage.getNotification().getBody());
            }
            handleDataMessage(data);
            return; 
        }

        if (remoteMessage.getNotification() != null) {
            sendNotification(
                    remoteMessage.getNotification().getTitle(),
                    remoteMessage.getNotification().getBody(),
                    null
            );
        }
    }

    @Override
    public void onNewToken(String token) {
        sendRegistrationToServer(token);
    }

    private void handleDataMessage(Map<String, String> data) {
        try {
            String type = data.get("type");
            String title = data.get("title");
            String message = data.get("message");
            if (message == null) message = data.get("body");

            if (type != null) {
                switch (type) {
                    case "reserva_confirmada":
                        title = getString(R.string.notif_confirmada_title);
                        message = getString(R.string.notif_confirmada_body, data.get("ruta_nombre"), data.get("conductor_nombre"));
                        break;
                    case "nueva_reserva":
                        title = getString(R.string.notif_nueva_reserva_driver_title);
                        message = getString(R.string.notif_nueva_reserva_body, data.get("pasajero_nombre"), data.get("asiento_nombre"), data.get("ruta_nombre"));
                        break;
                }
            }

            if (title != null && message != null) {
                sendNotification(title, message, data);
            }
        } catch (Exception e) {
            Log.e(TAG, "Error: " + e.getMessage());
        }
    }

    private void sendNotification(String title, String messageBody, Map<String, String> data) {
        try {
            // Siempre vamos a MainActivity
            Intent intent = new Intent(this, MainActivity.class);
            intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);

            if (data != null) {
                for (Map.Entry<String, String> entry : data.entrySet()) {
                    intent.putExtra(entry.getKey(), entry.getValue());
                }
                // Indicar al NavHost a dónde ir
                if (data.containsKey("target_activity")) {
                    intent.putExtra("nav_target", data.get("target_activity"));
                }
            }

            int requestCode = (int) System.currentTimeMillis();
            PendingIntent pendingIntent = PendingIntent.getActivity(this, requestCode, intent,
                    PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);

            NotificationCompat.Builder notificationBuilder =
                    new NotificationCompat.Builder(this, CHANNEL_ID)
                            .setSmallIcon(R.drawable.ic_notification)
                            .setColor(getResources().getColor(R.color.primary_500))
                            .setContentTitle(title)
                            .setContentText(messageBody)
                            .setAutoCancel(true)
                            .setContentIntent(pendingIntent)
                            .setPriority(NotificationCompat.PRIORITY_HIGH)
                            .setVisibility(NotificationCompat.VISIBILITY_PUBLIC);

            android.app.NotificationManager notificationManager =
                    (android.app.NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);

            notificationManager.notify((int)System.currentTimeMillis(), notificationBuilder.build());

        } catch (Exception e) {
            Log.e(TAG, "Error: " + e.getMessage());
        }
    }

    private void createNotificationChannel(android.app.NotificationManager notificationManager) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(CHANNEL_ID, CHANNEL_NAME, android.app.NotificationManager.IMPORTANCE_HIGH);
            notificationManager.createNotificationChannel(channel);
        }
    }

    private void sendRegistrationToServer(String token) {
        com.google.firebase.auth.FirebaseUser user = com.google.firebase.auth.FirebaseAuth.getInstance().getCurrentUser();
        if (user != null) {
            String userId = user.getUid();
            com.google.firebase.database.DatabaseReference db = com.chopcode.rutago.app.config.MyApp.getDatabaseReference("");
            db.child("usuarios").child(userId).child("tokenFCM").setValue(token);
            db.child("conductores").child(userId).child("tokenFCM").setValue(token);
        }
    }
}

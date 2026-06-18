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

import com.chopcode.rutago.app.activities.common.LoginActivity;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;
import com.chopcode.rutago.app.R;

import java.util.Map;

/**
 * 🔔 Notification Service
 * 
 * Centraliza la recepción de mensajes de Firebase (FCM).
 * Implementa el estándar de estilo Premium para todas las notificaciones
 * y gestiona el Deep Linking para dirigir al usuario a la pantalla correcta.
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
        Log.d(TAG, "🔄 Inicializando NotificationService");
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            android.app.NotificationManager notificationManager =
                    (android.app.NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
            createNotificationChannel(notificationManager);
        }
    }

    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        Log.d(TAG, "📨 MENSAJE RECIBIDO DE: " + remoteMessage.getFrom());

        // Prioridad 1: Si el mensaje contiene DATA, manejamos la lógica personalizada
        if (remoteMessage.getData().size() > 0) {
            Log.d(TAG, "📊 Datos del mensaje: " + remoteMessage.getData());
            handleDataMessage(remoteMessage.getData());
            return; 
        }

        // Prioridad 2: Si es una notificación estándar (Notification Payload)
        if (remoteMessage.getNotification() != null) {
            Log.d(TAG, "🔔 Notificación estándar detectada");
            sendNotification(
                    remoteMessage.getNotification().getTitle(),
                    remoteMessage.getNotification().getBody(),
                    null
            );
        }
    }

    @Override
    public void onNewToken(String token) {
        Log.d(TAG, "🔑 NUEVO TOKEN FCM: " + token);
        sendRegistrationToServer(token);
    }

    private void handleDataMessage(Map<String, String> data) {
        try {
            String type = data.get("type");
            String title = data.get("title");
            String message = data.get("message");

            Log.d(TAG, "📝 Procesando mensaje de tipo: " + type);

            // Estandarización de contenidos según tipo (Clean Architecture)
            if (type != null) {
                switch (type) {
                    case "reserva_confirmada":
                        title = getString(R.string.notif_confirmada_title);
                        message = getString(R.string.notif_confirmada_body, 
                                data.get("ruta_nombre"), data.get("conductor_nombre"));
                        break;
                    case "nueva_reserva":
                        title = getString(R.string.notif_nueva_reserva_driver_title);
                        message = getString(R.string.notif_nueva_reserva_body, 
                                data.get("pasajero_nombre"), data.get("asiento_nombre"), data.get("ruta_nombre"));
                        break;
                    case "promotion":
                        title = getString(R.string.notif_promotion_title);
                        message = getString(R.string.notif_promotion_body);
                        break;
                    case "reserva_cancelada":
                        title = getString(R.string.notif_cancelada_title);
                        message = getString(R.string.notif_cancelada_body, data.get("ruta_nombre"));
                        break;
                    case "chat_message":
                        // El título ya viene formateado desde NotificationManager
                        break;
                }
            }

            // Si tenemos el contenido listo, disparamos la UI
            if (title != null && message != null) {
                sendNotification(title, message, data);
            }

        } catch (Exception e) {
            Log.e(TAG, "❌ Error handling data message: " + e.getMessage());
        }
    }

    /**
     * Construye y muestra la notificación con el estilo PREMIUM unificado.
     */
    private void sendNotification(String title, String messageBody, Map<String, String> data) {
        try {
            Log.d(TAG, "🎯 Generando notificación Premium: " + title);

            // 1. Determinar el destino (Deep Linking)
            Class<?> targetClass = LoginActivity.class; 
            
            if (data != null && data.containsKey("target_activity")) {
                String target = data.get("target_activity");
                if (target != null) {
                    switch (target) {
                        case "driver_home":
                            targetClass = com.chopcode.rutago.app.activities.driver.DriverHomeActivity.class;
                            break;
                        case "passenger_history":
                            targetClass = com.chopcode.rutago.app.activities.passenger.history.ReservationHistoryActivity.class;
                            break;
                        case "passenger_home":
                            targetClass = com.chopcode.rutago.app.activities.passenger.PassengerHomeActivity.class;
                            break;
                        case "chat":
                            targetClass = com.chopcode.rutago.app.activities.common.ChatActivity.class;
                            android.util.Log.d(TAG, "🚀 Destino de notificación: ChatActivity");
                            break;
                    }
                }
            }

            Intent intent = new Intent(this, targetClass);
            intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);

            if (data != null) {
                for (Map.Entry<String, String> entry : data.entrySet()) {
                    intent.putExtra(entry.getKey(), entry.getValue());
                }
            }

            int requestCode = (int) System.currentTimeMillis();
            PendingIntent pendingIntent = PendingIntent.getActivity(this, requestCode, intent,
                    PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);

            Uri defaultSoundUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);

            // ✅ IDENTIDAD VISUAL PREMIUM RUTA-GO
            int smallIcon = R.drawable.ic_notification; // Campanita blanca minimalista
            android.graphics.Bitmap largeIcon = android.graphics.BitmapFactory.decodeResource(
                    getResources(), R.drawable.logo_main); // Logo oficial circular

            NotificationCompat.Builder notificationBuilder =
                    new NotificationCompat.Builder(this, CHANNEL_ID)
                            .setSmallIcon(smallIcon)
                            .setLargeIcon(largeIcon)
                            .setColor(getResources().getColor(R.color.primary_500)) // Naranja corporativo
                            .setContentTitle(title)
                            .setContentText(messageBody)
                            .setSubText(getString(R.string.app_name)) // Etiqueta superior
                            .setStyle(new NotificationCompat.BigTextStyle().bigText(messageBody)) // Texto expandible
                            .setAutoCancel(true)
                            .setSound(defaultSoundUri)
                            .setContentIntent(pendingIntent)
                            .setPriority(NotificationCompat.PRIORITY_HIGH)
                            .setVibrate(new long[]{0, 500, 250, 500})
                            .setCategory(NotificationCompat.CATEGORY_MESSAGE)
                            .setVisibility(NotificationCompat.VISIBILITY_PUBLIC);

            android.app.NotificationManager notificationManager =
                    (android.app.NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);

            createNotificationChannel(notificationManager);

            int notificationId = (int) System.currentTimeMillis();
            notificationManager.notify(notificationId, notificationBuilder.build());

        } catch (Exception e) {
            Log.e(TAG, "❌ Error creando notificación: " + e.getMessage());
        }
    }

    private void createNotificationChannel(android.app.NotificationManager notificationManager) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(
                    CHANNEL_ID,
                    CHANNEL_NAME,
                    android.app.NotificationManager.IMPORTANCE_HIGH
            );
            channel.setDescription("Canal premium para notificaciones de Ruta-Go");
            channel.enableVibration(true);
            channel.setVibrationPattern(new long[]{0, 500, 200, 500});
            notificationManager.createNotificationChannel(channel);
        }
    }

    private void sendRegistrationToServer(String token) {
        String userId = null;
        com.google.firebase.auth.FirebaseUser user = com.google.firebase.auth.FirebaseAuth.getInstance().getCurrentUser();
        
        if (user != null) {
            userId = user.getUid();
        } else {
            SharedPreferences prefs = getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
            userId = prefs.getString(KEY_USER_ID, null);
        }

        if (userId != null && !userId.isEmpty()) {
            Log.d(TAG, "💾 Guardando Token FCM para: " + userId);
            com.google.firebase.database.DatabaseReference db = com.chopcode.rutago.app.config.MyApp.getDatabaseReference("");
            db.child("usuarios").child(userId).child("tokenFCM").setValue(token);
            db.child("conductores").child(userId).child("tokenFCM").setValue(token);
        }
    }
}

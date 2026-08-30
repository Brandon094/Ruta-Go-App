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

import com.chopcode.rutago.app.activities.common.HomeActivity;
import com.chopcode.rutago.app.activities.common.LoginActivity;
import com.chopcode.rutago.app.activities.common.history.HistoryActivity;
import com.chopcode.rutago.app.activities.common.ChatActivity;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;
import com.chopcode.rutago.app.R;

import java.util.Map;

/**
 * Notification Service (FCM)
 *
 * Motor de recepción y despacho de notificaciones Push de Firebase.
 * Responsabilidades:
 * - Centralizar la escucha de mensajes remotos (Payloads de datos y notificaciones estándar).
 * - Implementar el motor de "Deep Linking": redirigir al usuario a la actividad exacta 
 *   (Chat, Historial, Home) según los metadatos del mensaje.
 * - Gestionar el ciclo de vida de los tokens de registro (FCM Tokens) y su persistencia en la DB.
 * - Garantizar una identidad visual Premium mediante el uso de estilos Material, iconos corporativos 
 *   y canales de alta prioridad (Android Oreo+).
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

    /**
     * Se dispara cuando Firebase entrega un mensaje a la aplicación.
     */
    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        Log.d(TAG, "📨 MENSAJE RECIBIDO DE: " + remoteMessage.getFrom());

        // Prioridad 1: Payloads de Datos (Lógica personalizada)
        if (remoteMessage.getData().size() > 0) {
            Map<String, String> data = new java.util.HashMap<>(remoteMessage.getData());
            
            // Si el mensaje trae objeto 'notification', inyectar sus valores en el mapa de datos 
            // como fallback para asegurar que handleDataMessage tenga algo que mostrar.
            if (remoteMessage.getNotification() != null) {
                if (!data.containsKey("title")) data.put("title", remoteMessage.getNotification().getTitle());
                if (!data.containsKey("body")) data.put("body", remoteMessage.getNotification().getBody());
            }
            
            handleDataMessage(data);
            return; 
        }

        // Prioridad 2: Notificación estándar del sistema
        if (remoteMessage.getNotification() != null) {
            sendNotification(
                    remoteMessage.getNotification().getTitle(),
                    remoteMessage.getNotification().getBody(),
                    null
            );
        }
    }

    /**
     * Se dispara cuando el token del dispositivo es renovado por Google.
     */
    @Override
    public void onNewToken(String token) {
        Log.d(TAG, "🔑 NUEVO TOKEN FCM GENERADO: " + token);
        sendRegistrationToServer(token);
    }

    /**
     * Analiza el mapa de datos para determinar el contenido dinámico y el destino del clic.
     */
    private void handleDataMessage(Map<String, String> data) {
        try {
            String type = data.get("type");
            String title = data.get("title");
            String message = data.get("message");
            
            // Soporte para llave "body" (estándar FCM) si "message" está vacío
            if (message == null) message = data.get("body");

            if (type != null) {
                switch (type) {
                    case "reserva_confirmada":
                        title = getString(R.string.notif_confirmada_title);
                        message = getString(R.string.notif_confirmada_body, 
                                data.get("ruta_nombre"), data.get("conductor_nombre"));
                        break;
                    case "nueva_reserva":
                    case "new_reservation":
                        if (title == null) title = getString(R.string.notif_nueva_reserva_driver_title);
                        if (message == null || message.isEmpty()) {
                            message = getString(R.string.notif_nueva_reserva_body, 
                                    data.get("pasajero_nombre"), data.get("asiento_nombre"), data.get("ruta_nombre"));
                        }
                        break;
                    case "reservation_status_update":
                        String status = data.get("status");
                        if (status != null) {
                            title = getString(R.string.notif_generic_status_title, status);
                            if ("Confirmada".equals(status)) {
                                title = getString(R.string.notif_confirmada_title);
                            } else if ("Cancelada".equals(status)) {
                                title = getString(R.string.notif_cancelada_title);
                            }
                        }
                        break;
                    case "promotion":
                        title = getString(R.string.notif_promotion_title);
                        message = getString(R.string.notif_promotion_body);
                        break;
                    case "reserva_cancelada":
                        title = getString(R.string.notif_cancelada_title);
                        message = getString(R.string.notif_cancelada_body, data.get("ruta_nombre"));
                        break;
                }
            }

            if (title != null && message != null) {
                sendNotification(title, message, data);
            }

        } catch (Exception e) {
            Log.e(TAG, "❌ Error al procesar Data Message: " + e.getMessage());
        }
    }

    /**
     * Construye y muestra la notificación física en la bandeja de Android.
     */
    private void sendNotification(String title, String messageBody, Map<String, String> data) {
        try {
            // Resolución dinámica de la actividad destino (Deep Linking)
            Class<?> targetClass = LoginActivity.class; 
            
            if (data != null && data.containsKey("target_activity")) {
                String target = data.get("target_activity");
                if (target != null) {
                    switch (target) {
                        case "driver_home":
                        case "passenger_home":
                            targetClass = HomeActivity.class;
                            break;
                        case "driver_reservations":
                        case "passenger_history":
                        case "passenger_reservations":
                            targetClass = HistoryActivity.class;
                            break;
                        case "chat":
                            targetClass = ChatActivity.class;
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

            // Configuración visual con estándares Premium
            NotificationCompat.Builder notificationBuilder =
                    new NotificationCompat.Builder(this, CHANNEL_ID)
                            .setSmallIcon(R.drawable.ic_notification)
                            .setLargeIcon(android.graphics.BitmapFactory.decodeResource(getResources(), R.drawable.logo_main))
                            .setColor(getResources().getColor(R.color.primary_500))
                            .setContentTitle(title)
                            .setContentText(messageBody)
                            .setSubText(getString(R.string.app_name))
                            .setStyle(new NotificationCompat.BigTextStyle().bigText(messageBody))
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
            Log.e(TAG, "❌ Error al despachar notificación: " + e.getMessage());
        }
    }

    /**
     * Crea el canal de comunicación obligatorio para versiones modernas de Android.
     */
    private void createNotificationChannel(android.app.NotificationManager notificationManager) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(
                    CHANNEL_ID,
                    CHANNEL_NAME,
                    android.app.NotificationManager.IMPORTANCE_HIGH
            );
            channel.setDescription("Canal unificado de alta prioridad para Ruta-Go");
            channel.enableVibration(true);
            notificationManager.createNotificationChannel(channel);
        }
    }

    /**
     * Sincroniza el token del dispositivo con el perfil del usuario en la base de datos.
     */
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
            com.google.firebase.database.DatabaseReference db = com.chopcode.rutago.app.config.MyApp.getDatabaseReference("");
            db.child("usuarios").child(userId).child("tokenFCM").setValue(token);
            db.child("conductores").child(userId).child("tokenFCM").setValue(token);
        }
    }
}

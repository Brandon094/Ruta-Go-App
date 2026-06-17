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
        // Crear el canal inmediatamente
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            android.app.NotificationManager notificationManager =
                    (android.app.NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
            createNotificationChannel(notificationManager);
        }
    }
    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        Log.d(TAG, "📨 MENSAJE RECIBIDO DE: " + remoteMessage.getFrom());

        // Check if message contains a data payload
        if (remoteMessage.getData().size() > 0) {
            Log.d(TAG, "📊 Datos del mensaje: " + remoteMessage.getData());
            handleDataMessage(remoteMessage.getData());
        }

        // Check if message contains a notification payload
        if (remoteMessage.getNotification() != null) {
            Log.d(TAG, "🔔 Notificación - Título: " + remoteMessage.getNotification().getTitle());
            Log.d(TAG, "🔔 Notificación - Cuerpo: " + remoteMessage.getNotification().getBody());
            sendNotification(
                    remoteMessage.getNotification().getTitle(),
                    remoteMessage.getNotification().getBody(),
                    remoteMessage.getData()
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
            String title = data.get("title");
            String message = data.get("message");
            String type = data.get("type");

            Log.d(TAG, "📝 Procesando datos - Título: " + title);
            Log.d(TAG, "📝 Procesando datos - Mensaje: " + message);
            Log.d(TAG, "📝 Procesando datos - Tipo: " + type);

            // Handle different notification types with custom inviting messages
            if (type != null) {
                switch (type) {
                    case "reserva_confirmada":
                        handleReservaConfirmada(data);
                        return; // Evitar duplicar
                    case "nueva_reserva":
                        handleNuevaReserva(data);
                        return;
                    case "promotion":
                        handlePromotionNotification(data);
                        return;
                    case "alert":
                        handleAlertNotification(data);
                        break;
                    case "update":
                        handleUpdateNotification(data);
                        break;
                }
            }

            // Si no hay tipo específico pero tiene título y mensaje, usar los datos
            if (title != null && message != null) {
                sendNotification(title, message, data);
            }

        } catch (Exception e) {
            Log.e(TAG, "❌ Error handling data message: " + e.getMessage());
        }
    }

    private void handleAlertNotification(Map<String, String> data) {
        Log.d(TAG, "🔄 Processing alert notification");
    }

    private void handleUpdateNotification(Map<String, String> data) {
        Log.d(TAG, "🔄 Processing update notification");
    }

    private void handlePromotionNotification(Map<String, String> data) {
        Log.d(TAG, "🔄 Processing promotion notification");
        String title = data.get("title") != null ? data.get("title") : "¡Mira esto! ✨";
        String message = data.get("message") != null ? data.get("message") : "Tenemos algo nuevo para ti en RutaGo. ¡Ven a verlo!";
        sendNotification(title, message, data);
    }

    private void handleReservaConfirmada(Map<String, String> data) {
        Log.d(TAG, "✅ Processing reserva confirmada notification");
        String title = "¡Reservation Confirmada! ✅";
        String message = "Tu cupo en RutaGo ya está asegurado. ¡Entra para ver los detalles de tu viaje!";
        sendNotification(title, message, data);
    }

    private void handleNuevaReserva(Map<String, String> data) {
        Log.d(TAG, "🚗 Processing nueva reserva notification");
        String title = "¡Nueva Reservation Recibida! 🚗";
        String message = "Un pasajero ha solicitado un puesto. ¡Entra ahora para gestionar tu próxima ruta!";
        sendNotification(title, message, data);
    }

    private void sendNotification(String title, String messageBody, Map<String, String> data) {
        try {
            Log.d(TAG, "🎯 Creando notificación con Deep Link: " + title);

            // 1. Determinar el destino (Deep Linking)
            Class<?> targetClass = LoginActivity.class; // Destino por defecto
            
            if (data != null && data.containsKey("target_activity")) {
                String target = data.get("target_activity");
                Log.d(TAG, "📍 Destino detectado: " + target);
                
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
                    }
                }
            }

            Intent intent = new Intent(this, targetClass);
            intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);

            // Pasar todos los datos al intent por si la Activity los necesita
            if (data != null) {
                for (Map.Entry<String, String> entry : data.entrySet()) {
                    intent.putExtra(entry.getKey(), entry.getValue());
                }
            }

            // Usar un requestCode único para evitar que se pisen los Intents
            int requestCode = (int) System.currentTimeMillis();
            PendingIntent pendingIntent = PendingIntent.getActivity(this, requestCode, intent,
                    PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);

            Uri defaultSoundUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);

            // ✅ PERSONALIZACIÓN PREMIUM:
            // 1. Ícono pequeño (Campanita blanca sobre transparente)
            int smallIcon = R.drawable.ic_notification;
            
            // 2. Ícono grande (Logo oficial circular de RutaGo)
            android.graphics.Bitmap largeIcon = android.graphics.BitmapFactory.decodeResource(
                    getResources(), R.drawable.logo_main);

            NotificationCompat.Builder notificationBuilder =
                    new NotificationCompat.Builder(this, CHANNEL_ID)
                            .setSmallIcon(smallIcon)
                            .setLargeIcon(largeIcon)
                            .setColor(getResources().getColor(R.color.primary_500))
                            .setContentTitle(title != null ? title : getString(R.string.app_name))
                            .setContentText(messageBody)
                            .setSubText(getString(R.string.app_name)) // 👈 Etiqueta premium en la parte superior
                            .setStyle(new NotificationCompat.BigTextStyle()
                                    .bigText(messageBody))
                            .setAutoCancel(true)
                            .setSound(defaultSoundUri)
                            .setContentIntent(pendingIntent)
                            .setPriority(NotificationCompat.PRIORITY_HIGH)
                            .setVibrate(new long[]{0, 500, 250, 500}) // Patrón de vibración más elegante
                            .setCategory(NotificationCompat.CATEGORY_MESSAGE)
                            .setVisibility(NotificationCompat.VISIBILITY_PUBLIC);

            android.app.NotificationManager notificationManager =
                    (android.app.NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);

            // Create notification channel for Android O and above
            createNotificationChannel(notificationManager);

            // Generate unique ID for each notification
            int notificationId = (int) System.currentTimeMillis();
            notificationManager.notify(notificationId, notificationBuilder.build());

            Log.d(TAG, "✅ Notificación mostrada: " + title);

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
            channel.setDescription("Channel for Transporte notifications");
            channel.enableVibration(true);
            channel.setVibrationPattern(new long[]{0, 500, 200, 500});
            notificationManager.createNotificationChannel(channel);
            Log.d(TAG, "✅ Canal de notificaciones creado");
        }
    }

    private void sendRegistrationToServer(String token) {
        // ✅ REPARADO: Obtener ID directamente de Firebase Auth si es posible
        String userId = null;
        com.google.firebase.auth.FirebaseUser user = com.google.firebase.auth.FirebaseAuth.getInstance().getCurrentUser();
        
        if (user != null) {
            userId = user.getUid();
        } else {
            // Intentar por SharedPreferences
            SharedPreferences prefs = getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
            userId = prefs.getString(KEY_USER_ID, null);
        }

        if (userId != null && !userId.isEmpty()) {
            Log.d(TAG, "💾 Guardando Token FCM para: " + userId);
            com.google.firebase.database.DatabaseReference db = com.chopcode.rutago.app.config.MyApp.getDatabaseReference("");
            db.child("usuarios").child(userId).child("tokenFCM").setValue(token);
            db.child("conductores").child(userId).child("tokenFCM").setValue(token);
        } else {
            Log.w(TAG, "⚠️ Token generado pero el usuario no ha iniciado sesión.");
        }
    }

    /**
     * ✅ NUEVO MÉTODO: Obtener el ID del usuario actual desde SharedPreferences
     */
    private String obtenerUserIdActual() {
        try {
            SharedPreferences prefs = getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
            String userId = prefs.getString(KEY_USER_ID, null);

            if (userId != null) {
                Log.d(TAG, "👤 UserId obtenido: " + userId);
                return userId;
            } else {
                Log.w(TAG, "⚠️ UserId no encontrado en SharedPreferences");
                return "current_user_id"; // Fallback
            }
        } catch (Exception e) {
            Log.e(TAG, "❌ Error obteniendo userId: " + e.getMessage());
            return "current_user_id";
        }
    }
}

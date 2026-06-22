package com.chopcode.rutago.app.managers.core.notifications;

import android.content.Context;
import android.net.ConnectivityManager;
import android.util.Log;

import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.config.MyApp;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.ValueEventListener;

import org.json.JSONObject;

import java.io.IOException;
import java.io.InputStream;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import okhttp3.Call;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class NotificationManager {

    private static final String TAG = "NotificationManager";
    private static NotificationManager instance;
    private final DatabaseReference realtimeDb;
    private final OkHttpClient httpClient;
    private final Context context;

    private static final String PROJECT_ID = "trasnporte-nataga---la-plata";
    private static final String FCM_V1_API_URL = "https://fcm.googleapis.com/v1/projects/" + PROJECT_ID + "/messages:send";
    private static final MediaType JSON = MediaType.get("application/json; charset=utf-8");

    private NotificationManager(Context context) {
        this.context = context;
        this.realtimeDb = MyApp.getDatabaseReference("");
        this.httpClient = new OkHttpClient();
        Log.d(TAG, "🚀 NotificationManager inicializado con FCM V1");
    }

    public static synchronized NotificationManager getInstance(Context context) {
        if (instance == null) {
            instance = new NotificationManager(context.getApplicationContext());
        }
        return instance;
    }

    private String getAccessToken() throws IOException {
        InputStream is = null;
        try {
            Log.d(TAG, "📂 Cargando llave desde assets...");
            is = context.getAssets().open("service-account.json");
            
            // Forzar la recarga de credenciales y verificar el tiempo
            GoogleCredentials credentials = GoogleCredentials.fromStream(is)
                    .createScoped(Collections.singletonList("https://www.googleapis.com/auth/cloud-platform"));
            
            Log.d(TAG, "🔐 Refrescando token de acceso...");
            credentials.refresh(); // Intentar refrescar explícitamente
            
            String token = credentials.getAccessToken().getTokenValue();
            Log.d(TAG, "✅ Access Token generado exitosamente");
            return token;
        } catch (Exception e) {
            Log.e(TAG, "❌ ERROR FATAL OAUTH2: " + e.getMessage());
            if (e.getMessage() != null && e.getMessage().contains("400 Bad Request")) {
                Log.e(TAG, "💡 TIP: Este error suele ser por FECHA/HORA incorrecta en el dispositivo.");
            }
            throw new IOException(e.getMessage());
        } finally {
            if (is != null) try { is.close(); } catch (IOException ignored) {}
        }
    }

    /**
     * 1. CUANDO EL PASAJERO CREA LA RESERVA -> NOTIFICA AL CONDUCTOR
     */
    public void notificarNuevaReservaAlConductor(String conductorId, String pasajeroNombre,
                                                 String ruta, String fechaHora, int asiento,
                                                 double precio, String metodoPago,
                                                 NotificationCallback callback) {
        
        Log.d(TAG, "🔔 [ENVIANDO -> CONDUCTOR] Nueva reserva de: " + pasajeroNombre);
        
        String title = context.getString(R.string.notif_nueva_reserva_title);
        String body = context.getString(R.string.notif_nueva_reserva_body, pasajeroNombre, "A" + asiento, ruta);

        Map<String, Object> notificationData = new HashMap<>();
        notificationData.put("title", title);
        notificationData.put("message", body);
        notificationData.put("type", "nueva_reserva");
        notificationData.put("pasajero_nombre", pasajeroNombre);
        notificationData.put("asiento_nombre", "A" + asiento);
        notificationData.put("ruta_nombre", ruta);
        notificationData.put("reserva_asiento", "A" + asiento);
        notificationData.put("reserva_pasajero", pasajeroNombre);
        notificationData.put("target_activity", "driver_home");
        notificationData.put("timestamp", String.valueOf(System.currentTimeMillis()));

        // Guardar en BD para historial del conductor
        guardarNotificacionEnBD(conductorId, notificationData, new NotificationCallback() {
            @Override
            public void onSuccess() {
                enviarPushV1(conductorId, title, body, notificationData, callback);
            }

            @Override
            public void onError(String error) {
                if (callback != null) callback.onError(error);
            }
        });
    }

    /**
     * 2. CUANDO EL CONDUCTOR CONFIRMA -> NOTIFICA AL PASAJERO
     */
    public void notificarReservaConfirmadaAlPasajero(String pasajeroId, String conductorNombre,
                                                     String ruta, String fechaHora, int asiento,
                                                     String vehiculoPlaca, String vehiculoModelo,
                                                     NotificationCallback callback) {

        Log.d(TAG, "🔔 [ENVIANDO -> PASAJERO] Reservation Confirmada por: " + conductorNombre);

        String title = context.getString(R.string.notif_confirmada_title);
        String body = context.getString(R.string.notif_confirmada_body, ruta, conductorNombre);

        Map<String, Object> notificationData = new HashMap<>();
        notificationData.put("title", title);
        notificationData.put("message", body);
        notificationData.put("type", "reserva_confirmada");
        notificationData.put("reserva_asiento", "A" + asiento);
        notificationData.put("conductor_nombre", conductorNombre);
        notificationData.put("ruta_nombre", ruta);
        notificationData.put("target_activity", "passenger_history");
        notificationData.put("timestamp", String.valueOf(System.currentTimeMillis()));

        guardarNotificacionEnBD(pasajeroId, notificationData, new NotificationCallback() {
            @Override
            public void onSuccess() {
                enviarPushV1(pasajeroId, title, body, notificationData, callback);
            }

            @Override
            public void onError(String error) {
                if (callback != null) callback.onError(error);
            }
        });
    }

    /**
     * 3. CUANDO EL CONDUCTOR CANCELA -> NOTIFICA AL PASAJERO
     */
    public void notificarReservaCanceladaAlPasajero(String pasajeroId, String conductorNombre,
                                                    String ruta, String motivo,
                                                    NotificationCallback callback) {

        Log.d(TAG, "🔔 [ENVIANDO -> PASAJERO] Reservation Cancelada");

        String title = context.getString(R.string.notif_cancelada_title);
        String body = context.getString(R.string.notif_cancelada_body, ruta);

        Map<String, Object> notificationData = new HashMap<>();
        notificationData.put("title", title);
        notificationData.put("message", body);
        notificationData.put("type", "reserva_cancelada");
        notificationData.put("ruta_nombre", ruta);
        notificationData.put("motivo", motivo);
        notificationData.put("target_activity", "passenger_history");
        notificationData.put("timestamp", String.valueOf(System.currentTimeMillis()));

        guardarNotificacionEnBD(pasajeroId, notificationData, new NotificationCallback() {
            @Override
            public void onSuccess() {
                enviarPushV1(pasajeroId, title, body, notificationData, callback);
            }

            @Override
            public void onError(String error) {
                if (callback != null) callback.onError(error);
            }
        });
    }

    /**
     * 4. NOTIFICACIÓN DE MENSAJE DE CHAT
     */
    public void notificarNuevoMensaje(String receptorId, String emisorId, String emisorNombre, String mensaje, String reservaId, NotificationCallback callback) {
        String title = context.getString(R.string.notif_chat_title, emisorNombre);
        String body = mensaje.length() > 50 ? mensaje.substring(0, 47) + "..." : mensaje;

        Map<String, Object> data = new HashMap<>();
        data.put("type", "chat_message");
        data.put("title", title);
        data.put("message", body);
        data.put("reservationId", reservaId);
        data.put("receiverId", emisorId); // El emisor original será el receptor de la respuesta
        data.put("senderName", emisorNombre); // Usar el nombre real del emisor
        data.put("target_activity", "chat");
        data.put("timestamp", String.valueOf(System.currentTimeMillis()));

        enviarPushV1(receptorId, title, body, data, callback);
    }

    private void enviarPushV1(String userId, String title, String body,
                             Map<String, Object> data, NotificationCallback callback) {
        
        getUserToken(userId, new OnTokenReceivedListener() {
            @Override
            public void onTokenReceived(String targetToken) {
                new Thread(() -> {
                    try {
                        String accessToken = getAccessToken();
                        JSONObject payload = new JSONObject();
                        JSONObject message = new JSONObject();
                        message.put("token", targetToken);

                        JSONObject notification = new JSONObject();
                        notification.put("title", title);
                        notification.put("body", body);
                        message.put("notification", notification);

                        JSONObject dataJson = new JSONObject();
                        for (Map.Entry<String, Object> entry : data.entrySet()) {
                            dataJson.put(entry.getKey(), String.valueOf(entry.getValue()));
                        }
                        message.put("data", dataJson);
                        payload.put("message", message);
                        
                        RequestBody requestBody = RequestBody.create(payload.toString(), JSON);
                        Request request = new Request.Builder()
                                .url(FCM_V1_API_URL)
                                .post(requestBody)
                                .addHeader("Authorization", "Bearer " + accessToken)
                                .build();

                        httpClient.newCall(request).enqueue(new okhttp3.Callback() {
                            @Override
                            public void onFailure(Call call, IOException e) {
                                if (callback != null) callback.onError(e.getMessage());
                            }

                            @Override
                            public void onResponse(Call call, Response response) throws IOException {
                                if (response.isSuccessful()) {
                                    Log.d(TAG, "✅ Push enviado con éxito a: " + userId);
                                    if (callback != null) callback.onSuccess();
                                } else {
                                    if (callback != null) callback.onError("Error FCM: " + response.code());
                                }
                                response.close();
                            }
                        });

                    } catch (Exception e) {
                        Log.e(TAG, "❌ Error en Push: " + e.getMessage());
                        if (callback != null) callback.onError(e.getMessage());
                    }
                }).start();
            }

            @Override
            public void onError(Exception exception) {
                Log.e(TAG, "❌ No se encontró token para: " + userId);
                if (callback != null) callback.onError(exception.getMessage());
            }
        });
    }

    private void guardarNotificacionEnBD(String receiverId, Map<String, Object> notificationData,
                                        NotificationCallback callback) {
        String notificationId = "notif_" + System.currentTimeMillis() + "_" + new Random().nextInt(1000);
        DatabaseReference ref = realtimeDb.child("notificaciones").child(notificationId);

        Map<String, Object> fullData = new HashMap<>();
        fullData.put("id", notificationId);
        fullData.put("receiverId", receiverId);
        fullData.put("type", notificationData.get("type"));
        fullData.put("title", notificationData.get("title"));
        fullData.put("message", notificationData.get("message"));
        fullData.put("status", "pending");
        fullData.put("createdAt", System.currentTimeMillis());

        ref.setValue(fullData)
                .addOnSuccessListener(aVoid -> { if (callback != null) callback.onSuccess(); })
                .addOnFailureListener(e -> { if (callback != null) callback.onError(e.getMessage()); });
    }

    public void getUserToken(String userId, OnTokenReceivedListener listener) {
        // Buscar en usuarios
        realtimeDb.child("usuarios").child(userId).child("tokenFCM")
                .addListenerForSingleValueEvent(new ValueEventListener() {
                    @Override
                    public void onDataChange(DataSnapshot snapshot) {
                        if (snapshot.exists()) {
                            listener.onTokenReceived(snapshot.getValue(String.class));
                        } else {
                            // Buscar en conductores
                            realtimeDb.child("conductores").child(userId).child("tokenFCM")
                                    .addListenerForSingleValueEvent(new ValueEventListener() {
                                        @Override
                                        public void onDataChange(DataSnapshot snapshot) {
                                            if (snapshot.exists()) {
                                                listener.onTokenReceived(snapshot.getValue(String.class));
                                            } else {
                                                listener.onError(new Exception("Token no encontrado"));
                                            }
                                        }
                                        @Override
                                        public void onCancelled(DatabaseError error) { listener.onError(new Exception(error.getMessage())); }
                                    });
                        }
                    }
                    @Override
                    public void onCancelled(DatabaseError error) { listener.onError(new Exception(error.getMessage())); }
                });
    }

    public void saveFCMTokenToRealtimeDatabase(String userId, String userType) {
        com.google.firebase.messaging.FirebaseMessaging.getInstance().getToken()
                .addOnCompleteListener(task -> {
                    if (task.isSuccessful() && task.getResult() != null) {
                        String token = task.getResult();
                        String nodo = ("conductor".equals(userType) || "conductores".equals(userType)) ? "conductores" : "usuarios";
                        realtimeDb.child(nodo).child(userId).child("tokenFCM").setValue(token);
                    }
                });
    }

    public interface OnTokenReceivedListener {
        void onTokenReceived(String token);
        void onError(Exception exception);
    }

    public interface NotificationCallback {
        void onSuccess();
        void onError(String error);
    }
}

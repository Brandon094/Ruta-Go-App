package com.chopcode.trasnportenataga_laplata.managers.notificactions;

import android.content.Context;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;

import com.chopcode.trasnportenataga_laplata.config.MyApp;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.ValueEventListener;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import okhttp3.Call;
import okhttp3.Callback;
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
    private final ConnectivityManager connectivityManager;
    private final Context context;

    // ✅ CONFIGURACIÓN FCM V1 (Moderna)
    // El ID de tu proyecto se extrae del google-services.json
    private static final String PROJECT_ID = "trasnporte-nataga---la-plata";
    private static final String FCM_V1_API_URL = "https://fcm.googleapis.com/v1/projects/" + PROJECT_ID + "/messages:send";
    private static final MediaType JSON = MediaType.get("application/json; charset=utf-8");

    private NotificationManager(Context context) {
        this.context = context;
        this.realtimeDb = MyApp.getDatabaseReference("");
        this.httpClient = new OkHttpClient();
        this.connectivityManager = (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
        Log.d(TAG, "🚀 NotificationManager inicializado con FCM V1");
    }

    public static synchronized NotificationManager getInstance(Context context) {
        if (instance == null) {
            instance = new NotificationManager(context.getApplicationContext());
        }
        return instance;
    }

    /**
     * ✅ OBTENER TOKEN DE ACCESO OAUTH2 (Requerido para V1)
     * Este método lee el archivo service-account.json desde assets
     */
    private String getAccessToken() throws IOException {
        InputStream is = context.getAssets().open("service-account.json");
        GoogleCredentials credentials = GoogleCredentials.fromStream(is)
                .createScoped(Collections.singletonList("https://www.googleapis.com/auth/cloud-platform"));
        credentials.refreshIfExpired();
        return credentials.getAccessToken().getTokenValue();
    }

    public void notificarNuevaReservaAlConductor(String conductorId, String pasajeroNombre,
                                                 String ruta, String fechaHora, int asiento,
                                                 double precio, String metodoPago,
                                                 NotificationCallback callback) {
        
        Map<String, Object> notificationData = new HashMap<>();
        notificationData.put("title", "🚗 Nueva Reserva");
        notificationData.put("message", String.format("%s reservó asiento A%d para %s", pasajeroNombre, asiento, ruta));
        notificationData.put("type", "nueva_reserva");
        notificationData.put("reserva_asiento", "A" + asiento);
        notificationData.put("reserva_pasajero", pasajeroNombre);
        notificationData.put("timestamp", String.valueOf(System.currentTimeMillis()));

        guardarNotificacionEnNodoSeparado(conductorId, notificationData, new NotificationCallback() {
            @Override
            public void onSuccess() {
                enviarNotificacionPushV1(conductorId, "🚗 Nueva Reserva",
                        String.format("%s reservó asiento A%d para %s", pasajeroNombre, asiento, ruta),
                        notificationData, callback);
            }

            @Override
            public void onError(String error) {
                if (callback != null) callback.onError(error);
            }
        });
    }

    public void notificarReservaConfirmadaAlPasajero(String pasajeroId, String conductorNombre,
                                                     String ruta, String fechaHora, int asiento,
                                                     String vehiculoPlaca, String vehiculoModelo,
                                                     NotificationCallback callback) {

        Map<String, Object> notificationData = new HashMap<>();
        notificationData.put("title", "✅ Reserva Confirmada");
        notificationData.put("message", String.format("Tu reserva para %s ha sido confirmada", ruta));
        notificationData.put("type", "reserva_confirmada");
        notificationData.put("reserva_asiento", "A" + asiento);
        notificationData.put("timestamp", String.valueOf(System.currentTimeMillis()));

        guardarNotificacionEnNodoSeparado(pasajeroId, notificationData, new NotificationCallback() {
            @Override
            public void onSuccess() {
                enviarNotificacionPushV1(pasajeroId, "✅ Reserva Confirmada",
                        String.format("Tu reserva para %s ha sido confirmada por %s", ruta, conductorNombre),
                        notificationData, callback);
            }

            @Override
            public void onError(String error) {
                if (callback != null) callback.onError(error);
            }
        });
    }

    public void notificarReservaCanceladaAlPasajero(String pasajeroId, String conductorNombre,
                                                    String ruta, String motivo,
                                                    NotificationCallback callback) {

        Map<String, Object> notificationData = new HashMap<>();
        notificationData.put("title", "❌ Reserva Cancelada");
        notificationData.put("message", String.format("Tu reserva para %s fue cancelada", ruta));
        notificationData.put("type", "reserva_cancelada");
        notificationData.put("timestamp", String.valueOf(System.currentTimeMillis()));

        guardarNotificacionEnNodoSeparado(pasajeroId, notificationData, new NotificationCallback() {
            @Override
            public void onSuccess() {
                enviarNotificacionPushV1(pasajeroId, "❌ Reserva Cancelada",
                        String.format("Tu reserva para %s fue cancelada por el conductor", ruta),
                        notificationData, callback);
            }

            @Override
            public void onError(String error) {
                if (callback != null) callback.onError(error);
            }
        });
    }

    /**
     * ✅ ENVÍO PUSH USANDO API V1
     */
    private void enviarNotificacionPushV1(String userId, String title, String body,
                                         Map<String, Object> data, NotificationCallback callback) {
        
        getUserToken(userId, new OnTokenReceivedListener() {
            @Override
            public void onTokenReceived(String targetToken) {
                // El envío V1 debe hacerse en un hilo secundario por el OAuth token
                new Thread(() -> {
                    try {
                        String accessToken = getAccessToken();
                        Log.d(TAG, "🔑 Access Token generado correctamente");

                        // Construir el JSON según el estándar V1
                        JSONObject payload = new JSONObject();
                        JSONObject message = new JSONObject();
                        
                        message.put("token", targetToken);

                        // Notificación visual
                        JSONObject notification = new JSONObject();
                        notification.put("title", title);
                        notification.put("body", body);
                        message.put("notification", notification);

                        // Datos extra
                        JSONObject dataJson = new JSONObject();
                        for (Map.Entry<String, Object> entry : data.entrySet()) {
                            dataJson.put(entry.getKey(), String.valueOf(entry.getValue()));
                        }
                        message.put("data", dataJson);

                        payload.put("message", message);

                        Log.d(TAG, "📤 Enviando via FCM V1...");
                        
                        RequestBody requestBody = RequestBody.create(payload.toString(), JSON);
                        Request request = new Request.Builder()
                                .url(FCM_V1_API_URL)
                                .post(requestBody)
                                .addHeader("Authorization", "Bearer " + accessToken)
                                .addHeader("Content-Type", "application/json")
                                .build();

                        httpClient.newCall(request).enqueue(new okhttp3.Callback() {
                            @Override
                            public void onFailure(Call call, IOException e) {
                                Log.e(TAG, "❌ Fallo HTTP V1: " + e.getMessage());
                                if (callback != null) callback.onError(e.getMessage());
                            }

                            @Override
                            public void onResponse(Call call, Response response) throws IOException {
                                try {
                                    if (response.isSuccessful()) {
                                        Log.d(TAG, "✅ Respuesta V1 Exitosa: " + response.code());
                                        if (callback != null) callback.onSuccess();
                                    } else {
                                        String errorBody = response.body() != null ? response.body().string() : "No body";
                                        Log.e(TAG, "❌ Error V1 (" + response.code() + "): " + errorBody);
                                        if (callback != null) callback.onError("Code: " + response.code());
                                    }
                                } finally {
                                    response.close();
                                }
                            }
                        });

                    } catch (Exception e) {
                        Log.e(TAG, "❌ Error generando Access Token: " + e.getMessage());
                        if (callback != null) callback.onError(e.getMessage());
                    }
                }).start();
            }

            @Override
            public void onError(Exception exception) {
                Log.e(TAG, "❌ No se pudo obtener el token del receptor: " + exception.getMessage());
                if (callback != null) callback.onError(exception.getMessage());
            }
        });
    }

    private void guardarNotificacionEnNodoSeparado(String receiverId, Map<String, Object> notificationData,
                                                   NotificationCallback callback) {
        String notificationId = "notif_" + System.currentTimeMillis() + "_" + new Random().nextInt(1000);
        DatabaseReference notificationRef = realtimeDb.child("notificaciones").child(notificationId);

        Map<String, Object> notificationComplete = new HashMap<>();
        notificationComplete.put("id", notificationId);
        notificationComplete.put("receiverId", receiverId);
        notificationComplete.put("type", notificationData.get("type"));
        notificationComplete.put("title", notificationData.get("title"));
        notificationComplete.put("message", notificationData.get("message"));
        notificationComplete.put("status", "pending");
        notificationComplete.put("createdAt", System.currentTimeMillis());

        notificationRef.setValue(notificationComplete)
                .addOnSuccessListener(aVoid -> {
                    if (callback != null) callback.onSuccess();
                })
                .addOnFailureListener(e -> {
                    if (callback != null) callback.onError(e.getMessage());
                });
    }

    public void getUserToken(String userId, OnTokenReceivedListener listener) {
        realtimeDb.child("usuarios").child(userId).child("tokenFCM")
                .addListenerForSingleValueEvent(new ValueEventListener() {
                    @Override
                    public void onDataChange(DataSnapshot dataSnapshot) {
                        if (dataSnapshot.exists()) {
                            listener.onTokenReceived(dataSnapshot.getValue(String.class));
                        } else {
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
                    public void onCancelled(DatabaseError databaseError) { listener.onError(new Exception(databaseError.getMessage())); }
                });
    }

    public void saveFCMTokenToRealtimeDatabase(String userId, String userType) {
        com.google.firebase.messaging.FirebaseMessaging.getInstance().getToken()
                .addOnCompleteListener(task -> {
                    if (task.isSuccessful() && task.getResult() != null) {
                        String token = task.getResult();
                        String nodo = "conductor".equals(userType) ? "conductores" : "usuarios";
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

package com.chopcode.trasnportenataga_laplata.config;

import android.app.Application;
import android.content.Context;
import android.os.Bundle;
import android.util.Log;

import androidx.annotation.NonNull;

import com.google.firebase.FirebaseApp;
import com.google.firebase.analytics.FirebaseAnalytics;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.crashlytics.FirebaseCrashlytics;
import java.util.Calendar;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import androidx.work.Constraints;
import androidx.work.ExistingPeriodicWorkPolicy;
import androidx.work.NetworkType;
import androidx.work.PeriodicWorkRequest;
import androidx.work.WorkManager;
import com.chopcode.trasnportenataga_laplata.services.reservations.driver.RotationWorker;

public class MyApp extends Application {

    private static MyApp instance;
    private FirebaseAuth firebaseAuth;
    private FirebaseDatabase firebaseDatabase;
    private FirebaseMessaging firebaseMessaging;
    private FirebaseAnalytics firebaseAnalytics;
    private FirebaseCrashlytics firebaseCrashlytics;

    @Override
    public void onCreate() {
        super.onCreate();
        instance = this;

        // Inicializar FirebaseApp
        FirebaseApp.initializeApp(this);

        // Inicializar cada servicio
        initializeFirebaseServices();

        // ✅ Programar la rotación automática de horarios
        scheduleRotationWorker();

        Log.d("MyApp", "✅ Firebase services initialized");
    }

    /**
     * Programa el Worker para que revise y ejecute la rotación todos los días.
     * Se sincroniza para intentar ejecutarse a las 00:00.
     */
    private void scheduleRotationWorker() {
        Log.d("MyApp", "🕒 Programando RotationWorker para las 00:00...");

        // Calcular delay hasta la medianoche
        Calendar calendar = Calendar.getInstance();
        long now = calendar.getTimeInMillis();
        
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        
        if (calendar.getTimeInMillis() <= now) {
            calendar.add(Calendar.DAY_OF_MONTH, 1);
        }
        
        long initialDelay = calendar.getTimeInMillis() - now;

        Constraints constraints = new Constraints.Builder()
                .setRequiredNetworkType(NetworkType.CONNECTED)
                .build();

        PeriodicWorkRequest rotationRequest = new PeriodicWorkRequest.Builder(
                RotationWorker.class,
                24, TimeUnit.HOURS) // Una vez al día
                .setInitialDelay(initialDelay, TimeUnit.MILLISECONDS)
                .setConstraints(constraints)
                .build();

        WorkManager.getInstance(this).enqueueUniquePeriodicWork(
                "RotationWork",
                ExistingPeriodicWorkPolicy.KEEP,
                rotationRequest
        );

        Log.d("MyApp", "✅ RotationWorker programado con un delay de " + (initialDelay / 1000 / 60) + " minutos");
    }

    private void initializeFirebaseServices() {
        try {
            // 1. Authentication
            firebaseAuth = FirebaseAuth.getInstance();
            Log.d("MyApp", "✅ FirebaseAuth initialized");

            // 2. Realtime Database
            firebaseDatabase = FirebaseDatabase.getInstance();
            // Opcional: Habilitar persistencia offline
            firebaseDatabase.setPersistenceEnabled(true);
            Log.d("MyApp", "✅ FirebaseDatabase initialized with persistence");

            // 3. Cloud Messaging (FCM)
            firebaseMessaging = FirebaseMessaging.getInstance();
            Log.d("MyApp", "✅ FirebaseMessaging initialized");

            // 4. Analytics
            firebaseAnalytics = FirebaseAnalytics.getInstance(this);
            Log.d("MyApp", "✅ FirebaseAnalytics initialized");

            // 5. Crashlytics
            firebaseCrashlytics = FirebaseCrashlytics.getInstance();
            firebaseCrashlytics.setCrashlyticsCollectionEnabled(true);
            Log.d("MyApp", "✅ FirebaseCrashlytics initialized");

        } catch (Exception e) {
            Log.e("MyApp", "❌ Error initializing Firebase services: " + e.getMessage());
            throw new RuntimeException("Failed to initialize Firebase services", e);
        }
    }

    // ✅ Singleton pattern con verificación de null
    public static synchronized MyApp getInstance() {
        if (instance == null) {
            throw new IllegalStateException("MyApp instance is null. Make sure to initialize in Application.onCreate()");
        }
        return instance;
    }

    // ✅ Métodos getter con validación
    public FirebaseAuth getFirebaseAuth() {
        if (firebaseAuth == null) {
            firebaseAuth = FirebaseAuth.getInstance();
        }
        return firebaseAuth;
    }

    public FirebaseDatabase getFirebaseDatabase() {
        if (firebaseDatabase == null) {
            firebaseDatabase = FirebaseDatabase.getInstance();
            firebaseDatabase.setPersistenceEnabled(true);
        }
        return firebaseDatabase;
    }

    public FirebaseMessaging getFirebaseMessaging() {
        if (firebaseMessaging == null) {
            firebaseMessaging = FirebaseMessaging.getInstance();
        }
        return firebaseMessaging;
    }

    public FirebaseAnalytics getFirebaseAnalytics() {
        if (firebaseAnalytics == null) {
            firebaseAnalytics = FirebaseAnalytics.getInstance(this);
        }
        return firebaseAnalytics;
    }

    public FirebaseCrashlytics getFirebaseCrashlytics() {
        if (firebaseCrashlytics == null) {
            firebaseCrashlytics = FirebaseCrashlytics.getInstance();
        }
        return firebaseCrashlytics;
    }

    // ✅ Métodos estáticos de utilidad
    public static Context getAppContext() {
        return getInstance().getApplicationContext();
    }

    // ✅ Método optimizado para obtener DatabaseReference
    public static DatabaseReference getDatabaseReference(@NonNull String path) {
        try {
            return getInstance().getFirebaseDatabase().getReference(path);
        } catch (Exception e) {
            Log.e("MyApp", "❌ Error getting DatabaseReference for path: " + path, e);
            // Fallback seguro
            return FirebaseDatabase.getInstance().getReference(path);
        }
    }

    // ✅ Método para obtener FirebaseAuth
    public static FirebaseAuth getFirebaseAuthInstance() {
        try {
            return getInstance().getFirebaseAuth();
        } catch (Exception e) {
            Log.e("MyApp", "❌ Error getting FirebaseAuth", e);
            return FirebaseAuth.getInstance();
        }
    }

    // ✅ Método para obtener FirebaseDatabase
    public static FirebaseDatabase getFirebaseDatabaseInstance() {
        try {
            return getInstance().getFirebaseDatabase();
        } catch (Exception e) {
            Log.e("MyApp", "❌ Error getting FirebaseDatabase", e);
            return FirebaseDatabase.getInstance();
        }
    }

    // ✅ Método para obtener usuario actual
    public static FirebaseUser getCurrentUser() {
        try {
            return getFirebaseAuthInstance().getCurrentUser();
        } catch (Exception e) {
            Log.e("MyApp", "❌ Error getting current user", e);
            return null;
        }
    }

    // ✅ Método para obtener ID del usuario actual
    public static String getCurrentUserId() {
        FirebaseUser user = getCurrentUser();
        return user != null ? user.getUid() : null;
    }

    // ✅ Método para obtener email del usuario actual
    public static String getCurrentUserEmail() {
        FirebaseUser user = getCurrentUser();
        return user != null ? user.getEmail() : null;
    }

    // ✅ Método para verificar si hay usuario logeado
    public static boolean isUserLoggedIn() {
        return getCurrentUser() != null;
    }

    // ✅ Método para logging de eventos con validación robusta
    public static void logEvent(@NonNull String eventName, Map<String, Object> params) {
        if (getInstance() == null) {
            Log.w("MyApp", "⚠️ MyApp not initialized, skipping event: " + eventName);
            return;
        }

        try {
            Bundle bundle = new Bundle();

            if (params != null && !params.isEmpty()) {
                for (Map.Entry<String, Object> entry : params.entrySet()) {
                    String key = entry.getKey();
                    Object value = entry.getValue();

                    if (value != null && key != null && !key.isEmpty()) {
                        // Convertir diferentes tipos a String para Analytics
                        String stringValue;
                        if (value instanceof String) {
                            stringValue = (String) value;
                        } else if (value instanceof Number) {
                            stringValue = String.valueOf(value);
                        } else if (value instanceof Boolean) {
                            stringValue = String.valueOf(value);
                        } else {
                            stringValue = value.toString();
                        }

                        // Firebase Analytics tiene límite de 100 caracteres para valores
                        if (stringValue.length() > 100) {
                            stringValue = stringValue.substring(0, 97) + "...";
                        }

                        bundle.putString(key, stringValue);
                    }
                }
            }

            try {
                String versionName = getInstance().getPackageManager()
                        .getPackageInfo(getInstance().getPackageName(), 0)
                        .versionName;
                bundle.putString("app_version", versionName);
            } catch (Exception e) {
                bundle.putString("app_version", "unknown");
            }
            bundle.putLong("timestamp", System.currentTimeMillis());

            getInstance().getFirebaseAnalytics().logEvent(eventName, bundle);
            Log.d("MyApp", "📊 Event logged: " + eventName + " with " +
                    (params != null ? params.size() : 0) + " params");

        } catch (Exception e) {
            Log.e("MyApp", "❌ Error logging event: " + eventName, e);
            // Registrar error en Crashlytics también
            logError(e);
        }
    }

    // ✅ Método para logging de errores
    public static void logError(@NonNull Exception e) {
        try {
            if (getInstance() != null) {
                getInstance().getFirebaseCrashlytics().recordException(e);
                // También agregar logs personalizados
                getInstance().getFirebaseCrashlytics().log("Error: " + e.getMessage());

                // Log en consola también
                Log.e("MyApp", "🔥 Error logged to Crashlytics: " + e.getMessage(), e);
            } else {
                Log.e("MyApp", "MyApp instance is null, cannot log to Crashlytics: " + e.getMessage());
            }
        } catch (Exception ex) {
            Log.e("MyApp", "Failed to log error to Crashlytics: " + ex.getMessage());
        }
    }

    // ✅ Método para logging de errores con mensaje personalizado
    public static void logError(@NonNull String message, @NonNull Exception e) {
        try {
            if (getInstance() != null) {
                getInstance().getFirebaseCrashlytics().log(message);
                getInstance().getFirebaseCrashlytics().recordException(e);
                Log.e("MyApp", message + ": " + e.getMessage(), e);
            }
        } catch (Exception ex) {
            Log.e("MyApp", "Failed to log error: " + ex.getMessage());
        }
    }

    // ✅ Método para agregar custom attributes a Crashlytics
    public static void setCrashlyticsCustomKey(@NonNull String key, @NonNull String value) {
        try {
            if (getInstance() != null) {
                getInstance().getFirebaseCrashlytics().setCustomKey(key, value);
            }
        } catch (Exception e) {
            Log.e("MyApp", "Failed to set Crashlytics custom key: " + e.getMessage());
        }
    }

    // ✅ Método para limpiar datos de usuario en Crashlytics
    public static void clearCrashlyticsUserData() {
        try {
            if (getInstance() != null) {
                getInstance().getFirebaseCrashlytics().setUserId(null);
                Log.d("MyApp", "✅ Crashlytics user data cleared");
            }
        } catch (Exception e) {
            Log.e("MyApp", "Failed to clear Crashlytics user data: " + e.getMessage());
        }
    }

    // ✅ Método para establecer usuario en Crashlytics
    public static void setCrashlyticsUserId(@NonNull String userId) {
        try {
            if (getInstance() != null) {
                getInstance().getFirebaseCrashlytics().setUserId(userId);
                Log.d("MyApp", "✅ Crashlytics user ID set: " + userId);
            }
        } catch (Exception e) {
            Log.e("MyApp", "Failed to set Crashlytics user ID: " + e.getMessage());
        }
    }

    // ✅ Métodos para gestión de tokens FCM
    public static void getFCMToken(FCMTokenCallback callback) {
        try {
            getInstance().getFirebaseMessaging().getToken()
                    .addOnCompleteListener(task -> {
                        if (task.isSuccessful() && task.getResult() != null) {
                            String token = task.getResult();
                            Log.d("MyApp", "✅ FCM Token: " + token);
                            callback.onTokenReceived(token);
                        } else {
                            Log.e("MyApp", "❌ Failed to get FCM token");
                            callback.onError(task.getException() != null ?
                                    task.getException().getMessage() : "Unknown error");
                        }
                    });
        } catch (Exception e) {
            Log.e("MyApp", "❌ Error getting FCM token: " + e.getMessage());
            callback.onError(e.getMessage());
        }
    }

    public interface FCMTokenCallback {
        void onTokenReceived(String token);
        void onError(String error);
    }

    // ✅ Método para forzar actualización de token FCM
    public static void refreshFCMToken() {
        try {
            getInstance().getFirebaseMessaging().deleteToken()
                    .addOnCompleteListener(task -> {
                        if (task.isSuccessful()) {
                            Log.d("MyApp", "✅ FCM token deleted, new one will be generated");
                        } else {
                            Log.e("MyApp", "❌ Failed to delete FCM token");
                        }
                    });
        } catch (Exception e) {
            Log.e("MyApp", "❌ Error refreshing FCM token: " + e.getMessage());
        }
    }
}
package com.chopcode.rutago.app.config;

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
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.StorageReference;
import com.google.firebase.crashlytics.FirebaseCrashlytics;
import java.util.Map;

/**
 * MyApp - Global Application Class
 *
 * Punto de entrada principal de la aplicación Android.
 * Responsabilidades:
 * - Centralizar la inicialización del ecosistema Firebase (Auth, Database, Storage, Messaging, Analytics, Crashlytics).
 * - Implementar el patrón Singleton para proveer acceso global a los servicios de nube.
 * - Habilitar la persistencia offline de Firebase Realtime Database para entornos rurales.
 * - Proveer utilidades estáticas para telemetría, gestión de errores y acceso a datos de sesión.
 */
public class MyApp extends Application {

    private static MyApp instance;
    private FirebaseAuth firebaseAuth;
    private FirebaseDatabase firebaseDatabase;
    private FirebaseMessaging firebaseMessaging;
    private FirebaseAnalytics firebaseAnalytics;
    private FirebaseStorage firebaseStorage;
    private FirebaseCrashlytics firebaseCrashlytics;

    @Override
    public void onCreate() {
        super.onCreate();
        instance = this;

        // Inicializar el SDK de Firebase
        FirebaseApp.initializeApp(this);

        // Configuración secuencial de servicios de infraestructura
        initializeFirebaseServices();

        Log.d("MyApp", "✅ Ecosistema Firebase inicializado exitosamente.");
    }

    /**
     * Configura y arranca cada servicio de Firebase con sus parámetros específicos.
     */
    private void initializeFirebaseServices() {
        try {
            // 1. Identidad y Acceso
            firebaseAuth = FirebaseAuth.getInstance();

            // 2. Persistencia de Datos (Con soporte para trabajo desconectado)
            firebaseDatabase = FirebaseDatabase.getInstance();
            firebaseDatabase.setPersistenceEnabled(true);

            // 3. Mensajería Push
            firebaseMessaging = FirebaseMessaging.getInstance();

            // 4. Inteligencia de Negocio
            firebaseAnalytics = FirebaseAnalytics.getInstance(this);

            // 5. Almacenamiento Multimedia
            firebaseStorage = FirebaseStorage.getInstance();

            // 6. Diagnóstico de Salud (Crashlytics)
            firebaseCrashlytics = FirebaseCrashlytics.getInstance();
            firebaseCrashlytics.setCrashlyticsCollectionEnabled(true);

        } catch (Exception e) {
            Log.e("MyApp", "❌ Error crítico al inicializar servicios: " + e.getMessage());
            throw new RuntimeException("Fallo en el arranque de infraestructura cloud", e);
        }
    }

    /**
     * @return Instancia única de la clase Application.
     */
    public static synchronized MyApp getInstance() {
        if (instance == null) {
            throw new IllegalStateException("MyApp no inicializada.");
        }
        return instance;
    }

    // --- Getters de Servicios con Inicialización Segura (Lazy) ---

    public FirebaseAuth getFirebaseAuth() {
        if (firebaseAuth == null) firebaseAuth = FirebaseAuth.getInstance();
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
        if (firebaseMessaging == null) firebaseMessaging = FirebaseMessaging.getInstance();
        return firebaseMessaging;
    }

    public FirebaseAnalytics getFirebaseAnalytics() {
        if (firebaseAnalytics == null) firebaseAnalytics = FirebaseAnalytics.getInstance(this);
        return firebaseAnalytics;
    }

    public FirebaseStorage getFirebaseStorage() {
        if (firebaseStorage == null) firebaseStorage = FirebaseStorage.getInstance();
        return firebaseStorage;
    }

    public FirebaseCrashlytics getFirebaseCrashlytics() {
        if (firebaseCrashlytics == null) firebaseCrashlytics = FirebaseCrashlytics.getInstance();
        return firebaseCrashlytics;
    }

    // --- Utilidades Estáticas Globales ---

    public static Context getAppContext() {
        return getInstance().getApplicationContext();
    }

    /**
     * @return Referencia a una ubicación específica en la base de datos NoSQL.
     */
    public static DatabaseReference getDatabaseReference(@NonNull String path) {
        try {
            return getInstance().getFirebaseDatabase().getReference(path);
        } catch (Exception e) {
            return FirebaseDatabase.getInstance().getReference(path);
        }
    }

    public static FirebaseAuth getFirebaseAuthInstance() {
        return getInstance().getFirebaseAuth();
    }

    public static FirebaseDatabase getFirebaseDatabaseInstance() {
        return getInstance().getFirebaseDatabase();
    }

    public static FirebaseStorage getFirebaseStorageInstance() {
        return getInstance().getFirebaseStorage();
    }

    public static StorageReference getStorageReference(String path) {
        return getFirebaseStorageInstance().getReference(path);
    }

    public static FirebaseUser getCurrentUser() {
        return getFirebaseAuthInstance().getCurrentUser();
    }

    public static String getCurrentUserId() {
        FirebaseUser user = getCurrentUser();
        return user != null ? user.getUid() : null;
    }

    public static String getCurrentUserEmail() {
        FirebaseUser user = getCurrentUser();
        return user != null ? user.getEmail() : null;
    }

    public static boolean isUserLoggedIn() {
        return getCurrentUser() != null;
    }

    /**
     * Registra un evento de analítica con parámetros dinámicos.
     * Realiza limpieza automática de valores largos para cumplir con cuotas de Firebase.
     */
    public static void logEvent(@NonNull String eventName, Map<String, Object> params) {
        if (getInstance() == null) return;

        try {
            Bundle bundle = new Bundle();
            if (params != null) {
                for (Map.Entry<String, Object> entry : params.entrySet()) {
                    String stringValue = String.valueOf(entry.getValue());
                    if (stringValue.length() > 100) stringValue = stringValue.substring(0, 97) + "...";
                    bundle.putString(entry.getKey(), stringValue);
                }
            }
            // Inyectar metadatos base
            bundle.putLong("timestamp", System.currentTimeMillis());
            getInstance().getFirebaseAnalytics().logEvent(eventName, bundle);
            Log.d("MyApp", "📊 Analítica: " + eventName);
        } catch (Exception e) {
            logError("Error en logEvent", e);
        }
    }

    /**
     * Envía una excepción capturada hacia el tablero de Crashlytics.
     */
    public static void logError(@NonNull Exception e) {
        if (getInstance() != null) {
            getInstance().getFirebaseCrashlytics().recordException(e);
        }
    }

    public static void logError(@NonNull String message, @NonNull Exception e) {
        if (getInstance() != null) {
            getInstance().getFirebaseCrashlytics().log(message);
            getInstance().getFirebaseCrashlytics().recordException(e);
        }
    }

    /**
     * Facilita la recuperación asíncrona del token FCM del dispositivo.
     */
    public static void getFCMToken(FCMTokenCallback callback) {
        getInstance().getFirebaseMessaging().getToken().addOnCompleteListener(task -> {
            if (task.isSuccessful() && task.getResult() != null) {
                callback.onTokenReceived(task.getResult());
            } else {
                callback.onError(task.getException() != null ? task.getException().getMessage() : "Fallo en FCM");
            }
        });
    }

    public interface FCMTokenCallback {
        void onTokenReceived(String token);
        void onError(String error);
    }

    /**
     * Invalida el token actual para forzar la regeneración de uno nuevo.
     */
    public static void refreshFCMToken() {
        getInstance().getFirebaseMessaging().deleteToken();
    }
}

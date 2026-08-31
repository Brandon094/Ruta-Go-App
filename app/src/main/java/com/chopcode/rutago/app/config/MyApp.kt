package com.chopcode.rutago.app.config

import android.app.Application
import android.content.Context
import android.os.Bundle
import android.util.Log
import com.google.firebase.FirebaseApp
import com.google.firebase.analytics.FirebaseAnalytics
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseUser
import com.google.firebase.crashlytics.FirebaseCrashlytics
import com.google.firebase.database.DatabaseReference
import com.google.firebase.database.FirebaseDatabase
import com.google.firebase.messaging.FirebaseMessaging
import com.google.firebase.storage.FirebaseStorage
import com.google.firebase.storage.StorageReference

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
class MyApp : Application() {

    var firebaseAuth: FirebaseAuth? = null
        get() {
            if (field == null) field = FirebaseAuth.getInstance()
            return field
        }
        private set

    var firebaseDatabase: FirebaseDatabase? = null
        get() {
            if (field == null) {
                field = FirebaseDatabase.getInstance().apply {
                    setPersistenceEnabled(true)
                }
            }
            return field
        }
        private set

    var firebaseMessaging: FirebaseMessaging? = null
        get() {
            if (field == null) field = FirebaseMessaging.getInstance()
            return field
        }
        private set

    var firebaseAnalytics: FirebaseAnalytics? = null
        get() {
            if (field == null) field = FirebaseAnalytics.getInstance(this)
            return field
        }
        private set

    var firebaseStorage: FirebaseStorage? = null
        get() {
            if (field == null) field = FirebaseStorage.getInstance()
            return field
        }
        private set

    var firebaseCrashlytics: FirebaseCrashlytics? = null
        get() {
            if (field == null) field = FirebaseCrashlytics.getInstance()
            return field
        }
        private set

    override fun onCreate() {
        super.onCreate()
        instance = this

        // Inicializar el SDK de Firebase
        FirebaseApp.initializeApp(this)

        // Configuración secuencial de servicios de infraestructura
        initializeFirebaseServices()

        Log.d("MyApp", "✅ Ecosistema Firebase inicializado exitosamente.")
    }

    /**
     * Configura y arranca cada servicio de Firebase con sus parámetros específicos.
     */
    private fun initializeFirebaseServices() {
        try {
            // 1. Identidad y Acceso
            firebaseAuth = FirebaseAuth.getInstance()

            // 2. Persistencia de Datos (Con soporte para trabajo desconectado)
            firebaseDatabase = FirebaseDatabase.getInstance().apply {
                setPersistenceEnabled(true)
            }

            // 3. Mensajería Push
            firebaseMessaging = FirebaseMessaging.getInstance()

            // 4. Inteligencia de Negocio
            firebaseAnalytics = FirebaseAnalytics.getInstance(this)

            // 5. Almacenamiento Multimedia
            firebaseStorage = FirebaseStorage.getInstance()

            // 6. Diagnóstico de Salud (Crashlytics)
            firebaseCrashlytics = FirebaseCrashlytics.getInstance().apply {
                setCrashlyticsCollectionEnabled(true)
            }
        } catch (e: Exception) {
            Log.e("MyApp", "❌ Error crítico al inicializar servicios: ${e.message}")
            throw RuntimeException("Fallo en el arranque de infraestructura cloud", e)
        }
    }

    interface FCMTokenCallback {
        fun onTokenReceived(token: String)
        fun onError(error: String)
    }

    companion object {
        @Volatile
        private var instance: MyApp? = null

        @JvmStatic
        @Synchronized
        fun getInstance(): MyApp {
            return instance ?: throw IllegalStateException("MyApp no inicializada.")
        }

        @JvmStatic
        fun getAppContext(): Context {
            return getInstance().applicationContext
        }

        @JvmStatic
        fun getDatabaseReference(path: String): DatabaseReference {
            return try {
                getInstance().firebaseDatabase?.getReference(path)
                    ?: FirebaseDatabase.getInstance().getReference(path)
            } catch (e: Exception) {
                FirebaseDatabase.getInstance().getReference(path)
            }
        }

        @JvmStatic
        fun getFirebaseAuthInstance(): FirebaseAuth {
            return getInstance().firebaseAuth ?: FirebaseAuth.getInstance()
        }

        @JvmStatic
        fun getFirebaseDatabaseInstance(): FirebaseDatabase {
            return getInstance().firebaseDatabase ?: FirebaseDatabase.getInstance()
        }

        @JvmStatic
        fun getFirebaseStorageInstance(): FirebaseStorage {
            return getInstance().firebaseStorage ?: FirebaseStorage.getInstance()
        }

        @JvmStatic
        fun getStorageReference(path: String?): StorageReference {
            return getFirebaseStorageInstance().getReference(path ?: "")
        }

        @JvmStatic
        fun getCurrentUser(): FirebaseUser? {
            return getFirebaseAuthInstance().currentUser
        }

        @JvmStatic
        fun getCurrentUserId(): String? {
            return getCurrentUser()?.uid
        }

        @JvmStatic
        fun getCurrentUserEmail(): String? {
            return getCurrentUser()?.email
        }

        @JvmStatic
        fun isUserLoggedIn(): Boolean {
            return getCurrentUser() != null
        }

        /**
         * Registra un evento de analítica con parámetros dinámicos.
         * Realiza limpieza automática de valores largos para cumplir con cuotas de Firebase.
         */
        @JvmStatic
        fun logEvent(eventName: String, params: Map<String, Any?>?) {
            if (instance == null) return

            try {
                val bundle = Bundle()
                params?.forEach { (key, value) ->
                    var stringValue = value.toString()
                    if (stringValue.length > 100) {
                        stringValue = stringValue.substring(0, 97) + "..."
                    }
                    bundle.putString(key, stringValue)
                }
                // Inyectar metadatos base
                bundle.putLong("timestamp", System.currentTimeMillis())
                getInstance().firebaseAnalytics?.logEvent(eventName, bundle)
                Log.d("MyApp", "📊 Analítica: $eventName")
            } catch (e: Exception) {
                logError("Error en logEvent", e)
            }
        }

        /**
         * Envía una excepción capturada hacia el tablero de Crashlytics.
         */
        @JvmStatic
        fun logError(e: Exception) {
            instance?.firebaseCrashlytics?.recordException(e)
        }

        @JvmStatic
        fun logError(message: String, e: Exception) {
            instance?.firebaseCrashlytics?.let {
                it.log(message)
                it.recordException(e)
            }
        }

        /**
         * Facilita la recuperación asíncrona del token FCM del dispositivo.
         */
        @JvmStatic
        fun getFCMToken(callback: FCMTokenCallback) {
            getInstance().firebaseMessaging?.token?.addOnCompleteListener { task ->
                if (task.isSuccessful && task.result != null) {
                    callback.onTokenReceived(task.result!!)
                } else {
                    callback.onError(
                        task.exception?.message ?: "Fallo en FCM"
                    )
                }
            }
        }

        @JvmStatic
        fun refreshFCMToken() {
            getInstance().firebaseMessaging?.deleteToken()
        }
    }
}

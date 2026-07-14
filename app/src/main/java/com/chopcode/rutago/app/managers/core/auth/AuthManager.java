package com.chopcode.rutago.app.managers.core.auth;

import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.widget.Toast;

import com.chopcode.rutago.app.activities.common.LoginActivity;
import com.chopcode.rutago.app.config.MyApp;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;

/**
 * Auth Manager (Singleton)
 *
 * Componente central para la gestión del ciclo de vida de la sesión del usuario.
 * Responsabilidades:
 * - Proveer acceso global al usuario autenticado y su identificador único (UID).
 * - Validar el estado de login antes de permitir el acceso a pantallas protegidas.
 * - Orquestar el proceso de cierre de sesión (Sign-Out) y limpieza de navegación.
 * - Gestionar redirecciones forzadas a la pantalla de Login en caso de sesiones inválidas.
 */
public class AuthManager {
    private static final String TAG = "AuthManager";

    private static AuthManager instance;
    private FirebaseAuth auth;

    private AuthManager() {
        Log.d(TAG, "🚀 Inicializando AuthManager singleton.");
        auth = MyApp.getFirebaseAuthInstance();
    }

    /**
     * @return Instancia única del manager (Thread-safe implícitamente por el cargador de clases).
     */
    public static AuthManager getInstance() {
        if (instance == null) {
            instance = new AuthManager();
        }
        return instance;
    }

    /**
     * @return El usuario actual de Firebase o null si no hay sesión activa.
     */
    public FirebaseUser getCurrentUser() {
        return auth.getCurrentUser();
    }

    /**
     * @return true si existe un usuario autenticado en el sistema.
     */
    public boolean isUserLoggedIn() {
        return getCurrentUser() != null;
    }

    /**
     * Verifica si el usuario está logueado. Si no lo está, muestra un aviso y redirige al Login.
     * @return true si la sesión es válida.
     */
    public boolean validateLogin(Context context) {
        if (!isUserLoggedIn()) {
            Log.w(TAG, "⚠️ Intento de acceso sin sesión. Redirigiendo...");
            Toast.makeText(context, "Debes iniciar sesión", Toast.LENGTH_SHORT).show();
            redirectToLogin(context);
            return false;
        }
        return true;
    }

    /**
     * Realiza una navegación forzada al Login limpiando el stack de actividades.
     */
    public void redirectToLogin(Context context) {
        try {
            Intent intent = new Intent(context, LoginActivity.class);
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
            context.startActivity(intent);
        } catch (Exception e) {
            Log.e(TAG, "❌ Error fatal en redirección: " + e.getMessage());
        }
    }

    /**
     * Finaliza la sesión del usuario en Firebase Auth y redirige al punto de entrada.
     */
    public void signOut(Context context) {
        Log.d(TAG, "🚪 Ejecutando Sign-Out.");
        try {
            auth.signOut();
            redirectToLogin(context);
        } catch (Exception e) {
            Log.e(TAG, "💥 Error al cerrar sesión: " + e.getMessage());
        }
    }

    /**
     * @return El UID único del usuario o null si no está autenticado.
     */
    public String getUserId() {
        FirebaseUser user = getCurrentUser();
        return user != null ? user.getUid() : null;
    }

    /**
     * Registra en el log el estado detallado de la sesión para depuración.
     */
    public void logAuthStatus() {
        FirebaseUser user = getCurrentUser();
        if (user != null) {
            Log.d(TAG, "📊 Auth Status: UID=" + user.getUid() + " Email=" + user.getEmail());
        } else {
            Log.d(TAG, "📊 Auth Status: Sin sesión activa.");
        }
    }

    /**
     * @return true si el usuario ha verificado su correo electrónico.
     */
    public boolean isEmailVerified() {
        FirebaseUser user = getCurrentUser();
        return user != null && user.isEmailVerified();
    }
}

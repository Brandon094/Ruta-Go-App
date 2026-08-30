package com.chopcode.rutago.app.managers.core.auth;

import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.widget.Toast;

import com.chopcode.rutago.app.activities.common.MainActivity;
import com.chopcode.rutago.app.config.MyApp;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;

/**
 * Auth Manager (Singleton)
 *
 * Componente central para la gestión del ciclo de vida de la sesión del usuario.
 */
public class AuthManager {
    private static final String TAG = "AuthManager";

    private static AuthManager instance;
    private FirebaseAuth auth;

    private AuthManager() {
        auth = MyApp.getFirebaseAuthInstance();
    }

    public static AuthManager getInstance() {
        if (instance == null) {
            instance = new AuthManager();
        }
        return instance;
    }

    public FirebaseUser getCurrentUser() {
        return auth.getCurrentUser();
    }

    public boolean isUserLoggedIn() {
        return getCurrentUser() != null;
    }

    public boolean validateLogin(Context context) {
        if (!isUserLoggedIn()) {
            Toast.makeText(context, "Debes iniciar sesión", Toast.LENGTH_SHORT).show();
            redirectToLogin(context);
            return false;
        }
        return true;
    }

    public void redirectToLogin(Context context) {
        try {
            Intent intent = new Intent(context, MainActivity.class);
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
            context.startActivity(intent);
        } catch (Exception e) {
            Log.e(TAG, "❌ Error fatal en redirección: " + e.getMessage());
        }
    }

    public void signOut(Context context) {
        try {
            auth.signOut();
            redirectToLogin(context);
        } catch (Exception e) {
            Log.e(TAG, "💥 Error al cerrar sesión: " + e.getMessage());
        }
    }

    public String getUserId() {
        FirebaseUser user = getCurrentUser();
        return user != null ? user.getUid() : null;
    }

    public boolean isEmailVerified() {
        FirebaseUser user = getCurrentUser();
        return user != null && user.isEmailVerified();
    }
}

package com.chopcode.rutago.app.services.auth;

import android.app.Activity;
import androidx.annotation.NonNull;
import com.chopcode.rutago.app.config.MyApp;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;

/**
 * 📧 Email Login Service
 * 
 * Gestiona la autenticación tradicional mediante correo electrónico y contraseña.
 * Utiliza UserRoleService para redirigir al usuario según su rol.
 */
public class EmailLoginService {

    private final FirebaseAuth auth;
    private final Activity activity;
    private final UserRoleService userRoleService;

    public interface LoginCallback {
        void onLoginSuccess(String userType);
        void onLoginFailure(String error);
    }

    public EmailLoginService(Activity activity) {
        this.activity = activity;
        this.auth = MyApp.getInstance().getFirebaseAuth();
        this.userRoleService = new UserRoleService();
    }

    public void login(String email, String password, @NonNull LoginCallback callback) {
        auth.signInWithEmailAndPassword(email, password)
                .addOnCompleteListener(activity, task -> {
                    if (task.isSuccessful()) {
                        FirebaseUser user = auth.getCurrentUser();
                        if (user != null) {
                            userRoleService.detectUserType(user, new UserRoleService.UserTypeCallback() {
                                @Override public void onTypeDetected(String type) { callback.onLoginSuccess(type); }
                                @Override public void onError(String error) { callback.onLoginFailure(error); }
                            });
                        } else callback.onLoginFailure("Error obtaining user data");
                    } else {
                        callback.onLoginFailure(task.getException() != null ? task.getException().getMessage() : "Unknown error");
                    }
                });
    }
}

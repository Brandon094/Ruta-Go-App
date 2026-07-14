package com.chopcode.rutago.app.services.auth;

import android.app.Activity;
import androidx.annotation.NonNull;
import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.config.MyApp;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;

/**
 * Email Login Service
 *
 * Fachada para la gestión de autenticación convencional (Email/Contraseña).
 * Responsabilidades:
 * - Validar credenciales contra el servidor de Firebase Auth.
 * - Coordinar con UserRoleService la identificación del perfil tras un inicio de sesión exitoso.
 * - Proporcionar feedback detallado sobre fallos de red o credenciales inválidas.
 */
public class EmailLoginService {

    private final FirebaseAuth auth;
    private final Activity activity;
    private final UserRoleService userRoleService;

    /** Interfaz para retornar el resultado de la operación de login. */
    public interface LoginCallback {
        /** @param userType El rol detectado ("conductor" o "usuario"). */
        void onLoginSuccess(String userType);
        void onLoginFailure(String error);
    }

    public EmailLoginService(Activity activity) {
        this.activity = activity;
        this.auth = MyApp.getInstance().getFirebaseAuth();
        this.userRoleService = new UserRoleService();
    }

    /**
     * Ejecuta el intento de inicio de sesión de forma asíncrona.
     * @param email Correo electrónico del usuario.
     * @param password Contraseña de acceso.
     * @param callback Retorno con el éxito (y rol) o mensaje de error.
     */
    public void login(String email, String password, @NonNull LoginCallback callback) {
        auth.signInWithEmailAndPassword(email, password)
                .addOnCompleteListener(activity, task -> {
                    if (task.isSuccessful()) {
                        FirebaseUser user = auth.getCurrentUser();
                        if (user != null) {
                            // Proceso de detección de rol post-auth
                            userRoleService.detectUserType(user, new UserRoleService.UserTypeCallback() {
                                @Override public void onTypeDetected(String type) { callback.onLoginSuccess(type); }
                                @Override public void onError(String error) { callback.onLoginFailure(error); }
                            });
                        } else {
                            callback.onLoginFailure("No se pudo recuperar el perfil del servidor.");
                        }
                    } else {
                        String errorMsg = task.getException() != null ? 
                                task.getException().getMessage() : 
                                MyApp.getAppContext().getString(R.string.error_carga_datos);
                        callback.onLoginFailure(errorMsg);
                    }
                });
    }
}

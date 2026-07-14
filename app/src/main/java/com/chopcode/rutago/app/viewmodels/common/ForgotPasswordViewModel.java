package com.chopcode.rutago.app.viewmodels.common;

import android.util.Log;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import com.google.firebase.auth.FirebaseAuth;

/**
 * ForgotPassword ViewModel
 *
 * Gestiona el autoservicio de recuperación de credenciales para los usuarios.
 * Responsabilidades:
 * - Validar el formato de la solicitud de restablecimiento.
 * - Delegar a Firebase Auth el envío del correo electrónico de recuperación.
 * - Proporcionar feedback reactivo sobre el estado del proceso.
 */
public class ForgotPasswordViewModel extends ViewModel {
    private static final String TAG = "ForgotPasswordVM";

    /** Indica si el correo de recuperación fue despachado con éxito por el servidor. */
    private final MutableLiveData<Boolean> sendSuccess = new MutableLiveData<>();
    
    /** Expone el mensaje de error si el correo no existe o hay problemas de red. */
    private final MutableLiveData<String> sendError = new MutableLiveData<>();
    
    /** Estado del indicador de progreso. */
    private final MutableLiveData<Boolean> isLoading = new MutableLiveData<>(false);

    private final FirebaseAuth mAuth;

    public ForgotPasswordViewModel() {
        this.mAuth = FirebaseAuth.getInstance();
    }

    public LiveData<Boolean> getSendSuccess() { return sendSuccess; }
    public LiveData<String> getSendError() { return sendError; }
    public LiveData<Boolean> getIsLoading() { return isLoading; }

    /**
     * Solicita a Firebase el envío del enlace de restablecimiento de contraseña.
     * @param email Dirección de correo electrónico destino.
     */
    public void sendResetEmail(String email) {
        if (email == null || email.trim().isEmpty()) {
            sendError.setValue("El correo es obligatorio.");
            return;
        }

        isLoading.setValue(true);
        Log.d(TAG, "🔑 Solicitando restablecimiento para: " + email);

        mAuth.sendPasswordResetEmail(email.trim())
                .addOnCompleteListener(task -> {
                    isLoading.postValue(false);
                    if (task.isSuccessful()) {
                        Log.d(TAG, "✅ Correo de recuperación enviado satisfactoriamente.");
                        sendSuccess.postValue(true);
                    } else {
                        String errorMsg = task.getException() != null ? 
                                task.getException().getMessage() : "Error en el servidor de autenticación.";
                        Log.e(TAG, "❌ Fallo al enviar correo: " + errorMsg);
                        sendError.postValue(errorMsg);
                    }
                });
    }
}

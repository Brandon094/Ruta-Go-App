package com.chopcode.rutago.app.viewmodels.common;

import android.util.Log;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import com.google.firebase.auth.FirebaseAuth;

/**
 * ViewModel para gestionar la recuperación de contraseña.
 * 
 * Responsabilidades:
 * - Procesar la solicitud de envío de correo de restablecimiento.
 * - Gestionar los estados de éxito, error y carga para la UI.
 */
public class ForgotPasswordViewModel extends ViewModel {
    private static final String TAG = "ForgotPasswordVM";

    private final MutableLiveData<Boolean> sendSuccess = new MutableLiveData<>();
    private final MutableLiveData<String> sendError = new MutableLiveData<>();
    private final MutableLiveData<Boolean> isLoading = new MutableLiveData<>(false);

    private final FirebaseAuth mAuth;

    public ForgotPasswordViewModel() {
        this.mAuth = FirebaseAuth.getInstance();
    }

    public LiveData<Boolean> getSendSuccess() { return sendSuccess; }
    public LiveData<String> getSendError() { return sendError; }
    public LiveData<Boolean> getIsLoading() { return isLoading; }

    /**
     * Envía un correo electrónico de recuperación de contraseña.
     * 
     * @param email Correo electrónico del usuario.
     */
    public void sendResetEmail(String email) {
        if (email == null || email.trim().isEmpty()) {
            sendError.setValue("El correo es obligatorio");
            return;
        }

        isLoading.setValue(true);
        Log.d(TAG, "🔑 Intentando enviar correo de recuperación a: " + email);

        mAuth.sendPasswordResetEmail(email.trim())
                .addOnCompleteListener(task -> {
                    isLoading.postValue(false);
                    if (task.isSuccessful()) {
                        Log.d(TAG, "✅ Correo enviado exitosamente");
                        sendSuccess.postValue(true);
                    } else {
                        String errorMsg = task.getException() != null ? 
                                task.getException().getMessage() : "Error desconocido";
                        Log.e(TAG, "❌ Error enviando correo: " + errorMsg);
                        sendError.postValue(errorMsg);
                    }
                });
    }
}

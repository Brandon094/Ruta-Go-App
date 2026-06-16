package com.chopcode.rutago.app.services.storage;

import android.net.Uri;
import android.util.Log;

import com.chopcode.rutago.app.config.MyApp;
import com.google.firebase.storage.StorageReference;
import com.google.firebase.storage.UploadTask;

public class StorageService {
    private static final String TAG = "StorageService";

    public interface UploadCallback {
        void onSuccess(String downloadUrl);
        void onError(String error);
        void onProgress(double progress);
    }

    /**
     * Sube una foto de perfil a Firebase Storage
     * @param userId ID del usuario (para el nombre del archivo)
     * @param imageUri URI local de la imagen
     * @param callback Callback para manejar el resultado
     */
    public void uploadProfilePicture(String userId, Uri imageUri, UploadCallback callback) {
        if (userId == null || imageUri == null) {
            callback.onError("Datos inválidos");
            return;
        }

        Log.d(TAG, "📤 Iniciando subida de foto para: " + userId);

        // Referencia: perfiles/userId/profile.jpg
        StorageReference storageRef = MyApp.getStorageReference("perfiles/" + userId + "/profile.jpg");

        UploadTask uploadTask = storageRef.putFile(imageUri);

        // Monitorear progreso
        uploadTask.addOnProgressListener(snapshot -> {
            double progress = (100.0 * snapshot.getBytesTransferred()) / snapshot.getTotalByteCount();
            Log.d(TAG, "⏳ Progreso: " + progress + "%");
            callback.onProgress(progress);
        });

        // Manejar éxito y obtener URL
        uploadTask.continueWithTask(task -> {
            if (!task.isSuccessful()) {
                throw task.getException();
            }
            return storageRef.getDownloadUrl();
        }).addOnCompleteListener(task -> {
            if (task.isSuccessful()) {
                Uri downloadUri = task.getResult();
                if (downloadUri != null) {
                    Log.d(TAG, "✅ Subida exitosa. URL: " + downloadUri.toString());
                    callback.onSuccess(downloadUri.toString());
                } else {
                    callback.onError("No se pudo obtener la URL de descarga");
                }
            } else {
                String error = task.getException() != null ? task.getException().getMessage() : "Error desconocido";
                Log.e(TAG, "❌ Error en subida: " + error);
                callback.onError(error);
            }
        });
    }
}

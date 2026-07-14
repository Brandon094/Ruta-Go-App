package com.chopcode.rutago.app.services.storage;

import android.net.Uri;
import android.util.Log;

import com.chopcode.rutago.app.config.MyApp;
import com.google.firebase.storage.StorageReference;
import com.google.firebase.storage.UploadTask;

/**
 * Storage Service
 *
 * Fachada para la gestión de recursos multimedia en la nube.
 * Responsabilidades:
 * - Orquestar la subida asíncrona de archivos binarios (imágenes) a Firebase Storage.
 * - Proporcionar un flujo de monitoreo de progreso para mejorar la UX.
 * - Resolver las URLs públicas de descarga tras una subida exitosa.
 * - Implementar una estructura de carpetas organizada por UID para la gestión de avatares.
 */
public class StorageService {
    private static final String TAG = "StorageService";

    /** Interfaz para el seguimiento del ciclo de vida de la subida. */
    public interface UploadCallback {
        /** @param downloadUrl Enlace público final al recurso subido. */
        void onSuccess(String downloadUrl);
        void onError(String error);
        /** @param progress Porcentaje de avance (0.0 a 100.0). */
        void onProgress(double progress);
    }

    /**
     * Ejecuta el proceso de carga de una fotografía de perfil.
     * @param userId Identificador único del propietario del recurso.
     * @param imageUri Ruta local del archivo (Uri del sistema de archivos o Galería).
     */
    public void uploadProfilePicture(String userId, Uri imageUri, UploadCallback callback) {
        if (userId == null || imageUri == null) {
            callback.onError("Datos de entrada inválidos para la operación de storage.");
            return;
        }

        Log.d(TAG, "📤 Iniciando subida de recurso para UID: " + userId);

        // Estructura de almacenamiento: perfiles/{userId}/profile.jpg
        StorageReference storageRef = MyApp.getStorageReference("perfiles/" + userId + "/profile.jpg");

        UploadTask uploadTask = storageRef.putFile(imageUri);

        // Registro del monitor de progreso (Pipeline asíncrono)
        uploadTask.addOnProgressListener(snapshot -> {
            double progress = (100.0 * snapshot.getBytesTransferred()) / snapshot.getTotalByteCount();
            callback.onProgress(progress);
        });

        // Resolución de la URL de descarga post-carga (Chain Task)
        uploadTask.continueWithTask(task -> {
            if (!task.isSuccessful()) {
                throw task.getException();
            }
            return storageRef.getDownloadUrl();
        }).addOnCompleteListener(task -> {
            if (task.isSuccessful()) {
                Uri downloadUri = task.getResult();
                if (downloadUri != null) {
                    Log.d(TAG, "✅ Recurso disponible en nube. Resolviendo callback de éxito.");
                    callback.onSuccess(downloadUri.toString());
                } else {
                    callback.onError("Fallo crítico: Recurso subido pero URL no resuelta.");
                }
            } else {
                String error = task.getException() != null ? 
                        task.getException().getMessage() : "Fallo de red en Firebase Storage.";
                Log.e(TAG, "❌ Error en el motor de subida: " + error);
                callback.onError(error);
            }
        });
    }
}

package com.chopcode.rutago.app.services.storage

import android.net.Uri
import android.util.Log
import com.chopcode.rutago.app.config.MyApp

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
class StorageService {

    /** Interfaz para el seguimiento del ciclo de vida de la subida. */
    interface UploadCallback {
        /** @param downloadUrl Enlace público final al recurso subido. */
        fun onSuccess(downloadUrl: String?)
        fun onError(error: String?)

        /** @param progress Porcentaje de avance (0.0 a 100.0). */
        fun onProgress(progress: Double)
    }

    /**
     * Ejecuta el proceso de carga de una fotografía de perfil.
     * @param userId Identificador único del propietario del recurso.
     * @param imageUri Ruta local del archivo (Uri del sistema de archivos o Galería).
     */
    fun uploadProfilePicture(userId: String?, imageUri: Uri?, callback: UploadCallback) {
        if (userId == null || imageUri == null) {
            callback.onError("Datos de entrada inválidos para la operación de storage.")
            return
        }

        Log.d(TAG, "📤 Iniciando subida de recurso para UID: $userId")

        // Estructura de almacenamiento: perfiles/{userId}/profile.jpg
        val storageRef = MyApp.getStorageReference("perfiles/$userId/profile.jpg")

        val uploadTask = storageRef.putFile(imageUri)

        // Registro del monitor de progreso (Pipeline asíncrono)
        uploadTask.addOnProgressListener { snapshot ->
            val progress = (100.0 * snapshot.bytesTransferred) / snapshot.totalByteCount
            callback.onProgress(progress)
        }

        // Resolución de la URL de descarga post-carga (Chain Task)
        uploadTask.continueWithTask { task ->
            if (!task.isSuccessful) {
                task.exception?.let { throw it }
            }
            storageRef.downloadUrl
        }.addOnCompleteListener { task ->
            if (task.isSuccessful) {
                val downloadUri = task.result
                if (downloadUri != null) {
                    Log.d(TAG, "✅ Recurso disponible en nube. Resolviendo callback de éxito.")
                    callback.onSuccess(downloadUri.toString())
                } else {
                    callback.onError("Fallo crítico: Recurso subido pero URL no resuelta.")
                }
            } else {
                val error = task.exception?.message ?: "Fallo de red en Firebase Storage."
                Log.e(TAG, "❌ Error en el motor de subida: $error")
                callback.onError(error)
            }
        }
    }

    companion object {
        private const val TAG = "StorageService"
    }
}

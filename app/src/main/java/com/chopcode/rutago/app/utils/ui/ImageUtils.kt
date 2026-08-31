package com.chopcode.rutago.app.utils.ui

import android.content.Context
import android.content.Intent
import android.graphics.Bitmap
import android.graphics.Canvas
import android.graphics.drawable.Drawable
import android.net.Uri
import android.util.Log
import android.view.View
import android.widget.ImageView
import android.widget.Toast
import androidx.core.content.FileProvider
import com.bumptech.glide.Glide
import com.bumptech.glide.Priority
import com.bumptech.glide.RequestBuilder
import com.bumptech.glide.load.engine.DiskCacheStrategy
import com.bumptech.glide.load.resource.drawable.DrawableTransitionOptions
import com.chopcode.rutago.app.R
import java.io.File
import java.io.FileOutputStream

/**
 * Image Utils
 *
 * Clase de utilidad centralizada para la manipulación y visualización de recursos gráficos.
 * Responsabilidades:
 * - Gestionar la carga asíncrona de avatares utilizando Glide con estrategias de caché (Disk & Memory).
 * - Implementar el motor de "Screen Capture" para convertir vistas XML en imágenes compartibles (PNG).
 * - Orquestar el flujo de compartición mediante FileProvider para cumplir con las políticas de seguridad de Android.
 * - Aplicar transformaciones visuales (Circle Crop) de forma eficiente.
 */
object ImageUtils {

    private const val TAG = "ImageUtils"

    /**
     * Carga una fotografía de perfil aplicando optimizaciones de red y visualización circular.
     */
    @JvmStatic
    fun loadProfilePhoto(context: Context?, url: String?, imageView: ImageView?) {
        if (context == null || imageView == null) return

        val placeholderRes = R.drawable.bg_profile_placeholder
        val isCircleImageView = imageView.javaClass.name.contains("CircleImageView")

        val requestBuilder: RequestBuilder<Drawable> = Glide.with(context)
            .load(url)
            .placeholder(placeholderRes)
            .error(placeholderRes)
            .fallback(placeholderRes)
            .diskCacheStrategy(DiskCacheStrategy.ALL)
            .priority(Priority.IMMEDIATE)
            .transition(DrawableTransitionOptions.withCrossFade(150))

        if (isCircleImageView) {
            requestBuilder.into(imageView)
        } else {
            requestBuilder.circleCrop().into(imageView)
        }
    }

    /**
     * 📸 Captura una vista (ej: un CardView de tiquete) y abre el selector de compartir del sistema.
     * Realiza un renderizado de la vista en un Canvas para generar el archivo binario.
     */
    @JvmStatic
    fun shareViewAsImage(context: Context?, view: View?, fileName: String) {
        if (context == null || view == null) return

        try {
            // 1. Renderizado de la vista a mapa de bits
            val bitmap = Bitmap.createBitmap(view.width, view.height, Bitmap.Config.ARGB_8888)
            val canvas = Canvas(bitmap)
            view.draw(canvas)

            // 2. Persistencia temporal en el directorio de caché de la aplicación
            val cachePath = File(context.cacheDir, "shared_images")
            cachePath.mkdirs()
            val imageFile = File(cachePath, "$fileName.png")
            val stream = FileOutputStream(imageFile)
            bitmap.compress(Bitmap.CompressFormat.PNG, 100, stream)
            stream.close()

            // 3. Resolución de URI segura mediante el FileProvider declarado en el Manifest
            val contentUri: Uri? = FileProvider.getUriForFile(
                context,
                "com.chopcode.rutago.app.fileprovider",
                imageFile
            )

            if (contentUri != null) {
                val shareIntent = Intent().apply {
                    action = Intent.ACTION_SEND
                    addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
                    setDataAndType(contentUri, context.contentResolver.getType(contentUri))
                    putExtra(Intent.EXTRA_STREAM, contentUri)
                    type = "image/png"
                }
                context.startActivity(Intent.createChooser(shareIntent, "Compartir tiquete vía:"))
            }
        } catch (e: Exception) {
            Log.e(TAG, "❌ Error al generar imagen compartible: ${e.message}")
            Toast.makeText(context, "No se pudo generar la imagen del tiquete", Toast.LENGTH_SHORT).show()
        }
    }
}

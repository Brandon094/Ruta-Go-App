package com.chopcode.rutago.app.utils.ui

import android.content.Context
import android.content.Intent
import android.graphics.Bitmap
import android.graphics.Canvas
import android.net.Uri
import android.view.View
import androidx.compose.ui.graphics.ImageBitmap
import androidx.compose.ui.graphics.asAndroidBitmap
import androidx.core.content.FileProvider
import java.io.File
import java.io.FileOutputStream

/**
 * 📤 Sharing Utils
 * Utilidades para compartir contenido de la aplicación.
 */
object SharingUtils {

    /**
     * Comparte un Bitmap como imagen.
     */
    fun shareBitmap(context: Context, bitmap: Bitmap, fileName: String) {
        try {
            val cachePath = File(context.cacheDir, "shared_images")
            cachePath.mkdirs()
            val file = File(cachePath, "$fileName.png")
            val stream = FileOutputStream(file)
            bitmap.compress(Bitmap.CompressFormat.PNG, 100, stream)
            stream.close()

            val contentUri = FileProvider.getUriForFile(
                context,
                "com.chopcode.rutago.app.fileprovider",
                file
            )

            if (contentUri != null) {
                val intent = Intent(Intent.ACTION_SEND).apply {
                    addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
                    setDataAndType(contentUri, context.contentResolver.getType(contentUri))
                    putExtra(Intent.EXTRA_STREAM, contentUri)
                    type = "image/png"
                }
                context.startActivity(Intent.createChooser(intent, "Compartir vía:"))
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }
    
    /**
     * Captura una View de Android y la comparte.
     */
    fun shareView(context: Context, view: View, fileName: String) {
        val bitmap = Bitmap.createBitmap(view.width, view.height, Bitmap.Config.ARGB_8888)
        val canvas = Canvas(bitmap)
        view.draw(canvas)
        shareBitmap(context, bitmap, fileName)
    }
}

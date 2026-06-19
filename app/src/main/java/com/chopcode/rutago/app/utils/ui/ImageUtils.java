package com.chopcode.rutago.app.utils.ui;

import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.net.Uri;
import android.util.Log;
import android.view.View;
import android.widget.ImageView;
import android.widget.Toast;

import androidx.core.content.FileProvider;

import com.bumptech.glide.Glide;
import com.bumptech.glide.Priority;
import com.bumptech.glide.load.engine.DiskCacheStrategy;
import com.bumptech.glide.load.resource.drawable.DrawableTransitionOptions;
import com.chopcode.rutago.app.R;

import java.io.File;
import java.io.FileOutputStream;

/**
 * 🖼️ Image Utils
 * 
 * Clase de utilidad centralizada para la carga de imágenes y captura de vistas.
 * Utiliza Glide con estrategias de caché agresivas para asegurar que las fotos
 * de perfil sean visibles instantáneamente al navegar entre pantallas.
 */
public class ImageUtils {

    private static final String TAG = "ImageUtils";

    /**
     * Carga una foto de perfil de forma circular con optimizaciones de velocidad y caché.
     */
    public static void loadProfilePhoto(Context context, String url, ImageView imageView) {
        if (context == null || imageView == null) return;

        int placeholderRes = R.drawable.bg_profile_placeholder;
        boolean isCircleImageView = imageView.getClass().getName().contains("CircleImageView");

        // Configuración de Glide para carga ultra-rápida desde caché
        com.bumptech.glide.RequestBuilder<android.graphics.drawable.Drawable> requestBuilder = Glide.with(context)
                .load(url)
                .placeholder(placeholderRes)
                .error(placeholderRes)
                .fallback(placeholderRes)
                .diskCacheStrategy(DiskCacheStrategy.ALL) // Cachear tanto original como redimensionada
                .priority(Priority.IMMEDIATE)            // Dar prioridad máxima
                .transition(DrawableTransitionOptions.withCrossFade(150)); // Crossfade muy rápido

        if (isCircleImageView) {
            requestBuilder.into(imageView);
        } else {
            requestBuilder.circleCrop().into(imageView);
        }
    }

    /**
     * 📸 Captura una vista (ej: un CardView) y la comparte como imagen.
     */
    public static void shareViewAsImage(Context context, View view, String fileName) {
        if (context == null || view == null) return;

        try {
            // 1. Crear el Bitmap desde la vista
            Bitmap bitmap = Bitmap.createBitmap(view.getWidth(), view.getHeight(), Bitmap.Config.ARGB_8888);
            Canvas canvas = new Canvas(bitmap);
            view.draw(canvas);

            // 2. Guardar en caché temporal
            File cachePath = new File(context.getCacheDir(), "shared_images");
            cachePath.mkdirs();
            File imageFile = new File(cachePath, fileName + ".png");
            FileOutputStream stream = new FileOutputStream(imageFile);
            bitmap.compress(Bitmap.CompressFormat.PNG, 100, stream);
            stream.close();

            // 3. Obtener URI mediante FileProvider
            Uri contentUri = FileProvider.getUriForFile(context, "com.chopcode.rutago.app.fileprovider", imageFile);

            if (contentUri != null) {
                Intent shareIntent = new Intent();
                shareIntent.setAction(Intent.ACTION_SEND);
                shareIntent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
                shareIntent.setDataAndType(contentUri, context.getContentResolver().getType(contentUri));
                shareIntent.putExtra(Intent.EXTRA_STREAM, contentUri);
                shareIntent.setType("image/png");
                context.startActivity(Intent.createChooser(shareIntent, "Compartir tiquete vía:"));
            }

        } catch (Exception e) {
            Log.e(TAG, "Error al compartir imagen: " + e.getMessage());
            Toast.makeText(context, "No se pudo generar la imagen del tiquete", Toast.LENGTH_SHORT).show();
        }
    }
}

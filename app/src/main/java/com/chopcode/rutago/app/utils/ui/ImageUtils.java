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
 * Image Utils
 *
 * Clase de utilidad centralizada para la manipulación y visualización de recursos gráficos.
 * Responsabilidades:
 * - Gestionar la carga asíncrona de avatares utilizando Glide con estrategias de caché (Disk & Memory).
 * - Implementar el motor de "Screen Capture" para convertir vistas XML en imágenes compartibles (PNG).
 * - Orquestar el flujo de compartición mediante FileProvider para cumplir con las políticas de seguridad de Android.
 * - Aplicar transformaciones visuales (Circle Crop) de forma eficiente.
 */
public class ImageUtils {

    private static final String TAG = "ImageUtils";

    /**
     * Carga una fotografía de perfil aplicando optimizaciones de red y visualización circular.
     */
    public static void loadProfilePhoto(Context context, String url, ImageView imageView) {
        if (context == null || imageView == null) return;

        int placeholderRes = R.drawable.bg_profile_placeholder;
        boolean isCircleImageView = imageView.getClass().getName().contains("CircleImageView");

        com.bumptech.glide.RequestBuilder<android.graphics.drawable.Drawable> requestBuilder = Glide.with(context)
                .load(url)
                .placeholder(placeholderRes)
                .error(placeholderRes)
                .fallback(placeholderRes)
                .diskCacheStrategy(DiskCacheStrategy.ALL) 
                .priority(Priority.IMMEDIATE)            
                .transition(DrawableTransitionOptions.withCrossFade(150)); 

        if (isCircleImageView) {
            requestBuilder.into(imageView);
        } else {
            requestBuilder.circleCrop().into(imageView);
        }
    }

    /**
     * 📸 Captura una vista (ej: un CardView de tiquete) y abre el selector de compartir del sistema.
     * Realiza un renderizado de la vista en un Canvas para generar el archivo binario.
     */
    public static void shareViewAsImage(Context context, View view, String fileName) {
        if (context == null || view == null) return;

        try {
            // 1. Renderizado de la vista a mapa de bits
            Bitmap bitmap = Bitmap.createBitmap(view.getWidth(), view.getHeight(), Bitmap.Config.ARGB_8888);
            Canvas canvas = new Canvas(bitmap);
            view.draw(canvas);

            // 2. Persistencia temporal en el directorio de caché de la aplicación
            File cachePath = new File(context.getCacheDir(), "shared_images");
            cachePath.mkdirs();
            File imageFile = new File(cachePath, fileName + ".png");
            FileOutputStream stream = new FileOutputStream(imageFile);
            bitmap.compress(Bitmap.CompressFormat.PNG, 100, stream);
            stream.close();

            // 3. Resolución de URI segura mediante el FileProvider declarado en el Manifest
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
            Log.e(TAG, "❌ Error al generar imagen compartible: " + e.getMessage());
            Toast.makeText(context, "No se pudo generar la imagen del tiquete", Toast.LENGTH_SHORT).show();
        }
    }
}

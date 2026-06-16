package com.chopcode.rutago.app.utils.ui;

import android.content.Context;
import androidx.core.content.ContextCompat;
import androidx.swiperefreshlayout.widget.CircularProgressDrawable;
import android.widget.ImageView;
import com.bumptech.glide.Glide;
import com.bumptech.glide.load.engine.DiskCacheStrategy;
import com.bumptech.glide.load.resource.drawable.DrawableTransitionOptions;
import com.chopcode.rutago.app.R;

/**
 * Clase de utilidad centralizada para la carga de imágenes en la aplicación.
 * Optimizada para rendimiento y mejor experiencia de usuario.
 */
public class ImageUtils {

    /**
     * Carga una foto de perfil de forma circular con optimizaciones de velocidad.
     * 
     * @param context Contexto de la actividad o fragmento.
     * @param url URL de la imagen (Firebase Storage o Google).
     * @param imageView ImageView donde se mostrará la imagen.
     */
    public static void loadProfilePhoto(Context context, String url, ImageView imageView) {
        if (context == null || imageView == null) return;

        // 1. Crear un progreso circular más "enérgico" y rápido
        CircularProgressDrawable progressDrawable = new CircularProgressDrawable(context);
        progressDrawable.setStrokeWidth(6f);      // Un poco más grueso
        progressDrawable.setCenterRadius(100f);
        progressDrawable.setColorSchemeColors(ContextCompat.getColor(context, R.color.secondary_100));
        progressDrawable.start();

        // 2. Usar bg_profile_placeholder como fallback visual (el icono amarillo)
        int placeholderRes = R.drawable.bg_profile_placeholder;

        // 3. Carga optimizada con Glide
        Glide.with(context)
                .load(url)
                .placeholder(progressDrawable)
                .error(placeholderRes)
                .fallback(placeholderRes)
                .circleCrop()
                // OPTIMIZACIÓN DE VELOCIDAD:
                .diskCacheStrategy(DiskCacheStrategy.ALL) // Cachea tanto la original como la redimensionada
                .skipMemoryCache(false)                   // Asegura el uso de memoria RAM para carga instantánea
                .transition(DrawableTransitionOptions.withCrossFade(200)) // Animación más rápida (200ms)
                .into(imageView);
    }
}

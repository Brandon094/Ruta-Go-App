package com.chopcode.rutago.app.utils.ui;

import android.content.Context;
import android.graphics.drawable.Drawable;
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
     */
    public static void loadProfilePhoto(Context context, String url, ImageView imageView) {
        if (context == null || imageView == null) return;

        int placeholderRes = R.drawable.bg_profile_placeholder;
        boolean isCircleImageView = imageView.getClass().getName().contains("CircleImageView");

        if (isCircleImageView) {
            Glide.with(context)
                    .load(url)
                    .placeholder(placeholderRes)
                    .error(placeholderRes)
                    .fallback(placeholderRes)
                    .diskCacheStrategy(DiskCacheStrategy.ALL)
                    .transition(DrawableTransitionOptions.withCrossFade(200))
                    .into(imageView);
        } else {
            Glide.with(context)
                    .load(url)
                    .placeholder(placeholderRes)
                    .error(placeholderRes)
                    .fallback(placeholderRes)
                    .circleCrop()
                    .diskCacheStrategy(DiskCacheStrategy.ALL)
                    .transition(DrawableTransitionOptions.withCrossFade(200))
                    .into(imageView);
        }
    }
}

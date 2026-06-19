package com.chopcode.rutago.app.utils.ui;

import android.animation.ValueAnimator;
import android.content.Context;
import android.view.View;
import android.view.animation.Animation;
import android.widget.TextView;
import com.chopcode.rutago.app.R;

/**
 * 🎬 UI Animation Utils
 * 
 * Centraliza las animaciones de la interfaz de usuario para garantizar consistencia.
 * Provee métodos para conteo progresivo de números, precios y efectos visuales de error.
 */
public class UIAnimationUtils {

    /**
     * Realiza un conteo progresivo en un TextView para valores enteros.
     */
    public static void animateNumericText(TextView textView, int start, int end) {
        if (textView == null || start == end) {
            if (textView != null) textView.setText(String.valueOf(end));
            return;
        }

        ValueAnimator animator = ValueAnimator.ofInt(start, end);
        animator.setDuration(1000);
        animator.addUpdateListener(animation -> textView.setText(animation.getAnimatedValue().toString()));
        animator.start();
    }

    /**
     * Realiza un conteo progresivo en un TextView formateando el valor como moneda colombiana.
     */
    public static void animateCurrencyText(TextView textView, double start, double end) {
        if (textView == null) return;
        if (start == end) {
            textView.setText(FormatUtils.formatearPrecio(end));
            return;
        }

        ValueAnimator animator = ValueAnimator.ofFloat((float) start, (float) end);
        animator.setDuration(1200);
        animator.addUpdateListener(animation -> {
            float val = (float) animation.getAnimatedValue();
            textView.setText(FormatUtils.formatearPrecio(val));
        });
        animator.start();
    }

    /**
     * Aplica un efecto de vibración (shake) a una vista, útil para indicar errores.
     */
    public static void playErrorShake(Context context, View view) {
        if (context == null || view == null) return;
        Animation shake = android.view.animation.AnimationUtils.loadAnimation(context, R.anim.shake);
        view.startAnimation(shake);
    }

    /**
     * Añade una micro-interacción de escala al presionar una vista.
     */
    @android.annotation.SuppressLint("ClickableViewAccessibility")
    public static void setClickAnimation(View view) {
        if (view == null) return;
        view.setOnTouchListener((v, event) -> {
            switch (event.getAction()) {
                case android.view.MotionEvent.ACTION_DOWN:
                    v.animate().scaleX(0.95f).scaleY(0.95f).setDuration(100).start();
                    break;
                case android.view.MotionEvent.ACTION_UP:
                case android.view.MotionEvent.ACTION_CANCEL:
                    v.animate().scaleX(1.0f).scaleY(1.0f).setDuration(100).start();
                    break;
            }
            return false;
        });
    }

    /**
     * Crea una animación de pulsación (latido) infinita para un badge activo.
     */
    public static void startPulseAnimation(View view) {
        if (view == null) return;
        view.animate().cancel();
        view.setAlpha(1.0f);
        
        android.animation.ObjectAnimator pulse = android.animation.ObjectAnimator.ofFloat(view, "alpha", 1.0f, 0.5f);
        pulse.setDuration(1000);
        pulse.setRepeatMode(android.animation.ValueAnimator.REVERSE);
        pulse.setRepeatCount(android.animation.ValueAnimator.INFINITE);
        pulse.setInterpolator(new android.view.animation.AccelerateDecelerateInterpolator());
        pulse.start();
    }

    /**
     * Detiene cualquier animación en curso de una vista.
     */
    public static void stopAnimation(View view) {
        if (view == null) return;
        view.animate().cancel();
        view.setAlpha(1.0f);
        view.setScaleX(1.0f);
        view.setScaleY(1.0f);
    }

    /**
     * 🔥 Animación Premium de Entrada para tarjetas o contenedores principales.
     * Crea un efecto de emergencia desde el fondo con un ligero rebote.
     */
    public static void playCardEntryAnimation(View view) {
        if (view == null) return;
        view.setAlpha(0f);
        view.setScaleX(0.85f);
        view.setScaleY(0.85f);
        view.animate()
                .alpha(1f)
                .scaleX(1f)
                .scaleY(1f)
                .setDuration(600)
                .setInterpolator(new android.view.animation.OvershootInterpolator(1.2f))
                .start();
    }

    /**
     * 💺 Animación sutil para la selección de un asiento.
     */
    public static void playSeatSelectionAnimation(View view) {
        if (view == null) return;
        view.setScaleX(0.7f);
        view.setScaleY(0.7f);
        view.animate()
                .scaleX(1.0f)
                .scaleY(1.0f)
                .setDuration(300)
                .setInterpolator(new android.view.animation.OvershootInterpolator(2.0f))
                .start();
    }

    /**
     * 💺 Animación de "Pop" para cuando un asiento se marca como ocupado.
     */
    public static void playSeatPopAnimation(View view, int delay) {
        if (view == null) return;
        view.setScaleX(0f);
        view.setScaleY(0f);
        view.animate()
                .scaleX(1.0f)
                .scaleY(1.0f)
                .setStartDelay(delay)
                .setDuration(400)
                .setInterpolator(new android.view.animation.OvershootInterpolator(1.5f))
                .start();
    }

    /**
     * ⭐ Animación explosiva para la selección de estrellas en calificación.
     */
    public static void playStarRatingAnimation(View view) {
        if (view == null) return;
        view.animate().cancel();
        view.setScaleX(0.8f);
        view.setScaleY(0.8f);
        view.animate()
                .scaleX(1.15f)
                .scaleY(1.15f)
                .setDuration(150)
                .setInterpolator(new android.view.animation.AccelerateInterpolator())
                .withEndAction(() -> view.animate()
                        .scaleX(1.0f)
                        .scaleY(1.0f)
                        .setDuration(250)
                        .setInterpolator(new android.view.animation.OvershootInterpolator(2.0f))
                        .start())
                .start();
    }

    /**
     * 🚀 Animación Sofisticada para el Splash Screen.
     * Efecto moderno de crecimiento secuencial: primero el pin de fondo y luego el logo.
     * Ambos inician desde un punto diminuto para dar sensación de emergencia.
     */
    public static void playSophisticatedSplashAnimation(View pinContainer, View logoIcon, View poweredBy) {
        if (pinContainer == null || logoIcon == null) return;

        // 1. Preparar estados iniciales (Diminutos e invisibles)
        pinContainer.setAlpha(0f);
        pinContainer.setScaleX(0.05f);
        pinContainer.setScaleY(0.05f);
        
        logoIcon.setAlpha(0f);
        logoIcon.setScaleX(0.01f);
        logoIcon.setScaleY(0.01f);

        if (poweredBy != null) {
            poweredBy.setAlpha(0f);
            poweredBy.setTranslationY(50f);
        }

        // 2. Animación del Pin (Fondo) - Crece con efecto rebote
        pinContainer.animate()
                .alpha(1f)
                .scaleX(1f)
                .scaleY(1f)
                .setDuration(1300)
                .setInterpolator(new android.view.animation.OvershootInterpolator(1.2f))
                .withEndAction(() -> {
                    // Iniciar latido sutil al finalizar la secuencia
                    startPulseAnimation(pinContainer);
                })
                .start();

        // 3. Animación del Logo (Secuencial) - Emerge cuando el pin ya es visible
        logoIcon.animate()
                .alpha(1f)
                .scaleX(1f)
                .scaleY(1f)
                .setStartDelay(800) // Delay marcado para efecto secuencial puro
                .setDuration(1100)
                .setInterpolator(new android.view.animation.OvershootInterpolator(2.2f))
                .start();

        // 4. Animación del "Powered By" (Entrada elegante al final)
        if (poweredBy != null) {
            poweredBy.animate()
                    .alpha(1f)
                    .translationY(0f)
                    .setStartDelay(1600)
                    .setDuration(900)
                    .setInterpolator(new android.view.animation.DecelerateInterpolator())
                    .start();
        }
    }

    /**
     * 🔄 Crea una animación de inclinación (tilt) periódica y sofisticada para el logo.
     * Gira ligeramente y vuelve a su posición para dar sensación de vida.
     */
    public static void startLogoTiltAnimation(View view) {
        if (view == null) return;

        android.animation.ObjectAnimator tilt = android.animation.ObjectAnimator.ofFloat(view, "rotation", 0f, 15f, 0f, -15f, 0f);
        tilt.setDuration(1500);
        tilt.setInterpolator(new android.view.animation.AccelerateDecelerateInterpolator());
        
        android.os.Handler handler = new android.os.Handler(android.os.Looper.getMainLooper());
        Runnable runnable = new Runnable() {
            @Override
            public void run() {
                tilt.start();
                handler.postDelayed(this, 5000); // Cada 5 segundos un "guiño" visual
            }
        };
        handler.postDelayed(runnable, 2000);
    }
}

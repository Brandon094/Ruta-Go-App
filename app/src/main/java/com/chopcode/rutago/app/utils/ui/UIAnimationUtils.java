package com.chopcode.rutago.app.utils.ui;

import android.animation.ValueAnimator;
import android.content.Context;
import android.view.View;
import android.view.animation.Animation;
import android.widget.TextView;
import com.chopcode.rutago.app.R;

/**
 * UI Animation Utils
 *
 * Motor central de efectos visuales y micro-interacciones de la plataforma.
 * Responsabilidades:
 * - Implementar transiciones fluidas para la entrada de componentes (Cards, Badges).
 * - Orquestar animaciones secuenciales complejas para el Branding (Splash Screen).
 * - Proveer feedback táctico mediante efectos de escala (Clicks) y vibración (Errors).
 * - Gestionar animaciones infinitas de estado (Pulse, Tilt) para mantener la interfaz "viva".
 * - Realizar interpolaciones numéricas para contadores financieros y de ocupación.
 */
public class UIAnimationUtils {

    /**
     * Realiza un conteo progresivo animado para valores enteros.
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
     * Realiza un conteo progresivo formateando el valor como moneda colombiana (COP).
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
     * Aplica un efecto de vibración lateral (Shake) para alertar sobre errores de validación.
     */
    public static void playErrorShake(Context context, View view) {
        if (context == null || view == null) return;
        Animation shake = android.view.animation.AnimationUtils.loadAnimation(context, R.anim.shake);
        view.startAnimation(shake);
    }

    /**
     * Añade una sutil micro-interacción de escala (0.95x) al presionar cualquier vista.
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
     * Inicia una animación de opacidad cíclica (Latido) para elementos que requieren atención.
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

    public static void stopAnimation(View view) {
        if (view == null) return;
        view.animate().cancel();
        view.setAlpha(1.0f);
        view.setScaleX(1.0f);
        view.setScaleY(1.0f);
    }

    /**
     * 🔥 Animación Premium: Entrada con escalado y rebote (Overshoot).
     * Ideal para cargar tarjetas del Dashboard tras la respuesta del servidor.
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
     * 🚀 Core Branding Animation:
     * Ejecuta una coreografía visual para el Splash Screen, orquestando tiempos 
     * entre el contenedor principal, el isotipo y el pie de página de la marca.
     */
    public static void playSophisticatedSplashAnimation(View pinContainer, View logoIcon, View poweredBy) {
        if (pinContainer == null || logoIcon == null) return;

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

        pinContainer.animate()
                .alpha(1f)
                .scaleX(1f)
                .scaleY(1f)
                .setDuration(1300)
                .setInterpolator(new android.view.animation.OvershootInterpolator(1.2f))
                .withEndAction(() -> {
                    startPulseAnimation(pinContainer);
                })
                .start();

        logoIcon.animate()
                .alpha(1f)
                .scaleX(1f)
                .scaleY(1f)
                .setStartDelay(800) 
                .setDuration(1100)
                .setInterpolator(new android.view.animation.OvershootInterpolator(2.2f))
                .start();

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
     * Inicia una rotación periódica (Guiño visual) para el logo corporativo.
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
                handler.postDelayed(this, 5000); 
            }
        };
        handler.postDelayed(runnable, 2000);
    }

    /**
     * 🚌 Bus Departure Animation:
     * Simula el arranque de un vehículo mediante un retroceso inicial y una salida veloz lateral.
     */
    public static void playBusDepartureAnimation(View view) {
        if (view == null) return;
        
        view.animate().cancel();
        view.setTranslationX(0);
        view.setAlpha(1.0f);

        view.animate()
                .translationX(-30f)
                .setDuration(400)
                .setInterpolator(new android.view.animation.AccelerateInterpolator())
                .withEndAction(() -> {
                    view.animate()
                            .translationX(500f)
                            .alpha(0f)
                            .setDuration(800)
                            .setInterpolator(new android.view.animation.AccelerateInterpolator())
                            .withEndAction(() -> view.setVisibility(View.INVISIBLE))
                            .start();
                })
                .start();
    }
}

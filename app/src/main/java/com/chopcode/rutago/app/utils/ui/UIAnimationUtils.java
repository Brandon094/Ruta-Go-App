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
}

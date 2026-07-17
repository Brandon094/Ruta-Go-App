package com.chopcode.rutago.app.utils.ui;

import android.view.View;
import android.view.ViewGroup;

import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

/**
 * Window Utils
 *
 * Clase de utilidad para manejar los insets de las ventanas del sistema para el soporte Edge-to-Edge.
 * Sigue el principio DRY para centralizar los ajustes de diseño en toda la aplicación.
 */
public class WindowUtils {

    /**
     * Aplica los insets de las barras superiores del sistema como padding a la vista especificada.
     * Captura el padding inicial para evitar acumulaciones en refrescos de UI.
     */
    public static void applyTopInsetPadding(View view) {
        if (view == null) return;
        final int initialPaddingTop = view.getPaddingTop();
        ViewCompat.setOnApplyWindowInsetsListener(view, (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(v.getPaddingLeft(), initialPaddingTop + systemBars.top, v.getPaddingRight(), v.getPaddingBottom());
            return insets;
        });
    }

    /**
     * Aplica los insets de las barras inferiores del sistema como padding a la vista especificada.
     * Es más estable que el margen para evitar que los componentes internos se aplasten.
     */
    public static void applyBottomInsetPadding(View view) {
        if (view == null) return;
        final int initialPaddingBottom = view.getPaddingBottom();
        ViewCompat.setOnApplyWindowInsetsListener(view, (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(v.getPaddingLeft(), v.getPaddingTop(), v.getPaddingRight(), initialPaddingBottom + systemBars.bottom);
            return insets;
        });
    }

    /**
     * Aplica los insets de las barras inferiores del sistema como margen a la vista especificada.
     * Útil para que componentes como la BottomNavigation floten correctamente.
     */
    public static void applyBottomInsetMargin(View view) {
        if (view == null) return;
        if (!(view.getLayoutParams() instanceof ViewGroup.MarginLayoutParams)) return;
        
        final int initialMarginBottom = ((ViewGroup.MarginLayoutParams) view.getLayoutParams()).bottomMargin;
        
        ViewCompat.setOnApplyWindowInsetsListener(view, (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            ViewGroup.MarginLayoutParams params = (ViewGroup.MarginLayoutParams) v.getLayoutParams();
            params.bottomMargin = initialMarginBottom + systemBars.bottom;
            v.setLayoutParams(params);
            return insets;
        });
    }

    /**
     * Aplica los insets de las barras inferiores del sistema como margen a la vista especificada,
     * permitiendo definir un margen extra en DP que se sumará al inset.
     */
    public static void applyBottomInsetMargin(View view, int extraMarginDp) {
        if (view == null) return;
        if (!(view.getLayoutParams() instanceof ViewGroup.MarginLayoutParams)) return;

        final float density = view.getResources().getDisplayMetrics().density;
        final int extraPx = (int) (extraMarginDp * density);

        ViewCompat.setOnApplyWindowInsetsListener(view, (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            ViewGroup.MarginLayoutParams params = (ViewGroup.MarginLayoutParams) v.getLayoutParams();
            params.bottomMargin = systemBars.bottom + extraPx;
            v.setLayoutParams(params);
            return insets;
        });
    }

    /**
     * Aplicación de insets especializada para layouts de pantalla completa (Login/Splash).
     * Ajusta los paddings de los 4 costados según las barras del sistema.
     */
    public static void applyContentInsets(View contentView) {
        if (contentView == null) return;
        
        final int iPLeft = contentView.getPaddingLeft();
        final int iPTop = contentView.getPaddingTop();
        final int iPRight = contentView.getPaddingRight();
        final int iPBottom = contentView.getPaddingBottom();

        ViewCompat.setOnApplyWindowInsetsListener(contentView, (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(iPLeft + systemBars.left, iPTop + systemBars.top, iPRight + systemBars.right, iPBottom + systemBars.bottom);
            return insets;
        });
    }
}

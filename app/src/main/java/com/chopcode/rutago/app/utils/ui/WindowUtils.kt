package com.chopcode.rutago.app.utils.ui

import android.content.Context
import android.view.View
import android.view.ViewGroup
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat

/**
 * Window Utils
 *
 * Clase de utilidad para manejar los insets de las ventanas del sistema para el soporte Edge-to-Edge.
 * Sigue el principio DRY para centralizar los ajustes de diseño en toda la aplicación.
 */
object WindowUtils {

    /**
     * Aplica los insets de las barras superiores del sistema como padding a la vista especificada.
     * Captura el padding inicial para evitar acumulaciones en refrescos de UI.
     */
    @JvmStatic
    fun applyTopInsetPadding(view: View?) {
        if (view == null) return
        val initialPaddingTop = view.paddingTop
        ViewCompat.setOnApplyWindowInsetsListener(view) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(v.paddingLeft, initialPaddingTop + systemBars.top, v.paddingRight, v.paddingBottom)
            insets
        }
    }

    /**
     * Aplica los insets de las barras inferiores del sistema como padding a la vista especificada.
     * Esta versión es ideal para contenedores de navegación (Bottom Navigation), ya que crea
     * un espacio en la base sin deformar el contenido interno.
     */
    @JvmStatic
    fun applyBottomInsetPadding(view: View?) {
        if (view == null) return
        val initialPaddingBottom = view.paddingBottom
        ViewCompat.setOnApplyWindowInsetsListener(view) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(v.paddingLeft, v.paddingTop, v.paddingRight, initialPaddingBottom + systemBars.bottom)
            insets
        }
    }

    /**
     * Versión avanzada para navegación flotante que asegura que la vista siempre mantenga
     * un margen mínimo respecto a la barra de Android.
     */
    @JvmStatic
    fun applyFloatingNavigationInsets(container: View?) {
        if (container == null) return
        ViewCompat.setOnApplyWindowInsetsListener(container) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(0, 0, 0, systemBars.bottom)
            insets
        }
    }

    /**
     * Aplica los insets de las barras inferiores del sistema como margen a la vista especificada.
     * Útil para que componentes como la BottomNavigation floten correctamente.
     */
    @JvmStatic
    fun applyBottomInsetMargin(view: View?) {
        if (view == null) return
        val params = view.layoutParams as? ViewGroup.MarginLayoutParams ?: return
        val initialMarginBottom = params.bottomMargin

        ViewCompat.setOnApplyWindowInsetsListener(view) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            val lp = v.layoutParams as? ViewGroup.MarginLayoutParams
            if (lp != null) {
                lp.bottomMargin = initialMarginBottom + systemBars.bottom
                v.layoutParams = lp
            }
            insets
        }
    }

    /**
     * Versión para Chat: Aplica insets que incluyen el teclado (IME).
     * Asegura que la barra de entrada suba cuando el teclado aparece.
     */
    @JvmStatic
    fun applyChatInputInsets(view: View?) {
        if (view == null) return
        val params = view.layoutParams as? ViewGroup.MarginLayoutParams ?: return
        val initialMarginBottom = params.bottomMargin

        ViewCompat.setOnApplyWindowInsetsListener(view) { v, insets ->
            val typeInsets = insets.getInsets(WindowInsetsCompat.Type.systemBars() or WindowInsetsCompat.Type.ime())
            val lp = v.layoutParams as? ViewGroup.MarginLayoutParams
            if (lp != null) {
                lp.bottomMargin = initialMarginBottom + typeInsets.bottom
                v.layoutParams = lp
            }
            insets
        }
    }

    /**
     * Aplica los insets de las barras inferiores del sistema como margen a la vista especificada,
     * permitiendo definir un margen extra en DP que se sumará al inset.
     */
    @JvmStatic
    fun applyBottomInsetMargin(view: View?, extraMarginDp: Int) {
        if (view == null) return
        if (view.layoutParams !is ViewGroup.MarginLayoutParams) return

        val density = view.resources.displayMetrics.density
        val extraPx = (extraMarginDp * density).toInt()

        ViewCompat.setOnApplyWindowInsetsListener(view) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            val lp = v.layoutParams as? ViewGroup.MarginLayoutParams
            if (lp != null) {
                lp.bottomMargin = systemBars.bottom + extraPx
                v.layoutParams = lp
            }
            insets
        }
    }

    /**
     * Aplicación de insets especializada para layouts de pantalla completa (Login/Splash).
     * Ajusta los paddings de los 4 costados según las barras del sistema.
     */
    @JvmStatic
    fun applyContentInsets(contentView: View?) {
        if (contentView == null) return

        val iPLeft = contentView.paddingLeft
        val iPTop = contentView.paddingTop
        val iPRight = contentView.paddingRight
        val iPBottom = contentView.paddingBottom

        ViewCompat.setOnApplyWindowInsetsListener(contentView) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(iPLeft + systemBars.left, iPTop + systemBars.top, iPRight + systemBars.right, iPBottom + systemBars.bottom)
            insets
        }
    }

    /**
     * Convierte valores de DP a Píxeles según la densidad de la pantalla del dispositivo.
     */
    @JvmStatic
    fun dpToPx(context: Context?, dp: Int): Int {
        if (context == null) return dp
        val density = context.resources.displayMetrics.density
        return Math.round(dp * density)
    }
}

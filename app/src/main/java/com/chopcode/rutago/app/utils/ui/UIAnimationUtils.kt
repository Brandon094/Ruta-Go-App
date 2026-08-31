package com.chopcode.rutago.app.utils.ui

import android.animation.ObjectAnimator
import android.animation.ValueAnimator
import android.annotation.SuppressLint
import android.content.Context
import android.os.Handler
import android.os.Looper
import android.view.MotionEvent
import android.view.View
import android.view.animation.AccelerateDecelerateInterpolator
import android.view.animation.AccelerateInterpolator
import android.view.animation.AnimationUtils
import android.view.animation.DecelerateInterpolator
import android.view.animation.OvershootInterpolator
import android.widget.TextView
import com.chopcode.rutago.app.R

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
object UIAnimationUtils {

    /**
     * Realiza un conteo progresivo animado para valores enteros.
     */
    @JvmStatic
    fun animateNumericText(textView: TextView?, start: Int, end: Int) {
        if (textView == null || start == end) {
            textView?.text = end.toString()
            return
        }

        val animator = ValueAnimator.ofInt(start, end)
        animator.duration = 1000
        animator.addUpdateListener { animation ->
            textView.text = animation.animatedValue.toString()
        }
        animator.start()
    }

    /**
     * Realiza un conteo progresivo formateando el valor como moneda colombiana (COP).
     */
    @JvmStatic
    fun animateCurrencyText(textView: TextView?, start: Double, end: Double) {
        if (textView == null) return
        if (start == end) {
            textView.text = FormatUtils.formatearPrecio(end)
            return
        }

        val animator = ValueAnimator.ofFloat(start.toFloat(), end.toFloat())
        animator.duration = 1200
        animator.addUpdateListener { animation ->
            val valFloat = animation.animatedValue as Float
            textView.text = FormatUtils.formatearPrecio(valFloat)
        }
        animator.start()
    }

    /**
     * Aplica un efecto de vibración lateral (Shake) para alertar sobre errores de validación.
     */
    @JvmStatic
    fun playErrorShake(context: Context?, view: View?) {
        if (context == null || view == null) return
        val shake = AnimationUtils.loadAnimation(context, R.anim.shake)
        view.startAnimation(shake)
    }

    /**
     * Añade una sutil micro-interacción de escala (0.95x) al presionar cualquier vista.
     */
    @SuppressLint("ClickableViewAccessibility")
    @JvmStatic
    fun setClickAnimation(view: View?) {
        if (view == null) return
        view.setOnTouchListener { v, event ->
            when (event.action) {
                MotionEvent.ACTION_DOWN -> {
                    v.animate().scaleX(0.95f).scaleY(0.95f).setDuration(100).start()
                }
                MotionEvent.ACTION_UP, MotionEvent.ACTION_CANCEL -> {
                    v.animate().scaleX(1.0f).scaleY(1.0f).setDuration(100).start()
                }
            }
            false
        }
    }

    /**
     * Inicia una animación de opacidad cíclica (Latido) para elementos que requieren atención.
     */
    @JvmStatic
    fun startPulseAnimation(view: View?) {
        if (view == null) return
        view.animate().cancel()
        view.alpha = 1.0f

        val pulse = ObjectAnimator.ofFloat(view, "alpha", 1.0f, 0.5f)
        pulse.duration = 1000
        pulse.repeatMode = ValueAnimator.REVERSE
        pulse.repeatCount = ValueAnimator.INFINITE
        pulse.interpolator = AccelerateDecelerateInterpolator()
        pulse.start()
    }

    @JvmStatic
    fun stopAnimation(view: View?) {
        if (view == null) return
        view.animate().cancel()
        view.alpha = 1.0f
        view.scaleX = 1.0f
        view.scaleY = 1.0f
    }

    /**
     * 🔥 Animación Premium: Entrada con escalado y rebote (Overshoot).
     * Ideal para cargar tarjetas del Dashboard tras la respuesta del servidor.
     */
    @JvmStatic
    fun playCardEntryAnimation(view: View?) {
        if (view == null) return
        view.alpha = 0f
        view.scaleX = 0.85f
        view.scaleY = 0.85f
        view.animate()
            .alpha(1f)
            .scaleX(1f)
            .scaleY(1f)
            .setDuration(600)
            .setInterpolator(OvershootInterpolator(1.2f))
            .start()
    }

    @JvmStatic
    fun playSeatSelectionAnimation(view: View?) {
        if (view == null) return
        view.scaleX = 0.7f
        view.scaleY = 0.7f
        view.animate()
            .scaleX(1.0f)
            .scaleY(1.0f)
            .setDuration(300)
            .setInterpolator(OvershootInterpolator(2.0f))
            .start()
    }

    @JvmStatic
    fun playSeatPopAnimation(view: View?, delay: Int) {
        if (view == null) return
        view.scaleX = 0f
        view.scaleY = 0f
        view.animate()
            .scaleX(1.0f)
            .scaleY(1.0f)
            .setStartDelay(delay.toLong())
            .setDuration(400)
            .setInterpolator(OvershootInterpolator(1.5f))
            .start()
    }

    @JvmStatic
    fun playStarRatingAnimation(view: View?) {
        if (view == null) return
        view.animate().cancel()
        view.scaleX = 0.8f
        view.scaleY = 0.8f
        view.animate()
            .scaleX(1.15f)
            .scaleY(1.15f)
            .setDuration(150)
            .setInterpolator(AccelerateInterpolator())
            .withEndAction {
                view.animate()
                    .scaleX(1.0f)
                    .scaleY(1.0f)
                    .setDuration(250)
                    .setInterpolator(OvershootInterpolator(2.0f))
                    .start()
            }
            .start()
    }

    /**
     * 🚀 Core Branding Animation:
     * Ejecuta una coreografía visual para el Splash Screen, orquestando tiempos 
     * entre el contenedor principal, el isotipo y el pie de página de la marca.
     */
    @JvmStatic
    fun playSophisticatedSplashAnimation(pinContainer: View?, logoIcon: View?, poweredBy: View?) {
        if (pinContainer == null || logoIcon == null) return

        pinContainer.alpha = 0f
        pinContainer.scaleX = 0.05f
        pinContainer.scaleY = 0.05f

        logoIcon.alpha = 0f
        logoIcon.scaleX = 0.01f
        logoIcon.scaleY = 0.01f

        poweredBy?.let {
            it.alpha = 0f
            it.translationY = 50f
        }

        pinContainer.animate()
            .alpha(1f)
            .scaleX(1f)
            .scaleY(1f)
            .setDuration(1300)
            .setInterpolator(OvershootInterpolator(1.2f))
            .withEndAction {
                startPulseAnimation(pinContainer)
            }
            .start()

        logoIcon.animate()
            .alpha(1f)
            .scaleX(1f)
            .scaleY(1f)
            .setStartDelay(800)
            .setDuration(1100)
            .setInterpolator(OvershootInterpolator(2.2f))
            .start()

        poweredBy?.animate()
            ?.alpha(1f)
            ?.translationY(0f)
            ?.setStartDelay(1600)
            ?.setDuration(900)
            ?.setInterpolator(DecelerateInterpolator())
            ?.start()
    }

    /**
     * Inicia una rotación periódica (Guiño visual) para el logo corporativo.
     */
    @JvmStatic
    fun startLogoTiltAnimation(view: View?) {
        if (view == null) return

        val tilt = ObjectAnimator.ofFloat(view, "rotation", 0f, 15f, 0f, -15f, 0f)
        tilt.duration = 1500
        tilt.interpolator = AccelerateDecelerateInterpolator()

        val handler = Handler(Looper.getMainLooper())
        val runnable = object : Runnable {
            override fun run() {
                tilt.start()
                handler.postDelayed(this, 5000)
            }
        }
        handler.postDelayed(runnable, 2000)
    }

    /**
     * 🚌 Bus Departure Animation:
     * Simula el arranque de un vehículo mediante un retroceso inicial y una salida veloz lateral.
     */
    @JvmStatic
    fun playBusDepartureAnimation(view: View?) {
        if (view == null) return

        view.animate().cancel()
        view.translationX = 0f
        view.alpha = 1.0f

        view.animate()
            .translationX(-30f)
            .setDuration(400)
            .setInterpolator(AccelerateInterpolator())
            .withEndAction {
                view.animate()
                    .translationX(500f)
                    .alpha(0f)
                    .setDuration(800)
                    .setInterpolator(AccelerateInterpolator())
                    .withEndAction { view.visibility = View.INVISIBLE }
                    .start()
            }
            .start()
    }
}

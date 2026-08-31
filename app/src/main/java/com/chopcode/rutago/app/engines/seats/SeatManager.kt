package com.chopcode.rutago.app.engines.seats

import android.app.Activity
import android.content.Context
import android.util.Log
import android.view.View
import android.widget.Toast
import androidx.core.content.ContextCompat
import com.chopcode.rutago.app.R
import com.chopcode.rutago.app.managers.core.analytics.ReservationAnalyticsHelper
import com.chopcode.rutago.app.utils.ui.UIAnimationUtils
import com.google.android.material.button.MaterialButton

/**
 * 💺 Seat Manager (Seat Engine UI Handler)
 *
 * Controlador especializado en la lógica visual y de interacción del mapa de asientos.
 * Responsabilidades:
 * - Renderizar dinámicamente el estado de los asientos (Disponible, Seleccionado, Ocupado, Bloqueo Físico).
 * - Gestionar la exclusividad de selección: asegura que solo un asiento esté marcado a la vez.
 * - Integrar animaciones premium para mejorar el feedback visual al usuario.
 * - Coordinar con el motor de analíticas para rastrear el comportamiento del usuario en el Grid.
 * - Adaptar el mapa visual según la capacidad técnica del vehículo (Ocultamiento de botones sobrantes).
 */
class SeatManager(
    private val context: Context,
    private val analyticsHelper: ReservationAnalyticsHelper
) {
    private val mapaAsientos: MutableMap<Int, MaterialButton> = HashMap()
    var asientoSeleccionado: Int? = null
    var asientosOcupados: MutableSet<Int> = HashSet()
        private set

    private var isFirstLoad = true
    private var listener: SeatSelectionListener? = null

    // Recursos gráficos para los estados del asiento
    private val VECTOR_ASIENTO_DISPONIBLE = R.drawable.asiento_disponible
    private val VECTOR_ASIENTO_SELECCIONADO = R.drawable.asiento_seleccionado
    private val VECTOR_ASIENTO_OCUPADO = R.drawable.asiento_ocupado
    private val VECTOR_ASIENTO_FISICO = R.drawable.asiento_fisico

    interface SeatSelectionListener {
        fun onSeatSelected(seatNumber: Int)
        fun onSeatDeselected(seatNumber: Int)
        fun onExpandableSectionRequestedToCollapse()
    }

    fun setSeatSelectionListener(listener: SeatSelectionListener?) {
        this.listener = listener
    }

    /**
     * Inicializa los componentes visuales del Grid de asientos.
     */
    fun configurarAsientos() {
        val activity = context as? Activity ?: return
        for (i in BOTONES_ASIENTOS_IDS.indices) {
            val btnAsiento = activity.findViewById<MaterialButton>(BOTONES_ASIENTOS_IDS[i])
            val numeroAsiento = i + 1
            if (btnAsiento != null) {
                configurarBotonAsiento(btnAsiento, numeroAsiento)
            }
        }

        val params = mutableMapOf<String, Any>()
        params["total_asientos"] = BOTONES_ASIENTOS_IDS.size
        analyticsHelper.logEvent("asientos_configurados", params)

        Log.d("SeatManager", "✅ Asientos configurados automáticamente: ${BOTONES_ASIENTOS_IDS.size} asientos")
    }

    /**
     * Permite la configuración manual con un set de IDs personalizado.
     */
    fun configurarAsientos(botonesIds: IntArray) {
        val activity = context as? Activity ?: return
        for (i in botonesIds.indices) {
            val btnAsiento = activity.findViewById<MaterialButton>(botonesIds[i])
            val numeroAsiento = i + 1
            if (btnAsiento != null) {
                configurarBotonAsiento(btnAsiento, numeroAsiento)
            }
        }

        val params = mutableMapOf<String, Any>()
        params["total_asientos"] = botonesIds.size
        analyticsHelper.logEvent("asientos_configurados", params)

        Log.d("SeatManager", "✅ Asientos configurados con IDs personalizados: ${botonesIds.size} asientos")
    }

    private fun configurarBotonAsiento(btnAsiento: MaterialButton, numeroAsiento: Int) {
        btnAsiento.tag = numeroAsiento
        btnAsiento.visibility = View.VISIBLE
        btnAsiento.iconTint = null
        UIAnimationUtils.setClickAnimation(btnAsiento)
        mapaAsientos[numeroAsiento] = btnAsiento
    }

    /**
     * Actualiza el estado visual de cada botón basado en la data de ocupación remota.
     * @param ocupadosApp Asientos tomados desde la aplicación.
     * @param capacidadTotal Capacidad permitida para el vehículo actual.
     */
    fun actualizarEstadoAsientos(ocupadosApp: Set<Int>?, capacidadTotal: Int) {
        actualizarEstadoAsientos(ocupadosApp, null, capacidadTotal)
    }

    /**
     * Actualiza el estado visual integrando ocupación por App y bloqueos físicos de conductor.
     */
    fun actualizarEstadoAsientos(ocupadosApp: Set<Int>?, ocupadosFisicos: Set<Int>?, capacidadTotal: Int) {
        this.asientosOcupados = HashSet()
        if (ocupadosApp != null) this.asientosOcupados.addAll(ocupadosApp)
        if (ocupadosFisicos != null) this.asientosOcupados.addAll(ocupadosFisicos)

        var animationDelay = 0

        for ((numAsiento, btn) in mapaAsientos) {
            if (numAsiento > capacidadTotal) {
                btn.visibility = View.GONE
                continue
            }

            btn.visibility = View.VISIBLE

            var stateChanged = false
            if (ocupadosApp != null && ocupadosApp.contains(numAsiento)) {
                marcarAsientoOcupado(btn)
                stateChanged = true
            } else if (ocupadosFisicos != null && ocupadosFisicos.contains(numAsiento)) {
                marcarAsientoFisico(btn)
                stateChanged = true
            } else {
                configurarAsientoDisponible(btn, numAsiento)
            }

            if (stateChanged && isFirstLoad) {
                UIAnimationUtils.playSeatPopAnimation(btn, animationDelay)
                animationDelay += 50
            }
        }

        isFirstLoad = false
        analyticsHelper.logAsientosCargados(this.asientosOcupados.size, capacidadTotal, null)
    }

    private fun marcarAsientoFisico(btn: MaterialButton) {
        btn.icon = ContextCompat.getDrawable(context, VECTOR_ASIENTO_FISICO)
        btn.isEnabled = true
        val numAsiento = btn.tag as Int
        btn.setOnClickListener { manejarSeleccionAsiento(numAsiento) }
    }

    private fun marcarAsientoOcupado(btn: MaterialButton) {
        btn.icon = ContextCompat.getDrawable(context, VECTOR_ASIENTO_OCUPADO)
        btn.isEnabled = false
        btn.setOnClickListener(null)
    }

    private fun configurarAsientoDisponible(btn: MaterialButton, numAsiento: Int) {
        btn.icon = ContextCompat.getDrawable(context, VECTOR_ASIENTO_DISPONIBLE)
        btn.isEnabled = true
        btn.setOnClickListener { manejarSeleccionAsiento(numAsiento) }
    }

    private fun manejarSeleccionAsiento(numAsiento: Int) {
        val prev = asientoSeleccionado
        if (prev != null) {
            deseleccionarAsiento(prev)
        }
        seleccionarAsiento(numAsiento)
        Toast.makeText(context, "Asiento seleccionado: $asientoSeleccionado", Toast.LENGTH_SHORT).show()
        analyticsHelper.logAsientoSeleccionado(numAsiento)
        listener?.onExpandableSectionRequestedToCollapse()
    }

    private fun seleccionarAsiento(numAsiento: Int) {
        asientoSeleccionado = numAsiento
        val btn = mapaAsientos[numAsiento]
        if (btn != null) {
            btn.icon = ContextCompat.getDrawable(context, VECTOR_ASIENTO_SELECCIONADO)
            UIAnimationUtils.playSeatSelectionAnimation(btn)
        }
        listener?.onSeatSelected(numAsiento)
    }

    private fun deseleccionarAsiento(numAsiento: Int) {
        val btn = mapaAsientos[numAsiento]
        if (btn != null) {
            btn.icon = ContextCompat.getDrawable(context, VECTOR_ASIENTO_DISPONIBLE)
        }
        listener?.onSeatDeselected(numAsiento)
    }

    fun limpiarSeleccion() {
        val curr = asientoSeleccionado
        if (curr != null) {
            deseleccionarAsiento(curr)
            asientoSeleccionado = null
        }
    }

    fun getCapacidadTotal(): Int = mapaAsientos.size
    fun getCapacidadDisponible(): Int = getCapacidadTotal() - asientosOcupados.size
    fun getAsientosOcupadosCount(): Int = asientosOcupados.size
    fun isAsientoOcupado(numAsiento: Int): Boolean = asientosOcupados.contains(numAsiento)
    fun hasAsientoSeleccionado(): Boolean = asientoSeleccionado != null

    fun cleanup() {
        mapaAsientos.clear()
        asientosOcupados.clear()
        asientoSeleccionado = null
        listener = null
    }

    companion object {
        private val BOTONES_ASIENTOS_IDS = intArrayOf(
            R.id.btnAsiento1, R.id.btnAsiento2, R.id.btnAsiento3, R.id.btnAsiento4,
            R.id.btnAsiento5, R.id.btnAsiento6, R.id.btnAsiento7, R.id.btnAsiento8,
            R.id.btnAsiento9, R.id.btnAsiento10, R.id.btnAsiento11, R.id.btnAsiento12,
            R.id.btnAsiento13
        )

        @JvmStatic
        fun getBotonesAsientosIds(): IntArray = BOTONES_ASIENTOS_IDS.clone()

        @JvmStatic
        fun getNumeroTotalAsientos(): Int = BOTONES_ASIENTOS_IDS.size
    }
}

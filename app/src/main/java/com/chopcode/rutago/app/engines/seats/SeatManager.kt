package com.chopcode.rutago.app.engines.seats

import android.content.Context
import android.util.Log

/**
 * 💺 ENGINE: SeatManager (Kotlin)
 * Motor lógico para la gestión de estados y selección de asientos.
 */
class SeatManager @JvmOverloads constructor(
    private val context: Context? = null,
    private val capacity: Int = DEFAULT_CAPACITY
) {

    private val mapaAsientos = mutableMapOf<Int, SeatState>()
    private val asientosOcupados = mutableSetOf<Int>()
    private var asientoSeleccionado: Int? = null

    enum class SeatState {
        DISPONIBLE,
        OCUPADO,
        SELECCIONADO,
        BLOQUEADO
    }

    init {
        for (i in 1..capacity) {
            mapaAsientos[i] = SeatState.DISPONIBLE
        }
    }

    fun selectSeat(seatNumber: Int): Boolean {
        if (asientosOcupados.contains(seatNumber)) {
            Log.w("SeatManager", "⚠️ Intento de seleccionar asiento ocupado: $seatNumber")
            return false
        }

        if (asientoSeleccionado == seatNumber) {
            asientoSeleccionado = null
            mapaAsientos[seatNumber] = SeatState.DISPONIBLE
            return true
        }

        asientoSeleccionado?.let { prev ->
            mapaAsientos[prev] = SeatState.DISPONIBLE
        }

        asientoSeleccionado = seatNumber
        mapaAsientos[seatNumber] = SeatState.SELECCIONADO
        return true
    }

    fun updateOccupiedSeats(occupied: Set<Int>) {
        asientosOcupados.clear()
        asientosOcupados.addAll(occupied)

        for (i in 1..capacity) {
            if (asientosOcupados.contains(i)) {
                mapaAsientos[i] = SeatState.OCUPADO
            } else if (asientoSeleccionado == i) {
                mapaAsientos[i] = SeatState.SELECCIONADO
            } else {
                mapaAsientos[i] = SeatState.DISPONIBLE
            }
        }
    }

    fun getCapacidadTotal(): Int = capacity
    fun getCapacidadDisponible(): Int = (capacity - asientosOcupados.size).coerceAtLeast(0)
    fun getAsientosOcupadosCount(): Int = asientosOcupados.size
    fun isAsientoOcupado(numAsiento: Int): Boolean = asientosOcupados.contains(numAsiento)
    fun getSelectedSeat(): Int? = asientoSeleccionado

    fun cleanup() {
        mapaAsientos.clear()
        asientosOcupados.clear()
        asientoSeleccionado = null
    }

    companion object {
        const val DEFAULT_CAPACITY = 13
    }
}

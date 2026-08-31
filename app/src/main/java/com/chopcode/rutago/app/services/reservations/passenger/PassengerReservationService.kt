package com.chopcode.rutago.app.services.reservations.passenger

import android.util.Log
import com.chopcode.rutago.app.config.MyApp
import com.chopcode.rutago.app.data.models.Reservation
import com.google.firebase.database.DataSnapshot
import com.google.firebase.database.DatabaseError
import com.google.firebase.database.ValueEventListener

/**
 * Passenger Reservation Service
 *
 * Repositorio de consultas logísticas centradas en la experiencia del cliente.
 * Responsabilidades:
 * - Recuperar el historial de tiquetes digitales filtrado por el UID del pasajero.
 * - Implementar motores de cálculo para métricas de fidelización (Gasto total y puntos acumulados).
 * - Realizar análisis de comportamiento mediante la detección de la ruta más frecuentada.
 * - Sincronizar el estado del historial con la visualización de perfiles premium.
 */
class PassengerReservationService {

    interface HistoryCallback {
        fun onHistoryLoaded(reservations: List<Reservation>?)
        fun onError(error: String?)
    }

    interface PremiumStatsCallback {
        /** @param stats Mapa con claves: totalGastado, viajesConfirmados, rutaMasFrecuente, puntosLealtad. */
        fun onStatsCalculated(stats: Map<String, Any>?)
        fun onError(error: String?)
    }

    /**
     * Consulta el histórico de reservas personales.
     */
    fun getBasicHistory(userId: String, callback: HistoryCallback) {
        val ref = MyApp.getDatabaseReference("reservas")
        ref.orderByChild("userId").equalTo(userId)
            .addListenerForSingleValueEvent(object : ValueEventListener {
                override fun onDataChange(snapshot: DataSnapshot) {
                    val reservations = mutableListOf<Reservation>()
                    for (ds in snapshot.children) {
                        val r = ds.getValue(Reservation::class.java)
                        if (r != null) {
                            r.idReservation = ds.key ?: ""
                            reservations.add(r)
                        }
                    }
                    // Ordenamiento cronológico reverso
                    reservations.sortByDescending { it.reservationDate }
                    callback.onHistoryLoaded(reservations)
                }

                override fun onCancelled(error: DatabaseError) {
                    Log.e(TAG, "❌ Error al cargar historial básico: ${error.message}")
                    callback.onError(error.message)
                }
            })
    }

    /**
     * Procesa el historial del usuario para generar indicadores de valor agregado (Fase Premium).
     */
    fun getPremiumStats(userId: String, callback: PremiumStatsCallback) {
        getBasicHistory(userId, object : HistoryCallback {
            override fun onHistoryLoaded(reservations: List<Reservation>?) {
                var totalSpent = 0.0
                var confirmedCount = 0
                val routeFrequency = mutableMapOf<String, Int>()

                if (reservations != null) {
                    for (r in reservations) {
                        // Solo computamos métricas sobre viajes efectivamente realizados/confirmados
                        if ("Confirmada".equals(r.reservationStatus, ignoreCase = true)) {
                            totalSpent += r.price
                            confirmedCount++
                            val route = "${r.origin} - ${r.destination}"
                            routeFrequency[route] = (routeFrequency[route] ?: 0) + 1
                        }
                    }
                }

                val stats = mutableMapOf<String, Any>()
                stats["totalGastado"] = totalSpent
                stats["totalSpent"] = formatUtilsFormatted(totalSpent)
                stats["viajesConfirmados"] = confirmedCount
                stats["rutaMasFrecuente"] = getMostFrequentRoute(routeFrequency)
                stats["favoriteRoute"] = getMostFrequentRoute(routeFrequency)
                stats["puntosLealtad"] = confirmedCount * 10
                stats["loyaltyPoints"] = confirmedCount * 10
                callback.onStatsCalculated(stats)
            }

            override fun onError(error: String?) {
                callback.onError(error)
            }
        })
    }

    private fun formatUtilsFormatted(price: Double): String {
        return "$${price.toInt()}"
    }

    /**
     * Algoritmo de detección de frecuencia de uso por trayecto.
     */
    private fun getMostFrequentRoute(routes: Map<String, Int>): String {
        var principal = "N/A"
        var max = 0
        for ((key, value) in routes) {
            if (value > max) {
                max = value
                principal = key
            }
        }
        return principal
    }

    companion object {
        private const val TAG = "PassengerResService"
    }
}

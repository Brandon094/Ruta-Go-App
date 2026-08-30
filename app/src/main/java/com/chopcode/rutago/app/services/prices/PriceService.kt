package com.chopcode.rutago.app.services.prices

import com.chopcode.rutago.app.config.MyApp
import com.chopcode.rutago.app.utils.ui.FormatUtils
import com.google.firebase.database.*

/**
 * 🛰️ SERVICE: PriceService (Kotlin)
 * Gestor de tarifas dinámicas sincronizadas con Firebase.
 */
class PriceService {
    private val db: DatabaseReference = MyApp.getDatabaseReference("precios")

    companion object {
        const val DEFAULT_PRICE = 12000.0
    }

    interface PriceCallback {
        fun onPriceLoaded(price: Double)
        fun onError(error: String?)
    }

    interface AllPricesCallback {
        fun onPricesLoaded(allPrices: Map<String, Map<String, Double>>?)
        fun onError(error: String?)
    }

    /**
     * Recupera el precio para un trayecto específico.
     */
    fun getRoutePrice(origin: String, destination: String, callback: PriceCallback) {
        val nO = FormatUtils.normalizarTexto(origin)
        val nD = FormatUtils.normalizarTexto(destination)
        
        db.child(nO).child(nD).addListenerForSingleValueEvent(object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                val price = snapshot.getValue(Double::class.java) ?: DEFAULT_PRICE
                callback.onPriceLoaded(price)
            }
            override fun onCancelled(error: DatabaseError) {
                callback.onError(error.message)
            }
        })
    }

    /**
     * Carga todo el mapa de tarifas para optimizar procesos masivos.
     */
    fun getAllPrices(callback: AllPricesCallback) {
        db.addListenerForSingleValueEvent(object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                val pricesMap = mutableMapOf<String, MutableMap<String, Double>>()
                for (originSnap in snapshot.children) {
                    val origin = originSnap.key ?: continue
                    val destMap = mutableMapOf<String, Double>()
                    for (destSnap in originSnap.children) {
                        val dest = destSnap.key ?: continue
                        val price = destSnap.getValue(Double::class.java) ?: DEFAULT_PRICE
                        destMap[dest] = price
                    }
                    pricesMap[origin] = destMap
                }
                callback.onPricesLoaded(pricesMap)
            }
            override fun onCancelled(error: DatabaseError) {
                callback.onError(error.message)
            }
        })
    }
}

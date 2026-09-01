package com.chopcode.rutago.app.services.prices

import com.chopcode.rutago.app.config.MyApp
import com.chopcode.rutago.app.utils.ui.FormatUtils
import com.google.firebase.database.*

/**
 * 🛰️ SERVICE: PriceService (Kotlin)
 * Gestor de tarifas dinámicas sincronizadas con Firebase.
 */
class PriceService {
    private val db: DatabaseReference = MyApp.getDatabaseReference("prices")
    private val legacyDb: DatabaseReference = MyApp.getDatabaseReference("precios")

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
        val targetO = FormatUtils.normalizarTexto(origin)
        val targetD = FormatUtils.normalizarTexto(destination)

        val checkSnapshot = { snapshot: DataSnapshot ->
            var foundPrice: Double? = null
            for (originSnap in snapshot.children) {
                if (FormatUtils.normalizarTexto(originSnap.key ?: "") == targetO) {
                    for (destSnap in originSnap.children) {
                        if (FormatUtils.normalizarTexto(destSnap.key ?: "") == targetD) {
                            val raw = destSnap.value
                            foundPrice = when (raw) {
                                is Number -> raw.toDouble()
                                is String -> raw.toDoubleOrNull()
                                else -> null
                            }
                            if (foundPrice != null) break
                        }
                    }
                }
                if (foundPrice != null) break
            }
            foundPrice
        }

        db.addListenerForSingleValueEvent(object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                val p = checkSnapshot(snapshot)
                if (p != null) {
                    callback.onPriceLoaded(p)
                } else {
                    legacyDb.addListenerForSingleValueEvent(object : ValueEventListener {
                        override fun onDataChange(legSnap: DataSnapshot) {
                            val lp = checkSnapshot(legSnap) ?: DEFAULT_PRICE
                            callback.onPriceLoaded(lp)
                        }
                        override fun onCancelled(error: DatabaseError) {
                            callback.onPriceLoaded(DEFAULT_PRICE)
                        }
                    })
                }
            }
            override fun onCancelled(error: DatabaseError) {
                callback.onPriceLoaded(DEFAULT_PRICE)
            }
        })
    }

    /**
     * Carga todo el mapa de tarifas para optimizar procesos masivos.
     */
    fun getAllPrices(callback: AllPricesCallback) {
        val parsePrices = { snapshot: DataSnapshot ->
            val pricesMap = mutableMapOf<String, MutableMap<String, Double>>()
            for (originSnap in snapshot.children) {
                val origin = originSnap.key ?: continue
                val destMap = mutableMapOf<String, Double>()
                for (destSnap in originSnap.children) {
                    val dest = destSnap.key ?: continue
                    val raw = destSnap.value
                    val price = when (raw) {
                        is Number -> raw.toDouble()
                        is String -> raw.toDoubleOrNull() ?: DEFAULT_PRICE
                        else -> DEFAULT_PRICE
                    }
                    destMap[dest] = price
                }
                pricesMap[origin] = destMap
            }
            pricesMap
        }

        db.addListenerForSingleValueEvent(object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                if (snapshot.exists()) {
                    callback.onPricesLoaded(parsePrices(snapshot))
                } else {
                    legacyDb.addListenerForSingleValueEvent(object : ValueEventListener {
                        override fun onDataChange(legSnap: DataSnapshot) {
                            callback.onPricesLoaded(parsePrices(legSnap))
                        }
                        override fun onCancelled(error: DatabaseError) {
                            callback.onError(error.message)
                        }
                    })
                }
            }
            override fun onCancelled(error: DatabaseError) {
                callback.onError(error.message)
            }
        })
    }
}

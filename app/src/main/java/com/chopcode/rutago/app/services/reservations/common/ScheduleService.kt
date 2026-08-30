package com.chopcode.rutago.app.services.reservations.common

import android.util.Log
import com.chopcode.rutago.app.config.MyApp
import com.chopcode.rutago.app.models.Schedule
import com.chopcode.rutago.app.services.prices.PriceService
import com.chopcode.rutago.app.utils.ui.FormatUtils
import com.google.firebase.database.*

/**
 * 🛰️ SERVICE: ScheduleService (Kotlin)
 * Gestor del catálogo maestro de itinerarios y disponibilidad global.
 */
class ScheduleService {

    private val db: DatabaseReference = MyApp.getDatabaseReference("")
    private val priceService = PriceService()

    interface ScheduleCallback {
        fun onSchedulesLoaded(natagaList: List<Schedule>?, laPlataList: List<Schedule>?)
        fun onError(error: String?)
    }

    interface GlobalSeatsCallback {
        fun onSeatsUpdated(availabilities: Map<String, Int>?, totals: Map<String, Int>?)
    }

    /**
     * Establece una suscripción permanente al nodo de disponibilidad técnica.
     */
    fun listenGlobalAvailability(callback: (Map<String, Int>, Map<String, Int>) -> Unit): ValueEventListener {
        val dispRef = db.child("disponibilidadAsientos")
        val listener = object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                val availMap = mutableMapOf<String, Int>()
                val totalMap = mutableMapOf<String, Int>()
                for (hSnap in snapshot.children) {
                    val hId = hSnap.key ?: continue
                    val available = hSnap.child("asientosDisponibles").getValue(Int::class.java)
                    val total = hSnap.child("totalAsientos").getValue(Int::class.java)
                    if (available != null) availMap[hId] = available
                    if (total != null) totalMap[hId] = total
                }
                callback(availMap, totalMap)
            }
            override fun onCancelled(error: DatabaseError) {
                Log.e("ScheduleService", "❌ Suscripción global cancelada: ${error.message}")
            }
        }
        dispRef.addValueEventListener(listener)
        return listener
    }

    /**
     * Carga la planilla de horarios integrando validación de conductores y precios.
     */
    fun loadSchedules(callback: ScheduleCallback) {
        priceService.getAllPrices(object : PriceService.AllPricesCallback {
            override fun onPricesLoaded(allPrices: Map<String, Map<String, Double>>?) {
                
                // 1. Escuchar conductores
                db.child("conductores").addValueEventListener(object : ValueEventListener {
                    override fun onDataChange(driversSnapshot: DataSnapshot) {
                        val driverNames = mutableMapOf<String, String>()
                        for (d in driversSnapshot.children) {
                            val name = d.child("nombre").getValue(String::class.java)
                            driverNames[d.key ?: ""] = name ?: "Conductor"
                        }

                        // 2. Cargar Planilla
                        db.child("horarios").addValueEventListener(object : ValueEventListener {
                            override fun onDataChange(snapshot: DataSnapshot) {
                                val natagaList = mutableListOf<Schedule>()
                                val laPlataList = mutableListOf<Schedule>()

                                for (hSnap in snapshot.children) {
                                    val id = hSnap.key ?: ""
                                    val time = hSnap.child("hora").getValue(String::class.java) ?: "--:--"
                                    val routeStr = hSnap.child("ruta").getValue(String::class.java) ?: "Ruta N/A"
                                    val condId = hSnap.child("conductorId").getValue(String::class.java)

                                    val s = Schedule().apply {
                                        this.id = id
                                        this.time = time
                                        this.route = routeStr
                                        if (!condId.isNullOrEmpty()) {
                                            this.conductorId = condId
                                            this.driverName = driverNames[condId] ?: "Cargando..."
                                        }
                                    }

                                    processPriceAndAddToList(s, routeStr, allPrices ?: emptyMap(), natagaList, laPlataList)
                                }
                                callback.onSchedulesLoaded(natagaList, laPlataList)
                            }
                            override fun onCancelled(error: DatabaseError) {
                                callback.onError(error.message)
                            }
                        })
                    }
                    override fun onCancelled(error: DatabaseError) {
                        callback.onError(error.message)
                    }
                })
            }
            override fun onError(error: String?) {
                callback.onError(error)
            }
        })
    }

    private fun processPriceAndAddToList(
        s: Schedule, 
        routeStr: String, 
        allPrices: Map<String, Map<String, Double>>, 
        nL: MutableList<Schedule>, 
        pL: MutableList<Schedule>
    ) {
        val separator = if (routeStr.contains("->")) "->" else "→"
        val parts = routeStr.split(separator)
        
        if (parts.size == 2) {
            val origin = parts[0].trim()
            val destination = parts[1].trim()
            
            val nO = FormatUtils.normalizarTexto(origin)
            val nD = FormatUtils.normalizarTexto(destination)
            
            val price = allPrices[nO]?.get(nD) ?: 12000.0
            s.price = price.toString()

            if (nO.contains("nataga")) nL.add(s) else pL.add(s)
        } else {
            s.price = "12000"
            nL.add(s)
        }
    }
}

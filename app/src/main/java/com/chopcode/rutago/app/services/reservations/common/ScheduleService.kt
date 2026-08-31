package com.chopcode.rutago.app.services.reservations.common

import android.util.Log
import com.chopcode.rutago.app.config.MyApp
import com.chopcode.rutago.app.data.models.Schedule
import com.chopcode.rutago.app.services.prices.PriceService
import com.chopcode.rutago.app.utils.ui.FormatUtils
import com.google.firebase.database.*

/**
 * 🛰️ SERVICE: ScheduleService (Kotlin)
 * Gestor del catálogo maestro de itinerarios y disponibilidad global NoSQL v2.0.
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
     * Establece una suscripción permanente al nodo de disponibilidad técnica (/seatAvailability y /disponibilidadAsientos).
     */
    fun listenGlobalAvailability(callback: (Map<String, Int>, Map<String, Int>) -> Unit): ValueEventListener {
        val dispRef = db.child("seatAvailability")
        val listener = object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                if (snapshot.exists()) {
                    processSeatsSnapshot(snapshot, callback)
                } else {
                    db.child("disponibilidadAsientos").addListenerForSingleValueEvent(object : ValueEventListener {
                        override fun onDataChange(legSnap: DataSnapshot) {
                            processSeatsSnapshot(legSnap, callback)
                        }
                        override fun onCancelled(error: DatabaseError) {}
                    })
                }
            }
            override fun onCancelled(error: DatabaseError) {
                Log.e("ScheduleService", "❌ Suscripción global cancelada: ${error.message}")
            }
        }
        dispRef.addValueEventListener(listener)
        return listener
    }

    private fun processSeatsSnapshot(snapshot: DataSnapshot, callback: (Map<String, Int>, Map<String, Int>) -> Unit) {
        val availMap = mutableMapOf<String, Int>()
        val totalMap = mutableMapOf<String, Int>()
        for (hSnap in snapshot.children) {
            val hId = hSnap.key ?: continue
            val available = hSnap.child("availableSeats").getValue(Int::class.java)
                ?: hSnap.child("asientosDisponibles").getValue(Int::class.java)
            val total = hSnap.child("totalSeats").getValue(Int::class.java)
                ?: hSnap.child("totalAsientos").getValue(Int::class.java)
            if (available != null) availMap[hId] = available
            if (total != null) totalMap[hId] = total
        }
        callback(availMap, totalMap)
    }

    /**
     * Carga la planilla de horarios integrando validación de conductores y precios.
     */
    fun loadSchedules(callback: ScheduleCallback) {
        priceService.getAllPrices(object : PriceService.AllPricesCallback {
            override fun onPricesLoaded(allPrices: Map<String, Map<String, Double>>?) {
                
                // 1. Escuchar conductores desde /users/ (role === "driver") con fallback a /conductores/
                db.child("users").addValueEventListener(object : ValueEventListener {
                    override fun onDataChange(usersSnapshot: DataSnapshot) {
                        val driverNames = mutableMapOf<String, String>()
                        
                        for (u in usersSnapshot.children) {
                            val role = (u.child("role").getValue(String::class.java) 
                                ?: u.child("rol").getValue(String::class.java) ?: "").toLowerCase()
                            if (role == "driver" || role == "conductor") {
                                val name = u.child("name").getValue(String::class.java)
                                    ?: u.child("nombre").getValue(String::class.java) ?: "Conductor"
                                driverNames[u.key ?: ""] = name
                            }
                        }

                        // Cargar fallback de /conductores/
                        db.child("conductores").addListenerForSingleValueEvent(object : ValueEventListener {
                            override fun onDataChange(conductoresSnapshot: DataSnapshot) {
                                for (d in conductoresSnapshot.children) {
                                    if (!driverNames.containsKey(d.key)) {
                                        val name = d.child("nombre").getValue(String::class.java)
                                            ?: d.child("name").getValue(String::class.java) ?: "Conductor"
                                        driverNames[d.key ?: ""] = name
                                    }
                                }

                                // 2. Cargar Planilla (/schedules y /horarios)
                                loadSchedulesPlanilla(driverNames, allPrices ?: emptyMap(), callback)
                            }
                            override fun onCancelled(error: DatabaseError) {
                                loadSchedulesPlanilla(driverNames, allPrices ?: emptyMap(), callback)
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

    private fun loadSchedulesPlanilla(
        driverNames: Map<String, String>,
        allPrices: Map<String, Map<String, Double>>,
        callback: ScheduleCallback
    ) {
        db.child("schedules").addValueEventListener(object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                if (snapshot.exists()) {
                    processSchedulesSnapshot(snapshot, driverNames, allPrices, callback)
                } else {
                    db.child("horarios").addValueEventListener(object : ValueEventListener {
                        override fun onDataChange(legSnap: DataSnapshot) {
                            processSchedulesSnapshot(legSnap, driverNames, allPrices, callback)
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

    private fun processSchedulesSnapshot(
        snapshot: DataSnapshot,
        driverNames: Map<String, String>,
        allPrices: Map<String, Map<String, Double>>,
        callback: ScheduleCallback
    ) {
        val natagaList = mutableListOf<Schedule>()
        val laPlataList = mutableListOf<Schedule>()

        for (hSnap in snapshot.children) {
            val id = hSnap.key ?: ""
            val time = hSnap.child("time").getValue(String::class.java)
                ?: hSnap.child("hora").getValue(String::class.java) ?: "--:--"
            val routeStr = hSnap.child("route").getValue(String::class.java)
                ?: hSnap.child("ruta").getValue(String::class.java) ?: "Ruta N/A"
            val condId = hSnap.child("driverId").getValue(String::class.java)
                ?: hSnap.child("conductorId").getValue(String::class.java)

            val s = Schedule().apply {
                this.id = id
                this.time = time
                this.route = routeStr
                if (!condId.isNullOrEmpty()) {
                    this.driverId = condId
                    this.driverName = driverNames[condId] ?: "Asignando..."
                }
            }

            processPriceAndAddToList(s, routeStr, allPrices, natagaList, laPlataList)
        }
        callback.onSchedulesLoaded(natagaList, laPlataList)
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

package com.chopcode.rutago.app.services.audit

import android.util.Log
import com.chopcode.rutago.app.config.MyApp
import com.google.firebase.database.DataSnapshot
import com.google.firebase.database.DatabaseError
import com.google.firebase.database.ValueEventListener

/**
 * Archive Service
 *
 * Especialista en el mantenimiento preventivo y optimización de la base de datos NoSQL.
 * Responsabilidades:
 * - Identificar registros de reserva que han superado el periodo de vigencia operativa (30 días).
 * - Ejecutar la migración atómica de datos desde el nodo activo (/reservas/) hacia el 
 *   histórico frío (/reservas_archivadas/).
 * - Garantizar la ligereza del árbol de datos principal para reducir latencia y costos de lectura.
 */
class ArchiveService {

    /** Interfaz para notificar el resultado del proceso de mantenimiento. */
    interface ArchiveCallback {
        /** @param movedCount Cantidad de registros migrados exitosamente. */
        fun onArchiveComplete(movedCount: Int)
        fun onError(error: String)
    }

    /**
     * Ejecuta una transacción multi-nodo para archivar datos obsoletos.
     * Utiliza un filtrado por rango de tiempo para seleccionar únicamente los registros calificados.
     * @param callback Retorno con el conteo de registros procesados.
     */
    fun runReservationSweep(callback: ArchiveCallback) {
        val cutoffDate = System.currentTimeMillis() - THIRTY_DAYS_MS
        val rootRef = MyApp.getDatabaseReference("")
        val resRef = rootRef.child("reservas")

        Log.d(TAG, "🚀 Iniciando barrido de reservas anteriores a: $cutoffDate")

        // Consulta indexada por fecha de reserva
        resRef.orderByChild("reservationDate").endAt(cutoffDate.toDouble())
            .addListenerForSingleValueEvent(object : ValueEventListener {
                override fun onDataChange(snapshot: DataSnapshot) {
                    if (!snapshot.exists()) {
                        Log.d(TAG, "✨ Base de datos optimizada: Sin registros pendientes de archivado.")
                        callback.onArchiveComplete(0)
                        return
                    }

                    val updates = mutableMapOf<String, Any?>()
                    var currentCount = 0

                    for (ds in snapshot.children) {
                        val id = ds.key
                        val data = ds.value
                        if (id != null && data != null) {
                            // Preparación de la escritura atómica dual
                            updates["reservas_archivadas/$id"] = data
                            updates["reservas/$id"] = null
                            currentCount++
                        }
                    }

                    val finalCount = currentCount
                    if (finalCount > 0) {
                        // Ejecución en un solo paso para garantizar consistencia
                        rootRef.updateChildren(updates)
                            .addOnSuccessListener {
                                Log.d(TAG, "✅ Archivadas con éxito $finalCount reservas.")
                                callback.onArchiveComplete(finalCount)
                            }
                            .addOnFailureListener { e -> callback.onError(e.message ?: "Error al archivar") }
                    } else {
                        callback.onArchiveComplete(0)
                    }
                }

                override fun onCancelled(error: DatabaseError) {
                    Log.e(TAG, "❌ Fallo en el barrido de datos: ${error.message}")
                    callback.onError(error.message)
                }
            })
    }

    companion object {
        private const val TAG = "ArchiveService"

        /** Periodo de gracia para considerar una reserva como histórica (30 días). */
        private const val THIRTY_DAYS_MS = 30L * 24 * 60 * 60 * 1000
    }
}

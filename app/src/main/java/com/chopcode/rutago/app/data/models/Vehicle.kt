package com.chopcode.rutago.app.data.models

import com.google.firebase.database.IgnoreExtraProperties
import com.google.firebase.database.PropertyName

/**
 * 📦 MODEL: Vehicle
 * Representa la ficha técnica de un bus o camioneta.
 * Normalizado a Inglés con compatibilidad pasiva para lectura de datos legados.
 */
@IgnoreExtraProperties
data class Vehicle(
    @get:PropertyName("id") @set:PropertyName("id")
    var id: String = "",

    @get:PropertyName("plate") @set:PropertyName("plate")
    var plate: String = "",

    @get:PropertyName("model") @set:PropertyName("model")
    var model: String = "",

    @get:PropertyName("brand") @set:PropertyName("brand")
    var brand: String = "",

    @get:PropertyName("color") @set:PropertyName("color")
    var color: String = "",

    @get:PropertyName("year") @set:PropertyName("year")
    var year: String = "",

    @get:PropertyName("capacity") @set:PropertyName("capacity")
    var capacity: Int = 13,

    @get:PropertyName("driverId") @set:PropertyName("driverId")
    var driverId: String = "",

    @get:PropertyName("ownerId") @set:PropertyName("ownerId")
    var ownerId: String = "",

    @get:PropertyName("status") @set:PropertyName("status")
    var status: String = "active"
) {
    // =========================================================================
    // 🌍 DESERIALIZACIÓN LEGADO (Solo Setters)
    // =========================================================================

    @PropertyName("placa")
    fun setPlacaLegacy(value: String?) { if (!value.isNullOrEmpty()) plate = value }

    @PropertyName("modelo")
    fun setModeloLegacy(value: String?) { if (!value.isNullOrEmpty()) model = value }

    @PropertyName("marca")
    fun setMarcaLegacy(value: String?) { if (!value.isNullOrEmpty()) brand = value }

    @PropertyName("ano")
    fun setAnoLegacy(value: String?) { if (!value.isNullOrEmpty()) year = value }

    @PropertyName("año")
    fun setAnioLegacy(value: String?) { if (!value.isNullOrEmpty()) year = value }

    @PropertyName("capacidad")
    fun setCapacidadLegacy(value: Int) { if (value > 0) capacity = value }

    @PropertyName("conductorId")
    fun setConductorIdLegacy(value: String?) { if (!value.isNullOrEmpty()) driverId = value }

    @PropertyName("estado")
    fun setEstadoLegacy(value: String?) { if (!value.isNullOrEmpty()) status = value }
}

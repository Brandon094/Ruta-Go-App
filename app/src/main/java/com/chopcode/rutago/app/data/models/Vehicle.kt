package com.chopcode.rutago.app.data.models

import com.google.firebase.database.IgnoreExtraProperties
import com.google.firebase.database.PropertyName

/**
 * 📦 MODEL: Vehicle
 * Representa la ficha técnica de un bus o camioneta.
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

    @get:PropertyName("status") @set:PropertyName("status")
    var status: String = "active"
) {
    // =========================================================================
    // 🌍 JAVA & FIREBASE LEGACY BRIDGE
    // =========================================================================

    @PropertyName("placa")
    fun getPlacaLegacy(): String = plate
    @PropertyName("placa")
    fun setPlacaLegacy(value: String) { plate = value }

    @PropertyName("modelo")
    fun getModeloLegacy(): String = model
    @PropertyName("modelo")
    fun setModeloLegacy(value: String) { model = value }

    @PropertyName("marca")
    fun getMarcaLegacy(): String = brand
    @PropertyName("marca")
    fun setMarcaLegacy(value: String) { brand = value }

    @PropertyName("ano")
    fun getAnoLegacy(): String = year
    @PropertyName("ano")
    fun setAnoLegacy(value: String) { year = value }

    @PropertyName("capacidad")
    fun getCapacidadLegacy(): Int = capacity
    @PropertyName("capacidad")
    fun setCapacidadLegacy(value: Int) { capacity = value }

    @PropertyName("conductorId")
    fun getConductorIdLegacy(): String = driverId
    @PropertyName("conductorId")
    fun setConductorIdLegacy(value: String) { driverId = value }

    @PropertyName("estado")
    fun getEstadoLegacy(): String = status
    @PropertyName("estado")
    fun setEstadoLegacy(value: String) { status = value }
}

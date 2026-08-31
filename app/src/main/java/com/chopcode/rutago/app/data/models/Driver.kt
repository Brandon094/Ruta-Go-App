package com.chopcode.rutago.app.data.models

import com.google.firebase.database.IgnoreExtraProperties
import com.google.firebase.database.PropertyName

/**
 * 📦 MODEL: Driver
 * Especialización de la clase User para conductores.
 */
@IgnoreExtraProperties
class Driver : User() {
    @get:PropertyName("vehicleId") @set:PropertyName("vehicleId")
    var vehicleId: String? = null

    @get:PropertyName("vehiclePlate") @set:PropertyName("vehiclePlate")
    var vehiclePlate: String? = null

    @get:PropertyName("vehicleModel") @set:PropertyName("vehicleModel")
    var vehicleModel: String? = null

    @get:PropertyName("vehicleCapacity") @set:PropertyName("vehicleCapacity")
    var vehicleCapacity: Int = 13

    @get:PropertyName("assignedSchedules") @set:PropertyName("assignedSchedules")
    var assignedSchedules: List<String>? = null

    // =========================================================================
    // 🌍 JAVA & FIREBASE LEGACY BRIDGE
    // =========================================================================

    @PropertyName("vehiculoId")
    fun getVehiculoIdLegacy(): String? = vehicleId
    @PropertyName("vehiculoId")
    fun setVehiculoIdLegacy(value: String?) { vehicleId = value }

    @PropertyName("placaVehiculo")
    fun getPlacaVehiculoLegacy(): String? = vehiclePlate
    @PropertyName("placaVehiculo")
    fun setPlacaVehiculoLegacy(value: String?) { vehiclePlate = value }

    @PropertyName("modeloVehiculo")
    fun getModeloVehiculoLegacy(): String? = vehicleModel
    @PropertyName("modeloVehiculo")
    fun setModeloVehiculoLegacy(value: String?) { vehicleModel = value }

    @PropertyName("capacidadVehiculo")
    fun getCapacidadVehiculoLegacy(): Int = vehicleCapacity
    @PropertyName("capacidadVehiculo")
    fun setCapacidadVehiculoLegacy(value: Int) { vehicleCapacity = value }

    @PropertyName("horariosAsignados")
    fun getHorariosAsignadosLegacy(): List<String>? = assignedSchedules
    @PropertyName("horariosAsignados")
    fun setHorariosAsignadosLegacy(value: List<String>?) { assignedSchedules = value }
}

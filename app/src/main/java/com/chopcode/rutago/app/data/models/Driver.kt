package com.chopcode.rutago.app.data.models

import com.google.firebase.database.IgnoreExtraProperties
import com.google.firebase.database.PropertyName

/**
 * 📦 MODEL: Driver
 * Especialización de la clase User para conductores.
 * Normalizada a Inglés con compatibilidad pasiva para lectura de datos legados.
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

    @get:PropertyName("rankingPosition") @set:PropertyName("rankingPosition")
    var rankingPosition: Int = 0

    // =========================================================================
    // 🌍 DESERIALIZACIÓN LEGADO (Solo Setters)
    // =========================================================================

    @PropertyName("vehiculoId")
    fun setVehiculoIdLegacy(value: String?) { if (!value.isNullOrEmpty()) vehicleId = value }

    @PropertyName("placaVehiculo")
    fun setPlacaVehiculoLegacy(value: String?) { if (!value.isNullOrEmpty()) vehiclePlate = value }

    @PropertyName("modeloVehiculo")
    fun setModeloVehiculoLegacy(value: String?) { if (!value.isNullOrEmpty()) vehicleModel = value }

    @PropertyName("capacidadVehiculo")
    fun setCapacidadVehiculoLegacy(value: Int) { if (value > 0) vehicleCapacity = value }

    @PropertyName("horariosAsignados")
    fun setHorariosAsignadosLegacy(value: List<String>?) { if (value != null) assignedSchedules = value }

    @PropertyName("posicionEscalafon")
    fun setPosicionEscalafonLegacy(value: Int) { rankingPosition = value }
}

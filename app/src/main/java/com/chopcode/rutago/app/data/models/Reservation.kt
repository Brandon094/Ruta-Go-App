package com.chopcode.rutago.app.data.models

import com.google.firebase.database.Exclude
import com.google.firebase.database.IgnoreExtraProperties
import com.google.firebase.database.PropertyName

/**
 * 📦 MODEL: Reservation
 * Entidad normalizada a Inglés con compatibilidad pasiva para lectura de datos legados.
 */
@IgnoreExtraProperties
class Reservation {
    @get:PropertyName("id") @set:PropertyName("id")
    var id: String = ""

    @get:PropertyName("userId") @set:PropertyName("userId")
    var userId: String = ""

    @get:PropertyName("driverId") @set:PropertyName("driverId")
    var driverId: String = ""

    @get:PropertyName("scheduleId") @set:PropertyName("scheduleId")
    var scheduleId: String = ""

    @get:PropertyName("origin") @set:PropertyName("origin")
    var origin: String = ""

    @get:PropertyName("destination") @set:PropertyName("destination")
    var destination: String = ""

    @get:PropertyName("departureTime") @set:PropertyName("departureTime")
    var departureTime: String = ""

    @get:PropertyName("estimatedDuration") @set:PropertyName("estimatedDuration")
    var estimatedDuration: String = ""

    @get:PropertyName("status") @set:PropertyName("status")
    var status: String = "pending"

    @get:PropertyName("reservedSeat") @set:PropertyName("reservedSeat")
    var reservedSeat: Int = -1

    @get:PropertyName("price") @set:PropertyName("price")
    var price: Double = 0.0

    @get:PropertyName("reservationDate") @set:PropertyName("reservationDate")
    var reservationDate: Long = 0

    @get:PropertyName("isRated") @set:PropertyName("isRated")
    var isRated: Boolean = false

    @get:PropertyName("rating") @set:PropertyName("rating")
    var rating: Float = 0.0f

    @get:PropertyName("passengerName") @set:PropertyName("passengerName")
    var passengerName: String = ""

    @get:PropertyName("passengerPhone") @set:PropertyName("passengerPhone")
    var passengerPhone: String = ""

    @get:PropertyName("vehiclePlate") @set:PropertyName("vehiclePlate")
    var vehiclePlate: String = ""

    @get:PropertyName("vehicleModel") @set:PropertyName("vehicleModel")
    var vehicleModel: String = ""

    @get:PropertyName("driverName") @set:PropertyName("driverName")
    var driverName: String = ""

    @get:PropertyName("paymentMethod") @set:PropertyName("paymentMethod")
    var paymentMethod: String = "efectivo"

    constructor()

    constructor(
        id: String,
        userId: String,
        driverId: String,
        scheduleId: String,
        origin: String,
        destination: String,
        departureTime: String,
        estimatedDuration: String,
        status: String,
        reservedSeat: Int,
        price: Double,
        reservationDate: Long,
        isRated: Boolean,
        rating: Float,
        passengerName: String,
        passengerPhone: String,
        vehiclePlate: String,
        vehicleModel: String,
        driverName: String
    ) {
        this.id = id
        this.userId = userId
        this.driverId = driverId
        this.scheduleId = scheduleId
        this.origin = origin
        this.destination = destination
        this.departureTime = departureTime
        this.estimatedDuration = estimatedDuration
        this.status = status
        this.reservedSeat = reservedSeat
        this.price = price
        this.reservationDate = reservationDate
        this.isRated = isRated
        this.rating = rating
        this.passengerName = passengerName
        this.passengerPhone = passengerPhone
        this.vehiclePlate = vehiclePlate
        this.vehicleModel = vehicleModel
        this.driverName = driverName
    }

    // =========================================================================
    // 🌍 DESERIALIZACIÓN LEGADO (Solo Setters, sin Exponer Getters para Serialización)
    // =========================================================================

    @PropertyName("idReservation")
    fun setIdReservationLegacy(v: String?) { if (!v.isNullOrEmpty()) id = v }

    @PropertyName("idReserva")
    fun setIdReservaLegacy(v: String?) { if (!v.isNullOrEmpty()) id = v }

    @PropertyName("usuarioId")
    fun setUsuarioIdLegacy(v: String?) { if (!v.isNullOrEmpty()) userId = v }

    @PropertyName("conductorId")
    fun setConductorIdLegacy(v: String?) { if (!v.isNullOrEmpty()) driverId = v }

    @PropertyName("horarioId")
    fun setHorarioIdLegacy(v: String?) { if (!v.isNullOrEmpty()) scheduleId = v }

    @PropertyName("nombre")
    fun setNombreLegacy(v: String?) { if (!v.isNullOrEmpty()) passengerName = v }

    @PropertyName("name")
    fun setNameLegacy(v: String?) { if (!v.isNullOrEmpty()) passengerName = v }

    @PropertyName("telefono")
    fun setTelefonoLegacy(v: String?) { if (!v.isNullOrEmpty()) passengerPhone = v }

    @PropertyName("phone")
    fun setPhoneLegacy(v: String?) { if (!v.isNullOrEmpty()) passengerPhone = v }

    @PropertyName("conductor")
    fun setConductorLegacy(v: String?) { if (!v.isNullOrEmpty()) driverName = v }

    @PropertyName("driver")
    fun setDriverLegacy(v: String?) { if (!v.isNullOrEmpty()) driverName = v }

    @PropertyName("estadoReserva")
    fun setEstadoReservaLegacy(v: String?) { if (!v.isNullOrEmpty()) status = v }

    @PropertyName("reservationStatus")
    fun setReservationStatusLegacy(v: String?) { if (!v.isNullOrEmpty()) status = v }

    @PropertyName("puestoReservado")
    fun setPuestoReservadoLegacy(v: Int) { if (v > 0) reservedSeat = v }

    @PropertyName("precio")
    fun setPrecioLegacy(v: Double) { if (v > 0) price = v }

    @PropertyName("fechaReserva")
    fun setFechaReservaLegacy(v: Long) { if (v > 0) reservationDate = v }

    @PropertyName("calificada")
    fun setCalificadaLegacy(v: Boolean) { isRated = v }

    @PropertyName("rated")
    fun setRatedLegacy(v: Boolean) { isRated = v }

    @PropertyName("calificacion")
    fun setCalificacionLegacy(v: Float) { rating = v }

    @PropertyName("modeloVehiculo")
    fun setModeloVehiculoLegacy(v: String?) { if (!v.isNullOrEmpty()) vehicleModel = v }

    @PropertyName("modelo")
    fun setModeloLegacy(v: String?) { if (!v.isNullOrEmpty()) vehicleModel = v }

    @PropertyName("vehiculoId")
    fun setVehiculoIdLegacy(v: String?) { if (!v.isNullOrEmpty()) vehiclePlate = v }

    @PropertyName("placa")
    fun setPlacaLegacy(v: String?) { if (!v.isNullOrEmpty()) vehiclePlate = v }

    @PropertyName("plate")
    fun setPlateLegacy(v: String?) { if (!v.isNullOrEmpty()) vehiclePlate = v }

    @PropertyName("tiempoEstimado")
    fun setTiempoEstimadoLegacy(v: String?) { if (!v.isNullOrEmpty()) estimatedDuration = v }

    @PropertyName("origen")
    fun setOrigenLegacy(v: String?) { if (!v.isNullOrEmpty()) origin = v }

    @PropertyName("destino")
    fun setDestinoLegacy(v: String?) { if (!v.isNullOrEmpty()) destination = v }

    @PropertyName("metodoPago")
    fun setMetodoPagoLegacy(v: String?) { if (!v.isNullOrEmpty()) paymentMethod = v }

    // =========================================================================
    // 🌉 PROPIEDADES PUENTE PARA CÓDIGO INTERNO (Excluidas de la serialización)
    // =========================================================================

    @get:Exclude @set:Exclude
    var idReservation: String
        get() = id
        set(v) { id = v }

    @get:Exclude @set:Exclude
    var idReserva: String
        get() = id
        set(v) { id = v }

    @get:Exclude @set:Exclude
    var usuarioId: String
        get() = userId
        set(v) { userId = v }

    @get:Exclude @set:Exclude
    var conductorId: String
        get() = driverId
        set(v) { driverId = v }

    @get:Exclude @set:Exclude
    var horarioId: String
        get() = scheduleId
        set(v) { scheduleId = v }

    @get:Exclude @set:Exclude
    var nombre: String
        get() = passengerName
        set(v) { passengerName = v }

    @get:Exclude @set:Exclude
    var name: String
        get() = passengerName
        set(v) { passengerName = v }

    @get:Exclude @set:Exclude
    var telefono: String
        get() = passengerPhone
        set(v) { passengerPhone = v }

    @get:Exclude @set:Exclude
    var phone: String
        get() = passengerPhone
        set(v) { passengerPhone = v }

    @get:Exclude @set:Exclude
    var conductor: String
        get() = driverName
        set(v) { driverName = v }

    @get:Exclude @set:Exclude
    var driver: String
        get() = driverName
        set(v) { driverName = v }

    @get:Exclude @set:Exclude
    var estadoReserva: String
        get() = status
        set(v) { status = v }

    @get:Exclude @set:Exclude
    var reservationStatus: String
        get() = status
        set(v) { status = v }

    @get:Exclude @set:Exclude
    var puestoReservado: Int
        get() = reservedSeat
        set(v) { reservedSeat = v }

    @get:Exclude @set:Exclude
    var precio: Double
        get() = price
        set(v) { price = v }

    @get:Exclude @set:Exclude
    var fechaReserva: Long
        get() = reservationDate
        set(v) { reservationDate = v }

    @get:Exclude @set:Exclude
    var calificacion: Float
        get() = rating
        set(v) { rating = v }

    @get:Exclude @set:Exclude
    var modeloVehiculo: String
        get() = vehicleModel
        set(v) { vehicleModel = v }

    @get:Exclude @set:Exclude
    var modelo: String
        get() = vehicleModel
        set(v) { vehicleModel = v }

    @get:Exclude @set:Exclude
    var vehiculoId: String
        get() = vehiclePlate
        set(v) { vehiclePlate = v }

    @get:Exclude @set:Exclude
    var placa: String
        get() = vehiclePlate
        set(v) { vehiclePlate = v }

    @get:Exclude @set:Exclude
    var plate: String
        get() = vehiclePlate
        set(v) { vehiclePlate = v }

    @get:Exclude @set:Exclude
    var estimatedTime: String
        get() = estimatedDuration
        set(v) { estimatedDuration = v }

    @get:Exclude @set:Exclude
    var tiempoEstimado: String
        get() = estimatedDuration
        set(v) { estimatedDuration = v }

    @get:Exclude @set:Exclude
    var origen: String
        get() = origin
        set(v) { origin = v }

    @get:Exclude @set:Exclude
    var destino: String
        get() = destination
        set(v) { destination = v }
}

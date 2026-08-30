package com.chopcode.rutago.app.models

import com.google.firebase.database.IgnoreExtraProperties
import com.google.firebase.database.PropertyName

/**
 * 📦 MODEL: Reservation
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

    constructor()

    constructor(id: String, userId: String, driverId: String, scheduleId: String, origin: String, destination: String, departureTime: String, estimatedDuration: String, status: String, reservedSeat: Int, price: Double, reservationDate: Long, isRated: Boolean, rating: Float, passengerName: String, passengerPhone: String, vehiclePlate: String, vehicleModel: String, driverName: String) {
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
    // 🌍 FIREBASE & JAVA BRIDGE (Legacy Property Support)
    // =========================================================================

    @get:PropertyName("idReservation") @set:PropertyName("idReservation")
    var idReservation: String
        get() = id
        set(v) { id = v }

    @get:PropertyName("idReserva") @set:PropertyName("idReserva")
    var idReserva: String
        get() = id
        set(v) { id = v }

    @get:PropertyName("usuarioId") @set:PropertyName("usuarioId")
    var usuarioId: String
        get() = userId
        set(v) { userId = v }

    @get:PropertyName("conductorId") @set:PropertyName("conductorId")
    var conductorId: String
        get() = driverId
        set(v) { driverId = v }

    @get:PropertyName("horarioId") @set:PropertyName("horarioId")
    var horarioId: String
        get() = scheduleId
        set(v) { scheduleId = v }

    @get:PropertyName("nombre") @set:PropertyName("nombre")
    var nombre: String
        get() = passengerName
        set(v) { passengerName = v }

    @get:PropertyName("name") @set:PropertyName("name")
    var name: String
        get() = passengerName
        set(v) { passengerName = v }

    @get:PropertyName("telefono") @set:PropertyName("telefono")
    var telefono: String
        get() = passengerPhone
        set(v) { passengerPhone = v }

    @get:PropertyName("phone") @set:PropertyName("phone")
    var phone: String
        get() = passengerPhone
        set(v) { passengerPhone = v }

    @get:PropertyName("conductor") @set:PropertyName("conductor")
    var conductor: String
        get() = driverName
        set(v) { driverName = v }

    @get:PropertyName("driver") @set:PropertyName("driver")
    var driver: String
        get() = driverName
        set(v) { driverName = v }

    @get:PropertyName("estadoReserva") @set:PropertyName("estadoReserva")
    var estadoReserva: String
        get() = status
        set(v) { status = v }

    @get:PropertyName("reservationStatus") @set:PropertyName("reservationStatus")
    var reservationStatus: String
        get() = status
        set(v) { status = v }

    @get:PropertyName("puestoReservado") @set:PropertyName("puestoReservado")
    var puestoReservado: Int
        get() = reservedSeat
        set(v) { reservedSeat = v }

    @get:PropertyName("precio") @set:PropertyName("precio")
    var precio: Double
        get() = price
        set(v) { price = v }

    @get:PropertyName("fechaReserva") @set:PropertyName("fechaReserva")
    var fechaReserva: Long
        get() = reservationDate
        set(v) { reservationDate = v }

    @get:PropertyName("calificada") @set:PropertyName("calificada")
    var calificadaLegacy: Boolean
        get() = isRated
        set(v) { isRated = v }

    @get:PropertyName("rated") @set:PropertyName("rated")
    var ratedLegacy: Boolean
        get() = isRated
        set(v) { isRated = v }

    @get:PropertyName("calificacion") @set:PropertyName("calificacion")
    var calificacion: Float
        get() = rating
        set(v) { rating = v }

    @get:PropertyName("modeloVehiculo") @set:PropertyName("modeloVehiculo")
    var modeloVehiculo: String
        get() = vehicleModel
        set(v) { vehicleModel = v }

    @get:PropertyName("modelo") @set:PropertyName("modelo")
    var modelo: String
        get() = vehicleModel
        set(v) { vehicleModel = v }

    @get:PropertyName("vehiculoId") @set:PropertyName("vehiculoId")
    var vehiculoId: String
        get() = vehiclePlate
        set(v) { vehiclePlate = v }

    @get:PropertyName("placa") @set:PropertyName("placa")
    var placa: String
        get() = vehiclePlate
        set(v) { vehiclePlate = v }

    @get:PropertyName("plate") @set:PropertyName("plate")
    var plate: String
        get() = vehiclePlate
        set(v) { vehiclePlate = v }

    @get:PropertyName("estimatedTime") @set:PropertyName("estimatedTime")
    var estimatedTime: String
        get() = estimatedDuration
        set(v) { estimatedDuration = v }

    @get:PropertyName("tiempoEstimado") @set:PropertyName("tiempoEstimado")
    var tiempoEstimado: String
        get() = estimatedDuration
        set(v) { estimatedDuration = v }

    @get:PropertyName("origen") @set:PropertyName("origen")
    var origenLegacy: String
        get() = origin
        set(v) { origin = v }

    @get:PropertyName("destino") @set:PropertyName("destino")
    var destinoLegacy: String
        get() = destination
        set(v) { destination = v }
}

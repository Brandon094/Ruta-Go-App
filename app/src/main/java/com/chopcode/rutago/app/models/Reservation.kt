package com.chopcode.rutago.app.models

import com.google.firebase.database.IgnoreExtraProperties
import com.google.firebase.database.PropertyName

/**
 * 📦 MODEL: Reservation
 * Normalizado a Inglés con compatibilidad total para Java y Firebase.
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

    // Constructor completo
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
    // 🌍 JAVA & FIREBASE LEGACY BRIDGE
    // =========================================================================

    @PropertyName("idReservation")
    fun getIdReservation(): String = id
    @PropertyName("idReservation")
    fun setIdReservation(v: String) { id = v }

    @PropertyName("idReserva")
    fun getIdReserva(): String = id
    @PropertyName("idReserva")
    fun setIdReserva(v: String) { id = v }

    @PropertyName("usuarioId")
    fun getUsuarioId(): String = userId
    @PropertyName("usuarioId")
    fun setUsuarioId(v: String) { userId = v }

    @PropertyName("conductorId")
    fun getConductorId(): String = driverId
    @PropertyName("conductorId")
    fun setConductorId(v: String) { driverId = v }

    @PropertyName("horarioId")
    fun getHorarioId(): String = scheduleId
    @PropertyName("horarioId")
    fun setHorarioId(v: String) { scheduleId = v }

    @PropertyName("origen")
    fun getOrigen(): String = origin
    @PropertyName("origen")
    fun setOrigen(v: String) { origin = v }

    @PropertyName("destino")
    fun getDestino(): String = destination
    @PropertyName("destino")
    fun setDestino(v: String) { destination = v }

    @PropertyName("horaSalida")
    fun getHoraSalida(): String = departureTime
    @PropertyName("horaSalida")
    fun setHoraSalida(v: String) { departureTime = v }

    @PropertyName("estimatedTime")
    fun getEstimatedTime(): String = estimatedDuration
    @PropertyName("estimatedTime")
    fun setEstimatedTime(v: String) { estimatedDuration = v }

    @PropertyName("tiempoEstimado")
    fun getTiempoEstimado(): String = estimatedDuration
    @PropertyName("tiempoEstimado")
    fun setTiempoEstimado(v: String) { estimatedDuration = v }

    @PropertyName("reservationStatus")
    fun getReservationStatus(): String = status
    @PropertyName("reservationStatus")
    fun setReservationStatus(v: String) { status = v }

    @PropertyName("estadoReserva")
    fun getEstadoReserva(): String = status
    @PropertyName("estadoReserva")
    fun setEstadoReserva(v: String) { status = v }

    @PropertyName("puestoReservado")
    fun getPuestoReservado(): Int = reservedSeat
    @PropertyName("puestoReservado")
    fun setPuestoReservado(v: Int) { reservedSeat = v }

    @PropertyName("precio")
    fun getPrecio(): Double = price
    @PropertyName("precio")
    fun setPrecio(v: Double) { price = v }

    @PropertyName("fechaReserva")
    fun getFechaReserva(): Long = reservationDate
    @PropertyName("fechaReserva")
    fun setFechaReserva(v: Long) { reservationDate = v }

    @PropertyName("calificada")
    fun isCalificada(): Boolean = isRated
    @PropertyName("calificada")
    fun setCalificada(v: Boolean) { isRated = v }

    @PropertyName("rated")
    fun isRatedLegacy(): Boolean = isRated
    @PropertyName("rated")
    @JvmName("setRatedLegacy")
    fun setRated(v: Boolean) { isRated = v }

    @PropertyName("calificacion")
    fun getCalificacion(): Float = rating
    @PropertyName("calificacion")
    fun setCalificacion(v: Float) { rating = v }

    @PropertyName("nombre")
    fun getNombre(): String = passengerName
    @PropertyName("nombre")
    fun setNombre(v: String) { passengerName = v }

    @PropertyName("name")
    fun getName(): String = passengerName
    @PropertyName("name")
    fun setName(v: String) { passengerName = v }

    @PropertyName("telefono")
    fun getTelefono(): String = passengerPhone
    @PropertyName("telefono")
    fun setTelefono(v: String) { passengerPhone = v }

    @PropertyName("phone")
    fun getPhone(): String = passengerPhone
    @PropertyName("phone")
    fun setPhone(v: String) { passengerPhone = v }

    @PropertyName("telefonoC")
    fun getPhoneC(): String = ""
    @PropertyName("telefonoC")
    fun setPhoneC(v: String) { }

    @PropertyName("placa")
    fun getPlaca(): String = vehiclePlate
    @PropertyName("placa")
    fun setPlaca(v: String) { vehiclePlate = v }

    @PropertyName("plate")
    fun getPlate(): String = vehiclePlate
    @PropertyName("plate")
    fun setPlate(v: String) { vehiclePlate = v }

    @PropertyName("modeloVehiculo")
    fun getModeloVehiculo(): String = vehicleModel
    @PropertyName("modeloVehiculo")
    fun setModeloVehiculo(v: String) { vehicleModel = v }

    @PropertyName("modelo")
    fun getModelo(): String = vehicleModel
    @PropertyName("modelo")
    fun setModelo(v: String) { vehicleModel = v }

    @PropertyName("conductor")
    fun getConductor(): String = driverName
    @PropertyName("conductor")
    fun setConductor(v: String) { driverName = v }

    @PropertyName("driver")
    fun getDriver(): String = driverName
    @PropertyName("driver")
    fun setDriver(v: String) { driverName = v }

    @PropertyName("routeName")
    fun getRouteName(): String = "$origin → $destination"
    @PropertyName("routeName")
    fun setRouteName(v: String) { }
    
    @PropertyName("vehiculoId")
    fun getVehiculoId(): String = vehiclePlate
    @PropertyName("vehiculoId")
    fun setVehiculoId(v: String) { vehiclePlate = v }
}

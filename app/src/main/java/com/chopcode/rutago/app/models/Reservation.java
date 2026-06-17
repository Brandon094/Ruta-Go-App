package com.chopcode.rutago.app.models;

import com.google.firebase.database.IgnoreExtraProperties;
import com.google.firebase.database.PropertyName;

/**
 * 🎫 Reservation Model
 * 
 * Este modelo es el "corazón" de los datos de la app. Implementa una estrategia de
 * "Mapeo Dual" para garantizar que la aplicación pueda leer datos históricos en español
 * de Firebase y manejarlos internamente en inglés para seguir el estándar Clean Architecture.
 * 
 * Los campos son públicos para facilitar el acceso rápido desde Firebase, pero cuentan
 * con setters decorados con @PropertyName para la interoperabilidad.
 */
@IgnoreExtraProperties
public class Reservation {
    // --- Campos en Inglés (Estándar del Código) ---
    public String idReservation;
    public String userId;
    public String scheduleId;
    public String driverId;
    public String vehicleId;
    public String routeId;
    public String routeName;
    public String driver; // Nombre del conductor
    public String origin;
    public String destination;
    public String estimatedTime;
    public String paymentMethod;
    public String reservationStatus;
    public String name; // Nombre del pasajero
    public String phone; // Teléfono del pasajero
    public String phoneC; // Teléfono del conductor
    public String email;
    public long reservationDate;
    public double price;
    public int reservedSeat = -1;
    public boolean rated = false;

    public Reservation() { }

    /**
     * Constructor completo para creación manual de reservas.
     */
    public Reservation(String idReservation, String userId, String scheduleId, int reservedSeat,
                       String driver, String driverId, String phoneC, String vehicleId, double price,
                       String origin, String destination, String estimatedTime, String paymentMethod,
                       String reservationStatus, long reservationDate, String name, String phone,
                       String email, String routeId, String routeName) {
        this.idReservation = idReservation;
        this.userId = userId;
        this.scheduleId = scheduleId;
        this.reservedSeat = reservedSeat;
        this.driver = driver;
        this.driverId = driverId;
        this.phoneC = phoneC;
        this.vehicleId = vehicleId;
        this.price = price;
        this.origin = origin;
        this.destination = destination;
        this.estimatedTime = estimatedTime;
        this.paymentMethod = paymentMethod;
        this.reservationStatus = reservationStatus;
        this.reservationDate = reservationDate;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.routeId = routeId;
        this.routeName = routeName;
    }

    // =========================================================================
    // 🌍 ESTRATEGIA DE COMPATIBILIDAD BILINGÜE (Mapeo Dual)
    // =========================================================================
    
    // Estas funciones permiten que Firebase mapee llaves en español (ej: "idReserva")
    // directamente a nuestras variables en inglés (idReservation).

    @PropertyName("idReserva")
    public void setIdReserva(String val) { if (val != null) this.idReservation = val; }
    
    @PropertyName("usuarioId")
    public void setUsuarioId(String val) { if (val != null) this.userId = val; }
    
    @PropertyName("horarioId")
    public void setHorarioId(String val) { if (val != null) this.scheduleId = val; }
    
    @PropertyName("conductorId")
    public void setConductorId(String val) { if (val != null) this.driverId = val; }
    
    @PropertyName("puestoReservado")
    public void setPuestoReservado(int val) { if (val != -1) this.reservedSeat = val; }
    
    @PropertyName("conductor")
    public void setConductor(String val) { if (val != null) this.driver = val; }
    
    @PropertyName("estadoReserva")
    public void setEstadoReserva(String val) { if (val != null) this.reservationStatus = val; }
    
    @PropertyName("fechaReserva")
    public void setFechaReserva(long val) { if (val != 0) this.reservationDate = val; }
    
    @PropertyName("nombre")
    public void setNombre(String val) { if (val != null) this.name = val; }
    
    @PropertyName("telefono")
    public void setTelefono(String val) { if (val != null) this.phone = val; }
    
    @PropertyName("telefonoC")
    public void setTelefonoC(String val) { if (val != null) this.phoneC = val; }
    
    @PropertyName("metodoPago")
    public void setMetodoPago(String val) { if (val != null) this.paymentMethod = val; }
    
    @PropertyName("origen")
    public void setOrigen(String val) { if (val != null) this.origin = val; }
    
    @PropertyName("destino")
    public void setDestino(String val) { if (val != null) this.destination = val; }
    
    @PropertyName("precio")
    public void setPrecio(double val) { if (val != 0) this.price = val; }
    
    @PropertyName("tiempoEstimado")
    public void setTiempoEstimado(String val) { if (val != null) this.estimatedTime = val; }
    
    @PropertyName("calificada")
    public void setCalificada(boolean val) { this.rated = val; }
    
    @PropertyName("vehiculoId")
    public void setVehiculoId(String val) { if (val != null) this.vehicleId = val; }

    // =========================================================================
    // 🛠️ GETTERS Y SETTERS ESTÁNDAR
    // =========================================================================

    public String getIdReservation() { return idReservation; }
    public void setIdReservation(String idReservation) { this.idReservation = idReservation; }
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public String getScheduleId() { return scheduleId; }
    public void setScheduleId(String scheduleId) { this.scheduleId = scheduleId; }
    public String getDriverId() { return driverId; }
    public void setDriverId(String driverId) { this.driverId = driverId; }
    public String getVehicleId() { return vehicleId; }
    public void setVehicleId(String vehicleId) { this.vehicleId = vehicleId; }
    public String getRouteId() { return routeId; }
    public void setRouteId(String routeId) { this.routeId = routeId; }
    public String getRouteName() { return routeName; }
    public void setRouteName(String routeName) { this.routeName = routeName; }
    public String getDriver() { return driver; }
    public void setDriver(String driver) { this.driver = driver; }
    public String getOrigin() { return origin; }
    public void setOrigin(String origin) { this.origin = origin; }
    public String getDestination() { return destination; }
    public void setDestination(String destination) { this.destination = destination; }
    public String getEstimatedTime() { return estimatedTime; }
    public void setEstimatedTime(String estimatedTime) { this.estimatedTime = estimatedTime; }
    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }
    public String getReservationStatus() { return reservationStatus; }
    public void setReservationStatus(String reservationStatus) { this.reservationStatus = reservationStatus; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getPhoneC() { return phoneC; }
    public void setPhoneC(String phoneC) { this.phoneC = phoneC; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public long getReservationDate() { return reservationDate; }
    public void setReservationDate(long reservationDate) { this.reservationDate = reservationDate; }
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
    public int getReservedSeat() { return reservedSeat; }
    public void setReservedSeat(int reservedSeat) { this.reservedSeat = reservedSeat; }
    public boolean isRated() { return rated; }
    public void setRated(boolean rated) { this.rated = rated; }
}

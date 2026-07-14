package com.chopcode.rutago.app.models;

import com.google.firebase.database.IgnoreExtraProperties;
import com.google.firebase.database.PropertyName;

/**
 * Reservation Model
 *
 * Representa un tiquete o compromiso de viaje entre un pasajero y un conductor.
 * Este modelo implementa una estrategia de "Mapeo Dual" para garantizar
 * compatibilidad bilingüe entre la base de datos (Español) y el código (Inglés).
 */
@IgnoreExtraProperties
public class Reservation {
    private String idReservation;
    private String userId;
    private String scheduleId;
    private String driverId;
    private String vehicleId;
    private String vehicleModel; 
    private String routeId;
    private String routeName;
    private String driver; // Nombre del conductor
    private String origin;
    private String destination;
    private String estimatedTime; // Duración (ej: "60 min")
    private String departureTime; // Hora de salida (ej: "02:00 PM")
    private String paymentMethod;
    private String reservationStatus;
    private String name; // Nombre del pasajero
    private String phone; // Teléfono del pasajero
    private String phoneC; // Teléfono del conductor
    private String email;
    private long reservationDate;
    private double price;
    private int reservedSeat = -1;
    private boolean rated = false;
    private float rating = 0.0f;

    /**
     * Constructor vacío requerido por Firebase.
     */
    public Reservation() { }

    public Reservation(String idReservation, String userId, String scheduleId, int reservedSeat,
                       String driver, String driverId, String phoneC, String vehicleId, String vehicleModel, double price,
                       String origin, String destination, String estimatedTime, String departureTime, String paymentMethod,
                       String reservationStatus, long reservationDate, String name, String phone,
                       String email, String routeId, String routeName, float rating) {
        this.idReservation = idReservation;
        this.userId = userId;
        this.scheduleId = scheduleId;
        this.reservedSeat = reservedSeat;
        this.driver = driver;
        this.driverId = driverId;
        this.phoneC = phoneC;
        this.vehicleId = vehicleId;
        this.vehicleModel = vehicleModel;
        this.price = price;
        this.origin = origin;
        this.destination = destination;
        this.estimatedTime = estimatedTime;
        this.departureTime = departureTime;
        this.paymentMethod = paymentMethod;
        this.reservationStatus = reservationStatus;
        this.reservationDate = reservationDate;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.routeId = routeId;
        this.routeName = routeName;
        this.rating = rating;
    }

    // =========================================================================
    // 🌍 MAPEOS DUALES (SETTERS) - Facilitan la lectura de Firebase (Español/Inglés)
    // =========================================================================

    @PropertyName("idReserva")
    public void setIdReserva(String val) { this.idReservation = val; }
    @PropertyName("idReservation")
    public void setIdReservation(String val) { this.idReservation = val; }

    @PropertyName("usuarioId")
    public void setUsuarioId(String val) { this.userId = val; }
    @PropertyName("userId")
    public void setUserId(String val) { this.userId = val; }

    @PropertyName("horarioId")
    public void setHorarioId(String val) { this.scheduleId = val; }
    @PropertyName("scheduleId")
    public void setScheduleId(String val) { this.scheduleId = val; }

    @PropertyName("conductorId")
    public void setConductorId(String val) { this.driverId = val; }
    @PropertyName("driverId")
    public void setDriverId(String val) { this.driverId = val; }

    @PropertyName("puestoReservado")
    public void setPuestoReservado(int val) { this.reservedSeat = val; }
    @PropertyName("reservedSeat")
    public void setReservedSeat(int val) { this.reservedSeat = val; }

    @PropertyName("conductor")
    public void setConductor(String val) { this.driver = val; }
    @PropertyName("driver")
    public void setDriver(String val) { this.driver = val; }

    @PropertyName("estadoReserva")
    public void setEstadoReserva(String val) { this.reservationStatus = val; }
    @PropertyName("reservationStatus")
    public void setReservationStatus(String val) { this.reservationStatus = val; }

    @PropertyName("fechaReserva")
    public void setFechaReserva(long val) { this.reservationDate = val; }
    @PropertyName("reservationDate")
    public void setReservationDate(long val) { this.reservationDate = val; }

    @PropertyName("nombre")
    public void setNombre(String val) { this.name = val; }
    @PropertyName("name")
    public void setName(String val) { this.name = val; }

    @PropertyName("telefono")
    public void setTelefono(String val) { this.phone = val; }
    @PropertyName("phone")
    public void setPhone(String val) { this.phone = val; }

    @PropertyName("modeloVehiculo")
    public void setModeloVehiculo(String val) { this.vehicleModel = val; }
    @PropertyName("vehicleModel")
    public void setVehicleModel(String val) { this.vehicleModel = val; }

    @PropertyName("precio")
    public void setPrecio(double val) { this.price = val; }
    @PropertyName("price")
    public void setPrice(double val) { this.price = val; }

    @PropertyName("origen")
    public void setOrigen(String val) { this.origin = val; }
    @PropertyName("origin")
    public void setOrigin(String val) { this.origin = val; }

    @PropertyName("destino")
    public void setDestino(String val) { this.destination = val; }
    @PropertyName("destination")
    public void setDestination(String val) { this.destination = val; }

    @PropertyName("telefonoC")
    public void setTelefonoC(String val) { this.phoneC = val; }
    @PropertyName("phoneC")
    public void setPhoneC(String val) { this.phoneC = val; }

    @PropertyName("vehiculoId")
    public void setVehiculoId(String val) { this.vehicleId = val; }
    @PropertyName("vehicleId")
    public void setVehicleId(String val) { this.vehicleId = val; }

    @PropertyName("metodoPago")
    public void setMetodoPago(String val) { this.paymentMethod = val; }
    @PropertyName("paymentMethod")
    public void setPaymentMethod(String val) { this.paymentMethod = val; }

    @PropertyName("tiempoEstimado")
    public void setTiempoEstimado(String val) { this.estimatedTime = val; }
    @PropertyName("estimatedTime")
    public void setEstimatedTime(String val) { this.estimatedTime = val; }

    @PropertyName("departureTime")
    public void setDepartureTime(String val) { this.departureTime = val; }
    @PropertyName("horaSalida")
    public void setHoraSalida(String val) { this.departureTime = val; }

    @PropertyName("calificada")
    public void setCalificada(boolean val) { this.rated = val; }
    @PropertyName("rated")
    public void setRated(boolean val) { this.rated = val; }

    @PropertyName("calificacion")
    public void setCalificacion(float val) { this.rating = val; }
    @PropertyName("rating")
    public void setRating(float val) { this.rating = val; }

    // =========================================================================
    // 🛠️ GETTERS (USAN ESTÁNDAR INGLÉS PARA ESCRITURA EN FIREBASE)
    // =========================================================================

    @PropertyName("idReservation") public String getIdReservation() { return idReservation; }
    @PropertyName("userId") public String getUserId() { return userId; }
    @PropertyName("scheduleId") public String getScheduleId() { return scheduleId; }
    @PropertyName("driverId") public String getDriverId() { return driverId; }
    @PropertyName("vehicleId") public String getVehicleId() { return vehicleId; }
    @PropertyName("vehicleModel") public String getVehicleModel() { return vehicleModel; }
    @PropertyName("routeId") public String getRouteId() { return routeId; }
    @PropertyName("routeName") public String getRouteName() { return routeName; }
    @PropertyName("driver") public String getDriver() { return driver; }
    @PropertyName("origin") public String getOrigin() { return origin; }
    @PropertyName("destination") public String getDestination() { return destination; }
    @PropertyName("estimatedTime") public String getEstimatedTime() { return estimatedTime; }
    @PropertyName("departureTime") public String getDepartureTime() { return departureTime; }
    @PropertyName("paymentMethod") public String getPaymentMethod() { return paymentMethod; }
    @PropertyName("reservationStatus") public String getReservationStatus() { return reservationStatus; }
    @PropertyName("name") public String getName() { return name; }
    @PropertyName("phone") public String getPhone() { return phone; }
    @PropertyName("phoneC") public String getPhoneC() { return phoneC; }
    @PropertyName("email") public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    @PropertyName("reservationDate") public long getReservationDate() { return reservationDate; }
    @PropertyName("price") public double getPrice() { return price; }
    @PropertyName("reservedSeat") public int getReservedSeat() { return reservedSeat; }
    @PropertyName("rating") public float getRating() { return rating; }
    @PropertyName("calificada") public boolean isCalificada() { return rated; }
    @PropertyName("rated") public boolean isRated() { return rated; }
}

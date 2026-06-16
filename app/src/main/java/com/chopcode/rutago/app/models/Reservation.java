package com.chopcode.rutago.app.models;

import com.google.firebase.database.IgnoreExtraProperties;
import com.google.firebase.database.PropertyName;

@IgnoreExtraProperties
public class Reservation {
    private String idReservation, userId, scheduleId, driverId, vehicleId, routeId, routeName;
    private String driver, origin, destination, estimatedTime, paymentMethod;
    private String reservationStatus, name, phone, phoneC, email;
    private long reservationDate;
    private double price;
    private int reservedSeat = -1;
    private boolean rated = false;

    public Reservation() {
        this.reservedSeat = -1;
    }

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

    @PropertyName("idReservation")
    public String getIdReservation() { return idReservation; }
    @PropertyName("idReservation")
    public void setIdReservation(String idReservation) { this.idReservation = idReservation; }
    @PropertyName("idReserva")
    public void setIdReserva(String val) { this.idReservation = val; }

    @PropertyName("userId")
    public String getUserId() { return userId; }
    @PropertyName("userId")
    public void setUserId(String userId) { this.userId = userId; }
    @PropertyName("usuarioId")
    public void setUsuarioId(String val) { this.userId = val; }

    @PropertyName("scheduleId")
    public String getScheduleId() { return scheduleId; }
    @PropertyName("scheduleId")
    public void setScheduleId(String scheduleId) { this.scheduleId = scheduleId; }
    @PropertyName("horarioId")
    public void setHorarioId(String val) { this.scheduleId = val; }

    @PropertyName("driverId")
    public String getDriverId() { return driverId; }
    @PropertyName("driverId")
    public void setDriverId(String driverId) { this.driverId = driverId; }
    @PropertyName("conductorId")
    public void setConductorId(String val) { this.driverId = val; }

    @PropertyName("reservedSeat")
    public int getReservedSeat() { return reservedSeat; }
    @PropertyName("reservedSeat")
    public void setReservedSeat(int reservedSeat) { this.reservedSeat = reservedSeat; }
    @PropertyName("puestoReservado")
    public void setPuestoReservado(int val) { this.reservedSeat = val; }

    @PropertyName("driver")
    public String getDriver() { return driver; }
    @PropertyName("driver")
    public void setDriver(String driver) { this.driver = driver; }
    @PropertyName("conductor")
    public void setConductor(String val) { this.driver = val; }

    @PropertyName("reservationStatus")
    public String getReservationStatus() { return reservationStatus; }
    @PropertyName("reservationStatus")
    public void setReservationStatus(String reservationStatus) { this.reservationStatus = reservationStatus; }
    @PropertyName("estadoReserva")
    public void setEstadoReserva(String val) { this.reservationStatus = val; }

    @PropertyName("reservationDate")
    public long getReservationDate() { return reservationDate; }
    @PropertyName("reservationDate")
    public void setReservationDate(long reservationDate) { this.reservationDate = reservationDate; }
    @PropertyName("fechaReserva")
    public void setFechaReserva(long val) { this.reservationDate = val; }

    @PropertyName("name")
    public String getName() { return name; }
    @PropertyName("name")
    public void setName(String name) { this.name = name; }
    @PropertyName("nombre")
    public void setNombre(String val) { this.name = val; }

    @PropertyName("phone")
    public String getPhone() { return phone; }
    @PropertyName("phone")
    public void setPhone(String phone) { this.phone = phone; }
    @PropertyName("telefono")
    public void setTelefono(String val) { this.phone = val; }

    @PropertyName("phoneC")
    public String getPhoneC() { return phoneC; }
    @PropertyName("phoneC")
    public void setPhoneC(String phoneC) { this.phoneC = phoneC; }
    @PropertyName("telefonoC")
    public void setTelefonoC(String val) { this.phoneC = val; }

    @PropertyName("paymentMethod")
    public String getPaymentMethod() { return paymentMethod; }
    @PropertyName("paymentMethod")
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }
    @PropertyName("metodoPago")
    public void setMetodoPago(String val) { this.paymentMethod = val; }

    @PropertyName("origin")
    public String getOrigin() { return origin; }
    @PropertyName("origin")
    public void setOrigin(String origin) { this.origin = origin; }
    @PropertyName("origen")
    public void setOrigen(String val) { this.origin = val; }

    @PropertyName("destination")
    public String getDestination() { return destination; }
    @PropertyName("destination")
    public void setDestination(String destination) { this.destination = destination; }
    @PropertyName("destino")
    public void setDestino(String val) { this.destination = val; }

    @PropertyName("price")
    public double getPrice() { return price; }
    @PropertyName("price")
    public void setPrice(double price) { this.price = price; }
    @PropertyName("precio")
    public void setPrecio(double val) { this.price = val; }

    @PropertyName("estimatedTime")
    public String getEstimatedTime() { return estimatedTime; }
    @PropertyName("estimatedTime")
    public void setEstimatedTime(String estimatedTime) { this.estimatedTime = estimatedTime; }
    @PropertyName("tiempoEstimado")
    public void setTiempoEstimado(String val) { this.estimatedTime = val; }

    @PropertyName("rated")
    public boolean isRated() { return rated; }
    @PropertyName("rated")
    public void setRated(boolean rated) { this.rated = rated; }
    @PropertyName("calificada")
    public void setCalificada(boolean val) { this.rated = val; }

    @PropertyName("vehicleId")
    public String getVehicleId() { return vehicleId; }
    @PropertyName("vehicleId")
    public void setVehicleId(String vehicleId) { this.vehicleId = vehicleId; }
    @PropertyName("vehiculoId")
    public void setVehiculoId(String val) { this.vehicleId = val; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getRouteId() { return routeId; }
    public void setRouteId(String routeId) { this.routeId = routeId; }
    public String getRouteName() { return routeName; }
    public void setRouteName(String routeName) { this.routeName = routeName; }

    public boolean isSeatAssigned() { return getReservedSeat() > 0; }
    public String getSeatDescription() {
        int seat = getReservedSeat();
        return seat > 0 ? "Seat " + seat : "Seat not assigned";
    }
}

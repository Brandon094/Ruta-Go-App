package com.chopcode.rutago.app.models;

public class Reservation {
    private String idReservation, userId, scheduleId, driverId, vehicleId, routeId, routeName;
    private String driver, origin, destination, estimatedTime, paymentMethod;
    private String reservationStatus, name, phone, phoneC, email;
    private long reservationDate;
    private double price;
    private int reservedSeat = -1;
    private boolean rated = false;

    // Constructor vacío (OBLIGATORIO para Firebase)
    public Reservation() {
        this.reservedSeat = -1; // Valor por defecto
    }

    public Reservation(String idReservation, String userId, String scheduleId, Integer reservedSeat,
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
        this.phoneC = phoneC;
        this.email = email;
        this.routeId = routeId;
        this.routeName = routeName;
    }

    // Constructor para mantener compatibilidad
    public Reservation(String idReservation, String userId, String scheduleId, Integer reservedSeat,
                   String driver, String phoneC, String vehicleId, double price,
                   String origin, String destination, String estimatedTime, String paymentMethod,
                   String reservationStatus, long reservationDate, String name, String phone,
                   String email) {
        this.idReservation = idReservation;
        this.userId = userId;
        this.scheduleId = scheduleId;
        this.reservedSeat = reservedSeat;
        this.driver = driver;
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
        this.phoneC = phoneC;
        this.email = email;
    }

    // Getters y Setters
    public String getIdReservation() { return idReservation; }
    public void setIdReservation(String idReservation) { this.idReservation = idReservation; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getScheduleId() { return scheduleId; }
    public void setScheduleId(String scheduleId) { this.scheduleId = scheduleId; }

    public int getReservedSeat() { return reservedSeat; }
    public void setReservedSeat(int reservedSeat) { this.reservedSeat = reservedSeat; }

    // ✅ CORREGIDO: Firebase espera getConductor() para el campo "conductor"
    public String getDriver() { return driver; }
    public void setDriver(String driver) { this.driver = driver; }

    public String getVehicleId() { return vehicleId; }
    public void setVehicleId(String vehicleId) { this.vehicleId = vehicleId; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

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

    public long getReservationDate() { return reservationDate; }
    public void setReservationDate(long reservationDate) { this.reservationDate = reservationDate; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhoneC() { return phoneC; }
    public void setPhoneC(String phoneC) { this.phoneC = phoneC; }
    public String getDriverId() { return driverId; }
    public void setDriverId(String driverId) { this.driverId = driverId; }

    public String getRouteId() {
        return routeId;
    }

    public void setRouteId(String routeId) {
        this.routeId = routeId;
    }

    public String getRouteName() {
        return routeName;
    }

    public void setRouteName(String routeName) {
        this.routeName = routeName;
    }

    public boolean isRated() {
        return rated;
    }

    public void setRated(boolean rated) {
        this.rated = rated;
    }

    // 🔥 MÉTODO CONVENCENCIA: Verificar si el asiento está asignado
    public boolean isSeatAssigned() {
        return reservedSeat > 0;
    }

    // 🔥 MÉTODO CONVENCENCIA: Obtener descripción del asiento
    public String getSeatDescription() {
        if (reservedSeat > 0) {
            return "Seat " + reservedSeat;
        } else {
            return "Seat not assigned";
        }
    }
}

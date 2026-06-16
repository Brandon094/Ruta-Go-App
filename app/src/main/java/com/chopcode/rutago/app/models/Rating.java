package com.chopcode.rutago.app.models;

/**
 * Modelo para las calificaciones de conductores
 */
public class Rating {
    private String id;
    private String passengerId;
    private String passengerName;
    private String driverId;
    private String reservationId;
    private String route;
    private float rating;
    private String comment;
    private long date;

    public Rating() {
        // Requerido por Firebase
    }

    public Rating(String passengerId, String passengerName, String driverId, 
                        String reservationId, String route, float rating, String comment) {
        this.passengerId = passengerId;
        this.passengerName = passengerName;
        this.driverId = driverId;
        this.reservationId = reservationId;
        this.route = route;
        this.rating = rating;
        this.comment = comment;
        this.date = System.currentTimeMillis();
    }

    // Getters y Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getPassengerId() { return passengerId; }
    public void setPassengerId(String passengerId) { this.passengerId = passengerId; }

    public String getPassengerName() { return passengerName; }
    public void setPassengerName(String passengerName) { this.passengerName = passengerName; }

    public String getDriverId() { return driverId; }
    public void setDriverId(String driverId) { this.driverId = driverId; }

    public String getReservationId() { return reservationId; }
    public void setReservationId(String reservationId) { this.reservationId = reservationId; }

    public String getRoute() { return route; }
    public void setRoute(String route) { this.route = route; }

    public float getRating() { return rating; }
    public void setRating(float rating) { this.rating = rating; }

    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }

    public long getDate() { return date; }
    public void setDate(long date) { this.date = date; }
}

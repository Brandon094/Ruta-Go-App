package com.chopcode.rutago.app.models;

/**
 * Modelo para las calificaciones de conductores
 */
import com.google.firebase.database.IgnoreExtraProperties;
import com.google.firebase.database.PropertyName;

@IgnoreExtraProperties
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

    public Rating() { }

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

    // Getters y Setters con mapeo dual
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    @PropertyName("passengerId")
    public String getPassengerId() { return passengerId; }
    @PropertyName("passengerId")
    public void setPassengerId(String passengerId) { this.passengerId = passengerId; }
    @PropertyName("pasajeroId")
    public void setPasajeroId(String pasajeroId) { this.passengerId = pasajeroId; }

    @PropertyName("passengerName")
    public String getPassengerName() { return passengerName; }
    @PropertyName("passengerName")
    public void setPassengerName(String passengerName) { this.passengerName = passengerName; }
    @PropertyName("pasajeroNombre")
    public void setPasajeroNombre(String pasajeroNombre) { this.passengerName = pasajeroNombre; }

    @PropertyName("driverId")
    public String getDriverId() { return driverId; }
    @PropertyName("driverId")
    public void setDriverId(String driverId) { this.driverId = driverId; }
    @PropertyName("conductorId")
    public void setConductorId(String conductorId) { this.driverId = conductorId; }

    @PropertyName("reservationId")
    public String getReservationId() { return reservationId; }
    @PropertyName("reservationId")
    public void setReservationId(String reservationId) { this.reservationId = reservationId; }
    @PropertyName("reservaId")
    public void setReservaId(String reservaId) { this.reservationId = reservaId; }

    public String getRoute() { return route; }
    public void setRoute(String route) { this.route = route; }

    public float getRating() { return rating; }
    public void setRating(float rating) { this.rating = rating; }

    @PropertyName("comment")
    public String getComment() { return comment; }
    @PropertyName("comment")
    public void setComment(String comment) { this.comment = comment; }
    @PropertyName("comentario")
    public void setComentario(String comentario) { this.comment = comentario; }

    @PropertyName("date")
    public long getDate() { return date; }
    @PropertyName("date")
    public void setDate(long date) { this.date = date; }
    @PropertyName("fecha")
    public void setFecha(long fecha) { this.date = fecha; }
}

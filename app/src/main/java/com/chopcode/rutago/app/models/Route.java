package com.chopcode.rutago.app.models;

public class Route {
    private String id;          // Identificador único de la ruta
    private String origin;      // Lugar de salida
    private String destination;     // Lugar de llegada
    private double fare;      // Precio del pasaje
    private Schedule time;       // Información del horario
    private String scheduleId;   // 🔥 NUEVO: ID del horario (h001, h002, etc.)

    public Route() { }

    public Route(String id, String origin, String destination, double fare) {
        this.id = id;
        this.origin = origin;
        this.destination = destination;
        this.fare = fare;
    }

    public Route(String id, String origin, String destination, double fare, String scheduleId) {
        this.id = id;
        this.origin = origin;
        this.destination = destination;
        this.fare = fare;
        this.scheduleId = scheduleId;
    }

    // Getters y Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getOrigin() { return origin; }
    public void setOrigin(String origin) { this.origin = origin; }

    public String getDestination() { return destination; }
    public void setDestination(String destination) { this.destination = destination; }

    public double getFare() { return fare; }
    public void setFare(double fare) { this.fare = fare; }

    public Schedule getTime() { return time; }
    public void setTime(Schedule time) { this.time = time; }

    // 🔥 NUEVO: Getter y Setter para scheduleId
    public String getScheduleId() { return scheduleId; }
    public void setScheduleId(String scheduleId) { this.scheduleId = scheduleId; }
}

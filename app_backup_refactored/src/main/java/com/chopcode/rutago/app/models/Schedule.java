package com.chopcode.rutago.app.models;

import java.io.Serializable;

public class Schedule implements Serializable {
    private String id;      // ID del horario (h001, h002, etc.)
    private String route;    // Route de la hora (ej: "Natagá → La Plata")
    private String time;    // Hora de salida (ej: "08:00 AM")
    private String duration; // Duración del viaje (ej: "60 min")
    private String price;  // Precio del pasaje (ej: "12.000")
    private int availableSeats; // Manejar asientos disponibles
    private int totalCapacity;      // Capacidad total del vehículo

    public Schedule() { }

    public Schedule(String id, String route, String time, String duration, String price,
                   int availableSeats, int totalCapacity) {
        this.id = id;
        this.route = route;
        this.time = time;
        this.duration = duration;
        this.price = price;
        this.availableSeats = availableSeats;
        this.totalCapacity = totalCapacity;
    }

    // Getters y Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getRoute() { return route; }
    public void setRoute(String route) { this.route = route; }

    public String getTime() { return time; }
    public void setTime(String time) { this.time = time; }

    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }

    public String getPrice() { return price; }
    public void setPrice(String price) { this.price = price; }

    public int getAvailableSeats() { return availableSeats; }
    public void setAvailableSeats(int availableSeats) {
        this.availableSeats = availableSeats;
    }

    public int getTotalCapacity() { return totalCapacity; }
    public void setTotalCapacity(int totalCapacity) {
        this.totalCapacity = totalCapacity;
    }
}

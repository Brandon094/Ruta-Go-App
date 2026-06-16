package com.chopcode.rutago.app.models;

public class SeatAvailability {
    private String scheduleId;  // Relacionado con un horario específico
    private int totalSeats; // Número total de asientos en la ruta
    private int availableSeats; // Cuántos quedan

    public SeatAvailability() { }

    public SeatAvailability(String scheduleId, int totalSeats, int availableSeats) {
        this.scheduleId = scheduleId;
        this.totalSeats = totalSeats;
        this.availableSeats = availableSeats;
    }

    public String getScheduleId() { return scheduleId; }
    public void setScheduleId(String scheduleId) { this.scheduleId = scheduleId; }

    public int getTotalSeats() { return totalSeats; }
    public void setTotalSeats(int totalSeats) { this.totalSeats = totalSeats; }

    public int getAvailableSeats() { return availableSeats; }
    public void setAvailableSeats(int availableSeats) { this.availableSeats = availableSeats; }
}

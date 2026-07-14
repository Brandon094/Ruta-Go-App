package com.chopcode.rutago.app.models;

import com.google.firebase.database.IgnoreExtraProperties;

/**
 * SeatAvailability Model
 *
 * Mantiene el conteo dinámico de ocupación para un horario específico.
 * Es el modelo que alimenta los indicadores visuales de "Disponibles".
 */
@IgnoreExtraProperties
public class SeatAvailability {
    private String scheduleId;
    private int totalSeats;
    private int availableSeats;

    /**
     * Constructor vacío requerido por Firebase.
     */
    public SeatAvailability() { }

    public SeatAvailability(String scheduleId, int totalSeats, int availableSeats) {
        this.scheduleId = scheduleId;
        this.totalSeats = totalSeats;
        this.availableSeats = availableSeats;
    }

    /**
     * @return ID del horario al que pertenece esta disponibilidad.
     */
    public String getScheduleId() { return scheduleId; }
    public void setScheduleId(String scheduleId) { this.scheduleId = scheduleId; }

    /**
     * @return Capacidad total definida por la ficha técnica del vehículo.
     */
    public int getTotalSeats() { return totalSeats; }
    public void setTotalSeats(int totalSeats) { this.totalSeats = totalSeats; }

    /**
     * @return Conteo de puestos libres (totalSeats - asientosOcupados).
     */
    public int getAvailableSeats() { return availableSeats; }
    public void setAvailableSeats(int availableSeats) { this.availableSeats = availableSeats; }
}

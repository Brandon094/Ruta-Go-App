package com.chopcode.rutago.app.models;

import com.google.firebase.database.IgnoreExtraProperties;
import com.google.firebase.database.PropertyName;
import java.io.Serializable;

/**
 * 🕒 Schedule Model
 *
 * Representa un turno de despacho individual en la planilla maestra.
 * Vincula un horario específico con una ruta y un conductor.
 */
@IgnoreExtraProperties
public class Schedule implements Serializable {
    public String id;      
    private String route;    
    private String time;    
    public String duration; 
    public String price;  
    public int availableSeats; 
    public int totalCapacity;      
    private String conductorId;

    /**
     * Constructor vacío requerido por Firebase.
     */
    public Schedule() { }

    /**
     * @return UID del conductor asignado a este turno.
     */
    @PropertyName("conductorId")
    public String getConductorId() { return conductorId; }
    @PropertyName("conductorId")
    public void setConductorId(String conductorId) { this.conductorId = conductorId; }

    /**
     * @return Nombre del trayecto (ej: Natagá -> La Plata).
     */
    @PropertyName("route")
    public String getRoute() { return route; }
    @PropertyName("route")
    public void setRoute(String route) { this.route = route; }
    @PropertyName("ruta")
    public void setRuta(String val) { this.route = val; }

    /**
     * @return Hora de salida programada.
     */
    @PropertyName("time")
    public String getTime() { return time; }
    @PropertyName("time")
    public void setTime(String time) { this.time = time; }
    @PropertyName("hora")
    public void setHora(String val) { this.time = val; }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    /**
     * @return Tiempo estimado de viaje.
     */
    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }
    
    /**
     * @return Valor del pasaje.
     */
    public String getPrice() { return price; }
    public void setPrice(String price) { this.price = price; }
    
    public int getAvailableSeats() { return availableSeats; }
    public void setAvailableSeats(int availableSeats) { this.availableSeats = availableSeats; }

    public int getTotalCapacity() { return totalCapacity; }
    public void setTotalCapacity(int totalCapacity) { this.totalCapacity = totalCapacity; }
}

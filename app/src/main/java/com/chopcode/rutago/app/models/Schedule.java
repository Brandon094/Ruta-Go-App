package com.chopcode.rutago.app.models;

import com.google.firebase.database.IgnoreExtraProperties;
import com.google.firebase.database.PropertyName;
import java.io.Serializable;

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

    public Schedule() { }

    @PropertyName("conductorId")
    public String getConductorId() { return conductorId; }
    @PropertyName("conductorId")
    public void setConductorId(String conductorId) { this.conductorId = conductorId; }

    @PropertyName("route")
    public String getRoute() { return route; }
    @PropertyName("route")
    public void setRoute(String route) { this.route = route; }
    @PropertyName("ruta")
    public void setRuta(String val) { this.route = val; }

    @PropertyName("time")
    public String getTime() { return time; }
    @PropertyName("time")
    public void setTime(String time) { this.time = time; }
    @PropertyName("hora")
    public void setHora(String val) { this.time = val; }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }
    public String getPrice() { return price; }
    public void setPrice(String price) { this.price = price; }
    public int getAvailableSeats() { return availableSeats; }
    public void setAvailableSeats(int availableSeats) { this.availableSeats = availableSeats; }
    public int getTotalCapacity() { return totalCapacity; }
    public void setTotalCapacity(int totalCapacity) { this.totalCapacity = totalCapacity; }
}

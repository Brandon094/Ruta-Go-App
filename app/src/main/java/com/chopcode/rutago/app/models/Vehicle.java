package com.chopcode.rutago.app.models;

import com.google.firebase.database.IgnoreExtraProperties;
import com.google.firebase.database.PropertyName;

@IgnoreExtraProperties
public class Vehicle {
    private String id;
    private String plate;
    private String model;
    private String brand;  
    private String color;
    private String year;
    private int capacity;
    private String driverId;
    private String status;

    public Vehicle() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    @PropertyName("plate")
    public String getPlate() { return plate; }
    @PropertyName("plate")
    public void setPlate(String plate) { this.plate = plate; }
    @PropertyName("placa")
    public void setPlaca(String placa) { this.plate = placa; }

    public String getBrand() { return brand; }  
    public void setBrand(String brand) { this.brand = brand; }  
    @PropertyName("marca")
    public void setMarca(String marca) { this.brand = marca; }

    @PropertyName("model")
    public String getModel() { return model; }
    @PropertyName("model")
    public void setModel(String model) { this.model = model; }
    @PropertyName("modelo")
    public void setModelo(String modelo) { this.model = modelo; }

    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }

    @PropertyName("year")
    public String getYear() { return year; }
    @PropertyName("year")
    public void setYear(String year) { this.year = year; }
    @PropertyName("ano")
    public void setAno(Object ano) { this.year = String.valueOf(ano); }

    @PropertyName("capacity")
    public int getCapacity() { return capacity; }
    @PropertyName("capacity")
    public void setCapacity(int capacity) { this.capacity = capacity; }
    @PropertyName("capacidad")
    public void setCapacidad(int capacidad) { this.capacity = capacidad; }

    public String getDriverId() { return driverId; }
    public void setDriverId(String driverId) { this.driverId = driverId; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    // ✅ NUEVO: Método toString para debugging
    @Override
    public String toString() {
        return "Vehicle{" +
                "id='" + id + '\'' +
                ", plate='" + plate + '\'' +
                ", brand='" + brand + '\'' +
                ", model='" + model + '\'' +
                ", color='" + color + '\'' +
                ", year='" + year + '\'' +
                ", capacity=" + capacity +
                ", driverId='" + driverId + '\'' +
                ", status='" + status + '\'' +
                '}';
    }
}

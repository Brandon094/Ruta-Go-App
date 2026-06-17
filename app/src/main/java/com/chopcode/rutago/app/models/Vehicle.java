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

    @PropertyName("id")
    public String getId() { return id; }
    @PropertyName("id")
    public void setId(String id) { this.id = id; }

    @PropertyName("placa")
    public String getPlate() { return plate; }
    @PropertyName("placa")
    public void setPlate(String plate) { this.plate = plate; }
    @PropertyName("plate")
    public void setPlateEn(String plate) { this.plate = plate; }

    @PropertyName("modelo")
    public String getModel() { return model; }
    @PropertyName("modelo")
    public void setModel(String model) { this.model = model; }
    @PropertyName("model")
    public void setModelEn(String model) { this.model = model; }

    @PropertyName("marca")
    public String getBrand() { return brand; }
    @PropertyName("marca")
    public void setBrand(String brand) { this.brand = brand; }
    @PropertyName("brand")
    public void setBrandEn(String brand) { this.brand = brand; }

    @PropertyName("color")
    public String getColor() { return color; }
    @PropertyName("color")
    public void setColor(String color) { this.color = color; }

    @PropertyName("ano")
    public String getYear() { return year; }
    @PropertyName("ano")
    public void setYear(String year) { this.year = year; }
    @PropertyName("year")
    public void setYearEn(String year) { this.year = year; }

    @PropertyName("capacidad")
    public int getCapacity() { return capacity; }
    @PropertyName("capacidad")
    public void setCapacity(int capacity) { this.capacity = capacity; }
    @PropertyName("capacity")
    public void setCapacityEn(int capacity) { this.capacity = capacity; }

    @PropertyName("conductorId")
    public String getDriverId() { return driverId; }
    @PropertyName("conductorId")
    public void setDriverId(String driverId) { this.driverId = driverId; }
    @PropertyName("driverId")
    public void setDriverIdEn(String driverId) { this.driverId = driverId; }

    @PropertyName("estado")
    public String getStatus() { return status; }
    @PropertyName("estado")
    public void setStatus(String status) { this.status = status; }
    @PropertyName("status")
    public void setStatusEn(String status) { this.status = status; }

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

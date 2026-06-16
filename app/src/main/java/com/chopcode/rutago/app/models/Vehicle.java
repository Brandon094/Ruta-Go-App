package com.chopcode.rutago.app.models;

public class Vehicle {
    private String id;
    private String plate;
    private String model;
    private String brand;  // ✅ NUEVO: Campo marca agregado
    private String color;
    private String year;
    private int capacity;
    private String driverId;
    private String status;

    // ✅ Constructor vacío requerido para Firebase
    public Vehicle() {}

    // ✅ Constructor actualizado con marca
    public Vehicle(String id, String plate, String brand, String model, String color, String year,
                    int capacity, String driverId, String status) {
        this.id = id;
        this.plate = plate;
        this.brand = brand;
        this.model = model;
        this.color = color;
        this.year = year;
        this.capacity = capacity;
        this.driverId = driverId;
        this.status = status;
    }

    // Getters y Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getPlate() { return plate; }
    public void setPlate(String plate) { this.plate = plate; }

    public String getBrand() { return brand; }  // ✅ NUEVO: Getter para marca
    public void setBrand(String brand) { this.brand = brand; }  // ✅ NUEVO: Setter para marca

    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }

    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }

    public String getYear() { return year; }
    public void setYear(String year) { this.year = year; }

    public int getCapacity() { return capacity; }
    public void setCapacity(int capacity) { this.capacity = capacity; }

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

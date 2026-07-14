package com.chopcode.rutago.app.models;

import com.google.firebase.database.IgnoreExtraProperties;
import com.google.firebase.database.PropertyName;

/**
 * Vehicle Model
 *
 * Representa la ficha técnica de un bus o buseta vinculada a un conductor.
 * Mantiene la capacidad técnica que define el mapa de asientos.
 */
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

    /**
     * Constructor vacío requerido por Firebase.
     */
    public Vehicle() {}

    @PropertyName("id")
    public String getId() { return id; }
    @PropertyName("id")
    public void setId(String id) { this.id = id; }

    /**
     * @return Placa única del vehículo (Identificador principal).
     */
    @PropertyName("placa")
    public String getPlate() { return plate; }
    @PropertyName("placa")
    public void setPlate(String plate) { this.plate = plate; }
    @PropertyName("plate")
    public void setPlateEn(String plate) { this.plate = plate; }

    /**
     * @return Línea o referencia del vehículo.
     */
    @PropertyName("modelo")
    public String getModel() { return model; }
    @PropertyName("modelo")
    public void setModel(String model) { this.model = model; }
    @PropertyName("model")
    public void setModelEn(String model) { this.model = model; }

    /**
     * @return Fabricante del vehículo (ej: Nissan, Toyota).
     */
    @PropertyName("marca")
    public String getBrand() { return brand; }
    @PropertyName("marca")
    public void setBrand(String brand) { this.brand = brand; }
    @PropertyName("brand")
    public void setBrandEn(String brand) { this.brand = brand; }

    /**
     * @return Color predominante del vehículo.
     */
    @PropertyName("color")
    public String getColor() { return color; }
    @PropertyName("color")
    public void setColor(String color) { this.color = color; }

    /**
     * @return Año de fabricación/modelo.
     */
    @PropertyName("ano")
    public String getYear() { return year; }
    @PropertyName("ano")
    public void setYear(String year) { this.year = year; }
    @PropertyName("year")
    public void setYearEn(String year) { this.year = year; }

    /**
     * @return Cantidad máxima de pasajeros permitidos (define el tamaño del mapa de asientos).
     */
    @PropertyName("capacidad")
    public int getCapacity() { return capacity; }
    @PropertyName("capacidad")
    public void setCapacity(int capacity) { this.capacity = capacity; }
    @PropertyName("capacity")
    public void setCapacityEn(int capacity) { this.capacity = capacity; }

    /**
     * @return UID del conductor que opera este vehículo.
     */
    @PropertyName("conductorId")
    public String getDriverId() { return driverId; }
    @PropertyName("conductorId")
    public void setDriverId(String driverId) { this.driverId = driverId; }
    @PropertyName("driverId")
    public void setDriverIdEn(String driverId) { this.driverId = driverId; }

    /**
     * @return Estado operativo del vehículo.
     */
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

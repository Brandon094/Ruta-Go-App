package com.chopcode.rutago.app.models;

import java.util.List;

public class Driver extends User {
    private String vehicleId;
    private String vehiclePlate, vehicleModel;
    private int vehicleCapacity;
    private List<String> assignedSchedules;

    public String getVehicleId() {
        return vehicleId;
    }

    public void setVehicleId(String vehicleId) {
        this.vehicleId = vehicleId;
    }

    public String getVehiclePlate() {
        return vehiclePlate;
    }

    public void setVehiclePlate(String vehiclePlate) {
        this.vehiclePlate = vehiclePlate;
    }

    public String getVehicleModel() {
        return vehicleModel;
    }

    public void setVehicleModel(String vehicleModel) {
        this.vehicleModel = vehicleModel;
    }

    public int getVehicleCapacity() {
        return vehicleCapacity;
    }

    public void setVehicleCapacity(int vehicleCapacity) {
        this.vehicleCapacity = vehicleCapacity;
    }

    public List<String> getAssignedSchedules() { return assignedSchedules; }
    public void setAssignedSchedules(List<String> assignedSchedules) { this.assignedSchedules = assignedSchedules; }
}

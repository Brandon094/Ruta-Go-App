package com.chopcode.rutago.app.models;

import com.google.firebase.database.IgnoreExtraProperties;
import com.google.firebase.database.PropertyName;
import java.util.List;

@IgnoreExtraProperties
public class Driver extends User {
    private String vehicleId;
    private String vehiclePlate;
    private String vehicleModel;
    private int vehicleCapacity;
    private List<String> assignedSchedules;

    public Driver() {}

    @PropertyName("vehiculoId")
    public String getVehicleId() { return vehicleId; }
    @PropertyName("vehiculoId")
    public void setVehicleId(String vehicleId) { this.vehicleId = vehicleId; }

    @PropertyName("placaVehiculo")
    public String getVehiclePlate() { return vehiclePlate; }
    @PropertyName("placaVehiculo")
    public void setVehiclePlate(String vehiclePlate) { this.vehiclePlate = vehiclePlate; }

    @PropertyName("modeloVehiculo")
    public String getVehicleModel() { return vehicleModel; }
    @PropertyName("modeloVehiculo")
    public void setVehicleModel(String vehicleModel) { this.vehicleModel = vehicleModel; }

    @PropertyName("capacidadVehiculo")
    public int getVehicleCapacity() { return vehicleCapacity; }
    @PropertyName("capacidadVehiculo")
    public void setVehicleCapacity(int vehicleCapacity) { this.vehicleCapacity = vehicleCapacity; }

    @PropertyName("horariosAsignados")
    public List<String> getAssignedSchedules() { return assignedSchedules; }
    @PropertyName("horariosAsignados")
    public void setAssignedSchedules(List<String> assignedSchedules) { this.assignedSchedules = assignedSchedules; }
    
    // Setters extras para compatibilidad con Inglés en código (por si acaso)
    @PropertyName("vehicleId")
    public void setVId(String vId) { this.vehicleId = vId; }
    @PropertyName("vehiclePlate")
    public void setVP(String pV) { this.vehiclePlate = pV; }
    @PropertyName("vehicleModel")
    public void setVM(String mV) { this.vehicleModel = mV; }
    @PropertyName("vehicleCapacity")
    public void setVC(int cV) { this.vehicleCapacity = cV; }
    @PropertyName("assignedSchedules")
    public void setAS(List<String> hA) { this.assignedSchedules = hA; }
}

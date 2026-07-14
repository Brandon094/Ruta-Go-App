package com.chopcode.rutago.app.models;

import com.google.firebase.database.IgnoreExtraProperties;
import com.google.firebase.database.PropertyName;
import java.util.List;

/**
 * Driver Model
 *
 * Especialización de la clase User para conductores.
 * Incluye información técnica del vehículo y la agenda de turnos asignados.
 */
@IgnoreExtraProperties
public class Driver extends User {
    private String vehicleId;
    private String vehiclePlate;
    private String vehicleModel;
    private int vehicleCapacity;
    private List<String> assignedSchedules;

    /**
     * Constructor vacío requerido por Firebase.
     */
    public Driver() {}

    /**
     * @return ID del vehículo vinculado (usado para búsquedas en el nodo /vehiculos/).
     */
    @PropertyName("vehiculoId")
    public String getVehicleId() { return vehicleId; }
    @PropertyName("vehiculoId")
    public void setVehicleId(String vehicleId) { this.vehicleId = vehicleId; }

    /**
     * @return Placa del vehículo para visualización rápida.
     */
    @PropertyName("placaVehiculo")
    public String getVehiclePlate() { return vehiclePlate; }
    @PropertyName("placaVehiculo")
    public void setVehiclePlate(String vehiclePlate) { this.vehiclePlate = vehiclePlate; }

    /**
     * @return Marca y modelo del vehículo (ej: Toyota Hilux).
     */
    @PropertyName("modeloVehiculo")
    public String getVehicleModel() { return vehicleModel; }
    @PropertyName("modeloVehiculo")
    public void setVehicleModel(String vehicleModel) { this.vehicleModel = vehicleModel; }

    /**
     * @return Capacidad técnica de pasajeros.
     */
    @PropertyName("capacidadVehiculo")
    public int getVehicleCapacity() { return vehicleCapacity; }
    @PropertyName("capacidadVehiculo")
    public void setVehicleCapacity(int vehicleCapacity) { this.vehicleCapacity = vehicleCapacity; }

    /**
     * @return Lista de IDs de horarios (h001, h002...) que el conductor tiene asignados para hoy.
     */
    @PropertyName("horariosAsignados")
    public List<String> getAssignedSchedules() { return assignedSchedules; }
    @PropertyName("horariosAsignados")
    public void setAssignedSchedules(List<String> assignedSchedules) { this.assignedSchedules = assignedSchedules; }
    
    // Setters extras para compatibilidad con Inglés en código (Mapeo Dual Firebase)
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

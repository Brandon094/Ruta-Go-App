import { ref, update, remove, set } from "firebase/database";
import { db } from "../firebase";

/**
 * 🚗 Service: vehicleService (v2.0 Clean English Schema)
 */
export const vehicleService = {
  /**
   * Registra un nuevo vehículo en /vehicles/
   */
  registerVehicle: async (vehicleData) => {
    const plate = vehicleData.plate || vehicleData.placa || vehicleData.id;
    const vehicleRef = ref(db, `vehicles/${plate}`);
    try {
      await set(vehicleRef, {
        id: plate,
        plate: plate,
        model: vehicleData.model || vehicleData.modelo || "",
        brand: vehicleData.brand || vehicleData.marca || "",
        color: vehicleData.color || "",
        year: vehicleData.year || vehicleData.ano || vehicleData.año || "",
        capacity: Number(vehicleData.capacity || vehicleData.capacidad || 13),
        driverId: vehicleData.driverId || vehicleData.conductorId || "",
        ownerId: vehicleData.ownerId || "",
        status: 'active',
        registrationDate: Date.now()
      });
      return { success: true };
    } catch (error) {
      console.error("Error registrando vehículo:", error);
      throw error;
    }
  },

  /**
   * Actualiza la información de un vehículo en /vehicles/
   */
  updateVehicle: async (plate, data) => {
    const vehicleRef = ref(db, `vehicles/${plate}`);
    try {
      await update(vehicleRef, data);
      return { success: true };
    } catch (error) {
      console.error("Error actualizando vehículo:", error);
      throw error;
    }
  },

  /**
   * Elimina un vehículo de /vehicles/
   */
  deleteVehicle: async (plate) => {
    const vehicleRef = ref(db, `vehicles/${plate}`);
    try {
      await remove(vehicleRef);
      return { success: true };
    } catch (error) {
      console.error("Error eliminando vehículo:", error);
      throw error;
    }
  }
};

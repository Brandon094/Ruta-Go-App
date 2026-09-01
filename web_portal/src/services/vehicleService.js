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
    const plate = (vehicleData.plate || vehicleData.placa || vehicleData.id || "").toUpperCase().trim();
    if (!plate) throw new Error("La placa del vehículo es obligatoria.");

    const vehicleObj = {
      id: plate,
      plate: plate,
      model: vehicleData.model || vehicleData.modelo || "",
      brand: vehicleData.brand || vehicleData.marca || "",
      color: vehicleData.color || "",
      year: String(vehicleData.year || vehicleData.ano || vehicleData.año || ""),
      capacity: Number(vehicleData.capacity || vehicleData.capacidad || 13),
      driverId: vehicleData.driverId || vehicleData.conductorId || "",
      ownerId: vehicleData.ownerId || "",
      status: 'active',
      registrationDate: Date.now()
    };

    const updates = {};
    updates[`vehicles/${plate}`] = vehicleObj;

    // Sincronizar asignación de vehículo en el perfil del conductor si aplica
    if (vehicleObj.driverId) {
      updates[`users/${vehicleObj.driverId}/vehicleId`] = plate;
      updates[`users/${vehicleObj.driverId}/vehiclePlate`] = plate;
    }

    try {
      await update(ref(db), updates);
      return { success: true };
    } catch (error) {
      console.error("Error registrando vehículo:", error);
      throw error;
    }
  },

  /**
   * Actualiza la información de un vehículo en /vehicles/
   */
  updateVehicle: async (plate, vehicleData) => {
    const p = plate.toUpperCase().trim();
    const cleanData = {
      id: p,
      plate: p,
      model: vehicleData.model || vehicleData.modelo || "",
      brand: vehicleData.brand || vehicleData.marca || "",
      color: vehicleData.color || "",
      year: String(vehicleData.year || vehicleData.ano || vehicleData.año || ""),
      capacity: Number(vehicleData.capacity || vehicleData.capacidad || 13),
      driverId: vehicleData.driverId || vehicleData.conductorId || "",
      ownerId: vehicleData.ownerId || "",
      status: vehicleData.status || vehicleData.estado || 'active'
    };

    const updates = {};
    updates[`vehicles/${p}`] = cleanData;

    // Sincronizar asignación de vehículo en el perfil del conductor
    if (cleanData.driverId) {
      updates[`users/${cleanData.driverId}/vehicleId`] = p;
      updates[`users/${cleanData.driverId}/vehiclePlate`] = p;
    }

    try {
      await update(ref(db), updates);
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

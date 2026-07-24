import { ref, update, remove, get, set } from "firebase/database";
import { db } from "../firebase";

/**
 * 🚗 Service: vehicleService
 */
export const vehicleService = {
  /**
   * Registra un nuevo vehículo en el sistema.
   */
  registerVehicle: async (vehicleData) => {
    const vehicleRef = ref(db, `vehiculos/${vehicleData.placa}`);
    try {
      await set(vehicleRef, {
        ...vehicleData,
        estado: 'activo',
        fechaRegistro: Date.now()
      });
      return { success: true };
    } catch (error) {
      console.error("Error registrando vehículo:", error);
      throw error;
    }
  },

  /**
   * Actualiza la información de un vehículo.
   */
  updateVehicle: async (placa, data) => {
    const vehicleRef = ref(db, `vehiculos/${placa}`);
    try {
      await update(vehicleRef, data);
      return { success: true };
    } catch (error) {
      console.error("Error actualizando vehículo:", error);
      throw error;
    }
  },

  /**
   * Elimina un vehículo.
   */
  deleteVehicle: async (placa) => {
    const vehicleRef = ref(db, `vehiculos/${placa}`);
    try {
      await remove(vehicleRef);
      return { success: true };
    } catch (error) {
      console.error("Error eliminando vehículo:", error);
      throw error;
    }
  }
};

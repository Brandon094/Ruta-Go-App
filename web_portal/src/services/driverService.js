import { ref, update, remove, get } from "firebase/database";
import { db } from "../firebase";

/**
 * 🛠️ Service: driverService
 *
 * Gestiona las operaciones de escritura para conductores desde el portal administrativo.
 */
export const driverService = {
  /**
   * Actualiza la información de un conductor, incluyendo sus horarios.
   */
  updateDriver: async (driverId, data) => {
    const driverRef = ref(db, `conductores/${driverId}`);
    try {
      await update(driverRef, data);
      return { success: true };
    } catch (error) {
      console.error("Error actualizando conductor:", error);
      throw error;
    }
  },

  /**
   * Elimina un conductor de la base de datos.
   * Nota: No elimina el usuario de Auth, solo el perfil operativo.
   */
  deleteDriver: async (driverId) => {
    const driverRef = ref(db, `conductores/${driverId}`);
    try {
      await remove(driverRef);
      return { success: true };
    } catch (error) {
      console.error("Error eliminando conductor:", error);
      throw error;
    }
  },

  /**
   * Obtiene la lista maestra de horarios disponibles para asignación.
   */
  getAllSchedules: async () => {
    const schedulesRef = ref(db, 'horarios');
    const snapshot = await get(schedulesRef);
    if (snapshot.exists()) {
      return Object.entries(snapshot.val()).map(([id, val]) => ({ id, ...val }));
    }
    return [];
  },

  /**
   * Registra un nuevo conductor y su vehículo de forma atómica.
   */
  registerDriverAndVehicle: async (driverData, vehicleData) => {
    const updates = {};

    // 1. Preparar entrada en /conductores/
    // Nota: El id debe ser el UID del usuario (previamente registrado en Auth)
    updates[`conductores/${driverData.id}`] = {
      ...driverData,
      status: 'active',
      fechaRegistro: Date.now()
    };

    // 2. Preparar entrada en /vehiculos/
    updates[`vehiculos/${vehicleData.placa}`] = {
      ...vehicleData,
      conductorId: driverData.id,
      estado: 'activo'
    };

    try {
      await update(ref(db), updates);
      return { success: true };
    } catch (error) {
      console.error("Error en registro dual:", error);
      throw error;
    }
  }
};

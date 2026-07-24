import { ref, update, remove, get } from "firebase/database";
import { db } from "../firebase";

/**
 * 🛠️ Service: driverService
 *
 * Gestiona las operaciones de escritura para conductores desde el portal administrativo.
 */
export const driverService = {
  /**
   * Actualiza la información de un conductor y gestiona el vínculo con el vehículo.
   * También sincroniza la capacidad de asientos en los horarios asignados.
   */
  updateDriver: async (driverId, data, oldVehicleId = null) => {
    const updates = {};

    // 1. Datos básicos del conductor
    updates[`conductores/${driverId}`] = data;

    // 2. Gestión de Vínculo de Vehículo
    if (data.vehiculoId) {
      // Si el vehículo cambió, limpiar el anterior
      if (oldVehicleId && oldVehicleId !== data.vehiculoId) {
        updates[`vehiculos/${oldVehicleId}/conductorId`] = null;
        updates[`vehiculos/${oldVehicleId}/driverId`] = null;
      }

      // Vincular al nuevo vehículo (Soporte dual de keys conductorId/driverId para compatibilidad)
      updates[`vehiculos/${data.vehiculoId}/conductorId`] = driverId;
      updates[`vehiculos/${data.vehiculoId}/driverId`] = driverId;

      // 3. ⚡ SINCRONIZACIÓN DE CAPACIDAD EN TIEMPO REAL ⚡
      // Buscamos los datos técnicos del vehículo para obtener su capacidad
      const vehicleSnap = await get(ref(db, `vehiculos/${data.vehiculoId}`));
      if (vehicleSnap.exists()) {
        const capacity = parseInt(vehicleSnap.val().capacidad) || 13;

        // Actualizamos cada horario asignado al conductor con la capacidad del bus
        if (data.horariosAsignados && data.horariosAsignados.length > 0) {
          data.horariosAsignados.forEach(hId => {
            // Ponemos el ID del conductor y del vehículo en el horario
            updates[`horarios/${hId}/conductorId`] = driverId;
            updates[`horarios/${hId}/vehiculoId`] = data.vehiculoId;

            // Reiniciamos la disponibilidad de asientos basándonos en el bus (13/13)
            updates[`disponibilidadAsientos/${hId}/totalAsientos`] = capacity;
            updates[`disponibilidadAsientos/${hId}/asientosDisponibles`] = capacity;
          });
        }
      }
    }

    try {
      await update(ref(db), updates);
      return { success: true };
    } catch (error) {
      console.error("Error actualizando conductor y capacidad:", error);
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

    // 3. ⚡ SINCRONIZACIÓN DE CAPACIDAD INICIAL ⚡
    const capacity = parseInt(vehicleData.capacidad) || 13;
    if (driverData.horariosAsignados && driverData.horariosAsignados.length > 0) {
      driverData.horariosAsignados.forEach(hId => {
        updates[`horarios/${hId}/conductorId`] = driverData.id;
        updates[`horarios/${hId}/vehiculoId`] = vehicleData.placa;
        updates[`disponibilidadAsientos/${hId}/totalAsientos`] = capacity;
        updates[`disponibilidadAsientos/${hId}/asientosDisponibles`] = capacity;
      });
    }

    try {
      await update(ref(db), updates);
      return { success: true };
    } catch (error) {
      console.error("Error en registro dual:", error);
      throw error;
    }
  }
};

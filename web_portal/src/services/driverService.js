import { ref, update, get } from "firebase/database";
import { db } from "../firebase";

/**
 * 🛠️ Service: driverService (v2.0 Clean English Schema)
 * Gestiona el rol de conductor y asignaciones directamente en /users/
 */
export const driverService = {
  /**
   * Actualiza la información de un conductor y gestiona el vínculo con el vehículo.
   */
  updateDriver: async (driverId, data, oldVehicleId = null) => {
    const vehiclePlate = data.vehiclePlate || data.placaVehiculo || data.vehiculoId;

    // 1. Gestión de Vínculo de vehículo e itinerarios (/vehicles/ y /schedules/)
    if (vehiclePlate) {
      const vehicleUpdates = {};
      if (oldVehicleId && oldVehicleId !== vehiclePlate) {
        vehicleUpdates[`vehicles/${oldVehicleId}/driverId`] = null;
      }
      vehicleUpdates[`vehicles/${vehiclePlate}/driverId`] = driverId;

      const vehicleSnap = await get(ref(db, `vehicles/${vehiclePlate}`));
      if (vehicleSnap.exists()) {
        const capacity = parseInt(vehicleSnap.val().capacity || vehicleSnap.val().capacidad) || 13;
        const schedules = data.assignedSchedules || data.horariosAsignados || [];

        schedules.forEach(hId => {
          vehicleUpdates[`schedules/${hId}/driverId`] = driverId;
          vehicleUpdates[`schedules/${hId}/vehicleId`] = vehiclePlate;
          vehicleUpdates[`seatAvailability/${hId}/totalSeats`] = capacity;
          vehicleUpdates[`seatAvailability/${hId}/availableSeats`] = capacity;
        });
      }

      try {
        await update(ref(db), vehicleUpdates);
      } catch (err) {
        console.warn("⚠️ Error actualizando vehículos u horarios vinculados:", err.message);
      }
    }

    // 2. Elevación/Confirmación de rol e información en /users/{driverId}
    const userUpdates = {};
    userUpdates[`users/${driverId}/role`] = 'driver';
    userUpdates[`users/${driverId}/status`] = data.status || 'active';
    userUpdates[`users/${driverId}/vehicleId`] = vehiclePlate || "";
    userUpdates[`users/${driverId}/vehiclePlate`] = vehiclePlate || "";
    if (data.name || data.nombre) userUpdates[`users/${driverId}/name`] = data.name || data.nombre;
    if (data.phone || data.telefono) userUpdates[`users/${driverId}/phone`] = data.phone || data.telefono;
    if (data.horariosAsignados || data.assignedSchedules) {
      userUpdates[`users/${driverId}/assignedSchedules`] = data.assignedSchedules || data.horariosAsignados;
    }

    try {
      await update(ref(db), userUpdates);
      return { success: true };
    } catch (error) {
      console.error("Error actualizando perfil de conductor en /users/:", error);
      throw error;
    }
  },

  /**
   * Quita el rol de conductor y restaura a pasajero.
   */
  deleteDriver: async (driverId) => {
    try {
      const updates = {};
      updates[`users/${driverId}/role`] = 'passenger';
      updates[`users/${driverId}/vehicleId`] = null;
      updates[`users/${driverId}/vehiclePlate`] = null;
      updates[`users/${driverId}/assignedSchedules`] = null;
      await update(ref(db), updates);
      return { success: true };
    } catch (error) {
      console.error("Error quitando rol de conductor:", error);
      throw error;
    }
  },

  /**
   * Obtiene la lista maestra de horarios disponibles para asignación desde /schedules/
   */
  getAllSchedules: async () => {
    const schedulesRef = ref(db, 'schedules');
    const snapshot = await get(schedulesRef);
    if (snapshot.exists()) {
      return Object.entries(snapshot.val()).map(([id, val]) => ({ id, ...val }));
    }
    return [];
  },

  /**
   * Registra/eleva un nuevo conductor y su vehículo en /users/ y /vehicles/
   */
  registerDriverAndVehicle: async (driverData, vehicleData) => {
    const driverId = driverData.id;
    const plate = (vehicleData.plate || vehicleData.placa || driverData.placaVehiculo || "").toUpperCase().trim();

    // 1. Registrar/actualizar vehículo en /vehicles/{plate} y /schedules/
    if (plate) {
      const vSnap = await get(ref(db, `vehicles/${plate}`));
      const existingVehicle = vSnap.exists() ? vSnap.val() : {};
      const capacity = parseInt(vehicleData.capacity || vehicleData.capacidad || existingVehicle.capacity) || 13;
      const schedules = driverData.assignedSchedules || driverData.horariosAsignados || [];

      const vehicleUpdates = {};
      vehicleUpdates[`vehicles/${plate}`] = {
        ...existingVehicle,
        id: plate,
        plate: plate,
        model: vehicleData.model || vehicleData.modelo || existingVehicle.model || "",
        brand: vehicleData.brand || vehicleData.marca || existingVehicle.brand || "",
        capacity: capacity,
        driverId: driverId,
        ownerId: vehicleData.ownerId || existingVehicle.ownerId || "",
        status: 'active'
      };

      if (schedules.length > 0) {
        schedules.forEach(hId => {
          vehicleUpdates[`schedules/${hId}/driverId`] = driverId;
          vehicleUpdates[`schedules/${hId}/vehicleId`] = plate;
          vehicleUpdates[`seatAvailability/${hId}/totalSeats`] = capacity;
          vehicleUpdates[`seatAvailability/${hId}/availableSeats`] = capacity;
        });
      }

      try {
        await update(ref(db), vehicleUpdates);
      } catch (e) {
        console.warn("⚠️ Error vinculando vehículo:", e.message);
      }
    }

    // 2. Elevar rol de usuario a 'driver' en /users/{driverId}
    const userUpdates = {};
    userUpdates[`users/${driverId}/role`] = 'driver';
    userUpdates[`users/${driverId}/status`] = 'active';
    userUpdates[`users/${driverId}/vehicleId`] = plate;
    userUpdates[`users/${driverId}/vehiclePlate`] = plate;
    if (driverData.assignedSchedules || driverData.horariosAsignados) {
      userUpdates[`users/${driverId}/assignedSchedules`] = driverData.assignedSchedules || driverData.horariosAsignados;
    }

    try {
      await update(ref(db), userUpdates);
      return { success: true };
    } catch (error) {
      console.error("Error elevando rol en /users/:", error);
      throw error;
    }
  }
};

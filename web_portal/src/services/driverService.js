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
    const updates = {};

    // 1. Elevación/Confirmación de rol e información en /users/{driverId}
    const vehiclePlate = data.vehiclePlate || data.placaVehiculo || data.vehiculoId;
    updates[`users/${driverId}/role`] = 'driver';
    updates[`users/${driverId}/vehicleId`] = vehiclePlate || "";
    updates[`users/${driverId}/vehiclePlate`] = vehiclePlate || "";
    if (data.name || data.nombre) updates[`users/${driverId}/name`] = data.name || data.nombre;
    if (data.phone || data.telefono) updates[`users/${driverId}/phone`] = data.phone || data.telefono;
    if (data.horariosAsignados || data.assignedSchedules) {
      updates[`users/${driverId}/assignedSchedules`] = data.assignedSchedules || data.horariosAsignados;
    }

    // 2. Gestión de Vínculo de en /vehicles/
    if (vehiclePlate) {
      if (oldVehicleId && oldVehicleId !== vehiclePlate) {
        updates[`vehicles/${oldVehicleId}/driverId`] = null;
      }
      updates[`vehicles/${vehiclePlate}/driverId`] = driverId;

      const vehicleSnap = await get(ref(db, `vehicles/${vehiclePlate}`));
      if (vehicleSnap.exists()) {
        const capacity = parseInt(vehicleSnap.val().capacity || vehicleSnap.val().capacidad) || 13;
        const schedules = data.assignedSchedules || data.horariosAsignados || [];

        schedules.forEach(hId => {
          updates[`schedules/${hId}/driverId`] = driverId;
          updates[`schedules/${hId}/vehicleId`] = vehiclePlate;
          updates[`seatAvailability/${hId}/totalSeats`] = capacity;
          updates[`seatAvailability/${hId}/availableSeats`] = capacity;
        });
      }
    }

    try {
      await update(ref(db), updates);
      return { success: true };
    } catch (error) {
      console.error("Error actualizando conductor:", error);
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
    const updates = {};
    const driverId = driverData.id;
    const plate = vehicleData.plate || vehicleData.placa;

    // 1. Elevar rol de usuario a 'driver' en /users/{driverId}
    updates[`users/${driverId}/role`] = 'driver';
    updates[`users/${driverId}/status`] = 'active';
    updates[`users/${driverId}/vehicleId`] = plate;
    updates[`users/${driverId}/vehiclePlate`] = plate;
    if (driverData.horariosAsignados) {
      updates[`users/${driverId}/assignedSchedules`] = driverData.horariosAsignados;
    }

    // 2. Registrar/actualizar vehículo en /vehicles/{plate}
    const vSnap = await get(ref(db, `vehicles/${plate}`));
    const existingVehicle = vSnap.exists() ? vSnap.val() : {};

    const capacity = parseInt(vehicleData.capacity || vehicleData.capacidad) || 13;
    updates[`vehicles/${plate}`] = {
      ...existingVehicle,
      id: plate,
      plate: plate,
      model: vehicleData.model || vehicleData.modelo || "",
      brand: vehicleData.brand || vehicleData.marca || "",
      capacity: capacity,
      driverId: driverId,
      status: 'active'
    };

    // 3. Sincronizar horarios asignados en /schedules/
    if (driverData.horariosAsignados && driverData.horariosAsignados.length > 0) {
      driverData.horariosAsignados.forEach(hId => {
        updates[`schedules/${hId}/driverId`] = driverId;
        updates[`schedules/${hId}/vehicleId`] = plate;
        updates[`seatAvailability/${hId}/totalSeats`] = capacity;
        updates[`seatAvailability/${hId}/availableSeats`] = capacity;
      });
    }

    try {
      await update(ref(db), updates);
      return { success: true };
    } catch (error) {
      console.error("Error en registro de conductor NoSQL v2.0:", error);
      throw error;
    }
  }
};

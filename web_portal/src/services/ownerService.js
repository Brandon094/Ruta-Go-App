import { ref, set, update } from "firebase/database";
import { db } from '../firebase';

/**
 * 💼 Service: ownerService
 * Capa de abstracción para la gestión de Socios/Dueños.
 * Sigue el patrón Singleton.
 */
export const ownerService = {
  /**
   * Cambia el estatus de aprobación de un socio.
   */
  async toggleOwnerStatus(ownerId, currentStatus) {
    const newStatus = !currentStatus;

    // 1. Actualizar estatus en el nodo de dueños
    const ownerRef = ref(db, `dueños/${ownerId}`);
    await set(ownerRef, newStatus);

    // 2. Sincronizar el rol en el nodo maestro de usuarios
    const userRef = ref(db, `usuarios/${ownerId}`);
    await update(userRef, {
      rol: newStatus ? 'dueño' : 'dueño_pendiente'
    });

    return newStatus;
  }
};

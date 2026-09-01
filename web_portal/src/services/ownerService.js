import { ref, update } from "firebase/database";
import { db } from '../firebase';

/**
 * 💼 Service: ownerService (v2.0 Clean English Schema)
 */
export const ownerService = {
  /**
   * Eleva o revoca el rol de Socio/Dueño en /users/{ownerId}
   */
  async toggleOwnerStatus(ownerId, currentStatus) {
    const newStatus = !currentStatus;
    const userRef = ref(db, `users/${ownerId}`);
    await update(userRef, {
      role: newStatus ? 'owner' : 'passenger'
    });
    return newStatus;
  }
};

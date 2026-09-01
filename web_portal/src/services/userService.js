import { ref, update, remove } from "firebase/database";
import { db } from '../firebase';

/**
 * 👥 Service: userService (v2.0 Clean English Schema)
 */
export const userService = {
  /**
   * Actualiza el estado (active, inactive, banned) de un usuario en /users/
   */
  async updateStatus(userId, newStatus) {
    return update(ref(db, `users/${userId}`), { status: newStatus });
  },

  /**
   * Elimina permanentemente un usuario de /users/
   */
  async deleteUser(userId) {
    return remove(ref(db, `users/${userId}`));
  }
};

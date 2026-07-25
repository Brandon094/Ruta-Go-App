import { ref, update, remove } from "firebase/database";
import { db } from '../firebase';

/**
 * 👥 Service: userService
 * Gestión centralizada de usuarios/pasajeros.
 */
export const userService = {
  /**
   * Actualiza el estado (active, inactive, banned) de un usuario.
   */
  async updateStatus(userId, newStatus) {
    return update(ref(db, `usuarios/${userId}`), { status: newStatus });
  },

  /**
   * Elimina permanentemente un usuario.
   */
  async deleteUser(userId) {
    return remove(ref(db, `usuarios/${userId}`));
  }
};

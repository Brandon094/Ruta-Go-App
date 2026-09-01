import { ref, get, update } from "firebase/database";
import { db } from '../firebase';

/**
 * 💼 Service: ownerService (v2.0 Clean English Schema)
 */
export const ownerService = {
  /**
   * Busca un usuario por correo electrónico en /users/ y lo asciende al rol de 'owner'
   */
  async promoteUserToOwnerByEmail(email) {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      throw new Error("Por favor ingresa un correo electrónico válido.");
    }

    const usersSnap = await get(ref(db, 'users'));
    if (!usersSnap.exists()) {
      throw new Error("No hay usuarios registrados en la base de datos.");
    }

    let targetUser = null;
    Object.entries(usersSnap.val()).forEach(([uid, uData]) => {
      if ((uData.email || "").toLowerCase() === cleanEmail) {
        targetUser = { uid, ...uData };
      }
    });

    if (!targetUser) {
      throw new Error(`No se encontró ningún usuario registrado con el correo '${cleanEmail}'. Pídele que se registre primero en Ruta-Go.`);
    }

    const userRef = ref(db, `users/${targetUser.uid}`);
    await update(userRef, {
      role: 'owner',
      status: 'active'
    });

    return {
      success: true,
      userName: targetUser.name || targetUser.nombre || cleanEmail,
      uid: targetUser.uid
    };
  },

  /**
   * Eleva o revoca el rol de Socio/Dueño en /users/{ownerId}
   */
  async toggleOwnerStatus(ownerId, currentStatus) {
    const isApproved = currentStatus === true || currentStatus === 'active';
    const userRef = ref(db, `users/${ownerId}`);
    await update(userRef, {
      role: isApproved ? 'passenger' : 'owner',
      status: isApproved ? 'inactive' : 'active'
    });
    return !isApproved;
  }
};

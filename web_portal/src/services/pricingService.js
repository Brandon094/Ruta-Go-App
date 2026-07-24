import { ref, update, get } from "firebase/database";
import { db } from "../firebase";

/**
 * 💰 Service: pricingService
 */
export const pricingService = {
  /**
   * Obtiene todos los precios
   */
  getPrices: async () => {
    const pricesRef = ref(db, 'precios');
    const snapshot = await get(pricesRef);
    if (snapshot.exists()) return snapshot.val();
    return {};
  },

  /**
   * Actualiza el precio de una ruta específica
   * @param {string} origin - Ciudad de origen
   * @param {string} destination - Ciudad de destino
   * @param {number} newPrice - Nuevo valor
   */
  updatePrice: async (origin, destination, newPrice) => {
    // Normalizamos a minúsculas como en la DB
    const o = origin.toLowerCase().trim();
    const d = destination.toLowerCase().trim();

    const updates = {};
    updates[`precios/${o}/${d}`] = Number(newPrice);
    // Como las rutas son bi-direccionales en tu DB, actualizamos ambas
    updates[`precios/${d}/${o}`] = Number(newPrice);

    try {
      await update(ref(db), updates);
      return { success: true };
    } catch (error) {
      console.error("Error actualizando precio:", error);
      throw error;
    }
  }
};

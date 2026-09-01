import { ref, update } from "firebase/database";
import { db } from "../firebase";

/**
 * 💰 Service: pricingService (v2.0 Clean English Schema)
 * Motor de administración de tarifas y rutas dinámicas.
 */
export const pricingService = {
  /**
   * Crea una nueva ruta dinámica en la base de datos (Escribe en /prices/)
   */
  createRoute: async ({ origin, destination, price, duration = "60 min" }) => {
    const o = origin.trim();
    const d = destination.trim();
    const numericPrice = Number(price);

    const updates = {};
    // Guardar únicamente en el nodo permitido 'prices'
    updates[`prices/${o}/${d}`] = numericPrice;
    updates[`prices/${d}/${o}`] = numericPrice;

    try {
      await update(ref(db), updates);
      return { success: true };
    } catch (error) {
      console.error("❌ Error creando ruta:", error);
      throw error;
    }
  },

  /**
   * Actualiza la tarifa de una ruta existente en /prices/
   */
  updatePrice: async (origin, destination, newPrice) => {
    const o = origin.trim();
    const d = destination.trim();
    const numericPrice = Number(newPrice);

    const updates = {};
    updates[`prices/${o}/${d}`] = numericPrice;
    updates[`prices/${d}/${o}`] = numericPrice;

    try {
      await update(ref(db), updates);
      return { success: true };
    } catch (error) {
      console.error("❌ Error actualizando precio:", error);
      throw error;
    }
  }
};

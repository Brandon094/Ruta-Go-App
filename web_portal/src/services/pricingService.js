import { ref, update, push } from "firebase/database";
import { db } from "../firebase";

/**
 * 💰 Service: pricingService (v2.0 Clean English Schema)
 * Motor de administración de tarifas y rutas dinámicas.
 */
export const pricingService = {
  /**
   * Crea una nueva ruta dinámica en la base de datos (Escribe en /prices/ y /routes/)
   */
  createRoute: async ({ origin, destination, price, duration = "60 min" }) => {
    const o = origin.trim();
    const d = destination.trim();
    const numericPrice = Number(price);

    const routeRef = push(ref(db, 'routes'));
    const routeId = routeRef.key;

    const updates = {};
    // 1. Matriz de Tarifas / Precios
    updates[`prices/${o}/${d}`] = numericPrice;
    updates[`prices/${d}/${o}`] = numericPrice;

    // 2. Directorio Maestro de Rutas
    updates[`routes/${routeId}`] = {
      id: routeId,
      origin: o,
      destination: d,
      price: numericPrice,
      estimatedDuration: duration,
      status: "active"
    };

    try {
      await update(ref(db), updates);
      return { success: true, routeId };
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

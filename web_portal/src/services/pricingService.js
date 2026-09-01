import { ref, update, push } from "firebase/database";
import { db } from "../firebase";

/**
 * 💰 Service: pricingService
 * Motor de administración de tarifas y rutas dinámicas.
 */
export const pricingService = {
  /**
   * Crea una nueva ruta dinámica en la base de datos
   */
  createRoute: async ({ origin, destination, price, duration = "60 min" }) => {
    const o = origin.trim();
    const d = destination.trim();
    const numericPrice = Number(price);

    const routeRef = push(ref(db, 'routes'));
    const routeId = routeRef.key;

    const updates = {};
    // 1. Guardar en prices/ y precios/
    updates[`prices/${o}/${d}`] = numericPrice;
    updates[`prices/${d}/${o}`] = numericPrice;
    updates[`precios/${o}/${d}`] = numericPrice;
    updates[`precios/${d}/${o}`] = numericPrice;

    // 2. Guardar objeto de ruta en routes/
    updates[`routes/${routeId}`] = {
      id: routeId,
      origin: o,
      destination: d,
      price: numericPrice,
      duration: duration
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
   * Actualiza la tarifa de una ruta existente
   */
  updatePrice: async (origin, destination, newPrice) => {
    const o = origin.trim();
    const d = destination.trim();
    const numericPrice = Number(newPrice);

    const updates = {};
    updates[`prices/${o}/${d}`] = numericPrice;
    updates[`prices/${d}/${o}`] = numericPrice;
    updates[`precios/${o}/${d}`] = numericPrice;
    updates[`precios/${d}/${o}`] = numericPrice;

    try {
      await update(ref(db), updates);
      return { success: true };
    } catch (error) {
      console.error("❌ Error actualizando precio:", error);
      throw error;
    }
  }
};

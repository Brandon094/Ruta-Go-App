/**
 * 🛠️ Utils: FormatUtils
 * Centraliza la lógica de transformación y formateo de datos para la web.
 * Mirror exacto de FormatUtils.java (v1.6.5)
 */
export const FormatUtils = {
  /**
   * Formatea precios a moneda COP con soporte para abreviaciones (K, M).
   */
  formatPrice: (value) => {
    if (value === null || value === undefined) return "$0";

    const numValue = typeof value === 'string'
      ? parseFloat(value.replace(/[^\d.]/g, '')) || 0
      : Number(value);

    if (numValue >= 1000000) {
      return (numValue / 1000000).toFixed(1).replace(/\.0$/, '') + "M COP";
    } else if (numValue >= 100000) {
      return Math.round(numValue / 1000) + "K COP";
    }

    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(numValue) + " COP";
  },

  /**
   * Formatea fecha larga en español.
   */
  formatLongDate: (date) => {
    if (!date) return "Fecha no disponible";
    const d = new Date(date);
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    const str = d.toLocaleDateString('es-ES', options);
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  /**
   * Calcula tiempo estimado basado en la ruta.
   */
  calculateEstimatedTime: (route) => {
    if (!route) return "55 min";
    return route.includes("Natagá -> La Plata") ? "60 min" : "55 min";
  },

  /**
   * Normaliza texto para comparaciones seguras.
   */
  normalizeText: (text) => {
    if (!text) return "";
    return text.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  },

  /**
   * Formatea número de asiento (A1, A2, etc).
   */
  formatSeat: (seat) => {
    return seat ? `A${seat}` : "N/A";
  }
};

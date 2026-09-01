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
  },

  /**
   * Determina si un horario ya pasó basándose en la hora actual y la regla de las 7 PM.
   * Mirror de esHorarioPasado en Java.
   */
  isPastSchedule: (horaStr) => {
    if (!horaStr) return false;

    const now = new Date();
    const hAct = now.getHours();

    // Regla de Oro: Tras la rotación de las 7 PM, la planilla es para mañana.
    if (hAct >= 19) return false;

    try {
      const cleanHora = horaStr.trim().toUpperCase().replace(/\s+/g, ' ');
      const parts = cleanHora.split(' ');
      if (parts.length < 2) return false;

      const time = parts[0];
      const ampm = parts[1];

      let [hours, minutes] = time.split(':').map(Number);

      if (ampm === 'PM' && hours < 12) hours += 12;
      if (ampm === 'AM' && hours === 12) hours = 0;

      const tripMinutes = hours * 60 + (minutes || 0);
      const currentMinutes = hAct * 60 + now.getMinutes();

      return tripMinutes <= currentMinutes;
    } catch (e) {
      return false;
    }
  },

  /**
   * Filtra horarios por dirección o nombre de ruta.
   */
  filterSchedulesByRoute: (schedules, direction = 'toLaPlata') => {
    const list = Array.isArray(schedules) ? schedules : [];
    if (!direction || direction === 'all' || direction === 'todas') return list;

    return list.filter(s => {
      const ruta = FormatUtils.normalizeText(s.ruta || s.route || "").replace(/➔/g, '->');

      if (direction === 'toLaPlata') {
        const nIdx = ruta.indexOf('nataga');
        const lpIdx = ruta.indexOf('la plata');
        return (nIdx !== -1 && lpIdx !== -1 && nIdx < lpIdx);
      } else if (direction === 'toNataga') {
        const nIdx = ruta.indexOf('nataga');
        const lpIdx = ruta.indexOf('la plata');
        return (nIdx !== -1 && lpIdx !== -1 && lpIdx < nIdx);
      } else {
        const targetNorm = FormatUtils.normalizeText(direction).replace(/➔/g, '->');
        return ruta === targetNorm || ruta.includes(targetNorm) || targetNorm.includes(ruta);
      }
    });
  }
};

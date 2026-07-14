package com.chopcode.rutago.app.utils.ui;

import android.util.Log;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

/**
 * Format Utils (Single Source of Truth)
 *
 * Clase de utilidad que centraliza la lógica de transformación y formateo de datos para la UI.
 * Sigue principios de Clean Architecture: los Adapters y Actividades delegan aquí el procesamiento 
 * de cadenas, fechas y monedas para garantizar consistencia visual en todo el ecosistema.
 *
 * Responsabilidades:
 * - Formatear precios a moneda colombiana con soporte para abreviaciones financieras (K, M).
 * - Procesar y comparar horarios (AM/PM) integrando reglas de negocio regionales.
 * - Normalizar textos para comparaciones seguras de rutas e identidades.
 * - Gestionar la lógica de "Fecha de Viaje" basada en la hora actual y el reset de jornada.
 */
public class FormatUtils {
    private static final String TAG = "FormatUtils";

    /**
     * Transforma un valor numérico o cadena en formato de moneda COP legible.
     * Implementa lógica de abreviación para visualizaciones en dashboards:
     * - >= 1M: "1.2M COP"
     * - >= 100K: "100K COP"
     */
    public static String formatearPrecio(Object precio) {
        if (precio == null) return "$0";
        
        try {
            double valor;
            if (precio instanceof String) {
                String limpio = ((String) precio).replaceAll("[^\\d.]", "");
                valor = limpio.isEmpty() ? 0 : Double.parseDouble(limpio);
            } else if (precio instanceof Number) {
                valor = ((Number) precio).doubleValue();
            } else {
                return String.valueOf(precio);
            }

            if (valor >= 1000000) {
                return String.format(Locale.US, "%.1fM COP", valor / 1000000.0).replace(".0", "");
            } else if (valor >= 100000) {
                return String.format(Locale.US, "%.0fK COP", valor / 1000.0);
            }

            NumberFormat nf = NumberFormat.getCurrencyInstance(new Locale("es", "CO"));
            nf.setMaximumFractionDigits(0);
            return nf.format(valor).replace(",00", "") + " COP";
        } catch (Exception e) {
            Log.e(TAG, "❌ Error al formatear precio: " + e.getMessage());
            return "$" + precio + " COP";
        }
    }

    /**
     * Descompone una cadena de hora para layouts con diseño tipográfico diferenciado.
     * @return Array ["HH:mm", "AM/PM"].
     */
    public static String[] separarHoraYAmPm(String horaCompleta) {
        String[] resultado = {"--:--", ""};
        if (horaCompleta == null || horaCompleta.trim().isEmpty()) return resultado;

        try {
            String limpia = horaCompleta.trim().toUpperCase();
            int espacioIndex = limpia.indexOf(" ");
            if (espacioIndex > 0) {
                resultado[0] = limpia.substring(0, espacioIndex).trim();
                resultado[1] = limpia.substring(espacioIndex).trim();
            } else {
                resultado[0] = limpia;
            }
        } catch (Exception e) {
            Log.e(TAG, "❌ Error al segmentar hora: " + e.getMessage());
        }
        return resultado;
    }

    /**
     * Convierte un objeto Date en una cadena descriptiva en español.
     */
    public static String formatearFechaLarga(Date fecha) {
        if (fecha == null) return "Fecha no disponible";
        SimpleDateFormat sdf = new SimpleDateFormat("EEEE, d 'de' MMMM 'del' yyyy", new Locale("es", "ES"));
        String fechaStr = sdf.format(fecha);
        return fechaStr.substring(0, 1).toUpperCase() + fechaStr.substring(1);
    }

    public static String formatearFechaCortaALegible(String fecha) {
        if (fecha == null || fecha.isEmpty()) return "Fecha no disponible";
        
        if (fecha.matches(".*[a-zA-ZáéíóúÁÉÍÓÚ].*")) {
            return fecha;
        }

        try {
            SimpleDateFormat inputFormat = new SimpleDateFormat("yyyy-MM-dd", Locale.getDefault());
            SimpleDateFormat outputFormat = new SimpleDateFormat("dd 'de' MMMM, yyyy", new Locale("es", "ES"));
            Date date = inputFormat.parse(fecha);
            if (date != null) {
                return outputFormat.format(date);
            }
        } catch (Exception e) {
            Log.e(TAG, "❌ Error al transformar fecha corta: " + e.getMessage());
        }
        return fecha;
    }

    /**
     * Regla de Negocio: Determina si el viaje corresponde a hoy o mañana.
     * Si la hora seleccionada ya pasó en el reloj del sistema, se asume que es una reserva para el día siguiente.
     */
    public static String obtenerFechaViaje(String horarioHora) {
        Calendar calendar = Calendar.getInstance();
        if (horarioHora != null && esHorarioPasado(horarioHora)) {
            calendar.add(Calendar.DAY_OF_MONTH, 1);
        }
        return formatearFechaLarga(calendar.getTime());
    }

    /**
     * Compara una hora de despacho contra el tiempo real.
     * Incorpora la excepción de las 7:00 PM (Reset Global): tras esta hora, todos los turnos se marcan 
     * como vigentes (para el día siguiente).
     */
    public static boolean esHorarioPasado(String horario) {
        try {
            Calendar ahora = Calendar.getInstance();
            int hAct = ahora.get(Calendar.HOUR_OF_DAY);
            
            // Regla de Oro: Tras la rotación de las 7 PM, la planilla es para mañana.
            if (hAct >= 19) {
                return false;
            }

            String limpia = horario.trim().toUpperCase().replace(" 0", " ");
            if (limpia.startsWith("0")) limpia = limpia.substring(1);
            
            SimpleDateFormat sdf = new SimpleDateFormat("h:mm a", Locale.US);
            Date horaDate = sdf.parse(limpia);
            if (horaDate == null) return false;

            Calendar calHora = Calendar.getInstance();
            calHora.setTime(horaDate);
            
            int hSel = calHora.get(Calendar.HOUR_OF_DAY);
            int mSel = calHora.get(Calendar.MINUTE);
            int mAct = ahora.get(Calendar.MINUTE);

            return (hSel < hAct) || (hSel == hAct && mSel <= mAct);
        } catch (Exception e) {
            return false;
        }
    }

    public static String calcularTiempoEstimado(String ruta) {
        if (ruta == null) return "55 min";
        return ruta.contains("Natagá -> La Plata") ? "60 min" : "55 min";
    }

    public static String formatearAsiento(int asiento) {
        return "A" + asiento;
    }

    /**
     * Construye un identificador visual combinando modelo y placa.
     */
    public static String formatearInfoVehiculo(String placa, String modelo) {
        if (modelo != null && !modelo.isEmpty() && !modelo.equalsIgnoreCase("null")) {
            return modelo + " • " + placa;
        }
        return placa != null ? placa : "Información no disponible";
    }

    /**
     * Normaliza formatos de 24h a 12h (AM/PM).
     */
    public static String formatearHora12h(String hora) {
        if (hora == null || hora.isEmpty()) return "Hora no disponible";
        
        String limpia = hora.trim().toUpperCase();
        
        if (limpia.contains("AM") || limpia.contains("PM")) {
            return limpia;
        }

        try {
            String[] partes = limpia.split(":");
            if (partes.length >= 2) {
                int horaNum = Integer.parseInt(partes[0].trim());
                String minutosStr = partes[1].replaceAll("[^\\d]", "");
                int minutoNum = Integer.parseInt(minutosStr);

                String periodo = horaNum >= 12 ? "PM" : "AM";
                if (horaNum > 12) horaNum -= 12;
                if (horaNum == 0) horaNum = 12;

                return String.format(Locale.getDefault(), "%d:%02d %s", horaNum, minutoNum, periodo);
            }
        } catch (Exception e) {
            Log.e(TAG, "❌ Error al convertir a 12h: " + e.getMessage());
        }
        return hora;
    }

    /**
     * 🔥 Motor de Normalización de Cadenas:
     * Elimina diacríticos, convierte a minúsculas y limpia espacios para asegurar 
     * que las comparaciones de lógica de negocio no fallen por tildes o mayúsculas.
     */
    public static String normalizarTexto(String texto) {
        if (texto == null) return "";
        return texto.toLowerCase()
                .replace("á", "a").replace("é", "e")
                .replace("í", "i").replace("ó", "o")
                .replace("ú", "u")
                .replace("ñ", "n")
                .trim();
    }

    public static String formatearHora12hDeTimestamp(long timestamp) {
        if (timestamp <= 0) return "--:--";
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("hh:mm a", Locale.getDefault());
            return sdf.format(new Date(timestamp));
        } catch (Exception e) {
            return "--:--";
        }
    }
}

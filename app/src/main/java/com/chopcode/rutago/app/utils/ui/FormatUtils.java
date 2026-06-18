package com.chopcode.rutago.app.utils.ui;

import android.util.Log;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

/**
 * 🛠️ Format Utils (Single Source of Truth)
 * 
 * Esta clase centraliza toda la lógica de transformación de datos para la UI.
 * Siguiendo Clean Architecture, ningún Adapter o Activity debe formatear precios
 * o fechas manualmente; deben llamar a estos métodos.
 */
public class FormatUtils {
    private static final String TAG = "FormatUtils";

    /**
     * Formatea un precio a moneda colombiana (ej: 12000 -> "$12.000").
     * Soporta tanto String como Double.
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

            NumberFormat nf = NumberFormat.getCurrencyInstance(new Locale("es", "CO"));
            nf.setMaximumFractionDigits(0);
            return nf.format(valor).replace(",00", "");
        } catch (Exception e) {
            Log.e(TAG, "Error formateando precio: " + e.getMessage());
            return "$" + precio;
        }
    }

    /**
     * Separa una hora tipo "06:00 AM" en un array ["06:00", "AM"].
     * Útil para layouts donde la hora y el periodo tienen tamaños distintos.
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
            Log.e(TAG, "Error separando hora: " + e.getMessage());
        }
        return resultado;
    }

    /**
     * Formatea una fecha en formato descriptivo (ej: "Lunes, 16 de Junio del 2026").
     */
    public static String formatearFechaLarga(Date fecha) {
        if (fecha == null) return "Fecha no disponible";
        SimpleDateFormat sdf = new SimpleDateFormat("EEEE, d 'de' MMMM 'del' yyyy", new Locale("es", "ES"));
        String fechaStr = sdf.format(fecha);
        return fechaStr.substring(0, 1).toUpperCase() + fechaStr.substring(1);
    }

    /**
     * Convierte "yyyy-MM-dd" a formato legible en español.
     */
    public static String formatearFechaCortaALegible(String fecha) {
        if (fecha == null || fecha.isEmpty()) return "Fecha no disponible";
        
        // Evitar doble formateo si ya contiene texto
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
            Log.e(TAG, "Error formateando fecha: " + e.getMessage());
        }
        return fecha;
    }

    /**
     * Lógica de negocio visual: Si el horario ya pasó, asume que el viaje es para mañana.
     */
    public static String obtenerFechaViaje(String horarioHora) {
        Calendar calendar = Calendar.getInstance();
        if (horarioHora != null && esHorarioPasado(horarioHora)) {
            calendar.add(Calendar.DAY_OF_MONTH, 1);
        }
        return formatearFechaLarga(calendar.getTime());
    }

    /**
     * Compara una cadena de hora contra la hora actual del sistema.
     */
    private static boolean esHorarioPasado(String horario) {
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("h:mm a", Locale.US);
            Date horaDate = sdf.parse(horario);
            if (horaDate == null) return false;

            Calendar calHora = Calendar.getInstance();
            calHora.setTime(horaDate);
            
            Calendar ahora = Calendar.getInstance();
            int hSel = calHora.get(Calendar.HOUR_OF_DAY);
            int mSel = calHora.get(Calendar.MINUTE);
            int hAct = ahora.get(Calendar.HOUR_OF_DAY);
            int mAct = ahora.get(Calendar.MINUTE);

            return (hSel < hAct) || (hSel == hAct && mSel <= mAct);
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Determina el tiempo de viaje estimado (Hardcoded por ahora según la ruta).
     */
    public static String calcularTiempoEstimado(String ruta) {
        if (ruta == null) return "55 min";
        return ruta.contains("Natagá -> La Plata") ? "60 min" : "55 min";
    }

    /**
     * Formatea el número de asiento para visualización (ej: 1 -> "A1").
     */
    public static String formatearAsiento(int asiento) {
        return "A" + asiento;
    }

    /**
     * Combina placa y modelo para encabezados de perfil.
     */
    public static String formatearInfoVehiculo(String placa, String modelo) {
        if (modelo != null && !modelo.isEmpty() && !modelo.equalsIgnoreCase("null")) {
            return modelo + " • " + placa;
        }
        return placa != null ? placa : "Información no disponible";
    }

    /**
     * Convierte hora militar (13:00) a 12h (1:00 PM).
     * Si la hora ya está en formato 12h, la devuelve normalizada.
     */
    public static String formatearHora12h(String hora) {
        if (hora == null || hora.isEmpty()) return "Hora no disponible";
        
        String limpia = hora.trim().toUpperCase();
        
        // 🔥 FIX: Si ya contiene AM o PM, no procesar como hora militar
        if (limpia.contains("AM") || limpia.contains("PM")) {
            return limpia;
        }

        try {
            String[] partes = limpia.split(":");
            if (partes.length >= 2) {
                int horaNum = Integer.parseInt(partes[0].trim());
                // Extraer solo los números de los minutos por si viene algo como "00 PM"
                String minutosStr = partes[1].replaceAll("[^\\d]", "");
                int minutoNum = Integer.parseInt(minutosStr);

                String periodo = horaNum >= 12 ? "PM" : "AM";
                if (horaNum > 12) horaNum -= 12;
                if (horaNum == 0) horaNum = 12;

                return String.format(Locale.getDefault(), "%d:%02d %s", horaNum, minutoNum, periodo);
            }
        } catch (Exception e) {
            Log.e(TAG, "Error formateando hora 12h: " + e.getMessage());
        }
        return hora;
    }

    /**
     * 🔥 Normaliza un texto para comparaciones lógicas.
     * Quita tildes, convierte a minúsculas y elimina espacios innecesarios.
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

    /**
     * Formatea un timestamp largo a hora 12h legible.
     */
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

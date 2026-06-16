package com.chopcode.rutago.app.utils.ui;

import android.util.Log;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

/**
 * Utilidades centralizadas para formateo de datos en la UI.
 * Mejora el mantenimiento y asegura consistencia visual en toda la app.
 */
public class FormatUtils {
    private static final String TAG = "FormatUtils";

    /**
     * Formatea un precio (String o Double) a formato moneda colombiana ($12.000)
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
     * Separa una hora tipo "06:00 AM" en un array ["06:00", "AM"]
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
     * Formatea una fecha en formato descriptivo español
     */
    public static String formatearFechaLarga(Date fecha) {
        if (fecha == null) return "Fecha no disponible";
        SimpleDateFormat sdf = new SimpleDateFormat("EEEE, d 'de' MMMM 'del' yyyy", new Locale("es", "ES"));
        String fechaStr = sdf.format(fecha);
        return fechaStr.substring(0, 1).toUpperCase() + fechaStr.substring(1);
    }

    /**
     * Formatea una fecha corta (yyyy-MM-dd) a un formato más legible.
     * Si la fecha ya está formateada (contiene letras), la devuelve tal cual.
     */
    public static String formatearFechaCortaALegible(String fecha) {
        if (fecha == null || fecha.isEmpty()) return "Fecha no disponible";
        
        // Si ya contiene letras (ej: "Lunes"), es que ya está formateada
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
     * Obtiene la fecha del viaje basándose en si el horario ya pasó hoy
     */
    public static String obtenerFechaViaje(String horarioHora) {
        Calendar calendar = Calendar.getInstance();
        if (horarioHora != null && esHorarioPasado(horarioHora)) {
            calendar.add(Calendar.DAY_OF_MONTH, 1);
        }
        return formatearFechaLarga(calendar.getTime());
    }

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
     * Calcula el tiempo estimado basado en la ruta
     */
    public static String calcularTiempoEstimado(String ruta) {
        if (ruta == null) return "55 min";
        return ruta.contains("Natagá -> La Plata") ? "60 min" : "55 min";
    }

    /**
     * Formatea el número de asiento (ej: 1 -> A1)
     */
    public static String formatearAsiento(int asiento) {
        return "A" + asiento;
    }

    /**
     * Formatea la información del vehículo
     */
    public static String formatearInfoVehiculo(String placa, String modelo) {
        if (modelo != null && !modelo.isEmpty() && !modelo.equalsIgnoreCase("null")) {
            return modelo + " • " + placa;
        }
        return placa != null ? placa : "Información no disponible";
    }

    /**
     * Formatea una hora de 24h (13:00) a 12h (1:00 PM)
     */
    public static String formatearHora12h(String hora24) {
        if (hora24 == null || hora24.isEmpty()) return "Hora no disponible";
        try {
            String[] partes = hora24.split(":");
            if (partes.length >= 2) {
                int hora = Integer.parseInt(partes[0].trim());
                int minuto = Integer.parseInt(partes[1].substring(0, 2).trim());

                String periodo = hora >= 12 ? "PM" : "AM";
                if (hora > 12) hora -= 12;
                if (hora == 0) hora = 12;

                return String.format(Locale.getDefault(), "%d:%02d %s", hora, minuto, periodo);
            }
        } catch (Exception e) {
            Log.e(TAG, "Error formateando hora 12h: " + e.getMessage());
        }
        return hora24;
    }
}

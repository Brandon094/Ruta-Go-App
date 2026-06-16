package com.chopcode.rutago.app.utils.ui;

import android.util.Log;
import java.text.NumberFormat;
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
}

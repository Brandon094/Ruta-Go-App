package com.chopcode.rutago.app.utils.ui

import android.util.Log
import java.text.NumberFormat
import java.text.SimpleDateFormat
import java.util.Calendar
import java.util.Date
import java.util.Locale

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
object FormatUtils {
    private const val TAG = "FormatUtils"

    /**
     * Transforma un valor numérico o cadena en formato de moneda COP legible.
     * Implementa lógica de abreviación para visualizaciones en dashboards:
     * - >= 1M: "1.2M COP"
     * - >= 100K: "100K COP"
     */
    @JvmStatic
    fun formatearPrecio(precio: Any?): String {
        if (precio == null) return "$0"

        try {
            val valor: Double = when (precio) {
                is String -> {
                    val limpio = precio.replace(Regex("[^\\d.]"), "")
                    if (limpio.isEmpty()) 0.0 else limpio.toDouble()
                }
                is Number -> precio.toDouble()
                else -> return precio.toString()
            }

            if (valor >= 1000000) {
                return String.format(Locale.US, "%.1fM COP", valor / 1000000.0).replace(".0", "")
            } else if (valor >= 100000) {
                return String.format(Locale.US, "%.0fK COP", valor / 1000.0)
            }

            val nf = NumberFormat.getCurrencyInstance(Locale("es", "CO"))
            nf.maximumFractionDigits = 0
            return nf.format(valor).replace(",00", "") + " COP"
        } catch (e: Exception) {
            Log.e(TAG, "❌ Error al formatear precio: ${e.message}")
            return "$$precio COP"
        }
    }

    /**
     * Descompone una cadena de hora para layouts con diseño tipográfico diferenciado.
     * @return Array ["HH:mm", "AM/PM"].
     */
    @JvmStatic
    fun separarHoraYAmPm(horaCompleta: String?): Array<String> {
        val resultado = arrayOf("--:--", "")
        if (horaCompleta.isNullOrBlank()) return resultado

        try {
            val limpia = horaCompleta.trim().uppercase(Locale.getDefault())
            val espacioIndex = limpia.indexOf(" ")
            if (espacioIndex > 0) {
                resultado[0] = limpia.substring(0, espacioIndex).trim()
                resultado[1] = limpia.substring(espacioIndex).trim()
            } else {
                resultado[0] = limpia
            }
        } catch (e: Exception) {
            Log.e(TAG, "❌ Error al segmentar hora: ${e.message}")
        }
        return resultado
    }

    /**
     * Convierte un objeto Date en una cadena descriptiva en español.
     */
    @JvmStatic
    fun formatearFechaLarga(fecha: Date?): String {
        if (fecha == null) return "Fecha no disponible"
        val sdf = SimpleDateFormat("EEEE, d 'de' MMMM 'del' yyyy", Locale("es", "ES"))
        val fechaStr = sdf.format(fecha)
        return fechaStr.substring(0, 1).uppercase(Locale.getDefault()) + fechaStr.substring(1)
    }

    @JvmStatic
    fun formatearFechaCortaALegible(fecha: String?): String {
        if (fecha.isNullOrEmpty()) return "Fecha no disponible"

        if (fecha.matches(Regex(".*[a-zA-ZáéíóúÁÉÍÓÚ].*"))) {
            return fecha
        }

        try {
            val inputFormat = SimpleDateFormat("yyyy-MM-dd", Locale.getDefault())
            val outputFormat = SimpleDateFormat("dd 'de' MMMM, yyyy", Locale("es", "ES"))
            val date = inputFormat.parse(fecha)
            if (date != null) {
                return outputFormat.format(date)
            }
        } catch (e: Exception) {
            Log.e(TAG, "❌ Error al transformar fecha corta: ${e.message}")
        }
        return fecha
    }

    /**
     * Regla de Negocio: Determina si el viaje corresponde a hoy o mañana.
     * Si la hora seleccionada ya pasó en el reloj del sistema, se asume que es una reserva para el día siguiente.
     */
    @JvmStatic
    fun obtenerFechaViaje(horarioHora: String?): String {
        val calendar = Calendar.getInstance()
        if (horarioHora != null && esHorarioPasado(horarioHora)) {
            calendar.add(Calendar.DAY_OF_MONTH, 1)
        }
        return formatearFechaLarga(calendar.time)
    }

    @JvmStatic
    fun esHorarioPasado(horario: String?): Boolean {
        if (horario.isNullOrEmpty()) return false
        try {
            val ahora = Calendar.getInstance()
            val hAct = ahora.get(Calendar.HOUR_OF_DAY)

            // Regla de Oro: Tras la rotación de las 7 PM, la planilla es para mañana.
            if (hAct >= 19) {
                return false
            }

            // Limpieza robusta similar a la Web (v1.9.11)
            val limpia = horario.trim().uppercase(Locale.getDefault()).replace(Regex("\\s+"), " ")

            val sdf = SimpleDateFormat("h:mm a", Locale.US)
            val horaDate = sdf.parse(limpia) ?: return false

            val calHora = Calendar.getInstance()
            calHora.time = horaDate

            val hSel = calHora.get(Calendar.HOUR_OF_DAY)
            val mSel = calHora.get(Calendar.MINUTE)
            val mAct = ahora.get(Calendar.MINUTE)

            return (hSel < hAct) || (hSel == hAct && mSel <= mAct)
        } catch (e: Exception) {
            Log.e(TAG, "Error al evaluar horario pasado: ${e.message}")
            return false
        }
    }

    @JvmStatic
    fun calcularTiempoEstimado(ruta: String?): String {
        if (ruta == null) return "55 min"
        return if (ruta.contains("Natagá -> La Plata")) "60 min" else "55 min"
    }

    @JvmStatic
    fun formatearAsiento(asiento: Int): String {
        return "A$asiento"
    }

    /**
     * Construye un identificador visual combinando modelo y placa.
     */
    @JvmStatic
    fun formatearInfoVehiculo(placa: String?, modelo: String?): String {
        if (!modelo.isNullOrEmpty() && !modelo.equals("null", ignoreCase = true)) {
            return "$modelo • $placa"
        }
        return placa ?: "Información no disponible"
    }

    /**
     * Normaliza formatos de 24h a 12h (AM/PM).
     */
    @JvmStatic
    fun formatearHora12h(hora: String?): String {
        if (hora.isNullOrEmpty()) return "Hora no disponible"

        val limpia = hora.trim().uppercase(Locale.getDefault())

        if (limpia.contains("AM") || limpia.contains("PM")) {
            return limpia
        }

        try {
            val partes = limpia.split(":")
            if (partes.size >= 2) {
                var horaNum = partes[0].trim().toInt()
                val minutosStr = partes[1].replace(Regex("[^\\d]"), "")
                val minutoNum = minutosStr.toInt()

                val periodo = if (horaNum >= 12) "PM" else "AM"
                if (horaNum > 12) horaNum -= 12
                if (horaNum == 0) horaNum = 12

                return String.format(Locale.getDefault(), "%d:%02d %s", horaNum, minutoNum, periodo)
            }
        } catch (e: Exception) {
            Log.e(TAG, "❌ Error al convertir a 12h: ${e.message}")
        }
        return hora
    }

    /**
     * 🔥 Motor de Normalización de Cadenas:
     * Elimina diacríticos, convierte a minúsculas y limpia espacios para asegurar 
     * que las comparaciones de lógica de negocio no fallen por tildes o mayúsculas.
     */
    @JvmStatic
    fun normalizarTexto(texto: String?): String {
        if (texto == null) return ""
        return texto.lowercase(Locale.getDefault())
            .replace("á", "a").replace("é", "e")
            .replace("í", "i").replace("ó", "o")
            .replace("ú", "u")
            .replace("ñ", "n")
            .trim()
    }

    @JvmStatic
    fun formatearHora12hDeTimestamp(timestamp: Long): String {
        if (timestamp <= 0) return "--:--"
        return try {
            val sdf = SimpleDateFormat("hh:mm a", Locale.getDefault())
            sdf.format(Date(timestamp))
        } catch (e: Exception) {
            "--:--"
        }
    }
}

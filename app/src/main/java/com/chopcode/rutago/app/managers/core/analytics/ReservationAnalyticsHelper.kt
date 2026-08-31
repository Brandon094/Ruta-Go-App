package com.chopcode.rutago.app.managers.core.analytics

import android.util.Log
import com.chopcode.rutago.app.config.MyApp
import com.chopcode.rutago.app.data.models.Vehicle

/**
 * Reservation Analytics Helper
 *
 * Especialista en la captura de telemetría para el embudo de conversión de reservas.
 * Responsabilidades:
 * - Rastrear el flujo del pasajero desde la apertura del mapa de asientos hasta la confirmación.
 * - Monitorear la carga técnica de conductores y vehículos vinculados a despachos.
 * - Registrar el estado del inventario (Ocupados/Libres) al momento de la interacción.
 * - Capturar fallos de validación de negocio para optimizar la UX.
 */
class ReservationAnalyticsHelper(private val screen: String) {

    /**
     * Despacha un evento genérico enriquecido con contexto de usuario y pantalla.
     */
    fun logEvent(event: String, params: Map<String, Any?>?) {
        try {
            val analyticsParams = mutableMapOf<String, Any?>()
            analyticsParams["user_id"] = MyApp.getCurrentUserId()
            analyticsParams["screen"] = screen
            analyticsParams["timestamp"] = System.currentTimeMillis()
            if (params != null) analyticsParams.putAll(params)
            MyApp.logEvent(event, analyticsParams)
        } catch (e: Exception) {
            Log.e(TAG, "❌ Error al registrar telemetría de reserva: ${e.message}")
        }
    }

    fun logPantallaInicio() {
        val params = mutableMapOf<String, Any?>()
        params["action"] = "screen_start"
        logEvent("create_reservation_screen_start", params)
    }

    /**
     * Registra si el flujo recibió los parámetros necesarios vía Intent.
     */
    fun logDatosRecibidos(hasRoute: Boolean, hasSchedule: Boolean) {
        val params = mutableMapOf<String, Any?>()
        params["has_route"] = if (hasRoute) 1 else 0
        params["has_schedule"] = if (hasSchedule) 1 else 0
        logEvent("intent_data_received", params)
    }

    fun logClickBoton(button: String) {
        val params = mutableMapOf<String, Any?>()
        params["button"] = button
        logEvent("click_button_$button", params)
    }

    /**
     * Captura el número de asiento que el usuario intenta reservar.
     */
    fun logAsientoSeleccionado(seat: Int) {
        val params = mutableMapOf<String, Any?>()
        params["seat"] = seat
        logEvent("seat_selected", params)
    }

    fun logUserCargado(name: String?, phone: String?) {
        val params = mutableMapOf<String, Any?>()
        params["user_name"] = name ?: "N/A"
        params["user_phone"] = phone ?: "N/A"
        logEvent("user_loaded_create_reservation", params)
    }

    fun logConductorCargado(driverId: String, name: String, phone: String?) {
        val params = mutableMapOf<String, Any?>()
        params["driver_id"] = driverId
        params["driver_name"] = name
        params["driver_phone"] = phone ?: "N/A"
        logEvent("driver_loaded_create_reservation", params)
    }

    /**
     * Registra los detalles técnicos del bus cargado para el itinerario.
     */
    fun logVehiculoCargado(vehicle: Vehicle, driverId: String) {
        val params = mutableMapOf<String, Any?>()
        params["driver_id"] = driverId
        params["vehicle_plate"] = vehicle.plate.ifEmpty { "N/A" }
        params["vehicle_model"] = vehicle.model.ifEmpty { "N/A" }
        params["vehicle_capacity"] = vehicle.capacity
        logEvent("vehicle_loaded_create_reservation", params)
    }

    /**
     * Captura una instantánea del estado de ocupación del despacho.
     */
    fun logAsientosCargados(occupiedSeats: Int, totalCapacity: Int, schedule: String?) {
        val params = mutableMapOf<String, Any?>()
        params["occupied_seats"] = occupiedSeats
        params["total_capacity"] = totalCapacity
        params["available_seats"] = totalCapacity - occupiedSeats
        params["schedule"] = schedule ?: "N/A"
        logEvent("seats_loaded_create_reservation", params)
    }

    fun logValidacionExitosa(seat: Int, route: String?) {
        val params = mutableMapOf<String, Any?>()
        params["seat"] = seat
        params["route"] = route ?: "N/A"
        logEvent("validation_success_create_reservation", params)
    }

    /**
     * Registra abandonos o fallos por datos incompletos.
     */
    fun logValidacionFallida(reason: String) {
        val params = mutableMapOf<String, Any?>()
        params["reason"] = reason
        logEvent("validation_failed", params)
    }

    fun logError(errorType: String, message: String) {
        val params = mutableMapOf<String, Any?>()
        params["error_type"] = errorType
        params["message"] = message
        logEvent("error_$errorType", params)
    }

    companion object {
        private const val TAG = "ReservationAnalytics"
    }
}

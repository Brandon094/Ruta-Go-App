package com.chopcode.rutago.app.managers.core.analytics

import com.chopcode.rutago.app.config.MyApp
import com.chopcode.rutago.app.data.models.User

/**
 * Dashboard Analytics Helper
 *
 * Especialista en la captura de telemetría para el tablero principal del pasajero.
 * Responsabilidades:
 * - Registrar eventos de ciclo de vida de la pantalla para medir retención.
 * - Rastrear la carga exitosa de perfiles y estadísticas de fidelización.
 * - Monitorear el rendimiento de la carga de horarios y clics en componentes clave.
 * - Centralizar el reporte de errores visuales hacia Firebase Analytics.
 */
class DashboardAnalyticsHelper {

    fun logScreenLoad() {
        val params = mutableMapOf<String, Any?>()
        params["pantalla"] = SCREEN_NAME
        params["user_id"] = MyApp.getCurrentUserId()
        MyApp.logEvent("pantalla_inicio_usuario_inicio", params)
    }

    fun logScreenResume() {
        val params = mutableMapOf<String, Any?>()
        params["pantalla"] = SCREEN_NAME
        params["user_id"] = MyApp.getCurrentUserId()
        MyApp.logEvent("pantalla_inicio_usuario_resume", params)
    }

    /**
     * Registra cuando el perfil del pasajero ha sido resuelto y visualizado.
     */
    fun logUserLoaded(usuario: User) {
        val params = mutableMapOf<String, Any?>()
        params["user_id"] = MyApp.getCurrentUserId()
        params["user_nombre"] = usuario.nombre
        params["user_email"] = usuario.email
        params["user_telefono"] = usuario.telefono.ifEmpty { "N/A" }
        MyApp.logEvent("usuario_cargado_inicio", params)
    }

    /**
     * Captura el estado de los contadores de actividad del usuario.
     */
    fun logCountersLoaded(reservasCount: Int, canceladasCount: Int, viajesCount: Int) {
        val params = mutableMapOf<String, Any?>()
        params["user_id"] = MyApp.getCurrentUserId()
        params["reservas_activas"] = reservasCount
        params["viajes_completados"] = viajesCount
        MyApp.logEvent("estadisticas_usuario", params)
    }

    fun logSchedulesLoaded(natagaCount: Int, laPlataCount: Int) {
        val params = mutableMapOf<String, Any?>()
        params["user_id"] = MyApp.getCurrentUserId()
        params["horarios_nataga"] = natagaCount
        params["horarios_laplata"] = laPlataCount
        params["total_horarios"] = natagaCount + laPlataCount
        MyApp.logEvent("horarios_cargados", params)
    }

    fun logScheduleLoadStart() {
        val params = mutableMapOf<String, Any?>()
        params["user_id"] = MyApp.getCurrentUserId()
        MyApp.logEvent("carga_horarios_inicio", params)
    }

    fun logButtonClick(buttonName: String) {
        val params = mutableMapOf<String, Any?>()
        params["boton"] = buttonName
        params["user_id"] = MyApp.getCurrentUserId()
        MyApp.logEvent("click_boton_inicio", params)
    }

    fun logMenuItemClick(itemName: String) {
        val params = mutableMapOf<String, Any?>()
        params["menu_item"] = itemName
        params["user_id"] = MyApp.getCurrentUserId()
        MyApp.logEvent("click_menu_item", params)
    }

    fun logRefresh() {
        val params = mutableMapOf<String, Any?>()
        params["user_id"] = MyApp.getCurrentUserId()
        MyApp.logEvent("actualizacion_manual", params)
    }

    /**
     * Reporta fallos en la experiencia del Dashboard para análisis proactivo.
     */
    fun logError(errorType: String, message: String) {
        val params = mutableMapOf<String, Any?>()
        params["tipo_error"] = errorType
        params["mensaje"] = message
        params["user_id"] = MyApp.getCurrentUserId()
        MyApp.logEvent("error_dashboard", params)
    }

    companion object {
        private const val SCREEN_NAME = "InicioUsers"
    }
}

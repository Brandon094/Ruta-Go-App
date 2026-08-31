package com.chopcode.rutago.app.managers.core.settings

import android.content.Context
import android.content.SharedPreferences

/**
 * Session Manager
 *
 * Encargado de la persistencia de configuraciones locales y estados de usuario en el dispositivo.
 * Responsabilidades:
 * - Rastrear si es la primera vez que el usuario abre el app (Onboarding control).
 * - Gestionar la persistencia de los tutoriales interactivos para evitar redundancia en la UX.
 * - Diferenciar estados de primera vez entre pasajeros y conductores.
 * - Utilizar SharedPreferences como motor de almacenamiento liviano.
 */
class SessionManager(context: Context) {

    private val pref: SharedPreferences = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE)

    /**
     * Define si el app debe mostrar el onboarding general.
     */
    val isFirstTimeLaunch: Boolean
        get() = pref.getBoolean(KEY_IS_FIRST_TIME, true)

    fun setFirstTimeLaunch(isFirstTime: Boolean) {
        pref.edit().putBoolean(KEY_IS_FIRST_TIME, isFirstTime).apply()
    }

    /**
     * Define si se debe mostrar el tutorial especializado para conductores.
     */
    val isFirstTimeDriver: Boolean
        get() = pref.getBoolean(KEY_IS_FIRST_TIME_DRIVER, true)

    fun setFirstTimeDriver(isFirstTime: Boolean) {
        pref.edit().putBoolean(KEY_IS_FIRST_TIME_DRIVER, isFirstTime).apply()
    }

    /**
     * Verifica si una sección específica aún no ha sido explicada al usuario.
     * @param key Identificador del tutorial (ej: TUT_HOME).
     */
    fun shouldShowTutorial(key: String): Boolean {
        return pref.getBoolean(key, true)
    }

    /**
     * Marca un tutorial como completado para que no aparezca de nuevo.
     */
    fun markTutorialAsSeen(key: String) {
        pref.edit().putBoolean(key, false).apply()
    }

    companion object {
        private const val PREF_NAME = "rutago_prefs"
        private const val KEY_IS_FIRST_TIME = "is_first_time"
        private const val KEY_IS_FIRST_TIME_DRIVER = "is_first_time_driver"

        // Tutorial Keys - Pasajero
        const val TUT_HOME = "tut_home"
        const val TUT_SEATS = "tut_seats"
        const val TUT_CONFIRM = "tut_confirm"
        const val TUT_HISTORY = "tut_history"
        const val TUT_PROFILE = "tut_profile"

        // Tutorial Keys - Conductor
        const val TUT_DR_HOME = "tut_dr_home"
        const val TUT_DR_SEATS = "tut_dr_seats"
        const val TUT_DR_HISTORY = "tut_dr_history"
        const val TUT_DR_PROFILE = "tut_dr_profile"
    }
}

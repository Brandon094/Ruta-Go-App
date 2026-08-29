package com.chopcode.rutago.app.data.repositories.settings

/**
 * 🎯 INTERFACE: SettingsRepository
 * Gestiona las preferencias locales y configuración de la app.
 */
interface SettingsRepository {
    fun isFirstTimeLaunch(): Boolean
    fun setFirstTimeLaunch(isFirstTime: Boolean)
    fun clearAll()
}

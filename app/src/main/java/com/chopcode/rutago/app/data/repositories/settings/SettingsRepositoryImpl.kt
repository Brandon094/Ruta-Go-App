package com.chopcode.rutago.app.data.repositories.settings

import android.content.Context
import android.content.SharedPreferences

/**
 * ⚙️ IMPLEMENTATION: SettingsRepositoryImpl
 */
class SettingsRepositoryImpl(context: Context) : SettingsRepository {
    private val prefs: SharedPreferences = context.getSharedPreferences("RutaGoPrefs", Context.MODE_PRIVATE)

    companion object {
        private const val KEY_FIRST_TIME = "is_first_time"
    }

    override fun isFirstTimeLaunch(): Boolean = prefs.getBoolean(KEY_FIRST_TIME, true)

    override fun setFirstTimeLaunch(isFirstTime: Boolean) {
        prefs.edit().putBoolean(KEY_FIRST_TIME, isFirstTime).apply()
    }

    override fun clearAll() {
        prefs.edit().clear().apply()
    }
}

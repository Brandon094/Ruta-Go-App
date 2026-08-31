package com.chopcode.rutago.app.data.repositories.settings

import android.content.Context
import com.chopcode.rutago.app.managers.core.settings.SessionManager

/**
 * ⚙️ IMPLEMENTATION: SettingsRepositoryImpl
 * Repositorio unificado que delega la persistencia a SessionManager.
 */
class SettingsRepositoryImpl(context: Context) : SettingsRepository {
    private val sessionManager = SessionManager(context)

    override fun isFirstTimeLaunch(): Boolean = sessionManager.isFirstTimeLaunch

    override fun setFirstTimeLaunch(isFirstTime: Boolean) {
        sessionManager.setFirstTimeLaunch(isFirstTime)
    }

    override fun shouldShowTutorial(key: String): Boolean = sessionManager.shouldShowTutorial(key)

    override fun markTutorialAsSeen(key: String) {
        sessionManager.markTutorialAsSeen(key)
    }

    override fun clearAll() {
        sessionManager.setFirstTimeLaunch(true)
    }
}

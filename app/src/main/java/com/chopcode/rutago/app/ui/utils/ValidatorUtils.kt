package com.chopcode.rutago.app.ui.utils

/**
 * 🛠 UTILS: ValidatorUtils
 * Centraliza las reglas de validación para todo el ecosistema móvil.
 */
object ValidatorUtils {
    private val emailRegex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}\$".toRegex()

    fun isValidEmail(email: String): Boolean = email.matches(emailRegex)

    fun isValidPassword(password: String): Boolean = password.length >= 6

    fun isValidPhone(phone: String): Boolean = phone.length >= 10

    fun isValidName(name: String): Boolean = name.trim().length >= 3
}

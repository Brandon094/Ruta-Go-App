package com.chopcode.rutago.app.data.repositories.auth

import com.google.firebase.auth.FirebaseUser

/**
 * 🎯 INTERFACE: AuthRepository
 * Define el contrato para todas las operaciones de autenticación.
 */
interface AuthRepository {
    suspend fun login(email: String, pass: String): Result<String>
    suspend fun register(name: String, email: String, phone: String, pass: String): Result<Unit>
    suspend fun recoverPassword(email: String): Result<Unit>
    suspend fun loginWithGoogle(idToken: String): Result<String>
    fun getCurrentUser(): FirebaseUser?
    fun logout()
}

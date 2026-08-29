package com.chopcode.rutago.app.data.repositories.auth

import com.chopcode.rutago.app.config.MyApp
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseUser
import com.google.firebase.auth.GoogleAuthProvider
import com.google.firebase.database.FirebaseDatabase
import kotlinx.coroutines.tasks.await
import java.util.HashMap

/**
 * ⚙️ IMPLEMENTATION: AuthRepositoryImpl
 * Motor real de autenticación usando Firebase SDK.
 */
class AuthRepositoryImpl : AuthRepository {
    private val auth = FirebaseAuth.getInstance()
    private val db = FirebaseDatabase.getInstance().reference

    override suspend fun login(email: String, pass: String): Result<String> {
        return try {
            val result = auth.signInWithEmailAndPassword(email, pass).await()
            val userId = result.user?.uid ?: throw Exception("ID de usuario no encontrado")
            val userType = resolveUserType(userId)
            Result.success(userType)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }

    override suspend fun register(name: String, email: String, phone: String, pass: String): Result<Unit> {
        return try {
            val result = auth.createUserWithEmailAndPassword(email, pass).await()
            val userId = result.user?.uid ?: throw Exception("Error al crear usuario")
            
            val userData = HashMap<String, Any>()
            userData["nombre"] = name
            userData["email"] = email
            userData["id"] = userId
            userData["telefono"] = phone
            userData["fechaRegistro"] = System.currentTimeMillis()
            userData["rol"] = "usuario"
            userData["status"] = "active"
            
            db.child("usuarios").child(userId).setValue(userData).await()
            Result.success(Unit)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }

    override suspend fun recoverPassword(email: String): Result<Unit> {
        return try {
            auth.sendPasswordResetEmail(email).await()
            Result.success(Unit)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }

    override suspend fun loginWithGoogle(idToken: String): Result<String> {
        return try {
            val credential = GoogleAuthProvider.getCredential(idToken, null)
            val result = auth.signInWithCredential(credential).await()
            val userId = result.user?.uid ?: throw Exception("Google login failed")
            val userType = resolveUserType(userId)
            Result.success(userType)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }

    override fun getCurrentUser(): FirebaseUser? = auth.currentUser

    override fun logout() {
        auth.signOut()
    }

    private suspend fun resolveUserType(uid: String): String {
        val conductorSnap = db.child("conductores").child(uid).get().await()
        return if (conductorSnap.exists()) "conductor" else "usuario"
    }
}

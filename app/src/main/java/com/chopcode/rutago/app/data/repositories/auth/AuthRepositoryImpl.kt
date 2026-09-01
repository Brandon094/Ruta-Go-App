package com.chopcode.rutago.app.data.repositories.auth

import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseUser
import com.google.firebase.auth.GoogleAuthProvider
import com.google.firebase.database.FirebaseDatabase
import kotlinx.coroutines.tasks.await
import java.util.HashMap

/**
 * ⚙️ IMPLEMENTATION: AuthRepositoryImpl
 * Motor real de autenticación usando Firebase SDK con soporte NoSQL v2.0 (/users).
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
            userData["id"] = userId
            userData["name"] = name
            userData["email"] = email
            userData["phone"] = phone
            userData["registrationDate"] = System.currentTimeMillis()
            userData["role"] = "passenger"
            userData["status"] = "active"
            
            db.child("users").child(userId).setValue(userData).await()
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
            val user = result.user ?: throw Exception("Google login failed")
            val userId = user.uid

            // Si es un usuario nuevo registrándose con Google, crear perfil base en /users/
            val userSnap = db.child("users").child(userId).get().await()
            if (!userSnap.exists()) {
                val userData = HashMap<String, Any>()
                userData["id"] = userId
                userData["name"] = user.displayName ?: "Usuario Google"
                userData["email"] = user.email ?: ""
                userData["phone"] = user.phoneNumber ?: ""
                userData["photoUrl"] = user.photoUrl?.toString() ?: ""
                userData["registrationDate"] = System.currentTimeMillis()
                userData["role"] = if (user.email == "dazace94@gmail.com") "admin" else "passenger"
                userData["status"] = "active"

                db.child("users").child(userId).setValue(userData).await()
            }

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
        val userSnap = db.child("users").child(uid).get().await()
        if (userSnap.exists()) {
            val role = (userSnap.child("role").getValue(String::class.java) 
                ?: userSnap.child("rol").getValue(String::class.java) ?: "").lowercase()
            if (role == "driver" || role == "conductor") return "conductor"
            return "usuario"
        }
        val legacyUserSnap = db.child("usuarios").child(uid).get().await()
        if (legacyUserSnap.exists()) {
            val role = (legacyUserSnap.child("rol").getValue(String::class.java) ?: "").lowercase()
            if (role == "driver" || role == "conductor") return "conductor"
        }
        val conductorSnap = db.child("conductores").child(uid).get().await()
        return if (conductorSnap.exists()) "conductor" else "usuario"
    }
}

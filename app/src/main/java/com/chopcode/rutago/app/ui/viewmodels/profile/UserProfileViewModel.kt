package com.chopcode.rutago.app.ui.viewmodels.profile

import android.net.Uri
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.chopcode.rutago.app.config.MyApp
import com.chopcode.rutago.app.managers.core.auth.AuthManager
import com.chopcode.rutago.app.models.Driver
import com.chopcode.rutago.app.models.User
import com.chopcode.rutago.app.services.reservations.passenger.PassengerReservationService
import com.chopcode.rutago.app.services.storage.StorageService
import com.chopcode.rutago.app.services.user.UserService
import com.chopcode.rutago.app.data.repositories.settings.SettingsRepository
import com.chopcode.rutago.app.data.repositories.settings.SettingsRepositoryImpl
import com.google.firebase.database.ValueEventListener
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import kotlinx.coroutines.tasks.await

/**
 * 🧠 VIEWMODEL: UserProfileViewModel (Unified)
 * Gestor reactivo para la identidad y métricas personales basado en roles.
 */
class UserProfileViewModel : ViewModel() {

    private val _uiState = MutableStateFlow(UserProfileUiState())
    val uiState: StateFlow<UserProfileUiState> = _uiState.asStateFlow()

    private val userService = UserService()
    private val storageService = StorageService()
    private val reservationService = PassengerReservationService()
    private val authManager = AuthManager.getInstance()
    private val settingsRepository: SettingsRepository = SettingsRepositoryImpl(MyApp.getAppContext())
    private var userListener: ValueEventListener? = null
    private var driverListener: ValueEventListener? = null

    init {
        loadProfile()
        checkTutorial()
    }

    private fun checkTutorial() {
        if (settingsRepository.shouldShowTutorial("tut_profile")) {
            _uiState.update { it.copy(showTutorial = true) }
        }
    }

    fun onTutorialDismiss() {
        settingsRepository.markTutorialAsSeen("tut_profile")
        _uiState.update { it.copy(showTutorial = false) }
    }

    fun loadProfile() {
        val userId = authManager.userId ?: return
        if (userListener != null) return

        _uiState.update { it.copy(isLoading = true) }

        userListener = userService.listenToUserData(userId, object : UserService.UserDataCallback {
            override fun onUserDataLoaded(user: User?) {
                user?.let { u ->
                    u.id = userId
                    
                    // 🛡️ Resolución de Rol Híbrida
                    viewModelScope.launch {
                        val isDriver = MyApp.getDatabaseReference("conductores").child(userId).get().await().exists()
                        val isOwner = MyApp.getDatabaseReference("dueños").child(userId).get().await().exists()
                        
                        val resolvedRole = when {
                            isOwner -> "dueño"
                            isDriver -> "conductor"
                            else -> u.rol ?: "usuario"
                        }

                        _uiState.update { 
                            it.copy(
                                user = u,
                                role = resolvedRole,
                                isLoading = false
                            )
                        }

                        // Cargar data específica según rol
                        if (resolvedRole == "conductor" || resolvedRole == "dueño") {
                            loadDriverData(userId)
                        } else {
                            loadPremiumStats(userId)
                        }
                    }
                }
            }

            override fun onError(errorMsg: String?) {
                _uiState.update { it.copy(isLoading = false, error = errorMsg) }
            }
        })
    }

    private fun loadDriverData(userId: String) {
        userService.loadDriverData(userId, object : UserService.DriverDataCallback {
            override fun onDriverDataLoaded(driver: Driver?) {
                driver?.let { d ->
                    _uiState.update { 
                        it.copy(
                            driver = d,
                            vehiclePlate = d.vehiclePlate ?: "N/A",
                            vehicleModel = d.vehicleModel ?: "N/A",
                            vehicleCapacity = d.vehicleCapacity
                        )
                    }
                }
            }
            override fun onError(error: String?) {
                _uiState.update { it.copy(error = error) }
            }
        })
    }

    private fun loadPremiumStats(userId: String) {
        _uiState.update { it.copy(isStatsLoading = true) }
        reservationService.getPremiumStats(userId, object : PassengerReservationService.PremiumStatsCallback {
            override fun onStatsCalculated(stats: Map<String, Any>?) {
                stats?.let { s ->
                    _uiState.update { 
                        it.copy(
                            totalSpent = s["totalSpent"]?.toString() ?: "$0",
                            loyaltyPoints = "${s["loyaltyPoints"]} pts",
                            favoriteRoute = s["favoriteRoute"]?.toString() ?: "No disponible",
                            isStatsLoading = false
                        )
                    }
                }
            }

            override fun onError(errorMsg: String?) {
                _uiState.update { it.copy(isStatsLoading = false) }
            }
        })
    }

    fun uploadProfilePicture(uri: Uri) {
        val userId = authManager.userId ?: return
        _uiState.update { it.copy(uploadStatus = "Uploading...") }
        
        val node = if (_uiState.value.role == "usuario") "usuarios" else "conductores"
        
        storageService.uploadProfilePicture(userId, uri, object : StorageService.UploadCallback {
            override fun onSuccess(downloadUrl: String?) {
                updateProfilePictureUrl(userId, downloadUrl, node)
            }

            override fun onError(errorMsg: String?) {
                _uiState.update { it.copy(error = "Upload error: $errorMsg", uploadStatus = null) }
            }

            override fun onProgress(progress: Double) {}
        })
    }

    private fun updateProfilePictureUrl(userId: String, downloadUrl: String?, node: String) {
        userService.updateProfilePicture(userId, downloadUrl, node, object : UserService.UserUpdateCallback {
            override fun onSuccess() {
                _uiState.update { it.copy(uploadStatus = "Updated") }
            }

            override fun onError(errorMsg: String?) {
                _uiState.update { it.copy(error = "DB error: $errorMsg", uploadStatus = null) }
            }
        })
    }

    fun toggleUserStatus() {
        val currentUser = _uiState.value.user ?: return
        if (currentUser.status == "blocked") return
        
        val newStatus = if (currentUser.status == "active") "inactive" else "active"
        val userId = authManager.userId ?: return
        
        _uiState.update { it.copy(isLoading = true) }
        userService.updateUserStatus(userId, newStatus, object : UserService.UserUpdateCallback {
            override fun onSuccess() {
                _uiState.update { it.copy(isLoading = false) }
            }

            override fun onError(errorMsg: String?) {
                _uiState.update { it.copy(error = errorMsg, isLoading = false) }
            }
        })
    }

    fun requestAccountDeletion() {
        val userId = authManager.userId ?: return
        val node = if (_uiState.value.role == "usuario") "usuarios" else "conductores"
        userService.requestAccountDeletion(userId, node, object : UserService.UserUpdateCallback {
            override fun onSuccess() {
                _uiState.update { it.copy(accountDeletionSuccess = true) }
            }

            override fun onError(errorMsg: String?) {
                _uiState.update { it.copy(error = errorMsg) }
            }
        })
    }

    fun cancelAccountDeletion() {
        val userId = authManager.userId ?: return
        val node = if (_uiState.value.role == "usuario") "usuario" else "conductor" // UserService expects "usuario" or "conductor"
        
        _uiState.update { it.copy(isLoading = true) }
        userService.cancelAccountDeletion(userId, node, object : UserService.UserUpdateCallback {
            override fun onSuccess() {
                _uiState.update { it.copy(isLoading = false) }
            }

            override fun onError(errorMsg: String?) {
                _uiState.update { it.copy(error = errorMsg, isLoading = false) }
            }
        })
    }

    fun showDeleteConfirmation(show: Boolean) {
        _uiState.update { it.copy(showDeleteConfirmation = show) }
    }

    fun onLogoutClick() {
        _uiState.update { it.copy(showLogoutDialog = true) }
    }

    fun dismissLogoutDialog() {
        _uiState.update { it.copy(showLogoutDialog = false) }
    }

    fun logout() {
        com.google.firebase.auth.FirebaseAuth.getInstance().signOut()
        _uiState.update { it.copy(showLogoutDialog = false, logoutSuccess = true) }
    }

    override fun onCleared() {
        super.onCleared()
        val uid = authManager.userId ?: return
        userListener?.let { MyApp.getDatabaseReference("usuarios/$uid").removeEventListener(it) }
        driverListener?.let { MyApp.getDatabaseReference("conductores/$uid").removeEventListener(it) }
    }
}

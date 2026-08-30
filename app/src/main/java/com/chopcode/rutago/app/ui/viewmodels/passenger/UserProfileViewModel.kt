package com.chopcode.rutago.app.ui.viewmodels.passenger

import android.net.Uri
import androidx.lifecycle.ViewModel
import com.chopcode.rutago.app.config.MyApp
import com.chopcode.rutago.app.managers.core.auth.AuthManager
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

/**
 * 🧠 VIEWMODEL: UserProfileViewModel
 * Gestor reactivo para la identidad y métricas personales del pasajero.
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
                    _uiState.update { it.copy(user = u, isLoading = false) }
                    loadPremiumStats(userId)
                }
            }

            override fun onError(errorMsg: String?) {
                _uiState.update { it.copy(isLoading = false, error = errorMsg) }
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
        
        storageService.uploadProfilePicture(userId, uri, object : StorageService.UploadCallback {
            override fun onSuccess(downloadUrl: String?) {
                updateProfilePictureUrl(userId, downloadUrl)
            }

            override fun onError(errorMsg: String?) {
                _uiState.update { it.copy(error = "Upload error: $errorMsg", uploadStatus = null) }
            }

            override fun onProgress(progress: Double) {}
        })
    }

    private fun updateProfilePictureUrl(userId: String, downloadUrl: String?) {
        userService.updateProfilePicture(userId, downloadUrl, "usuarios", object : UserService.UserUpdateCallback {
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
        userService.requestAccountDeletion(userId, "usuarios", object : UserService.UserUpdateCallback {
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
        _uiState.update { it.copy(isLoading = true) }
        userService.cancelAccountDeletion(userId, "usuarios", object : UserService.UserUpdateCallback {
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
        userListener?.let {
            authManager.userId?.let { uid ->
                MyApp.getDatabaseReference("usuarios/$uid").removeEventListener(it)
            }
        }
    }
}

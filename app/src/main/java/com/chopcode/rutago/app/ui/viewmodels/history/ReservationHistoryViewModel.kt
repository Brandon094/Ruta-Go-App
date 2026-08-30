package com.chopcode.rutago.app.ui.viewmodels.history

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.chopcode.rutago.app.config.MyApp
import com.chopcode.rutago.app.models.Reservation
import com.chopcode.rutago.app.services.reservations.common.ReservationService
import com.chopcode.rutago.app.services.reservations.driver.DriverReservationService
import com.chopcode.rutago.app.data.repositories.settings.SettingsRepository
import com.chopcode.rutago.app.data.repositories.settings.SettingsRepositoryImpl
import com.chopcode.rutago.app.services.user.UserService
import com.google.firebase.database.ValueEventListener
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import kotlinx.coroutines.tasks.await

/**
 * 🧠 VIEWMODEL: ReservationHistoryViewModel (Unified)
 * Motor de gestión para el historial de viajes adaptable por rol.
 */
class ReservationHistoryViewModel : ViewModel() {

    private val _uiState = MutableStateFlow(ReservationHistoryUiState())
    val uiState: StateFlow<ReservationHistoryUiState> = _uiState.asStateFlow()

    private val reservationService = ReservationService()
    private val driverService = DriverReservationService()
    private val userService = UserService()
    private val settingsRepository: SettingsRepository = SettingsRepositoryImpl(MyApp.getAppContext())
    private var historyListener: ValueEventListener? = null
    private var allReservations: List<Reservation> = emptyList()

    init {
        resolveRoleAndLoadHistory()
        checkTutorial()
    }

    private fun resolveRoleAndLoadHistory() {
        val userId = MyApp.getCurrentUserId() ?: return
        _uiState.update { it.copy(isLoading = true) }
        
        viewModelScope.launch {
            val isDriver = MyApp.getDatabaseReference("conductores").child(userId).get().await().exists()
            val role = if (isDriver) "conductor" else "usuario"
            
            _uiState.update { it.copy(role = role) }
            loadHistory(userId, role)
        }
    }

    private fun loadHistory(userId: String, role: String) {
        stopListening()
        
        if (role == "usuario") {
            historyListener = reservationService.listenPassengerHistory(userId, object : ReservationService.HistoryCallback {
                override fun onHistoryLoaded(reservations: List<Reservation>?) {
                    updateLocalData(reservations)
                }
                override fun onError(error: String?) {
                    _uiState.update { it.copy(isLoading = false, error = error) }
                }
            })
        } else {
            // Historial para conductor
            historyListener = driverService.listenDriverStats(userId, emptyList(), object : DriverReservationService.RealTimeStatsListener {
                override fun onStatsUpdated(stats: DriverReservationService.CompleteDriverStats) {
                    updateLocalData(stats.allReservations)
                }
                override fun onError(error: String?) {
                    _uiState.update { it.copy(isLoading = false, error = error) }
                }
            })
        }
    }

    private fun updateLocalData(reservations: List<Reservation>?) {
        allReservations = reservations ?: emptyList()
        applyFilters()
        calculateStats()
        _uiState.update { it.copy(isLoading = false) }
    }

    private fun checkTutorial() {
        if (settingsRepository.shouldShowTutorial("tut_history")) {
            _uiState.update { it.copy(showTutorial = true) }
        }
    }

    fun onTutorialDismiss() {
        settingsRepository.markTutorialAsSeen("tut_history")
        _uiState.update { it.copy(showTutorial = false) }
    }

    fun setFilter(filter: HistoryFilter) {
        _uiState.update { it.copy(currentFilter = filter) }
        applyFilters()
    }

    fun setSearchQuery(query: String) {
        _uiState.update { it.copy(searchQuery = query) }
        applyFilters()
    }

    fun onLogoutClick() { _uiState.update { it.copy(showLogoutDialog = true) } }
    fun dismissLogoutDialog() { _uiState.update { it.copy(showLogoutDialog = false) } }
    fun logout() { com.google.firebase.auth.FirebaseAuth.getInstance().signOut() }

    fun onShowRatingDialog(reservation: Reservation?) {
        _uiState.update { it.copy(ratingReservation = reservation) }
    }

    fun submitRating(stars: Float, comment: String) {
        val reservation = _uiState.value.ratingReservation ?: return
        com.chopcode.rutago.app.managers.core.ratings.RatingManager.getInstance().calificarViaje(
            reservation, stars, comment, object : com.chopcode.rutago.app.managers.core.ratings.RatingManager.RatingCallback {
                override fun onSuccess() { onShowRatingDialog(null) }
                override fun onError(error: String?) { _uiState.update { it.copy(error = error) } }
            }
        )
    }

    private fun applyFilters() {
        val currentState = _uiState.value
        val oneMonthAgo = System.currentTimeMillis() - (30L * 24 * 60 * 60 * 1000)
        val query = currentState.searchQuery.lowercase().trim()

        val filteredList = allReservations.filter { r ->
            val status = r.status.lowercase()
            
            val matchesType = when (currentState.currentFilter) {
                HistoryFilter.ALL -> true
                HistoryFilter.CONFIRMED -> status.contains("confirmad")
                HistoryFilter.CANCELLED -> status.contains("cancelad")
                HistoryFilter.THIS_MONTH -> r.reservationDate >= oneMonthAgo
            }

            val matchesSearch = if (query.isEmpty()) true else {
                val passenger = r.passengerName.lowercase()
                val driver = r.driverName.lowercase()
                val origin = r.origin.lowercase()
                val destination = r.destination.lowercase()
                
                passenger.contains(query) || driver.contains(query) || 
                origin.contains(query) || destination.contains(query)
            }

            matchesType && matchesSearch
        }

        _uiState.update { it.copy(reservations = filteredList) }
    }

    private fun calculateStats() {
        var confirmed = 0; var cancelled = 0
        allReservations.forEach { r ->
            val status = r.status.lowercase()
            if (status.contains("confirmad")) confirmed++
            else if (status.contains("cancelad")) cancelled++
        }
        _uiState.update { 
            it.copy(totalCount = allReservations.size, confirmedCount = confirmed, cancelledCount = cancelled)
        }
    }

    private fun stopListening() {
        historyListener?.let {
            MyApp.getDatabaseReference("reservas").removeEventListener(it)
        }
        historyListener = null
    }

    override fun onCleared() {
        super.onCleared()
        stopListening()
    }
}

package com.chopcode.rutago.app.ui.viewmodels.passenger

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.chopcode.rutago.app.config.MyApp
import com.chopcode.rutago.app.models.Reservation
import com.chopcode.rutago.app.services.reservations.common.ReservationService
import com.chopcode.rutago.app.data.repositories.settings.SettingsRepository
import com.chopcode.rutago.app.data.repositories.settings.SettingsRepositoryImpl
import com.google.firebase.database.ValueEventListener
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch

/**
 * 🧠 VIEWMODEL: ReservationHistoryViewModel
 * Motor de gestión para el registro histórico de viajes del cliente.
 */
class ReservationHistoryViewModel : ViewModel() {

    private val _uiState = MutableStateFlow(ReservationHistoryUiState())
    val uiState: StateFlow<ReservationHistoryUiState> = _uiState.asStateFlow()

    private val reservationService = ReservationService()
    private val settingsRepository: SettingsRepository = SettingsRepositoryImpl(MyApp.getAppContext())
    private var historyListener: ValueEventListener? = null
    private var allReservations: List<Reservation> = emptyList()
    private var currentUserId: String? = null

    init {
        val userId = MyApp.getCurrentUserId()
        userId?.let { loadHistory(it) }
        checkTutorial()
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

    fun loadHistory(userId: String) {
        currentUserId = userId
        stopListening()
        
        _uiState.update { it.copy(isLoading = true) }

        historyListener = reservationService.listenPassengerHistory(userId, object : ReservationService.HistoryCallback {
            override fun onHistoryLoaded(reservations: List<Reservation>?) {
                allReservations = reservations ?: emptyList()
                applyFilters()
                calculateStats()
                _uiState.update { it.copy(isLoading = false) }
            }

            override fun onError(errorMsg: String?) {
                _uiState.update { it.copy(isLoading = false, error = errorMsg) }
            }
        })
    }

    fun setFilter(filter: HistoryFilter) {
        _uiState.update { it.copy(currentFilter = filter) }
        applyFilters()
    }

    fun setSearchQuery(query: String) {
        _uiState.update { it.copy(searchQuery = query) }
        applyFilters()
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

    fun onShowRatingDialog(reservation: Reservation?) {
        _uiState.update { it.copy(ratingReservation = reservation) }
    }

    fun submitRating(stars: Float, comment: String) {
        val reservation = _uiState.value.ratingReservation ?: return
        
        com.chopcode.rutago.app.managers.core.ratings.RatingManager.getInstance().calificarViaje(
            reservation, 
            stars, 
            comment, 
            object : com.chopcode.rutago.app.managers.core.ratings.RatingManager.RatingCallback {
                override fun onSuccess() {
                    onShowRatingDialog(null)
                }

                override fun onError(error: String?) {
                    _uiState.update { it.copy(error = error) }
                }
            }
        )
    }

    private fun applyFilters() {
        val currentState = _uiState.value
        val oneMonthAgo = System.currentTimeMillis() - (30L * 24 * 60 * 60 * 1000)
        val query = currentState.searchQuery.lowercase().trim()

        val filteredList = allReservations.filter { r ->
            val status = r.reservationStatus?.lowercase() ?: ""
            
            val matchesType = when (currentState.currentFilter) {
                HistoryFilter.ALL -> true
                HistoryFilter.CONFIRMED -> status.contains("confirmad")
                HistoryFilter.CANCELLED -> status.contains("cancelad")
                HistoryFilter.THIS_MONTH -> r.reservationDate >= oneMonthAgo
            }

            val matchesSearch = if (query.isEmpty()) true else {
                val driver = r.driver?.lowercase() ?: ""
                val origin = r.origin?.lowercase() ?: ""
                val destination = r.destination?.lowercase() ?: ""
                val route = r.routeName?.lowercase() ?: ""
                
                driver.contains(query) || origin.contains(query) || 
                destination.contains(query) || route.contains(query)
            }

            matchesType && matchesSearch
        }

        _uiState.update { it.copy(reservations = filteredList) }
    }

    private fun calculateStats() {
        var confirmed = 0
        var cancelled = 0
        allReservations.forEach { r ->
            val status = r.reservationStatus?.lowercase() ?: ""
            if (status.contains("confirmad")) confirmed++
            else if (status.contains("cancelad")) cancelled++
        }
        
        _uiState.update { 
            it.copy(
                totalCount = allReservations.size,
                confirmedCount = confirmed,
                cancelledCount = cancelled
            )
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

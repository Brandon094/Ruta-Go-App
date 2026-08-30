package com.chopcode.rutago.app.ui.viewmodels.passenger

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.chopcode.rutago.app.config.MyApp
import com.chopcode.rutago.app.models.Reservation
import com.chopcode.rutago.app.models.Schedule
import com.chopcode.rutago.app.models.User
import com.chopcode.rutago.app.services.reservations.common.ScheduleService
import com.chopcode.rutago.app.services.user.UserService
import com.chopcode.rutago.app.utils.ui.FormatUtils
import com.google.firebase.database.DataSnapshot
import com.google.firebase.database.DatabaseError
import com.google.firebase.database.ValueEventListener
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch

/**
 * 🧠 VIEWMODEL: PassengerHomeViewModel
 * Gestiona el estado de la pantalla principal del pasajero.
 */
class PassengerHomeViewModel : ViewModel() {

    private val _uiState = MutableStateFlow(PassengerHomeUiState())
    val uiState: StateFlow<PassengerHomeUiState> = _uiState.asStateFlow()

    private val userService = UserService()
    private val scheduleService = ScheduleService()
    private var profileListener: ValueEventListener? = null
    private var countersListener: ValueEventListener? = null
    private var availabilityListener: ValueEventListener? = null
    private var currentUserId: String? = null

    init {
        loadData()
        loadSchedules()
    }

    fun loadData() {
        val userId = MyApp.getCurrentUserId() ?: return
        currentUserId = userId
        
        _uiState.update { it.copy(isLoading = true) }
        
        setupRealTimeProfile(userId)
        setupRealTimeCounters(userId)
    }

    fun loadSchedules() {
        _uiState.update { it.copy(isSchedulesLoading = true) }

        scheduleService.loadSchedules(object : ScheduleService.ScheduleCallback {
            override fun onSchedulesLoaded(nataga: List<Schedule>?, laPlata: List<Schedule>?) {
                val natagaList = nataga ?: emptyList()
                val laPlataList = laPlata ?: emptyList()
                
                _uiState.update { 
                    it.copy(
                        natagaSchedules = natagaList,
                        laPlataSchedules = laPlataList,
                        isSchedulesLoading = false,
                        nextScheduleId = findNextScheduleId(natagaList, laPlataList, it.selectedTab)
                    )
                }
                if (availabilityListener == null) setupAvailabilityListener()
            }

            override fun onError(error: String?) {
                _uiState.update { it.copy(isSchedulesLoading = false, error = error) }
            }
        })
    }

    private fun findNextScheduleId(nataga: List<Schedule>, laPlata: List<Schedule>, selectedTab: Int): String? {
        val currentSchedules = if (selectedTab == 0) nataga else laPlata
        // Encontrar el primer horario que no ha pasado
        return currentSchedules.firstOrNull { !FormatUtils.esHorarioPasado(it.time) }?.id
    }

    private fun setupAvailabilityListener() {
        availabilityListener = scheduleService.listenGlobalAvailability(object : ScheduleService.GlobalSeatsCallback {
            override fun onSeatsUpdated(availabilities: Map<String, Int>?, totals: Map<String, Int>?) {
                if (availabilities == null || totals == null) return
                
                _uiState.update { currentState ->
                    currentState.copy(
                        natagaSchedules = updateSchedules(currentState.natagaSchedules, availabilities, totals),
                        laPlataSchedules = updateSchedules(currentState.laPlataSchedules, availabilities, totals)
                    )
                }
            }
        })
    }

    private fun updateSchedules(list: List<Schedule>, availabilities: Map<String, Int>, totals: Map<String, Int>): List<Schedule> {
        return list.map { s ->
            val available = availabilities[s.id]
            val total = totals[s.id]
            if (available != null || total != null) {
                // Como Schedule es una clase Java con mutabilidad, creamos una copia o mutamos
                // Para Compose es mejor que sea una nueva instancia si es posible, o notificar el cambio
                // Aquí mutamos y map devolverá la lista
                if (available != null) s.availableSeats = available
                if (total != null) s.totalCapacity = total
                s
            } else s
        }
    }

    private fun setupRealTimeProfile(userId: String) {
        profileListener = userService.listenToUserData(userId, object : UserService.UserDataCallback {
            override fun onUserDataLoaded(user: User?) {
                user?.let { u ->
                    _uiState.update { 
                        it.copy(
                            userName = u.nombre ?: "",
                            userAvatarUrl = u.photoUrl,
                            isLoading = false
                        )
                    }
                }
            }

            override fun onError(error: String?) {
                _uiState.update { it.copy(isLoading = false, error = error) }
            }
        })
    }

    private fun setupRealTimeCounters(userId: String) {
        val ref = MyApp.getDatabaseReference("reservas")
        countersListener = object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                var confirmed = 0
                var canceled = 0
                var total = 0
                
                for (snap in snapshot.children) {
                    val r = snap.getValue(Reservation::class.java)
                    if (r != null && userId == r.userId) {
                        total++
                        when (r.reservationStatus?.lowercase()) {
                            "confirmada" -> confirmed++
                            "cancelada" -> canceled++
                        }
                    }
                }
                
                _uiState.update {
                    it.copy(
                        confirmedTrips = confirmed,
                        cancelledTrips = canceled,
                        totalTrips = total
                    )
                }
            }

            override fun onCancelled(error: DatabaseError) {
                // Manejar error si es necesario
            }
        }
        ref.orderByChild("userId").equalTo(userId).limitToLast(100).addValueEventListener(countersListener!!)
    }

    fun toggleLegend() {
        _uiState.update { it.copy(isLegendExpanded = !it.isLegendExpanded) }
    }

    fun onTabSelected(index: Int) {
        _uiState.update { 
            it.copy(
                selectedTab = index,
                nextScheduleId = findNextScheduleId(it.natagaSchedules, it.laPlataSchedules, index)
            )
        }
    }

    fun onNavigate(route: String) {
        if (route == "logout") {
            _uiState.update { it.copy(showLogoutDialog = true) }
        } else {
            _uiState.update { it.copy(currentRoute = route) }
        }
    }

    fun dismissLogoutDialog() {
        _uiState.update { it.copy(showLogoutDialog = false) }
    }

    fun logout() {
        dismissLogoutDialog()
        // Aquí llamaríamos a Firebase Auth para cerrar sesión
        com.google.firebase.auth.FirebaseAuth.getInstance().signOut()
        // La Activity debería reaccionar a esto o podemos añadir un flag al estado
    }

    private fun clearListeners() {
        currentUserId?.let { uid ->
            profileListener?.let { 
                MyApp.getDatabaseReference("usuarios/$uid").removeEventListener(it) 
            }
        }
        countersListener?.let { 
            MyApp.getDatabaseReference("reservas").removeEventListener(it) 
        }
        availabilityListener?.let {
            MyApp.getDatabaseReference("disponibilidadAsientos").removeEventListener(it)
        }
    }

    override fun onCleared() {
        super.onCleared()
        clearListeners()
    }
}

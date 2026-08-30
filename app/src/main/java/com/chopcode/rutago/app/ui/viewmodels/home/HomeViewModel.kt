package com.chopcode.rutago.app.ui.viewmodels.home

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.chopcode.rutago.app.config.MyApp
import com.chopcode.rutago.app.data.repositories.settings.SettingsRepository
import com.chopcode.rutago.app.data.repositories.settings.SettingsRepositoryImpl
import com.chopcode.rutago.app.models.Reservation
import com.chopcode.rutago.app.models.Schedule
import com.chopcode.rutago.app.models.User
import com.chopcode.rutago.app.services.reservations.common.ScheduleService
import com.chopcode.rutago.app.services.reservations.driver.DriverReservationService
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
import kotlinx.coroutines.tasks.await

/**
 * 🧠 VIEWMODEL: HomeViewModel (Unified)
 * Motor de orquestación para el Dashboard principal basado en roles.
 */
class HomeViewModel : ViewModel() {

    private val _uiState = MutableStateFlow(HomeUiState())
    val uiState: StateFlow<HomeUiState> = _uiState.asStateFlow()

    private val userService = UserService()
    private val scheduleService = ScheduleService()
    private val driverService = DriverReservationService()
    private val settingsRepository: SettingsRepository = SettingsRepositoryImpl(MyApp.getAppContext())

    private var profileListener: ValueEventListener? = null
    private var passengerCountersListener: ValueEventListener? = null
    private var availabilityListener: ValueEventListener? = null
    private var driverStatsListener: ValueEventListener? = null
    
    private val scheduleAvailabilityMap = mutableMapOf<String, Int>()
    private val scheduleTotalMap = mutableMapOf<String, Int>()

    init {
        loadInitialData()
    }

    private fun loadInitialData() {
        val userId = MyApp.getCurrentUserId() ?: return
        _uiState.update { it.copy(isLoading = true) }
        setupRealTimeProfile(userId)
    }

    private fun setupRealTimeProfile(userId: String) {
        profileListener = userService.listenToUserData(userId, object : UserService.UserDataCallback {
            override fun onUserDataLoaded(user: User?) {
                user?.let { u ->
                    // 🛡️ Resolución de Rol Híbrida (Soporte para data no normalizada)
                    viewModelScope.launch {
                        try {
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

                            // Activar pipelines según rol resuelto
                            if (resolvedRole == "conductor" || resolvedRole == "dueño") {
                                setupDriverPipelines(userId)
                            } else {
                                setupPassengerPipelines(userId)
                            }
                        } catch (e: Exception) {
                            _uiState.update { it.copy(isLoading = false, error = "Error al resolver rol: ${e.message}") }
                        }
                    }
                }
            }
            override fun onError(error: String?) {
                _uiState.update { it.copy(isLoading = false, error = error) }
            }
        })
    }

    // =========================================================================
    // 🚶 PIPELINES: PASAJERO
    // =========================================================================

    private fun setupPassengerPipelines(userId: String) {
        setupPassengerCounters(userId)
        loadPassengerSchedules()
        checkTutorial("tut_home")
    }

    private fun loadPassengerSchedules() {
        _uiState.update { it.copy(isSchedulesLoading = true) }
        scheduleService.loadSchedules(object : ScheduleService.ScheduleCallback {
            override fun onSchedulesLoaded(nataga: List<Schedule>?, laPlata: List<Schedule>?) {
                val nList = nataga ?: emptyList()
                val lList = laPlata ?: emptyList()
                _uiState.update { 
                    it.copy(
                        natagaSchedules = nList,
                        laPlataSchedules = lList,
                        isSchedulesLoading = false,
                        nextScheduleId = findNextScheduleId(nList, lList, it.selectedTab)
                    )
                }
                if (availabilityListener == null) setupGlobalAvailabilityListener()
            }
            override fun onError(error: String?) {
                _uiState.update { it.copy(isSchedulesLoading = false, error = error) }
            }
        })
    }

    private fun setupPassengerCounters(userId: String) {
        val ref = MyApp.getDatabaseReference("reservas")
        passengerCountersListener = object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                var confirmed = 0; var canceled = 0; var total = 0
                for (snap in snapshot.children) {
                    val r = snap.getValue(Reservation::class.java)
                    if (r != null && userId == r.userId) {
                        total++
                        when (r.status.lowercase()) {
                            "confirmada" -> confirmed++
                            "cancelada" -> canceled++
                        }
                    }
                }
                _uiState.update { it.copy(passengerStats = PassengerStats(confirmed, canceled, total)) }
            }
            override fun onCancelled(error: DatabaseError) {}
        }
        ref.orderByChild("userId").equalTo(userId).limitToLast(100).addValueEventListener(passengerCountersListener!!)
    }

    // =========================================================================
    // 👨‍✈️ PIPELINES: CONDUCTOR
    // =========================================================================

    private fun setupDriverPipelines(userId: String) {
        _uiState.update { it.copy(isDriverDataLoading = true) }
        
        // 1. Cargar rutas asignadas al conductor
        val driverRef = MyApp.getDatabaseReference("conductores/$userId/horariosAsignados")
        driverRef.addListenerForSingleValueEvent(object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                val scheduleIds = snapshot.children.mapNotNull { it.value?.toString() }
                loadDriverSchedules(scheduleIds)
                setupDriverRealTimeStats(userId, scheduleIds)
                if (availabilityListener == null) setupGlobalAvailabilityListener()
            }
            override fun onCancelled(error: DatabaseError) {}
        })
    }

    private fun loadDriverSchedules(ids: List<String>) {
        val ref = MyApp.getDatabaseReference("horarios")
        ref.addListenerForSingleValueEvent(object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                val list = ids.mapNotNull { id ->
                    val snap = snapshot.child(id)
                    if (snap.exists()) {
                        Schedule().apply {
                            this.id = id
                            time = snap.child("hora").getValue(String::class.java) ?: "--:--"
                            route = snap.child("ruta").getValue(String::class.java) ?: "Ruta N/A"
                        }
                    } else null
                }
                _uiState.update { it.copy(assignedSchedules = list, isDriverDataLoading = false) }
                calculateDriverRouteBreakdown()
            }
            override fun onCancelled(error: DatabaseError) {}
        })
    }

    private fun setupDriverRealTimeStats(userId: String, schedules: List<String>) {
        driverStatsListener = driverService.listenDriverStats(userId, schedules, object : DriverReservationService.RealTimeStatsListener {
            override fun onStatsUpdated(stats: DriverReservationService.CompleteDriverStats) {
                _uiState.update { 
                    it.copy(
                        driverStats = it.driverStats.copy(
                            todayIncome = stats.totalEarnings,
                            confirmedReservations = stats.confirmedReservations,
                            availableSeats = calculateAvailableSeats(stats)
                        ),
                        pendingReservations = stats.pendingReservationsList
                    )
                }
                calculateDriverRouteBreakdown()
            }
            override fun onError(error: String?) {}
        })
    }

    private fun calculateAvailableSeats(stats: DriverReservationService.CompleteDriverStats): Int {
        val numRoutes = _uiState.value.assignedSchedules.size.coerceAtLeast(1)
        val totalCapacity = numRoutes * 13
        val occupied = stats.confirmedReservations + stats.pendingReservations
        return (totalCapacity - occupied).coerceAtLeast(0)
    }

    private fun calculateDriverRouteBreakdown() {
        val routes = _uiState.value.assignedSchedules
        if (routes.isEmpty()) return

        val breakdown = routes.map { s ->
            val total = scheduleTotalMap[s.id] ?: 13
            val avail = scheduleAvailabilityMap[s.id] ?: total
            RouteStat(
                id = s.id,
                name = "${s.route} (${s.time})",
                occupied = (total - avail).coerceAtLeast(0),
                available = avail,
                color = 0xFFFF7A1A 
            )
        }
        
        _uiState.update { it.copy(driverStats = it.driverStats.copy(routeBreakdown = breakdown)) }
    }

    // =========================================================================
    // ⚙️ LÓGICA COMÚN
    // =========================================================================

    private fun setupGlobalAvailabilityListener() {
        availabilityListener = scheduleService.listenGlobalAvailability { availMap, totalMap ->
            scheduleAvailabilityMap.putAll(availMap)
            scheduleTotalMap.putAll(totalMap)
            
            _uiState.update { currentState ->
                currentState.copy(
                    natagaSchedules = updateSeats(currentState.natagaSchedules, availMap, totalMap),
                    laPlataSchedules = updateSeats(currentState.laPlataSchedules, availMap, totalMap),
                    assignedSchedules = updateSeats(currentState.assignedSchedules, availMap, totalMap)
                )
            }
            if (_uiState.value.role != "usuario") calculateDriverRouteBreakdown()
        }
    }

    private fun updateSeats(list: List<Schedule>, avail: Map<String, Int>, totals: Map<String, Int>): List<Schedule> {
        return list.map { s ->
            s.availableSeats = avail[s.id] ?: s.availableSeats
            s.totalCapacity = totals[s.id] ?: s.totalCapacity
            s
        }
    }

    private fun findNextScheduleId(nataga: List<Schedule>, laPlata: List<Schedule>, tab: Int): String? {
        val current = if (tab == 0) nataga else laPlata
        return current.firstOrNull { !FormatUtils.esHorarioPasado(it.time) }?.id
    }

    fun onTabSelected(index: Int) {
        _uiState.update { 
            it.copy(
                selectedTab = index,
                nextScheduleId = findNextScheduleId(it.natagaSchedules, it.laPlataSchedules, index)
            )
        }
    }

    fun togglePassengerLegend() {
        _uiState.update { 
            it.copy(passengerStats = it.passengerStats.copy(isLegendExpanded = !it.passengerStats.isLegendExpanded)) 
        }
    }

    fun onNavigate(route: String) {
        if (route == "logout") _uiState.update { it.copy(showLogoutDialog = true) }
        else _uiState.update { it.copy(currentRoute = route) }
    }

    fun dismissLogoutDialog() { _uiState.update { it.copy(showLogoutDialog = false) } }

    fun logout() {
        com.google.firebase.auth.FirebaseAuth.getInstance().signOut()
    }

    private fun checkTutorial(key: String) {
        if (settingsRepository.shouldShowTutorial(key)) {
            _uiState.update { it.copy(showTutorial = true) }
        }
    }

    fun onTutorialDismiss() {
        val key = if (_uiState.value.role == "usuario") "tut_home" else "tut_dr_home"
        settingsRepository.markTutorialAsSeen(key)
        _uiState.update { it.copy(showTutorial = false) }
    }

    fun onConfirmReservation(reservation: Reservation) {
        val userId = MyApp.getCurrentUserId() ?: return
        _uiState.update { it.copy(isDriverDataLoading = true) }
        
        driverService.updateReservationStatus(reservation.id, "Confirmada", object : DriverReservationService.ReservationUpdateCallback {
            override fun onSuccess() {
                driverService.registerManualSale(userId, reservation.price)
                _uiState.update { it.copy(isDriverDataLoading = false) }
            }
            override fun onError(error: String?) {
                _uiState.update { it.copy(isDriverDataLoading = false, error = error) }
            }
        })
    }

    fun onCancelReservation(reservation: Reservation) {
        _uiState.update { it.copy(isDriverDataLoading = true) }
        
        driverService.cancelReservationWithRelease(
            reservation.scheduleId, 
            reservation.reservedSeat, 
            reservation.id, 
            object : DriverReservationService.ReservationUpdateCallback {
                override fun onSuccess() {
                    _uiState.update { it.copy(isDriverDataLoading = false) }
                }
                override fun onError(error: String?) {
                    _uiState.update { it.copy(isDriverDataLoading = false, error = error) }
                }
            }
        )
    }

    override fun onCleared() {
        super.onCleared()
        val uid = MyApp.getCurrentUserId() ?: return
        profileListener?.let { MyApp.getDatabaseReference("usuarios/$uid").removeEventListener(it) }
        passengerCountersListener?.let { MyApp.getDatabaseReference("reservas").removeEventListener(it) }
        availabilityListener?.let { MyApp.getDatabaseReference("disponibilidadAsientos").removeEventListener(it) }
        driverStatsListener?.let { MyApp.getDatabaseReference("reservas").removeEventListener(it) }
    }
}

package com.chopcode.rutago.app.ui.viewmodels.driver

import androidx.lifecycle.ViewModel
import com.chopcode.rutago.app.config.MyApp
import com.chopcode.rutago.app.data.repositories.settings.SettingsRepository
import com.chopcode.rutago.app.data.repositories.settings.SettingsRepositoryImpl
import com.chopcode.rutago.app.engines.seats.SeatDataProcessor
import com.chopcode.rutago.app.models.Reservation
import com.chopcode.rutago.app.services.prices.PriceService
import com.chopcode.rutago.app.services.reservations.driver.DriverReservationService
import com.google.firebase.database.DataSnapshot
import com.google.firebase.database.DatabaseError
import com.google.firebase.database.ValueEventListener
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update

/**
 * 🧠 VIEWMODEL: ManageSeatsViewModel
 * Motor de lógica para la gestión técnica de inventario de un despacho específico.
 */
class ManageSeatsViewModel : ViewModel() {

    private val _uiState = MutableStateFlow(ManageSeatsUiState())
    val uiState: StateFlow<ManageSeatsUiState> = _uiState.asStateFlow()

    private val seatsDataProcessor = SeatDataProcessor()
    private val driverService = DriverReservationService()
    private val priceService = PriceService()
    private val settingsRepository: SettingsRepository = SettingsRepositoryImpl(MyApp.getAppContext())

    private var seatsListener: ValueEventListener? = null
    private var reservesListener: ValueEventListener? = null
    private var lastTotalOccupied = emptySet<Int>()
    private var routePrice = PriceService.DEFAULT_PRICE

    fun init(id: String?, name: String?, time: String?, price: Double) {
        if (id == null) return
        routePrice = price
        
        _uiState.update { 
            it.copy(
                scheduleId = id,
                routeName = name ?: "",
                scheduleTime = time ?: ""
            )
        }
        
        fetchRoutePrice(name)
        startListening(id)
        checkTutorial()
    }

    private fun fetchRoutePrice(routeName: String?) {
        if (routeName == null || !routeName.contains("->")) return
        val parts = routeName.split("->")
        if (parts.size == 2) {
            priceService.getRoutePrice(parts[0].trim(), parts[1].trim(), object : PriceService.PriceCallback {
                override fun onPriceLoaded(price: Double) { routePrice = price }
                override fun onError(error: String?) { }
            })
        }
    }

    private fun startListening(scheduleId: String) {
        _uiState.update { it.copy(isLoading = true) }
        setupReservesListener(scheduleId)
        setupSeatsListener(scheduleId)
    }

    private fun setupReservesListener(scheduleId: String) {
        val ref = MyApp.getDatabaseReference("reservas")
        reservesListener = object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                val appOccupied = mutableSetOf<Int>()
                val dayMillis = 24 * 60 * 60 * 1000L
                val yesterday = System.currentTimeMillis() - dayMillis
                
                for (ds in snapshot.children) {
                    val r = ds.getValue(Reservation::class.java)
                    if (r != null && scheduleId == r.scheduleId) {
                        if (r.reservationDate > yesterday && !"Cancelada".equals(r.status, true)) {
                            appOccupied.add(r.reservedSeat)
                        }
                    }
                }
                _uiState.update { it.copy(appOccupiedSeats = appOccupied) }
                recalculatePhysicalSeats()
            }
            override fun onCancelled(error: DatabaseError) {
                _uiState.update { it.copy(error = error.message) }
            }
        }
        ref.addValueEventListener(reservesListener!!)
    }

    private fun setupSeatsListener(scheduleId: String) {
        val ref = MyApp.getDatabaseReference("disponibilidadAsientos/$scheduleId")
        seatsListener = object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                if (snapshot.exists()) {
                    val disp = snapshot.child("asientosDisponibles").getValue(Int::class.java) ?: 0
                    val total = snapshot.child("totalAsientos").getValue(Int::class.java) ?: 13
                    
                    val allOccupied = mutableSetOf<Int>()
                    val occupiedSnap = snapshot.child("asientosOcupados")
                    for (s in occupiedSnap.children) {
                        if (s.getValue(Boolean::class.java) == true) {
                            s.key?.toIntOrNull()?.let { allOccupied.add(it) }
                        }
                    }
                    lastTotalOccupied = allOccupied
                    
                    _uiState.update { it.copy(availableCount = disp, totalCapacity = total) }
                    recalculatePhysicalSeats()
                }
                _uiState.update { it.copy(isLoading = false) }
            }
            override fun onCancelled(error: DatabaseError) {
                _uiState.update { it.copy(isLoading = false, error = error.message) }
            }
        }
        ref.addValueEventListener(seatsListener!!)
    }

    private fun recalculatePhysicalSeats() {
        val app = _uiState.value.appOccupiedSeats
        val physical = lastTotalOccupied.filter { !app.contains(it) }.toSet()
        _uiState.update { it.copy(physicalOccupiedSeats = physical) }
    }

    fun onSeatClick(seatNumber: Int) {
        val app = _uiState.value.appOccupiedSeats
        val physical = _uiState.value.physicalOccupiedSeats

        if (app.contains(seatNumber)) {
            _uiState.update { it.copy(error = "Asiento ocupado por la App (Cliente Digital)") }
            return
        }

        if (physical.contains(seatNumber)) {
            _uiState.update { it.copy(seatToManage = seatNumber, showFreeConfirmation = true) }
        } else {
            _uiState.update { it.copy(seatToManage = seatNumber, showBlockConfirmation = true) }
        }
    }

    fun confirmBlock() {
        val seat = _uiState.value.seatToManage ?: return
        val id = _uiState.value.scheduleId
        _uiState.update { it.copy(showBlockConfirmation = false, seatToManage = null) }
        
        seatsDataProcessor.reserveSeat(id, seat, object : SeatDataProcessor.SeatReservationCallback {
            override fun onSuccess() {
                val driverId = MyApp.getCurrentUserId() ?: return
                driverService.registerManualSale(driverId, routePrice)
            }
            override fun onError(msg: String?) {
                _uiState.update { it.copy(error = "Error al bloquear: $msg") }
            }
        })
    }

    fun confirmFree() {
        val seat = _uiState.value.seatToManage ?: return
        val id = _uiState.value.scheduleId
        _uiState.update { it.copy(showFreeConfirmation = false, seatToManage = null) }
        
        seatsDataProcessor.freeSeat(id, seat, object : SeatDataProcessor.SeatReservationCallback {
            override fun onSuccess() {
                val driverId = MyApp.getCurrentUserId() ?: return
                driverService.removeManualSale(driverId, routePrice)
            }
            override fun onError(msg: String?) {
                _uiState.update { it.copy(error = "Error al liberar: $msg") }
            }
        })
    }

    fun dismissDialogs() {
        _uiState.update { it.copy(showBlockConfirmation = false, showFreeConfirmation = false, seatToManage = null) }
    }

    private fun checkTutorial() {
        if (settingsRepository.shouldShowTutorial("tut_dr_seats")) {
            _uiState.update { it.copy(showTutorial = true) }
        }
    }

    fun onTutorialDismiss() {
        settingsRepository.markTutorialAsSeen("tut_dr_seats")
        _uiState.update { it.copy(showTutorial = false) }
    }

    override fun onCleared() {
        super.onCleared()
        val id = _uiState.value.scheduleId
        if (id.isNotEmpty()) {
            seatsListener?.let { MyApp.getDatabaseReference("disponibilidadAsientos/$id").removeEventListener(it) }
            reservesListener?.let { MyApp.getDatabaseReference("reservas").removeEventListener(it) }
        }
    }
}

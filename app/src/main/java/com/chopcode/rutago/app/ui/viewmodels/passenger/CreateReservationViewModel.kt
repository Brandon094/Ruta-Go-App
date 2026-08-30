package com.chopcode.rutago.app.ui.viewmodels.passenger

import android.util.Log
import androidx.lifecycle.ViewModel
import com.chopcode.rutago.app.config.MyApp
import com.chopcode.rutago.app.models.Driver
import com.chopcode.rutago.app.models.User
import com.chopcode.rutago.app.models.Vehicle
import com.chopcode.rutago.app.services.prices.PriceService
import com.chopcode.rutago.app.services.reservations.common.VehicleService
import com.chopcode.rutago.app.services.user.UserService
import com.chopcode.rutago.app.utils.ui.FormatUtils
import com.google.firebase.database.DataSnapshot
import com.google.firebase.database.DatabaseError
import com.google.firebase.database.ValueEventListener
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update

/**
 * 🧠 VIEWMODEL: CreateReservationViewModel
 * Motor de orquestación para la selección interactiva de asientos.
 */
class CreateReservationViewModel : ViewModel() {

    private val _uiState = MutableStateFlow(CreateReservationUiState())
    val uiState: StateFlow<CreateReservationUiState> = _uiState.asStateFlow()

    private val userService = UserService()
    private val vehicleService = VehicleService()
    private val priceService = PriceService()
    
    private var seatsListener: ValueEventListener? = null
    private var driverListener: ValueEventListener? = null

    fun init(route: String?, scheduleId: String?, scheduleTime: String?, initialPrice: Double) {
        if (scheduleId == null) return
        
        _uiState.update { 
            it.copy(
                selectedRoute = route ?: "",
                scheduleId = scheduleId,
                scheduleTime = scheduleTime ?: "",
                price = initialPrice,
                travelDate = FormatUtils.obtenerFechaViaje(scheduleTime)
            )
        }
        
        loadUserData()
        loadDriverAndVehicleInfo(scheduleId)
        startListeningSeats(scheduleId)
        
        // Cargar precio real si es posible
        route?.let { r ->
            val separator = if (r.contains(" → ")) " → " else " -> "
            val parts = r.split(separator)
            if (parts.size == 2) {
                loadPrice(parts[0].trim(), parts[1].trim())
            }
        }
    }

    private fun loadUserData() {
        val userId = MyApp.getCurrentUserId() ?: return
        userService.loadUserData(userId, object : UserService.UserDataCallback {
            override fun onUserDataLoaded(user: User?) {
                _uiState.update { it.copy(currentUser = user) }
            }
            override fun onError(errorMsg: String?) {
                _uiState.update { it.copy(error = errorMsg) }
            }
        })
    }

    private fun loadPrice(origin: String, destination: String) {
        priceService.getRoutePrice(origin, destination, object : PriceService.PriceCallback {
            override fun onPriceLoaded(price: Double) {
                _uiState.update { it.copy(price = price) }
            }
            override fun onError(error: String?) {
                // Mantener precio inicial
            }
        })
    }

    private fun startListeningSeats(scheduleId: String) {
        stopListeningSeats()
        val ref = MyApp.getDatabaseReference("disponibilidadAsientos/$scheduleId/asientosOcupados")
        seatsListener = object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                val occupied = mutableSetOf<Int>()
                for (seatSnap in snapshot.children) {
                    try {
                        if (seatSnap.getValue(Boolean::class.java) == true) {
                            occupied.add(seatSnap.key?.toInt() ?: 0)
                        }
                    } catch (e: Exception) {
                        Log.e("CreateReservationVM", "❌ Error al procesar asiento: ${e.message}")
                    }
                }
                _uiState.update { it.copy(occupiedSeats = occupied) }
            }
            override fun onCancelled(error: DatabaseError) {
                _uiState.update { it.copy(error = error.message) }
            }
        }
        ref.addValueEventListener(seatsListener!!)
    }

    private fun loadDriverAndVehicleInfo(scheduleId: String) {
        _uiState.update { it.copy(isLoading = true) }
        val ref = MyApp.getDatabaseReference("horarios/$scheduleId/conductorId")
        driverListener = object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                if (snapshot.exists()) {
                    val driverId = snapshot.getValue(String::class.java)
                    if (driverId != null) {
                        loadDriverData(driverId)
                        return
                    }
                }
                findDriverExhaustively(scheduleId)
            }
            override fun onCancelled(error: DatabaseError) {
                findDriverExhaustively(scheduleId)
            }
        }
        ref.addValueEventListener(driverListener!!)
    }

    private fun findDriverExhaustively(scheduleId: String) {
        MyApp.getDatabaseReference("conductores").addListenerForSingleValueEvent(object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                for (dSnap in snapshot.children) {
                    val hSnap = dSnap.child("horariosAsignados")
                    for (h in hSnap.children) {
                        if (scheduleId == h.value.toString()) {
                            loadDriverData(dSnap.key ?: "")
                            return
                        }
                    }
                }
                _uiState.update { it.copy(isLoading = false) }
            }
            override fun onCancelled(error: DatabaseError) {
                _uiState.update { it.copy(isLoading = false) }
            }
        })
    }

    private fun loadDriverData(driverId: String) {
        userService.loadDriverData(driverId, object : UserService.DriverDataCallback {
            override fun onDriverDataLoaded(driver: Driver?) {
                if (driver != null) {
                    _uiState.update { it.copy(driver = driver) }
                    loadVehicleData(driverId, driver.vehiclePlate)
                } else {
                    _uiState.update { it.copy(isLoading = false) }
                }
            }
            override fun onError(msg: String?) {
                _uiState.update { it.copy(error = msg, isLoading = false) }
            }
        })
    }

    private fun loadVehicleData(driverId: String, plate: String?) {
        if (!plate.isNullOrEmpty() && plate != "N/A") {
            vehicleService.getVehicleByPlate(plate, object : VehicleService.VehicleCallback {
                override fun onVehicleLoaded(vehicle: Vehicle?) {
                    if (vehicle != null) {
                        _uiState.update { it.copy(vehicle = vehicle, isLoading = false) }
                    } else {
                        fallbackVehicleLoad(driverId)
                    }
                }
                override fun onError(msg: String?) {
                    fallbackVehicleLoad(driverId)
                }
            })
        } else {
            fallbackVehicleLoad(driverId)
        }
    }

    private fun fallbackVehicleLoad(driverId: String) {
        vehicleService.getVehicleByDriver(driverId, object : VehicleService.VehicleCallback {
            override fun onVehicleLoaded(vehicle: Vehicle?) {
                _uiState.update { it.copy(vehicle = vehicle, isLoading = false) }
            }
            override fun onError(msg: String?) {
                _uiState.update { it.copy(isLoading = false) }
            }
        })
    }

    fun onSeatSelected(seatNumber: Int) {
        _uiState.update { 
            val newSelection = if (it.selectedSeat == seatNumber) null else seatNumber
            it.copy(selectedSeat = newSelection)
        }
    }

    private fun stopListeningSeats() {
        seatsListener?.let {
            val resId = _uiState.value.scheduleId
            if (resId.isNotEmpty()) {
                MyApp.getDatabaseReference("disponibilidadAsientos/$resId/asientosOcupados").removeEventListener(it)
            }
        }
        seatsListener = null
    }

    override fun onCleared() {
        super.onCleared()
        stopListeningSeats()
        driverListener?.let {
            val resId = _uiState.value.scheduleId
            if (resId.isNotEmpty()) {
                MyApp.getDatabaseReference("horarios/$resId/conductorId").removeEventListener(it)
            }
        }
    }
}

package com.chopcode.rutago.app.ui.viewmodels.passenger

import android.content.Intent
import androidx.lifecycle.ViewModel
import com.chopcode.rutago.app.config.MyApp
import com.chopcode.rutago.app.data.models.Reservation
import com.chopcode.rutago.app.data.models.User
import com.chopcode.rutago.app.services.prices.PriceService
import com.chopcode.rutago.app.data.repositories.settings.SettingsRepository
import com.chopcode.rutago.app.data.repositories.settings.SettingsRepositoryImpl
import com.chopcode.rutago.app.services.reservations.common.ReservationService
import com.chopcode.rutago.app.services.user.UserService
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update

/**
 * 🧠 VIEWMODEL: ConfirmReservationViewModel
 * Orquestador del cierre transaccional de una reserva de pasaje.
 */
class ConfirmReservationViewModel : ViewModel() {

    private val _uiState = MutableStateFlow(ConfirmReservationUiState())
    val uiState: StateFlow<ConfirmReservationUiState> = _uiState.asStateFlow()

    private val reservationService = ReservationService()
    private val userService = UserService()
    private val priceService = PriceService()
    private val settingsRepository: SettingsRepository = SettingsRepositoryImpl(MyApp.getAppContext())

    fun initData(
        origin: String?,
        destination: String?,
        scheduleId: String?,
        scheduleTime: String?,
        travelDate: String?,
        selectedSeat: Int,
        price: Double,
        driverName: String?,
        driverId: String?,
        driverPhone: String?,
        vehiclePlate: String?,
        vehicleModel: String?,
        estimatedTime: String?
    ) {
        _uiState.update { 
            it.copy(
                origin = if (origin == "N_A") "" else (origin ?: ""),
                destination = if (destination == "N_A") "" else (destination ?: ""),
                scheduleId = if (scheduleId == "N_A") "" else (scheduleId ?: ""),
                scheduleTime = if (scheduleTime == "N_A") "" else (scheduleTime ?: ""),
                travelDate = if (travelDate == "N_A") "" else (travelDate ?: ""),
                selectedSeat = selectedSeat,
                price = if (price > 0) price else PriceService.DEFAULT_PRICE,
                driverName = if (driverName == "N_A") "" else (driverName ?: ""),
                driverId = if (driverId == "N_A") "" else (driverId ?: ""),
                driverPhone = driverPhone ?: "",
                vehiclePlate = if (vehiclePlate == "N_A") "" else (vehiclePlate ?: ""),
                vehicleModel = if (vehicleModel == "N_A") "" else (vehicleModel ?: ""),
                estimatedTime = estimatedTime ?: "60 min"
            )
        }

        loadUserData()
        val orig = _uiState.value.origin
        val dest = _uiState.value.destination
        if (orig.isNotEmpty() && dest.isNotEmpty()) {
            fetchUpdatedPrice(orig, dest)
        }
        checkTutorial()
    }

    fun processIntent(intent: Intent?) {
        if (intent == null) return

        _uiState.update { 
            it.copy(
                origin = intent.getStringExtra("origen") ?: "",
                destination = intent.getStringExtra("destino") ?: "",
                scheduleId = intent.getStringExtra("horarioId") ?: "",
                scheduleTime = intent.getStringExtra("horarioHora") ?: "",
                travelDate = intent.getStringExtra("fechaViaje") ?: "",
                selectedSeat = intent.getIntExtra("asientoSeleccionado", 0),
                price = intent.getDoubleExtra("precio", PriceService.DEFAULT_PRICE),
                driverName = intent.getStringExtra("conductorNombre") ?: "",
                driverId = intent.getStringExtra("conductorId") ?: "",
                driverPhone = intent.getStringExtra("conductorTelefono") ?: "",
                vehiclePlate = intent.getStringExtra("vehiculoPlaca") ?: "",
                vehicleModel = intent.getStringExtra("vehiculoModelo") ?: "",
                estimatedTime = intent.getStringExtra("tiempoEstimado") ?: "60 min"
            )
        }

        loadUserData()
        fetchUpdatedPrice(_uiState.value.origin, _uiState.value.destination)
        checkTutorial()
    }

    private fun checkTutorial() {
        if (settingsRepository.shouldShowTutorial("tut_confirm")) {
            _uiState.update { it.copy(showTutorial = true) }
        }
    }

    fun onTutorialDismiss() {
        settingsRepository.markTutorialAsSeen("tut_confirm")
        _uiState.update { it.copy(showTutorial = false) }
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

    private fun fetchUpdatedPrice(origin: String, destination: String) {
        priceService.getRoutePrice(origin, destination, object : PriceService.PriceCallback {
            override fun onPriceLoaded(price: Double) {
                _uiState.update { it.copy(price = price) }
            }
            override fun onError(error: String?) {}
        })
    }

    fun setPaymentMethod(method: String) {
        _uiState.update { it.copy(paymentMethod = method) }
    }

    fun confirmReservation() {
        val state = _uiState.value
        val user = state.currentUser
        if (user == null) {
            _uiState.update { it.copy(error = "Datos de usuario incompletos") }
            return
        }

        _uiState.update { it.copy(isProcessing = true) }

        val reservation = Reservation().apply {
            userId = user.id
            passengerName = user.nombre
            passengerPhone = user.telefono
            driverId = state.driverId
            driverName = state.driverName
            scheduleId = state.scheduleId
            origin = state.origin
            destination = state.destination
            departureTime = state.scheduleTime
            estimatedDuration = state.estimatedTime
            price = state.price
            reservedSeat = state.selectedSeat
            status = "Por confirmar"
        }

        reservationService.createReservation(
            MyApp.getAppContext(),
            reservation,
            object : ReservationService.ReservationCallback {
                override fun onSuccess() {
                    _uiState.update { it.copy(isProcessing = false, confirmationSuccess = true) }
                }

                override fun onError(errorMsg: String?) {
                    _uiState.update { it.copy(isProcessing = false, error = errorMsg) }
                }
            }
        )
    }
}

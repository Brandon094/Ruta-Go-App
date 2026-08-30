package com.chopcode.rutago.app.ui.viewmodels.passenger

import android.content.Intent
import androidx.lifecycle.ViewModel
import com.chopcode.rutago.app.config.MyApp
import com.chopcode.rutago.app.models.User
import com.chopcode.rutago.app.services.prices.PriceService
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
        if (state.currentUser == null) {
            _uiState.update { it.copy(error = "Datos de usuario incompletos") }
            return
        }

        _uiState.update { it.copy(isProcessing = true) }

        reservationService.updateSeatAvailability(
            null,
            state.scheduleId,
            state.selectedSeat,
            state.origin,
            state.destination,
            state.estimatedTime,
            state.scheduleTime,
            state.paymentMethod,
            "Por confirmar",
            state.vehiclePlate,
            state.vehicleModel,
            state.price,
            state.driverName,
            state.driverId,
            state.driverPhone,
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

package com.chopcode.rutago.app.viewmodels.passenger;

import android.content.Intent;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import com.chopcode.rutago.app.config.MyApp;
import com.chopcode.rutago.app.models.User;
import com.chopcode.rutago.app.services.reservations.ReservationService;
import com.chopcode.rutago.app.services.user.UserService;
import com.chopcode.rutago.app.services.prices.PriceService;
import com.chopcode.rutago.app.R;

import java.util.HashMap;
import java.util.Map;

/**
 * ✅ Confirm Reservation ViewModel (Passenger)
 * 
 * Orquesta el proceso de confirmación final de una reserva.
 * Sus responsabilidades incluyen:
 * - Procesar los datos de viaje recibidos por Intent.
 * - Gestionar la selección del método de pago.
 * - Ejecutar la transacción de reserva en Firebase, la cual marca el asiento como 
 *   ocupado y crea el registro de reserva simultáneamente.
 */
public class ConfirmReservationViewModel extends ViewModel {
    private final MutableLiveData<Map<String, Object>> reservationData = new MutableLiveData<>(new HashMap<>());
    private final MutableLiveData<User> currentUser = new MutableLiveData<>();
    private final MutableLiveData<String> paymentMethod = new MutableLiveData<>("efectivo");
    private final MutableLiveData<Boolean> isProcessing = new MutableLiveData<>(false);
    private final MutableLiveData<String> error = new MutableLiveData<>();
    private final MutableLiveData<Boolean> confirmationSuccess = new MutableLiveData<>(false);

    private final ReservationService reservationService;
    private final UserService userService;
    private final PriceService priceService;

    public ConfirmReservationViewModel() {
        this.reservationService = new ReservationService();
        this.userService = new UserService();
        this.priceService = new PriceService();
    }

    public LiveData<Map<String, Object>> getReservationData() { return reservationData; }
    public LiveData<User> getCurrentUser() { return currentUser; }
    public LiveData<String> getPaymentMethod() { return paymentMethod; }
    public LiveData<Boolean> getIsProcessing() { return isProcessing; }
    public LiveData<String> getError() { return error; }
    public LiveData<Boolean> getConfirmationSuccess() { return confirmationSuccess; }

    public void processIntent(Intent intent) {
        if (intent == null) return;
        Map<String, Object> data = new HashMap<>();
        data.put("asientoSeleccionado", intent.getIntExtra("asientoSeleccionado", 0));
        data.put("rutaSeleccionada", intent.getStringExtra("rutaSeleccionada"));
        data.put("horarioId", intent.getStringExtra("horarioId"));
        data.put("horarioHora", intent.getStringExtra("horarioHora"));
        data.put("fechaViaje", intent.getStringExtra("fechaViaje"));
        data.put("conductorNombre", intent.getStringExtra("conductorNombre"));
        data.put("conductorTelefono", intent.getStringExtra("conductorTelefono"));
        data.put("conductorId", intent.getStringExtra("conductorId"));
        data.put("vehiculoPlaca", intent.getStringExtra("vehiculoPlaca"));
        data.put("vehiculoModelo", intent.getStringExtra("vehiculoModelo"));
        data.put("precio", intent.getDoubleExtra("precio", 12000.0));
        data.put("tiempoEstimado", intent.getStringExtra("tiempoEstimado"));
        data.put("origen", intent.getStringExtra("origen"));
        data.put("destino", intent.getStringExtra("destino"));
        
        reservationData.setValue(data);
        loadUserData();
        fetchUpdatedPrice((String)data.get("origen"), (String)data.get("destino"));
    }

    private void fetchUpdatedPrice(String origin, String destination) {
        priceService.getRoutePrice(origin, destination, new PriceService.PriceCallback() {
            @Override
            public void onPriceLoaded(double price) {
                Map<String, Object> data = reservationData.getValue();
                if (data != null) {
                    data.put("precio", price);
                    reservationData.postValue(data);
                }
            }
            @Override public void onError(String errorMsg) { /* Usar el del intent */ }
        });
    }

    public void loadUserData() {
        String userId = MyApp.getCurrentUserId();
        if (userId == null) return;
        userService.loadUserData(userId, new UserService.UserDataCallback() {
            @Override public void onUserDataLoaded(User user) { currentUser.postValue(user); }
            @Override public void onError(String errorMsg) { error.postValue(MyApp.getAppContext().getString(R.string.error_cargar_usuario, errorMsg)); }
        });
    }

    public void setPaymentMethod(String method) { paymentMethod.setValue(method); }

    public void confirmReservation() {
        Map<String, Object> data = reservationData.getValue();
        User user = currentUser.getValue();
        String method = paymentMethod.getValue();
        if (data == null || user == null) { error.setValue(MyApp.getAppContext().getString(R.string.error_datos_incompletos)); return; }

        isProcessing.setValue(true);
        reservationService.updateSeatAvailability(
                null,
                (String) data.get("horarioId"),
                (int) data.get("asientoSeleccionado"),
                (String) data.get("origen"),
                (String) data.get("destino"),
                (String) data.get("tiempoEstimado"),
                (String) data.get("horarioHora"), // 🔥 Pasamos departureTime
                method,
                "Por confirmar",
                (String) data.get("vehiculoPlaca"),
                (String) data.get("vehiculoModelo"), // ✅ Pasar el modelo
                (double) data.get("precio"),
                (String) data.get("conductorNombre"),
                (String) data.get("conductorId"),
                (String) data.get("conductorTelefono"),
                new ReservationService.ReservationCallback() {
                    @Override
                    public void onSuccess() {
                        isProcessing.postValue(false);
                        confirmationSuccess.postValue(true);
                    }
                    @Override
                    public void onError(String errorMsg) {
                        isProcessing.postValue(false);
                        error.postValue(errorMsg);
                    }
                }
        );
    }
}

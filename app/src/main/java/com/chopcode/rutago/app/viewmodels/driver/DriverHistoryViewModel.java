package com.chopcode.rutago.app.viewmodels.driver;

import android.content.Context;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import com.chopcode.rutago.app.models.Reservation;
import com.chopcode.rutago.app.services.reservations.driver.DriverReservationService;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

/**
 * 📊 Driver History ViewModel
 * 
 * Orquesta la lógica del historial de viajes para el conductor.
 * Responsabilidades:
 * - Cargar reservas históricas filtradas por el UID del conductor.
 * - Implementar lógica de filtrado por estado, búsqueda textual y rangos de fecha.
 * - Calcular contadores acumulados para la vista de resumen.
 * - Gestionar la liberación de asientos en caso de cancelaciones desde el historial.
 */
public class DriverHistoryViewModel extends ViewModel {
    private final MutableLiveData<List<Reservation>> filteredReservations = new MutableLiveData<>(new ArrayList<>());
    private final MutableLiveData<Boolean> isLoading = new MutableLiveData<>(false);
    private final MutableLiveData<String> error = new MutableLiveData<>();
    
    private final MutableLiveData<Integer> totalCount = new MutableLiveData<>(0);
    private final MutableLiveData<Integer> confirmedCount = new MutableLiveData<>(0);
    private final MutableLiveData<Integer> cancelledCount = new MutableLiveData<>(0);

    private final DriverReservationService reservationService;
    private List<Reservation> allReservations = new ArrayList<>();
    
    private String filterStatus = "TODAS";
    private String filterDate = "TODAS";
    private String searchQuery = "";
    
    private Long premiumStartDate = null;
    private Long premiumEndDate = null;

    public DriverHistoryViewModel() {
        this.reservationService = new DriverReservationService();
    }

    public LiveData<List<Reservation>> getFilteredReservations() { return filteredReservations; }
    public LiveData<Boolean> getIsLoading() { return isLoading; }
    public LiveData<String> getError() { return error; }
    public LiveData<Integer> getTotalCount() { return totalCount; }
    public LiveData<Integer> getConfirmedCount() { return confirmedCount; }
    public LiveData<Integer> getCancelledCount() { return cancelledCount; }

    public void loadReservations(String driverId, boolean isPremium) {
        if (driverId == null || driverId.isEmpty()) return;
        isLoading.setValue(true);

        if (isPremium && premiumStartDate != null && premiumEndDate != null) {
            reservationService.getAdvancedStats(driverId, premiumStartDate, premiumEndDate, new DriverReservationService.CompleteStatsCallback() {
                @Override
                public void onCompleteStatsLoaded(DriverReservationService.CompleteDriverStats stats) {
                    allReservations = stats.allReservations;
                    applyCurrentFilters();
                    calculateStats();
                    isLoading.postValue(false);
                }
                @Override public void onError(String errorMsg) { error.postValue(errorMsg); isLoading.postValue(false); }
            });
        } else {
            reservationService.cargarReservasConductorFiltradas(driverId, null, "TODAS", true, new DriverReservationService.ReservationsCallback() {
                @Override
                public void onReservationsLoaded(List<Reservation> reservations) {
                    allReservations = reservations;
                    applyCurrentFilters();
                    calculateStats();
                    isLoading.postValue(false);
                }
                @Override public void onError(String errorMsg) { error.postValue(errorMsg); isLoading.postValue(false); }
            });
        }
    }

    public void setFilters(String status, String dateFilter, String query) {
        this.filterStatus = status;
        this.filterDate = dateFilter;
        this.searchQuery = query;
        applyCurrentFilters();
    }

    public void setPremiumDateRange(Long start, Long end) {
        this.premiumStartDate = start;
        this.premiumEndDate = end;
        this.filterDate = "RANGO_PREMIUM";
    }

    private void applyCurrentFilters() {
        List<Reservation> result = new ArrayList<>();
        for (Reservation r : allReservations) {
            boolean matchesStatus = filterStatus.equals("TODAS") || (r.getReservationStatus() != null && r.getReservationStatus().equalsIgnoreCase(filterStatus));
            boolean matchesDate = filterDate.equals("TODAS") || (filterDate.equals("HOY") && isToday(r.getReservationDate())) || filterDate.equals("RANGO_PREMIUM");
            boolean matchesSearch = searchQuery.isEmpty() || containsText(r, searchQuery);
            if (matchesStatus && matchesDate && matchesSearch) result.add(r);
        }
        filteredReservations.setValue(result);
    }

    private void calculateStats() {
        int confirmed = 0, cancelled = 0;
        for (Reservation r : allReservations) {
            if (r.getReservationStatus() == null) continue;
            String status = r.getReservationStatus().toUpperCase();
            if (status.contains("CONFIRMA")) confirmed++;
            else if (status.contains("CANCELA")) cancelled++;
        }
        totalCount.setValue(allReservations.size());
        confirmedCount.setValue(confirmed);
        cancelledCount.setValue(cancelled);
    }

    private boolean isToday(long timestamp) {
        Calendar today = Calendar.getInstance(), date = Calendar.getInstance();
        date.setTimeInMillis(timestamp);
        return today.get(Calendar.YEAR) == date.get(Calendar.YEAR) && today.get(Calendar.MONTH) == date.get(Calendar.MONTH) && today.get(Calendar.DAY_OF_MONTH) == date.get(Calendar.DAY_OF_MONTH);
    }

    private boolean containsText(Reservation r, String query) {
        String q = query.toLowerCase();
        return (r.getName() != null && r.getName().toLowerCase().contains(q)) || (r.getPhone() != null && r.getPhone().toLowerCase().contains(q));
    }

    public void updateReservationStatus(Context context, String reservationId, String status, Runnable onSuccess) {
        reservationService.actualizarEstadoReserva(context, reservationId, status, new DriverReservationService.ReservationUpdateCallback() {
            @Override public void onSuccess() { onSuccess.run(); }
            @Override public void onError(String errorMsg) { error.postValue(errorMsg); }
        });
    }

    public void cancelReservationWithRelease(Context context, Reservation r, Runnable onSuccess) {
        reservationService.cancelarReservaConLiberacion(context, r.getIdReservation(), r.getScheduleId(), r.getReservedSeat(), new DriverReservationService.ReservationUpdateCallback() {
            @Override public void onSuccess() { onSuccess.run(); }
            @Override public void onError(String errorMsg) { error.postValue(errorMsg); }
        });
    }
}

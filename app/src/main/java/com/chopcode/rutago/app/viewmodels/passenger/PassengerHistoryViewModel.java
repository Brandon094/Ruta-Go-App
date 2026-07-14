package com.chopcode.rutago.app.viewmodels.passenger;

import android.util.Log;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import com.chopcode.rutago.app.models.Reservation;
import com.chopcode.rutago.app.services.reservations.common.ReservationService;

import java.util.ArrayList;
import java.util.List;

/**
 * Passenger History ViewModel
 *
 * Motor de gestión para el registro histórico de viajes del cliente.
 * Responsabilidades:
 * - Mantener un stream reactivo con la colección de reservas personales.
 * - Implementar lógica de filtrado dinámico por estado (Todos, Confirmados, Cancelados) y tiempo (Este mes).
 * - Proveer motor de búsqueda textual por conductor, origen o destino.
 * - Calcular agregaciones estadísticas para la visualización del resumen de actividad.
 * - Gestionar el ciclo de vida del listener para prevenir consumo excesivo de datos.
 */
public class PassengerHistoryViewModel extends ViewModel {
    private static final String TAG = "PassengerHistoryVM";

    /** Lista de reservas procesada tras aplicar los filtros activos. */
    private final MutableLiveData<List<Reservation>> filteredReservations = new MutableLiveData<>(new ArrayList<>());
    
    private final MutableLiveData<Boolean> isLoading = new MutableLiveData<>(false);
    private final MutableLiveData<String> error = new MutableLiveData<>();
    
    /** Métricas de resumen para la cabecera del historial. */
    private final MutableLiveData<Integer> totalCount = new MutableLiveData<>(0);
    private final MutableLiveData<Integer> confirmedCount = new MutableLiveData<>(0);
    private final MutableLiveData<Integer> cancelledCount = new MutableLiveData<>(0);

    private final ReservationService reservationService;
    private List<Reservation> allReservations = new ArrayList<>();
    private com.google.firebase.database.ValueEventListener historyListener;
    
    private String filterType = "TODOS";
    private String searchQuery = "";
    private String currentUserId;

    public PassengerHistoryViewModel() {
        this.reservationService = new ReservationService();
    }

    public LiveData<List<Reservation>> getFilteredReservations() { return filteredReservations; }
    public LiveData<Boolean> getIsLoading() { return isLoading; }
    public LiveData<String> getError() { return error; }
    public LiveData<Integer> getTotalCount() { return totalCount; }
    public LiveData<Integer> getConfirmedCount() { return confirmedCount; }
    public LiveData<Integer> getCancelledCount() { return cancelledCount; }

    /**
     * Activa el monitoreo del historial para el usuario especificado.
     * Implementa cache local para respuesta inmediata si el usuario no ha cambiado.
     */
    public void loadHistory(String userId) {
        if (userId == null || userId.isEmpty()) return;
        
        if (userId.equals(currentUserId) && !allReservations.isEmpty()) {
            applyFilters();
            calculateStats();
            isLoading.setValue(false);
            return;
        }

        this.currentUserId = userId;
        stopListening();
        isLoading.setValue(true);
        historyListener = reservationService.listenPassengerHistory(userId, new ReservationService.HistoryCallback() {
            @Override
            public void onHistoryLoaded(List<Reservation> reservations) {
                allReservations = (reservations != null) ? reservations : new ArrayList<>();
                applyFilters();
                calculateStats();
                isLoading.postValue(false);
            }

            @Override
            public void onError(String errorMsg) {
                Log.e(TAG, "❌ Error al cargar historial: " + errorMsg);
                error.postValue(errorMsg);
                isLoading.postValue(false);
            }
        });
    }

    public void stopListening() {
        if (historyListener != null && currentUserId != null) {
            com.chopcode.rutago.app.config.MyApp.getDatabaseReference("reservas").removeEventListener(historyListener);
            historyListener = null;
        }
    }

    /**
     * Actualiza los parámetros de filtrado y dispara el recalculado de la lista expuesta.
     */
    public void setFilters(String type, String query) {
        this.filterType = type;
        this.searchQuery = query;
        applyFilters();
    }

    private void applyFilters() {
        List<Reservation> result = new ArrayList<>();
        long oneMonthAgo = System.currentTimeMillis() - (30L * 24 * 60 * 60 * 1000);
        String q = searchQuery.toLowerCase().trim();

        for (Reservation r : allReservations) {
            boolean matchesType = false;
            String status = (r.getReservationStatus() != null) ? r.getReservationStatus() : "";
            
            switch (filterType) {
                case "TODOS":
                    matchesType = true;
                    break;
                case "CONFIRMADOS":
                    matchesType = status.equalsIgnoreCase("confirmado") || status.equalsIgnoreCase("confirmada");
                    break;
                case "CANCELADOS":
                    matchesType = status.equalsIgnoreCase("cancelado") || status.equalsIgnoreCase("cancelada");
                    break;
                case "ESTE_MES":
                    matchesType = r.getReservationDate() >= oneMonthAgo;
                    break;
            }

            boolean matchesSearch = true;
            if (!q.isEmpty()) {
                String driver = (r.getDriver() != null) ? r.getDriver().toLowerCase() : "";
                String origin = (r.getOrigin() != null) ? r.getOrigin().toLowerCase() : "";
                String destination = (r.getDestination() != null) ? r.getDestination().toLowerCase() : "";
                String route = (r.getRouteName() != null) ? r.getRouteName().toLowerCase() : "";

                matchesSearch = driver.contains(q) || origin.contains(q) || 
                                destination.contains(q) || route.contains(q);
            }

            if (matchesType && matchesSearch) {
                result.add(r);
            }
        }
        filteredReservations.setValue(result);
    }

    /**
     * Calcula los totales históricos para alimentar la UI de resumen.
     */
    private void calculateStats() {
        int confirmed = 0;
        int cancelled = 0;
        for (Reservation r : allReservations) {
            String s = r.getReservationStatus();
            if (s != null) {
                if (s.equalsIgnoreCase("confirmado") || s.equalsIgnoreCase("confirmada")) confirmed++;
                else if (s.equalsIgnoreCase("cancelado") || s.equalsIgnoreCase("cancelada")) cancelled++;
            }
        }
        totalCount.setValue(allReservations.size());
        confirmedCount.setValue(confirmed);
        cancelledCount.setValue(cancelled);
    }
}

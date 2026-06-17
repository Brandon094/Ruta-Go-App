package com.chopcode.rutago.app.viewmodels.driver;

import android.util.Log;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import com.chopcode.rutago.app.models.Reservation;
import com.chopcode.rutago.app.services.reservations.driver.DriverReservationService;
import com.chopcode.rutago.app.viewmodels.BaseViewModel;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.ValueEventListener;
import java.util.ArrayList;
import java.util.List;

/**
 * ViewModel to manage driver's pending reservations.
 */
public class DriverReservationsViewModel extends BaseViewModel {

    private static final String TAG = "DriverReservationsVM";

    private final DriverReservationService driverReservationService;

    private final MutableLiveData<List<Reservation>> pendingReservationsLiveData = new MutableLiveData<>();
    private final MutableLiveData<Integer> reservationsCountLiveData = new MutableLiveData<>();
    private final MutableLiveData<Reservation> processingReservationLiveData = new MutableLiveData<>();
    private final MutableLiveData<Boolean> reservationProcessedLiveData = new MutableLiveData<>();

    private String currentDriverId;
    private List<String> currentAssignedSchedules;

    private boolean isRealTimeListenerSetup = false;
    private DatabaseReference reservationsRef;
    private ValueEventListener reservationsListener;

    public DriverReservationsViewModel() {
        this.driverReservationService = new DriverReservationService();
        this.reservationsCountLiveData.setValue(0);
        this.reservationProcessedLiveData.setValue(false);
        this.pendingReservationsLiveData.setValue(new ArrayList<>());
    }

    public LiveData<List<Reservation>> getReservasPendientesLiveData() { return pendingReservationsLiveData; }
    public LiveData<Integer> getContadorReservasLiveData() { return reservationsCountLiveData; }
    public LiveData<Reservation> getReservaEnProcesoLiveData() { return processingReservationLiveData; }
    public LiveData<Boolean> getReservaProcesadaLiveData() { return reservationProcessedLiveData; }

    public void inicializarConIdConductor(String driverId) {
        if (driverId == null || driverId.isEmpty()) return;
        this.currentDriverId = driverId;
        cargarReservasPendientes();
        configurarListenerTiempoReal();
    }

    public void setHorariosAsignados(List<String> schedules) {
        this.currentAssignedSchedules = schedules != null ? new ArrayList<>(schedules) : new ArrayList<>();
        if (currentDriverId != null) {
            cargarReservasPendientes();
        }
    }

    public void cargarReservasPendientes() {
        if (currentDriverId == null) return;
        setLoading(true);

        driverReservationService.cargarReservasConductorFiltradas(
                currentDriverId,
                currentAssignedSchedules,
                "Por confirmar",
                true,
                new DriverReservationService.ReservationsCallback() {
                    @Override
                    public void onReservationsLoaded(List<Reservation> reservations) {
                        procesarReservasCargadas(reservations);
                    }

                    @Override
                    public void onError(String error) {
                        setError(error);
                        setLoading(false);
                    }
                }
        );
    }

    private void procesarReservasCargadas(List<Reservation> reservations) {
        List<Reservation> filtered = new ArrayList<>();
        for (Reservation r : reservations) {
            if ("Por confirmar".equalsIgnoreCase(r.getReservationStatus())) {
                filtered.add(r);
            }
        }
        pendingReservationsLiveData.postValue(filtered);
        reservationsCountLiveData.postValue(filtered.size());
        setLoading(false);
    }

    public void confirmarReserva(android.content.Context context, Reservation reservation) {
        if (reservation == null || reservation.getIdReservation() == null) return;
        processingReservationLiveData.postValue(reservation);
        reservationProcessedLiveData.postValue(false);

        driverReservationService.actualizarEstadoReserva(
                context,
                reservation.getIdReservation(),
                "Confirmada",
                new DriverReservationService.ReservationUpdateCallback() {
                    @Override
                    public void onSuccess() {
                        eliminarReservaDeLista(reservation);
                        reservationProcessedLiveData.postValue(true);
                    }

                    @Override
                    public void onError(String error) {
                        setError(error);
                        reservationProcessedLiveData.postValue(false);
                    }
                }
        );
    }

    public void cancelarReserva(android.content.Context context, Reservation reservation) {
        if (reservation == null || reservation.getIdReservation() == null) return;
        processingReservationLiveData.postValue(reservation);
        reservationProcessedLiveData.postValue(false);

        if (reservation.getScheduleId() != null && reservation.getReservedSeat() > 0) {
            driverReservationService.cancelarReservaConLiberacion(
                    context,
                    reservation.getIdReservation(),
                    reservation.getScheduleId(),
                    reservation.getReservedSeat(),
                    new DriverReservationService.ReservationUpdateCallback() {
                        @Override
                        public void onSuccess() {
                            eliminarReservaDeLista(reservation);
                            reservationProcessedLiveData.postValue(true);
                        }

                        @Override
                        public void onError(String error) {
                            setError(error);
                            reservationProcessedLiveData.postValue(false);
                        }
                    }
            );
        } else {
            driverReservationService.actualizarEstadoReserva(
                    context,
                    reservation.getIdReservation(),
                    "Cancelada",
                    new DriverReservationService.ReservationUpdateCallback() {
                        @Override
                        public void onSuccess() {
                            eliminarReservaDeLista(reservation);
                            reservationProcessedLiveData.postValue(true);
                        }
                        @Override public void onError(String error) { setError(error); }
                    }
            );
        }
    }

    public void refrescarReservas() {
        if (currentDriverId != null) cargarReservasPendientes();
    }

    private void configurarListenerTiempoReal() {
        if (currentDriverId == null || isRealTimeListenerSetup) return;
        try {
            limpiarListenerTiempoReal();
            reservationsRef = com.chopcode.rutago.app.config.MyApp.getDatabaseReference("reservas");
            reservationsListener = new ValueEventListener() {
                @Override
                public void onDataChange(DataSnapshot dataSnapshot) {
                    cargarReservasPendientes(); 
                }
                @Override public void onCancelled(DatabaseError databaseError) { isRealTimeListenerSetup = false; }
            };
            reservationsRef.orderByChild("conductorId").equalTo(currentDriverId).addValueEventListener(reservationsListener);
            isRealTimeListenerSetup = true;
        } catch (Exception e) { isRealTimeListenerSetup = false; }
    }

    public void pausarActualizacionesTiempoReal() {
        limpiarListenerTiempoReal();
        isRealTimeListenerSetup = false;
    }

    public void reanudarActualizacionesTiempoReal() {
        if (currentDriverId != null && !isRealTimeListenerSetup) configurarListenerTiempoReal();
    }

    private void eliminarReservaDeLista(Reservation reservation) {
        List<Reservation> currentOnes = pendingReservationsLiveData.getValue();
        if (currentOnes != null) {
            List<Reservation> updated = new ArrayList<>();
            for (Reservation r : currentOnes) {
                if (r != null && r.getIdReservation() != null && !r.getIdReservation().equals(reservation.getIdReservation())) {
                    updated.add(r);
                }
            }
            pendingReservationsLiveData.postValue(updated);
            reservationsCountLiveData.postValue(updated.size());
        }
    }

    private void limpiarListenerTiempoReal() {
        if (reservationsRef != null && reservationsListener != null) {
            reservationsRef.removeEventListener(reservationsListener);
        }
        reservationsRef = null;
        reservationsListener = null;
    }

    @Override
    protected void onCleared() {
        super.onCleared();
        pausarActualizacionesTiempoReal();
    }
}

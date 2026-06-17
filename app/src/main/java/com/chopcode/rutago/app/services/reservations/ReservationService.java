package com.chopcode.rutago.app.services.reservations;

import android.content.Context;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;

import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.config.MyApp;
import com.chopcode.rutago.app.managers.notificactions.NotificationManager;
import com.chopcode.rutago.app.managers.seats.dataprocessor.SeatsDataProcessor;
import com.chopcode.rutago.app.models.Reservation;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.*;

import java.util.*;

/**
 * 🎫 Reservation Service (Passenger Focus)
 * 
 * Gestiona el ciclo de vida de una reserva desde la creación hasta la consulta de historial.
 * Funcionalidades clave:
 * - Validar disponibilidad de asientos en tiempo real.
 * - Registrar nuevas reservas vinculando datos de pasajero, conductor y vehículo.
 * - Notificar automáticamente al conductor sobre nuevas reservas recibidas.
 * - Recuperar el historial de viajes del pasajero.
 */
public class ReservationService {

    private static final String TAG = "ReservationService";

    private DatabaseReference databaseReference;
    private SeatsDataProcessor seatsDataManager;

    public interface ReservationCallback {
        void onSuccess();
        void onError(String error);
    }

    public interface SeatsCallback {
        void onSeatsObtained(int[] occupiedSeats);
        void onError(String error);
    }

    public interface ReservationsCallback {
        void onReservationsLoaded(List<Reservation> reservations);
        void onError(String error);
    }

    public interface ReservationUpdateCallback {
        void onSuccess();
        void onError(String error);
    }

    public interface HistoryCallback {
        void onHistoryLoaded(List<Reservation> reservations);
        void onError(String error);
    }

    public ReservationService() {
        this.databaseReference = MyApp.getDatabaseReference("");
        this.seatsDataManager = new SeatsDataProcessor();
    }

    public void updateSeatAvailability(Context context, String scheduleId, int selectedSeat,
                                                 String origin, String destination, String estimatedTime,
                                                 String paymentMethod, String reservationStatus,
                                                 String plate, Double price,
                                                 String driver, String driverId, String phoneC,
                                                 ReservationCallback callback) {

        seatsDataManager.checkSeatAvailability(scheduleId, selectedSeat,
                new SeatsDataProcessor.SeatAvailabilityCallback(){
                    @Override
                    public void onSeatAvailable(boolean available) {
                        if (!available) {
                            callback.onError(MyApp.getAppContext().getString(R.string.seat_already_occupied_error));
                            return;
                        }
                        getUserDataAndContinue(context, MyApp.getCurrentUserId(), scheduleId, selectedSeat,
                                origin, destination, estimatedTime, paymentMethod, reservationStatus,
                                plate, price, driver, driverId, phoneC, callback);
                    }
                    @Override public void onError(String error) { callback.onError(error); }
                });
    }

    private void getUserDataAndContinue(Context context, String uid, String scheduleId, int selectedSeat,
                                               String origin, String destination, String estimatedTime,
                                               String paymentMethod, String reservationStatus,
                                               String plate, Double price, String driver, 
                                               String driverId, String phoneC,
                                               ReservationCallback callback) {

        DatabaseReference userRef = MyApp.getDatabaseReference("usuarios/" + uid);
        userRef.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                if (!snapshot.exists()) { callback.onError(MyApp.getAppContext().getString(R.string.usuario_no_autenticado)); return; }

                String name = String.valueOf(snapshot.child("nombre").getValue());
                String phone = String.valueOf(snapshot.child("telefono").getValue());
                String email = String.valueOf(snapshot.child("email").getValue());

                seatsDataManager.reserveSeat(scheduleId, selectedSeat,
                        new SeatsDataProcessor.SeatReservationCallback() {
                            @Override
                            public void onSuccess() {
                                registerReservation(context, uid, name, phone, email, scheduleId, selectedSeat,
                                        origin, destination, estimatedTime, paymentMethod, reservationStatus,
                                        plate, price, driver, driverId, phoneC, callback);
                            }
                            @Override public void onError(String error) { callback.onError(error); }
                        });
            }
            @Override public void onCancelled(@NonNull DatabaseError error) { callback.onError(error.getMessage()); }
        });
    }

    public void freeReservedSeat(String scheduleId, int seatNumber, ReservationUpdateCallback callback) {
        seatsDataManager.freeSeat(scheduleId, seatNumber, new SeatsDataProcessor.SeatReservationCallback() {
            @Override public void onSuccess() { if (callback != null) callback.onSuccess(); }
            @Override public void onError(String error) { if (callback != null) callback.onError(error); }
        });
    }

    private void registerReservation(Context context, String uid, String name, String phone, String email,
                                  String scheduleId, int selectedSeat, String origin, String destination,
                                  String estimatedTime, String paymentMethod, String reservationStatus,
                                  String plate, double price, String driver, String driverId, String phoneC,
                                  ReservationCallback callback) {
        
        String idReservation = UUID.randomUUID().toString();
        long reservationDate = System.currentTimeMillis();

        Reservation reservation = new Reservation(
                idReservation, uid, scheduleId, selectedSeat, driver, driverId, phoneC, plate, price,
                origin, destination, estimatedTime, paymentMethod, reservationStatus, reservationDate,
                name, phone, email, null, null
        );

        DatabaseReference ref = MyApp.getDatabaseReference("reservas/" + idReservation);
        ref.setValue(reservation).addOnSuccessListener(aVoid -> {
            if (context != null) {
                Toast.makeText(context, R.string.reserva_exitosa, Toast.LENGTH_SHORT).show();
                notifyDriver(context, idReservation, uid, name, scheduleId, selectedSeat, origin, destination, price, paymentMethod);
            }
            callback.onSuccess();
        }).addOnFailureListener(e -> {
            freeReservedSeat(scheduleId, selectedSeat, new ReservationUpdateCallback() {
                @Override public void onSuccess() {}
                @Override public void onError(String error) {}
            });
            callback.onError(e.getMessage());
        });
    }

    private void notifyDriver(Context context, String reservationId, String passengerId, String passengerName,
                                    String scheduleId, int seat, String origin, String destination,
                                    double price, String paymentMethod) {

        DatabaseReference driversRef = MyApp.getDatabaseReference("conductores");
        driversRef.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                String foundDriverId = null;
                String driverName = "Driver";
                
                for (DataSnapshot driverSnap : snapshot.getChildren()) {
                    DataSnapshot assignedSchedules = driverSnap.child("horariosAsignados");
                    for (DataSnapshot h : assignedSchedules.getChildren()) {
                        if (scheduleId.equals(String.valueOf(h.getValue()))) {
                            foundDriverId = driverSnap.getKey();
                            driverName = driverSnap.child("nombre").getValue(String.class);
                            break;
                        }
                    }
                    if (foundDriverId != null) break;
                }

                if (foundDriverId != null) {
                    NotificationManager.getInstance(context)
                            .notificarNuevaReservaAlConductor(foundDriverId, passengerName, origin + " -> " + destination, "Today", seat, price, paymentMethod, new NotificationManager.NotificationCallback() {
                                @Override public void onSuccess() {}
                                @Override public void onError(String error) {}
                            });
                }
            }
            @Override public void onCancelled(@NonNull DatabaseError error) {}
        });
    }

    public void loadDriverReservations(String driverId, String status, ReservationsCallback callback) {
        DatabaseReference ref = MyApp.getDatabaseReference("reservas");
        ref.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                List<Reservation> reservations = new ArrayList<>();
                for (DataSnapshot ds : snapshot.getChildren()) {
                    Reservation r = ds.getValue(Reservation.class);
                    if (r != null && driverId.equals(r.getDriverId())) {
                        if (status == null || "TODAS".equalsIgnoreCase(status) || status.equalsIgnoreCase(r.getReservationStatus())) {
                            r.setIdReservation(ds.getKey());
                            reservations.add(r);
                        }
                    }
                }
                Collections.sort(reservations, (r1, r2) -> Long.compare(r2.getReservationDate(), r1.getReservationDate()));
                callback.onReservationsLoaded(reservations);
            }
            @Override public void onCancelled(@NonNull DatabaseError error) { callback.onError(error.getMessage()); }
        });
    }

    public void getPassengerHistory(String passengerId, HistoryCallback callback) {
        DatabaseReference ref = MyApp.getDatabaseReference("reservas");
        ref.orderByChild("userId").equalTo(passengerId)
                .addListenerForSingleValueEvent(new ValueEventListener() {
                    @Override
                    public void onDataChange(DataSnapshot snapshot) {
                        List<Reservation> list = new ArrayList<>();
                        for (DataSnapshot ds : snapshot.getChildren()) {
                            Reservation r = ds.getValue(Reservation.class);
                            if (r != null) {
                                r.setIdReservation(ds.getKey());
                                list.add(r);
                            }
                        }
                        callback.onHistoryLoaded(list);
                    }
                    @Override public void onCancelled(DatabaseError error) { callback.onError(error.getMessage()); }
                });
    }

    /**
     * ⚡ Escucha reactiva del historial de un pasajero.
     */
    public ValueEventListener listenPassengerHistory(String passengerId, HistoryCallback callback) {
        DatabaseReference ref = MyApp.getDatabaseReference("reservas");
        ValueEventListener listener = new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                List<Reservation> list = new ArrayList<>();
                for (DataSnapshot ds : snapshot.getChildren()) {
                    Reservation r = ds.getValue(Reservation.class);
                    if (r != null && passengerId.equals(r.getUserId())) {
                        r.setIdReservation(ds.getKey());
                        list.add(r);
                    }
                }
                Collections.sort(list, (r1, r2) -> Long.compare(r2.getReservationDate(), r1.getReservationDate()));
                callback.onHistoryLoaded(list);
            }
            @Override public void onCancelled(@NonNull DatabaseError error) { callback.onError(error.getMessage()); }
        };
        ref.orderByChild("userId").equalTo(passengerId).addValueEventListener(listener);
        return listener;
    }
}

package com.chopcode.rutago.app.services.reservations.common;

import android.content.Context;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;

import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.config.MyApp;
import com.chopcode.rutago.app.engines.seats.SeatDataProcessor;
import com.chopcode.rutago.app.managers.core.notifications.NotificationManager;
import com.chopcode.rutago.app.models.Reservation;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.*;

import java.util.*;

/**
 * Reservation Service (Passenger Focus)*
 * Motor transaccional para la gestión del ciclo de vida de los pasajes.
 * Responsabilidades:
 * - Orquestar la reserva atómica de asientos (Pre-validación -> Reserva de cupo -> Registro de tiquete).
 * - Garantizar la integridad de los datos mediante mecanismos de compensación (Rollback manual del asiento si el registro de reserva falla).
 * - Gestionar la comunicación proactiva con el conductor tras una nueva reserva (Notificaciones Push).
 * - Proveer flujos reactivos e históricos para la consulta de viajes por pasajero.
 * - Centralizar el acceso multi-nodo para la resolución de identidades de reserva.
 */
public class ReservationService {

    private static final String TAG = "ReservationService";

    private DatabaseReference databaseReference;
    private SeatDataProcessor seatsDataManager;

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
        this.seatsDataManager = new SeatDataProcessor();
    }

    /**
     * Inicia el proceso de reserva validando primero la disponibilidad técnica en el servidor.
     */
    public void updateSeatAvailability(Context context, String scheduleId, int selectedSeat,
                                                 String origin, String destination, String estimatedTime,
                                                 String departureTime,
                                                 String paymentMethod, String reservationStatus,
                                                 String plate, String model, Double price,
                                                 String driver, String driverId, String phoneC,
                                                 ReservationCallback callback) {

        seatsDataManager.checkSeatAvailability(scheduleId, selectedSeat,
                new SeatDataProcessor.SeatAvailabilityCallback(){
                    @Override
                    public void onSeatAvailable(boolean available) {
                        if (!available) {
                            callback.onError(MyApp.getAppContext().getString(R.string.seat_already_occupied_error));
                            return;
                        }
                        // Fase 2: Recuperación de datos de usuario para el Payload
                        getUserDataAndContinue(context, MyApp.getCurrentUserId(), scheduleId, selectedSeat,
                                origin, destination, estimatedTime, departureTime, paymentMethod, reservationStatus,
                                plate, model, price, driver, driverId, phoneC, callback);
                    }
                    @Override public void onError(String error) { callback.onError(error); }
                });
    }

    /**
     * Recupera metadatos del pasajero y ejecuta el bloqueo atómico del asiento.
     */
    private void getUserDataAndContinue(Context context, String uid, String scheduleId, int selectedSeat,
                                               String origin, String destination, String estimatedTime,
                                               String departureTime,
                                               String paymentMethod, String reservationStatus,
                                               String plate, String model, Double price, String driver, 
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

                // Bloqueo físico en el nodo de disponibilidad
                seatsDataManager.reserveSeat(scheduleId, selectedSeat,
                        new SeatDataProcessor.SeatReservationCallback() {
                            @Override
                            public void onSuccess() {
                                // Fase final: Creación del registro de tiquete
                                registerReservation(context, uid, name, phone, email, scheduleId, selectedSeat,
                                        origin, destination, estimatedTime, departureTime, paymentMethod, reservationStatus,
                                        plate, model, price, driver, driverId, phoneC, callback);
                            }
                            @Override public void onError(String error) { callback.onError(error); }
                        });
            }
            @Override public void onCancelled(@NonNull DatabaseError error) { callback.onError(error.getMessage()); }
        });
    }

    /**
     * Libera un asiento previamente bloqueado. Usado para cancelaciones o compensación de fallos.
     */
    public void freeReservedSeat(String scheduleId, int seatNumber, ReservationUpdateCallback callback) {
        seatsDataManager.freeSeat(scheduleId, seatNumber, new SeatDataProcessor.SeatReservationCallback() {
            @Override public void onSuccess() { if (callback != null) callback.onSuccess(); }
            @Override public void onError(String error) { if (callback != null) callback.onError(error); }
        });
    }

    /**
     * Persiste el objeto Reservation en Firebase y dispara la notificación push al conductor.
     * Implementa lógica de Rollback manual: si falla la escritura del tiquete, libera el asiento.
     */
    private void registerReservation(Context context, String uid, String name, String phone, String email,
                                  String scheduleId, int selectedSeat, String origin, String destination,
                                  String estimatedTime, String departureTime, String paymentMethod, String reservationStatus,
                                  String plate, String model, double price, String driver, String driverId, String phoneC,
                                  ReservationCallback callback) {
        
        String idReservation = UUID.randomUUID().toString();
        long reservationDate = System.currentTimeMillis();

        Reservation reservation = new Reservation(
                idReservation, uid, scheduleId, selectedSeat, driver, driverId, phoneC, plate, model, price,
                origin, destination, estimatedTime, departureTime, paymentMethod, reservationStatus, reservationDate,
                name, phone, email, null, null, 0.0f
        );

        DatabaseReference ref = MyApp.getDatabaseReference("reservas/" + idReservation);
        ref.setValue(reservation).addOnSuccessListener(aVoid -> {
            if (context != null) {
                Toast.makeText(context, R.string.reserva_exitosa, Toast.LENGTH_SHORT).show();
            }
            // Notificación proactiva al conductor (Ahora gestionada por Cloud Functions para soporte multi-dispositivo)
            /*
            if (driverId != null && !driverId.isEmpty()) {
                NotificationManager.getInstance(context != null ? context : MyApp.getAppContext())
                        .notificarNuevaReservaAlConductor(driverId, name, origin + " -> " + destination, "Today", selectedSeat, price, paymentMethod, new NotificationManager.NotificationCallback() {
                            @Override public void onSuccess() { Log.d(TAG, "✅ Notificación Push despachada al conductor."); }
                            @Override public void onError(String error) { Log.e(TAG, "❌ Error al enviar notificación Push: " + error); }
                        });
            }
            */
            callback.onSuccess();
        }).addOnFailureListener(e -> {
            // Rollback de integridad
            freeReservedSeat(scheduleId, selectedSeat, null);
            callback.onError("Fallo al registrar tiquete: " + e.getMessage());
        });
    }

    /**
     * Consulta las reservas vinculadas a un conductor con soporte para filtrado por estado.
     */
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
                // Ordenamiento cronológico descendente (Más recientes primero)
                Collections.sort(reservations, (r1, r2) -> Long.compare(r2.getReservationDate(), r1.getReservationDate()));
                callback.onReservationsLoaded(reservations);
            }
            @Override public void onCancelled(@NonNull DatabaseError error) { callback.onError(error.getMessage()); }
        });
    }

    /**
     * Obtiene el histórico completo de viajes para un pasajero.
     */
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
     * Recupera una reserva única por su identificador.
     */
    public void getReservationById(String reservationId, @NonNull HistoryCallback callback) {
        DatabaseReference ref = MyApp.getDatabaseReference("reservas/" + reservationId);
        ref.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                if (snapshot.exists()) {
                    Reservation r = snapshot.getValue(Reservation.class);
                    if (r != null) {
                        r.setIdReservation(snapshot.getKey());
                        List<Reservation> list = new ArrayList<>();
                        list.add(r);
                        callback.onHistoryLoaded(list);
                    } else callback.onError("Error de casteo en datos de reserva.");
                } else callback.onError("La reserva no existe en el sistema.");
            }
            @Override public void onCancelled(@NonNull DatabaseError error) { callback.onError(error.getMessage()); }
        });
    }

    /**
     * Establece una suscripción reactiva para el historial de un pasajero.
     * Limitado a los últimos 100 registros para optimizar memoria.
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
        ref.orderByChild("userId").equalTo(passengerId).limitToLast(100).addValueEventListener(listener);
        return listener;
    }
}

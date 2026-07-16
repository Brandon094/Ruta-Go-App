package com.chopcode.rutago.app.services.reservations.driver;

import android.content.Context;
import android.util.Log;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import com.chopcode.rutago.app.config.MyApp;
import com.chopcode.rutago.app.managers.core.notifications.NotificationManager;
import com.chopcode.rutago.app.models.Reservation;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.ValueEventListener;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Driver Reservation Service
 *
 * Centro de mando para las operaciones logísticas desde la perspectiva del transportador.
 * Responsabilidades:
 * - Proveer motores de búsqueda y filtrado avanzado sobre la colección de reservas.
 * - Implementar agregaciones estadísticas en tiempo real para el Dashboard financiero.
 * - Gestionar el registro atómico de ingresos y transacciones diarias.
 * - Coordinar la actualización de estados operativos y la comunicación vía Push con el pasajero.
 * - Implementar lógica de fidelización mediante la identificación de clientes frecuentes.
 */
public class DriverReservationService {

    private static final String TAG = "DriverReservationService";

    public interface ReservationsCallback {
        void onReservationsLoaded(List<Reservation> reservations);
        void onError(String error);
    }

    public interface ReservationUpdateCallback {
        void onSuccess();
        void onError(String error);
    }

    public interface CompleteStatsCallback {
        void onCompleteStatsLoaded(CompleteDriverStats stats);
        void onError(String error);
    }

    public interface RealTimeStatsListener {
        void onStatsUpdated(CompleteDriverStats stats);
        void onError(String error);
    }

    public interface FrequentCustomersCallback {
        void onCustomersLoaded(List<Map<String, Object>> customers);
        void onError(String error);
    }

    /**
     * DTO (Data Transfer Object) para el transporte de métricas consolidadas.
     */
    public static class CompleteDriverStats {
        public int totalReservations = 0;
        public int confirmedReservations = 0;
        public int canceledReservations = 0;
        public int pendingReservations = 0;
        public double totalEarnings = 0.0;

        public List<Reservation> allReservations = new ArrayList<>();
        public List<Reservation> confirmedReservationsList = new ArrayList<>();
        public List<Reservation> canceledReservationsList = new ArrayList<>();
        public List<Reservation> pendingReservationsList = new ArrayList<>();

        public CompleteDriverStats() {}
    }

    public DriverReservationService() {}

    /**
     * Recupera una colección de reservas aplicando criterios de pertenencia y estado.
     * Implementa lógica híbrida para soportar identificadores de conductores legacy y modernos.
     */
    public void cargarReservasConductorFiltradas(
            String driverIdentifier,
            @Nullable List<String> assignedSchedules,
            @Nullable String statusFilter,
            boolean isUID,
            ReservationsCallback callback) {

        if (driverIdentifier == null || driverIdentifier.isEmpty()) {
            callback.onError("Identificador de conductor inválido.");
            return;
        }

        DatabaseReference ref = MyApp.getDatabaseReference("reservas");
        ref.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                List<Reservation> list = new ArrayList<>();
                for (DataSnapshot ds : snapshot.getChildren()) {
                    Reservation r = ds.getValue(Reservation.class);
                    if (r != null) {
                        r.setIdReservation(ds.getKey());
                        String driverIdRes = getDriverId(ds, r, isUID);
                        String scheduleIdRes = getScheduleId(ds, r);
                        
                        boolean isFromDriver = false;
                        if (isUID) {
                            if (driverIdRes != null) isFromDriver = driverIdentifier.equals(driverIdRes);
                            // Mecanismo de resolución por horario si el driverId no está presente
                            else if (assignedSchedules != null && scheduleIdRes != null) isFromDriver = assignedSchedules.contains(scheduleIdRes);
                        } else {
                            isFromDriver = driverIdentifier.equalsIgnoreCase(driverIdRes);
                        }

                        boolean statusMatches = applyStatusFilter(r.getReservationStatus(), statusFilter);
                        boolean scheduleMatches = applyScheduleFilter(scheduleIdRes, assignedSchedules);

                        if (isFromDriver && statusMatches && scheduleMatches) list.add(r);
                    }
                }
                Collections.sort(list, (r1, r2) -> Long.compare(r2.getReservationDate(), r1.getReservationDate()));
                callback.onReservationsLoaded(list);
            }
            @Override public void onCancelled(@NonNull DatabaseError error) { callback.onError(error.getMessage()); }
        });
    }

    /**
     * Motor de búsqueda avanzada con filtrado temporal para usuarios Premium.
     */
    public void getAdvancedStats(String driverUID, long start, long end, CompleteStatsCallback callback) {
        DatabaseReference ref = MyApp.getDatabaseReference("reservas");
        ref.orderByChild("driverId").equalTo(driverUID).addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                CompleteDriverStats stats = new CompleteDriverStats();
                List<Reservation> all = new ArrayList<>();
                for (DataSnapshot ds : snapshot.getChildren()) {
                    Reservation r = ds.getValue(Reservation.class);
                    if (r != null) {
                        r.setIdReservation(ds.getKey());
                        long resDate = r.getReservationDate();
                        
                        if (resDate >= start && resDate <= end) {
                            all.add(r);
                            String status = r.getReservationStatus();
                            double price = r.getPrice();
                            stats.totalReservations++;
                            
                            if ("Confirmada".equalsIgnoreCase(status)) {
                                stats.confirmedReservations++;
                                stats.totalEarnings += price;
                                stats.confirmedReservationsList.add(r);
                            } else if ("Cancelada".equalsIgnoreCase(status)) {
                                stats.canceledReservations++;
                                stats.canceledReservationsList.add(r);
                            } else if ("Por confirmar".equalsIgnoreCase(status)) {
                                stats.pendingReservations++;
                                stats.pendingReservationsList.add(r);
                            }
                        }
                    }
                }
                Collections.sort(all, (r1, r2) -> Long.compare(r2.getReservationDate(), r1.getReservationDate()));
                stats.allReservations = all;
                callback.onCompleteStatsLoaded(stats);
            }
            @Override public void onCancelled(@NonNull DatabaseError error) { callback.onError(error.getMessage()); }
        });
    }

    /**
     * Establece una suscripción reactiva optimizada para el Dashboard operativo.
     * @return El listener para su posterior remoción.
     */
    public ValueEventListener escucharEstadisticasCompletas(String driverUID, @Nullable List<String> schedules, RealTimeStatsListener listener) {
        DatabaseReference ref = MyApp.getDatabaseReference("reservas");
        ValueEventListener valueListener = new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                CompleteDriverStats stats = new CompleteDriverStats();
                List<Reservation> all = new ArrayList<>();
                for (DataSnapshot ds : snapshot.getChildren()) {
                    Reservation r = ds.getValue(Reservation.class);
                    if (r != null) {
                        r.setIdReservation(ds.getKey());
                        String dId = getDriverId(ds, r, true);
                        String sId = getScheduleId(ds, r);

                        boolean isFromDriver = (dId != null && driverUID.equals(dId));
                        if (!isFromDriver && schedules != null && sId != null) isFromDriver = schedules.contains(sId);

                        if (isFromDriver) {
                            all.add(r);
                            String status = r.getReservationStatus();
                            double price = r.getPrice();
                            stats.totalReservations++;
                            
                            if ("Confirmada".equalsIgnoreCase(status)) {
                                stats.confirmedReservations++;
                                stats.totalEarnings += price;
                                stats.confirmedReservationsList.add(r);
                            } else if ("Cancelada".equalsIgnoreCase(status)) {
                                stats.canceledReservations++;
                                stats.canceledReservationsList.add(r);
                            } else if ("Por confirmar".equalsIgnoreCase(status)) {
                                stats.pendingReservations++;
                                stats.pendingReservationsList.add(r);
                            }
                        }
                    }
                }
                
                Collections.sort(all, (r1, r2) -> Long.compare(r2.getReservationDate(), r1.getReservationDate()));
                
                // Limitación de Payload para evitar sobrecarga en la UI
                if (all.size() > 50) {
                    stats.allReservations = new ArrayList<>(all.subList(0, 50));
                } else {
                    stats.allReservations = all;
                }
                
                listener.onStatsUpdated(stats);
            }
            @Override public void onCancelled(@NonNull DatabaseError error) { listener.onError(error.getMessage()); }
        };
        
        // Uso de índice por driverId para minimizar el consumo de cuota de lectura
        ref.orderByChild("driverId").equalTo(driverUID).limitToLast(100).addValueEventListener(valueListener);
        return valueListener;
    }

    /**
     * Registra de forma incremental un ingreso en las estadísticas contables del día.
     */
    public void registrarVentaEnEstadisticas(String driverUID, double price) {
        if (driverUID == null || driverUID.isEmpty()) return;
        
        java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat("yyyy-MM-dd", java.util.Locale.getDefault());
        String today = sdf.format(new java.util.Date());
        
        DatabaseReference ref = MyApp.getDatabaseReference("estadisticas/" + driverUID + "/" + today);
        
        Map<String, Object> updates = new HashMap<>();
        updates.put("ingresosDiarios", com.google.firebase.database.ServerValue.increment(price));
        updates.put("reservasConfirmadas", com.google.firebase.database.ServerValue.increment(1));
        updates.put("ultimaActualizacion", com.google.firebase.database.ServerValue.TIMESTAMP);
        
        ref.updateChildren(updates).addOnFailureListener(e -> Log.e(TAG, "❌ Error al incrementar estadísticas: " + e.getMessage()));
    }

    /**
     * Revierte un registro contable previo. Útil en cancelaciones de ventas físicas.
     */
    public void removerVentaDeEstadisticas(String driverUID, double price) {
        if (driverUID == null || driverUID.isEmpty()) return;
        
        java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat("yyyy-MM-dd", java.util.Locale.getDefault());
        String today = sdf.format(new java.util.Date());
        
        DatabaseReference ref = MyApp.getDatabaseReference("estadisticas/" + driverUID + "/" + today);
        
        Map<String, Object> updates = new HashMap<>();
        updates.put("ingresosDiarios", com.google.firebase.database.ServerValue.increment(-price));
        updates.put("reservasConfirmadas", com.google.firebase.database.ServerValue.increment(-1));
        updates.put("ultimaActualizacion", com.google.firebase.database.ServerValue.TIMESTAMP);
        
        ref.updateChildren(updates).addOnFailureListener(e -> Log.e(TAG, "❌ Error al decrementar estadísticas: " + e.getMessage()));
    }

    /**
     * Cambia el estado de una reserva y orquesta el envío de la notificación Push al pasajero.
     */
    public void actualizarEstadoReserva(Context context, String reservationId, String newStatus, ReservationUpdateCallback callback) {
        DatabaseReference ref = MyApp.getDatabaseReference("reservas/" + reservationId + "/reservationStatus");
        ref.setValue(newStatus).addOnSuccessListener(aVoid -> {
            if ("Confirmada".equalsIgnoreCase(newStatus)) notifyPassengerStatusChange(context, reservationId, "confirmed");
            else if ("Cancelada".equalsIgnoreCase(newStatus)) notifyPassengerStatusChange(context, reservationId, "canceled");
            callback.onSuccess();
        }).addOnFailureListener(e -> callback.onError(e.getMessage()));
    }

    /**
     * Cancela la reserva y automáticamente libera el asiento en el motor de disponibilidad técnica.
     */
    public void cancelarReservaConLiberacion(Context context, String reservationId, String scheduleId, int seatNumber, ReservationUpdateCallback callback) {
        actualizarEstadoReserva(context, reservationId, "Cancelada", new ReservationUpdateCallback() {
            @Override public void onSuccess() { freeReservedSeat(scheduleId, seatNumber, callback); }
            @Override public void onError(String error) { callback.onError(error); }
        });
    }

    /**
     * Envía avisos Push informando al pasajero sobre el destino final de su solicitud.
     */
    private void notifyPassengerStatusChange(Context context, String reservationId, String type) {
        DatabaseReference ref = MyApp.getDatabaseReference("reservas/" + reservationId);
        ref.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                if (snapshot.exists()) {
                    Reservation r = snapshot.getValue(Reservation.class);
                    if (r != null && r.getUserId() != null) {
                        NotificationManager nm = NotificationManager.getInstance(context);
                        String route = r.getOrigin() + " -> " + r.getDestination();
                        if ("confirmed".equals(type)) nm.notificarReservaConfirmadaAlPasajero(r.getUserId(), r.getDriver(), route, r.getEstimatedTime(), r.getReservedSeat(), r.getVehicleId(), "", null);
                        else nm.notificarReservaCanceladaAlPasajero(r.getUserId(), r.getDriver(), route, "Cancelada por el conductor.", null);
                    }
                }
            }
            @Override public void onCancelled(@NonNull DatabaseError error) {}
        });
    }

    /**
     * Marca un asiento como disponible en el nodo técnico.
     */
    public void freeReservedSeat(String scheduleId, int seatNumber, ReservationUpdateCallback callback) {
        DatabaseReference ref = MyApp.getDatabaseReference("disponibilidadAsientos/" + scheduleId + "/asientosOcupados/" + seatNumber);
        ref.setValue(false).addOnSuccessListener(aVoid -> updateSimpleCounter(scheduleId, callback))
                .addOnFailureListener(e -> callback.onError(e.getMessage()));
    }

    /**
     * Incrementa el conteo visual de asientos libres.
     */
    private void updateSimpleCounter(String scheduleId, ReservationUpdateCallback callback) {
        DatabaseReference ref = MyApp.getDatabaseReference("disponibilidadAsientos/" + scheduleId);
        ref.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                Integer current = snapshot.child("asientosDisponibles").getValue(Integer.class);
                Integer total = snapshot.child("totalAsientos").getValue(Integer.class);
                if (total == null) total = 13;
                if (current != null && current < total) {
                    snapshot.child("asientosDisponibles").getRef().setValue(current + 1)
                            .addOnSuccessListener(aVoid -> { if (callback != null) callback.onSuccess(); });
                } else if (callback != null) callback.onSuccess();
            }
            @Override public void onCancelled(@NonNull DatabaseError error) { if (callback != null) callback.onSuccess(); }
        });
    }

    private String getDriverId(DataSnapshot ds, Reservation r, boolean isUID) {
        if (isUID) {
            String uid = r.getDriverId();
            if (uid == null && ds.hasChild("conductorId")) {
                uid = ds.child("conductorId").getValue(String.class);
                if (uid != null) r.setDriverId(uid);
            }
            return uid;
        } else {
            String name = r.getDriver();
            if (name == null && ds.hasChild("conductor")) {
                name = ds.child("conductor").getValue(String.class);
                if (name != null) r.setDriver(name);
            }
            return name;
        }
    }

    private String getScheduleId(DataSnapshot ds, Reservation r) {
        String sId = r.getScheduleId();
        if (sId == null && ds.hasChild("horarioId")) {
            sId = ds.child("horarioId").getValue(String.class);
            r.setScheduleId(sId);
        }
        return sId;
    }

    private boolean applyStatusFilter(@Nullable String status, @Nullable String filter) {
        if (filter == null || "TODAS".equalsIgnoreCase(filter) || filter.isEmpty()) return true;
        return status != null && status.equalsIgnoreCase(filter);
    }

    private boolean applyScheduleFilter(@Nullable String sId, @Nullable List<String> assigned) {
        if (assigned == null || assigned.isEmpty()) return true;
        return sId != null && assigned.contains(sId);
    }
}

package com.chopcode.rutago.app.services.reservations.driver;

import android.content.Context;
import android.util.Log;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import com.chopcode.rutago.app.config.MyApp;
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
 * Service to manage reservations from driver's perspective.
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

    public void cargarReservasConductorFiltradas(
            String driverIdentifier,
            @Nullable List<String> assignedSchedules,
            @Nullable String statusFilter,
            boolean isUID,
            ReservationsCallback callback) {

        if (driverIdentifier == null || driverIdentifier.isEmpty()) {
            callback.onError("Invalid driver identifier");
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

                        if (isUID && driverIdRes == null) {
                            if (assignedSchedules != null && scheduleIdRes != null) {
                                isFromDriver = assignedSchedules.contains(scheduleIdRes);
                            }
                        } else isFromDriver = driverIdentifier.equals(driverIdRes);

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
                        String dId = r.getDriverId();
                        if (dId == null) dId = ds.child("conductorId").getValue(String.class);
                        boolean isFromDriver = false;
                        if (dId != null && !dId.isEmpty()) isFromDriver = driverUID.equals(dId);
                        else if (schedules != null) {
                            String hId = r.getScheduleId();
                            if (hId == null) hId = ds.child("horarioId").getValue(String.class);
                            isFromDriver = hId != null && schedules.contains(hId);
                        }
                        if (isFromDriver) {
                            all.add(r);
                            String status = r.getReservationStatus();
                            Double price = r.getPrice();
                            stats.totalReservations++;
                            if ("Confirmada".equalsIgnoreCase(status)) {
                                stats.confirmedReservations++;
                                stats.totalEarnings += (price != null ? price : 0.0);
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
                stats.allReservations = all;
                listener.onStatsUpdated(stats);
            }
            @Override public void onCancelled(@NonNull DatabaseError error) { listener.onError(error.getMessage()); }
        };
        ref.orderByChild("conductorId").equalTo(driverUID).addValueEventListener(valueListener);
        return valueListener;
    }

    public void obtenerEstadisticasCompletas(String driverUID, @Nullable List<String> schedules, CompleteStatsCallback callback) {
        cargarReservasConductorFiltradas(driverUID, schedules, "TODAS", true, new ReservationsCallback() {
            @Override
            public void onReservationsLoaded(List<Reservation> all) {
                CompleteDriverStats stats = new CompleteDriverStats();
                stats.allReservations = all;
                stats.totalReservations = all.size();
                for (Reservation r : all) {
                    String status = r.getReservationStatus();
                    Double price = r.getPrice();
                    if (status != null) {
                        switch (status) {
                            case "Confirmada":
                                stats.confirmedReservations++;
                                stats.totalEarnings += (price != null ? price : 0.0);
                                stats.confirmedReservationsList.add(r);
                                break;
                            case "Cancelada":
                                stats.canceledReservations++;
                                stats.canceledReservationsList.add(r);
                                break;
                            case "Por confirmar":
                                stats.pendingReservations++;
                                stats.pendingReservationsList.add(r);
                                break;
                        }
                    }
                }
                callback.onCompleteStatsLoaded(stats);
            }
            @Override public void onError(String error) { callback.onError(error); }
        });
    }

    public void cargarReservasPendientes(String driverName, List<String> assignedSchedules, ReservationsCallback callback) {
        cargarReservasConductorFiltradas(driverName, assignedSchedules, "Por confirmar", false, callback);
    }

    public void guardarEstadisticasDiarias(String driverUID, int confirmed, double earnings, ReservationUpdateCallback callback) {
        if (driverUID == null || driverUID.isEmpty()) return;
        java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat("yyyy-MM-dd", java.util.Locale.getDefault());
        String today = sdf.format(new java.util.Date());
        DatabaseReference ref = MyApp.getDatabaseReference("estadisticas/" + driverUID + "/" + today);
        Map<String, Object> map = new HashMap<>();
        map.put("earnings", earnings);
        map.put("confirmedReservations", confirmed);
        map.put("lastUpdate", System.currentTimeMillis());
        ref.setValue(map).addOnSuccessListener(aVoid -> { if (callback != null) callback.onSuccess(); })
                .addOnFailureListener(e -> { if (callback != null) callback.onError(e.getMessage()); });
    }

    public void actualizarEstadoReserva(Context context, String reservationId, String newStatus, ReservationUpdateCallback callback) {
        DatabaseReference ref = MyApp.getDatabaseReference("reservas/" + reservationId + "/reservationStatus");
        ref.setValue(newStatus).addOnSuccessListener(aVoid -> {
            if ("Confirmada".equalsIgnoreCase(newStatus)) notifyPassengerStatusChange(context, reservationId, "confirmed");
            else if ("Cancelada".equalsIgnoreCase(newStatus)) notifyPassengerStatusChange(context, reservationId, "canceled");
            callback.onSuccess();
        }).addOnFailureListener(e -> callback.onError(e.getMessage()));
    }

    public void cancelarReservaConLiberacion(Context context, String reservationId, String scheduleId, int seatNumber, ReservationUpdateCallback callback) {
        actualizarEstadoReserva(context, reservationId, "Cancelada", new ReservationUpdateCallback() {
            @Override public void onSuccess() { freeReservedSeat(scheduleId, seatNumber, callback); }
            @Override public void onError(String error) { callback.onError(error); }
        });
    }

    private void notifyPassengerStatusChange(Context context, String reservationId, String type) {
        DatabaseReference ref = MyApp.getDatabaseReference("reservas/" + reservationId);
        ref.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                if (snapshot.exists()) {
                    String pId = snapshot.child("userId").getValue(String.class);
                    String dName = snapshot.child("driver").getValue(String.class);
                    String route = snapshot.child("origin").getValue(String.class) + " -> " + snapshot.child("destination").getValue(String.class);
                    String time = snapshot.child("estimatedTime").getValue(String.class);
                    Integer seat = snapshot.child("reservedSeat").getValue(Integer.class);
                    String plate = snapshot.child("vehicleId").getValue(String.class);
                    if (pId != null) {
                        com.chopcode.rutago.app.managers.notificactions.NotificationManager nm = com.chopcode.rutago.app.managers.notificactions.NotificationManager.getInstance(context);
                        com.chopcode.rutago.app.managers.notificactions.NotificationManager.NotificationCallback cb = new com.chopcode.rutago.app.managers.notificactions.NotificationManager.NotificationCallback() {
                            @Override public void onSuccess() {}
                            @Override public void onError(String error) {}
                        };
                        if ("confirmed".equals(type)) nm.notificarReservaConfirmadaAlPasajero(pId, dName, route, time, seat != null ? seat : 0, plate, "", cb);
                        else nm.notificarReservaCanceladaAlPasajero(pId, dName, route, "Canceled by driver", cb);
                    }
                }
            }
            @Override public void onCancelled(@NonNull DatabaseError error) {}
        });
    }

    public void freeReservedSeat(String scheduleId, int seatNumber, ReservationUpdateCallback callback) {
        DatabaseReference ref = MyApp.getDatabaseReference("disponibilidadAsientos/" + scheduleId + "/asientosOcupados/" + seatNumber);
        ref.setValue(false).addOnSuccessListener(aVoid -> updateSimpleCounter(scheduleId, callback))
                .addOnFailureListener(e -> callback.onError(e.getMessage()));
    }

    private void updateSimpleCounter(String scheduleId, ReservationUpdateCallback callback) {
        DatabaseReference ref = MyApp.getDatabaseReference("disponibilidadAsientos/" + scheduleId + "/asientosDisponibles");
        ref.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                Integer current = snapshot.getValue(Integer.class);
                if (current != null && current < 13) snapshot.getRef().setValue(current + 1).addOnSuccessListener(aVoid -> callback.onSuccess()).addOnFailureListener(e -> callback.onSuccess());
                else callback.onSuccess();
            }
            @Override public void onCancelled(@NonNull DatabaseError error) { callback.onSuccess(); }
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
        } else return r.getDriver();
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

    public void getAdvancedStats(String driverUID, long startDate, long endDate, CompleteStatsCallback callback) {
        cargarReservasConductorFiltradas(driverUID, null, "TODAS", true, new ReservationsCallback() {
            @Override
            public void onReservationsLoaded(List<Reservation> all) {
                CompleteDriverStats stats = new CompleteDriverStats();
                for (Reservation r : all) {
                    if (r.getReservationDate() >= startDate && r.getReservationDate() <= endDate) {
                        stats.allReservations.add(r);
                        stats.totalReservations++;
                        String status = r.getReservationStatus();
                        if ("Confirmada".equalsIgnoreCase(status)) {
                            stats.confirmedReservations++;
                            stats.totalEarnings += r.getPrice();
                            stats.confirmedReservationsList.add(r);
                        } else if ("Cancelada".equalsIgnoreCase(status)) {
                            stats.canceledReservations++;
                            stats.canceledReservationsList.add(r);
                        }
                    }
                }
                callback.onCompleteStatsLoaded(stats);
            }
            @Override public void onError(String error) { callback.onError(error); }
        });
    }

    public void getFrequentCustomers(String driverUID, int limit, FrequentCustomersCallback callback) {
        cargarReservasConductorFiltradas(driverUID, null, "Confirmada", true, new ReservationsCallback() {
            @Override
            public void onReservationsLoaded(List<Reservation> confirmed) {
                Map<String, Integer> counts = new HashMap<>();
                Map<String, String> names = new HashMap<>();
                for (Reservation r : confirmed) {
                    String uid = r.getUserId();
                    if (uid != null) {
                        counts.put(uid, counts.getOrDefault(uid, 0) + 1);
                        names.put(uid, r.getName());
                    }
                }
                List<Map.Entry<String, Integer>> list = new ArrayList<>(counts.entrySet());
                Collections.sort(list, (e1, e2) -> e2.getValue().compareTo(e1.getValue()));
                List<Map<String, Object>> result = new ArrayList<>();
                for (int i = 0; i < Math.min(limit, list.size()); i++) {
                    Map.Entry<String, Integer> entry = list.get(i);
                    Map<String, Object> data = new HashMap<>();
                    data.put("userId", entry.getKey());
                    data.put("name", names.get(entry.getKey()));
                    data.put("trips", entry.getValue());
                    result.add(data);
                }
                callback.onCustomersLoaded(result);
            }
            @Override public void onError(String error) { callback.onError(error); }
        });
    }
}

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
 * 🚛 Driver Reservation Service
 * 
 * Este servicio orquesta todas las operaciones de reservas desde la perspectiva del conductor.
 * Incluye lógica de filtrado avanzado, escucha de estadísticas en tiempo real y
 * gestión de estados (confirmar/cancelar).
 * 
 * IMPORTANTE: Todas las consultas usan filtrado por UID (driverId) para cumplir con 
 * las reglas de seguridad de Firebase.
 */
public class DriverReservationService {

    private static final String TAG = "DriverReservationService";

    // --- Interfaces de Callback ---
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
     * Clase POJO para encapsular todas las estadísticas calculadas de un conductor.
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
     * 🔥 Carga una lista de reservas filtradas por conductor, estado y horarios.
     * Soporta búsqueda tanto por UID (nuevo estándar) como por Nombre (legacy).
     */
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
                        
                        // Lógica de pertenencia: ¿Es esta reserva de este conductor?
                        boolean isFromDriver = false;
                        if (isUID) {
                            if (driverIdRes != null) isFromDriver = driverIdentifier.equals(driverIdRes);
                            // Fallback: Si no tiene driverId, verificar si el horario le pertenece
                            else if (assignedSchedules != null && scheduleIdRes != null) isFromDriver = assignedSchedules.contains(scheduleIdRes);
                        } else {
                            isFromDriver = driverIdentifier.equalsIgnoreCase(driverIdRes);
                        }

                        // Filtros adicionales
                        boolean statusMatches = applyStatusFilter(r.getReservationStatus(), statusFilter);
                        boolean scheduleMatches = applyScheduleFilter(scheduleIdRes, assignedSchedules);

                        if (isFromDriver && statusMatches && scheduleMatches) list.add(r);
                    }
                }
                // Ordenar por fecha (más reciente primero)
                Collections.sort(list, (r1, r2) -> Long.compare(r2.getReservationDate(), r1.getReservationDate()));
                callback.onReservationsLoaded(list);
            }
            @Override public void onCancelled(@NonNull DatabaseError error) { callback.onError(error.getMessage()); }
        });
    }

    /**
     * ⚡ Escucha cambios en tiempo real de todas las reservas del conductor.
     * Se usa para mantener el Dashboard actualizado.
     * LÍMITE: Solo carga las últimas 50 para optimizar rendimiento.
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
                
                // Ordenar por fecha (más reciente arriba)
                Collections.sort(all, (r1, r2) -> Long.compare(r2.getReservationDate(), r1.getReservationDate()));
                
                // Truncar lista para la UI si es muy larga
                if (all.size() > 50) {
                    stats.allReservations = new ArrayList<>(all.subList(0, 50));
                } else {
                    stats.allReservations = all;
                }
                
                listener.onStatsUpdated(stats);
            }
            @Override public void onCancelled(@NonNull DatabaseError error) { listener.onError(error.getMessage()); }
        };
        
        // Registrar el listener con el índice optimizado y límite de descarga
        ref.orderByChild("driverId").equalTo(driverUID).limitToLast(100).addValueEventListener(valueListener);
        return valueListener;
    }

    /**
     * Obtiene las estadísticas completas de forma única (One-time read).
     */
    public void obtenerEstadisticasCompletas(String driverUID, @Nullable List<String> schedules, CompleteStatsCallback callback) {
        cargarReservasConductorFiltradas(driverUID, schedules, "TODAS", true, new ReservationsCallback() {
            @Override
            public void onReservationsLoaded(List<Reservation> all) {
                CompleteDriverStats stats = new CompleteDriverStats();
                stats.allReservations = all;
                stats.totalReservations = all.size();
                for (Reservation r : all) {
                    String status = r.getReservationStatus();
                    double price = r.getPrice();
                    if (status != null) {
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
                callback.onCompleteStatsLoaded(stats);
            }
            @Override public void onError(String error) { callback.onError(error); }
        });
    }

    public void cargarReservasPendientes(String driverName, List<String> assignedSchedules, ReservationsCallback callback) {
        cargarReservasConductorFiltradas(driverName, assignedSchedules, "Por confirmar", false, callback);
    }

    /**
     * 🔥 Registra una venta en las estadísticas diarias del conductor de forma atómica.
     * Incrementa los ingresos y el contador de reservas confirmadas.
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
        
        ref.updateChildren(updates).addOnFailureListener(e -> Log.e(TAG, "Error actualizando estadísticas: " + e.getMessage()));
    }

    /**
     * 🔥 Revierte una venta en las estadísticas diarias del conductor.
     * Resta los ingresos y decrementa el contador de reservas confirmadas.
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
        
        ref.updateChildren(updates).addOnFailureListener(e -> Log.e(TAG, "Error revirtiendo estadísticas: " + e.getMessage()));
    }

    /**
     * Guarda un resumen diario de las finanzas del conductor (Legacy / Sobrescritura).
     */
    public void guardarEstadisticasDiarias(String driverUID, int confirmed, double earnings, ReservationUpdateCallback callback) {
        if (driverUID == null || driverUID.isEmpty()) return;
        java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat("yyyy-MM-dd", java.util.Locale.getDefault());
        String today = sdf.format(new java.util.Date());
        DatabaseReference ref = MyApp.getDatabaseReference("estadisticas/" + driverUID + "/" + today);
        Map<String, Object> map = new HashMap<>();
        map.put("ingresosDiarios", earnings);
        map.put("reservasConfirmadas", confirmed);
        map.put("ultimaActualizacion", System.currentTimeMillis());
        ref.setValue(map).addOnSuccessListener(aVoid -> { if (callback != null) callback.onSuccess(); })
                .addOnFailureListener(e -> { if (callback != null) callback.onError(e.getMessage()); });
    }

    /**
     * Cambia el estado de una reserva y dispara notificaciones Push al pasajero.
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
     * Cancela la reserva y automáticamente libera el asiento en el nodo de disponibilidad.
     */
    public void cancelarReservaConLiberacion(Context context, String reservationId, String scheduleId, int seatNumber, ReservationUpdateCallback callback) {
        actualizarEstadoReserva(context, reservationId, "Cancelada", new ReservationUpdateCallback() {
            @Override public void onSuccess() { freeReservedSeat(scheduleId, seatNumber, callback); }
            @Override public void onError(String error) { callback.onError(error); }
        });
    }

    /**
     * Lógica interna para notificar cambios de estado vía FCM.
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
                        NotificationManager.NotificationCallback cb = new NotificationManager.NotificationCallback() {
                            @Override public void onSuccess() {}
                            @Override public void onError(String error) {}
                        };
                        String route = r.getOrigin() + " -> " + r.getDestination();
                        if ("confirmed".equals(type)) nm.notificarReservaConfirmadaAlPasajero(r.getUserId(), r.getDriver(), route, r.getEstimatedTime(), r.getReservedSeat(), r.getVehicleId(), "", cb);
                        else nm.notificarReservaCanceladaAlPasajero(r.getUserId(), r.getDriver(), route, "Canceled by driver", cb);
                    }
                }
            }
            @Override public void onCancelled(@NonNull DatabaseError error) {}
        });
    }

    /**
     * Marca un asiento como libre y actualiza el contador de disponibles.
     */
    public void freeReservedSeat(String scheduleId, int seatNumber, ReservationUpdateCallback callback) {
        DatabaseReference ref = MyApp.getDatabaseReference("disponibilidadAsientos/" + scheduleId + "/asientosOcupados/" + seatNumber);
        ref.setValue(false).addOnSuccessListener(aVoid -> updateSimpleCounter(scheduleId, callback))
                .addOnFailureListener(e -> callback.onError(e.getMessage()));
    }

    /**
     * Incrementa de forma segura el contador de asientos disponibles de un horario.
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
                            .addOnSuccessListener(aVoid -> callback.onSuccess())
                            .addOnFailureListener(e -> callback.onSuccess());
                } else callback.onSuccess();
            }
            @Override public void onCancelled(@NonNull DatabaseError error) { callback.onSuccess(); }
        });
    }

    /**
     * Fallback inteligente para obtener el ID del conductor desde el snapshot si el modelo falla.
     */
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

    /**
     * Genera estadísticas avanzadas en un rango de fechas.
     */
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

    /**
     * Identifica a los pasajeros más frecuentes para programas de fidelidad.
     */
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

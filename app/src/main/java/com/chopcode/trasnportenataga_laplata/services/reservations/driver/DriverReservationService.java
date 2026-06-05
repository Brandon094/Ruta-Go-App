package com.chopcode.trasnportenataga_laplata.services.reservations.driver;

import android.content.Context;
import android.util.Log;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import com.chopcode.trasnportenataga_laplata.config.MyApp;
import com.chopcode.trasnportenataga_laplata.models.Reserva;
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
 * Servicio unificado para gestionar reservas desde la perspectiva del conductor.
 * Centraliza toda la lógica de carga, filtrado y actualización de reservas.
 */
public class DriverReservationService {

    private static final String TAG = "DriverReservationService";

    // ============ INTERFACES CALLBACK UNIFICADAS ============

    public interface ReservationsCallback {
        void onReservationsLoaded(List<Reserva> reservas);
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

    public interface FrequentCustomersCallback {
        void onCustomersLoaded(List<Map<String, Object>> clientes);
        void onError(String error);
    }

    // ============ CLASE DE ESTADÍSTICAS COMPLETAS ============

    public static class CompleteDriverStats {
        public int totalReservas = 0;
        public int reservasConfirmadas = 0;
        public int reservasCanceladas = 0;
        public int reservasPendientes = 0;
        public double ingresosTotales = 0.0;

        public List<Reserva> todasLasReservas = new ArrayList<>();
        public List<Reserva> reservasConfirmadasList = new ArrayList<>();
        public List<Reserva> reservasCanceladasList = new ArrayList<>();
        public List<Reserva> reservasPendientesList = new ArrayList<>();

        public CompleteDriverStats() {}

        @Override
        public String toString() {
            return "CompleteDriverStats{" +
                    "total=" + totalReservas +
                    ", confirmadas=" + reservasConfirmadas +
                    ", ingresos=" + ingresosTotales +
                    '}';
        }
    }

    // ============ CONSTRUCTOR ============

    public DriverReservationService() {}

    // ============ MÉTODOS DE CARGA ============

    /**
     * Carga reservas del conductor con filtros
     */
    public void cargarReservasConductorFiltradas(
            String conductorIdentificador,
            @Nullable List<String> horariosAsignados,
            @Nullable String estadoFiltro,
            boolean esUID,
            ReservationsCallback callback) {

        if (conductorIdentificador == null || conductorIdentificador.isEmpty()) {
            callback.onError("Identificador del conductor es inválido");
            return;
        }

        DatabaseReference reservasRef = MyApp.getDatabaseReference("reservas");

        reservasRef.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                List<Reserva> reservas = new ArrayList<>();
                for (DataSnapshot dataSnapshot : snapshot.getChildren()) {
                    Reserva reserva = dataSnapshot.getValue(Reserva.class);
                    if (reserva != null) {
                        reserva.setIdReserva(dataSnapshot.getKey());

                        String conductorIdReserva = obtenerConductorId(dataSnapshot, reserva, esUID);
                        String horarioIdReserva = obtenerHorarioId(dataSnapshot, reserva);

                        boolean esDelConductor = false;

                        if (esUID && conductorIdReserva == null) {
                            // FALLBACK PARA DATOS ANTIGUOS: Si no tiene conductorId, verificar si el horario le pertenece
                            if (horariosAsignados != null && horarioIdReserva != null) {
                                esDelConductor = horariosAsignados.contains(horarioIdReserva);
                                if (esDelConductor) Log.d(TAG, "♻️ Identificada reserva antigua por horario: " + reserva.getIdReserva());
                            }
                        } else {
                            esDelConductor = conductorIdentificador.equals(conductorIdReserva);
                        }

                        boolean estadoCoincide = aplicarFiltroEstado(reserva.getEstadoReserva(), estadoFiltro);
                        boolean horarioCoincide = aplicarFiltroHorario(horarioIdReserva, horariosAsignados);

                        if (esDelConductor && estadoCoincide && horarioCoincide) {
                            reservas.add(reserva);
                        }
                    }
                }

                Collections.sort(reservas, (r1, r2) -> Long.compare(r2.getFechaReserva(), r1.getFechaReserva()));
                callback.onReservationsLoaded(reservas);
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {
                callback.onError(error.getMessage());
            }
        });
    }

    /**
     * Carga estadísticas completas con una sola consulta
     */
    public void obtenerEstadisticasCompletas(String conductorUID, @Nullable List<String> schedules, CompleteStatsCallback callback) {
        cargarReservasConductorFiltradas(conductorUID, schedules, "TODAS", true, new ReservationsCallback() {
            @Override
            public void onReservationsLoaded(List<Reserva> todasLasReservas) {
                CompleteDriverStats stats = new CompleteDriverStats();
                stats.todasLasReservas = todasLasReservas;
                stats.totalReservas = todasLasReservas.size();

                for (Reserva reserva : todasLasReservas) {
                    String estado = reserva.getEstadoReserva();
                    Double precio = reserva.getPrecio();
                    if (estado != null) {
                        switch (estado) {
                            case "Confirmada":
                                stats.reservasConfirmadas++;
                                stats.ingresosTotales += (precio != null ? precio : 0.0);
                                stats.reservasConfirmadasList.add(reserva);
                                break;
                            case "Cancelada":
                                stats.reservasCanceladas++;
                                stats.reservasCanceladasList.add(reserva);
                                break;
                            case "Por confirmar":
                                stats.reservasPendientes++;
                                stats.reservasPendientesList.add(reserva);
                                break;
                        }
                    }
                }
                callback.onCompleteStatsLoaded(stats);
            }

            @Override
            public void onError(String error) {
                callback.onError(error);
            }
        });
    }

    public void cargarReservasPendientes(String conductorNombre, List<String> horariosAsignados,
                                         ReservationsCallback callback) {
        cargarReservasConductorFiltradas(conductorNombre, horariosAsignados, "Por confirmar", false, callback);
    }

    // ============ MÉTODOS DE ACTUALIZACIÓN ============

    /**
     * Guarda las estadísticas calculadas en el nodo 'estadisticas' de Firebase con registro histórico por fecha
     */
    public void guardarEstadisticasDiarias(String conductorUID, int confirmadas, double ingresos, ReservationUpdateCallback callback) {
        if (conductorUID == null || conductorUID.isEmpty()) return;

        // Generar la fecha de hoy como ID del nodo (formato estándar: yyyy-MM-dd)
        java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat("yyyy-MM-dd", java.util.Locale.getDefault());
        String fechaHoy = sdf.format(new java.util.Date());

        // Referencia unificada: estadisticas / UID / FECHA
        DatabaseReference statsRef = MyApp.getDatabaseReference("estadisticas/" + conductorUID + "/" + fechaHoy);

        Map<String, Object> stats = new HashMap<>();
        stats.put("ingresosDiarios", ingresos);
        stats.put("reservasConfirmadas", confirmadas);
        stats.put("ultimaActualizacion", System.currentTimeMillis());

        Log.d(TAG, "📊 Persistiendo estadísticas históricas para " + fechaHoy);

        statsRef.setValue(stats)
                .addOnSuccessListener(aVoid -> {
                    Log.d(TAG, "✅ Estadísticas históricas guardadas correctamente");
                    if (callback != null) callback.onSuccess();
                })
                .addOnFailureListener(e -> {
                    Log.e(TAG, "❌ Error guardando estadísticas históricas: " + e.getMessage());
                    if (callback != null) callback.onError(e.getMessage());
                });
    }

    public void actualizarEstadoReserva(Context context, String reservaId, String nuevoEstado, ReservationUpdateCallback callback) {
        DatabaseReference reservaRef = MyApp.getDatabaseReference("reservas/" + reservaId + "/estadoReserva");
        reservaRef.setValue(nuevoEstado)
                .addOnSuccessListener(aVoid -> {
                    // ✅ CORREGIDO: Notificar al PASAJERO según el nuevo estado
                    if ("Confirmada".equalsIgnoreCase(nuevoEstado)) {
                        notificarPasajeroCambioEstado(context, reservaId, "confirmada");
                    } else if ("Cancelada".equalsIgnoreCase(nuevoEstado)) {
                        notificarPasajeroCambioEstado(context, reservaId, "cancelada");
                    }
                    callback.onSuccess();
                })
                .addOnFailureListener(e -> callback.onError(e.getMessage()));
    }

    public void cancelarReservaConLiberacion(Context context, String reservaId, String horarioId,
                                             int numeroAsiento, ReservationUpdateCallback callback) {
        // ✅ CORREGIDO: Usar el método que ya tiene la lógica de notificación integrada
        actualizarEstadoReserva(context, reservaId, "Cancelada", new ReservationUpdateCallback() {
            @Override
            public void onSuccess() {
                liberarAsientoReservado(horarioId, numeroAsiento, callback);
            }
            @Override
            public void onError(String error) {
                callback.onError(error);
            }
        });
    }

    private void notificarPasajeroCambioEstado(Context context, String reservaId, String tipo) {
        DatabaseReference reservaRef = MyApp.getDatabaseReference("reservas/" + reservaId);
        reservaRef.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                if (snapshot.exists()) {
                    String pasajeroId = snapshot.child("usuarioId").getValue(String.class);
                    String conductorNombre = snapshot.child("conductor").getValue(String.class);
                    String ruta = snapshot.child("origen").getValue(String.class) + " -> " + snapshot.child("destino").getValue(String.class);
                    String fechaHora = snapshot.child("tiempoEstimado").getValue(String.class);
                    Integer asiento = snapshot.child("puestoReservado").getValue(Integer.class);
                    String placa = snapshot.child("vehiculoId").getValue(String.class);

                    if (pasajeroId != null) {
                        com.chopcode.trasnportenataga_laplata.managers.notificactions.NotificationManager nm =
                                com.chopcode.trasnportenataga_laplata.managers.notificactions.NotificationManager.getInstance(context);

                        if ("confirmada".equals(tipo)) {
                            nm.notificarReservaConfirmadaAlPasajero(pasajeroId, conductorNombre, ruta, fechaHora,
                                    asiento != null ? asiento : 0, placa, "", null);
                        } else {
                            nm.notificarReservaCanceladaAlPasajero(pasajeroId, conductorNombre, ruta, "Cancelada por el conductor", null);
                        }
                    }
                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {
                Log.e(TAG, "Error obteniendo datos para notificar pasajero: " + error.getMessage());
            }
        });
    }

    public void liberarAsientoReservado(String horarioId, int numeroAsiento, ReservationUpdateCallback callback) {
        DatabaseReference seatRef = MyApp.getDatabaseReference("disponibilidadAsientos/" + horarioId + "/asientosOcupados/" + numeroAsiento);
        seatRef.setValue(false)
                .addOnSuccessListener(aVoid -> actualizarContadorSimple(horarioId, callback))
                .addOnFailureListener(e -> callback.onError(e.getMessage()));
    }

    private void actualizarContadorSimple(String horarioId, ReservationUpdateCallback callback) {
        DatabaseReference contadorRef = MyApp.getDatabaseReference("disponibilidadAsientos/" + horarioId + "/asientosDisponibles");
        contadorRef.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                Integer disponiblesActual = snapshot.getValue(Integer.class);
                if (disponiblesActual != null && disponiblesActual < 13) {
                    snapshot.getRef().setValue(disponiblesActual + 1)
                            .addOnSuccessListener(aVoid -> callback.onSuccess())
                            .addOnFailureListener(e -> callback.onSuccess());
                } else {
                    callback.onSuccess();
                }
            }
            @Override
            public void onCancelled(@NonNull DatabaseError error) {
                callback.onSuccess();
            }
        });
    }

    // ============ MÉTODOS PREMIUM ============

    /**
     * MÉTODO PREMIUM - Estadísticas avanzadas por rango de fechas
     */
    public void obtenerEstadisticasAvanzadas(String conductorUID, long fechaInicio, long fechaFin, CompleteStatsCallback callback) {
        Log.d(TAG, "💰 [PREMIUM] Calculando estadísticas avanzadas por fecha");
        cargarReservasConductorFiltradas(conductorUID, null, "TODAS", true, new ReservationsCallback() {
            @Override
            public void onReservationsLoaded(List<Reserva> todas) {
                CompleteDriverStats stats = new CompleteDriverStats();
                for (Reserva r : todas) {
                    if (r.getFechaReserva() >= fechaInicio && r.getFechaReserva() <= fechaFin) {
                        stats.todasLasReservas.add(r);
                        stats.totalReservas++;
                        if ("Confirmada".equals(r.getEstadoReserva())) {
                            stats.reservasConfirmadas++;
                            stats.ingresosTotales += r.getPrecio();
                            stats.reservasConfirmadasList.add(r);
                        } else if ("Cancelada".equals(r.getEstadoReserva())) {
                            stats.reservasCanceladas++;
                            stats.reservasCanceladasList.add(r);
                        }
                    }
                }
                callback.onCompleteStatsLoaded(stats);
            }
            @Override
            public void onError(String error) {
                callback.onError(error);
            }
        });
    }

    /**
     * MÉTODO PREMIUM - Análisis de Clientes Frecuentes
     */
    public void obtenerClientesFrecuentes(String conductorUID, int limite, FrequentCustomersCallback callback) {
        Log.d(TAG, "💰 [PREMIUM] Analizando clientes frecuentes");
        cargarReservasConductorFiltradas(conductorUID, null, "Confirmada", true, new ReservationsCallback() {
            @Override
            public void onReservationsLoaded(List<Reserva> confirmadas) {
                Map<String, Integer> conteoClientes = new HashMap<>();
                Map<String, String> nombresClientes = new HashMap<>();

                for (Reserva r : confirmadas) {
                    String uid = r.getUsuarioId();
                    if (uid != null) {
                        conteoClientes.put(uid, conteoClientes.getOrDefault(uid, 0) + 1);
                        nombresClientes.put(uid, r.getNombre());
                    }
                }

                List<Map.Entry<String, Integer>> listaOrdenada = new ArrayList<>(conteoClientes.entrySet());
                Collections.sort(listaOrdenada, (e1, e2) -> e2.getValue().compareTo(e1.getValue()));

                List<Map<String, Object>> resultado = new ArrayList<>();
                for (int i = 0; i < Math.min(limite, listaOrdenada.size()); i++) {
                    Map.Entry<String, Integer> entry = listaOrdenada.get(i);
                    Map<String, Object> data = new HashMap<>();
                    data.put("usuarioId", entry.getKey());
                    data.put("nombre", nombresClientes.get(entry.getKey()));
                    data.put("viajes", entry.getValue());
                    resultado.add(data);
                }
                callback.onCustomersLoaded(resultado);
            }
            @Override
            public void onError(String error) {
                callback.onError(error);
            }
        });
    }

    // ============ MÉTODOS AUXILIARES ============

    private String obtenerConductorId(DataSnapshot dataSnapshot, Reserva reserva, boolean esUID) {
        if (esUID) {
            // Si buscamos por UID, priorizamos el campo 'conductorId' de la reserva
            String uid = reserva.getConductorId();
            // Si no está en el objeto, lo buscamos en el snapshot
            if (uid == null && dataSnapshot.hasChild("conductorId")) {
                uid = dataSnapshot.child("conductorId").getValue(String.class);
                if (uid != null) reserva.setConductorId(uid);
            }
            return uid;
        } else {
            // Si buscamos por Nombre, usamos el campo 'conductor' (que guarda el nombre)
            return reserva.getConductor();
        }
    }

    private String obtenerHorarioId(DataSnapshot dataSnapshot, Reserva reserva) {
        String horarioId = reserva.getHorarioId();
        if (horarioId == null && dataSnapshot.hasChild("horarioId")) {
            horarioId = dataSnapshot.child("horarioId").getValue(String.class);
            reserva.setHorarioId(horarioId);
        }
        return horarioId;
    }

    private boolean aplicarFiltroEstado(@Nullable String estadoReserva, @Nullable String estadoFiltro) {
        if (estadoFiltro == null || "TODAS".equalsIgnoreCase(estadoFiltro) || estadoFiltro.isEmpty()) return true;
        return estadoReserva != null && estadoReserva.equalsIgnoreCase(estadoFiltro);
    }

    private boolean aplicarFiltroHorario(@Nullable String horarioIdReserva, @Nullable List<String> horariosAsignados) {
        if (horariosAsignados == null || horariosAsignados.isEmpty()) return true;
        return horarioIdReserva != null && horariosAsignados.contains(horarioIdReserva);
    }
}

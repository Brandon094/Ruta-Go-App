package com.chopcode.trasnportenataga_laplata.services.reservations.driver;

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

    /**
     * Interfaz callback única para todas las operaciones de carga de reservas
     */
    public interface ReservationsCallback {
        void onReservationsLoaded(List<Reserva> reservas);
        void onError(String error);
    }

    /**
     * Interfaz callback para operaciones de actualización de reservas
     */
    public interface ReservationUpdateCallback {
        void onSuccess();
        void onError(String error);
    }

    // ============ CLASE DE ESTADÍSTICAS COMPLETAS (NUEVA) ============

    /**
     * Clase que representa estadísticas completas del conductor con listas de reservas.
     * Optimizado para evitar múltiples consultas a Firebase.
     */
    public static class CompleteDriverStats {
        public int totalReservas = 0;
        public int reservasConfirmadas = 0;
        public int reservasCanceladas = 0;
        public int reservasPendientes = 0;
        public double ingresosTotales = 0.0;

        // Listas separadas por estado (OPTIMIZACIÓN CLAVE)
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
                    "(" + reservasConfirmadasList.size() + ")" +
                    ", canceladas=" + reservasCanceladas +
                    "(" + reservasCanceladasList.size() + ")" +
                    ", pendientes=" + reservasPendientes +
                    "(" + reservasPendientesList.size() + ")" +
                    ", ingresos=" + ingresosTotales +
                    '}';
        }
    }

    /**
     * Interfaz callback para recuperar estadísticas completas
     */
    public interface CompleteStatsCallback {
        void onCompleteStatsLoaded(CompleteDriverStats stats);
        void onError(String error);
    }

    // ============ CONSTRUCTOR ============

    public DriverReservationService() {}

    // ============ MÉTODO UNIFICADO PRINCIPAL ============

    /**
     * MÉTODO UNIFICADO - Carga reservas del conductor con múltiples filtros
     *
     * Este método centraliza toda la lógica de carga y permite:
     * 1. Funcionalidades básicas gratuitas
     * 2. Filtros avanzados para versiones premium
     *
     * @param conductorIdentificador Nombre o UID del conductor
     * @param horariosAsignados Lista de horarios asignados (null para no filtrar)
     * @param estadoFiltro Estado a filtrar ("Confirmada", "Cancelada", "Por confirmar", o "TODAS")
     * @param esUID true si conductorIdentificador es UID, false si es nombre
     * @param callback Callback para manejar resultados
     */
    public void cargarReservasConductorFiltradas(
            String conductorIdentificador,
            @Nullable List<String> horariosAsignados,
            @Nullable String estadoFiltro,
            boolean esUID,
            ReservationsCallback callback) {

        Log.d(TAG, "👤 Cargando reservas para conductor: " + conductorIdentificador);
        Log.d(TAG, "   - Tipo: " + (esUID ? "UID" : "Nombre"));
        Log.d(TAG, "   - Estado: " + (estadoFiltro != null ? estadoFiltro : "TODAS"));
        Log.d(TAG, "   - Horarios asignados: " + (horariosAsignados != null ? horariosAsignados.size() : "No"));

        // Validación básica
        if (conductorIdentificador == null || conductorIdentificador.isEmpty()) {
            Log.e(TAG, "❌ Identificador del conductor es inválido");
            callback.onError("Identificador del conductor es inválido");
            return;
        }

        DatabaseReference reservasRef = MyApp.getDatabaseReference("reservas");
        Log.d(TAG, "🔍 Consultando Firebase...");

        reservasRef.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                Log.d(TAG, "✅ Datos recibidos - Total reservas: " + snapshot.getChildrenCount());
                List<Reserva> reservas = new ArrayList<>();
                int reservasFiltradas = 0;

                for (DataSnapshot dataSnapshot : snapshot.getChildren()) {
                    Reserva reserva = dataSnapshot.getValue(Reserva.class);
                    if (reserva != null) {
                        reserva.setIdReserva(dataSnapshot.getKey());

                        // Obtener identificador del conductor según tipo
                        String conductorIdReserva = obtenerConductorId(dataSnapshot, reserva, esUID);
                        Log.v(TAG, "id-conductor: "+ conductorIdReserva);

                        // Obtener horario ID
                        String horarioIdReserva = obtenerHorarioId(dataSnapshot, reserva);

                        // Aplicar filtros
                        boolean esDelConductor = conductorIdentificador.equals(conductorIdReserva);
                        boolean estadoCoincide = aplicarFiltroEstado(reserva.getEstadoReserva(), estadoFiltro);
                        boolean horarioCoincide = aplicarFiltroHorario(horarioIdReserva, horariosAsignados);

                        if (esDelConductor && estadoCoincide && horarioCoincide) {
                            reservas.add(reserva);
                            reservasFiltradas++;
                            Log.v(TAG, "   ✓ Reserva " + reserva.getIdReserva() +
                                    " - Estado: " + reserva.getEstadoReserva());
                        }
                    }
                }

                // Ordenar por fecha (más recientes primero)
                Collections.sort(reservas, (r1, r2) -> Long.compare(r2.getFechaReserva(), r1.getFechaReserva()));

                Log.d(TAG, "📊 Reservas filtradas: " + reservasFiltradas);

                // Registrar evento analítico
                registrarEventoAnalitico(conductorIdentificador, esUID, estadoFiltro,
                        horariosAsignados, reservasFiltradas);

                callback.onReservationsLoaded(reservas);
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {
                Log.e(TAG, "❌ Error Firebase: " + error.getMessage());
                MyApp.logError(error.toException());
                callback.onError("Error al cargar reservas: " + error.getMessage());
            }
        });
    }

    // ============ MÉTODO OPTIMIZADO - UNA SOLA CONSULTA ============

    /**
     * MÉTODO OPTIMIZADO - Carga estadísticas completas con una sola consulta a Firebase
     *
     * <p><b>Beneficios:</b></p>
     * <ul>
     *   <li>✅ 1 sola consulta en lugar de 3</li>
     *   <li>✅ Devuelve estadísticas + listas por estado</li>
     *   <li>✅ Elimina duplicación de carga de datos</li>
     *   <li>✅ Mejora rendimiento y reduce consumo de datos</li>
     * </ul>
     *
     * @param conductorUID Identificador único del conductor
     * @param callback Callback para manejar el resultado
     *
     * @see CompleteDriverStats
     * @see CompleteStatsCallback
     */
    public void obtenerEstadisticasCompletas(String conductorUID, CompleteStatsCallback callback) {
        Log.d(TAG, "🚀 Cargando estadísticas completas (optimizado - 1 consulta)");

        cargarReservasConductorFiltradas(
                conductorUID,
                null,           // Sin filtro de horarios
                "TODAS",       // Todas las reservas
                true,          // Es UID
                new ReservationsCallback() {
                    @Override
                    public void onReservationsLoaded(List<Reserva> todasLasReservas) {
                        CompleteDriverStats stats = new CompleteDriverStats();

                        // Guardar todas las reservas
                        stats.todasLasReservas = todasLasReservas;
                        stats.totalReservas = todasLasReservas.size();

                        // Procesar y clasificar reservas por estado
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

                                    default:
                                        // Posibles estados futuros
                                        Log.w(TAG, "Estado no reconocido: " + estado);
                                }
                            }
                        }

                        // Verificar consistencia
                        int totalClasificadas = stats.reservasConfirmadasList.size() +
                                stats.reservasCanceladasList.size() +
                                stats.reservasPendientesList.size();

                        Log.d(TAG, "✅ Estadísticas completas calculadas: " + stats);
                        Log.d(TAG, "   - Consistencia: " + totalClasificadas + "/" + stats.totalReservas);

                        callback.onCompleteStatsLoaded(stats);
                    }

                    @Override
                    public void onError(String error) {
                        callback.onError(error);
                    }
                }
        );
    }

    // ============ MÉTODOS DE CONVENIENCIA (para compatibilidad) ============

    /**
     * MÉTODO BÁSICO GRATUITO - Para pantalla principal del conductor
     * Filtra solo reservas "Por confirmar" de horarios asignados
     */
    // Se usa en RerservasViewModel
    public void cargarReservasPendientes(String conductorNombre, List<String> horariosAsignados,
                                         ReservationsCallback callback) {
        Log.d(TAG, "🆓 Cargando reservas pendientes (gratuito)");
        cargarReservasConductorFiltradas(
                conductorNombre,
                horariosAsignados,
                "Por confirmar",
                false,
                callback
        );
    }

    // ============ MÉTODOS AUXILIARES PRIVADOS ============

    /**
     * Obtiene el ID del conductor con compatibilidad para versiones anteriores
     */
    private String obtenerConductorId(DataSnapshot dataSnapshot, Reserva reserva, boolean esUID) {
        String conductorId = reserva.getConductor();

        // Compatibilidad con versiones antiguas que usaban "conductorId"
        if (conductorId == null && dataSnapshot.hasChild("conductorId")) {
            conductorId = dataSnapshot.child("conductorId").getValue(String.class);
        }

        return conductorId;
    }

    /**
     * Obtiene el ID del horario con compatibilidad
     */
    private String obtenerHorarioId(DataSnapshot dataSnapshot, Reserva reserva) {
        String horarioId = reserva.getHorarioId();

        if (horarioId == null && dataSnapshot.hasChild("horarioId")) {
            horarioId = dataSnapshot.child("horarioId").getValue(String.class);
            reserva.setHorarioId(horarioId); // Actualizar el modelo
        }

        return horarioId;
    }

    /**
     * Aplica filtro de estado
     */
    private boolean aplicarFiltroEstado(@Nullable String estadoReserva, @Nullable String estadoFiltro) {
        if (estadoFiltro == null || "TODAS".equalsIgnoreCase(estadoFiltro) || estadoFiltro.isEmpty()) {
            return true;
        }

        if (estadoReserva == null) {
            return false;
        }

        return estadoReserva.equalsIgnoreCase(estadoFiltro);
    }

    /**
     * Aplica filtro de horarios
     */
    private boolean aplicarFiltroHorario(@Nullable String horarioIdReserva, @Nullable List<String> horariosAsignados) {
        if (horariosAsignados == null || horariosAsignados.isEmpty()) {
            return true; // No hay filtro de horarios
        }

        if (horarioIdReserva == null) {
            return false; // Si no tiene horario y hay filtro, excluir
        }

        return horariosAsignados.contains(horarioIdReserva);
    }

    /**
     * Registra evento analítico
     */
    private void registrarEventoAnalitico(String conductorId, boolean esUID,
                                          @Nullable String estadoFiltro,
                                          @Nullable List<String> horariosAsignados,
                                          int reservasEncontradas) {
        Map<String, Object> eventParams = new HashMap<>();
        eventParams.put("conductor_id", conductorId);
        eventParams.put("tipo_identificador", esUID ? "uid" : "nombre");
        eventParams.put("filtro_estado", estadoFiltro != null ? estadoFiltro : "TODAS");
        eventParams.put("horarios_filtrados", horariosAsignados != null ? horariosAsignados.size() : 0);
        eventParams.put("reservas_encontradas", reservasEncontradas);

        MyApp.logEvent("reservas_conductor_cargadas", eventParams);
    }

    // ============ MÉTODOS DE ACTUALIZACIÓN (MANTENIDOS) ============

    /**
     * Actualiza el estado de una reserva
     */
    public void actualizarEstadoReserva(String reservaId, String nuevoEstado, ReservationUpdateCallback callback) {
        Log.d(TAG, "🔄 Actualizando estado de reserva: " + reservaId + " -> " + nuevoEstado);

        DatabaseReference reservaRef = MyApp.getDatabaseReference(
                "reservas/" + reservaId + "/estadoReserva"
        );

        reservaRef.setValue(nuevoEstado)
                .addOnSuccessListener(aVoid -> {
                    Log.d(TAG, "✅ Estado actualizado");

                    Map<String, Object> eventParams = new HashMap<>();
                    eventParams.put("reserva_id", reservaId);
                    eventParams.put("nuevo_estado", nuevoEstado);
                    MyApp.logEvent("reserva_estado_actualizado", eventParams);

                    callback.onSuccess();
                })
                .addOnFailureListener(e -> {
                    Log.e(TAG, "❌ Error: " + e.getMessage());
                    MyApp.logError(e);
                    callback.onError(e.getMessage());
                });
    }

    /**
     * Cancela reserva con liberación de asiento
     */
    public void cancelarReservaConLiberacion(String reservaId, String horarioId,
                                             int numeroAsiento, ReservationUpdateCallback callback) {
        Log.d(TAG, "🔄 Cancelando reserva: " + reservaId);

        actualizarEstadoReserva(reservaId, "Cancelada", new ReservationUpdateCallback() {
            @Override
            public void onSuccess() {
                liberarAsientoReservado(horarioId, numeroAsiento, new ReservationUpdateCallback() {
                    @Override
                    public void onSuccess() {
                        Log.d(TAG, "✅ Reserva cancelada y asiento liberado");
                        callback.onSuccess();
                    }

                    @Override
                    public void onError(String error) {
                        Log.w(TAG, "⚠️ Reserva cancelada pero error liberando asiento: " + error);
                        callback.onSuccess(); // Considerar éxito parcial
                    }
                });
            }

            @Override
            public void onError(String error) {
                Log.e(TAG, "❌ Error cancelando reserva: " + error);
                callback.onError(error);
            }
        });
    }

    /**
     * Libera un asiento reservado
     */
    public void liberarAsientoReservado(String horarioId, int numeroAsiento,
                                        ReservationUpdateCallback callback) {
        Log.d(TAG, "🔄 Liberando asiento " + numeroAsiento + " en horario " + horarioId);

        // Referencia al nodo de asientos ocupados
        DatabaseReference seatRef = MyApp.getDatabaseReference(
                "disponibilidadAsientos/" + horarioId + "/asientosOcupados/" + numeroAsiento
        );

        // Marcar como false (disponible) en lugar de eliminar el nodo para mantener consistencia con SeatManager
        seatRef.setValue(false)
                .addOnSuccessListener(aVoid -> {
                    Log.d(TAG, "✅ Paso 1: Asiento " + numeroAsiento + " marcado como disponible (false)");

                    // Paso 2: Actualizar contador
                    actualizarContadorSimple(horarioId, callback);
                })
                .addOnFailureListener(e -> {
                    Log.e(TAG, "❌ Error liberando asiento: " + e.getMessage());
                    callback.onError(e.getMessage());
                });
    }

    /**
     * Actualiza el contador de forma simple
     */
    private void actualizarContadorSimple(String horarioId, ReservationUpdateCallback callback) {
        DatabaseReference contadorRef = MyApp.getDatabaseReference(
                "disponibilidadAsientos/" + horarioId + "/asientosDisponibles"
        );

        // Obtener valor actual y actualizar
        contadorRef.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                Integer disponiblesActual = snapshot.getValue(Integer.class);

                if (disponiblesActual != null && disponiblesActual < 13) {
                    int nuevosDisponibles = disponiblesActual + 1;
                    snapshot.getRef().setValue(nuevosDisponibles)
                            .addOnSuccessListener(aVoid -> {
                                Log.d(TAG, "✅ Paso 2: Contador " + disponiblesActual + " → " + nuevosDisponibles);
                                callback.onSuccess();
                            })
                            .addOnFailureListener(e -> {
                                Log.e(TAG, "⚠️ Error actualizando contador (pero asiento liberado): " + e.getMessage());
                                callback.onSuccess(); // Asiento liberado es lo importante
                            });
                } else {
                    Log.w(TAG, "⚠️ No se pudo actualizar contador (valor: " + disponiblesActual + ")");
                    callback.onSuccess(); // Asiento liberado es lo importante
                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {
                Log.e(TAG, "❌ Error obteniendo contador: " + error.getMessage());
                callback.onSuccess(); // Asiento liberado es lo importante
            }
        });
    }

    // ============ MÉTODOS PARA SUSCRIPCIÓN PREMIUM (FUTUROS) ============
    /**
     * MÉTODO PREMIUM - Estadísticas avanzadas por fecha
     * Funcionalidad para suscripción premium
     */
    /** public void obtenerEstadisticasAvanzadas(String conductorUID, long fechaInicio, long
     * fechaFin,

                                             SimpleStatsCallback callback) {
        Log.d(TAG, "💰 Obteniendo estadísticas avanzadas (premium)");
        cargarReservasPorFecha(conductorUID, fechaInicio, fechaFin, "TODAS",
                new ReservationsCallback() {
                    @Override
                    public void onReservationsLoaded(List<Reserva> reservas) {
                        SimpleDriverStats stats = new SimpleDriverStats();
                        stats.totalReservas = reservas.size();

                        for (Reserva reserva : reservas) {
                            String estado = reserva.getEstadoReserva();
                            Double precio = reserva.getPrecio();

                            if (estado != null) {
                                switch (estado) {
                                    case "Confirmada":
                                        stats.reservasConfirmadas++;
                                        stats.ingresosTotales += (precio != null ? precio : 0.0);
                                        break;
                                    case "Cancelada":
                                        stats.reservasCanceladas++;
                                        break;
                                    case "Por confirmar":
                                        stats.reservasPendientes++;
                                        break;
                                }
                            }
                        }

                        Log.d(TAG, "📈 Estadísticas avanzadas calculadas: " + stats);
                        callback.onStatsLoaded(stats);
                    }

                    @Override
                    public void onError(String error) {
                        callback.onError(error);
                    }
                }
        );
    }*/

    /**
     * MÉTODO PREMIUM - Filtrado por rango de fechas
     * Funcionalidad para suscripción premium
     */
    /**public void cargarReservasPorFecha(
            String conductorUID,
            long fechaInicio,
            long fechaFin,
            @Nullable String estadoFiltro,
            ReservationsCallback callback) {

        Log.d(TAG, "💰 Cargando reservas por fecha (premium)");
        // Primero cargamos todas las reservas
        cargarReservasConductorFiltradas(
                conductorUID,
                null,
                estadoFiltro != null ? estadoFiltro : "TODAS",
                true,
                new ReservationsCallback() {
                    @Override
                    public void onReservationsLoaded(List<Reserva> todasLasReservas) {
                        // Filtrar por fecha
                        List<Reserva> reservasFiltradas = new ArrayList<>();
                        for (Reserva reserva : todasLasReservas) {
                            long fechaReserva = reserva.getFechaReserva();
                            if (fechaReserva >= fechaInicio && fechaReserva <= fechaFin) {
                                reservasFiltradas.add(reserva);
                            }
                        }
                        Log.d(TAG, "📅 Reservas en rango de fechas: " + reservasFiltradas.size());
                        callback.onReservationsLoaded(reservasFiltradas);
                    }

                    @Override
                    public void onError(String error) {
                        callback.onError(error);
                    }
                }
        );
    }*/
}
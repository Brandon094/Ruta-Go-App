package com.chopcode.trasnportenataga_laplata.viewmodels.driver;

import android.util.Log;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import com.chopcode.trasnportenataga_laplata.models.Reserva;
import com.chopcode.trasnportenataga_laplata.services.reservations.driver.DriverReservationService;
import com.chopcode.trasnportenataga_laplata.viewmodels.BaseViewModel;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.ValueEventListener;
import java.util.ArrayList;
import java.util.List;

/**
 * ViewModel exclusivo para manejar reservas pendientes del conductor.
 * Responsabilidad única: gestionar reservas "Por confirmar" para confirmar o cancelar.
 */
public class ReservasViewModel extends BaseViewModel {

    // Servicios
    private final DriverReservationService driverReservationService;

    // LiveData para reservas pendientes
    private final MutableLiveData<List<Reserva>> reservasPendientesLiveData = new MutableLiveData<>();
    private final MutableLiveData<Integer> contadorReservasLiveData = new MutableLiveData<>();

    // LiveData para operaciones de confirmación/cancelación
    private final MutableLiveData<Reserva> reservaEnProcesoLiveData = new MutableLiveData<>();
    private final MutableLiveData<Boolean> reservaProcesadaLiveData = new MutableLiveData<>();

    // Variables para el conductor actual (solo lo necesario para reservas)
    private String conductorNombreActual;
    private List<String> horariosAsignadosActual; // Ahora se reciben desde PerfilViewModel

    // Control de listeners y estado
    private boolean isRealTimeListenerSetup = false;
    private DatabaseReference reservasRef;
    private ValueEventListener reservasListener;

    public ReservasViewModel() {
        this.driverReservationService = new DriverReservationService();

        // Valores iniciales
        this.contadorReservasLiveData.setValue(0);
        this.reservaProcesadaLiveData.setValue(false);
        this.reservasPendientesLiveData.setValue(new ArrayList<>());

        Log.d(TAG, "✅ ReservasViewModel simplificado inicializado");
    }

    // ============ GETTERS PARA LIVEDATA ============

    /**
     * Obtiene la lista de reservas pendientes para confirmar/cancelar
     */
    public LiveData<List<Reserva>> getReservasPendientesLiveData() {
        return reservasPendientesLiveData;
    }

    /**
     * Obtiene el contador de reservas pendientes
     */
    public LiveData<Integer> getContadorReservasLiveData() {
        return contadorReservasLiveData;
    }

    /**
     * Obtiene la reserva que está siendo procesada (confirmar/cancelar)
     */
    public LiveData<Reserva> getReservaEnProcesoLiveData() {
        return reservaEnProcesoLiveData;
    }

    /**
     * Indica si una reserva fue procesada exitosamente
     */
    public LiveData<Boolean> getReservaProcesadaLiveData() {
        return reservaProcesadaLiveData;
    }

    // ============ MÉTODOS PRINCIPALES ============

    /**
     * Inicializa el ViewModel con solo el nombre del conductor
     * (Los horarios ahora vienen del PerfilViewModel y se pasan por separado)
     */
    public void inicializarConNombreConductor(String nombreConductor) {
        if (nombreConductor == null || nombreConductor.isEmpty()) {
            Log.e(TAG, "❌ Nombre del conductor es nulo o vacío");
            setError("Nombre del conductor no válido");
            return;
        }

        Log.d(TAG, "👤 Inicializando reservas para: " + nombreConductor);
        this.conductorNombreActual = nombreConductor;

        // Cargar reservas pendientes
        cargarReservasPendientes();

        // Configurar listener en tiempo real
        configurarListenerTiempoReal();

        registrarEventoAnalitico("reservas_inicializadas", nombreConductor, 0);
    }

    /**
     * Establece los horarios asignados (vienen del PerfilViewModel)
     */
    public void setHorariosAsignados(List<String> horarios) {
        this.horariosAsignadosActual = horarios != null ? new ArrayList<>(horarios) : new ArrayList<>();
        Log.d(TAG, "🕐 Horarios asignados establecidos: " + horariosAsignadosActual.size());
    }

    /**
     * Carga las reservas pendientes del conductor usando solo el nombre
     */
    public void cargarReservasPendientes() {
        if (conductorNombreActual == null || conductorNombreActual.isEmpty()) {
            Log.w(TAG, "⚠️ conductorNombreActual es nulo o vacío");
            return;
        }

        Log.d(TAG, "🔍 Cargando reservas pendientes para: " + conductorNombreActual);
        setLoading(true);

        // Usar el método que solo necesita el nombre del conductor
        // Si el servicio necesita horarios, se los pasamos si están disponibles
        if (horariosAsignadosActual != null && !horariosAsignadosActual.isEmpty()) {
            driverReservationService.cargarReservasPendientes(
                    conductorNombreActual,
                    horariosAsignadosActual,
                    new DriverReservationService.ReservationsCallback() {
                        @Override
                        public void onReservationsLoaded(List<Reserva> reservas) {
                            procesarReservasCargadas(reservas);
                        }

                        @Override
                        public void onError(String error) {
                            manejarErrorCargaReservas(error);
                        }
                    }
            );
        }
    }

    /**
     * Procesa las reservas cargadas exitosamente
     */
    private void procesarReservasCargadas(List<Reserva> reservas) {
        Log.d(TAG, "✅ " + reservas.size() + " reservas pendientes cargadas");

        // Filtrar por estado "Por confirmar" (si el servicio no lo hace)
        List<Reserva> reservasFiltradas = new ArrayList<>();
        for (Reserva reserva : reservas) {
            if ("Por confirmar".equals(reserva.getEstadoReserva())) {
                reservasFiltradas.add(reserva);
            }
        }

        reservasPendientesLiveData.postValue(reservasFiltradas);
        contadorReservasLiveData.postValue(reservasFiltradas.size());

        setLoading(false);

        // Registrar evento analítico usando método heredado de BaseViewModel
        registrarEventoAnalitico("reservas_cargadas", conductorNombreActual, reservasFiltradas.size());
    }

    /**
     * Maneja errores al cargar reservas
     */
    private void manejarErrorCargaReservas(String error) {
        Log.e(TAG, "❌ Error cargando reservas pendientes: " + error);
        setError("Error cargando reservas: " + error);
        setLoading(false);

        registrarEventoAnalitico("error_carga_reservas", conductorNombreActual, 0);
    }

    /**
     * Confirma una reserva pendiente
     */
    public void confirmarReserva(Reserva reserva) {
        if (reserva == null || reserva.getIdReserva() == null) {
            Log.e(TAG, "❌ Reserva o ID de reserva es nulo");
            setError("Reserva no válida");
            return;
        }

        Log.d(TAG, "✅ Confirmando reserva: " + reserva.getIdReserva());
        reservaEnProcesoLiveData.postValue(reserva);
        reservaProcesadaLiveData.postValue(false);

        driverReservationService.actualizarEstadoReserva(
                reserva.getIdReserva(),
                "Confirmada",
                new DriverReservationService.ReservationUpdateCallback() {
                    @Override
                    public void onSuccess() {
                        Log.d(TAG, "✅ Reserva confirmada exitosamente");
                        eliminarReservaDeLista(reserva);
                        reservaProcesadaLiveData.postValue(true);

                        // Registrar evento analítico
                        registrarEventoAnalitico("reserva_confirmada", conductorNombreActual, 1);
                    }

                    @Override
                    public void onError(String error) {
                        Log.e(TAG, "❌ Error confirmando reserva: " + error);
                        setError("Error confirmando reserva: " + error);
                        reservaProcesadaLiveData.postValue(false);
                    }
                }
        );
    }

    /**
     * Cancela una reserva pendiente
     */
    public void cancelarReserva(Reserva reserva) {
        if (reserva == null || reserva.getIdReserva() == null) {
            Log.e(TAG, "❌ Reserva o ID de reserva es nulo");
            setError("Reserva no válida");
            return;
        }

        Log.d(TAG, "🔍 INFORMACIÓN DE RESERVA PARA CANCELAR:");
        Log.d(TAG, "   - HorarioId: " + reserva.getHorarioId());
        Log.d(TAG, "   - Asiento: " + reserva.getPuestoReservado());
        Log.d(TAG, "   - Reserva ID: " + reserva.getIdReserva());

        Log.d(TAG, "❌ Cancelando reserva: " + reserva.getIdReserva());
        reservaEnProcesoLiveData.postValue(reserva);
        reservaProcesadaLiveData.postValue(false);

        // Verificar si tenemos información para liberar el asiento
        if (reserva.getHorarioId() != null && reserva.getPuestoReservado() > 0) {
            driverReservationService.cancelarReservaConLiberacion(
                    reserva.getIdReserva(),
                    reserva.getHorarioId(),
                    reserva.getPuestoReservado(),
                    new DriverReservationService.ReservationUpdateCallback() {
                        @Override
                        public void onSuccess() {
                            Log.d(TAG, "✅ Reserva cancelada y asiento liberado");
                            eliminarReservaDeLista(reserva);
                            reservaProcesadaLiveData.postValue(true);

                            registrarEventoAnalitico("reserva_cancelada", conductorNombreActual, 1);
                        }

                        @Override
                        public void onError(String error) {
                            Log.e(TAG, "❌ Error cancelando reserva: " + error);
                            setError("Error cancelando reserva: " + error);
                            reservaProcesadaLiveData.postValue(false);
                        }
                    }
            );
        } else {
            // Cancelar sin liberar asiento (fallback)
            driverReservationService.actualizarEstadoReserva(
                    reserva.getIdReserva(),
                    "Cancelada",
                    new DriverReservationService.ReservationUpdateCallback() {
                        @Override
                        public void onSuccess() {
                            Log.d(TAG, "✅ Reserva cancelada (sin liberar asiento)");
                            eliminarReservaDeLista(reserva);
                            reservaProcesadaLiveData.postValue(true);
                        }

                        @Override
                        public void onError(String error) {
                            Log.e(TAG, "❌ Error cancelando reserva: " + error);
                            setError("Error cancelando reserva: " + error);
                            reservaProcesadaLiveData.postValue(false);
                        }
                    }
            );
        }
    }

    /**
     * Refresca las reservas pendientes
     */
    public void refrescarReservas() {
        Log.d(TAG, "🔄 Refrescando reservas pendientes");
        if (conductorNombreActual != null) {
            cargarReservasPendientes();
        } else {
            Log.w(TAG, "⚠️ No se puede refrescar: conductorNombreActual es nulo");
            setError("No se ha inicializado el conductor");
        }
    }

    // ============ LISTENER EN TIEMPO REAL ============

    /**
     * Configura el listener en tiempo real para nuevas reservas
     */
    private void configurarListenerTiempoReal() {
        if (conductorNombreActual == null || conductorNombreActual.isEmpty() || isRealTimeListenerSetup) {
            Log.w(TAG, "⚠️ No se puede configurar listener: " +
                    (conductorNombreActual == null ? "sin conductor" : "ya configurado"));
            return;
        }

        Log.d(TAG, "🎧 Configurando listener en tiempo real para: " + conductorNombreActual);

        try {
            limpiarListenerTiempoReal();

            reservasRef = com.chopcode.trasnportenataga_laplata.config.MyApp.getDatabaseReference("reservas");

            reservasListener = new ValueEventListener() {
                @Override
                public void onDataChange(DataSnapshot dataSnapshot) {
                    Log.d(TAG, "🔄 Datos cambiados en tiempo real");

                    List<Reserva> nuevasReservas = new ArrayList<>();
                    List<Reserva> reservasActuales = reservasPendientesLiveData.getValue();
                    if (reservasActuales == null) {
                        reservasActuales = new ArrayList<>();
                    }

                    for (DataSnapshot snapshot : dataSnapshot.getChildren()) {
                        try {
                            Reserva reserva = snapshot.getValue(Reserva.class);
                            if (reserva != null &&
                                    conductorNombreActual.equals(reserva.getConductor()) &&
                                    "Por confirmar".equals(reserva.getEstadoReserva())) {

                                reserva.setIdReserva(snapshot.getKey());

                                // Verificar si ya existe en la lista
                                boolean existe = false;
                                for (Reserva existente : reservasActuales) {
                                    if (existente.getIdReserva() != null &&
                                            existente.getIdReserva().equals(reserva.getIdReserva())) {
                                        existe = true;
                                        break;
                                    }
                                }

                                if (!existe) {
                                    // Verificar si pertenece a horarios asignados (si tenemos)
                                    if (horariosAsignadosActual == null || horariosAsignadosActual.isEmpty() ||
                                            (reserva.getHorarioId() != null &&
                                                    horariosAsignadosActual.contains(reserva.getHorarioId()))) {
                                        nuevasReservas.add(reserva);
                                    }
                                }
                            }
                        } catch (Exception e) {
                            Log.e(TAG, "Error procesando reserva en tiempo real: " + e.getMessage());
                        }
                    }

                    if (!nuevasReservas.isEmpty()) {
                        Log.d(TAG, "🎯 " + nuevasReservas.size() + " nuevas reservas en tiempo real");

                        // Agregar nuevas reservas a la lista
                        reservasActuales.addAll(nuevasReservas);
                        reservasPendientesLiveData.postValue(reservasActuales);
                        contadorReservasLiveData.postValue(reservasActuales.size());

                        registrarEventoAnalitico("nuevas_reservas_tiempo_real", conductorNombreActual, nuevasReservas.size());
                    }
                }

                @Override
                public void onCancelled(DatabaseError databaseError) {
                    Log.e(TAG, "❌ Error en listener tiempo real: " + databaseError.getMessage());
                    isRealTimeListenerSetup = false; // Permitir reintentar
                    setError("Error en conexión en tiempo real: " + databaseError.getMessage());
                }
            };

            reservasRef.addValueEventListener(reservasListener);
            isRealTimeListenerSetup = true;
            Log.d(TAG, "✅ Listener en tiempo real configurado");

        } catch (Exception e) {
            Log.e(TAG, "❌ Error configurando listener: " + e.getMessage());
            isRealTimeListenerSetup = false;
            setError("Error configurando listener: " + e.getMessage());
        }
    }

    /**
     * Pausa las actualizaciones en tiempo real
     */
    public void pausarActualizacionesTiempoReal() {
        Log.d(TAG, "⏸️ Pausando actualizaciones en tiempo real");
        limpiarListenerTiempoReal();
        isRealTimeListenerSetup = false;
    }

    /**
     * Reanuda las actualizaciones en tiempo real
     */
    public void reanudarActualizacionesTiempoReal() {
        if (conductorNombreActual != null && !isRealTimeListenerSetup) {
            Log.d(TAG, "▶️ Reanudando actualizaciones en tiempo real");
            configurarListenerTiempoReal();
        }
    }

    // ============ MÉTODOS AUXILIARES PRIVADOS ============

    /**
     * Elimina una reserva procesada de la lista
     */
    private void eliminarReservaDeLista(Reserva reserva) {
        if (reserva == null) {
            Log.w(TAG, "⚠️ Reserva es nula en eliminarReservaDeLista");
            return;
        }

        List<Reserva> reservasActuales = reservasPendientesLiveData.getValue();
        if (reservasActuales != null) {
            List<Reserva> nuevasReservas = new ArrayList<>();
            for (Reserva r : reservasActuales) {
                if (r != null && r.getIdReserva() != null &&
                        !r.getIdReserva().equals(reserva.getIdReserva())) {
                    nuevasReservas.add(r);
                }
            }
            reservasPendientesLiveData.postValue(nuevasReservas);
            contadorReservasLiveData.postValue(nuevasReservas.size());

            Log.d(TAG, "🗑️ Reserva eliminada de la lista. Restantes: " + nuevasReservas.size());
        }
    }

    /**
     * Limpia el listener en tiempo real
     */
    private void limpiarListenerTiempoReal() {
        if (reservasRef != null && reservasListener != null) {
            reservasRef.removeEventListener(reservasListener);
            Log.d(TAG, "✅ Listener de Firebase removido");
        }
        reservasRef = null;
        reservasListener = null;
    }

    // ============ GETTERS PARA DATOS ACTUALES ============

    public String getConductorNombreActual() {
        return conductorNombreActual;
    }

    public List<String> getHorariosAsignadosActual() {
        return horariosAsignadosActual != null ?
                new ArrayList<>(horariosAsignadosActual) : new ArrayList<>();
    }

    /**
     * Verifica si hay reservas pendientes
     */
    public boolean tieneReservasPendientes() {
        List<Reserva> reservas = reservasPendientesLiveData.getValue();
        return reservas != null && !reservas.isEmpty();
    }

    /**
     * Obtiene el número de reservas pendientes
     */
    public int getNumeroReservasPendientes() {
        List<Reserva> reservas = reservasPendientesLiveData.getValue();
        return reservas != null ? reservas.size() : 0;
    }

    // ============ LIMPIEZA ============

    @Override
    protected void onCleared() {
        super.onCleared();
        Log.d(TAG, "🧹 Limpiando ReservasViewModel");

        // Limpiar listeners
        pausarActualizacionesTiempoReal();

        // Limpiar referencias
        conductorNombreActual = null;
        horariosAsignadosActual = null;
    }
}
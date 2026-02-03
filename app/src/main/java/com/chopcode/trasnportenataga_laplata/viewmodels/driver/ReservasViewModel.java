package com.chopcode.trasnportenataga_laplata.viewmodels.driver;

import android.content.Context;
import android.util.Log;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import com.chopcode.trasnportenataga_laplata.models.Reserva;
import com.chopcode.trasnportenataga_laplata.services.reservations.driver.DriverReservationService;
import com.chopcode.trasnportenataga_laplata.services.user.UserService;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.ValueEventListener;
import java.util.ArrayList;
import java.util.List;

/**
 * ViewModel exclusivo para la pantalla principal del conductor.
 * Solo maneja reservas pendientes "Por confirmar" para confirmar o cancelar.
 */
public class ReservasViewModel extends BaseViewModel {

    // Servicios
    private final DriverReservationService driverReservationService;
    private final UserService userService;

    // LiveData para reservas pendientes
    private final MutableLiveData<List<Reserva>> reservasPendientesLiveData = new MutableLiveData<>();
    private final MutableLiveData<Integer> contadorReservasLiveData = new MutableLiveData<>();

    // LiveData para operaciones de confirmación/cancelación
    private final MutableLiveData<Reserva> reservaEnProcesoLiveData = new MutableLiveData<>();
    private final MutableLiveData<Boolean> reservaProcesadaLiveData = new MutableLiveData<>();

    // LiveData para datos del conductor (solo lo necesario para reservas pendientes)
    private final MutableLiveData<String> conductorNombreLiveData = new MutableLiveData<>();
    private final MutableLiveData<List<String>> horariosAsignadosLiveData = new MutableLiveData<>();

    // Variables para el conductor actual
    private String conductorNombreActual;
    private String conductorUIDActual;
    private List<String> horariosAsignadosActual;

    // Control de listeners y estado
    private boolean isRealTimeListenerSetup = false;
    private boolean isLoadingData = false;
    private DatabaseReference reservasRef;
    private ValueEventListener reservasListener;

    public ReservasViewModel() {
        this.driverReservationService = new DriverReservationService();
        this.userService = new UserService();

        // Valores iniciales
        this.contadorReservasLiveData.setValue(0);
        this.reservaProcesadaLiveData.setValue(false);
        this.reservasPendientesLiveData.setValue(new ArrayList<>());
        this.conductorNombreLiveData.setValue(null);
        this.horariosAsignadosLiveData.setValue(new ArrayList<>());

        Log.d(TAG, "✅ ReservasViewModel para pantalla principal inicializado");
    }

    public void initialize(Context context) {
        Log.d(TAG, "✅ ReservasViewModel inicializado con context");
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
     * Obtiene el nombre del conductor para mostrar en la UI
     */
    public LiveData<String> getConductorNombreLiveData() {
        return conductorNombreLiveData;
    }

    /**
     * Obtiene los horarios asignados al conductor
     */
    public LiveData<List<String>> getHorariosAsignadosLiveData() {
        return horariosAsignadosLiveData;
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
     * Inicializa el ViewModel con los datos del conductor y carga las reservas pendientes
     */
    public void inicializarConductor(String conductorUID) {
        if (conductorUID == null || conductorUID.isEmpty()) {
            Log.e(TAG, "❌ conductorUID es nulo o vacío");
            setError("ID del conductor no válido");
            return;
        }

        if (isLoadingData) {
            Log.d(TAG, "⚠️ Ya se está cargando datos, ignorando solicitud duplicada");
            return;
        }

        Log.d(TAG, "👤 Inicializando para conductor UID: " + conductorUID);
        setLoading(true);
        isLoadingData = true;

        this.conductorUIDActual = conductorUID;

        // Cargar datos básicos del conductor
        userService.loadDriverData(conductorUID, new UserService.DriverDataCallback() {
            @Override
            public void onDriverDataLoaded(String nombre, String telefono, String placa, List<String> horarios) {
                Log.d(TAG, "✅ Datos del conductor cargados: " + nombre);
                conductorNombreActual = nombre;
                horariosAsignadosActual = horarios != null ? horarios : new ArrayList<>();

                // Actualizar LiveData
                conductorNombreLiveData.postValue(nombre);
                horariosAsignadosLiveData.postValue(horariosAsignadosActual);

                // Cargar reservas pendientes usando el NUEVO método
                cargarReservasPendientes();

                // Configurar listener en tiempo real
                configurarListenerTiempoReal();

                isLoadingData = false;
                setLoading(false);
            }

            @Override
            public void onError(String error) {
                Log.e(TAG, "❌ Error cargando datos del conductor: " + error);
                setError("Error cargando datos del conductor");
                setLoading(false);
                isLoadingData = false;
            }
        });
    }

    /**
     * Carga las reservas pendientes del conductor usando el NUEVO método unificado
     */
    public void cargarReservasPendientes() {
        if (conductorNombreActual == null || conductorNombreActual.isEmpty()) {
            Log.w(TAG, "⚠️ conductorNombreActual es nulo o vacío");
            return;
        }

        Log.d(TAG, "🔍 Cargando reservas pendientes para: " + conductorNombreActual);
        setLoading(true);

        // ✅ USAR EL NUEVO MÉTODO UNIFICADO: cargarReservasPendientes()
        driverReservationService.cargarReservasPendientes(
                conductorNombreActual,
                horariosAsignadosActual != null ? horariosAsignadosActual : new ArrayList<>(),
                new DriverReservationService.ReservationsCallback() {
                    @Override
                    public void onReservationsLoaded(List<Reserva> reservas) {
                        Log.d(TAG, "✅ " + reservas.size() + " reservas pendientes cargadas");

                        reservasPendientesLiveData.postValue(reservas);
                        contadorReservasLiveData.postValue(reservas.size());

                        setLoading(false);
                        registrarEventoAnalitico("reservas_pendientes_cargadas", reservas.size());
                    }

                    @Override
                    public void onError(String error) {
                        Log.e(TAG, "❌ Error cargando reservas pendientes: " + error);
                        setError("Error cargando reservas");
                        setLoading(false);
                    }
                }
        );
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
                        registrarEventoAnalitico("reserva_confirmada", 1);
                    }

                    @Override
                    public void onError(String error) {
                        Log.e(TAG, "❌ Error confirmando reserva: " + error);
                        setError("Error confirmando reserva");
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
                            registrarEventoAnalitico("reserva_cancelada", 1);
                        }

                        @Override
                        public void onError(String error) {
                            Log.e(TAG, "❌ Error cancelando reserva: " + error);
                            setError("Error cancelando reserva");
                            reservaProcesadaLiveData.postValue(false);
                        }
                    }
            );
        } else {
            // Cancelar con liberar asiento (fallback)
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
                            setError("Error cancelando reserva");
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
                                    // Verificar si pertenece a horarios asignados
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

                        registrarEventoAnalitico("nuevas_reservas_tiempo_real", nuevasReservas.size());
                    }
                }

                @Override
                public void onCancelled(DatabaseError databaseError) {
                    Log.e(TAG, "❌ Error en listener tiempo real: " + databaseError.getMessage());
                    isRealTimeListenerSetup = false; // Permitir reintentar
                    setError("Error en conexión en tiempo real");
                }
            };

            reservasRef.addValueEventListener(reservasListener);
            isRealTimeListenerSetup = true;
            Log.d(TAG, "✅ Listener en tiempo real configurado");

        } catch (Exception e) {
            Log.e(TAG, "❌ Error configurando listener: " + e.getMessage());
            isRealTimeListenerSetup = false;
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

    /**
     * Registra eventos analíticos
     */
    private void registrarEventoAnalitico(String evento, int cantidad) {
        // Implementar con Firebase Analytics si es necesario
        Log.d(TAG, "📊 Evento: " + evento + " - Cantidad: " + cantidad);
    }

    // ============ GETTERS PARA DATOS ACTUALES ============

    public String getConductorNombreActual() {
        return conductorNombreActual;
    }

    public List<String> getHorariosAsignadosActual() {
        return horariosAsignadosActual;
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
        conductorUIDActual = null;
        horariosAsignadosActual = null;
        isLoadingData = false;
    }
}
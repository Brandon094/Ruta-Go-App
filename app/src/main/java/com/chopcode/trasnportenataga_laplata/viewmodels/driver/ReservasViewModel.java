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

public class ReservasViewModel extends BaseViewModel {

    // Servicios
    private final DriverReservationService driverReservationService;
    private final UserService userService;

    // LiveData para reservas
    private final MutableLiveData<List<Reserva>> reservasLiveData = new MutableLiveData<>();
    private final MutableLiveData<Integer> contadorReservasLiveData = new MutableLiveData<>();

    // LiveData para estado de reserva procesada
    private final MutableLiveData<Reserva> reservaEnProcesoLiveData = new MutableLiveData<>();
    private final MutableLiveData<Boolean> reservaProcesadaLiveData = new MutableLiveData<>();

    // LiveData para datos del conductor
    private final MutableLiveData<String> conductorNombreLiveData = new MutableLiveData<>();
    private final MutableLiveData<String> conductorUIDLiveData = new MutableLiveData<>();
    private final MutableLiveData<List<String>> horariosAsignadosLiveData = new MutableLiveData<>();

    // Variables para el conductor actual
    private String conductorNombreActual;
    private String conductorUIDActual;
    private List<String> horariosAsignadosActual;

    // Variables para control de listeners
    private boolean isRealTimeListenerSetup = false;
    private boolean isLoadingData = false;
    private DatabaseReference reservasRef;
    private ValueEventListener reservasListener;

    // Interfaces callback internas
    public interface ReservationsCallback {
        void onReservationsLoaded(List<Reserva> reservas);
        void onError(String error);
    }

    public interface UpdateCallback {
        void onSuccess();
        void onError(String error);
    }

    public ReservasViewModel() {
        this.driverReservationService = new DriverReservationService();
        this.userService = new UserService();

        // Valores iniciales
        this.contadorReservasLiveData.setValue(0);
        this.reservaProcesadaLiveData.setValue(false);
        this.reservasLiveData.setValue(new ArrayList<>());
        this.conductorNombreLiveData.setValue(null);
        this.conductorUIDLiveData.setValue(null);
        this.horariosAsignadosLiveData.setValue(new ArrayList<>());

        Log.d(TAG, "✅ ReservasViewModel inicializado con servicios directos");
    }

    public void initialize(Context context) {
        Log.d(TAG, "✅ ReservasViewModel inicializado con context");
    }

    // ============ GETTERS PARA LIVEDATA ============

    public LiveData<String> getConductorNombreLiveData() {
        return conductorNombreLiveData;
    }

    public LiveData<String> getConductorUIDLiveData() {
        return conductorUIDLiveData;
    }

    public LiveData<List<String>> getHorariosAsignadosLiveData() {
        return horariosAsignadosLiveData;
    }

    public LiveData<List<Reserva>> getReservasLiveData() {
        return reservasLiveData;
    }

    public LiveData<Integer> getContadorReservasLiveData() {
        return contadorReservasLiveData;
    }

    public LiveData<Boolean> getReservaProcesadaLiveData() {
        return reservaProcesadaLiveData;
    }

    public LiveData<Reserva> getReservaEnProcesoLiveData() {
        return reservaEnProcesoLiveData;
    }

    // ============ MÉTODOS PRINCIPALES ============

    /**
     * Carga datos completos del conductor desde UserService
     */
    public void loadDriverData(String conductorUID) {
        if (conductorUID == null || conductorUID.isEmpty()) {
            Log.e(TAG, "❌ conductorUID es nulo o vacío");
            setError("ID del conductor no válido");
            return;
        }

        if (isLoadingData) {
            Log.d(TAG, "⚠️ Ya se está cargando datos, ignorando solicitud duplicada");
            return;
        }

        Log.d(TAG, "👤 Cargando datos del conductor UID: " + conductorUID);
        setLoading(true);
        isLoadingData = true;

        this.conductorUIDActual = conductorUID;
        conductorUIDLiveData.postValue(conductorUID);

        // Usar UserService directamente
        userService.loadDriverData(conductorUID, new UserService.DriverDataCallback() {
            @Override
            public void onDriverDataLoaded(String nombre, String telefono, String placa, List<String> horarios) {
                Log.d(TAG, "✅ Datos del conductor cargados: " + nombre);
                conductorNombreActual = nombre;
                horariosAsignadosActual = horarios != null ? horarios : new ArrayList<>();

                // Actualizar LiveData
                conductorNombreLiveData.postValue(nombre);
                horariosAsignadosLiveData.postValue(horariosAsignadosActual);

                // Cargar reservas pendientes
                loadReservasPendientes();

                // Configurar listener en tiempo real si no está configurado
                if (!isRealTimeListenerSetup) {
                    setupRealTimeListener();
                }

                isLoadingData = false;
                setLoading(false);
            }

            @Override
            public void onError(String error) {
                Log.e(TAG, "❌ Error cargando datos del conductor: " + error);
                setError("Error cargando datos del conductor: " + error);
                setLoading(false);
                isLoadingData = false;
            }
        });
    }

    /**
     * Carga reservas pendientes usando DriverReservationService directamente
     */
    public void loadReservasPendientes() {
        if (conductorNombreActual == null || conductorNombreActual.isEmpty()) {
            Log.w(TAG, "⚠️ conductorNombreActual es nulo o vacío");
            return;
        }

        Log.d(TAG, "🔍 Cargando reservas pendientes para: " + conductorNombreActual);
        setLoading(true);

        driverReservationService.cargarReservasConductor(
                conductorNombreActual,
                horariosAsignadosActual != null ? horariosAsignadosActual : new ArrayList<>(),
                new DriverReservationService.DriverReservationsCallback() {
                    @Override
                    public void onDriverReservationsLoaded(List<Reserva> reservas) {
                        Log.d(TAG, "✅ " + reservas.size() + " reservas pendientes cargadas");

                        // Ya vienen filtradas como "Por confirmar" del servicio
                        reservasLiveData.postValue(reservas);
                        contadorReservasLiveData.postValue(reservas.size());

                        setLoading(false);
                        registrarEventoAnalitico("reservas_pendientes_cargadas", conductorNombreActual, reservas.size());
                    }

                    @Override
                    public void onError(String error) {
                        Log.e(TAG, "❌ Error cargando reservas pendientes: " + error);
                        setError("Error cargando reservas: " + error);
                        setLoading(false);
                    }
                }
        );
    }

    /**
     * Configurar listener en tiempo real para nuevas reservas
     */
    public void setupRealTimeListener() {
        if (conductorNombreActual == null || conductorNombreActual.isEmpty() || isRealTimeListenerSetup) {
            Log.w(TAG, "⚠️ No hay conductor actual o ya está configurado el listener");
            return;
        }

        Log.d(TAG, "🎧 Configurando listener en tiempo real para: " + conductorNombreActual);

        try {
            // Limpiar listener anterior si existe
            cleanupRealTimeListener();

            reservasRef = com.chopcode.trasnportenataga_laplata.config.MyApp.getDatabaseReference("reservas");

            reservasListener = new ValueEventListener() {
                @Override
                public void onDataChange(DataSnapshot dataSnapshot) {
                    Log.d(TAG, "🔄 Datos cambiados en tiempo real");

                    List<Reserva> nuevasReservas = new ArrayList<>();
                    List<Reserva> reservasActuales = reservasLiveData.getValue();
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

                                // Verificar si la reserva ya existe en la lista actual
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

                        // Agregar nuevas reservas a la lista actual
                        reservasActuales.addAll(nuevasReservas);
                        reservasLiveData.postValue(reservasActuales);
                        contadorReservasLiveData.postValue(reservasActuales.size());

                        registrarEventoAnalitico("reservas_tiempo_real", conductorNombreActual, nuevasReservas.size());
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
     * Confirmar reserva usando DriverReservationService
     */
    public void confirmReservation(Reserva reserva) {
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
                        handleReservaProcesada(reserva);
                        reservaProcesadaLiveData.postValue(true);
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
     * Cancelar reserva usando DriverReservationService
     */
    public void cancelReservation(Reserva reserva) {
        if (reserva == null || reserva.getIdReserva() == null) {
            Log.e(TAG, "❌ Reserva o ID de reserva es nulo");
            setError("Reserva no válida");
            return;
        }

        Log.d(TAG, "❌ Cancelando reserva: " + reserva.getIdReserva());
        reservaEnProcesoLiveData.postValue(reserva);
        reservaProcesadaLiveData.postValue(false);

        // Verificar si podemos liberar el asiento
        if (reserva.getHorarioId() != null && reserva.getPuestoReservado() > 0) {
            driverReservationService.cancelarReservaConLiberacion(
                    reserva.getIdReserva(),
                    reserva.getHorarioId(),
                    reserva.getPuestoReservado(),
                    new DriverReservationService.ReservationUpdateCallback() {
                        @Override
                        public void onSuccess() {
                            Log.d(TAG, "✅ Reserva cancelada y asiento liberado exitosamente");
                            handleReservaProcesada(reserva);
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
                            handleReservaProcesada(reserva);
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
     * Cargar historial completo de reservas
     */
    public void loadHistorialCompleto() {
        if (conductorUIDActual == null || conductorUIDActual.isEmpty()) {
            Log.w(TAG, "⚠️ conductorUIDActual es nulo o vacío");
            return;
        }

        Log.d(TAG, "📚 Cargando historial completo para: " + conductorUIDActual);
        setLoading(true);

        driverReservationService.cargarReservasConductorPorUID(
                conductorUIDActual,
                "TODAS", // Todas las reservas sin filtrar por estado
                new DriverReservationService.DriverReservationsByUIDCallback() {
                    @Override
                    public void onReservationsLoaded(List<Reserva> reservas) {
                        Log.d(TAG, "✅ " + reservas.size() + " reservas en historial");
                        // Para historial, mostrar todas sin filtrar
                        reservasLiveData.postValue(reservas);
                        contadorReservasLiveData.postValue(reservas.size());
                        setLoading(false);
                    }

                    @Override
                    public void onError(String error) {
                        Log.e(TAG, "❌ Error cargando historial: " + error);
                        setError("Error cargando historial: " + error);
                        setLoading(false);
                    }
                }
        );
    }

    /**
     * Obtener estadísticas básicas del conductor
     */
    public void obtenerEstadisticasBasicas(DriverReservationService.SimpleStatsCallback callback) {
        if (conductorUIDActual == null || conductorUIDActual.isEmpty()) {
            Log.w(TAG, "⚠️ conductorUIDActual es nulo o vacío");
            callback.onError("Conductor no identificado");
            return;
        }

        Log.d(TAG, "📊 Obteniendo estadísticas básicas para: " + conductorUIDActual);

        driverReservationService.obtenerEstadisticasSimples(
                conductorUIDActual,
                new DriverReservationService.SimpleStatsCallback() {
                    @Override
                    public void onStatsLoaded(DriverReservationService.SimpleDriverStats stats) {
                        Log.d(TAG, "✅ Estadísticas cargadas: " + stats);
                        callback.onStatsLoaded(stats);
                    }

                    @Override
                    public void onError(String error) {
                        Log.e(TAG, "❌ Error obteniendo estadísticas: " + error);
                        callback.onError(error);
                    }
                }
        );
    }

    // ============ MÉTODOS AUXILIARES ============

    /**
     * Refrescar todos los datos
     */
    public void refreshAllData() {
        Log.d(TAG, "🔄 Refrescando todos los datos");
        if (conductorUIDActual != null) {
            loadReservasPendientes();
        }
    }

    /**
     * Pausar actualizaciones en tiempo real
     */
    public void pauseRealTimeUpdates() {
        Log.d(TAG, "⏸️ Pausando actualizaciones en tiempo real");
        cleanupRealTimeListener();
        isRealTimeListenerSetup = false;
    }

    /**
     * Reanudar actualizaciones en tiempo real
     */
    public void resumeRealTimeUpdates() {
        if (conductorNombreActual != null && !isRealTimeListenerSetup) {
            Log.d(TAG, "▶️ Reanudando actualizaciones en tiempo real");
            setupRealTimeListener();
        }
    }

    /**
     * Limpiar listener en tiempo real
     */
    private void cleanupRealTimeListener() {
        if (reservasRef != null && reservasListener != null) {
            reservasRef.removeEventListener(reservasListener);
            Log.d(TAG, "✅ Listener de Firebase removido");
        }
        reservasRef = null;
        reservasListener = null;
    }

    /**
     * Manejar reserva procesada (eliminar de la lista)
     */
    private void handleReservaProcesada(Reserva reserva) {
        if (reserva == null) {
            Log.w(TAG, "⚠️ Reserva es nula en handleReservaProcesada");
            return;
        }

        List<Reserva> reservasActuales = reservasLiveData.getValue();
        if (reservasActuales != null) {
            List<Reserva> nuevasReservas = new ArrayList<>();
            for (Reserva r : reservasActuales) {
                if (r != null && r.getIdReserva() != null &&
                        !r.getIdReserva().equals(reserva.getIdReserva())) {
                    nuevasReservas.add(r);
                }
            }
            reservasLiveData.postValue(nuevasReservas);
            contadorReservasLiveData.postValue(nuevasReservas.size());
        }
    }

    // ============ GETTERS PARA DATOS ACTUALES ============

    public String getConductorNombreActual() {
        return conductorNombreActual;
    }

    public String getConductorUIDActual() {
        return conductorUIDActual;
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
        pauseRealTimeUpdates();

        // Limpiar referencias
        conductorNombreActual = null;
        conductorUIDActual = null;
        horariosAsignadosActual = null;
        isLoadingData = false;
    }

    // ============ MÉTODO DE REGISTRO DE EVENTOS ============

    private void registrarEventoAnalitico(String evento, String conductor, int cantidad) {
        // Método para registrar eventos analíticos
        // Puedes implementar Firebase Analytics, Crashlytics, etc.
        Log.d(TAG, "📊 Evento analítico: " + evento + " - Conductor: " + conductor + " - Cantidad: " + cantidad);
    }
}
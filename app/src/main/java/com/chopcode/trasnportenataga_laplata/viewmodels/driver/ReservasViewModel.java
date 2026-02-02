package com.chopcode.trasnportenataga_laplata.viewmodels.driver;

import com.chopcode.trasnportenataga_laplata.managers.reservations.ReservasManager;
import com.chopcode.trasnportenataga_laplata.models.Reserva;
import android.content.Context;
import android.util.Log;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import java.util.ArrayList;
import java.util.List;

public class ReservasViewModel extends BaseViewModel {
    private final ReservasManager reservasManager;
    // LiveData para reservas
    private final MutableLiveData<List<Reserva>> reservasLiveData = new MutableLiveData<>();
    private final MutableLiveData<Integer> contadorReservasLiveData = new MutableLiveData<>();

    // LiveData para estado de reserva procesada
    private final MutableLiveData<Reserva> reservaEnProcesoLiveData = new MutableLiveData<>();
    private final MutableLiveData<Boolean> reservaProcesadaLiveData = new MutableLiveData<>();

    // ✅ NUEVO: LiveData para datos del conductor
    private final MutableLiveData<String> conductorNombreLiveData = new MutableLiveData<>();
    private final MutableLiveData<String> conductorUIDLiveData = new MutableLiveData<>();

    // Variables para el conductor actual
    private String conductorNombreActual;
    private String conductorUIDActual;

    // Variables para control de listeners
    private boolean isRealTimeListenerSetup = false;
    private boolean isLoadingData = false;

    public ReservasViewModel() {
        this.reservasManager = new ReservasManager();

        // Valores iniciales
        this.contadorReservasLiveData.setValue(0);
        this.reservaProcesadaLiveData.setValue(false);
        this.reservasLiveData.setValue(new ArrayList<>());

        // ✅ Inicializar LiveData del conductor
        this.conductorNombreLiveData.setValue(null);
        this.conductorUIDLiveData.setValue(null);
    }

    public void initialize(Context context) {
        Log.d(TAG, "✅ ReservasViewModel inicializado con ReservasManager");
    }

    // ✅ NUEVO: Getters para LiveData del conductor
    public LiveData<String> getConductorNombreLiveData() {
        return conductorNombreLiveData;
    }

    public LiveData<String> getConductorUIDLiveData() {
        return conductorUIDLiveData;
    }

    // Getters existentes
    public LiveData<List<Reserva>> getReservasLiveData() {
        return reservasLiveData;
    }

    public LiveData<Integer> getContadorReservasLiveData() {
        return contadorReservasLiveData;
    }

    public LiveData<Boolean> getReservaProcesadaLiveData() {
        return reservaProcesadaLiveData;
    }

    /**
     * 🔥 OPTIMIZADO: Cargar datos completos del conductor
     */
    public void loadDriverData(String conductorUID) {
        if (conductorUID == null || conductorUID.isEmpty()) {
            Log.e(TAG, "❌ conductorUID es nulo o vacío");
            setError("ID del conductor no válido");
            return;
        }

        // Evitar cargar duplicados si ya está en proceso
        if (isLoadingData) {
            Log.d(TAG, "⚠️ Ya se está cargando datos, ignorando solicitud duplicada");
            return;
        }

        Log.d(TAG, "👤 Cargando datos del conductor UID: " + conductorUID);
        setLoading(true);
        isLoadingData = true;

        this.conductorUIDActual = conductorUID;
        conductorUIDLiveData.postValue(conductorUID);

        reservasManager.loadDriverData(conductorUID, new ReservasManager.DriverDataCallback() {
            @Override
            public void onDriverDataLoaded(String nombre, String telefono, String placa, List<String> horarios) {
                Log.d(TAG, "✅ Datos del conductor cargados: " + nombre);
                conductorNombreActual = nombre;
                conductorNombreLiveData.postValue(nombre); // ✅ Notificar a observadores

                // Una vez que tenemos los datos del conductor, cargar sus reservas
                loadReservations(conductorUID);

                // Configurar listener en tiempo real si no está configurado
                if (!isRealTimeListenerSetup) {
                    setupRealTimeListener();
                }

                isLoadingData = false;
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
     * 🔥 OPTIMIZADO: Cargar reservas con validación de duplicados
     */
    public void loadReservations(String conductorUID) {
        if (conductorUID == null || conductorUID.isEmpty()) {
            Log.w(TAG, "⚠️ conductorUID es nulo o vacío");
            return;
        }

        Log.d(TAG, "🔍 Cargando reservas para conductor UID: " + conductorUID);
        setLoading(true);

        reservasManager.loadReservations(conductorUID, new ReservasManager.ReservationsCallback() {
            @Override
            public void onReservationsLoaded(List<Reserva> reservas) {
                Log.d(TAG, "✅ " + reservas.size() + " reservas cargadas");

                // Filtrar solo reservas "Por confirmar" para la vista principal
                List<Reserva> reservasPorConfirmar = new ArrayList<>();
                for (Reserva reserva : reservas) {
                    if ("Por confirmar".equals(reserva.getEstadoReserva())) {
                        reservasPorConfirmar.add(reserva);
                    }
                }

                reservasLiveData.postValue(reservasPorConfirmar);
                contadorReservasLiveData.postValue(reservasPorConfirmar.size());

                setLoading(false);
                registrarEventoAnalitico("reservas_cargadas", conductorUID, reservasPorConfirmar.size());
            }

            @Override
            public void onError(String error) {
                Log.e(TAG, "❌ Error cargando reservas: " + error);
                setError("Error cargando reservas: " + error);
                setLoading(false);
            }
        });
    }

    /**
     * 🔥 OPTIMIZADO: Configurar listener en tiempo real (solo una vez)
     */
    public void setupRealTimeListener() {
        if (conductorNombreActual == null || isRealTimeListenerSetup) {
            Log.w(TAG, "⚠️ No hay conductorNombre actual o ya está configurado el listener");
            return;
        }

        Log.d(TAG, "🎧 Configurando listener en tiempo real para: " + conductorNombreActual);
        isRealTimeListenerSetup = true;

        reservasManager.setupRealTimeListener(conductorNombreActual, new ReservasManager.RealTimeCallback() {
            @Override
            public void onDataChanged(List<Reserva> reservas, int nuevasConfirmadas) {
                Log.d(TAG, "🔄 Nuevas reservas en tiempo real: " + reservas.size());

                List<Reserva> reservasActuales = reservasLiveData.getValue();
                if (reservasActuales == null) {
                    reservasActuales = new ArrayList<>();
                }

                // Agregar solo nuevas reservas "Por confirmar"
                for (Reserva nuevaReserva : reservas) {
                    if (!"Por confirmar".equals(nuevaReserva.getEstadoReserva())) {
                        continue; // Saltar reservas que no sean "Por confirmar"
                    }

                    boolean existe = false;
                    for (Reserva existente : reservasActuales) {
                        if (existente.getIdReserva() != null &&
                                existente.getIdReserva().equals(nuevaReserva.getIdReserva())) {
                            existe = true;
                            break;
                        }
                    }
                    if (!existe) {
                        reservasActuales.add(nuevaReserva);
                    }
                }

                reservasLiveData.postValue(reservasActuales);
                contadorReservasLiveData.postValue(reservasActuales.size());

                if (nuevasConfirmadas > 0) {
                    Log.d(TAG, "📊 " + nuevasConfirmadas + " nuevas reservas confirmadas");
                }
            }

            @Override
            public void onError(String error) {
                Log.e(TAG, "❌ Error en listener tiempo real: " + error);
                isRealTimeListenerSetup = false; // Permitir reintentar
            }
        });
    }

    /**
     * 🔥 OPTIMIZADO: Confirmar reserva
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

        reservasManager.updateReservationStatus(reserva, "Confirmada",
                new ReservasManager.UpdateCallback() {
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
                });
    }

    /**
     * 🔥 OPTIMIZADO: Cancelar reserva
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

        if (reserva.getHorarioId() != null && reserva.getPuestoReservado() > 0) {
            reservasManager.cancelReservationWithSeatRelease(reserva,
                    new ReservasManager.UpdateCallback() {
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
                    });
        } else {
            reservasManager.updateReservationStatus(reserva, "Cancelada",
                    new ReservasManager.UpdateCallback() {
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
                    });
        }
    }

    /**
     * 🔥 NUEVO: Método para refrescar datos
     */
    public void refreshAllData() {
        Log.d(TAG, "🔄 Refrescando todos los datos");
        if (conductorUIDActual != null) {
            loadReservations(conductorUIDActual);
        }
    }

    /**
     * 🔥 NUEVO: Método para pausar actualizaciones en tiempo real
     */
    public void pauseRealTimeUpdates() {
        Log.d(TAG, "⏸️ Pausando actualizaciones en tiempo real");
        reservasManager.cleanup();
        isRealTimeListenerSetup = false;
    }

    /**
     * 🔥 NUEVO: Método para reanudar actualizaciones
     */
    public void resumeRealTimeUpdates() {
        if (conductorNombreActual != null && !isRealTimeListenerSetup) {
            Log.d(TAG, "▶️ Reanudando actualizaciones en tiempo real");
            setupRealTimeListener();
        }
    }

    /**
     * Método para manejar reserva procesada
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

    // Getters para conductor actual
    public String getConductorNombreActual() {
        return conductorNombreActual;
    }

    public String getConductorUIDActual() {
        return conductorUIDActual;
    }

    /**
     * 🔥 OPTIMIZADO: Limpieza mejorada
     */
    @Override
    protected void onCleared() {
        super.onCleared();
        Log.d(TAG, "🧹 Limpiando ReservasViewModel");

        // Limpiar listeners
        pauseRealTimeUpdates();

        // Limpiar referencias
        conductorNombreActual = null;
        conductorUIDActual = null;
        isLoadingData = false;

        // Limpiar managers
        reservasManager.cleanup();
    }
}
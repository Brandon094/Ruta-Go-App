package com.chopcode.trasnportenataga_laplata.viewmodels.driver;

import com.chopcode.trasnportenataga_laplata.managers.reservations.ReservasManager;
import com.chopcode.trasnportenataga_laplata.managers.statistics.DriverStatisticsManager;
import com.chopcode.trasnportenataga_laplata.models.Reserva;
import android.content.Context;
import android.util.Log;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import java.util.ArrayList;
import java.util.List;

public class ReservasViewModel extends BaseViewModel {
    private final ReservasManager reservasManager; // ✅ USANDO ReservasManager
    private final DriverStatisticsManager statisticsManager;

    // LiveData para reservas
    private final MutableLiveData<List<Reserva>> reservasLiveData = new MutableLiveData<>();
    private final MutableLiveData<Integer> contadorReservasLiveData = new MutableLiveData<>();

    // LiveData para estado de reserva procesada
    private final MutableLiveData<Reserva> reservaEnProcesoLiveData = new MutableLiveData<>();
    private final MutableLiveData<Boolean> reservaProcesadaLiveData = new MutableLiveData<>();

    // LiveData para estadísticas
    private final MutableLiveData<com.chopcode.trasnportenataga_laplata.services.reservations.driver.DriverReservationService.SimpleDriverStats>
            estadisticasLiveData = new MutableLiveData<>();

    // LiveData para estadísticas diarias
    private final MutableLiveData<Integer> reservasConfirmadasHoyLiveData = new MutableLiveData<>();
    private final MutableLiveData<Integer> asientosDisponiblesHoyLiveData = new MutableLiveData<>();
    private final MutableLiveData<Double> ingresosHoyLiveData = new MutableLiveData<>();

    // Variables para el conductor actual
    private String conductorNombreActual; // Nombre del conductor
    private String conductorUIDActual;    // UID del conductor

    public ReservasViewModel() {
        this.reservasManager = new ReservasManager(); // ✅ INICIALIZADO
        this.statisticsManager = new DriverStatisticsManager();

        // Valores iniciales
        this.contadorReservasLiveData.setValue(0);
        this.reservaProcesadaLiveData.setValue(false);
        this.reservasConfirmadasHoyLiveData.setValue(0);
        this.asientosDisponiblesHoyLiveData.setValue(0);
        this.ingresosHoyLiveData.setValue(0.0);

        this.reservasLiveData.setValue(new ArrayList<>());
        this.estadisticasLiveData.setValue(new com.chopcode.trasnportenataga_laplata.services.reservations.driver.DriverReservationService.SimpleDriverStats());
    }

    public void initialize(Context context) {
        Log.d(TAG, "✅ ReservasViewModel inicializado con ReservasManager");
    }

    // Getters
    public LiveData<List<Reserva>> getReservasLiveData() { return reservasLiveData; }
    public LiveData<Integer> getContadorReservasLiveData() { return contadorReservasLiveData; }
    /**public LiveData<Reserva> getReservaEnProcesoLiveData() { return reservaEnProcesoLiveData; }*/
    public LiveData<Boolean> getReservaProcesadaLiveData() { return reservaProcesadaLiveData; }
    /**public LiveData<com.chopcode.trasnportenataga_laplata.services.reservations.driver
    .DriverReservationService.SimpleDriverStats>
    getEstadisticasLiveData() { return estadisticasLiveData; }
    public LiveData<Integer> getReservasConfirmadasHoyLiveData() { return reservasConfirmadasHoyLiveData; }
    public LiveData<Integer> getAsientosDisponiblesHoyLiveData() { return asientosDisponiblesHoyLiveData; }
    public LiveData<Double> getIngresosHoyLiveData() { return ingresosHoyLiveData; }*/

    /**
     * 🔥 NUEVO: Cargar datos completos del conductor
     */
    public void loadDriverData(String conductorUID) {
        if (conductorUID == null || conductorUID.isEmpty()) {
            Log.e(TAG, "❌ conductorUID es nulo o vacío");
            setError("ID del conductor no válido");
            return;
        }

        Log.d(TAG, "👤 Cargando datos del conductor UID: " + conductorUID);
        setLoading(true);
        this.conductorUIDActual = conductorUID;

        reservasManager.loadDriverData(conductorUID, new ReservasManager.DriverDataCallback() {
            @Override
            public void onDriverDataLoaded(String nombre, String telefono, String placa, List<String> horarios) {
                Log.d(TAG, "✅ Datos del conductor cargados: " + nombre);
                conductorNombreActual = nombre;

                // Una vez que tenemos los datos del conductor, cargar sus reservas
                loadReservations(conductorUID);
                //loadDriverStatistics(conductorUID);
                //loadEstadisticasDiarias(nombre);
            }

            @Override
            public void onError(String error) {
                Log.e(TAG, "❌ Error cargando datos del conductor: " + error);
                setError("Error cargando datos del conductor: " + error);
                setLoading(false);
            }
        });
    }

    /**
     * 🔥 ACTUALIZADO: Usar ReservasManager para cargar reservas
     */
    public void loadReservations(String conductorUID) {
        Log.d(TAG, "🔍 Cargando reservas para conductor UID: " + conductorUID);
        setLoading(true);

        // ✅ USANDO ReservasManager
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
     * 🔥 NUEVO: Cargar TODAS las reservas del conductor (para estadísticas)
     */
    /**public void loadAllDriverReservations(String estadoFiltro) {
        if (conductorUIDActual == null) {
            Log.w(TAG, "⚠️ No hay conductorUID actual");
            return;
        }

        Log.d(TAG, "📋 Cargando TODAS las reservas del conductor (filtro: " + estadoFiltro + ")");

        reservasManager.loadAllDriverReservations(conductorUIDActual, estadoFiltro,
                new ReservasManager.ReservationsCallback() {
                    @Override
                    public void onReservationsLoaded(List<Reserva> reservas) {
                        Log.d(TAG, "📊 " + reservas.size() + " reservas cargadas (todas con filtro: " + estadoFiltro + ")");
                        // Aquí podrías procesar estas reservas para estadísticas avanzadas
                    }

                    @Override
                    public void onError(String error) {
                        Log.e(TAG, "❌ Error cargando todas las reservas: " + error);
                    }
                });
    }*/

    /**
     * 🔥 NUEVO: Cargar estadísticas usando ReservasManager
     */
   /** public void loadDriverStatistics(String conductorUID) {
        if (conductorUID == null || conductorUID.isEmpty()) {
            Log.w(TAG, "⚠️ conductorUID es nulo o vacío");
            return;
        }

        Log.d(TAG, "📊 Cargando estadísticas para conductor: " + conductorUID);

        reservasManager.loadDriverStatistics(conductorUID, new ReservasManager.StatsCallback() {
            @Override
            public void onStatsLoaded(com.chopcode.trasnportenataga_laplata.services.reservations.driver.DriverReservationService.SimpleDriverStats stats) {
                Log.d(TAG, "✅ Estadísticas cargadas:");
                Log.d(TAG, "   - Total: " + stats.totalReservas);
                Log.d(TAG, "   - Confirmadas: " + stats.reservasConfirmadas);
                Log.d(TAG, "   - Ingresos: $" + stats.ingresosTotales);

                estadisticasLiveData.postValue(stats);
                registrarEventoAnalitico("estadisticas_cargadas", conductorUID, stats.totalReservas);
            }

            @Override
            public void onError(String error) {
                Log.e(TAG, "❌ Error cargando estadísticas: " + error);
            }
        });
    }

    /**
     * 🔥 ACTUALIZADO: Usar ReservasManager para estadísticas diarias
     */
    /**public void loadEstadisticasDiarias(String conductorNombre) {
        if (conductorNombre == null || conductorNombre.isEmpty()) {
            Log.w(TAG, "⚠️ conductorNombre es nulo o vacío");
            return;
        }

        Log.d(TAG, "📅 Cargando estadísticas diarias para conductor: " + conductorNombre);

        statisticsManager.calculateDailyStatistics(conductorNombre,
                new DriverStatisticsManager.StatisticsCallback() {
                    @Override
                    public void onStatisticsCalculated(int reservasConfirmadas, int asientosDisponibles, double ingresos) {
                        Log.d(TAG, "📊 Estadísticas diarias cargadas:");
                        Log.d(TAG, "   - Confirmadas hoy: " + reservasConfirmadas);
                        Log.d(TAG, "   - Asientos disponibles: " + asientosDisponibles);
                        Log.d(TAG, "   - Ingresos hoy: $" + ingresos);

                        reservasConfirmadasHoyLiveData.postValue(reservasConfirmadas);
                        asientosDisponiblesHoyLiveData.postValue(asientosDisponibles);
                        ingresosHoyLiveData.postValue(ingresos);

                        // Actualizar ingresos en Firebase si corresponde
                        if (conductorUIDActual != null && ingresos > 0) {
                            updateIncomeInFirebase(conductorUIDActual, ingresos);
                        }
                    }

                    @Override
                    public void onError(String error) {
                        Log.e(TAG, "❌ Error cargando estadísticas diarias: " + error);
                    }
                });
    }*/

    /**
     * 🔥 ACTUALIZADO: Confirmar reserva usando ReservasManager
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

                        // Actualizar estadísticas
                        refreshAllData();

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
     * 🔥 ACTUALIZADO: Cancelar reserva usando ReservasManager (con liberación de asiento)
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

        // ✅ USAR el método mejorado que libera el asiento
        if (reserva.getHorarioId() != null && reserva.getPuestoReservado() > 0) {
            reservasManager.cancelReservationWithSeatRelease(reserva,
                    new ReservasManager.UpdateCallback() {
                        @Override
                        public void onSuccess() {
                            Log.d(TAG, "✅ Reserva cancelada y asiento liberado exitosamente");
                            handleReservaProcesada(reserva);
                            refreshAllData();
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
            // Fallback: Cancelar sin liberar asiento
            reservasManager.updateReservationStatus(reserva, "Cancelada",
                    new ReservasManager.UpdateCallback() {
                        @Override
                        public void onSuccess() {
                            Log.d(TAG, "✅ Reserva cancelada (sin liberar asiento)");
                            handleReservaProcesada(reserva);
                            refreshAllData();
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
     * 🔥 NUEVO: Configurar listener en tiempo real para nuevas reservas
     */
    public void setupRealTimeListener() {
        if (conductorNombreActual == null) {
            Log.w(TAG, "⚠️ No hay conductorNombre actual para configurar listener");
            return;
        }

        Log.d(TAG, "🎧 Configurando listener en tiempo real para: " + conductorNombreActual);

        reservasManager.setupRealTimeListener(conductorNombreActual, new ReservasManager.RealTimeCallback() {
            @Override
            public void onDataChanged(List<Reserva> reservas, int nuevasConfirmadas) {
                Log.d(TAG, "🔄 Nuevas reservas en tiempo real: " + reservas.size());

                // Actualizar la lista de reservas
                List<Reserva> reservasActuales = reservasLiveData.getValue();
                if (reservasActuales == null) {
                    reservasActuales = new ArrayList<>();
                }

                // Agregar nuevas reservas que no estén ya en la lista
                for (Reserva nuevaReserva : reservas) {
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
                    // Si hay nuevas confirmadas, actualizar estadísticas
                    refreshAllData();
                }
            }

            @Override
            public void onError(String error) {
                Log.e(TAG, "❌ Error en listener tiempo real: " + error);
            }
        });
    }

    /**
     * Método privado para actualizar ingresos en Firebase
     */
    private void updateIncomeInFirebase(String userId, double ingresos) {
        statisticsManager.updateIncomeInFirebase(userId, ingresos,
                new DriverStatisticsManager.IncomeUpdateCallback() {
                    @Override
                    public void onSuccess(double nuevosIngresos) {
                        Log.d(TAG, "✅ Ingresos actualizados en Firebase: $" + nuevosIngresos);
                    }

                    @Override
                    public void onError(String error) {
                        Log.e(TAG, "❌ Error actualizando ingresos en Firebase: " + error);
                    }
                });
    }

    /**
     * 🔥 NUEVO: Método para actualizar todos los datos
     */
    public void refreshAllData() {
        if (conductorUIDActual != null) {
            loadReservations(conductorUIDActual);
            //loadDriverStatistics(conductorUIDActual);
        }

        /**if (conductorNombreActual != null) {
            loadEstadisticasDiarias(conductorNombreActual);
        }*/
    }

    /**
     * Método reutilizable: Maneja la lógica después de procesar una reserva
     */
    private void handleReservaProcesada(Reserva reserva) {
        if (reserva == null) {
            Log.w(TAG, "⚠️ Reserva es nula en handleReservaProcesada");
            return;
        }

        // Remover la reserva de la lista local
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
/**
    // Setters para conductor
    public void setConductorNombreActual(String conductorNombreActual) {
        this.conductorNombreActual = conductorNombreActual;
    }

    public void setConductorUIDActual(String conductorUIDActual) {
        this.conductorUIDActual = conductorUIDActual;
    }*/

    public String getConductorNombreActual() {
        return conductorNombreActual;
    }

    public String getConductorUIDActual() {
        return conductorUIDActual;
    }

    /**
     * Limpieza mejorada
     */
    @Override
    protected void onCleared() {
        super.onCleared();
        Log.d(TAG, "🧹 Limpiando ReservasViewModel");
        reservasManager.cleanup();
        conductorNombreActual = null;
        conductorUIDActual = null;
    }
}
// EstadisticasViewModel.java
package com.chopcode.trasnportenataga_laplata.viewmodels.driver;

import com.chopcode.trasnportenataga_laplata.managers.statistics.DriverStatisticsManager;
import com.chopcode.trasnportenataga_laplata.models.Reserva;
import com.chopcode.trasnportenataga_laplata.models.Ruta;
import com.chopcode.trasnportenataga_laplata.services.reservations.driver.DriverReservationService;

import android.util.Log;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

/**
 * ViewModel especializado en el cálculo y gestión de estadísticas para conductores.
 *
 * <p><b>Responsabilidades:</b></p>
 * <ul>
 *   <li>Calcular estadísticas generales (reservas confirmadas, asientos disponibles, ingresos)</li>
 *   <li>Procesar estadísticas específicas por ruta</li>
 *   <li>Gestionar actualizaciones en tiempo real desde Firebase</li>
 *   <li>Procesar datos localmente cuando no hay conexión</li>
 *   <li>Proveer LiveData observables para la UI</li>
 * </ul>
 *
 * <p><b>Arquitectura optimizada:</b></p>
 * <ul>
 *   <li>Usa directamente {@link DriverReservationService} eliminando capas redundantes</li>
 *   <li>Mantiene compatibilidad con procesamiento local</li>
 *   <li>Implementa patrones de diseño MVVM correctamente</li>
 * </ul>
 *
 * @version 2.0 (Optimizada)
 * @since 2024
 */
public class EstadisticasViewModel extends BaseViewModel {

    // =========================================================================
    // CONSTANTES Y VARIABLES DE INSTANCIA
    // =========================================================================

    /** Manager para cálculos estadísticos complejos (legacy/compatibilidad) */
    private final DriverStatisticsManager statisticsManager;

    /** Servicio directo para operaciones de reservas (optimizado) */
    private final DriverReservationService driverReservationService;

    // -------------------------------------------------------------------------
    // LIVE DATA PARA ESTADÍSTICAS GENERALES
    // -------------------------------------------------------------------------

    /** Número de reservas confirmadas (observable) */
    private final MutableLiveData<Integer> reservasConfirmadasLiveData = new MutableLiveData<>();

    /** Número de asientos disponibles totales (observable) - Máximo 26 asientos */
    private final MutableLiveData<Integer> asientosDisponiblesLiveData = new MutableLiveData<>();

    /** Ingresos totales en formato decimal (observable) */
    private final MutableLiveData<Double> ingresosLiveData = new MutableLiveData<>();

    // -------------------------------------------------------------------------
    // LIVE DATA PARA ESTADÍSTICAS POR RUTA (RUTA 1)
    // -------------------------------------------------------------------------

    /** Nombre de la primera ruta (ej: "Nataga → La Plata") */
    private final MutableLiveData<String> nombreRuta1LiveData = new MutableLiveData<>();

    /** Reservas confirmadas en la primera ruta */
    private final MutableLiveData<Integer> reservasRuta1LiveData = new MutableLiveData<>();

    /** Asientos disponibles en la primera ruta - Máximo 13 asientos por ruta */
    private final MutableLiveData<Integer> asientosRuta1LiveData = new MutableLiveData<>();

    // -------------------------------------------------------------------------
    // LIVE DATA PARA ESTADÍSTICAS POR RUTA (RUTA 2)
    // -------------------------------------------------------------------------

    /** Nombre de la segunda ruta (ej: "La Plata → Nataga") */
    private final MutableLiveData<String> nombreRuta2LiveData = new MutableLiveData<>();

    /** Reservas confirmadas en la segunda ruta */
    private final MutableLiveData<Integer> reservasRuta2LiveData = new MutableLiveData<>();

    /** Asientos disponibles en la segunda ruta - Máximo 13 asientos por ruta */
    private final MutableLiveData<Integer> asientosRuta2LiveData = new MutableLiveData<>();

    // -------------------------------------------------------------------------
    // VARIABLES DE ESTADO
    // -------------------------------------------------------------------------

    /** UID o nombre del conductor actual para filtrar estadísticas */
    private String conductorActual;

    /** Executor para operaciones en segundo plano (procesamiento local) */
    private final Executor mainExecutor = Executors.newSingleThreadExecutor();

    // =========================================================================
    // CONSTRUCTOR
    // =========================================================================

    /**
     * Constructor principal. Inicializa todos los componentes y establece valores por defecto.
     */
    public EstadisticasViewModel() {
        this.statisticsManager = new DriverStatisticsManager();
        this.driverReservationService = new DriverReservationService();

        // Establecer valores iniciales para evitar null en la UI
        reservasConfirmadasLiveData.setValue(0);
        asientosDisponiblesLiveData.setValue(0); // Valor por defecto
        ingresosLiveData.setValue(0.0);
        reservasRuta1LiveData.setValue(0); asientosRuta1LiveData.setValue(0);
        reservasRuta2LiveData.setValue(0); asientosRuta2LiveData.setValue(0);
    }

    // =========================================================================
    // MÉTODOS PÚBLICOS - SETTERS Y GETTERS
    // =========================================================================

    /**
     * Establece el conductor actual para filtrar estadísticas.
     *
     * @param conductorActual UID o nombre del conductor
     */
    public void setConductorActual(String conductorActual) {
        this.conductorActual = conductorActual;
        Log.d(TAG, "👤 Conductor actual establecido: " + conductorActual);
    }

    // -------------------------------------------------------------------------
    // GETTERS PARA LIVE DATA (PÚBLICOS)
    // -------------------------------------------------------------------------

    /** @return LiveData del número de reservas confirmadas */
    public LiveData<Integer> getReservasConfirmadasLiveData() {
        return reservasConfirmadasLiveData;
    }

    /** @return LiveData del número de asientos disponibles totales */
    public LiveData<Integer> getAsientosDisponiblesLiveData() {
        return asientosDisponiblesLiveData;
    }

    /** @return LiveData de los ingresos totales */
    public LiveData<Double> getIngresosLiveData() {
        return ingresosLiveData;
    }

    /** @return LiveData del nombre de la primera ruta */
    public LiveData<String> getNombreRuta1LiveData() {
        return nombreRuta1LiveData;
    }

    /** @return LiveData de reservas confirmadas en la primera ruta */
    public LiveData<Integer> getReservasRuta1LiveData() {
        return reservasRuta1LiveData;
    }

    /** @return LiveData de asientos disponibles en la primera ruta */
    public LiveData<Integer> getAsientosRuta1LiveData() {
        return asientosRuta1LiveData;
    }

    /** @return LiveData del nombre de la segunda ruta */
    public LiveData<String> getNombreRuta2LiveData() {
        return nombreRuta2LiveData;
    }

    /** @return LiveData de reservas confirmadas en la segunda ruta */
    public LiveData<Integer> getReservasRuta2LiveData() {
        return reservasRuta2LiveData;
    }

    /** @return LiveData de asientos disponibles en la segunda ruta */
    public LiveData<Integer> getAsientosRuta2LiveData() {
        return asientosRuta2LiveData;
    }

    // =========================================================================
    // MÉTODO PRINCIPAL - ENTRADA PARA CÁLCULO DE ESTADÍSTICAS
    // =========================================================================

    /**
     * Método principal para calcular estadísticas. Decide automáticamente el modo de operación:
     *
     * <ol>
     *   <li><b>Modo Firebase:</b> Si hay conductor establecido → carga datos desde Firebase</li>
     *   <li><b>Modo Local:</b> Si se proporcionan listas → procesa datos localmente</li>
     *   <li><b>Modo Por Defecto:</b> Sin datos → establece valores por defecto</li>
     * </ol>
     *
     * @param rutas    Lista de rutas (puede ser null para modo Firebase)
     * @param reservas Lista de reservas (puede ser null para modo Firebase)
     */
    public void calculateRouteStatistics(List<Ruta> rutas, List<Reserva> reservas) {
        Log.d(TAG, "📊 CALCULANDO ESTADÍSTICAS - Método con listas");
        Log.d(TAG, "   Rutas: " + (rutas != null ? rutas.size() : 0) +
                ", Reservas: " + (reservas != null ? reservas.size() : 0));

        if (conductorActual != null && !conductorActual.isEmpty()) {
            // 🔥 MODO FIREBASE: Cargar datos desde la nube
            loadDriverStatisticsFromFirebase();
        } else if (rutas != null && reservas != null && !reservas.isEmpty()) {
            // 💾 MODO LOCAL: Procesar datos proporcionados
            processGivenLists(rutas, reservas);
        } else {
            // ⚠️ SIN DATOS: Usar valores por defecto
            Log.w(TAG, "⚠️ No hay datos suficientes, usando valores por defecto");
            setDefaultRouteValues();
        }
    }

    // =========================================================================
    // MÉTODOS PRIVADOS - LÓGICA DE FIREBASE (MODO ONLINE)
    // =========================================================================

    /**
     * Carga estadísticas desde Firebase usando {@link DriverReservationService} directamente.
     *
     * <p><b>Flujo:</b></p>
     * <ol>
     *   <li>Obtiene estadísticas simples (reservas confirmadas, ingresos)</li>
     *   <li>Calcula asientos disponibles (26 asientos totales)</li>
     *   <li>Carga reservas para análisis detallado por ruta</li>
     * </ol>
     *
     * @see DriverReservationService#obtenerEstadisticasSimples
     */
    private void loadDriverStatisticsFromFirebase() {
        Log.d(TAG, "🔥 Cargando estadísticas desde Firebase para: " + conductorActual);
        setLoading(true);

        driverReservationService.obtenerEstadisticasSimples(conductorActual,
                new DriverReservationService.SimpleStatsCallback() {
                    @Override
                    public void onStatsLoaded(DriverReservationService.SimpleDriverStats stats) {
                        Log.d(TAG, "✅ Estadísticas simples cargadas desde Firebase:");
                        Log.d(TAG, "   - Total reservas: " + stats.totalReservas);
                        Log.d(TAG, "   - Confirmadas: " + stats.reservasConfirmadas);
                        Log.d(TAG, "   - Pendientes: " + stats.reservasPendientes);
                        Log.d(TAG, "   - Ingresos: $" + stats.ingresosTotales);

                        // Actualizar LiveData con estadísticas simples
                        reservasConfirmadasLiveData.postValue(stats.reservasConfirmadas);
                        ingresosLiveData.postValue(stats.ingresosTotales);

                        // Calcular asientos disponibles (26 asientos totales)
                        int asientosOcupados = stats.reservasConfirmadas + stats.reservasPendientes;
                        int asientosDisponibles = Math.max(0, 26 - asientosOcupados);
                        asientosDisponiblesLiveData.postValue(asientosDisponibles);

                        // Cargar reservas para análisis detallado por ruta
                        loadReservationsForDetailedAnalysis();
                    }

                    @Override
                    public void onError(String error) {
                        Log.e(TAG, "❌ Error cargando estadísticas desde Firebase: " + error);
                        setError("Error cargando estadísticas: " + error);
                        setLoading(false);
                        setDefaultRouteValues();
                    }
                });
    }

    /**
     * Carga todas las reservas del conductor para análisis detallado por ruta.
     *
     * <p>Usado después de obtener estadísticas simples para agrupar por origen-destino.</p>
     *
     * @see DriverReservationService#cargarReservasConductorPorUID
     */
    private void loadReservationsForDetailedAnalysis() {
        // Cargar todas las reservas del conductor usando DriverReservationService directamente
        driverReservationService.cargarReservasConductorPorUID(
                conductorActual,
                "TODAS", // Filtro: todas las reservas sin importar estado
                new DriverReservationService.DriverReservationsByUIDCallback() {
                    @Override
                    public void onReservationsLoaded(List<Reserva> reservas) {
                        Log.d(TAG, "✅ " + reservas.size() + " reservas cargadas para análisis detallado");
                        processReservationsForDetailedStats(reservas);
                        setLoading(false);
                    }

                    @Override
                    public void onError(String error) {
                        Log.e(TAG, "❌ Error cargando reservas: " + error);
                        setDefaultRouteValues();
                        setLoading(false);
                    }
                });
    }

    /**
     * Procesa la lista de reservas para generar estadísticas detalladas por ruta.
     *
     * <p><b>Agrupación:</b> Las reservas se agrupan por combinación origen|destino.</p>
     * <p><b>Cálculos por ruta:</b></p>
     * <ul>
     *   <li>Reservas confirmadas: Solo estado "Confirmada"</li>
     *   <li>Asientos ocupados: Estados "Confirmada" y "Por confirmar"</li>
     * </ul>
     *
     * @param reservas Lista completa de reservas del conductor
     */
    private void processReservationsForDetailedStats(List<Reserva> reservas) {
        // Agrupar reservas por ruta/origen-destino
        Map<String, Integer> reservasPorRuta = new HashMap<>();
        Map<String, Integer> asientosOcupadosPorRuta = new HashMap<>();
        Map<String, String> nombresRutas = new HashMap<>();

        for (Reserva reserva : reservas) {
            // Crear un identificador único de ruta basado en origen y destino
            String rutaKey = reserva.getOrigen() + "|" + reserva.getDestino();
            String nombreRuta = reserva.getOrigen() + " → " + reserva.getDestino();

            if (!nombresRutas.containsKey(rutaKey)) {
                nombresRutas.put(rutaKey, nombreRuta);
                reservasPorRuta.put(rutaKey, 0);
                asientosOcupadosPorRuta.put(rutaKey, 0);
            }

            String estado = reserva.getEstadoReserva();

            // Contar reservas confirmadas por ruta
            if ("Confirmada".equals(estado)) {
                int count = reservasPorRuta.getOrDefault(rutaKey, 0);
                reservasPorRuta.put(rutaKey, count + 1);

                // Asiento ocupado por reserva confirmada
                int ocupados = asientosOcupadosPorRuta.getOrDefault(rutaKey, 0);
                asientosOcupadosPorRuta.put(rutaKey, ocupados + 1);
            }
            // Contar asientos ocupados por reservas pendientes
            else if ("Por confirmar".equals(estado)) {
                int ocupados = asientosOcupadosPorRuta.getOrDefault(rutaKey, 0);
                asientosOcupadosPorRuta.put(rutaKey, ocupados + 1);
            }
        }

        Log.d(TAG, "📊 Análisis detallado completado:");
        Log.d(TAG, "   - Rutas diferentes encontradas: " + nombresRutas.size());
        for (Map.Entry<String, String> entry : nombresRutas.entrySet()) {
            String rutaKey = entry.getKey();
            Log.d(TAG, "   - Ruta: " + entry.getValue() +
                    " - Confirmadas: " + reservasPorRuta.getOrDefault(rutaKey, 0) +
                    " - Ocupados: " + asientosOcupadosPorRuta.getOrDefault(rutaKey, 0));
        }

        // Procesar estadísticas por ruta
        processRouteStatistics(reservasPorRuta, asientosOcupadosPorRuta, nombresRutas);
    }

    // =========================================================================
    // MÉTODOS PRIVADOS - PROCESAMIENTO LOCAL (MODO OFFLINE)
    // =========================================================================

    /**
     * Procesa listas de rutas y reservas proporcionadas localmente.
     *
     * <p><b>Características:</b></p>
     * <ul>
     *   <li>Se ejecuta en un hilo secundario</li>
     *   <li>Actualiza LiveData en el hilo principal</li>
     *   <li>Maneja excepciones adecuadamente</li>
     * </ul>
     *
     * @param rutas    Lista de rutas disponibles
     * @param reservas Lista de reservas a procesar
     */
    private void processGivenLists(List<Ruta> rutas, List<Reserva> reservas) {
        Log.d(TAG, "🔄 Procesando listas proporcionadas localmente");
        setLoading(true);

        new Thread(() -> {
            try {
                Map<String, Integer> reservasPorRuta = new HashMap<>();
                Map<String, Integer> asientosOcupadosPorRuta = new HashMap<>();
                Map<String, String> nombresRutas = new HashMap<>();

                // Procesar rutas
                for (Ruta ruta : rutas) {
                    String rutaId = ruta.getId();
                    if (rutaId != null) {
                        // Usar horario como nombre temporal si no hay nombre
                        String nombreRuta = ruta.getHorarioId() != null ? ruta.getHorarioId() :
                                "Ruta " + ruta.getHorarioId();
                        nombresRutas.put(rutaId, nombreRuta);
                        reservasPorRuta.put(rutaId, 0);
                        asientosOcupadosPorRuta.put(rutaId, 0);
                    }
                }

                // Procesar reservas
                int totalConfirmadas = 0;
                int totalAsientosOcupados = 0;
                double totalIngresos = 0.0;

                for (Reserva reserva : reservas) {
                    String rutaId = reserva.getIdRuta();
                    String estado = reserva.getEstadoReserva();

                    if (rutaId != null && nombresRutas.containsKey(rutaId)) {
                        if ("Confirmada".equals(estado)) {
                            int current = reservasPorRuta.getOrDefault(rutaId, 0);
                            reservasPorRuta.put(rutaId, current + 1);

                            int ocupados = asientosOcupadosPorRuta.getOrDefault(rutaId, 0);
                            asientosOcupadosPorRuta.put(rutaId, ocupados + 1);

                            totalConfirmadas++;
                            totalAsientosOcupados++;
                            totalIngresos += reserva.getPrecio();

                        } else if ("Por confirmar".equals(estado)) {
                            int ocupados = asientosOcupadosPorRuta.getOrDefault(rutaId, 0);
                            asientosOcupadosPorRuta.put(rutaId, ocupados + 1);
                            totalAsientosOcupados++;
                        }
                    }
                }

                int totalAsientosDisponibles = Math.max(0, 26 - totalAsientosOcupados);
                final int finalConfirmadas = totalConfirmadas;
                final double finalIngresos = totalIngresos;
                final int finalAsientosDisponibles = totalAsientosDisponibles;

                // Actualizar en hilo principal
                mainExecutor.execute(() -> {
                    reservasConfirmadasLiveData.postValue(finalConfirmadas);
                    asientosDisponiblesLiveData.postValue(finalAsientosDisponibles);
                    ingresosLiveData.postValue(finalIngresos);

                    processRouteStatistics(reservasPorRuta, asientosOcupadosPorRuta, nombresRutas);
                    setLoading(false);

                    Log.d(TAG, "✅ Listas procesadas:");
                    Log.d(TAG, "   - Confirmadas: " + finalConfirmadas);
                    Log.d(TAG, "   - Asientos disponibles: " + finalAsientosDisponibles);
                    Log.d(TAG, "   - Ingresos: $" + finalIngresos);
                });

            } catch (Exception e) {
                Log.e(TAG, "❌ Error procesando listas: " + e.getMessage(), e);
                mainExecutor.execute(() -> {
                    setError("Error procesando datos: " + e.getMessage());
                    setLoading(false);
                    setDefaultRouteValues();
                });
            }
        }).start();
    }

    // =========================================================================
    // MÉTODOS PRIVADOS - PROCESAMIENTO DE ESTADÍSTICAS POR RUTA
    // =========================================================================

    /**
     * Procesa y actualiza las estadísticas específicas por ruta.
     *
     * <p><b>Lógica:</b></p>
     * <ul>
     *   <li>Máximo 2 rutas mostradas (Ruta1 y Ruta2)</li>
     *   <li>Cálculo de asientos disponibles por ruta (máximo 13)</li>
     *   <li>Establece valores por defecto si hay menos de 2 rutas</li>
     * </ul>
     *
     * @param reservasPorRuta        Mapa de reservas confirmadas por ruta
     * @param asientosOcupadosPorRuta Mapa de asientos ocupados por ruta
     * @param nombresRutas           Mapa de nombres de rutas
     */
    private void processRouteStatistics(Map<String, Integer> reservasPorRuta,
                                        Map<String, Integer> asientosOcupadosPorRuta,
                                        Map<String, String> nombresRutas) {

        Log.d(TAG, "🗺️ Procesando estadísticas por ruta...");

        if (reservasPorRuta == null || asientosOcupadosPorRuta == null || nombresRutas == null) {
            Log.w(TAG, "⚠️ No hay datos de rutas disponibles");
            setDefaultRouteValues();
            return;
        }

        int rutaIndex = 0;
        for (Map.Entry<String, Integer> entry : reservasPorRuta.entrySet()) {
            String rutaId = entry.getKey();
            int reservasEnRuta = entry.getValue();
            int asientosOcupadosEnRuta = asientosOcupadosPorRuta.getOrDefault(rutaId, 0);
            int asientosDisponiblesEnRuta = Math.max(0, 13 - asientosOcupadosEnRuta);
            String nombreRuta = nombresRutas.get(rutaId);

            Log.d(TAG, "   Ruta " + (rutaIndex + 1) + ": " + nombreRuta +
                    " - Confirmadas: " + reservasEnRuta +
                    " - Disponibles: " + asientosDisponiblesEnRuta);

            if (rutaIndex == 0) {
                nombreRuta1LiveData.postValue(nombreRuta != null ? nombreRuta : "Nataga → La Plata");
                reservasRuta1LiveData.postValue(reservasEnRuta);
                asientosRuta1LiveData.postValue(asientosDisponiblesEnRuta);
            } else if (rutaIndex == 1) {
                nombreRuta2LiveData.postValue(nombreRuta != null ? nombreRuta : "La Plata → Nataga");
                reservasRuta2LiveData.postValue(reservasEnRuta);
                asientosRuta2LiveData.postValue(asientosDisponiblesEnRuta);
            }

            rutaIndex++;
            if (rutaIndex >= 2) break; // Solo mostrar máximo 2 rutas
        }

        // Si hay menos de 2 rutas, establecer valores por defecto
        if (rutaIndex < 1) {
            setDefaultRouteValues();
        } else if (rutaIndex < 2) {
            // Solo hay una ruta, establecer valores por defecto para la segunda
            nombreRuta2LiveData.postValue("La Plata → Nataga");
            reservasRuta2LiveData.postValue(0);
            asientosRuta2LiveData.postValue(13); // Asientos disponibles máximos
        }
    }

    /**
     * Establece valores por defecto para todas las estadísticas de rutas.
     * Usado cuando no hay datos disponibles o ocurre un error.
     */
    private void setDefaultRouteValues() {
        Log.d(TAG, "⚙️ Estableciendo valores por defecto para rutas");
        nombreRuta1LiveData.postValue("N/A → N/A");
        reservasRuta1LiveData.postValue(0);
        asientosRuta1LiveData.postValue(0);
        nombreRuta2LiveData.postValue("N/A → N/A");
        reservasRuta2LiveData.postValue(0);
        asientosRuta2LiveData.postValue(0);
    }

    // =========================================================================
    // MÉTODOS PÚBLICOS - GESTIÓN DE ACTUALIZACIONES
    // =========================================================================

    /**
     * Refresca todas las estadísticas cargando datos actualizados desde Firebase.
     *
     * <p><b>Uso típico:</b></p>
     * <ul>
     *   <li>Al abrir/volver a la actividad principal</li>
     *   <li>Después de procesar una reserva</li>
     *   <li>En respuesta a acción manual del usuario (pull-to-refresh)</li>
     * </ul>
     */
    public void refreshStatistics() {
        if (conductorActual != null && !conductorActual.isEmpty()) {
            Log.d(TAG, "🔄 Refrescando estadísticas para: " + conductorActual);
            // Usar el método que carga desde Firebase
            loadDriverStatisticsFromFirebase();
        }
    }

    /**
     * Método de conveniencia para actualizar estadísticas después de procesar una reserva.
     *
     * <p><b>Uso recomendado:</b> Llamar después de confirmar/cancelar una reserva
     * para mantener las estadísticas actualizadas.</p>
     */
    public void onReservationProcessed() {
        Log.d(TAG, "🔄 Actualizando estadísticas después de procesar reserva");
        refreshStatistics();
    }

    // =========================================================================
    // MÉTODOS COMENTADOS (LEGACY - PARA REFERENCIA)
    // =========================================================================

    /*
    // Métodos legacy mantenidos para referencia/compatibilidad
    // Fueron reemplazados por la implementación optimizada actual

    public void calculateRouteStatisticsOnly(String conductorNombre) {
        // Implementación anterior usando DriverStatisticsManager
    }

    public void calculateStatistics(String conductorNombre) {
        // Implementación anterior para estadísticas completas
    }
    */
}
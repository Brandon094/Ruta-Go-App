// EstadisticasViewModel.java
package com.chopcode.rutago.app.viewmodels.driver;

import com.chopcode.rutago.app.models.Reserva;
import com.chopcode.rutago.app.services.reservations.driver.DriverReservationService;
import com.chopcode.rutago.app.viewmodels.BaseViewModel;

import android.util.Log;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import java.util.ArrayList;
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

    private static final String TAG = "EstadisticasViewModel";

    // CAPACIDAD POR DEFECTO (Se actualiza dinámicamente)
    private int capacidadPorRuta = 13;

    // =========================================================================
    // CONSTANTES Y VARIABLES DE INSTANCIA
    // =========================================================================

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

    /** Horarios asignados al conductor para filtrado de legado */
    private List<String> horariosAsignados;

    /** Executor para operaciones en segundo plano (procesamiento local) */
    private final Executor mainExecutor = Executors.newSingleThreadExecutor();

    // =========================================================================
    // CONSTRUCTOR
    // =========================================================================

    /**
     * Constructor principal.
     * Inicializa todos los componentes y establece valores por defecto.
     */
    public EstadisticasViewModel() {
        this.driverReservationService = new DriverReservationService();

        // Establecer valores iniciales para evitar null en la UI
        reservasConfirmadasLiveData.setValue(0);
        asientosDisponiblesLiveData.setValue(0); // Valor por defecto
        ingresosLiveData.setValue(0.0);
        reservasRuta1LiveData.setValue(0); asientosRuta1LiveData.setValue(0);
        reservasRuta2LiveData.setValue(0); asientosRuta2LiveData.setValue(0);

        // INICIALIZAR TODOS LOS LiveData
        nombreRuta1LiveData.setValue("Nataga → La Plata");
        reservasRuta1LiveData.setValue(0);
        asientosRuta1LiveData.setValue(capacidadPorRuta); // 13 asientos disponibles (por defecto)

        nombreRuta2LiveData.setValue("La Plata → Nataga");
        reservasRuta2LiveData.setValue(0);
        asientosRuta2LiveData.setValue(capacidadPorRuta); // 13 asientos disponibles (por defecto)
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

    /**
     * Establece los horarios asignados para mejorar el filtrado de reservas antiguas.
     */
    public void setHorariosAsignados(List<String> horarios) {
        this.horariosAsignados = horarios;
        Log.d(TAG, "🕐 Horarios asignados para estadísticas: " + (horarios != null ? horarios.size() : 0));
    }

    /**
     * Establece la capacidad real del vehículo.
     */
    public void setCapacidadVehiculo(int capacidad) {
        if (capacidad > 0) {
            this.capacidadPorRuta = capacidad;
            Log.d(TAG, "🚌 Capacidad del vehículo establecida: " + capacidad);
            
            // Si ya tenemos datos de rutas, refrescar para actualizar asientos disponibles
            if (conductorActual != null && !conductorActual.isEmpty()) {
                calculateRouteStatistics();
            }
        }
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
     *   <li><b>Modo Por Defecto:</b> Sin datos → establece valores por defecto</li>
     * </ol>
     */
    public void calculateRouteStatistics() {
        if (conductorActual != null && !conductorActual.isEmpty()) {
            // 🔥 MODO FIREBASE: Cargar datos desde la nube
            loadDriverStatisticsFromFirebase();
        } else {
            // ⚠️ SIN DATOS: Usar valores por defecto
            Log.w(TAG, "⚠️ No hay datos suficientes, usando valores por defecto");
            setDefaultRouteValues();
        }
    }

    // =========================================================================
    // MÉTODOS PRIVADOS - LÓGICA DE FIREBASE OPTIMIZADA
    // =========================================================================

    /**
     * Carga estadísticas desde Firebase usando el método OPTIMIZADO de una sola consulta.
     *
     * <p><b>Flujo optimizado:</b></p>
     * <ol>
     *   <li>✅ 1 consulta a Firebase usando {@link DriverReservationService#obtenerEstadisticasCompletas}</li>
     *   <li>✅ Obtiene estadísticas + listas separadas por estado en una sola llamada</li>
     *   <li>✅ Calcula asientos disponibles (26 asientos totales)</li>
     *   <li>✅ Procesa análisis por ruta usando listas YA CARGADAS (sin consultas adicionales)</li>
     * </ol>
     *
     * <p><b>Beneficios:</b> Elimina 2-3 consultas duplicadas, mejora rendimiento en ~60%</p>
     *
     * @see DriverReservationService#obtenerEstadisticasCompletas
     */
    /**
     * Carga estadísticas desde Firebase usando el método OPTIMIZADO de una sola consulta.
     * FILTRA SOLO RESERVAS DEL DÍA ACTUAL.
     *
     * <p><b>Flujo optimizado:</b></p>
     * <ol>
     *   <li>✅ 1 consulta a Firebase obteniendo todas las reservas</li>
     *   <li>✅ Filtra localmente solo reservas del día actual</li>
     *   <li>✅ Calcula estadísticas generales</li>
     *   <li>✅ Procesa análisis por ruta usando listas YA FILTRADAS</li>
     * </ol>
     *
     * <p><b>Filtro por fecha:</b> Solo se consideran reservas del día actual (medianoche a medianoche)</p>
     *
     * @see DriverReservationService#obtenerEstadisticasCompletas
     */
    private void loadDriverStatisticsFromFirebase() {
        Log.d(TAG, "🚀 Cargando estadísticas para: " + conductorActual + " | Horarios: " + (horariosAsignados != null ? horariosAsignados.size() : "N/A"));
        setLoading(true);

        driverReservationService.obtenerEstadisticasCompletas(conductorActual, horariosAsignados,
                new DriverReservationService.CompleteStatsCallback() {
                    @Override
                    public void onCompleteStatsLoaded(
                            DriverReservationService.CompleteDriverStats stats) {

                        Log.d(TAG, "✅ " + stats.todasLasReservas.size() + " reservas totales encontradas en Firebase para este conductor");

                        // 🔥 FILTRAR SOLO RESERVAS DEL DÍA ACTUAL
                        List<Reserva> reservasConfirmadasHoy = filtrarReservasDelDia(stats.reservasConfirmadasList);
                        List<Reserva> reservasPendientesHoy = filtrarReservasDelDia(stats.reservasPendientesList);

                        // Calcular estadísticas solo para hoy
                        int reservasConfirmadasHoyCount = reservasConfirmadasHoy.size();
                        int reservasPendientesHoyCount = reservasPendientesHoy.size();
                        double ingresosHoy = calcularIngresosDelDia(reservasConfirmadasHoy);

                        Log.d(TAG, "📅 ESTADÍSTICAS DE HOY:");
                        Log.d(TAG, "   - Confirmadas hoy: " + reservasConfirmadasHoyCount);
                        Log.d(TAG, "   - Pendientes hoy: " + reservasPendientesHoyCount);
                        Log.d(TAG, "   - Ingresos hoy: $" + ingresosHoy);
                        Log.d(TAG, "   - % de historial: " +
                                (stats.totalReservas > 0 ?
                                        (reservasConfirmadasHoyCount * 100 / stats.totalReservas) : 0) + "%");

                        // 1. Actualizar LiveData con estadísticas DE HOY
                        reservasConfirmadasLiveData.postValue(reservasConfirmadasHoyCount);
                        ingresosLiveData.postValue(ingresosHoy);

                        // 🔥 PERSISTIR ESTADÍSTICAS EN FIREBASE (Nodo estadisticas)
                        // Ahora con manejo de callback para asegurar el registro
                        String uid = com.chopcode.rutago.app.config.MyApp.getCurrentUserId();
                        if (uid != null) {
                            driverReservationService.guardarEstadisticasDiarias(uid, 
                                    reservasConfirmadasHoyCount, ingresosHoy, 
                                    new DriverReservationService.ReservationUpdateCallback() {
                                        @Override
                                        public void onSuccess() {
                                            Log.d(TAG, "📊 Historial de ingresos actualizado en la nube");
                                        }

                                        @Override
                                        public void onError(String error) {
                                            Log.e(TAG, "⚠️ Error guardando historial: " + error);
                                        }
                                    });
                        }

        // 2. Calcular asientos disponibles HOY (Dinámico según rutas asignadas y capacidad real)
                        int numRutas = (horariosAsignados != null && !horariosAsignados.isEmpty()) ? horariosAsignados.size() : 2;
                        int capacidadTotalConductor = numRutas * capacidadPorRuta;
                        
                        int asientosOcupadosHoy = reservasConfirmadasHoyCount + reservasPendientesHoyCount;
                        int asientosDisponiblesHoy = Math.max(0, capacidadTotalConductor - asientosOcupadosHoy);
                        asientosDisponiblesLiveData.postValue(asientosDisponiblesHoy);

                        // 3. ¡IMPORTANTE! Procesar análisis por ruta usando listas YA FILTRADAS (solo hoy)
                        processReservationsForDetailedStatsOptimized(
                                reservasConfirmadasHoy,
                                reservasPendientesHoy
                        );

                        setLoading(false);
                    }

                    @Override
                    public void onError(String error) {
                        Log.e(TAG, "❌ Error cargando estadísticas completas: " + error);
                        setError("Error cargando estadísticas: " + error);
                        setLoading(false);
                        setDefaultRouteValues();
                    }
                });
    }

    /**
     * Filtra las reservas para obtener solo las del día actual.
     *
     * <p><b>Lógica:</b> Compara la fecha de la reserva con el rango del día actual
     * (desde medianoche hasta medianoche del día actual).</p>
     *
     * @param reservas Lista completa de reservas
     * @return Lista filtrada con solo reservas del día actual
     */
    private List<Reserva> filtrarReservasDelDia(List<Reserva> reservas) {
        if (reservas == null || reservas.isEmpty()) {
            return new ArrayList<>();
        }

        List<Reserva> reservasDelDia = new ArrayList<>();

        // Obtener fecha actual (medianoche de hoy)
        long hoyMedianoche = obtenerTimestampMedianocheActual();
        long mananaMedianoche = hoyMedianoche + (24 * 60 * 60 * 1000); // 24 horas después

        java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat("dd/MM/yyyy HH:mm:ss", java.util.Locale.getDefault());
        Log.d(TAG, "⏰ Rango de filtro hoy: " + sdf.format(new java.util.Date(hoyMedianoche)) + 
                   " hasta " + sdf.format(new java.util.Date(mananaMedianoche)));

        for (Reserva reserva : reservas) {
            long fechaReserva = reserva.getFechaReserva();

            // Verificar si la reserva está en el rango de hoy
            if (fechaReserva >= hoyMedianoche && fechaReserva < mananaMedianoche) {
                reservasDelDia.add(reserva);
                Log.d(TAG, "   ✅ Incluida reserva: " + reserva.getIdReserva() + 
                           " | Pasajero: " + reserva.getNombre() + 
                           " | Fecha: " + sdf.format(new java.util.Date(fechaReserva)));
            } else {
                Log.v(TAG, "   ❌ Excluida (fuera de rango): " + reserva.getIdReserva() + " - " + sdf.format(new java.util.Date(fechaReserva)));
            }
        }

        Log.d(TAG, "📅 Filtrado completado: " + reservasDelDia.size() + " de " + reservas.size() + " reservas son de hoy");

        return reservasDelDia;
    }

    /**
     * Calcula los ingresos totales de las reservas confirmadas del día actual.
     *
     * @param reservasConfirmadas Lista de reservas confirmadas del día
     * @return Suma total de precios de las reservas confirmadas
     */
    private double calcularIngresosDelDia(List<Reserva> reservasConfirmadas) {
        double ingresosTotales = 0.0;

        for (Reserva reserva : reservasConfirmadas) {
            Double precio = reserva.getPrecio();
            if (precio != null) {
                ingresosTotales += precio;
            }
        }

        return ingresosTotales;
    }

    /**
     * Obtiene el timestamp correspondiente a la medianoche (00:00:00) del día actual.
     *
     * @return Timestamp en milisegundos de la medianoche de hoy
     */
    private long obtenerTimestampMedianocheActual() {
        // Obtener fecha actual
        java.util.Calendar calendar = java.util.Calendar.getInstance();

        // Establecer a medianoche (00:00:00.000)
        calendar.set(java.util.Calendar.HOUR_OF_DAY, 0);
        calendar.set(java.util.Calendar.MINUTE, 0);
        calendar.set(java.util.Calendar.SECOND, 0);
        calendar.set(java.util.Calendar.MILLISECOND, 0);

        return calendar.getTimeInMillis();
    }

    /**
     * Procesa las listas de reservas YA CARGADAS para generar estadísticas detalladas por ruta.
     * VERSIÓN OPTIMIZADA - No necesita consultar Firebase nuevamente.
     *
     * <p><b>Agrupación:</b> Las reservas se agrupan por combinación origen|destino.</p>
     * <p><b>Cálculos por ruta:</b></p>
     * <ul>
     *   <li>Reservas confirmadas: Solo de la lista de confirmadas</li>
     *   <li>Asientos ocupados: Suma de reservas confirmadas + pendientes</li>
     * </ul>
     *
     * @param reservasConfirmadas Lista de reservas confirmadas (YA CARGADA del servicio)
     * @param reservasPendientes Lista de reservas pendientes (YA CARGADA del servicio)
     */
    private void processReservationsForDetailedStatsOptimized(List<Reserva> reservasConfirmadas,
                                                              List<Reserva> reservasPendientes) {

        Log.d(TAG, "📊 Analizando desglose por ruta para " + 
                   reservasConfirmadas.size() + " confirmadas y " +
                   reservasPendientes.size() + " pendientes");

        // Agrupar reservas por ruta/origen-destino
        Map<String, Integer> reservasPorRuta = new HashMap<>();
        Map<String, Integer> asientosOcupadosPorRuta = new HashMap<>();
        Map<String, String> nombresRutas = new HashMap<>();

        // Procesar reservas CONFIRMADAS
        for (Reserva reserva : reservasConfirmadas) {
            String origen = (reserva.getOrigen() != null) ? reserva.getOrigen() : "N/A";
            String destino = (reserva.getDestino() != null) ? reserva.getDestino() : "N/A";
            String rutaKey = origen + "|" + destino;
            String nombreRuta = origen + " → " + destino;

            if (!nombresRutas.containsKey(rutaKey)) {
                nombresRutas.put(rutaKey, nombreRuta);
                reservasPorRuta.put(rutaKey, 0);
                asientosOcupadosPorRuta.put(rutaKey, 0);
            }

            // Contar reservas confirmadas por ruta
            int count = reservasPorRuta.getOrDefault(rutaKey, 0);
            reservasPorRuta.put(rutaKey, count + 1);

            // Asiento ocupado por reserva confirmada
            int ocupados = asientosOcupadosPorRuta.getOrDefault(rutaKey, 0);
            asientosOcupadosPorRuta.put(rutaKey, ocupados + 1);
        }

        // Procesar reservas PENDIENTES (solo para asientos ocupados)
        for (Reserva reserva : reservasPendientes) {
            String origen = (reserva.getOrigen() != null) ? reserva.getOrigen() : "N/A";
            String destino = (reserva.getDestino() != null) ? reserva.getDestino() : "N/A";
            String rutaKey = origen + "|" + destino;
            String nombreRuta = origen + " → " + destino;

            if (!nombresRutas.containsKey(rutaKey)) {
                nombresRutas.put(rutaKey, nombreRuta);
                reservasPorRuta.put(rutaKey, 0); // Las pendientes no cuentan como "reservas" confirmadas
                asientosOcupadosPorRuta.put(rutaKey, 0);
            }

            // Solo incrementar asientos ocupados para reservas pendientes
            int ocupados = asientosOcupadosPorRuta.getOrDefault(rutaKey, 0);
            asientosOcupadosPorRuta.put(rutaKey, ocupados + 1);
        }

        Log.d(TAG, "📊 Conteo por ruta completado. Rutas detectadas: " + nombresRutas.size());
        for (String key : nombresRutas.keySet()) {
            Log.d(TAG, "   📍 Ruta: " + nombresRutas.get(key) + " | Confirmadas: " + reservasPorRuta.get(key));
        }

        // Procesar estadísticas por ruta
        processRouteStatistics(reservasPorRuta, asientosOcupadosPorRuta, nombresRutas);
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

        // Variables para identificar rutas encontradas
        boolean encontradaRuta1 = false;
        boolean encontradaRuta2 = false;

        for (Map.Entry<String, Integer> entry : reservasPorRuta.entrySet()) {
            String rutaId = entry.getKey();
            int reservasEnRuta = entry.getValue();
            int asientosOcupadosEnRuta = asientosOcupadosPorRuta.getOrDefault(rutaId, 0);
            int asientosDisponiblesEnRuta = Math.max(0, capacidadPorRuta - asientosOcupadosEnRuta);
            String nombreRuta = nombresRutas.get(rutaId);

            if (nombreRuta == null) {
                continue;
            }

            Log.d(TAG, "   Analizando ruta: " + nombreRuta);

            // IDENTIFICACIÓN POR CONTENIDO - VERSIÓN CON Y SIN TILDES
            // RUTA 1: Nataga → La Plata (ida)
            if (nombreRuta.contains("Nataga → La Plata") ||
                    nombreRuta.contains("Nataga -> La Plata") ||
                    nombreRuta.contains("Natagá → La Plata") ||  // CON TILDE
                    nombreRuta.contains("Natagá -> La Plata")) { // CON TILDE

                Log.d(TAG, "   ✅ Asignando a RUTA 1 (ida): " + nombreRuta);
                nombreRuta1LiveData.postValue(nombreRuta);
                reservasRuta1LiveData.postValue(reservasEnRuta);
                asientosRuta1LiveData.postValue(asientosDisponiblesEnRuta);
                encontradaRuta1 = true;

            }
            // RUTA 2: La Plata → Nataga (regreso)
            else if (nombreRuta.contains("La Plata → Nataga") ||
                    nombreRuta.contains("La Plata -> Nataga") ||
                    nombreRuta.contains("La Plata → Natagá") ||  // CON TILDE
                    nombreRuta.contains("La Plata -> Natagá")) { // CON TILDE

                Log.d(TAG, "   ✅ Asignando a RUTA 2 (regreso): " + nombreRuta);
                nombreRuta2LiveData.postValue(nombreRuta);
                reservasRuta2LiveData.postValue(reservasEnRuta);
                asientosRuta2LiveData.postValue(asientosDisponiblesEnRuta);
                encontradaRuta2 = true;

            } else {
                Log.w(TAG, "   ⚠️ Ruta no reconocida (posible formato diferente): " + nombreRuta);
                Log.w(TAG, "      Buscando: 'Nataga'/'Natagá' → 'La Plata' o 'La Plata' → 'Nataga'/'Natagá'");
            }
        }

        // ESTABLECER VALORES POR DEFECTO SOLO PARA RUTAS NO ENCONTRADAS
        if (!encontradaRuta1) {
            Log.d(TAG, "   ℹ️ No se encontró Ruta 1, estableciendo valores por defecto");
            nombreRuta1LiveData.postValue("Nataga → La Plata");
            reservasRuta1LiveData.postValue(0);
            asientosRuta1LiveData.postValue(capacidadPorRuta);
        }

        if (!encontradaRuta2) {
            Log.d(TAG, "   ℹ️ No se encontró Ruta 2, estableciendo valores por defecto");
            nombreRuta2LiveData.postValue("La Plata → Nataga");
            reservasRuta2LiveData.postValue(0);
            asientosRuta2LiveData.postValue(capacidadPorRuta);
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
        asientosRuta1LiveData.postValue(capacidadPorRuta);
        nombreRuta2LiveData.postValue("N/A → N/A");
        reservasRuta2LiveData.postValue(0);
        asientosRuta2LiveData.postValue(capacidadPorRuta);
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
}

package com.chopcode.rutago.app.managers.reservations;

import android.content.Context;
import android.util.Log;
import android.widget.TextView;

import com.chopcode.rutago.app.config.MyApp;
import com.chopcode.rutago.app.managers.analytics.ReservationAnalyticsHelper;
import com.chopcode.rutago.app.managers.seats.SeatManager;
import com.chopcode.rutago.app.models.Vehiculo;
import com.chopcode.rutago.app.services.user.UserService;
import com.chopcode.rutago.app.services.reservations.VehiculoService;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.ValueEventListener;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Manager para cargar y manejar información del conductor y vehículo
 */
public class DriverVehicleManager {

    private static final String TAG = "DriverVehicleManager";

    private final Context context;
    private final ReservationAnalyticsHelper analyticsHelper;
    private final SeatManager seatManager;
    private final UserService userService;
    private final VehiculoService vehiculoService;

    // Callback interface
    public interface DriverVehicleCallback {
        void onDriverVehicleLoaded(
                String conductorId,
                String conductorNombre,
                String conductorTelefono,
                String placaVehiculo,
                String modeloVehiculo,
                Integer capacidadVehiculo
        );

        void onError(String error);
    }

    // UI references
    private TextView tvNombreConductor;
    private TextView tvVehiculoInfo;
    private TextView tvCapacidadInfo;

    // Listeners
    private ValueEventListener driverListener;
    private DatabaseReference currentHorarioRef;

    // Data
    private String conductorId;
    private String conductorNombre;
    private String conductorTelefono;
    private String placaVehiculo;
    private String modeloVehiculo;
    private Integer capacidadVehiculo;

    public DriverVehicleManager(
            Context context,
            ReservationAnalyticsHelper analyticsHelper,
            SeatManager seatManager) {

        this.context = context;
        this.analyticsHelper = analyticsHelper;
        this.seatManager = seatManager;
        this.userService = new UserService();
        this.vehiculoService = new VehiculoService();
    }

    public void setUIReferences(
            TextView tvNombreConductor,
            TextView tvVehiculoInfo,
            TextView tvCapacidadInfo) {

        this.tvNombreConductor = tvNombreConductor;
        this.tvVehiculoInfo = tvVehiculoInfo;
        this.tvCapacidadInfo = tvCapacidadInfo;
    }

    /**
     * Carga la información del conductor y vehículo para un horario
     */
    public void loadDriverVehicleInfo(String horarioId, DriverVehicleCallback callback) {
        if (horarioId == null || horarioId.isEmpty()) {
            callback.onError("Horario ID es nulo o vacío");
            return;
        }

        Log.d(TAG, "Buscando conductor para el horario: " + horarioId);

        Map<String, Object> params = new HashMap<>();
        params.put("accion", "carga_info_vehiculo_conductor_inicio");
        analyticsHelper.logEvent("carga_info_vehiculo_conductor_inicio", params);

        buscarConductorPorHorario(horarioId, callback);
    }

    /**
     * Busca conductor por horario asignado
     */
    private void buscarConductorPorHorario(String horarioId, DriverVehicleCallback callback) {
        // Limpiar listener previo si existe
        cleanup();

        currentHorarioRef = MyApp.getDatabaseReference("horarios/" + horarioId);
        
        driverListener = new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot snapshot) {
                if (snapshot.exists() && snapshot.hasChild("conductorId")) {
                    String idDirecto = snapshot.child("conductorId").getValue(String.class);
                    if (idDirecto != null && !idDirecto.isEmpty()) {
                        Log.d(TAG, "ConductorId encontrado/actualizado en el horario: " + idDirecto);
                        conductorId = idDirecto;
                        cargarInformacionConductor(conductorId, callback);
                        return;
                    }
                }
                
                // Si no se encontró directamente, proceder con la búsqueda exhaustiva (fallback)
                buscarConductorExhaustivamente(horarioId, callback);
            }

            @Override
            public void onCancelled(DatabaseError error) {
                buscarConductorExhaustivamente(horarioId, callback);
            }
        };

        // Escuchar cambios en tiempo real
        currentHorarioRef.addValueEventListener(driverListener);
    }

    /**
     * Limpia los listeners activos para evitar fugas de memoria
     */
    public void cleanup() {
        if (currentHorarioRef != null && driverListener != null) {
            currentHorarioRef.removeEventListener(driverListener);
            driverListener = null;
            currentHorarioRef = null;
            Log.d(TAG, "🧹 Listener de conductor removido");
        }
    }

    private void buscarConductorExhaustivamente(String horarioId, DriverVehicleCallback callback) {
        // En lugar de iterar por TODOS los conductores (que puede dar Permission Denied)
        // buscamos solo en el nodo de conductores pero de forma más defensiva
        DatabaseReference conductoresRef = MyApp.getDatabaseReference("conductores");

        // Intentamos una búsqueda por índice si es posible, pero si no, 
        // mantenemos la búsqueda manual pero quitando la escritura
        conductoresRef.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot snapshot) {
                if (!snapshot.exists()) {
                    Log.w(TAG, "⚠️ Nodo de conductores no accesible o vacío");
                    establecerValoresPorDefecto();
                    return;
                }

                boolean conductorEncontrado = false;
                for (DataSnapshot conductorSnapshot : snapshot.getChildren()) {
                    DataSnapshot horariosSnapshot = conductorSnapshot.child("horariosAsignados");
                    
                    if (horariosSnapshot.exists()) {
                        for (DataSnapshot hSnap : horariosSnapshot.getChildren()) {
                            String hId = String.valueOf(hSnap.getValue());
                            if (horarioId.equals(hId)) {
                                conductorId = conductorSnapshot.getKey();
                                Log.d(TAG, "🎯 Conductor encontrado: " + conductorId);
                                cargarInformacionConductor(conductorId, callback);
                                conductorEncontrado = true;
                                break;
                            }
                        }
                    }
                    if (conductorEncontrado) break;
                }

                if (!conductorEncontrado) {
                    Log.w(TAG, "❌ No se encontró conductor para " + horarioId);
                    establecerValoresPorDefecto();
                    if (callback != null) {
                        callback.onDriverVehicleLoaded(null, "Sin asignar", "N/A", "N/A", "N/A", seatManager.getCapacidadTotal());
                    }
                }
            }

            @Override
            public void onCancelled(DatabaseError error) {
                if (error.getCode() == DatabaseError.PERMISSION_DENIED) {
                    Log.e(TAG, "🔥 Error de Permisos: El pasajero no puede buscar en la lista de conductores. " +
                            "Asegúrate de que 'conductorId' esté en el nodo del horario o permite '.read' en el nodo raíz de 'conductores'.");
                } else {
                    Log.e(TAG, "🔥 Error Firebase: " + error.getMessage());
                }
                
                establecerValoresPorDefecto();
                if (callback != null) callback.onError("Error de acceso: " + error.getMessage());
            }
        });
    }

    /**
     * Carga información detallada del conductor
     */
    private void cargarInformacionConductor(String conductorId, DriverVehicleCallback callback) {
        Log.d(TAG, "Cargando información del conductor: " + conductorId);

        Map<String, Object> params = new HashMap<>();
        params.put("accion", "carga_conductor_inicio");
        analyticsHelper.logEvent("carga_conductor_inicio", params);

        userService.loadDriverData(conductorId, new UserService.DriverDataCallback() {
            @Override
            public void onDriverDataLoaded(com.chopcode.rutago.app.models.Conductor conductor) {
                if (conductor != null && conductor.getNombre() != null && !conductor.getNombre().isEmpty()) {
                    conductorNombre = conductor.getNombre();
                    conductorTelefono = conductor.getTelefono() != null ? conductor.getTelefono() : "No disponible";
                    placaVehiculo = conductor.getPlacaVehiculo() != null ? conductor.getPlacaVehiculo() : "No disponible";
                    modeloVehiculo = conductor.getModeloVehiculo() != null ? conductor.getModeloVehiculo() : "No disponible";

                    updateUI();
                    analyticsHelper.logConductorCargado(conductorId, conductorNombre, conductorTelefono);

                    Log.d(TAG, "✓ Conductor cargado: " + conductorNombre);
                    cargarInformacionVehiculo(conductorId, callback);
                } else {
                    establecerValoresPorDefecto();
                    if (callback != null) {
                        callback.onError("Datos del conductor incompletos");
                    }
                }
            }

            @Override
            public void onError(String error) {
                Log.e(TAG, "Error cargando datos del conductor: " + error);
                MyApp.logError(new Exception("Error cargando datos conductor: " + error));
                analyticsHelper.logError("carga_conductor", error);

                establecerValoresPorDefecto();

                if (callback != null) {
                    callback.onError("Error cargando conductor: " + error);
                }
            }
        });
    }

    /**
     * Carga información del vehículo del conductor usando la placa como ID directo
     */
    private void cargarInformacionVehiculo(String conductorId, DriverVehicleCallback callback) {
        // ✅ MEJORADO: Buscar por PLACA directamente si la tenemos, para evitar Permission Denied en queries
        if (placaVehiculo != null && !placaVehiculo.isEmpty() && !placaVehiculo.equals("No disponible") && !placaVehiculo.equals("N/A")) {
            Log.d(TAG, "📡 Buscando vehículo directamente por PLACA (ID): " + placaVehiculo);
            
            vehiculoService.obtenerVehiculoPorPlaca(placaVehiculo, new VehiculoService.VehiculoCallback() {
                @Override
                public void onVehiculoCargado(Vehiculo vehiculo) {
                    if (vehiculo != null) {
                        procesarVehiculoCargado(vehiculo, conductorId, callback);
                    } else {
                        // Fallback al método por conductor si por placa falla
                        buscarVehiculoPorConductorFallback(conductorId, callback);
                    }
                }

                @Override
                public void onError(String error) {
                    Log.w(TAG, "⚠️ Error buscando por placa, intentando fallback por conductor: " + error);
                    buscarVehiculoPorConductorFallback(conductorId, callback);
                }
            });
        } else {
            buscarVehiculoPorConductorFallback(conductorId, callback);
        }
    }

    private void buscarVehiculoPorConductorFallback(String conductorId, DriverVehicleCallback callback) {
        Map<String, Object> params = new HashMap<>();
        params.put("accion", "carga_vehiculo_inicio");
        analyticsHelper.logEvent("carga_vehiculo_inicio", params);

        vehiculoService.obtenerVehiculoPorConductor(conductorId, new VehiculoService.VehiculoCallback() {
            @Override
            public void onVehiculoCargado(Vehiculo vehiculo) {
                procesarVehiculoCargado(vehiculo, conductorId, callback);
            }

            @Override
            public void onError(String error) {
                Log.e(TAG, "Error cargando vehículo: " + error);
                
                // Si da Permission Denied aquí, es por el query indexed.
                // Como ya tenemos placa y modelo del conductor, el daño es mínimo.
                capacidadVehiculo = seatManager.getCapacidadTotal();
                updateUI();

                if (callback != null) {
                    // Retornar éxito aunque el vehículo falle, porque ya tenemos lo básico del conductor
                    callback.onDriverVehicleLoaded(conductorId, conductorNombre, conductorTelefono, placaVehiculo, modeloVehiculo, capacidadVehiculo);
                }
            }
        });
    }

    private void procesarVehiculoCargado(Vehiculo vehiculo, String conductorId, DriverVehicleCallback callback) {
        if (vehiculo != null) {
            modeloVehiculo = (vehiculo.getModelo() != null && !vehiculo.getModelo().isEmpty()) ? vehiculo.getModelo() : modeloVehiculo;
            placaVehiculo = (vehiculo.getPlaca() != null && !vehiculo.getPlaca().isEmpty()) ? vehiculo.getPlaca() : placaVehiculo;
            capacidadVehiculo = vehiculo.getCapacidad() > 0 ? vehiculo.getCapacidad() : seatManager.getCapacidadTotal();

            analyticsHelper.logVehiculoCargado(vehiculo, conductorId);
            updateUI();

            Log.d(TAG, "✓ Vehículo cargado: " + placaVehiculo + " - " + modeloVehiculo);
        } else {
            capacidadVehiculo = seatManager.getCapacidadTotal();
            updateUI();
        }

        if (callback != null) {
            callback.onDriverVehicleLoaded(conductorId, conductorNombre, conductorTelefono, placaVehiculo, modeloVehiculo, capacidadVehiculo);
        }
    }

    /**
     * Actualiza la UI con la información cargada
     */
    private void updateUI() {
        if (tvNombreConductor != null) {
            tvNombreConductor.setText(conductorNombre != null ? conductorNombre : "------");
        }

        if (tvVehiculoInfo != null) {
            String infoVehiculo = "Vehículo: " +
                    (placaVehiculo != null ? placaVehiculo : "------") + " - " +
                    (modeloVehiculo != null ? modeloVehiculo : "------");
            tvVehiculoInfo.setText(infoVehiculo);
        }

        if (tvCapacidadInfo != null) {
            int capacidad = capacidadVehiculo != null ? capacidadVehiculo : seatManager.getCapacidadTotal();
            tvCapacidadInfo.setText("Capacidad: " + capacidad + " asientos");
        }
    }

    /**
     * Establece valores por defecto cuando hay error
     */
    private void establecerValoresPorDefecto() {
        conductorNombre = "Sin asignar";
        conductorTelefono = "No disponible";
        placaVehiculo = "N/A";
        modeloVehiculo = "N/A";
        capacidadVehiculo = seatManager.getCapacidadTotal();

        updateUI();
    }

    // Getters para obtener la información cargada
    public String getConductorId() { return conductorId; }
    public String getConductorNombre() { return conductorNombre; }
    public String getConductorTelefono() { return conductorTelefono; }
    public String getPlacaVehiculo() { return placaVehiculo; }
    public String getModeloVehiculo() { return modeloVehiculo; }
    public Integer getCapacidadVehiculo() { return capacidadVehiculo; }
}

package com.chopcode.rutago.app.viewmodels.driver;

import android.util.Log;
import androidx.lifecycle.MutableLiveData;
import com.chopcode.rutago.app.viewmodels.BaseViewModel;
import com.chopcode.rutago.app.services.user.UserService;
import java.util.ArrayList;
import java.util.List;

/**
 * ViewModel para manejar la información del perfil del conductor
 * Responsabilidades: nombre, placa y horarios del conductor
 */
public class PerfilViewModel extends BaseViewModel {

    private static final String TAG = "PerfilViewModel";

    private final UserService userService;

    // LiveData para información del conductor
    private final MutableLiveData<String> conductorNombreLiveData = new MutableLiveData<>();
    private final MutableLiveData<String> placaVehiculoLiveData = new MutableLiveData<>();
    private final MutableLiveData<List<String>> horariosAsignadosLiveData = new MutableLiveData<>();
    private final MutableLiveData<com.chopcode.rutago.app.models.Conductor> conductorLiveData = new MutableLiveData<>();

    // Variables de instancia
    private String conductorUIDActual;
    private String conductorNombreActual;
    private String placaVehiculoActual;
    private List<String> horariosAsignadosActual;

    public PerfilViewModel() {
        this.userService = new UserService();

        // Valores iniciales
        this.conductorNombreLiveData.setValue(null);
        this.placaVehiculoLiveData.setValue(null);
        this.horariosAsignadosLiveData.setValue(new ArrayList<>());

        Log.d(TAG, "✅ PerfilViewModel inicializado");
    }

    // ============ GETTERS PARA LIVEDATA ============

    public MutableLiveData<String> getConductorNombreLiveData() {
        return conductorNombreLiveData;
    }

    public MutableLiveData<String> getPlacaVehiculoLiveData() {
        return placaVehiculoLiveData;
    }

    public MutableLiveData<List<String>> getHorariosAsignadosLiveData() {
        return horariosAsignadosLiveData;
    }

    public MutableLiveData<com.chopcode.rutago.app.models.Conductor> getConductorLiveData() {
        return conductorLiveData;
    }

    // ============ MÉTODOS PRINCIPALES ============

    /**
     * Carga todos los datos del conductor desde Firebase
     */
    public void cargarDatosCompletos(String conductorUID) {
        if (conductorUID == null || conductorUID.isEmpty()) {
            Log.e(TAG, "❌ conductorUID es nulo o vacío");
            setError("ID del conductor no válido");
            return;
        }

        this.conductorUIDActual = conductorUID;
        Log.d(TAG, "👤 Cargando datos completos para conductor UID: " + conductorUID);
        setLoading(true);

        userService.loadDriverData(conductorUID, new UserService.DriverDataCallback() {
            @Override
            public void onDriverDataLoaded(com.chopcode.rutago.app.models.Conductor conductor) {
                Log.d(TAG, "✅ Datos completos cargados: " + conductor.getNombre());

                // Guardar todos los datos
                conductorNombreActual = conductor.getNombre();
                placaVehiculoActual = conductor.getPlacaVehiculo();
                horariosAsignadosActual = conductor.getHorariosAsignados() != null ? conductor.getHorariosAsignados() : new ArrayList<>();

                // Actualizar LiveData para UI
                conductorNombreLiveData.postValue(conductorNombreActual);
                placaVehiculoLiveData.postValue(placaVehiculoActual);
                horariosAsignadosLiveData.postValue(horariosAsignadosActual);
                conductorLiveData.postValue(conductor);

                // Registrar evento analítico
                registrarEventoAnalitico("perfil_completo_cargado", conductorNombreActual,
                        horariosAsignadosActual != null ? horariosAsignadosActual.size() : 0);

                setLoading(false);

                // Mostrar resumen en logs
                Log.d(TAG, "📋 Resumen perfil: " + getResumenPerfil());
            }

            @Override
            public void onError(String error) {
                Log.e(TAG, "❌ Error cargando datos completos: " + error);
                setError("Error cargando datos del conductor: " + error);
                setLoading(false);

                registrarEventoAnalitico("error_carga_perfil", null, 0);
            }
        });
    }

    /**
     * Carga solo nombre y placa (sin horarios)
     */
    public void cargarDatosBasicos(String conductorUID) {
        if (conductorUID == null || conductorUID.isEmpty()) {
            Log.e(TAG, "❌ conductorUID es nulo o vacío");
            setError("ID del conductor no válido");
            return;
        }

        Log.d(TAG, "👤 Cargando datos básicos para: " + conductorUID);
        setLoading(true);

        userService.loadDriverData(conductorUID, new UserService.DriverDataCallback() {
            @Override
            public void onDriverDataLoaded(com.chopcode.rutago.app.models.Conductor conductor) {
                Log.d(TAG, "✅ Datos básicos cargados: " + conductor.getNombre() + " | Placa: " + conductor.getPlacaVehiculo());

                // Solo guardamos nombre y placa
                conductorNombreActual = conductor.getNombre();
                placaVehiculoActual = conductor.getPlacaVehiculo();

                // Solo actualizamos nombre y placa en LiveData
                conductorNombreLiveData.postValue(conductorNombreActual);
                placaVehiculoLiveData.postValue(placaVehiculoActual);
                conductorLiveData.postValue(conductor);

                registrarEventoAnalitico("perfil_basico_cargado", conductorNombreActual, 1);
                setLoading(false);
            }

            @Override
            public void onError(String error) {
                Log.e(TAG, "❌ Error cargando datos básicos: " + error);
                setError("Error cargando datos del conductor");
                setLoading(false);
            }
        });
    }

    /**
     * Actualiza la placa del vehículo
     */
    public void actualizarPlacaVehiculo(String nuevaPlaca) {
        if (conductorUIDActual == null) {
            Log.e(TAG, "❌ No hay conductorUID para actualizar placa");
            setError("No se ha cargado el conductor");
            return;
        }

        if (nuevaPlaca == null || nuevaPlaca.trim().isEmpty()) {
            Log.e(TAG, "❌ La nueva placa está vacía");
            setError("La placa no puede estar vacía");
            return;
        }

        String placaLimpia = nuevaPlaca.trim();
        Log.d(TAG, "🚗 Actualizando placa a: " + placaLimpia);
        setLoading(true);

        // Cargar datos actuales para mantener horarios y teléfono
        userService.loadDriverData(conductorUIDActual, new UserService.DriverDataCallback() {
            @Override
            public void onDriverDataLoaded(com.chopcode.rutago.app.models.Conductor conductor) {
                userService.updateDriverProfile(
                        conductorUIDActual,
                        conductor.getNombre(), // Mantener nombre
                        conductor.getTelefono(), // Mantener teléfono
                        placaLimpia, // Nueva placa
                        conductor.getHorariosAsignados(), // Mantener horarios
                        new UserService.UserUpdateCallback() {
                            @Override
                            public void onSuccess() {
                                Log.d(TAG, "✅ Placa actualizada exitosamente");
                                placaVehiculoActual = placaLimpia;
                                placaVehiculoLiveData.postValue(placaLimpia);
                                setLoading(false);

                                registrarEventoAnalitico("placa_actualizada", conductor.getNombre(), 1);
                            }

                            @Override
                            public void onError(String error) {
                                Log.e(TAG, "❌ Error actualizando placa: " + error);
                                setError("Error actualizando placa");
                                setLoading(false);
                            }
                        }
                );
            }

            @Override
            public void onError(String error) {
                Log.e(TAG, "❌ Error cargando datos para actualizar placa: " + error);
                setError("Error cargando datos del conductor");
                setLoading(false);
            }
        });
    }

    /**
     * Refresca todos los datos del conductor
     */
    public void refrescarDatos() {
        if (conductorUIDActual != null) {
            Log.d(TAG, "🔄 Refrescando datos del conductor");
            cargarDatosCompletos(conductorUIDActual);
        } else {
            Log.w(TAG, "⚠️ No se puede refrescar: conductorUID es nulo");
            setError("No se ha inicializado el conductor");
        }
    }

    // ============ GETTERS PARA DATOS ACTUALES ============

    public String getConductorNombreActual() {
        return conductorNombreActual;
    }

    public String getPlacaVehiculoActual() {
        return placaVehiculoActual;
    }

    public List<String> getHorariosAsignadosActual() {
        return horariosAsignadosActual != null ?
                new ArrayList<>(horariosAsignadosActual) : new ArrayList<>();
    }

    public String getConductorUIDActual() {
        return conductorUIDActual;
    }

    /**
     * Verifica si tenemos todos los datos cargados
     */
    public boolean tieneDatosCompletos() {
        boolean tieneNombre = conductorNombreActual != null && !conductorNombreActual.isEmpty();
        boolean tienePlaca = placaVehiculoActual != null && !placaVehiculoActual.isEmpty();
        boolean tieneHorarios = horariosAsignadosActual != null && !horariosAsignadosActual.isEmpty();

        Log.d(TAG, "📊 Verificación datos: Nombre=" + tieneNombre +
                ", Placa=" + tienePlaca + ", Horarios=" + tieneHorarios);
        return tieneNombre && tienePlaca && tieneHorarios;
    }

    /**
     * Verifica si tenemos datos básicos (solo nombre y placa)
     */
    public boolean tieneDatosBasicos() {
        return conductorNombreActual != null && !conductorNombreActual.isEmpty() &&
                placaVehiculoActual != null && !placaVehiculoActual.isEmpty();
    }

    /**
     * Obtiene un resumen del perfil para logs/debug
     */
    public String getResumenPerfil() {
        return String.format("Conductor: %s | Placa: %s | Horarios: %d",
                conductorNombreActual != null ? conductorNombreActual : "N/A",
                placaVehiculoActual != null ? placaVehiculoActual : "N/A",
                horariosAsignadosActual != null ? horariosAsignadosActual.size() : 0);
    }

    /**
     * Limpia todos los datos (útil para cerrar sesión)
     */
    public void limpiarDatos() {
        Log.d(TAG, "🧹 Limpiando datos del perfil");

        conductorNombreActual = null;
        placaVehiculoActual = null;
        horariosAsignadosActual = null;
        conductorUIDActual = null;

        conductorNombreLiveData.postValue(null);
        placaVehiculoLiveData.postValue(null);
        horariosAsignadosLiveData.postValue(new ArrayList<>());
    }

    // ============ LIFECYCLE ============

    @Override
    protected void onCleared() {
        super.onCleared();
        Log.d(TAG, "🧹 Limpiando PerfilViewModel");

        limpiarDatos();
    }
}

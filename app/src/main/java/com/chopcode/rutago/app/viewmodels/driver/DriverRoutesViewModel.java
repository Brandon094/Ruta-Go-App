package com.chopcode.rutago.app.viewmodels.driver;

import com.chopcode.rutago.app.managers.ui.routes.RouteManager;
import com.chopcode.rutago.app.models.Route;
import com.chopcode.rutago.app.viewmodels.BaseViewModel;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import java.util.ArrayList;
import java.util.List;

/**
 * Driver Routes ViewModel
 *
 * Gestor del itinerario operativo diario para el conductor.
 * Responsabilidades:
 * - Cargar y mapear los horarios asignados desde la planilla maestra.
 * - Determinar dinámicamente cuál es el siguiente despacho cronológico.
 * - Proporcionar una colección reactiva de rutas para alimentar la lista de selección.
 * - Gestionar los estados de carga y error durante la sincronización de la agenda.
 */
public class DriverRoutesViewModel extends BaseViewModel {
    private final RouteManager routeManager;
    
    /** Colección de trayectos (Origen-Destino-Hora) que el conductor opera hoy. */
    private final MutableLiveData<List<Route>> routesLiveData = new MutableLiveData<>();
    
    /** Contador para indicadores visuales de "Turnos para hoy". */
    private final MutableLiveData<Integer> routesCountLiveData = new MutableLiveData<>();
    
    /** Información formateada de la salida más próxima. */
    private final MutableLiveData<String> nextRouteLiveData = new MutableLiveData<>();

    public DriverRoutesViewModel() {
        this.routeManager = new RouteManager();
        this.routesCountLiveData.setValue(0);
        this.routesLiveData.setValue(new ArrayList<>());
    }

    public LiveData<List<Route>> getRutasLiveData() { return routesLiveData; }
    public LiveData<Integer> getContadorRutasLiveData() { return routesCountLiveData; }
    public LiveData<String> getProximaRutaLiveData() { return nextRouteLiveData; }

    /**
     * Limpia la agenda cargada en memoria.
     */
    public void clearRoutes() {
        routesLiveData.postValue(new ArrayList<>());
        routesCountLiveData.postValue(0);
        nextRouteLiveData.postValue(null);
    }

    /**
     * Consulta al RouteManager para transformar los IDs de horarios en objetos Route completos.
     * @param assignedSchedules Lista de identificadores de horarios (ej: ["h005", "h015"]).
     */
    public void loadRoutes(List<String> assignedSchedules) {
        if (assignedSchedules == null) return;
        setLoading(true);
        setError(null);

        routeManager.loadAssignedRoutes(assignedSchedules, new RouteManager.RoutesCallback() {
            @Override
            public void onRoutesLoaded(List<Route> routes) {
                routesLiveData.postValue(routes);
                routesCountLiveData.postValue(routes.size());

                // Identificación lógica del despacho inmediato
                if (!routes.isEmpty()) {
                    Route nextRoute = routes.get(0);
                    String info = nextRoute.getOrigin() + " → " + nextRoute.getDestination();
                    if (nextRoute.getTime() != null) info += " (" + nextRoute.getTime().getTime() + ")";
                    nextRouteLiveData.postValue(info);
                } else {
                    nextRouteLiveData.postValue(null);
                }
                setLoading(false);
            }

            @Override
            public void onError(String error) {
                setError("No se pudo cargar el itinerario: " + error);
                setLoading(false);
                clearRoutes();
            }
        });
    }
}

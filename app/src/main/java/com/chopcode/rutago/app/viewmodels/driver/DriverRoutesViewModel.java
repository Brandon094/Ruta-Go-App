package com.chopcode.rutago.app.viewmodels.driver;

import com.chopcode.rutago.app.managers.routes.RouteManager;
import com.chopcode.rutago.app.models.Route;
import com.chopcode.rutago.app.viewmodels.BaseViewModel;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import java.util.ArrayList;
import java.util.List;

/**
 * 🛣️ Driver Routes ViewModel
 * 
 * Gestiona el itinerario de rutas asignadas al conductor.
 * Responsabilidades:
 * - Cargar el catálogo de horarios en los que el conductor debe operar hoy.
 * - Identificar y exponer la información de la "Próxima Ruta" para acceso rápido.
 * - Sincronizar la lista de horarios con los servicios de obtención de datos.
 */
public class DriverRoutesViewModel extends BaseViewModel {
    private final RouteManager routeManager;
    private final MutableLiveData<List<Route>> routesLiveData = new MutableLiveData<>();
    private final MutableLiveData<Integer> routesCountLiveData = new MutableLiveData<>();
    private final MutableLiveData<String> nextRouteLiveData = new MutableLiveData<>();

    public DriverRoutesViewModel() {
        this.routeManager = new RouteManager();
        this.routesCountLiveData.setValue(0);
        this.routesLiveData.setValue(new ArrayList<>());
    }

    public LiveData<List<Route>> getRutasLiveData() { return routesLiveData; }
    public LiveData<Integer> getContadorRutasLiveData() { return routesCountLiveData; }
    public LiveData<String> getProximaRutaLiveData() { return nextRouteLiveData; }

    public void clearRoutes() {
        routesLiveData.postValue(new ArrayList<>());
        routesCountLiveData.postValue(0);
        nextRouteLiveData.postValue(null);
    }

    public void loadRoutes(List<String> assignedSchedules) {
        if (assignedSchedules == null) return;
        setLoading(true);
        setError(null);

        routeManager.loadAssignedRoutes(assignedSchedules, new RouteManager.RoutesCallback() {
            @Override
            public void onRoutesLoaded(List<Route> routes) {
                routesLiveData.postValue(routes);
                routesCountLiveData.postValue(routes.size());

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
                setError(error);
                setLoading(false);
                clearRoutes();
            }
        });
    }
}

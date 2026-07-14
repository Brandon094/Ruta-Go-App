package com.chopcode.rutago.app.managers.ui.routes;

import android.util.Log;

import com.chopcode.rutago.app.models.Route;
import com.chopcode.rutago.app.services.user.UserService;

import java.util.List;

/**
 * Route Manager
 *
 * Fachada para la resolución y gestión de itinerarios de viaje.
 * Responsabilidades:
 * - Coordinar la transformación de identificadores de horario en objetos Route enriquecidos.
 * - Delegar al UserService la carga de datos maestros para la agenda del conductor.
 * - Centralizar el acceso a la lógica de trayectos para las vistas de Dashboard.
 */
public class RouteManager {
    private static final String TAG = "RouteManager";
    private final UserService userService;

    public interface RoutesCallback {
        void onRoutesLoaded(List<Route> routes);
        void onError(String error);
    }

    public RouteManager() {
        this.userService = new UserService();
    }

    /**
     * Recupera el catálogo de rutas correspondientes a una lista de turnos asignados.
     * @param assignedSchedules Lista de IDs de horarios.
     */
    public void loadAssignedRoutes(List<String> assignedSchedules, RoutesCallback callback) {
        userService.loadAssignedRoutes(assignedSchedules, new UserService.RoutesCallback() {
            @Override
            public void onRoutesLoaded(List<Route> routes) {
                callback.onRoutesLoaded(routes);
            }
            @Override public void onError(String error) { 
                Log.e(TAG, "❌ Error al cargar rutas asignadas: " + error);
                callback.onError(error); 
            }
        });
    }
}

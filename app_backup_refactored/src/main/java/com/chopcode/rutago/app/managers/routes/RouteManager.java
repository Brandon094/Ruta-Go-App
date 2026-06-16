package com.chopcode.rutago.app.managers.routes;

import android.util.Log;

import com.chopcode.rutago.app.models.Route;
import com.chopcode.rutago.app.services.user.UserService;

import java.util.List;

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

    public void loadAssignedRoutes(List<String> assignedSchedules, RoutesCallback callback) {
        userService.loadAssignedRoutes(assignedSchedules, new UserService.RoutesCallback() {
            @Override
            public void onRoutesLoaded(List<Route> routes) {
                callback.onRoutesLoaded(routes);
            }
            @Override public void onError(String error) { callback.onError(error); }
        });
    }
}

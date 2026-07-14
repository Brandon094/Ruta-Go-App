package com.chopcode.rutago.app.managers.ui.reservations.common;

import android.util.Log;

import com.chopcode.rutago.app.config.MyApp;
import com.chopcode.rutago.app.managers.core.analytics.ReservationAnalyticsHelper;
import com.chopcode.rutago.app.models.User;
import com.chopcode.rutago.app.services.user.UserService;

import java.util.HashMap;
import java.util.Map;

/**
 * Reservation User Manager
 *
 * Responsable de la gestión y provisión de los datos del pasajero durante el flujo de reserva.
 * Responsabilidades:
 * - Recuperar el perfil del usuario autenticado desde Firebase.
 * - Asegurar que los metadatos de contacto (Nombre y Teléfono) estén disponibles para el tiquete digital.
 * - Implementar un estado por defecto ("Guest") ante fallos de carga para no bloquear la UI.
 * - Sincronizar la información del usuario con el motor de analíticas de reserva.
 */
public class ReservationUserManager {

    private static final String TAG = "ReservationUserManager";

    private final ReservationAnalyticsHelper analyticsHelper;
    private final UserService userService;

    public interface UserDataCallback {
        void onUserDataLoaded(String usuarioId, String usuarioNombre, String usuarioTelefono);
        void onError(String error);
    }

    private String usuarioId;
    private String usuarioNombre;
    private String usuarioTelefono;

    public ReservationUserManager(ReservationAnalyticsHelper analyticsHelper) {
        this.analyticsHelper = analyticsHelper;
        this.userService = new UserService();
    }

    /**
     * Carga el perfil del usuario actual desde la capa de servicios.
     */
    public void loadAuthenticatedUser(UserDataCallback callback) {
        String userId = MyApp.getCurrentUserId();
        if (userId == null) {
            establecerUserPorDefecto();
            if (callback != null) callback.onUserDataLoaded(null, usuarioNombre, usuarioTelefono);
            return;
        }

        Map<String, Object> params = new HashMap<>();
        params.put("accion", "carga_usuario_inicio");
        analyticsHelper.logEvent("carga_usuario_inicio", params);

        userService.loadUserData(userId, new UserService.UserDataCallback() {
            @Override
            public void onUserDataLoaded(User usuario) {
                if (usuario != null) {
                    usuarioNombre = usuario.getNombre();
                    usuarioTelefono = usuario.getTelefono();
                    usuarioId = usuario.getId();
                    analyticsHelper.logUserCargado(usuarioNombre, usuarioTelefono);
                    if (callback != null) callback.onUserDataLoaded(usuarioId, usuarioNombre, usuarioTelefono);
                } else {
                    establecerUserPorDefecto();
                    if (callback != null) callback.onUserDataLoaded(null, usuarioNombre, usuarioTelefono);
                }
            }
            @Override public void onError(String errorMessage) {
                establecerUserPorDefecto();
                if (callback != null) callback.onError(errorMessage);
            }
        });
    }

    /**
     * Configura valores genéricos si no se puede recuperar el perfil real.
     */
    private void establecerUserPorDefecto() {
        usuarioNombre = "Pasajero";
        usuarioTelefono = "No disponible";
        Map<String, Object> params = new HashMap<>();
        params.put("accion", "usuario_por_defecto");
        analyticsHelper.logEvent("usuario_por_defecto", params);
    }

    public boolean hasUserData() { return usuarioId != null && usuarioNombre != null; }

    /**
     * Actualiza el estado del manager con datos recibidos externamente (ej: Intents).
     */
    public void updateFromIntent(String usuarioId, String usuarioNombre, String usuarioTelefono) {
        if (usuarioId != null) this.usuarioId = usuarioId;
        if (usuarioNombre != null) this.usuarioNombre = usuarioNombre;
        if (usuarioTelefono != null) this.usuarioTelefono = usuarioTelefono;
        if (usuarioNombre != null && usuarioId != null) analyticsHelper.logUserCargado(usuarioNombre, usuarioTelefono);
    }

    public String getUserId() { return usuarioId; }
    public String getUserNombre() { return usuarioNombre; }
    public String getUserTelefono() { return usuarioTelefono; }

    public String getUserSummary() {
        return String.format("Usuario: %s (ID: %s, Tel: %s)", usuarioNombre != null ? usuarioNombre : "N/A", usuarioId != null ? usuarioId : "N/A", usuarioTelefono != null ? usuarioTelefono : "N/A");
    }
}

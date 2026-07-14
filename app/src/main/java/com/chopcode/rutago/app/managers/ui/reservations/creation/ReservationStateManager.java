package com.chopcode.rutago.app.managers.ui.reservations.creation;

import android.os.Bundle;

import com.chopcode.rutago.app.engines.seats.SeatManager;
import com.chopcode.rutago.app.managers.ui.common.ExpandableSectionManager;

/**
 * Reservation State Manager (Creation Flow)
 *
 * Especialista en la persistencia temporal y recuperación del estado visual de la reserva.
 * Responsabilidades:
 * - Gestionar el ciclo de vida de los datos de reserva durante cambios de configuración (ej: Rotación).
 * - Serializar metadatos de selección, identidades y estados de expansión en el Bundle de Android.
 * - Restaurar la integridad visual del SeatManager y ExpandableSectionManager tras la recreación de la vista.
 * - Proveer un DTO (RestoredState) para facilitar el acceso a la data recuperada.
 */
public class ReservationStateManager {

    private static final String KEY_ASIENTO_SELECCIONADO = "asientoSeleccionado";
    private static final String KEY_RUTA_SELECCIONADA = "rutaSeleccionada";
    private static final String KEY_CONDUCTOR_NOMBRE = "conductorNombre";
    private static final String KEY_CONDUCTOR_TELEFONO = "conductorTelefono";
    private static final String KEY_INFO_EXPANDED = "isInfoExpanded";
    private static final String KEY_USUARIO_NOMBRE = "usuarioNombre";
    private static final String KEY_USUARIO_TELEFONO = "usuarioTelefono";
    private static final String KEY_USUARIO_ID = "usuarioId";

    /**
     * Empaqueta el estado actual de los componentes en un Bundle.
     */
    public static void saveState(
            Bundle outState,
            SeatManager seatManager,
            String rutaSeleccionada,
            String conductorNombre,
            String conductorTelefono,
            ExpandableSectionManager expandableSectionManager,
            String usuarioNombre,
            String usuarioTelefono,
            String usuarioId) {

        if (seatManager.hasAsientoSeleccionado()) {
            outState.putInt(KEY_ASIENTO_SELECCIONADO, seatManager.getAsientoSeleccionado());
        }

        if (rutaSeleccionada != null) {
            outState.putString(KEY_RUTA_SELECCIONADA, rutaSeleccionada);
        }

        outState.putString(KEY_CONDUCTOR_NOMBRE, conductorNombre);
        outState.putString(KEY_CONDUCTOR_TELEFONO, conductorTelefono);

        if (expandableSectionManager != null) {
            outState.putBoolean(KEY_INFO_EXPANDED, expandableSectionManager.isExpanded());
        }

        if (usuarioNombre != null) outState.putString(KEY_USUARIO_NOMBRE, usuarioNombre);
        if (usuarioTelefono != null) outState.putString(KEY_USUARIO_TELEFONO, usuarioTelefono);
        if (usuarioId != null) outState.putString(KEY_USUARIO_ID, usuarioId);
    }

    /**
     * Desempaqueta y re-aplica el estado a los componentes visuales.
     * @return Objeto RestoredState con los valores recuperados para lógica posterior.
     */
    public static RestoredState restoreState(
            Bundle savedInstanceState,
            SeatManager seatManager,
            ExpandableSectionManager expandableSectionManager) {

        RestoredState restoredState = new RestoredState();

        if (savedInstanceState != null) {
            int savedAsiento = savedInstanceState.getInt(KEY_ASIENTO_SELECCIONADO, -1);
            if (savedAsiento != -1) {
                seatManager.setAsientoSeleccionado(savedAsiento);
                restoredState.asientoSeleccionado = savedAsiento;
            }

            restoredState.rutaSeleccionada = savedInstanceState.getString(KEY_RUTA_SELECCIONADA);
            restoredState.conductorNombre = savedInstanceState.getString(KEY_CONDUCTOR_NOMBRE, "Cargando...");
            restoredState.conductorTelefono = savedInstanceState.getString(KEY_CONDUCTOR_TELEFONO);

            boolean isInfoExpanded = savedInstanceState.getBoolean(KEY_INFO_EXPANDED, true);
            if (expandableSectionManager != null) {
                expandableSectionManager.restoreState(isInfoExpanded);
                restoredState.isInfoExpanded = isInfoExpanded;
            }

            restoredState.usuarioNombre = savedInstanceState.getString(KEY_USUARIO_NOMBRE);
            restoredState.usuarioTelefono = savedInstanceState.getString(KEY_USUARIO_TELEFONO);
            restoredState.usuarioId = savedInstanceState.getString(KEY_USUARIO_ID);
        }

        return restoredState;
    }

    /**
     * DTO para el transporte de estado restaurado.
     */
    public static class RestoredState {
        public Integer asientoSeleccionado;
        public String rutaSeleccionada;
        public String conductorNombre;
        public String conductorTelefono;
        public Boolean isInfoExpanded;
        public String usuarioNombre;
        public String usuarioTelefono;
        public String usuarioId;
    }
}

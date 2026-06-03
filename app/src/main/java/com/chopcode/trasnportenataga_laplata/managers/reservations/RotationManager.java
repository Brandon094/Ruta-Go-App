package com.chopcode.trasnportenataga_laplata.managers.reservations;

import android.util.Log;

import com.chopcode.trasnportenataga_laplata.services.reservations.HorarioService;

/**
 * Manager para coordinar la rotación de horarios.
 * Actúa como puente entre la UI y el servicio de horarios.
 */
public class RotationManager {

    private static final String TAG = "RotationManager";
    private final HorarioService horarioService;

    public interface RotationListener {
        void onRotationStarted();
        void onRotationFinished();
        void onRotationError(String error);
    }

    public RotationManager() {
        this.horarioService = new HorarioService();
    }

    /**
     * Ejecuta la rotación de horarios de los conductores.
     */
    public void executeRotation(RotationListener listener) {
        Log.d(TAG, "🚀 Iniciando ejecución de rotación");
        if (listener != null) listener.onRotationStarted();

        horarioService.rotarHorarios(new HorarioService.RotationCallback() {
            @Override
            public void onSuccess() {
                Log.d(TAG, "✅ Rotación finalizada con éxito");
                if (listener != null) listener.onRotationFinished();
            }

            @Override
            public void onError(String error) {
                Log.e(TAG, "❌ Error en rotación: " + error);
                if (listener != null) listener.onRotationError(error);
            }
        });
    }

    /**
     * Limpia todas las asignaciones actuales.
     */
    public void clearAllAssignments(RotationListener listener) {
        Log.d(TAG, "🧹 Iniciando limpieza de asignaciones");
        if (listener != null) listener.onRotationStarted();

        horarioService.limpiarTodasLasAsignaciones(new HorarioService.RotationCallback() {
            @Override
            public void onSuccess() {
                Log.d(TAG, "✅ Asignaciones limpiadas");
                if (listener != null) listener.onRotationFinished();
            }

            @Override
            public void onError(String error) {
                Log.e(TAG, "❌ Error limpiando asignaciones: " + error);
                if (listener != null) listener.onRotationError(error);
            }
        });
    }
}

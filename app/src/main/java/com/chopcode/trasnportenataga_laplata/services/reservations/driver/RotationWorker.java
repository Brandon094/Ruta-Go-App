package com.chopcode.trasnportenataga_laplata.services.reservations.driver;

import android.content.Context;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.work.Worker;
import androidx.work.WorkerParameters;

import com.chopcode.trasnportenataga_laplata.services.reservations.HorarioService;

/**
 * Worker para ejecutar la rotación de horarios de forma automática en segundo plano.
 */
public class RotationWorker extends Worker {

    private static final String TAG = "RotationWorker";

    public RotationWorker(@NonNull Context context, @NonNull WorkerParameters workerParams) {
        super(context, workerParams);
    }

    @NonNull
    @Override
    public Result doWork() {
        Log.d(TAG, "🚀 Iniciando trabajo de rotación automática");

        HorarioService horarioService = new HorarioService();
        
        // Usamos una sincronización simple para esperar el resultado asíncrono de Firebase
        // En un worker, esto es aceptable ya que corre en un hilo de fondo dedicado
        final boolean[] success = {false};
        final boolean[] finished = {false};

        horarioService.verificarYEjecutarRotacionAutomatica(new HorarioService.RotationCallback() {
            @Override
            public void onSuccess() {
                Log.d(TAG, "✅ Rotación automática completada con éxito");
                success[0] = true;
                finished[0] = true;
            }

            @Override
            public void onError(String error) {
                Log.e(TAG, "❌ Error en rotación automática: " + error);
                success[0] = false;
                finished[0] = true;
            }
        });

        // Espera activa (máximo 30 segundos)
        long startTime = System.currentTimeMillis();
        while (!finished[0] && (System.currentTimeMillis() - startTime < 30000)) {
            try {
                Thread.sleep(500);
            } catch (InterruptedException e) {
                return Result.retry();
            }
        }

        if (success[0]) {
            return Result.success();
        } else {
            return Result.retry();
        }
    }
}

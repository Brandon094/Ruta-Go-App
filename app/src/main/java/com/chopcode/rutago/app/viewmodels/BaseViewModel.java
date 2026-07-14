package com.chopcode.rutago.app.viewmodels;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;
import android.util.Log;

import java.util.HashMap;
import java.util.Map;

import com.chopcode.rutago.app.config.MyApp;

/**
 * Base ViewModel
 *
 * Clase abstracta que sirve como base para todos los ViewModels del sistema.
 * Proporciona gestión estandarizada de errores, estados de carga y telemetría analítica.
 */
public abstract class BaseViewModel extends ViewModel {
    protected static final String TAG = "BaseViewModel";
    
    /** LiveData para notificar mensajes de error a la Vista. */
    protected final MutableLiveData<String> errorLiveData = new MutableLiveData<>();
    
    /** LiveData para controlar la visibilidad de indicadores de carga (ProgressBar/Shimmer). */
    protected final MutableLiveData<Boolean> loadingLiveData = new MutableLiveData<>();

    public LiveData<String> getErrorLiveData() { return errorLiveData; }
    public LiveData<Boolean> getLoadingLiveData() { return loadingLiveData; }

    /**
     * Actualiza el estado de carga del ViewModel.
     * @param loading true para mostrar carga, false para ocultar.
     */
    public void setLoading(boolean loading) {
        loadingLiveData.postValue(loading);
    }

    /**
     * Registra y notifica un error ocurrido en la capa de negocio.
     * @param error Mensaje descriptivo del error.
     */
    public void setError(String error) {
        if (error != null) {
            Log.e(TAG, "Error en " + getClass().getSimpleName() + ": " + error);
        }
        errorLiveData.postValue(error);
    }

    /**
     * Registra un evento de analítica en Firebase para seguimiento de comportamiento.
     * @param evento Nombre único del evento.
     * @param conductor Identificador opcional del conductor relacionado.
     * @param cantidad Valor numérico opcional relacionado con el evento.
     */
    protected void registrarEventoAnalitico(String evento, String conductor, Integer cantidad) {
        try {
            Map<String, Object> params = new HashMap<>();
            params.put("viewmodel", this.getClass().getSimpleName());
            params.put("user_id", MyApp.getCurrentUserId());

            if (conductor != null) params.put("conductor", conductor);
            if (cantidad != null) params.put("cantidad", cantidad);
            params.put("timestamp", System.currentTimeMillis());

            MyApp.logEvent("vm_" + evento, params);
            Log.d(TAG, "📊 Evento analítico registrado: " + evento);
        } catch (Exception e) {
            Log.e(TAG, "❌ Error registrando evento analítico: " + e.getMessage());
        }
    }

    @Override
    protected void onCleared() {
        super.onCleared();
        Log.d(TAG, "🧹 ViewModel " + getClass().getSimpleName() + " destruido y recursos liberados.");
    }
}

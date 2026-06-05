// RutasViewModel.java
package com.chopcode.trasnportenataga_laplata.viewmodels.driver;

import com.chopcode.trasnportenataga_laplata.managers.routes.RutasManager;
import com.chopcode.trasnportenataga_laplata.models.Ruta;
import com.chopcode.trasnportenataga_laplata.viewmodels.BaseViewModel;

import android.util.Log;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import java.util.ArrayList;
import java.util.List;

public class RutasViewModel extends BaseViewModel {
    private static final String TAG = "RutasViewModel";
    private final RutasManager rutasManager;
    private final MutableLiveData<List<Ruta>> rutasLiveData = new MutableLiveData<>();
    private final MutableLiveData<Integer> contadorRutasLiveData = new MutableLiveData<>();
    private final MutableLiveData<String> proximaRutaLiveData = new MutableLiveData<>();

    public RutasViewModel() {
        this.rutasManager = new RutasManager();
        this.contadorRutasLiveData.setValue(0);
        this.rutasLiveData.setValue(new ArrayList<>());
    }

    // Getters
    public LiveData<List<Ruta>> getRutasLiveData() { return rutasLiveData; }
    public LiveData<Integer> getContadorRutasLiveData() { return contadorRutasLiveData; }
    public LiveData<String> getProximaRutaLiveData() { return proximaRutaLiveData; }

    // ✅ NUEVO MÉTODO PÚBLICO PARA LIMPIAR RUTAS DESDE LA ACTIVIDAD
    public void clearRoutes() {
        rutasLiveData.postValue(new ArrayList<>());
        contadorRutasLiveData.postValue(0);
        proximaRutaLiveData.postValue(null);
    }

    // Métodos principales
    public void loadRoutes(List<String> horariosAsignados) {
        Log.d(TAG, "🗺️ Cargando rutas asignadas: " + horariosAsignados.size() + " horarios");
        setLoading(true);
        setError(null); // Limpiar errores previos

        rutasManager.loadAssignedRoutes(horariosAsignados, new RutasManager.RoutesCallback() {
            @Override
            public void onRoutesLoaded(List<Ruta> rutas) {
                Log.d(TAG, "✅ Rutas cargadas: " + rutas.size());

                rutasLiveData.postValue(rutas);
                contadorRutasLiveData.postValue(rutas.size());

                // Actualizar información de la próxima ruta
                if (!rutas.isEmpty()) {
                    Ruta proximaRuta = rutas.get(0);
                    String infoProximaRuta = proximaRuta.getOrigen() + " → " +
                            proximaRuta.getDestino() +
                            " (" + (proximaRuta.getHora() != null ?
                            proximaRuta.getHora().getHora() : "--:--") + ")";
                    proximaRutaLiveData.postValue(infoProximaRuta);
                } else {
                    proximaRutaLiveData.postValue(null);
                }

                setLoading(false);
                // ✅ LLAMAR AL MÉTODO HEREDADO
                registrarEventoAnalitico("rutas_cargadas", null, rutas.size());
            }

            @Override
            public void onError(String error) {
                Log.e(TAG, "❌ Error cargando rutas: " + error);
                setError("Error cargando rutas: " + error);
                setLoading(false);
                clearRoutes(); // Limpiar rutas en caso de error
            }
        });
    }
}
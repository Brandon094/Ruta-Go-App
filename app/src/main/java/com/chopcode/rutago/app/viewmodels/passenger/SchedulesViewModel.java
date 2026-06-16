package com.chopcode.rutago.app.viewmodels.passenger;

import android.util.Log;
import androidx.annotation.NonNull;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import com.chopcode.rutago.app.config.MyApp;
import com.chopcode.rutago.app.models.Horario;
import com.chopcode.rutago.app.services.reservations.HorarioService;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class SchedulesViewModel extends ViewModel {
    private static final String TAG = "SchedulesVM";

    private final MutableLiveData<List<Horario>> natagaSchedules = new MutableLiveData<>(new ArrayList<>());
    private final MutableLiveData<List<Horario>> laPlataSchedules = new MutableLiveData<>(new ArrayList<>());
    private final MutableLiveData<Boolean> isLoading = new MutableLiveData<>(false);

    private final HorarioService horarioService;
    private ValueEventListener availabilityListener;

    public SchedulesViewModel() {
        this.horarioService = new HorarioService();
    }

    public LiveData<List<Horario>> getNatagaSchedules() { return natagaSchedules; }
    public LiveData<List<Horario>> getLaPlataSchedules() { return laPlataSchedules; }
    public LiveData<Boolean> getIsLoading() { return isLoading; }

    public void loadSchedules() {
        isLoading.setValue(true);
        horarioService.cargarHorarios(new HorarioService.HorarioCallback() {
            @Override
            public void onHorariosCargados(List<Horario> nataga, List<Horario> laPlata) {
                natagaSchedules.postValue(nataga);
                laPlataSchedules.postValue(laPlata);
                isLoading.postValue(false);
                
                // Una vez cargados los horarios, empezamos a escuchar asientos
                if (availabilityListener == null) {
                    setupAvailabilityListener();
                }
            }

            @Override
            public void onError(String error) {
                Log.e(TAG, "Error: " + error);
                isLoading.postValue(false);
            }
        });
    }

    private void setupAvailabilityListener() {
        availabilityListener = horarioService.escucharDisponibilidadGlobal(new HorarioService.AsientosGlobalCallback() {
            @Override
            public void onAsientosActualizados(Map<String, Integer> disponibilidades) {
                actualizarAsientos(natagaSchedules, disponibilidades);
                actualizarAsientos(laPlataSchedules, disponibilidades);
            }
        });
    }

    private void actualizarAsientos(MutableLiveData<List<Horario>> liveData, Map<String, Integer> disponibilidades) {
        List<Horario> actual = liveData.getValue();
        if (actual == null) return;

        boolean huboCambio = false;
        for (Horario h : actual) {
            Integer disp = disponibilidades.get(h.getId());
            if (disp != null && h.getAsientosDisponibles() != disp) {
                h.setAsientosDisponibles(disp);
                huboCambio = true;
            }
        }
        
        if (huboCambio) {
            liveData.postValue(new ArrayList<>(actual));
        }
    }

    @Override
    protected void onCleared() {
        super.onCleared();
        if (availabilityListener != null) {
            MyApp.getDatabaseReference("disponibilidadAsientos").removeEventListener(availabilityListener);
        }
    }
}

package com.chopcode.rutago.app.viewmodels.passenger;

import android.util.Log;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import com.chopcode.rutago.app.config.MyApp;
import com.chopcode.rutago.app.models.Schedule;
import com.chopcode.rutago.app.services.reservations.common.ScheduleService;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Schedule ViewModel (Passenger)
 *
 * Motor reactivo para la visualización de la planilla de horarios maestra.
 * Responsabilidades:
 * - Cargar y segmentar los horarios por ruta (Natagá -> La Plata vs La Plata -> Natagá).
 * - Mantener una suscripción global al nodo de disponibilidad de asientos.
 * - Sincronizar dinámicamente el conteo de puestos libres sin requerir recargas manuales.
 * - Implementar una estrategia de "Cache y Refresco" para mejorar la percepción de velocidad.
 * - Garantizar la integridad de los datos visualizados mediante el motor de integridad de ScheduleService.
 */
public class ScheduleViewModel extends ViewModel {
    private static final String TAG = "ScheduleViewModel";

    /** Colección de turnos para el trayecto de salida. */
    private final MutableLiveData<List<Schedule>> natagaSchedules = new MutableLiveData<>(new ArrayList<>());
    
    /** Colección de turnos para el trayecto de retorno. */
    private final MutableLiveData<List<Schedule>> laPlataSchedules = new MutableLiveData<>(new ArrayList<>());
    
    private final MutableLiveData<Boolean> isLoading = new MutableLiveData<>(false);

    private final ScheduleService scheduleService;
    private ValueEventListener availabilityListener;

    public ScheduleViewModel() {
        this.scheduleService = new ScheduleService();
    }

    public LiveData<List<Schedule>> getNatagaSchedules() { return natagaSchedules; }
    public LiveData<List<Schedule>> getLaPlataSchedules() { return laPlataSchedules; }
    public LiveData<Boolean> getIsLoading() { return isLoading; }

    /**
     * Inicia la recuperación de la planilla de hoy.
     * Si ya existen datos en memoria, el Shimmer no se activa para una experiencia más fluida.
     */
    public void loadSchedules() {
        List<Schedule> currentNataga = natagaSchedules.getValue();
        List<Schedule> currentLaPlata = laPlataSchedules.getValue();
        
        if ((currentNataga != null && !currentNataga.isEmpty()) || (currentLaPlata != null && !currentLaPlata.isEmpty())) {
            isLoading.setValue(false);
        } else {
            isLoading.setValue(true);
        }

        scheduleService.loadSchedules(new ScheduleService.ScheduleCallback() {
            @Override
            public void onSchedulesLoaded(List<Schedule> nataga, List<Schedule> laPlata) {
                natagaSchedules.postValue(nataga);
                laPlataSchedules.postValue(laPlata);
                isLoading.postValue(false);
                // Activación del stream de disponibilidad técnica tras cargar los metadatos
                if (availabilityListener == null) setupAvailabilityListener();
            }
            @Override public void onError(String error) { Log.e(TAG, "❌ Error al sincronizar planilla: " + error); isLoading.postValue(false); }
        });
    }

    /**
     * Establece el túnel de escucha para cambios en la ocupación global.
     */
    private void setupAvailabilityListener() {
        availabilityListener = scheduleService.listenGlobalAvailability(new ScheduleService.GlobalSeatsCallback() {
            @Override
            public void onSeatsUpdated(Map<String, Integer> availabilities, Map<String, Integer> totals) {
                updateSeats(natagaSchedules, availabilities, totals);
                updateSeats(laPlataSchedules, availabilities, totals);
            }
        });
    }

    /**
     * Realiza el parcheado de datos en caliente sobre las listas cargadas.
     */
    private void updateSeats(MutableLiveData<List<Schedule>> liveData, Map<String, Integer> availabilities, Map<String, Integer> totals) {
        List<Schedule> current = liveData.getValue();
        if (current == null) return;
        boolean changed = false;
        for (Schedule s : current) {
            Integer available = availabilities.get(s.getId());
            Integer total = totals.get(s.getId());
            if (available != null && s.getAvailableSeats() != available) {
                s.setAvailableSeats(available);
                changed = true;
            }
            if (total != null && s.getTotalCapacity() != total) {
                s.setTotalCapacity(total);
                changed = true;
            }
        }
        if (changed) liveData.postValue(new ArrayList<>(current));
    }

    @Override
    protected void onCleared() {
        super.onCleared();
        if (availabilityListener != null) {
            MyApp.getDatabaseReference("disponibilidadAsientos").removeEventListener(availabilityListener);
            Log.d(TAG, "🧹 Listener de disponibilidad técnica removido.");
        }
    }
}

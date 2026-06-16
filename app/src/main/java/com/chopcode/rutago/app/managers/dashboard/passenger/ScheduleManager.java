package com.chopcode.rutago.app.managers.dashboard.passenger;

import android.util.Log;

import com.chopcode.rutago.app.config.MyApp;
import com.chopcode.rutago.app.managers.analytics.DashboardAnalyticsHelper;
import com.chopcode.rutago.app.models.Horario;
import com.chopcode.rutago.app.services.reservations.HorarioService;

import java.util.ArrayList;
import java.util.List;

public class ScheduleManager {

    private static final String TAG = "ScheduleManager";

    private final DashboardAnalyticsHelper analyticsHelper;
    private final HorarioService horarioService;

    private List<Horario> listaNataga = new ArrayList<>();
    private List<Horario> listaLaPlata = new ArrayList<>();
    
    private com.google.firebase.database.ValueEventListener availabilityListener;

    // Callbacks
    public interface ScheduleListener {
        void onSchedulesLoaded(List<Horario> nataga, List<Horario> laPlata);
        void onSchedulesError(String error);
    }

    private ScheduleListener listener;

    public ScheduleManager(DashboardAnalyticsHelper analyticsHelper) {
        this.analyticsHelper = analyticsHelper;
        this.horarioService = new HorarioService();
        setupAvailabilityListener();
    }

    private void setupAvailabilityListener() {
        availabilityListener = horarioService.escucharDisponibilidadGlobal(disponibilidades -> {
            Log.d(TAG, "📡 Actualización global de disponibilidad recibida");
            actualizarDisponibilidadEnListas(disponibilidades);
            if (listener != null && !listaNataga.isEmpty()) {
                listener.onSchedulesLoaded(new ArrayList<>(listaNataga), new ArrayList<>(listaLaPlata));
            }
        });
    }

    private void actualizarDisponibilidadEnListas(java.util.Map<String, Integer> disponibilidades) {
        for (Horario h : listaNataga) {
            Integer disp = disponibilidades.get(h.getId());
            if (disp != null) {
                h.setAsientosDisponibles(disp);
            }
        }
        for (Horario h : listaLaPlata) {
            Integer disp = disponibilidades.get(h.getId());
            if (disp != null) {
                h.setAsientosDisponibles(disp);
            }
        }
    }

    public void setScheduleListener(ScheduleListener listener) {
        this.listener = listener;
    }

    public void loadSchedules() {
        Log.d(TAG, "🕒 Cargando horarios...");
        analyticsHelper.logScheduleLoadStart();

        horarioService.cargarHorarios(new HorarioService.HorarioCallback() {
            @Override
            public void onHorariosCargados(List<Horario> nataga, List<Horario> laPlata) {
                Log.d(TAG, "✅ Horarios cargados exitosamente");
                listaNataga.clear();
                listaLaPlata.clear();
                listaNataga.addAll(nataga);
                listaLaPlata.addAll(laPlata);

                analyticsHelper.logSchedulesLoaded(nataga.size(), laPlata.size());

                if (listener != null) {
                    listener.onSchedulesLoaded(nataga, laPlata);
                }
            }

            @Override
            public void onError(String error) {
                Log.e(TAG, "❌ Error cargando horarios: " + error);
                analyticsHelper.logError("carga_horarios", error);

                if (listener != null) {
                    listener.onSchedulesError(error);
                }
            }
        });
    }

    public void cleanup() {
        if (availabilityListener != null) {
            MyApp.getDatabaseReference("disponibilidadAsientos").removeEventListener(availabilityListener);
        }
    }

    public List<Horario> getNatagaSchedules() {
        return listaNataga;
    }

    public List<Horario> getLaPlataSchedules() {
        return listaLaPlata;
    }

    public int getTotalSchedules() {
        return listaNataga.size() + listaLaPlata.size();
    }
}

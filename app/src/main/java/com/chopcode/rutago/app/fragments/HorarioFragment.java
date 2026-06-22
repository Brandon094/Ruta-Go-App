package com.chopcode.rutago.app.fragments;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.activities.passenger.reservation.createReservation.CreateReservationActivity;
import com.chopcode.rutago.app.adapters.schedules.ScheduleAdapter;
import com.chopcode.rutago.app.managers.auths.AuthManager;
import com.chopcode.rutago.app.models.Schedule;
import com.chopcode.rutago.app.models.User;

import java.util.ArrayList;
import java.util.List;

public class HorarioFragment extends Fragment implements ScheduleAdapter.OnReservarClickListener {

    private static final String TAG = "HorarioFragment";
    private static final String ARG_SCHEDULES = "schedules";
    private static final String ARG_TITLE = "title";

    private RecyclerView recyclerView;
    private View layoutFeedback;
    private ScheduleAdapter adapter;

    private List<Schedule> schedules = new ArrayList<>();
    private String title;
    private AuthManager authManager;

    public interface OnUserDataListener {
        User getUserActual();
    }

    private OnUserDataListener userDataListener;

    public void setUserDataListener(OnUserDataListener listener) {
        this.userDataListener = listener;
    }

    public static HorarioFragment newInstance(List<Schedule> schedules, String title) {
        HorarioFragment fragment = new HorarioFragment();
        Bundle args = new Bundle();
        args.putSerializable(ARG_SCHEDULES, new ArrayList<>(schedules));
        args.putString(ARG_TITLE, title);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        authManager = AuthManager.getInstance();
        if (getArguments() != null) {
            List<Schedule> argsSchedules = (List<Schedule>) getArguments().getSerializable(ARG_SCHEDULES);
            if (argsSchedules != null) {
                schedules.clear();
                schedules.addAll(argsSchedules);
            }
            title = getArguments().getString(ARG_TITLE);
        }
    }

    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_horarios, container, false);
        recyclerView = view.findViewById(R.id.recyclerViewHorarios);
        layoutFeedback = view.findViewById(R.id.layoutFeedbackFinalizado);

        recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));
        adapter = new ScheduleAdapter(schedules, this);
        recyclerView.setAdapter(adapter);
        
        verificarYMostrarFeedback();

        if (!schedules.isEmpty() && (layoutFeedback == null || layoutFeedback.getVisibility() == View.GONE)) {
            recyclerView.scheduleLayoutAnimation();
            desplazarAlSiguienteViajeConDelay();
        }

        return view;
    }

    public void actualizarHorarios(List<Schedule> newSchedules) {
        if (adapter != null) {
            schedules.clear();
            if (newSchedules != null) {
                schedules.addAll(newSchedules);
                adapter.actualizarHorarios(schedules);
                
                verificarYMostrarFeedback();

                if (recyclerView != null && (layoutFeedback == null || layoutFeedback.getVisibility() == View.GONE)) {
                    recyclerView.scheduleLayoutAnimation();
                    desplazarAlSiguienteViajeConDelay();
                }
            } else {
                adapter.actualizarHorarios(new ArrayList<>());
                verificarYMostrarFeedback();
            }
        } else {
            schedules.clear();
            if (newSchedules != null) schedules.addAll(newSchedules);
        }
    }

    private void verificarYMostrarFeedback() {
        if (layoutFeedback == null || recyclerView == null) return;

        boolean todosFinalizados = true;
        if (schedules.isEmpty()) {
            todosFinalizados = false; 
        } else {
            for (Schedule s : schedules) {
                if (!com.chopcode.rutago.app.utils.ui.FormatUtils.esHorarioPasado(s.getTime())) {
                    todosFinalizados = false;
                    break;
                }
            }
        }

        if (todosFinalizados) {
            recyclerView.setVisibility(View.GONE);
            layoutFeedback.setVisibility(View.VISIBLE);
            com.chopcode.rutago.app.utils.ui.UIAnimationUtils.playCardEntryAnimation(layoutFeedback);
        } else {
            recyclerView.setVisibility(View.VISIBLE);
            layoutFeedback.setVisibility(View.GONE);
        }
    }

    /**
     * 🔥 Desplaza el scroll automáticamente hasta el horario marcado como "SIGUIENTE".
     * Ejecuta primero el scroll y luego dispara las animaciones de salida de buses.
     */
    public void desplazarAlSiguienteViajeConDelay() {
        if (adapter == null || recyclerView == null) return;

        int targetIndex = adapter.getNextTripIndex();
        if (targetIndex != -1) {
            new android.os.Handler(android.os.Looper.getMainLooper()).postDelayed(() -> {
                if (recyclerView != null && targetIndex < adapter.getItemCount()) {
                    // 1. Realizar el scroll inmediatamente (con un pequeño delay para estabilidad)
                    LinearLayoutManager layoutManager = (LinearLayoutManager) recyclerView.getLayoutManager();
                    if (layoutManager != null) {
                        layoutManager.scrollToPositionWithOffset(targetIndex, 120);
                    }

                    // 2. Habilitar animaciones de partida después del scroll
                    new android.os.Handler(android.os.Looper.getMainLooper()).postDelayed(() -> {
                        if (adapter != null) {
                            adapter.enableDepartureAnimations();
                        }
                    }, 800); // Dar tiempo a que el scroll se asiente
                }
            }, 400); // Delay inicial corto para cargar la UI
        }
    }

    @Override
    public void onReservarClick(Schedule schedule) {
        if (!authManager.isUserLoggedIn()) {
            Toast.makeText(getContext(), R.string.inicie_sesion_reservar, Toast.LENGTH_SHORT).show();
            authManager.redirectToLogin(getActivity());
            return;
        }

        // Blindaje extra: Verificar conductor antes de navegar
        if (schedule.getConductorId() == null || schedule.getConductorId().isEmpty()) {
            Toast.makeText(getContext(), "Este horario no tiene un conductor asignado aún.", Toast.LENGTH_SHORT).show();
            return;
        }

        navigateToCreateReservation(schedule);
    }

    private void navigateToCreateReservation(Schedule schedule) {
        try {
            Intent intent = new Intent(getActivity(), CreateReservationActivity.class);
            intent.putExtra("horarioId", schedule.getId());
            intent.putExtra("horarioHora", schedule.getTime());
            intent.putExtra("rutaSeleccionada", title);
            
            // 🔥 PASAR PRECIO YA CARGADO
            try {
                double priceValue = Double.parseDouble(schedule.getPrice());
                intent.putExtra("precioSeleccionado", priceValue);
            } catch (Exception e) {
                intent.putExtra("precioSeleccionado", com.chopcode.rutago.app.services.prices.PriceService.DEFAULT_PRICE);
            }

            if (userDataListener != null) {
                User user = userDataListener.getUserActual();
                if (user != null) {
                    intent.putExtra("usuarioId", user.getId());
                    intent.putExtra("usuarioNombre", user.getNombre());
                    intent.putExtra("usuarioTelefono", user.getTelefono());
                    intent.putExtra("usuarioEmail", user.getEmail());
                }
            }
            startActivity(intent);
        } catch (Exception e) {
            Log.e(TAG, "Error navigating to CreateReservation: " + e.getMessage());
        }
    }
}

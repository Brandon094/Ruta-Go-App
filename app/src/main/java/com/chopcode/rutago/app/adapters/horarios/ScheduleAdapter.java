package com.chopcode.rutago.app.adapters.horarios;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.models.Schedule;
import com.chopcode.rutago.app.utils.ui.FormatUtils;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import java.util.ArrayList;
import java.util.List;

public class ScheduleAdapter extends RecyclerView.Adapter<RecyclerView.ViewHolder> {

    private static final String TAG = "ScheduleAdapter";
    private static final int TYPE_SCHEDULE = 1;
    private static final int TYPE_FOOTER = 2;

    private List<Schedule> schedules;
    private OnReservarClickListener listener;
    private int nextTripIndex = -1;
    private boolean departureAnimationsEnabled = false;

    public interface OnReservarClickListener {
        void onReservarClick(Schedule schedule);
    }

    public ScheduleAdapter(List<Schedule> schedules, OnReservarClickListener listener) {
        this.schedules = (schedules != null) ? new ArrayList<>(schedules) : new ArrayList<>();
        this.listener = listener;
        calcularIndiceSiguienteViaje();
    }

    public void enableDepartureAnimations() {
        this.departureAnimationsEnabled = true;
        notifyDataSetChanged();
    }

    @Override
    public int getItemViewType(int position) {
        if (position == schedules.size()) {
            return TYPE_FOOTER;
        }
        return TYPE_SCHEDULE;
    }

    @NonNull
    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        if (viewType == TYPE_FOOTER) {
            View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_footer_reset_info, parent, false);
            return new FooterViewHolder(view);
        }
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_horario, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull RecyclerView.ViewHolder holder, int position) {
        if (holder instanceof ViewHolder) {
            ((ViewHolder) holder).bind(schedules.get(position), position == nextTripIndex, departureAnimationsEnabled, listener);
        }
    }

    @Override
    public int getItemCount() {
        // +1 para el Footer
        return schedules.isEmpty() ? 0 : schedules.size() + 1;
    }

    public int getNextTripIndex() {
        return nextTripIndex;
    }

    public void actualizarHorarios(List<Schedule> newSchedules) {
        this.schedules.clear();
        if (newSchedules != null) {
            this.schedules.addAll(newSchedules);
        }
        this.departureAnimationsEnabled = false; // Resetear para el nuevo ciclo de scroll + partida
        calcularIndiceSiguienteViaje();
        notifyDataSetChanged();
    }

    private void calcularIndiceSiguienteViaje() {
        nextTripIndex = -1;
        if (schedules.isEmpty()) return;

        for (int i = 0; i < schedules.size(); i++) {
            if (!FormatUtils.esHorarioPasado(schedules.get(i).getTime())) {
                nextTripIndex = i;
                break;
            }
        }
        
        // Si todos pasaron hoy, el próximo es el primero (mañana)
        if (nextTripIndex == -1 && !schedules.isEmpty()) {
            nextTripIndex = 0;
        }
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {
        // ... (resto del ViewHolder igual)
        public TextView tvTime, tvAmPm, tvRoute, tvSeats, tvPrice, tvAvailabilityBadge, tvBadgeNext;
        public FloatingActionButton btnReserve;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            tvTime = itemView.findViewById(R.id.tvHora);
            tvAmPm = itemView.findViewById(R.id.tvAmPm);
            tvRoute = itemView.findViewById(R.id.tvRuta);
            tvSeats = itemView.findViewById(R.id.tvAsientos);
            tvPrice = itemView.findViewById(R.id.tvPrecio);
            tvAvailabilityBadge = itemView.findViewById(R.id.tvEstadoDisponibilidad);
            tvBadgeNext = itemView.findViewById(R.id.tvBadgeProximo);
            btnReserve = itemView.findViewById(R.id.btnReservar);
        }

        public void bind(Schedule schedule, boolean isNextTrip, boolean animationsEnabled, OnReservarClickListener listener) {
            String[] timeParts = FormatUtils.separarHoraYAmPm(schedule.getTime());
            if (tvTime != null) tvTime.setText(timeParts[0]);
            if (tvAmPm != null) tvAmPm.setText(timeParts[1]);

            if (tvRoute != null) tvRoute.setText(schedule.getRoute());

            int available = schedule.getAvailableSeats();
            if (available <= 0 && schedule.getTotalCapacity() <= 0) available = schedule.getTotalCapacity();
            
            boolean isPast = FormatUtils.esHorarioPasado(schedule.getTime());
            boolean hasDriver = schedule.getConductorId() != null && !schedule.getConductorId().isEmpty();

            if (tvSeats != null) {
                com.chopcode.rutago.app.utils.ui.UIAnimationUtils.animateNumericText(tvSeats, 0, available);
                updateColors(available, isNextTrip, isPast, hasDriver);
            }

            if (tvPrice != null) {
                try {
                    double priceVal = Double.parseDouble(schedule.getPrice());
                    com.chopcode.rutago.app.utils.ui.UIAnimationUtils.animateCurrencyText(tvPrice, 0, priceVal);
                } catch (Exception e) {
                    tvPrice.setText(FormatUtils.formatearPrecio(schedule.getPrice()));
                }
            }

            if (tvBadgeNext != null) {
                if (isNextTrip && available > 0 && !isPast) {
                    tvBadgeNext.setVisibility(View.VISIBLE);
                    com.chopcode.rutago.app.utils.ui.UIAnimationUtils.startPulseAnimation(tvBadgeNext);
                } else {
                    tvBadgeNext.setVisibility(View.GONE);
                    com.chopcode.rutago.app.utils.ui.UIAnimationUtils.stopAnimation(tvBadgeNext);
                }
            }

            if (btnReserve != null) {
                btnReserve.setOnClickListener(v -> {
                    if (hasDriver) {
                        if (listener != null) listener.onReservarClick(schedule);
                    } else {
                        android.widget.Toast.makeText(itemView.getContext(), "Aún no se ha asignado un bus para este horario", android.widget.Toast.LENGTH_SHORT).show();
                    }
                });

                if (isPast) {
                    // Animación del bus arrancando
                    btnReserve.setImageResource(R.drawable.ic_bus);
                    btnReserve.setEnabled(false);
                    // Solo disparar si las animaciones están habilitadas (tras el scroll)
                    if (animationsEnabled && btnReserve.getVisibility() == View.VISIBLE && btnReserve.getTranslationX() == 0) {
                        com.chopcode.rutago.app.utils.ui.UIAnimationUtils.playBusDepartureAnimation(btnReserve);
                    } else if (!animationsEnabled) {
                        btnReserve.setVisibility(View.VISIBLE); // Mantener visible hasta que habiliten la animación
                    } else {
                        btnReserve.setVisibility(View.INVISIBLE);
                    }
                } else {
                    // Estado normal (Disponible o Sin conductor)
                    btnReserve.setVisibility(View.VISIBLE);
                    btnReserve.setTranslationX(0);
                    btnReserve.setAlpha(1.0f);
                    btnReserve.setImageResource(hasDriver ? R.drawable.ic_add : R.drawable.ic_lock);
                    
                    boolean canReserve = available > 0 && hasDriver;
                    btnReserve.setEnabled(canReserve);
                    btnReserve.setAlpha(canReserve ? 1.0f : 0.4f);
                }
            }
        }

        private void updateColors(int available, boolean isNextTrip, boolean isPast, boolean hasDriver) {
            int textColor;
            int badgeRes;
            String badgeText;

            if (isPast) {
                textColor = itemView.getContext().getColor(R.color.text_tertiary);
                badgeRes = R.drawable.bg_badge_inactive;
                badgeText = itemView.getContext().getString(R.string.estado_finalizado);
            } else if (!hasDriver) {
                textColor = itemView.getContext().getColor(R.color.text_tertiary);
                badgeRes = R.drawable.bg_badge_inactive;
                badgeText = "Pendiente";
            } else if (available == 0) {
                textColor = itemView.getContext().getColor(R.color.error_500);
                badgeRes = R.drawable.bg_estado_cancelado;
                badgeText = "Agotado";
            } else if (available < 5) {
                textColor = itemView.getContext().getColor(R.color.warning_500);
                badgeRes = R.drawable.bg_estado_pendiente;
                badgeText = "Últimos cupos";
            } else {
                textColor = itemView.getContext().getColor(R.color.primary_200); 
                badgeRes = isNextTrip ? R.drawable.bg_status_next : R.drawable.bg_estado_confirmado;
                badgeText = "Disponible";
            }

            if (tvSeats != null) {
                tvSeats.setTextColor(textColor);
                tvSeats.setText(itemView.getContext().getString(R.string.asientos_disponibles_label_adapter, available));
            }
            
            if (tvAvailabilityBadge != null) {
                tvAvailabilityBadge.setText(badgeText);
                tvAvailabilityBadge.setBackgroundResource(badgeRes);
                tvAvailabilityBadge.setTextColor(itemView.getContext().getColor(R.color.white));
            }

            if (tvPrice != null) {
                tvPrice.setTextColor(itemView.getContext().getColor(R.color.primary_500));
            }
        }
    }

    /**
     * ℹ️ ViewHolder simple para el Footer informativo.
     */
    public static class FooterViewHolder extends RecyclerView.ViewHolder {
        public FooterViewHolder(@NonNull View itemView) {
            super(itemView);
        }
    }
}

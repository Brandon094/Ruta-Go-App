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

public class ScheduleAdapter extends RecyclerView.Adapter<ScheduleAdapter.ViewHolder> {

    private static final String TAG = "ScheduleAdapter";
    private List<Schedule> schedules;
    private OnReservarClickListener listener;
    private int nextTripIndex = -1;

    public interface OnReservarClickListener {
        void onReservarClick(Schedule schedule);
    }

    public ScheduleAdapter(List<Schedule> schedules, OnReservarClickListener listener) {
        this.schedules = (schedules != null) ? new ArrayList<>(schedules) : new ArrayList<>();
        this.listener = listener;
        calcularIndiceSiguienteViaje();
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_horario, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        if (position < schedules.size()) {
            holder.bind(schedules.get(position), position == nextTripIndex, listener);
        }
    }

    @Override
    public int getItemCount() {
        return schedules.size();
    }

    public void actualizarHorarios(List<Schedule> newSchedules) {
        this.schedules.clear();
        if (newSchedules != null) {
            this.schedules.addAll(newSchedules);
        }
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

        public void bind(Schedule schedule, boolean isNextTrip, OnReservarClickListener listener) {
            String[] timeParts = FormatUtils.separarHoraYAmPm(schedule.getTime());
            if (tvTime != null) tvTime.setText(timeParts[0]);
            if (tvAmPm != null) tvAmPm.setText(timeParts[1]);

            if (tvRoute != null) tvRoute.setText(schedule.getRoute());

            int available = schedule.getAvailableSeats();
            if (available <= 0 && schedule.getTotalCapacity() <= 0) available = schedule.getTotalCapacity();
            
            boolean isPast = FormatUtils.esHorarioPasado(schedule.getTime());

            if (tvSeats != null) {
                com.chopcode.rutago.app.utils.ui.UIAnimationUtils.animateNumericText(tvSeats, 0, available);
                updateColors(available, isNextTrip, isPast);
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
                    if (listener != null) listener.onReservarClick(schedule);
                });
                // Deshabilitar si ya pasó el horario o no hay cupos
                boolean canReserve = available > 0 && !isPast;
                btnReserve.setEnabled(canReserve);
                btnReserve.setAlpha(canReserve ? 1.0f : 0.4f);
            }
        }

        private void updateColors(int available, boolean isNextTrip, boolean isPast) {
            int textColor;
            int badgeColor;
            String badgeText;

            if (isPast) {
                textColor = itemView.getContext().getColor(R.color.text_tertiary);
                badgeColor = itemView.getContext().getColor(R.color.text_tertiary);
                badgeText = itemView.getContext().getString(R.string.estado_finalizado);
            } else if (available == 0) {
                textColor = itemView.getContext().getColor(R.color.error_500);
                badgeColor = itemView.getContext().getColor(R.color.error_500);
                badgeText = "Agotado";
            } else if (available < 5) {
                textColor = itemView.getContext().getColor(R.color.warning_500);
                badgeColor = itemView.getContext().getColor(R.color.warning_500);
                badgeText = "Últimos cupos";
            } else {
                textColor = itemView.getContext().getColor(R.color.primary_200); 
                badgeColor = isNextTrip ? itemView.getContext().getColor(R.color.secondary_500) : itemView.getContext().getColor(R.color.primary_500); 
                badgeText = "Disponible";
            }

            if (tvSeats != null) {
                tvSeats.setTextColor(textColor);
                tvSeats.setText(itemView.getContext().getString(R.string.asientos_disponibles_label_adapter, available));
            }
            
            if (tvAvailabilityBadge != null) {
                tvAvailabilityBadge.setText(badgeText);
                tvAvailabilityBadge.getBackground().setTint(badgeColor);
            }

            if (tvPrice != null) {
                tvPrice.setTextColor(itemView.getContext().getColor(R.color.primary_500));
            }
        }
    }
}

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

    public interface OnReservarClickListener {
        void onReservarClick(Schedule schedule);
    }

    public ScheduleAdapter(List<Schedule> schedules, OnReservarClickListener listener) {
        this.schedules = (schedules != null) ? new ArrayList<>(schedules) : new ArrayList<>();
        this.listener = listener;
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
            holder.bind(schedules.get(position), listener);
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
        notifyDataSetChanged();
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {
        public TextView tvTime, tvAmPm, tvRoute, tvSeats, tvPrice;
        public FloatingActionButton btnReserve;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            tvTime = itemView.findViewById(R.id.tvHora);
            tvAmPm = itemView.findViewById(R.id.tvAmPm);
            tvRoute = itemView.findViewById(R.id.tvRuta);
            tvSeats = itemView.findViewById(R.id.tvAsientos);
            tvPrice = itemView.findViewById(R.id.tvPrecio);
            btnReserve = itemView.findViewById(R.id.btnReservar);
        }

        public void bind(Schedule schedule, OnReservarClickListener listener) {
            String[] timeParts = FormatUtils.separarHoraYAmPm(schedule.getTime());
            if (tvTime != null) tvTime.setText(timeParts[0]);
            if (tvAmPm != null) tvAmPm.setText(timeParts[1]);

            if (tvRoute != null) tvRoute.setText(schedule.getRoute());

            int available = schedule.getAvailableSeats();
            if (available <= 0 && schedule.getTotalCapacity() <= 0) available = schedule.getTotalCapacity();
            
            if (tvSeats != null) {
                tvSeats.setText(itemView.getContext().getString(R.string.asientos_disponibles_label_adapter, available));
                updateColors(available);
            }

            if (tvPrice != null) tvPrice.setText(FormatUtils.formatearPrecio(schedule.getPrice()));

            if (btnReserve != null) {
                btnReserve.setOnClickListener(v -> {
                    if (listener != null) listener.onReservarClick(schedule);
                });
                btnReserve.setEnabled(available > 0);
                btnReserve.setAlpha(available > 0 ? 1.0f : 0.5f);
            }
        }

        private void updateColors(int available) {
            int color;
            if (available == 0) color = itemView.getContext().getColor(R.color.error);
            else if (available < 5) color = itemView.getContext().getColor(R.color.status_pending);
            else color = itemView.getContext().getColor(R.color.success);
            if (tvSeats != null) tvSeats.setTextColor(color);
        }
    }
}

package com.chopcode.rutago.app.adapters.rutas;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.models.RouteStat;
import com.chopcode.rutago.app.utils.ui.UIAnimationUtils;
import java.util.ArrayList;
import java.util.List;

public class RouteStatAdapter extends RecyclerView.Adapter<RouteStatAdapter.ViewHolder> {

    private List<RouteStat> stats = new ArrayList<>();

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_route_stat, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        holder.bind(stats.get(position));
    }

    @Override
    public int getItemCount() { return stats.size(); }

    public void updateStats(List<RouteStat> newStats) {
        this.stats = newStats != null ? newStats : new ArrayList<>();
        notifyDataSetChanged();
    }

    static class ViewHolder extends RecyclerView.ViewHolder {
        private final TextView tvName, tvReservations, tvAvailable;
        private final View vIndicator;
        private int lastRes = 0, lastSeats = 0;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            tvName = itemView.findViewById(R.id.tvRouteName);
            tvReservations = itemView.findViewById(R.id.tvRouteReservations);
            tvAvailable = itemView.findViewById(R.id.tvRouteAvailableSeats);
            vIndicator = itemView.findViewById(R.id.vRouteIndicator);
        }

        public void bind(RouteStat stat) {
            tvName.setText(stat.getRouteName());
            tvName.setTextColor(itemView.getContext().getColor(stat.getColorRes()));
            vIndicator.setBackgroundColor(itemView.getContext().getColor(stat.getColorRes()));

            UIAnimationUtils.animateNumericText(tvReservations, lastRes, stat.getReservations());
            UIAnimationUtils.animateNumericText(tvAvailable, lastSeats, stat.getAvailableSeats());

            lastRes = stat.getReservations();
            lastSeats = stat.getAvailableSeats();
        }
    }
}

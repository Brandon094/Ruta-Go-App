package com.chopcode.rutago.app.adapters.routes;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.models.Route;
import com.chopcode.rutago.app.utils.ui.FormatUtils;
import java.util.List;

public class SelectRouteAdapter extends RecyclerView.Adapter<SelectRouteAdapter.ViewHolder> {

    private final List<Route> routes;
    private final OnRouteClickListener listener;

    public interface OnRouteClickListener {
        void onRouteClick(Route route);
    }

    public SelectRouteAdapter(List<Route> routes, OnRouteClickListener listener) {
        this.routes = routes;
        this.listener = listener;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_select_route, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        Route route = routes.get(position);
        holder.tvName.setText(route.getOrigin() + " -> " + route.getDestination());
        String timeStr = (route.getTime() != null) ? route.getTime().getTime() : "--:--";
        holder.tvTime.setText(timeStr);
        
        // Mostrar precio dinámico
        holder.tvFare.setText(FormatUtils.formatearPrecio(route.getFare()));
        
        holder.itemView.setOnClickListener(v -> { if (listener != null) listener.onRouteClick(route); });
    }

    @Override
    public int getItemCount() { return routes.size(); }

    static class ViewHolder extends RecyclerView.ViewHolder {
        TextView tvName, tvTime, tvFare;
        ViewHolder(View view) {
            super(view);
            tvName = view.findViewById(R.id.tvRouteName);
            tvTime = view.findViewById(R.id.tvRouteTime);
            tvFare = view.findViewById(R.id.tvRouteFare);
        }
    }
}

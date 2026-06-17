package com.chopcode.rutago.app.adapters.rutas;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.models.Route;
import java.util.List;

public class RouteAdapter extends RecyclerView.Adapter<RouteAdapter.RouteViewHolder> {

    private static final String TAG = "RouteAdapter";

    private List<Route> routeList;
    private OnRutaClickListener listener;

    public interface OnRutaClickListener {
        void onRutaClick(Route route);
    }

    public RouteAdapter(List<Route> routeList, OnRutaClickListener listener) {
        this.routeList = routeList;
        this.listener = listener;
    }

    @NonNull
    @Override
    public RouteViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_ruta, parent, false);
        return new RouteViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull RouteViewHolder holder, int position) {
        if (routeList == null || position >= routeList.size()) return;
        Route route = routeList.get(position);
        holder.bind(route);
        holder.itemView.setOnClickListener(v -> {
            if (listener != null) listener.onRutaClick(route);
        });
    }

    @Override
    public int getItemCount() {
        return routeList != null ? routeList.size() : 0;
    }

    public void actualizarRutas(List<Route> newRoutes) {
        this.routeList = newRoutes;
        notifyDataSetChanged();
    }

    public static class RouteViewHolder extends RecyclerView.ViewHolder {
        private TextView tvOrigin, tvDestination, tvTime;

        public RouteViewHolder(@NonNull View itemView) {
            super(itemView);
            tvOrigin = itemView.findViewById(R.id.tvOrigen);
            tvDestination = itemView.findViewById(R.id.tvDestino);
            tvTime = itemView.findViewById(R.id.tvHorario);
        }

        public void bind(Route route) {
            Log.d("RouteAdapter", "Binding route: " + route.getOrigin() + " to " + route.getDestination());
            tvOrigin.setText(route.getOrigin() != null ? route.getOrigin() : itemView.getContext().getString(R.string.no_disponible));
            tvDestination.setText(route.getDestination() != null ? route.getDestination() : itemView.getContext().getString(R.string.no_disponible));
            if (route.getTime() != null && route.getTime().getTime() != null) {
                tvTime.setText(route.getTime().getTime());
            } else {
                tvTime.setText("--:--");
            }
        }
    }
}

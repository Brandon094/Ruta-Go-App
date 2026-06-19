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
import com.chopcode.rutago.app.utils.ui.FormatUtils;
import java.util.List;

public class RouteAdapter extends RecyclerView.Adapter<RouteAdapter.RouteViewHolder> {

    private static final String TAG = "RouteAdapter";

    private List<Route> routeList;
    private OnRutaClickListener listener;
    private int nextRouteIndex = -1;

    public interface OnRutaClickListener {
        void onRutaClick(Route route);
    }

    public RouteAdapter(List<Route> routeList, OnRutaClickListener listener) {
        this.routeList = routeList;
        this.listener = listener;
        calcularIndiceSiguienteRuta();
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
        holder.bind(route, position == nextRouteIndex);
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
        calcularIndiceSiguienteRuta();
        notifyDataSetChanged();
    }

    private void calcularIndiceSiguienteRuta() {
        nextRouteIndex = -1;
        if (routeList == null || routeList.isEmpty()) return;

        for (int i = 0; i < routeList.size(); i++) {
            Route r = routeList.get(i);
            if (r.getTime() != null && !FormatUtils.esHorarioPasado(r.getTime().getTime())) {
                nextRouteIndex = i;
                break;
            }
        }
        
        // Fallback: Si todos pasaron hoy, el siguiente es el primero (mañana)
        if (nextRouteIndex == -1 && !routeList.isEmpty()) {
            nextRouteIndex = 0;
        }
    }

    public static class RouteViewHolder extends RecyclerView.ViewHolder {
        private TextView tvOrigin, tvDestination, tvTime, tvPrice, tvBadgeNext;

        public RouteViewHolder(@NonNull View itemView) {
            super(itemView);
            tvOrigin = itemView.findViewById(R.id.tvOrigen);
            tvDestination = itemView.findViewById(R.id.tvDestino);
            tvTime = itemView.findViewById(R.id.tvHorario);
            tvPrice = itemView.findViewById(R.id.tvPrecioRuta);
            tvBadgeNext = itemView.findViewById(R.id.tvBadgeProximoRuta);
        }

        public void bind(Route route, boolean isNext) {
            Log.d("RouteAdapter", "Binding route: " + route.getOrigin() + " to " + route.getDestination());
            tvOrigin.setText(route.getOrigin() != null ? route.getOrigin() : itemView.getContext().getString(R.string.no_disponible));
            tvDestination.setText(route.getDestination() != null ? route.getDestination() : itemView.getContext().getString(R.string.no_disponible));
            
            String timeStr = "--:--";
            boolean isPast = false;
            if (route.getTime() != null && route.getTime().getTime() != null) {
                timeStr = route.getTime().getTime();
                isPast = FormatUtils.esHorarioPasado(timeStr);
            }
            tvTime.setText(timeStr);

            // Enlazar precio dinámico desde el modelo Route con animación y color de la marca
            if (tvPrice != null) {
                tvPrice.setTextColor(itemView.getContext().getColor(R.color.primary_500));
                com.chopcode.rutago.app.utils.ui.UIAnimationUtils.animateCurrencyText(tvPrice, 0, route.getFare());
            }

            // Feedback dinámico para el conductor (Siguiente o Finalizada)
            if (tvBadgeNext != null) {
                com.chopcode.rutago.app.utils.ui.UIAnimationUtils.stopAnimation(tvBadgeNext);
                if (isNext && !isPast) {
                    tvBadgeNext.setVisibility(View.VISIBLE);
                    tvBadgeNext.setText(R.string.badge_siguiente);
                    tvBadgeNext.setBackgroundResource(R.drawable.bg_status_next);
                    com.chopcode.rutago.app.utils.ui.UIAnimationUtils.startPulseAnimation(tvBadgeNext);
                } else if (isPast) {
                    tvBadgeNext.setVisibility(View.VISIBLE);
                    tvBadgeNext.setText(R.string.estado_finalizado);
                    tvBadgeNext.setBackgroundResource(R.drawable.bg_badge_inactive);
                } else {
                    tvBadgeNext.setVisibility(View.GONE);
                }
            }

            // Opacidad de la tarjeta si ya pasó
            itemView.setAlpha(isPast ? 0.6f : 1.0f);
        }
    }
}

package com.chopcode.rutago.app.adapters.routes;

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

/**
 * Route Adapter
 *
 * Controlador de renderizado para la agenda operativa del conductor.
 * Responsabilidades:
 * - Visualizar el catálogo de trayectos asignados para la jornada actual.
 * - Implementar lógica de "Próxima Ruta": identifica y resalta el trayecto inminente según el reloj del sistema.
 * - Gestionar el estado de "Ruta Finalizada": aplica efectos de opacidad y bloquea la navegación para turnos vencidos.
 * - Formatear dinámicamente precios y horarios integrando animaciones de telemetría.
 * - Proveer feedback visual mediante Badges (Siguiente, Finalizado) para facilitar la toma de decisiones del operador.
 */
public class RouteAdapter extends RecyclerView.Adapter<RouteAdapter.RouteViewHolder> {

    private static final String TAG = "RouteAdapter";

    private List<Route> routeList;
    private OnRutaClickListener listener;
    private int nextRouteIndex = -1;

    /** Interfaz para delegar la gestión del despacho hacia la actividad de administración de asientos. */
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

        // Bloqueo preventivo: No se puede gestionar una ruta cuyo horario ya expiró.
        boolean isPast = false;
        if (route.getTime() != null && route.getTime().getTime() != null) {
            isPast = FormatUtils.esHorarioPasado(route.getTime().getTime());
        }

        final boolean finalIsPast = isPast;
        holder.itemView.setOnClickListener(v -> {
            if (finalIsPast) {
                android.widget.Toast.makeText(v.getContext(), R.string.ruta_finalizada_gestion_error, android.widget.Toast.LENGTH_SHORT).show();
                return;
            }
            if (listener != null) listener.onRutaClick(route);
        });
    }

    @Override
    public int getItemCount() {
        return routeList != null ? routeList.size() : 0;
    }

    /**
     * Refresca la planilla y recalcula el enfoque operativo del conductor.
     */
    public void actualizarRutas(List<Route> newRoutes) {
        this.routeList = newRoutes;
        calcularIndiceSiguienteRuta();
        notifyDataSetChanged();
    }

    /**
     * Algoritmo de priorización: localiza la primera ruta del listado que aún no ha pasado.
     */
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
        
        if (nextRouteIndex == -1 && !routeList.isEmpty()) {
            nextRouteIndex = 0; // Reset para jornada de mañana.
        }
    }

    /**
     * ViewHolder especializado en la tarjeta de despacho.
     */
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

        /**
         * Enlaza el modelo Route y aplica la semántica visual de "Siguiente" o "Vencido".
         */
        public void bind(Route route, boolean isNext) {
            tvOrigin.setText(route.getOrigin() != null ? route.getOrigin() : "N/A");
            tvDestination.setText(route.getDestination() != null ? route.getDestination() : "N/A");
            
            String timeStr = "--:--";
            boolean isPast = false;
            if (route.getTime() != null && route.getTime().getTime() != null) {
                timeStr = route.getTime().getTime();
                isPast = FormatUtils.esHorarioPasado(timeStr);
            }
            tvTime.setText(timeStr);

            if (tvPrice != null) {
                tvPrice.setTextColor(itemView.getContext().getColor(R.color.primary_500));
                com.chopcode.rutago.app.utils.ui.UIAnimationUtils.animateCurrencyText(tvPrice, 0, route.getFare());
            }

            // Gestión de indicadores dinámicos con latidos visuales para "Siguiente"
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

            // Opacidad de lectura para rutas ya completadas.
            itemView.setAlpha(isPast ? 0.6f : 1.0f);
        }
    }
}

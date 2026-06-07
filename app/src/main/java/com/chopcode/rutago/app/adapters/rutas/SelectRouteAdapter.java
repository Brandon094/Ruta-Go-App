package com.chopcode.rutago.app.adapters.rutas;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.models.Ruta;
import java.util.List;

public class SelectRouteAdapter extends RecyclerView.Adapter<SelectRouteAdapter.ViewHolder> {

    private final List<Ruta> rutas;
    private final OnRouteClickListener listener;

    public interface OnRouteClickListener {
        void onRouteClick(Ruta ruta);
    }

    public SelectRouteAdapter(List<Ruta> rutas, OnRouteClickListener listener) {
        this.rutas = rutas;
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
        Ruta ruta = rutas.get(position);
        holder.tvName.setText(ruta.getOrigen() + " → " + ruta.getDestino());
        String hora = (ruta.getHora() != null) ? ruta.getHora().getHora() : "--:--";
        holder.tvTime.setText(hora);
        
        holder.itemView.setOnClickListener(v -> {
            if (listener != null) listener.onRouteClick(ruta);
        });
    }

    @Override
    public int getItemCount() {
        return rutas.size();
    }

    static class ViewHolder extends RecyclerView.ViewHolder {
        TextView tvName, tvTime;

        ViewHolder(View view) {
            super(view);
            tvName = view.findViewById(R.id.tvRouteName);
            tvTime = view.findViewById(R.id.tvRouteTime);
        }
    }
}

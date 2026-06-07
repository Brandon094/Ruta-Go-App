package com.chopcode.trasnportenataga_laplata.adapters.historial;

import android.graphics.Color;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.chopcode.trasnportenataga_laplata.R;
import com.chopcode.trasnportenataga_laplata.models.Reserva;
import com.google.android.material.button.MaterialButton;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;

public class HistorialConductorAdapter extends RecyclerView.Adapter<HistorialConductorAdapter.ReservaViewHolder> {

    private static final String TAG = "HistorialConductorAdapter";
    private List<Reserva> listaReservas;

    public HistorialConductorAdapter(List<Reserva> listaReservas) {
        this.listaReservas = listaReservas != null ? listaReservas : new ArrayList<>();
        Log.d(TAG, "Constructor - Reservas: " + this.listaReservas.size());
    }

    @NonNull
    @Override
    public ReservaViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item_historial_general, parent, false);
        return new ReservaViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ReservaViewHolder holder, int position) {
        if (position < listaReservas.size()) {
            Reserva reserva = listaReservas.get(position);
            holder.bind(reserva);
        }
    }

    @Override
    public int getItemCount() {
        return listaReservas.size();
    }

    public void actualizarLista(List<Reserva> nuevaLista) {
        this.listaReservas = nuevaLista != null ? nuevaLista : new ArrayList<>();
        notifyDataSetChanged();
    }

    static class ReservaViewHolder extends RecyclerView.ViewHolder {
        private final TextView tvFecha, tvEstado, tvNombrePersona, tvTelefono, tvRuta, tvPuesto, tvPrecio;
        private final LinearLayout layoutAcciones;
        private final SimpleDateFormat sdf = new SimpleDateFormat("dd MMM yyyy - HH:mm", new Locale("es", "ES"));

        public ReservaViewHolder(@NonNull View itemView) {
            super(itemView);
            tvFecha = itemView.findViewById(R.id.tvFecha);
            tvEstado = itemView.findViewById(R.id.tvEstado);
            tvNombrePersona = itemView.findViewById(R.id.tvNombrePersona);
            tvTelefono = itemView.findViewById(R.id.tvTelefono);
            tvRuta = itemView.findViewById(R.id.tvRuta);
            tvPuesto = itemView.findViewById(R.id.tvPuesto);
            tvPrecio = itemView.findViewById(R.id.tvPrecio);
            layoutAcciones = itemView.findViewById(R.id.layoutAcciones);
        }

        public void bind(Reserva reserva) {
            try {
                tvFecha.setText(sdf.format(new Date(reserva.getFechaReserva())));
                
                String estado = reserva.getEstadoReserva();
                tvEstado.setText(estado);
                tvEstado.setTextColor(getColorEstado(estado));

                tvNombrePersona.setText(reserva.getNombre());
                tvTelefono.setText(reserva.getTelefono());
                tvRuta.setText(reserva.getOrigen() + " -> " + reserva.getDestino());
                tvPuesto.setText("Puesto " + reserva.getPuestoReservado());
                tvPrecio.setText(String.format("$%,.0f", reserva.getPrecio()));

                // El historial es solo para visualización, no se permiten acciones
                layoutAcciones.setVisibility(View.GONE);

            } catch (Exception e) {
                Log.e(TAG, "Error bind: " + e.getMessage());
            }
        }

        private int getColorEstado(String estado) {
            if (estado == null) return Color.GRAY;
            switch (estado.toLowerCase()) {
                case "confirmada": return Color.parseColor("#1F8F3C");
                case "cancelada": return Color.parseColor("#EF4444");
                default: return Color.parseColor("#F59E0B");
            }
        }
    }
}

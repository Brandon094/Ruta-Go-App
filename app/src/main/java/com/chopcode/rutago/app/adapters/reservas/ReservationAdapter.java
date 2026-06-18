package com.chopcode.rutago.app.adapters.reservas;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.models.Reservation;
import com.chopcode.rutago.app.utils.ui.FormatUtils;
import com.google.android.material.button.MaterialButton;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

public class ReservationAdapter extends RecyclerView.Adapter<ReservationAdapter.ReservationViewHolder> {

    private static final String TAG = "ReservationAdapter";
    private List<Reservation> reservations;
    private OnReservaClickListener listener;

    public interface OnReservaClickListener {
        void onConfirmarClick(Reservation reservation);
        void onCancelarClick(Reservation reservation);
    }

    public ReservationAdapter(List<Reservation> reservations, OnReservaClickListener listener) {
        this.reservations = reservations;
        this.listener = listener;
    }

    @NonNull
    @Override
    public ReservationViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_reserva, parent, false);
        return new ReservationViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ReservationViewHolder holder, int position) {
        if (reservations != null && position < reservations.size()) {
            holder.bind(reservations.get(position), listener);
        }
    }

    @Override
    public int getItemCount() {
        return reservations != null ? reservations.size() : 0;
    }

    public void actualizarReservas(List<Reservation> newReservations) {
        this.reservations = newReservations;
        notifyDataSetChanged();
    }

    static class ReservationViewHolder extends RecyclerView.ViewHolder {
        private TextView tvNombre, tvTelefono, tvOrigenDestino, tvFechaHora, tvAsiento, tvEstado;
        private MaterialButton btnConfirmar, btnCancelar;
        private final SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm", Locale.getDefault());

        public ReservationViewHolder(@NonNull View itemView) {
            super(itemView);
            tvNombre = itemView.findViewById(R.id.tvNombrePasajero);
            tvTelefono = itemView.findViewById(R.id.tvTelefono);
            tvOrigenDestino = itemView.findViewById(R.id.tvOrigenDestino);
            tvFechaHora = itemView.findViewById(R.id.tvFechaHora);
            tvAsiento = itemView.findViewById(R.id.tvAsiento);
            tvEstado = itemView.findViewById(R.id.tvEstado);
            btnConfirmar = itemView.findViewById(R.id.btnConfirmar);
            btnCancelar = itemView.findViewById(R.id.btnCancelar);
        }

        public void bind(Reservation reservation, OnReservaClickListener listener) {
            try {
                // Nombre
                String nombre = reservation.getName();
                tvNombre.setText(nombre != null ? nombre : itemView.getContext().getString(R.string.no_disponible));

                // Teléfono
                String telefono = reservation.getPhone();
                tvTelefono.setText(telefono != null ? telefono : itemView.getContext().getString(R.string.no_disponible));

                // Origen y Destino
                if (reservation.getOrigin() != null && reservation.getDestination() != null) {
                    tvOrigenDestino.setText(reservation.getOrigin() + " -> " + reservation.getDestination());
                } else {
                    tvOrigenDestino.setText(itemView.getContext().getString(R.string.no_disponible));
                }

                // Asiento
                int seat = reservation.getReservedSeat();
                tvAsiento.setText(seat > 0 ? FormatUtils.formatearAsiento(seat) : itemView.getContext().getString(R.string.no_disponible));

                // Fecha y Hora
                if (reservation.getReservationDate() > 0) {
                    tvFechaHora.setText(sdf.format(new Date(reservation.getReservationDate())));
                } else {
                    tvFechaHora.setText(itemView.getContext().getString(R.string.no_disponible));
                }

                // Estado y Botones
                String status = reservation.getReservationStatus();
                if (status != null) {
                    tvEstado.setText(status);
                    
                    // Reset visibilities for recycling
                    btnConfirmar.setVisibility(View.GONE);
                    btnCancelar.setVisibility(View.GONE);

                    switch (status.toLowerCase()) {
                        case "por confirmar":
                        case "pendiente":
                            tvEstado.setBackgroundResource(R.drawable.bg_estado_pendiente);
                            tvEstado.setTextColor(itemView.getContext().getColor(R.color.status_pending));
                            btnConfirmar.setVisibility(View.VISIBLE);
                            btnCancelar.setVisibility(View.VISIBLE);
                            break;
                        case "confirmada":
                            tvEstado.setBackgroundResource(R.drawable.bg_estado_confirmado);
                            tvEstado.setTextColor(itemView.getContext().getColor(R.color.status_confirmed));
                            break;
                        case "cancelada":
                            tvEstado.setBackgroundResource(R.drawable.bg_estado_cancelado);
                            tvEstado.setTextColor(itemView.getContext().getColor(R.color.status_cancelled));
                            break;
                        default:
                            tvEstado.setBackgroundResource(R.drawable.bg_badge_status);
                            tvEstado.setTextColor(itemView.getContext().getColor(R.color.white));
                            break;
                    }
                }

                btnConfirmar.setOnClickListener(v -> {
                    if (listener != null) listener.onConfirmarClick(reservation);
                });

                btnCancelar.setOnClickListener(v -> {
                    if (listener != null) listener.onCancelarClick(reservation);
                });

            } catch (Exception e) {
                Log.e(TAG, "Error bind: " + e.getMessage());
            }
        }
    }
}

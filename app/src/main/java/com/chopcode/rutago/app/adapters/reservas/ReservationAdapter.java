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
            tvNombre.setText(reservation.getName() != null ? reservation.getName() : "N/A");
            tvTelefono.setText(reservation.getPhone() != null ? "📞 " + reservation.getPhone() : "📞 N/A");

            if (reservation.getOrigin() != null && reservation.getDestination() != null) {
                tvOrigenDestino.setText("📍 " + reservation.getOrigin() + " → " + reservation.getDestination());
            }

            int seat = reservation.getReservedSeat();
            tvAsiento.setText(seat > 0 ? "💺 Seat " + seat : "💺 Not assigned");

            if (reservation.getReservationDate() > 0) {
                SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm", Locale.getDefault());
                tvFechaHora.setText("🕒 " + sdf.format(new Date(reservation.getReservationDate())));
            }

            if (reservation.getReservationStatus() != null) {
                tvEstado.setText(reservation.getReservationStatus());
                switch (reservation.getReservationStatus()) {
                    case "Por confirmar":
                        tvEstado.setBackgroundResource(R.drawable.bg_estado_pendiente);
                        btnConfirmar.setVisibility(View.VISIBLE);
                        btnCancelar.setVisibility(View.VISIBLE);
                        break;
                    case "Confirmada":
                        tvEstado.setBackgroundResource(R.drawable.bg_estado_confirmado);
                        btnConfirmar.setVisibility(View.GONE);
                        btnCancelar.setVisibility(View.GONE);
                        break;
                    case "Cancelada":
                        tvEstado.setBackgroundResource(R.drawable.bg_estado_cancelado);
                        btnConfirmar.setVisibility(View.GONE);
                        btnCancelar.setVisibility(View.GONE);
                        break;
                }
            }

            btnConfirmar.setOnClickListener(v -> {
                if (listener != null) listener.onConfirmarClick(reservation);
            });

            btnCancelar.setOnClickListener(v -> {
                if (listener != null) listener.onCancelarClick(reservation);
            });
        }
    }
}

package com.chopcode.rutago.app.adapters.historial;

import android.graphics.Color;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.content.Intent;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.activities.common.TicketActivity;
import com.chopcode.rutago.app.models.Reservation;
import com.chopcode.rutago.app.utils.ui.FormatUtils;
import com.google.android.material.button.MaterialButton;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;

public class DriverHistoryAdapter extends RecyclerView.Adapter<DriverHistoryAdapter.ReservationViewHolder> {

    private static final String TAG = "DriverHistoryAdapter";
    private List<Reservation> reservationList;

    public DriverHistoryAdapter(List<Reservation> reservationList) {
        this.reservationList = reservationList != null ? reservationList : new ArrayList<>();
        Log.d(TAG, "Constructor - Reservations: " + this.reservationList.size());
    }

    @NonNull
    @Override
    public ReservationViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item_historial_general, parent, false);
        return new ReservationViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ReservationViewHolder holder, int position) {
        if (position < reservationList.size()) {
            Reservation reservation = reservationList.get(position);
            holder.bind(reservation);
        }
    }

    @Override
    public int getItemCount() {
        return reservationList.size();
    }

    public void updateList(List<Reservation> newList) {
        this.reservationList = newList != null ? newList : new ArrayList<>();
        notifyDataSetChanged();
    }

    static class ReservationViewHolder extends RecyclerView.ViewHolder {
        private final TextView tvDate, tvStatus, tvPersonName, tvPhone, tvRoute, tvSeat, tvPrice;
        private final LinearLayout actionsLayout;
        private final MaterialButton btnVerTiquete, btnIrAlChat;
        private final SimpleDateFormat sdf = new SimpleDateFormat("dd MMM yyyy - HH:mm", new Locale("es", "ES"));

        public ReservationViewHolder(@NonNull View itemView) {
            super(itemView);
            tvDate = itemView.findViewById(R.id.tvFecha);
            tvStatus = itemView.findViewById(R.id.tvEstado);
            tvPersonName = itemView.findViewById(R.id.tvNombrePersona);
            tvPhone = itemView.findViewById(R.id.tvTelefono);
            tvRoute = itemView.findViewById(R.id.tvRuta);
            tvSeat = itemView.findViewById(R.id.tvPuesto);
            tvPrice = itemView.findViewById(R.id.tvPrecio);
            actionsLayout = itemView.findViewById(R.id.layoutAcciones);
            btnVerTiquete = itemView.findViewById(R.id.btnVerTiquete);
            btnIrAlChat = itemView.findViewById(R.id.btnIrAlChat);
        }

        public void bind(Reservation reservation) {
            try {
                String status = reservation.getReservationStatus();
                boolean isConfirmed = "Confirmada".equalsIgnoreCase(status) || "Completada".equalsIgnoreCase(status);

                // Configurar clics
                View.OnClickListener openTicket = v -> {
                    Intent intent = new Intent(itemView.getContext(), TicketActivity.class);
                    intent.putExtra("origin", reservation.getOrigin());
                    intent.putExtra("destination", reservation.getDestination());
                    intent.putExtra("status", reservation.getReservationStatus());
                    intent.putExtra("date", reservation.getReservationDate());
                    intent.putExtra("time", reservation.getEstimatedTime());
                    intent.putExtra("seat", reservation.getReservedSeat());
                    intent.putExtra("price", reservation.getPrice());
                    intent.putExtra("passengerName", reservation.getName());
                    intent.putExtra("driverName", reservation.getDriver());
                    intent.putExtra("userId", reservation.getUserId());
                    intent.putExtra("driverId", reservation.getDriverId());
                    intent.putExtra("vehiclePlate", reservation.getVehicleId());
                    intent.putExtra("vehicleModel", reservation.getVehicleModel());
                    intent.putExtra("reservationId", reservation.getIdReservation());
                    itemView.getContext().startActivity(intent);
                };

                itemView.setOnClickListener(openTicket);
                btnVerTiquete.setOnClickListener(openTicket);

                btnIrAlChat.setOnClickListener(v -> {
                    Intent intent = new Intent(itemView.getContext(), com.chopcode.rutago.app.activities.common.ChatActivity.class);
                    intent.putExtra("reservationId", reservation.getIdReservation());
                    itemView.getContext().startActivity(intent);
                });

                tvDate.setText(sdf.format(new Date(reservation.getReservationDate())));
                tvStatus.setText(status);
                tvStatus.setTextColor(getStatusColor(status));

                tvPersonName.setText(reservation.getName());
                tvPhone.setText(reservation.getPhone());
                tvRoute.setText(reservation.getOrigin() + " -> " + reservation.getDestination());
                tvSeat.setText(FormatUtils.formatearAsiento(reservation.getReservedSeat()));
                tvPrice.setText(FormatUtils.formatearPrecio(reservation.getPrice()));

                // Mostrar acciones
                actionsLayout.setVisibility(View.VISIBLE);
                btnIrAlChat.setVisibility(isConfirmed ? View.VISIBLE : View.GONE);

            } catch (Exception e) {
                Log.e(TAG, "Error bind: " + e.getMessage());
            }
        }

        private int getStatusColor(String status) {
            if (status == null) return Color.GRAY;
            switch (status.toLowerCase()) {
                case "confirmada": return Color.parseColor("#1F8F3C");
                case "cancelada": return Color.parseColor("#EF4444");
                default: return Color.parseColor("#F59E0B");
            }
        }
    }
}

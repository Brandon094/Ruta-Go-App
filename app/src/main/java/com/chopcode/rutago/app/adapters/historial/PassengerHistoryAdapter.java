package com.chopcode.rutago.app.adapters.historial;

import android.content.Intent;
import android.graphics.Color;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RatingBar;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.activities.common.TicketActivity;
import com.chopcode.rutago.app.managers.ratings.RatingManager;
import com.chopcode.rutago.app.models.Reservation;
import com.chopcode.rutago.app.utils.ui.FormatUtils;
import com.google.android.material.button.MaterialButton;
import com.google.android.material.dialog.MaterialAlertDialogBuilder;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;

public class PassengerHistoryAdapter extends RecyclerView.Adapter<PassengerHistoryAdapter.ViewHolder> {

    private List<Reservation> reservations;
    private final SimpleDateFormat sdf = new SimpleDateFormat("dd MMM yyyy - HH:mm", new Locale("en", "US"));

    public PassengerHistoryAdapter(List<Reservation> reservations) {
        this.reservations = reservations != null ? reservations : new ArrayList<>();
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_historial_general, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        holder.bind(reservations.get(position));
    }

    @Override
    public int getItemCount() { return reservations.size(); }

    public void actualizarDatos(List<Reservation> newReservations) {
        this.reservations = newReservations != null ? newReservations : new ArrayList<>();
        notifyDataSetChanged();
    }

    class ViewHolder extends RecyclerView.ViewHolder {
        private final TextView tvFecha, tvEstado, tvNombrePersona, tvTelefono, tvRuta, tvPuesto, tvPrecio;
        private final ImageView ivPersonaIcon;
        private final LinearLayout layoutAcciones;
        private final MaterialButton btnAccionPrincipal, btnVerTiquete, btnIrAlChat;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            tvFecha = itemView.findViewById(R.id.tvFecha);
            tvEstado = itemView.findViewById(R.id.tvEstado);
            tvNombrePersona = itemView.findViewById(R.id.tvNombrePersona);
            tvTelefono = itemView.findViewById(R.id.tvTelefono);
            tvRuta = itemView.findViewById(R.id.tvRuta);
            tvPuesto = itemView.findViewById(R.id.tvPuesto);
            tvPrecio = itemView.findViewById(R.id.tvPrecio);
            ivPersonaIcon = itemView.findViewById(R.id.ivPersonaIcon);
            layoutAcciones = itemView.findViewById(R.id.layoutAcciones);
            btnAccionPrincipal = itemView.findViewById(R.id.btnAccionPrincipal);
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

                tvFecha.setText(sdf.format(new Date(reservation.getReservationDate())));
                tvEstado.setText(status);
                tvEstado.setTextColor(getColorStatus(status));
                tvNombrePersona.setText(reservation.getDriver());
                if (ivPersonaIcon != null) ivPersonaIcon.setImageResource(R.drawable.ic_driver);
                tvTelefono.setText(reservation.getPhoneC());
                String routeDesc = reservation.getRouteName();
                if (routeDesc == null || routeDesc.isEmpty()) routeDesc = reservation.getOrigin() + " -> " + reservation.getDestination();
                tvRuta.setText(routeDesc);
                tvPuesto.setText(FormatUtils.formatearAsiento(reservation.getReservedSeat()));
                tvPrecio.setText(FormatUtils.formatearPrecio(reservation.getPrice()));

                // Mostrar/Ocultar sección de acciones
                layoutAcciones.setVisibility(View.VISIBLE);
                btnIrAlChat.setVisibility(isConfirmed ? View.VISIBLE : View.GONE);
                
                boolean canRate = isConfirmed && !reservation.isRated();
                if (canRate) {
                    btnAccionPrincipal.setVisibility(View.VISIBLE);
                    btnAccionPrincipal.setText(itemView.getContext().getString(R.string.calificar_viaje_btn));
                    btnAccionPrincipal.setOnClickListener(v -> showRatingDialog(reservation));
                } else {
                    btnAccionPrincipal.setVisibility(View.GONE);
                }
            } catch (Exception e) { Log.e("PassengerHistory", "Error bind: " + e.getMessage()); }
        }

        private void showRatingDialog(Reservation reservation) {
            View dialogView = LayoutInflater.from(itemView.getContext()).inflate(R.layout.dialog_calificar_viaje, null);
            TextView tvInfoConductor = dialogView.findViewById(R.id.tvInfoConductor);
            RatingBar ratingBar = dialogView.findViewById(R.id.ratingBarDialog);
            EditText etComments = dialogView.findViewById(R.id.etComentarios);
            if (tvInfoConductor != null) tvInfoConductor.setText(itemView.getContext().getString(R.string.conductor_label, reservation.getDriver()));

            new MaterialAlertDialogBuilder(itemView.getContext(), R.style.AppDialogTheme)
                .setView(dialogView)
                .setPositiveButton(R.string.enviar_calificacion, (dialog, which) -> {
                    float rating = ratingBar.getRating();
                    if (rating > 0) saveRating(reservation, rating, etComments.getText().toString().trim());
                    else Toast.makeText(itemView.getContext(), R.string.seleccione_puntuacion, Toast.LENGTH_SHORT).show();
                })
                .setNegativeButton(R.string.cancelar, null).show();
        }

        private void saveRating(Reservation reservation, float rating, String comment) {
            RatingManager.getInstance().calificarViaje(reservation, rating, comment, new RatingManager.RatingCallback() {
                @Override public void onSuccess() { Toast.makeText(itemView.getContext(), R.string.gracias_calificacion, Toast.LENGTH_SHORT).show(); layoutAcciones.setVisibility(View.GONE); }
                @Override public void onError(String error) { Toast.makeText(itemView.getContext(), itemView.getContext().getString(R.string.error_prefijo, error), Toast.LENGTH_SHORT).show(); }
            });
        }

        private int getColorStatus(String status) {
            if (status == null) return Color.GRAY;
            switch (status.toLowerCase()) {
                case "confirmada": return Color.parseColor("#1F8F3C");
                case "cancelada": return Color.parseColor("#EF4444");
                default: return Color.parseColor("#F59E0B");
            }
        }
    }
}

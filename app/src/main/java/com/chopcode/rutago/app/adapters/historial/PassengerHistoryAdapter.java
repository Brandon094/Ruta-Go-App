package com.chopcode.rutago.app.adapters.historial;

import android.content.Intent;
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
    private final SimpleDateFormat sdf = new SimpleDateFormat("dd MMM yyyy - HH:mm", new Locale("es", "ES"));

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
        private final LinearLayout layoutAcciones, layoutCalificacion;
        private final MaterialButton btnAccionPrincipal, btnVerTiquete, btnIrAlChat;
        private final RatingBar ratingBar;

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
            layoutCalificacion = itemView.findViewById(R.id.layoutCalificacion);
            btnAccionPrincipal = itemView.findViewById(R.id.btnAccionPrincipal);
            btnVerTiquete = itemView.findViewById(R.id.btnVerTiquete);
            btnIrAlChat = itemView.findViewById(R.id.btnIrAlChat);
            ratingBar = itemView.findViewById(R.id.ratingBar);
        }

        public void bind(Reservation reservation) {
            try {
                String status = reservation.getReservationStatus();
                boolean isConfirmed = "Confirmada".equalsIgnoreCase(status) || "Completada".equalsIgnoreCase(status);
                boolean isRated = reservation.isRated();

                // ... (previous logic for openTicket and chat)
                View.OnClickListener openTicket = v -> {
                    // ... (no changes here)
                    Intent intent = new Intent(itemView.getContext(), TicketActivity.class);
                    intent.putExtra("origin", reservation.getOrigin());
                    intent.putExtra("destination", reservation.getDestination());
                    intent.putExtra("status", reservation.getReservationStatus());
                    intent.putExtra("date", reservation.getReservationDate());
                    
                    String depTime = reservation.getDepartureTime();
                    if (depTime == null || depTime.isEmpty() || depTime.contains("min")) {
                        depTime = reservation.getEstimatedTime();
                    }
                    
                    intent.putExtra("time", depTime);
                    intent.putExtra("duration", reservation.getEstimatedTime().contains("min") ? 
                            reservation.getEstimatedTime() : 
                            FormatUtils.calcularTiempoEstimado(reservation.getOrigin() + " -> " + reservation.getDestination()));

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

                btnVerTiquete.setOnClickListener(openTicket);

                btnIrAlChat.setOnClickListener(v -> {
                    Intent intent = new Intent(itemView.getContext(), com.chopcode.rutago.app.activities.common.ChatActivity.class);
                    intent.putExtra("reservationId", reservation.getIdReservation());
                    intent.putExtra("receiverId", reservation.getDriverId());
                    intent.putExtra("senderName", reservation.getName());
                    itemView.getContext().startActivity(intent);
                });

                tvFecha.setText(sdf.format(new Date(reservation.getReservationDate())));
                tvEstado.setText(status);
                
                // Aplicar Estilo Unificado de Estado
                if (status != null) {
                    switch (status.toLowerCase()) {
                        case "confirmada":
                        case "completada":
                            tvEstado.setBackgroundResource(R.drawable.bg_estado_confirmado);
                            tvEstado.setTextColor(itemView.getContext().getColor(R.color.status_confirmed));
                            break;
                        case "cancelada":
                            tvEstado.setBackgroundResource(R.drawable.bg_estado_cancelado);
                            tvEstado.setTextColor(itemView.getContext().getColor(R.color.status_cancelled));
                            break;
                        default:
                            tvEstado.setBackgroundResource(R.drawable.bg_estado_pendiente);
                            tvEstado.setTextColor(itemView.getContext().getColor(R.color.status_pending));
                            break;
                    }
                }

                tvNombrePersona.setText(reservation.getDriver() != null ? reservation.getDriver() : itemView.getContext().getString(R.string.no_disponible));
                if (ivPersonaIcon != null) ivPersonaIcon.setImageResource(R.drawable.ic_driver);
                
                String phone = reservation.getPhoneC();
                tvTelefono.setText(phone != null ? phone : itemView.getContext().getString(R.string.no_disponible));
                
                String routeDesc = reservation.getRouteName();
                if (routeDesc == null || routeDesc.isEmpty()) {
                    if (reservation.getOrigin() != null && reservation.getDestination() != null) {
                        routeDesc = reservation.getOrigin() + " -> " + reservation.getDestination();
                    } else {
                        routeDesc = itemView.getContext().getString(R.string.no_disponible);
                    }
                }
                tvRuta.setText(routeDesc);
                
                tvPuesto.setText(FormatUtils.formatearAsiento(reservation.getReservedSeat()));
                
                // Animación de precio en el historial con color de la marca
                tvPrecio.setTextColor(itemView.getContext().getColor(R.color.primary_500));
                com.chopcode.rutago.app.utils.ui.UIAnimationUtils.animateCurrencyText(tvPrecio, 0, reservation.getPrice());

                // Mostrar/Ocultar sección de acciones
                layoutAcciones.setVisibility(View.VISIBLE);
                btnIrAlChat.setVisibility(isConfirmed ? View.VISIBLE : View.GONE);
                
                boolean canRate = isConfirmed && !isRated;
                if (canRate) {
                    btnAccionPrincipal.setVisibility(View.VISIBLE);
                    btnAccionPrincipal.setText(itemView.getContext().getString(R.string.calificar_viaje_btn));
                    btnAccionPrincipal.setOnClickListener(v -> showRatingDialog(reservation));
                } else {
                    btnAccionPrincipal.setVisibility(View.GONE);
                }

                // 🔥 Mostrar calificación si ya existe
                if (isRated && layoutCalificacion != null && ratingBar != null) {
                    layoutCalificacion.setVisibility(View.VISIBLE);
                    ratingBar.setRating(reservation.getRating());
                } else if (layoutCalificacion != null) {
                    layoutCalificacion.setVisibility(View.GONE);
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
                @Override public void onSuccess() { 
                    Toast.makeText(itemView.getContext(), R.string.gracias_calificacion, Toast.LENGTH_SHORT).show(); 
                    reservation.setRated(true);
                    reservation.setRating(rating);
                    notifyItemChanged(getAdapterPosition());
                }
                @Override public void onError(String error) { Toast.makeText(itemView.getContext(), itemView.getContext().getString(R.string.error_prefijo, error), Toast.LENGTH_SHORT).show(); }
            });
        }


    }
}

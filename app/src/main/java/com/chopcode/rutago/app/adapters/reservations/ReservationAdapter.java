package com.chopcode.rutago.app.adapters.reservations;

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

/**
 * Reservation Adapter
 *
 * Controlador de renderizado para la gestión operativa de tiquetes digitales desde la perspectiva del conductor.
 * Responsabilidades:
 * - Visualizar la lista de pasajeros vinculados a un despacho específico.
 * - Sincronizar el estado visual del badge (Pendiente, Confirmado, Cancelado) con el modelo de datos NoSQL.
 * - Proveer controles interactivos para la validación (Confirmación/Cancelación) de cupos en tiempo real.
 * - Formatear metadatos sensibles (ej: número de teléfono y asiento) para una lectura rápida en campo.
 * - Implementar lógica de reciclaje eficiente para listas de alta densidad de pasajeros.
 */
public class ReservationAdapter extends RecyclerView.Adapter<ReservationAdapter.ReservationViewHolder> {

    private static final String TAG = "ReservationAdapter";
    private List<Reservation> reservations;
    private OnReservaClickListener listener;

    /** Interfaz para la delegación de acciones de control operativo hacia la Activity/ViewModel. */
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

    /**
     * ViewHolder especializado en la ficha técnica del pasajero.
     */
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

        /**
         * Enlaza los datos de la reserva y configura la visibilidad de los controles según el estado.
         */
        public void bind(Reservation reservation, OnReservaClickListener listener) {
            try {
                tvNombre.setText(reservation.getName() != null ? reservation.getName() : "N/A");
                tvTelefono.setText(reservation.getPhone() != null ? reservation.getPhone() : "N/A");

                if (reservation.getOrigin() != null && reservation.getDestination() != null) {
                    tvOrigenDestino.setText(reservation.getOrigin() + " → " + reservation.getDestination());
                }

                int seat = reservation.getReservedSeat();
                tvAsiento.setText(seat > 0 ? FormatUtils.formatearAsiento(seat) : "N/A");

                if (reservation.getReservationDate() > 0) {
                    tvFechaHora.setText(sdf.format(new Date(reservation.getReservationDate())));
                }

                String status = reservation.getReservationStatus();
                if (status != null) {
                    tvEstado.setText(status);
                    
                    // Gestión reactiva de botones: Solo se muestran si la reserva está pendiente.
                    btnConfirmar.setVisibility(View.GONE);
                    btnCancelar.setVisibility(View.GONE);

                    tvEstado.setTextColor(itemView.getContext().getColor(R.color.white));
                    switch (status.toLowerCase()) {
                        case "por confirmar":
                        case "pendiente":
                            tvEstado.setBackgroundResource(R.drawable.bg_estado_pendiente);
                            btnConfirmar.setVisibility(View.VISIBLE);
                            btnCancelar.setVisibility(View.VISIBLE);
                            break;
                        case "confirmada":
                            tvEstado.setBackgroundResource(R.drawable.bg_estado_confirmado);
                            break;
                        case "cancelada":
                            tvEstado.setBackgroundResource(R.drawable.bg_estado_cancelado);
                            break;
                        default:
                            tvEstado.setBackgroundResource(R.drawable.bg_badge_status);
                            break;
                    }
                }

                btnConfirmar.setOnClickListener(v -> { if (listener != null) listener.onConfirmarClick(reservation); });
                btnCancelar.setOnClickListener(v -> { if (listener != null) listener.onCancelarClick(reservation); });

            } catch (Exception e) {
                Log.e(TAG, "❌ Error al enlazar reserva: " + e.getMessage());
            }
        }
    }
}

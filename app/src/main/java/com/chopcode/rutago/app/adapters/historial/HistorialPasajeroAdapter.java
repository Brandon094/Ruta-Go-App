package com.chopcode.rutago.app.adapters.historial;

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
import androidx.appcompat.app.AlertDialog;
import androidx.recyclerview.widget.RecyclerView;

import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.config.MyApp;
import com.chopcode.rutago.app.managers.ratings.RatingManager;
import com.chopcode.rutago.app.models.Reserva;
import com.google.android.material.button.MaterialButton;
import com.google.android.material.dialog.MaterialAlertDialogBuilder;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;

public class HistorialPasajeroAdapter extends RecyclerView.Adapter<HistorialPasajeroAdapter.ViewHolder> {

    private List<Reserva> reservas;
    private final SimpleDateFormat sdf = new SimpleDateFormat("dd MMM yyyy - HH:mm", new Locale("es", "ES"));

    public HistorialPasajeroAdapter(List<Reserva> reservas) {
        this.reservas = reservas != null ? reservas : new ArrayList<>();
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item_historial_general, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        holder.bind(reservas.get(position));
    }

    @Override
    public int getItemCount() {
        return reservas.size();
    }

    public void actualizarDatos(List<Reserva> nuevasReservas) {
        this.reservas = nuevasReservas != null ? nuevasReservas : new ArrayList<>();
        notifyDataSetChanged();
    }

    class ViewHolder extends RecyclerView.ViewHolder {
        private final TextView tvFecha, tvEstado, tvNombrePersona, tvTelefono, tvRuta, tvPuesto, tvPrecio;
        private final ImageView ivPersonaIcon;
        private final LinearLayout layoutAcciones;
        private final MaterialButton btnAccionPrincipal;

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
        }

        public void bind(Reserva reserva) {
            try {
                tvFecha.setText(sdf.format(new Date(reserva.getFechaReserva())));
                
                String estado = reserva.getEstadoReserva();
                tvEstado.setText(estado);
                tvEstado.setTextColor(getColorEstado(estado));

                tvNombrePersona.setText(reserva.getConductor());
                if (ivPersonaIcon != null) ivPersonaIcon.setImageResource(R.drawable.ic_driver);
                
                tvTelefono.setText(reserva.getTelefonoC());

                // ✅ MEJORADO: Fallback si nombreRuta está vacío
                String rutaDesc = reserva.getNombreRuta();
                if (rutaDesc == null || rutaDesc.trim().isEmpty()) {
                    rutaDesc = reserva.getOrigen() + " -> " + reserva.getDestino();
                }
                tvRuta.setText(rutaDesc);

                tvPuesto.setText("Puesto " + reserva.getPuestoReservado());
                tvPrecio.setText(String.format("$%,.0f", reserva.getPrecio()));

                // ✅ MEJORADO: Mostrar calificar solo si está Confirmada/Completada Y NO ha sido calificada
                boolean puedeCalificar = ("Confirmada".equalsIgnoreCase(estado) || "Completada".equalsIgnoreCase(estado)) 
                                        && !reserva.isCalificada();

                if (puedeCalificar) {
                    layoutAcciones.setVisibility(View.VISIBLE);
                    btnAccionPrincipal.setVisibility(View.VISIBLE);
                    btnAccionPrincipal.setText("Calificar Viaje");
                    btnAccionPrincipal.setOnClickListener(v -> mostrarDialogoCalificacion(reserva));
                } else {
                    layoutAcciones.setVisibility(View.GONE);
                }

            } catch (Exception e) {
                Log.e("HistorialPasajero", "Error bind: " + e.getMessage());
            }
        }

        private void mostrarDialogoCalificacion(Reserva reserva) {
            View dialogView = LayoutInflater.from(itemView.getContext()).inflate(R.layout.dialog_calificar_viaje, null);
            TextView tvInfoConductor = dialogView.findViewById(R.id.tvInfoConductor);
            RatingBar ratingBar = dialogView.findViewById(R.id.ratingBarDialog);
            EditText etComentarios = dialogView.findViewById(R.id.etComentarios);

            if (tvInfoConductor != null) {
                tvInfoConductor.setText("Conductor: " + reserva.getConductor());
            }

            new MaterialAlertDialogBuilder(itemView.getContext(), R.style.AppDialogTheme)
                .setView(dialogView)
                .setPositiveButton("Enviar Calificación", (dialog, which) -> {
                    float rating = ratingBar.getRating();
                    String comentario = etComentarios.getText().toString().trim();
                    
                    if (rating > 0) {
                        guardarCalificacion(reserva, rating, comentario);
                    } else {
                        Toast.makeText(itemView.getContext(), "Por favor selecciona una puntuación", Toast.LENGTH_SHORT).show();
                    }
                })
                .setNegativeButton("Cancelar", null)
                .show();
        }

        private void guardarCalificacion(Reserva reserva, float rating, String comentario) {
            Log.d("HistorialPasajero", "⭐ Iniciando calificación vía RatingManager Singleton");

            RatingManager.getInstance().calificarViaje(reserva, rating, comentario, new RatingManager.RatingCallback() {
                @Override
                public void onSuccess() {
                    Toast.makeText(itemView.getContext(), "¡Gracias por tu calificación!", Toast.LENGTH_SHORT).show();
                    // Ocultar el botón después de calificar exitosamente
                    layoutAcciones.setVisibility(View.GONE);
                }

                @Override
                public void onError(String error) {
                    Toast.makeText(itemView.getContext(), "Error al calificar: " + error, Toast.LENGTH_SHORT).show();
                }
            });
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

package com.chopcode.trasnportenataga_laplata.adapters.historial;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import com.chopcode.trasnportenataga_laplata.R;
import com.chopcode.trasnportenataga_laplata.models.Reserva;
import com.google.android.material.button.MaterialButton;
import com.google.android.material.chip.Chip;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

public class HistorialPasajeroAdapter extends RecyclerView.Adapter<HistorialPasajeroAdapter.ViewHolder> {

    private static final String TAG = "HistorialPasajeroAdapter";
    private List<Reserva> reservas;
    private SimpleDateFormat dateFormat = new SimpleDateFormat("dd MMM yyyy - HH:mm", new Locale("es", "ES"));

    public HistorialPasajeroAdapter(List<Reserva> reservas) {
        Log.d(TAG, "Constructor - Inicializando adapter con " +
                (reservas != null ? reservas.size() : "null") + " reservas");
        this.reservas = reservas;

        // Log de las primeras reservas para diagnóstico
        if (reservas != null && !reservas.isEmpty()) {
            Log.i(TAG, "Primeras 3 reservas cargadas:");
            for (int i = 0; i < Math.min(3, reservas.size()); i++) {
                Reserva r = reservas.get(i);
                Log.i(TAG, "  [" + i + "] " + r.getOrigen() + " → " + r.getDestino() +
                        " - " + r.getEstadoReserva() + " - " + formatearFecha(r.getFechaReserva()));
            }
        } else {
            Log.w(TAG, "Lista de reservas inicial está " +
                    (reservas == null ? "NULL" : "VACÍA"));
        }
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        Log.d(TAG, "onCreateViewHolder - viewType: " + viewType);
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item_historial_viaje_usuario, parent, false);
        Log.d(TAG, "View inflado exitosamente para item_historial_viaje_usuario");
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        Log.d(TAG, "onBindViewHolder - Posición: " + position + "/" + (getItemCount() - 1));

        if (position < reservas.size()) {
            Reserva reserva = reservas.get(position);
            Log.d(TAG, "Enlazando reserva: " + reserva.getOrigen() + " → " + reserva.getDestino() +
                    " - Estado: " + reserva.getEstadoReserva() + " - Posición: " + position);
            holder.bind(reserva);
        } else {
            Log.e(TAG, "❌ Índice fuera de rango en onBindViewHolder - posición: " + position +
                    ", tamaño: " + reservas.size());
        }
    }

    @Override
    public int getItemCount() {
        int count = reservas != null ? reservas.size() : 0;
        Log.v(TAG, "getItemCount: " + count);
        return count;
    }

    public void actualizarDatos(List<Reserva> nuevasReservas) {
        Log.i(TAG, "=== ACTUALIZANDO DATOS DEL HISTORIAL ===");
        Log.d(TAG, "actualizarDatos - Nuevas reservas: " +
                (nuevasReservas != null ? nuevasReservas.size() : "null") +
                ", Actual: " + (reservas != null ? reservas.size() : "null"));

        int tamañoAnterior = reservas != null ? reservas.size() : 0;
        this.reservas = nuevasReservas;

        Log.d(TAG, "Datos actualizados - Anterior: " + tamañoAnterior +
                ", Nuevo: " + (reservas != null ? reservas.size() : "null"));

        // Log resumen de las nuevas reservas
        if (reservas != null && !reservas.isEmpty()) {
            Log.i(TAG, "Resumen de reservas actualizadas:");
            for (int i = 0; i < Math.min(3, reservas.size()); i++) {
                Reserva r = reservas.get(i);
                Log.i(TAG, "  [" + i + "] " + r.getOrigen() + " → " + r.getDestino() +
                        " - " + r.getEstadoReserva());
            }
            if (reservas.size() > 3) {
                Log.i(TAG, "  ... y " + (reservas.size() - 3) + " más");
            }
        } else {
            Log.w(TAG, "⚠️ Lista de reservas actualizada está " +
                    (reservas == null ? "NULL" : "VACÍA"));
        }

        Log.d(TAG, "Notificando cambio de dataset");
        notifyDataSetChanged();
        Log.i(TAG, "=== ACTUALIZACIÓN COMPLETADA ===");
    }

    // Método para diagnóstico del estado del adapter
    public void logEstadoCompleto() {
        Log.i(TAG, "=== DIAGNÓSTICO HISTORIAL ADAPTER ===");
        Log.d(TAG, "Total reservas: " + (reservas != null ? reservas.size() : "null"));

        if (reservas != null) {
            for (int i = 0; i < reservas.size(); i++) {
                Reserva r = reservas.get(i);
                Log.d(TAG, String.format("Reserva [%d]: %s → %s - %s - %s",
                        i, r.getOrigen(), r.getDestino(), r.getEstadoReserva(),
                        formatearFecha(r.getFechaReserva())));
            }
        }
        Log.i(TAG, "====================================");
    }

    private String formatearFecha(long timestamp) {
        try {
            return dateFormat.format(new Date(timestamp));
        } catch (Exception e) {
            return "Fecha no disponible";
        }
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        private static final String TAG = "HistorialViewHolder";
        private TextView tvFecha, tvRuta, tvConductor, tvAsientos, tvPrecioTotal, tvMetodoPago;
        private Chip chipEstado;
        private MaterialButton btnCalificar;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            Log.d(TAG, "ViewHolder creado para posición: " + getAdapterPosition());

            // Inicializar vistas
            tvFecha = itemView.findViewById(R.id.tvFecha);
            tvRuta = itemView.findViewById(R.id.tvRuta);
            tvConductor = itemView.findViewById(R.id.tvConductor);
            tvAsientos = itemView.findViewById(R.id.tvAsientos);
            tvPrecioTotal = itemView.findViewById(R.id.tvPrecioTotal);
            tvMetodoPago = itemView.findViewById(R.id.tvMetodoPago);
            chipEstado = itemView.findViewById(R.id.chipEstado);
            btnCalificar = itemView.findViewById(R.id.btnCalificar);

            // Verificar que todas las vistas se encontraron
            int vistasEncontradas = 0;
            int vistasFaltantes = 0;

            if (tvFecha != null) vistasEncontradas++; else { Log.e(TAG, "❌ tvFecha es null"); vistasFaltantes++; }
            if (tvRuta != null) vistasEncontradas++; else { Log.e(TAG, "❌ tvRuta es null"); vistasFaltantes++; }
            if (tvConductor != null) vistasEncontradas++; else { Log.e(TAG, "❌ tvConductor es null"); vistasFaltantes++; }
            if (tvAsientos != null) vistasEncontradas++; else { Log.e(TAG, "❌ tvAsientos es null"); vistasFaltantes++; }
            if (tvPrecioTotal != null) vistasEncontradas++; else { Log.e(TAG, "❌ tvPrecioTotal es null"); vistasFaltantes++; }
            if (tvMetodoPago != null) vistasEncontradas++; else { Log.e(TAG, "❌ tvMetodoPago es null"); vistasFaltantes++; }
            if (chipEstado != null) vistasEncontradas++; else { Log.e(TAG, "❌ chipEstado es null"); vistasFaltantes++; }
            if (btnCalificar != null) vistasEncontradas++; else { Log.e(TAG, "❌ btnCalificar es null"); vistasFaltantes++; }

            Log.i(TAG, "Vistas inicializadas: " + vistasEncontradas + " OK, " + vistasFaltantes + " FALTANTES");
        }

        public void bind(Reserva reserva) {
            int position = getAdapterPosition();
            Log.d(TAG, "bind iniciado - Posición: " + position +
                    ", Ruta: " + reserva.getOrigen() + " → " + reserva.getDestino() +
                    ", Estado: " + reserva.getEstadoReserva());

            try {
                // Formatear y mostrar datos
                String fechaFormateada = formatearFecha(reserva.getFechaReserva());
                if (tvFecha != null) {
                    tvFecha.setText(fechaFormateada);
                    Log.v(TAG, "Fecha establecida: " + fechaFormateada);
                }

                String rutaTexto = reserva.getOrigen() + " → " + reserva.getDestino();
                if (tvRuta != null) {
                    tvRuta.setText(rutaTexto);
                    Log.v(TAG, "Ruta establecida: " + rutaTexto);
                }

                if (tvConductor != null) {
                    tvConductor.setText(reserva.getConductor());
                    Log.v(TAG, "Conductor establecido: " + reserva.getConductor());
                }

                String asientosTexto = "Puesto " + reserva.getPuestoReservado() + " - " + reserva.getTiempoEstimado();
                if (tvAsientos != null) {
                    tvAsientos.setText(asientosTexto);
                    Log.v(TAG, "Asientos establecidos: " + asientosTexto);
                }

                String precioFormateado = formatearPrecio(reserva.getPrecio());
                if (tvPrecioTotal != null) {
                    tvPrecioTotal.setText(precioFormateado);
                    Log.v(TAG, "Precio establecido: " + precioFormateado);
                }

                if (tvMetodoPago != null) {
                    tvMetodoPago.setText(reserva.getMetodoPago());
                    Log.v(TAG, "Método pago establecido: " + reserva.getMetodoPago());
                }

                // Estado de la reserva
                String estado = reserva.getEstadoReserva();
                if (estado != null) {
                    chipEstado.setText(estado);
                    configurarEstadoChip(estado);
                    Log.v(TAG, "Estado configurado: " + estado);
                } else {
                    Log.w(TAG, "⚠️ Estado de reserva es NULL");
                    chipEstado.setText("Desconocido");
                }

                // Mostrar/ocultar botón de calificar solo para viajes confirmados
                boolean esConfirmado = "confirmado".equalsIgnoreCase(estado) || "Confirmado".equalsIgnoreCase(estado);
                if (btnCalificar != null) {
                    btnCalificar.setVisibility(esConfirmado ? View.VISIBLE : View.GONE);
                    Log.v(TAG, "Botón calificar: " + (esConfirmado ? "VISIBLE" : "OCULTO"));
                }

                // Configurar listeners
                configurarListeners(reserva);

                Log.i(TAG, "bind completado exitosamente para posición: " + position);

            } catch (Exception e) {
                Log.e(TAG, "❌ Error crítico en bind - Posición: " + position +
                        ", Error: " + e.getMessage(), e);
                establecerValoresPorDefecto();
            }
        }

        private String formatearFecha(long timestamp) {
            try {
                Log.v(TAG, "Formateando fecha - timestamp: " + timestamp);
                String fecha = dateFormat.format(new Date(timestamp));
                Log.v(TAG, "Fecha formateada: " + fecha);
                return fecha;
            } catch (Exception e) {
                Log.e(TAG, "Error formateando fecha: " + e.getMessage());
                return "Fecha no disponible";
            }
        }

        private String formatearPrecio(double precio) {
            try {
                Log.v(TAG, "Formateando precio: " + precio);
                String precioFormateado = String.format("$%,.0f", precio);
                Log.v(TAG, "Precio formateado: " + precioFormateado);
                return precioFormateado;
            } catch (Exception e) {
                Log.e(TAG, "Error formateando precio: " + e.getMessage());
                return "$0";
            }
        }

        private void configurarEstadoChip(String estado) {
            try {
                Log.v(TAG, "Configurando chip estado: " + estado);
                int colorFondo, colorTexto;

                switch (estado.toLowerCase()) {
                    case "confirmado":
                    case "confirmada":
                        colorFondo = R.color.success_light;
                        colorTexto = R.color.success;
                        Log.v(TAG, "Estado CONFIRMADO - colores success");
                        break;
                    case "cancelado":
                    case "cancelada":
                        colorFondo = R.color.error_50;
                        colorTexto = R.color.error;
                        Log.v(TAG, "Estado CANCELADO - colores error");
                        break;
                    case "pendiente":
                    case "por confirmar":
                        colorFondo = R.color.warning_50;
                        colorTexto = R.color.warning;
                        Log.v(TAG, "Estado PENDIENTE - colores warning");
                        break;
                    default:
                        colorFondo = R.color.surface;
                        colorTexto = R.color.text_secondary;
                        Log.w(TAG, "Estado DESCONOCIDO: " + estado + " - colores por defecto");
                        break;
                }

                // Aplicar colores
                if (chipEstado != null) {
                    chipEstado.setChipBackgroundColorResource(colorFondo);
                    chipEstado.setTextColor(itemView.getContext().getColor(colorTexto));
                    Log.v(TAG, "Colores aplicados al chip exitosamente");
                }
            } catch (Exception e) {
                Log.e(TAG, "Error configurando estado chip: " + e.getMessage());
            }
        }

        private void configurarListeners(Reserva reserva) {
            int position = getAdapterPosition();

            if (btnCalificar != null) {
                btnCalificar.setOnClickListener(v -> {
                    Log.i(TAG, "⭐ Botón Calificar clickeado - Posición: " + position +
                            ", Ruta: " + reserva.getOrigen() + " → " + reserva.getDestino());
                    calificarViaje(reserva);
                });
            }

            Log.v(TAG, "Listener configurado para el botón de calificar");
        }

        private void calificarViaje(Reserva reserva) {
            Log.d(TAG, "Abriendo diálogo de calificación para: " + reserva.getOrigen() + " → " + reserva.getDestino());
            // Abrir diálogo de calificación
            // Implementar calificación aquí
        }

        private void establecerValoresPorDefecto() {
            Log.w(TAG, "Estableciendo valores por defecto debido a error");
            if (tvFecha != null) tvFecha.setText("Fecha no disponible");
            if (tvRuta != null) tvRuta.setText("Ruta no disponible");
            if (tvConductor != null) tvConductor.setText("Conductor no disponible");
            if (tvAsientos != null) tvAsientos.setText("Asiento no disponible");
            if (tvPrecioTotal != null) tvPrecioTotal.setText("$0");
            if (tvMetodoPago != null) tvMetodoPago.setText("Método no disponible");
            if (chipEstado != null) chipEstado.setText("Error");
        }
    }
}
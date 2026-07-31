package com.chopcode.rutago.app.adapters.schedules;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.models.Schedule;
import com.chopcode.rutago.app.utils.ui.FormatUtils;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import java.util.ArrayList;
import java.util.List;

/**
 * Schedule Adapter
 *
 * Motor de renderizado avanzado para la planilla de horarios de Ruta-Go.
 * Responsabilidades:
 * - Gestionar la visualización reactiva de los turnos de despacho.
 * - Implementar lógica de "Próximo Viaje": identifica y resalta el turno más cercano a la hora actual.
 * - Orquestar animaciones premium: incluye el efecto de "Bus Departure" para turnos finalizados.
 * - Soporte de Vistas Múltiples: integra un Footer informativo sobre la rotación de horarios.
 * - Manejo de Estados Operativos: diferencia visualmente turnos disponibles, agotados, sin conductor y finalizados.
 */
public class ScheduleAdapter extends RecyclerView.Adapter<RecyclerView.ViewHolder> {

    private static final String TAG = "ScheduleAdapter";
    private static final int TYPE_SCHEDULE = 1;
    private static final int TYPE_FOOTER = 2;

    private List<Schedule> schedules;
    private OnReservarClickListener listener;
    private int nextTripIndex = -1;
    private boolean departureAnimationsEnabled = false;

    /** Interfaz para la delegación de la intención de reserva hacia el fragmento/actividad. */
    public interface OnReservarClickListener {
        void onReservarClick(Schedule schedule);
    }

    public ScheduleAdapter(List<Schedule> schedules, OnReservarClickListener listener) {
        this.schedules = (schedules != null) ? new ArrayList<>(schedules) : new ArrayList<>();
        this.listener = listener;
        calcularIndiceSiguienteViaje();
    }

    /**
     * Habilita la ejecución de animaciones de partida tras haber completado el scroll inicial.
     */
    public void enableDepartureAnimations() {
        this.departureAnimationsEnabled = true;
        notifyDataSetChanged();
    }

    @Override
    public int getItemViewType(int position) {
        if (position == schedules.size()) return TYPE_FOOTER;
        return TYPE_SCHEDULE;
    }

    @NonNull
    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        if (viewType == TYPE_FOOTER) {
            View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_footer_reset_info, parent, false);
            return new FooterViewHolder(view);
        }
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_horario, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull RecyclerView.ViewHolder holder, int position) {
        if (holder instanceof ViewHolder) {
            ((ViewHolder) holder).bind(schedules.get(position), position == nextTripIndex, departureAnimationsEnabled, listener);
        }
    }

    @Override
    public int getItemCount() {
        return schedules.isEmpty() ? 0 : schedules.size() + 1;
    }

    /**
     * @return Índice del primer viaje cuya hora es posterior a la actual.
     */
    public int getNextTripIndex() {
        return nextTripIndex;
    }

    /**
     * Actualiza masivamente los datos y recalcula el estado operativo de los turnos.
     */
    public void actualizarHorarios(List<Schedule> newSchedules) {
        this.schedules.clear();
        if (newSchedules != null) {
            this.schedules.addAll(newSchedules);
        }
        this.departureAnimationsEnabled = false; 
        calcularIndiceSiguienteViaje();
        notifyDataSetChanged();
    }

    /**
     * Algoritmo de identificación del próximo servicio activo.
     */
    private void calcularIndiceSiguienteViaje() {
        nextTripIndex = -1;
        if (schedules.isEmpty()) return;

        for (int j = 0; j < schedules.size(); j++) {
            if (!FormatUtils.esHorarioPasado(schedules.get(j).getTime())) {
                nextTripIndex = j;
                break;
            }
        }
        
        if (nextTripIndex == -1 && !schedules.isEmpty()) {
            nextTripIndex = 0; // Si el día acabó, el foco va al primer turno de mañana.
        }
    }

    /**
     * ViewHolder especializado en la representación visual del despacho.
     */
    public static class ViewHolder extends RecyclerView.ViewHolder {
        public TextView tvTime, tvAmPm, tvRoute, tvSeats, tvPrice, tvAvailabilityBadge, tvBadgeNext, tvDriverName;
        public View layoutDriverInfo;
        public com.google.android.material.card.MaterialCardView cardTimeIndicator;
        public FloatingActionButton btnReserve;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            tvTime = itemView.findViewById(R.id.tvHora);
            tvAmPm = itemView.findViewById(R.id.tvAmPm);
            tvRoute = itemView.findViewById(R.id.tvRuta);
            tvSeats = itemView.findViewById(R.id.tvAsientos);
            tvPrice = itemView.findViewById(R.id.tvPrecio);
            tvAvailabilityBadge = itemView.findViewById(R.id.tvEstadoDisponibilidad);
            tvBadgeNext = itemView.findViewById(R.id.tvBadgeProximo);
            tvDriverName = itemView.findViewById(R.id.tvNombreConductor);
            layoutDriverInfo = itemView.findViewById(R.id.layoutConductorInfo);
            cardTimeIndicator = itemView.findViewById(R.id.cardTimeIndicator);
            btnReserve = itemView.findViewById(R.id.btnReservar);
        }

        /**
         * Enlaza los datos del modelo con los componentes UI, aplicando lógica de estados.
         */
        public void bind(Schedule schedule, boolean isNextTrip, boolean animationsEnabled, OnReservarClickListener listener) {
            boolean isPast = FormatUtils.esHorarioPasado(schedule.getTime());
            int available = schedule.getAvailableSeats();
            boolean hasDriver = schedule.getConductorId() != null && !schedule.getConductorId().isEmpty();

            // 🎨 Paridad Web v1.9.10: Resaltar viaje siguiente y aplicar opacidad si ya pasó
            itemView.setAlpha(isPast ? 0.5f : 1.0f);
            
            if (itemView instanceof com.google.android.material.card.MaterialCardView card) {
                if (isNextTrip && !isPast) {
                    card.setStrokeColor(itemView.getContext().getColor(R.color.primary_500));
                    card.setStrokeWidth(com.chopcode.rutago.app.utils.ui.WindowUtils.dpToPx(itemView.getContext(), 2));
                    card.setCardElevation(com.chopcode.rutago.app.utils.ui.WindowUtils.dpToPx(itemView.getContext(), 8));
                } else {
                    card.setStrokeColor(itemView.getContext().getColor(R.color.surface_variant));
                    card.setStrokeWidth(com.chopcode.rutago.app.utils.ui.WindowUtils.dpToPx(itemView.getContext(), 1));
                    card.setCardElevation(com.chopcode.rutago.app.utils.ui.WindowUtils.dpToPx(itemView.getContext(), 2));
                }
            }

            // 🕒 Configuración del Círculo de Tiempo (Paridad Mirror v1.9.10)
            if (cardTimeIndicator != null) {
                int timeColor;
                int strokeColor;
                int bgColor;

                if (isPast) {
                    timeColor = itemView.getContext().getColor(R.color.text_tertiary);
                    strokeColor = itemView.getContext().getColor(R.color.surface_variant);
                    bgColor = itemView.getContext().getColor(R.color.surface);
                } else if (isNextTrip) {
                    timeColor = itemView.getContext().getColor(R.color.primary_500);
                    strokeColor = itemView.getContext().getColor(R.color.primary_500);
                    // Para el fondo usamos un tono sutil (10% alpha del primario si es oscuro)
                    bgColor = itemView.getContext().getColor(R.color.secondary_800); 
                } else {
                    timeColor = itemView.getContext().getColor(R.color.text_primary);
                    strokeColor = itemView.getContext().getColor(R.color.surface_variant);
                    bgColor = itemView.getContext().getColor(R.color.surface);
                }

                if (tvTime != null) tvTime.setTextColor(timeColor);
                if (tvAmPm != null) {
                    tvAmPm.setTextColor(isPast ? timeColor : itemView.getContext().getColor(R.color.primary_500));
                }
                
                cardTimeIndicator.setStrokeColor(strokeColor);
                cardTimeIndicator.setCardBackgroundColor(bgColor);
            }

            // Segmentación visual de la hora
            String[] timeParts = FormatUtils.separarHoraYAmPm(schedule.getTime());
            if (tvTime != null) tvTime.setText(timeParts[0]);
            if (tvAmPm != null) tvAmPm.setText(timeParts[1]);

            if (tvRoute != null) {
                tvRoute.setText(schedule.getRoute());
                tvRoute.setTextColor(itemView.getContext().getColor(isPast ? R.color.text_tertiary : R.color.text_primary));
            }

            // 👨‍✈️ Sincronización de Identidad (v1.9.9.9 Paridad Web)
            if (layoutDriverInfo != null) {
                if (schedule.getDriverName() != null && !schedule.getDriverName().isEmpty()) {
                    layoutDriverInfo.setVisibility(View.VISIBLE);
                    if (tvDriverName != null) {
                        tvDriverName.setText(schedule.getDriverName());
                        tvDriverName.setTextColor(itemView.getContext().getColor(isPast ? R.color.text_tertiary : R.color.text_secondary));
                    }
                } else {
                    layoutDriverInfo.setVisibility(View.GONE);
                }
            }

            // Animación reactiva de contadores
            if (tvSeats != null) {
                com.chopcode.rutago.app.utils.ui.UIAnimationUtils.animateNumericText(tvSeats, 0, available);
                updateColors(available, isNextTrip, isPast, hasDriver);
            }

            // Animación reactiva de precios
            if (tvPrice != null) {
                try {
                    double priceVal = Double.parseDouble(schedule.getPrice());
                    com.chopcode.rutago.app.utils.ui.UIAnimationUtils.animateCurrencyText(tvPrice, 0, priceVal);
                } catch (Exception e) {
                    tvPrice.setText(FormatUtils.formatearPrecio(schedule.getPrice()));
                }
            }

            // Gestión del indicador de "Próximo Viaje" con latido visual
            if (tvBadgeNext != null) {
                if (isNextTrip && available > 0 && !isPast) {
                    tvBadgeNext.setVisibility(View.VISIBLE);
                    com.chopcode.rutago.app.utils.ui.UIAnimationUtils.startPulseAnimation(tvBadgeNext);
                } else {
                    tvBadgeNext.setVisibility(View.GONE);
                    com.chopcode.rutago.app.utils.ui.UIAnimationUtils.stopAnimation(tvBadgeNext);
                }
            }

            if (btnReserve != null) {
                btnReserve.setOnClickListener(v -> {
                    if (hasDriver) {
                        if (listener != null) listener.onReservarClick(schedule);
                    } else {
                        android.widget.Toast.makeText(itemView.getContext(), "Turno pendiente de asignación vehicular.", android.widget.Toast.LENGTH_SHORT).show();
                    }
                });

                // Lógica de visualización para turnos vencidos (Animación Bus Departure)
                if (isPast) {
                    btnReserve.setImageResource(R.drawable.ic_bus);
                    btnReserve.setEnabled(false);
                    if (animationsEnabled && btnReserve.getVisibility() == View.VISIBLE && btnReserve.getTranslationX() == 0) {
                        com.chopcode.rutago.app.utils.ui.UIAnimationUtils.playBusDepartureAnimation(btnReserve);
                    } else if (!animationsEnabled) {
                        btnReserve.setVisibility(View.VISIBLE);
                    } else {
                        btnReserve.setVisibility(View.INVISIBLE);
                    }
                } else {
                    btnReserve.setVisibility(View.VISIBLE);
                    btnReserve.setTranslationX(0);
                    btnReserve.setAlpha(1.0f);
                    btnReserve.setImageResource(hasDriver ? R.drawable.ic_add : R.drawable.ic_lock);
                    
                    boolean canReserve = available > 0 && hasDriver;
                    btnReserve.setEnabled(canReserve);
                    btnReserve.setAlpha(canReserve ? 1.0f : 0.4f);
                }
            }
        }

        /**
         * Aplica la semántica de colores y etiquetas de estado según la disponibilidad y vigencia.
         */
        private void updateColors(int available, boolean isNextTrip, boolean isPast, boolean hasDriver) {
            int textColor;
            int badgeRes;
            String badgeText;

            if (isPast) {
                textColor = itemView.getContext().getColor(R.color.text_tertiary);
                badgeRes = R.drawable.bg_badge_inactive;
                badgeText = itemView.getContext().getString(R.string.estado_finalizado);
            } else if (!hasDriver) {
                textColor = itemView.getContext().getColor(R.color.text_tertiary);
                badgeRes = R.drawable.bg_badge_inactive;
                badgeText = "Pendiente";
            } else if (available == 0) {
                textColor = itemView.getContext().getColor(R.color.error_500);
                badgeRes = R.drawable.bg_estado_cancelado;
                badgeText = "Agotado";
            } else if (available < 5) {
                textColor = itemView.getContext().getColor(R.color.warning_500);
                badgeRes = R.drawable.bg_estado_pendiente;
                badgeText = "Últimos cupos";
            } else {
                textColor = itemView.getContext().getColor(R.color.primary_200); 
                badgeRes = R.drawable.bg_estado_confirmado;
                badgeText = "Disponible";
            }

            if (tvSeats != null) {
                tvSeats.setTextColor(textColor);
                tvSeats.setText(itemView.getContext().getString(R.string.asientos_disponibles_label_adapter, available));
            }
            
            if (tvAvailabilityBadge != null) {
                tvAvailabilityBadge.setText(badgeText);
                tvAvailabilityBadge.setBackgroundResource(badgeRes);
                tvAvailabilityBadge.setTextColor(itemView.getContext().getColor(R.color.white));
            }
        }
    }

    public static class FooterViewHolder extends RecyclerView.ViewHolder {
        public FooterViewHolder(@NonNull View itemView) {
            super(itemView);
        }
    }
}

package com.chopcode.rutago.app.engines.seats;

import android.content.Context;
import android.util.Log;
import android.view.View;
import android.widget.Toast;

import androidx.core.content.ContextCompat;

import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.managers.core.analytics.ReservationAnalyticsHelper;
import com.chopcode.rutago.app.utils.ui.UIAnimationUtils;
import com.google.android.material.button.MaterialButton;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

/**
 * 💺 Seat Manager (Seat Engine UI Handler)
 *
 * Controlador especializado en la lógica visual y de interacción del mapa de asientos.
 * Responsabilidades:
 * - Renderizar dinámicamente el estado de los asientos (Disponible, Seleccionado, Ocupado, Bloqueo Físico).
 * - Gestionar la exclusividad de selección: asegura que solo un asiento esté marcado a la vez.
 * - Integrar animaciones premium para mejorar el feedback visual al usuario.
 * - Coordinar con el motor de analíticas para rastrear el comportamiento del usuario en el Grid.
 * - Adaptar el mapa visual según la capacidad técnica del vehículo (Ocultamiento de botones sobrantes).
 */
public class SeatManager {
    private final Context context;
    private final Map<Integer, MaterialButton> mapaAsientos = new HashMap<>();
    private Integer asientoSeleccionado = null;
    private Set<Integer> asientosOcupados = new HashSet<>();
    private final ReservationAnalyticsHelper analyticsHelper;
    private boolean isFirstLoad = true;

    // Recursos gráficos para los estados del asiento
    private final int VECTOR_ASIENTO_DISPONIBLE = R.drawable.asiento_disponible;
    private final int VECTOR_ASIENTO_SELECCIONADO = R.drawable.asiento_seleccionado;
    private final int VECTOR_ASIENTO_OCUPADO = R.drawable.asiento_ocupado;
    private final int VECTOR_ASIENTO_FISICO = R.drawable.asiento_fisico;

    /** IDs de los botones definidos en los layouts XML de reserva. */
    private static final int[] BOTONES_ASIENTOS_IDS = {
            R.id.btnAsiento1, R.id.btnAsiento2, R.id.btnAsiento3, R.id.btnAsiento4,
            R.id.btnAsiento5, R.id.btnAsiento6, R.id.btnAsiento7, R.id.btnAsiento8,
            R.id.btnAsiento9, R.id.btnAsiento10, R.id.btnAsiento11, R.id.btnAsiento12,
            R.id.btnAsiento13
    };

    /** Interfaz para notificar cambios de selección a la actividad o ViewModel. */
    public interface SeatSelectionListener {
        void onSeatSelected(int seatNumber);
        void onSeatDeselected(int seatNumber);
        void onExpandableSectionRequestedToCollapse();
    }

    private SeatSelectionListener listener;

    public SeatManager(Context context, ReservationAnalyticsHelper analyticsHelper) {
        this.context = context;
        this.analyticsHelper = analyticsHelper;
    }

    public void setSeatSelectionListener(SeatSelectionListener listener) {
        this.listener = listener;
    }

    /**
     * Inicializa los componentes visuales del Grid de asientos.
     */
    public void configurarAsientos() {
        for (int i = 0; i < BOTONES_ASIENTOS_IDS.length; i++) {
            MaterialButton btnAsiento = ((android.app.Activity) context).findViewById(BOTONES_ASIENTOS_IDS[i]);
            int numeroAsiento = i + 1;
            configurarBotonAsiento(btnAsiento, numeroAsiento);
        }

        Map<String, Object> params = new HashMap<>();
        params.put("total_asientos", BOTONES_ASIENTOS_IDS.length);
        analyticsHelper.logEvent("asientos_configurados", params);

        Log.d("SeatManager", "✅ Asientos configurados automáticamente: " + BOTONES_ASIENTOS_IDS.length + " asientos");
    }

    /**
     * Permite la configuración manual con un set de IDs personalizado.
     */
    public void configurarAsientos(int[] botonesIds) {
        for (int i = 0; i < botonesIds.length; i++) {
            MaterialButton btnAsiento = ((android.app.Activity) context).findViewById(botonesIds[i]);
            int numeroAsiento = i + 1;
            configurarBotonAsiento(btnAsiento, numeroAsiento);
        }

        Map<String, Object> params = new HashMap<>();
        params.put("total_asientos", botonesIds.length);
        analyticsHelper.logEvent("asientos_configurados", params);

        Log.d("SeatManager", "✅ Asientos configurados con IDs personalizados: " + botonesIds.length + " asientos");
    }

    private void configurarBotonAsiento(MaterialButton btnAsiento, int numeroAsiento) {
        btnAsiento.setTag(numeroAsiento);
        btnAsiento.setVisibility(View.VISIBLE);
        btnAsiento.setIconTint(null);
        UIAnimationUtils.setClickAnimation(btnAsiento);
        mapaAsientos.put(numeroAsiento, btnAsiento);
    }

    /**
     * Actualiza el estado visual de cada botón basado en la data de ocupación remota.
     * @param ocupadosApp Asientos tomados desde la aplicación.
     * @param capacidadTotal Capacidad permitida para el vehículo actual.
     */
    public void actualizarEstadoAsientos(Set<Integer> ocupadosApp, int capacidadTotal) {
        actualizarEstadoAsientos(ocupadosApp, null, capacidadTotal);
    }

    /**
     * Actualiza el estado visual integrando ocupación por App y bloqueos físicos de conductor.
     */
    public void actualizarEstadoAsientos(Set<Integer> ocupadosApp, Set<Integer> ocupadosFisicos, int capacidadTotal) {
        this.asientosOcupados = new HashSet<>();
        if (ocupadosApp != null) this.asientosOcupados.addAll(ocupadosApp);
        if (ocupadosFisicos != null) this.asientosOcupados.addAll(ocupadosFisicos);

        int animationDelay = 0;

        for (Map.Entry<Integer, MaterialButton> entry : mapaAsientos.entrySet()) {
            int numAsiento = entry.getKey();
            MaterialButton btn = entry.getValue();

            // Lógica de Ocultamiento: Si el bus es de 13 y el botón es el 14, desaparece.
            if (numAsiento > capacidadTotal) {
                btn.setVisibility(View.GONE);
                continue;
            }

            btn.setVisibility(View.VISIBLE);
            
            boolean stateChanged = false;
            if (ocupadosApp != null && ocupadosApp.contains(numAsiento)) {
                marcarAsientoOcupado(btn);
                stateChanged = true;
            } else if (ocupadosFisicos != null && ocupadosFisicos.contains(numAsiento)) {
                marcarAsientoFisico(btn);
                stateChanged = true;
            } else {
                configurarAsientoDisponible(btn, numAsiento);
            }

            // Efecto de cascada solo en la carga inicial
            if (stateChanged && isFirstLoad) {
                UIAnimationUtils.playSeatPopAnimation(btn, animationDelay);
                animationDelay += 50;
            }
        }

        isFirstLoad = false;
        analyticsHelper.logAsientosCargados(this.asientosOcupados.size(), capacidadTotal, null);
    }

    private void marcarAsientoFisico(MaterialButton btn) {
        btn.setIcon(ContextCompat.getDrawable(context, VECTOR_ASIENTO_FISICO));
        btn.setEnabled(true); // Permitir que el conductor lo toque para liberarlo
        int numAsiento = (int) btn.getTag();
        btn.setOnClickListener(v -> manejarSeleccionAsiento(numAsiento));
    }

    private void marcarAsientoOcupado(MaterialButton btn) {
        btn.setIcon(ContextCompat.getDrawable(context, VECTOR_ASIENTO_OCUPADO));
        btn.setEnabled(false); // Bloqueo total para pasajeros
        btn.setOnClickListener(null);
    }

    private void configurarAsientoDisponible(MaterialButton btn, int numAsiento) {
        btn.setIcon(ContextCompat.getDrawable(context, VECTOR_ASIENTO_DISPONIBLE));
        btn.setEnabled(true);
        btn.setOnClickListener(v -> manejarSeleccionAsiento(numAsiento));
    }

    /**
     * Orquesta el cambio de selección. Deselecciona el previo y marca el nuevo.
     */
    private void manejarSeleccionAsiento(int numAsiento) {
        if (asientoSeleccionado != null) {
            deseleccionarAsiento(asientoSeleccionado);
        }
        seleccionarAsiento(numAsiento);
        Toast.makeText(context, "Asiento seleccionado: " + asientoSeleccionado, Toast.LENGTH_SHORT).show();
        analyticsHelper.logAsientoSeleccionado(numAsiento);
        if (listener != null) {
            listener.onExpandableSectionRequestedToCollapse();
        }
    }

    private void seleccionarAsiento(int numAsiento) {
        asientoSeleccionado = numAsiento;
        MaterialButton btn = mapaAsientos.get(numAsiento);
        if (btn != null) {
            btn.setIcon(ContextCompat.getDrawable(context, VECTOR_ASIENTO_SELECCIONADO));
            UIAnimationUtils.playSeatSelectionAnimation(btn);
        }
        if (listener != null) {
            listener.onSeatSelected(numAsiento);
        }
    }

    private void deseleccionarAsiento(int numAsiento) {
        MaterialButton btn = mapaAsientos.get(numAsiento);
        if (btn != null) {
            btn.setIcon(ContextCompat.getDrawable(context, VECTOR_ASIENTO_DISPONIBLE));
        }
        if (listener != null) {
            listener.onSeatDeselected(numAsiento);
        }
    }

    public Integer getAsientoSeleccionado() { return asientoSeleccionado; }

    public void setAsientoSeleccionado(Integer asientoSeleccionado) {
        this.asientoSeleccionado = asientoSeleccionado;
        if (asientoSeleccionado != null && mapaAsientos.containsKey(asientoSeleccionado)) {
            seleccionarAsiento(asientoSeleccionado);
        }
    }

    public void limpiarSeleccion() {
        if (asientoSeleccionado != null) {
            deseleccionarAsiento(asientoSeleccionado);
            asientoSeleccionado = null;
        }
    }

    public int getCapacidadTotal() { return mapaAsientos.size(); }
    public int getCapacidadDisponible() { return getCapacidadTotal() - asientosOcupados.size(); }
    public int getAsientosOcupadosCount() { return asientosOcupados.size(); }
    public boolean isAsientoOcupado(int numAsiento) { return asientosOcupados.contains(numAsiento); }
    public boolean hasAsientoSeleccionado() { return asientoSeleccionado != null; }
    public Set<Integer> getAsientosOcupados() { return new HashSet<>(asientosOcupados); }

    public static int[] getBotonesAsientosIds() { return BOTONES_ASIENTOS_IDS.clone(); }
    public static int getNumeroTotalAsientos() { return BOTONES_ASIENTOS_IDS.length; }

    /**
     * Libera referencias para evitar memory leaks.
     */
    public void cleanup() {
        mapaAsientos.clear();
        asientosOcupados.clear();
        asientoSeleccionado = null;
        listener = null;
    }
}

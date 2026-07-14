package com.chopcode.rutago.app.managers.ui.common;

import android.content.Context;
import android.util.Log;
import android.view.View;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.config.MyApp;

import java.util.HashMap;
import java.util.Map;

/**
 * Expandable Section Manager
 *
 * Controlador especializado en la gestión de interfaces colapsables (Acordeones).
 * Responsabilidades:
 * - Alternar la visibilidad de secciones de contenido mediante animaciones fluidas.
 * - Gestionar la lógica de "Resumen": muestra información clave cuando la sección está cerrada.
 * - Sincronizar el estado del icono de expansión (Expand More/Less).
 * - Centralizar la telemetría analítica sobre la interacción con secciones dinámicas.
 * - Proporcionar mecanismos de auto-colapsado basados en reglas de negocio (ej: al seleccionar un asiento).
 */
public class ExpandableSectionManager {
    private static final String TAG = "ExpandableSectionManager";

    // Componentes de la Interfaz
    private final RelativeLayout headerView;
    private final LinearLayout contentView;
    private final LinearLayout summaryView;
    private final ImageView expandIcon;
    private final TextView routeSummary;
    private final TextView scheduleSummary;

    private boolean isExpanded = true;
    private final Context context;
    private ExpandableCallback callback;

    private String screenName = "UnknownScreen";
    private String sectionName = "DefaultSection";

    /** Interfaz para la comunicación de eventos de expansión. */
    public interface ExpandableCallback {
        void onSectionExpanded();
        void onSectionCollapsed();
        void onToggleClicked(boolean isNowExpanded);
    }

    /**
     * Constructor integral para secciones con vista de resumen.
     */
    public ExpandableSectionManager(Context context,
                                    RelativeLayout headerView,
                                    LinearLayout contentView,
                                    LinearLayout summaryView,
                                    ImageView expandIcon,
                                    TextView routeSummary,
                                    TextView scheduleSummary) {
        this.context = context;
        this.headerView = headerView;
        this.contentView = contentView;
        this.summaryView = summaryView;
        this.expandIcon = expandIcon;
        this.routeSummary = routeSummary;
        this.scheduleSummary = scheduleSummary;

        setupHeaderClickListener();
        initializeViews();
    }

    /**
     * Constructor simplificado para secciones de ocultamiento básico.
     */
    public ExpandableSectionManager(Context context,
                                    RelativeLayout headerView,
                                    LinearLayout contentView,
                                    ImageView expandIcon) {
        this(context, headerView, contentView, null, expandIcon, null, null);
    }

    private void setupHeaderClickListener() {
        if (headerView != null) {
            headerView.setOnClickListener(v -> toggleSection());
        }
    }

    private void initializeViews() {
        if (contentView != null && summaryView != null) {
            contentView.setVisibility(View.VISIBLE);
            summaryView.setVisibility(View.GONE);
            expandIcon.setImageResource(R.drawable.ic_expand_less);
        }
    }

    /**
     * Alterna el estado actual de la sección con persistencia analítica.
     */
    public void toggleSection() {
        isExpanded = !isExpanded;

        if (isExpanded) {
            expandSection();
        } else {
            collapseSection();
        }

        if (callback != null) {
            callback.onToggleClicked(isExpanded);
        }

        logAnalyticsEvent();
    }

    /**
     * Expande el contenedor con animación de entrada.
     */
    public void expandSection() {
        if (contentView == null || expandIcon == null) return;

        contentView.setVisibility(View.VISIBLE);
        expandIcon.setImageResource(R.drawable.ic_expand_less);

        if (summaryView != null) {
            summaryView.setVisibility(View.GONE);
        }

        applyAnimation(contentView, R.anim.expand_animation);

        if (callback != null) {
            callback.onSectionExpanded();
        }
    }

    /**
     * Colapsa el contenedor y activa la vista de resumen si está disponible.
     */
    public void collapseSection() {
        if (contentView == null || expandIcon == null) return;

        expandIcon.setImageResource(R.drawable.ic_expand_more);

        if (summaryView != null) {
            summaryView.setVisibility(View.VISIBLE);
        }

        applyAnimation(contentView, R.anim.collapse_animation, () -> {
            contentView.setVisibility(View.GONE);
        });

        if (callback != null) {
            callback.onSectionCollapsed();
        }
    }

    private void applyAnimation(View view, int animationResId) {
        applyAnimation(view, animationResId, null);
    }

    /**
     * Motor de animación interna con soporte para acciones post-ejecución.
     */
    private void applyAnimation(View view, int animationResId, Runnable onAnimationEnd) {
        Animation animation = AnimationUtils.loadAnimation(context, animationResId);

        if (onAnimationEnd != null) {
            animation.setAnimationListener(new Animation.AnimationListener() {
                @Override public void onAnimationStart(Animation animation) {}
                @Override public void onAnimationEnd(Animation animation) { onAnimationEnd.run(); }
                @Override public void onAnimationRepeat(Animation animation) {}
            });
        }

        view.startAnimation(animation);
    }

    /**
     * Actualiza dinámicamente el texto del resumen para trayectos y horarios.
     * Implementa lógica de abreviación para optimizar el espacio en el Header.
     */
    public void updateSummaryInfo(String routeText, String scheduleText) {
        if (routeSummary != null && routeText != null) {
            String shortenedRoute = routeText;

            if (routeText.contains(" -> ")) {
                String[] parts = routeText.split(" -> ");
                if (parts.length >= 2) {
                    String origen = parts[0].trim();
                    String destino = parts[1].trim();

                    if (origen.contains("Natagá")) origen = "Nat.";
                    else if (origen.contains("La Plata")) origen = "L.P.";

                    if (destino.contains("Natagá")) destino = "Nat.";
                    else if (destino.contains("La Plata")) destino = "L.P.";

                    shortenedRoute = origen + " → " + destino;
                }
            }

            if (shortenedRoute.length() > 15) {
                shortenedRoute = shortenedRoute.substring(0, 12) + "...";
            }

            routeSummary.setText(shortenedRoute);
        }

        if (scheduleSummary != null && scheduleText != null) {
            String shortSchedule = scheduleText;
            if (shortSchedule.contains(" ")) {
                String[] parts = shortSchedule.split(" ");
                if (parts.length >= 2) {
                    shortSchedule = parts[0] + " " + parts[1];
                }
            }
            scheduleSummary.setText(shortSchedule);
        }
    }

    public void updateRouteSummary(String routeText) {
        updateSummaryInfo(routeText, null);
    }

    public void updateScheduleSummary(String scheduleText) {
        updateSummaryInfo(null, scheduleText);
    }

    public void setExpandableCallback(ExpandableCallback callback) {
        this.callback = callback;
    }

    /**
     * Configura el contexto de analítica para rastrear el uso de la sección.
     */
    public void setAnalyticsInfo(String screenName, String sectionName) {
        this.screenName = screenName != null ? screenName : "UnknownScreen";
        this.sectionName = sectionName != null ? sectionName : "DefaultSection";
    }

    public boolean isExpanded() {
        return isExpanded;
    }

    public void setExpanded(boolean expanded) {
        if (this.isExpanded != expanded) {
            this.isExpanded = expanded;
            if (expanded) expandSection(); else collapseSection();
        }
    }

    /**
     * Restaura el estado visual basándose en datos persistidos.
     */
    public void restoreState(boolean wasExpanded) {
        this.isExpanded = wasExpanded;
        if (wasExpanded) {
            if (contentView != null) contentView.setVisibility(View.VISIBLE);
            if (summaryView != null) summaryView.setVisibility(View.GONE);
            if (expandIcon != null) expandIcon.setImageResource(R.drawable.ic_expand_less);
        } else {
            if (contentView != null) contentView.setVisibility(View.GONE);
            if (summaryView != null) summaryView.setVisibility(View.VISIBLE);
            if (expandIcon != null) expandIcon.setImageResource(R.drawable.ic_expand_more);
        }
    }

    /**
     * Colapsa la sección de forma automática si se cumple una condición externa.
     */
    public void autoCollapseIfNeeded(boolean condition) {
        if (condition && isExpanded) {
            collapseSection();
        }
    }

    private void logAnalyticsEvent() {
        try {
            Map<String, Object> params = new HashMap<>();
            params.put("user_id", MyApp.getCurrentUserId());
            params.put("pantalla", screenName);
            params.put("seccion", sectionName);
            params.put("estado", isExpanded ? "expandido" : "colapsado");
            params.put("timestamp", System.currentTimeMillis());

            MyApp.logEvent("seccion_expandible_toggle", params);
        } catch (Exception e) {
            Log.e(TAG, "❌ Error analítico en sección: " + e.getMessage());
        }
    }

    /**
     * Libera listeners para evitar fugas de memoria.
     */
    public void cleanup() {
        if (headerView != null) {
            headerView.setOnClickListener(null);
        }
        callback = null;
    }
}

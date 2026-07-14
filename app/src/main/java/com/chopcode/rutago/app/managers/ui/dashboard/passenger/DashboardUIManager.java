package com.chopcode.rutago.app.managers.ui.dashboard.passenger;

import android.widget.TextView;
import androidx.appcompat.widget.Toolbar;
import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.managers.core.analytics.DashboardAnalyticsHelper;
import com.chopcode.rutago.app.models.User;
import com.chopcode.rutago.app.utils.ui.UIAnimationUtils;
import com.google.android.material.tabs.TabLayout;
import com.google.android.material.tabs.TabLayoutMediator;

/**
 * Dashboard UI Manager (Passenger)
 *
 * Encargado de la orquestación visual del tablero principal para pasajeros.
 * Responsabilidades:
 * - Sincronizar la información de perfil del usuario con los componentes de la interfaz.
 * - Gestionar el estado visual del Badge de actividad (Activo/Inactivo/Bloqueado) con animaciones de pulso.
 * - Coordinar la actualización animada de los contadores de reservas (viajes confirmados y cancelados).
 * - Configurar la navegación por pestañas (TabLayout) para la planilla de horarios.
 * - Centralizar las referencias a vistas para desacoplar la lógica de presentación de la actividad principal.
 */
public class DashboardUIManager {

    private final DashboardAnalyticsHelper analyticsHelper;
    private TextView tvUserName, tvWelcome, tvReservasCount, tvTotalCount, tvCanceladasCount, tvUserStatusBadge;
    private UIActionsListener listener;

    /** Interfaz para la delegación de eventos de usuario en el Dashboard. */
    public interface UIActionsListener {}

    public DashboardUIManager(DashboardAnalyticsHelper analyticsHelper) {
        this.analyticsHelper = analyticsHelper;
    }

    public void setUIActionsListener(UIActionsListener listener) {
        this.listener = listener;
    }

    /**
     * Inyecta las referencias de los componentes visuales para su gestión.
     */
    public void setViewReferences(TextView tvUserName, TextView tvWelcome, TextView tvReservasCount, TextView tvCanceladasCount, TextView tvTotalCount) {
        this.tvUserName = tvUserName;
        this.tvWelcome = tvWelcome;
        this.tvReservasCount = tvReservasCount;
        this.tvCanceladasCount = tvCanceladasCount;
        this.tvTotalCount = tvTotalCount;
    }

    public void setStatusBadgeReference(TextView tvBadge) {
        this.tvUserStatusBadge = tvBadge;
    }

    public void setupToolbar(Toolbar toolbar) {
        toolbar.setOnMenuItemClickListener(item -> false);
    }

    /**
     * Refresca el encabezado del Dashboard con los datos del perfil actual.
     */
    public void updateUserInfo(User user) {
        if (user != null && user.getNombre() != null) {
            tvUserName.setText(user.getNombre());
            tvWelcome.setText("Welcome!");
            updateStatusBadge(user.getStatus());
        }
    }

    /**
     * Actualiza el estilo y animación del indicador de estado del pasajero.
     */
    private void updateStatusBadge(String status) {
        if (tvUserStatusBadge == null) return;

        UIAnimationUtils.stopAnimation(tvUserStatusBadge);
        tvUserStatusBadge.setTextColor(tvUserStatusBadge.getContext().getColor(R.color.white));

        if (status == null) status = "active";

        switch (status.toLowerCase()) {
            case "active":
                tvUserStatusBadge.setText(R.string.status_pasajero_activo);
                tvUserStatusBadge.setBackgroundResource(R.drawable.bg_badge_active);
                UIAnimationUtils.startPulseAnimation(tvUserStatusBadge);
                break;
            case "inactive":
                tvUserStatusBadge.setText(R.string.status_pasajero_inactivo);
                tvUserStatusBadge.setBackgroundResource(R.drawable.bg_badge_inactive);
                break;
            case "blocked":
                tvUserStatusBadge.setText(R.string.status_blocked);
                tvUserStatusBadge.setBackgroundResource(R.drawable.bg_badge_blocked);
                break;
            default:
                tvUserStatusBadge.setText(R.string.status_pasajero_activo);
                tvUserStatusBadge.setBackgroundResource(R.drawable.bg_badge_active);
                UIAnimationUtils.startPulseAnimation(tvUserStatusBadge);
                break;
        }
    }

    private int currentConfirmed = 0;
    private int currentCanceled = 0;
    private int currentTotal = 0;

    /**
     * Actualiza los contadores numéricos aplicando una animación de conteo incremental.
     */
    public void updateCounters(int confirmed, int canceled, int total) {
        UIAnimationUtils.animateNumericText(tvReservasCount, currentConfirmed, confirmed);
        UIAnimationUtils.animateNumericText(tvCanceladasCount, currentCanceled, canceled);
        UIAnimationUtils.animateNumericText(tvTotalCount, currentTotal, total);

        currentConfirmed = confirmed;
        currentCanceled = canceled;
        currentTotal = total;
    }

    /**
     * Vincula el TabLayout con el ViewPager de horarios para la navegación por trayectos.
     */
    public void setupTabLayout(TabLayout tabLayout, androidx.viewpager2.widget.ViewPager2 viewPager) {
        new TabLayoutMediator(tabLayout, viewPager, (tab, position) -> {
            if (position == 0) tab.setText("Natagá -> La Plata");
            else tab.setText("La Plata -> Natagá");
        }).attach();
    }
}

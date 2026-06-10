package com.chopcode.rutago.app.managers.dashboard.passenger;

import android.widget.TextView;

import androidx.appcompat.widget.Toolbar;

import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.managers.analytics.DashboardAnalyticsHelper;
import com.chopcode.rutago.app.models.Usuario;
import com.google.android.material.tabs.TabLayout;
import com.google.android.material.tabs.TabLayoutMediator;

public class DashboardUIManager {

    private final DashboardAnalyticsHelper analyticsHelper;

    // UI References
    private TextView tvUserName, tvWelcome, tvReservasCount, tvTotalCount, tvCanceladasCount;

    // Callbacks
    public interface UIActionsListener {
        // Otros eventos de interacción pueden ir aquí
    }

    private UIActionsListener listener;

    public DashboardUIManager(DashboardAnalyticsHelper analyticsHelper) {
        this.analyticsHelper = analyticsHelper;
    }

    public void setUIActionsListener(UIActionsListener listener) {
        this.listener = listener;
    }

    public void setViewReferences(
            TextView tvUserName, TextView tvWelcome,
            TextView tvReservasCount, TextView tvCanceladasCount, TextView tvTotalCount) {

        this.tvUserName = tvUserName;
        this.tvWelcome = tvWelcome;
        this.tvReservasCount = tvReservasCount;
        this.tvCanceladasCount = tvCanceladasCount;
        this.tvTotalCount = tvTotalCount;
    }

    public void setupToolbar(Toolbar toolbar) {
        toolbar.setOnMenuItemClickListener(item -> {
            // Manejo de otros items del menú si los hubiera en el futuro
            return false;
        });
    }

    public void updateUserInfo(Usuario usuario) {
        if (usuario != null && usuario.getNombre() != null) {
            tvUserName.setText(usuario.getNombre());
            tvWelcome.setText("¡Bienvenido!");
        }
    }

    public void updateCounters(int reservasCount, int canceladasCount, int totalCount) {
        if (tvReservasCount != null) tvReservasCount.setText(String.valueOf(reservasCount));
        if (tvCanceladasCount != null) tvCanceladasCount.setText(String.valueOf(canceladasCount));
        if (tvTotalCount != null) tvTotalCount.setText(String.valueOf(totalCount));
    }

    public void showRefreshMessage() {
        // Opcional: mostrar un Toast o Snackbar de actualización
    }

    public void setupTabLayout(TabLayout tabLayout, androidx.viewpager2.widget.ViewPager2 viewPager) {
        new TabLayoutMediator(tabLayout, viewPager,
                (tab, position) -> {
                    if (position == 0) {
                        tab.setText("Natagá → La Plata");
                    } else {
                        tab.setText("La Plata → Natagá");
                    }
                }
        ).attach();
    }
}

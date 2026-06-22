package com.chopcode.rutago.app.managers.ui.dashboard.passenger;

import android.widget.TextView;
import androidx.appcompat.widget.Toolbar;
import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.managers.core.analytics.DashboardAnalyticsHelper;
import com.chopcode.rutago.app.models.User;
import com.chopcode.rutago.app.utils.ui.UIAnimationUtils;
import com.google.android.material.tabs.TabLayout;
import com.google.android.material.tabs.TabLayoutMediator;


public class DashboardUIManager {

    private final DashboardAnalyticsHelper analyticsHelper;
    private TextView tvUserName, tvWelcome, tvReservasCount, tvTotalCount, tvCanceladasCount, tvUserStatusBadge;
    private UIActionsListener listener;

    public interface UIActionsListener {}

    public DashboardUIManager(DashboardAnalyticsHelper analyticsHelper) {
        this.analyticsHelper = analyticsHelper;
    }

    public void setUIActionsListener(UIActionsListener listener) {
        this.listener = listener;
    }

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

    public void updateUserInfo(User user) {
        if (user != null && user.getNombre() != null) {
            tvUserName.setText(user.getNombre());
            tvWelcome.setText("Welcome!");
            updateStatusBadge(user.getStatus());
        }
    }

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

    public void updateCounters(int confirmed, int canceled, int total) {
        UIAnimationUtils.animateNumericText(tvReservasCount, currentConfirmed, confirmed);
        UIAnimationUtils.animateNumericText(tvCanceladasCount, currentCanceled, canceled);
        UIAnimationUtils.animateNumericText(tvTotalCount, currentTotal, total);

        currentConfirmed = confirmed;
        currentCanceled = canceled;
        currentTotal = total;
    }

    public void setupTabLayout(TabLayout tabLayout, androidx.viewpager2.widget.ViewPager2 viewPager) {
        new TabLayoutMediator(tabLayout, viewPager, (tab, position) -> {
            if (position == 0) tab.setText("Natagá -> La Plata");
            else tab.setText("La Plata -> Natagá");
        }).attach();
    }
}

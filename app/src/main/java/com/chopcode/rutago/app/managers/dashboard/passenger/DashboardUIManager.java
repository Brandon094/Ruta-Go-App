package com.chopcode.rutago.app.managers.dashboard.passenger;

import android.widget.TextView;
import androidx.appcompat.widget.Toolbar;
import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.managers.analytics.DashboardAnalyticsHelper;
import com.chopcode.rutago.app.models.User;
import com.google.android.material.tabs.TabLayout;
import com.google.android.material.tabs.TabLayoutMediator;

public class DashboardUIManager {

    private final DashboardAnalyticsHelper analyticsHelper;
    private TextView tvUserName, tvWelcome, tvReservasCount, tvTotalCount, tvCanceladasCount;
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

    public void setupToolbar(Toolbar toolbar) {
        toolbar.setOnMenuItemClickListener(item -> false);
    }

    public void updateUserInfo(User user) {
        if (user != null && user.getNombre() != null) {
            tvUserName.setText(user.getNombre());
            tvWelcome.setText("Welcome!");
        }
    }

    public void updateCounters(int confirmed, int canceled, int total) {
        if (tvReservasCount != null) tvReservasCount.setText(String.valueOf(confirmed));
        if (tvCanceladasCount != null) tvCanceladasCount.setText(String.valueOf(canceled));
        if (tvTotalCount != null) tvTotalCount.setText(String.valueOf(total));
    }

    public void setupTabLayout(TabLayout tabLayout, androidx.viewpager2.widget.ViewPager2 viewPager) {
        new TabLayoutMediator(tabLayout, viewPager, (tab, position) -> {
            if (position == 0) tab.setText("Natagá -> La Plata");
            else tab.setText("La Plata -> Natagá");
        }).attach();
    }
}

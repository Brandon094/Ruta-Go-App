package com.chopcode.rutago.app.activities.passenger;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProvider;
import androidx.viewpager2.widget.ViewPager2;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.chopcode.rutago.app.R;
import com.facebook.shimmer.ShimmerFrameLayout;
import com.chopcode.rutago.app.adapters.horarios.HorarioPagerAdapter;
import com.chopcode.rutago.app.config.MyApp;
import com.chopcode.rutago.app.managers.analytics.DashboardAnalyticsHelper;
import com.chopcode.rutago.app.managers.dashboard.passenger.DashboardUIManager;
import com.chopcode.rutago.app.fragments.BottomNavFragment;
import com.chopcode.rutago.app.fragments.HorarioFragment;
import com.chopcode.rutago.app.models.Usuario;
import com.chopcode.rutago.app.utils.network.NetworkMonitor;
import com.chopcode.rutago.app.utils.ui.ImageUtils;
import com.chopcode.rutago.app.viewmodels.passenger.PassengerProfileViewModel;
import com.chopcode.rutago.app.viewmodels.passenger.SchedulesViewModel;
import com.google.android.material.snackbar.Snackbar;
import com.google.android.material.appbar.MaterialToolbar;
import com.google.android.material.tabs.TabLayout;

public class InicioUsuariosActivity extends AppCompatActivity implements
        DashboardUIManager.UIActionsListener, HorarioFragment.OnUsuarioDataListener {

    private static final String TAG = "InicioUsuarios";

    private PassengerProfileViewModel profileViewModel;
    private SchedulesViewModel schedulesViewModel;
    private DashboardAnalyticsHelper analyticsHelper;
    private DashboardUIManager uiManager;

    private TabLayout tabLayout;
    private ViewPager2 viewPagerHorarios;
    private ShimmerFrameLayout shimmerSchedules, shimmerStats;
    private LinearLayout layoutRealStats;
    private HorarioPagerAdapter pagerAdapter;
    private ImageView ivUserAvatar;
    private NetworkMonitor networkMonitor;
    private Snackbar networkSnackbar;

    private RelativeLayout legendHeader;
    private LinearLayout legendContent;
    private ImageView legendExpandIcon;
    private boolean isLegendExpanded = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.d(TAG, "🚀 onCreate - Dashboard Pasajero Reactivo");

        setContentView(R.layout.activity_inicio_usuarios);

        profileViewModel = new ViewModelProvider(this).get(PassengerProfileViewModel.class);
        schedulesViewModel = new ViewModelProvider(this).get(SchedulesViewModel.class);
        
        analyticsHelper = new DashboardAnalyticsHelper();
        uiManager = new DashboardUIManager(analyticsHelper);
        uiManager.setUIActionsListener(this);

        initializeViews();
        setupObservers();

        profileViewModel.init();
        schedulesViewModel.loadSchedules();
        
        setupNetworkMonitor();
        setupBottomNavigation();
    }

    private void setupObservers() {
        profileViewModel.getUserLiveData().observe(this, usuario -> {
            uiManager.updateUserInfo(usuario);
            ImageUtils.loadProfilePhoto(this, usuario.getPhotoUrl(), ivUserAvatar);
        });

        profileViewModel.getConfirmedCount().observe(this, count -> actualizarContadores());
        profileViewModel.getCanceledCount().observe(this, count -> actualizarContadores());
        profileViewModel.getTotalCount().observe(this, count -> actualizarContadores());

        profileViewModel.getIsLoading().observe(this, loading -> {
            if (!loading) {
                shimmerStats.stopShimmer();
                shimmerStats.setVisibility(View.GONE);
                layoutRealStats.setVisibility(View.VISIBLE);
            }
        });

        schedulesViewModel.getNatagaSchedules().observe(this, schedules -> actualizarPager());
        schedulesViewModel.getLaPlataSchedules().observe(this, schedules -> actualizarPager());
        
        schedulesViewModel.getIsLoading().observe(this, loading -> {
            if (!loading) {
                shimmerSchedules.stopShimmer();
                shimmerSchedules.setVisibility(View.GONE);
                viewPagerHorarios.setVisibility(View.VISIBLE);
            }
        });
    }

    private void actualizarContadores() {
        Integer confirmed = profileViewModel.getConfirmedCount().getValue();
        Integer canceled = profileViewModel.getCanceledCount().getValue();
        Integer total = profileViewModel.getTotalCount().getValue();
        uiManager.updateCounters(confirmed != null ? confirmed : 0, 
                                 canceled != null ? canceled : 0, 
                                 total != null ? total : 0);
    }

    private void actualizarPager() {
        pagerAdapter.actualizarDatos(
                schedulesViewModel.getNatagaSchedules().getValue(),
                schedulesViewModel.getLaPlataSchedules().getValue()
        );
    }

    private void initializeViews() {
        MaterialToolbar topAppBar = findViewById(R.id.topAppBar);
        TextView tvUserName = findViewById(R.id.tvUserName);
        TextView tvWelcome = findViewById(R.id.tvWelcome);
        TextView tvReservasCount = findViewById(R.id.tvReservasCount);
        TextView tvCanceladasCount = findViewById(R.id.tvCanceladasCount);
        TextView tvTotalCount = findViewById(R.id.tvTotalCount);

        legendHeader = findViewById(R.id.legendHeader);
        legendContent = findViewById(R.id.legendContent);
        legendExpandIcon = findViewById(R.id.legendExpandIcon);
        setupLegendToggle();

        tabLayout = findViewById(R.id.tabLayout);
        viewPagerHorarios = findViewById(R.id.viewPagerHorarios);
        shimmerSchedules = findViewById(R.id.shimmer_inicio_usuarios);
        shimmerStats = findViewById(R.id.shimmer_stats);
        layoutRealStats = findViewById(R.id.layout_real_stats);
        ivUserAvatar = findViewById(R.id.ivUserAvatar);

        uiManager.setViewReferences(tvUserName, tvWelcome, tvReservasCount, tvCanceladasCount, tvTotalCount);
        uiManager.setupToolbar(topAppBar);

        pagerAdapter = new HorarioPagerAdapter(this, new java.util.ArrayList<>(), new java.util.ArrayList<>());
        viewPagerHorarios.setAdapter(pagerAdapter);
        setupViewPagerAnimation();
        uiManager.setupTabLayout(tabLayout, viewPagerHorarios);
    }

    private void setupNetworkMonitor() {
        networkMonitor = new NetworkMonitor(this);
        networkMonitor.observe(this, isConnected -> {
            if (!isConnected) {
                if (networkSnackbar == null) {
                    networkSnackbar = Snackbar.make(findViewById(android.R.id.content),
                            "Sin conexión a internet", Snackbar.LENGTH_INDEFINITE);
                    networkSnackbar.setBackgroundTint(getColor(R.color.error_500));
                }
                networkSnackbar.show();
            } else if (networkSnackbar != null) {
                networkSnackbar.dismiss();
            }
        });
    }

    private void setupBottomNavigation() {
        getSupportFragmentManager().beginTransaction()
                .replace(R.id.bottom_nav_container, BottomNavFragment.newInstance(false))
                .commit();
    }

    private void setupLegendToggle() {
        if (legendHeader != null) {
            legendHeader.setOnClickListener(v -> {
                isLegendExpanded = !isLegendExpanded;
                if (isLegendExpanded) {
                    legendContent.setVisibility(View.VISIBLE);
                    legendExpandIcon.setImageResource(R.drawable.ic_expand_less);
                } else {
                    legendContent.setVisibility(View.GONE);
                    legendExpandIcon.setImageResource(R.drawable.ic_expand_more);
                }
            });
        }
    }

    private void setupViewPagerAnimation() {
        viewPagerHorarios.setPageTransformer((page, position) -> {
            float absPos = Math.abs(position);
            page.setAlpha(1.0f - absPos);
            float scale = 0.85f + (1.0f - absPos) * 0.15f;
            page.setScaleX(scale);
            page.setScaleY(scale);
            page.setTranslationX(page.getWidth() * -position);
            if (absPos > 0.5f) page.setVisibility(View.GONE);
            else page.setVisibility(View.VISIBLE);
        });
    }

    @Override
    public Usuario getUsuarioActual() {
        return profileViewModel.getUserLiveData().getValue();
    }
}

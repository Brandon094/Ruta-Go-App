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
import com.chopcode.rutago.app.adapters.horarios.SchedulePagerAdapter;
import com.chopcode.rutago.app.config.MyApp;
import com.chopcode.rutago.app.managers.analytics.DashboardAnalyticsHelper;
import com.chopcode.rutago.app.managers.dashboard.passenger.DashboardUIManager;
import com.chopcode.rutago.app.fragments.BottomNavFragment;
import com.chopcode.rutago.app.fragments.HorarioFragment;
import com.chopcode.rutago.app.models.User;
import com.chopcode.rutago.app.utils.network.NetworkMonitor;
import com.chopcode.rutago.app.utils.ui.ImageUtils;
import com.chopcode.rutago.app.utils.ui.UIAnimationUtils;
import com.chopcode.rutago.app.viewmodels.passenger.PassengerProfileViewModel;
import com.chopcode.rutago.app.viewmodels.passenger.ScheduleViewModel;
import com.google.android.material.snackbar.Snackbar;
import com.google.android.material.appbar.MaterialToolbar;
import com.google.android.material.card.MaterialCardView;
import com.google.android.material.tabs.TabLayout;

/**
 * 🏠 Passenger Home Activity
 * 
 * Este es el Dashboard principal para los pasajeros. 
 * Responsabilidades:
 * - Mostrar el catálogo de rutas disponibles (Natagá <-> La Plata) mediante un ViewPager2.
 * - Visualizar estadísticas rápidas del usuario (Viajes realizados, cancelados y total).
 * - Monitorear la conexión a internet en tiempo real para alertar al usuario.
 * - Navegar a través de las secciones principales usando el Bottom Navigation.
 * 
 * Implementa MVVM mediante PassengerProfileViewModel y ScheduleViewModel.
 */
public class PassengerHomeActivity extends AppCompatActivity implements
        DashboardUIManager.UIActionsListener, HorarioFragment.OnUserDataListener {

    private static final String TAG = "PassengerHomeActivity";

    private PassengerProfileViewModel profileViewModel;
    private ScheduleViewModel schedulesViewModel;
    private DashboardAnalyticsHelper analyticsHelper;
    private DashboardUIManager uiManager;

    private TabLayout tabLayout;
    private ViewPager2 viewPagerSchedules;
    private ShimmerFrameLayout shimmerSchedules, shimmerStats;
    private LinearLayout layoutRealStats;
    private SchedulePagerAdapter pagerAdapter;
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
        Log.d(TAG, "🚀 onCreate - Reactive Passenger Dashboard");

        setContentView(R.layout.activity_inicio_usuarios);

        profileViewModel = new ViewModelProvider(this).get(PassengerProfileViewModel.class);
        schedulesViewModel = new ViewModelProvider(this).get(ScheduleViewModel.class);
        
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
        profileViewModel.getUserLiveData().observe(this, user -> {
            if (user != null) {
                uiManager.updateUserInfo(user);
                ImageUtils.loadProfilePhoto(this, user.getPhotoUrl(), ivUserAvatar);
            }
        });

        profileViewModel.getConfirmedCount().observe(this, count -> updateCounters());
        profileViewModel.getCanceledCount().observe(this, count -> updateCounters());
        profileViewModel.getTotalCount().observe(this, count -> updateCounters());

        profileViewModel.getIsLoading().observe(this, loading -> {
            if (!loading) {
                shimmerStats.stopShimmer();
                shimmerStats.setVisibility(View.GONE);
                layoutRealStats.setVisibility(View.VISIBLE);
                // 🔥 Delay para que la animación sea visible tras el shimmer
                new android.os.Handler(android.os.Looper.getMainLooper()).postDelayed(this::updateCounters, 400);
            }
        });

        schedulesViewModel.getNatagaSchedules().observe(this, schedules -> updatePager());
        schedulesViewModel.getLaPlataSchedules().observe(this, schedules -> updatePager());
        
        schedulesViewModel.getIsLoading().observe(this, loading -> {
            if (!loading) {
                shimmerSchedules.stopShimmer();
                shimmerSchedules.setVisibility(View.GONE);
                viewPagerSchedules.setVisibility(View.VISIBLE);
            }
        });
    }

    private void updateCounters() {
        Integer confirmed = profileViewModel.getConfirmedCount().getValue();
        Integer canceled = profileViewModel.getCanceledCount().getValue();
        Integer total = profileViewModel.getTotalCount().getValue();
        uiManager.updateCounters(confirmed != null ? confirmed : 0, 
                                 canceled != null ? canceled : 0, 
                                 total != null ? total : 0);
    }

    private void updatePager() {
        if (pagerAdapter != null) {
            pagerAdapter.actualizarDatos(
                schedulesViewModel.getNatagaSchedules().getValue(),
                schedulesViewModel.getLaPlataSchedules().getValue()
            );
        }
    }

    private void initializeViews() {
        MaterialToolbar topAppBar = findViewById(R.id.topAppBar);
        TextView tvUserName = findViewById(R.id.tvUserName);
        TextView tvWelcome = findViewById(R.id.tvWelcome);
        TextView tvReservasCount = findViewById(R.id.tvReservasCount);
        TextView tvCanceladasCount = findViewById(R.id.tvCanceladasCount);
        TextView tvTotalCount = findViewById(R.id.tvTotalCount);
        TextView tvUserStatusBadge = findViewById(R.id.tvUserStatusBadge);

        legendHeader = findViewById(R.id.legendHeader);
        legendContent = findViewById(R.id.legendContent);
        legendExpandIcon = findViewById(R.id.legendExpandIcon);
        setupLegendToggle();

        tabLayout = findViewById(R.id.tabLayout);
        viewPagerSchedules = findViewById(R.id.viewPagerHorarios);
        shimmerSchedules = findViewById(R.id.shimmer_inicio_usuarios);
        shimmerStats = findViewById(R.id.shimmer_stats);
        layoutRealStats = findViewById(R.id.layout_real_stats);
        ivUserAvatar = findViewById(R.id.ivUserAvatar);

        MaterialCardView cardStatsContainer = findViewById(R.id.cardStatsContainer);
        UIAnimationUtils.playCardEntryAnimation(cardStatsContainer);

        uiManager.setViewReferences(tvUserName, tvWelcome, tvReservasCount, tvCanceladasCount, tvTotalCount);
        uiManager.setStatusBadgeReference(tvUserStatusBadge);
        uiManager.setupToolbar(topAppBar);

        // 🔥 Animación viva para el logo del home
        View logoCard = findViewById(R.id.homeLogoCard);
        if (logoCard != null) {
            UIAnimationUtils.startLogoTiltAnimation(logoCard);
        }

        pagerAdapter = new SchedulePagerAdapter(this, new java.util.ArrayList<>(), new java.util.ArrayList<>());
        viewPagerSchedules.setAdapter(pagerAdapter);
        setupViewPagerAnimation();
        uiManager.setupTabLayout(tabLayout, viewPagerSchedules);

        // 🔥 Auto-scroll al cambiar de pestaña (Trayecto)
        viewPagerSchedules.registerOnPageChangeCallback(new ViewPager2.OnPageChangeCallback() {
            @Override
            public void onPageSelected(int position) {
                super.onPageSelected(position);
                if (pagerAdapter != null) {
                    HorarioFragment fragment = pagerAdapter.getFragment(position);
                    if (fragment != null) {
                        fragment.desplazarAlSiguienteViajeConDelay();
                    }
                }
            }
        });
    }

    private void setupNetworkMonitor() {
        networkMonitor = new NetworkMonitor(this);
        networkMonitor.observe(this, isConnected -> {
            if (!isConnected) {
                if (networkSnackbar == null) {
                    networkSnackbar = Snackbar.make(findViewById(android.R.id.content),
                            getString(R.string.error_no_internet), Snackbar.LENGTH_INDEFINITE);
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
        viewPagerSchedules.setPageTransformer((page, position) -> {
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
    public User getUserActual() {
        return profileViewModel.getUserLiveData().getValue();
    }

    @Override
    protected void onResume() {
        super.onResume();
        // Resetear localmente en el UI Manager y disparar animación a los valores actuales del VM
        if (uiManager != null) {
            uiManager.updateCounters(0, 0, 0);
            updateCounters();
        }
    }
}

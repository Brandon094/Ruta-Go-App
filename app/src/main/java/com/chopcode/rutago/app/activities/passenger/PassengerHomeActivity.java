package com.chopcode.rutago.app.activities.passenger;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.lifecycle.ViewModelProvider;
import androidx.viewpager2.widget.ViewPager2;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.chopcode.rutago.app.R;
import com.facebook.shimmer.ShimmerFrameLayout;
import com.chopcode.rutago.app.adapters.schedules.SchedulePagerAdapter;
import com.chopcode.rutago.app.config.MyApp;
import com.chopcode.rutago.app.managers.core.analytics.DashboardAnalyticsHelper;
import com.chopcode.rutago.app.managers.ui.dashboard.passenger.DashboardUIManager;
import com.chopcode.rutago.app.managers.core.notifications.NotificationManager;
import com.chopcode.rutago.app.fragments.BottomNavFragment;
import com.chopcode.rutago.app.fragments.HorarioFragment;
import com.chopcode.rutago.app.models.User;
import com.chopcode.rutago.app.utils.network.NetworkMonitor;
import com.chopcode.rutago.app.utils.ui.ImageUtils;
import com.chopcode.rutago.app.utils.ui.UIAnimationUtils;
import com.chopcode.rutago.app.utils.ui.WindowUtils;
import com.chopcode.rutago.app.viewmodels.passenger.PassengerProfileViewModel;
import com.chopcode.rutago.app.viewmodels.passenger.ScheduleViewModel;
import com.google.android.material.snackbar.Snackbar;
import com.google.android.material.appbar.MaterialToolbar;
import com.google.android.material.card.MaterialCardView;
import com.google.android.material.tabs.TabLayout;

/**
 * Passenger Home Activity
 *
 * Tablero principal de la experiencia del pasajero.
 * Responsabilidades:
 * - Orquestar la visualización del catálogo de rutas (Natagá ↔ La Plata) mediante ViewPager2 y TabLayout.
 * - Gestionar la reactividad de estadísticas de fidelización (Viajes confirmados, cancelados y total).
 * - Implementar estados de carga elegantes utilizando Shimmer Effects.
 * - Monitorear proactivamente la conectividad mediante el NetworkMonitor para asegurar la transaccionalidad.
 * - Coordinar con el TutorialManager la inducción guiada para nuevos usuarios.
 * - Proveer una navegación fluida mediante el fragmento compartido de Bottom Navigation.
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
    private com.chopcode.rutago.app.managers.ui.tutorials.TutorialManager tutorialManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        EdgeToEdge.enable(this);
        super.onCreate(savedInstanceState);
        Log.d(TAG, "🚀 Iniciando Dashboard de Pasajero.");

        setContentView(R.layout.activity_inicio_usuarios);

        profileViewModel = new ViewModelProvider(this).get(PassengerProfileViewModel.class);
        schedulesViewModel = new ViewModelProvider(this).get(ScheduleViewModel.class);
        
        analyticsHelper = new DashboardAnalyticsHelper();
        uiManager = new DashboardUIManager(analyticsHelper);
        uiManager.setUIActionsListener(this);
        tutorialManager = new com.chopcode.rutago.app.managers.ui.tutorials.TutorialManager(this);

        initializeViews();
        setupInsets();
        setupObservers();

        profileViewModel.init();
        schedulesViewModel.loadSchedules();
        
        setupNetworkMonitor();
        setupBottomNavigation();
        
        tutorialManager.showPassengerHomeGuide();
    }

    /**
     * Configura los observadores de LiveData para una actualización reactiva de la interfaz.
     */
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
                // Delay estratégico para permitir que el Shimmer desaparezca antes de la animación numérica.
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

    /**
     * Sincroniza los contadores animados del Dashboard.
     */
    private void updateCounters() {
        Integer confirmed = profileViewModel.getConfirmedCount().getValue();
        Integer canceled = profileViewModel.getCanceledCount().getValue();
        Integer total = profileViewModel.getTotalCount().getValue();
        uiManager.updateCounters(confirmed != null ? confirmed : 0, 
                                 canceled != null ? canceled : 0, 
                                 total != null ? total : 0);
    }

    /**
     * Refresca el contenido del ViewPager con los nuevos horarios cargados.
     */
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

        View logoCard = findViewById(R.id.homeLogoCard);
        if (logoCard != null) UIAnimationUtils.startLogoTiltAnimation(logoCard);

        pagerAdapter = new SchedulePagerAdapter(this, new java.util.ArrayList<>(), new java.util.ArrayList<>());
        viewPagerSchedules.setAdapter(pagerAdapter);
        setupViewPagerAnimation();
        uiManager.setupTabLayout(tabLayout, viewPagerSchedules);

        // Algoritmo de Auto-scroll al cambiar de trayecto.
        viewPagerSchedules.registerOnPageChangeCallback(new ViewPager2.OnPageChangeCallback() {
            @Override
            public void onPageSelected(int position) {
                super.onPageSelected(position);
                if (pagerAdapter != null) {
                    HorarioFragment fragment = pagerAdapter.getFragment(position);
                    if (fragment != null) fragment.desplazarAlSiguienteViajeConDelay();
                }
            }
        });
    }

    /**
     * Suscribe la pantalla a los cambios de conectividad global.
     */
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

    /**
     * Aplica un transformador de páginas personalizado para suavizar la transición entre rutas.
     */
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

    /**
     * Gestiona los insets del sistema para evitar superposiciones con las barras de estado y navegación.
     */
    private void setupInsets() {
        WindowUtils.applyTopInsetPadding(findViewById(R.id.appBarLayout));
        WindowUtils.applyBottomInsetPadding(findViewById(R.id.bottom_nav_container));
    }

    @Override
    public User getUserActual() {
        return profileViewModel.getUserLiveData().getValue();
    }

    @Override
    protected void onResume() {
        super.onResume();
        
        // 🛡️ REPARACIÓN v1.9.11: Forzar actualización de token FCM al entrar al Home
        String uid = MyApp.getCurrentUserId();
        if (uid != null) {
            NotificationManager.getInstance(this).saveFCMTokenToRealtimeDatabase(uid, "usuario");
        }

        if (uiManager != null) {
            uiManager.updateCounters(0, 0, 0);
            updateCounters();
        }
    }
}

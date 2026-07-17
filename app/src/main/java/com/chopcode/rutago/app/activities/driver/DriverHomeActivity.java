package com.chopcode.rutago.app.activities.driver;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.animation.OvershootInterpolator;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.activities.driver.manager.ManageSeatsActivity;
import com.chopcode.rutago.app.adapters.reservations.ReservationAdapter;
import com.chopcode.rutago.app.adapters.routes.RouteAdapter;
import com.chopcode.rutago.app.adapters.routes.SelectRouteAdapter;
import com.chopcode.rutago.app.config.MyApp;
import com.chopcode.rutago.app.fragments.BottomNavFragment;
import com.chopcode.rutago.app.managers.core.auth.AuthManager;
import com.chopcode.rutago.app.models.Reservation;
import com.chopcode.rutago.app.models.Route;
import com.chopcode.rutago.app.utils.network.NetworkMonitor;
import com.chopcode.rutago.app.utils.ui.UIAnimationUtils;
import com.chopcode.rutago.app.utils.ui.FormatUtils;
import com.chopcode.rutago.app.utils.ui.ImageUtils;
import com.chopcode.rutago.app.utils.ui.WindowUtils;
import com.chopcode.rutago.app.viewmodels.driver.DriverStatsViewModel;
import com.chopcode.rutago.app.viewmodels.driver.DriverProfileViewModel;
import com.chopcode.rutago.app.viewmodels.driver.DriverRoutesViewModel;
import com.chopcode.rutago.app.viewmodels.driver.DriverReservationsViewModel;
import com.facebook.shimmer.ShimmerFrameLayout;
import com.google.android.material.dialog.MaterialAlertDialogBuilder;
import com.google.android.material.snackbar.Snackbar;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;

/**
 * Driver Home Activity
 *
 * Centro neurálgico de la experiencia del conductor.
 * Responsabilidades:
 * - Orquestar la visualización consolidada de estadísticas financieras y operativas en tiempo real.
 * - Gestionar la lista de reservas entrantes permitiendo confirmaciones o cancelaciones atómicas.
 * - Presentar el itinerario diario del conductor mediante un catálogo de rutas horizontales.
 * - Implementar flujos de contingencia para la venta física de asientos (fuera del ecosistema digital).
 * - Monitorear la integridad de la red y el estado de actividad profesional (Active/Rest).
 * - Centralizar múltiples ViewModels para la gestión de perfil, rutas y telemetría operativa.
 */
public class DriverHomeActivity extends AppCompatActivity {
    private static final String TAG = "DriverHomeActivity";

    private boolean isDataLoaded = false;
    private RecyclerView rvReservas, rvProximasRutas, rvRouteBreakdown;
    private TextView tvConductor, tvPlacaVehiculo, tvDriverStatusBadge;
    private TextView tvEmptyReservas, tvEmptyRutas;
    private View layoutFeedbackConductor;
    private ImageView ivConductorAvatar;
    private ShimmerFrameLayout shimmerLayout;
    private ProgressBar progressBar;
    private com.google.android.material.floatingactionbutton.FloatingActionButton fabVentaFisica;

    private TextView tvReservasConfirmadas, tvAsientosDisponibles, tvTotalIngresos;
    private TextView tvUltimaActualizacion, tvContadorReservas, tvContadorRutas;

    private DriverProfileViewModel perfilViewModel;
    private DriverReservationsViewModel reservasViewModel;
    private DriverStatsViewModel estadisticasViewModel;
    private DriverRoutesViewModel rutasViewModel;
    private AuthManager authManager;
    private ReservationAdapter reservationAdapter;
    private RouteAdapter routeAdapter;
    private com.chopcode.rutago.app.adapters.routes.RouteStatAdapter routeStatAdapter;
    private com.chopcode.rutago.app.managers.ui.tutorials.TutorialManager tutorialManager;
    private List<Reservation> reservationList = new ArrayList<>();
    private List<Route> routeList = new ArrayList<>();
    private SimpleDateFormat timeFormat;

    private NetworkMonitor networkMonitor;
    private Snackbar networkSnackbar;

    private int currentConfirmed = 0;
    private int currentAvailable = 0;
    private double currentIncome = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        EdgeToEdge.enable(this);
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_inicio_conductor);

        // Validación de inducción para conductores primerizos.
        com.chopcode.rutago.app.managers.core.settings.SessionManager sessionManager = new com.chopcode.rutago.app.managers.core.settings.SessionManager(this);
        if (sessionManager.isFirstTimeDriver()) {
            startActivity(new Intent(this, DriverOnboardingActivity.class));
        }

        authManager = AuthManager.getInstance();
        timeFormat = new SimpleDateFormat("HH:mm", Locale.getDefault());

        perfilViewModel = new ViewModelProvider(this).get(DriverProfileViewModel.class);
        reservasViewModel = new ViewModelProvider(this).get(DriverReservationsViewModel.class);
        estadisticasViewModel = new ViewModelProvider(this).get(DriverStatsViewModel.class);
        rutasViewModel = new ViewModelProvider(this).get(DriverRoutesViewModel.class);
        tutorialManager = new com.chopcode.rutago.app.managers.ui.tutorials.TutorialManager(this);

        initializeViews();
        setupInsets();
        setupRecyclerView();
        setupButtons();
        setupObservers();
        setupBottomNavigation();

        loadDriverData();
        setupNetworkMonitor();

        tutorialManager.showDriverHomeGuide();
    }

    private void setupNetworkMonitor() {
        networkMonitor = new NetworkMonitor(this);
        networkMonitor.observe(this, isConnected -> {
            if (!isConnected) showNoInternetSnackbar();
            else dismissNetworkSnackbar();
        });
    }

    private void showNoInternetSnackbar() {
        if (networkSnackbar == null) {
            networkSnackbar = Snackbar.make(findViewById(android.R.id.content), getString(R.string.network_error_driver), Snackbar.LENGTH_INDEFINITE);
            networkSnackbar.setBackgroundTint(getColor(R.color.error_500));
        }
        if (!networkSnackbar.isShown()) networkSnackbar.show();
    }

    private void dismissNetworkSnackbar() {
        if (networkSnackbar != null && networkSnackbar.isShown()) networkSnackbar.dismiss();
    }

    private void setupBottomNavigation() {
        getSupportFragmentManager().beginTransaction()
                .replace(R.id.bottom_nav_container, BottomNavFragment.newInstance(true))
                .commit();
    }

    /**
     * Inicializa componentes y aplica animaciones premium de entrada escalonada.
     */
    private void initializeViews() {
        tvConductor = findViewById(R.id.tvConductor);
        tvPlacaVehiculo = findViewById(R.id.tvPlacaVehiculo);
        tvReservasConfirmadas = findViewById(R.id.tvReservasConfirmadas);
        tvAsientosDisponibles = findViewById(R.id.tvAsientosDisponibles);
        tvTotalIngresos = findViewById(R.id.tvTotalIngresos);
        tvUltimaActualizacion = findViewById(R.id.tvUltimaActualizacion);
        tvContadorReservas = findViewById(R.id.tvContadorReservas);
        tvContadorRutas = findViewById(R.id.tvContadorRutas);
        progressBar = findViewById(R.id.progressBar);
        rvReservas = findViewById(R.id.recyclerReservas);
        rvProximasRutas = findViewById(R.id.recyclerProximasRutas);
        rvRouteBreakdown = findViewById(R.id.rvRouteBreakdown);
        tvEmptyReservas = findViewById(R.id.tvEmptyReservas);
        tvEmptyRutas = findViewById(R.id.tvEmptyRutas);
        layoutFeedbackConductor = findViewById(R.id.layoutFeedbackConductor);
        shimmerLayout = findViewById(R.id.shimmer_inicio_conductor);
        fabVentaFisica = findViewById(R.id.fabVentaFisica);
        ivConductorAvatar = findViewById(R.id.ivConductorAvatar);
        tvDriverStatusBadge = findViewById(R.id.tvDriverStatusBadge);

        View logoCard = findViewById(R.id.driverHomeLogoCard);
        if (logoCard != null) UIAnimationUtils.startLogoTiltAnimation(logoCard);

        UIAnimationUtils.playCardEntryAnimation(findViewById(R.id.cardEstadisticas));
        UIAnimationUtils.playCardEntryAnimation(findViewById(R.id.cardReservas));
        UIAnimationUtils.playCardEntryAnimation(findViewById(R.id.cardRutas));

        actualizarTiempoActualizacion();
    }

    private void setupButtons() {
        ImageView icRefresh = findViewById(R.id.ic_refresh);
        if (icRefresh != null) {
            UIAnimationUtils.setClickAnimation(icRefresh);
            icRefresh.setOnClickListener(view -> {
                if (isDataLoaded) {
                    icRefresh.animate().rotationBy(720f).setDuration(2000).setInterpolator(new OvershootInterpolator(1.0f)).start();
                    reloadAllData();
                }
            });
        }
        if (fabVentaFisica != null) {
            UIAnimationUtils.setClickAnimation(fabVentaFisica);
            fabVentaFisica.setOnClickListener(view -> handlePhysicalSaleAction());
        }
    }

    /**
     * Orquesta el flujo de venta manual filtrando solo rutas activas del itinerario.
     */
    private void handlePhysicalSaleAction() {
        if (routeList == null || routeList.isEmpty()) {
            Toast.makeText(this, R.string.no_rutas_asignadas, Toast.LENGTH_SHORT).show();
            return;
        }
        
        List<Route> activeRoutes = new ArrayList<>();
        for (Route r : routeList) {
            if (r.getTime() != null && !FormatUtils.esHorarioPasado(r.getTime().getTime())) {
                activeRoutes.add(r);
            }
        }

        if (activeRoutes.isEmpty()) {
            Toast.makeText(this, R.string.no_rutas_activas_venta, Toast.LENGTH_SHORT).show();
            return;
        }

        if (activeRoutes.size() == 1) abrirGestionAsientos(activeRoutes.get(0));
        else mostrarSelectorDeRuta(activeRoutes);
    }

    private void abrirGestionAsientos(Route route) {
        Intent intent = new Intent(this, ManageSeatsActivity.class);
        intent.putExtra("horarioId", route.getScheduleId());
        intent.putExtra("rutaNombre", route.getOrigin() + " -> " + route.getDestination());
        intent.putExtra("horarioHora", route.getTime() != null ? route.getTime().getTime() : "--:--");
        intent.putExtra("rutaPrecio", route.getFare());
        startActivity(intent);
    }

    private void mostrarSelectorDeRuta(List<Route> routes) {
        if (routes == null || routes.isEmpty()) return;
        View dialogView = LayoutInflater.from(this).inflate(R.layout.dialog_select_route, null);
        RecyclerView rv = dialogView.findViewById(R.id.rvSelectRoute);
        androidx.appcompat.app.AlertDialog dialog = new MaterialAlertDialogBuilder(this, R.style.AppDialogTheme)
                .setView(dialogView).setNegativeButton(R.string.volver, null).create();
        rv.setLayoutManager(new LinearLayoutManager(this));
        rv.setAdapter(new SelectRouteAdapter(routes, route -> {
            dialog.dismiss();
            abrirGestionAsientos(route);
        }));
        dialog.show();
    }

    /**
     * Suscribe la UI a los cambios del repositorio Firebase mediante LiveData.
     */
    private void setupObservers() {
        perfilViewModel.getLoadingLiveData().observe(this, isLoading -> {
            if (Boolean.TRUE.equals(isLoading)) {
                if (shimmerLayout != null) { shimmerLayout.setVisibility(View.VISIBLE); shimmerLayout.startShimmer(); }
            } else {
                if (shimmerLayout != null) { shimmerLayout.stopShimmer(); shimmerLayout.setVisibility(View.GONE); }
                new android.os.Handler().postDelayed(this::animateDashboardStats, 300);
            }
        });

        perfilViewModel.getConductorLiveData().observe(this, driver -> {
            if (driver != null) {
                tvConductor.setText(driver.getNombre());
                tvPlacaVehiculo.setText(getString(R.string.placa_label_format, driver.getVehiclePlate()));
                ImageUtils.loadProfilePhoto(this, driver.getPhotoUrl(), ivConductorAvatar);
                actualizarBadgeEstado(driver.getStatus());

                if (driver.getVehicleCapacity() > 0) estadisticasViewModel.setCapacidadVehiculo(driver.getVehicleCapacity());

                if (driver.getAssignedSchedules() != null) {
                    List<String> horarios = driver.getAssignedSchedules();
                    rutasViewModel.loadRoutes(horarios);
                    reservasViewModel.setHorariosAsignados(horarios);
                    reservasViewModel.cargarReservasPendientes();
                    estadisticasViewModel.setHorariosAsignados(new ArrayList<>(horarios));
                    tvEmptyRutas.setVisibility(horarios.isEmpty() ? View.VISIBLE : View.GONE);
                }

                String userId = MyApp.getCurrentUserId();
                if (userId != null && !isDataLoaded) {
                    reservasViewModel.inicializarConIdConductor(userId);
                    estadisticasViewModel.setConductorActual(userId);
                    estadisticasViewModel.refreshStatistics();
                    isDataLoaded = true;
                }
            }
        });

        reservasViewModel.getReservasPendientesLiveData().observe(this, reservations -> {
            if (reservations != null) {
                reservationList.clear();
                reservationList.addAll(reservations);
                if (reservationAdapter != null) reservationAdapter.actualizarReservas(new ArrayList<>(reservations));
                updateReservationsUI();
                tvContadorReservas.setText(getString(R.string.contador_reservas, reservations.size()));
                if (!routeList.isEmpty()) estadisticasViewModel.calculateRouteStatistics();
            }
        });

        rutasViewModel.getRutasLiveData().observe(this, routes -> {
            if (routes != null && !routes.isEmpty()) {
                routeList.clear();
                routeList.addAll(routes);
                if (routeAdapter != null) routeAdapter.actualizarRutas(new ArrayList<>(routes));
                updateRoutesUI();
                tvContadorRutas.setText(getString(R.string.contador_rutas, routes.size()));
                estadisticasViewModel.setRutasActivas(routes);
                if (!reservationList.isEmpty()) estadisticasViewModel.calculateRouteStatistics();
                actualizarTiempoActualizacion();
            }
        });

        estadisticasViewModel.getReservasConfirmadasLiveData().observe(this, count -> animateDashboardStats());
        estadisticasViewModel.getAsientosDisponiblesLiveData().observe(this, asientos -> animateDashboardStats());
        estadisticasViewModel.getIngresosLiveData().observe(this, ingresos -> animateDashboardStats());
        
        estadisticasViewModel.getRouteStatsLiveData().observe(this, stats -> {
            if (stats != null && routeStatAdapter != null) routeStatAdapter.updateStats(stats);
        });
    }

    /**
     * Ejecuta interpolaciones numéricas para actualizar los indicadores financieros.
     */
    private void animateDashboardStats() {
        if (Boolean.TRUE.equals(perfilViewModel.getLoadingLiveData().getValue())) return;

        Integer confirmed = estadisticasViewModel.getReservasConfirmadasLiveData().getValue();
        Integer available = estadisticasViewModel.getAsientosDisponiblesLiveData().getValue();
        Double income = estadisticasViewModel.getIngresosLiveData().getValue();

        if (confirmed != null) {
            UIAnimationUtils.animateNumericText(tvReservasConfirmadas, currentConfirmed, confirmed);
            currentConfirmed = confirmed;
        }
        if (available != null) {
            UIAnimationUtils.animateNumericText(tvAsientosDisponibles, currentAvailable, available);
            currentAvailable = available;
        }
        if (income != null) {
            UIAnimationUtils.animateCurrencyText(tvTotalIngresos, currentIncome, income);
            currentIncome = income;
        }
    }

    private void setupRecyclerView() {
        reservationAdapter = new ReservationAdapter(reservationList, new ReservationAdapter.OnReservaClickListener() {
            @Override
            public void onConfirmarClick(Reservation reservation) { showConfirmationDialog(reservation, true); }
            @Override
            public void onCancelarClick(Reservation reservation) { showConfirmationDialog(reservation, false); }
        });
        rvReservas.setLayoutManager(new LinearLayoutManager(this));
        rvReservas.setAdapter(reservationAdapter);

        routeAdapter = new RouteAdapter(routeList, route -> abrirGestionAsientos(route));
        rvProximasRutas.setLayoutManager(new LinearLayoutManager(this, LinearLayoutManager.HORIZONTAL, false));
        rvProximasRutas.setAdapter(routeAdapter);

        routeStatAdapter = new com.chopcode.rutago.app.adapters.routes.RouteStatAdapter();
        rvRouteBreakdown.setLayoutManager(new LinearLayoutManager(this, LinearLayoutManager.HORIZONTAL, false));
        rvRouteBreakdown.setAdapter(routeStatAdapter);
    }

    private void loadDriverData() {
        if (!authManager.validateLogin(this)) { finish(); return; }
        String userId = MyApp.getCurrentUserId();
        if (userId != null) perfilViewModel.cargarDatosCompletos(userId);
    }

    private void reloadAllData() {
        String userId = MyApp.getCurrentUserId();
        if (userId != null) {
            perfilViewModel.refrescarDatos();
            reservasViewModel.refrescarReservas();
            actualizarTiempoActualizacion();
        }
    }

    /**
     * Muestra una advertencia antes de ejecutar acciones de control sobre tiquetes de pasajeros.
     */
    private void showConfirmationDialog(Reservation reservation, boolean isConfirmation) {
        new MaterialAlertDialogBuilder(this, R.style.AppDialogTheme)
                .setTitle(isConfirmation ? R.string.confirmar : R.string.cancelar)
                .setMessage(isConfirmation ? getString(R.string.confirmar_reserva_pregunta, reservation.getName()) : getString(R.string.cancelar_reserva_pregunta, reservation.getName()))
                .setPositiveButton(isConfirmation ? R.string.confirmar : R.string.cancelar, (dialog, which) -> {
                    if (isConfirmation) reservasViewModel.confirmarReserva(this, reservation);
                    else reservasViewModel.cancelarReserva(this, reservation);
                    actualizarTiempoActualizacion();
                })
                .setNegativeButton(R.string.volver, null).show();
    }

    private void updateReservationsUI() {
        boolean hasReservations = !reservationList.isEmpty();
        tvEmptyReservas.setVisibility(hasReservations ? View.GONE : View.VISIBLE);
        rvReservas.setVisibility(hasReservations ? View.VISIBLE : View.GONE);
    }

    private void updateRoutesUI() {
        if (routeList == null || routeList.isEmpty()) {
            showEmptyRoutes();
            return;
        }

        boolean todasFinalizadas = true;
        for (Route r : routeList) {
            if (r.getTime() != null && !FormatUtils.esHorarioPasado(r.getTime().getTime())) {
                todasFinalizadas = false;
                break;
            }
        }

        if (todasFinalizadas) {
            findViewById(R.id.cardRutas).setVisibility(View.GONE);
            if (layoutFeedbackConductor != null) {
                layoutFeedbackConductor.setVisibility(View.VISIBLE);
                UIAnimationUtils.playCardEntryAnimation(layoutFeedbackConductor);
            }
        } else {
            findViewById(R.id.cardRutas).setVisibility(View.VISIBLE);
            rvProximasRutas.setVisibility(View.VISIBLE);
            tvEmptyRutas.setVisibility(View.GONE);
            if (layoutFeedbackConductor != null) layoutFeedbackConductor.setVisibility(View.GONE);
        }
    }

    private void actualizarTiempoActualizacion() {
        if (tvUltimaActualizacion != null) tvUltimaActualizacion.setText(getString(R.string.actualizado_label_format, timeFormat.format(new Date())));
    }

    private void showEmptyReservations() { tvEmptyReservas.setVisibility(View.VISIBLE); rvReservas.setVisibility(View.GONE); }
    private void showEmptyRoutes() { tvEmptyRutas.setVisibility(View.VISIBLE); rvProximasRutas.setVisibility(View.GONE); }

    /**
     * Actualiza el indicador visual de estatus profesional con efectos de pulso para conductores activos.
     */
    private void actualizarBadgeEstado(String status) {
        if (tvDriverStatusBadge == null) return;
        
        UIAnimationUtils.stopAnimation(tvDriverStatusBadge);
        tvDriverStatusBadge.setTextColor(getColor(R.color.white));

        if (status == null) status = "active";
        
        switch (status.toLowerCase()) {
            case "active":
                tvDriverStatusBadge.setText(R.string.status_conductor_activo);
                tvDriverStatusBadge.setBackgroundResource(R.drawable.bg_badge_active);
                UIAnimationUtils.startPulseAnimation(tvDriverStatusBadge);
                break;
            case "inactive":
                tvDriverStatusBadge.setText(R.string.status_conductor_descanso);
                tvDriverStatusBadge.setBackgroundResource(R.drawable.bg_badge_inactive);
                break;
            default:
                tvDriverStatusBadge.setText(R.string.status_conductor_activo);
                tvDriverStatusBadge.setBackgroundResource(R.drawable.bg_badge_active);
                UIAnimationUtils.startPulseAnimation(tvDriverStatusBadge);
                break;
        }
    }

    /**
     * Gestiona los insets del sistema para evitar superposiciones con las barras de estado y navegación.
     */
    private void setupInsets() {
        WindowUtils.applyTopInsetPadding(findViewById(R.id.appBarLayout));
        WindowUtils.applyBottomInsetMargin(findViewById(R.id.bottom_nav_container));
    }

    @Override
    protected void onPause() { super.onPause(); reservasViewModel.pausarActualizacionesTiempoReal(); }
    @Override
    protected void onResume() { 
        super.onResume(); 
        reservasViewModel.reanudarActualizacionesTiempoReal(); 
        if (isDataLoaded) {
            currentConfirmed = 0;
            currentAvailable = 0;
            currentIncome = 0;
            reloadAllData(); 
        }
    }
}

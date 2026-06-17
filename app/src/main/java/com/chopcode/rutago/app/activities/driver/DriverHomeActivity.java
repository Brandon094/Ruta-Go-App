package com.chopcode.rutago.app.activities.driver;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.animation.OvershootInterpolator;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.activities.driver.manager.ManageSeatsActivity;
import com.chopcode.rutago.app.adapters.reservas.ReservationAdapter;
import com.chopcode.rutago.app.adapters.rutas.RouteAdapter;
import com.chopcode.rutago.app.adapters.rutas.SelectRouteAdapter;
import com.chopcode.rutago.app.config.MyApp;
import com.chopcode.rutago.app.fragments.BottomNavFragment;
import com.chopcode.rutago.app.managers.auths.AuthManager;
import com.chopcode.rutago.app.models.Reservation;
import com.chopcode.rutago.app.models.Route;
import com.chopcode.rutago.app.utils.network.NetworkMonitor;
import com.chopcode.rutago.app.utils.ui.FormatUtils;
import com.chopcode.rutago.app.utils.ui.ImageUtils;
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
 * 🏠 Driver Home Activity
 * 
 * Centro de control principal para el conductor.
 * Responsabilidades:
 * - Mostrar un resumen reactivo de estadísticas (Ingresos, Reservas, Asientos).
 * - Listar reservas pendientes para acción inmediata (Confirmar/Cancelar).
 * - Visualizar el itinerario del día con acceso a la gestión de asientos.
 * - Monitorear el estado de la red para garantizar la sincronización de datos.
 * 
 * Implementa una arquitectura multi-ViewModel para separar responsabilidades de perfil, 
 * reservas, estadísticas y rutas.
 */
public class DriverHomeActivity extends AppCompatActivity {
    private static final String TAG = "DriverHomeActivity";

    private boolean isDataLoaded = false;
    private RecyclerView rvReservas, rvProximasRutas;
    private TextView tvConductor, tvPlacaVehiculo;
    private TextView tvEmptyReservas, tvEmptyRutas;
    private ImageView ivConductorAvatar;
    private ShimmerFrameLayout shimmerLayout;
    private ProgressBar progressBar;
    private com.google.android.material.floatingactionbutton.FloatingActionButton fabVentaFisica;

    private TextView tvReservasConfirmadas, tvAsientosDisponibles, tvTotalIngresos;
    private TextView tvUltimaActualizacion;
    private TextView tvContadorReservas, tvContadorRutas;

    private DriverProfileViewModel perfilViewModel;
    private DriverReservationsViewModel reservasViewModel;
    private DriverStatsViewModel estadisticasViewModel;
    private DriverRoutesViewModel rutasViewModel;
    private AuthManager authManager;
    private ReservationAdapter reservationAdapter;
    private RouteAdapter routeAdapter;
    private List<Reservation> reservationList = new ArrayList<>();
    private List<Route> routeList = new ArrayList<>();
    private SimpleDateFormat timeFormat;

    private NetworkMonitor networkMonitor;
    private Snackbar networkSnackbar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_inicio_conductor);

        authManager = AuthManager.getInstance();
        timeFormat = new SimpleDateFormat("HH:mm", Locale.getDefault());

        perfilViewModel = new ViewModelProvider(this).get(DriverProfileViewModel.class);
        reservasViewModel = new ViewModelProvider(this).get(DriverReservationsViewModel.class);
        estadisticasViewModel = new ViewModelProvider(this).get(DriverStatsViewModel.class);
        rutasViewModel = new ViewModelProvider(this).get(DriverRoutesViewModel.class);

        initializeViews();
        setupRecyclerView();
        setupButtons();
        setupObservers();
        setupBottomNavigation();

        loadDriverData();
        setupNetworkMonitor();
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
            networkSnackbar.setTextColor(getColor(R.color.white));
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
        tvEmptyReservas = findViewById(R.id.tvEmptyReservas);
        tvEmptyRutas = findViewById(R.id.tvEmptyRutas);
        shimmerLayout = findViewById(R.id.shimmer_inicio_conductor);
        fabVentaFisica = findViewById(R.id.fabVentaFisica);
        ivConductorAvatar = findViewById(R.id.ivConductorAvatar);
        actualizarTiempoActualizacion();
    }

    private void setupButtons() {
        ImageView icRefresh = findViewById(R.id.ic_refresh);
        if (icRefresh != null) {
            icRefresh.setOnClickListener(view -> {
                if (isDataLoaded) {
                    icRefresh.animate().rotationBy(720f).setDuration(2000).setInterpolator(new OvershootInterpolator(1.0f)).start();
                    reloadAllData();
                }
            });
        }
        if (fabVentaFisica != null) {
            fabVentaFisica.setOnClickListener(view -> {
                if (routeList == null || routeList.isEmpty()) {
                    Toast.makeText(this, "No assigned routes", Toast.LENGTH_SHORT).show();
                    return;
                }
                if (routeList.size() == 1) abrirGestionAsientos(routeList.get(0));
                else mostrarSelectorDeRuta();
            });
        }
    }

    private void abrirGestionAsientos(Route route) {
        Intent intent = new Intent(this, ManageSeatsActivity.class);
        intent.putExtra("horarioId", route.getScheduleId());
        intent.putExtra("rutaNombre", route.getOrigin() + " -> " + route.getDestination());
        intent.putExtra("horarioHora", route.getTime() != null ? route.getTime().getTime() : "--:--");
        startActivity(intent);
    }

    private void mostrarSelectorDeRuta() {
        if (routeList == null || routeList.isEmpty()) return;
        View dialogView = LayoutInflater.from(this).inflate(R.layout.dialog_select_route, null);
        RecyclerView rv = dialogView.findViewById(R.id.rvSelectRoute);
        androidx.appcompat.app.AlertDialog dialog = new MaterialAlertDialogBuilder(this, R.style.AppDialogTheme)
                .setView(dialogView).setNegativeButton("Back", null).create();
        rv.setLayoutManager(new LinearLayoutManager(this));
        rv.setAdapter(new SelectRouteAdapter(routeList, route -> {
            dialog.dismiss();
            abrirGestionAsientos(route);
        }));
        dialog.show();
    }

    private void setupObservers() {
        perfilViewModel.getLoadingLiveData().observe(this, isLoading -> {
            if (isLoading != null) {
                if (isLoading) {
                    if (shimmerLayout != null) { shimmerLayout.setVisibility(View.VISIBLE); shimmerLayout.startShimmer(); }
                } else {
                    if (shimmerLayout != null) { shimmerLayout.stopShimmer(); shimmerLayout.setVisibility(View.GONE); }
                }
            }
        });

        perfilViewModel.getConductorNombreLiveData().observe(this, nombre -> {
            if (nombre != null && !nombre.isEmpty()) {
                tvConductor.setText(nombre);
                String userId = MyApp.getCurrentUserId();
                if (userId != null) {
                    reservasViewModel.inicializarConIdConductor(userId);
                    estadisticasViewModel.setConductorActual(userId);
                    estadisticasViewModel.refreshStatistics();
                }
                isDataLoaded = true;
            }
        });

        perfilViewModel.getPlacaVehiculoLiveData().observe(this, placa -> {
            if (placa != null) tvPlacaVehiculo.setText("Plate: " + placa);
        });

        perfilViewModel.getCapacidadVehiculoLiveData().observe(this, capacity -> {
            if (capacity != null && capacity > 0) {
                estadisticasViewModel.setCapacidadVehiculo(capacity);
            }
        });

        perfilViewModel.getHorariosAsignadosLiveData().observe(this, horarios -> {
            Log.d(TAG, "Assigned schedules changed: " + (horarios != null ? horarios.size() : "null") + " -> " + horarios);
            if (horarios != null && !horarios.isEmpty()) {
                rutasViewModel.loadRoutes(horarios);
                reservasViewModel.setHorariosAsignados(horarios);
                reservasViewModel.cargarReservasPendientes();
                
                estadisticasViewModel.setHorariosAsignados(new ArrayList<>(horarios));
                String userId = MyApp.getCurrentUserId();
                if (userId != null) {
                    estadisticasViewModel.setConductorActual(userId);
                }
                estadisticasViewModel.refreshStatistics();

                tvEmptyRutas.setVisibility(View.GONE);
            } else {
                tvEmptyRutas.setVisibility(View.VISIBLE);
            }
        });

        perfilViewModel.getConductorLiveData().observe(this, driver -> {
            if (driver != null) ImageUtils.loadProfilePhoto(this, driver.getPhotoUrl(), ivConductorAvatar);
        });

        reservasViewModel.getReservasPendientesLiveData().observe(this, reservations -> {
            if (reservations != null) {
                reservationList.clear();
                reservationList.addAll(reservations);
                if (reservationAdapter != null) reservationAdapter.actualizarReservas(new ArrayList<>(reservations));
                updateReservationsUI();
                tvContadorReservas.setText(getString(R.string.contador_reservas, reservations.size()));
                if (!routeList.isEmpty()) estadisticasViewModel.calculateRouteStatistics();
            } else {
                tvContadorReservas.setText(getString(R.string.contador_reservas, 0));
                showEmptyReservations();
            }
        });

        rutasViewModel.getRutasLiveData().observe(this, routes -> {
            Log.d(TAG, "Routes received: " + (routes != null ? routes.size() : "null"));
            if (routes != null && !routes.isEmpty()) {
                routeList.clear();
                routeList.addAll(routes);
                if (routeAdapter != null) routeAdapter.actualizarRutas(new ArrayList<>(routes));
                updateRoutesUI();
                tvContadorRutas.setText(getString(R.string.contador_rutas, routes.size()));
                if (!reservationList.isEmpty()) estadisticasViewModel.calculateRouteStatistics();
                actualizarTiempoActualizacion();
            } else {
                tvContadorRutas.setText(getString(R.string.contador_rutas, 0));
                showEmptyRoutes();
            }
        });

        estadisticasViewModel.getReservasConfirmadasLiveData().observe(this, count -> {
            if (count != null) tvReservasConfirmadas.setText(String.valueOf(count));
        });

        estadisticasViewModel.getAsientosDisponiblesLiveData().observe(this, asientos -> {
            if (asientos != null) tvAsientosDisponibles.setText(String.valueOf(asientos));
        });

        estadisticasViewModel.getIngresosLiveData().observe(this, ingresos -> {
            if (ingresos != null) {
                tvTotalIngresos.setText(FormatUtils.formatearPrecio(ingresos));
                actualizarTiempoActualizacion();
            }
        });

        // Detailed route stats
        estadisticasViewModel.getNombreRuta1LiveData().observe(this, name -> ((TextView)findViewById(R.id.tvNombreRutaReservas)).setText(name));
        estadisticasViewModel.getReservasRuta1LiveData().observe(this, count -> ((TextView)findViewById(R.id.tvReservasRuta)).setText(String.valueOf(count)));
        estadisticasViewModel.getAsientosRuta1LiveData().observe(this, count -> ((TextView)findViewById(R.id.tvAsientosRuta)).setText(String.valueOf(count)));

        estadisticasViewModel.getNombreRuta2LiveData().observe(this, name -> ((TextView)findViewById(R.id.tvNombreRutaReservas2)).setText(name));
        estadisticasViewModel.getReservasRuta2LiveData().observe(this, count -> ((TextView)findViewById(R.id.tvReservasRuta2)).setText(String.valueOf(count)));
        estadisticasViewModel.getAsientosRuta2LiveData().observe(this, count -> ((TextView)findViewById(R.id.tvAsientosRuta2)).setText(String.valueOf(count)));
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

    private void showConfirmationDialog(Reservation reservation, boolean isConfirmation) {
        new MaterialAlertDialogBuilder(this, R.style.AppDialogTheme)
                .setTitle(isConfirmation ? "Confirm" : "Cancel")
                .setMessage(isConfirmation ? "Confirm reservation for " + reservation.getName() + "?" : "Cancel reservation for " + reservation.getName() + "?")
                .setPositiveButton(isConfirmation ? "Confirm" : "Cancel", (dialog, which) -> {
                    if (isConfirmation) reservasViewModel.confirmarReserva(this, reservation);
                    else reservasViewModel.cancelarReserva(this, reservation);
                    actualizarTiempoActualizacion();
                })
                .setNegativeButton("Back", null).show();
    }

    private void updateReservationsUI() {
        boolean hasReservations = !reservationList.isEmpty();
        tvEmptyReservas.setVisibility(hasReservations ? View.GONE : View.VISIBLE);
        rvReservas.setVisibility(hasReservations ? View.VISIBLE : View.GONE);
    }

    private void updateRoutesUI() {
        boolean hasRoutes = !routeList.isEmpty();
        tvEmptyRutas.setVisibility(hasRoutes ? View.GONE : View.VISIBLE);
        rvProximasRutas.setVisibility(hasRoutes ? View.VISIBLE : View.GONE);
    }

    private void actualizarTiempoActualizacion() {
        if (tvUltimaActualizacion != null) tvUltimaActualizacion.setText("Updated: " + timeFormat.format(new Date()));
    }

    private void showEmptyReservations() { tvEmptyReservas.setVisibility(View.VISIBLE); rvReservas.setVisibility(View.GONE); }
    private void showEmptyRoutes() { tvEmptyRutas.setVisibility(View.VISIBLE); rvProximasRutas.setVisibility(View.GONE); }

    @Override
    protected void onPause() { super.onPause(); reservasViewModel.pausarActualizacionesTiempoReal(); }
    @Override
    protected void onResume() { super.onResume(); reservasViewModel.reanudarActualizacionesTiempoReal(); if (isDataLoaded) reloadAllData(); }
    @Override
    protected void onDestroy() { super.onDestroy(); perfilViewModel.limpiarDatos(); }
}

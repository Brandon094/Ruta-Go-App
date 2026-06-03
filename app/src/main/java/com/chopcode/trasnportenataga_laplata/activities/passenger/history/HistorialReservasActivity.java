package com.chopcode.trasnportenataga_laplata.activities.passenger.history;

import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.chopcode.trasnportenataga_laplata.R;
import com.chopcode.trasnportenataga_laplata.fragments.BottomNavFragment;
import com.chopcode.trasnportenataga_laplata.adapters.historial.HistorialPasajeroAdapter;
import com.chopcode.trasnportenataga_laplata.managers.auths.AuthManager;
import com.chopcode.trasnportenataga_laplata.models.Reserva;
import com.chopcode.trasnportenataga_laplata.services.reservations.ReservaService;
import com.chopcode.trasnportenataga_laplata.services.reservations.passenger.PassengerReservationService;
import com.google.android.material.appbar.MaterialToolbar;
import com.google.android.material.card.MaterialCardView;
import com.google.android.material.chip.ChipGroup;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.android.material.snackbar.Snackbar;
import com.google.firebase.auth.FirebaseUser;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Map;

public class HistorialReservasActivity extends AppCompatActivity {

    private static final String TAG = "HistorialReservas";

    // Views
    private MaterialToolbar toolbar;
    private ChipGroup chipGroupFiltros;
    private RecyclerView recyclerHistorial;
    private View layoutEmptyState;
    private FloatingActionButton fabActualizar;
    private TextView tvTotalViajes, tvViajesConfirmados, tvViajesCancelados, tvTituloHistorial;
    
    // Premium Views
    private MaterialCardView cardPremiumStats;
    private TextView tvTotalGastadoPremium, tvPuntosLealtad, tvRutaFavorita;

    // Servicios y managers
    private ReservaService reservaService;
    private PassengerReservationService passengerReservationService;
    private AuthManager authManager;

    // Adapter y datos
    private HistorialPasajeroAdapter adapter;
    private List<Reserva> listaReservas = new ArrayList<>();
    private List<Reserva> listaFiltrada = new ArrayList<>();

    // Estado Premium
    private boolean esUsuarioPremium = false;

    // Formateador de fechas
    private SimpleDateFormat dateFormat = new SimpleDateFormat("dd MMM yyyy - HH:mm", new Locale("es", "ES"));

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.d(TAG, "🚀 onCreate - Iniciando historial de reservas");

        setContentView(R.layout.activity_historial_reservas);

        // Inicializar servicios
        reservaService = new ReservaService();
        passengerReservationService = new PassengerReservationService();
        authManager = AuthManager.getInstance();

        // Inicializar vistas
        initViews();
        verificarEstadoPremium();
        setupToolbar();
        setupRecyclerView();
        setupListeners();
        setupBottomNavigation();

        // Cargar datos
        cargarHistorialUsuario();
    }

    private void setupBottomNavigation() {
        getSupportFragmentManager().beginTransaction()
                .replace(R.id.bottom_nav_container, BottomNavFragment.newInstance(false))
                .commit();
    }

    private void verificarEstadoPremium() {
        // ✅ AQUÍ DEBERÍAS CARGAR EL ESTADO REAL
        esUsuarioPremium = true; 
    }

    private void initViews() {
        toolbar = findViewById(R.id.toolbar);
        chipGroupFiltros = findViewById(R.id.chipGroupFiltros);
        recyclerHistorial = findViewById(R.id.recyclerHistorial);
        layoutEmptyState = findViewById(R.id.layoutEmptyState);
        fabActualizar = findViewById(R.id.fabActualizar);
        tvTotalViajes = findViewById(R.id.tvTotalViajes);
        tvViajesConfirmados = findViewById(R.id.tvViajesConfirmados);
        tvViajesCancelados = findViewById(R.id.tvViajesCancelados);
        tvTituloHistorial = findViewById(R.id.tvTituloHistorial);

        // Vistas Premium
        cardPremiumStats = findViewById(R.id.cardPremiumStats);
        tvTotalGastadoPremium = findViewById(R.id.tvTotalGastadoPremium);
        tvPuntosLealtad = findViewById(R.id.tvPuntosLealtad);
        tvRutaFavorita = findViewById(R.id.tvRutaFavorita);
    }

    private void setupToolbar() {
        setSupportActionBar(toolbar);
        if (getSupportActionBar() != null) {
            getSupportActionBar().setDisplayHomeAsUpEnabled(true);
            getSupportActionBar().setDisplayShowHomeEnabled(true);
        }
        toolbar.setNavigationOnClickListener(v -> onBackPressed());
    }

    private void setupRecyclerView() {
        adapter = new HistorialPasajeroAdapter(listaFiltrada);
        recyclerHistorial.setLayoutManager(new LinearLayoutManager(this));
        recyclerHistorial.setAdapter(adapter);
    }

    private void setupListeners() {
        fabActualizar.setOnClickListener(v -> {
            cargarHistorialUsuario();
            Snackbar.make(v, "Actualizando historial...", Snackbar.LENGTH_SHORT).show();
        });

        chipGroupFiltros.setOnCheckedStateChangeListener((group, checkedIds) -> {
            if (checkedIds.isEmpty()) {
                aplicarFiltro("TODOS");
            } else {
                aplicarFiltroPorChip(checkedIds.get(0));
            }
        });
    }

    private void aplicarFiltroPorChip(int chipId) {
        if (chipId == R.id.chipTodos) aplicarFiltro("TODOS");
        else if (chipId == R.id.chipConfirmados) aplicarFiltro("CONFIRMADOS");
        else if (chipId == R.id.chipCancelados) aplicarFiltro("CANCELADOS");
        else if (chipId == R.id.chipEsteMes) aplicarFiltro("ESTE_MES");
    }

    private void aplicarFiltro(String tipoFiltro) {
        listaFiltrada.clear();
        long unMesAtras = System.currentTimeMillis() - (30L * 24 * 60 * 60 * 1000);

        for (Reserva reserva : listaReservas) {
            boolean coincide = false;
            String estado = reserva.getEstadoReserva();
            if (estado == null) estado = "";

            switch (tipoFiltro) {
                case "TODOS": coincide = true; break;
                case "CONFIRMADOS": coincide = estado.equalsIgnoreCase("confirmado") || estado.equalsIgnoreCase("confirmada"); break;
                case "CANCELADOS": coincide = estado.equalsIgnoreCase("cancelado") || estado.equalsIgnoreCase("cancelada"); break;
                case "ESTE_MES": coincide = reserva.getFechaReserva() >= unMesAtras; break;
            }

            if (coincide) listaFiltrada.add(reserva);
        }
        actualizarVista();
    }

    private void cargarHistorialUsuario() {
        FirebaseUser currentUser = authManager.getCurrentUser();
        if (currentUser == null) {
            finish();
            return;
        }

        String usuarioId = currentUser.getUid();

        // ✅ CARGAR ESTADÍSTICAS PREMIUM SI APLICA
        if (esUsuarioPremium && cardPremiumStats != null) {
            cardPremiumStats.setVisibility(View.VISIBLE);
            passengerReservationService.obtenerEstadisticasPremium(usuarioId, new PassengerReservationService.PremiumStatsCallback() {
                @Override
                public void onStatsCalculated(Map<String, Object> stats) {
                    runOnUiThread(() -> {
                        Double gastado = (Double) stats.get("totalGastado");
                        tvTotalGastadoPremium.setText(formatearPrecio(gastado != null ? gastado : 0.0));
                        tvPuntosLealtad.setText(stats.get("puntosLealtad") + " pts");
                        tvRutaFavorita.setText("Ruta favorita: " + stats.get("rutaMasFrecuente"));
                    });
                }
                @Override public void onError(String error) { Log.e(TAG, "Error Premium: " + error); }
            });
        } else if (cardPremiumStats != null) {
            cardPremiumStats.setVisibility(View.GONE);
        }

        reservaService.obtenerHistorialUsuario(usuarioId, new ReservaService.HistorialCallback() {
            @Override
            public void onHistorialCargado(List<Reserva> reservas) {
                runOnUiThread(() -> {
                    listaReservas.clear();
                    if (reservas != null) {
                        listaReservas.addAll(reservas);
                    }
                    aplicarFiltro("TODOS");
                    actualizarEstadisticas();
                });
            }
            @Override public void onError(String error) { Log.e(TAG, "Error historial: " + error); }
        });
    }

    private void actualizarEstadisticas() {
        int confirmados = 0, cancelados = 0;
        for (Reserva r : listaReservas) {
            String e = r.getEstadoReserva();
            if (e != null) {
                if (e.equalsIgnoreCase("confirmado") || e.equalsIgnoreCase("confirmada")) confirmados++;
                else if (e.equalsIgnoreCase("cancelado") || e.equalsIgnoreCase("cancelada")) cancelados++;
            }
        }
        tvTotalViajes.setText(String.valueOf(listaReservas.size()));
        tvViajesConfirmados.setText(String.valueOf(confirmados));
        tvViajesCancelados.setText(String.valueOf(cancelados));
        tvTituloHistorial.setText("Historial de Viajes (" + listaFiltrada.size() + ")");
    }

    private void actualizarVista() {
        adapter.actualizarDatos(listaFiltrada);
        if (listaFiltrada.isEmpty()) {
            recyclerHistorial.setVisibility(View.GONE);
            layoutEmptyState.setVisibility(View.VISIBLE);
        } else {
            recyclerHistorial.setVisibility(View.VISIBLE);
            layoutEmptyState.setVisibility(View.GONE);
        }
    }

    public String formatearPrecio(double precio) {
        return String.format("$%,.0f", precio);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu_historial_usuario, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if (item.getItemId() == android.R.id.home) {
            onBackPressed();
            return true;
        }
        return super.onOptionsItemSelected(item);
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (authManager.isUserLoggedIn()) cargarHistorialUsuario();
    }
}

package com.chopcode.rutago.app.activities.passenger.history;

import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.TextView;

import com.chopcode.rutago.app.activities.passenger.InicioUsuariosActivity;
import com.facebook.shimmer.ShimmerFrameLayout;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.fragments.BottomNavFragment;
import com.chopcode.rutago.app.adapters.historial.HistorialPasajeroAdapter;
import com.chopcode.rutago.app.managers.auths.AuthManager;
import com.chopcode.rutago.app.models.Reserva;
import com.chopcode.rutago.app.services.reservations.ReservaService;
import com.chopcode.rutago.app.services.reservations.passenger.PassengerReservationService;
import com.google.android.material.appbar.MaterialToolbar;
import com.google.android.material.card.MaterialCardView;
import com.google.android.material.chip.ChipGroup;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.android.material.snackbar.Snackbar;
import com.google.firebase.auth.FirebaseUser;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
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
    private ShimmerFrameLayout shimmerContainer;
    
    private com.google.android.material.button.MaterialButton btnIrAReservar;

    // Servicios y managers
    private ReservaService reservaService;
    private PassengerReservationService passengerReservationService;
    private AuthManager authManager;

    // Adapter y datos
    private HistorialPasajeroAdapter adapter;
    private List<Reserva> listaReservas = new ArrayList<>();
    private List<Reserva> listaFiltrada = new ArrayList<>();
    private String textoBusqueda = "";
    private String filtroActual = "TODOS";

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
        
        // El FAB ha sido eliminado del layout para simplificar la interfaz
        fabActualizar = null;

        tvTotalViajes = findViewById(R.id.tvTotalViajes);
        tvViajesConfirmados = findViewById(R.id.tvViajesConfirmados);
        tvViajesCancelados = findViewById(R.id.tvViajesCancelados);
        tvTituloHistorial = findViewById(R.id.tvTituloHistorial);
        shimmerContainer = findViewById(R.id.shimmer_view_container);
        
        btnIrAReservar = findViewById(R.id.btnIrAReservar);
    }

    private void setupToolbar() {
        setSupportActionBar(toolbar);
        if (getSupportActionBar() != null) {
            getSupportActionBar().setDisplayHomeAsUpEnabled(false);
            getSupportActionBar().setDisplayShowHomeEnabled(false);
        }
    }

    private void setupRecyclerView() {
        adapter = new HistorialPasajeroAdapter(listaFiltrada);
        recyclerHistorial.setLayoutManager(new LinearLayoutManager(this));
        recyclerHistorial.setAdapter(adapter);
    }

    private void setupListeners() {
        if (fabActualizar != null) {
            fabActualizar.setOnClickListener(v -> {
                cargarHistorialUsuario();
                Snackbar.make(v, "Actualizando historial...", Snackbar.LENGTH_SHORT).show();
            });
        }

        chipGroupFiltros.setOnCheckedStateChangeListener((group, checkedIds) -> {
            if (checkedIds.isEmpty()) {
                aplicarFiltro("TODOS");
            } else {
                aplicarFiltroPorChip(checkedIds.get(0));
            }
        });

        if (btnIrAReservar != null) {
            btnIrAReservar.setOnClickListener(v -> {
                Log.d(TAG, "🎯 Clic en 'Ir a Reservar' - Redirigiendo a InicioUsuarios");
                Intent intent = new Intent(HistorialReservasActivity.this, InicioUsuariosActivity.class);
                intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
                startActivity(intent);
                finish();
            });
        }
    }

    private void aplicarFiltroPorChip(int chipId) {
        if (chipId == R.id.chipTodos) aplicarFiltro("TODOS");
        else if (chipId == R.id.chipConfirmados) aplicarFiltro("CONFIRMADOS");
        else if (chipId == R.id.chipCancelados) aplicarFiltro("CANCELADOS");
        else if (chipId == R.id.chipEsteMes) aplicarFiltro("ESTE_MES");
    }

    private void aplicarFiltro(String tipoFiltro) {
        this.filtroActual = tipoFiltro;
        aplicarFiltros();
    }

    private void aplicarFiltros() {
        listaFiltrada.clear();
        long unMesAtras = System.currentTimeMillis() - (30L * 24 * 60 * 60 * 1000);
        String query = textoBusqueda.toLowerCase().trim();

        for (Reserva reserva : listaReservas) {
            // 1. Filtrar por estado/tiempo (Chips)
            boolean coincideFiltro = false;
            String estado = reserva.getEstadoReserva();
            if (estado == null) estado = "";

            switch (filtroActual) {
                case "TODOS":
                    coincideFiltro = true;
                    break;
                case "CONFIRMADOS":
                    coincideFiltro = estado.equalsIgnoreCase("confirmado") || estado.equalsIgnoreCase("confirmada");
                    break;
                case "CANCELADOS":
                    coincideFiltro = estado.equalsIgnoreCase("cancelado") || estado.equalsIgnoreCase("cancelada");
                    break;
                case "ESTE_MES":
                    coincideFiltro = reserva.getFechaReserva() >= unMesAtras;
                    break;
            }

            // 2. Filtrar por texto de búsqueda
            boolean coincideBusqueda = true;
            if (!query.isEmpty()) {
                String conductor = (reserva.getConductor() != null) ? reserva.getConductor().toLowerCase() : "";
                String origen = (reserva.getOrigen() != null) ? reserva.getOrigen().toLowerCase() : "";
                String destino = (reserva.getDestino() != null) ? reserva.getDestino().toLowerCase() : "";
                String ruta = (reserva.getNombreRuta() != null) ? reserva.getNombreRuta().toLowerCase() : "";

                coincideBusqueda = conductor.contains(query) ||
                        origen.contains(query) ||
                        destino.contains(query) ||
                        ruta.contains(query);
            }

            if (coincideFiltro && coincideBusqueda) {
                listaFiltrada.add(reserva);
            }
        }
        actualizarVista();
    }

    private void cargarHistorialUsuario() {
        if (shimmerContainer != null) {
            shimmerContainer.setVisibility(View.VISIBLE);
            shimmerContainer.startShimmer();
            recyclerHistorial.setVisibility(View.GONE);
            layoutEmptyState.setVisibility(View.GONE);
        }

        FirebaseUser currentUser = authManager.getCurrentUser();
        if (currentUser == null) {
            finish();
            return;
        }

        String usuarioId = currentUser.getUid();

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
        if (shimmerContainer != null) {
            shimmerContainer.stopShimmer();
            shimmerContainer.setVisibility(View.GONE);
        }

        adapter.actualizarDatos(listaFiltrada);
        if (tvTituloHistorial != null) {
            tvTituloHistorial.setText("Historial de Viajes (" + listaFiltrada.size() + ")");
        }

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
        getMenuInflater().inflate(R.menu.menu_historial_general, menu);
        
        MenuItem searchItem = menu.findItem(R.id.action_search);
        if (searchItem != null) {
            androidx.appcompat.widget.SearchView sv = (androidx.appcompat.widget.SearchView) searchItem.getActionView();
            sv.setQueryHint("Buscar por ruta o conductor...");
            sv.setOnQueryTextListener(new androidx.appcompat.widget.SearchView.OnQueryTextListener() {
                @Override
                public boolean onQueryTextSubmit(String query) {
                    textoBusqueda = query;
                    aplicarFiltros();
                    return true;
                }

                @Override
                public boolean onQueryTextChange(String newText) {
                    textoBusqueda = newText;
                    aplicarFiltros();
                    return true;
                }
            });
        }
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int id = item.getItemId();
        if (id == android.R.id.home) {
            onBackPressed();
            return true;
        } else if (id == R.id.action_refresh) {
            cargarHistorialUsuario();
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

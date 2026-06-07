package com.chopcode.rutago.app.activities.driver.history;

import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.SearchView;
import androidx.appcompat.widget.Toolbar;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.adapters.historial.HistorialConductorAdapter;
import com.chopcode.rutago.app.fragments.BottomNavFragment;
import com.chopcode.rutago.app.managers.auths.AuthManager;
import com.chopcode.rutago.app.models.Reserva;
import com.chopcode.rutago.app.services.reservations.driver.DriverReservationService;
import com.google.android.material.chip.Chip;
import com.google.android.material.chip.ChipGroup;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.android.material.datepicker.MaterialDatePicker;
import androidx.core.util.Pair;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Map;

public class HistorialConductorActivity extends AppCompatActivity {

    // Views
    private Toolbar toolbar;
    private ChipGroup chipGroupFiltros;
    private Chip chipTodas, chipConfirmadas, chipCanceladas, chipHoy;
    private RecyclerView recyclerHistorial;
    private TextView tvTituloLista, tvTotalReservas, tvConfirmadas, tvCanceladas;
    private View layoutEmptyState;
    private FloatingActionButton fabExportar;

    // Adapters y Data
    private HistorialConductorAdapter reservaAdapter;
    private List<Reserva> listaReservas = new ArrayList<>();
    private List<Reserva> listaFiltrada = new ArrayList<>();

    // Services
    private AuthManager authManager;
    private DriverReservationService driverReservationService;

    // Filtros
    private String filtroEstado = "TODAS";
    private String filtroFecha = "TODAS";
    private String textoBusqueda = "";
    private Long fechaInicioPremium = null;
    private Long fechaFinPremium = null;

    // Estado Premium (Simulado por ahora, debería venir del perfil del usuario)
    private boolean esUsuarioPremium = false; 

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_historial_conductor);

        // Inicializar servicios
        authManager = AuthManager.getInstance();
        driverReservationService = new DriverReservationService();

        inicializarVistas();
        verificarEstadoPremium();
        configurarToolbar();
        configurarChips();
        configurarRecyclerView();
        configurarFAB();
        setupBottomNavigation();
        cargarDatos();
    }

    private void setupBottomNavigation() {
        getSupportFragmentManager().beginTransaction()
                .replace(R.id.bottom_nav_container, BottomNavFragment.newInstance(true))
                .commit();
    }

    private void verificarEstadoPremium() {
        // ✅ CARGAR ESTADO REAL (Simulado)
        esUsuarioPremium = true; 
    }

    private void inicializarVistas() {
        toolbar = findViewById(R.id.toolbar);
        chipGroupFiltros = findViewById(R.id.chipGroupFiltros);
        chipTodas = findViewById(R.id.chipTodas);
        chipConfirmadas = findViewById(R.id.chipConfirmadas);
        chipCanceladas = findViewById(R.id.chipCanceladas);
        chipHoy = findViewById(R.id.chipHoy);
        recyclerHistorial = findViewById(R.id.recyclerHistorial);
        tvTituloLista = findViewById(R.id.tvTituloLista);
        layoutEmptyState = findViewById(R.id.layoutEmptyState);
        
        // El FAB ha sido eliminado del layout para simplificar la interfaz
        fabExportar = null;

        View cardEstadisticas = findViewById(R.id.cardEstadisticas);
        if (cardEstadisticas != null) {
            tvTotalReservas = cardEstadisticas.findViewById(R.id.tvTotal);
            tvConfirmadas = cardEstadisticas.findViewById(R.id.tvConfirmadas);
            tvCanceladas = cardEstadisticas.findViewById(R.id.tvCanceladas);
        } else {
            // Fallback si no está dentro de la card
            tvTotalReservas = findViewById(R.id.tvTotal);
            tvConfirmadas = findViewById(R.id.tvConfirmadas);
            tvCanceladas = findViewById(R.id.tvCanceladas);
        }
    }

    private void configurarToolbar() {
        setSupportActionBar(toolbar);
        if (getSupportActionBar() != null) {
            getSupportActionBar().setDisplayHomeAsUpEnabled(true);
            getSupportActionBar().setDisplayShowHomeEnabled(true);
        }

        toolbar.setNavigationOnClickListener(v -> onBackPressed());
    }

    private void configurarChips() {
        chipGroupFiltros.setOnCheckedStateChangeListener((group, checkedIds) -> {
            if (checkedIds.isEmpty()) {
                filtroEstado = "TODAS";
                filtroFecha = "TODAS";
            } else {
                int chipId = checkedIds.get(0);
                if (chipId == R.id.chipTodas || chipId == R.id.chipConfirmadas || chipId == R.id.chipCanceladas) {
                    if (chipId == R.id.chipConfirmadas) {
                        filtroEstado = "CONFIRMADA";
                    } else if (chipId == R.id.chipCanceladas) {
                        filtroEstado = "CANCELADA";
                    } else {
                        filtroEstado = "TODAS";
                    }
                } else if (chipId == R.id.chipHoy) {
                    filtroFecha = "HOY";
                }
            }
            aplicarFiltros();
        });
    }

    private void configurarRecyclerView() {
        reservaAdapter = new HistorialConductorAdapter(listaFiltrada);

        recyclerHistorial.setLayoutManager(new LinearLayoutManager(this));
        recyclerHistorial.setAdapter(reservaAdapter);
    }

    private void configurarFAB() {
        if (fabExportar != null) {
            fabExportar.setOnClickListener(v -> exportarHistorial());
        }
    }

    private void cargarDatos() {
        String conductorUID = authManager.getUserId();
        if (conductorUID == null) {
            Toast.makeText(this, "Error: Usuario no autenticado", Toast.LENGTH_SHORT).show();
            finish();
            return;
        }

        mostrarLoading(true);

        if (esUsuarioPremium && fechaInicioPremium != null && fechaFinPremium != null) {
            driverReservationService.obtenerEstadisticasAvanzadas(conductorUID, fechaInicioPremium, fechaFinPremium, new DriverReservationService.CompleteStatsCallback() {
                @Override
                public void onCompleteStatsLoaded(DriverReservationService.CompleteDriverStats stats) {
                    runOnUiThread(() -> {
                        mostrarLoading(false);
                        listaReservas.clear();
                        listaReservas.addAll(stats.todasLasReservas);
                        aplicarFiltros();
                        tvTotalReservas.setText(String.valueOf(stats.totalReservas));
                        tvConfirmadas.setText(String.valueOf(stats.reservasConfirmadas));
                        tvCanceladas.setText(String.valueOf(stats.reservasCanceladas));
                        Toast.makeText(HistorialConductorActivity.this, "Reporte Premium cargado", Toast.LENGTH_SHORT).show();
                    });
                }

                @Override
                public void onError(String error) {
                    manejarErrorCarga(error);
                }
            });
        } else {
            driverReservationService.cargarReservasConductorFiltradas(conductorUID, null, "TODAS", true, new DriverReservationService.ReservationsCallback() {
                @Override
                public void onReservationsLoaded(List<Reserva> reservas) {
                    runOnUiThread(() -> {
                        mostrarLoading(false);
                        listaReservas.clear();
                        listaReservas.addAll(reservas);
                        aplicarFiltros();
                        actualizarEstadisticas();
                        actualizarUI();
                    });
                }

                @Override
                public void onError(String error) {
                    manejarErrorCarga(error);
                }
            });
        }
    }

    private void manejarErrorCarga(String error) {
        runOnUiThread(() -> {
            mostrarLoading(false);
            Toast.makeText(HistorialConductorActivity.this, "Error: " + error, Toast.LENGTH_SHORT).show();
            mostrarEmptyState();
        });
    }

    private void aplicarFiltros() {
        listaFiltrada.clear();
        for (Reserva reserva : listaReservas) {
            boolean coincideEstado = filtroEstado.equals("TODAS") || reserva.getEstadoReserva().equalsIgnoreCase(filtroEstado);
            boolean coincideFecha = filtroFecha.equals("TODAS") || (filtroFecha.equals("HOY") && esReservaDeHoy(reserva)) || filtroFecha.equals("RANGO_PREMIUM");
            boolean coincideBusqueda = textoBusqueda.isEmpty() || contieneTexto(reserva, textoBusqueda);

            if (coincideEstado && coincideFecha && coincideBusqueda) {
                listaFiltrada.add(reserva);
            }
        }
        if (reservaAdapter != null) reservaAdapter.actualizarLista(listaFiltrada);
        actualizarUI();
    }

    private boolean esReservaDeHoy(Reserva reserva) {
        Calendar hoy = Calendar.getInstance();
        Calendar fechaReserva = Calendar.getInstance();
        fechaReserva.setTimeInMillis(reserva.getFechaReserva());
        return hoy.get(Calendar.YEAR) == fechaReserva.get(Calendar.YEAR) && hoy.get(Calendar.MONTH) == fechaReserva.get(Calendar.MONTH) && hoy.get(Calendar.DAY_OF_MONTH) == fechaReserva.get(Calendar.DAY_OF_MONTH);
    }

    private boolean contieneTexto(Reserva reserva, String texto) {
        if (texto == null || texto.isEmpty()) return true;
        String t = texto.toLowerCase();
        return (reserva.getNombre() != null && reserva.getNombre().toLowerCase().contains(t)) || (reserva.getTelefono() != null && reserva.getTelefono().toLowerCase().contains(t));
    }

    private void actualizarEstadisticas() {
        int total = listaReservas.size(), confirmadas = 0, canceladas = 0;
        for (Reserva r : listaReservas) {
            if (r.getEstadoReserva() == null) continue;
            String e = r.getEstadoReserva().toUpperCase();
            if (e.contains("CONFIRMA")) confirmadas++;
            else if (e.contains("CANCELA")) canceladas++;
        }
        if (tvTotalReservas != null) tvTotalReservas.setText(String.valueOf(total));
        if (tvConfirmadas != null) tvConfirmadas.setText(String.valueOf(confirmadas));
        if (tvCanceladas != null) tvCanceladas.setText(String.valueOf(canceladas));
    }

    private void actualizarUI() {
        if (listaFiltrada.isEmpty()) mostrarEmptyState();
        else ocultarEmptyState();
        if (tvTituloLista != null) tvTituloLista.setText("Viajes (" + listaFiltrada.size() + ")");
    }

    private void mostrarEmptyState() {
        if (recyclerHistorial != null) recyclerHistorial.setVisibility(View.GONE);
        if (layoutEmptyState != null) layoutEmptyState.setVisibility(View.VISIBLE);
    }

    private void ocultarEmptyState() {
        if (recyclerHistorial != null) recyclerHistorial.setVisibility(View.VISIBLE);
        if (layoutEmptyState != null) layoutEmptyState.setVisibility(View.GONE);
    }

    private void mostrarLoading(boolean m) {
        if (m) {
            if (recyclerHistorial != null) recyclerHistorial.setVisibility(View.GONE);
            if (layoutEmptyState != null) layoutEmptyState.setVisibility(View.GONE);
        }
    }

    private void mostrarDetallesReserva(Reserva r) {
        if ("Por confirmar".equalsIgnoreCase(r.getEstadoReserva())) {
            new androidx.appcompat.app.AlertDialog.Builder(this, R.style.AppDialogTheme)
                    .setTitle("Gestionar Reserva")
                    .setMessage("Pasajero: " + r.getNombre() + "\nRuta: " + r.getOrigen() + " -> " + r.getDestino() + "\n\n¿Qué deseas hacer con esta reserva?")
                    .setPositiveButton("Confirmar", (dialog, which) -> {
                        driverReservationService.actualizarEstadoReserva(this, r.getIdReserva(), "Confirmada", new DriverReservationService.ReservationUpdateCallback() {
                            @Override
                            public void onSuccess() {
                                Toast.makeText(HistorialConductorActivity.this, "Reserva confirmada", Toast.LENGTH_SHORT).show();
                                cargarDatos();
                            }
                            @Override
                            public void onError(String error) {
                                Toast.makeText(HistorialConductorActivity.this, "Error: " + error, Toast.LENGTH_SHORT).show();
                            }
                        });
                    })
                    .setNegativeButton("Cancelar", (dialog, which) -> {
                        driverReservationService.cancelarReservaConLiberacion(this, r.getIdReserva(), r.getHorarioId(), r.getPuestoReservado(), new DriverReservationService.ReservationUpdateCallback() {
                            @Override
                            public void onSuccess() {
                                Toast.makeText(HistorialConductorActivity.this, "Reserva cancelada", Toast.LENGTH_SHORT).show();
                                cargarDatos();
                            }
                            @Override
                            public void onError(String error) {
                                Toast.makeText(HistorialConductorActivity.this, "Error: " + error, Toast.LENGTH_SHORT).show();
                            }
                        });
                    })
                    .setNeutralButton("Volver", null)
                    .show();
        } else {
            Toast.makeText(this, "Pasajero: " + r.getNombre() + "\nEstado: " + r.getEstadoReserva(), Toast.LENGTH_LONG).show();
        }
    }

    private void exportarHistorial() {
        Toast.makeText(this, "Exportando...", Toast.LENGTH_SHORT).show();
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu_historial_general, menu);
        MenuItem searchItem = menu.findItem(R.id.action_search);
        if (searchItem != null) {
            SearchView sv = (SearchView) searchItem.getActionView();
            sv.setQueryHint("Buscar...");
            sv.setOnQueryTextListener(new SearchView.OnQueryTextListener() {
                @Override public boolean onQueryTextSubmit(String q) { textoBusqueda = q; aplicarFiltros(); return true; }
                @Override public boolean onQueryTextChange(String q) { textoBusqueda = q; aplicarFiltros(); return true; }
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
            cargarDatos();
            return true;
        }
        return super.onOptionsItemSelected(item);
    }

    private void mostrarDialogoFiltroFecha() {
        if (!esUsuarioPremium) { mostrarDialogoMejoraPremium("El filtrado por fecha es Premium."); return; }
        MaterialDatePicker<Pair<Long, Long>> p = MaterialDatePicker.Builder.dateRangePicker().setTitleText("Selecciona fechas").build();
        p.addOnPositiveButtonClickListener(s -> { fechaInicioPremium = s.first; fechaFinPremium = s.second; filtroFecha = "RANGO_PREMIUM"; cargarDatos(); });
        p.show(getSupportFragmentManager(), "DP");
    }

    private void mostrarDialogoMejoraPremium(String m) {
        new com.google.android.material.dialog.MaterialAlertDialogBuilder(this).setTitle("⭐ Premium").setMessage(m).setPositiveButton("Ver Planes", null).setNegativeButton("Cerrar", null).show();
    }

    private void mostrarClientesFrecuentes() {
        if (!esUsuarioPremium) { mostrarDialogoMejoraPremium("Los clientes frecuentes son Premium."); return; }
        driverReservationService.obtenerClientesFrecuentes(authManager.getUserId(), 5, new DriverReservationService.FrequentCustomersCallback() {
            @Override public void onCustomersLoaded(List<Map<String, Object>> c) {
                runOnUiThread(() -> {
                    StringBuilder sb = new StringBuilder("Top Clientes:\n");
                    for (Map<String, Object> m : c) sb.append("👤 ").append(m.get("nombre")).append(" (").append(m.get("viajes")).append(")\n");
                    new com.google.android.material.dialog.MaterialAlertDialogBuilder(HistorialConductorActivity.this).setTitle("📊 Premium").setMessage(sb.toString()).setPositiveButton("OK", null).show();
                });
            }
            @Override public void onError(String e) { Toast.makeText(HistorialConductorActivity.this, e, Toast.LENGTH_SHORT).show(); }
        });
    }

    private void limpiarFiltros() {
        if (chipGroupFiltros != null) chipGroupFiltros.clearCheck();
        filtroEstado = "TODAS"; filtroFecha = "TODAS"; textoBusqueda = ""; fechaInicioPremium = null; fechaFinPremium = null;
        aplicarFiltros(); cargarDatos();
    }
}

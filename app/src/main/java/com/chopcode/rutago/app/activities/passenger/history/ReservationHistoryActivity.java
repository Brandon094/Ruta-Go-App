package com.chopcode.rutago.app.activities.passenger.history;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.SearchView;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.activities.passenger.PassengerHomeActivity;
import com.chopcode.rutago.app.adapters.historial.PassengerHistoryAdapter;
import com.chopcode.rutago.app.fragments.BottomNavFragment;
import com.chopcode.rutago.app.managers.auths.AuthManager;
import com.chopcode.rutago.app.viewmodels.passenger.PassengerHistoryViewModel;
import com.chopcode.rutago.app.utils.ui.UIAnimationUtils;
import com.facebook.shimmer.ShimmerFrameLayout;
import com.google.android.material.appbar.MaterialToolbar;
import com.google.android.material.chip.ChipGroup;

import java.util.ArrayList;

/**
 * 📊 Reservation History Activity (Passenger)
 */
/**
 * 📊 Reservation History Activity (Passenger)
 * 
 * Permite al pasajero consultar sus viajes pasados y presentes.
 * Responsabilidades:
 * - Listar todas las reservas vinculadas al UID del pasajero.
 * - Proporcionar filtros rápidos por estado (Confirmados, Cancelados) y búsqueda por texto.
 * - Mostrar estadísticas acumuladas de viajes en la cabecera.
 * - Permitir la calificación de viajes completados a través del adaptador.
 */
public class ReservationHistoryActivity extends AppCompatActivity {

    private static final String TAG = "ReservationHistoryActivity";

    // Views
    private MaterialToolbar toolbar;
    private ChipGroup chipGroupFilters;
    private RecyclerView recyclerHistory;
    private View layoutEmptyState;
    private TextView tvTotalTrips, tvConfirmedTrips, tvCanceledTrips, tvHistoryTitle;
    private ShimmerFrameLayout shimmerContainer;
    private com.google.android.material.button.MaterialButton btnGoToReserve;

    // ViewModel and Adapter
    private PassengerHistoryViewModel viewModel;
    private PassengerHistoryAdapter adapter;

    private String currentFilter = "TODOS";
    private String searchText = "";

    private int lastTotal = 0;
    private int lastConfirmed = 0;
    private int lastCanceled = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.d(TAG, "🚀 onCreate - Starting ReservationHistoryActivity");
        setContentView(R.layout.activity_historial_reservas);

        viewModel = new ViewModelProvider(this).get(PassengerHistoryViewModel.class);

        initViews();
        setupToolbar();
        setupRecyclerView();
        setupListeners();
        setupBottomNavigation();
        setupObservers();

        loadData();
    }

    private void initViews() {
        toolbar = findViewById(R.id.toolbar);
        chipGroupFilters = findViewById(R.id.chipGroupFiltros);
        recyclerHistory = findViewById(R.id.recyclerHistorial);
        layoutEmptyState = findViewById(R.id.layoutEmptyState);
        tvTotalTrips = findViewById(R.id.tvTotalViajes);
        tvConfirmedTrips = findViewById(R.id.tvViajesConfirmados);
        tvCanceledTrips = findViewById(R.id.tvViajesCancelados);
        tvHistoryTitle = findViewById(R.id.tvTituloHistorial);
        shimmerContainer = findViewById(R.id.shimmer_view_container);
        btnGoToReserve = findViewById(R.id.btnIrAReservar);
    }

    private void setupToolbar() {
        setSupportActionBar(toolbar);
        if (getSupportActionBar() != null) {
            getSupportActionBar().setDisplayHomeAsUpEnabled(false);
            getSupportActionBar().setTitle(R.string.historial_reservas);
        }
    }

    private void setupRecyclerView() {
        adapter = new PassengerHistoryAdapter(new ArrayList<>());
        recyclerHistory.setLayoutManager(new LinearLayoutManager(this));
        recyclerHistory.setAdapter(adapter);
    }

    private void setupObservers() {
        viewModel.getFilteredReservations().observe(this, reservations -> {
            adapter.actualizarDatos(reservations);
            updateUI(reservations.isEmpty(), reservations.size());
        });

        viewModel.getIsLoading().observe(this, loading -> {
            showLoading(loading);
            if (Boolean.FALSE.equals(loading)) {
                // 🔥 Asegurar que los contadores empiecen de 0 para la animación inicial si es necesario
                // o simplemente disparar la animación tras el Shimmer
                new android.os.Handler(android.os.Looper.getMainLooper()).postDelayed(this::animateStats, 400);
            }
        });

        viewModel.getError().observe(this, msg -> { if (msg != null) Toast.makeText(this, "Error: " + msg, Toast.LENGTH_SHORT).show(); });

        // Observadores de conteo: disparar animación cuando los datos lleguen
        viewModel.getTotalCount().observe(this, count -> animateStats());
        viewModel.getConfirmedCount().observe(this, count -> animateStats());
        viewModel.getCancelledCount().observe(this, count -> animateStats());
    }

    private void animateStats() {
        Integer total = viewModel.getTotalCount().getValue();
        Integer confirmed = viewModel.getConfirmedCount().getValue();
        Integer canceled = viewModel.getCancelledCount().getValue();

        if (total != null) {
            UIAnimationUtils.animateNumericText(tvTotalTrips, lastTotal, total);
            lastTotal = total;
        }
        if (confirmed != null) {
            UIAnimationUtils.animateNumericText(tvConfirmedTrips, lastConfirmed, confirmed);
            lastConfirmed = confirmed;
        }
        if (canceled != null) {
            UIAnimationUtils.animateNumericText(tvCanceledTrips, lastCanceled, canceled);
            lastCanceled = canceled;
        }
    }

    private void setupListeners() {
        chipGroupFilters.setOnCheckedStateChangeListener((group, checkedIds) -> {
            if (checkedIds.isEmpty()) currentFilter = "TODOS";
            else {
                int chipId = checkedIds.get(0);
                if (chipId == R.id.chipTodos) currentFilter = "TODOS";
                else if (chipId == R.id.chipConfirmados) currentFilter = "CONFIRMADOS";
                else if (chipId == R.id.chipCancelados) currentFilter = "CANCELADOS";
                else if (chipId == R.id.chipEsteMes) currentFilter = "ESTE_MES";
            }
            viewModel.setFilters(currentFilter, searchText);
        });

        if (btnGoToReserve != null) {
            btnGoToReserve.setOnClickListener(v -> {
                Intent intent = new Intent(this, PassengerHomeActivity.class);
                intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
                startActivity(intent);
                finish();
            });
        }
    }

    private void loadData() {
        String userId = AuthManager.getInstance().getUserId();
        if (userId != null) viewModel.loadHistory(userId);
        else finish();
    }

    private void setupBottomNavigation() {
        getSupportFragmentManager().beginTransaction()
                .replace(R.id.bottom_nav_container, BottomNavFragment.newInstance(false)).commit();
    }

    private void updateUI(boolean isEmpty, int size) {
        if (isEmpty) {
            recyclerHistory.setVisibility(View.GONE);
            layoutEmptyState.setVisibility(View.VISIBLE);
        } else {
            recyclerHistory.setVisibility(View.VISIBLE);
            layoutEmptyState.setVisibility(View.GONE);
            recyclerHistory.scheduleLayoutAnimation(); // 🔥 Disparar animación de entrada
        }
        tvHistoryTitle.setText(getString(R.string.historial_viajes_count, size));
    }

    private void showLoading(boolean show) {
        if (show) {
            shimmerContainer.startShimmer();
            shimmerContainer.setVisibility(View.VISIBLE);
            recyclerHistory.setVisibility(View.GONE);
            layoutEmptyState.setVisibility(View.GONE);
        } else {
            shimmerContainer.stopShimmer();
            shimmerContainer.setVisibility(View.GONE);
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu_historial_general, menu);
        MenuItem searchItem = menu.findItem(R.id.action_search);
        if (searchItem != null) {
            SearchView sv = (SearchView) searchItem.getActionView();
            sv.setQueryHint(getString(R.string.buscar_ruta_conductor));
            sv.setOnQueryTextListener(new SearchView.OnQueryTextListener() {
                @Override public boolean onQueryTextSubmit(String query) { searchText = query; viewModel.setFilters(currentFilter, query); return true; }
                @Override public boolean onQueryTextChange(String newText) { searchText = newText; viewModel.setFilters(currentFilter, newText); return true; }
            });
        }
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if (item.getItemId() == R.id.action_refresh) { loadData(); return true; }
        return super.onOptionsItemSelected(item);
    }

    @Override protected void onResume() { 
        super.onResume(); 
        // Resetear contadores para forzar la animación de entrada
        lastTotal = 0; 
        lastConfirmed = 0; 
        lastCanceled = 0;
        loadData(); 
    }
}

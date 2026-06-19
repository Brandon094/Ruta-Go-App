package com.chopcode.rutago.app.activities.driver.history;

import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.SearchView;
import androidx.appcompat.widget.Toolbar;
import androidx.core.util.Pair;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.adapters.historial.DriverHistoryAdapter;
import com.chopcode.rutago.app.fragments.BottomNavFragment;
import com.chopcode.rutago.app.managers.auths.AuthManager;
import com.chopcode.rutago.app.viewmodels.driver.DriverHistoryViewModel;
import com.chopcode.rutago.app.utils.ui.UIAnimationUtils;
import com.facebook.shimmer.ShimmerFrameLayout;
import com.google.android.material.chip.ChipGroup;
import com.google.android.material.datepicker.MaterialDatePicker;

import java.util.ArrayList;

/**
 * 📊 Driver History Activity
 * 
 * Bitácora de viajes realizados y cancelados para el conductor.
 * Responsabilidades:
 * - Listar todas las reservas procesadas por el conductor logueado.
 * - Permitir el filtrado por estado (Confirmadas/Canceladas) y por fecha (Hoy).
 * - Proporcionar un buscador por nombre de pasajero.
 * - Visualizar métricas rápidas del historial (Total, Confirmadas, Canceladas).
 */
public class DriverHistoryActivity extends AppCompatActivity {

    private static final String TAG = "DriverHistoryActivity";

    // Views
    private Toolbar toolbar;
    private ChipGroup chipGroupFilters;
    private RecyclerView recyclerHistory;
    private TextView tvListTitle, tvTotal, tvConfirmed, tvCanceled;
    private View layoutEmptyState;
    private ShimmerFrameLayout shimmerViewContainer;

    // ViewModel and Adapter
    private DriverHistoryViewModel viewModel;
    private DriverHistoryAdapter historyAdapter;

    private AuthManager authManager;
    private boolean isPremiumUser = true; 
    private String searchText = "";

    private int lastTotal = 0;
    private int lastConfirmed = 0;
    private int lastCanceled = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.d(TAG, "🚀 onCreate - Starting DriverHistoryActivity");
        setContentView(R.layout.activity_historial_conductor);

        authManager = AuthManager.getInstance();
        viewModel = new ViewModelProvider(this).get(DriverHistoryViewModel.class);

        initViews();
        setupToolbar();
        setupRecyclerView();
        setupChips();
        setupBottomNavigation();
        setupObservers();

        loadData();
    }

    private void initViews() {
        toolbar = findViewById(R.id.toolbar);
        chipGroupFilters = findViewById(R.id.chipGroupFiltros);
        recyclerHistory = findViewById(R.id.recyclerHistorial);
        tvListTitle = findViewById(R.id.tvTituloLista);
        layoutEmptyState = findViewById(R.id.layoutEmptyState);
        shimmerViewContainer = findViewById(R.id.shimmer_view_container);
        tvTotal = findViewById(R.id.tvTotal);
        tvConfirmed = findViewById(R.id.tvConfirmadas);
        tvCanceled = findViewById(R.id.tvCanceladas);
    }

    private void setupToolbar() {
        setSupportActionBar(toolbar);
        if (getSupportActionBar() != null) {
            getSupportActionBar().setDisplayHomeAsUpEnabled(false);
            getSupportActionBar().setTitle(R.string.historial_reservas);
        }
    }

    private void setupRecyclerView() {
        historyAdapter = new DriverHistoryAdapter(new ArrayList<>());
        recyclerHistory.setLayoutManager(new LinearLayoutManager(this));
        recyclerHistory.setAdapter(historyAdapter);
    }

    private void setupObservers() {
        viewModel.getFilteredReservations().observe(this, reservations -> {
            historyAdapter.updateList(reservations);
            updateUI(reservations.isEmpty(), reservations.size());
        });

        viewModel.getIsLoading().observe(this, loading -> {
            showLoading(loading);
            if (Boolean.FALSE.equals(loading)) {
                // 🔥 Disparar animaciones de conteo tras el Shimmer
                new android.os.Handler(android.os.Looper.getMainLooper()).postDelayed(this::animateStats, 400);
            }
        });

        viewModel.getError().observe(this, msg -> { if (msg != null) Toast.makeText(this, getString(R.string.error_prefijo, msg), Toast.LENGTH_SHORT).show(); });

        // Observadores activos para disparar animaciones
        viewModel.getTotalCount().observe(this, count -> animateStats());
        viewModel.getConfirmedCount().observe(this, count -> animateStats());
        viewModel.getCancelledCount().observe(this, count -> animateStats());
    }

    private void animateStats() {
        Integer total = viewModel.getTotalCount().getValue();
        Integer confirmed = viewModel.getConfirmedCount().getValue();
        Integer canceled = viewModel.getCancelledCount().getValue();

        if (total != null) {
            UIAnimationUtils.animateNumericText(tvTotal, lastTotal, total);
            lastTotal = total;
        }
        if (confirmed != null) {
            UIAnimationUtils.animateNumericText(tvConfirmed, lastConfirmed, confirmed);
            lastConfirmed = confirmed;
        }
        if (canceled != null) {
            UIAnimationUtils.animateNumericText(tvCanceled, lastCanceled, canceled);
            lastCanceled = canceled;
        }
    }

    private void setupChips() {
        chipGroupFilters.setOnCheckedStateChangeListener((group, checkedIds) -> {
            String stateFilter = "TODAS";
            String dateFilter = "TODAS";
            if (!checkedIds.isEmpty()) {
                int chipId = checkedIds.get(0);
                if (chipId == R.id.chipConfirmadas) stateFilter = "CONFIRMADA";
                else if (chipId == R.id.chipCanceladas) stateFilter = "CANCELADA";
                else if (chipId == R.id.chipHoy) dateFilter = "HOY";
            }
            viewModel.setFilters(stateFilter, dateFilter, searchText);
        });
    }

    private void loadData() {
        String driverId = authManager.getUserId();
        if (driverId != null) viewModel.loadReservations(driverId, isPremiumUser);
        else finish();
    }

    private void setupBottomNavigation() {
        getSupportFragmentManager().beginTransaction()
                .replace(R.id.bottom_nav_container, BottomNavFragment.newInstance(true)).commit();
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
        tvListTitle.setText(getString(R.string.historial_viajes_count, size));
    }

    private void showLoading(boolean show) {
        if (show) { shimmerViewContainer.startShimmer(); shimmerViewContainer.setVisibility(View.VISIBLE); recyclerHistory.setVisibility(View.GONE); layoutEmptyState.setVisibility(View.GONE); }
        else { shimmerViewContainer.stopShimmer(); shimmerViewContainer.setVisibility(View.GONE); }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu_historial_general, menu);
        MenuItem searchItem = menu.findItem(R.id.action_search);
        if (searchItem != null) {
            SearchView sv = (SearchView) searchItem.getActionView();
            sv.setQueryHint(getString(R.string.buscar_pasajero));
            sv.setOnQueryTextListener(new SearchView.OnQueryTextListener() {
                @Override public boolean onQueryTextSubmit(String q) { searchText = q; viewModel.setFilters("TODAS", "TODAS", q); return true; }
                @Override public boolean onQueryTextChange(String q) { searchText = q; viewModel.setFilters("TODAS", "TODAS", q); return true; }
            });
        }
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if (item.getItemId() == R.id.action_refresh) { loadData(); return true; }
        return super.onOptionsItemSelected(item);
    }

    @Override
    protected void onResume() {
        super.onResume();
        // Resetear contadores para forzar animación
        lastTotal = 0;
        lastConfirmed = 0;
        lastCanceled = 0;
        loadData();
    }
}

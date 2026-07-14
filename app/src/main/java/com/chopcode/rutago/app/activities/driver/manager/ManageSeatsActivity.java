package com.chopcode.rutago.app.activities.driver.manager;

import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProvider;

import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.engines.seats.SeatManager;
import com.chopcode.rutago.app.managers.core.analytics.ReservationAnalyticsHelper;
import com.chopcode.rutago.app.viewmodels.driver.ManageSeatsViewModel;
import com.google.android.material.appbar.MaterialToolbar;
import com.google.android.material.dialog.MaterialAlertDialogBuilder;
import com.google.android.material.snackbar.Snackbar;

import java.util.HashSet;
import java.util.Set;

/**
 * 💺 Manage Seats Activity
 *
 * Panel de control táctico para la gestión de inventario de asientos en tiempo real.
 * Responsabilidades:
 * - Visualizar la ocupación híbrida: Diferencia entre reservas vía App (Rojo) y ventas físicas (Naranja).
 * - Permitir al conductor bloquear/desbloquear asientos manualmente (Venta física).
 * - Sincronizar automáticamente el Grid visual con la capacidad técnica del vehículo asignado.
 * - Monitorear cambios concurrentes en la base de datos para evitar sobreventas.
 * - Proveer feedback visual sobre el estado de disponibilidad total del despacho.
 */
public class ManageSeatsActivity extends AppCompatActivity implements SeatManager.SeatSelectionListener {

    private static final String TAG = "ManageSeatsActivity";
    
    // Metadatos del Itinerario
    private String scheduleId, routeName, scheduleTime;
    private double routePrice;
    
    // Componentes de Interfaz
    private TextView tvRouteName, tvScheduleInfo, tvAvailableSeatsInfo;
    private MaterialToolbar topAppBar;
    
    // Orquestadores
    private SeatManager seatManager;
    private ManageSeatsViewModel viewModel;
    private ReservationAnalyticsHelper analyticsHelper;
    private com.chopcode.rutago.app.managers.ui.tutorials.TutorialManager tutorialManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.d(TAG, "🚀 Iniciando gestión de asientos operativa.");
        setContentView(R.layout.activity_gestionar_asientos);
        
        getIntentData();
        
        viewModel = new ViewModelProvider(this).get(ManageSeatsViewModel.class);
        viewModel.setRoutePrice(routePrice);
        viewModel.fetchRoutePrice(routeName);
        
        initViews();
        setupManagers();
        setupObservers();
        
        viewModel.startListening(scheduleId);
        tutorialManager.showDriverSeatsGuide();
    }

    private void getIntentData() {
        scheduleId = getIntent().getStringExtra("horarioId");
        routeName = getIntent().getStringExtra("rutaNombre");
        scheduleTime = getIntent().getStringExtra("horarioHora");
        routePrice = getIntent().getDoubleExtra("rutaPrecio", com.chopcode.rutago.app.services.prices.PriceService.DEFAULT_PRICE);
    }

    private void initViews() {
        tvRouteName = findViewById(R.id.tvRutaNombre);
        tvScheduleInfo = findViewById(R.id.tvHorarioInfo);
        tvAvailableSeatsInfo = findViewById(R.id.tvAsientosDispoInfo);
        topAppBar = findViewById(R.id.topAppBar);
        
        tvRouteName.setText(routeName != null ? routeName : "Ruta no disponible");
        tvScheduleInfo.setText("Horario: " + (scheduleTime != null ? scheduleTime : "--:--"));
        
        setSupportActionBar(topAppBar);
        topAppBar.setNavigationOnClickListener(v -> finish());
    }

    private void setupManagers() {
        analyticsHelper = new ReservationAnalyticsHelper("ManageSeats");
        seatManager = new SeatManager(this, analyticsHelper);
        seatManager.setSeatSelectionListener(this);
        seatManager.configurarAsientos();
        tutorialManager = new com.chopcode.rutago.app.managers.ui.tutorials.TutorialManager(this);
    }

    /**
     * Suscribe la UI a los flujos de ocupación (App vs Física) y capacidad total.
     */
    private void setupObservers() {
        viewModel.getAppOccupiedSeats().observe(this, appSeats -> actualizarMapaAsientos());
        viewModel.getPhysicalOccupiedSeats().observe(this, physicalSeats -> actualizarMapaAsientos());
        viewModel.getTotalCapacity().observe(this, capacity -> actualizarMapaAsientos());
        viewModel.getAvailableCount().observe(this, count -> tvAvailableSeatsInfo.setText(getString(R.string.asientos_disponibles_count, count)));
        
        viewModel.getError().observe(this, msg -> {
            if (msg != null) Snackbar.make(findViewById(android.R.id.content), getString(R.string.error_prefijo, msg), Snackbar.LENGTH_LONG).show();
        });
    }

    /**
     * Fusiona los sets de datos para que el SeatManager renderice los colores correctos.
     */
    private void actualizarMapaAsientos() {
        Set<Integer> app = viewModel.getAppOccupiedSeats().getValue();
        Set<Integer> physical = viewModel.getPhysicalOccupiedSeats().getValue();
        Integer total = viewModel.getTotalCapacity().getValue();
        
        seatManager.actualizarEstadoAsientos(
                app != null ? app : new HashSet<>(),
                physical != null ? physical : new HashSet<>(),
                total != null ? total : 13
        );
    }

    /**
     * Intercepta la selección de un asiento para decidir si bloquearlo físicamente o liberarlo.
     */
    @Override
    public void onSeatSelected(int seatNumber) {
        Set<Integer> app = viewModel.getAppOccupiedSeats().getValue();
        Set<Integer> physical = viewModel.getPhysicalOccupiedSeats().getValue();

        // Si está ocupado por App, el conductor no puede tocarlo (Prioridad de cliente digital).
        if (app != null && app.contains(seatNumber)) {
            Snackbar.make(findViewById(android.R.id.content), R.string.ocupado_por_app, Snackbar.LENGTH_SHORT).show();
        } else if (physical != null && physical.contains(seatNumber)) {
            showFreePhysicalSeatDialog(seatNumber);
        } else {
            showReservePhysicalSeatDialog(seatNumber);
        }
    }

    private void showReservePhysicalSeatDialog(int seatNumber) {
        new MaterialAlertDialogBuilder(this, R.style.AppDialogTheme)
                .setTitle(R.string.venta_fisica_mayus)
                .setMessage(getString(R.string.bloquear_asiento_pregunta, seatNumber))
                .setPositiveButton(R.string.bloquear_btn, (d, w) -> viewModel.reservePhysical(seatNumber))
                .setNegativeButton(R.string.cancelar, null)
                .show();
    }

    private void showFreePhysicalSeatDialog(int seatNumber) {
        new MaterialAlertDialogBuilder(this, R.style.AppDialogTheme)
                .setTitle(R.string.liberar_btn)
                .setMessage(getString(R.string.liberar_asiento_pregunta, seatNumber))
                .setPositiveButton(R.string.liberar_btn, (d, w) -> viewModel.freePhysical(seatNumber))
                .setNegativeButton(R.string.volver, null)
                .show();
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.gestionar_asientos_menu, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if (item.getItemId() == R.id.action_refresh) {
            viewModel.startListening(scheduleId);
            return true;
        }
        return super.onOptionsItemSelected(item);
    }

    @Override public void onSeatDeselected(int seatNumber) {}
    @Override public void onExpandableSectionRequestedToCollapse() {}
}

package com.chopcode.rutago.app.activities.driver.manager;

import android.os.Bundle;
import android.util.Log;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProvider;

import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.managers.analytics.ReservationAnalyticsHelper;
import com.chopcode.rutago.app.managers.seats.SeatManager;
import com.chopcode.rutago.app.viewmodels.driver.ManageSeatsViewModel;
import com.google.android.material.appbar.MaterialToolbar;
import com.google.android.material.dialog.MaterialAlertDialogBuilder;
import com.google.android.material.snackbar.Snackbar;

import java.util.HashSet;
import java.util.Set;

/**
 * 💺 Manage Seats Activity (Driver)
 * 
 * Responsabilidades:
 * - Show real-time seat status.
 * - Allow manual seat blocking (Physical sale).
 * - Visually differentiate between App reservations and manual sales.
 * 
 * Architecture: MVVM.
 */
public class ManageSeatsActivity extends AppCompatActivity implements SeatManager.SeatSelectionListener {

    private static final String TAG = "ManageSeatsActivity";
    
    // Intent Data
    private String scheduleId, routeName, scheduleTime;
    
    // Views
    private TextView tvRouteName, tvScheduleInfo, tvAvailableSeatsInfo;
    private MaterialToolbar topAppBar;
    
    // Managers and ViewModel
    private SeatManager seatManager;
    private ManageSeatsViewModel viewModel;
    private ReservationAnalyticsHelper analyticsHelper;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.d(TAG, "🚀 onCreate - Starting ManageSeatsActivity");
        setContentView(R.layout.activity_gestionar_asientos);
        
        getIntentData();
        
        viewModel = new ViewModelProvider(this).get(ManageSeatsViewModel.class);
        
        initViews();
        setupManagers();
        setupObservers();
        
        viewModel.startListening(scheduleId);
    }

    private void getIntentData() {
        scheduleId = getIntent().getStringExtra("horarioId");
        routeName = getIntent().getStringExtra("rutaNombre");
        scheduleTime = getIntent().getStringExtra("horarioHora");
    }

    private void initViews() {
        tvRouteName = findViewById(R.id.tvRutaNombre);
        tvScheduleInfo = findViewById(R.id.tvHorarioInfo);
        tvAvailableSeatsInfo = findViewById(R.id.tvAsientosDispoInfo);
        topAppBar = findViewById(R.id.topAppBar);
        
        tvRouteName.setText(routeName != null ? routeName : "Route not available");
        tvScheduleInfo.setText("Schedule: " + (scheduleTime != null ? scheduleTime : "--:--"));
        
        setSupportActionBar(topAppBar);
        topAppBar.setNavigationOnClickListener(v -> finish());
    }

    private void setupManagers() {
        analyticsHelper = new ReservationAnalyticsHelper("ManageSeats");
        seatManager = new SeatManager(this, analyticsHelper);
        seatManager.setSeatSelectionListener(this);
        seatManager.configurarAsientos();
    }

    private void setupObservers() {
        viewModel.getAppOccupiedSeats().observe(this, appSeats -> actualizarMapaAsientos());
        viewModel.getPhysicalOccupiedSeats().observe(this, physicalSeats -> actualizarMapaAsientos());
        viewModel.getTotalCapacity().observe(this, capacity -> actualizarMapaAsientos());
        viewModel.getAvailableCount().observe(this, count -> tvAvailableSeatsInfo.setText("Available: " + count));
        viewModel.getError().observe(this, msg -> {
            if (msg != null) Snackbar.make(findViewById(android.R.id.content), "Error: " + msg, Snackbar.LENGTH_LONG).show();
        });
    }

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

    @Override
    public void onSeatSelected(int seatNumber) {
        Set<Integer> app = viewModel.getAppOccupiedSeats().getValue();
        Set<Integer> physical = viewModel.getPhysicalOccupiedSeats().getValue();

        if (app != null && app.contains(seatNumber)) {
            Snackbar.make(findViewById(android.R.id.content), "Occupied by App (Not editable)", Snackbar.LENGTH_SHORT).show();
        } else if (physical != null && physical.contains(seatNumber)) {
            showFreePhysicalSeatDialog(seatNumber);
        } else {
            showReservePhysicalSeatDialog(seatNumber);
        }
    }

    private void showReservePhysicalSeatDialog(int seatNumber) {
        new MaterialAlertDialogBuilder(this, R.style.AppDialogTheme)
                .setTitle("Physical Sale")
                .setMessage("Block seat " + seatNumber + " manually?")
                .setPositiveButton("Block", (d, w) -> viewModel.reservePhysical(seatNumber))
                .setNegativeButton("Cancel", null)
                .show();
    }

    private void showFreePhysicalSeatDialog(int seatNumber) {
        new MaterialAlertDialogBuilder(this, R.style.AppDialogTheme)
                .setTitle("Free Seat")
                .setMessage("Free manually blocked seat " + seatNumber + "?")
                .setPositiveButton("Free", (d, w) -> viewModel.freePhysical(seatNumber))
                .setNegativeButton("Close", null)
                .show();
    }

    @Override public void onSeatDeselected(int seatNumber) {}
    @Override public void onExpandableSectionRequestedToCollapse() {}
}

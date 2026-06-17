package com.chopcode.rutago.app.activities.passenger.reservation.createReservation;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.utils.ui.FormatUtils;
import com.chopcode.rutago.app.viewmodels.passenger.CreateReservationViewModel;
import androidx.lifecycle.ViewModelProvider;
import com.chopcode.rutago.app.managers.analytics.ReservationAnalyticsHelper;
import com.chopcode.rutago.app.managers.seats.SeatManager;
import com.chopcode.rutago.app.managers.ui.ExpandableSectionManager;
import com.chopcode.rutago.app.managers.reservations.ReservationNavigationManager;
import com.chopcode.rutago.app.managers.reservations.ReservationStateManager;
import com.chopcode.rutago.app.managers.reservations.dataprocessor.ReservationDataProcessor;
import com.chopcode.rutago.app.managers.reservations.DriverVehicleManager;
import com.chopcode.rutago.app.managers.reservations.ReservationUserManager;
import com.google.android.material.appbar.MaterialToolbar;

import java.util.HashMap;
import java.util.Map;

/**
 * 💺 Create Reservation Activity (Passenger)
 * Esta actividad permite al pasajero seleccionar un asiento para un horario específico.
 * Responsabilidades:
 * - Mostrar el mapa interactivo de asientos (usando SeatManager).
 * - Cargar y mostrar la información del conductor y vehículo asignado al horario.
 * - Validar que se haya seleccionado un asiento antes de proceder.
 * - Manejar la persistencia del estado ante cambios de configuración (rotación).
 */
public class CreateReservationActivity extends AppCompatActivity implements SeatManager.SeatSelectionListener {

    private static final String TAG = "CreateReservationActivity";

    // UI Elements
    private Button btnConfirm;
    private Button btnCancel;
    private MaterialToolbar topAppBar;

    // Data from intent
    private String selectedRoute, scheduleId, scheduleTime;

    // Travel info views
    private TextView tvSelectedRoute, tvRouteDescription, tvSelectedSchedule, tvTravelDate;
    private TextView tvVehicleInfo, tvCapacityInfo, tvAvailableCapacity, tvDriverName;

    // Expandable section views
    private ExpandableSectionManager expandableSectionManager;
    private RelativeLayout headerInfo;
    private LinearLayout expandableContent;
    private LinearLayout summaryInfo;
    private ImageView iconExpandCollapse;
    private TextView tvRouteSummary;
    private TextView tvScheduleSummary;

    // Driver and Vehicle info
    private String driverId;
    private String driverName;
    private String driverPhone;
    private String vehiclePlate;
    private String vehicleModel;
    private Integer vehicleCapacity;

    // Managers
    private ReservationAnalyticsHelper analyticsHelper;
    private SeatManager seatManager;
    private ReservationDataProcessor reservationDataProcessor;
    private DriverVehicleManager driverVehicleManager;
    private ReservationUserManager reservationUserManager;
    private ReservationNavigationManager reservationNavigationManager; 
    private CreateReservationViewModel viewModel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        analyticsHelper = new ReservationAnalyticsHelper("CreateReservation");
        viewModel = new ViewModelProvider(this).get(CreateReservationViewModel.class);
        reservationDataProcessor = new ReservationDataProcessor(analyticsHelper);
        reservationUserManager = new ReservationUserManager(analyticsHelper);

        setContentView(R.layout.activity_crear_reservas);

        seatManager = new SeatManager(this, analyticsHelper);
        seatManager.setSeatSelectionListener(this);
        driverVehicleManager = new DriverVehicleManager(this, analyticsHelper, seatManager);
        reservationNavigationManager = new ReservationNavigationManager(this, analyticsHelper, seatManager);

        getIntentData();
        initViews();
        driverVehicleManager.setUIReferences(tvDriverName, tvVehicleInfo, tvCapacityInfo);
        setupToolbar();
        setupBasicInfo();
        setupViewModelObservers();
        viewModel.loadUserData();

        if (savedInstanceState != null) restoreState(savedInstanceState);
        seatManager.configurarAsientos();

        if (scheduleId != null) {
            loadDriverVehicleInfo();
            viewModel.startListeningSeats(scheduleId);
        } else {
            finish();
        }

        btnConfirm.setOnClickListener(v -> validateReservation());
        btnCancel.setOnClickListener(v -> goBack());
    }

    private void setupViewModelObservers() {
        viewModel.getOccupiedSeats().observe(this, occupied -> {
            seatManager.actualizarEstadoAsientos(occupied, seatManager.getCapacidadTotal());
            tvAvailableCapacity.setText(getString(R.string.asientos_disponibles_count, seatManager.getCapacidadDisponible()));
        });

        viewModel.getCurrentUser().observe(this, user -> {
            if (user != null) reservationUserManager.updateFromIntent(user.getId(), user.getNombre(), user.getTelefono());
        });

        viewModel.getError().observe(this, msg -> { if (msg != null) Toast.makeText(this, msg, Toast.LENGTH_SHORT).show(); });
    }

    private void getIntentData() {
        Intent intent = getIntent();
        if (intent != null) {
            selectedRoute = intent.getStringExtra("rutaSeleccionada");
            scheduleId = intent.getStringExtra("horarioId");
            scheduleTime = intent.getStringExtra("horarioHora");
            reservationUserManager.updateFromIntent(intent.getStringExtra("usuarioId"), intent.getStringExtra("usuarioNombre"), intent.getStringExtra("usuarioTelefono"));
        }
    }

    private void initViews() {
        tvSelectedRoute = findViewById(R.id.tvRutaSeleccionada);
        tvRouteDescription = findViewById(R.id.tvDescripcionRuta);
        tvSelectedSchedule = findViewById(R.id.tvHorarioSeleccionado);
        tvTravelDate = findViewById(R.id.tvFechaViaje);
        tvVehicleInfo = findViewById(R.id.tvVehiculoInfo);
        tvCapacityInfo = findViewById(R.id.tvCapacidadInfo);
        tvAvailableCapacity = findViewById(R.id.tvCapacidadDispo);
        tvDriverName = findViewById(R.id.tvNombreConductor);
        btnConfirm = findViewById(R.id.buttonConfirmar);
        btnCancel = findViewById(R.id.buttonCancelar);
        topAppBar = findViewById(R.id.topAppBar);
        headerInfo = findViewById(R.id.headerInfo);
        expandableContent = findViewById(R.id.contenidoExpandible);
        summaryInfo = findViewById(R.id.resumenInfo);
        iconExpandCollapse = findViewById(R.id.iconExpandCollapse);
        tvRouteSummary = findViewById(R.id.tvRutaResumen);
        tvScheduleSummary = findViewById(R.id.tvHorarioResumen);
        expandableSectionManager = new ExpandableSectionManager(this, headerInfo, expandableContent, summaryInfo, iconExpandCollapse, tvRouteSummary, tvScheduleSummary);
    }

    private void setupToolbar() {
        setSupportActionBar(topAppBar);
        if (getSupportActionBar() != null) getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        topAppBar.setNavigationOnClickListener(v -> goBack());
    }

    private void goBack() {
        reservationNavigationManager.handleBackAction(new ReservationNavigationManager.NavigationCallback() {
            @Override public void onConfirmNavigation() { finish(); }
            @Override public void onCancelNavigation() {}
        });
    }

    private void setupBasicInfo() {
        if (selectedRoute != null) {
            tvSelectedRoute.setText(selectedRoute);
            expandableSectionManager.updateSummaryInfo(selectedRoute, null);
            tvRouteDescription.setText(getString(R.string.ruta_directa_tiempo, FormatUtils.calcularTiempoEstimado(selectedRoute)));
        }
        if (scheduleTime != null) {
            tvSelectedSchedule.setText(scheduleTime);
            expandableSectionManager.updateSummaryInfo(null, scheduleTime);
        }
        tvTravelDate.setText(FormatUtils.obtenerFechaViaje(scheduleTime));
    }

    private void restoreState(Bundle savedInstanceState) {
        ReservationStateManager.RestoredState state = ReservationStateManager.restoreState(savedInstanceState, seatManager, expandableSectionManager);
        if (state.asientoSeleccionado != null) seatManager.setAsientoSeleccionado(state.asientoSeleccionado);
        if (state.rutaSeleccionada != null) selectedRoute = state.rutaSeleccionada;
        if (state.usuarioNombre != null) reservationUserManager.updateFromIntent(state.usuarioId, state.usuarioNombre, state.usuarioTelefono);
    }

    private void validateReservation() {
        updateManagerData();
        String travelDate = FormatUtils.obtenerFechaViaje(scheduleTime);
        Intent intent = reservationDataProcessor.prepareReservationConfirmation(this, seatManager, selectedRoute, scheduleId, scheduleTime, driverName, driverPhone, driverId, vehiclePlate, vehicleModel, vehicleCapacity, reservationUserManager.getUserNombre(), reservationUserManager.getUserTelefono(), reservationUserManager.getUserId(), travelDate);
        if (intent != null) startActivity(intent);
        else Toast.makeText(this, getString(R.string.error_datos_incompletos), Toast.LENGTH_SHORT).show();
    }

    private void updateManagerData() {
        if (driverVehicleManager != null) {
            driverId = driverVehicleManager.getConductorId();
            driverName = driverVehicleManager.getConductorNombre();
            driverPhone = driverVehicleManager.getConductorTelefono();
            vehiclePlate = driverVehicleManager.getPlacaVehiculo();
            vehicleModel = driverVehicleManager.getModeloVehiculo();
            vehicleCapacity = driverVehicleManager.getCapacidadVehiculo();
        }
    }

    private void loadDriverVehicleInfo() {
        driverVehicleManager.loadDriverVehicleInfo(scheduleId, new DriverVehicleManager.DriverVehicleCallback() {
            @Override
            public void onDriverVehicleLoaded(String cId, String cName, String cPhone, String vPlate, String vModel, Integer vCap) {
                driverId = cId; driverName = cName; driverPhone = cPhone; vehiclePlate = vPlate; vehicleModel = vModel; vehicleCapacity = vCap;
                tvAvailableCapacity.setText(getString(R.string.asientos_disponibles_count, seatManager.getCapacidadDisponible()));
            }
            @Override public void onError(String error) { Toast.makeText(CreateReservationActivity.this, getString(R.string.error_prefijo, error), Toast.LENGTH_SHORT).show(); }
        });
    }

    @Override public void onSeatSelected(int seatNumber) {}
    @Override public void onSeatDeselected(int seatNumber) {}
    @Override public void onExpandableSectionRequestedToCollapse() { if (expandableSectionManager != null && expandableSectionManager.isExpanded()) expandableSectionManager.collapseSection(); }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        ReservationStateManager.saveState(outState, seatManager, selectedRoute, driverName != null ? driverName : getString(R.string.cargando_punto), driverPhone, expandableSectionManager, reservationUserManager.getUserNombre(), reservationUserManager.getUserTelefono(), reservationUserManager.getUserId());
    }

    @Override protected void onDestroy() {
        super.onDestroy();
        if (seatManager != null) seatManager.cleanup();
        if (driverVehicleManager != null) driverVehicleManager.cleanup();
        if (expandableSectionManager != null) expandableSectionManager.cleanup();
    }

    @Override public void onBackPressed() { reservationNavigationManager.logPhysicalBackButton(); goBack(); }
}

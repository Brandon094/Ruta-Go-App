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
    private ReservationUserManager reservationUserManager;
    private ReservationNavigationManager reservationNavigationManager; 
    private CreateReservationViewModel viewModel;
    private com.chopcode.rutago.app.managers.ui.tutorial.TutorialManager tutorialManager;

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
        reservationNavigationManager = new ReservationNavigationManager(this, analyticsHelper, seatManager);
        tutorialManager = new com.chopcode.rutago.app.managers.ui.tutorial.TutorialManager(this);

        getIntentData();
        initViews();
        setupToolbar();
        setupBasicInfo();
        setupViewModelObservers();
        viewModel.loadUserData();

        if (savedInstanceState != null) restoreState(savedInstanceState);
        seatManager.configurarAsientos();

        if (scheduleId != null) {
            viewModel.loadDriverAndVehicleInfo(scheduleId);
            viewModel.startListeningSeats(scheduleId);
        } else {
            finish();
        }

        btnConfirm.setOnClickListener(v -> validateReservation());
        btnCancel.setOnClickListener(v -> goBack());

        tutorialManager.showPassengerSeatsGuide();
    }

    private void setupViewModelObservers() {
        viewModel.getOccupiedSeats().observe(this, occupied -> {
            seatManager.actualizarEstadoAsientos(occupied, seatManager.getCapacidadTotal());
            tvAvailableCapacity.setText(getString(R.string.asientos_disponibles_count, seatManager.getCapacidadDisponible()));
        });

        viewModel.getCurrentUser().observe(this, user -> {
            if (user != null) reservationUserManager.updateFromIntent(user.getId(), user.getNombre(), user.getTelefono());
        });

        viewModel.getCurrentDriver().observe(this, driver -> {
            if (driver != null) {
                driverId = driver.getId();
                driverName = driver.getNombre();
                driverPhone = driver.getTelefono();
                tvDriverName.setText(driverName);
            }
        });

        viewModel.getCurrentVehicle().observe(this, vehicle -> {
            if (vehicle != null) {
                vehiclePlate = vehicle.getPlate();
                vehicleModel = vehicle.getModel();
                vehicleCapacity = vehicle.getCapacity();
                tvVehicleInfo.setText(getString(R.string.placa_modelo_format, vehiclePlate, vehicleModel));
                tvCapacityInfo.setText(getString(R.string.capacidad, vehicleCapacity));
                seatManager.actualizarEstadoAsientos(viewModel.getOccupiedSeats().getValue(), vehicleCapacity);
            }
        });

        viewModel.getError().observe(this, msg -> { if (msg != null) Toast.makeText(this, getString(R.string.error_prefijo, msg), Toast.LENGTH_SHORT).show(); });
    }

    private void getIntentData() {
        Intent intent = getIntent();
        if (intent != null) {
            selectedRoute = intent.getStringExtra("rutaSeleccionada");
            scheduleId = intent.getStringExtra("horarioId");
            scheduleTime = intent.getStringExtra("horarioHora");
            
            // 🔥 CAPTURAR PRECIO DEL INTENT
            double initialPrice = intent.getDoubleExtra("precioSeleccionado", com.chopcode.rutago.app.services.prices.PriceService.DEFAULT_PRICE);
            if (viewModel != null) viewModel.setInitialPrice(initialPrice);

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

        // 🔥 Micro-interacciones de Botones
        com.chopcode.rutago.app.utils.ui.UIAnimationUtils.setClickAnimation(btnConfirm);
        com.chopcode.rutago.app.utils.ui.UIAnimationUtils.setClickAnimation(btnCancel);

        // 🔥 Animaciones de Entrada Premium para tarjetas
        com.chopcode.rutago.app.utils.ui.UIAnimationUtils.playCardEntryAnimation(findViewById(R.id.infoViajeCardView));
        com.chopcode.rutago.app.utils.ui.UIAnimationUtils.playCardEntryAnimation(findViewById(R.id.busCardView));
        com.chopcode.rutago.app.utils.ui.UIAnimationUtils.playCardEntryAnimation(findViewById(R.id.selectedSeatCardView));

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

            // 🔥 RESOLVER PRECIO DINÁMICO
            String separator = " → ";
            if (!selectedRoute.contains(separator)) separator = " -> ";
            String[] parts = selectedRoute.split(separator);
            if (parts.length == 2) {
                viewModel.loadPrice(parts[0].trim(), parts[1].trim());
            }
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
        String travelDate = FormatUtils.obtenerFechaViaje(scheduleTime);
        Double currentPrice = viewModel.getRoutePrice().getValue();
        Intent intent = reservationDataProcessor.prepareReservationConfirmation(this, seatManager, selectedRoute, scheduleId, scheduleTime, driverName, driverPhone, driverId, vehiclePlate, vehicleModel, vehicleCapacity, reservationUserManager.getUserNombre(), reservationUserManager.getUserTelefono(), reservationUserManager.getUserId(), travelDate, currentPrice);
        if (intent != null) startActivity(intent);
        else Toast.makeText(this, getString(R.string.error_datos_incompletos), Toast.LENGTH_SHORT).show();
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
        if (expandableSectionManager != null) expandableSectionManager.cleanup();
    }

    @Override public void onBackPressed() { reservationNavigationManager.logPhysicalBackButton(); goBack(); }
}

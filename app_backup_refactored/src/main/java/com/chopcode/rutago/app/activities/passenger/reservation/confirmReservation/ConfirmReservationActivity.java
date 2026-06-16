package com.chopcode.rutago.app.activities.passenger.reservation.confirmReservation;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.widget.TextView;
import android.widget.Toast;

import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.activities.passenger.PassengerHomeActivity;
import com.chopcode.rutago.app.viewmodels.passenger.ConfirmReservationViewModel;
import androidx.lifecycle.ViewModelProvider;
import com.chopcode.rutago.app.utils.ui.FormatUtils;
import com.chopcode.rutago.app.managers.analytics.ReservationAnalyticsHelper;
import com.chopcode.rutago.app.managers.reservations.confirmation.ConfirmationUIManager;
import com.chopcode.rutago.app.managers.reservations.confirmation.ConfirmationAnalyticsHelper;
import com.chopcode.rutago.app.managers.reservations.confirmation.ConfirmationDialogManager;
import com.google.android.material.appbar.MaterialToolbar;
import com.google.android.material.button.MaterialButton;
import com.google.android.material.card.MaterialCardView;

import java.util.Map;

/**
 * ✅ Confirm Reservation Activity (Passenger)
 */
public class ConfirmReservationActivity extends AppCompatActivity implements
        ConfirmationUIManager.ConfirmationListener,
        ConfirmationDialogManager.DialogCallback {

    private static final String TAG = "ConfirmReservationActivity";

    // ViewModel
    private ConfirmReservationViewModel viewModel;

    // UI Elements
    private MaterialButton btnConfirmReservation, btnCancel;
    private MaterialToolbar topAppBar;

    // UI Managers
    private ConfirmationUIManager uiManager;
    private ConfirmationAnalyticsHelper confirmationAnalytics;
    private ConfirmationDialogManager dialogManager;
    private ReservationAnalyticsHelper analyticsHelper;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.d(TAG, "🚀 onCreate - Starting ConfirmReservationActivity");

        setContentView(R.layout.activity_confirmar_reserva);

        viewModel = new ViewModelProvider(this).get(ConfirmReservationViewModel.class);

        analyticsHelper = new ReservationAnalyticsHelper("ConfirmReservation");
        confirmationAnalytics = new ConfirmationAnalyticsHelper(analyticsHelper);
        dialogManager = new ConfirmationDialogManager(this, confirmationAnalytics);

        initializeViews();
        setupObservers();
        viewModel.processIntent(getIntent());
    }

    private void initializeViews() {
        topAppBar = findViewById(R.id.topAppBar);
        btnConfirmReservation = findViewById(R.id.btnConfirmar);
        btnCancel = findViewById(R.id.btnCancelar);

        setSupportActionBar(topAppBar);
        if (getSupportActionBar() != null) getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        topAppBar.setNavigationOnClickListener(v -> onBackPressed());

        uiManager = new ConfirmationUIManager(analyticsHelper);
        initializeViewReferences();
        uiManager.setupNewListeners();

        btnConfirmReservation.setOnClickListener(v -> viewModel.confirmReservation());
        btnCancel.setOnClickListener(v -> dialogManager.showCancellationDialog(this));
    }

    private void initializeViewReferences() {
        uiManager.setNewViewReferences(
                findViewById(R.id.tvOrigen), findViewById(R.id.tvDestino), findViewById(R.id.tvFecha),
                findViewById(R.id.tvHora), findViewById(R.id.tvTiempoEstimado), findViewById(R.id.tvPrecio),
                findViewById(R.id.tvAsiento), findViewById(R.id.tvUser), findViewById(R.id.tvTelefonoP),
                findViewById(R.id.tvConductor), findViewById(R.id.tvTelefonoC), findViewById(R.id.tvPlaca),
                findViewById(R.id.cardEfectivo)
        );
        uiManager.setConfirmationListener(this);
    }

    private void setupObservers() {
        viewModel.getReservationData().observe(this, data -> { if (data != null && !data.isEmpty()) updateUI(data); });

        viewModel.getCurrentUser().observe(this, user -> {
            if (user == null) return;
            TextView tvUser = findViewById(R.id.tvUser);
            TextView tvPhoneP = findViewById(R.id.tvTelefonoP);
            if (tvUser != null) tvUser.setText(user.getNombre());
            if (tvPhoneP != null) tvPhoneP.setText(user.getTelefono());
        });

        viewModel.getIsProcessing().observe(this, processing -> {
            btnConfirmReservation.setEnabled(!processing);
            btnConfirmReservation.setText(processing ? "Processing..." : "Confirm Reservation");
        });

        viewModel.getConfirmationSuccess().observe(this, success -> {
            if (success) {
                Toast.makeText(this, "✅ Reservation successful", Toast.LENGTH_SHORT).show();
                navigateToHome();
            }
        });

        viewModel.getError().observe(this, msg -> { if (msg != null) Toast.makeText(this, msg, Toast.LENGTH_LONG).show(); });
    }

    private void updateUI(Map<String, Object> data) {
        ((TextView)findViewById(R.id.tvOrigen)).setText((String)data.get("origen"));
        ((TextView)findViewById(R.id.tvDestino)).setText((String)data.get("destino"));
        ((TextView)findViewById(R.id.tvFecha)).setText(FormatUtils.formatearFechaCortaALegible((String)data.get("fechaViaje")));
        ((TextView)findViewById(R.id.tvHora)).setText(FormatUtils.formatearHora12h((String)data.get("horarioHora")));
        ((TextView)findViewById(R.id.tvAsiento)).setText(FormatUtils.formatearAsiento((int)data.get("asientoSeleccionado")));
        ((TextView)findViewById(R.id.tvPrecio)).setText(FormatUtils.formatearPrecio(data.get("precio")));
        ((TextView)findViewById(R.id.tvPlaca)).setText(FormatUtils.formatearInfoVehiculo((String)data.get("vehiculoPlaca"), (String)data.get("vehiculoModelo")));
        ((TextView)findViewById(R.id.tvConductor)).setText((String)data.get("conductorNombre"));
        ((TextView)findViewById(R.id.tvTelefonoC)).setText((String)data.get("conductorTelefono"));
        ((TextView)findViewById(R.id.tvTiempoEstimado)).setText((String)data.get("tiempoEstimado"));
    }

    @Override public void onConfirmButtonClicked() { viewModel.confirmReservation(); }
    @Override public void onCancelButtonClicked() { dialogManager.showCancellationDialog(this); }
    @Override public void onPaymentMethodChanged(String method) { viewModel.setPaymentMethod(method); }
    @Override public void onHelpRequested() { Toast.makeText(this, "How can we help you?", Toast.LENGTH_SHORT).show(); }
    @Override public void onPositiveAction() { finish(); }
    @Override public void onNegativeAction() { }

    private void navigateToHome() {
        Intent intent = new Intent(this, PassengerHomeActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_NEW_TASK);
        startActivity(intent);
        finish();
    }

    @Override public void onBackPressed() { dialogManager.showCancellationDialog(this); }
}

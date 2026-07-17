package com.chopcode.rutago.app.activities.passenger.reservation.confirmReservation;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.ViewGroup;
import android.widget.TextView;
import android.widget.Toast;

import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.activities.passenger.PassengerHomeActivity;
import com.chopcode.rutago.app.viewmodels.passenger.ConfirmReservationViewModel;
import androidx.lifecycle.ViewModelProvider;
import com.chopcode.rutago.app.utils.ui.FormatUtils;
import com.chopcode.rutago.app.managers.core.analytics.ReservationAnalyticsHelper;
import com.chopcode.rutago.app.managers.ui.reservations.confirmation.ConfirmationUIManager;
import com.chopcode.rutago.app.managers.ui.reservations.confirmation.ConfirmationAnalyticsHelper;
import com.chopcode.rutago.app.managers.ui.reservations.confirmation.ConfirmationDialogManager;
import com.chopcode.rutago.app.utils.ui.WindowUtils;
import com.google.android.material.appbar.MaterialToolbar;
import com.google.android.material.button.MaterialButton;

import java.util.Map;

/**
 * Confirm Reservation Activity
 *
 * Etapa final de la pasarela de reserva de Ruta-Go.
 * Responsabilidades:
 * - Consolidar y visualizar el resumen ejecutivo del viaje (Logística, Operador y Activo).
 * - Gestionar la intención de pago mediante selectores interactivos coordinados por el UI Manager.
 * - Orquestar la transacción atómica de reserva en Firebase mediante el ConfirmReservationViewModel.
 * - Implementar flujos de confirmación de salida y cancelación de tiquetes.
 * - Garantizar feedback visual premium mediante animaciones de entrada y estados de procesamiento.
 */
public class ConfirmReservationActivity extends AppCompatActivity implements
        ConfirmationUIManager.ConfirmationListener,
        ConfirmationDialogManager.DialogCallback {

    private static final String TAG = "ConfirmReservationActivity";

    private ConfirmReservationViewModel viewModel;

    // Componentes UI
    private MaterialButton btnConfirmReservation, btnCancel;
    private MaterialToolbar topAppBar;

    // Gestores de Lógica Visual y Telemetría
    private ConfirmationUIManager uiManager;
    private ConfirmationAnalyticsHelper confirmationAnalytics;
    private ConfirmationDialogManager dialogManager;
    private ReservationAnalyticsHelper analyticsHelper;
    private com.chopcode.rutago.app.managers.ui.tutorials.TutorialManager tutorialManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        EdgeToEdge.enable(this);
        super.onCreate(savedInstanceState);
        Log.d(TAG, "🚀 Iniciando etapa final de confirmación.");

        setContentView(R.layout.activity_confirmar_reserva);

        viewModel = new ViewModelProvider(this).get(ConfirmReservationViewModel.class);

        analyticsHelper = new ReservationAnalyticsHelper("ConfirmReservation");
        confirmationAnalytics = new ConfirmationAnalyticsHelper(analyticsHelper);
        dialogManager = new ConfirmationDialogManager(this, confirmationAnalytics);
        tutorialManager = new com.chopcode.rutago.app.managers.ui.tutorials.TutorialManager(this);

        initializeViews();
        setupInsets();
        setupObservers();
        viewModel.processIntent(getIntent());

        tutorialManager.showPassengerConfirmGuide();
    }

    /**
     * Configura el Toolbar y aplica animaciones de emergencia para los contenedores de resumen.
     */
    private void initializeViews() {
        topAppBar = findViewById(R.id.topAppBar);
        btnConfirmReservation = findViewById(R.id.btnConfirmar);
        btnCancel = findViewById(R.id.btnCancelar);

        com.chopcode.rutago.app.utils.ui.UIAnimationUtils.setClickAnimation(btnConfirmReservation);
        com.chopcode.rutago.app.utils.ui.UIAnimationUtils.setClickAnimation(btnCancel);

        com.chopcode.rutago.app.utils.ui.UIAnimationUtils.playCardEntryAnimation(findViewById(R.id.cardViaje));
        com.chopcode.rutago.app.utils.ui.UIAnimationUtils.playCardEntryAnimation(findViewById(R.id.cardContactos));
        com.chopcode.rutago.app.utils.ui.UIAnimationUtils.playCardEntryAnimation(findViewById(R.id.cardPago));

        setSupportActionBar(topAppBar);
        if (getSupportActionBar() != null) getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        topAppBar.setNavigationOnClickListener(v -> onBackPressed());

        uiManager = new ConfirmationUIManager(analyticsHelper);
        uiManager.init(findViewById(R.id.cardEfectivo), this);

        btnConfirmReservation.setOnClickListener(v -> viewModel.confirmReservation());
        btnCancel.setOnClickListener(v -> dialogManager.showCancellationDialog(this));
    }

    /**
     * Gestiona los insets del sistema para evitar superposiciones con las barras de estado y navegación.
     */
    private void setupInsets() {
        WindowUtils.applyTopInsetPadding(findViewById(R.id.appBarLayout));
        WindowUtils.applyBottomInsetMargin(findViewById(R.id.layoutBtnConfirmacion), 24);
    }

    /**
     * Suscribe la UI a los cambios del estado transaccional (Éxito, Error, Procesando).
     */
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
            btnConfirmReservation.setText(processing ? getString(R.string.procesando) : getString(R.string.confirmar_reserva_btn));
        });

        viewModel.getConfirmationSuccess().observe(this, success -> {
            if (Boolean.TRUE.equals(success)) {
                Toast.makeText(this, getString(R.string.reserva_exitosa), Toast.LENGTH_SHORT).show();
                navigateToHome();
            }
        });

        viewModel.getError().observe(this, msg -> { if (msg != null) Toast.makeText(this, msg, Toast.LENGTH_LONG).show(); });
    }

    /**
     * Refresca la ficha técnica del tiquete con la información consolidada.
     */
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

    @Override public void onPaymentMethodChanged(String method) { viewModel.setPaymentMethod(method); }
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

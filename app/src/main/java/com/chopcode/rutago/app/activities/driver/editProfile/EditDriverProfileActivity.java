package com.chopcode.rutago.app.activities.driver.editProfile;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProvider;

import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.config.MyApp;
import com.chopcode.rutago.app.models.Driver;
import com.chopcode.rutago.app.utils.ui.WindowUtils;
import com.chopcode.rutago.app.viewmodels.driver.EditDriverProfileViewModel;
import com.google.android.material.appbar.MaterialToolbar;
import com.google.android.material.tabs.TabLayout;
import com.google.android.material.textfield.TextInputEditText;

/**
 * 📝 Edit Driver Profile Activity
 * 
 * Permite al conductor gestionar su identidad y la información técnica de su vehículo.
 * Responsabilidades:
 * - Actualizar datos de contacto (Nombre, Teléfono).
 * - Gestionar especificaciones del vehículo (Placa, Modelo, Marca, Capacidad, Año).
 * - Validar campos de entrada para asegurar integridad en Firebase.
 * - Disparar la sincronización de capacidad hacia los horarios tras guardar cambios.
 */
public class EditDriverProfileActivity extends AppCompatActivity {

    private static final String TAG = "EditDriverProfileActivity";

    // Views - Current Data
    private TextView tvCorreoActual, tvNombreActual, tvTelefonoActual;
    
    // Views - Inputs
    private TextInputEditText etNombre, etTelefono;
    
    private MaterialToolbar topAppBar;
    private TabLayout tabLayout;
    private Button btnCancelar, btnGuardarCambios;
    private ProgressBar progressBar;

    // ViewModel
    private EditDriverProfileViewModel viewModel;
    private String userId;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        EdgeToEdge.enable(this);
        super.onCreate(savedInstanceState);
        Log.d(TAG, "🚀 onCreate - Starting EditDriverProfileActivity");
        setContentView(R.layout.activity_editar_perfil);

        userId = MyApp.getCurrentUserId();
        if (userId == null) {
            finish();
            return;
        }

        viewModel = new ViewModelProvider(this).get(EditDriverProfileViewModel.class);

        inicializarVistas();
        setupInsets();
        setupObservers();
        setupListeners();

        viewModel.loadData(userId);
    }

    private void inicializarVistas() {
        tvCorreoActual = findViewById(R.id.tvCorreoActual);
        tvNombreActual = findViewById(R.id.tvNombreActual);
        tvTelefonoActual = findViewById(R.id.tvTelefonoActual);

        etNombre = findViewById(R.id.etNombre);
        etTelefono = findViewById(R.id.etTelefono);

        topAppBar = findViewById(R.id.topAppBar);
        tabLayout = findViewById(R.id.tabLayoutEditar);
        btnCancelar = findViewById(R.id.btnCancelar);
        btnGuardarCambios = findViewById(R.id.btnGuardarCambios);
        progressBar = findViewById(R.id.progressBar);

        // 🔥 Micro-interacciones de Botones
        com.chopcode.rutago.app.utils.ui.UIAnimationUtils.setClickAnimation(btnCancelar);
        com.chopcode.rutago.app.utils.ui.UIAnimationUtils.setClickAnimation(btnGuardarCambios);
    }

    private void setupObservers() {
        viewModel.getConductorData().observe(this, driver -> {
            if (driver != null) {
                tvNombreActual.setText(getString(R.string.nombreCompleto) + ": " + driver.getNombre());
                tvTelefonoActual.setText(getString(R.string.telefono) + ": " + driver.getTelefono());
                tvCorreoActual.setText(getString(R.string.correo) + ": " + driver.getEmail());
            }
        });

        viewModel.getIsLoading().observe(this, loading -> {
            if (progressBar != null) progressBar.setVisibility(loading ? View.VISIBLE : View.GONE);
            btnGuardarCambios.setEnabled(!loading);
        });

        viewModel.getUpdateSuccess().observe(this, success -> {
            if (success) {
                Toast.makeText(this, R.string.perfil_actualizado, Toast.LENGTH_SHORT).show();
                finish();
            }
        });

        viewModel.getError().observe(this, msg -> {
            if (msg != null) Toast.makeText(this, getString(R.string.error_prefijo, msg), Toast.LENGTH_LONG).show();
        });
    }

    private void setupListeners() {
        // 🛡️ REFACTOR v1.9.9.8: Deshabilitar navegación a pestaña vehículo para conductores
        tabLayout.setVisibility(View.GONE);

        if (topAppBar != null) topAppBar.setNavigationOnClickListener(v -> onBackPressed());

        btnCancelar.setOnClickListener(v -> finish());

        btnGuardarCambios.setOnClickListener(v -> procesarGuardado());
    }

    /**
     * Gestiona los insets del sistema para evitar superposiciones con las barras de estado y navegación.
     */
    private void setupInsets() {
        WindowUtils.applyTopInsetPadding(findViewById(R.id.appBarLayout));
    }

    private void procesarGuardado() {
        Driver d = viewModel.getConductorData().getValue();
        if (d == null) d = new Driver();

        String nNombre = etNombre.getText() != null ? etNombre.getText().toString().trim() : "";
        String nTelef = etTelefono.getText() != null ? etTelefono.getText().toString().trim() : "";
        if (!nNombre.isEmpty()) d.setNombre(nNombre);
        if (!nTelef.isEmpty()) d.setTelefono(nTelef);

        // 🛡️ REFACTOR v1.9.9.8: Solo guardar datos personales. 
        // La gestión del vehículo es exclusiva de Dueños y Admin.
        viewModel.updateProfile(userId, d, null);
    }
}

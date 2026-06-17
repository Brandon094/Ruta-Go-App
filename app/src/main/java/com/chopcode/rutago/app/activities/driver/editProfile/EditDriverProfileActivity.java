package com.chopcode.rutago.app.activities.driver.editProfile;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProvider;

import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.config.MyApp;
import com.chopcode.rutago.app.models.Driver;
import com.chopcode.rutago.app.models.Vehicle;
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
    private TextView tvCorreoActual, tvNombreActual, tvTelefonoActual, tvPlacaActual, tvMarcaActual, tvModeloActual, tvColorActual, tvCapacidadActual, tvAnioActual;
    
    // Views - Inputs
    private TextInputEditText etNombre, etTelefono, etPlaca, etMarca, etModelo, etColor, etCapacidad, etAnio;
    
    private MaterialToolbar topAppBar;
    private TabLayout tabLayout;
    private View containerPersonal, containerVehiculo;
    private Button btnCancelar, btnGuardarCambios;
    private ProgressBar progressBar;

    // ViewModel
    private EditDriverProfileViewModel viewModel;
    private String userId;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
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
        setupObservers();
        setupListeners();

        viewModel.loadData(userId);
    }

    private void inicializarVistas() {
        tvCorreoActual = findViewById(R.id.tvCorreoActual);
        tvNombreActual = findViewById(R.id.tvNombreActual);
        tvTelefonoActual = findViewById(R.id.tvTelefonoActual);
        tvPlacaActual = findViewById(R.id.tvPlacaActual);
        tvMarcaActual = findViewById(R.id.tvMarcaActual);
        tvModeloActual = findViewById(R.id.tvModeloActual);
        tvColorActual = findViewById(R.id.tvColorActual);
        tvCapacidadActual = findViewById(R.id.tvCapacidadActual);
        tvAnioActual = findViewById(R.id.tvAnioActual);

        etNombre = findViewById(R.id.etNombre);
        etTelefono = findViewById(R.id.etTelefono);
        etPlaca = findViewById(R.id.etPlaca);
        etMarca = findViewById(R.id.etMarca);
        etModelo = findViewById(R.id.etModelo);
        etColor = findViewById(R.id.etColor);
        etCapacidad = findViewById(R.id.etCapacidad);
        etAnio = findViewById(R.id.etAnio);

        topAppBar = findViewById(R.id.topAppBar);
        tabLayout = findViewById(R.id.tabLayoutEditar);
        containerPersonal = findViewById(R.id.containerPersonal);
        containerVehiculo = findViewById(R.id.containerVehiculo);
        btnCancelar = findViewById(R.id.btnCancelar);
        btnGuardarCambios = findViewById(R.id.btnGuardarCambios);
        progressBar = findViewById(R.id.progressBar);
    }

    private void setupObservers() {
        viewModel.getConductorData().observe(this, driver -> {
            if (driver != null) {
                tvNombreActual.setText(getString(R.string.nombreCompleto) + ": " + driver.getNombre());
                tvTelefonoActual.setText(getString(R.string.telefono) + ": " + driver.getTelefono());
                tvCorreoActual.setText(getString(R.string.correo) + ": " + driver.getEmail());
            }
        });

        viewModel.getVehiculoData().observe(this, vehicle -> {
            if (vehicle != null) {
                tvPlacaActual.setText(getString(R.string.placa) + ": " + vehicle.getPlate());
                tvMarcaActual.setText(getString(R.string.marca) + ": " + vehicle.getBrand());
                tvModeloActual.setText(getString(R.string.modelo) + ": " + vehicle.getModel());
                tvColorActual.setText(getString(R.string.color) + ": " + vehicle.getColor());
                tvCapacidadActual.setText(getString(R.string.capacidad) + ": " + vehicle.getCapacity());
                tvAnioActual.setText(getString(R.string.anio_label) + ": " + vehicle.getYear());
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
        tabLayout.addOnTabSelectedListener(new TabLayout.OnTabSelectedListener() {
            @Override
            public void onTabSelected(TabLayout.Tab tab) {
                boolean isPersonal = tab.getPosition() == 0;
                containerPersonal.setVisibility(isPersonal ? View.VISIBLE : View.GONE);
                containerVehiculo.setVisibility(isPersonal ? View.GONE : View.VISIBLE);
            }
            @Override public void onTabUnselected(TabLayout.Tab tab) {}
            @Override public void onTabReselected(TabLayout.Tab tab) {}
        });

        if (topAppBar != null) topAppBar.setNavigationOnClickListener(v -> onBackPressed());

        btnCancelar.setOnClickListener(v -> finish());

        btnGuardarCambios.setOnClickListener(v -> procesarGuardado());
    }

    private void procesarGuardado() {
        Driver d = viewModel.getConductorData().getValue();
        Vehicle v = viewModel.getVehiculoData().getValue();

        if (d == null) d = new Driver();
        if (v == null) v = new Vehicle();

        String nNombre = etNombre.getText() != null ? etNombre.getText().toString().trim() : "";
        String nTelef = etTelefono.getText() != null ? etTelefono.getText().toString().trim() : "";
        if (!nNombre.isEmpty()) d.setNombre(nNombre);
        if (!nTelef.isEmpty()) d.setTelefono(nTelef);

        String nPlaca = etPlaca.getText() != null ? etPlaca.getText().toString().trim() : "";
        String nMarca = etMarca.getText() != null ? etMarca.getText().toString().trim() : "";
        String nMod = etModelo.getText() != null ? etModelo.getText().toString().trim() : "";
        String nCap = etCapacidad.getText() != null ? etCapacidad.getText().toString().trim() : "";
        
        if (!nPlaca.isEmpty()) v.setPlate(nPlaca);
        if (!nMarca.isEmpty()) v.setBrand(nMarca);
        if (!nMod.isEmpty()) v.setModel(nMod);
        if (!nCap.isEmpty()) v.setCapacity(Integer.parseInt(nCap));
        
        if (etColor.getText() != null && !etColor.getText().toString().isEmpty()) v.setColor(etColor.getText().toString());
        if (etAnio.getText() != null && !etAnio.getText().toString().isEmpty()) v.setYear(etAnio.getText().toString());

        viewModel.updateProfile(userId, d, v);
    }
}

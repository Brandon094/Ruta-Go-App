package com.chopcode.rutago.app.activities.driver;

import android.os.Bundle;

import androidx.activity.EdgeToEdge;
import android.util.Log;
import android.widget.ArrayAdapter;
import android.widget.AutoCompleteTextView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProvider;
import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.models.Schedule;
import com.chopcode.rutago.app.viewmodels.driver.DriverRegistrationViewModel;
import com.google.android.material.appbar.MaterialToolbar;
import com.google.android.material.button.MaterialButton;
import com.google.android.material.textfield.TextInputEditText;
import java.util.ArrayList;
import java.util.List;

/**
 * 🚛 Driver Registration Activity
 * 
 * Formulario especializado para el registro de nuevos conductores y sus vehículos.
 */
public class DriverRegistrationActivity extends AppCompatActivity {
    private static final String TAG = "DriverRegistrationAct";

    private TextInputEditText etName, etEmail, etPhone, etPlate, etModel, etYear, etCapacity, etPassword;
    private AutoCompleteTextView spinnerIda, spinnerVuelta;
    private MaterialButton btnRegister;
    private MaterialToolbar topAppBar;
    private DriverRegistrationViewModel viewModel;

    private String selectedIdIda = null;
    private String selectedIdVuelta = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        EdgeToEdge.enable(this);
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_registro_conductor);

        viewModel = new ViewModelProvider(this).get(DriverRegistrationViewModel.class);

        initViews();
        setupObservers();
        setupListeners();
        
        // 🔥 Animaciones Premium de Entrada
        com.chopcode.rutago.app.utils.ui.UIAnimationUtils.playCardEntryAnimation(findViewById(R.id.cardPersonalInfo));
        com.chopcode.rutago.app.utils.ui.UIAnimationUtils.playCardEntryAnimation(findViewById(R.id.cardVehicleInfo));
        com.chopcode.rutago.app.utils.ui.UIAnimationUtils.playCardEntryAnimation(findViewById(R.id.cardScheduleInfo));
        com.chopcode.rutago.app.utils.ui.UIAnimationUtils.playCardEntryAnimation(findViewById(R.id.cardSecurityInfo));

        Log.d(TAG, "📡 Cargando horarios desde el ViewModel...");
        viewModel.loadSchedules();
    }

    private void initViews() {
        etName = findViewById(R.id.etName);
        etEmail = findViewById(R.id.etEmail);
        etPhone = findViewById(R.id.etPhone);
        etPlate = findViewById(R.id.etPlate);
        etModel = findViewById(R.id.etModel);
        etYear = findViewById(R.id.etYear);
        etCapacity = findViewById(R.id.etCapacity);
        etPassword = findViewById(R.id.etPassword);
        spinnerIda = findViewById(R.id.spinnerIda);
        spinnerVuelta = findViewById(R.id.spinnerVuelta);
        btnRegister = findViewById(R.id.btnRegisterDriver);
        topAppBar = findViewById(R.id.topAppBar);

        setSupportActionBar(topAppBar);
        if (getSupportActionBar() != null) getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        topAppBar.setNavigationOnClickListener(v -> finish());
    }

    private void setupObservers() {
        viewModel.getSchedulesRoute1().observe(this, schedules -> {
            Log.d(TAG, "🟢 Obtenidos horarios R1: " + (schedules != null ? schedules.size() : 0));
            if (schedules == null || schedules.isEmpty()) return;
            
            List<String> times = new ArrayList<>();
            for (Schedule s : schedules) times.add(s.getTime());
            
            ArrayAdapter<String> adapter = new ArrayAdapter<>(this, android.R.layout.simple_dropdown_item_1line, times);
            spinnerIda.setAdapter(adapter);
            
            // Forzar que el dropdown se vea al hacer clic
            spinnerIda.setOnClickListener(v -> spinnerIda.showDropDown());
            spinnerIda.setOnItemClickListener((parent, view, position, id) -> {
                Schedule s = schedules.get(position);
                if (s.getConductorId() != null && !s.getConductorId().isEmpty()) {
                    Toast.makeText(this, "Horario ocupado. Elige uno (Libre).", Toast.LENGTH_SHORT).show();
                    spinnerIda.setText("", false);
                    selectedIdIda = null;
                } else {
                    selectedIdIda = s.getId();
                    Log.d(TAG, "✅ Seleccionado Ida: " + selectedIdIda);
                }
            });
        });

        viewModel.getSchedulesRoute2().observe(this, schedules -> {
            Log.d(TAG, "🟢 Obtenidos horarios R2: " + (schedules != null ? schedules.size() : 0));
            if (schedules == null || schedules.isEmpty()) return;
            
            List<String> times = new ArrayList<>();
            for (Schedule s : schedules) times.add(s.getTime());
            
            ArrayAdapter<String> adapter = new ArrayAdapter<>(this, android.R.layout.simple_dropdown_item_1line, times);
            spinnerVuelta.setAdapter(adapter);
            
            spinnerVuelta.setOnClickListener(v -> spinnerVuelta.showDropDown());
            spinnerVuelta.setOnItemClickListener((parent, view, position, id) -> {
                Schedule s = schedules.get(position);
                if (s.getConductorId() != null && !s.getConductorId().isEmpty()) {
                    Toast.makeText(this, "Horario ocupado. Elige uno (Libre).", Toast.LENGTH_SHORT).show();
                    spinnerVuelta.setText("", false);
                    selectedIdVuelta = null;
                } else {
                    selectedIdVuelta = s.getId();
                    Log.d(TAG, "✅ Seleccionado Vuelta: " + selectedIdVuelta);
                }
            });
        });

        viewModel.getRegistrationSuccess().observe(this, success -> {
            if (success) {
                Toast.makeText(this, R.string.exito_registro_conductor, Toast.LENGTH_SHORT).show();
                finish();
            }
        });

        viewModel.getRegistrationError().observe(this, error -> {
            if (error != null) Toast.makeText(this, "Error: " + error, Toast.LENGTH_LONG).show();
        });

        viewModel.getIsLoading().observe(this, loading -> {
            btnRegister.setEnabled(!loading);
            btnRegister.setText(loading ? "Procesando..." : getString(R.string.registrar_conductor_btn));
        });
    }

    private void setupListeners() {
        btnRegister.setOnClickListener(v -> {
            String name = etName.getText().toString().trim();
            String email = etEmail.getText().toString().trim();
            String phone = etPhone.getText().toString().trim();
            String plate = etPlate.getText().toString().trim().toUpperCase();
            String model = etModel.getText().toString().trim();
            String year = etYear.getText().toString().trim();
            String capStr = etCapacity.getText().toString().trim();
            String pass = etPassword.getText().toString().trim();

            if (validateFields(name, email, plate, model, year, capStr, pass)) {
                int capacity = Integer.parseInt(capStr);
                viewModel.registerDriver(name, email, phone, pass, plate, model, year, capacity, selectedIdIda, selectedIdVuelta);
            }
        });
    }

    private boolean validateFields(String name, String email, String plate, String model, String year, String cap, String pass) {
        if (name.isEmpty() || email.isEmpty() || plate.isEmpty() || model.isEmpty() || pass.isEmpty() || year.isEmpty() || cap.isEmpty()) {
            Toast.makeText(this, "Por favor completa todos los campos", Toast.LENGTH_SHORT).show();
            return false;
        }
        if (selectedIdIda == null || selectedIdVuelta == null) {
            Toast.makeText(this, "Debes seleccionar ambos horarios (Ida y Vuelta)", Toast.LENGTH_SHORT).show();
            return false;
        }
        if (!android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            Toast.makeText(this, "Correo inválido", Toast.LENGTH_SHORT).show();
            return false;
        }
        return true;
    }
}

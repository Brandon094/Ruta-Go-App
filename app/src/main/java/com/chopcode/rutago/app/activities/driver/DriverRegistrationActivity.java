package com.chopcode.rutago.app.activities.driver;

import android.os.Bundle;
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

    private TextInputEditText etName, etEmail, etPhone, etPlate, etModel, etYear, etCapacity, etPassword;
    private AutoCompleteTextView spinnerIda, spinnerVuelta;
    private MaterialButton btnRegister;
    private MaterialToolbar topAppBar;
    private DriverRegistrationViewModel viewModel;

    private String selectedIdIda = null;
    private String selectedIdVuelta = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_registro_conductor);

        viewModel = new ViewModelProvider(this).get(DriverRegistrationViewModel.class);

        initViews();
        setupObservers();
        setupListeners();

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
            List<String> times = new ArrayList<>();
            for (Schedule s : schedules) times.add(s.getTime());
            ArrayAdapter<String> adapter = new ArrayAdapter<>(this, android.R.layout.simple_dropdown_item_1line, times);
            spinnerIda.setAdapter(adapter);
            spinnerIda.setOnItemClickListener((parent, view, position, id) -> selectedIdIda = schedules.get(position).getId());
        });

        viewModel.getSchedulesRoute2().observe(this, schedules -> {
            List<String> times = new ArrayList<>();
            for (Schedule s : schedules) times.add(s.getTime());
            ArrayAdapter<String> adapter = new ArrayAdapter<>(this, android.R.layout.simple_dropdown_item_1line, times);
            spinnerVuelta.setAdapter(adapter);
            spinnerVuelta.setOnItemClickListener((parent, view, position, id) -> selectedIdVuelta = schedules.get(position).getId());
        });

        viewModel.getRegistrationSuccess().observe(this, success -> {
            if (success) {
                Toast.makeText(this, R.string.exito_registro_conductor, Toast.LENGTH_SHORT).show();
                finish();
            }
        });

        viewModel.getRegistrationError().observe(this, error -> {
            if (error.contains("already in use")) {
                Toast.makeText(this, R.string.error_email_existe, Toast.LENGTH_LONG).show();
            } else {
                Toast.makeText(this, "Error: " + error, Toast.LENGTH_LONG).show();
            }
        });

        viewModel.getIsLoading().observe(this, loading -> {
            btnRegister.setEnabled(!loading);
            btnRegister.setText(loading ? getString(R.string.registering) : getString(R.string.registrar_conductor_btn));
        });
    }

    private void setupListeners() {
        btnRegister.setOnClickListener(v -> {
            if (etName.getText() == null || etEmail.getText() == null || etPhone.getText() == null ||
                etPlate.getText() == null || etModel.getText() == null || etYear.getText() == null ||
                etCapacity.getText() == null || etPassword.getText() == null) return;

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
            Toast.makeText(this, R.string.error_campos_obligatorios, Toast.LENGTH_SHORT).show();
            return false;
        }
        if (selectedIdIda == null || selectedIdVuelta == null) {
            Toast.makeText(this, "Por favor selecciona ambos horarios", Toast.LENGTH_SHORT).show();
            return false;
        }
        if (!android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            Toast.makeText(this, R.string.correo_valido, Toast.LENGTH_SHORT).show();
            return false;
        }
        if (pass.length() < 6) {
            Toast.makeText(this, R.string.error_password_length, Toast.LENGTH_SHORT).show();
            return false;
        }
        return true;
    }
}

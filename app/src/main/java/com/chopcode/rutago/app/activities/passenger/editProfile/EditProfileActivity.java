package com.chopcode.rutago.app.activities.passenger.editProfile;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProvider;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.managers.auths.AuthManager;
import com.chopcode.rutago.app.viewmodels.passenger.EditProfileViewModel;
import com.google.android.material.appbar.MaterialToolbar;

/**
 * 📝 Edit Profile Activity (Passenger)
 * 
 * Permite al pasajero modificar sus datos personales de contacto.
 * Responsabilidades:
 * - Cargar la información actual desde el nodo /usuarios/.
 * - Validar campos de entrada (Nombre, Teléfono).
 * - Procesar la actualización mediante EditProfileViewModel.
 */
public class EditProfileActivity extends AppCompatActivity {

    private static final String TAG = "EditProfileActivity";

    // Views
    private Button btnGuardar, btnCancelar;
    private EditText etNombre, etTelefono, etCorreo;
    private TextView tvNombreActual, tvTelefonoActual, tvCorreoActual;
    private MaterialToolbar topAppBar;
    private ProgressBar progressBar;

    // ViewModel
    private EditProfileViewModel viewModel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.d(TAG, "🚀 onCreate - Starting EditProfileActivity");
        setContentView(R.layout.activity_editar_perfil_pasajero);

        if (!AuthManager.getInstance().isUserLoggedIn()) {
            AuthManager.getInstance().redirectToLogin(this);
            finish();
            return;
        }

        viewModel = new ViewModelProvider(this).get(EditProfileViewModel.class);

        inicializarVistas();
        setupObservers();
        setupListeners();

        viewModel.loadUserProfile();
    }

    private void inicializarVistas() {
        etNombre = findViewById(R.id.etNombre);
        etTelefono = findViewById(R.id.etTelefono);
        etCorreo = findViewById(R.id.etCorreo);
        tvNombreActual = findViewById(R.id.tvNombreActual);
        tvTelefonoActual = findViewById(R.id.tvTelefonoActual);
        tvCorreoActual = findViewById(R.id.tvCorreoActual);
        topAppBar = findViewById(R.id.topAppBar);
        btnGuardar = findViewById(R.id.btnGuardarCambios);
        btnCancelar = findViewById(R.id.btnCancelar);
        progressBar = findViewById(R.id.progressBar);

        // 🔥 Micro-interacciones de Botones
        com.chopcode.rutago.app.utils.ui.UIAnimationUtils.setClickAnimation(btnGuardar);
        com.chopcode.rutago.app.utils.ui.UIAnimationUtils.setClickAnimation(btnCancelar);
    }

    private void setupObservers() {
        viewModel.getUserData().observe(this, user -> {
            if (user != null) {
                tvNombreActual.setText(user.getNombre() != null ? user.getNombre() : getString(R.string.no_disponible));
                tvTelefonoActual.setText(user.getTelefono() != null ? user.getTelefono() : getString(R.string.no_disponible));
                tvCorreoActual.setText(user.getEmail() != null ? user.getEmail() : getString(R.string.no_disponible));
                etCorreo.setText(user.getEmail());
            }
        });

        viewModel.getIsLoading().observe(this, loading -> {
            if (progressBar != null) progressBar.setVisibility(loading ? View.VISIBLE : View.GONE);
            btnGuardar.setEnabled(!loading);
        });

        viewModel.getUpdateSuccess().observe(this, success -> {
            if (success) {
                Toast.makeText(this, getString(R.string.perfil_actualizado), Toast.LENGTH_SHORT).show();
                finish();
            }
        });

        viewModel.getError().observe(this, errorMsg -> {
            if (errorMsg != null) Toast.makeText(this, getString(R.string.error_prefijo, errorMsg), Toast.LENGTH_LONG).show();
        });
    }

    private void setupListeners() {
        if (topAppBar != null) topAppBar.setNavigationOnClickListener(v -> onBackPressed());
        btnGuardar.setOnClickListener(v -> {
            String name = etNombre.getText().toString().trim();
            String phone = etTelefono.getText().toString().trim();
            viewModel.updateProfile(name, phone);
        });
        btnCancelar.setOnClickListener(v -> finish());
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        overridePendingTransition(android.R.anim.fade_in, android.R.anim.fade_out);
    }
}

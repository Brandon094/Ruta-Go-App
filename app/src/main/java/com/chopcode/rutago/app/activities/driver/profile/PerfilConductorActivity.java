package com.chopcode.rutago.app.activities.driver.profile;

import androidx.appcompat.app.AppCompatActivity;
import android.content.Intent;
import android.os.Bundle;
import android.net.Uri;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.lifecycle.ViewModelProvider;
import com.bumptech.glide.Glide;
import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.activities.driver.history.HistorialConductorActivity;
import com.chopcode.rutago.app.activities.driver.InicioConductorActivity;
import com.chopcode.rutago.app.activities.driver.editProfile.EditarPerfilConductorActivity;
import com.chopcode.rutago.app.config.MyApp;
import com.chopcode.rutago.app.managers.auths.AuthManager;
import com.chopcode.rutago.app.models.Vehiculo;
import com.chopcode.rutago.app.fragments.BottomNavFragment;
import com.chopcode.rutago.app.services.user.UserService;
import com.chopcode.rutago.app.services.storage.StorageService;
import com.chopcode.rutago.app.services.reservations.VehiculoService;
import com.chopcode.rutago.app.utils.ui.ImageUtils;
import com.chopcode.rutago.app.viewmodels.driver.PerfilViewModel;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PerfilConductorActivity extends AppCompatActivity {
    private TextView tvConductor, tvEmail, tvTelefono, tvPlaca, tvModVehiculo, tvCapacidad, tvAnioVehiculo;
    private ImageView ivProfilePicture;
    private View cardInicio; 
    private com.google.android.material.card.MaterialCardView btnChangePhoto;
    private com.google.android.material.button.MaterialButton btnEditarPerfil, btnDeleteAccount;
    private UserService userService;
    private StorageService storageService;
    private VehiculoService vehiculoService;
    private AuthManager authManager;
    private PerfilViewModel perfilViewModel;
    private static final String TAG = "PerfilConductor";

    // Lanzador para seleccionar imagen de la galería
    private final ActivityResultLauncher<String> imagePickerLauncher = registerForActivityResult(
            new ActivityResultContracts.GetContent(),
            uri -> {
                if (uri != null) {
                    subirFotoDePerfil(uri);
                }
            }
    );

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_perfil_conductor);

        // Inicializar servicios
        userService = new UserService();
        storageService = new StorageService();
        vehiculoService = new VehiculoService();
        authManager = AuthManager.getInstance();
        perfilViewModel = new ViewModelProvider(this).get(PerfilViewModel.class);

        // Verificar autenticación
        if (!authManager.isUserLoggedIn()) {
            authManager.redirectToLogin(this);
            finish();
            return;
        }

        inicializarVistas();
        setupObservers();
        cargarDatos();
        setupBottomNavigation();
    }

    private void setupObservers() {
        // Observar datos del conductor (la "fuente de verdad")
        perfilViewModel.getConductorLiveData().observe(this, conductor -> {
            if (conductor != null) {
                actualizarUI(conductor);
            }
        });

        // Observar errores usando la base del ViewModel
        perfilViewModel.getErrorLiveData().observe(this, error -> {
            if (error != null && !error.isEmpty()) {
                runOnUiThread(() -> Toast.makeText(PerfilConductorActivity.this, error, Toast.LENGTH_SHORT).show());
            }
        });
    }

    private void cargarDatos() {
        String userId = authManager.getUserId();
        if (userId != null) {
            perfilViewModel.cargarDatosCompletos(userId);
        }
    }

    private void actualizarUI(com.chopcode.rutago.app.models.Conductor conductor) {
        tvConductor.setText(conductor.getNombre() != null ? conductor.getNombre() : "Conductor");
        tvEmail.setText(conductor.getEmail() != null ? conductor.getEmail() : "No disponible");
        tvTelefono.setText(conductor.getTelefono() != null ? conductor.getTelefono() : "No disponible");
        tvPlaca.setText(conductor.getPlacaVehiculo() != null ? conductor.getPlacaVehiculo() : "No asignado");

        // ✅ CARGAR FOTO CENTRALIZADA USANDO EL VIEWMODEL
        ImageUtils.loadProfilePhoto(this, conductor.getPhotoUrl(), ivProfilePicture);

        // Cargar detalles del vehículo si tiene placa
        if (conductor.getPlacaVehiculo() != null && !conductor.getPlacaVehiculo().isEmpty()) {
            cargarInformacionVehiculo(conductor.getPlacaVehiculo());
        } else {
            mostrarVehiculoNoDisponible();
        }
    }

    private void setupBottomNavigation() {
        getSupportFragmentManager().beginTransaction()
                .replace(R.id.bottom_nav_container, BottomNavFragment.newInstance(true))
                .commit();
    }

    private void inicializarVistas() {
        // ImageView
        ivProfilePicture = findViewById(R.id.ivProfilePicture);

        // Botón cambio de foto (icono de edición)
        btnChangePhoto = findViewById(R.id.btnChangePhoto);
        if (btnChangePhoto != null) {
            btnChangePhoto.setOnClickListener(v -> {
                Log.d(TAG, "📸 Clic en botón de edición de foto - Abriendo galería");
                imagePickerLauncher.launch("image/*");
            });
        }

        // TextViews de información personal
        tvConductor = findViewById(R.id.tvNombreUsuario);
        tvEmail = findViewById(R.id.tvEmail);
        tvTelefono = findViewById(R.id.tvPhone);

        // TextViews de información del vehículo
        tvPlaca = findViewById(R.id.tvPlacaVehiculo);
        tvModVehiculo = findViewById(R.id.tvModeloVehiculo);
        tvCapacidad = findViewById(R.id.tvCapacidadVehiculo);
        tvAnioVehiculo = findViewById(R.id.tvAnioVehiculo);

        // Botones y acciones
        cardInicio = findViewById(R.id.cardInicio);
        btnEditarPerfil = findViewById(R.id.btnEditarPerfil);

        if (cardInicio != null) cardInicio.setOnClickListener(view -> irInicioConductor());
        if (btnEditarPerfil != null) btnEditarPerfil.setOnClickListener(v -> irEditarPerfil());

        // Botón Borrar Cuenta
        btnDeleteAccount = findViewById(R.id.btnDeleteAccount);
        if (btnDeleteAccount != null) {
            btnDeleteAccount.setOnClickListener(v -> mostrarDialogoConfirmacionBorrado());
        }

        // Configurar navegación
        setupBottomNavigation();
    }

    private void mostrarDialogoConfirmacionBorrado() {
        View dialogView = LayoutInflater.from(this).inflate(R.layout.dialog_delete_account, null);
        
        androidx.appcompat.app.AlertDialog dialog = new androidx.appcompat.app.AlertDialog.Builder(this, R.style.AppDialogTheme)
                .setView(dialogView)
                .setCancelable(true)
                .create();

        com.google.android.material.button.MaterialButton btnConfirm = dialogView.findViewById(R.id.btnConfirmDelete);
        com.google.android.material.button.MaterialButton btnCancel = dialogView.findViewById(R.id.btnCancelDelete);

        if (btnConfirm != null) {
            btnConfirm.setOnClickListener(v -> {
                dialog.dismiss();
                procesarSolicitudBorrado();
            });
        }

        if (btnCancel != null) {
            btnCancel.setOnClickListener(v -> dialog.dismiss());
        }

        if (dialog.getWindow() != null) {
            dialog.getWindow().setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
        }

        dialog.show();
    }

    private void procesarSolicitudBorrado() {
        String userId = authManager.getUserId();
        if (userId == null) return;

        userService.requestAccountDeletion(userId, new UserService.UserUpdateCallback() {
            @Override
            public void onSuccess() {
                runOnUiThread(() -> {
                    Toast.makeText(PerfilConductorActivity.this, 
                        "Solicitud enviada. Tu cuenta será revisada para su eliminación.", 
                        Toast.LENGTH_LONG).show();
                    
                    authManager.signOut(PerfilConductorActivity.this);
                    finish();
                });
            }

            @Override
            public void onError(String error) {
                runOnUiThread(() -> {
                    Toast.makeText(PerfilConductorActivity.this, 
                        "Error al enviar la solicitud: " + error, 
                        Toast.LENGTH_SHORT).show();
                });
            }
        });
    }

    private void cargarInformacionVehiculo(String placa) {
        vehiculoService.obtenerVehiculoPorPlaca(placa, new VehiculoService.VehiculoCallback() {
            @Override
            public void onVehiculoCargado(Vehiculo vehiculo) {
                runOnUiThread(() -> {
                    if (vehiculo != null) {
                        tvPlaca.setText(vehiculo.getPlaca() != null ? vehiculo.getPlaca() : "No disponible");
                        tvModVehiculo.setText(vehiculo.getModelo() != null ? vehiculo.getModelo() : "No disponible");
                        tvCapacidad.setText(String.valueOf(vehiculo.getCapacidad()));

                        if (vehiculo.getAno() != null && !vehiculo.getAno().isEmpty()) {
                            tvAnioVehiculo.setText(vehiculo.getAno());
                        } else {
                            tvAnioVehiculo.setText("N/A");
                        }
                    } else {
                        mostrarVehiculoBasico(placa);
                    }
                });
            }

            @Override
            public void onError(String error) {
                runOnUiThread(() -> {
                    Log.e(TAG, "Error cargando vehículo: " + error);
                    mostrarVehiculoBasico(placa);
                });
            }
        });
    }

    private void mostrarVehiculoBasico(String placa) {
        tvPlaca.setText(placa);
        tvModVehiculo.setText("Información no disponible");
        tvCapacidad.setText("N/A");
        tvAnioVehiculo.setText("N/A");
    }

    private void mostrarVehiculoNoDisponible() {
        tvPlaca.setText("No asignado");
        tvCapacidad.setText("N/A");
        tvModVehiculo.setText("No asignado");
        tvAnioVehiculo.setText("N/A");
    }

    public void irEditarPerfil(){
        Intent intent = new Intent(PerfilConductorActivity.this, EditarPerfilConductorActivity.class);
        startActivity(intent);
    }

    public void irInicioConductor(){
        Intent intent = new Intent(PerfilConductorActivity.this, InicioConductorActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        startActivity(intent);
        finish();
    }

    // --- MÉTODOS ELIMINADOS POR LA REFACTORIZACIÓN DEL VIEWMODEL ---
    // (cargarInfoConductorCompleta, cargarDatosUsuarioYCompletar, actualizarUICompleta, etc.)

    private void subirFotoDePerfil(Uri uri) {
        String userId = authManager.getUserId();
        if (userId == null) return;

        Log.d(TAG, "📤 Subiendo nueva foto de perfil conductor...");
        Toast.makeText(this, "Subiendo foto...", Toast.LENGTH_SHORT).show();

        storageService.uploadProfilePicture(userId, uri, new StorageService.UploadCallback() {
            @Override
            public void onSuccess(String downloadUrl) {
                // ✅ Simplificado: El servicio ya se encarga de actualizar ambos nodos (conductores y usuarios)
                userService.updateProfilePicture(userId, downloadUrl, "conductores", new UserService.UserUpdateCallback() {
                    @Override
                    public void onSuccess() {
                        runOnUiThread(() -> {
                            Log.d(TAG, "✅ Foto actualizada exitosamente");
                            ImageUtils.loadProfilePhoto(PerfilConductorActivity.this, downloadUrl, ivProfilePicture);
                            Toast.makeText(PerfilConductorActivity.this, "Foto de perfil actualizada", Toast.LENGTH_SHORT).show();
                        });
                    }

                    @Override
                    public void onError(String error) {
                        Log.e(TAG, "❌ Error actualizando enlace: " + error);
                        runOnUiThread(() -> Toast.makeText(PerfilConductorActivity.this, "Error: " + error, Toast.LENGTH_SHORT).show());
                    }
                });
            }

            @Override
            public void onError(String error) {
                Log.e(TAG, "❌ Error en Storage: " + error);
                runOnUiThread(() -> Toast.makeText(PerfilConductorActivity.this, "Error al subir imagen: " + error, Toast.LENGTH_SHORT).show());
            }

            @Override
            public void onProgress(double progress) { }
        });
    }

    @Override
    protected void onResume() {
        super.onResume();
        cargarDatos();
    }
}

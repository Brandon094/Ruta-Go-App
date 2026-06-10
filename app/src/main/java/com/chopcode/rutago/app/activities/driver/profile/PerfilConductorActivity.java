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
import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.activities.driver.InicioConductorActivity;
import com.chopcode.rutago.app.activities.driver.editProfile.EditarPerfilConductorActivity;
import com.chopcode.rutago.app.managers.auths.AuthManager;
import com.chopcode.rutago.app.models.Vehiculo;
import com.chopcode.rutago.app.fragments.BottomNavFragment;
import com.chopcode.rutago.app.services.user.UserService;
import com.chopcode.rutago.app.services.storage.StorageService;
import com.chopcode.rutago.app.services.reservations.VehiculoService;
import com.chopcode.rutago.app.utils.ui.ImageUtils;
import com.chopcode.rutago.app.viewmodels.driver.PerfilViewModel;
import com.facebook.shimmer.ShimmerFrameLayout;

public class PerfilConductorActivity extends AppCompatActivity {
    private TextView tvConductor, tvEmail, tvTelefono, tvPlaca, tvModVehiculo, tvCapacidad, tvAnioVehiculo, tvPlacaVehiculoHeader;
    private ImageView ivProfilePicture;
    private View headerContent, layoutInfoReal;
    private ShimmerFrameLayout shimmerHeader, shimmerCard;
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
        // Observar datos del conductor
        perfilViewModel.getConductorLiveData().observe(this, conductor -> {
            if (conductor != null) {
                actualizarUI(conductor);
            }
        });

        // Observar errores
        perfilViewModel.getErrorLiveData().observe(this, error -> {
            if (error != null && !error.isEmpty()) {
                runOnUiThread(() -> Toast.makeText(PerfilConductorActivity.this, error, Toast.LENGTH_SHORT).show());
                detenerShimmer();
            }
        });

        // Observar estado de carga
        perfilViewModel.getLoadingLiveData().observe(this, isLoading -> {
            if (isLoading != null && !isLoading) {
                detenerShimmer();
            }
        });
    }

    private void detenerShimmer() {
        if (shimmerHeader != null) {
            shimmerHeader.stopShimmer();
            shimmerHeader.setVisibility(View.GONE);
        }
        if (shimmerCard != null) {
            shimmerCard.stopShimmer();
            shimmerCard.setVisibility(View.GONE);
        }
        if (headerContent != null) headerContent.setVisibility(View.VISIBLE);
        if (layoutInfoReal != null) layoutInfoReal.setVisibility(View.VISIBLE);
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
        
        String placa = conductor.getPlacaVehiculo() != null ? conductor.getPlacaVehiculo() : "No asignado";
        tvPlaca.setText(placa);
        tvPlacaVehiculoHeader.setText("🚗 PLACA: " + placa);

        // Cargar foto
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
        // Shimmers
        shimmerHeader = findViewById(R.id.shimmer_header);
        shimmerCard = findViewById(R.id.shimmer_card);
        headerContent = findViewById(R.id.headerContent);
        layoutInfoReal = findViewById(R.id.layoutInfoReal);

        // Image & Edit Button
        ivProfilePicture = findViewById(R.id.ivProfilePicture);
        btnChangePhoto = findViewById(R.id.btnChangePhoto);
        if (btnChangePhoto != null) {
            btnChangePhoto.setOnClickListener(v -> imagePickerLauncher.launch("image/*"));
        }

        // Info TextViews
        tvConductor = findViewById(R.id.tvNombreUsuario);
        tvEmail = findViewById(R.id.tvEmail);
        tvTelefono = findViewById(R.id.tvPhone);
        tvPlacaVehiculoHeader = findViewById(R.id.tvPlacaVehiculoHeader);

        // Vehicle Info Grid
        tvPlaca = findViewById(R.id.tvPlacaVehiculo);
        tvModVehiculo = findViewById(R.id.tvModeloVehiculo);
        tvCapacidad = findViewById(R.id.tvCapacidadVehiculo);
        tvAnioVehiculo = findViewById(R.id.tvAnioVehiculo);

        // Action Buttons
        btnEditarPerfil = findViewById(R.id.btnEditarPerfil);
        if (btnEditarPerfil != null) btnEditarPerfil.setOnClickListener(v -> irEditarPerfil());

        btnDeleteAccount = findViewById(R.id.btnDeleteAccount);
        if (btnDeleteAccount != null) {
            btnDeleteAccount.setOnClickListener(v -> mostrarDialogoConfirmacionBorrado());
        }
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
                    Toast.makeText(PerfilConductorActivity.this, "Solicitud enviada.", Toast.LENGTH_LONG).show();
                    authManager.signOut(PerfilConductorActivity.this);
                    finish();
                });
            }

            @Override
            public void onError(String error) {
                runOnUiThread(() -> Toast.makeText(PerfilConductorActivity.this, "Error: " + error, Toast.LENGTH_SHORT).show());
            }
        });
    }

    private void cargarInformacionVehiculo(String placa) {
        vehiculoService.obtenerVehiculoPorPlaca(placa, new VehiculoService.VehiculoCallback() {
            @Override
            public void onVehiculoCargado(Vehiculo vehiculo) {
                runOnUiThread(() -> {
                    if (vehiculo != null) {
                        tvModVehiculo.setText(vehiculo.getModelo() != null ? vehiculo.getModelo() : "N/A");
                        tvCapacidad.setText(String.valueOf(vehiculo.getCapacidad()));
                        tvAnioVehiculo.setText(vehiculo.getAno() != null ? vehiculo.getAno() : "N/A");
                    }
                });
            }

            @Override
            public void onError(String error) {
                Log.e(TAG, "Error cargando vehículo: " + error);
            }
        });
    }

    private void mostrarVehiculoNoDisponible() {
        tvPlaca.setText("No asignado");
        tvCapacidad.setText("N/A");
        tvModVehiculo.setText("No asignado");
        tvAnioVehiculo.setText("N/A");
    }

    public void irEditarPerfil(){
        Intent intent = new Intent(this, EditarPerfilConductorActivity.class);
        startActivity(intent);
    }

    private void subirFotoDePerfil(Uri uri) {
        String userId = authManager.getUserId();
        if (userId == null) return;

        Toast.makeText(this, "Subiendo foto...", Toast.LENGTH_SHORT).show();

        storageService.uploadProfilePicture(userId, uri, new StorageService.UploadCallback() {
            @Override
            public void onSuccess(String downloadUrl) {
                userService.updateProfilePicture(userId, downloadUrl, "conductores", new UserService.UserUpdateCallback() {
                    @Override
                    public void onSuccess() {
                        runOnUiThread(() -> {
                            ImageUtils.loadProfilePhoto(PerfilConductorActivity.this, downloadUrl, ivProfilePicture);
                            Toast.makeText(PerfilConductorActivity.this, "Foto actualizada", Toast.LENGTH_SHORT).show();
                        });
                    }

                    @Override
                    public void onError(String error) {
                        runOnUiThread(() -> Toast.makeText(PerfilConductorActivity.this, "Error: " + error, Toast.LENGTH_SHORT).show());
                    }
                });
            }

            @Override
            public void onError(String error) {
                runOnUiThread(() -> Toast.makeText(PerfilConductorActivity.this, "Error: " + error, Toast.LENGTH_SHORT).show());
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

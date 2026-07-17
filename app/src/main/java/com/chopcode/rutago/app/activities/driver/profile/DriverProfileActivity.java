package com.chopcode.rutago.app.activities.driver.profile;

import androidx.appcompat.app.AppCompatActivity;
import android.content.Intent;
import android.os.Bundle;
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
import com.chopcode.rutago.app.activities.driver.editProfile.EditDriverProfileActivity;
import com.chopcode.rutago.app.managers.core.auth.AuthManager;
import com.chopcode.rutago.app.fragments.BottomNavFragment;
import com.chopcode.rutago.app.utils.ui.ImageUtils;
import com.chopcode.rutago.app.utils.ui.WindowUtils;
import com.chopcode.rutago.app.viewmodels.driver.DriverProfileViewModel;
import com.facebook.shimmer.ShimmerFrameLayout;

/**
 * 👤 Driver Profile Activity
 * 
 * Punto de gestión de identidad para el conductor.
 * Responsabilidades:
 * - Visualizar la información personal y técnica del vehículo asignado.
 * - Permitir la actualización de la foto de perfil mediante Firebase Storage.
 * - Proveer acceso directo a la edición de datos del vehículo.
 * - Gestionar la navegación de la sección de perfil mediante el Bottom Navigation.
 */
public class DriverProfileActivity extends AppCompatActivity {
    
    private static final String TAG = "DriverProfileActivity";

    // Views
    private TextView tvConductor, tvEmail, tvTelefono, tvDriverStatus;
    private ImageView ivProfilePicture;
    private View headerContent, layoutInfoReal;
    private ShimmerFrameLayout shimmerHeader, shimmerCard;
    private TextView tvPlaca, tvModVehiculo, tvCapacidad, tvAnioVehiculo;
    private com.google.android.material.card.MaterialCardView btnChangePhoto;
    private com.google.android.material.button.MaterialButton btnEditarPerfil, btnDeleteAccount, btnCancelDeletion;
    
    // ViewModel and Managers
    private DriverProfileViewModel viewModel;
    private AuthManager authManager;
    private com.chopcode.rutago.app.managers.ui.tutorials.TutorialManager tutorialManager;

    private final ActivityResultLauncher<String> imagePickerLauncher = registerForActivityResult(
            new ActivityResultContracts.GetContent(),
            uri -> { if (uri != null) viewModel.subirFotoPerfil(uri); }
    );

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_perfil_conductor);

        authManager = AuthManager.getInstance();
        if (!authManager.isUserLoggedIn()) {
            authManager.redirectToLogin(this);
            finish();
            return;
        }

        viewModel = new ViewModelProvider(this).get(DriverProfileViewModel.class);
        tutorialManager = new com.chopcode.rutago.app.managers.ui.tutorials.TutorialManager(this);

        inicializarVistas();
        setupInsets();
        setupObservers();
        setupBottomNavigation();

        cargarDatos();
        tutorialManager.showDriverProfileGuide();
    }

    private void inicializarVistas() {
        shimmerHeader = findViewById(R.id.shimmer_header);
        shimmerCard = findViewById(R.id.shimmer_card);
        headerContent = findViewById(R.id.headerContent);
        layoutInfoReal = findViewById(R.id.layoutInfoReal);
        ivProfilePicture = findViewById(R.id.ivProfilePicture);
        btnChangePhoto = findViewById(R.id.btnChangePhoto);
        if (btnChangePhoto != null) btnChangePhoto.setOnClickListener(v -> imagePickerLauncher.launch("image/*"));
        tvConductor = findViewById(R.id.tvNombreUser);
        tvEmail = findViewById(R.id.tvEmail);
        tvTelefono = findViewById(R.id.tvPhone);
        tvDriverStatus = findViewById(R.id.tvDriverStatus);
        tvPlaca = findViewById(R.id.tvPlacaVehiculo);
        tvModVehiculo = findViewById(R.id.tvModeloVehiculo);
        tvCapacidad = findViewById(R.id.tvCapacidadVehiculo);
        tvAnioVehiculo = findViewById(R.id.tvAnioVehiculo);
        btnEditarPerfil = findViewById(R.id.btnEditarPerfil);
        if (btnEditarPerfil != null) btnEditarPerfil.setOnClickListener(v -> irEditarPerfil());
        btnDeleteAccount = findViewById(R.id.btnDeleteAccount);
        if (btnDeleteAccount != null) btnDeleteAccount.setOnClickListener(v -> mostrarDialogoConfirmacionBorrado());
        btnCancelDeletion = findViewById(R.id.btnCancelDeletion);
        if (btnCancelDeletion != null) btnCancelDeletion.setOnClickListener(v -> cancelarSolicitudBorrado());
    }

    private void cancelarSolicitudBorrado() {
        viewModel.cancelarBorradoCuenta(new com.chopcode.rutago.app.services.user.UserService.UserUpdateCallback() {
            @Override
            public void onSuccess() {
                Toast.makeText(DriverProfileActivity.this, R.string.borrado_cancelado_exito, Toast.LENGTH_SHORT).show();
            }
            @Override public void onError(String error) { Toast.makeText(DriverProfileActivity.this, error, Toast.LENGTH_SHORT).show(); }
        });
    }

    private void setupObservers() {
        viewModel.getConductorLiveData().observe(this, driver -> {
            if (driver != null) {
                tvConductor.setText(driver.getNombre());
                tvEmail.setText(driver.getEmail());
                tvTelefono.setText(driver.getTelefono());
                updateStatusBadge(driver.getStatus());
                ImageUtils.loadProfilePhoto(this, driver.getPhotoUrl(), ivProfilePicture);

                // 🛡️ GESTIÓN DE BOTONES DE BORRADO
                if (driver.isSolicitudBorrado()) {
                    btnCancelDeletion.setVisibility(View.VISIBLE);
                    btnDeleteAccount.setVisibility(View.GONE);
                } else {
                    btnCancelDeletion.setVisibility(View.GONE);
                    btnDeleteAccount.setVisibility(View.VISIBLE);
                }
            }
        });

        viewModel.getVehiculoLiveData().observe(this, vehicle -> {
            if (vehicle != null) {
                tvPlaca.setText(vehicle.getPlate());
                tvModVehiculo.setText(vehicle.getModel());
                tvCapacidad.setText(String.valueOf(vehicle.getCapacity()));
                tvAnioVehiculo.setText(String.valueOf(vehicle.getYear()));
            }
        });

        viewModel.getLoadingLiveData().observe(this, loading -> {
            if (loading != null && !loading) detenerShimmer();
        });

        viewModel.getErrorLiveData().observe(this, error -> {
            if (error != null) Toast.makeText(this, error, Toast.LENGTH_SHORT).show();
        });

        viewModel.getPhotoUploadStatus().observe(this, status -> {
            if (status != null) Toast.makeText(this, status, Toast.LENGTH_SHORT).show();
        });
    }

    private void updateStatusBadge(String status) {
        if (tvDriverStatus == null) return;
        
        if (status == null) status = "active";
        
        switch (status.toLowerCase()) {
            case "active":
                tvDriverStatus.setText(R.string.status_conductor_activo);
                tvDriverStatus.setBackgroundResource(R.drawable.bg_badge_active);
                tvDriverStatus.setTextColor(getColor(R.color.status_confirmed));
                break;
            case "inactive":
                tvDriverStatus.setText(R.string.status_conductor_descanso);
                tvDriverStatus.setBackgroundResource(R.drawable.bg_badge_inactive);
                tvDriverStatus.setTextColor(getColor(R.color.status_inactive));
                break;
            default:
                tvDriverStatus.setText(R.string.status_conductor_activo);
                tvDriverStatus.setBackgroundResource(R.drawable.bg_badge_active);
                tvDriverStatus.setTextColor(getColor(R.color.status_confirmed));
                break;
        }
    }

    private void detenerShimmer() {
        if (shimmerHeader != null) { shimmerHeader.stopShimmer(); shimmerHeader.setVisibility(View.GONE); }
        if (shimmerCard != null) { shimmerCard.stopShimmer(); shimmerCard.setVisibility(View.GONE); }
        headerContent.setVisibility(View.VISIBLE);
        layoutInfoReal.setVisibility(View.VISIBLE);
    }

    private void cargarDatos() {
        String userId = authManager.getUserId();
        if (userId != null) viewModel.cargarDatosCompletos(userId);
    }

    private void irEditarPerfil() {
        startActivity(new Intent(this, EditDriverProfileActivity.class));
    }

    private void mostrarDialogoConfirmacionBorrado() {
        View dialogView = LayoutInflater.from(this).inflate(R.layout.dialog_delete_account, null);
        androidx.appcompat.app.AlertDialog dialog = new androidx.appcompat.app.AlertDialog.Builder(this, R.style.AppDialogTheme)
                .setView(dialogView).setCancelable(true).create();
        dialogView.findViewById(R.id.btnConfirmDelete).setOnClickListener(v -> { 
            dialog.dismiss(); 
            viewModel.solicitarBorradoCuenta(new com.chopcode.rutago.app.services.user.UserService.UserUpdateCallback() {
                @Override
                public void onSuccess() {
                    Toast.makeText(DriverProfileActivity.this, R.string.solicitud_enviada_revision, Toast.LENGTH_LONG).show();
                    authManager.signOut(DriverProfileActivity.this);
                    finish();
                }
                @Override public void onError(String error) { Toast.makeText(DriverProfileActivity.this, error, Toast.LENGTH_SHORT).show(); }
            });
        });
        dialogView.findViewById(R.id.btnCancelDelete).setOnClickListener(v -> dialog.dismiss());
        if (dialog.getWindow() != null) dialog.getWindow().setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
        dialog.show();
    }

    private void setupBottomNavigation() {
        getSupportFragmentManager().beginTransaction()
                .replace(R.id.bottom_nav_container, BottomNavFragment.newInstance(true)).commit();
    }

    /**
     * Gestiona los insets del sistema para evitar superposiciones con las barras de estado y navegación.
     */
    private void setupInsets() {
        WindowUtils.applyTopInsetPadding(findViewById(R.id.headerContent));
        WindowUtils.applyBottomInsetMargin(findViewById(R.id.bottom_nav_container));
    }

    @Override protected void onResume() { super.onResume(); cargarDatos(); }
}

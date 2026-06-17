package com.chopcode.rutago.app.activities.passenger.profile;

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
import com.chopcode.rutago.app.managers.auths.AuthManager;
import com.chopcode.rutago.app.fragments.BottomNavFragment;
import com.chopcode.rutago.app.utils.ui.FormatUtils;
import com.chopcode.rutago.app.utils.ui.ImageUtils;
import com.chopcode.rutago.app.viewmodels.passenger.UserProfileViewModel;
import com.facebook.shimmer.ShimmerFrameLayout;
import com.google.android.material.card.MaterialCardView;

import java.util.Map;

/**
 * 👤 User Profile Activity (Passenger)
 * 
 * Punto central de gestión de cuenta para el pasajero.
 * Responsabilidades:
 * - Visualizar datos personales y foto de perfil.
 * - Mostrar el panel Premium con estadísticas calculadas (Gasto total, ruta favorita).
 * - Proporcionar accesos a la edición de perfil y solicitud de eliminación de cuenta.
 * - Gestionar la subida de foto de perfil a Firebase Storage.
 */
public class UserProfileActivity extends AppCompatActivity {

    private static final String TAG = "UserProfileActivity";

    // Views
    private TextView tvNombre, tvCorreo, tvTelefono;
    private TextView tvTotalGastadoPremium, tvPuntosLealtad, tvRutaFavorita;
    private ImageView ivProfilePicture;
    private MaterialCardView cardPremiumStats, cardPerfil, btnChangePhoto;
    private View headerContent;
    private ShimmerFrameLayout shimmerHeader, shimmerCard, shimmerPremium;
    private com.google.android.material.button.MaterialButton btnEditarPerfil, btnDeleteAccount;

    // ViewModel and Managers
    private UserProfileViewModel viewModel;
    private AuthManager authManager;

    private final ActivityResultLauncher<String> imagePickerLauncher = registerForActivityResult(
            new ActivityResultContracts.GetContent(),
            uri -> { if (uri != null) viewModel.uploadProfilePicture(uri); }
    );

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.d(TAG, "🚀 onCreate - Starting UserProfileActivity");
        setContentView(R.layout.activity_perfil_pasajero);

        authManager = AuthManager.getInstance();
        if (!authManager.isUserLoggedIn()) {
            authManager.redirectToLogin(this);
            finish();
            return;
        }

        viewModel = new ViewModelProvider(this).get(UserProfileViewModel.class);

        inicializarVistas();
        setupObservers();
        setupBottomNavigation();

        viewModel.loadProfile();
    }

    private void inicializarVistas() {
        shimmerHeader = findViewById(R.id.shimmer_header);
        shimmerCard = findViewById(R.id.shimmer_card);
        shimmerPremium = findViewById(R.id.shimmer_premium);
        headerContent = findViewById(R.id.headerContent);
        cardPerfil = findViewById(R.id.cardPerfil);
        ivProfilePicture = findViewById(R.id.ivProfilePicture);
        btnChangePhoto = findViewById(R.id.btnChangePhoto);
        tvNombre = findViewById(R.id.tvNombreUser);
        tvCorreo = findViewById(R.id.tvEmail);
        tvTelefono = findViewById(R.id.tvPhone);
        cardPremiumStats = findViewById(R.id.cardPremiumStats);
        tvTotalGastadoPremium = findViewById(R.id.tvTotalGastadoPremium);
        tvPuntosLealtad = findViewById(R.id.tvPuntosLealtad);
        tvRutaFavorita = findViewById(R.id.tvRutaFavorita);
        btnEditarPerfil = findViewById(R.id.btnEditarPerfil);
        btnDeleteAccount = findViewById(R.id.btnDeleteAccount);

        if (btnChangePhoto != null) btnChangePhoto.setOnClickListener(v -> imagePickerLauncher.launch("image/*"));
        if (btnEditarPerfil != null) btnEditarPerfil.setOnClickListener(v -> irAEditarPerfil());
        if (btnDeleteAccount != null) btnDeleteAccount.setOnClickListener(v -> mostrarDialogoConfirmacionBorrado());
    }

    private void setupObservers() {
        viewModel.getUserData().observe(this, user -> {
            if (user != null) {
                if (shimmerHeader != null) { shimmerHeader.stopShimmer(); shimmerHeader.setVisibility(View.GONE); }
                if (shimmerCard != null) { shimmerCard.stopShimmer(); shimmerCard.setVisibility(View.GONE); }
                headerContent.setVisibility(View.VISIBLE);
                cardPerfil.setVisibility(View.VISIBLE);

                tvNombre.setText(user.getNombre() != null ? user.getNombre() : getString(R.string.pasajero));
                tvCorreo.setText(user.getEmail() != null ? user.getEmail() : getString(R.string.no_disponible));
                tvTelefono.setText(user.getTelefono() != null ? user.getTelefono() : getString(R.string.no_disponible));
                ImageUtils.loadProfilePhoto(this, user.getPhotoUrl(), ivProfilePicture);
            }
        });

        viewModel.getPremiumStats().observe(this, stats -> {
            if (stats != null) {
                if (shimmerPremium != null) { shimmerPremium.stopShimmer(); shimmerPremium.setVisibility(View.GONE); }
                cardPremiumStats.setVisibility(View.VISIBLE);
                Double gastado = (Double) stats.get("totalGastado");
                tvTotalGastadoPremium.setText(FormatUtils.formatearPrecio(gastado != null ? gastado : 0.0));
                tvPuntosLealtad.setText(getString(R.string.puntos_format, String.valueOf(stats.get("puntosLealtad"))));
                tvRutaFavorita.setText(getString(R.string.ruta_favorita_label, (String)stats.get("rutaMasFrecuente")));
            }
        });

        viewModel.getError().observe(this, errorMsg -> { if (errorMsg != null) Toast.makeText(this, getString(R.string.error_prefijo, errorMsg), Toast.LENGTH_SHORT).show(); });
        viewModel.getUploadStatus().observe(this, status -> { if (status != null) Toast.makeText(this, status, Toast.LENGTH_SHORT).show(); });
        viewModel.getAccountDeletionSuccess().observe(this, success -> {
            if (success) {
                Toast.makeText(this, getString(R.string.solicitud_enviada_revision), Toast.LENGTH_LONG).show();
                authManager.signOut(this);
                finish();
            }
        });
    }

    private void mostrarDialogoConfirmacionBorrado() {
        View dialogView = LayoutInflater.from(this).inflate(R.layout.dialog_delete_account, null);
        androidx.appcompat.app.AlertDialog dialog = new androidx.appcompat.app.AlertDialog.Builder(this, R.style.AppDialogTheme)
                .setView(dialogView).setCancelable(true).create();
        dialogView.findViewById(R.id.btnConfirmDelete).setOnClickListener(v -> { dialog.dismiss(); viewModel.requestAccountDeletion(); });
        dialogView.findViewById(R.id.btnCancelDelete).setOnClickListener(v -> dialog.dismiss());
        if (dialog.getWindow() != null) dialog.getWindow().setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
        dialog.show();
    }

    private void irAEditarPerfil() {
        startActivity(new Intent(this, com.chopcode.rutago.app.activities.passenger.editProfile.EditProfileActivity.class));
    }

    private void setupBottomNavigation() {
        getSupportFragmentManager().beginTransaction()
                .replace(R.id.bottom_nav_container, BottomNavFragment.newInstance(false)).commit();
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        overridePendingTransition(R.anim.slide_in_left, R.anim.slide_out_right);
    }

    @Override protected void onResume() { super.onResume(); if (authManager.isUserLoggedIn()) viewModel.loadProfile(); }
}

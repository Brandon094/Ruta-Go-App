package com.chopcode.rutago.app.activities.passenger.profile;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.net.Uri;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.config.MyApp;
import com.chopcode.rutago.app.managers.auths.AuthManager;
import com.chopcode.rutago.app.fragments.BottomNavFragment;
import com.chopcode.rutago.app.models.Usuario;
import com.chopcode.rutago.app.services.user.UserService;
import com.chopcode.rutago.app.services.storage.StorageService;
import com.chopcode.rutago.app.services.reservations.passenger.PassengerReservationService;
import com.chopcode.rutago.app.utils.ui.ImageUtils;
import com.facebook.shimmer.ShimmerFrameLayout;
import com.google.android.material.card.MaterialCardView;

import java.util.HashMap;
import java.util.Map;

public class PerfilUsuarioActivity extends AppCompatActivity {
    private TextView tvNombre, tvCorreo, tvTelefono;
    private TextView tvTotalGastadoPremium, tvPuntosLealtad, tvRutaFavorita;
    private ImageView ivProfilePicture;
    private MaterialCardView cardPremiumStats, cardPerfil, btnChangePhoto;
    private View headerContent;
    private ShimmerFrameLayout shimmerHeader, shimmerCard, shimmerPremium;
    private com.google.android.material.button.MaterialButton btnEditarPerfil, btnDeleteAccount;
    private AuthManager authManager;
    private UserService userService;
    private StorageService storageService;
    private PassengerReservationService passengerReservationService;

    // Lanzador para seleccionar imagen de la galería
    private final ActivityResultLauncher<String> imagePickerLauncher = registerForActivityResult(
            new ActivityResultContracts.GetContent(),
            uri -> {
                if (uri != null) {
                    Log.d(TAG, "📸 Imagen seleccionada correctamente: " + uri.toString());
                    subirFotoDePerfil(uri);
                } else {
                    Log.w(TAG, "⚠️ Selección de imagen cancelada por el usuario");
                }
            }
    );

    // ✅ TAG para logs
    private static final String TAG = "PerfilUsuario";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.d(TAG, "🚀 onCreate - Iniciando actividad de perfil de usuario");

        setContentView(R.layout.activity_perfil_pasajero);

        // Inicializar servicios
        authManager = AuthManager.getInstance();
        userService = new UserService();
        storageService = new StorageService();
        passengerReservationService = new PassengerReservationService();

        // Verificar si el usuario está logueado
        if (!authManager.isUserLoggedIn()) {
            authManager.redirectToLogin(this);
            finish();
            return;
        }

        // Referencias a elementos de la UI
        inicializarVistas();

        // Cargar los datos del usuario desde Firebase
        cargarInfoUsuario();

        // Configurar navegación
        setupBottomNavigation();
    }

    private void setupBottomNavigation() {
        getSupportFragmentManager().beginTransaction()
                .replace(R.id.bottom_nav_container, BottomNavFragment.newInstance(false))
                .commit();
    }

    private void inicializarVistas() {
        Log.d(TAG, "🔧 Inicializando vistas...");

        // Shimmers
        shimmerHeader = findViewById(R.id.shimmer_header);
        shimmerCard = findViewById(R.id.shimmer_card);
        shimmerPremium = findViewById(R.id.shimmer_premium);

        // Content Views
        headerContent = findViewById(R.id.headerContent);
        cardPerfil = findViewById(R.id.cardPerfil);
        ivProfilePicture = findViewById(R.id.ivProfilePicture);

        // Botón cambio de foto (ahora en el icono de edición)
        btnChangePhoto = findViewById(R.id.btnChangePhoto);
        if (btnChangePhoto != null) {
            btnChangePhoto.setOnClickListener(v -> {
                Log.d(TAG, "📸 Clic en botón de edición de foto - Abriendo galería");
                imagePickerLauncher.launch("image/*");
            });
        } else {
            Log.e(TAG, "❌ Error: No se encontró el botón btnChangePhoto en el layout");
        }

        // TextViews
        tvNombre = findViewById(R.id.tvNombreUsuario);
        tvCorreo = findViewById(R.id.tvEmail);
        tvTelefono = findViewById(R.id.tvPhone);

        // Vistas Premium
        cardPremiumStats = findViewById(R.id.cardPremiumStats);
        tvTotalGastadoPremium = findViewById(R.id.tvTotalGastadoPremium);
        tvPuntosLealtad = findViewById(R.id.tvPuntosLealtad);
        tvRutaFavorita = findViewById(R.id.tvRutaFavorita);

        // Botones Editar perfil
        btnEditarPerfil = findViewById(R.id.btnEditarPerfil);
        if (btnEditarPerfil != null) btnEditarPerfil.setOnClickListener(v -> irAEditarPerfil());

        // Botón Borrar Cuenta
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
                    Toast.makeText(PerfilUsuarioActivity.this, 
                        "Solicitud enviada. Tu cuenta será revisada para su eliminación.", 
                        Toast.LENGTH_LONG).show();
                    authManager.signOut(PerfilUsuarioActivity.this);
                    finish();
                });
            }

            @Override
            public void onError(String error) {
                runOnUiThread(() -> Toast.makeText(PerfilUsuarioActivity.this, "Error: " + error, Toast.LENGTH_SHORT).show());
            }
        });
    }

    private void irAEditarPerfil() {
        Intent intent = new Intent(this, com.chopcode.rutago.app.activities.passenger.editProfile.EditarPerfilActivity.class);
        startActivity(intent);
    }

    private void subirFotoDePerfil(Uri uri) {
        String userId = authManager.getUserId();
        if (userId == null) {
            Log.e(TAG, "❌ No se puede subir foto: UserId es null");
            return;
        }

        Log.d(TAG, "📤 subirFotoDePerfil - Iniciando subida a Storage...");
        
        runOnUiThread(() -> Toast.makeText(PerfilUsuarioActivity.this, "Subiendo foto...", Toast.LENGTH_SHORT).show());

        storageService.uploadProfilePicture(userId, uri, new StorageService.UploadCallback() {
            @Override
            public void onSuccess(String downloadUrl) {
                Log.d(TAG, "✅ Imagen subida a Storage. URL: " + downloadUrl);
                
                // Actualizar enlace en el nodo de usuarios
                userService.updateProfilePicture(userId, downloadUrl, "usuarios", new UserService.UserUpdateCallback() {
                    @Override
                    public void onSuccess() {
                        runOnUiThread(() -> {
                            Log.d(TAG, "✅ DB actualizada. Cargando nueva foto en UI.");
                            ImageUtils.loadProfilePhoto(PerfilUsuarioActivity.this, downloadUrl, ivProfilePicture);
                            Toast.makeText(PerfilUsuarioActivity.this, "Foto actualizada", Toast.LENGTH_SHORT).show();
                        });
                    }

                    @Override
                    public void onError(String error) {
                        Log.e(TAG, "❌ Error actualizando photoUrl en DB: " + error);
                        runOnUiThread(() -> Toast.makeText(PerfilUsuarioActivity.this, "Error DB: " + error, Toast.LENGTH_SHORT).show());
                    }
                });
            }

            @Override
            public void onError(String error) {
                Log.e(TAG, "❌ Error en StorageService: " + error);
                runOnUiThread(() -> Toast.makeText(PerfilUsuarioActivity.this, "Error subida: " + error, Toast.LENGTH_SHORT).show());
            }

            @Override
            public void onProgress(double progress) {
                Log.v(TAG, "⏳ Progreso de subida: " + progress + "%");
            }
        });
    }

    private void cargarInfoUsuario() {
        String userId = authManager.getUserId();
        if (userId == null) return;

        userService.loadUserData(userId, new UserService.UserDataCallback() {
            @Override
            public void onUserDataLoaded(Usuario usuario) {
                runOnUiThread(() -> {
                    if (shimmerHeader != null) {
                        shimmerHeader.stopShimmer();
                        shimmerHeader.setVisibility(View.GONE);
                    }
                    if (shimmerCard != null) {
                        shimmerCard.stopShimmer();
                        shimmerCard.setVisibility(View.GONE);
                    }
                    if (headerContent != null) headerContent.setVisibility(View.VISIBLE);
                    if (cardPerfil != null) cardPerfil.setVisibility(View.VISIBLE);

                    tvNombre.setText(usuario.getNombre() != null ? usuario.getNombre() : "Usuario");
                    tvTelefono.setText(usuario.getTelefono() != null ? usuario.getTelefono() : "No disponible");
                    tvCorreo.setText(usuario.getEmail() != null ? usuario.getEmail() : "No disponible");

                    ImageUtils.loadProfilePhoto(PerfilUsuarioActivity.this, usuario.getPhotoUrl(), ivProfilePicture);
                    cargarEstadisticasPremium(userId);
                });
            }

            @Override
            public void onError(String error) {
                runOnUiThread(() -> {
                    if (shimmerHeader != null) {
                        shimmerHeader.stopShimmer();
                        shimmerHeader.setVisibility(View.GONE);
                    }
                    if (shimmerCard != null) {
                        shimmerCard.stopShimmer();
                        shimmerCard.setVisibility(View.GONE);
                    }
                    if (headerContent != null) headerContent.setVisibility(View.VISIBLE);
                    if (cardPerfil != null) cardPerfil.setVisibility(View.VISIBLE);
                    Toast.makeText(PerfilUsuarioActivity.this, "Error: " + error, Toast.LENGTH_SHORT).show();
                });
            }
        });
    }

    private void cargarEstadisticasPremium(String usuarioId) {
        passengerReservationService.obtenerEstadisticasPremium(usuarioId, new PassengerReservationService.PremiumStatsCallback() {
            @Override
            public void onStatsCalculated(Map<String, Object> stats) {
                runOnUiThread(() -> {
                    if (shimmerPremium != null) {
                        shimmerPremium.stopShimmer();
                        shimmerPremium.setVisibility(View.GONE);
                    }

                    if (cardPremiumStats != null) {
                        cardPremiumStats.setVisibility(View.VISIBLE);
                        Double gastado = (Double) stats.get("totalGastado");
                        tvTotalGastadoPremium.setText(formatearPrecio(gastado != null ? gastado : 0.0));
                        tvPuntosLealtad.setText(stats.get("puntosLealtad") + " pts");
                        tvRutaFavorita.setText("Ruta favorita: " + stats.get("rutaMasFrecuente"));
                    }
                });
            }

            @Override
            public void onError(String error) {
                runOnUiThread(() -> {
                    if (shimmerPremium != null) {
                        shimmerPremium.stopShimmer();
                        shimmerPremium.setVisibility(View.GONE);
                    }
                });
            }
        });
    }

    private String formatearPrecio(double precio) {
        return String.format("$%,.0f", precio);
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        overridePendingTransition(R.anim.slide_in_left, R.anim.slide_out_right);
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (authManager.isUserLoggedIn()) {
            cargarInfoUsuario();
        }
    }
}

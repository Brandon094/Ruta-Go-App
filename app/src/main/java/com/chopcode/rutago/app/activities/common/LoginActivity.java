package com.chopcode.rutago.app.activities.common;

import static com.chopcode.rutago.app.managers.core.permissions.PermissionManager.requestNotificationPermission;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.text.method.HideReturnsTransformationMethod;
import android.text.method.PasswordTransformationMethod;
import android.util.Log;
import android.view.Gravity;
import android.view.View;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.ProgressBar;
import android.widget.TextView;

import androidx.activity.EdgeToEdge;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.lifecycle.ViewModelProvider;

import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.activities.driver.DriverHomeActivity;
import com.chopcode.rutago.app.activities.passenger.PassengerHomeActivity;
import com.chopcode.rutago.app.activities.passenger.reservation.createReservation.CreateReservationActivity;
import com.chopcode.rutago.app.config.MyApp;
import com.chopcode.rutago.app.managers.core.permissions.PermissionManager;
import com.chopcode.rutago.app.services.auth.GoogleLoginService;
import com.chopcode.rutago.app.utils.ui.UIAnimationUtils;
import com.chopcode.rutago.app.utils.ui.WindowUtils;
import com.chopcode.rutago.app.viewmodels.common.LoginViewModel;
import com.google.android.material.snackbar.Snackbar;
import com.google.android.material.textfield.TextInputEditText;
import com.google.android.material.textfield.TextInputLayout;
import com.google.firebase.auth.FirebaseUser;

/**
 * Login Activity
 *
 * Centro neurálgico para la autenticación y control de acceso.
 * Responsabilidades:
 * - Implementar flujos de autenticación dual: Credenciales (Email/Pass) y Social (Google One Tap).
 * - Gestionar la persistencia de sesión local (Auto-Login) para mejorar la retención de usuarios.
 * - Orquestar la solicitud de permisos críticos de notificaciones en el arranque.
 * - Implementar lógica de validación reactiva en campos de entrada con feedback visual de error (Shake).
 * - Realizar el enrutamiento inteligente post-login basado en el rol del perfil (Pasajero vs Conductor).
 */
public class LoginActivity extends AppCompatActivity {

    private static final String TAG = "LoginActivity";

    // Componentes de Interfaz
    private TextInputEditText editTextUser, editTextPassword;
    private Button buttonLogin, btnGoogleSignIn;
    private TextView buttonRegistration, forgotPassword;
    private View overlay;
    private ProgressBar progressBar;

    private LoginViewModel viewModel;

    // Preferencias para persistencia de sesión ligera
    private static final String PREFS_NAME = "UserPrefs";
    private static final String KEY_USER_ID = "user_id";
    private static final String KEY_USER_TYPE = "user_type";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        EdgeToEdge.enable(this);
        super.onCreate(savedInstanceState);
        Log.d(TAG, "🚀 Iniciando flujo de autenticación.");
        setContentView(R.layout.activity_inicio_de_sesion);

        viewModel = new ViewModelProvider(this).get(LoginViewModel.class);
        viewModel.init(this);

        initViews();
        setupInsets();
        setupObservers();
        setupListeners();

        // Verificaciones iniciales de seguridad y permisos
        requestNotificationPermission(this);
        checkExistingSession();
    }

    /**
     * Inicializa las referencias de vista y aplica micro-interacciones de escala.
     */
    private void initViews() {
        editTextUser = findViewById(R.id.editTextUser);
        editTextPassword = findViewById(R.id.editTextPassword);
        buttonLogin = findViewById(R.id.buttonIngresar);
        buttonRegistration = findViewById(R.id.buttonRegistro);
        btnGoogleSignIn = findViewById(R.id.btnGoogleSignIn);
        forgotPassword = findViewById(R.id.olvidasteContraseña);
        overlay = findViewById(R.id.overlay);
        progressBar = findViewById(R.id.progressBar);

        UIAnimationUtils.setClickAnimation(buttonLogin);
        UIAnimationUtils.setClickAnimation(btnGoogleSignIn);
        UIAnimationUtils.setClickAnimation(buttonRegistration);
        UIAnimationUtils.setClickAnimation(forgotPassword);

        View logoCard = findViewById(R.id.loginCardLogo);
        if (logoCard != null) UIAnimationUtils.startLogoTiltAnimation(logoCard);

        setupPasswordVisibilityToggle();
    }

    /**
     * Suscribe la actividad a los estados del ViewModel (Carga, Éxito, Error).
     */
    private void setupObservers() {
        viewModel.getLoginSuccess().observe(this, userType -> {
            FirebaseUser user = MyApp.getCurrentUser();
            if (user != null) {
                saveUserToPrefs(user.getUid(), userType);
                redirectByUserType(userType);
            }
        });

        viewModel.getLoginError().observe(this, error -> {
            restoreLoginButton();
            String email = (editTextUser.getText() != null) ? editTextUser.getText().toString().trim() : "";
            handleLoginError(error, email);
        });

        viewModel.getIsLoading().observe(this, loading -> {
            showProgress(loading);
            buttonLogin.setEnabled(!loading);
            btnGoogleSignIn.setEnabled(!loading);
        });
    }

    private void setupListeners() {
        buttonLogin.setOnClickListener(v -> {
            String email = (editTextUser.getText() != null) ? editTextUser.getText().toString().trim() : "";
            String password = (editTextPassword.getText() != null) ? editTextPassword.getText().toString().trim() : "";

            if (validateLoginFields(email, password)) {
                buttonLogin.setText(R.string.cargando);
                viewModel.loginWithEmail(email, password);
            }
        });

        btnGoogleSignIn.setOnClickListener(v -> viewModel.loginWithGoogle());

        buttonRegistration.setOnClickListener(v -> startActivity(new Intent(this, RegistrationActivity.class)));

        forgotPassword.setOnClickListener(v -> startActivity(new Intent(this, ForgotPasswordActivity.class)));
    }

    private void setupPasswordVisibilityToggle() {
        TextInputLayout passwordInputLayout = findViewById(R.id.passwordInputLayout);
        if (passwordInputLayout != null) {
            passwordInputLayout.setEndIconOnClickListener(v -> {
                if (editTextPassword.getTransformationMethod() instanceof PasswordTransformationMethod) {
                    editTextPassword.setTransformationMethod(HideReturnsTransformationMethod.getInstance());
                    passwordInputLayout.setEndIconDrawable(ContextCompat.getDrawable(this, R.drawable.ic_visibility_on));
                } else {
                    editTextPassword.setTransformationMethod(PasswordTransformationMethod.getInstance());
                    passwordInputLayout.setEndIconDrawable(ContextCompat.getDrawable(this, R.drawable.ic_visibility_off));
                }
                if (editTextPassword.getText() != null) {
                    editTextPassword.setSelection(editTextPassword.getText().length());
                }
            });
        }
    }

    /**
     * Verifica si existe una sesión previa válida para saltar el Login.
     */
    private void checkExistingSession() {
        SharedPreferences prefs = getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        String savedUserId = prefs.getString(KEY_USER_ID, null);
        String savedUserType = prefs.getString(KEY_USER_TYPE, null);

        if (savedUserId != null && savedUserType != null) {
            FirebaseUser currentUser = MyApp.getCurrentUser();
            if (currentUser != null && currentUser.getUid().equals(savedUserId)) {
                redirectByUserType(savedUserType);
            } else {
                clearSavedSession();
            }
        }
    }

    private boolean validateLoginFields(String email, String password) {
        boolean isValid = true;
        TextInputLayout layoutEmail = findViewById(R.id.emailInputLayout);
        TextInputLayout layoutPassword = findViewById(R.id.passwordInputLayout);

        if (layoutEmail != null) layoutEmail.setError(null);
        if (layoutPassword != null) layoutPassword.setError(null);

        if (email.isEmpty() || !android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            if (layoutEmail != null) layoutEmail.setError(getString(R.string.correo_valido));
            isValid = false;
        }
        if (password.length() < 6) {
            if (layoutPassword != null) layoutPassword.setError(getString(R.string.error_password_length));
            isValid = false;
        }
        return isValid;
    }

    /**
     * Ejecuta el salto final de navegación basándose en los privilegios del perfil.
     */
    private void redirectByUserType(String userType) {
        if ("driver".equalsIgnoreCase(userType) || "conductor".equalsIgnoreCase(userType)) {
            startActivity(new Intent(this, DriverHomeActivity.class));
        } else {
            boolean backToReservation = getIntent().getBooleanExtra("volverAReserva", false);
            Intent intent = new Intent(this, backToReservation ? CreateReservationActivity.class : PassengerHomeActivity.class);
            startActivity(intent);
        }
        finish();
    }

    private void saveUserToPrefs(String userId, String userType) {
        getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE).edit()
                .putString(KEY_USER_ID, userId)
                .putString(KEY_USER_TYPE, userType)
                .apply();
    }

    private void clearSavedSession() {
        getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE).edit().clear().apply();
    }

    private void showProgress(boolean show) {
        if (progressBar != null) progressBar.setVisibility(show ? View.VISIBLE : View.GONE);
        if (show) showOverlay(); else hideOverlay();
    }

    private void restoreLoginButton() {
        buttonLogin.setText(R.string.ingresar);
        showProgress(false);
    }

    /**
     * Mapea códigos de error de Firebase a mensajes legibles y efectos visuales.
     */
    private void handleLoginError(String error, String email) {
        if ("CANCELED_BY_USER".equals(error)) return;

        TextInputLayout layoutPassword = findViewById(R.id.passwordInputLayout);
        if (error.equals("Credenciales incorrectas") || error.contains("incorrecta")) {
            if (layoutPassword != null) layoutPassword.setError(getString(R.string.error_incorrect_password));
            UIAnimationUtils.playErrorShake(this, editTextPassword);
        } else {
            showCenteredSnackbar(error, true);
        }
    }

    private void showOverlay() {
        if (overlay != null) {
            overlay.setVisibility(View.VISIBLE);
            overlay.setAlpha(0f);
            overlay.animate().alpha(1f).setDuration(300).start();
        }
    }

    private void hideOverlay() {
        if (overlay != null) {
            overlay.animate().alpha(0f).setDuration(300).withEndAction(() -> overlay.setVisibility(View.GONE)).start();
        }
    }

    private void showCenteredSnackbar(String message, boolean isError) {
        Snackbar snackbar = Snackbar.make(findViewById(android.R.id.content), message, 3000);
        View view = snackbar.getView();
        view.setBackgroundColor(ContextCompat.getColor(this, isError ? R.color.error_500 : R.color.primary_500));
        if (view.getLayoutParams() instanceof FrameLayout.LayoutParams) {
            FrameLayout.LayoutParams p = (FrameLayout.LayoutParams) view.getLayoutParams();
            p.gravity = Gravity.CENTER;
            view.setLayoutParams(p);
        }
        snackbar.show();
    }

    /**
     * Gestiona los insets del sistema para evitar superposiciones con las barras de estado y navegación.
     */
    private void setupInsets() {
        WindowUtils.applyContentInsets(findViewById(android.R.id.content));
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == GoogleLoginService.REQ_ONE_TAP) {
            viewModel.handleGoogleResult(data);
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] p, @NonNull int[] g) {
        super.onRequestPermissionsResult(requestCode, p, g);
        if (requestCode == PermissionManager.NOTIFICATION_PERMISSION_REQUEST_CODE) {
            if (g.length > 0 && g[0] == PackageManager.PERMISSION_GRANTED) {
                Log.d(TAG, "✅ Permiso de notificaciones concedido.");
            }
        }
    }
}

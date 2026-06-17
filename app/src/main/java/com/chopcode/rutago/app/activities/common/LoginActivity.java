package com.chopcode.rutago.app.activities.common;

import static com.chopcode.rutago.app.managers.permissions.PermissionManager.requestNotificationPermission;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.text.method.HideReturnsTransformationMethod;
import android.text.method.PasswordTransformationMethod;
import android.util.Log;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.ProgressBar;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;
import androidx.lifecycle.ViewModelProvider;

import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.activities.driver.DriverHomeActivity;
import com.chopcode.rutago.app.activities.passenger.PassengerHomeActivity;
import com.chopcode.rutago.app.activities.passenger.reservation.createReservation.CreateReservationActivity;
import com.chopcode.rutago.app.config.MyApp;
import com.chopcode.rutago.app.managers.permissions.PermissionManager;
import com.chopcode.rutago.app.services.auth.GoogleLoginService;
import com.chopcode.rutago.app.viewmodels.common.LoginViewModel;
import com.google.android.material.button.MaterialButton;
import com.google.android.material.snackbar.Snackbar;
import com.google.android.material.textfield.TextInputEditText;
import com.google.android.material.textfield.TextInputLayout;
import com.google.firebase.auth.FirebaseUser;

/**
 * 🔑 Login Activity
 * 
 * Punto de entrada principal para la autenticación de usuarios.
 * Responsabilidades:
 * - Gestionar el inicio de sesión tradicional (Email/Password) y social (Google One Tap).
 * - Solicitar permisos críticos como notificaciones (Android 13+).
 * - Verificar sesiones locales persistentes para login automático.
 * - Redirigir al usuario a su Dashboard correspondiente (Pasajero o Conductor) tras validar su rol en Firebase.
 */
public class LoginActivity extends AppCompatActivity {

    private static final String TAG = "LoginActivity";

    // Views
    private TextInputEditText editTextUser, editTextPassword;
    private Button buttonLogin, btnGoogleSignIn;
    private TextView buttonRegistration, forgotPassword;
    private View overlay;
    private ProgressBar progressBar;

    // ViewModel
    private LoginViewModel viewModel;

    // SharedPreferences (Local session)
    private static final String PREFS_NAME = "UserPrefs";
    private static final String KEY_USER_ID = "user_id";
    private static final String KEY_USER_TYPE = "user_type";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.d(TAG, "🚀 onCreate - Starting login flow");
        setContentView(R.layout.activity_inicio_de_sesion);

        // 1. Initialize ViewModel
        viewModel = new ViewModelProvider(this).get(LoginViewModel.class);
        viewModel.init(this);

        // 2. Initialize Views and UI
        initViews();
        
        // 3. Configure Observers (MVVM)
        setupObservers();

        // 4. Configure Click Listeners
        setupListeners();

        // 5. Initial checks
        requestNotificationPermission(this);
        checkExistingSession();

        Log.d(TAG, "✅ Activity configured and ready");
    }

    private void initViews() {
        Log.d(TAG, "🔧 Initializing UI components...");
        editTextUser = findViewById(R.id.editTextUser);
        editTextPassword = findViewById(R.id.editTextPassword);
        buttonLogin = findViewById(R.id.buttonIngresar);
        buttonRegistration = findViewById(R.id.buttonRegistro);
        btnGoogleSignIn = findViewById(R.id.btnGoogleSignIn);
        forgotPassword = findViewById(R.id.olvidasteContraseña);
        overlay = findViewById(R.id.overlay);
        progressBar = findViewById(R.id.progressBar);

        setupPasswordVisibilityToggle();
    }

    private void setupObservers() {
        viewModel.getLoginSuccess().observe(this, userType -> {
            Log.d(TAG, "🎯 [OBSERVER] Login successful. Role: " + userType);
            FirebaseUser user = MyApp.getCurrentUser();
            if (user != null) {
                saveUserToPrefs(user.getUid(), userType);
                redirectByUserType(userType);
            }
        });

        viewModel.getLoginError().observe(this, error -> {
            Log.e(TAG, "❌ [OBSERVER] Login error received: " + error);
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
                Log.d(TAG, "🎯 [CLICK] Attempting email login: " + email);
                buttonLogin.setText("Loading...");
                viewModel.loginWithEmail(email, password);
            }
        });

        btnGoogleSignIn.setOnClickListener(v -> {
            Log.d(TAG, "🎯 [CLICK] Starting Google Sign-In");
            viewModel.loginWithGoogle();
        });

        buttonRegistration.setOnClickListener(v -> {
            Log.d(TAG, "📝 Navigating to registration screen");
            startActivity(new Intent(this, RegistrationActivity.class));
        });

        forgotPassword.setOnClickListener(v -> {
            Log.d(TAG, "🔑 User requested password recovery");
            startActivity(new Intent(this, ForgotPasswordActivity.class));
        });
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

    private void checkExistingSession() {
        SharedPreferences prefs = getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        String savedUserId = prefs.getString(KEY_USER_ID, null);
        String savedUserType = prefs.getString(KEY_USER_TYPE, null);

        Log.d(TAG, "🔍 [SESSION_CHECK] Looking for local session...");

        if (savedUserId != null && savedUserType != null) {
            FirebaseUser currentUser = MyApp.getCurrentUser();
            if (currentUser != null && currentUser.getUid().equals(savedUserId)) {
                Log.d(TAG, "✅ [SESSION_CHECK] Valid session. Executing autologin for: " + savedUserId);
                redirectByUserType(savedUserType);
            } else {
                Log.w(TAG, "⚠️ [SESSION_CHECK] Local session inconsistent with Firebase");
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
            if (layoutEmail != null) layoutEmail.setError("Enter a valid email");
            isValid = false;
        }
        if (password.length() < 6) {
            if (layoutPassword != null) layoutPassword.setError("Minimum 6 characters");
            isValid = false;
        }
        return isValid;
    }

    private void redirectByUserType(String userType) {
        if ("driver".equalsIgnoreCase(userType) || "conductor".equalsIgnoreCase(userType)) {
            Log.d(TAG, "🚗 Redirecting to Driver Dashboard");
            startActivity(new Intent(this, DriverHomeActivity.class));
        } else {
            Log.d(TAG, "👤 Redirecting to Passenger Dashboard");
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
        buttonLogin.setText("Login");
        showProgress(false);
    }

    private void handleLoginError(String error, String email) {
        TextInputLayout layoutPassword = findViewById(R.id.passwordInputLayout);
        if (error.equals("Credenciales incorrectas") || error.contains("incorrecta")) {
            if (layoutPassword != null) layoutPassword.setError("Incorrect password");
            animateErrorField(editTextPassword);
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

    private void animateErrorField(View view) {
        if (view != null) {
            Animation shake = AnimationUtils.loadAnimation(this, R.anim.shake);
            view.startAnimation(shake);
        }
    }

    private void showCenteredSnackbar(String message, boolean isError) {
        Snackbar snackbar = Snackbar.make(findViewById(android.R.id.content), (isError ? "❌ " : "") + message, 3000);
        View view = snackbar.getView();
        view.setBackgroundColor(ContextCompat.getColor(this, isError ? R.color.error_500 : R.color.primary_500));
        if (view.getLayoutParams() instanceof FrameLayout.LayoutParams) {
            FrameLayout.LayoutParams p = (FrameLayout.LayoutParams) view.getLayoutParams();
            p.gravity = Gravity.CENTER;
            view.setLayoutParams(p);
        }
        snackbar.show();
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
                Log.d(TAG, "✅ Notification permission granted");
            } else {
                Log.w(TAG, "❌ Notification permission denied");
            }
        }
    }
}

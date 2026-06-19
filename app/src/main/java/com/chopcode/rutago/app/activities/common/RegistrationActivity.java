package com.chopcode.rutago.app.activities.common;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.text.SpannableString;
import android.text.Spanned;
import android.text.TextPaint;
import android.text.method.LinkMovementMethod;
import android.text.style.ClickableSpan;
import android.text.style.ForegroundColorSpan;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.webkit.WebView;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProvider;

import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.config.MyApp;
import com.chopcode.rutago.app.viewmodels.common.RegistrationViewModel;
import com.google.android.material.appbar.MaterialToolbar;
import com.google.android.material.checkbox.MaterialCheckBox;
import com.google.android.material.dialog.MaterialAlertDialogBuilder;
import com.google.android.material.textfield.TextInputEditText;

import java.io.InputStream;
import java.util.Scanner;

/**
 * 📝 Registration Activity
 * 
 * Permite a los nuevos pasajeros unirse a la plataforma Ruta-Go.
 * Responsabilidades:
 * - Recolectar datos básicos del usuario (Nombre, Email, Teléfono).
 * - Implementar validaciones de seguridad (Password matching, formato de email).
 * - Mostrar los Términos y Condiciones y la Política de Privacidad mediante diálogos interactivos.
 * - Delegar el proceso de creación de cuenta en Firebase a RegistrationViewModel.
 */
public class RegistrationActivity extends AppCompatActivity {

    private static final String TAG = "RegistrationActivity";

    // Views
    private TextInputEditText etName, etEmail, etPhone, etPassword, etConfirmPassword;
    private Button btnRegister;
    private TextView btnLogin;
    private MaterialToolbar topAppBar;
    private MaterialCheckBox checkboxTerms;

    // ViewModel
    private RegistrationViewModel viewModel;

    private static final String PREFS_NAME = "UserPrefs";
    private static final String KEY_USER_ID = "user_id";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.d(TAG, "🚀 onCreate - Starting registration flow");
        setContentView(R.layout.activity_registro_usuarios);

        viewModel = new ViewModelProvider(this).get(RegistrationViewModel.class);

        initViews();
        setupObservers();
        setupListeners();
    }

    private void initViews() {
        etName = findViewById(R.id.editTextNombre);
        etEmail = findViewById(R.id.editTextCorreo);
        etPhone = findViewById(R.id.editTextTelefono);
        etPassword = findViewById(R.id.editTextPassword);
        etConfirmPassword = findViewById(R.id.editTextConfirmPassword);
        btnRegister = findViewById(R.id.buttonRegistrar);
        btnLogin = findViewById(R.id.buttonIniciarSesion);
        topAppBar = findViewById(R.id.topAppBar);
        checkboxTerms = findViewById(R.id.checkboxTerms);

        // 🔥 Animación viva para el logo
        View logoCard = findViewById(R.id.registerCardLogo);
        if (logoCard != null) {
            com.chopcode.rutago.app.utils.ui.UIAnimationUtils.startLogoTiltAnimation(logoCard);
        }

        setupTermsAndConditionsLink();
    }

    private void setupObservers() {
        viewModel.getRegistrationSuccess().observe(this, success -> {
            if (success) {
                Toast.makeText(this, R.string.user_registered_success, Toast.LENGTH_SHORT).show();
                if (MyApp.getCurrentUserId() != null) saveUserIdToPrefs(MyApp.getCurrentUserId());
                startActivity(new Intent(this, LoginActivity.class));
                finish();
            }
        });

        viewModel.getRegistrationError().observe(this, error -> {
            btnRegister.setEnabled(true);
            btnRegister.setText(R.string.registrarse);
            Toast.makeText(this, getString(R.string.error_prefijo, error), Toast.LENGTH_LONG).show();
        });

        viewModel.getIsLoading().observe(this, loading -> {
            btnRegister.setEnabled(!loading);
            btnRegister.setText(loading ? getString(R.string.registering) : getString(R.string.registrarse));
        });
    }

    private void setupListeners() {
        btnRegister.setOnClickListener(v -> {
            String name = etName.getText().toString().trim();
            String email = etEmail.getText().toString().trim();
            String phone = etPhone.getText().toString().trim();
            String pass = etPassword.getText().toString().trim();
            String confirmPass = etConfirmPassword.getText().toString().trim();

            if (validateFields(name, email, pass, confirmPass)) {
                viewModel.registerUser(name, email, phone, pass);
            }
        });

        btnLogin.setOnClickListener(v -> {
            startActivity(new Intent(this, LoginActivity.class));
            finish();
        });

        topAppBar.setNavigationOnClickListener(v -> onBackPressed());
    }

    private void setupTermsAndConditionsLink() {
        String textTerms = getString(R.string.terms_and_conditions);
        String textPrivacy = getString(R.string.privacy_policy);
        String fullText = getString(R.string.accept_terms) + " " + textTerms + " " + getString(R.string.and_the) + " " + textPrivacy;
        SpannableString ss = new SpannableString(fullText);

        ClickableSpan termsClick = new ClickableSpan() {
            @Override public void onClick(@NonNull View widget) { showLegalDialog(R.raw.terms_conditions, getString(R.string.terms_and_conditions)); }
            @Override public void updateDrawState(@NonNull TextPaint ds) { super.updateDrawState(ds); ds.setUnderlineText(true); ds.setFakeBoldText(true); }
        };

        ClickableSpan privacyClick = new ClickableSpan() {
            @Override public void onClick(@NonNull View widget) { showLegalDialog(R.raw.privacy_policy, getString(R.string.privacy_policy)); }
            @Override public void updateDrawState(@NonNull TextPaint ds) { super.updateDrawState(ds); ds.setUnderlineText(true); ds.setFakeBoldText(true); }
        };

        int startTerms = fullText.indexOf(textTerms);
        int endTerms = startTerms + textTerms.length();
        int startPrivacy = fullText.indexOf(textPrivacy);
        int endPrivacy = startPrivacy + textPrivacy.length();

        if (startTerms != -1) {
            ss.setSpan(termsClick, startTerms, endTerms, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);
            ss.setSpan(new ForegroundColorSpan(getResources().getColor(R.color.primary_500)), startTerms, endTerms, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);
        }
        if (startPrivacy != -1) {
            ss.setSpan(privacyClick, startPrivacy, endPrivacy, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);
            ss.setSpan(new ForegroundColorSpan(getResources().getColor(R.color.primary_500)), startPrivacy, endPrivacy, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);
        }
        checkboxTerms.setText(ss);
        checkboxTerms.setMovementMethod(LinkMovementMethod.getInstance());
    }

    private void showLegalDialog(int rawResourceId, String title) {
        View dialogView = LayoutInflater.from(this).inflate(R.layout.dialog_privacy_policy, null);
        WebView webView = dialogView.findViewById(R.id.webViewPrivacy);
        try {
            InputStream is = getResources().openRawResource(rawResourceId);
            Scanner s = new Scanner(is).useDelimiter("\\A");
            String htmlContent = s.hasNext() ? s.next() : "";
            is.close();
            webView.loadDataWithBaseURL(null, htmlContent, "text/html", "UTF-8", null);
            new MaterialAlertDialogBuilder(this, R.style.AppDialogTheme).setTitle(title).setView(dialogView).setPositiveButton(R.string.legal_accept, (dialog, which) -> checkboxTerms.setChecked(true)).setNegativeButton(R.string.close, null).show();
        } catch (Exception e) { Log.e(TAG, "Error loading legal doc: " + e.getMessage()); }
    }

    private boolean validateFields(String name, String email, String password, String confirmPassword) {
        if (name.isEmpty() || email.isEmpty() || password.isEmpty() || confirmPassword.isEmpty()) { Toast.makeText(this, R.string.error_fill_fields, Toast.LENGTH_SHORT).show(); return false; }
        if (!android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()) { Toast.makeText(this, R.string.correo_valido, Toast.LENGTH_SHORT).show(); return false; }
        if (!password.equals(confirmPassword)) { Toast.makeText(this, R.string.error_passwords_mismatch, Toast.LENGTH_SHORT).show(); return false; }
        if (password.length() < 6) { Toast.makeText(this, R.string.error_password_length, Toast.LENGTH_SHORT).show(); return false; }
        if (!checkboxTerms.isChecked()) { Toast.makeText(this, R.string.must_accept_terms, Toast.LENGTH_SHORT).show(); return false; }
        return true;
    }

    private void saveUserIdToPrefs(String userId) {
        getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE).edit().putString(KEY_USER_ID, userId).apply();
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        overridePendingTransition(android.R.anim.fade_in, android.R.anim.fade_out);
    }
}

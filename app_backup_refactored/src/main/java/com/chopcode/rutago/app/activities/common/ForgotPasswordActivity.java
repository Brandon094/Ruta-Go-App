package com.chopcode.rutago.app.activities.common;

import android.os.Bundle;
import android.util.Log;
import android.util.Patterns;
import android.view.View;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProvider;

import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.viewmodels.common.ForgotPasswordViewModel;
import com.google.android.material.textfield.TextInputEditText;
import com.google.android.material.textfield.TextInputLayout;
import com.google.android.material.appbar.MaterialToolbar;

/**
 * 🔑 Forgot Password Activity
 */
public class ForgotPasswordActivity extends AppCompatActivity {

    private static final String TAG = "ForgotPasswordActivity";

    private TextInputEditText etEmail;
    private TextInputLayout tilEmail;
    private Button btnRecover, btnUnderstood;
    private MaterialToolbar topAppBar;
    private ProgressBar progressBar;
    private View formCardView, layoutSuccess;
    private TextView tvSubtitle;

    private ForgotPasswordViewModel viewModel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.d(TAG, "🚀 onCreate - Starting recovery flow");
        setContentView(R.layout.activity_recuperar_contrasena);

        viewModel = new ViewModelProvider(this).get(ForgotPasswordViewModel.class);

        initViews();
        setupToolbar();
        setupObservers();
        setupListeners();

        String prefilledEmail = getIntent().getStringExtra("email");
        if (prefilledEmail != null && !prefilledEmail.isEmpty()) {
            etEmail.setText(prefilledEmail);
        }
    }

    private void initViews() {
        etEmail = findViewById(R.id.et_email);
        tilEmail = findViewById(R.id.til_email);
        btnRecover = findViewById(R.id.btn_recuperar);
        topAppBar = findViewById(R.id.topAppBar);
        progressBar = findViewById(R.id.pb_loading);
        formCardView = findViewById(R.id.formCardView);
        layoutSuccess = findViewById(R.id.layout_success);
        tvSubtitle = findViewById(R.id.tv_subtitle);
        btnUnderstood = findViewById(R.id.btn_entendido);
    }

    private void setupToolbar() {
        if (topAppBar != null) {
            setSupportActionBar(topAppBar);
            topAppBar.setNavigationOnClickListener(v -> onBackPressed());
        }
    }

    private void setupObservers() {
        viewModel.getSendSuccess().observe(this, success -> { if (success) showSuccessState(); });
        viewModel.getSendError().observe(this, msg -> { btnRecover.setEnabled(true); Toast.makeText(this, "Error: " + msg, Toast.LENGTH_LONG).show(); });
        viewModel.getIsLoading().observe(this, loading -> { progressBar.setVisibility(loading ? View.VISIBLE : View.GONE); btnRecover.setEnabled(!loading); });
    }

    private void setupListeners() {
        btnRecover.setOnClickListener(v -> {
            String email = etEmail.getText().toString().trim();
            if (validateEmail(email)) viewModel.sendResetEmail(email);
        });
        btnUnderstood.setOnClickListener(v -> finish());
    }

    private boolean validateEmail(String email) {
        if (email.isEmpty()) { tilEmail.setError(getString(R.string.correo_obligatorio)); return false; }
        if (!Patterns.EMAIL_ADDRESS.matcher(email).matches()) { tilEmail.setError(getString(R.string.correo_valido)); return false; }
        tilEmail.setError(null);
        return true;
    }

    private void showSuccessState() {
        formCardView.setVisibility(View.GONE);
        tvSubtitle.setVisibility(View.GONE);
        if (getSupportActionBar() != null) getSupportActionBar().setTitle(getString(R.string.todo_listo));
        layoutSuccess.setVisibility(View.VISIBLE);
        layoutSuccess.setAlpha(0f);
        layoutSuccess.animate().alpha(1f).setDuration(600).start();
    }
}

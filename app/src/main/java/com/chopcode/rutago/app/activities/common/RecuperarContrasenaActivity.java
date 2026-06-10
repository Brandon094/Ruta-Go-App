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

import com.chopcode.rutago.app.R;
import com.google.android.material.textfield.TextInputEditText;
import com.google.android.material.textfield.TextInputLayout;
import com.google.android.material.appbar.MaterialToolbar;
import com.google.firebase.auth.FirebaseAuth;

public class RecuperarContrasenaActivity extends AppCompatActivity {

    private TextInputEditText etEmail;
    private TextInputLayout tilEmail;
    private Button btnRecuperar, btnEntendido;
    private MaterialToolbar topAppBar;
    private ProgressBar progressBar;
    private View formCardView, layoutSuccess;
    private TextView tvSubtitle;
    private FirebaseAuth mAuth;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_recuperar_contrasena);

        mAuth = FirebaseAuth.getInstance();

        // Inicializar vistas
        initViews();
        
        setupToolbar();

        // Si venimos del login con un correo ya ingresado, lo ponemos
        String emailPrelleno = getIntent().getStringExtra("email");
        if (emailPrelleno != null && !emailPrelleno.isEmpty()) {
            etEmail.setText(emailPrelleno);
        }

        btnEntendido.setOnClickListener(v -> finish());

        btnRecuperar.setOnClickListener(v -> {
            validarYEnviarCorreo();
        });
    }

    private void initViews() {
        etEmail = findViewById(R.id.et_email);
        tilEmail = findViewById(R.id.til_email);
        btnRecuperar = findViewById(R.id.btn_recuperar);
        topAppBar = findViewById(R.id.topAppBar);
        progressBar = findViewById(R.id.pb_loading);
        formCardView = findViewById(R.id.formCardView);
        layoutSuccess = findViewById(R.id.layout_success);
        tvSubtitle = findViewById(R.id.tv_subtitle);
        btnEntendido = findViewById(R.id.btn_entendido);
    }

    private void setupToolbar() {
        if (topAppBar != null) {
            setSupportActionBar(topAppBar);
            topAppBar.setNavigationOnClickListener(v -> onBackPressed());
        }
    }

    private void validarYEnviarCorreo() {
        String email = etEmail.getText().toString().trim();

        if (email.isEmpty()) {
            tilEmail.setError(getString(R.string.correo_obligatorio));
            return;
        }

        if (!Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            tilEmail.setError(getString(R.string.correo_valido));
            return;
        }

        tilEmail.setError(null);
        enviarCorreoRecuperacion(email);
    }

    private void enviarCorreoRecuperacion(String email) {
        progressBar.setVisibility(View.VISIBLE);
        btnRecuperar.setEnabled(false);

        Log.d("RecuperarPass", "intentando enviar correo a: " + email);

        mAuth.sendPasswordResetEmail(email)
                .addOnCompleteListener(task -> {
                    progressBar.setVisibility(View.GONE);
                    
                    if (task.isSuccessful()) {
                        Log.d("RecuperarPass", "✅ Firebase reportó éxito en el envío");
                        mostrarEstadoExito();
                    } else {
                        btnRecuperar.setEnabled(true);
                        String errorMsg = task.getException() != null ? task.getException().getMessage() : "Error desconocido";
                        Log.e("RecuperarPass", "❌ Error de Firebase: " + errorMsg);
                        
                        Toast.makeText(RecuperarContrasenaActivity.this,
                                "No se pudo enviar: " + errorMsg,
                                Toast.LENGTH_LONG).show();
                    }
                });
    }

    private void mostrarEstadoExito() {
        // Ocultar formulario y subtítulo
        formCardView.setVisibility(View.GONE);
        tvSubtitle.setVisibility(View.GONE);
        
        // Cambiar título del Toolbar si es necesario (opcional)
        if (getSupportActionBar() != null) {
            getSupportActionBar().setTitle(getString(R.string.todo_listo));
        }
        
        // Mostrar layout de éxito con una animación fluida
        layoutSuccess.setVisibility(View.VISIBLE);
        layoutSuccess.setAlpha(0f);
        layoutSuccess.setTranslationY(50f);
        layoutSuccess.animate()
                .alpha(1f)
                .translationY(0f)
                .setDuration(600)
                .start();
    }
}

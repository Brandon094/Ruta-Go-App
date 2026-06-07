package com.chopcode.rutago.app.activities.common;

import android.os.Bundle;
import android.util.Patterns;
import android.view.View;
import android.widget.Button;
import android.widget.ImageButton;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.chopcode.rutago.app.R;
import com.google.android.material.textfield.TextInputEditText;
import com.google.android.material.textfield.TextInputLayout;
import com.google.firebase.auth.FirebaseAuth;

public class RecuperarContrasenaActivity extends AppCompatActivity {

    private TextInputEditText etEmail;
    private TextInputLayout tilEmail;
    private Button btnRecuperar, btnEntendido;
    private ImageButton btnBack;
    private ProgressBar progressBar;
    private LinearLayout layoutSuccess;
    private TextView tvTitle, tvSubtitle;
    private ImageView logo;
    private FirebaseAuth mAuth;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_recuperar_contrasena);

        mAuth = FirebaseAuth.getInstance();

        // Inicializar vistas
        initViews();
        
        // Aplicar animación al logo
        Animation anim = AnimationUtils.loadAnimation(this, R.anim.splash_animation);
        logo.startAnimation(anim);

        btnBack.setOnClickListener(v -> onBackPressed());
        btnEntendido.setOnClickListener(v -> finish());

        btnRecuperar.setOnClickListener(v -> {
            validarYEnviarCorreo();
        });
    }

    private void initViews() {
        etEmail = findViewById(R.id.et_email);
        tilEmail = findViewById(R.id.til_email);
        btnRecuperar = findViewById(R.id.btn_recuperar);
        btnBack = findViewById(R.id.btn_back);
        progressBar = findViewById(R.id.pb_loading);
        layoutSuccess = findViewById(R.id.layout_success);
        tvTitle = findViewById(R.id.tv_title);
        tvSubtitle = findViewById(R.id.tv_subtitle);
        btnEntendido = findViewById(R.id.btn_entendido);
        logo = findViewById(R.id.logo_small);
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

        mAuth.sendPasswordResetEmail(email)
                .addOnCompleteListener(task -> {
                    progressBar.setVisibility(View.GONE);
                    
                    if (task.isSuccessful()) {
                        mostrarEstadoExito();
                    } else {
                        btnRecuperar.setEnabled(true);
                        Toast.makeText(RecuperarContrasenaActivity.this,
                                getString(R.string.error_envio_correo),
                                Toast.LENGTH_SHORT).show();
                    }
                });
    }

    private void mostrarEstadoExito() {
        // Ocultar elementos de entrada
        tilEmail.setVisibility(View.GONE);
        btnRecuperar.setVisibility(View.GONE);
        tvSubtitle.setVisibility(View.GONE);
        
        // Cambiar título
        tvTitle.setText(getString(R.string.todo_listo));
        
        // Mostrar layout de éxito con una pequeña animación
        layoutSuccess.setVisibility(View.VISIBLE);
        layoutSuccess.setAlpha(0f);
        layoutSuccess.animate().alpha(1f).setDuration(500).start();
    }
}

package com.chopcode.trasnportenataga_laplata.activities.common;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.ImageView;

import androidx.appcompat.app.AppCompatActivity;

import com.chopcode.trasnportenataga_laplata.R;

public class SplashActivity extends AppCompatActivity {

    private static final long SPLASH_DURATION = 2000; // 2 segundos

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash);

        // Referencia al logo
        ImageView logo = findViewById(R.id.logo_splash);
        
        // Cargar y aplicar la animación
        Animation anim = AnimationUtils.loadAnimation(this, R.anim.splash_animation);
        logo.startAnimation(anim);

        // Opcional: Verificar si ya hay sesión iniciada
        verificarSesionYRedirigir();
    }

    private void verificarSesionYRedirigir() {
        new Handler(Looper.getMainLooper()).postDelayed(new Runnable() {
            @Override
            public void run() {
                // Aquí puedes verificar si el usuario ya tiene sesión iniciada
                // Por ejemplo, usando SharedPreferences o Firebase Auth

                boolean sesionIniciada = false; // Cambia esto según tu lógica

                Intent intent;
                if (sesionIniciada) {
                    // Si ya inició sesión, ir directamente a la actividad correspondiente
                    // Puedes verificar si es conductor o pasajero
                    String tipoUsuario = "pasajero"; // Obtén esto de tus preferencias

                    if ("conductor".equals(tipoUsuario)) {
                        intent = new Intent(SplashActivity.this,
                                com.chopcode.trasnportenataga_laplata.activities.driver.InicioConductorActivity.class);
                    } else {
                        intent = new Intent(SplashActivity.this,
                                com.chopcode.trasnportenataga_laplata.activities.passenger.InicioUsuariosActivity.class);
                    }
                } else {
                    // Si no hay sesión, ir al login
                    intent = new Intent(SplashActivity.this, InicioDeSesionActivity.class);
                }

                startActivity(intent);
                overridePendingTransition(R.anim.fade_in, R.anim.fade_out);
                finish(); // Cerrar SplashActivity
            }
        }, SPLASH_DURATION);
    }
}
package com.chopcode.rutago.app.activities.common;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.view.View;
import android.widget.ImageView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProvider;

import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.activities.driver.DriverHomeActivity;
import com.chopcode.rutago.app.activities.passenger.PassengerHomeActivity;
import com.chopcode.rutago.app.viewmodels.common.SplashViewModel;

/**
 * Splash Activity
 *
 * Punto de entrada visual y lógico de la aplicación.
 * Responsabilidades:
 * - Implementar la experiencia Edge-to-Edge nativa de Android 15.
 * - Ejecutar la coreografía de Branding (Animaciones premium de Splash).
 * - Orquestar el enrutamiento inicial basado en el estado de la sesión y el rol del usuario.
 * - Determinar si el usuario debe ver el Onboarding, el Login o ir directamente a su Dashboard.
 */
public class SplashActivity extends AppCompatActivity {

    private static final String TAG = "SplashActivity";
    private static final long SPLASH_DURATION = 2000;

    private SplashViewModel viewModel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        EdgeToEdge.enable(this);
        super.onCreate(savedInstanceState);
        Log.d(TAG, "🚀 Iniciando Splash Screen");
        setContentView(R.layout.activity_splash);

        viewModel = new ViewModelProvider(this).get(SplashViewModel.class);
        setupBrandingAnimation();
        setupObservers();
        startEntryFlow();
    }

    /**
     * Lanza la secuencia de animaciones escalonadas para el logo corporativo.
     */
    private void setupBrandingAnimation() {
        View pinContainer = findViewById(R.id.card_logo_splash);
        ImageView logo = findViewById(R.id.logo_splash);
        View poweredBy = findViewById(R.id.layout_powered_by);
        
        if (pinContainer != null && logo != null) {
            com.chopcode.rutago.app.utils.ui.UIAnimationUtils.playSophisticatedSplashAnimation(pinContainer, logo, poweredBy);
        }
    }

    /**
     * Observa el destino de navegación resuelto por el ViewModel tras validar Firebase Auth.
     */
    private void setupObservers() {
        viewModel.getNavigationTarget().observe(this, target -> {
            if (target != null) redirectToTarget(target);
        });
    }

    /**
     * Inicia el temporizador de permanencia del Splash antes de disparar la validación de sesión.
     */
    private void startEntryFlow() {
        new Handler(Looper.getMainLooper()).postDelayed(() -> viewModel.checkSessionStatus(), SPLASH_DURATION);
    }

    /**
     * Ejecuta la navegación hacia la pantalla de destino con transiciones personalizadas.
     * @param target Identificador del rol o estado (ej: "driver", "passenger", "none").
     */
    private void redirectToTarget(String target) {
        Intent intent;
        com.chopcode.rutago.app.managers.core.settings.SessionManager sessionManager = new com.chopcode.rutago.app.managers.core.settings.SessionManager(this);

        switch (target.toLowerCase()) {
            case "driver":
            case "conductor":
                intent = new Intent(this, DriverHomeActivity.class);
                break;
            case "passenger":
            case "pasajero":
            case "usuario":
                intent = new Intent(this, PassengerHomeActivity.class);
                break;
            default:
                // Si no hay sesión, decidimos entre Onboarding (primera vez) o Login.
                if (sessionManager.isFirstTimeLaunch()) {
                    intent = new Intent(this, OnboardingActivity.class);
                } else {
                    intent = new Intent(this, LoginActivity.class);
                }
                break;
        }
        startActivity(intent);
        overridePendingTransition(R.anim.fade_in, R.anim.fade_out);
        finish();
    }
}

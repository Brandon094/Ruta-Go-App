package com.chopcode.rutago.app.activities.common;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.view.View;
import android.widget.ImageView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProvider;

import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.activities.driver.DriverHomeActivity;
import com.chopcode.rutago.app.activities.passenger.PassengerHomeActivity;
import com.chopcode.rutago.app.viewmodels.common.SplashViewModel;

/**
 * 🚀 Splash Activity
 */
public class SplashActivity extends AppCompatActivity {

    private static final String TAG = "SplashActivity";
    private static final long SPLASH_DURATION = 2000;

    private SplashViewModel viewModel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.d(TAG, "🚀 Starting Splash Screen");
        setContentView(R.layout.activity_splash);

        viewModel = new ViewModelProvider(this).get(SplashViewModel.class);
        setupBrandingAnimation();
        setupObservers();
        startEntryFlow();
    }

    private void setupBrandingAnimation() {
        View pinContainer = findViewById(R.id.card_logo_splash);
        ImageView logo = findViewById(R.id.logo_splash);
        View poweredBy = findViewById(R.id.layout_powered_by);
        
        if (pinContainer != null && logo != null) {
            com.chopcode.rutago.app.utils.ui.UIAnimationUtils.playSophisticatedSplashAnimation(pinContainer, logo, poweredBy);
        }
    }

    private void setupObservers() {
        viewModel.getNavigationTarget().observe(this, target -> {
            if (target != null) redirectToTarget(target);
        });
    }

    private void startEntryFlow() {
        new Handler(Looper.getMainLooper()).postDelayed(() -> viewModel.checkSessionStatus(), SPLASH_DURATION);
    }

    private void redirectToTarget(String target) {
        Intent intent;
        com.chopcode.rutago.app.managers.settings.SessionManager sessionManager = new com.chopcode.rutago.app.managers.settings.SessionManager(this);

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

package com.chopcode.rutago.app.activities.common;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.viewpager2.widget.ViewPager2;
import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.adapters.onboarding.OnboardingAdapter;
import com.chopcode.rutago.app.managers.core.settings.SessionManager;
import com.chopcode.rutago.app.models.onboarding.OnboardingItem;
import com.google.android.material.button.MaterialButton;
import com.google.android.material.tabs.TabLayoutMediator;
import java.util.ArrayList;
import java.util.List;

public class OnboardingActivity extends AppCompatActivity {

    private OnboardingAdapter onboardingAdapter;
    private ViewPager2 viewPager;
    private MaterialButton btnNext, btnSkip;
    private SessionManager sessionManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        EdgeToEdge.enable(this);
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_onboarding);

        sessionManager = new SessionManager(this);
        
        viewPager = findViewById(R.id.viewPagerOnboarding);
        btnNext = findViewById(R.id.btnNext);
        btnSkip = findViewById(R.id.btnSkip);

        setupInsets();
        setupOnboardingItems();
        viewPager.setAdapter(onboardingAdapter);
        
        new TabLayoutMediator(findViewById(R.id.tabLayoutIndicator), viewPager, (tab, position) -> {}).attach();

        viewPager.registerOnPageChangeCallback(new ViewPager2.OnPageChangeCallback() {
            @Override
            public void onPageSelected(int position) {
                super.onPageSelected(position);
                if (position == onboardingAdapter.getItemCount() - 1) {
                    btnNext.setText(R.string.comenzar);
                } else {
                    btnNext.setText(R.string.siguiente);
                }
            }
        });

        btnNext.setOnClickListener(v -> {
            if (viewPager.getCurrentItem() + 1 < onboardingAdapter.getItemCount()) {
                viewPager.setCurrentItem(viewPager.getCurrentItem() + 1);
            } else {
                finishOnboarding();
            }
        });

        btnSkip.setOnClickListener(v -> finishOnboarding());
    }

    private void setupOnboardingItems() {
        List<OnboardingItem> onboardingItems = new ArrayList<>();

        onboardingItems.add(new OnboardingItem(
                R.drawable.ic_bus,
                getString(R.string.onboarding_title_1),
                getString(R.string.onboarding_desc_1)
        ));

        onboardingItems.add(new OnboardingItem(
                R.drawable.ic_seat,
                getString(R.string.onboarding_title_2),
                getString(R.string.onboarding_desc_2)
        ));

        onboardingItems.add(new OnboardingItem(
                R.drawable.ic_check,
                getString(R.string.onboarding_title_3),
                getString(R.string.onboarding_desc_3)
        ));

        onboardingAdapter = new OnboardingAdapter(onboardingItems);
    }

    /**
     * Gestiona los insets del sistema para evitar superposiciones con las barras de estado y navegación.
     */
    private void setupInsets() {
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.layoutBottom), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            if (v.getLayoutParams() instanceof ViewGroup.MarginLayoutParams) {
                ViewGroup.MarginLayoutParams params = (ViewGroup.MarginLayoutParams) v.getLayoutParams();
                params.bottomMargin = systemBars.bottom;
                v.setLayoutParams(params);
            }
            return insets;
        });
    }

    private void finishOnboarding() {
        sessionManager.setFirstTimeLaunch(false);
        startActivity(new Intent(this, LoginActivity.class));
        finish();
    }
}

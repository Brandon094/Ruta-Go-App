package com.chopcode.rutago.app.activities.driver;

import android.content.Intent;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.viewpager2.widget.ViewPager2;
import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.adapters.onboarding.OnboardingAdapter;
import com.chopcode.rutago.app.managers.settings.SessionManager;
import com.chopcode.rutago.app.models.onboarding.OnboardingItem;
import com.google.android.material.button.MaterialButton;
import com.google.android.material.tabs.TabLayoutMediator;
import java.util.ArrayList;
import java.util.List;

public class DriverOnboardingActivity extends AppCompatActivity {

    private OnboardingAdapter onboardingAdapter;
    private ViewPager2 viewPager;
    private MaterialButton btnNext, btnSkip;
    private SessionManager sessionManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_onboarding);

        sessionManager = new SessionManager(this);
        
        viewPager = findViewById(R.id.viewPagerOnboarding);
        btnNext = findViewById(R.id.btnNext);
        btnSkip = findViewById(R.id.btnSkip);

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
                R.drawable.ic_seat,
                getString(R.string.driver_onboarding_title_1),
                getString(R.string.driver_onboarding_desc_1)
        ));

        onboardingItems.add(new OnboardingItem(
                R.drawable.ic_checklist,
                getString(R.string.driver_onboarding_title_2),
                getString(R.string.driver_onboarding_desc_2)
        ));

        onboardingItems.add(new OnboardingItem(
                R.drawable.ic_stast,
                getString(R.string.driver_onboarding_title_3),
                getString(R.string.driver_onboarding_desc_3)
        ));

        onboardingAdapter = new OnboardingAdapter(onboardingItems);
    }

    private void finishOnboarding() {
        sessionManager.setFirstTimeDriver(false);
        finish(); // Volver al Home del Conductor que lo llamó
    }
}

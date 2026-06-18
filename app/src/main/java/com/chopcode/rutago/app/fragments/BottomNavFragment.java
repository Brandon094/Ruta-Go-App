package com.chopcode.rutago.app.fragments;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;

import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.activities.driver.DriverHomeActivity;
import com.chopcode.rutago.app.activities.driver.history.DriverHistoryActivity;
import com.chopcode.rutago.app.activities.driver.profile.DriverProfileActivity;
import com.chopcode.rutago.app.activities.passenger.history.ReservationHistoryActivity;
import com.chopcode.rutago.app.activities.passenger.PassengerHomeActivity;
import com.chopcode.rutago.app.activities.passenger.profile.UserProfileActivity;
import com.chopcode.rutago.app.viewmodels.common.BottomNavViewModel;
import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.google.android.material.dialog.MaterialAlertDialogBuilder;

/**
 * 🧭 BottomNavFragment
 * 
 * Fragmento que gestiona la barra de navegación inferior en toda la aplicación.
 * Migrado a MVVM para la gestión de lógica de negocio (ej. logout).
 */
public class BottomNavFragment extends Fragment {

    private static final String TAG = "BottomNavFragment";
    private boolean isDriver = false;
    private BottomNavViewModel viewModel;
    private BottomNavigationView navView;

    public static BottomNavFragment newInstance(boolean isDriver) {
        BottomNavFragment fragment = new BottomNavFragment();
        Bundle args = new Bundle();
        args.putBoolean("isDriver", isDriver);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            isDriver = getArguments().getBoolean("isDriver");
        }
        viewModel = new ViewModelProvider(this).get(BottomNavViewModel.class);
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_bottom_nav, container, false);
        navView = view.findViewById(R.id.bottomNavigationView);

        setupNavigation(navView);
        observeViewModel();
        return view;
    }

    private void observeViewModel() {
        viewModel.getLogoutSuccess().observe(getViewLifecycleOwner(), success -> {
            if (Boolean.TRUE.equals(success) && getActivity() != null) {
                getActivity().finishAffinity();
            }
        });
    }

    @Override
    public void onStart() {
        super.onStart();
        // ✅ Forzar la selección correcta cada vez que el fragmento se hace visible
        if (navView != null) {
            setSelectedMenu(navView);
        }
    }

    private void setupNavigation(BottomNavigationView navView) {
        navView.setOnItemSelectedListener(item -> {
            int id = item.getItemId();
            int currentId = navView.getSelectedItemId();
            
            if (id == currentId) return false;

            if (id == R.id.nav_home) {
                navigateToHome();
                return true;
            } else if (id == R.id.nav_history) {
                navigateToHistory();
                return true;
            } else if (id == R.id.nav_profile) {
                navigateToProfile();
                return true;
            } else if (id == R.id.nav_logout) {
                showLogoutConfirmation();
                return false;
            }
            return false;
        });
    }

    private void setSelectedMenu(BottomNavigationView navView) {
        if (getActivity() == null) return;
        
        navView.setOnItemSelectedListener(null); // Evitar disparar navegación al setear

        // ✅ USAR INSTANCEOF PARA SINCRONIZACIÓN 100% REAL
        if (getActivity() instanceof PassengerHomeActivity || getActivity() instanceof DriverHomeActivity) {
            navView.setSelectedItemId(R.id.nav_home);
        } else if (getActivity() instanceof ReservationHistoryActivity || getActivity() instanceof DriverHistoryActivity) {
            navView.setSelectedItemId(R.id.nav_history);
        } else if (getActivity() instanceof UserProfileActivity || getActivity() instanceof DriverProfileActivity) {
            navView.setSelectedItemId(R.id.nav_profile);
        }

        setupNavigation(navView); // Restaurar listener
    }

    private void navigateToHome() {
        if (getActivity() instanceof DriverHomeActivity || getActivity() instanceof PassengerHomeActivity) return;
        
        Intent intent = new Intent(getActivity(), isDriver ? DriverHomeActivity.class : PassengerHomeActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        startActivity(intent);
        applyInstantTransition();
    }

    private void navigateToHistory() {
        if (getActivity() instanceof DriverHistoryActivity || getActivity() instanceof ReservationHistoryActivity) return;

        Intent intent = new Intent(getActivity(), isDriver ? DriverHistoryActivity.class : ReservationHistoryActivity.class);
        startActivity(intent);
        applyInstantTransition();
    }

    private void navigateToProfile() {
        if (getActivity() instanceof DriverProfileActivity || getActivity() instanceof UserProfileActivity) return;

        Intent intent = new Intent(getActivity(), isDriver ? DriverProfileActivity.class : UserProfileActivity.class);
        startActivity(intent);
        applyInstantTransition();
    }

    /**
     * ✅ EFECTO DUOLINGO: Quita la animación de la actividad para que la barra parezca fija.
     */
    private void applyInstantTransition() {
        if (getActivity() != null) {
            getActivity().overridePendingTransition(0, 0);
        }
    }

    private void showLogoutConfirmation() {
        View dialogView = LayoutInflater.from(getContext()).inflate(R.layout.dialog_logout, null);

        new MaterialAlertDialogBuilder(getContext(), R.style.AppDialogTheme)
                .setView(dialogView)
                .setPositiveButton("Cerrar Sesión", (dialog, which) -> viewModel.logout(getActivity()))
                .setNegativeButton("Volver", null)
                .show();
    }
}

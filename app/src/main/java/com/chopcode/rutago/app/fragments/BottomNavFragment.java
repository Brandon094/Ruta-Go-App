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

import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.activities.driver.editProfile.EditarPerfilConductorActivity;
import com.chopcode.rutago.app.activities.passenger.editProfile.EditarPerfilActivity;
import com.chopcode.rutago.app.activities.driver.InicioConductorActivity;
import com.chopcode.rutago.app.activities.driver.history.HistorialConductorActivity;
import com.chopcode.rutago.app.activities.driver.profile.PerfilConductorActivity;
import com.chopcode.rutago.app.activities.passenger.history.HistorialReservasActivity;
import com.chopcode.rutago.app.activities.passenger.InicioUsuariosActivity;
import com.chopcode.rutago.app.activities.passenger.profile.PerfilUsuarioActivity;
import com.chopcode.rutago.app.managers.auths.AuthManager;
import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.google.android.material.dialog.MaterialAlertDialogBuilder;

public class BottomNavFragment extends Fragment {

    private static final String TAG = "BottomNavFragment";
    private boolean isDriver = false;
    private AuthManager authManager;

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
        authManager = AuthManager.getInstance();
        if (getArguments() != null) {
            isDriver = getArguments().getBoolean("isDriver");
        }
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_bottom_nav, container, false);
        BottomNavigationView navView = view.findViewById(R.id.bottomNavigationView);

        setupNavigation(navView);
        setSelectedMenu(navView);

        return view;
    }

    private void setupNavigation(BottomNavigationView navView) {
        navView.setOnItemSelectedListener(item -> {
            int id = item.getItemId();
            int currentId = navView.getSelectedItemId();
            
            if (id == currentId) return false;

            // Determinar dirección de la animación
            int currentPos = getMenuPosition(currentId);
            int targetPos = getMenuPosition(id);
            boolean slideRight = targetPos > currentPos;

            if (id == R.id.nav_home) {
                navigateToHome(slideRight);
                return true;
            } else if (id == R.id.nav_history) {
                navigateToHistory(slideRight);
                return true;
            } else if (id == R.id.nav_profile) {
                navigateToProfile(slideRight);
                return true;
            } else if (id == R.id.nav_logout) {
                showLogoutConfirmation();
                return false;
            }
            return false;
        });
    }

    private int getMenuPosition(int id) {
        if (id == R.id.nav_home) return 0;
        if (id == R.id.nav_history) return 1;
        if (id == R.id.nav_profile) return 2;
        return 0;
    }

    private void setSelectedMenu(BottomNavigationView navView) {
        String currentActivity = getActivity().getClass().getSimpleName();
        Log.d(TAG, "📍 setSelectedMenu - Actividad actual: " + currentActivity);

        // Remover temporalmente el listener para evitar bucles de navegación
        navView.setOnItemSelectedListener(null);

        if (currentActivity.contains("Inicio")) {
            navView.setSelectedItemId(R.id.nav_home);
        } else if (currentActivity.contains("Historial")) {
            navView.setSelectedItemId(R.id.nav_history);
        } else if (currentActivity.contains("Perfil") && !currentActivity.contains("Editar")) {
            navView.setSelectedItemId(R.id.nav_profile);
        } else if (currentActivity.contains("Editar")) {
            navView.setSelectedItemId(R.id.nav_profile);
        }

        // Reestablecer el listener
        setupNavigation(navView);
    }

    private void navigateToHome(boolean slideRight) {
        if (getActivity() instanceof InicioConductorActivity || getActivity() instanceof InicioUsuariosActivity) return;
        
        Intent intent;
        if (isDriver) {
            intent = new Intent(getActivity(), InicioConductorActivity.class);
        } else {
            intent = new Intent(getActivity(), InicioUsuariosActivity.class);
        }
        intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        startActivity(intent);
        applyTransition(slideRight);
    }

    private void navigateToHistory(boolean slideRight) {
        if (getActivity() instanceof HistorialConductorActivity || getActivity() instanceof HistorialReservasActivity) return;

        Intent intent;
        if (isDriver) {
            intent = new Intent(getActivity(), HistorialConductorActivity.class);
        } else {
            intent = new Intent(getActivity(), HistorialReservasActivity.class);
        }
        startActivity(intent);
        applyTransition(slideRight);
    }

    private void navigateToProfile(boolean slideRight) {
        if (getActivity() instanceof PerfilConductorActivity || getActivity() instanceof PerfilUsuarioActivity) return;

        Intent intent;
        if (isDriver) {
            intent = new Intent(getActivity(), PerfilConductorActivity.class);
        } else {
            intent = new Intent(getActivity(), PerfilUsuarioActivity.class);
        }
        startActivity(intent);
        applyTransition(slideRight);
    }

    private void applyTransition(boolean slideRight) {
        if (getActivity() == null) return;
        if (slideRight) {
            getActivity().overridePendingTransition(R.anim.slide_in_right, R.anim.slide_out_left);
        } else {
            getActivity().overridePendingTransition(R.anim.slide_in_left, R.anim.slide_out_right);
        }
    }

    private void showLogoutConfirmation() {
        View dialogView = LayoutInflater.from(getContext()).inflate(R.layout.dialog_logout, null);

        new MaterialAlertDialogBuilder(getContext(), R.style.AppDialogTheme)
                .setView(dialogView)
                .setPositiveButton("Cerrar Sesión", (dialog, which) -> {
                    authManager.signOut(getActivity());
                    getActivity().finishAffinity();
                })
                .setNegativeButton("Volver", null)
                .show();
    }
}

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

    private BottomNavigationView navView;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_bottom_nav, container, false);
        navView = view.findViewById(R.id.bottomNavigationView);

        setupNavigation(navView);
        return view;
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
        if (getActivity() instanceof InicioUsuariosActivity || getActivity() instanceof InicioConductorActivity) {
            navView.setSelectedItemId(R.id.nav_home);
        } else if (getActivity() instanceof HistorialReservasActivity || getActivity() instanceof HistorialConductorActivity) {
            navView.setSelectedItemId(R.id.nav_history);
        } else if (getActivity() instanceof PerfilUsuarioActivity || getActivity() instanceof PerfilConductorActivity) {
            navView.setSelectedItemId(R.id.nav_profile);
        }

        setupNavigation(navView); // Restaurar listener
    }

    private void navigateToHome() {
        if (getActivity() instanceof InicioConductorActivity || getActivity() instanceof InicioUsuariosActivity) return;
        
        Intent intent = new Intent(getActivity(), isDriver ? InicioConductorActivity.class : InicioUsuariosActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        startActivity(intent);
        applyInstantTransition();
    }

    private void navigateToHistory() {
        if (getActivity() instanceof HistorialConductorActivity || getActivity() instanceof HistorialReservasActivity) return;

        Intent intent = new Intent(getActivity(), isDriver ? HistorialConductorActivity.class : HistorialReservasActivity.class);
        startActivity(intent);
        applyInstantTransition();
    }

    private void navigateToProfile() {
        if (getActivity() instanceof PerfilConductorActivity || getActivity() instanceof PerfilUsuarioActivity) return;

        Intent intent = new Intent(getActivity(), isDriver ? PerfilConductorActivity.class : PerfilUsuarioActivity.class);
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
                .setPositiveButton("Cerrar Sesión", (dialog, which) -> {
                    authManager.signOut(getActivity());
                    getActivity().finishAffinity();
                })
                .setNegativeButton("Volver", null)
                .show();
    }
}

package com.chopcode.trasnportenataga_laplata.activities.driver.profile;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import com.chopcode.trasnportenataga_laplata.R;
import com.chopcode.trasnportenataga_laplata.activities.driver.history.HistorialConductorActivity;
import com.chopcode.trasnportenataga_laplata.activities.driver.InicioConductorActivity;
import com.chopcode.trasnportenataga_laplata.activities.driver.editProfile.EditarPerfilConductorActivity;
import com.chopcode.trasnportenataga_laplata.config.MyApp;
import com.chopcode.trasnportenataga_laplata.managers.auths.AuthManager;
import com.chopcode.trasnportenataga_laplata.models.Vehiculo;
import com.chopcode.trasnportenataga_laplata.fragments.BottomNavFragment;
import com.chopcode.trasnportenataga_laplata.services.user.UserService;
import com.chopcode.trasnportenataga_laplata.services.reservations.VehiculoService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PerfilConductorActivity extends AppCompatActivity {
    private TextView tvConductor, tvEmail, tvTelefono, tvPlaca, tvModVehiculo, tvCapacidad, tvAnioVehiculo;
    private View cardInicio; 
    private com.google.android.material.button.MaterialButton btnEditarPerfil;
    private UserService userService;
    private VehiculoService vehiculoService;
    private AuthManager authManager;
    private static final String TAG = "PerfilConductor";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_perfil_conductor);

        // Inicializar servicios
        userService = new UserService();
        vehiculoService = new VehiculoService();
        authManager = AuthManager.getInstance();

        // Verificar autenticación
        if (!authManager.isUserLoggedIn()) {
            authManager.redirectToLogin(this);
            finish();
            return;
        }

        inicializarVistas();
        cargarInfoConductorCompleta();
        setupBottomNavigation();
    }

    private void setupBottomNavigation() {
        getSupportFragmentManager().beginTransaction()
                .replace(R.id.bottom_nav_container, BottomNavFragment.newInstance(true))
                .commit();
    }

    private void inicializarVistas() {
        // TextViews de información personal
        tvConductor = findViewById(R.id.tvNombreUsuario);
        tvEmail = findViewById(R.id.tvEmail);
        tvTelefono = findViewById(R.id.tvPhone);

        // TextViews de información del vehículo
        tvPlaca = findViewById(R.id.tvPlacaVehiculo);
        tvModVehiculo = findViewById(R.id.tvModeloVehiculo);
        tvCapacidad = findViewById(R.id.tvCapacidadVehiculo);
        tvAnioVehiculo = findViewById(R.id.tvAnioVehiculo);

        // Botones y acciones
        cardInicio = findViewById(R.id.cardInicio);
        btnEditarPerfil = findViewById(R.id.btnEditarPerfil);

        if (cardInicio != null) cardInicio.setOnClickListener(view -> irInicioConductor());
        if (btnEditarPerfil != null) btnEditarPerfil.setOnClickListener(v -> irEditarPerfil());

        // Configurar navegación
        setupBottomNavigation();
    }

    /**
     * Método unificado para cargar toda la información del conductor, usuario y vehículo
     */
    private void cargarInfoConductorCompleta() {
        String userId = authManager.getUserId();
        if (userId == null) {
            Toast.makeText(this, "Error: Usuario no autenticado", Toast.LENGTH_SHORT).show();
            mostrarDatosPorDefecto();
            return;
        }

        // CARGAR TODO EN PARALELO: conductor + usuario + vehículo
        userService.loadDriverData(userId, new UserService.DriverDataCallback() {
            @Override
            public void onDriverDataLoaded(String nombre, String telefono, String placaVehiculo, String modelo, List<String> horariosAsignados) {
                // CARGAR DATOS DE USUARIO (email) EN PARALELO
                cargarDatosUsuarioYCompletar(nombre, telefono, placaVehiculo, userId);
            }

            @Override
            public void onError(String error) {
                runOnUiThread(() -> {
                    Log.e(TAG, "Error cargando conductor: " + error);
                    Toast.makeText(PerfilConductorActivity.this, "Error al cargar datos del conductor", Toast.LENGTH_SHORT).show();
                    cargarSoloDatosUsuario(userId);
                });
            }
        });
    }

    private void cargarDatosUsuarioYCompletar(String nombreConductor, String telefonoConductor, String placaVehiculo, String userId) {
        userService.loadUserData(userId, new UserService.UserDataCallback() {
            @Override
            public void onUserDataLoaded(com.chopcode.trasnportenataga_laplata.models.Usuario usuario) {
                runOnUiThread(() -> {
                    actualizarUICompleta(nombreConductor, telefonoConductor, placaVehiculo, usuario);

                    if (placaVehiculo != null && !placaVehiculo.isEmpty()) {
                        cargarInformacionVehiculo(placaVehiculo);
                    } else {
                        mostrarVehiculoNoDisponible();
                    }
                });
            }

            @Override
            public void onError(String error) {
                runOnUiThread(() -> {
                    Log.e(TAG, "Error cargando usuario: " + error);
                    actualizarUIConDatosMinimos(nombreConductor, telefonoConductor, placaVehiculo);

                    if (placaVehiculo != null && !placaVehiculo.isEmpty()) {
                        cargarInformacionVehiculo(placaVehiculo);
                    } else {
                        mostrarVehiculoNoDisponible();
                    }
                });
            }
        });
    }

    private void actualizarUICompleta(String nombre, String telefono, String placa, com.chopcode.trasnportenataga_laplata.models.Usuario usuario) {
        tvConductor.setText(nombre != null ? nombre : "Conductor");

        String telefonoFinal = telefono != null ? telefono :
                (usuario.getTelefono() != null ? usuario.getTelefono() : "No disponible");
        tvTelefono.setText(telefonoFinal);

        String emailFinal = usuario.getEmail() != null ? usuario.getEmail() :
                (authManager.getCurrentUser() != null ? authManager.getCurrentUser().getEmail() : "No disponible");
        tvEmail.setText(emailFinal);

        tvPlaca.setText(placa != null ? placa : "No asignado");
    }

    private void actualizarUIConDatosMinimos(String nombre, String telefono, String placa) {
        tvConductor.setText(nombre != null ? nombre : "Conductor");
        tvTelefono.setText(telefono != null ? telefono : "No disponible");
        tvPlaca.setText(placa != null ? placa : "No asignado");

        if (authManager.getCurrentUser() != null) {
            tvEmail.setText(authManager.getCurrentUser().getEmail());
        } else {
            tvEmail.setText("No disponible");
        }
    }

    private void cargarSoloDatosUsuario(String userId) {
        userService.loadUserData(userId, new UserService.UserDataCallback() {
            @Override
            public void onUserDataLoaded(com.chopcode.trasnportenataga_laplata.models.Usuario usuario) {
                runOnUiThread(() -> {
                    tvConductor.setText("Conductor");
                    tvTelefono.setText(usuario.getTelefono() != null ? usuario.getTelefono() : "No disponible");
                    tvEmail.setText(usuario.getEmail() != null ? usuario.getEmail() : "No disponible");
                    tvPlaca.setText("No asignado");
                    mostrarVehiculoNoDisponible();
                });
            }

            @Override
            public void onError(String error) {
                runOnUiThread(() -> {
                    mostrarDatosPorDefecto();
                });
            }
        });
    }

    private void mostrarDatosPorDefecto() {
        tvConductor.setText("Conductor");
        tvTelefono.setText("No disponible");
        tvPlaca.setText("No asignado");

        if (authManager.getCurrentUser() != null) {
            tvEmail.setText(authManager.getCurrentUser().getEmail());
        } else {
            tvEmail.setText("No disponible");
        }

        mostrarVehiculoNoDisponible();
    }

    private void cargarInformacionVehiculo(String placa) {
        vehiculoService.obtenerVehiculoPorPlaca(placa, new VehiculoService.VehiculoCallback() {
            @Override
            public void onVehiculoCargado(Vehiculo vehiculo) {
                runOnUiThread(() -> {
                    if (vehiculo != null) {
                        tvPlaca.setText(vehiculo.getPlaca() != null ? vehiculo.getPlaca() : "No disponible");
                        tvModVehiculo.setText(vehiculo.getModelo() != null ? vehiculo.getModelo() : "No disponible");
                        tvCapacidad.setText(String.valueOf(vehiculo.getCapacidad()));

                        if (vehiculo.getAno() != null && !vehiculo.getAno().isEmpty()) {
                            tvAnioVehiculo.setText(vehiculo.getAno());
                        } else {
                            tvAnioVehiculo.setText("N/A");
                        }
                    } else {
                        mostrarVehiculoBasico(placa);
                    }
                });
            }

            @Override
            public void onError(String error) {
                runOnUiThread(() -> {
                    Log.e(TAG, "Error cargando vehículo: " + error);
                    mostrarVehiculoBasico(placa);
                });
            }
        });
    }

    private void mostrarVehiculoBasico(String placa) {
        tvPlaca.setText(placa);
        tvModVehiculo.setText("Información no disponible");
        tvCapacidad.setText("N/A");
        tvAnioVehiculo.setText("N/A");
    }

    private void mostrarVehiculoNoDisponible() {
        tvPlaca.setText("No asignado");
        tvCapacidad.setText("N/A");
        tvModVehiculo.setText("No asignado");
        tvAnioVehiculo.setText("N/A");
    }

    public void irEditarPerfil(){
        Intent intent = new Intent(PerfilConductorActivity.this, EditarPerfilConductorActivity.class);
        startActivity(intent);
    }

    public void irInicioConductor(){
        Intent intent = new Intent(PerfilConductorActivity.this, InicioConductorActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        startActivity(intent);
        finish();
    }

    @Override
    protected void onResume() {
        super.onResume();
        cargarInfoConductorCompleta();
    }
}
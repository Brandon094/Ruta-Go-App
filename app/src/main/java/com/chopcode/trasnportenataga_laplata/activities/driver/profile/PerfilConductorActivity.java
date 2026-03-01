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
import com.chopcode.trasnportenataga_laplata.services.user.UserService;
import com.chopcode.trasnportenataga_laplata.services.reservations.VehiculoService;
import com.google.android.material.card.MaterialCardView;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PerfilConductorActivity extends AppCompatActivity {
    private TextView tvConductor, tvEmail, tvTelefono, tvPlaca, tvModVehiculo, tvCapacidad, tvAnioVehiculo;
    private MaterialCardView cardEditarPerfil, cardHistorialViajes, cardDisponibilidad, cardCerrarSesion;
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
        cargarInfoConductorCompleta(); // ✅ LLAMAR AL MÉTODO CORRECTO
        configurarBotones();
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

        // Cards de botones
        cardEditarPerfil = findViewById(R.id.cardEditarPerfil);
        //cardHistorialViajes = findViewById(R.id.cardHistorialViajes);
        cardDisponibilidad = findViewById(R.id.cardInicio);
        cardCerrarSesion = findViewById(R.id.cardCerrarSesion);
    }

    private void configurarBotones() {
        cardEditarPerfil.setOnClickListener(view -> irEditarPerfil());
        //cardHistorialViajes.setOnClickListener(view -> irHistorialViajes());
        cardDisponibilidad.setOnClickListener(view -> irInicioConductor());

        cardCerrarSesion.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                cardCerrarSesion.animate().scaleX(0.95f).scaleY(0.95f).setDuration(100)
                        .withEndAction(new Runnable() {
                            @Override
                            public void run() {
                                cardCerrarSesion.animate().scaleX(1f).scaleY(1f).setDuration(100).start();
                                mostrarDialogoConfirmacion();
                            }
                        }).start();
            }
        });
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

        // 🔥 CARGAR TODO EN PARALELO: conductor + usuario + vehículo
        userService.loadDriverData(userId, new UserService.DriverDataCallback() {
            @Override
            public void onDriverDataLoaded(String nombre, String telefono, String placaVehiculo, List<String> horariosAsignados) {
                // ✅ CARGAR DATOS DE USUARIO (email) EN PARALELO
                cargarDatosUsuarioYCompletar(nombre, telefono, placaVehiculo, userId);
            }

            @Override
            public void onError(String error) {
                runOnUiThread(() -> {
                    Log.e("PerfilConductor", "Error cargando conductor: " + error);
                    Toast.makeText(PerfilConductorActivity.this, "Error al cargar datos del conductor", Toast.LENGTH_SHORT).show();
                    // Intentar cargar solo datos básicos del usuario como fallback
                    cargarSoloDatosUsuario(userId);
                });
            }
        });
    }

    /**
     * Método unificado que carga datos de usuario y luego completa con vehículo
     */
    private void cargarDatosUsuarioYCompletar(String nombreConductor, String telefonoConductor, String placaVehiculo, String userId) {
        userService.loadUserData(userId, new UserService.UserDataCallback() {
            @Override
            public void onUserDataLoaded(com.chopcode.trasnportenataga_laplata.models.Usuario usuario) {
                runOnUiThread(() -> {
                    // ✅ ACTUALIZAR UI CON TODOS LOS DATOS RECOLECTADOS
                    actualizarUICompleta(nombreConductor, telefonoConductor, placaVehiculo, usuario);

                    // ✅ CARGAR DATOS DEL VEHÍCULO (si existe placa)
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
                    Log.e("PerfilConductor", "Error cargando usuario: " + error);
                    // ✅ USAR DATOS DEL CONDUCTOR COMO FALLBACK
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

    /**
     * Actualizar UI con todos los datos disponibles
     */
    private void actualizarUICompleta(String nombre, String telefono, String placa, com.chopcode.trasnportenataga_laplata.models.Usuario usuario) {
        // ✅ INFORMACIÓN PERSONAL
        tvConductor.setText(nombre != null ? nombre : "Conductor");

        // ✅ TELÉFONO: Prioridad conductor -> usuario -> por defecto
        String telefonoFinal = telefono != null ? telefono :
                (usuario.getTelefono() != null ? usuario.getTelefono() : "No disponible");
        tvTelefono.setText(telefonoFinal);

        // ✅ EMAIL: Prioridad usuario -> auth -> por defecto
        String emailFinal = usuario.getEmail() != null ? usuario.getEmail() :
                (authManager.getCurrentUser() != null ? authManager.getCurrentUser().getEmail() : "No disponible");
        tvEmail.setText(emailFinal);

        // ✅ PLACA DEL VEHÍCULO
        tvPlaca.setText(placa != null ? placa : "No asignado");
    }

    /**
     * Fallback: Actualizar UI solo con datos mínimos del conductor
     */
    private void actualizarUIConDatosMinimos(String nombre, String telefono, String placa) {
        tvConductor.setText(nombre != null ? nombre : "Conductor");
        tvTelefono.setText(telefono != null ? telefono : "No disponible");
        tvPlaca.setText(placa != null ? placa : "No asignado");

        // ✅ EMAIL de fallback desde Auth
        if (authManager.getCurrentUser() != null) {
            tvEmail.setText(authManager.getCurrentUser().getEmail());
        } else {
            tvEmail.setText("No disponible");
        }
    }

    /**
     * Cargar solo datos básicos del usuario como último fallback
     */
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

    /**
     * Mostrar datos por defecto cuando todo falla
     */
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

    /**
     * Cargar información detallada del vehículo por placa
     */
    private void cargarInformacionVehiculo(String placa) {
        vehiculoService.obtenerVehiculoPorPlaca(placa, new VehiculoService.VehiculoCallback() {
            @Override
            public void onVehiculoCargado(Vehiculo vehiculo) {
                runOnUiThread(() -> {
                    if (vehiculo != null) {
                        // ✅ INFORMACIÓN COMPLETA DEL VEHÍCULO
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
                    Log.e("PerfilConductor", "Error cargando vehículo: " + error);
                    mostrarVehiculoBasico(placa);
                });
            }
        });
    }

    /**
     * Mostrar información básica del vehículo cuando no se pueden cargar los detalles
     */
    private void mostrarVehiculoBasico(String placa) {
        tvPlaca.setText(placa);
        tvModVehiculo.setText("Información no disponible");
        tvCapacidad.setText("N/A");
        tvAnioVehiculo.setText("N/A");
    }

    /**
     * Método para mostrar estado cuando no hay vehículo
     */
    private void mostrarVehiculoNoDisponible() {
        tvPlaca.setText("No asignado");
        tvCapacidad.setText("N/A");
        tvModVehiculo.setText("No asignado");
        tvAnioVehiculo.setText("N/A");
    }

    /** Método para mostrar diálogo de confirmación de cierre de sesión */
    private void mostrarDialogoConfirmacion() {
        Log.d(TAG, "💬 Mostrando diálogo de confirmación de cierre de sesión");

        // ✅ Registrar evento de diálogo
        registrarEventoAnalitico("dialogo_cerrar_sesion_mostrado", null, null);

        new androidx.appcompat.app.AlertDialog.Builder(this, R.style.AppDialogTheme)
                .setTitle("Cerrar Sesión")
                .setMessage("¿Estás seguro de que quieres cerrar sesión?")
                .setPositiveButton("Sí", (dialog, which) -> {
                    Log.d(TAG, "✅ Usuario confirmó cierre de sesión");
                    registrarEventoAnalitico("cerrar_sesion_confirmado", null, null);
                    cerrarSesion();
                })
                .setNegativeButton("Cancelar", (dialog, which) -> {
                    Log.d(TAG, "❌ Usuario canceló cierre de sesión");
                    registrarEventoAnalitico("cerrar_sesion_cancelado", null, null);
                    dialog.dismiss();
                })
                .setIcon(R.drawable.ic_logout)
                .show();
    }

    /**
     * ✅ MÉTODO AUXILIAR: Registrar eventos analíticos usando MyApp
     */
    private void registrarEventoAnalitico(String evento, Integer count, Integer count2) {
        try {
            Map<String, Object> params = new HashMap<>();
            params.put("user_id", MyApp.getCurrentUserId());
            params.put("pantalla", "PerfilUsuario");

            if (count != null) {
                params.put("count", count);
            }
            if (count2 != null) {
                params.put("count2", count2);
            }

            params.put("timestamp", System.currentTimeMillis());

            MyApp.logEvent(evento, params);
            Log.d(TAG, "📊 Evento analítico registrado: " + evento);
        } catch (Exception e) {
            Log.e(TAG, "❌ Error registrando evento analítico: " + e.getMessage());
        }
    }

    /**
     * Método para ir a la edición del perfil
     */
    public void irEditarPerfil(){
        Intent intent = new Intent(PerfilConductorActivity.this, EditarPerfilConductorActivity.class);
        startActivity(intent);
    }

    /**
     * Método para ir al historial de viajes
     */
    public void irHistorialViajes(){
        Intent intent = new Intent(PerfilConductorActivity.this, HistorialConductorActivity.class);
        startActivity(intent);
    }

    /**
     * Método para ir al inicio del conductor
     */
    public void irInicioConductor(){
        Intent intent = new Intent(PerfilConductorActivity.this, InicioConductorActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        startActivity(intent);
        finish();
    }

    /**
     * Método para cerrar sesión
     */
    private void cerrarSesion() {
        authManager.signOut(this);
        Toast.makeText(this, "Sesión cerrada", Toast.LENGTH_SHORT).show();
    }

    @Override
    protected void onResume() {
        super.onResume();
        cargarInfoConductorCompleta(); // ✅ LLAMAR AL MÉTODO CORRECTO
    }
}
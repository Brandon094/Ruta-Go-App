package com.chopcode.trasnportenataga_laplata.activities.passenger.profile;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import com.chopcode.trasnportenataga_laplata.R;
import com.chopcode.trasnportenataga_laplata.activities.passenger.history.HistorialReservasActivity;
import com.chopcode.trasnportenataga_laplata.activities.passenger.InicioUsuariosActivity;
import com.chopcode.trasnportenataga_laplata.config.MyApp;
import com.chopcode.trasnportenataga_laplata.managers.auths.AuthManager;
import com.chopcode.trasnportenataga_laplata.fragments.BottomNavFragment;
import com.chopcode.trasnportenataga_laplata.models.Usuario;
import com.chopcode.trasnportenataga_laplata.services.user.UserService;
import com.chopcode.trasnportenataga_laplata.services.reservations.passenger.PassengerReservationService;
import com.google.android.material.card.MaterialCardView;

import java.util.HashMap;
import java.util.Map;

public class PerfilUsuarioActivity extends AppCompatActivity {
    private TextView tvNombre, tvCorreo, tvTelefono;
    private TextView tvTotalGastadoPremium, tvPuntosLealtad, tvRutaFavorita;
    private MaterialCardView cardPremiumStats;
    private com.google.android.material.button.MaterialButton btnEditarPerfil;
    private AuthManager authManager;
    private UserService userService;
    private PassengerReservationService passengerReservationService;

    // ✅ NUEVO: Tag para logs
    private static final String TAG = "PerfilUsuario";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.d(TAG, "🚀 onCreate - Iniciando actividad de perfil de usuario");

        // ✅ Registrar evento analítico de inicio de pantalla
        registrarEventoAnalitico("pantalla_perfil_usuario_inicio", null, null);

        setContentView(R.layout.activity_perfil_pasajero);
        Log.d(TAG, "✅ Layout inflado correctamente");

        // Inicializar servicios
        authManager = AuthManager.getInstance();
        userService = new UserService();
        passengerReservationService = new PassengerReservationService();
        Log.d(TAG, "✅ Servicios inicializados");

        // Verificar si el usuario está logueado usando MyApp
        if (!authManager.isUserLoggedIn()) {
            Log.w(TAG, "⚠️ Usuario no autenticado - redirigiendo a login");

            // ✅ Registrar evento de redirección
            registrarEventoAnalitico("redireccion_login_no_autenticado", null, null);

            authManager.redirectToLogin(this);
            finish();
            return;
        }
        Log.d(TAG, "✅ Usuario autenticado validado");

        // Referencias a elementos de la UI
        inicializarVistas();

        // Cargar los datos del usuario desde Firebase
        cargarInfoUsuario();

        // Configurar navegación
        setupBottomNavigation();

        Log.d(TAG, "✅ Configuración completa - Actividad lista");
    }

    private void setupBottomNavigation() {
        getSupportFragmentManager().beginTransaction()
                .replace(R.id.bottom_nav_container, BottomNavFragment.newInstance(false))
                .commit();
    }

    private void inicializarVistas() {
        Log.d(TAG, "🔧 Inicializando vistas...");

        // TextViews
        tvNombre = findViewById(R.id.tvNombreUsuario);
        tvCorreo = findViewById(R.id.tvEmail);
        tvTelefono = findViewById(R.id.tvPhone);

        // Vistas Premium
        cardPremiumStats = findViewById(R.id.cardPremiumStats);
        tvTotalGastadoPremium = findViewById(R.id.tvTotalGastadoPremium);
        tvPuntosLealtad = findViewById(R.id.tvPuntosLealtad);
        tvRutaFavorita = findViewById(R.id.tvRutaFavorita);

        // Botones Editar perfil
        btnEditarPerfil = findViewById(R.id.btnEditarPerfil);
        if (btnEditarPerfil != null) btnEditarPerfil.setOnClickListener(v -> irAEditarPerfil());

        Log.d(TAG, "✅ Todas las vistas inicializadas correctamente");
    }

    private void irAEditarPerfil() {
        Intent intent = new Intent(this, com.chopcode.trasnportenataga_laplata.activities.passenger.editProfile.EditarPerfilActivity.class);
        startActivity(intent);
    }

    /**
     * Método para obtener la información del usuario usando loadUserData
     */
    private void cargarInfoUsuario() {
        Log.d(TAG, "🔍 Cargando información del usuario...");

        // ✅ Usar MyApp para obtener el ID del usuario
        String userId = MyApp.getCurrentUserId();

        if (userId == null) {
            Log.e(TAG, "❌ UserId es null - no se pueden cargar datos");

            // ✅ Registrar evento de error
            registrarEventoAnalitico("error_userid_null", null, null);

            Toast.makeText(this, "Error: Usuario no autenticado", Toast.LENGTH_SHORT).show();
            return;
        }

        Log.d(TAG, "👤 Cargando datos para userId usando MyApp: " + userId);

        // ✅ Registrar evento de inicio de carga
        registrarEventoAnalitico("carga_datos_usuario_inicio", null, null);

        userService.loadUserData(userId, new UserService.UserDataCallback() {
            @Override
            public void onUserDataLoaded(Usuario usuario) {
                Log.d(TAG, "✅ Datos de usuario cargados exitosamente:");
                Log.d(TAG, "   - Nombre: " + usuario.getNombre());
                Log.d(TAG, "   - Email: " + usuario.getEmail());
                Log.d(TAG, "   - Teléfono: " + usuario.getTelefono());

                // ✅ Registrar evento de carga exitosa
                registrarUsuarioCargadoAnalitico(usuario);

                // Actualizar la UI con los datos del usuario
                runOnUiThread(() -> {
                    if (usuario.getNombre() != null) {
                        tvNombre.setText(usuario.getNombre());
                    } else {
                        tvNombre.setText("Nombre no disponible");
                        Log.w(TAG, "⚠️ Nombre del usuario no disponible");
                    }

                    if (usuario.getTelefono() != null) {
                        tvTelefono.setText(usuario.getTelefono());
                    } else {
                        tvTelefono.setText("Teléfono no disponible");
                        Log.w(TAG, "⚠️ Teléfono del usuario no disponible");
                    }

                    if (usuario.getEmail() != null) {
                        tvCorreo.setText(usuario.getEmail());
                    } else {
                        tvCorreo.setText("Email no disponible");
                        Log.w(TAG, "⚠️ Email del usuario no disponible");
                    }

                    // ✅ CARGAR ESTADÍSTICAS PREMIUM DESPUÉS DE CARGAR USUARIO
                    cargarEstadisticasPremium(userId);

                    Log.d(TAG, "✅ UI actualizada con datos del usuario");
                });
            }

            @Override
            public void onError(String error) {
                Log.e(TAG, "❌ Error cargando datos de usuario: " + error);

                // ✅ Usar MyApp para logging de errores
                MyApp.logError(new Exception("Error cargando datos usuario perfil: " + error));

                // ✅ Registrar evento de error
                registrarEventoAnalitico("error_carga_datos_usuario", null, null);

                runOnUiThread(() -> {
                    Toast.makeText(PerfilUsuarioActivity.this, "Error cargando datos: " + error, Toast.LENGTH_SHORT).show();

                    // Mostrar datos por defecto en caso de error
                    tvNombre.setText("Usuario");
                    tvTelefono.setText("Teléfono no disponible");

                    // ✅ Usar MyApp para obtener email del usuario actual
                    String userEmail = "Email no disponible";
                    if (MyApp.getCurrentUser() != null && MyApp.getCurrentUser().getEmail() != null) {
                        userEmail = MyApp.getCurrentUser().getEmail();
                    }
                    tvCorreo.setText(userEmail);

                    Log.w(TAG, "⚠️ Mostrando datos por defecto debido a error");
                });
            }
        });
    }

    private void cargarEstadisticasPremium(String usuarioId) {
        Log.d(TAG, "💰 Cargando estadísticas premium para: " + usuarioId);

        passengerReservationService.obtenerEstadisticasPremium(usuarioId, new PassengerReservationService.PremiumStatsCallback() {
            @Override
            public void onStatsCalculated(Map<String, Object> stats) {
                runOnUiThread(() -> {
                    if (cardPremiumStats != null) {
                        cardPremiumStats.setVisibility(View.VISIBLE);
                        
                        Double gastado = (Double) stats.get("totalGastado");
                        tvTotalGastadoPremium.setText(formatearPrecio(gastado != null ? gastado : 0.0));
                        
                        Object puntos = stats.get("puntosLealtad");
                        tvPuntosLealtad.setText((puntos != null ? puntos.toString() : "0") + " pts");
                        
                        String favorita = (String) stats.get("rutaMasFrecuente");
                        tvRutaFavorita.setText("Ruta favorita: " + (favorita != null ? favorita : "Calculando..."));
                        
                        Log.d(TAG, "✅ Estadísticas premium actualizadas en UI");
                    }
                });
            }

            @Override
            public void onError(String error) {
                Log.e(TAG, "❌ Error cargando estadísticas premium: " + error);
                runOnUiThread(() -> {
                    if (cardPremiumStats != null) cardPremiumStats.setVisibility(View.GONE);
                });
            }
        });
    }

    private String formatearPrecio(double precio) {
        return String.format("$%,.0f", precio);
    }

    @Override
    public void onBackPressed() {
        Log.d(TAG, "📱 onBackPressed - Volviendo atrás");

        // ✅ Registrar evento de navegación con back button
        registrarEventoAnalitico("navegar_back_button", null, null);

        super.onBackPressed();
        overridePendingTransition(R.anim.slide_in_left, R.anim.slide_out_right);
        Log.d(TAG, "✅ Animación de retroceso aplicada");
    }

    @Override
    protected void onStart() {
        super.onStart();
        Log.d(TAG, "📱 onStart - Actividad visible");
    }

    @Override
    protected void onResume() {
        super.onResume();
        Log.d(TAG, "📱 onResume - Actividad en primer plano");

        // ✅ Registrar evento analítico de resumen
        registrarEventoAnalitico("pantalla_perfil_usuario_resume", null, null);
    }

    @Override
    protected void onPause() {
        super.onPause();
        Log.d(TAG, "📱 onPause - Actividad en segundo plano");
    }

    @Override
    protected void onStop() {
        super.onStop();
        Log.d(TAG, "📱 onStop - Actividad no visible");
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        Log.d(TAG, "📱 onDestroy - Actividad destruida");
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
     * ✅ MÉTODO AUXILIAR: Registrar usuario cargado usando MyApp
     */
    private void registrarUsuarioCargadoAnalitico(Usuario usuario) {
        try {
            Map<String, Object> params = new HashMap<>();
            params.put("user_id", MyApp.getCurrentUserId());
            params.put("user_nombre", usuario.getNombre());
            params.put("user_email", usuario.getEmail());
            params.put("user_telefono", usuario.getTelefono() != null ? usuario.getTelefono() : "N/A");
            params.put("timestamp", System.currentTimeMillis());
            params.put("pantalla", "PerfilUsuario");

            MyApp.logEvent("usuario_cargado_perfil", params);
            Log.d(TAG, "📊 Usuario cargado en perfil registrado en analytics");
        } catch (Exception e) {
            Log.e(TAG, "❌ Error registrando usuario cargado: " + e.getMessage());
        }
    }
}
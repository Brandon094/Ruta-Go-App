package com.chopcode.trasnportenataga_laplata.activities.passenger;

import androidx.appcompat.app.AppCompatActivity;
import androidx.viewpager2.widget.ViewPager2;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.widget.TextView;
import android.widget.Toast;

import com.chopcode.trasnportenataga_laplata.R;
import com.chopcode.trasnportenataga_laplata.activities.passenger.editProfile.EditarPerfilActivity;
import com.chopcode.trasnportenataga_laplata.activities.passenger.profile.PerfilUsuarioActivity;
import com.chopcode.trasnportenataga_laplata.adapters.horarios.HorarioPagerAdapter;
import com.chopcode.trasnportenataga_laplata.config.MyApp;
import com.chopcode.trasnportenataga_laplata.managers.analytics.DashboardAnalyticsHelper;
import com.chopcode.trasnportenataga_laplata.managers.dashboard.passenger.DashboardUIManager;
import com.chopcode.trasnportenataga_laplata.managers.dashboard.passenger.ScheduleManager;
import com.chopcode.trasnportenataga_laplata.managers.dashboard.passenger.UserDashboardManager;
import com.chopcode.trasnportenataga_laplata.models.Horario;
import com.chopcode.trasnportenataga_laplata.models.Usuario;
import com.google.android.material.appbar.MaterialToolbar;
import com.google.android.material.button.MaterialButton;
import com.google.android.material.tabs.TabLayout;

import java.util.List;

/**
 * Actividad principal del dashboard para usuarios.
 * Muestra la información del usuario, contadores (reservas, canceladas, viajes)
 * y los horarios organizados en pestañas (Nataga - La Plata).
 * Utiliza un patrón de Managers para delegar responsabilidades y mantener el código limpio.
 */
public class InicioUsuariosActivity extends AppCompatActivity implements
        UserDashboardManager.DashboardListener,
        ScheduleManager.ScheduleListener,
        DashboardUIManager.UIActionsListener {

    private static final String TAG = "InicioUsuarios";

    // ============================================================
    // Managers (Encapsulan la lógica de negocio y UI)
    // ============================================================
    private DashboardAnalyticsHelper analyticsHelper;    // Para logging y analytics
    private UserDashboardManager dashboardManager;       // Gestiona datos del usuario y contadores
    private ScheduleManager scheduleManager;             // Gestiona la carga de horarios
    private DashboardUIManager uiManager;                // Gestiona la interfaz de usuario y sus interacciones

    // ============================================================
    // Elementos de UI
    // ============================================================
    private TabLayout tabLayout;                          // Pestañas para cambiar entre horarios
    private ViewPager2 viewPagerHorarios;                 // Swipe entre pestañas de horarios
    private HorarioPagerAdapter pagerAdapter;             // Adaptador para el ViewPager

    // ============================================================
    // Ciclo de vida de la Activity
    // ============================================================

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.d(TAG, "🚀 onCreate - Iniciando actividad principal de usuario");

        // 1. Inicializar los managers (primero, porque las vistas los necesitarán)
        initializeManagers();

        // 2. Establecer el layout
        setContentView(R.layout.activity_inicio_usuarios);

        // 3. Inicializar y enlazar las vistas con sus IDs
        initializeViews();

        // 4. Configurar la UI (listeners de botones, toolbar, etc.)
        configureUI();

        // 5. Cargar los datos iniciales (usuario y horarios)
        loadInitialData();
    }

    /**
     * Inicializa todos los managers de la actividad.
     * Se encargan de la lógica de negocio y comunicación con capas de datos.
     */
    private void initializeManagers() {
        analyticsHelper = new DashboardAnalyticsHelper();

        dashboardManager = new UserDashboardManager(this, analyticsHelper);
        dashboardManager.setDashboardListener(this);  // La actividad escucha los eventos del manager

        scheduleManager = new ScheduleManager(analyticsHelper);
        scheduleManager.setScheduleListener(this);    // La actividad escucha los eventos del manager

        uiManager = new DashboardUIManager(analyticsHelper);
        uiManager.setUIActionsListener(this);         // La actividad escucha los clicks de UI
    }

    /**
     * Enlaza las variables con las vistas del layout y configura el ViewPager.
     * Delega al UIManager la referencia de las vistas para que las actualice cuando sea necesario.
     */
    private void initializeViews() {
        // Toolbar
        MaterialToolbar topAppBar = findViewById(R.id.topAppBar);

        // TextViews para mostrar información del usuario y contadores
        TextView tvUserName = findViewById(R.id.tvUserName);
        TextView tvWelcome = findViewById(R.id.tvWelcome);
        TextView tvReservasCount = findViewById(R.id.tvReservasCount);
        TextView tvCanceladsaCount = findViewById(R.id.tvCanceladasCount);
        TextView tvViajesCount = findViewById(R.id.tvTotalCount);

        // Botones de acción
        MaterialButton btnEditarPerfil = findViewById(R.id.btnEditarPerfil);
        MaterialButton btnRefresh = findViewById(R.id.btnRefresh);

        // Pestañas y ViewPager para los horarios
        tabLayout = findViewById(R.id.tabLayout);
        viewPagerHorarios = findViewById(R.id.viewPagerHorarios);

        // Pasar todas las referencias de vistas al UIManager para que las gestione
        uiManager.setViewReferences(
                tvUserName, tvWelcome, tvReservasCount, tvCanceladsaCount, tvViajesCount,
                btnEditarPerfil, btnRefresh
        );
        uiManager.setupToolbar(topAppBar);  // Configurar toolbar (menú, título, etc.)

        // Inicializar el adaptador del ViewPager con las listas de horarios (vacías al inicio)
        pagerAdapter = new HorarioPagerAdapter(
                this,
                scheduleManager.getNatagaSchedules(),   // Lista de horarios Nataga
                scheduleManager.getLaPlataSchedules()    // Lista de horarios La Plata
        );
        viewPagerHorarios.setAdapter(pagerAdapter);

        // Conectar el TabLayout con el ViewPager (para que se sincronicen)
        uiManager.setupTabLayout(tabLayout, viewPagerHorarios);
    }

    /**
     * Configura los listeners de los elementos de UI (botones, etc.)
     * El UIManager se encarga de enlazar los clicks con los callbacks de esta actividad.
     */
    private void configureUI() {
        uiManager.setupButtonListeners();
    }

    /**
     * Inicia la carga de datos iniciales:
     * - Datos del usuario (nombre, etc.)
     * - Contadores (reservas, canceladas, viajes)
     * - Horarios
     */
    private void loadInitialData() {
        dashboardManager.loadUserData();   // Carga usuario y contadores en segundo plano
        scheduleManager.loadSchedules();   // Carga horarios en segundo plano
    }

    // ============================================================
    // Implementación de UserDashboardManager.DashboardListener
    // (Eventos relacionados con datos del usuario)
    // ============================================================

    /**
     * Callback cuando los datos del usuario se han cargado correctamente.
     * @param usuario Objeto Usuario con la información actualizada.
     */
    @Override
    public void onUserDataLoaded(Usuario usuario) {
        runOnUiThread(() -> {
            uiManager.updateUserInfo(usuario);  // Actualiza los TextViews con los datos del usuario
        });
    }

    /**
     * Callback cuando hay un error al cargar los datos del usuario.
     * @param error Mensaje de error.
     */
    @Override
    public void onUserDataError(String error) {
        runOnUiThread(() -> {
            Toast.makeText(this, "Error cargando datos: " + error, Toast.LENGTH_SHORT).show();
        });
    }

    /**
     * Callback cuando los contadores se han cargado correctamente.
     * @param reservasCount Número de reservas activas.
     * @param canceladasCount Número de reservas canceladas.
     * @param viajesCount Número total de viajes realizados.
     */
    @Override
    public void onCountersLoaded(int reservasCount, int canceladasCount, int viajesCount) {
        runOnUiThread(() -> {
            uiManager.updateCounters(reservasCount, canceladasCount, viajesCount);

            // Log informativo si hay reservas activas
            if (reservasCount > 0) {
                Log.d(TAG, "📊 Contadores actualizados: " + reservasCount + " reservas activas");
            }
        });
    }

    /**
     * Callback cuando hay un error al cargar los contadores.
     * @param error Mensaje de error.
     */
    @Override
    public void onCountersError(String error) {
        runOnUiThread(() -> {
            uiManager.updateCounters(0, 0, 0);  // Resetear contadores a cero
            Log.e(TAG, "❌ Error en contadores: " + error);
        });
    }

    // ============================================================
    // Implementación de ScheduleManager.ScheduleListener
    // (Eventos relacionados con la carga de horarios)
    // ============================================================

    /**
     * Callback cuando los horarios se han cargado correctamente.
     * @param nataga Lista de horarios para la ruta Nataga.
     * @param laPlata Lista de horarios para la ruta La Plata.
     */
    @Override
    public void onSchedulesLoaded(List<Horario> nataga, List<Horario> laPlata) {
        runOnUiThread(() -> {
            pagerAdapter.actualizarDatos(nataga, laPlata);  // Actualizar el adaptador con los nuevos datos
            Toast.makeText(this,
                    "Horarios actualizados: " + scheduleManager.getTotalSchedules() + " total",
                    Toast.LENGTH_SHORT).show();
        });
    }

    /**
     * Callback cuando hay un error al cargar los horarios.
     * @param error Mensaje de error.
     */
    @Override
    public void onSchedulesError(String error) {
        runOnUiThread(() -> {
            Toast.makeText(this, "Error al cargar horarios: " + error, Toast.LENGTH_SHORT).show();
        });
    }

    // ============================================================
    // Implementación de DashboardUIManager.UIActionsListener
    // (Eventos de interacción del usuario con la UI)
    // ============================================================

    /**
     * Evento cuando el usuario hace click en "Editar Perfil".
     * Navega a la actividad de edición de perfil si el usuario está logueado.
     */
    @Override
    public void onEditProfileClicked() {
        if (validateLogin()) {
            Intent intent = new Intent(this, EditarPerfilActivity.class);
            startActivity(intent);
        }
    }

    /**
     * Evento cuando el usuario hace click en "Refresh" (actualizar).
     * Muestra un mensaje y recarga los datos.
     */
    @Override
    public void onRefreshClicked() {
        uiManager.showRefreshMessage();
        dashboardManager.refreshData();     // Recargar datos del usuario y contadores
        scheduleManager.loadSchedules();    // Recargar horarios
    }

    /**
     * Evento cuando el usuario selecciona la opción de "Perfil" en el menú.
     * Navega a la actividad de perfil si el usuario está logueado.
     */
    @Override
    public void onProfileMenuItemClicked() {
        if (validateLogin()) {
            Intent intent = new Intent(this, PerfilUsuarioActivity.class);
            startActivity(intent);
        }
    }

    /**
     * Valida si el usuario está logueado antes de realizar acciones que lo requieran.
     * @return true si el usuario está logueado, false en caso contrario.
     */
    private boolean validateLogin() {
        if (!MyApp.isUserLoggedIn()) {
            Toast.makeText(this, "Debes iniciar sesión", Toast.LENGTH_SHORT).show();
            // Aquí se podría redirigir a la pantalla de login si es necesario
            return false;
        }
        return true;
    }

    // ============================================================
    // Más métodos del ciclo de vida
    // ============================================================

    @Override
    protected void onResume() {
        super.onResume();
        analyticsHelper.logScreenResume();  // Registrar analytics

        if (MyApp.isUserLoggedIn()) {
            // Recargar horarios por si hubo cambios (en tiempo real o al volver de otra actividad)
            scheduleManager.loadSchedules();

            // Opcional: forzar una actualización de datos del usuario
            dashboardManager.refreshData();
        }
    }

    @Override
    protected void onPause() {
        super.onPause();
        Log.d(TAG, "⏸️ onPause - Pausando actividad");
        // Los listeners en tiempo real siguen activos en background
    }

    @Override
    protected void onStop() {
        super.onStop();
        Log.d(TAG, "⏹️ onStop - Deteniendo actividad");
        // Considerar si quieres mantener los listeners o no
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        Log.d(TAG, "🗑️ onDestroy - Destruyendo actividad");

        // Limpiar recursos para evitar memory leaks
        if (dashboardManager != null) {
            dashboardManager.cleanup();  // Liberar recursos (ej. listeners de Firebase)
        }
    }

    /**
     * Método público para obtener el usuario actual desde otras clases.
     * @return Objeto Usuario actual o null si no está cargado.
     */
    public Usuario getUsuarioActual() {
        return dashboardManager.getUsuarioActual();
    }
}
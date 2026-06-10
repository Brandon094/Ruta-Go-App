package com.chopcode.rutago.app.activities.passenger;

import androidx.appcompat.app.AppCompatActivity;
import androidx.viewpager2.widget.ViewPager2;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.chopcode.rutago.app.R;
import com.bumptech.glide.Glide;
import com.facebook.shimmer.ShimmerFrameLayout;
import com.chopcode.rutago.app.activities.passenger.profile.PerfilUsuarioActivity;
import com.chopcode.rutago.app.adapters.horarios.HorarioPagerAdapter;
import com.chopcode.rutago.app.config.MyApp;
import com.chopcode.rutago.app.managers.analytics.DashboardAnalyticsHelper;
import com.chopcode.rutago.app.managers.dashboard.passenger.DashboardUIManager;
import com.chopcode.rutago.app.managers.dashboard.passenger.ScheduleManager;
import com.chopcode.rutago.app.managers.dashboard.passenger.UserDashboardManager;
import com.chopcode.rutago.app.fragments.BottomNavFragment;
import com.chopcode.rutago.app.models.Horario;
import com.chopcode.rutago.app.models.Usuario;
import com.chopcode.rutago.app.utils.network.NetworkMonitor;
import com.chopcode.rutago.app.utils.ui.ImageUtils;
import com.google.android.material.snackbar.BaseTransientBottomBar;
import com.google.android.material.snackbar.Snackbar;
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
    private ShimmerFrameLayout shimmerSchedules;
    private ShimmerFrameLayout shimmerStats;
    private LinearLayout layoutRealStats;
    private HorarioPagerAdapter pagerAdapter;             // Adaptador para el ViewPager
    private ImageView ivUserAvatar;
    private NetworkMonitor networkMonitor;
    private Snackbar networkSnackbar;

    // ============================================================
    // Variables para la leyenda expandible
    // ============================================================
    private RelativeLayout legendHeader;
    private LinearLayout legendContent;
    private ImageView legendExpandIcon;
    private boolean isLegendExpanded = false;

    // ============================================================
    // Ciclo de vida de la Activity
    // ============================================================

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.d(TAG, "🚀 onCreate - Iniciando actividad principal de usuario");

        // 1. Establecer el layout primero para que las vistas existan
        setContentView(R.layout.activity_inicio_usuarios);

        // 2. Inicializar Managers y Helpers (sin activar listeners todavía)
        analyticsHelper = new DashboardAnalyticsHelper();
        uiManager = new DashboardUIManager(analyticsHelper);
        uiManager.setUIActionsListener(this);
        dashboardManager = new UserDashboardManager(this, analyticsHelper);
        scheduleManager = new ScheduleManager(analyticsHelper);

        // 3. Inicializar vistas (enlace de IDs y referencias al UI Manager)
        initializeViews();

        // 4. Conectar listeners de datos (esto disparará la carga de caché si existe)
        // Se hace DESPUÉS de initializeViews para asegurar que ivUserAvatar y otros no sean null
        dashboardManager.setDashboardListener(this);
        scheduleManager.setScheduleListener(this);

        // 5. Configuración adicional
        configureUI();
        setupBottomNavigation();

        // 6. Cargar datos de red
        loadInitialData();
        setupNetworkMonitor();
    }

    private void setupNetworkMonitor() {
        networkMonitor = new NetworkMonitor(this);
        networkMonitor.observe(this, isConnected -> {
            if (!isConnected) {
                showNoInternetSnackbar();
            } else {
                dismissNetworkSnackbar();
            }
        });
    }

    private void showNoInternetSnackbar() {
        if (networkSnackbar == null) {
            networkSnackbar = Snackbar.make(findViewById(android.R.id.content),
                    getString(R.string.network_error),
                    Snackbar.LENGTH_INDEFINITE);
            networkSnackbar.setBackgroundTint(getColor(R.color.error_500));
            networkSnackbar.setTextColor(getColor(R.color.white));
        }
        if (!networkSnackbar.isShown()) {
            networkSnackbar.show();
        }
    }

    private void dismissNetworkSnackbar() {
        if (networkSnackbar != null && networkSnackbar.isShown()) {
            networkSnackbar.dismiss();
            Snackbar.make(findViewById(android.R.id.content),
                    getString(R.string.network_restored),
                    Snackbar.LENGTH_SHORT)
                    .setBackgroundTint(getColor(R.color.success_500))
                    .show();
        }
    }

    private void setupBottomNavigation() {
        getSupportFragmentManager().beginTransaction()
                .replace(R.id.bottom_nav_container, BottomNavFragment.newInstance(false))
                .commit();
    }

    /**
     * Inicializa todos los managers de la actividad.
     * Se encargan de la lógica de negocio y comunicación con capas de datos.
     */
    private void initializeManagers() {
        // Lógica movida directamente al onCreate para garantizar el orden de inicialización
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
        TextView tvCanceladasCount = findViewById(R.id.tvCanceladasCount);
        TextView tvTotalCount = findViewById(R.id.tvTotalCount);

        // ============================================================
        // Obtener referencias para la leyenda expandible
        // ============================================================
        legendHeader = findViewById(R.id.legendHeader);
        legendContent = findViewById(R.id.legendContent);
        legendExpandIcon = findViewById(R.id.legendExpandIcon);

        // Verificar que las vistas existen (por si acaso)
        if (legendHeader == null) {
            Log.e(TAG, "❌ legendHeader no encontrado en el layout");
        } else {
            // Configurar el click listener para la leyenda
            setupLegendToggle();
        }

        // Botones de acción (Eliminado btnRefresh)

        // Pestañas y ViewPager para los horarios
        tabLayout = findViewById(R.id.tabLayout);
        viewPagerHorarios = findViewById(R.id.viewPagerHorarios);
        shimmerSchedules = findViewById(R.id.shimmer_inicio_usuarios);
        shimmerStats = findViewById(R.id.shimmer_stats);
        layoutRealStats = findViewById(R.id.layout_real_stats);
        ivUserAvatar = findViewById(R.id.ivUserAvatar);

        // Pasar todas las referencias de vistas al UIManager para que las gestione
        uiManager.setViewReferences(
                tvUserName, tvWelcome, tvReservasCount, tvCanceladasCount, tvTotalCount
        );
        uiManager.setupToolbar(topAppBar);  // Configurar toolbar (menú, título, etc.)

        // Inicializar el adaptador del ViewPager con las listas de horarios (vacías al inicio)
        pagerAdapter = new HorarioPagerAdapter(
                this,
                scheduleManager.getNatagaSchedules(),   // Lista de horarios Nataga
                scheduleManager.getLaPlataSchedules()    // Lista de horarios La Plata
        );
        viewPagerHorarios.setAdapter(pagerAdapter);

        // ✅ AÑADIR ANIMACIÓN SUAVE AL VIEW PAGER
        setupViewPagerAnimation();

        // Conectar el TabLayout con el ViewPager (para que se sincronicen)
        uiManager.setupTabLayout(tabLayout, viewPagerHorarios);
    }

    /**
     * Configura una animación de transición suave (Fade & Scale) para el ViewPager2.
     */
    private void setupViewPagerAnimation() {
        viewPagerHorarios.setPageTransformer((page, position) -> {
            float absPos = Math.abs(position);
            
            // Efecto de desvanecimiento (Fade)
            page.setAlpha(1.0f - absPos);
            
            // Efecto de escala sutil (Scale)
            float scale = 0.85f + (1.0f - absPos) * 0.15f;
            page.setScaleX(scale);
            page.setScaleY(scale);
            
            // Evitar que las páginas se superpongan de forma extraña
            page.setTranslationX(page.getWidth() * -position);
            
            // Ajustar la elevación para que la página activa esté encima
            if (absPos > 0.5f) {
                page.setVisibility(View.GONE);
            } else {
                page.setVisibility(View.VISIBLE);
            }
        });
    }

    /**
     * Configura los listeners de los elementos de UI (botones, etc.)
     * El UIManager se encarga de enlazar los clicks con los callbacks de esta actividad.
     */
    private void configureUI() {
        // (Lógica de btnRefresh eliminada)
    }

    // ============================================================
    // Métodos para la leyenda expandible
    // ============================================================

    /**
     * Configura el toggle para la leyenda
     */
    private void setupLegendToggle() {
        if (legendHeader != null) {
            legendHeader.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    toggleLegend();
                }
            });
            Log.d(TAG, "✅ Click listener configurado para la leyenda");
        }
    }

    /**
     * Alterna la visibilidad de la leyenda
     */
    private void toggleLegend() {
        isLegendExpanded = !isLegendExpanded;

        if (isLegendExpanded) {
            expandLegend();
        } else {
            collapseLegend();
        }
    }

    /**
     * Expande la leyenda con animación
     */
    private void expandLegend() {
        if (legendContent == null || legendExpandIcon == null) {
            Log.e(TAG, "❌ No se puede expandir: vistas null");
            return;
        }

        // Mostrar el contenido con animación de fade in
        legendContent.setVisibility(View.VISIBLE);
        legendContent.animate()
                .alpha(1.0f)
                .setDuration(300)
                .start();

        // Cambiar el icono a "expand_less" (flecha hacia arriba)
        legendExpandIcon.setImageResource(R.drawable.ic_expand_less);

        Log.d(TAG, "📖 Leyenda expandida");
    }

    /**
     * Colapsa la leyenda con animación
     */
    private void collapseLegend() {
        if (legendContent == null || legendExpandIcon == null) {
            Log.e(TAG, "❌ No se puede colapsar: vistas null");
            return;
        }

        // Animación de fade out y luego ocultar
        legendContent.animate()
                .alpha(0.0f)
                .setDuration(200)
                .withEndAction(new Runnable() {
                    @Override
                    public void run() {
                        legendContent.setVisibility(View.GONE);
                    }
                })
                .start();

        // Cambiar el icono a "expand_more" (flecha hacia abajo)
        legendExpandIcon.setImageResource(R.drawable.ic_expand_more);

        Log.d(TAG, "📕 Leyenda colapsada");
    }

    /**
     * Versión simplificada sin animaciones (comentada por si prefieres usarla)
     */
    /*
    private void toggleLegendSimple() {
        if (legendContent.getVisibility() == View.VISIBLE) {
            legendContent.setVisibility(View.GONE);
            legendExpandIcon.setImageResource(R.drawable.ic_expand_more);
        } else {
            legendContent.setVisibility(View.VISIBLE);
            legendExpandIcon.setImageResource(R.drawable.ic_expand_less);
        }
    }
    */

    /**
     * Inicia la carga de datos iniciales:
     * - Datos del usuario (nombre, etc.)
     * - Contadores (reservas, canceladas, viajes)
     * - Horarios
     */
    private void loadInitialData() {
        if (shimmerSchedules != null) {
            shimmerSchedules.setVisibility(View.VISIBLE);
            shimmerSchedules.startShimmer();
            viewPagerHorarios.setVisibility(View.GONE);
        }
        
        if (shimmerStats != null) {
            shimmerStats.setVisibility(View.VISIBLE);
            shimmerStats.startShimmer();
        }
        
        if (layoutRealStats != null) {
            layoutRealStats.setVisibility(View.GONE);
        }

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

            // ✅ CARGAR FOTO DE PERFIL CENTRALIZADA
            ImageUtils.loadProfilePhoto(this, usuario.getPhotoUrl(), ivUserAvatar);
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
            if (shimmerStats != null) {
                shimmerStats.stopShimmer();
                shimmerStats.setVisibility(View.GONE);
            }
            if (layoutRealStats != null) {
                layoutRealStats.setVisibility(View.VISIBLE);
            }

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
            if (shimmerSchedules != null) {
                shimmerSchedules.stopShimmer();
                shimmerSchedules.setVisibility(View.GONE);
                viewPagerHorarios.setVisibility(View.VISIBLE);
            }
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

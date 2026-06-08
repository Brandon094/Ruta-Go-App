// InicioConductor.java (Versión actualizada con PerfilViewModel)
package com.chopcode.rutago.app.activities.driver;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.animation.OvershootInterpolator;
import android.widget.ImageView;
import android.widget.ProgressBar;
import com.facebook.shimmer.ShimmerFrameLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.activities.driver.profile.PerfilConductorActivity;
import com.chopcode.rutago.app.adapters.reservas.ReservaAdapter;
import com.chopcode.rutago.app.adapters.rutas.RutaAdapter;
import com.chopcode.rutago.app.config.MyApp;
import com.chopcode.rutago.app.managers.auths.AuthManager;
import com.chopcode.rutago.app.adapters.rutas.SelectRouteAdapter;
import com.chopcode.rutago.app.models.Reserva;
import com.chopcode.rutago.app.models.Ruta;
import com.chopcode.rutago.app.models.Ruta;
import com.chopcode.rutago.app.fragments.BottomNavFragment;
import com.chopcode.rutago.app.viewmodels.driver.EstadisticasViewModel;
import com.chopcode.rutago.app.viewmodels.driver.PerfilViewModel;
import com.chopcode.rutago.app.viewmodels.driver.RutasViewModel;
import com.chopcode.rutago.app.viewmodels.driver.ReservasViewModel;
import com.chopcode.rutago.app.utils.network.NetworkMonitor;
import com.chopcode.rutago.app.utils.ui.ImageUtils;
import com.google.android.material.snackbar.Snackbar;
import com.google.android.material.dialog.MaterialAlertDialogBuilder;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;

public class InicioConductorActivity extends AppCompatActivity {
    private static final String TAG = "InicioConductor";

    private boolean isDataLoaded = false;
    private ValueEventListener routesListener;
    private DatabaseReference conductorRef;

    // Views principales
    private RecyclerView rvReservas, rvProximasRutas;
    private TextView tvConductor, tvPlacaVehiculo;
    private TextView tvEmptyReservas, tvEmptyRutas;
    private ImageView ivConductorAvatar;
    private ShimmerFrameLayout shimmerLayout;
    private ProgressBar progressBar;
    private com.google.android.material.floatingactionbutton.ExtendedFloatingActionButton fabVentaFisica;

    // Views de estadísticas
    private TextView tvReservasConfirmadas, tvAsientosDisponibles, tvTotalIngresos;
    private TextView tvInfoCapacidad, tvInfoIngresos, tvInfoReservas;
    private TextView tvUltimaActualizacion;

    // Views por ruta
    private TextView tvNombreRutaReservas, tvReservasRuta, tvNombreRutaAsientos, tvAsientosRuta;
    private TextView tvNombreRutaReservas2, tvReservasRuta2, tvNombreRutaAsientos2, tvAsientosRuta2;
    private TextView tvContadorReservas, tvContadorRutas;

    // ViewModels INDIVIDUALES
    private PerfilViewModel perfilViewModel;
    private ReservasViewModel reservasViewModel;
    private EstadisticasViewModel estadisticasViewModel;
    private RutasViewModel rutasViewModel;
    private AuthManager authManager;
    private ReservaAdapter reservaAdapter;
    private RutaAdapter rutaAdapter;
    private List<Reserva> listaReservas = new ArrayList<>();
    private List<Ruta> listaRutas = new ArrayList<>();
    private SimpleDateFormat timeFormat;

    private NetworkMonitor networkMonitor;
    private Snackbar networkSnackbar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_inicio_conductor);
        Log.d(TAG, "🚀 Iniciando actividad con ViewModels individuales");

        authManager = AuthManager.getInstance();
        timeFormat = new SimpleDateFormat("HH:mm", Locale.getDefault());

        // ✅ INICIALIZAR VIEWMODELS INDIVIDUALMENTE
        perfilViewModel = new ViewModelProvider(this).get(PerfilViewModel.class); // CORREGIDO
        reservasViewModel = new ViewModelProvider(this).get(ReservasViewModel.class);
        estadisticasViewModel = new ViewModelProvider(this).get(EstadisticasViewModel.class);
        rutasViewModel = new ViewModelProvider(this).get(RutasViewModel.class);

        initializeViews();
        setupRecyclerView();
        setupButtons();
        setupObservers();
        setupBottomNavigation();

        loadDriverData();
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
                    getString(R.string.network_error_driver),
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
                .replace(R.id.bottom_nav_container, BottomNavFragment.newInstance(true))
                .commit();
    }

    /** Metodo para inicializar las vistas de la UI*/
    private void initializeViews() {
        // Inicializar todas las vistas según tu XML
        tvConductor = findViewById(R.id.tvConductor);
        tvPlacaVehiculo = findViewById(R.id.tvPlacaVehiculo);
        tvReservasConfirmadas = findViewById(R.id.tvReservasConfirmadas);
        tvAsientosDisponibles = findViewById(R.id.tvAsientosDisponibles);
        tvTotalIngresos = findViewById(R.id.tvTotalIngresos);
        tvInfoCapacidad = findViewById(R.id.tvInfoCapacidad);
        tvInfoIngresos = findViewById(R.id.tvInfoIngresos);
        tvInfoReservas = findViewById(R.id.tvInfoReservas);
        tvUltimaActualizacion = findViewById(R.id.tvUltimaActualizacion);

        tvNombreRutaReservas = findViewById(R.id.tvNombreRutaReservas);
        tvReservasRuta = findViewById(R.id.tvReservasRuta);
        tvNombreRutaAsientos = findViewById(R.id.tvNombreRutaAsientos);
        tvAsientosRuta = findViewById(R.id.tvAsientosRuta);

        tvNombreRutaReservas2 = findViewById(R.id.tvNombreRutaReservas2);
        tvReservasRuta2 = findViewById(R.id.tvReservasRuta2);
        tvNombreRutaAsientos2 = findViewById(R.id.tvNombreRutaAsientos2);
        tvAsientosRuta2 = findViewById(R.id.tvAsientosRuta2);

        // ✅ AGREGAR REFERENCIAS DE TEXTVIEW DE NOMBRES SI NO ESTÁN ASIGNADOS
        tvNombreRutaReservas = findViewById(R.id.tvNombreRutaReservas);
        tvNombreRutaReservas2 = findViewById(R.id.tvNombreRutaReservas2);
        tvNombreRutaAsientos = findViewById(R.id.tvNombreRutaAsientos);
        tvNombreRutaAsientos2 = findViewById(R.id.tvNombreRutaAsientos2);

        tvContadorReservas = findViewById(R.id.tvContadorReservas);
        tvContadorRutas = findViewById(R.id.tvContadorRutas);

        progressBar = findViewById(R.id.progressBar);
        rvReservas = findViewById(R.id.recyclerReservas);
        rvProximasRutas = findViewById(R.id.recyclerProximasRutas);
        tvEmptyReservas = findViewById(R.id.tvEmptyReservas);
        tvEmptyRutas = findViewById(R.id.tvEmptyRutas);
        shimmerLayout = findViewById(R.id.shimmer_inicio_conductor);
        fabVentaFisica = findViewById(R.id.fabVentaFisica);
        ivConductorAvatar = findViewById(R.id.ivConductorAvatar);

        // Configurar valores iniciales usando strings
        tvReservasConfirmadas.setText(getString(R.string.contador_reservas, 0));
        tvAsientosDisponibles.setText("26"); // Valor por defecto
        tvTotalIngresos.setText(getString(R.string.formato_moneda, "0"));
        tvContadorReservas.setText(getString(R.string.contador_reservas, 0));
        tvContadorRutas.setText(getString(R.string.contador_rutas, 0));

        // Configurar información por defecto usando strings
        if (tvInfoCapacidad != null) {
            tvInfoCapacidad.setText(getString(R.string.ocupacion_porcentaje, 26, 0));
        }
        if (tvInfoIngresos != null) {
            tvInfoIngresos.setText(getString(R.string.acumulado_desde_inicio));
        }
        if (tvInfoReservas != null) {
            tvInfoReservas.setText(getString(R.string.total_del_dia));
        }

        // Actualizar tiempo de actualización
        actualizarTiempoActualizacion();
    }

    /**
     * Versión con la misma firma que en PerfilConductor (parámetros count opcionales)
     */
    private void mostrarDialogoConfirmacion() {
        Log.d(TAG, "💬 Mostrando diálogo de confirmación de cierre de sesión");
        registrarEventoAnalitico("dialogo_cerrar_sesion_mostrado", null, null);

        View dialogView = LayoutInflater.from(this).inflate(R.layout.dialog_logout, null);

        new com.google.android.material.dialog.MaterialAlertDialogBuilder(this, R.style.AppDialogTheme)
                .setView(dialogView)
                .setPositiveButton("Cerrar Sesión", (dialog, which) -> {
                    Log.d(TAG, "✅ Usuario confirmó cierre de sesión");
                    registrarEventoAnalitico("cerrar_sesion_confirmado", null, null);

                    cleanupResources();
                    authManager.signOut(this);
                    Toast.makeText(this, getString(R.string.sesion_cerrada_exito), Toast.LENGTH_SHORT).show();
                    finish();
                })
                .setNegativeButton("Volver", (dialog, which) -> {
                    Log.d(TAG, "❌ Usuario canceló cierre de sesión");
                    registrarEventoAnalitico("cerrar_sesion_cancelado", null, null);
                    dialog.dismiss();
                })
                .show();
    }

    /**
     * Registrar evento analítico con la misma firma que en PerfilConductor
     */
    private void registrarEventoAnalitico(String evento, Integer count, Integer count2) {
        try {
            // Adapta esto según tu implementación de MyApp
            Log.d(TAG, "📊 Evento analítico: " + evento +
                    (count != null ? " count=" + count : "") +
                    (count2 != null ? " count2=" + count2 : ""));
        } catch (Exception e) {
            Log.e(TAG, "❌ Error registrando evento: " + e.getMessage());
        }
    }

    /** Metodo para configurar los botones de la UI */
    private void setupButtons() {
        Log.d(TAG, "🔧 Configurando botones...");

        // ✅ Configurar ícono de refresh
        ImageView icRefresh = findViewById(R.id.ic_refresh);
        if (icRefresh != null) {
            icRefresh.setOnClickListener(view -> {
                if (isDataLoaded) {
                    Log.d(TAG, "🎯 Refresh manual desde ícono");
                    Toast.makeText(this, getString(R.string.actualizando_datos), Toast.LENGTH_SHORT).show();

                    // Animación simple
                    icRefresh.animate()
                            .rotationBy(720f)              // 2 vueltas
                            .setDuration(2000)                   // 2 segundos
                            .setInterpolator(new OvershootInterpolator(1.0f)) // Efecto rebote
                            .withEndAction(() -> {
                                // Pequeño rebote final
                                icRefresh.animate()
                                        .rotationBy(15f)
                                        .setDuration(200)
                                        .setInterpolator(new OvershootInterpolator())
                                        .withEndAction(() -> icRefresh.setRotation(0f))
                                        .start();
                            })
                            .start();

                    // Recargar datos
                    reloadAllData();
                }
            });

            // Tooltip opcional
            icRefresh.setOnLongClickListener(v -> {
                Toast.makeText(this, "Actualizar datos", Toast.LENGTH_SHORT).show();
                return true;
            });
        }

        // ✅ Configurar FAB para Venta Física
        if (fabVentaFisica != null) {
            fabVentaFisica.setOnClickListener(view -> {
                if (listaRutas == null || listaRutas.isEmpty()) {
                    Toast.makeText(this, "No tienes rutas asignadas para hoy", Toast.LENGTH_SHORT).show();
                    return;
                }

                if (listaRutas.size() == 1) {
                    // Si solo hay una ruta, ir directo
                    abrirGestionAsientos(listaRutas.get(0));
                } else {
                    // Si hay varias, dejar que el usuario elija desde la lista o mostrar un diálogo
                    mostrarSelectorDeRuta();
                }
            });

            // Controlar el shrink/extend al hacer scroll
            androidx.core.widget.NestedScrollView scrollView = findViewById(R.id.nestedScrollView);
            if (scrollView != null) {
                scrollView.setOnScrollChangeListener((androidx.core.widget.NestedScrollView.OnScrollChangeListener) (v, scrollX, scrollY, oldScrollX, oldScrollY) -> {
                    if (scrollY > oldScrollY + 10 && fabVentaFisica.isExtended()) {
                        fabVentaFisica.shrink();
                    } else if (scrollY < oldScrollY - 10 && !fabVentaFisica.isExtended()) {
                        fabVentaFisica.extend();
                    }
                    if (scrollY == 0) {
                        fabVentaFisica.extend();
                    }
                });
            }
        }

        Log.d(TAG, "✅ Botones configurados");
    }

    private void abrirGestionAsientos(Ruta ruta) {
        Log.d(TAG, "🎯 Abriendo gestión de asientos para: " + ruta.getOrigen() + " -> " + ruta.getDestino());
        Intent intent = new Intent(this, GestionarAsientosActivity.class);
        intent.putExtra("horarioId", ruta.getHorarioId());
        intent.putExtra("rutaNombre", ruta.getOrigen() + " -> " + ruta.getDestino());
        intent.putExtra("horarioHora", ruta.getHora() != null ? ruta.getHora().getHora() : "--:--");
        startActivity(intent);
    }

    private void mostrarSelectorDeRuta() {
        if (listaRutas == null || listaRutas.isEmpty()) {
            Toast.makeText(this, "No hay rutas disponibles", Toast.LENGTH_SHORT).show();
            return;
        }

        View dialogView = LayoutInflater.from(this).inflate(R.layout.dialog_select_route, null);
        RecyclerView rv = dialogView.findViewById(R.id.rvSelectRoute);
        
        androidx.appcompat.app.AlertDialog dialog = new com.google.android.material.dialog.MaterialAlertDialogBuilder(this, R.style.AppDialogTheme)
                .setView(dialogView)
                .setNegativeButton("Volver", null)
                .create();

        rv.setLayoutManager(new LinearLayoutManager(this));
        rv.setAdapter(new SelectRouteAdapter(listaRutas, ruta -> {
            dialog.dismiss();
            abrirGestionAsientos(ruta);
        }));

        dialog.show();
    }

    /** Metodo para configurar los observadores de cada seccion */
    private void setupObservers() {
        Log.d(TAG, "👀 Configurando observadores...");
        
        // Observar estado de carga global
        perfilViewModel.getLoadingLiveData().observe(this, isLoading -> {
            if (isLoading != null) {
                if (isLoading) {
                    if (shimmerLayout != null) {
                        shimmerLayout.setVisibility(View.VISIBLE);
                        shimmerLayout.startShimmer();
                    }
                    findViewById(R.id.cardHeader).setVisibility(View.GONE);
                    findViewById(R.id.cardReservas).setVisibility(View.GONE);
                    findViewById(R.id.cardEstadisticas).setVisibility(View.GONE);
                    findViewById(R.id.cardRutas).setVisibility(View.GONE);
                } else {
                    if (shimmerLayout != null) {
                        shimmerLayout.stopShimmer();
                        shimmerLayout.setVisibility(View.GONE);
                    }
                    findViewById(R.id.cardHeader).setVisibility(View.VISIBLE);
                    findViewById(R.id.cardReservas).setVisibility(View.VISIBLE);
                    findViewById(R.id.cardEstadisticas).setVisibility(View.VISIBLE);
                    findViewById(R.id.cardRutas).setVisibility(View.VISIBLE);
                }
            }
        });

        // ✅ OBSERVAR DATOS DEL CONDUCTOR DESDE PERFILVIEWMODEL
        perfilViewModel.getConductorNombreLiveData().observe(this, nombre -> {
            if (nombre != null && !nombre.isEmpty()) {
                tvConductor.setText(nombre);
                Log.d(TAG, "✅ Nombre del conductor actualizado: " + nombre);

                // Pasar nombre a ReservasViewModel (este usa el nombre para filtrar)
                reservasViewModel.inicializarConNombreConductor(nombre);

                // ✅ CORREGIDO: Pasar el UID (userId) a EstadisticasViewModel
                // La búsqueda de estadísticas es más precisa por ID que por nombre
                String userId = FirebaseAuth.getInstance().getCurrentUser().getUid();
                if (userId != null) {
                    Log.d(TAG, "📊 Configurando estadísticas para UID: " + userId);
                    estadisticasViewModel.setConductorActual(userId);
                    estadisticasViewModel.refreshStatistics();
                }

                isDataLoaded = true;
            } else {
                tvConductor.setText("Cargando...");
                Log.w(TAG, "⚠️ Nombre del conductor es nulo o vacío");
            }
        });

        perfilViewModel.getPlacaVehiculoLiveData().observe(this, placa -> {
            if (placa != null && !placa.isEmpty()){
                tvPlacaVehiculo.setText("Placa: " + placa);
                Log.d(TAG, "🚗 Placa actualizada: " + placa);
            } else {
                tvPlacaVehiculo.setText("Placa no asignada");
                Log.w(TAG, "⚠️ Placa del vehículo no disponible");
            }
        });

        // ✅ OBSERVAR HORARIOS DESDE PERFILVIEWMODEL Y PASAR A RUTASVIEWMODEL
        perfilViewModel.getHorariosAsignadosLiveData().observe(this, horarios -> {
            if (horarios != null && !horarios.isEmpty()) {
                Log.d(TAG, "✅ Horarios asignados obtenidos: " + horarios.size());
                // Cargar rutas basadas en horarios
                rutasViewModel.loadRoutes(horarios);

                // ✅ PASAR HORARIOS A ESTADÍSTICAS PARA MEJORAR EL FILTRADO
                estadisticasViewModel.setHorariosAsignados(horarios);
                estadisticasViewModel.refreshStatistics();
            } else {
                Log.w(TAG, "⚠️ Conductor sin horarios asignados");
                tvEmptyRutas.setVisibility(View.VISIBLE);
            }
        });

        // Observar estado de carga desde PerfilViewModel
        perfilViewModel.getConductorLiveData().observe(this, conductor -> {
            if (conductor != null) {
                // ✅ CARGAR FOTO DE PERFIL CENTRALIZADA
                ImageUtils.loadProfilePhoto(this, conductor.getPhotoUrl(), ivConductorAvatar);
            }
        });

        perfilViewModel.getLoadingLiveData().observe(this, isLoading -> {
            if (isLoading != null) {
                progressBar.setVisibility(isLoading ? View.VISIBLE : View.GONE);
                Log.d(TAG, isLoading ? "⏳ Cargando perfil..." : "✅ Perfil cargado");
            }
        });

        // Observar errores desde PerfilViewModel
        perfilViewModel.getErrorLiveData().observe(this, error -> {
            if (error != null && !error.isEmpty()) {
                Log.e(TAG, "❌ Error en perfil: " + error);
                Toast.makeText(this, error, Toast.LENGTH_SHORT).show();
            }
        });

        // ✅ ELIMINADO: Observador duplicado de horarios desde ReservasViewModel
        // Ya no necesitamos esto porque ahora viene de PerfilViewModel

        // Observar reservas pendientes desde ReservasViewModel
        reservasViewModel.getReservasPendientesLiveData().observe(this, reservas -> {
            if (reservas != null) {
                listaReservas.clear();
                listaReservas.addAll(reservas);

                if (reservaAdapter != null) {
                    reservaAdapter.actualizarReservas(new ArrayList<>(reservas));
                }

                updateReservationsUI();

                // Actualizar contador
                tvContadorReservas.setText(getString(R.string.contador_reservas, reservas.size()));
                Log.d(TAG, "✅ Contador de reservas: " + reservas.size());

                // ✅ ACTUALIZAR ESTADÍSTICAS CUANDO HAY NUEVAS RESERVAS
                if (!listaRutas.isEmpty()) {
                    estadisticasViewModel.calculateRouteStatistics();
                }
            } else {
                tvContadorReservas.setText(getString(R.string.contador_reservas, 0));
                showEmptyReservations();
            }
        });

        // Observar estado de procesamiento de reservas
        reservasViewModel.getReservaProcesadaLiveData().observe(this, procesada -> {
            if (procesada != null && procesada) {
                Toast.makeText(this, "Reserva procesada exitosamente", Toast.LENGTH_SHORT).show();
                // Refrescar estadísticas después de procesar reserva
                estadisticasViewModel.refreshStatistics();
            }
        });

        // Observar estado de carga desde ReservasViewModel
        reservasViewModel.getLoadingLiveData().observe(this, isLoading -> {
            if (isLoading != null) {
                // Usar solo un ProgressBar, ya tenemos el de PerfilViewModel
                Log.d(TAG, isLoading ? "⏳ Cargando reservas..." : "✅ Reservas cargadas");
            }
        });

        // Observar errores desde ReservasViewModel
        reservasViewModel.getErrorLiveData().observe(this, error -> {
            if (error != null && !error.isEmpty()) {
                Log.e(TAG, "❌ Error en reservas: " + error);
                Toast.makeText(InicioConductorActivity.this,
                        "Error en reservas: " + error, Toast.LENGTH_SHORT).show();
            }
        });

        // Observar rutas desde RutasViewModel
        rutasViewModel.getRutasLiveData().observe(this, rutas -> {
            Log.d(TAG, "🔄 Rutas actualizadas: " + (rutas != null ? rutas.size() : 0));

            if (rutas != null && !rutas.isEmpty()) {
                listaRutas.clear();
                listaRutas.addAll(rutas);

                if (rutaAdapter != null) {
                    rutaAdapter.actualizarRutas(rutas);
                }

                updateRoutesUI();

                // Actualizar contador
                tvContadorRutas.setText(getString(R.string.contador_rutas, rutas.size()));
                Log.d(TAG, "✅ Contador de rutas: " + rutas.size());

                // ✅ ACTUALIZAR ESTADÍSTICAS POR RUTA
                if (!listaReservas.isEmpty()) {
                    estadisticasViewModel.calculateRouteStatistics();
                }

                // Actualizar tiempo de actualización
                actualizarTiempoActualizacion();
            } else {
                tvContadorRutas.setText(getString(R.string.contador_rutas, 0));
                showEmptyRoutes();
            }
        });

        // Observar estadísticas generales desde EstadisticasViewModel
        estadisticasViewModel.getReservasConfirmadasLiveData().observe(this, count -> {
            if (count != null) {
                tvReservasConfirmadas.setText(String.valueOf(count));
                actualizarInformacionCapacidad(count);
            }
        });

        estadisticasViewModel.getAsientosDisponiblesLiveData().observe(this, asientos -> {
            if (asientos != null) {
                tvAsientosDisponibles.setText(String.valueOf(asientos));
            }
        });

        estadisticasViewModel.getIngresosLiveData().observe(this, ingresos -> {
            if (ingresos != null) {
                tvTotalIngresos.setText(formatCurrency(ingresos));
                actualizarTiempoActualizacion();
            }
        });

        // Observar estadísticas por ruta
        // Ruta 1
        estadisticasViewModel.getReservasRuta1LiveData().observe(this, count -> {
            if (count != null) {
                tvReservasRuta.setText(String.valueOf(count));
            }
        });

        estadisticasViewModel.getAsientosRuta1LiveData().observe(this, count -> {
            if (count != null) {
                tvAsientosRuta.setText(String.valueOf(count));
            }
        });

        // Ruta 2
        estadisticasViewModel.getReservasRuta2LiveData().observe(this, count -> {
            if (count != null) {
                tvReservasRuta2.setText(String.valueOf(count));
            }
        });

        estadisticasViewModel.getAsientosRuta2LiveData().observe(this, count -> {
            if (count != null) {
                tvAsientosRuta2.setText(String.valueOf(count));
            }
        });

        // ✅ OBSERVAR NOMBRES DE RUTAS PARA LAS TARJETAS
        estadisticasViewModel.getNombreRuta1LiveData().observe(this, nombre -> {
            if (nombre != null) {
                tvNombreRutaReservas.setText(nombre);
                tvNombreRutaAsientos.setText(nombre);
            }
        });

        estadisticasViewModel.getNombreRuta2LiveData().observe(this, nombre -> {
            if (nombre != null) {
                tvNombreRutaReservas2.setText(nombre);
                tvNombreRutaAsientos2.setText(nombre);
            }
        });

        Log.d(TAG, "✅ Observadores configurados");
    }

    /** Metodo para configurar el recycler View de las reservas */
    private void setupRecyclerView() {
        Log.d(TAG, "🔧 Configurando RecyclerView...");

        reservaAdapter = new ReservaAdapter(listaReservas, new ReservaAdapter.OnReservaClickListener() {
            @Override
            public void onConfirmarClick(Reserva reserva) {
                Log.d(TAG, "🎯 Click en CONFIRMAR reserva: " + reserva.getIdReserva());
                showConfirmationDialog(reserva, true);
            }

            @Override
            public void onCancelarClick(Reserva reserva) {
                Log.d(TAG, "🎯 Click en CANCELAR reserva: " + reserva.getIdReserva());
                showConfirmationDialog(reserva, false);
            }
        });

        rvReservas.setLayoutManager(new LinearLayoutManager(this));
        rvReservas.setAdapter(reservaAdapter);
        rvReservas.setItemAnimator(null); // Desactivar animaciones para mejor rendimiento

        // ✅ INICIALIZAR RutaAdapter
        rutaAdapter = new RutaAdapter(listaRutas, new RutaAdapter.OnRutaClickListener() {
            @Override
            public void onRutaClick(Ruta ruta) {
                abrirGestionAsientos(ruta);
            }
        });
        rvProximasRutas.setLayoutManager(new LinearLayoutManager(this,
                LinearLayoutManager.HORIZONTAL, false));
        rvProximasRutas.setAdapter(rutaAdapter);
        rvProximasRutas.setItemAnimator(null); // Desactivar animaciones

        Log.d(TAG, "✅ RecyclerView configurado");
    }

    /** Metodo para cargar todos los datos del conductor */
    private void loadDriverData() {
        Log.d(TAG, "🔧 Cargando datos del conductor...");

        if (!authManager.validateLogin(this)) {
            Log.w(TAG, "⚠️ Login no válido - finalizando actividad");
            finish();
            return;
        }

        String userId = FirebaseAuth.getInstance().getCurrentUser().getUid();
        if (userId == null || userId.isEmpty()) {
            userId = MyApp.getCurrentUserId();
        }

        if (userId == null || userId.isEmpty()) {
            Log.w(TAG, "⚠️ UserId es null - mostrando datos por defecto");
            showDefaultData();
            return;
        }

        Log.d(TAG, "👤 UserId del conductor: " + userId);

        // ✅ USAR PERFILVIEWMODEL PARA CARGAR DATOS COMPLETOS
        perfilViewModel.cargarDatosCompletos(userId);
    }

    /** Metodo para recargar todos los datos de reservas y rutas */
    private void reloadAllData() {
        String userId = FirebaseAuth.getInstance().getCurrentUser().getUid();
        if (userId != null && !userId.isEmpty()) {
            Log.d(TAG, "🔄 Recargando todos los datos para: " + userId);

            // Recargar perfil completo desde PerfilViewModel
            perfilViewModel.refrescarDatos();

            // Recargar reservas desde ReservasViewModel
            reservasViewModel.refrescarReservas();

            // Actualizar tiempo
            actualizarTiempoActualizacion();

            Toast.makeText(this, "Datos actualizados", Toast.LENGTH_SHORT).show();
        }
    }

    /** Metodo para mostrar informacion por defecto en caso de no poder cargar los datos */
    private void showDefaultData() {
        Log.d(TAG, "ℹ️ Mostrando datos por defecto");

        showEmptyReservations();
        showEmptyRoutes();
        tvConductor.setText(getString(R.string.no_disponible));
        tvPlacaVehiculo.setText(getString(R.string.placaVehiculo, getString(R.string.no_disponible)));

        // Valores por defecto usando strings
        tvReservasConfirmadas.setText(getString(R.string.contador_reservas, 0));
        tvAsientosDisponibles.setText("N/A"); // Valor por defecto
        tvTotalIngresos.setText(getString(R.string.formato_moneda, "0"));
        tvContadorReservas.setText(getString(R.string.contador_reservas, 0));
        tvContadorRutas.setText(getString(R.string.contador_rutas, 0));

        // Datos por defecto para cada ruta individual
        if (tvReservasRuta != null) tvReservasRuta.setText(getString(R.string.contador_reservas, 0));
        if (tvAsientosRuta != null) tvAsientosRuta.setText("N/A"); // Valor por defecto
        if (tvReservasRuta2 != null) tvReservasRuta2.setText(getString(R.string.contador_reservas, 0));
        if (tvAsientosRuta2 != null) tvAsientosRuta2.setText("N/A"); // Valor por defecto

        // Actualizar tiempo de actualización
        actualizarTiempoActualizacion();

        // Actualizar información de capacidad
        actualizarInformacionCapacidad(0);

        // Datos por defecto para estadísticas por ruta
        if (tvNombreRutaReservas != null) tvNombreRutaReservas.setText(getString(R.string.nataga_laplata));
        if (tvNombreRutaAsientos != null) tvNombreRutaAsientos.setText(getString(R.string.nataga_laplata));
        if (tvNombreRutaReservas2 != null) tvNombreRutaReservas2.setText(getString(R.string.laplata_nataga));
        if (tvNombreRutaAsientos2 != null) tvNombreRutaAsientos2.setText(getString(R.string.laplata_nataga));

        Log.d(TAG, "✅ Datos por defecto mostrados");
    }

    /** Metodo para mostrar mensaje de confirmacion de reserva */
    private void showConfirmationDialog(Reserva reserva, boolean isConfirmation) {
        Log.d(TAG, "💬 Mostrando diálogo de " + (isConfirmation ? "confirmación" : "cancelación"));

        new MaterialAlertDialogBuilder(this, R.style.AppDialogTheme)
                .setTitle(isConfirmation ?
                        getString(R.string.confirmar_reserva) :
                        getString(R.string.cancelar_reserva))
                .setMessage(isConfirmation ?
                        String.format(getString(R.string.confirmar_reserva_mensaje), reserva.getNombre()) :
                        String.format(getString(R.string.cancelar_reserva_mensaje), reserva.getNombre()))
                .setPositiveButton(isConfirmation ?
                        getString(R.string.confirmar) :
                        getString(R.string.cancelar), (dialog, which) -> {
                    Log.d(TAG, "✅ Usuario confirmó " + (isConfirmation ? "confirmación" : "cancelación"));

                    if (isConfirmation) {
                        reservasViewModel.confirmarReserva(InicioConductorActivity.this, reserva);
                    } else {
                        reservasViewModel.cancelarReserva(InicioConductorActivity.this, reserva);
                    }

                    actualizarTiempoActualizacion();
                })
                .setNegativeButton(getString(R.string.volver), (dialog, which) -> {
                    Log.d(TAG, "❌ Usuario canceló la acción");
                    dialog.dismiss();
                })
                .show();
    }

    /** Metodo para actualizar la UI seccion de reservas */
    private void updateReservationsUI() {
        Log.d(TAG, "🔄 Actualizando UI de reservas - Total: " + listaReservas.size());

        boolean hayReservas = !listaReservas.isEmpty();
        tvEmptyReservas.setVisibility(hayReservas ? View.GONE : View.VISIBLE);
        rvReservas.setVisibility(hayReservas ? View.VISIBLE : View.GONE);

        Log.d(TAG, "✅ UI de reservas actualizada - " +
                (hayReservas ? "Mostrando " + listaReservas.size() + " reservas" : "Sin reservas"));
    }

    /** Metodo para actualizar la UI seccion de rutas */
    private void updateRoutesUI() {
        Log.d(TAG, "🔄 Actualizando UI de rutas - Total: " + listaRutas.size());

        boolean hayRutas = !listaRutas.isEmpty();
        tvEmptyRutas.setVisibility(hayRutas ? View.GONE : View.VISIBLE);
        rvProximasRutas.setVisibility(hayRutas ? View.VISIBLE : View.GONE);

        // Controlar visibilidad de la segunda ruta
        View layoutRuta2 = findViewById(R.id.layoutRuta2);
        boolean haySegundaRuta = hayRutas && listaRutas.size() >= 2;

        if (layoutRuta2 != null) {
            layoutRuta2.setVisibility(haySegundaRuta ? View.VISIBLE : View.GONE);
            Log.d(TAG, "✅ Visibilidad de segunda ruta: " +
                    (haySegundaRuta ? "VISIBLE" : "GONE"));
        }

        Log.d(TAG, "✅ UI de rutas actualizada - " +
                (hayRutas ? "Mostrando " + listaRutas.size() + " rutas" : "Sin rutas"));
    }

    /** Metodo para actualizar la UI seccion informativa tiempo de actualizacion */
    private void actualizarTiempoActualizacion() {
        if (tvUltimaActualizacion != null) {
            String currentTime = timeFormat.format(new Date());
            tvUltimaActualizacion.setText(String.format(getString(R.string.ultima_actualizacion), currentTime));
            Log.d(TAG, "🕐 Tiempo de actualización: " + currentTime);
        }
    }

    /** Metodo para calcular el porcentaje de ocupacion total de las 2 rutas */
    private void actualizarInformacionCapacidad(Integer reservasConfirmadas) {
        if (tvInfoCapacidad != null && tvAsientosDisponibles != null) {
            try {
                // Leer el valor actual de asientos disponibles
                int disponibles = Integer.parseInt(tvAsientosDisponibles.getText().toString());

                // Si se pasa reservasConfirmadas, actualizar ocupados
                int ocupados = reservasConfirmadas != null ? reservasConfirmadas :
                        (26 - disponibles); // Total fijo de 26 asientos

                final int CAPACIDAD_TOTAL = 26;
                int porcentajeOcupacion = ocupados > 0 ? (ocupados * 100) / CAPACIDAD_TOTAL : 0;

                String info = getString(R.string.ocupacion_porcentaje_detallada,
                        CAPACIDAD_TOTAL, disponibles, ocupados, porcentajeOcupacion);
                tvInfoCapacidad.setText(info);

                Log.d(TAG, "📊 Información de capacidad: " + info);
            } catch (NumberFormatException e) {
                Log.e(TAG, "❌ Error al calcular información de capacidad: " + e.getMessage());
                tvInfoCapacidad.setText(getString(R.string.ocupacion_porcentaje, 26, 0));
            }
        }
    }

    /** Metodo para la navegacion a la actividad del perfil del conductor */
    private void goToDriverProfile() {
        Log.d(TAG, "👤 Navegando a perfil de conductor");

        if (authManager.isUserLoggedIn()) {
            startActivity(new Intent(this, PerfilConductorActivity.class));
            Log.d(TAG, "✅ Intent iniciado para PerfilConductor");
        } else {
            Log.w(TAG, "⚠️ Usuario no logeado - no se puede navegar al perfil");
            Toast.makeText(this, getString(R.string.debe_iniciar_sesion), Toast.LENGTH_SHORT).show();
        }
    }

    /** Metodo para mostrar que no hay reservas activas */
    private void showEmptyReservations() {
        Log.d(TAG, "ℹ️ Mostrando estado vacío para reservas");

        tvEmptyReservas.setVisibility(View.VISIBLE);
        rvReservas.setVisibility(View.GONE);
    }

    /** Metodo para mostrar que no hay rutas asignadas */
    private void showEmptyRoutes() {
        Log.d(TAG, "ℹ️ Mostrando estado vacío para rutas");

        tvEmptyRutas.setVisibility(View.VISIBLE);
        rvProximasRutas.setVisibility(View.GONE);
    }

    /** Metodo para dar formato de la moneda */
    private String formatCurrency(double amount) {
        return getString(R.string.formato_moneda, String.format(Locale.getDefault(), "%.0f", amount));
    }

    /** ✅ MÉTODO NUEVO: Limpiar recursos */
    private void cleanupResources() {
        Log.d(TAG, "🧹 Limpiando recursos...");

        // Remover listeners de Firebase
        if (routesListener != null && conductorRef != null) {
            conductorRef.removeEventListener(routesListener);
            routesListener = null;
        }

        // Limpiar listas
        if (listaReservas != null) {
            listaReservas.clear();
        }

        if (listaRutas != null) {
            listaRutas.clear();
        }

        // Pausar listeners en tiempo real
        reservasViewModel.pausarActualizacionesTiempoReal();

        // Limpiar datos del perfil
        perfilViewModel.limpiarDatos();

        isDataLoaded = false;

        Log.d(TAG, "✅ Recursos limpiados");
    }

    /** Metodos de ciclo de vida de la actividad */
    @Override
    protected void onPause() {
        super.onPause();
        Log.d(TAG, "⏸️ onPause - Actividad en segundo plano");

        // Pausar actualizaciones en tiempo real
        reservasViewModel.pausarActualizacionesTiempoReal();
    }

    @Override
    protected void onResume() {
        super.onResume();
        Log.d(TAG, "📱 onResume - Actividad en primer plano");

        // Reanudar actualizaciones en tiempo real
        reservasViewModel.reanudarActualizacionesTiempoReal();

        // Recargar datos si es necesario
        if (isDataLoaded) {
            Log.d(TAG, "🔄 Recargando datos en onResume");
            reloadAllData();
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        Log.d(TAG, "📱 onDestroy - Actividad destruida");

        // Limpiar todos los recursos
        cleanupResources();
    }
}

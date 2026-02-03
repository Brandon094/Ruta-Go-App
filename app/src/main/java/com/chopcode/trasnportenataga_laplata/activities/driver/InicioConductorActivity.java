// InicioConductor.java (Versión corregida con llamada a RutasViewModel)
package com.chopcode.trasnportenataga_laplata.activities.driver;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.animation.OvershootInterpolator;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.chopcode.trasnportenataga_laplata.R;
import com.chopcode.trasnportenataga_laplata.activities.driver.profile.PerfilConductorActivity;
import com.chopcode.trasnportenataga_laplata.adapters.reservas.ReservaAdapter;
import com.chopcode.trasnportenataga_laplata.adapters.rutas.RutaAdapter;
import com.chopcode.trasnportenataga_laplata.config.MyApp;
import com.chopcode.trasnportenataga_laplata.managers.auths.AuthManager;
import com.chopcode.trasnportenataga_laplata.models.Reserva;
import com.chopcode.trasnportenataga_laplata.models.Ruta;
import com.chopcode.trasnportenataga_laplata.viewmodels.driver.EstadisticasViewModel;
import com.chopcode.trasnportenataga_laplata.viewmodels.driver.RutasViewModel;
import com.chopcode.trasnportenataga_laplata.viewmodels.driver.ReservasViewModel;
import com.google.android.material.button.MaterialButton;
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
    private ProgressBar progressBar;
    private MaterialButton btnPerfilConductor, btnCerrarSesion;

    // Views de estadísticas
    private TextView tvReservasConfirmadas, tvAsientosDisponibles, tvTotalIngresos;
    private TextView tvInfoCapacidad, tvInfoIngresos, tvInfoReservas;
    private TextView tvUltimaActualizacion;

    // Views por ruta
    private TextView tvNombreRutaReservas, tvReservasRuta, tvNombreRutaAsientos, tvAsientosRuta;
    private TextView tvNombreRutaReservas2, tvReservasRuta2, tvNombreRutaAsientos2, tvAsientosRuta2;
    private TextView tvContadorReservas, tvContadorRutas;

    // ViewModels INDIVIDUALES (sin DriverHomeViewModel)
    private ReservasViewModel reservasViewModel;
    private EstadisticasViewModel estadisticasViewModel;
    private RutasViewModel rutasViewModel;
    private AuthManager authManager;
    private ReservaAdapter reservaAdapter;
    private RutaAdapter rutaAdapter;
    private List<Reserva> listaReservas = new ArrayList<>();
    private List<Ruta> listaRutas = new ArrayList<>();
    private SimpleDateFormat timeFormat;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_inicio_conductor);
        Log.d(TAG, "🚀 Iniciando actividad con ViewModels individuales");

        authManager = AuthManager.getInstance();
        timeFormat = new SimpleDateFormat("HH:mm", Locale.getDefault());

        // ✅ INICIALIZAR VIEWMODELS INDIVIDUALMENTE
        reservasViewModel = new ViewModelProvider(this).get(ReservasViewModel.class);
        estadisticasViewModel = new ViewModelProvider(this).get(EstadisticasViewModel.class);
        rutasViewModel = new ViewModelProvider(this).get(RutasViewModel.class);

        // Inicializar contexto en ViewModels que lo necesiten
        reservasViewModel.initialize(this);

        initializeViews();
        setupRecyclerView();
        setupButtons();
        setupObservers();

        loadDriverData();
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

        tvContadorReservas = findViewById(R.id.tvContadorReservas);
        tvContadorRutas = findViewById(R.id.tvContadorRutas);

        progressBar = findViewById(R.id.progressBar);
        rvReservas = findViewById(R.id.recyclerReservas);
        rvProximasRutas = findViewById(R.id.recyclerProximasRutas);
        tvEmptyReservas = findViewById(R.id.tvEmptyReservas);
        tvEmptyRutas = findViewById(R.id.tvEmptyRutas);

        // Botones
        btnPerfilConductor = findViewById(R.id.btnPerfilConductor);
        btnCerrarSesion = findViewById(R.id.btnCerrarSesion);

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
    /** Metodo para configurar los botones de la UI */
    private void setupButtons() {
        Log.d(TAG, "🔧 Configurando botones...");

        // Botón de cerrar sesión
        btnCerrarSesion.setOnClickListener(view -> {
            Log.d(TAG, "🚪 Cerrando sesión de conductor...");

            new MaterialAlertDialogBuilder(this)
                    .setTitle(getString(R.string.cerrar_sesion))
                    .setMessage(getString(R.string.confirmar_cerrar_sesion))
                    .setPositiveButton(getString(R.string.confirmar), (dialog, which) -> {
                        // Limpiar recursos antes de cerrar sesión
                        cleanupResources();
                        authManager.signOut(this);
                        Toast.makeText(this, getString(R.string.sesion_cerrada_exito), Toast.LENGTH_SHORT).show();
                        finish();
                    })
                    .setNegativeButton(getString(R.string.cancelar), null)
                    .show();
        });

        // Botón de perfil del conductor
        btnPerfilConductor.setOnClickListener(view -> {
            Log.d(TAG, "👤 Navegando a perfil de conductor");
            goToDriverProfile();
        });

        // ✅ Configurar ícono de refresh
        ImageView icRefresh = findViewById(R.id.ic_refresh);
        if (icRefresh != null) {
            icRefresh.setOnClickListener(view -> {
                if (isDataLoaded) {
                    Log.d(TAG, "🎯 Refresh manual desde ícono");
                    Toast.makeText(this, getString(R.string.actualizando_datos), Toast.LENGTH_SHORT).show();

                    // Animación simple
                    icRefresh.animate()
                            .rotationBy(720f)                    // 2 vueltas
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

        Log.d(TAG, "✅ Botones configurados");
    }
    /** Metodo para configurar los observadores de cada seccion */
    private void setupObservers() {
        Log.d(TAG, "👀 Configurando observadores...");

        // ✅ OBSERVAR DATOS DEL CONDUCTOR SIN THREAD INFINITO
        reservasViewModel.getConductorNombreLiveData().observe(this, nombre -> {
            if (nombre != null && !nombre.isEmpty()) {
                tvConductor.setText(nombre);
                Log.d(TAG, "✅ Nombre del conductor actualizado: " + nombre);

                // Establecer conductor en EstadisticasViewModel
                estadisticasViewModel.setConductorActual(nombre);

                // Refrescar estdisticas al cargar conductor
                estadisticasViewModel.refreshStatistics();

                isDataLoaded = true;
            }
        });

        reservasViewModel.getConductorUIDLiveData().observe(this, uid -> {
            if (uid != null && !uid.isEmpty()) {
                Log.d(TAG, "✅ UID del conductor obtenido: " + uid);
                // Configurar listener en tiempo real solo una vez
                if (!isDataLoaded) {
                    reservasViewModel.setupRealTimeListener();
                }
            }
        });

        // Observar reservas
        reservasViewModel.getReservasLiveData().observe(this, reservas -> {
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
                    estadisticasViewModel.calculateRouteStatistics(listaRutas, listaReservas);
                }
            } else {
                tvContadorReservas.setText(getString(R.string.contador_reservas, 0));
            }
        });

        // Observar estado de carga
        reservasViewModel.getLoadingLiveData().observe(this, isLoading -> {
            if (isLoading != null) {
                progressBar.setVisibility(isLoading ? View.VISIBLE : View.GONE);
                if (!isLoading) {
                    isDataLoaded = true;
                }
                Log.d(TAG, isLoading ? "⏳ Cargando datos..." : "✅ Carga completada");
            }
        });

        // Observar errores
        reservasViewModel.getErrorLiveData().observe(this, error -> {
            if (error != null && !error.isEmpty()) {
                Log.e(TAG, "❌ Error observado: " + error);
                Toast.makeText(InicioConductorActivity.this,
                        getString(R.string.error_carga_estadisticas), Toast.LENGTH_SHORT).show();
            }
        });

        // Observar rutas
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
                    estadisticasViewModel.calculateRouteStatistics(rutas, listaReservas);
                }

                // Actualizar tiempo de actualización
                actualizarTiempoActualizacion();
            } else {
                tvContadorRutas.setText(getString(R.string.contador_rutas, 0));
                showEmptyRoutes();
            }
        });

        // Observar estadísticas generales
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

        // Observar estdisticas por ruta
        // Ruta 1
        // observa las reservas confirmadas
        estadisticasViewModel.getReservasRuta1LiveData().observe(this, count -> {
            if (count != null) {
                tvReservasRuta.setText(String.valueOf(count));
            }
        });
        // observa los asientos disponibles
        estadisticasViewModel.getAsientosRuta1LiveData().observe(this, count -> {
            if (count != null) {
                tvAsientosRuta.setText(String.valueOf(count));
                // acctualizar informacion de porcentaje capacidad card ruta1
            }
        });
        // Ruta 2
        // observa las reservas confirmadas
        estadisticasViewModel.getReservasRuta2LiveData().observe(this, count -> {
            if (count != null) {
                tvReservasRuta2.setText(String.valueOf(count));
            }
        });
        // observa los asientos disponibles
        estadisticasViewModel.getAsientosRuta2LiveData().observe(this, count -> {
            if (count != null) {
                tvAsientosRuta2.setText(String.valueOf(count));
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
        rutaAdapter = new RutaAdapter(listaRutas);
        rvProximasRutas.setLayoutManager(new LinearLayoutManager(this,
                LinearLayoutManager.HORIZONTAL, false));
        rvProximasRutas.setAdapter(rutaAdapter);
        rvProximasRutas.setItemAnimator(null); // Desactivar animaciones

        Log.d(TAG, "✅ RecyclerView configurado");
    }

    /** Metodo para cargar todos los datos del conductor y lamado al metodo para cargar rutas
     * asignadas al conductor */
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

        // ✅ USAR ReservasViewModel PARA CARGAR RESERVAS
        reservasViewModel.loadDriverData(userId);

        // ✅ CARGAR RUTAS ASIGNADAS AL CONDUCTOR
        loadAssignedRoutes(userId);
    }

    /** Metodo para cargar rutas asignadas del conductor */
    private void loadAssignedRoutes(String userId) {
        Log.d(TAG, "🗺️ Cargando rutas asignadas para: " + userId);

        // Limpiar listener anterior si existe
        if (routesListener != null && conductorRef != null) {
            conductorRef.removeEventListener(routesListener);
        }

        // Obtener referencia a la base de datos
        conductorRef = FirebaseDatabase.getInstance()
                .getReference("conductores")
                .child(userId);

        routesListener = new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                if (snapshot.exists()) {
                    List<String> horariosAsignados = new ArrayList<>();

                    // Obtener la lista de horarios asignados
                    if (snapshot.hasChild("horariosAsignados")) {
                        Object horariosObj = snapshot.child("horariosAsignados").getValue();

                        if (horariosObj instanceof List) {
                            for (Object item : (List<?>) horariosObj) {
                                if (item != null) {
                                    horariosAsignados.add(item.toString());
                                }
                            }
                        }
                    }

                    Log.d(TAG, "📅 Horarios asignados encontrados: " + horariosAsignados.size());

                    if (!horariosAsignados.isEmpty()) {
                        // ✅ LLAMAR AL VIEWMODEL DE RUTAS
                        rutasViewModel.loadRoutes(horariosAsignados);
                    } else {
                        Log.w(TAG, "⚠️ El conductor no tiene horarios asignados");
                        rutasViewModel.clearRoutes();
                    }
                } else {
                    Log.w(TAG, "⚠️ Documento del conductor no encontrado");
                    rutasViewModel.clearRoutes();
                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {
                Log.e(TAG, "❌ Error cargando horarios asignados: " + error.getMessage());
                rutasViewModel.setError("Error cargando rutas asignadas: " + error.getMessage());
            }
        };

        conductorRef.addValueEventListener(routesListener);
    }
    /** Metodo para recargar todos los datos de reservas y rutas */
    private void reloadAllData() {
        String userId = FirebaseAuth.getInstance().getCurrentUser().getUid();
        if (userId != null && !userId.isEmpty()) {
            Log.d(TAG, "🔄 Recargando todos los datos para: " + userId);

            // Recargar de reservas desde ReservasViewModel
            reservasViewModel.refreshAllData();

            // Recargar rutas asignadas
            loadAssignedRoutes(userId);

            // Actualizar tiempo
            actualizarTiempoActualizacion();
        }
    }
    /** Metodo para mostrar informacion por defecto en caso de no poder cargar los datos desde
     * firebase */
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

        new MaterialAlertDialogBuilder(this)
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
                        reservasViewModel.confirmReservation(reserva);
                    } else {
                        reservasViewModel.cancelReservation(reserva);
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
    /** Metodo para actualizar la UI seccion de rutas
     * con control de visualizacion de ruta 2 si esta asignada */
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
    /** Metodo para calcular el porcetaje de ocupacion total de las 2 rutas */
    // Este metodo se debe poner en el view model de estadisticas
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
    /** Metodo para la nevegacion a la actividad del perfil del conductor */
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
    /** Metodo para mostrar que no hay reservas activas y ocultar el recyclerView*/
    private void showEmptyReservations() {
        Log.d(TAG, "ℹ️ Mostrando estado vacío para reservas");

        tvEmptyReservas.setVisibility(View.VISIBLE);
        rvReservas.setVisibility(View.GONE);
    }
    /** Metodo para mostrar que no hay rutas asignadas y ocultar el recyclerView*/
    private void showEmptyRoutes() {
        Log.d(TAG, "ℹ️ Mostrando estado vacío para rutas");

        tvEmptyRutas.setVisibility(View.VISIBLE);
        rvProximasRutas.setVisibility(View.GONE);
    }
    /** Metodo para dar formato de la moneda */
    private String formatCurrency(double amount) {
        // Usar el string de formato directamente
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

        isDataLoaded = false;
    }
    /** Metodos de ciclo de vida de la actividad */
    // actividad en pausa
    @Override
    protected void onPause() {
        super.onPause();
        Log.d(TAG, "⏸️ onPause - Actividad en segundo plano");

        // Opcional: Pausar actualizaciones en tiempo real
        reservasViewModel.pauseRealTimeUpdates();
    }
    // retomar actividad
    @Override
    protected void onResume() {
        super.onResume();
        Log.d(TAG, "📱 onResume - Actividad en primer plano");

        // Recargar datos si es necesario
        String conductorUID = reservasViewModel.getConductorUIDActual();
        if (conductorUID != null && !conductorUID.isEmpty()) {
            Log.d(TAG, "🔄 Recargando datos en onResume");
            reloadAllData();
        }
    }
    // Destruir actividad
    @Override
    protected void onDestroy() {
        super.onDestroy();
        Log.d(TAG, "📱 onDestroy - Actividad destruida");

        //Limpiar todos los recursos
        cleanupResources();
    }
}
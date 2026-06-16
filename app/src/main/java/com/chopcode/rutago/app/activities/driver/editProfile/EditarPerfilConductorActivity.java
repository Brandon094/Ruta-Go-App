package com.chopcode.rutago.app.activities.driver.editProfile;

import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.config.MyApp;
import com.chopcode.rutago.app.models.Conductor;
import com.chopcode.rutago.app.models.Vehiculo;
import com.chopcode.rutago.app.services.user.UserService;
import com.google.android.material.appbar.MaterialToolbar;
import com.google.android.material.tabs.TabLayout;
import com.google.android.material.textfield.TextInputEditText;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.ValueEventListener;

public class EditarPerfilConductorActivity extends AppCompatActivity {

    // Tag para logs
    private static final String TAG = "EditarPerfilConductor";

    // Servicios
    private UserService userService;
    private DatabaseReference vehiculoRef;

    // Views
    private TextInputEditText etCorreo, etNombre, etTelefono, etPlaca, etMarca, etModelo, etColor, etCapacidad, etAnio;
    private TextView tvCorreoActual, tvNombreActual, tvTelefonoActual, tvPlacaActual, tvMarcaActual, tvModeloActual, tvColorActual, tvCapacidadActual, tvAnioActual;
    private MaterialToolbar topAppBar;
    private TabLayout tabLayout;
    private View containerPersonal, containerVehiculo;
    private Button btnCancelar, btnGuardarCambios;

    // Datos
    private String userId;
    private Conductor conductorActual;
    private Vehiculo vehiculoActual;
    private String vehiculoId;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.d(TAG, "🚀 onCreate - Iniciando actividad de edición de perfil conductor");

        setContentView(R.layout.activity_editar_perfil);

        // Inicializar servicios usando MyApp
        userService = new UserService();
        vehiculoRef = MyApp.getDatabaseReference("vehiculos");
        Log.d(TAG, "✅ Servicios inicializados usando MyApp");

        // Obtener usuario actual usando MyApp
        FirebaseUser currentUser = MyApp.getCurrentUser();
        if (currentUser == null) {
            Log.e(TAG, "❌ Usuario no autenticado - finalizando actividad");
            Toast.makeText(this, "Usuario no autenticado", Toast.LENGTH_SHORT).show();
            finish();
            return;
        }
        userId = currentUser.getUid();
        Log.d(TAG, "👤 Usuario autenticado - UID: " + userId);

        // Inicializar vistas
        initViews();

        // Cargar datos del conductor y vehículo
        cargarDatosConductor();

        // Configurar listeners
        configurarListeners();

        Log.d(TAG, "✅ Configuración completa - Actividad lista");
    }

    private void initViews() {
        Log.d(TAG, "🔧 Inicializando vistas...");

        // Textos de valores actuales
        tvCorreoActual = findViewById(R.id.tvCorreoActual);
        tvNombreActual = findViewById(R.id.tvNombreActual);
        tvTelefonoActual = findViewById(R.id.tvTelefonoActual);
        tvPlacaActual = findViewById(R.id.tvPlacaActual);
        tvMarcaActual = findViewById(R.id.tvMarcaActual);
        tvModeloActual = findViewById(R.id.tvModeloActual);
        tvColorActual = findViewById(R.id.tvColorActual);
        tvCapacidadActual = findViewById(R.id.tvCapacidadActual);
        tvAnioActual = findViewById(R.id.tvAnioActual);

        // Campos de entrada
        etCorreo = findViewById(R.id.etCorreo);
        etNombre = findViewById(R.id.etNombre);
        etTelefono = findViewById(R.id.etTelefono);
        etPlaca = findViewById(R.id.etPlaca);
        etMarca = findViewById(R.id.etMarca);
        etModelo = findViewById(R.id.etModelo);
        etColor = findViewById(R.id.etColor);
        etCapacidad = findViewById(R.id.etCapacidad);
        etAnio = findViewById(R.id.etAnio);

        topAppBar = findViewById(R.id.topAppBar);
        tabLayout = findViewById(R.id.tabLayoutEditar);
        containerPersonal = findViewById(R.id.containerPersonal);
        containerVehiculo = findViewById(R.id.containerVehiculo);

        // Botones
        btnCancelar = findViewById(R.id.btnCancelar);
        btnGuardarCambios = findViewById(R.id.btnGuardarCambios);

        Log.d(TAG, "✅ Todas las vistas inicializadas correctamente");
    }

    private void cargarDatosConductor() {
        Log.d(TAG, "🔍 Cargando datos del conductor...");

        // Verificar si es conductor
        userService.checkIfUserIsDriver(userId, new UserService.DriverCheckCallback() {
            @Override
            public void onDriverCheckComplete(boolean isDriver) {
                if (!isDriver) {
                    Log.w(TAG, "⚠️ El usuario no está registrado como conductor");
                    Toast.makeText(EditarPerfilConductorActivity.this,
                            "El usuario no está registrado como conductor", Toast.LENGTH_LONG).show();
                    finish();
                    return;
                }

                Log.d(TAG, "✅ Usuario validado como conductor - cargando datos...");
                // Cargar datos del conductor
                cargarDatosDriver();
            }

            @Override
            public void onError(String error) {
                Log.e(TAG, "❌ Error verificando conductor: " + error);
                Toast.makeText(EditarPerfilConductorActivity.this,
                        "Error verificando conductor: " + error, Toast.LENGTH_LONG).show();
                finish();
            }
        });
    }

    private void cargarDatosDriver() {
        Log.d(TAG, "📋 Cargando datos completos del conductor...");

        // Cargar datos del conductor desde la base de datos usando MyApp
        DatabaseReference conductorRef = MyApp.getDatabaseReference("conductores")
                .child(userId);

        conductorRef.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot snapshot) {
                if (snapshot.exists()) {
                    // Carga manual segura para evitar error de Long to String
                    conductorActual = new Conductor();
                    conductorActual.setId(userId);
                    conductorActual.setNombre(getStringSafely(snapshot.child("nombre")));
                    conductorActual.setTelefono(getStringSafely(snapshot.child("telefono")));
                    conductorActual.setEmail(getStringSafely(snapshot.child("email")));
                    conductorActual.setVehiculoId(getStringSafely(snapshot.child("vehiculoId")));
                    conductorActual.setPlacaVehiculo(getStringSafely(snapshot.child("placaVehiculo")));

                    Log.d(TAG, "✅ Datos del conductor cargados:");
                    Log.d(TAG, "   - Nombre: " + conductorActual.getNombre());
                    Log.d(TAG, "   - Teléfono: " + conductorActual.getTelefono());

                    // Obtener ID del vehículo
                    vehiculoId = conductorActual.getVehiculoId();
                    Log.d(TAG, "🚗 ID del vehículo: " + vehiculoId);

                    // Actualizar datos del conductor en la UI
                    actualizarUIDatosConductor();

                    // Cargar datos del vehículo si existe
                    if (vehiculoId != null && !vehiculoId.isEmpty()) {
                            Log.d(TAG, "🔍 Cargando datos del vehículo...");
                            cargarDatosVehiculo();
                        } else {
                            Log.w(TAG, "⚠️ Conductor no tiene vehículo asignado");
                            // Si no tiene vehículo, mostrar campos vacíos
                            inicializarCamposVehiculoVacios();
                        }
                } else {
                    Log.e(TAG, "❌ No se encontraron datos del conductor en Firebase");
                    Toast.makeText(EditarPerfilConductorActivity.this,
                            "No se encontraron datos del conductor", Toast.LENGTH_LONG).show();
                }
            }

            @Override
            public void onCancelled(DatabaseError error) {
                Log.e(TAG, "❌ Error cargando datos del conductor: " + error.getMessage());
                Toast.makeText(EditarPerfilConductorActivity.this,
                        "Error cargando datos del conductor: " + error.getMessage(), Toast.LENGTH_LONG).show();
            }
        });
    }

    private void cargarDatosVehiculo() {
        vehiculoRef.child(vehiculoId).addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot snapshot) {
                if (snapshot.exists()) {
                    // Carga manual segura para evitar error de Long to String en campos numéricos
                    vehiculoActual = new Vehiculo();
                    vehiculoActual.setId(vehiculoId);
                    vehiculoActual.setPlaca(getStringSafely(snapshot.child("placa")));
                    vehiculoActual.setMarca(getStringSafely(snapshot.child("marca")));
                    vehiculoActual.setModelo(getStringSafely(snapshot.child("modelo")));
                    vehiculoActual.setColor(getStringSafely(snapshot.child("color")));
                    vehiculoActual.setAno(getStringSafely(snapshot.child("ano")));
                    vehiculoActual.setConductorId(userId); // ✅ Asegurar que el dueño esté cargado
                    vehiculoActual.setEstado(getStringSafely(snapshot.child("estado")));
                    
                    Object cap = snapshot.child("capacidad").getValue();
                    if (cap instanceof Number) {
                        vehiculoActual.setCapacidad(((Number) cap).intValue());
                    } else if (cap instanceof String) {
                        try {
                            vehiculoActual.setCapacidad(Integer.parseInt((String) cap));
                        } catch (Exception e) {
                            vehiculoActual.setCapacidad(0);
                        }
                    }

                    Log.d(TAG, "✅ Datos del vehículo cargados:");
                    Log.d(TAG, "   - Placa: " + vehiculoActual.getPlaca());
                    actualizarUIDatosVehiculo();
                } else {
                    Log.w(TAG, "⚠️ No se encontró el vehículo con ID: " + vehiculoId);
                    inicializarCamposVehiculoVacios();
                }
            }

            @Override
            public void onCancelled(DatabaseError error) {
                Log.e(TAG, "❌ Error cargando datos del vehículo: " + error.getMessage());
                Toast.makeText(EditarPerfilConductorActivity.this,
                        "Error cargando datos del vehículo: " + error.getMessage(), Toast.LENGTH_LONG).show();
                inicializarCamposVehiculoVacios();
            }
        });
    }

    private void actualizarUIDatosConductor() {
        Log.d(TAG, "🔄 Actualizando UI con datos del conductor");

        if (conductorActual != null) {
            // Mostrar valores actuales en los TextViews
            tvNombreActual.setText("Nombre actual: " +
                    (conductorActual.getNombre() != null ? conductorActual.getNombre() : "No definido"));
            tvTelefonoActual.setText("Teléfono actual: " +
                    (conductorActual.getTelefono() != null ? conductorActual.getTelefono() : "No definido"));
            tvCorreoActual.setText("Correo actual: " +
                    (conductorActual.getEmail() != null ? conductorActual.getEmail() : "No definido"));

            // Poblar solo el correo (suele ser no editable)
            if (etCorreo != null) {
                etCorreo.setText(conductorActual.getEmail());
            }

            // Los campos etNombre y etTelefono permanecen vacíos para nueva entrada
            // similar a EditarPerfilActivity (pasajero)
        }

        Log.d(TAG, "✅ UI del conductor actualizada");
    }

    private void actualizarUIDatosVehiculo() {
        Log.d(TAG, "🔄 Actualizando UI con datos del vehículo");

        if (vehiculoActual != null) {
            // Mostrar valores actuales en los TextViews
            tvPlacaActual.setText("Placa actual: " +
                    (vehiculoActual.getPlaca() != null ? vehiculoActual.getPlaca() : "No definida"));
            tvMarcaActual.setText("Marca actual: " +
                    (vehiculoActual.getMarca() != null ? vehiculoActual.getMarca() : "No definida"));
            tvModeloActual.setText("Modelo actual: " +
                    (vehiculoActual.getModelo() != null ? vehiculoActual.getModelo() : "No definido"));
            tvColorActual.setText("Color actual: " +
                    (vehiculoActual.getColor() != null ? vehiculoActual.getColor() : "No definido"));
            tvCapacidadActual.setText("Capacidad actual: " + vehiculoActual.getCapacidad());
            tvAnioActual.setText("Año actual: " +
                    (vehiculoActual.getAno() != null ? vehiculoActual.getAno() : "No definido"));

            // Los campos etPlaca, etMarca, etc., permanecen vacíos para nueva entrada
        }

        Log.d(TAG, "✅ UI del vehículo actualizada");
    }

    private void inicializarCamposVehiculoVacios() {
        Log.d(TAG, "🔄 Inicializando campos de vehículo vacíos");

        tvPlacaActual.setText("Placa actual: No definida");
        tvMarcaActual.setText("Marca actual: No definida");
        tvModeloActual.setText("Modelo actual: No definido");
        tvColorActual.setText("Color actual: No definido");
        tvCapacidadActual.setText("Capacidad actual: 0");
        tvAnioActual.setText("Año actual: No definido");

        etPlaca.setText("");
        etMarca.setText("");
        etModelo.setText("");
        etColor.setText("");
        etCapacidad.setText("");
        etAnio.setText("");

        Log.d(TAG, "✅ Campos de vehículo inicializados como vacíos");
    }

    private void configurarListeners() {
        Log.d(TAG, "🔧 Configurando listeners...");

        // Listener de Pestañas (TabLayout)
        if (tabLayout != null) {
            tabLayout.addOnTabSelectedListener(new TabLayout.OnTabSelectedListener() {
                @Override
                public void onTabSelected(TabLayout.Tab tab) {
                    if (tab.getPosition() == 0) {
                        Log.d(TAG, "📂 Pestaña seleccionada: Personal");
                        containerPersonal.setVisibility(View.VISIBLE);
                        containerVehiculo.setVisibility(View.GONE);
                    } else {
                        Log.d(TAG, "🚗 Pestaña seleccionada: Vehículo");
                        containerPersonal.setVisibility(View.GONE);
                        containerVehiculo.setVisibility(View.VISIBLE);
                    }
                }
                @Override public void onTabUnselected(TabLayout.Tab tab) {}
                @Override public void onTabReselected(TabLayout.Tab tab) {}
            });
        }

        // Toolbar navigation
        if (topAppBar != null) {
            topAppBar.setNavigationOnClickListener(v -> onBackPressed());
        }

        // Botón Cancelar
        btnCancelar.setOnClickListener(v -> {
            Log.d(TAG, "🎯 Click en botón Cancelar - finalizando actividad");
            finish();
        });

        // Botón Guardar Cambios
        btnGuardarCambios.setOnClickListener(v -> {
            Log.d(TAG, "🎯 Click en botón Guardar Cambios");
            guardarCambios();
        });

        Log.d(TAG, "✅ Listeners configurados correctamente");
    }

    private void guardarCambios() {
        Log.d(TAG, "🔄 Iniciando proceso de guardar cambios con lógica flexible...");

        // Capturar entradas del usuario
        String nombreInput = etNombre != null && etNombre.getText() != null ? etNombre.getText().toString().trim() : "";
        String telefonoInput = etTelefono != null && etTelefono.getText() != null ? etTelefono.getText().toString().trim() : "";
        String placaInput = etPlaca != null && etPlaca.getText() != null ? etPlaca.getText().toString().trim() : "";
        String marcaInput = etMarca != null && etMarca.getText() != null ? etMarca.getText().toString().trim() : "";
        String modeloInput = etModelo != null && etModelo.getText() != null ? etModelo.getText().toString().trim() : "";
        String colorInput = etColor != null && etColor.getText() != null ? etColor.getText().toString().trim() : "";
        String capacidadInput = etCapacidad != null && etCapacidad.getText() != null ? etCapacidad.getText().toString().trim() : "";
        String anioInput = etAnio != null && etAnio.getText() != null ? etAnio.getText().toString().trim() : "";

        // Lógica de Mezcla: Si la entrada está vacía, usar el valor actual de la base de datos
        String nombreFinal = !nombreInput.isEmpty() ? nombreInput : (conductorActual != null ? conductorActual.getNombre() : "");
        String telefonoFinal = !telefonoInput.isEmpty() ? telefonoInput : (conductorActual != null ? conductorActual.getTelefono() : "");
        
        String placaFinal = !placaInput.isEmpty() ? placaInput : (vehiculoActual != null ? vehiculoActual.getPlaca() : "");
        String marcaFinal = !marcaInput.isEmpty() ? marcaInput : (vehiculoActual != null ? vehiculoActual.getMarca() : "");
        String modeloFinal = !modeloInput.isEmpty() ? modeloInput : (vehiculoActual != null ? vehiculoActual.getModelo() : "");
        String colorFinal = !colorInput.isEmpty() ? colorInput : (vehiculoActual != null ? vehiculoActual.getColor() : "");
        String anioFinal = !anioInput.isEmpty() ? anioInput : (vehiculoActual != null ? vehiculoActual.getAno() : "");
        
        int capacidadFinal = (vehiculoActual != null) ? vehiculoActual.getCapacidad() : 0;
        if (!capacidadInput.isEmpty()) {
            try {
                capacidadFinal = Integer.parseInt(capacidadInput);
                if (capacidadFinal <= 0) {
                    etCapacidad.setError("La capacidad debe ser mayor a 0");
                    return;
                }
            } catch (NumberFormatException e) {
                etCapacidad.setError("Formato de capacidad inválido");
                return;
            }
        }

        // Verificar si se ingresó algún cambio real
        boolean hayCambios = !nombreInput.isEmpty() || !telefonoInput.isEmpty() || !placaInput.isEmpty() || 
                           !marcaInput.isEmpty() || !modeloInput.isEmpty() || !colorInput.isEmpty() || 
                           !capacidadInput.isEmpty() || !anioInput.isEmpty();

        if (!hayCambios) {
            Log.d(TAG, "ℹ️ No se detectaron cambios en los campos de entrada");
            Toast.makeText(this, "No has ingresado ningún cambio", Toast.LENGTH_SHORT).show();
            return;
        }

        // Validaciones mínimas de seguridad para datos que NO pueden ser nulos en Firebase
        if (TextUtils.isEmpty(nombreFinal)) {
            etNombre.setError("El nombre es necesario");
            return;
        }
        
        if (TextUtils.isEmpty(placaFinal)) {
            etPlaca.setError("La placa es necesaria para identificar el vehículo");
            return;
        }

        Log.d(TAG, "✅ Validaciones de mezcla exitosas. Guardando...");

        // Mostrar progreso
        btnGuardarCambios.setEnabled(false);
        btnGuardarCambios.setText("Guardando...");

        // Actualizar usando los valores mezclados
        actualizarConductorYVehiculo(nombreFinal, telefonoFinal, placaFinal, marcaFinal, 
                                   modeloFinal, colorFinal, capacidadFinal, anioFinal);
    }

    private void actualizarConductorYVehiculo(String nombre, String telefono, String placa,
                                              String marca, String modelo, String color, int capacidad, String anio) {
        Log.d(TAG, "🔄 Actualizando conductor y vehículo...");

        // Primero actualizar/conseguir vehículo
        actualizarVehiculo(placa, marca, modelo, color, capacidad, anio, new VehiculoCallback() {
            @Override
            public void onVehiculoActualizado(String vehiculoId) {
                Log.d(TAG, "✅ Vehículo actualizado - ID: " + vehiculoId);
                // Luego actualizar conductor con el ID del vehículo
                actualizarConductor(nombre, telefono, vehiculoId, placa);
            }

            @Override
            public void onError(String error) {
                Log.e(TAG, "❌ Error actualizando vehículo: " + error);
                btnGuardarCambios.setEnabled(true);
                btnGuardarCambios.setText("Guardar");
                Toast.makeText(EditarPerfilConductorActivity.this,
                        "Error al guardar vehículo: " + error, Toast.LENGTH_LONG).show();
            }
        });
    }

    private void actualizarVehiculo(String placa, String marca, String modelo, String color,
                                    int capacidad, String anio, VehiculoCallback callback) {
        Log.d(TAG, "🚗 Actualizando información del vehículo...");

        // Si ya existe un vehículo, actualizarlo. Si no, crear uno nuevo.
        if (vehiculoActual != null && vehiculoId != null) {
            Log.d(TAG, "🔄 Actualizando vehículo existente - ID: " + vehiculoId);
            // Actualizar vehículo existente
            vehiculoActual.setPlaca(placa);
            vehiculoActual.setMarca(marca);
            vehiculoActual.setModelo(modelo);
            vehiculoActual.setColor(color);
            vehiculoActual.setCapacidad(capacidad);
            vehiculoActual.setAno(anio);
            vehiculoActual.setConductorId(userId); // ✅ Crítico para cumplir las reglas de seguridad
            vehiculoActual.setEstado("activo");

            vehiculoRef.child(vehiculoId).setValue(vehiculoActual)
                    .addOnSuccessListener(aVoid -> {
                        Log.d(TAG, "✅ Vehículo existente actualizado exitosamente");
                        callback.onVehiculoActualizado(vehiculoId);
                    })
                    .addOnFailureListener(e -> {
                        Log.e(TAG, "❌ Error actualizando vehículo existente: " + e.getMessage());
                        callback.onError(e.getMessage());
                    });
        } else {
            Log.d(TAG, "🆕 Creando nuevo vehículo...");
            // Crear nuevo vehículo
            String nuevoVehiculoId = vehiculoRef.push().getKey();
            Vehiculo nuevoVehiculo = new Vehiculo(nuevoVehiculoId, placa, marca, modelo, color, anio,
                    capacidad, userId, "activo");

            Log.d(TAG, "📝 Nuevo vehículo creado - ID: " + nuevoVehiculoId);

            vehiculoRef.child(nuevoVehiculoId).setValue(nuevoVehiculo)
                    .addOnSuccessListener(aVoid -> {
                        Log.d(TAG, "✅ Nuevo vehículo guardado exitosamente");
                        callback.onVehiculoActualizado(nuevoVehiculoId);
                    })
                    .addOnFailureListener(e -> {
                        Log.e(TAG, "❌ Error guardando nuevo vehículo: " + e.getMessage());
                        callback.onError(e.getMessage());
                    });
        }
    }

    private void actualizarConductor(String nombre, String telefono, String vehiculoId, String placa) {
        Log.d(TAG, "👤 Actualizando datos del conductor...");

        // Usar MyApp para obtener referencias de base de datos
        DatabaseReference conductorRef = MyApp.getDatabaseReference("conductores")
                .child(userId);

        // Actualizar datos del conductor
        conductorRef.child("nombre").setValue(nombre);
        conductorRef.child("telefono").setValue(telefono);
        conductorRef.child("vehiculoId").setValue(vehiculoId);
        
        conductorRef.child("placaVehiculo").setValue(placa);

        // También actualizar en la colección de usuarios para consistencia
        DatabaseReference usuarioRef = MyApp.getDatabaseReference("usuarios")
                .child(userId);

        usuarioRef.child("nombre").setValue(nombre);
        usuarioRef.child("telefono").setValue(telefono);

        Log.d(TAG, "✅ Datos del conductor actualizados exitosamente");

        // Registrar evento de análisis usando MyApp
        registrarEventoAnalitico("perfil_conductor_actualizado", nombre, telefono);

        // Éxito
        btnGuardarCambios.setEnabled(true);
        btnGuardarCambios.setText("Guardar");
        Toast.makeText(this, "Perfil actualizado correctamente", Toast.LENGTH_SHORT).show();
        Log.d(TAG, "🎉 Perfil actualizado exitosamente - finalizando actividad");
        finish();
    }

    /**
     * Método helper para registrar eventos de análisis usando MyApp
     */
    private void registrarEventoAnalitico(String evento, String nombre, String telefono) {
        try {
            java.util.Map<String, Object> params = new java.util.HashMap<>();
            params.put("user_id", userId);
            params.put("conductor_nombre", nombre);
            params.put("conductor_telefono", telefono);
            params.put("timestamp", System.currentTimeMillis());

            MyApp.logEvent(evento, params);
            Log.d(TAG, "📊 Evento analítico registrado: " + evento);
        } catch (Exception e) {
            Log.e(TAG, "❌ Error registrando evento analítico: " + e.getMessage());
        }
    }

    // Interface para callback del vehículo
    private interface VehiculoCallback {
        void onVehiculoActualizado(String vehiculoId);
        void onError(String error);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        Log.d(TAG, "📱 onDestroy - Actividad destruida");
    }

    /**
     * Obtiene un valor de forma segura como String, incluso si es un número en Firebase
     */
    private String getStringSafely(DataSnapshot snapshot) {
        Object value = snapshot.getValue();
        if (value == null) return "";
        return String.valueOf(value);
    }
}

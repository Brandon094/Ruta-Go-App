package com.chopcode.rutago.app.activities.common;

import static com.chopcode.rutago.app.managers.permissions.PermissionManager.requestNotificationPermission;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.graphics.Typeface;
import android.graphics.drawable.ColorDrawable;
import android.os.Build;
import android.os.Bundle;
import android.text.method.HideReturnsTransformationMethod;
import android.text.method.PasswordTransformationMethod;
import android.util.Log;
import android.util.TypedValue;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;

import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.activities.driver.InicioConductorActivity;
import com.chopcode.rutago.app.activities.passenger.InicioUsuariosActivity;
import com.chopcode.rutago.app.activities.passenger.reservation.createReservation.CrearReservasActivity;
import com.chopcode.rutago.app.config.MyApp;
import com.chopcode.rutago.app.managers.notificactions.NotificationManager;
import com.chopcode.rutago.app.managers.permissions.PermissionManager;
import com.chopcode.rutago.app.services.auth.IniciarService;
import com.google.android.material.button.MaterialButton;
import com.google.android.material.snackbar.Snackbar;
import com.google.android.material.textfield.TextInputEditText;
import com.google.android.material.textfield.TextInputLayout;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.ValueEventListener;

/**
 * Actividad para el inicio de sesión de los usuarios.
 */
public class InicioDeSesionActivity extends AppCompatActivity {

    private TextInputEditText editTextUsuario, editTextPassword;
    private Button buttonIngresar;
    private Button btnGoogleSignIn;
    private IniciarService iniciarService;
    private TextView buttonRegistro, olvidasteContraseña;
    private View overlay;

    // Constantes para SharedPreferences
    private static final String PREFS_NAME = "UserPrefs";
    private static final String KEY_USER_ID = "user_id";
    private static final String KEY_USER_TYPE = "user_type";
    private DatabaseReference rtdb;

    // Tag para logs
    private static final String TAG = "InicioDeSesion";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_inicio_de_sesion);

        Log.d(TAG, "🚀 onCreate - Iniciando actividad de login");

        // Solicitar permiso de notificaciones
        requestNotificationPermission(this);

        // Inicializar overlay
        overlay = findViewById(R.id.overlay);

        // Inicializar Firebase - SOLO Realtime Database
        rtdb = MyApp.getDatabaseReference(""); // Referencia raíz a la base de datos

        // Inicializar IniciarService, pasando la actividad actual
        iniciarService = new IniciarService(this);
        Log.d(TAG, "✅ IniciarService inicializado");

        // Referenciar elementos de UI
        initViews();
        Log.d(TAG, "✅ Vistas inicializadas");

        // Manejar inicio de sesión con correo y contraseña
        setupEmailLogin();

        // Manejar inicio de sesión con Google
        setupGoogleLogin();

        // Manejar botón de registro
        setupRegistroButton();

        // Verificar si ya hay un usuario logueado
        verificarSesionExistente();

        Log.d(TAG, "✅ Configuración completa - Actividad lista");
    }

    /**
     * MOSTRAR OVERLAY (FONDO OSCURO)
     */
    private void mostrarOverlay() {
        if (overlay != null) {
            overlay.setVisibility(View.VISIBLE);
            overlay.setAlpha(0f);
            overlay.animate()
                    .alpha(1f)
                    .setDuration(300)
                    .withEndAction(() -> {
                        // Evitar clics en el contenido mientras está el overlay
                        overlay.setClickable(true);
                    })
                    .start();
        }
    }

    /**
     * OCULTAR OVERLAY
     */
    private void ocultarOverlay() {
        if (overlay != null) {
            overlay.animate()
                    .alpha(0f)
                    .setDuration(300)
                    .withEndAction(() -> {
                        overlay.setVisibility(View.GONE);
                        overlay.setClickable(false);
                    })
                    .start();
        }
    }

    /**
     * Inicializa todas las vistas del layout
     */
    private void initViews() {
        Log.d(TAG, "🔧 Inicializando vistas...");

        editTextUsuario = findViewById(R.id.editTextUsuario);
        editTextPassword = findViewById(R.id.editTextPassword);
        buttonIngresar = findViewById(R.id.buttonIngresar);
        buttonRegistro = findViewById(R.id.buttonRegistro);
        btnGoogleSignIn = findViewById(R.id.btnGoogleSignIn);
        olvidasteContraseña = findViewById(R.id.olvidasteContraseña);

        TextInputLayout passwordInputLayout = findViewById(R.id.passwordInputLayout);

        if (passwordInputLayout != null) {
            // Establecer el icono inicial (contraseña oculta)
            passwordInputLayout.setEndIconDrawable(ContextCompat.getDrawable(this, R.drawable.ic_visibility_off));

            // Manejar clic en el icono de visibilidad
            passwordInputLayout.setEndIconOnClickListener(v -> {
                if (editTextPassword.getTransformationMethod() instanceof PasswordTransformationMethod) {
                    // Si está oculta, mostrarla
                    editTextPassword.setTransformationMethod(HideReturnsTransformationMethod.getInstance());
                    passwordInputLayout.setEndIconDrawable(ContextCompat.getDrawable(this, R.drawable.ic_visibility_on));
                    Log.d(TAG, "👁️ Contraseña visible");
                } else {
                    // Si está visible, ocultarla
                    editTextPassword.setTransformationMethod(PasswordTransformationMethod.getInstance());
                    passwordInputLayout.setEndIconDrawable(ContextCompat.getDrawable(this, R.drawable.ic_visibility_off));
                    Log.d(TAG, "👁️ Contraseña oculta");
                }
                // Mover cursor al final
                if (editTextPassword.getText() != null) {
                    editTextPassword.setSelection(editTextPassword.getText().length());
                }
            });
        }

        // Configurar "Olvidaste contraseña"
        if (olvidasteContraseña != null) {
            olvidasteContraseña.setOnClickListener(v -> {
                Log.d(TAG, "🔑 Usuario solicitó recuperar contraseña");
                Intent intent = new Intent(InicioDeSesionActivity.this, RecuperarContrasenaActivity.class);
                startActivity(intent);
            });
        }

        Log.d(TAG, "✅ Vistas referenciadas correctamente");
    }

    /**
     * Verificar si ya existe una sesión activa
     */
    private void verificarSesionExistente() {
        SharedPreferences prefs = getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        String savedUserId = prefs.getString(KEY_USER_ID, null);
        String savedUserType = prefs.getString(KEY_USER_TYPE, null);

        Log.d(TAG, "🔍 [SESSION_CHECK] Buscando sesión local...");

        if (savedUserId != null && savedUserType != null) {
            Log.d(TAG, "📱 [SESSION_CHECK] Sesión encontrada en SharedPreferences: " + savedUserId + " (Rol: " + savedUserType + ")");

            FirebaseUser currentUser = MyApp.getCurrentUser();
            if (currentUser != null && currentUser.getUid().equals(savedUserId)) {
                Log.d(TAG, "✅ [SESSION_CHECK] Sesión Firebase coincide. Autologin...");

                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                    if (!PermissionManager.isNotificationPermissionGranted(this)) {
                        Log.d(TAG, "🔔 [SESSION_CHECK] Sin permiso notif, solicitando...");
                        requestNotificationPermission(this);
                    }
                }

                redirigirSegunTipoUsuario(savedUserType);
            } else {
                Log.w(TAG, "⚠️ [SESSION_CHECK] Inconsistencia: SharedPreferences dice " + savedUserId + " pero Firebase dice " + (currentUser != null ? currentUser.getUid() : "NULL"));
                limpiarSesionGuardada();
            }
        } else {
            Log.d(TAG, "ℹ️ [SESSION_CHECK] No hay sesión previa guardada");
        }
    }

    /**
     * Limpiar sesión guardada
     */
    private void limpiarSesionGuardada() {
        SharedPreferences prefs = getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        prefs.edit()
                .remove(KEY_USER_ID)
                .remove(KEY_USER_TYPE)
                .apply();
        Log.d(TAG, "🧹 Sesión guardada limpiada");
    }

    /**
     * Configura el login con email y contraseña - VERSIÓN MEJORADA CON UX PROFESIONAL
     */
    private void setupEmailLogin() {
        Log.d(TAG, "🔧 [UI_SETUP] Configurando botón de ingreso con email");

        buttonIngresar.setOnClickListener(v -> {
            String correo = editTextUsuario != null && editTextUsuario.getText() != null ? editTextUsuario.getText().toString().trim() : "";
            String password = editTextPassword != null && editTextPassword.getText() != null ? editTextPassword.getText().toString().trim() : "";

            Log.d(TAG, "🎯 [CLICK_LOGIN] Intento con email: " + correo);

            if (!validarCamposLogin(correo, password)) {
                Log.w(TAG, "⚠️ [CLICK_LOGIN] Validación de campos falló");
                return;
            }

            buttonIngresar.setEnabled(false);
            buttonIngresar.setText("Cargando...");
            mostrarProgreso(true);

            iniciarService.iniciarSesionCorreo(correo, password, new IniciarService.LoginCallback() {
                @Override
                public void onLoginSuccess(String tipoUsuario) {
                    Log.d(TAG, "✅ [LOGIN_RESULT] Éxito. Rol: " + tipoUsuario);

                    FirebaseUser user = MyApp.getCurrentUser();
                    if (user != null) {
                        guardarUsuarioEnPrefs(user.getUid(), tipoUsuario);
                        mostrarProgreso(false);

                        if (tipoUsuario.equals("conductor")) {
                            Log.d(TAG, "🚀 [NAVIGATION] Hacia Dashboard Conductor");
                            irAInicioConductor();
                        } else {
                            Log.d(TAG, "🚀 [NAVIGATION] Hacia Dashboard Pasajero");
                            irAInicioUsuarios();
                        }
                    } else {
                        Log.e(TAG, "❌ [LOGIN_RESULT] Fallo crítico: FirebaseUser es NULL");
                        restaurarBotonLogin();
                    }
                }

                @Override
                public void onLoginFailure(String error) {
                    Log.e(TAG, "❌ [LOGIN_RESULT] Error recibido: " + error);
                    restaurarBotonLogin();
                    manejarErrorLogin(error, correo);
                }
            });
        });
    }

    /**
     * VALIDACIÓN MEJORADA CON FEEDBACK VISUAL
     */
    private boolean validarCamposLogin(String correo, String password) {
        boolean esValido = true;

        TextInputLayout layoutCorreo = findViewById(R.id.emailInputLayout);
        TextInputLayout layoutPassword = findViewById(R.id.passwordInputLayout);

        // Limpiar errores anteriores
        if (layoutCorreo != null) layoutCorreo.setError(null);
        if (layoutPassword != null) layoutPassword.setError(null);

        if (correo.isEmpty()) {
            if (layoutCorreo != null) layoutCorreo.setError("El correo es requerido");
            esValido = false;
        } else if (!android.util.Patterns.EMAIL_ADDRESS.matcher(correo).matches()) {
            if (layoutCorreo != null) layoutCorreo.setError("Ingresa un correo válido");
            esValido = false;
        }

        if (password.isEmpty()) {
            if (layoutPassword != null) layoutPassword.setError("La contraseña es requerida");
            esValido = false;
        } else if (password.length() < 6) {
            if (layoutPassword != null) layoutPassword.setError("La contraseña debe tener al menos 6 caracteres");
            esValido = false;
        }

        return esValido;
    }

    /**
     * RESTAURAR BOTÓN DE LOGIN
     */
    private void restaurarBotonLogin() {
        buttonIngresar.setEnabled(true);
        buttonIngresar.setText("Ingresar");
        mostrarProgreso(false);
    }

    /**
     * MOSTRAR/OCULTAR PROGRESO
     */
    private void mostrarProgreso(boolean mostrar) {
        ProgressBar progressBar = findViewById(R.id.progressBar);
        if (progressBar != null) {
            progressBar.setVisibility(mostrar ? View.VISIBLE : View.GONE);
        }
    }

    /**
     * MANEJAR ERRORES DE LOGIN DE FORMA INTELIGENTE
     */
    private void manejarErrorLogin(String error, String correo) {
        Log.d(TAG, "🔍 Manejando error: " + error);

        TextInputLayout layoutCorreo = findViewById(R.id.emailInputLayout);
        TextInputLayout layoutPassword = findViewById(R.id.passwordInputLayout);

        // Error de conexión o interno
        if (error.contains("Error de conexión") || error.contains("Error interno")) {
            mostrarErrorConexionDialog();
        }

        // Credenciales incorrectas o contraseña específica
        else if (error.equals("Credenciales incorrectas") || error.contains("Contraseña incorrecta")) {
            Log.d(TAG, "📌 Detectado: Error de credenciales");

            if (!android.util.Patterns.EMAIL_ADDRESS.matcher(correo).matches()) {
                if (layoutCorreo != null) layoutCorreo.setError("Correo electrónico inválido");
                animarCampoError(editTextUsuario);
            } else {
                if (layoutPassword != null) layoutPassword.setError("Contraseña incorrecta");
                animarCampoError(editTextPassword);

                mostrarSnackbarConAccion(
                        "¿Olvidaste tu contraseña?",
                        "Recuperar",
                        v -> iniciarRecuperacionContrasena(correo)
                );
            }
        }

        // Correo no registrado
        else if (error.contains("Correo no registrado")) {
            Log.d(TAG, "📌 Detectado: Usuario no registrado");
            if (layoutCorreo != null) layoutCorreo.setError("Correo no registrado");
            animarCampoError(editTextUsuario);

            mostrarSnackbarConAccion(
                    "¿No tienes cuenta? Regístrate gratis",
                    "Registrar",
                    v -> irARegistro()
            );
        }

        // Correo electrónico inválido
        else if (error.contains("Correo electrónico inválido")) {
            if (layoutCorreo != null) layoutCorreo.setError("Correo electrónico inválido");
            animarCampoError(editTextUsuario);
        }

        // Otros errores
        else {
            mostrarSnackbarCentrado(error, true);
        }
    }

    /**
     * ANIMAR CAMPO CON ERROR
     */
    private void animarCampoError(View view) {
        if (view != null) {
            Animation shake = AnimationUtils.loadAnimation(this, R.anim.shake);
            view.startAnimation(shake);
        }
    }

    /**
     * MOSTRAR SNACKBAR CON ACCIÓN - CON FONDO OSCURO
     */
    private void mostrarSnackbarConAccion(String mensaje, String accion, View.OnClickListener listener) {
        mostrarOverlay(); // Mostrar fondo oscuro

        Snackbar snackbar = Snackbar.make(
                findViewById(android.R.id.content),
                mensaje,
                5000
        );

        snackbar.setAction(accion, v -> {
            listener.onClick(v);
            ocultarOverlay();
        });

        snackbar.setActionTextColor(ContextCompat.getColor(this, R.color.primary_500));

        snackbar.addCallback(new Snackbar.Callback() {
            @Override
            public void onDismissed(Snackbar transientBottomBar, int event) {
                super.onDismissed(transientBottomBar, event);
                ocultarOverlay();
            }
        });

        View snackbarView = snackbar.getView();
        snackbarView.setBackgroundColor(ContextCompat.getColor(this, R.color.secondary_800));

        TextView textView = snackbarView.findViewById(com.google.android.material.R.id.snackbar_text);
        Button actionButton = snackbarView.findViewById(com.google.android.material.R.id.snackbar_action);

        if (textView != null) {
            textView.setTextAlignment(View.TEXT_ALIGNMENT_CENTER);
            textView.setGravity(Gravity.CENTER);
            textView.setTextSize(TypedValue.COMPLEX_UNIT_SP, 14);
            textView.setMaxLines(3);
            textView.setTextColor(ContextCompat.getColor(this, android.R.color.white));
        }

        if (actionButton != null) {
            actionButton.setTextSize(TypedValue.COMPLEX_UNIT_SP, 14);
            actionButton.setAllCaps(true);
            actionButton.setTypeface(null, Typeface.BOLD);
        }

        if (snackbarView.getLayoutParams() instanceof FrameLayout.LayoutParams) {
            FrameLayout.LayoutParams params = (FrameLayout.LayoutParams) snackbarView.getLayoutParams();
            params.gravity = Gravity.CENTER;
            params.width = getResources().getDimensionPixelSize(R.dimen.snackbar_max_width);
            params.height = FrameLayout.LayoutParams.WRAP_CONTENT;

            int margin = getResources().getDimensionPixelSize(R.dimen.snackbar_margin);
            params.setMargins(margin, margin, margin, margin);
            snackbarView.setLayoutParams(params);
        }

        snackbarView.setAlpha(0f);
        snackbarView.setScaleX(0.8f);
        snackbarView.setScaleY(0.8f);

        snackbarView.animate()
                .alpha(1f)
                .scaleX(1f)
                .scaleY(1f)
                .setDuration(300)
                .start();

        snackbar.show();
    }

    /**
     * MOSTRAR SNACKBAR CENTRADO - CON FONDO OSCURO
     */
    private void mostrarSnackbarCentrado(String mensaje, boolean esError) {
        mostrarOverlay(); // Mostrar fondo oscuro

        int duracion = esError ? 3000 : 5000;
        String texto = esError ? "❌ " + mensaje : mensaje;

        Snackbar snackbar = Snackbar.make(
                findViewById(android.R.id.content),
                texto,
                duracion
        );

        snackbar.addCallback(new Snackbar.Callback() {
            @Override
            public void onDismissed(Snackbar transientBottomBar, int event) {
                super.onDismissed(transientBottomBar, event);
                ocultarOverlay();
            }
        });

        View snackbarView = snackbar.getView();

        if (esError) {
            snackbarView.setBackgroundColor(ContextCompat.getColor(this, R.color.error_500));
        } else {
            snackbarView.setBackgroundColor(ContextCompat.getColor(this, R.color.primary_500));
        }

        TextView textView = snackbarView.findViewById(com.google.android.material.R.id.snackbar_text);
        if (textView != null) {
            textView.setTextAlignment(View.TEXT_ALIGNMENT_CENTER);
            textView.setGravity(Gravity.CENTER);
            textView.setTextColor(ContextCompat.getColor(this, android.R.color.white));
            textView.setTextSize(TypedValue.COMPLEX_UNIT_SP, 14);
            textView.setMaxLines(5);
        }

        if (snackbarView.getLayoutParams() instanceof FrameLayout.LayoutParams) {
            FrameLayout.LayoutParams params = (FrameLayout.LayoutParams) snackbarView.getLayoutParams();
            params.gravity = Gravity.CENTER;
            params.width = getResources().getDimensionPixelSize(R.dimen.snackbar_max_width);

            int margin = getResources().getDimensionPixelSize(R.dimen.snackbar_margin);
            params.setMargins(margin, margin, margin, margin);
            snackbarView.setLayoutParams(params);
        }

        snackbarView.setScaleX(0.8f);
        snackbarView.setScaleY(0.8f);
        snackbarView.setAlpha(0f);

        snackbarView.animate()
                .scaleX(1f)
                .scaleY(1f)
                .alpha(1f)
                .setDuration(300)
                .start();

        snackbar.show();
    }

    /**
     * MOSTRAR DIALOG DE ERROR DE CONEXIÓN PERSONALIZADO
     */
    private void mostrarErrorConexionDialog() {
        View dialogView = LayoutInflater.from(this).inflate(R.layout.dialog_error_connection, null);
        
        androidx.appcompat.app.AlertDialog dialog = new androidx.appcompat.app.AlertDialog.Builder(this, R.style.AppDialogTheme)
                .setView(dialogView)
                .setCancelable(true)
                .create();

        MaterialButton btnRetry = dialogView.findViewById(R.id.btnRetryConnection);
        if (btnRetry != null) {
            btnRetry.setOnClickListener(v -> dialog.dismiss());
        }

        if (dialog.getWindow() != null) {
            dialog.getWindow().setBackgroundDrawable(new ColorDrawable(android.graphics.Color.TRANSPARENT));
        }

        dialog.show();
    }

    /**
     * MOSTRAR DIALOG DE ERROR DINÁMICO (Layout XML)
     */
    private void mostrarErrorDynamicDialog(String titulo, String mensaje) {
        View dialogView = LayoutInflater.from(this).inflate(R.layout.dialog_error_generic, null);
        
        androidx.appcompat.app.AlertDialog dialog = new androidx.appcompat.app.AlertDialog.Builder(this, R.style.AppDialogTheme)
                .setView(dialogView)
                .setCancelable(true)
                .create();

        TextView tvTitle = dialogView.findViewById(R.id.errorTitle);
        TextView tvMessage = dialogView.findViewById(R.id.errorMessage);
        MaterialButton btnAction = dialogView.findViewById(R.id.btnErrorAction);

        if (tvTitle != null) tvTitle.setText(titulo);
        if (tvMessage != null) tvMessage.setText(mensaje);
        if (btnAction != null) {
            btnAction.setOnClickListener(v -> dialog.dismiss());
        }

        if (dialog.getWindow() != null) {
            dialog.getWindow().setBackgroundDrawable(new ColorDrawable(android.graphics.Color.TRANSPARENT));
        }

        dialog.show();
    }

    /**
     * INICIAR RECUPERACIÓN DE CONTRASEÑA (Navegar a la actividad dedicada)
     */
    private void iniciarRecuperacionContrasena(String email) {
        Intent intent = new Intent(this, RecuperarContrasenaActivity.class);
        intent.putExtra("email", email);
        startActivity(intent);
    }

    /**
     * IR A REGISTRO
     */
    private void irARegistro() {
        startActivity(new Intent(this, RegistroUsuariosActivity.class));
    }

    /**
     * Configura el login con Google
     */
    private void setupGoogleLogin() {
        Log.d(TAG, "🔧 [UI_SETUP] Configurando botón de Google");

        btnGoogleSignIn.setOnClickListener(v -> {
            Log.d(TAG, "🎯 [CLICK_GOOGLE] Iniciando flujo One Tap");
            btnGoogleSignIn.setEnabled(false);

            iniciarService.iniciarSesionGoogle(new IniciarService.LoginCallback() {
                @Override
                public void onLoginSuccess(String tipoUsuario) {
                    Log.d(TAG, "✅ [GOOGLE_RESULT] Éxito. Rol: " + tipoUsuario);
                    FirebaseUser user = MyApp.getCurrentUser();
                    if (user != null) {
                        guardarUsuarioEnPrefs(user.getUid(), tipoUsuario);
                        if (tipoUsuario.equals("conductor")) {
                            irAInicioConductor();
                        } else {
                            irAInicioUsuarios();
                        }
                    }
                }

                @Override
                public void onLoginFailure(String error) {
                    Log.e(TAG, "❌ [GOOGLE_RESULT] Error: " + error);
                    btnGoogleSignIn.setEnabled(true);
                    mostrarSnackbarCentrado(error, true);
                }
            });
        });
    }

    /**
     * Configura el botón de registro
     */
    private void setupRegistroButton() {
        Log.d(TAG, "🔧 Configurando botón de registro...");

        if (buttonRegistro != null) {
            buttonRegistro.setOnClickListener(v -> {
                Log.d(TAG, "📝 Navegando a RegistroUsuarios");
                Intent intent = new Intent(InicioDeSesionActivity.this, RegistroUsuariosActivity.class);
                startActivity(intent);
            });
        }
    }

    /**
     * Recibir el resultado del One Tap Sign-In de Google
     */
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        Log.d(TAG, "🔄 onActivityResult - requestCode: " + requestCode + ", resultCode: " + resultCode);

        if (requestCode == IniciarService.REQ_ONE_TAP) {
            Log.d(TAG, "🔍 Procesando resultado de Google Sign-In...");
            iniciarService.manejarResultadoGoogle(data, new IniciarService.LoginCallback() {
                @Override
                public void onLoginSuccess(String tipoUsuario) {
                    Log.d(TAG, "✅ Google Sign-In exitoso desde onActivityResult. Tipo recibido: " + tipoUsuario);

                    FirebaseUser user = MyApp.getCurrentUser();
                    if (user != null) {
                        guardarUsuarioEnPrefs(user.getUid(), tipoUsuario);

                        if (tipoUsuario.equals("conductor")) {
                            Log.d(TAG, "🚗 Redirigiendo a InicioConductor (ActivityResult)");
                            irAInicioConductor();
                        } else {
                            Log.d(TAG, "👤 Redirigiendo a InicioUsuarios (ActivityResult)");
                            irAInicioUsuarios();
                        }
                    }
                }

                @Override
                public void onLoginFailure(String error) {
                    Log.e(TAG, "❌ Error en Google Sign-In (ActivityResult): " + error);
                    btnGoogleSignIn.setEnabled(true);
                    
                    if (error.contains("cancelado")) {
                        mostrarSnackbarCentrado(error, true);
                    } else {
                        mostrarErrorDynamicDialog("Error de Autenticación", error);
                    }
                }
            });
        }
    }

    /**
     * Guardar userId y tipo de usuario en SharedPreferences
     */
    private void guardarUsuarioEnPrefs(String userId, String tipoUsuario) {
        try {
            Log.d(TAG, "💾 Guardando usuario en SharedPreferences - ID: " + userId + ", Tipo: " + tipoUsuario);

            SharedPreferences prefs = getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
            SharedPreferences.Editor editor = prefs.edit();
            editor.putString(KEY_USER_ID, userId);
            editor.putString(KEY_USER_TYPE, tipoUsuario);
            boolean saved = editor.commit();

            if (saved) {
                Log.d(TAG, "✅ Usuario guardado exitosamente: " + userId + " (" + tipoUsuario + ")");

                // Guardar el token FCM en el nodo correcto usando NotificationManager
                guardarTokenFCMEnRealtimeDatabase(userId, tipoUsuario);
            } else {
                Log.e(TAG, "❌ Error: No se pudo guardar usuario en SharedPreferences");
            }
        } catch (Exception e) {
            Log.e(TAG, "❌ Error guardando usuario en SharedPreferences: " + e.getMessage());
        }
    }

    /**
     * Guardar token FCM en Realtime Database de forma redundante para asegurar notificaciones
     */
    private void guardarTokenFCMEnRealtimeDatabase(String userId, String tipoUsuario) {
        Log.d(TAG, "🔑 Intentando registrar Token FCM para usuario: " + userId);

        MyApp.getInstance().getFirebaseMessaging().getToken()
                .addOnCompleteListener(task -> {
                    if (task.isSuccessful() && task.getResult() != null) {
                        String token = task.getResult();
                        Log.d(TAG, "✅ Token FCM fresh: " + token.substring(0, 15) + "...");

                        // 1. Guardar localmente
                        guardarTokenLocalmente(token);

                        // 2. Guardar en NotificationManager (nodo específico)
                        NotificationManager.getInstance(this).saveFCMTokenToRealtimeDatabase(userId, tipoUsuario);

                        // 3. REFUERZO: Guardar en ambos nodos si es posible para evitar fallos de búsqueda
                        DatabaseReference baseRef = MyApp.getDatabaseReference("");
                        
                        // Guardar en nodo usuarios siempre
                        baseRef.child("usuarios").child(userId).child("tokenFCM").setValue(token);
                        
                        // Si es conductor, asegurar que esté en conductores
                        if ("conductor".equals(tipoUsuario) || "conductores".equals(tipoUsuario)) {
                            baseRef.child("conductores").child(userId).child("tokenFCM").setValue(token);
                        }

                        Log.d(TAG, "🚀 Sincronización de token FCM completada en todos los nodos.");

                    } else {
                        Log.e(TAG, "❌ No se pudo obtener el Token FCM");
                    }
                });
    }

    /**
     * Determinar el nodo correcto basado en datos reales
     */
    private void determinarNodoCorrecto(String userId, String tipoUsuario, String token) {
        // Verificar en qué nodo existe REALMENTE el usuario
        rtdb.child("conductores").child(userId).addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot conductorSnapshot) {
                rtdb.child("usuarios").child(userId).addListenerForSingleValueEvent(new ValueEventListener() {
                    @Override
                    public void onDataChange(@NonNull DataSnapshot usuarioSnapshot) {
                        boolean esConductorReal = esConductorRealEnRTDB(conductorSnapshot);
                        boolean esUsuarioReal = esUsuarioRealEnRTDB(usuarioSnapshot);

                        Log.d(TAG, "🔍 Determinando nodo correcto:");
                        Log.d(TAG, "   - Es conductor real: " + esConductorReal);
                        Log.d(TAG, "   - Es usuario real: " + esUsuarioReal);
                        Log.d(TAG, "   - TipoUsuario recibido: " + tipoUsuario);

                        String nodoFinal;

                        if (esConductorReal) {
                            nodoFinal = "conductores";
                            Log.d(TAG, "👨‍✈️ Usuario es CONDUCTOR REAL - Guardando en 'conductores'");
                        } else if (esUsuarioReal) {
                            nodoFinal = "usuarios";
                            Log.d(TAG, "👤 Usuario es USUARIO REAL - Guardando en 'usuarios'");
                        } else {
                            nodoFinal = "conductor".equals(tipoUsuario) ? "conductores" : "usuarios";
                            Log.w(TAG, "⚠️ Usuario no existe en RTDB - Usando tipoUsuario recibido: " + nodoFinal);
                        }

                        // Guardar token en el nodo final
                        guardarTokenEnNodo(userId, nodoFinal, token);

                        // Limpiar token del nodo incorrecto
                        String otroNodo = "conductores".equals(nodoFinal) ? "usuarios" : "conductores";
                        limpiarTokenDelNodoIncorrecto(userId, otroNodo);
                    }

                    @Override
                    public void onCancelled(@NonNull DatabaseError error) {
                        Log.e(TAG, "❌ Error verificando usuarios: " + error.getMessage());
                        String nodoFinal = "conductor".equals(tipoUsuario) ? "conductores" : "usuarios";
                        guardarTokenEnNodo(userId, nodoFinal, token);
                    }
                });
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {
                Log.e(TAG, "❌ Error verificando conductores: " + error.getMessage());
                String nodoFinal = "conductor".equals(tipoUsuario) ? "conductores" : "usuarios";
                guardarTokenEnNodo(userId, nodoFinal, token);
            }
        });
    }

    /**
     * Verificar si es conductor REAL en RTDB
     */
    private boolean esConductorRealEnRTDB(DataSnapshot snapshot) {
        if (!snapshot.exists()) return false;

        boolean tieneNombre = snapshot.hasChild("nombre");
        boolean tienePlaca = snapshot.hasChild("placaVehiculo") || snapshot.hasChild("vehiculoId");

        if (tieneNombre) {
            String nombre = snapshot.child("nombre").getValue(String.class);
            boolean nombreValido = nombre != null &&
                    !nombre.contains("Conductor") &&
                    !nombre.equals("No disponible");
            return nombreValido && tienePlaca;
        }

        return false;
    }

    /**
     * Verificar si es usuario REAL en RTDB
     */
    private boolean esUsuarioRealEnRTDB(DataSnapshot snapshot) {
        if (!snapshot.exists()) return false;
        return snapshot.hasChild("nombre") || snapshot.hasChild("email");
    }

    /**
     * Guardar token en nodo específico
     */
    private void guardarTokenEnNodo(String userId, String nodo, String token) {
        rtdb.child(nodo).child(userId).child("tokenFCM")
                .setValue(token)
                .addOnSuccessListener(aVoid -> Log.d(TAG, "✅ Token FCM guardado en '" + nodo + "/" + userId + "/tokenFCM'"))
                .addOnFailureListener(e -> Log.e(TAG, "❌ Error guardando token en " + nodo + ": " + e.getMessage()));
    }

    /**
     * Limpiar token del nodo incorrecto
     */
    private void limpiarTokenDelNodoIncorrecto(String userId, String nodoIncorrecto) {
        rtdb.child(nodoIncorrecto).child(userId).child("tokenFCM").removeValue()
                .addOnSuccessListener(aVoid -> Log.d(TAG, "✅ Token eliminado del nodo incorrecto '" + nodoIncorrecto + "'"))
                .addOnFailureListener(e -> Log.d(TAG, "ℹ️ No había token en '" + nodoIncorrecto + "'"));
    }

    /**
     * Guardar token localmente como backup
     */
    private void guardarTokenLocalmente(String token) {
        try {
            SharedPreferences prefs = getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
            prefs.edit().putString("fcm_token_local", token).apply();
            Log.d(TAG, "💾 Token guardado localmente como backup");
        } catch (Exception e) {
            Log.e(TAG, "❌ Error guardando token localmente: " + e.getMessage());
        }
    }

    /**
     * MANEJAR RESULTADO DE SOLICITUD DE PERMISOS
     */
    @Override
    public void onRequestPermissionsResult(int requestCode,
                                           @NonNull String[] permissions,
                                           @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);

        if (requestCode == PermissionManager.NOTIFICATION_PERMISSION_REQUEST_CODE) {
            if (grantResults.length > 0 &&
                    grantResults[0] == PackageManager.PERMISSION_GRANTED) {

                Log.d(TAG, "✅ Permiso de notificaciones CONCEDIDO por el usuario");
                Toast.makeText(this, "Notificaciones habilitadas", Toast.LENGTH_SHORT).show();

                registrarTokenFCMDespuesDePermiso();

            } else {
                Log.w(TAG, "❌ Permiso de notificaciones DENEGADO por el usuario");

                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                    Toast.makeText(this,
                            "Las notificaciones están desactivadas. Puedes activarlas en Configuración > Aplicaciones",
                            Toast.LENGTH_LONG).show();
                }
            }
        }
    }

    /**
     * Registrar token FCM después de que se concede el permiso
     */
    private void registrarTokenFCMDespuesDePermiso() {
        FirebaseUser currentUser = MyApp.getCurrentUser();
        if (currentUser != null) {
            SharedPreferences prefs = getSharedPreferences(PREFS_NAME, MODE_PRIVATE);
            String userType = prefs.getString(KEY_USER_TYPE, null);

            if (userType != null) {
                guardarTokenFCMEnRealtimeDatabase(currentUser.getUid(), userType);
            }
        }
    }

    /**
     * Redirigir según tipo de usuario (para sesión existente)
     */
    private void redirigirSegunTipoUsuario(String tipoUsuario) {
        if (tipoUsuario.equals("conductor")) {
            Log.d(TAG, "🚗 Redirigiendo a InicioConductor (sesión existente)");
            irAInicioConductor();
        } else {
            Log.d(TAG, "👤 Redirigiendo a InicioUsuarios (sesión existente)");
            irAInicioUsuarios();
        }
    }

    /**
     * Redirige a la actividad principal de usuarios o a reservas tras iniciar sesión.
     */
    private void irAInicioUsuarios() {
        Log.d(TAG, "🎯 Ejecutando irAInicioUsuarios");

        boolean volverAReserva = getIntent().getBooleanExtra("volverAReserva", false);
        Log.d(TAG, "📋 volverAReserva: " + volverAReserva);

        if (volverAReserva) {
            Log.d(TAG, "🎫 Redirigiendo a CrearReservas (volver a reserva)");
            Intent intent = new Intent(InicioDeSesionActivity.this, CrearReservasActivity.class);
            startActivity(intent);
        } else {
            Log.d(TAG, "🏠 Redirigiendo a InicioUsuarios (caso normal)");
            Intent intent = new Intent(InicioDeSesionActivity.this, InicioUsuariosActivity.class);
            startActivity(intent);
        }
        Log.d(TAG, "🔚 Finalizando actividad de login");
        finish();
    }

    private void irAInicioConductor() {
        Log.d(TAG, "🎯 Ejecutando irAInicioConductor");
        Log.d(TAG, "🚗 Redirigiendo a InicioConductor");

        Intent intent = new Intent(InicioDeSesionActivity.this, InicioConductorActivity.class);
        startActivity(intent);
        Log.d(TAG, "🔚 Finalizando actividad de login (conductor)");
        finish();
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
}

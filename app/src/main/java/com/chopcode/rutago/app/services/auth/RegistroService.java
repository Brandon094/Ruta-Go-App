package com.chopcode.rutago.app.services.auth;

import androidx.annotation.NonNull;
import android.util.Log;

import com.chopcode.rutago.app.config.MyApp; // ✅ NUEVO IMPORT
import com.chopcode.rutago.app.models.Pasajero;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.util.HashMap; // ✅ NUEVO IMPORT
import java.util.Map; // ✅ NUEVO IMPORT

/**
 * Servicio encargado de registrar un usuario en Firebase.
 */
public class RegistroService {

    // ✅ NUEVO: Tag para logs
    private static final String TAG = "RegistroService";

    // Instancia de FirebaseAuth para la autenticación.
    private FirebaseAuth auth;
    // Referencia a la base de datos, nodo "usuarios".
    private DatabaseReference databaseReference;

    /**
     * Interfaz para comunicar el resultado del registro.
     */
    public interface RegistroCallback {
        void onSuccess();
        void onFailure(String error);
    }

    /**
     * Constructor que inicializa FirebaseAuth y la referencia a la base de datos usando MyApp.
     */
    public RegistroService() {
        Log.d(TAG, "🚀 Constructor - Inicializando servicio de registro");

        // ✅ USAR MyApp PARA ACCESO A FIREBASE SERVICES
        if (MyApp.getInstance() == null) {
            Log.e(TAG, "❌ CRÍTICO: MyApp no está inicializado. Verifica AndroidManifest.xml");
            throw new IllegalStateException("MyApp no está inicializado. Verifica la configuración de la aplicación.");
        }

        auth = MyApp.getInstance().getFirebaseAuth();
        databaseReference = MyApp.getDatabaseReference("usuarios");

        Log.d(TAG, "✅ Servicio de registro inicializado correctamente con MyApp");
    }

    /**
     * Registra un usuario nuevo utilizando correo y contraseña.
     *
     * @param nombre   Nombre completo del usuario.
     * @param correo   Correo electrónico.
     * @param telefono Teléfono (puede ser opcional).
     * @param password Contraseña.
     * @param callback Callback para notificar éxito o error.
     */
    public void registrarUsuario(String nombre, String correo, String telefono, String password, RegistroCallback callback) {
        Log.d(TAG, "👤 Iniciando registro de usuario:");
        Log.d(TAG, "   - Nombre: " + nombre);
        Log.d(TAG, "   - Correo: " + correo);
        Log.d(TAG, "   - Teléfono: " + telefono);
        Log.d(TAG, "   - Longitud contraseña: " + password.length());

        // ✅ REGISTRAR EVENTO DE INICIO DE REGISTRO
        Map<String, Object> registroParams = new HashMap<>();
        registroParams.put("email", correo);
        registroParams.put("has_phone", !telefono.isEmpty());
        registroParams.put("registration_method", "email_password");
        MyApp.logEvent("auth_registration_started", registroParams);

        // Crear usuario con Firebase Authentication.
        auth.createUserWithEmailAndPassword(correo, password)
                .addOnCompleteListener(task -> {
                    if (task.isSuccessful()) {
                        Log.d(TAG, "✅ Usuario creado exitosamente en Firebase Auth");

                        // ✅ REGISTRAR ÉXITO EN AUTH
                        Map<String, Object> authSuccessParams = new HashMap<>();
                        authSuccessParams.put("email", correo);
                        authSuccessParams.put("provider", "email_password");
                        MyApp.logEvent("auth_registration_success", authSuccessParams);

                        // Obtener el UID del usuario recién creado.
                        FirebaseUser currentUser = auth.getCurrentUser();
                        if (currentUser != null) {
                            String uid = currentUser.getUid();
                            Log.d(TAG, "🆔 UID del usuario creado: " + uid);

                            // Crear el objeto Usuario. Aquí, por defecto, lo definimos como "pasajero".
                            Pasajero pasajero = new Pasajero(uid, nombre, telefono, correo, password);
                            Log.d(TAG, "📝 Objeto Pasajero creado - Guardando en base de datos...");

                            // Guardar los datos del usuario en la base de datos, bajo el nodo "usuarios".
                            databaseReference.child(uid).setValue(pasajero)
                                    .addOnSuccessListener(aVoid -> {
                                        Log.d(TAG, "✅ Usuario guardado exitosamente en base de datos:");
                                        Log.d(TAG, "   - UID: " + uid);
                                        Log.d(TAG, "   - Nombre: " + nombre);
                                        Log.d(TAG, "   - Correo: " + correo);

                                        // ✅ REGISTRAR ÉXITO COMPLETO EN DATABASE
                                        Map<String, Object> dbSuccessParams = new HashMap<>();
                                        dbSuccessParams.put("user_id", uid);
                                        dbSuccessParams.put("user_type", "pasajero");
                                        MyApp.logEvent("database_user_saved", dbSuccessParams);

                                        callback.onSuccess();
                                    })
                                    .addOnFailureListener(e -> {
                                        Log.e(TAG, "❌ Error guardando usuario en base de datos: " + e.getMessage(), e);

                                        // ✅ REGISTRAR ERROR EN CRASHLYTICS Y ANALYTICS
                                        MyApp.logError(e);

                                        Map<String, Object> errorParams = new HashMap<>();
                                        errorParams.put("error_type", "database_save_failed");
                                        errorParams.put("error_message", e.getMessage());
                                        MyApp.logEvent("registration_error", errorParams);

                                        callback.onFailure("Error al guardar datos: " + e.getMessage());
                                    });
                        } else {
                            Log.e(TAG, "❌ Usuario actual es null después de creación exitosa");

                            // ✅ REGISTRAR ERROR EN CRASHLYTICS
                            MyApp.logError(new Exception("Usuario null después de registro exitoso en Auth"));

                            Map<String, Object> errorParams = new HashMap<>();
                            errorParams.put("error_type", "user_null_after_auth");
                            MyApp.logEvent("registration_error", errorParams);

                            callback.onFailure("Error: No se pudo obtener el usuario después del registro");
                        }
                    } else {
                        // Error al crear el usuario en Firebase Auth.
                        String errorMsg = task.getException() != null ? task.getException().getMessage() : "Error desconocido";
                        Log.e(TAG, "❌ Error creando usuario en Firebase Auth: " + errorMsg);

                        // ✅ REGISTRAR ERROR EN CRASHLYTICS Y ANALYTICS
                        Exception exception = task.getException();
                        if (exception != null) {
                            MyApp.logError(exception);
                        }

                        Map<String, Object> errorParams = new HashMap<>();
                        errorParams.put("error_type", "auth_failed");
                        errorParams.put("error_message", errorMsg);
                        errorParams.put("email", correo);
                        MyApp.logEvent("auth_registration_failed", errorParams);

                        callback.onFailure(errorMsg);
                    }
                });
    }

    /**
     * 🔥 Guarda el usuario de Google en Firebase si no existe.
     */
    public void guardarUsuarioSiNoExiste(FirebaseUser user, RegistroCallback callback) {
        Log.d(TAG, "🔍 Verificando existencia de usuario Google:");
        Log.d(TAG, "   - UID: " + user.getUid());
        Log.d(TAG, "   - Email: " + user.getEmail());
        Log.d(TAG, "   - Nombre: " + user.getDisplayName());
        Log.d(TAG, "   - Teléfono: " + user.getPhoneNumber());

        // ✅ REGISTRAR EVENTO DE INICIO DE REGISTRO GOOGLE
        Map<String, Object> googleParams = new HashMap<>();
        googleParams.put("provider", "google");
        googleParams.put("email", user.getEmail());
        MyApp.logEvent("google_registration_started", googleParams);

        // ✅ USAR MyApp PARA OBTENER LA REFERENCIA DE DATABASE
        DatabaseReference rootRef = MyApp.getDatabaseReference("");
        String uid = user.getUid();

        // Verificar si existe en "usuarios"
        Log.d(TAG, "🔎 Buscando usuario en nodo 'usuarios'...");
        rootRef.child("usuarios").child(uid).addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot usuarioSnapshot) {
                if (usuarioSnapshot.exists()) {
                    Log.d(TAG, "✅ Usuario encontrado en 'usuarios' - ya está registrado como pasajero");

                    // ✅ REGISTRAR EVENTO DE USUARIO EXISTENTE
                    Map<String, Object> params = new HashMap<>();
                    params.put("user_id", uid);
                    params.put("status", "already_registered");
                    params.put("user_type", "pasajero");
                    MyApp.logEvent("google_user_exists", params);

                    callback.onSuccess(); // Ya es pasajero
                } else {
                    Log.d(TAG, "🔍 Usuario no encontrado en 'usuarios' - buscando en 'conductores'...");
                    // Si no existe en usuarios, verificar si está en "conductores"
                    rootRef.child("conductores").child(uid).addListenerForSingleValueEvent(new ValueEventListener() {
                        @Override
                        public void onDataChange(@NonNull DataSnapshot conductorSnapshot) {
                            if (conductorSnapshot.exists()) {
                                Log.d(TAG, "✅ Usuario encontrado en 'conductores' - ya está registrado como conductor");

                                // ✅ REGISTRAR EVENTO DE CONDUCTOR EXISTENTE
                                Map<String, Object> params = new HashMap<>();
                                params.put("user_id", uid);
                                params.put("status", "already_registered");
                                params.put("user_type", "conductor");
                                MyApp.logEvent("google_user_exists", params);

                                callback.onSuccess(); // Ya es conductor, no registramos como pasajero
                            } else {
                                Log.w(TAG, "⚠️ Usuario no encontrado en ningún nodo - registrando como pasajero");

                                // Si no está en ninguno, lo registramos como pasajero
                                Pasajero pasajero = new Pasajero(
                                        user.getUid(),
                                        user.getDisplayName() != null ? user.getDisplayName() : "Usuario sin nombre",
                                        user.getPhoneNumber() != null ? user.getPhoneNumber() : "No disponible",
                                        user.getEmail()
                                );

                                Log.d(TAG, "📝 Creando objeto Pasajero para registro automático:");
                                Log.d(TAG, "   - Nombre: " + pasajero.getNombre());
                                Log.d(TAG, "   - Email: " + pasajero.getEmail());
                                Log.d(TAG, "   - Teléfono: " + pasajero.getTelefono());

                                rootRef.child("usuarios").child(uid).setValue(pasajero)
                                        .addOnSuccessListener(aVoid -> {
                                            Log.d(TAG, "✅ Usuario Google registrado exitosamente como pasajero:");
                                            Log.d(TAG, "   - UID: " + uid);
                                            Log.d(TAG, "   - Email: " + user.getEmail());

                                            // ✅ REGISTRAR ÉXITO DE REGISTRO GOOGLE
                                            Map<String, Object> successParams = new HashMap<>();
                                            successParams.put("user_id", uid);
                                            successParams.put("user_type", "pasajero");
                                            successParams.put("provider", "google");
                                            MyApp.logEvent("google_registration_success", successParams);

                                            callback.onSuccess();
                                        })
                                        .addOnFailureListener(e -> {
                                            Log.e(TAG, "❌ Error registrando usuario Google: " + e.getMessage(), e);

                                            // ✅ REGISTRAR ERROR EN CRASHLYTICS Y ANALYTICS
                                            MyApp.logError(e);

                                            Map<String, Object> errorParams = new HashMap<>();
                                            errorParams.put("error_type", "google_registration_failed");
                                            errorParams.put("error_message", e.getMessage());
                                            MyApp.logEvent("registration_error", errorParams);

                                            callback.onFailure("Error al registrar usuario: " + e.getMessage());
                                        });
                            }
                        }

                        @Override
                        public void onCancelled(@NonNull DatabaseError error) {
                            Log.e(TAG, "❌ Error en consulta a 'conductores': " + error.getMessage());
                            Log.e(TAG, "   - Código: " + error.getCode());
                            Log.e(TAG, "   - Detalles: " + error.getDetails());

                            // ✅ REGISTRAR ERROR DE DATABASE EN CRASHLYTICS
                            MyApp.logError(new DatabaseErrorException(error));

                            Map<String, Object> errorParams = new HashMap<>();
                            errorParams.put("error_type", "database_query_failed");
                            errorParams.put("database_path", "conductores/" + uid);
                            errorParams.put("error_code", error.getCode());
                            MyApp.logEvent("database_error", errorParams);

                            callback.onFailure("Error al verificar en conductores: " + error.getMessage());
                        }
                    });
                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {
                Log.e(TAG, "❌ Error en consulta a 'usuarios': " + error.getMessage());
                Log.e(TAG, "   - Código: " + error.getCode());
                Log.e(TAG, "   - Detalles: " + error.getDetails());

                // ✅ REGISTRAR ERROR DE DATABASE EN CRASHLYTICS
                MyApp.logError(new DatabaseErrorException(error));

                Map<String, Object> errorParams = new HashMap<>();
                errorParams.put("error_type", "database_query_failed");
                errorParams.put("database_path", "usuarios/" + uid);
                errorParams.put("error_code", error.getCode());
                MyApp.logEvent("database_error", errorParams);

                callback.onFailure("Error al verificar en usuarios: " + error.getMessage());
            }
        });
    }

    /**
     * ✅ NUEVA CLASE INTERNA: Para envolver DatabaseError en Exception
     */
    private static class DatabaseErrorException extends Exception {
        public DatabaseErrorException(DatabaseError error) {
            super("Database Error: " + error.getMessage() +
                    " Code: " + error.getCode() +
                    " Details: " + error.getDetails());
        }
    }
}

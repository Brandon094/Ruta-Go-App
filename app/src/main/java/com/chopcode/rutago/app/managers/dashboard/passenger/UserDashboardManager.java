package com.chopcode.rutago.app.managers.dashboard.passenger;

import android.content.Context;
import android.content.SharedPreferences;
import android.util.Log;

import androidx.annotation.NonNull;

import com.chopcode.rutago.app.config.MyApp;
import com.chopcode.rutago.app.managers.analytics.DashboardAnalyticsHelper;
import com.chopcode.rutago.app.models.Usuario;
import com.chopcode.rutago.app.services.user.UserService;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.ValueEventListener;

public class UserDashboardManager {

    private static final String TAG = "UserDashboardManager";

    private final Context context;
    private final DashboardAnalyticsHelper analyticsHelper;
    private final UserService userService;

    // Database Reference para listeners en tiempo real
    private DatabaseReference reservasRef;
    private ValueEventListener reservasListener;
    private DatabaseReference userProfileRef;
    private ValueEventListener userProfileListener;

    // Callbacks
    public interface DashboardListener {
        void onUserDataLoaded(Usuario usuario);
        void onUserDataError(String error);
        void onCountersLoaded(int reservasCount, int canceladasCount, int viajesCount);
        void onCountersError(String error);
    }

    private DashboardListener listener;
    private Usuario usuarioActual;

    public UserDashboardManager(Context context, DashboardAnalyticsHelper analyticsHelper) {
        this.context = context;
        this.analyticsHelper = analyticsHelper;
        this.userService = new UserService();
        
        // Cargar nombre e ID de la caché si existen
        loadCachedUser();
    }

    private void loadCachedUser() {
        SharedPreferences prefs = context.getSharedPreferences("RutaGoCache", Context.MODE_PRIVATE);
        String name = prefs.getString("user_name", null);
        String photo = prefs.getString("user_photo", null);
        
        if (name != null) {
            usuarioActual = new Usuario();
            usuarioActual.setNombre(name);
            usuarioActual.setPhotoUrl(photo);
            Log.d(TAG, "📦 Usuario cargado desde caché: " + name);
        }
    }

    private void saveUserToCache(Usuario usuario) {
        if (usuario == null) return;
        SharedPreferences.Editor editor = context.getSharedPreferences("RutaGoCache", Context.MODE_PRIVATE).edit();
        editor.putString("user_name", usuario.getNombre());
        editor.putString("user_photo", usuario.getPhotoUrl());
        editor.apply();
        Log.d(TAG, "💾 Usuario guardado en caché");
    }

    public void setDashboardListener(DashboardListener listener) {
        this.listener = listener;
        // Si ya tenemos usuario en caché, notificar al listener inmediatamente
        if (usuarioActual != null && listener != null) {
            listener.onUserDataLoaded(usuarioActual);
        }
    }

    public void loadUserData() {
        Log.d(TAG, "🔍 Iniciando carga reactiva de datos del usuario...");
        analyticsHelper.logScreenLoad();

        String userId = MyApp.getCurrentUserId();
        if (userId == null) {
            if (listener != null) {
                listener.onUserDataError("Usuario no autenticado");
            }
            return;
        }

        // Configurar listener en tiempo real para el perfil del usuario
        setupRealTimeProfile(userId);
        
        // Configurar listener en tiempo real para contadores
        setupRealTimeCounters(userId);
    }

    private void setupRealTimeProfile(String userId) {
        Log.d(TAG, "👤 Configurando perfil en tiempo real para: " + userId);
        
        if (userProfileRef != null && userProfileListener != null) {
            userProfileRef.removeEventListener(userProfileListener);
        }

        userProfileRef = MyApp.getDatabaseReference("usuarios/" + userId);
        userProfileListener = new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                if (snapshot.exists()) {
                    try {
                        Usuario usuario = new Usuario();
                        usuario.setId(userId);
                        usuario.setNombre(String.valueOf(snapshot.child("nombre").getValue()));
                        usuario.setEmail(String.valueOf(snapshot.child("email").getValue()));
                        usuario.setPhotoUrl(snapshot.hasChild("photoUrl") ? 
                                String.valueOf(snapshot.child("photoUrl").getValue()) : null);
                        usuario.setTelefono(snapshot.hasChild("telefono") ? 
                                String.valueOf(snapshot.child("telefono").getValue()) : "");
                        
                        usuarioActual = usuario;
                        saveUserToCache(usuario);
                        Log.d(TAG, "✅ Perfil actualizado en tiempo real: " + usuario.getNombre());
                        
                        if (listener != null) {
                            listener.onUserDataLoaded(usuario);
                        }
                    } catch (Exception e) {
                        Log.e(TAG, "❌ Error procesando datos de perfil: " + e.getMessage());
                    }
                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {
                Log.e(TAG, "❌ Error en listener de perfil: " + error.getMessage());
            }
        };

        userProfileRef.addValueEventListener(userProfileListener);
    }

    private void setupRealTimeCounters(String userId) {
        Log.d(TAG, "📊 Configurando contadores en tiempo real para: " + userId);

        // Remover listener anterior si existe
        removeRealTimeListeners();

        reservasRef = MyApp.getDatabaseReference("reservas");

        // Crear listener en tiempo real
        reservasListener = new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                int reservasCount = contarReservasActivas(snapshot);
                int canceladasCount = contarReservasCanceladas(snapshot);
                int viajesCount = contarViajesCompletados(snapshot);

                Log.d(TAG, "🔄 Contadores actualizados en tiempo real: " +
                        reservasCount + " reservas confirmadas, "+canceladasCount+ "reservas " +
                        "canceladas" + viajesCount + " total " +
                        "de viajes");
                analyticsHelper.logCountersLoaded(reservasCount, canceladasCount, viajesCount);

                if (listener != null) {
                    listener.onCountersLoaded(reservasCount, canceladasCount, viajesCount);
                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {
                Log.e(TAG, "❌ Error en listener tiempo real: " + error.getMessage());
                analyticsHelper.logError("listener_tiempo_real", error.getMessage());

                if (listener != null) {
                    listener.onCountersError(error.getMessage());
                }
            }
        };

        // Agregar listener en tiempo real
        reservasRef.orderByChild("usuarioId").equalTo(userId)
                .addValueEventListener(reservasListener);

        Log.d(TAG, "✅ Listener en tiempo real configurado correctamente");
    }

    private void removeRealTimeListeners() {
        if (reservasRef != null && reservasListener != null) {
            reservasRef.removeEventListener(reservasListener);
            Log.d(TAG, "🗑️ Listener de reservas removido");
        }
        if (userProfileRef != null && userProfileListener != null) {
            userProfileRef.removeEventListener(userProfileListener);
            Log.d(TAG, "🗑️ Listener de perfil removido");
        }
    }

    private int contarReservasActivas(DataSnapshot snapshot) {
        int count = 0;
        for (DataSnapshot dataSnapshot : snapshot.getChildren()) {
            com.chopcode.rutago.app.models.Reserva reserva =
                    dataSnapshot.getValue(com.chopcode.rutago.app.models.Reserva.class);
            if (reserva != null) {
                String estado = reserva.getEstadoReserva();
                if (estado != null && (estado.equalsIgnoreCase("confirmado") || estado.equalsIgnoreCase("confirmada"))) {
                    count++;
                }
            }
        }
        return count;
    }

    private int contarReservasCanceladas(DataSnapshot snapshot) {
        int count = 0;
        for (DataSnapshot dataSnapshot : snapshot.getChildren()) {
            com.chopcode.rutago.app.models.Reserva reserva =
                    dataSnapshot.getValue(com.chopcode.rutago.app.models.Reserva.class);
            if (reserva != null) {
                String estado = reserva.getEstadoReserva();
                if (estado != null && (estado.equalsIgnoreCase("cancelado") || estado.equalsIgnoreCase("cancelada"))) {
                    count++;
                }
            }
        }
        return count;
    }

    private int contarViajesCompletados(DataSnapshot snapshot) {
        int count = 0;
        for (DataSnapshot dataSnapshot : snapshot.getChildren()) {
            com.chopcode.rutago.app.models.Reserva reserva =
                    dataSnapshot.getValue(com.chopcode.rutago.app.models.Reserva.class);
            if (reserva != null) {
                String estado = reserva.getEstadoReserva();
                if (estado != null && (estado.equalsIgnoreCase("confirmado") || estado.equalsIgnoreCase("confirmada") ||
                        estado.equalsIgnoreCase("cancelado") || estado.equalsIgnoreCase("cancelada"))) {
                    count++;
                }
            }
        }
        return count;
    }

    public Usuario getUsuarioActual() {
        return usuarioActual;
    }

    public void refreshData() {
        Log.d(TAG, "🔄 Refrescando datos del dashboard");
        analyticsHelper.logRefresh();
        loadUserData();
    }

    public void cleanup() {
        Log.d(TAG, "🧹 Limpiando recursos del dashboard manager");
        removeRealTimeListeners();
    }
}

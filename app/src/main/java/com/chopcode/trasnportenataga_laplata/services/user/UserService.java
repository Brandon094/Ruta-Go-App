package com.chopcode.trasnportenataga_laplata.services.user;

import com.chopcode.trasnportenataga_laplata.config.MyApp;
import com.chopcode.trasnportenataga_laplata.models.Horario;
import com.chopcode.trasnportenataga_laplata.models.Ruta;
import com.chopcode.trasnportenataga_laplata.models.Usuario;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Servicio para gestionar operaciones relacionadas con usuarios y conductores
 * Maneja la interacción con Firebase Database para operaciones CRUD
 */
public class UserService {
    // Capacidad total del vehículo (asientos disponibles)
    private static final int CAPACIDAD_TOTAL = 13;

    // ========== INTERFACES DE CALLBACK ==========

    /**
     * Callback para carga de datos de usuario
     */
    public interface UserDataCallback {
        void onUserDataLoaded(Usuario usuario);
        void onError(String error);
    }

    /**
     * Callback para verificación de rol de conductor
     */
    public interface DriverCheckCallback {
        void onDriverCheckComplete(boolean isDriver);
        void onError(String error);
    }

    /**
     * Callback para carga de datos específicos de conductor
     */
    public interface DriverDataCallback {
        void onDriverDataLoaded(String nombre, String telefono, String placa,
                                List<String> horariosAsignados);
        void onError(String error);
    }

    /**
     * Callback para carga de rutas asignadas
     */
    public interface RoutesCallback {
        void onRoutesLoaded(List<Ruta> rutas);
        void onError(String error);
    }

    /**
     * Callback para cálculo de estadísticas
     */
    public interface StatisticsCallback {
        void onStatisticsCalculated(int reservasConfirmadas, int asientosDisponibles, double ingresos);
        void onError(String error);
    }

    /**
     * Callback para actualización de ingresos
     */
    public interface IncomeUpdateCallback {
        void onSuccess(double nuevosIngresos);
        void onError(String error);
    }

    /**
     * Callback para actualización de usuario
     */
    public interface UserUpdateCallback {
        void onSuccess();
        void onError(String error);
    }

    /**
     * Callback para carga de lista de conductores
     */
    public interface DriversListCallback {
        void onDriversLoaded(List<com.chopcode.trasnportenataga_laplata.models.Conductor> conductores);
        void onError(String error);
    }

    // ========== MÉTODOS GENERALES DE USUARIO ==========

    /**
     * Carga los datos de un usuario desde Firebase Database
     * @param userId ID único del usuario
     * @param callback Callback para manejar el resultado
     */
    public void loadUserData(String userId, UserDataCallback callback) {
        // Usar MyApp para obtener la referencia de forma centralizada
        DatabaseReference userRef = MyApp.getDatabaseReference("usuarios/" + userId);

        // Escuchar una sola vez los datos del usuario
        userRef.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot snapshot) {
                if (snapshot.exists()) {
                    // Convertir snapshot a objeto Usuario
                    Usuario usuario = snapshot.getValue(Usuario.class);
                    if (usuario != null) {
                        // Asignar el ID al usuario
                        usuario.setId(userId);
                        callback.onUserDataLoaded(usuario);
                    } else {
                        callback.onError("Error al parsear datos del usuario");
                    }
                } else {
                    callback.onError("No se encontró el usuario en la BD");
                }
            }

            @Override
            public void onCancelled(DatabaseError error) {
                callback.onError(error.getMessage());
            }
        });
    }

    /**
     * Actualiza el perfil de un usuario
     * @param userId ID del usuario
     * @param nombre Nuevo nombre del usuario
     * @param telefono Nuevo teléfono del usuario
     * @param callback Callback para manejar el resultado
     */
    public void updateUserProfile(String userId, String nombre, String telefono, UserUpdateCallback callback) {
        DatabaseReference userRef = MyApp.getDatabaseReference("usuarios/" + userId);

        // Crear mapa con las actualizaciones
        Map<String, Object> updates = new HashMap<>();
        updates.put("nombre", nombre);
        updates.put("telefono", telefono);

        // Ejecutar actualización en Firebase
        userRef.updateChildren(updates)
                .addOnSuccessListener(aVoid -> callback.onSuccess())
                .addOnFailureListener(e -> callback.onError(e.getMessage()));
    }

    // ========== MÉTODOS ESPECÍFICOS DE CONDUCTOR ==========

    /**
     * Carga los datos específicos de un conductor
     * @param userId ID del conductor
     * @param callback Callback para manejar los datos del conductor
     */
    public void loadDriverData(String userId, DriverDataCallback callback) {
        DatabaseReference conductorRef = MyApp.getDatabaseReference("conductores/" + userId);

        conductorRef.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot snapshot) {
                if (snapshot.exists()) {
                    // Extraer datos del conductor del snapshot de forma segura
                    String nombre = getStringSafely(snapshot.child("nombre"));
                    String telefono = getStringSafely(snapshot.child("telefono"));
                    String placa = getStringSafely(snapshot.child("placaVehiculo"));
                    List<String> horariosAsignados = new ArrayList<>();

                    // Obtener lista de horarios asignados si existe
                    if (snapshot.hasChild("horariosAsignados")) {
                        for (DataSnapshot horarioSnapshot : snapshot.child("horariosAsignados").getChildren()) {
                            String horarioId = getStringSafely(horarioSnapshot);
                            if (!horarioId.isEmpty()) {
                                horariosAsignados.add(horarioId);
                            }
                        }
                    }

                    // Devolver datos al callback
                    callback.onDriverDataLoaded(nombre, telefono, placa, horariosAsignados);
                } else {
                    callback.onError("No se encontró el conductor en la BD");
                }
            }

            @Override
            public void onCancelled(DatabaseError error) {
                callback.onError(error.getMessage());
            }
        });
    }

    /**
     * Actualiza el perfil de un conductor
     * @param userId ID del conductor
     * @param nombre Nuevo nombre
     * @param telefono Nuevo teléfono
     * @param placa Nueva placa del vehículo
     * @param horariosAsignados Nueva lista de horarios asignados
     * @param callback Callback para manejar el resultado
     */
    public void updateDriverProfile(String userId, String nombre, String telefono, String placa,
                                    List<String> horariosAsignados, UserUpdateCallback callback) {
        DatabaseReference driverRef = MyApp.getDatabaseReference("conductores/" + userId);

        // Crear mapa de actualizaciones para el conductor
        Map<String, Object> driverUpdates = new HashMap<>();
        driverUpdates.put("nombre", nombre);
        driverUpdates.put("telefono", telefono);
        driverUpdates.put("placaVehiculo", placa);

        // Incluir horarios si se proporcionan
        if (horariosAsignados != null) {
            driverUpdates.put("horariosAsignados", horariosAsignados);
        }

        // Actualizar datos del conductor en Firebase
        driverRef.updateChildren(driverUpdates)
                .addOnSuccessListener(aVoid -> {
                    // Mantener consistencia actualizando también en usuarios
                    updateUserProfile(userId, nombre, telefono, new UserUpdateCallback() {
                        @Override
                        public void onSuccess() {
                            callback.onSuccess();
                        }

                        @Override
                        public void onError(String error) {
                            callback.onError("Conductor actualizado pero error en usuario: " + error);
                        }
                    });
                })
                .addOnFailureListener(e -> callback.onError(e.getMessage()));
    }

    // ========== MÉTODOS DE RUTAS ==========

    /**
     * Carga las rutas asignadas a un conductor basado en sus horarios
     * @param horariosAsignados Lista de IDs de horarios asignados
     * @param callback Callback para manejar las rutas cargadas
     */
    public void loadAssignedRoutes(List<String> horariosAsignados, RoutesCallback callback) {
        // Si no hay horarios, devolver lista vacía
        if (horariosAsignados.isEmpty()) {
            callback.onRoutesLoaded(new ArrayList<>());
            return;
        }

        DatabaseReference horariosRef = MyApp.getDatabaseReference("horarios");

        horariosRef.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot snapshot) {
                List<Ruta> rutas = new ArrayList<>();

                // Para cada horario asignado, buscar la información correspondiente
                for (String horarioId : horariosAsignados) {
                    DataSnapshot horarioSnapshot = snapshot.child(horarioId);
                    if (horarioSnapshot.exists()) {
                        String hora = horarioSnapshot.child("hora").getValue(String.class);
                        String rutaNombre = horarioSnapshot.child("ruta").getValue(String.class);

                        if (hora != null && rutaNombre != null) {
                            // Crear objeto Horario
                            Horario horario = new Horario();
                            horario.setId(horarioId);
                            horario.setHora(hora);
                            horario.setRuta(rutaNombre);

                            // Determinar origen y destino según el nombre de la ruta
                            String origen, destino;
                            if (rutaNombre.contains("Natagá -> La Plata")) {
                                origen = "Natagá";
                                destino = "La Plata";
                            } else {
                                origen = "La Plata";
                                destino = "Natagá";
                            }

                            // Crear objeto Ruta con precio fijo de 12000
                            Ruta nuevaRuta = new Ruta(horarioId, origen, destino, 12000);
                            nuevaRuta.setHora(horario);
                            nuevaRuta.setHorarioId(horarioId);
                            rutas.add(nuevaRuta);
                        }
                    }
                }

                // Ordenar rutas por hora (más temprano a más tarde)
                Collections.sort(rutas, (r1, r2) -> {
                    if (r1.getHora() != null && r2.getHora() != null) {
                        return r1.getHora().getHora().compareTo(r2.getHora().getHora());
                    }
                    return 0;
                });

                callback.onRoutesLoaded(rutas);
            }

            @Override
            public void onCancelled(DatabaseError error) {
                callback.onError(error.getMessage());
            }
        });
    }

    // ========== MÉTODOS DE VERIFICACIÓN ==========

    /**
     * Carga todos los conductores registrados
     * @param callback Callback con la lista de conductores
     */
    public void loadAllDrivers(DriversListCallback callback) {
        DatabaseReference conductoresRef = MyApp.getDatabaseReference("conductores");

        conductoresRef.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot snapshot) {
                List<com.chopcode.trasnportenataga_laplata.models.Conductor> conductores = new ArrayList<>();
                for (DataSnapshot conductorSnap : snapshot.getChildren()) {
                    com.chopcode.trasnportenataga_laplata.models.Conductor conductor = 
                        conductorSnap.getValue(com.chopcode.trasnportenataga_laplata.models.Conductor.class);
                    if (conductor != null) {
                        conductor.setId(conductorSnap.getKey());
                        conductores.add(conductor);
                    }
                }
                callback.onDriversLoaded(conductores);
            }

            @Override
            public void onCancelled(DatabaseError error) {
                callback.onError(error.getMessage());
            }
        });
    }

    /**
     * Verifica si un usuario tiene rol de conductor
     * @param userId ID del usuario a verificar
     * @param callback Callback con el resultado de la verificación
     */
    public void checkIfUserIsDriver(String userId, DriverCheckCallback callback) {
        DatabaseReference driverRef = MyApp.getDatabaseReference("conductores/" + userId);

        driverRef.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot snapshot) {
                // Si existe en nodo conductores, es conductor
                callback.onDriverCheckComplete(snapshot.exists());
            }

            @Override
            public void onCancelled(DatabaseError error) {
                callback.onError(error.getMessage());
            }
        });
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
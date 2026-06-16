package com.chopcode.rutago.app.services.user;

import com.chopcode.rutago.app.config.MyApp;
import com.chopcode.rutago.app.models.Horario;
import com.chopcode.rutago.app.models.Ruta;
import com.chopcode.rutago.app.models.Usuario;
import android.util.Log;
import androidx.annotation.NonNull;
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
        void onDriverDataLoaded(com.chopcode.rutago.app.models.Conductor conductor);
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

    /**
     * Actualiza la foto de perfil de un usuario
     * @param userId ID del usuario
     * @param photoUrl Nueva URL de la foto
     * @param node Nodo donde se guardará ("usuarios" o "conductores")
     * @param callback Callback para manejar el resultado
     */
    public void updateProfilePicture(String userId, String photoUrl, String node, UserUpdateCallback callback) {
        DatabaseReference userRef = MyApp.getDatabaseReference(node + "/" + userId);

        userRef.child("photoUrl").setValue(photoUrl)
                .addOnSuccessListener(aVoid -> {
                    if (node.equals("conductores")) {
                        // Mantener consistencia en usuarios también
                        updateProfilePicture(userId, photoUrl, "usuarios", new UserUpdateCallback() {
                            @Override
                            public void onSuccess() {
                                callback.onSuccess();
                            }
                            @Override
                            public void onError(String error) {
                                // Ignoramos si falla en usuarios, lo importante es el nodo principal
                                callback.onSuccess();
                            }
                        });
                    } else {
                        callback.onSuccess();
                    }
                })
                .addOnFailureListener(e -> callback.onError(e.getMessage()));
    }

    /**
     * Registra una solicitud de borrado de cuenta para un usuario
     * @param userId ID del usuario
     * @param callback Callback para manejar el resultado
     */
    public void requestAccountDeletion(String userId, UserUpdateCallback callback) {
        DatabaseReference userRef = MyApp.getDatabaseReference("usuarios/" + userId);

        Map<String, Object> updates = new HashMap<>();
        updates.put("solicitudBorrado", true);
        updates.put("fechaSolicitudBorrado", System.currentTimeMillis());

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
                    com.chopcode.rutago.app.models.Conductor conductor = snapshot.getValue(com.chopcode.rutago.app.models.Conductor.class);
                    if (conductor != null) {
                        conductor.setId(userId);
                        
                        // Si tiene un vehículo asignado, buscar su capacidad real
                        if (conductor.getVehiculoId() != null && !conductor.getVehiculoId().isEmpty()) {
                            buscarCapacidadVehiculo(conductor, callback);
                        } else {
                            procesarCargaConductor(userId, conductor, callback);
                        }
                    } else {
                        callback.onError("Error al parsear datos del conductor");
                    }
                } else {
                    buscarNombreEnUsuarios(userId, new com.chopcode.rutago.app.models.Conductor(), callback);
                }
            }

            @Override
            public void onCancelled(DatabaseError error) {
                callback.onError(error.getMessage());
            }
        });
    }

    private void buscarCapacidadVehiculo(com.chopcode.rutago.app.models.Conductor conductor, DriverDataCallback callback) {
        DatabaseReference vehiculoRef = MyApp.getDatabaseReference("vehiculos/" + conductor.getVehiculoId());
        vehiculoRef.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                if (snapshot.exists()) {
                    Integer capacidad = snapshot.child("capacidad").getValue(Integer.class);
                    if (capacidad != null && capacidad > 0) {
                        conductor.setCapacidadVehiculo(capacidad);
                        Log.d("UserService", "🚌 Capacidad real encontrada para " + conductor.getVehiculoId() + ": " + capacidad);
                    }
                }
                procesarCargaConductor(conductor.getId(), conductor, callback);
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {
                procesarCargaConductor(conductor.getId(), conductor, callback);
            }
        });
    }

    private void procesarCargaConductor(String userId, com.chopcode.rutago.app.models.Conductor conductor, DriverDataCallback callback) {
        // Lógica de fallback de nombre que ya tenías
        if (conductor.getNombre() == null || conductor.getNombre().isEmpty() || 
            conductor.getNombre().equalsIgnoreCase("No disponible") || 
            conductor.getNombre().contains("Conductor ")) {
            buscarNombreEnUsuarios(userId, conductor, callback);
        } else {
            callback.onDriverDataLoaded(conductor);
        }
    }

    private void buscarNombreEnUsuarios(String userId, com.chopcode.rutago.app.models.Conductor conductor, DriverDataCallback callback) {
        DatabaseReference userRef = MyApp.getDatabaseReference("usuarios/" + userId);
        userRef.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                if (snapshot.exists()) {
                    String nombre = getStringSafely(snapshot.child("nombre"));
                    String tel = getStringSafely(snapshot.child("telefono"));
                    String photo = getStringSafely(snapshot.child("photoUrl"));
                    
                    if (conductor.getNombre() == null || conductor.getNombre().isEmpty()) {
                        conductor.setNombre(nombre.isEmpty() ? "Conductor " + userId.substring(0, 5) : nombre);
                    }
                    if (conductor.getTelefono() == null || conductor.getTelefono().isEmpty()) {
                        conductor.setTelefono(tel);
                    }
                    if (conductor.getPhotoUrl() == null || conductor.getPhotoUrl().isEmpty()) {
                        conductor.setPhotoUrl(photo);
                    }
                }
                
                if (conductor.getNombre() == null || conductor.getNombre().isEmpty()) {
                    conductor.setNombre("Conductor " + userId.substring(0, 5));
                }
                callback.onDriverDataLoaded(conductor);
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {
                if (conductor.getNombre() == null || conductor.getNombre().isEmpty()) {
                    conductor.setNombre("Conductor " + userId.substring(0, 5));
                }
                callback.onDriverDataLoaded(conductor);
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

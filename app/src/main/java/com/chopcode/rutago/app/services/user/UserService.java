package com.chopcode.rutago.app.services.user;

import com.chopcode.rutago.app.config.MyApp;
import com.chopcode.rutago.app.models.User;
import com.chopcode.rutago.app.models.Driver;
import com.chopcode.rutago.app.models.Vehicle;
import com.chopcode.rutago.app.models.Route;
import com.chopcode.rutago.app.models.Schedule;
import com.chopcode.rutago.app.services.prices.PriceService;
import com.chopcode.rutago.app.utils.ui.FormatUtils;

import android.util.Log;
import androidx.annotation.NonNull;
import com.google.firebase.database.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * User Service
 *
 * Repositorio central para la gestión de perfiles de identidad en el ecosistema.
 * Responsabilidades:
 * - Proveer acceso reactivo (listeners) y bajo demanda (single events) a perfiles de usuarios y conductores.
 * - Implementar lógica de "Aseguramiento de Agenda" para conductores, integrando la capacidad del vehículo.
 * - Gestionar flujos de actualización de perfil, incluyendo carga de fotos y cambios de estado.
 * - Orquestar el motor de resolución de rutas asignadas para el Dashboard operativo.
 * - Administrar el flujo legal de "Derecho al Olvido" (Solicitud y cancelación de borrado de cuenta).
 */
public class UserService {
    private static final String TAG = "UserService";

    public interface UserDataCallback {
        void onUserDataLoaded(User user);
        void onError(String error);
    }

    public interface DriverDataCallback {
        void onDriverDataLoaded(Driver driver);
        void onError(String error);
    }

    public interface UserUpdateCallback {
        void onSuccess();
        void onError(String error);
    }

    public interface RoutesCallback {
        void onRoutesLoaded(List<Route> routes);
        void onError(String error);
    }

    public interface DriverCheckCallback {
        void onDriverCheckComplete(boolean isDriver);
        void onError(String error);
    }

    /**
     * Establece una suscripción reactiva a los datos de un pasajero.
     */
    public ValueEventListener listenToUserData(String userId, UserDataCallback callback) {
        DatabaseReference ref = MyApp.getDatabaseReference("usuarios/" + userId);
        ValueEventListener listener = new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                if (snapshot.exists()) {
                    User user = snapshot.getValue(User.class);
                    if (user != null) {
                        user.setId(userId);
                        callback.onUserDataLoaded(user);
                    } else callback.onError("Error al procesar datos del usuario.");
                } else callback.onError("Usuario no encontrado.");
            }
            @Override public void onCancelled(@NonNull DatabaseError error) { callback.onError(error.getMessage()); }
        };
        ref.addValueEventListener(listener);
        return listener;
    }

    /**
     * Consulta el perfil del pasajero en una operación única.
     */
    public void loadUserData(String userId, UserDataCallback callback) {
        MyApp.getDatabaseReference("usuarios/" + userId).addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                if (snapshot.exists()) {
                    User user = snapshot.getValue(User.class);
                    if (user != null) {
                        user.setId(userId);
                        callback.onUserDataLoaded(user);
                    } else callback.onError("Error al parsear perfil.");
                } else callback.onError("Pasajero inexistente.");
            }
            @Override public void onCancelled(@NonNull DatabaseError error) { callback.onError(error.getMessage()); }
        });
    }

    /**
     * Suscripción reactiva al perfil del conductor.
     * Incluye resolución automática de la capacidad del bus y agenda de horarios.
     */
    public ValueEventListener listenToDriverData(String userId, DriverDataCallback callback) {
        DatabaseReference ref = MyApp.getDatabaseReference("conductores/" + userId);
        ValueEventListener listener = new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                if (snapshot.exists()) {
                    Driver driver = snapshot.getValue(Driver.class);
                    if (driver == null) { callback.onError("Error en modelo de conductor."); return; }
                    driver.setId(userId);
                    ensureSchedules(snapshot, driver);
                    // Carga secundaria de capacidad técnica
                    if (driver.getVehicleId() != null && !driver.getVehicleId().isEmpty()) fetchVehicleCapacity(driver, callback);
                    else callback.onDriverDataLoaded(driver);
                } else callback.onError("Conductor no encontrado.");
            }
            @Override public void onCancelled(@NonNull DatabaseError error) { callback.onError(error.getMessage()); }
        };
        ref.addValueEventListener(listener);
        return listener;
    }

    /**
     * Consulta el perfil operativo en una operación única.
     */
    public void loadDriverData(String userId, DriverDataCallback callback) {
        MyApp.getDatabaseReference("conductores/" + userId).addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                if (snapshot.exists()) {
                    Driver driver = snapshot.getValue(Driver.class);
                    if (driver == null) { callback.onError("Fallo al cargar conductor."); return; }
                    driver.setId(userId);
                    ensureSchedules(snapshot, driver);
                    if (driver.getVehicleId() != null && !driver.getVehicleId().isEmpty()) fetchVehicleCapacity(driver, callback);
                    else callback.onDriverDataLoaded(driver);
                } else callback.onError("Perfil operativo no encontrado.");
            }
            @Override public void onCancelled(@NonNull DatabaseError error) { callback.onError(error.getMessage()); }
        });
    }

    /**
     * Garantiza que la lista de horarios asignados esté presente en el objeto Driver.
     */
    private void ensureSchedules(DataSnapshot snapshot, Driver driver) {
        if (driver.getAssignedSchedules() == null) {
            List<String> schedules = new ArrayList<>();
            DataSnapshot hSnap = snapshot.child("horariosAsignados");
            for (DataSnapshot s : hSnap.getChildren()) {
                String val = String.valueOf(s.getValue());
                if (val != null && !"null".equals(val)) schedules.add(val);
            }
            driver.setAssignedSchedules(schedules);
        }
    }

    /**
     * Consulta el nodo /vehiculos/ para inyectar la capacidad técnica en el objeto Driver.
     */
    private void fetchVehicleCapacity(Driver driver, DriverDataCallback callback) {
        MyApp.getDatabaseReference("vehiculos/" + driver.getVehicleId()).addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                if (snapshot.exists()) {
                    Integer cap = snapshot.child("capacidad").getValue(Integer.class);
                    if (cap != null && cap > 0) driver.setVehicleCapacity(cap);
                }
                callback.onDriverDataLoaded(driver);
            }
            @Override public void onCancelled(@NonNull DatabaseError error) { callback.onDriverDataLoaded(driver); }
        });
    }

    /**
     * Actualiza atributos básicos del perfil de pasajero.
     */
    public void updateUserProfile(String userId, String name, String phone, UserUpdateCallback callback) {
        Map<String, Object> updates = new HashMap<>();
        updates.put("nombre", name); updates.put("telefono", phone);
        MyApp.getDatabaseReference("usuarios/" + userId).updateChildren(updates)
                .addOnSuccessListener(aVoid -> callback.onSuccess())
                .addOnFailureListener(e -> callback.onError(e.getMessage()));
    }

    /**
     * Actualiza el perfil profesional y operativo del conductor.
     */
    public void updateDriverProfile(String userId, String name, String phone, String plate, List<String> schedules, UserUpdateCallback callback) {
        Map<String, Object> updates = new HashMap<>();
        updates.put("nombre", name); updates.put("telefono", phone); updates.put("placaVehiculo", plate);
        if (schedules != null) updates.put("horariosAsignados", schedules);
        MyApp.getDatabaseReference("conductores/" + userId).updateChildren(updates)
                .addOnSuccessListener(aVoid -> callback.onSuccess())
                .addOnFailureListener(e -> callback.onError(e.getMessage()));
    }

    /**
     * Sincroniza la URL de la foto de perfil en el nodo correspondiente.
     */
    public void updateProfilePicture(String userId, String photoUrl, String node, UserUpdateCallback callback) {
        MyApp.getDatabaseReference(node + "/" + userId).child("photoUrl").setValue(photoUrl)
                .addOnSuccessListener(aVoid -> callback.onSuccess())
                .addOnFailureListener(e -> callback.onError(e.getMessage()));
    }

    /**
     * Resuelve los objetos Route completos basándose en los IDs de horario asignados.
     * Realiza el cruce con el PriceService para garantizar tarifas actualizadas.
     */
    public void loadAssignedRoutes(List<String> assignedSchedules, RoutesCallback callback) {
        if (assignedSchedules == null || assignedSchedules.isEmpty()) { 
            callback.onRoutesLoaded(new ArrayList<>()); 
            return; 
        }
        
        new PriceService().getAllPrices(new PriceService.AllPricesCallback() {
            @Override
            public void onPricesLoaded(Map<String, Map<String, Double>> allPrices) {
                fetchRoutesWithPrices(assignedSchedules, allPrices, callback);
            }
            @Override public void onError(String error) { fetchRoutesWithPrices(assignedSchedules, new HashMap<>(), callback); }
        });
    }

    private void fetchRoutesWithPrices(List<String> assignedSchedules, Map<String, Map<String, Double>> allPrices, RoutesCallback callback) {
        DatabaseReference ref = MyApp.getDatabaseReference("horarios");
        ref.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                List<Route> routesList = new ArrayList<>();
                for (String scheduleId : assignedSchedules) {
                    DataSnapshot hSnap = snapshot.child(scheduleId);
                    if (hSnap.exists()) {
                        String time = getStringSafely(hSnap.child("hora"));
                        String rName = getStringSafely(hSnap.child("ruta"));
                        if (!time.isEmpty() && !rName.isEmpty()) {
                            Schedule schedule = new Schedule();
                            schedule.setId(scheduleId);
                            schedule.setTime(time);
                            schedule.setRoute(rName);
                            
                            // Normalización de trayectos
                            String origin, destination;
                            String lowRoute = rName.toLowerCase();
                            if (lowRoute.contains("natag") && lowRoute.contains("plata")) {
                                if (lowRoute.indexOf("natag") < lowRoute.indexOf("plata")) {
                                    origin = "Natagá"; destination = "La Plata";
                                } else {
                                    origin = "La Plata"; destination = "Natagá";
                                }
                            } else {
                                origin = rName.contains("->") ? rName.split("->")[0].trim() : "Natagá";
                                destination = rName.contains("->") ? rName.split("->")[1].trim() : "La Plata";
                            }
                            
                            double price = PriceService.DEFAULT_PRICE;
                            String nO = FormatUtils.normalizarTexto(origin);
                            String nD = FormatUtils.normalizarTexto(destination);
                            if (allPrices.containsKey(nO) && allPrices.get(nO).containsKey(nD)) price = allPrices.get(nO).get(nD);
                            
                            Route route = new Route(scheduleId, origin, destination, price);
                            route.setTime(schedule);
                            route.setScheduleId(scheduleId);
                            routesList.add(route);
                        }
                    }
                }
                // Ordenamiento inteligente: Próximos viajes primero, seguidos por horarios pasados
                Collections.sort(routesList, (r1, r2) -> {
                    if (r1.getTime() == null || r2.getTime() == null) return 0;
                    String t1 = r1.getTime().getTime();
                    String t2 = r2.getTime().getTime();
                    boolean p1 = FormatUtils.esHorarioPasado(t1);
                    boolean p2 = FormatUtils.esHorarioPasado(t2);
                    if (p1 != p2) return p1 ? 1 : -1;
                    return t1.compareTo(t2);
                });
                callback.onRoutesLoaded(routesList);
            }
            @Override public void onCancelled(@NonNull DatabaseError error) { callback.onError(error.getMessage()); }
        });
    }

    public void updateUserStatus(String userId, String status, UserUpdateCallback callback) {
        MyApp.getDatabaseReference("usuarios/" + userId).child("status").setValue(status)
                .addOnSuccessListener(aVoid -> callback.onSuccess());
    }

    /**
     * Marca la cuenta para el proceso de purga automática (Fase 1.3).
     */
    public void requestAccountDeletion(String userId, String userType, UserUpdateCallback callback) {
        String node = ("conductor".equals(userType) || "conductores".equals(userType)) ? "conductores" : "usuarios";
        Map<String, Object> updates = new HashMap<>();
        updates.put("solicitudBorrado", true);
        updates.put("fechaSolicitudBorrado", System.currentTimeMillis());
        MyApp.getDatabaseReference(node + "/" + userId).updateChildren(updates)
                .addOnSuccessListener(aVoid -> callback.onSuccess());
    }

    /**
     * Revierte el estado de borrado y reinicia el periodo de gracia.
     */
    public void cancelAccountDeletion(String userId, String userType, UserUpdateCallback callback) {
        String node = ("conductor".equals(userType) || "conductores".equals(userType)) ? "conductores" : "usuarios";
        Map<String, Object> updates = new HashMap<>();
        updates.put("solicitudBorrado", false);
        updates.put("fechaSolicitudBorrado", null);
        MyApp.getDatabaseReference(node + "/" + userId).updateChildren(updates)
                .addOnSuccessListener(aVoid -> callback.onSuccess())
                .addOnFailureListener(e -> callback.onError(e.getMessage()));
    }

    /**
     * Verifica la existencia de un perfil en el nodo operativo de conductores.
     */
    public void checkIfUserIsDriver(String userId, DriverCheckCallback callback) {
        MyApp.getDatabaseReference("conductores/" + userId).addListenerForSingleValueEvent(new ValueEventListener() {
            @Override public void onDataChange(@NonNull DataSnapshot snapshot) { callback.onDriverCheckComplete(snapshot.exists()); }
            @Override public void onCancelled(@NonNull DatabaseError error) { callback.onError(error.getMessage()); }
        });
    }

    private String getStringSafely(DataSnapshot snapshot) {
        Object v = snapshot.getValue(); return v == null ? "" : String.valueOf(v);
    }
}

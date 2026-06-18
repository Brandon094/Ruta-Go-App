package com.chopcode.rutago.app.services.user;

import com.chopcode.rutago.app.config.MyApp;
import com.chopcode.rutago.app.models.Schedule;
import com.chopcode.rutago.app.models.Route;
import com.chopcode.rutago.app.models.User;
import com.chopcode.rutago.app.models.Driver;
import com.chopcode.rutago.app.services.prices.PriceService;
import com.chopcode.rutago.app.utils.ui.FormatUtils;
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
 * Service to manage users and drivers operations.
 */
public class UserService {
    public interface UserDataCallback {
        void onUserDataLoaded(User user);
        void onError(String error);
    }

    public interface DriverCheckCallback {
        void onDriverCheckComplete(boolean isDriver);
        void onError(String error);
    }

    public interface DriverDataCallback {
        void onDriverDataLoaded(Driver driver);
        void onError(String error);
    }

    public interface RoutesCallback {
        void onRoutesLoaded(List<Route> routes);
        void onError(String error);
    }

    public interface UserUpdateCallback {
        void onSuccess();
        void onError(String error);
    }

    public void loadUserData(String userId, UserDataCallback callback) {
        DatabaseReference userRef = MyApp.getDatabaseReference("usuarios/" + userId);
        userRef.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot snapshot) {
                if (snapshot.exists()) {
                    User user = snapshot.getValue(User.class);
                    if (user != null) {
                        user.setId(userId);
                        callback.onUserDataLoaded(user);
                    } else callback.onError("Error parsing user data");
                } else callback.onError("User not found in DB");
            }
            @Override public void onCancelled(DatabaseError error) { callback.onError(error.getMessage()); }
        });
    }

    public void updateUserProfile(String userId, String name, String phone, UserUpdateCallback callback) {
        DatabaseReference userRef = MyApp.getDatabaseReference("usuarios/" + userId);
        Map<String, Object> updates = new HashMap<>();
        updates.put("nombre", name);
        updates.put("telefono", phone);
        userRef.updateChildren(updates).addOnSuccessListener(aVoid -> callback.onSuccess()).addOnFailureListener(e -> callback.onError(e.getMessage()));
    }

    public void updateProfilePicture(String userId, String photoUrl, String node, UserUpdateCallback callback) {
        DatabaseReference ref = MyApp.getDatabaseReference(node + "/" + userId);
        ref.child("photoUrl").setValue(photoUrl)
                .addOnSuccessListener(aVoid -> callback.onSuccess())
                .addOnFailureListener(e -> callback.onError(e.getMessage()));
    }

    public void requestAccountDeletion(String userId, UserUpdateCallback callback) {
        DatabaseReference userRef = MyApp.getDatabaseReference("usuarios/" + userId);
        Map<String, Object> updates = new HashMap<>();
        updates.put("solicitudBorrado", true);
        updates.put("fechaSolicitudBorrado", System.currentTimeMillis());
        userRef.updateChildren(updates).addOnSuccessListener(aVoid -> callback.onSuccess()).addOnFailureListener(e -> callback.onError(e.getMessage()));
    }

    public void loadDriverData(String userId, DriverDataCallback callback) {
        DatabaseReference ref = MyApp.getDatabaseReference("conductores/" + userId);
        ref.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot snapshot) {
                if (snapshot.exists()) {
                    Driver driver = snapshot.getValue(Driver.class);
                    if (driver == null) { callback.onError("Error parsing driver data"); return; }
                    driver.setId(userId);
                    
                    // Asegurar horariosAsignados manualmente si el mapeo falló
                    if (driver.getAssignedSchedules() == null) {
                        List<String> schedules = new ArrayList<>();
                        DataSnapshot hSnap = snapshot.child("horariosAsignados");
                        if (hSnap.exists()) {
                            for (DataSnapshot s : hSnap.getChildren()) {
                                String val = String.valueOf(s.getValue());
                                if (val != null && !val.equals("null")) schedules.add(val);
                            }
                        }
                        driver.setAssignedSchedules(schedules);
                    }

                    if (driver.getVehicleId() != null && !driver.getVehicleId().isEmpty()) fetchVehicleCapacity(driver, callback);
                    else processDriverLoad(userId, driver, callback);
                } else fetchNameFromUsers(userId, new Driver(), callback);
            }
            @Override public void onCancelled(DatabaseError error) { callback.onError(error.getMessage()); }
        });
    }

    private void fetchVehicleCapacity(Driver driver, DriverDataCallback callback) {
        DatabaseReference ref = MyApp.getDatabaseReference("vehiculos");
        String vId = driver.getVehicleId();
        if (vId != null && !vId.isEmpty()) {
            ref.child(vId).addListenerForSingleValueEvent(new ValueEventListener() {
                @Override
                public void onDataChange(@NonNull DataSnapshot snapshot) {
                    if (snapshot.exists()) {
                        Integer cap = snapshot.child("capacidad").getValue(Integer.class);
                        if (cap != null && cap > 0) {
                            driver.setVehicleCapacity(cap);
                            processDriverLoad(driver.getId(), driver, callback);
                            return;
                        }
                    }
                    fetchVehicleByOwner(driver, callback);
                }
                @Override public void onCancelled(@NonNull DatabaseError error) { fetchVehicleByOwner(driver, callback); }
            });
        } else fetchVehicleByOwner(driver, callback);
    }

    private void fetchVehicleByOwner(Driver driver, DriverDataCallback callback) {
        DatabaseReference ref = MyApp.getDatabaseReference("vehiculos");
        ref.orderByChild("conductorId").equalTo(driver.getId()).addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                if (snapshot.exists() && snapshot.hasChildren()) {
                    DataSnapshot vSnap = snapshot.getChildren().iterator().next();
                    Integer cap = vSnap.child("capacidad").getValue(Integer.class);
                    if (cap != null && cap > 0) {
                        driver.setVehicleCapacity(cap);
                        processDriverLoad(driver.getId(), driver, callback);
                        return;
                    }
                }
                processDriverLoad(driver.getId(), driver, callback);
            }
            @Override public void onCancelled(@NonNull DatabaseError error) { processDriverLoad(driver.getId(), driver, callback); }
        });
    }

    private void processDriverLoad(String userId, Driver driver, DriverDataCallback callback) {
        if (driver.getNombre() == null || driver.getNombre().isEmpty() || driver.getNombre().equalsIgnoreCase("No disponible") || driver.getNombre().contains("Driver ")) {
            fetchNameFromUsers(userId, driver, callback);
        } else callback.onDriverDataLoaded(driver);
    }

    private void fetchNameFromUsers(String userId, Driver driver, DriverDataCallback callback) {
        DatabaseReference ref = MyApp.getDatabaseReference("usuarios/" + userId);
        ref.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                if (snapshot.exists()) {
                    String name = getStringSafely(snapshot.child("nombre"));
                    String tel = getStringSafely(snapshot.child("telefono"));
                    String photo = getStringSafely(snapshot.child("photoUrl"));
                    if (driver.getNombre() == null || driver.getNombre().isEmpty()) driver.setNombre(name.isEmpty() ? "Driver " + userId.substring(0, 5) : name);
                    if (driver.getTelefono() == null || driver.getTelefono().isEmpty()) driver.setTelefono(tel);
                    if (driver.getPhotoUrl() == null || driver.getPhotoUrl().isEmpty()) driver.setPhotoUrl(photo);
                }
                if (driver.getNombre() == null || driver.getNombre().isEmpty()) driver.setNombre("Driver " + userId.substring(0, 5));
                callback.onDriverDataLoaded(driver);
            }
            @Override public void onCancelled(@NonNull DatabaseError error) {
                if (driver.getNombre() == null || driver.getNombre().isEmpty()) driver.setNombre("Driver " + userId.substring(0, 5));
                callback.onDriverDataLoaded(driver);
            }
        });
    }

    public void updateDriverProfile(String userId, String name, String phone, String plate, List<String> assignedSchedules, UserUpdateCallback callback) {
        DatabaseReference ref = MyApp.getDatabaseReference("conductores/" + userId);
        Map<String, Object> updates = new HashMap<>();
        updates.put("nombre", name);
        updates.put("telefono", phone);
        updates.put("placaVehiculo", plate);
        if (assignedSchedules != null) updates.put("horariosAsignados", assignedSchedules);
        ref.updateChildren(updates).addOnSuccessListener(aVoid -> callback.onSuccess())
                .addOnFailureListener(e -> callback.onError(e.getMessage()));
    }

    public void loadAssignedRoutes(List<String> assignedSchedules, RoutesCallback callback) {
        if (assignedSchedules == null || assignedSchedules.isEmpty()) { 
            callback.onRoutesLoaded(new ArrayList<>()); 
            return; 
        }
        
        PriceService priceService = new PriceService();
        priceService.getAllPrices(new PriceService.AllPricesCallback() {
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
            public void onDataChange(DataSnapshot snapshot) {
                List<Route> routesList = new ArrayList<>();
                if (!snapshot.exists()) {
                    callback.onRoutesLoaded(routesList);
                    return;
                }

                for (String scheduleId : assignedSchedules) {
                    if (scheduleId == null) continue;
                    DataSnapshot hSnap = snapshot.child(scheduleId);
                    if (hSnap.exists()) {
                        String time = getStringSafely(hSnap.child("hora"));
                        if (time.isEmpty()) time = getStringSafely(hSnap.child("time"));
                        
                        String routeName = getStringSafely(hSnap.child("ruta"));
                        if (routeName.isEmpty()) routeName = getStringSafely(hSnap.child("route"));
                        
                        if (!time.isEmpty() && !routeName.isEmpty()) {
                            Schedule schedule = new Schedule();
                            schedule.setId(scheduleId);
                            schedule.setTime(time);
                            schedule.setRoute(routeName);
                            
                            String lowRoute = routeName.toLowerCase();
                            String origin = lowRoute.contains("natag") ? "Natagá" : "La Plata";
                            String destination = origin.equals("Natagá") ? "La Plata" : "Natagá";
                            
                            // Resolver precio desde el mapa dinámico
                            double price = 12000.0;
                            String normOrigin = FormatUtils.normalizarTexto(origin);
                            String normDest = FormatUtils.normalizarTexto(destination);
                            if (allPrices.containsKey(normOrigin) && allPrices.get(normOrigin).containsKey(normDest)) {
                                price = allPrices.get(normOrigin).get(normDest);
                            }
                            
                            Route route = new Route(scheduleId, origin, destination, price);
                            route.setTime(schedule);
                            route.setScheduleId(scheduleId);
                            routesList.add(route);
                        }
                    }
                }

                Collections.sort(routesList, (r1, r2) -> {
                    if (r1.getTime() != null && r2.getTime() != null && r1.getTime().getTime() != null && r2.getTime().getTime() != null) 
                        return r1.getTime().getTime().compareTo(r2.getTime().getTime());
                    return 0;
                });
                callback.onRoutesLoaded(routesList);
            }
            @Override public void onCancelled(DatabaseError error) { callback.onError(error.getMessage()); }
        });
    }

    public void checkIfUserIsDriver(String userId, DriverCheckCallback callback) {
        DatabaseReference ref = MyApp.getDatabaseReference("conductores/" + userId);
        ref.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override public void onDataChange(DataSnapshot snapshot) { callback.onDriverCheckComplete(snapshot.exists()); }
            @Override public void onCancelled(DatabaseError error) { callback.onError(error.getMessage()); }
        });
    }

    private String getStringSafely(DataSnapshot snapshot) {
        Object value = snapshot.getValue();
        return value == null ? "" : String.valueOf(value);
    }
}

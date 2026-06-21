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
 * 👤 User Service (Clean Reactive Version)
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
     * Escucha cambios en los datos del usuario en tiempo real.
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
                    } else callback.onError("Error parsing user");
                } else callback.onError("User not found");
            }
            @Override public void onCancelled(@NonNull DatabaseError error) { callback.onError(error.getMessage()); }
        };
        ref.addValueEventListener(listener);
        return listener;
    }

    /**
     * Carga datos de usuario una sola vez.
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
                    } else callback.onError("Error parsing user");
                } else callback.onError("User not found");
            }
            @Override public void onCancelled(@NonNull DatabaseError error) { callback.onError(error.getMessage()); }
        });
    }

    /**
     * Escucha cambios en los datos del conductor en tiempo real.
     */
    public ValueEventListener listenToDriverData(String userId, DriverDataCallback callback) {
        DatabaseReference ref = MyApp.getDatabaseReference("conductores/" + userId);
        ValueEventListener listener = new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                if (snapshot.exists()) {
                    Driver driver = snapshot.getValue(Driver.class);
                    if (driver == null) { callback.onError("Error parsing driver"); return; }
                    driver.setId(userId);
                    ensureSchedules(snapshot, driver);
                    if (driver.getVehicleId() != null && !driver.getVehicleId().isEmpty()) fetchVehicleCapacity(driver, callback);
                    else callback.onDriverDataLoaded(driver);
                } else callback.onError("Driver not found");
            }
            @Override public void onCancelled(@NonNull DatabaseError error) { callback.onError(error.getMessage()); }
        };
        ref.addValueEventListener(listener);
        return listener;
    }

    /**
     * Carga datos de conductor una sola vez.
     */
    public void loadDriverData(String userId, DriverDataCallback callback) {
        MyApp.getDatabaseReference("conductores/" + userId).addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                if (snapshot.exists()) {
                    Driver driver = snapshot.getValue(Driver.class);
                    if (driver == null) { callback.onError("Error parsing driver"); return; }
                    driver.setId(userId);
                    ensureSchedules(snapshot, driver);
                    if (driver.getVehicleId() != null && !driver.getVehicleId().isEmpty()) fetchVehicleCapacity(driver, callback);
                    else callback.onDriverDataLoaded(driver);
                } else callback.onError("Driver not found");
            }
            @Override public void onCancelled(@NonNull DatabaseError error) { callback.onError(error.getMessage()); }
        });
    }

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

    public void updateUserProfile(String userId, String name, String phone, UserUpdateCallback callback) {
        Map<String, Object> updates = new HashMap<>();
        updates.put("nombre", name); updates.put("telefono", phone);
        MyApp.getDatabaseReference("usuarios/" + userId).updateChildren(updates)
                .addOnSuccessListener(aVoid -> callback.onSuccess())
                .addOnFailureListener(e -> callback.onError(e.getMessage()));
    }

    public void updateDriverProfile(String userId, String name, String phone, String plate, List<String> schedules, UserUpdateCallback callback) {
        Map<String, Object> updates = new HashMap<>();
        updates.put("nombre", name); updates.put("telefono", phone); updates.put("placaVehiculo", plate);
        if (schedules != null) updates.put("horariosAsignados", schedules);
        MyApp.getDatabaseReference("conductores/" + userId).updateChildren(updates)
                .addOnSuccessListener(aVoid -> callback.onSuccess())
                .addOnFailureListener(e -> callback.onError(e.getMessage()));
    }

    public void updateProfilePicture(String userId, String photoUrl, String node, UserUpdateCallback callback) {
        MyApp.getDatabaseReference(node + "/" + userId).child("photoUrl").setValue(photoUrl)
                .addOnSuccessListener(aVoid -> callback.onSuccess())
                .addOnFailureListener(e -> callback.onError(e.getMessage()));
    }

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
                            
                            String lowRoute = rName.toLowerCase();
                            String origin, destination;
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
                    if (r1.getTime() == null || r2.getTime() == null) return 0;
                    String t1 = r1.getTime().getTime();
                    String t2 = r2.getTime().getTime();
                    if (t1 == null || t2 == null) return 0;
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

    public void requestAccountDeletion(String userId, UserUpdateCallback callback) {
        Map<String, Object> updates = new HashMap<>();
        updates.put("solicitudBorrado", true);
        updates.put("fechaSolicitudBorrado", System.currentTimeMillis());
        MyApp.getDatabaseReference("usuarios/" + userId).updateChildren(updates)
                .addOnSuccessListener(aVoid -> callback.onSuccess());
    }

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

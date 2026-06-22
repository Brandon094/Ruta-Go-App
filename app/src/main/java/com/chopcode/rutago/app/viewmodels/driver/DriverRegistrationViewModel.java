package com.chopcode.rutago.app.viewmodels.driver;

import android.util.Log;
import androidx.annotation.NonNull;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import com.chopcode.rutago.app.config.MyApp;
import com.chopcode.rutago.app.managers.notifications.NotificationManager;
import com.chopcode.rutago.app.models.Schedule;
import com.chopcode.rutago.app.services.auth.RegistrationService;
import com.chopcode.rutago.app.utils.ui.FormatUtils;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 🚛 Driver Registration ViewModel
 * 
 * Versión v1.2.6 - Corregido para carga pública de horarios
 */
public class DriverRegistrationViewModel extends ViewModel {
    private static final String TAG = "DriverRegistrationVM";

    private final MutableLiveData<Boolean> registrationSuccess = new MutableLiveData<>();
    private final MutableLiveData<String> registrationError = new MutableLiveData<>();
    private final MutableLiveData<Boolean> isLoading = new MutableLiveData<>(false);
    private final MutableLiveData<List<Schedule>> schedulesRoute1 = new MutableLiveData<>();
    private final MutableLiveData<List<Schedule>> schedulesRoute2 = new MutableLiveData<>();

    private final RegistrationService registrationService;

    public DriverRegistrationViewModel() {
        this.registrationService = new RegistrationService();
    }

    public LiveData<Boolean> getRegistrationSuccess() { return registrationSuccess; }
    public LiveData<String> getRegistrationError() { return registrationError; }
    public LiveData<Boolean> getIsLoading() { return isLoading; }
    public LiveData<List<Schedule>> getSchedulesRoute1() { return schedulesRoute1; }
    public LiveData<List<Schedule>> getSchedulesRoute2() { return schedulesRoute2; }

    public void loadSchedules() {
        Log.d(TAG, "🚀 Cargando horarios (Modo Público)...");
        
        // Cargamos horarios directamente porque el nodo 'horarios' es público en las reglas
        MyApp.getDatabaseReference("horarios").addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                List<Schedule> r1 = new ArrayList<>();
                List<Schedule> r2 = new ArrayList<>();
                
                for (DataSnapshot child : snapshot.getChildren()) {
                    String hora = child.child("hora").getValue(String.class);
                    String ruta = child.child("ruta").getValue(String.class);
                    String cId = child.child("conductorId").getValue(String.class);
                    
                    if (hora != null && ruta != null) {
                        Schedule s = new Schedule();
                        s.setId(child.getKey());
                        s.setRoute(ruta);
                        
                        // Si tiene cualquier ID, asumimos ocupado (para no chocar con reglas de auth)
                        boolean isOccupied = cId != null && !cId.isEmpty();
                        s.setTime(hora + (isOccupied ? " (Ocupado)" : " (Libre)"));
                        s.setConductorId(isOccupied ? cId : null);
                        
                        // Clasificación flexible
                        String norm = FormatUtils.normalizarTexto(ruta).toLowerCase();
                        if (norm.contains("nataga") && norm.indexOf("nataga") < norm.indexOf("plata")) {
                            r1.add(s);
                        } else {
                            r2.add(s);
                        }
                    }
                }
                
                Log.d(TAG, "📦 Listas listas - R1: " + r1.size() + " | R2: " + r2.size());
                schedulesRoute1.postValue(r1);
                schedulesRoute2.postValue(r2);
            }
            @Override public void onCancelled(@NonNull DatabaseError error) {
                Log.e(TAG, "❌ Error Firebase: " + error.getMessage());
            }
        });
    }

    public void registerDriver(String name, String email, String phone, String password, 
                               String plate, String model, String year, int capacity,
                               String idS1, String idS2) {
        isLoading.setValue(true);
        registrationService.registrarSoloAuth(email, password, new RegistrationService.RegistrationCallback() {
            @Override
            public void onSuccess() {
                saveDriverFullData(name, email, phone, plate, model, year, capacity, idS1, idS2);
            }
            @Override public void onFailure(String error) { 
                isLoading.postValue(false); 
                registrationError.postValue(error); 
            }
        });
    }

    private void saveDriverFullData(String name, String email, String phone, String plate, String model, String year, int capacity, String idS1, String idS2) {
        FirebaseUser user = MyApp.getCurrentUser();
        if (user == null) { 
            isLoading.postValue(false); 
            registrationError.postValue("Session Error");
            return; 
        }
        String userId = user.getUid();

        saveToVehiculos(userId, plate, model, year, capacity);
        saveToConductores(userId, name, email, phone, plate, model, idS1, idS2);
        syncGlobalSchedules(userId, idS1, idS2, capacity);

        NotificationManager.getInstance(MyApp.getAppContext()).saveFCMTokenToRealtimeDatabase(userId, "conductores");
        isLoading.postValue(false);
        registrationSuccess.postValue(true);
    }

    private void saveToVehiculos(String userId, String plate, String model, String year, int capacity) {
        DatabaseReference ref = MyApp.getDatabaseReference("vehiculos/" + plate);
        Map<String, Object> data = new HashMap<>();
        data.put("id", plate); data.put("placa", plate); data.put("modelo", model);
        data.put("ano", year); data.put("capacidad", capacity);
        data.put("driverId", userId); data.put("conductorId", userId); data.put("estado", "activo");
        ref.setValue(data);
    }

    private void saveToConductores(String userId, String name, String email, String phone, String plate, String model, String idS1, String idS2) {
        DatabaseReference ref = MyApp.getDatabaseReference("conductores/" + userId);
        Map<String, Object> data = new HashMap<>();
        data.put("id", userId); data.put("nombre", name); data.put("email", email); data.put("telefono", phone);
        data.put("placaVehiculo", plate); data.put("modeloVehiculo", model); data.put("vehiculoId", plate);
        data.put("status", "active");
        List<String> schedules = new ArrayList<>();
        if (idS1 != null && !idS1.isEmpty()) schedules.add(idS1);
        if (idS2 != null && !idS2.isEmpty()) schedules.add(idS2);
        data.put("horariosAsignados", schedules);
        ref.setValue(data);
    }

    private void syncGlobalSchedules(String driverId, String idS1, String idS2, int capacity) {
        DatabaseReference hRef = MyApp.getDatabaseReference("horarios");
        DatabaseReference sRef = MyApp.getDatabaseReference("disponibilidadAsientos");
        Map<String, Object> seatData = new HashMap<>();
        seatData.put("asientosDisponibles", capacity);
        seatData.put("totalAsientos", capacity);
        seatData.put("asientosOcupados", null);

        if (idS1 != null && !idS1.isEmpty()) { 
            hRef.child(idS1).child("conductorId").setValue(driverId); 
            sRef.child(idS1).updateChildren(seatData); 
        }
        if (idS2 != null && !idS2.isEmpty()) { 
            hRef.child(idS2).child("conductorId").setValue(driverId); 
            sRef.child(idS2).updateChildren(seatData); 
        }
    }
}

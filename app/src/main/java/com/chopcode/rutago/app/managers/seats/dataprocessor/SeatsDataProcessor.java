package com.chopcode.rutago.app.managers.seats.dataprocessor;

import android.util.Log;
import androidx.annotation.NonNull;
import com.chopcode.rutago.app.config.MyApp;
import com.google.firebase.database.*;

import java.util.*;

/**
 * Manager dedicado a manejar la lógica de base de datos de los asientos.
 * Ahora soporta capacidad dinámica vinculada al vehículo.
 */
public class SeatsDataProcessor {
    private static final String TAG = "SeatsDataManager";
    private final DatabaseReference databaseReference;

    public interface SeatsDataCallback {
        void onSeatsDataLoaded(Set<Integer> occupiedSeats, int availableSeats);
        void onError(String error);
    }

    public interface SeatAvailabilityCallback {
        void onSeatAvailable(boolean available);
        void onError(String error);
    }

    public interface SeatReservationCallback {
        void onSuccess();
        void onError(String error);
    }

    public SeatsDataProcessor() {
        this.databaseReference = MyApp.getDatabaseReference("");
        Log.d(TAG, "✅ SeatsDataManager inicializado");
    }

    public void loadSeatsDataForSchedule(String horarioId, SeatsDataCallback callback) {
        DatabaseReference scheduleRef = databaseReference.child("disponibilidadAsientos").child(horarioId);

        scheduleRef.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                if (!snapshot.exists()) {
                    callback.onSeatsDataLoaded(new HashSet<>(), 13);
                    return;
                }

                try {
                    Set<Integer> occupiedSeats = new HashSet<>();
                    DataSnapshot occupiedSnapshot = snapshot.child("asientosOcupados");

                    if (occupiedSnapshot.exists()) {
                        for (DataSnapshot seatSnapshot : occupiedSnapshot.getChildren()) {
                            try {
                                String seatKey = seatSnapshot.getKey();
                                Boolean isOccupied = seatSnapshot.getValue(Boolean.class);
                                if (seatKey != null && isOccupied != null && isOccupied) {
                                    occupiedSeats.add(Integer.parseInt(seatKey));
                                }
                            } catch (Exception ignored) {}
                        }
                    }

                    int availableSeats = 0;
                    DataSnapshot availableSnapshot = snapshot.child("asientosDisponibles");
                    if (availableSnapshot.exists()) {
                        Integer available = availableSnapshot.getValue(Integer.class);
                        availableSeats = available != null ? available : 0;
                    }

                    callback.onSeatsDataLoaded(occupiedSeats, availableSeats);
                } catch (Exception e) {
                    callback.onError("Error processing data: " + e.getMessage());
                }
            }
            @Override public void onCancelled(@NonNull DatabaseError error) { callback.onError(error.getMessage()); }
        });
    }

    public void checkSeatAvailability(String horarioId, int seatNumber, SeatAvailabilityCallback callback) {
        DatabaseReference seatRef = databaseReference.child("disponibilidadAsientos").child(horarioId).child("asientosOcupados").child(String.valueOf(seatNumber));
        seatRef.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                boolean isOccupied = snapshot.exists() && Boolean.TRUE.equals(snapshot.getValue(Boolean.class));
                callback.onSeatAvailable(!isOccupied);
            }
            @Override public void onCancelled(@NonNull DatabaseError error) { callback.onError(error.getMessage()); }
        });
    }

    /**
     * 🛡️ Reserva un asiento de forma atómica usando runTransaction.
     * Garantiza que dos personas no puedan reservar el mismo asiento simultáneamente.
     */
    public void reserveSeat(String horarioId, int seatNumber, SeatReservationCallback callback) {
        DatabaseReference scheduleRef = databaseReference.child("disponibilidadAsientos").child(horarioId);

        scheduleRef.runTransaction(new Transaction.Handler() {
            @NonNull
            @Override
            public Transaction.Result doTransaction(@NonNull MutableData currentData) {
                // Verificar si el asiento ya está ocupado
                MutableData occupiedRef = currentData.child("asientosOcupados").child(String.valueOf(seatNumber));
                if (Boolean.TRUE.equals(occupiedRef.getValue(Boolean.class))) {
                    return Transaction.abort(); // Abortar si ya está ocupado
                }

                // Marcar asiento como ocupado
                occupiedRef.setValue(true);

                // Decrementar el contador de asientos disponibles
                Integer available = currentData.child("asientosDisponibles").getValue(Integer.class);
                if (available != null) {
                    currentData.child("asientosDisponibles").setValue(Math.max(0, available - 1));
                }

                return Transaction.success(currentData);
            }

            @Override
            public void onComplete(DatabaseError error, boolean committed, DataSnapshot currentData) {
                if (committed) {
                    Log.d(TAG, "✅ Asiento " + seatNumber + " reservado con éxito (Transaction)");
                    callback.onSuccess();
                } else {
                    String errorMsg = (error != null) ? error.getMessage() : "Seat already occupied";
                    Log.e(TAG, "❌ Fallo al reservar asiento " + seatNumber + ": " + errorMsg);
                    callback.onError(errorMsg);
                }
            }
        });
    }

    /**
     * 🛡️ Libera un asiento de forma atómica.
     */
    public void freeSeat(String horarioId, int seatNumber, SeatReservationCallback callback) {
        DatabaseReference scheduleRef = databaseReference.child("disponibilidadAsientos").child(horarioId);

        scheduleRef.runTransaction(new Transaction.Handler() {
            @NonNull
            @Override
            public Transaction.Result doTransaction(@NonNull MutableData currentData) {
                // Verificar si el asiento está realmente ocupado antes de liberar
                MutableData occupiedRef = currentData.child("asientosOcupados").child(String.valueOf(seatNumber));
                if (!Boolean.TRUE.equals(occupiedRef.getValue(Boolean.class))) {
                    return Transaction.success(currentData); // Ya está libre
                }

                // Liberar asiento (remover valor)
                occupiedRef.setValue(null);

                // Incrementar contador de disponibles
                Integer available = currentData.child("asientosDisponibles").getValue(Integer.class);
                Integer total = currentData.child("totalAsientos").getValue(Integer.class);
                if (total == null) total = 13;
                
                if (available != null && available < total) {
                    currentData.child("asientosDisponibles").setValue(available + 1);
                }

                return Transaction.success(currentData);
            }

            @Override
            public void onComplete(DatabaseError error, boolean committed, DataSnapshot currentData) {
                if (committed) {
                    Log.d(TAG, "✅ Asiento " + seatNumber + " liberado con éxito");
                    callback.onSuccess();
                } else {
                    callback.onError(error != null ? error.getMessage() : "Transaction failed");
                }
            }
        });
    }

    /**
     * 🔥 NUEVO: Sincroniza la capacidad del vehículo con los horarios asignados.
     */
    public void syncVehicleCapacityToSchedules(List<String> schedules, int capacity) {
        if (schedules == null || schedules.isEmpty() || capacity <= 0) return;
        
        Log.d(TAG, "Syncing capacity " + capacity + " to schedules: " + schedules);
        DatabaseReference dispRef = databaseReference.child("disponibilidadAsientos");
        
        for (String hId : schedules) {
            DatabaseReference scheduleRef = dispRef.child(hId);
            scheduleRef.addListenerForSingleValueEvent(new ValueEventListener() {
                @Override
                public void onDataChange(@NonNull DataSnapshot snapshot) {
                    int occupiedCount = 0;
                    if (snapshot.hasChild("asientosOcupados")) {
                        for (DataSnapshot s : snapshot.child("asientosOcupados").getChildren()) {
                            if (Boolean.TRUE.equals(s.getValue(Boolean.class))) occupiedCount++;
                        }
                    }
                    
                    Map<String, Object> updates = new HashMap<>();
                    updates.put("totalAsientos", capacity);
                    updates.put("asientosDisponibles", Math.max(0, capacity - occupiedCount));
                    
                    scheduleRef.updateChildren(updates);
                }
                @Override public void onCancelled(@NonNull DatabaseError error) {}
            });
        }
    }

    public void repairSeatStructure(String horarioId, int defaultCapacity) {
        DatabaseReference scheduleRef = databaseReference.child("disponibilidadAsientos").child(horarioId);
        scheduleRef.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                if (!snapshot.exists()) {
                    Map<String, Object> map = new HashMap<>();
                    map.put("totalAsientos", defaultCapacity);
                    map.put("asientosDisponibles", defaultCapacity);
                    map.put("asientosOcupados", new HashMap<>());
                    scheduleRef.setValue(map);
                } else {
                    if (!snapshot.hasChild("totalAsientos")) scheduleRef.child("totalAsientos").setValue(defaultCapacity);
                    if (!snapshot.hasChild("asientosDisponibles")) scheduleRef.child("asientosDisponibles").setValue(defaultCapacity);
                }
            }
            @Override public void onCancelled(@NonNull DatabaseError error) {}
        });
    }
}

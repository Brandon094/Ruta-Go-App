package com.chopcode.rutago.app.engines.seats;

import android.util.Log;
import androidx.annotation.NonNull;
import com.chopcode.rutago.app.config.MyApp;
import com.google.firebase.database.*;

import java.util.*;

/**
 * 🛰️ Seat Data Processor (Seat Engine Core)
 *
 * Motor de bajo nivel encargado de la integridad transaccional del inventario de asientos.
 * Responsabilidades:
 * - Ejecutar reservas atómicas mediante runTransaction() para evitar condiciones de carrera.
 * - Sincronizar dinámicamente la capacidad de los vehículos con los despachos programados.
 * - Implementar lógica de recuperación y reparación de estructuras de datos NoSQL.
 * - Proveer flujos de validación de disponibilidad en tiempo real.
 */
public class SeatDataProcessor {
    private static final String TAG = "SeatDataProcessor";
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

    public SeatDataProcessor() {
        this.databaseReference = MyApp.getDatabaseReference("");
        Log.d(TAG, "🚀 SeatDataProcessor inicializado");
    }

    /**
     * Carga el estado actual de ocupación para un despacho específico.
     * @param horarioId Identificador del turno a consultar.
     */
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
                    callback.onError("Error al procesar datos de asientos: " + e.getMessage());
                }
            }
            @Override public void onCancelled(@NonNull DatabaseError error) { callback.onError(error.getMessage()); }
        });
    }

    /**
     * Consulta rápida de disponibilidad para un asiento individual.
     */
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
     * 🛡️ Reserva un asiento de forma atómica.
     * Utiliza runTransaction() para garantizar que el decremento de disponibilidad y el marcado 
     * de ocupación ocurran como una única operación indivisible en el servidor.
     */
    public void reserveSeat(String horarioId, int seatNumber, SeatReservationCallback callback) {
        DatabaseReference scheduleRef = databaseReference.child("disponibilidadAsientos").child(horarioId);

        scheduleRef.runTransaction(new Transaction.Handler() {
            @NonNull
            @Override
            public Transaction.Result doTransaction(@NonNull MutableData currentData) {
                MutableData occupiedRef = currentData.child("asientosOcupados").child(String.valueOf(seatNumber));
                
                // Si el asiento ya fue tomado por otro cliente durante la latencia, abortamos.
                if (Boolean.TRUE.equals(occupiedRef.getValue(Boolean.class))) {
                    return Transaction.abort();
                }

                occupiedRef.setValue(true);

                Integer available = currentData.child("asientosDisponibles").getValue(Integer.class);
                if (available != null) {
                    currentData.child("asientosDisponibles").setValue(Math.max(0, available - 1));
                }

                return Transaction.success(currentData);
            }

            @Override
            public void onComplete(DatabaseError error, boolean committed, DataSnapshot currentData) {
                if (committed) {
                    Log.d(TAG, "✅ Asiento " + seatNumber + " reservado con éxito");
                    callback.onSuccess();
                } else {
                    String errorMsg = (error != null) ? error.getMessage() : "El asiento fue ocupado por otro usuario.";
                    callback.onError(errorMsg);
                }
            }
        });
    }

    /**
     * 🛡️ Libera un asiento de forma atómica.
     * Incrementa la disponibilidad técnica y remueve la marca de ocupación.
     */
    public void freeSeat(String horarioId, int seatNumber, SeatReservationCallback callback) {
        DatabaseReference scheduleRef = databaseReference.child("disponibilidadAsientos").child(horarioId);

        scheduleRef.runTransaction(new Transaction.Handler() {
            @NonNull
            @Override
            public Transaction.Result doTransaction(@NonNull MutableData currentData) {
                MutableData occupiedRef = currentData.child("asientosOcupados").child(String.valueOf(seatNumber));
                if (!Boolean.TRUE.equals(occupiedRef.getValue(Boolean.class))) {
                    return Transaction.success(currentData);
                }

                occupiedRef.setValue(false);

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
                    callback.onError(error != null ? error.getMessage() : "Error en transacción de liberación.");
                }
            }
        });
    }

    /**
     * 🔥 Motor de Sincronización Masiva:
     * Propaga los cambios en la capacidad técnica de un vehículo hacia todos los horarios
     * operativos asignados al conductor. Recalcula la disponibilidad restando las ventas previas.
     */
    public void syncVehicleCapacityToSchedules(List<String> schedules, int capacity) {
        if (schedules == null || schedules.isEmpty() || capacity <= 0) return;
        
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

    /**
     * Mecanismo de auto-reparación para asegurar que cada despacho tenga su nodo de disponibilidad activo.
     */
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

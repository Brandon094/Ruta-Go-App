package com.chopcode.trasnportenataga_laplata.services.reservations.driver;

import android.util.Log;

import androidx.annotation.NonNull;

import com.chopcode.trasnportenataga_laplata.config.MyApp;
import com.chopcode.trasnportenataga_laplata.models.Conductor;
import com.chopcode.trasnportenataga_laplata.models.Horario;
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
 * Servicio para gestionar la rotación de horarios entre los conductores.
 * Permite asignar y rotar los horarios de forma equitativa.
 */
public class RotationService {

    private static final String TAG = "RotationService";
    private final DatabaseReference conductoresRef;
    private final DatabaseReference horariosRef;

    public interface RotationCallback {
        void onSuccess();
        void onError(String error);
    }

    public RotationService() {
        this.conductoresRef = MyApp.getDatabaseReference("conductores");
        this.horariosRef = MyApp.getDatabaseReference("horarios");
    }

    /**
     * Realiza la rotación de horarios. 
     * Toma todos los conductores y todos los horarios, y los redistribuye.
     * En una implementación real, esto podría basarse en una fecha o un índice de rotación almacenado.
     */
    public void rotarHorarios(RotationCallback callback) {
        Log.d(TAG, "🔄 Iniciando proceso de rotación de horarios");

        // 1. Obtener todos los conductores
        conductoresRef.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot conductoresSnapshot) {
                List<Conductor> listaConductores = new ArrayList<>();
                for (DataSnapshot snapshot : conductoresSnapshot.getChildren()) {
                    Conductor conductor = snapshot.getValue(Conductor.class);
                    if (conductor != null) {
                        conductor.setId(snapshot.getKey());
                        listaConductores.add(conductor);
                    }
                }

                if (listaConductores.isEmpty()) {
                    callback.onError("No hay conductores registrados para rotar");
                    return;
                }

                // 2. Obtener todos los horarios
                horariosRef.addListenerForSingleValueEvent(new ValueEventListener() {
                    @Override
                    public void onDataChange(@NonNull DataSnapshot horariosSnapshot) {
                        List<Horario> listaHorarios = new ArrayList<>();
                        for (DataSnapshot snapshot : horariosSnapshot.getChildren()) {
                            Horario horario = snapshot.getValue(Horario.class);
                            if (horario != null) {
                                horario.setId(snapshot.getKey());
                                listaHorarios.add(horario);
                            }
                        }

                        if (listaHorarios.isEmpty()) {
                            callback.onError("No hay horarios registrados para asignar");
                            return;
                        }

                        // 3. Ejecutar lógica de rotación
                        ejecutarLogicaRotacion(listaConductores, listaHorarios, callback);
                    }

                    @Override
                    public void onCancelled(@NonNull DatabaseError error) {
                        callback.onError("Error cargando horarios: " + error.getMessage());
                    }
                });
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {
                callback.onError("Error cargando conductores: " + error.getMessage());
            }
        });
    }

    /**
     * Lógica para distribuir horarios entre conductores de forma equitativa.
     */
    private void ejecutarLogicaRotacion(List<Conductor> conductores, List<Horario> horarios, RotationCallback callback) {
        Log.d(TAG, "⚖️ Distribuyendo " + horarios.size() + " horarios entre " + conductores.size() + " conductores");

        // Ordenar conductores por ID para que la rotación sea predecible
        Collections.sort(conductores, (c1, c2) -> c1.getId().compareTo(c2.getId()));
        
        // Ordenar horarios (podría ser por hora o ID)
        Collections.sort(horarios, (h1, h2) -> h1.getId().compareTo(h2.getId()));

        Map<String, List<String>> nuevasAsignaciones = new HashMap<>();
        for (Conductor c : conductores) {
            nuevasAsignaciones.put(c.getId(), new ArrayList<>());
        }

        // Distribución Round-Robin
        for (int i = 0; i < horarios.size(); i++) {
            int conductorIndex = i % conductores.size();
            String conductorId = conductores.get(conductorIndex).getId();
            nuevasAsignaciones.get(conductorId).add(horarios.get(i).getId());
        }

        // 4. Actualizar en Firebase
        actualizarAsignacionesEnFirebase(nuevasAsignaciones, callback);
    }

    private void actualizarAsignacionesEnFirebase(Map<String, List<String>> asignaciones, RotationCallback callback) {
        Log.d(TAG, "💾 Guardando nuevas asignaciones en Firebase...");
        
        Map<String, Object> updates = new HashMap<>();
        for (Map.Entry<String, List<String>> entry : asignaciones.entrySet()) {
            updates.put(entry.getKey() + "/horariosAsignados", entry.getValue());
        }

        conductoresRef.updateChildren(updates)
                .addOnSuccessListener(aVoid -> {
                    Log.d(TAG, "✅ Rotación completada con éxito");
                    callback.onSuccess();
                })
                .addOnFailureListener(e -> {
                    Log.e(TAG, "❌ Error al actualizar asignaciones: " + e.getMessage());
                    callback.onError(e.getMessage());
                });
    }
}

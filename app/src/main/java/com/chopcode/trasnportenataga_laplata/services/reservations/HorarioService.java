package com.chopcode.trasnportenataga_laplata.services.reservations;

import android.util.Log;

import androidx.annotation.NonNull;

import com.chopcode.trasnportenataga_laplata.config.MyApp;
import com.chopcode.trasnportenataga_laplata.models.Horario;
import com.chopcode.trasnportenataga_laplata.managers.seats.dataprocessor.SeatsDataProcessor;
import com.google.firebase.database.*;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.text.SimpleDateFormat;

public class HorarioService {

    private static final String TAG = "HorarioService";
    private final DatabaseReference databaseReference;

    public interface HorarioCallback {
        void onHorariosCargados(List<Horario> listaNataga, List<Horario> listaLaPlata);
        void onError(String error);
    }

    public interface RotationCallback {
        void onSuccess();
        void onError(String error);
    }

    public HorarioService() {
        this.databaseReference = MyApp.getDatabaseReference("horarios");
    }

    public void cargarHorarios(HorarioCallback callback) {
        Log.d(TAG, "🔄 Iniciando carga de horarios desde Firebase");

        databaseReference.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                List<Horario> listaNataga = new ArrayList<>();
                List<Horario> listaLaPlata = new ArrayList<>();

                for (DataSnapshot snapshot : dataSnapshot.getChildren()) {
                    String hora = snapshot.child("hora").getValue(String.class);
                    String ruta = snapshot.child("ruta").getValue(String.class);
                    String id = snapshot.getKey();

                    Horario horario = new Horario();
                    horario.setId(id);
                    horario.setHora(hora != null ? hora : "--:--");
                    horario.setRuta(ruta != null ? ruta : "Ruta no disponible");

                    if (ruta != null) {
                        ruta = ruta.trim();
                        if (ruta.equals("Natagá -> La Plata")) {
                            listaNataga.add(horario);
                        } else if (ruta.equals("La Plata -> Natagá")) {
                            listaLaPlata.add(horario);
                        } else {
                            listaNataga.add(horario);
                        }
                    } else {
                        listaNataga.add(horario);
                    }
                }
                callback.onHorariosCargados(listaNataga, listaLaPlata);
            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {
                callback.onError("Error al cargar horarios: " + databaseError.getMessage());
            }
        });
    }

    /**
     * ✅ Rotación automática con reglas específicas:
     * 1. Brayan Alvarado tiene horarios fijos (10 AM y 2 PM).
     * 2. Un conductor descansa cada día (rotativo).
     * 3. Los demás rotan sus horarios.
     */
    public void rotarHorarios(RotationCallback callback) {
        Log.d(TAG, "🔄 Iniciando proceso de rotación de horarios con reglas especiales");

        DatabaseReference conductoresRef = MyApp.getDatabaseReference("conductores");

        conductoresRef.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                if (!snapshot.exists()) {
                    callback.onError("No hay conductores");
                    return;
                }

                List<DataSnapshot> conductorSnaps = new ArrayList<>();
                DataSnapshot tempBrayanSnap = null;

                for (DataSnapshot snap : snapshot.getChildren()) {
                    String nombre = snap.child("nombre").getValue(String.class);
                    if (nombre != null && nombre.toLowerCase().contains("brayan alvarado")) {
                        tempBrayanSnap = snap;
                    } else {
                        conductorSnaps.add(snap);
                    }
                }

                final DataSnapshot brayanSnap = tempBrayanSnap;

                // Necesitamos identificar los IDs de los horarios fijos
                databaseReference.addListenerForSingleValueEvent(new ValueEventListener() {
                    @Override
                    public void onDataChange(@NonNull DataSnapshot schedulesSnapshot) {
                        List<String> idsFijosBrayan = new ArrayList<>();
                        List<List<String>> poolsDeHorarios = new ArrayList<>();
                        
                        // Buscamos los fijos de Brayan
                        for (DataSnapshot hSnap : schedulesSnapshot.getChildren()) {
                            String hora = hSnap.child("hora").getValue(String.class);
                            String ruta = hSnap.child("ruta").getValue(String.class);
                            String id = hSnap.getKey();
                            
                            if (("10:00 AM".equals(hora) && "Natagá -> La Plata".equals(ruta)) ||
                                ("02:00 PM".equals(hora) && "La Plata -> Natagá".equals(ruta))) {
                                idsFijosBrayan.add(id);
                            }
                        }

                        // Agrupamos el resto de horarios en "bloques" para asignar a los conductores
                        // Supongamos que cada conductor (que no descansa) lleva 2 o más horarios.
                        // Para simplificar la rotación, rotaremos las LISTAS de horarios que tenían ayer.
                        
                        Map<String, List<String>> asignacionesAyer = new HashMap<>();
                        List<String> idsOtrosConductores = new ArrayList<>();

                        for (DataSnapshot snap : conductorSnaps) {
                            String id = snap.getKey();
                            idsOtrosConductores.add(id);
                            List<String> horarios = new ArrayList<>();
                            if (snap.hasChild("horariosAsignados")) {
                                for (DataSnapshot h : snap.child("horariosAsignados").getChildren()) {
                                    String val = h.getValue(String.class);
                                    if (val != null) horarios.add(val);
                                }
                            }
                            asignacionesAyer.put(id, horarios);
                        }

                        Map<String, Object> updates = new HashMap<>();
                        
                        // 1. Asignar fijos a Brayan
                        if (brayanSnap != null) {
                            updates.put(brayanSnap.getKey() + "/horariosAsignados", idsFijosBrayan);
                        }

                        // 2. Rotación para los demás (incluyendo el descanso)
                        // Si ayer el conductor A descansó (lista vacía), hoy le toca a B.
                        int n = idsOtrosConductores.size();
                        for (int i = 0; i < n; i++) {
                            String idActual = idsOtrosConductores.get(i);
                            String idAnterior = idsOtrosConductores.get((i - 1 + n) % n);
                            updates.put(idActual + "/horariosAsignados", asignacionesAyer.get(idAnterior));
                        }

                        // Aplicar cambios
                        conductoresRef.updateChildren(updates).addOnSuccessListener(aVoid -> {
                            new SeatsDataProcessor().reiniciarTodosLosAsientos(new SeatsDataProcessor.SeatReservationCallback() {
                                @Override
                                public void onSuccess() { callback.onSuccess(); }
                                @Override
                                public void onError(String error) { callback.onSuccess(); }
                            });
                        }).addOnFailureListener(e -> callback.onError(e.getMessage()));
                    }

                    @Override
                    public void onCancelled(@NonNull DatabaseError error) { callback.onError(error.getMessage()); }
                });
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) { callback.onError(error.getMessage()); }
        });
    }

    public void verificarYEjecutarRotacionAutomatica(RotationCallback callback) {
        DatabaseReference systemRef = MyApp.getDatabaseReference("sistema/ultima_rotacion");
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd", Locale.getDefault());
        String hoy = sdf.format(Calendar.getInstance().getTime());

        systemRef.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                String ultimaFecha = snapshot.getValue(String.class);
                if (ultimaFecha == null || !ultimaFecha.equals(hoy)) {
                    rotarHorarios(new RotationCallback() {
                        @Override
                        public void onSuccess() {
                            systemRef.setValue(hoy);
                            if (callback != null) callback.onSuccess();
                        }
                        @Override
                        public void onError(String error) {
                            if (callback != null) callback.onError(error);
                        }
                    });
                } else {
                    if (callback != null) callback.onSuccess();
                }
            }
            @Override
            public void onCancelled(@NonNull DatabaseError error) {
                if (callback != null) callback.onError(error.getMessage());
            }
        });
    }

    public void limpiarTodasLasAsignaciones(RotationCallback callback) {
        DatabaseReference conductoresRef = MyApp.getDatabaseReference("conductores");
        conductoresRef.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                Map<String, Object> updates = new HashMap<>();
                for (DataSnapshot snap : snapshot.getChildren()) {
                    updates.put(snap.getKey() + "/horariosAsignados", null);
                }
                conductoresRef.updateChildren(updates).addOnSuccessListener(aVoid -> callback.onSuccess())
                        .addOnFailureListener(e -> callback.onError(e.getMessage()));
            }
            @Override
            public void onCancelled(@NonNull DatabaseError error) { callback.onError(error.getMessage()); }
        });
    }
}

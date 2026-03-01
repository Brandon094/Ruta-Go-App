package com.chopcode.trasnportenataga_laplata.services.reservations;

import android.util.Log;

import androidx.annotation.NonNull;

import com.chopcode.trasnportenataga_laplata.models.Horario;
import com.google.firebase.database.*;

import java.util.ArrayList;
import java.util.List;

public class HorarioService {

    // ✅ NUEVO: Tag para logs
    private static final String TAG = "HorarioService";

    private final DatabaseReference databaseReference;

    /** Interfaz para cargar los horarios de forma asincronica */
    public interface HorarioCallback {
        void onHorariosCargados(List<Horario> listaNataga, List<Horario> listaLaPlata);
        void onError(String error);
    }

    public HorarioService() {
        Log.d(TAG, "🚀 Constructor - Inicializando servicio de horarios");
        this.databaseReference = FirebaseDatabase.getInstance().getReference("horarios");
        Log.d(TAG, "✅ Referencia a Firebase Database configurada: horarios");
    }

    public void cargarHorarios(HorarioCallback callback) {
        Log.d(TAG, "🔄 Iniciando carga de horarios desde Firebase");

        databaseReference.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                Log.d(TAG, "✅ Datos de horarios recibidos - Snapshots: " + dataSnapshot.getChildrenCount());

                List<Horario> listaNataga = new ArrayList<>();
                List<Horario> listaLaPlata = new ArrayList<>();

                int contadorNataga = 0;
                int contadorLaPlata = 0;
                int contadorSinRuta = 0;

                for (DataSnapshot snapshot : dataSnapshot.getChildren()) {
                    // Obtener valores manualmente para asegurar que funcionen
                    String hora = snapshot.child("hora").getValue(String.class);
                    String ruta = snapshot.child("ruta").getValue(String.class);
                    String id = snapshot.getKey(); // 🔥 OBTENER EL ID DEL HORARIO

                    Log.d(TAG, "📋 Procesando horario - ID: " + id + ", Hora: " + hora + ", Ruta: " + ruta);

                    // Crear horario solo con los datos esenciales
                    Horario horario = new Horario();
                    horario.setId(id); // 🔥 ASIGNAR EL ID
                    horario.setHora(hora != null ? hora : "--:--");
                    horario.setRuta(ruta != null ? ruta : "Ruta no disponible");

                    if (ruta != null) {
                        ruta = ruta.trim();
                        if (ruta.equals("Natagá -> La Plata")) {
                            listaNataga.add(horario);
                            contadorNataga++;
                            Log.d(TAG, "📍 Agregado a Natagá -> La Plata: " + hora);
                        } else if (ruta.equals("La Plata -> Natagá")) {
                            listaLaPlata.add(horario);
                            contadorLaPlata++;
                            Log.d(TAG, "📍 Agregado a La Plata -> Natagá: " + hora);
                        } else {
                            // Ruta no reconocida
                            listaNataga.add(horario);
                            contadorSinRuta++;
                            Log.w(TAG, "⚠️ Ruta no reconocida: '" + ruta + "' - Agregado a Natagá por defecto");
                        }
                    } else {
                        // Si no hay ruta, agregar a alguna lista por defecto
                        listaNataga.add(horario);
                        contadorSinRuta++;
                        Log.w(TAG, "⚠️ Ruta es null - Agregado a Natagá por defecto");
                    }
                }

                Log.d(TAG, "📊 Resumen de horarios cargados:");
                Log.d(TAG, "   - Natagá -> La Plata: " + contadorNataga + " horarios");
                Log.d(TAG, "   - La Plata -> Natagá: " + contadorLaPlata + " horarios");
                Log.d(TAG, "   - Sin ruta definida: " + contadorSinRuta + " horarios");
                Log.d(TAG, "   - TOTAL: " + (contadorNataga + contadorLaPlata + contadorSinRuta) + " horarios");

                callback.onHorariosCargados(listaNataga, listaLaPlata);
            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {
                Log.e(TAG, "❌ Error en Firebase Database al cargar horarios:");
                Log.e(TAG, "   - Mensaje: " + databaseError.getMessage());
                Log.e(TAG, "   - Código: " + databaseError.getCode());
                Log.e(TAG, "   - Detalles: " + databaseError.getDetails());
                callback.onError("Error al cargar horarios: " + databaseError.getMessage());
            }
        });
    }
}
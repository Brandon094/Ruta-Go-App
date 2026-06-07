package com.chopcode.rutago.app.services.reservations;

import android.util.Log;

import androidx.annotation.NonNull;

import com.chopcode.rutago.app.config.MyApp;
import com.chopcode.rutago.app.models.Horario;
import com.google.firebase.database.*;

import java.util.ArrayList;
import java.util.List;

public class HorarioService {

    private static final String TAG = "HorarioService";
    private final DatabaseReference databaseReference;

    public interface HorarioCallback {
        void onHorariosCargados(List<Horario> listaNataga, List<Horario> listaLaPlata);
        void onError(String error);
    }

    public HorarioService() {
        this.databaseReference = MyApp.getDatabaseReference("horarios");
    }

    /**
     * Carga los horarios desde Firebase.
     * La rotación ahora ocurre automáticamente en la nube (Cloud Functions).
     */
    public void cargarHorarios(HorarioCallback callback) {
        Log.d(TAG, "🔄 Cargando horarios desde Firebase (Sincronizados por Cloud)");

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
}

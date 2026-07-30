package com.chopcode.rutago.app.services.reservations.common;

import android.util.Log;
import androidx.annotation.NonNull;
import com.chopcode.rutago.app.config.MyApp;
import com.chopcode.rutago.app.models.Schedule;
import com.chopcode.rutago.app.services.prices.PriceService;
import com.chopcode.rutago.app.utils.ui.FormatUtils;
import com.google.firebase.database.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Schedule Service
 *
 * Gestor del catálogo maestro de itinerarios y disponibilidad global.
 * Responsabilidades:
 * - Cargar y segmentar la planilla de horarios diarios por trayecto.
 * - Implementar un "Sanity Check" para filtrar conductores huérfanos o eliminados.
 * - Sincronizar dinámicamente las tarifas vigentes con cada turno de la planilla.
 * - Proveer un stream global de ocupación (asientos libres y totales) para todos los despachos.
 * - Optimizar la carga inicial mediante la resolución paralela de precios y perfiles.
 */
public class ScheduleService {

    private static final String TAG = "ScheduleService";
    private final DatabaseReference databaseReference;
    private final PriceService priceService;

    /** Interfaz para la carga segmentada de horarios. */
    public interface ScheduleCallback {
        void onSchedulesLoaded(List<Schedule> natagaList, List<Schedule> laPlataList);
        void onError(String error);
    }

    /** Interfaz para actualizaciones reactivas de ocupación global. */
    public interface GlobalSeatsCallback {
        /** @param availabilities Mapa con [horarioId] = asientosDisponibles. */
        void onSeatsUpdated(Map<String, Integer> availabilities, Map<String, Integer> totals);
    }

    public ScheduleService() {
        this.databaseReference = MyApp.getDatabaseReference("horarios");
        this.priceService = new PriceService();
    }

    /**
     * Establece una suscripción permanente al nodo de disponibilidad técnica.
     * @return El listener para su posterior remoción en el onCleared() del ViewModel.
     */
    public ValueEventListener listenGlobalAvailability(GlobalSeatsCallback callback) {
        DatabaseReference dispRef = MyApp.getDatabaseReference("disponibilidadAsientos");
        ValueEventListener listener = new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                Map<String, Integer> availMap = new java.util.HashMap<>();
                Map<String, Integer> totalMap = new java.util.HashMap<>();
                for (DataSnapshot hSnap : snapshot.getChildren()) {
                    String hId = hSnap.getKey();
                    Integer available = hSnap.child("asientosDisponibles").getValue(Integer.class);
                    Integer total = hSnap.child("totalAsientos").getValue(Integer.class);
                    if (hId != null) {
                        if (available != null) availMap.put(hId, available);
                        if (total != null) totalMap.put(hId, total);
                    }
                }
                callback.onSeatsUpdated(availMap, totalMap);
            }
            @Override public void onCancelled(@NonNull DatabaseError error) { Log.e(TAG, "❌ Suscripción global de asientos cancelada: " + error.getMessage()); }
        };
        dispRef.addValueEventListener(listener);
        return listener;
    }

    /**
     * Carga la planilla de horarios integrando la validación de conductores y precios.
     * Este método garantiza que no se muestren conductores que ya no existen en el sistema.
     */
    public void loadSchedules(ScheduleCallback callback) {
        priceService.getAllPrices(new PriceService.AllPricesCallback() {
            @Override
            public void onPricesLoaded(Map<String, Map<String, Double>> allPrices) {
                
                // Fase 1: Recuperar lista de conductores activos para el Sanity Check
                MyApp.getDatabaseReference("conductores").addListenerForSingleValueEvent(new ValueEventListener() {
                    @Override
                    public void onDataChange(@NonNull DataSnapshot driversSnapshot) {
                        Map<String, String> driverNames = new java.util.HashMap<>();
                        for (DataSnapshot d : driversSnapshot.getChildren()) {
                            String name = d.child("nombre").getValue(String.class);
                            if (name != null) driverNames.put(d.getKey(), name);
                            else driverNames.put(d.getKey(), "Conductor"); // Fallback
                        }

                        // Fase 2: Cargar y filtrar la planilla maestra
                        databaseReference.addValueEventListener(new ValueEventListener() {
                            @Override
                            public void onDataChange(DataSnapshot dataSnapshot) {
                                List<Schedule> natagaList = new ArrayList<>();
                                List<Schedule> laPlataList = new ArrayList<>();

                                for (DataSnapshot snapshot : dataSnapshot.getChildren()) {
                                    String time = snapshot.child("hora").getValue(String.class);
                                    String routeStr = snapshot.child("ruta").getValue(String.class);
                                    String condId = snapshot.child("conductorId").getValue(String.class);
                                    String id = snapshot.getKey();

                                    Schedule s = new Schedule();
                                    s.setId(id);
                                    s.setTime(time != null ? time : "--:--");
                                    s.setRoute(routeStr != null ? routeStr : "Ruta no disponible");
                                    
                                    // 🛡️ Filtro de Integridad: El conductor asignado debe ser real
                                    if (condId != null && driverNames.containsKey(condId)) {
                                        s.setConductorId(condId);
                                        s.setDriverName(driverNames.get(condId));
                                    } else {
                                        s.setConductorId(null);
                                        s.setDriverName(null);
                                    }

                                    processPriceAndAddToList(s, routeStr, allPrices, natagaList, laPlataList);
                                }
                                callback.onSchedulesLoaded(natagaList, laPlataList);
                            }
                            @Override public void onCancelled(@NonNull DatabaseError e) { callback.onError(e.getMessage()); }
                        });
                    }
                    @Override public void onCancelled(@NonNull DatabaseError e) { callback.onError(e.getMessage()); }
                });
            }
            @Override public void onError(String error) { callback.onError(error); }
        });
    }

    /**
     * Resuelve la tarifa y segmenta el horario en la lista de salida o retorno.
     */
    private void processPriceAndAddToList(Schedule s, String routeStr, Map<String, Map<String, Double>> allPrices, List<Schedule> nL, List<Schedule> pL) {
        if (routeStr != null) {
            String origin = "Natagá", destination = "La Plata";
            if (routeStr.contains("->")) {
                String[] parts = routeStr.split("->");
                origin = parts[0].trim(); destination = parts[1].trim();
            } else if (routeStr.contains("→")) {
                String[] parts = routeStr.split("→");
                origin = parts[0].trim(); destination = parts[1].trim();
            }
            
            String nO = FormatUtils.normalizarTexto(origin);
            String nD = FormatUtils.normalizarTexto(destination);
            double p = PriceService.DEFAULT_PRICE;
            if (allPrices.containsKey(nO) && allPrices.get(nO).containsKey(nD)) p = allPrices.get(nO).get(nD);
            s.setPrice(String.valueOf(p));

            if (nO.contains("nataga")) nL.add(s); else pL.add(s);
        } else {
            s.setPrice(String.valueOf(PriceService.DEFAULT_PRICE));
            nL.add(s);
        }
    }
}

package com.chopcode.rutago.app.viewmodels.passenger;

import android.util.Log;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import com.chopcode.rutago.app.config.MyApp;
import com.chopcode.rutago.app.models.User;
import com.chopcode.rutago.app.models.Reservation;
import com.chopcode.rutago.app.services.user.UserService;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;
import java.util.List;

/**
 * Passenger Profile ViewModel
 *
 * Motor reactivo para el Dashboard personal del pasajero.
 * Responsabilidades:
 * - Mantener la sincronización en tiempo real del perfil básico (/usuarios/).
 * - Realizar agregaciones atómicas sobre el nodo de reservas para calcular métricas de uso.
 * - Calcular dinámicamente los "Puntos Go" (Fase de Fidelización) basados en viajes confirmados.
 * - Proveer contadores de actividad (Totales, Confirmadas, Canceladas) e inversión acumulada.
 * - Garantizar la eficiencia energética mediante la liberación oportuna de listeners NoSQL.
 */
public class PassengerProfileViewModel extends ViewModel {
    private static final String TAG = "PassengerProfileVM";

    private final MutableLiveData<User> userLiveData = new MutableLiveData<>();
    
    /** Contadores reactivos para la UI de estadísticas. */
    private final MutableLiveData<Integer> confirmedCount = new MutableLiveData<>(0);
    private final MutableLiveData<Integer> canceledCount = new MutableLiveData<>(0);
    private final MutableLiveData<Integer> totalCount = new MutableLiveData<>(0);
    
    /** Acumulado financiero de pasajes reservados. */
    private final MutableLiveData<Double> totalSpent = new MutableLiveData<>(0.0);
    
    /** Cálculo derivado para el programa de lealtad. */
    private final MutableLiveData<Integer> loyaltyPoints = new MutableLiveData<>(0);
    
    private final MutableLiveData<Boolean> isLoading = new MutableLiveData<>(false);

    private final UserService userService;
    private ValueEventListener profileListener;
    private ValueEventListener countersListener;
    private String currentUserId;

    public PassengerProfileViewModel() {
        this.userService = new UserService();
    }

    public LiveData<User> getUserLiveData() { return userLiveData; }
    public LiveData<Integer> getConfirmedCount() { return confirmedCount; }
    public LiveData<Integer> getCanceledCount() { return canceledCount; }
    public LiveData<Integer> getTotalCount() { return totalCount; }
    public LiveData<Double> getTotalSpent() { return totalSpent; }
    public LiveData<Integer> getLoyaltyPoints() { return loyaltyPoints; }
    public LiveData<Boolean> getIsLoading() { return isLoading; }

    /**
     * Inicializa la carga de datos del perfil.
     * Implementa un mecanismo de prevención de re-inicialización innecesaria.
     */
    public void init() {
        String newUserId = MyApp.getCurrentUserId();
        if (newUserId == null) return;
        
        if (newUserId.equals(currentUserId) && profileListener != null) {
            if (userLiveData.getValue() != null) {
                isLoading.setValue(false);
            }
            return;
        }

        limpiarListeners();
        currentUserId = newUserId;
        isLoading.setValue(true);
        
        setupRealTimeProfile();
        setupRealTimeCounters();
    }

    /**
     * Activa el stream reactivo sobre el perfil del usuario.
     */
    private void setupRealTimeProfile() {
        profileListener = userService.listenToUserData(currentUserId, new UserService.UserDataCallback() {
            @Override
            public void onUserDataLoaded(User user) {
                userLiveData.postValue(user);
                isLoading.postValue(false);
                Log.d(TAG, "🔄 Perfil de pasajero actualizado: " + user.getNombre());
            }

            @Override
            public void onError(String error) {
                Log.e(TAG, "❌ Error en listener de perfil: " + error);
                isLoading.postValue(false);
            }
        });
    }

    /**
     * Calcula dinámicamente las métricas de uso consultando el nodo de reservas.
     */
    private void setupRealTimeCounters() {
        DatabaseReference ref = MyApp.getDatabaseReference("reservas");
        countersListener = new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot snapshot) {
                int confirmed = 0, canceled = 0, total = 0;
                double spent = 0;
                for (DataSnapshot snap : snapshot.getChildren()) {
                    Reservation r = snap.getValue(Reservation.class);
                    if (r != null && currentUserId.equals(r.getUserId())) {
                        total++;
                        String s = r.getReservationStatus();
                        if ("Confirmada".equalsIgnoreCase(s)) { 
                            confirmed++; 
                            spent += r.getPrice(); 
                        }
                        else if ("Cancelada".equalsIgnoreCase(s)) canceled++;
                    }
                }
                confirmedCount.postValue(confirmed);
                canceledCount.postValue(canceled);
                totalCount.postValue(total);
                totalSpent.postValue(spent);
                
                // Algoritmo base de fidelización: 10 puntos por cada viaje confirmado.
                loyaltyPoints.postValue(confirmed * 10);
            }
            @Override public void onCancelled(DatabaseError error) {}
        };
        // Consulta optimizada filtrando por el UID del pasajero.
        ref.orderByChild("userId").equalTo(currentUserId).limitToLast(100).addValueEventListener(countersListener);
    }

    private void limpiarListeners() {
        if (profileListener != null && currentUserId != null) {
            MyApp.getDatabaseReference("usuarios/" + currentUserId).removeEventListener(profileListener);
            profileListener = null;
        }
        if (countersListener != null) {
            MyApp.getDatabaseReference("reservas").removeEventListener(countersListener);
            countersListener = null;
        }
    }

    @Override
    protected void onCleared() {
        super.onCleared();
        limpiarListeners();
        Log.d(TAG, "🧹 Listeners de perfil y contadores liberados.");
    }
}

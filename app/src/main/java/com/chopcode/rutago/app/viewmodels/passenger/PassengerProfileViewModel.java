package com.chopcode.rutago.app.viewmodels.passenger;

import android.util.Log;
import androidx.annotation.NonNull;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import com.chopcode.rutago.app.config.MyApp;
import com.chopcode.rutago.app.models.User;
import com.chopcode.rutago.app.models.Reservation;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;
import java.util.List;

/**
 * 👤 Passenger Profile ViewModel
 * 
 * Gestiona la información de perfil y las estadísticas de viaje del pasajero.
 * Mantiene una escucha reactiva sobre las reservas del usuario para actualizar
 * los contadores de viajes realizados, cancelados y totales en el Dashboard.
 */
public class PassengerProfileViewModel extends ViewModel {
    private static final String TAG = "PassengerProfileViewModel";

    private final MutableLiveData<User> userLiveData = new MutableLiveData<>();
    private final MutableLiveData<Integer> confirmedCount = new MutableLiveData<>(0);
    private final MutableLiveData<Integer> canceledCount = new MutableLiveData<>(0);
    private final MutableLiveData<Integer> totalCount = new MutableLiveData<>(0);
    private final MutableLiveData<Boolean> isLoading = new MutableLiveData<>(false);

    private ValueEventListener profileListener;
    private ValueEventListener countersListener;
    private String currentUserId;

    public LiveData<User> getUserLiveData() { return userLiveData; }
    public LiveData<Integer> getConfirmedCount() { return confirmedCount; }
    public LiveData<Integer> getCanceledCount() { return canceledCount; }
    public LiveData<Integer> getTotalCount() { return totalCount; }
    public LiveData<Boolean> getIsLoading() { return isLoading; }

    public void init() {
        currentUserId = MyApp.getCurrentUserId();
        if (currentUserId == null) return;
        isLoading.setValue(true);
        setupRealTimeProfile();
        setupRealTimeCounters();
    }

    private void setupRealTimeProfile() {
        DatabaseReference ref = MyApp.getDatabaseReference("usuarios/" + currentUserId);
        profileListener = new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                if (snapshot.exists()) {
                    User user = snapshot.getValue(User.class);
                    if (user != null) {
                        user.setId(currentUserId);
                        userLiveData.postValue(user);
                    }
                }
                isLoading.postValue(false);
            }
            @Override public void onCancelled(@NonNull DatabaseError error) { Log.e(TAG, "Profile error: " + error.getMessage()); isLoading.postValue(false); }
        };
        ref.addValueEventListener(profileListener);
    }

    private void setupRealTimeCounters() {
        DatabaseReference ref = MyApp.getDatabaseReference("reservas");
        countersListener = new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                int confirmed = 0, canceled = 0, total = 0;
                for (DataSnapshot snap : snapshot.getChildren()) {
                    Reservation r = snap.getValue(Reservation.class);
                    if (r != null) {
                        total++;
                        String status = r.getReservationStatus();
                        if (status != null) {
                            if (status.equalsIgnoreCase("confirmada") || status.equalsIgnoreCase("confirmado")) confirmed++;
                            else if (status.equalsIgnoreCase("cancelada") || status.equalsIgnoreCase("cancelado")) canceled++;
                        }
                    }
                }
                confirmedCount.postValue(confirmed);
                canceledCount.postValue(canceled);
                totalCount.postValue(total);
            }
            @Override public void onCancelled(@NonNull DatabaseError error) { Log.e(TAG, "Counters error: " + error.getMessage()); }
        };
        // Optimización: Usar índice 'userId' y traer solo las últimas 100 para estadísticas actuales
        ref.orderByChild("userId").equalTo(currentUserId).limitToLast(100).addValueEventListener(countersListener);
    }

    @Override
    protected void onCleared() {
        super.onCleared();
        if (profileListener != null) MyApp.getDatabaseReference("usuarios/" + currentUserId).removeEventListener(profileListener);
        if (countersListener != null) MyApp.getDatabaseReference("reservas").removeEventListener(countersListener);
    }
}

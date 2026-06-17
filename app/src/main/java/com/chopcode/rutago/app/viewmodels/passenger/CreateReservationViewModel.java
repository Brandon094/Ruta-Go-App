package com.chopcode.rutago.app.viewmodels.passenger;

import android.util.Log;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import com.chopcode.rutago.app.models.User;
import com.chopcode.rutago.app.services.reservations.ReservationService;
import com.chopcode.rutago.app.services.user.UserService;
import com.chopcode.rutago.app.config.MyApp;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.ValueEventListener;

import java.util.HashSet;
import java.util.Set;

/**
 * 💺 Create Reservation ViewModel (Passenger)
 * 
 * Gestiona el estado de la selección de asientos para un viaje.
 * Se encarga de escuchar en tiempo real qué asientos están siendo ocupados
 * en un horario específico para actualizar el mapa visual del pasajero.
 */
public class CreateReservationViewModel extends ViewModel {
    private static final String TAG = "CreateReservationVM";

    private final MutableLiveData<Set<Integer>> occupiedSeats = new MutableLiveData<>(new HashSet<>());
    private final MutableLiveData<User> currentUser = new MutableLiveData<>();
    private final MutableLiveData<Boolean> isLoading = new MutableLiveData<>(false);
    private final MutableLiveData<String> error = new MutableLiveData<>();

    private final ReservationService reservationService;
    private final UserService userService;
    private DatabaseReference seatsListenerRef;
    private ValueEventListener seatsValueListener;

    public CreateReservationViewModel() {
        this.reservationService = new ReservationService();
        this.userService = new UserService();
    }

    public LiveData<Set<Integer>> getOccupiedSeats() { return occupiedSeats; }
    public LiveData<User> getCurrentUser() { return currentUser; }
    public LiveData<Boolean> getIsLoading() { return isLoading; }
    public LiveData<String> getError() { return error; }

    public void loadUserData() {
        String userId = MyApp.getCurrentUserId();
        if (userId == null) return;
        userService.loadUserData(userId, new UserService.UserDataCallback() {
            @Override public void onUserDataLoaded(User user) { currentUser.postValue(user); }
            @Override public void onError(String errorMsg) { error.postValue(errorMsg); }
        });
    }

    public void startListeningSeats(String scheduleId) {
        if (scheduleId == null) return;
        stopListeningSeats();
        seatsListenerRef = MyApp.getDatabaseReference("disponibilidadAsientos/" + scheduleId + "/asientosOcupados");
        seatsValueListener = new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot snapshot) {
                Set<Integer> occupied = new HashSet<>();
                for (DataSnapshot seatSnap : snapshot.getChildren()) {
                    try {
                        if (Boolean.TRUE.equals(seatSnap.getValue(Boolean.class))) {
                            occupied.add(Integer.parseInt(seatSnap.getKey()));
                        }
                    } catch (Exception e) { Log.e(TAG, "Error parsing seat: " + e.getMessage()); }
                }
                occupiedSeats.postValue(occupied);
            }
            @Override public void onCancelled(DatabaseError databaseError) { error.postValue(databaseError.getMessage()); }
        };
        seatsListenerRef.addValueEventListener(seatsValueListener);
    }

    public void stopListeningSeats() {
        if (seatsListenerRef != null && seatsValueListener != null) {
            seatsListenerRef.removeEventListener(seatsValueListener);
        }
    }

    @Override
    protected void onCleared() {
        super.onCleared();
        stopListeningSeats();
    }
}

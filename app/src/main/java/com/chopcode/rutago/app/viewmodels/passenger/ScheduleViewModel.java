package com.chopcode.rutago.app.viewmodels.passenger;

import android.util.Log;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import com.chopcode.rutago.app.config.MyApp;
import com.chopcode.rutago.app.models.Schedule;
import com.chopcode.rutago.app.services.reservations.ScheduleService;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class ScheduleViewModel extends ViewModel {
    private static final String TAG = "ScheduleViewModel";

    private final MutableLiveData<List<Schedule>> natagaSchedules = new MutableLiveData<>(new ArrayList<>());
    private final MutableLiveData<List<Schedule>> laPlataSchedules = new MutableLiveData<>(new ArrayList<>());
    private final MutableLiveData<Boolean> isLoading = new MutableLiveData<>(false);

    private final ScheduleService scheduleService;
    private ValueEventListener availabilityListener;

    public ScheduleViewModel() {
        this.scheduleService = new ScheduleService();
    }

    public LiveData<List<Schedule>> getNatagaSchedules() { return natagaSchedules; }
    public LiveData<List<Schedule>> getLaPlataSchedules() { return laPlataSchedules; }
    public LiveData<Boolean> getIsLoading() { return isLoading; }

    public void loadSchedules() {
        isLoading.setValue(true);
        scheduleService.loadSchedules(new ScheduleService.ScheduleCallback() {
            @Override
            public void onSchedulesLoaded(List<Schedule> nataga, List<Schedule> laPlata) {
                natagaSchedules.postValue(nataga);
                laPlataSchedules.postValue(laPlata);
                isLoading.postValue(false);
                if (availabilityListener == null) setupAvailabilityListener();
            }
            @Override public void onError(String error) { Log.e(TAG, "Error: " + error); isLoading.postValue(false); }
        });
    }

    private void setupAvailabilityListener() {
        availabilityListener = scheduleService.listenGlobalAvailability(new ScheduleService.GlobalSeatsCallback() {
            @Override
            public void onSeatsUpdated(Map<String, Integer> availabilities, Map<String, Integer> totals) {
                updateSeats(natagaSchedules, availabilities, totals);
                updateSeats(laPlataSchedules, availabilities, totals);
            }
        });
    }

    private void updateSeats(MutableLiveData<List<Schedule>> liveData, Map<String, Integer> availabilities, Map<String, Integer> totals) {
        List<Schedule> current = liveData.getValue();
        if (current == null) return;
        boolean changed = false;
        for (Schedule s : current) {
            Integer available = availabilities.get(s.getId());
            Integer total = totals.get(s.getId());
            if (available != null && s.getAvailableSeats() != available) {
                s.setAvailableSeats(available);
                changed = true;
            }
            if (total != null && s.getTotalCapacity() != total) {
                s.setTotalCapacity(total);
                changed = true;
            }
        }
        if (changed) liveData.postValue(new ArrayList<>(current));
    }

    @Override
    protected void onCleared() {
        super.onCleared();
        if (availabilityListener != null) MyApp.getDatabaseReference("disponibilidadAsientos").removeEventListener(availabilityListener);
    }
}

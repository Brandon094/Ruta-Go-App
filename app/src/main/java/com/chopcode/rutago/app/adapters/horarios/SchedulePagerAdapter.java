package com.chopcode.rutago.app.adapters.horarios;

import android.util.Log;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.viewpager2.adapter.FragmentStateAdapter;

import com.chopcode.rutago.app.activities.passenger.PassengerHomeActivity;
import com.chopcode.rutago.app.fragments.HorarioFragment;
import com.chopcode.rutago.app.models.Schedule;
import com.chopcode.rutago.app.models.User;

import java.util.ArrayList;
import java.util.List;

public class SchedulePagerAdapter extends FragmentStateAdapter {

    private static final String TAG = "SchedulePagerAdapter";
    private List<Schedule> natagaList;
    private List<Schedule> laPlataList;
    private List<HorarioFragment> fragments = new ArrayList<>();
    private PassengerHomeActivity parentActivity;

    public SchedulePagerAdapter(@NonNull PassengerHomeActivity fragmentActivity,
                               List<Schedule> natagaList,
                               List<Schedule> laPlataList) {
        super(fragmentActivity);
        this.parentActivity = fragmentActivity;
        this.natagaList = natagaList != null ? new ArrayList<>(natagaList) : new ArrayList<>();
        this.laPlataList = laPlataList != null ? new ArrayList<>(laPlataList) : new ArrayList<>();
    }

    @NonNull
    @Override
    public Fragment createFragment(int position) {
        HorarioFragment fragment;
        if (position == 0) {
            fragment = HorarioFragment.newInstance(natagaList, "Natagá -> La Plata");
        } else {
            fragment = HorarioFragment.newInstance(laPlataList, "La Plata -> Natagá");
        }

        if (parentActivity != null) {
            fragment.setUserDataListener(new HorarioFragment.OnUserDataListener() {
                @Override
                public User getUserActual() {
                    return parentActivity.getUserActual();
                }
            });
        }

        if (fragments.size() > position) {
            fragments.set(position, fragment);
        } else {
            fragments.add(position, fragment);
        }
        return fragment;
    }

    @Override
    public int getItemCount() {
        return 2;
    }

    public void actualizarDatos(List<Schedule> nataga, List<Schedule> laPlata) {
        this.natagaList.clear();
        this.laPlataList.clear();
        if (nataga != null) this.natagaList.addAll(nataga);
        if (laPlata != null) this.laPlataList.addAll(laPlata);

        for (int i = 0; i < fragments.size(); i++) {
            HorarioFragment fragment = fragments.get(i);
            if (fragment != null) {
                if (i == 0) fragment.actualizarHorarios(new ArrayList<>(natagaList));
                else if (i == 1) fragment.actualizarHorarios(new ArrayList<>(laPlataList));

                if (parentActivity != null) {
                    fragment.setUserDataListener(() -> parentActivity.getUserActual());
                }
            }
        }
        notifyDataSetChanged();
    }

    public HorarioFragment getFragment(int position) {
        if (position >= 0 && position < fragments.size()) return fragments.get(position);
        return null;
    }
}

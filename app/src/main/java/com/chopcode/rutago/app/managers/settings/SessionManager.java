package com.chopcode.rutago.app.managers.settings;

import android.content.Context;
import android.content.SharedPreferences;

public class SessionManager {
    private static final String PREF_NAME = "rutago_prefs";
    private static final String KEY_IS_FIRST_TIME = "is_first_time";
    private static final String KEY_IS_FIRST_TIME_DRIVER = "is_first_time_driver";
    
    private final SharedPreferences pref;
    private final SharedPreferences.Editor editor;

    public SessionManager(Context context) {
        pref = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE);
        editor = pref.edit();
    }

    public void setFirstTimeLaunch(boolean isFirstTime) {
        editor.putBoolean(KEY_IS_FIRST_TIME, isFirstTime);
        editor.apply();
    }

    public boolean isFirstTimeLaunch() {
        return pref.getBoolean(KEY_IS_FIRST_TIME, true);
    }

    public void setFirstTimeDriver(boolean isFirstTime) {
        editor.putBoolean(KEY_IS_FIRST_TIME_DRIVER, isFirstTime);
        editor.apply();
    }

    public boolean isFirstTimeDriver() {
        return pref.getBoolean(KEY_IS_FIRST_TIME_DRIVER, true);
    }
}

package com.chopcode.rutago.app.managers.settings;

import android.content.Context;
import android.content.SharedPreferences;

public class SessionManager {
    private static final String PREF_NAME = "rutago_prefs";
    private static final String KEY_IS_FIRST_TIME = "is_first_time";
    private static final String KEY_IS_FIRST_TIME_DRIVER = "is_first_time_driver";
    
    // Tutorial Keys
    public static final String TUT_HOME = "tut_home";
    public static final String TUT_SEATS = "tut_seats";
    public static final String TUT_CONFIRM = "tut_confirm";
    public static final String TUT_HISTORY = "tut_history";
    public static final String TUT_PROFILE = "tut_profile";
    
    // Driver Tutorial Keys
    public static final String TUT_DR_HOME = "tut_dr_home";
    public static final String TUT_DR_SEATS = "tut_dr_seats";
    public static final String TUT_DR_HISTORY = "tut_dr_history";
    public static final String TUT_DR_PROFILE = "tut_dr_profile";
    
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

    // --- Logic for Interactive Tutorials ---
    
    public boolean shouldShowTutorial(String key) {
        return pref.getBoolean(key, true);
    }

    public void markTutorialAsSeen(String key) {
        editor.putBoolean(key, false);
        editor.apply();
    }
}

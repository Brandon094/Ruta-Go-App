package com.chopcode.rutago.app.managers.core.settings;

import android.content.Context;
import android.content.SharedPreferences;

/**
 * Session Manager
 *
 * Encargado de la persistencia de configuraciones locales y estados de usuario en el dispositivo.
 * Responsabilidades:
 * - Rastrear si es la primera vez que el usuario abre el app (Onboarding control).
 * - Gestionar la persistencia de los tutoriales interactivos para evitar redundancia en la UX.
 * - Diferenciar estados de primera vez entre pasajeros y conductores.
 * - Utilizar SharedPreferences como motor de almacenamiento liviano.
 */
public class SessionManager {
    private static final String PREF_NAME = "rutago_prefs";
    private static final String KEY_IS_FIRST_TIME = "is_first_time";
    private static final String KEY_IS_FIRST_TIME_DRIVER = "is_first_time_driver";
    
    // Tutorial Keys - Pasajero
    public static final String TUT_HOME = "tut_home";
    public static final String TUT_SEATS = "tut_seats";
    public static final String TUT_CONFIRM = "tut_confirm";
    public static final String TUT_HISTORY = "tut_history";
    public static final String TUT_PROFILE = "tut_profile";
    
    // Tutorial Keys - Conductor
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

    /**
     * Define si el app debe mostrar el onboarding general.
     */
    public void setFirstTimeLaunch(boolean isFirstTime) {
        editor.putBoolean(KEY_IS_FIRST_TIME, isFirstTime);
        editor.apply();
    }

    public boolean isFirstTimeLaunch() {
        return pref.getBoolean(KEY_IS_FIRST_TIME, true);
    }

    /**
     * Define si se debe mostrar el tutorial especializado para conductores.
     */
    public void setFirstTimeDriver(boolean isFirstTime) {
        editor.putBoolean(KEY_IS_FIRST_TIME_DRIVER, isFirstTime);
        editor.apply();
    }

    public boolean isFirstTimeDriver() {
        return pref.getBoolean(KEY_IS_FIRST_TIME_DRIVER, true);
    }

    /**
     * Verifica si una sección específica aún no ha sido explicada al usuario.
     * @param key Identificador del tutorial (ej: TUT_HOME).
     */
    public boolean shouldShowTutorial(String key) {
        return pref.getBoolean(key, true);
    }

    /**
     * Marca un tutorial como completado para que no aparezca de nuevo.
     */
    public void markTutorialAsSeen(String key) {
        editor.putBoolean(key, false);
        editor.apply();
    }
}

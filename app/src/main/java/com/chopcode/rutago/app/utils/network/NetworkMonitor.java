package com.chopcode.rutago.app.utils.network;

import android.content.Context;
import android.net.ConnectivityManager;
import android.net.Network;
import android.net.NetworkCapabilities;
import android.net.NetworkRequest;
import android.os.Handler;
import android.os.Looper;
import androidx.annotation.NonNull;
import androidx.lifecycle.LiveData;

/**
 * Network Monitor (Reactive Connectivity Observer)
 *
 * Especialista en la detección proactiva del estado de conexión a internet.
 * Implementa el patrón LiveData para permitir que la UI reaccione automáticamente a cambios de red.
 *
 * Responsabilidades:
 * - Monitorear la disponibilidad de internet y la validación técnica del canal (NET_CAPABILITY_VALIDATED).
 * - Implementar un **Periodo de Gracia** (3 segundos) para filtrar micro-desconexiones y evitar falsos positivos.
 * - Gestionar el ciclo de vida del listener del sistema (ConnectivityManager) para evitar consumos de fondo.
 */
public class NetworkMonitor extends LiveData<Boolean> {

    private final ConnectivityManager connectivityManager;
    private final Handler handler = new Handler(Looper.getMainLooper());
    private Runnable disconnectTask;
    
    /** Tolerancia en milisegundos antes de notificar una desconexión real. */
    private static final int GRACE_PERIOD_MS = 3000;

    private final ConnectivityManager.NetworkCallback networkCallback = new ConnectivityManager.NetworkCallback() {
        @Override
        public void onAvailable(@NonNull Network network) {
            // Se detectó una interfaz física; cancelamos cualquier aviso de desconexión pendiente.
            cancelPendingDisconnect();
        }

        @Override
        public void onLost(@NonNull Network network) {
            // La red se perdió; programamos una verificación tras el periodo de gracia.
            scheduleDisconnectCheck();
        }

        @Override
        public void onCapabilitiesChanged(@NonNull Network network, @NonNull NetworkCapabilities networkCapabilities) {
            // VERIFICACIÓN DE INTERNET REAL: La red no solo debe existir, sino estar validada por Google.
            boolean hasInternet = networkCapabilities.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)
                    && networkCapabilities.hasCapability(NetworkCapabilities.NET_CAPABILITY_VALIDATED);
            
            if (hasInternet) {
                cancelPendingDisconnect();
                postValue(true);
            } else {
                scheduleDisconnectCheck();
            }
        }
    };

    public NetworkMonitor(Context context) {
        connectivityManager = (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
    }

    @Override
    protected void onActive() {
        super.onActive();
        checkCurrentNetwork();
        NetworkRequest networkRequest = new NetworkRequest.Builder()
                .addCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)
                .addCapability(NetworkCapabilities.NET_CAPABILITY_VALIDATED)
                .build();
        connectivityManager.registerNetworkCallback(networkRequest, networkCallback);
    }

    @Override
    protected void onInactive() {
        super.onInactive();
        connectivityManager.unregisterNetworkCallback(networkCallback);
        cancelPendingDisconnect();
    }

    private void checkCurrentNetwork() {
        postValue(isNetworkReallyAvailable());
    }

    /**
     * Programador de validación diferida.
     * Si tras el GRACE_PERIOD la red no ha vuelto, se notifica la desconexión a la UI.
     */
    private void scheduleDisconnectCheck() {
        cancelPendingDisconnect();
        disconnectTask = () -> {
            if (!isNetworkReallyAvailable()) {
                postValue(false);
            }
        };
        handler.postDelayed(disconnectTask, GRACE_PERIOD_MS);
    }

    private void cancelPendingDisconnect() {
        if (disconnectTask != null) {
            handler.removeCallbacks(disconnectTask);
            disconnectTask = null;
        }
    }

    /**
     * @return true si el dispositivo tiene una ruta de internet activa y funcional.
     */
    private boolean isNetworkReallyAvailable() {
        Network network = connectivityManager.getActiveNetwork();
        if (network == null) return false;
        NetworkCapabilities capabilities = connectivityManager.getNetworkCapabilities(network);
        return capabilities != null 
                && capabilities.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)
                && capabilities.hasCapability(NetworkCapabilities.NET_CAPABILITY_VALIDATED);
    }
}

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
 * Monitor de red mejorado con periodo de gracia para evitar falsos positivos
 * (micro-desconexiones).
 */
public class NetworkMonitor extends LiveData<Boolean> {

    private final ConnectivityManager connectivityManager;
    private final Handler handler = new Handler(Looper.getMainLooper());
    private Runnable disconnectTask;
    private static final int GRACE_PERIOD_MS = 3000; // 3 segundos de tolerancia

    private final ConnectivityManager.NetworkCallback networkCallback = new ConnectivityManager.NetworkCallback() {
        @Override
        public void onAvailable(@NonNull Network network) {
            // Si vuelve el internet, cancelamos cualquier alerta de desconexión pendiente
            cancelPendingDisconnect();
            postValue(true);
        }

        @Override
        public void onLost(@NonNull Network network) {
            // No avisar inmediatamente. Esperar por si es un micro-corte (cambio WiFi/Datos)
            scheduleDisconnectCheck();
        }

        @Override
        public void onCapabilitiesChanged(@NonNull Network network, @NonNull NetworkCapabilities networkCapabilities) {
            boolean hasInternet = networkCapabilities.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET);
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

    private boolean isNetworkReallyAvailable() {
        Network network = connectivityManager.getActiveNetwork();
        if (network == null) return false;
        NetworkCapabilities capabilities = connectivityManager.getNetworkCapabilities(network);
        return capabilities != null && capabilities.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET);
    }
}

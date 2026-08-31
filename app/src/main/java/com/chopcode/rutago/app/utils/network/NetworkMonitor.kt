package com.chopcode.rutago.app.utils.network

import android.content.Context
import android.net.ConnectivityManager
import android.net.Network
import android.net.NetworkCapabilities
import android.net.NetworkRequest
import android.os.Handler
import android.os.Looper
import androidx.lifecycle.LiveData

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
class NetworkMonitor(context: Context) : LiveData<Boolean>() {

    private val connectivityManager: ConnectivityManager? =
        context.getSystemService(Context.CONNECTIVITY_SERVICE) as? ConnectivityManager

    private val handler = Handler(Looper.getMainLooper())
    private var disconnectTask: Runnable? = null

    private val networkCallback = object : ConnectivityManager.NetworkCallback() {
        override fun onAvailable(network: Network) {
            cancelPendingDisconnect()
        }

        override fun onLost(network: Network) {
            scheduleDisconnectCheck()
        }

        override fun onCapabilitiesChanged(
            network: Network,
            networkCapabilities: NetworkCapabilities
        ) {
            val hasInternet = networkCapabilities.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET) &&
                    networkCapabilities.hasCapability(NetworkCapabilities.NET_CAPABILITY_VALIDATED)

            if (hasInternet) {
                cancelPendingDisconnect()
                postValue(true)
            } else {
                scheduleDisconnectCheck()
            }
        }
    }

    override fun onActive() {
        super.onActive()
        checkCurrentNetwork()
        val networkRequest = NetworkRequest.Builder()
            .addCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)
            .addCapability(NetworkCapabilities.NET_CAPABILITY_VALIDATED)
            .build()
        connectivityManager?.registerNetworkCallback(networkRequest, networkCallback)
    }

    override fun onInactive() {
        super.onInactive()
        connectivityManager?.unregisterNetworkCallback(networkCallback)
        cancelPendingDisconnect()
    }

    private fun checkCurrentNetwork() {
        postValue(isNetworkReallyAvailable())
    }

    private fun scheduleDisconnectCheck() {
        cancelPendingDisconnect()
        disconnectTask = Runnable {
            if (!isNetworkReallyAvailable()) {
                postValue(false)
            }
        }
        disconnectTask?.let { handler.postDelayed(it, GRACE_PERIOD_MS) }
    }

    private fun cancelPendingDisconnect() {
        disconnectTask?.let {
            handler.removeCallbacks(it)
            disconnectTask = null
        }
    }

    private fun isNetworkReallyAvailable(): Boolean {
        val cm = connectivityManager ?: return false
        val network = cm.activeNetwork ?: return false
        val capabilities = cm.getNetworkCapabilities(network) ?: return false
        return capabilities.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET) &&
                capabilities.hasCapability(NetworkCapabilities.NET_CAPABILITY_VALIDATED)
    }

    companion object {
        /** Tolerancia en milisegundos antes de notificar una desconexión real. */
        private const val GRACE_PERIOD_MS: Long = 3000
    }
}

package com.chopcode.rutago.app.managers.core.notifications

import android.content.Context
import android.util.Log
import com.chopcode.rutago.app.R
import com.chopcode.rutago.app.config.MyApp
import com.google.auth.oauth2.GoogleCredentials
import com.google.firebase.database.DataSnapshot
import com.google.firebase.database.DatabaseError
import com.google.firebase.database.DatabaseReference
import com.google.firebase.database.ValueEventListener
import com.google.firebase.messaging.FirebaseMessaging
import okhttp3.Call
import okhttp3.Callback
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import okhttp3.Response
import org.json.JSONObject
import java.io.IOException
import java.io.InputStream
import java.util.Collections
import java.util.Random

class NotificationManager private constructor(context: Context) {

    private val context: Context = context.applicationContext
    private val realtimeDb: DatabaseReference = MyApp.getDatabaseReference("")
    private val httpClient: OkHttpClient = OkHttpClient()

    init {
        Log.d(TAG, "🚀 NotificationManager inicializado con FCM V1")
    }

    fun interface OnTokenReceivedListener {
        fun onTokenReceived(token: String?)
    }

    interface NotificationCallback {
        fun onSuccess()
        fun onError(error: String?)
    }

    @Throws(IOException::class)
    private fun getAccessToken(): String {
        var isStream: InputStream? = null
        return try {
            Log.d(TAG, "📂 Cargando llave desde assets...")
            isStream = context.assets.open("service-account.json")

            val credentials = GoogleCredentials.fromStream(isStream)
                .createScoped(Collections.singletonList("https://www.googleapis.com/auth/cloud-platform"))

            Log.d(TAG, "🔐 Refrescando token de acceso...")
            credentials.refresh()

            val token = credentials.accessToken.tokenValue
            Log.d(TAG, "✅ Access Token generado exitosamente")
            token
        } catch (e: Exception) {
            Log.e(TAG, "❌ ERROR FATAL OAUTH2: ${e.message}")
            if (e.message?.contains("400 Bad Request") == true) {
                Log.e(TAG, "💡 TIP: Este error suele ser por FECHA/HORA incorrecta en el dispositivo.")
            }
            throw IOException(e.message)
        } finally {
            isStream?.close()
        }
    }

    /**
     * 1. CUANDO EL PASAJERO CREA LA RESERVA -> NOTIFICA AL CONDUCTOR
     */
    fun notificarNuevaReservaAlConductor(
        conductorId: String,
        pasajeroNombre: String,
        ruta: String,
        fechaHora: String,
        asiento: Int,
        precio: Double,
        metodoPago: String,
        callback: NotificationCallback?
    ) {
        Log.d(TAG, "🔔 [ENVIANDO -> CONDUCTOR] Nueva reserva de: $pasajeroNombre")

        val title = context.getString(R.string.notif_nueva_reserva_title)
        val body = context.getString(R.string.notif_nueva_reserva_body, pasajeroNombre, "A$asiento", ruta)

        val notificationData = mutableMapOf<String, Any>(
            "title" to title,
            "message" to body,
            "type" to "nueva_reserva",
            "pasajero_nombre" to pasajeroNombre,
            "asiento_nombre" to "A$asiento",
            "ruta_nombre" to ruta,
            "reserva_asiento" to "A$asiento",
            "reserva_pasajero" to pasajeroNombre,
            "target_activity" to "driver_home",
            "timestamp" to System.currentTimeMillis().toString()
        )

        guardarNotificacionEnBD(conductorId, notificationData, object : NotificationCallback {
            override fun onSuccess() {
                enviarPushV1(conductorId, title, body, notificationData, callback)
            }

            override fun onError(error: String?) {
                callback?.onError(error)
            }
        })
    }

    /**
     * 2. CUANDO EL CONDUCTOR CONFIRMA -> NOTIFICA AL PASAJERO
     */
    fun notificarReservaConfirmadaAlPasajero(
        pasajeroId: String,
        conductorNombre: String,
        ruta: String,
        fechaHora: String,
        asiento: Int,
        vehiculoPlaca: String,
        vehiculoModelo: String,
        callback: NotificationCallback?
    ) {
        Log.d(TAG, "🔔 [ENVIANDO -> PASAJERO] Reservation Confirmada por: $conductorNombre")

        val title = context.getString(R.string.notif_confirmada_title)
        val body = context.getString(R.string.notif_confirmada_body, ruta, conductorNombre)

        val notificationData = mutableMapOf<String, Any>(
            "title" to title,
            "message" to body,
            "type" to "reserva_confirmada",
            "reserva_asiento" to "A$asiento",
            "conductor_nombre" to conductorNombre,
            "ruta_nombre" to ruta,
            "target_activity" to "passenger_history",
            "timestamp" to System.currentTimeMillis().toString()
        )

        guardarNotificacionEnBD(pasajeroId, notificationData, object : NotificationCallback {
            override fun onSuccess() {
                enviarPushV1(pasajeroId, title, body, notificationData, callback)
            }

            override fun onError(error: String?) {
                callback?.onError(error)
            }
        })
    }

    /**
     * 3. CUANDO EL CONDUCTOR CANCELA -> NOTIFICA AL PASAJERO
     */
    fun notificarReservaCanceladaAlPasajero(
        pasajeroId: String,
        conductorNombre: String,
        ruta: String,
        motivo: String,
        callback: NotificationCallback?
    ) {
        Log.d(TAG, "🔔 [ENVIANDO -> PASAJERO] Reservation Cancelada")

        val title = context.getString(R.string.notif_cancelada_title)
        val body = context.getString(R.string.notif_cancelada_body, ruta)

        val notificationData = mutableMapOf<String, Any>(
            "title" to title,
            "message" to body,
            "type" to "reserva_cancelada",
            "ruta_nombre" to ruta,
            "motivo" to motivo,
            "target_activity" to "passenger_history",
            "timestamp" to System.currentTimeMillis().toString()
        )

        guardarNotificacionEnBD(pasajeroId, notificationData, object : NotificationCallback {
            override fun onSuccess() {
                enviarPushV1(pasajeroId, title, body, notificationData, callback)
            }

            override fun onError(error: String?) {
                callback?.onError(error)
            }
        })
    }

    /**
     * 4. NOTIFICACIÓN DE MENSAJE DE CHAT
     */
    fun notificarNuevoMensaje(
        receptorId: String,
        emisorId: String,
        emisorNombre: String,
        mensaje: String,
        reservaId: String,
        callback: NotificationCallback?
    ) {
        val title = context.getString(R.string.notif_chat_title, emisorNombre)
        val body = if (mensaje.length > 50) mensaje.substring(0, 47) + "..." else mensaje

        val data = mutableMapOf<String, Any>(
            "type" to "chat_message",
            "title" to title,
            "message" to body,
            "reservationId" to reservaId,
            "receiverId" to emisorId,
            "senderName" to emisorNombre,
            "target_activity" to "chat",
            "timestamp" to System.currentTimeMillis().toString()
        )

        enviarPushV1(receptorId, title, body, data, callback)
    }

    private fun enviarPushV1(
        userId: String,
        title: String,
        body: String,
        data: Map<String, Any>,
        callback: NotificationCallback?
    ) {
        getUserToken(userId) { targetToken ->
            if (targetToken.isNullOrEmpty()) {
                Log.e(TAG, "❌ No se encontró token para: $userId")
                callback?.onError("Token de usuario no disponible")
                return@getUserToken
            }

            Thread {
                try {
                    val accessToken = getAccessToken()
                    val payload = JSONObject()
                    val message = JSONObject()
                    message.put("token", targetToken)

                    val notification = JSONObject()
                    notification.put("title", title)
                    notification.put("body", body)
                    message.put("notification", notification)

                    val dataJson = JSONObject()
                    for ((key, value) in data) {
                        dataJson.put(key, value.toString())
                    }
                    message.put("data", dataJson)
                    payload.put("message", message)

                    val requestBody = payload.toString().toRequestBody(JSON)
                    val request = Request.Builder()
                        .url(FCM_V1_API_URL)
                        .post(requestBody)
                        .addHeader("Authorization", "Bearer $accessToken")
                        .build()

                    httpClient.newCall(request).enqueue(object : Callback {
                        override fun onFailure(call: Call, e: IOException) {
                            callback?.onError(e.message)
                        }

                        override fun onResponse(call: Call, response: Response) {
                            if (response.isSuccessful) {
                                Log.d(TAG, "✅ Push enviado con éxito a: $userId")
                                callback?.onSuccess()
                            } else {
                                callback?.onError("Error FCM: ${response.code}")
                            }
                            response.close()
                        }
                    })
                } catch (e: Exception) {
                    Log.e(TAG, "❌ Error en Push: ${e.message}")
                    callback?.onError(e.message)
                }
            }.start()
        }
    }

    private fun guardarNotificacionEnBD(
        receiverId: String,
        notificationData: Map<String, Any>,
        callback: NotificationCallback?
    ) {
        val notificationId = "notif_" + System.currentTimeMillis() + "_" + Random().nextInt(1000)
        val ref = realtimeDb.child("notificaciones").child(notificationId)

        val fullData = mutableMapOf<String, Any?>(
            "id" to notificationId,
            "receiverId" to receiverId,
            "type" to notificationData["type"],
            "title" to notificationData["title"],
            "message" to notificationData["message"],
            "status" to "pending",
            "createdAt" to System.currentTimeMillis()
        )

        ref.setValue(fullData)
            .addOnSuccessListener { callback?.onSuccess() }
            .addOnFailureListener { e -> callback?.onError(e.message) }
    }

    fun getUserToken(userId: String, listener: OnTokenReceivedListener) {
        realtimeDb.child("usuarios").child(userId).child("tokenFCM")
            .addListenerForSingleValueEvent(object : ValueEventListener {
                override fun onDataChange(snapshot: DataSnapshot) {
                    if (snapshot.exists()) {
                        listener.onTokenReceived(snapshot.getValue(String::class.java))
                    } else {
                        realtimeDb.child("conductores").child(userId).child("tokenFCM")
                            .addListenerForSingleValueEvent(object : ValueEventListener {
                                override fun onDataChange(snapshot: DataSnapshot) {
                                    if (snapshot.exists()) {
                                        listener.onTokenReceived(snapshot.getValue(String::class.java))
                                    } else {
                                        listener.onTokenReceived(null)
                                    }
                                }

                                override fun onCancelled(error: DatabaseError) {
                                    listener.onTokenReceived(null)
                                }
                            })
                    }
                }

                override fun onCancelled(error: DatabaseError) {
                    listener.onTokenReceived(null)
                }
            })
    }

    fun saveFCMTokenToRealtimeDatabase(userId: String, userType: String?) {
        FirebaseMessaging.getInstance().token
            .addOnCompleteListener { task ->
                if (task.isSuccessful && task.result != null) {
                    val token = task.result
                    val nodo = if ("conductor" == userType || "conductores" == userType) "conductores" else "usuarios"
                    realtimeDb.child(nodo).child(userId).child("tokenFCM").setValue(token)
                }
            }
    }

    companion object {
        private const val TAG = "NotificationManager"
        private const val PROJECT_ID = "trasnporte-nataga---la-plata"
        private const val FCM_V1_API_URL = "https://fcm.googleapis.com/v1/projects/$PROJECT_ID/messages:send"
        private val JSON = "application/json; charset=utf-8".toMediaType()

        @Volatile
        private var instance: NotificationManager? = null

        @JvmStatic
        @Synchronized
        fun getInstance(context: Context): NotificationManager {
            return instance ?: instance ?: NotificationManager(context).also { instance = it }
        }
    }
}

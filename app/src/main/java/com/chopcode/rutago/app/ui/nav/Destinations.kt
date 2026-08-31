package com.chopcode.rutago.app.ui.nav

import android.net.Uri

/**
 * 🗺️ DESTINATIONS: Rutas para el motor de navegación.
 */
object Destination {
    const val Onboarding = "onboarding"
    const val Login = "login"
    const val Registration = "registration"
    const val ForgotPassword = "forgot_password?email={email}"
    fun forgotPassword(email: String?) = "forgot_password?email=${Uri.encode(email ?: "")}"
    
    const val Home = "home"
    const val History = "history"
    const val Profile = "profile"
    const val EditProfile = "edit_profile"
    
    const val CreateReservation = "create_reservation/{scheduleId}/{routeName}/{scheduleTime}/{price}"
    fun createReservation(id: String, name: String, time: String, price: Double) = 
        "create_reservation/${Uri.encode(id)}/${Uri.encode(name)}/${Uri.encode(time)}/$price"
        
    const val ConfirmReservation = "confirm_reservation/{scheduleId}/{origin}/{destination}/{scheduleTime}/{travelDate}/{selectedSeat}/{price}/{driverId}/{driverName}/{vehiclePlate}/{vehicleModel}"
    fun confirmReservation(
        scheduleId: String,
        origin: String,
        destination: String,
        scheduleTime: String,
        travelDate: String,
        selectedSeat: Int,
        price: Double,
        driverId: String,
        driverName: String,
        vehiclePlate: String,
        vehicleModel: String
    ): String {
        val sId = Uri.encode(scheduleId.ifEmpty { "N_A" })
        val sOrigin = Uri.encode(origin.ifEmpty { "N_A" })
        val sDest = Uri.encode(destination.ifEmpty { "N_A" })
        val sTime = Uri.encode(scheduleTime.ifEmpty { "N_A" })
        val sDate = Uri.encode(travelDate.ifEmpty { "N_A" })
        val sDId = Uri.encode(driverId.ifEmpty { "N_A" })
        val sDName = Uri.encode(driverName.ifEmpty { "N_A" })
        val sPlate = Uri.encode(vehiclePlate.ifEmpty { "N_A" })
        val sModel = Uri.encode(vehicleModel.ifEmpty { "N_A" })
        return "confirm_reservation/$sId/$sOrigin/$sDest/$sTime/$sDate/$selectedSeat/$price/$sDId/$sDName/$sPlate/$sModel"
    }
    
    const val Ticket = "ticket/{reservationId}"
    fun ticket(id: String) = "ticket/${Uri.encode(id)}"
    
    const val Chat = "chat/{reservationId}/{receiverId}/{receiverName}/{senderName}/{scheduleTime}"
    fun chat(resId: String, recId: String, recName: String, sendName: String, time: String) = 
        "chat/${Uri.encode(resId)}/${Uri.encode(recId)}/${Uri.encode(recName)}/${Uri.encode(sendName)}/${Uri.encode(time)}"
        
    const val ManageSeats = "manage_seats/{scheduleId}/{routeName}/{scheduleTime}"
    fun manageSeats(id: String, name: String, time: String) = 
        "manage_seats/${Uri.encode(id)}/${Uri.encode(name)}/${Uri.encode(time)}"
}

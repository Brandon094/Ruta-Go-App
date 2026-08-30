package com.chopcode.rutago.app.ui.nav

/**
 * 🗺️ DESTINATIONS: Rutas para el motor de navegación.
 */
object Destination {
    const val Onboarding = "onboarding"
    const val Login = "login"
    const val Registration = "registration"
    const val ForgotPassword = "forgot_password?email={email}"
    fun forgotPassword(email: String?) = "forgot_password?email=$email"
    
    const val Home = "home"
    const val History = "history"
    const val Profile = "profile"
    const val EditProfile = "edit_profile"
    
    const val CreateReservation = "create_reservation/{scheduleId}/{routeName}/{scheduleTime}/{price}"
    fun createReservation(id: String, name: String, time: String, price: Double) = 
        "create_reservation/$id/$name/$time/$price"
        
    const val ConfirmReservation = "confirm_reservation"
    
    const val Ticket = "ticket/{reservationId}"
    fun ticket(id: String) = "ticket/$id"
    
    const val Chat = "chat/{reservationId}/{receiverId}/{receiverName}/{senderName}/{scheduleTime}"
    fun chat(resId: String, recId: String, recName: String, sendName: String, time: String) = 
        "chat/$resId/$recId/$recName/$sendName/$time"
        
    const val ManageSeats = "manage_seats/{scheduleId}/{routeName}/{scheduleTime}"
    fun manageSeats(id: String, name: String, time: String) = 
        "manage_seats/$id/$name/$time"
}

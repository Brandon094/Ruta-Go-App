package com.chopcode.rutago.app.ui.nav

import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.navigation.NavHostController
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.navArgument
import com.chopcode.rutago.app.ui.screens.common.*
import com.chopcode.rutago.app.ui.screens.auth.*
import com.chopcode.rutago.app.ui.screens.passenger.*
import com.chopcode.rutago.app.ui.screens.driver.*
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.LaunchedEffect
import com.chopcode.rutago.app.ui.viewmodels.home.HomeViewModel
import com.chopcode.rutago.app.ui.viewmodels.profile.UserProfileViewModel
import com.chopcode.rutago.app.ui.viewmodels.history.ReservationHistoryViewModel
import com.chopcode.rutago.app.ui.viewmodels.auth.*
import com.chopcode.rutago.app.ui.viewmodels.passenger.*
import com.chopcode.rutago.app.ui.viewmodels.common.*
import com.chopcode.rutago.app.ui.viewmodels.driver.*
import com.chopcode.rutago.app.ui.viewmodels.profile.EditProfileViewModel

@Composable
fun RutaGoNavHost(
    navController: NavHostController,
    startDestination: String,
    modifier: Modifier = Modifier,
    onAvatarClick: () -> Unit = {},
    onShareTicket: (String) -> Unit = {}
) {
    NavHost(
        navController = navController,
        startDestination = startDestination,
        modifier = modifier
    ) {
        // --- 👋 ONBOARDING ---
        composable(Destination.Onboarding) {
            val viewModel: OnboardingViewModel = viewModel()
            val uiState by viewModel.uiState.collectAsState()
            
            if (uiState.navigateToLogin) {
                LaunchedEffect(Unit) {
                    navController.navigate(Destination.Login) {
                        popUpTo(Destination.Onboarding) { inclusive = true }
                    }
                }
            }

            OnboardingScreen(
                uiState = uiState,
                onPageChanged = { viewModel.onPageChanged(it) },
                onNextClick = { viewModel.onNextClick() },
                onSkipClick = { viewModel.onSkipClick() }
            )
        }

        // --- 🔐 AUTHENTICATION ---
        composable(Destination.Login) {
            val viewModel: LoginViewModel = viewModel()
            val uiState by viewModel.uiState.collectAsState()
            
            if (uiState.isSuccess) {
                LaunchedEffect(Unit) {
                    navController.navigate(Destination.Home) {
                        popUpTo(Destination.Login) { inclusive = true }
                    }
                }
            }

            LoginScreen(
                uiState = uiState,
                onEmailChange = { viewModel.onEmailChanged(it) },
                onPasswordChange = { viewModel.onPasswordChanged(it) },
                onLoginClick = { viewModel.login() },
                onGoogleLoginClick = { /* Handle via MainActivity result launcher if needed */ },
                onRegisterClick = { navController.navigate(Destination.Registration) },
                onForgotPasswordClick = { navController.navigate(Destination.forgotPassword(uiState.email)) }
            )
        }

        composable(Destination.Registration) {
            val viewModel: RegistrationViewModel = viewModel()
            val uiState by viewModel.uiState.collectAsState()
            
            if (uiState.isSuccess) {
                LaunchedEffect(Unit) {
                    navController.navigate(Destination.Login) {
                        popUpTo(Destination.Registration) { inclusive = true }
                    }
                }
            }

            RegistrationScreen(
                uiState = uiState,
                onNameChange = { viewModel.onNameChanged(it) },
                onEmailChange = { viewModel.onEmailChanged(it) },
                onPhoneChange = { viewModel.onPhoneChanged(it) },
                onPasswordChange = { viewModel.onPasswordChanged(it) },
                onConfirmPasswordChange = { viewModel.onConfirmPasswordChanged(it) },
                onTermsAcceptedChange = { viewModel.onTermsAcceptedChanged(it) },
                onRegisterClick = { viewModel.register() },
                onLoginClick = { navController.navigate(Destination.Login) },
                onShowTerms = { },
                onShowPrivacy = { }
            )
        }

        composable(
            route = Destination.ForgotPassword,
            arguments = listOf(navArgument("email") { type = NavType.StringType; nullable = true })
        ) { backStackEntry ->
            val email = backStackEntry.arguments?.getString("email")
            val viewModel: ForgotPasswordViewModel = viewModel()
            val uiState by viewModel.uiState.collectAsState()
            
            LaunchedEffect(email) { email?.let { viewModel.onEmailChanged(it) } }

            ForgotPasswordScreen(
                uiState = uiState,
                onEmailChange = { viewModel.onEmailChanged(it) },
                onRecoverClick = { viewModel.recoverPassword() },
                onBackClick = { navController.popBackStack() },
                onUnderstoodClick = { navController.popBackStack() }
            )
        }

        // --- 🏠 DASHBOARD ---
        composable(Destination.Home) {
            val viewModel: HomeViewModel = viewModel()
            val uiState by viewModel.uiState.collectAsState()
            HomeScreen(
                uiState = uiState,
                onExpandLegend = { viewModel.togglePassengerLegend() },
                onTabSelected = { viewModel.onTabSelected(it) },
                onNavigate = { route ->
                    when(route) {
                        "history" -> navController.navigate(Destination.History)
                        "profile" -> navController.navigate(Destination.Profile)
                        "logout" -> viewModel.onNavigate(route)
                    }
                },
                onLogoutConfirm = {
                    viewModel.logout()
                    navController.navigate(Destination.Login) { popUpTo(0) { inclusive = true } }
                },
                onLogoutDismiss = { viewModel.dismissLogoutDialog() },
                onTutorialDismiss = { viewModel.onTutorialDismiss() },
                onReserveClick = { schedule ->
                    navController.navigate(Destination.createReservation(
                        id = schedule.id,
                        name = schedule.route,
                        time = schedule.time,
                        price = schedule.price.toDoubleOrNull() ?: 12000.0
                    ))
                },
                onConfirmReservation = { viewModel.onConfirmReservation(it) },
                onCancelReservation = { viewModel.onCancelReservation(it) },
                onManageSeatsClick = { schedule ->
                    navController.navigate(Destination.manageSeats(
                        id = schedule.id,
                        name = schedule.route,
                        time = schedule.time
                    ))
                }
            )
        }

        // --- 👤 PROFILE ---
        composable(Destination.Profile) {
            val viewModel: UserProfileViewModel = viewModel()
            val uiState by viewModel.uiState.collectAsState()
            ProfileScreen(
                uiState = uiState,
                onAvatarClick = onAvatarClick,
                onStatusClick = { viewModel.toggleUserStatus() },
                onEditProfileClick = { navController.navigate(Destination.EditProfile) },
                onDeleteAccountClick = { viewModel.showDeleteConfirmation(true) },
                onCancelDeletionClick = { viewModel.cancelAccountDeletion() },
                onNavigate = { route ->
                    when(route) {
                        "home" -> navController.navigate(Destination.Home)
                        "history" -> navController.navigate(Destination.History)
                        "logout" -> viewModel.onLogoutClick()
                    }
                },
                onLogoutConfirm = {
                    viewModel.logout()
                    navController.navigate(Destination.Login) { popUpTo(0) }
                },
                onLogoutDismiss = { viewModel.dismissLogoutDialog() },
                onDeleteConfirm = { viewModel.requestAccountDeletion() },
                onDeleteDismiss = { viewModel.showDeleteConfirmation(false) },
                onTutorialDismiss = { viewModel.onTutorialDismiss() }
            )
        }

        composable(Destination.EditProfile) {
            val viewModel: EditProfileViewModel = viewModel()
            val uiState by viewModel.uiState.collectAsState()
            
            if (uiState.updateSuccess) {
                LaunchedEffect(Unit) { navController.popBackStack() }
            }

            EditProfileScreen(
                uiState = uiState,
                onNameChange = { viewModel.onNameChange(it) },
                onPhoneChange = { viewModel.onPhoneChange(it) },
                onPlateChange = { viewModel.onPlateChange(it) },
                onModelChange = { viewModel.onModelChange(it) },
                onSaveClick = { viewModel.updateProfile() },
                onBackClick = { navController.popBackStack() }
            )
        }

        // --- 📊 HISTORY ---
        composable(Destination.History) {
            val viewModel: ReservationHistoryViewModel = viewModel()
            val uiState by viewModel.uiState.collectAsState()
            HistoryScreen(
                uiState = uiState,
                onBackClick = { navController.popBackStack() },
                onFilterChange = { viewModel.setFilter(it) },
                onSearchChange = { viewModel.setSearchQuery(it) },
                onNavigate = { route ->
                    when(route) {
                        "home" -> navController.navigate(Destination.Home)
                        "profile" -> navController.navigate(Destination.Profile)
                        "logout" -> viewModel.onLogoutClick()
                    }
                },
                onReserveNowClick = { navController.navigate(Destination.Home) },
                onReservationClick = { navController.navigate(Destination.ticket(it.id)) },
                onChatClick = { r ->
                    navController.navigate(Destination.chat(
                        resId = r.id,
                        recId = if (uiState.role == "usuario") r.driverId else r.userId,
                        recName = if (uiState.role == "usuario") r.driverName else r.passengerName,
                        sendName = if (uiState.role == "usuario") r.passengerName else r.driverName,
                        time = r.departureTime
                    ))
                },
                onRateClick = { viewModel.onShowRatingDialog(it) },
                onRatingConfirm = { stars, comment -> viewModel.submitRating(stars, comment) },
                onRatingDismiss = { viewModel.onShowRatingDialog(null) },
                onLogoutConfirm = {
                    viewModel.logout()
                    navController.navigate(Destination.Login) { popUpTo(0) }
                },
                onLogoutDismiss = { viewModel.dismissLogoutDialog() },
                onTutorialDismiss = { viewModel.onTutorialDismiss() }
            )
        }

        // --- 🚌 RESERVATIONS ---
        composable(
            route = Destination.CreateReservation,
            arguments = listOf(
                navArgument("scheduleId") { type = NavType.StringType },
                navArgument("routeName") { type = NavType.StringType },
                navArgument("scheduleTime") { type = NavType.StringType },
                navArgument("price") { type = NavType.StringType }
            )
        ) { backStackEntry ->
            val sId = backStackEntry.arguments?.getString("scheduleId") ?: ""
            val rName = backStackEntry.arguments?.getString("routeName") ?: ""
            val sTime = backStackEntry.arguments?.getString("scheduleTime") ?: ""
            val price = backStackEntry.arguments?.getString("price")?.toDoubleOrNull() ?: 12000.0

            val viewModel: CreateReservationViewModel = viewModel()
            val uiState by viewModel.uiState.collectAsState()
            
            LaunchedEffect(sId) { viewModel.init(rName, sId, sTime, price) }

            CreateReservationScreen(
                uiState = uiState,
                onSeatClick = { viewModel.onSeatSelected(it) },
                onConfirmClick = {
                    // navController.navigate(Destination.ConfirmReservation) 
                },
                onBackClick = { navController.popBackStack() },
                onTutorialDismiss = { viewModel.onTutorialDismiss() }
            )
        }

        composable(Destination.ConfirmReservation) {
            val viewModel: ConfirmReservationViewModel = viewModel()
            val uiState by viewModel.uiState.collectAsState()
            
            ConfirmReservationScreen(
                uiState = uiState,
                onPaymentMethodChange = { viewModel.setPaymentMethod(it) },
                onConfirmClick = { viewModel.confirmReservation() },
                onBackClick = { navController.popBackStack() },
                onTutorialDismiss = { viewModel.onTutorialDismiss() },
                onSuccessDismiss = {
                    navController.navigate(Destination.Home) { popUpTo(Destination.Home) { inclusive = true } }
                }
            )
        }

        // --- 🎟️ TICKET & CHAT ---
        composable(
            route = Destination.Ticket,
            arguments = listOf(navArgument("reservationId") { type = NavType.StringType })
        ) { backStackEntry ->
            val resId = backStackEntry.arguments?.getString("reservationId") ?: ""
            val viewModel: TicketViewModel = viewModel()
            val uiState by viewModel.uiState.collectAsState()
            
            LaunchedEffect(resId) { viewModel.loadTicket(resId) }

            TicketScreen(
                uiState = uiState,
                onBackClick = { navController.popBackStack() },
                onShareClick = { onShareTicket(resId) },
                onChatClick = {
                    uiState.reservation?.let { r ->
                        navController.navigate(Destination.chat(r.id, r.driverId, r.driverName, r.passengerName, r.departureTime))
                    }
                }
            )
        }

        composable(
            route = Destination.Chat,
            arguments = listOf(
                navArgument("reservationId") { type = NavType.StringType },
                navArgument("receiverId") { type = NavType.StringType },
                navArgument("receiverName") { type = NavType.StringType },
                navArgument("senderName") { type = NavType.StringType },
                navArgument("scheduleTime") { type = NavType.StringType }
            )
        ) { backStackEntry ->
            val resId = backStackEntry.arguments?.getString("reservationId") ?: ""
            val recId = backStackEntry.arguments?.getString("receiverId") ?: ""
            val recName = backStackEntry.arguments?.getString("receiverName") ?: ""
            val time = backStackEntry.arguments?.getString("scheduleTime") ?: ""

            val viewModel: ChatViewModel = viewModel()
            val uiState by viewModel.uiState.collectAsState()
            
            LaunchedEffect(resId) { viewModel.initChat(resId, recId, recName, time) }

            ChatScreen(
                uiState = uiState,
                onBackClick = { navController.popBackStack() },
                onSendMessage = { viewModel.sendMessage(it) }
            )
        }

        // --- 👨‍✈️ DRIVER SPECIALIZED ---
        composable(
            route = Destination.ManageSeats,
            arguments = listOf(
                navArgument("scheduleId") { type = NavType.StringType },
                navArgument("routeName") { type = NavType.StringType },
                navArgument("scheduleTime") { type = NavType.StringType }
            )
        ) { backStackEntry ->
            val sId = backStackEntry.arguments?.getString("scheduleId") ?: ""
            val rName = backStackEntry.arguments?.getString("routeName") ?: ""
            val sTime = backStackEntry.arguments?.getString("scheduleTime") ?: ""

            val viewModel: ManageSeatsViewModel = viewModel()
            val uiState by viewModel.uiState.collectAsState()
            
            LaunchedEffect(sId) { viewModel.init(sId, rName, sTime, 12000.0) }

            ManageSeatsScreen(
                uiState = uiState,
                onSeatClick = { viewModel.onSeatClick(it) },
                onConfirmBlock = { viewModel.confirmBlock() },
                onConfirmFree = { viewModel.confirmFree() },
                onDismissDialogs = { viewModel.dismissDialogs() },
                onTutorialDismiss = { viewModel.onTutorialDismiss() },
                onBackClick = { navController.popBackStack() }
            )
        }
    }
}

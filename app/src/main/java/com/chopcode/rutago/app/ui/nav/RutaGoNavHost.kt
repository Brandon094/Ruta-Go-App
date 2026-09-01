package com.chopcode.rutago.app.ui.nav

import android.app.Activity
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavHostController
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.navArgument
import com.chopcode.rutago.app.services.auth.GoogleLoginService
import com.chopcode.rutago.app.ui.screens.auth.*
import com.chopcode.rutago.app.ui.screens.common.*
import com.chopcode.rutago.app.ui.screens.driver.*
import com.chopcode.rutago.app.ui.screens.passenger.*
import com.chopcode.rutago.app.ui.viewmodels.auth.*
import com.chopcode.rutago.app.ui.viewmodels.common.*
import com.chopcode.rutago.app.ui.viewmodels.driver.*
import com.chopcode.rutago.app.ui.viewmodels.history.ReservationHistoryViewModel
import com.chopcode.rutago.app.ui.viewmodels.home.HomeViewModel
import com.chopcode.rutago.app.ui.viewmodels.passenger.*
import com.chopcode.rutago.app.ui.viewmodels.profile.EditProfileViewModel
import com.chopcode.rutago.app.ui.viewmodels.profile.UserProfileViewModel

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
            val context = LocalContext.current
            
            val googleLoginService = remember(context) { GoogleLoginService(context) }
            
            // Launcher 1: Google One Tap
            val oneTapLauncher = rememberLauncherForActivityResult(
                contract = ActivityResultContracts.StartIntentSenderForResult()
            ) { result ->
                if (result.resultCode == Activity.RESULT_OK) {
                    val token = googleLoginService.getGoogleIdTokenFromOneTapIntent(
                        data = result.data,
                        onError = { viewModel.onGoogleSignInError(it) }
                    )
                    if (token != null) {
                        viewModel.loginWithGoogle(token)
                    }
                } else {
                    viewModel.onGoogleSignInCanceled()
                }
            }

            // Launcher 2: Standard Google Sign-In Fallback
            val standardGoogleLauncher = rememberLauncherForActivityResult(
                contract = ActivityResultContracts.StartActivityForResult()
            ) { result ->
                if (result.resultCode == Activity.RESULT_OK) {
                    val token = googleLoginService.getGoogleIdTokenFromStandardIntent(
                        data = result.data,
                        onError = { viewModel.onGoogleSignInError(it) }
                    )
                    if (token != null) {
                        viewModel.loginWithGoogle(token)
                    }
                } else {
                    viewModel.onGoogleSignInCanceled()
                }
            }

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
                onGoogleLoginClick = {
                    viewModel.onGoogleSignInStarted()
                    googleLoginService.startSignIn(
                        onLaunchIntentSender = { intentSenderRequest ->
                            oneTapLauncher.launch(intentSenderRequest)
                        },
                        onLaunchStandardSignIn = { intent ->
                            standardGoogleLauncher.launch(intent)
                        },
                        onError = { error ->
                            viewModel.onGoogleSignInError(error)
                        }
                    )
                },
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
                    uiState.selectedSeat?.let { seat ->
                        val routeParts = uiState.selectedRoute.split(
                            if (uiState.selectedRoute.contains(" → ")) " → " else " -> "
                        )
                        val origin = if (routeParts.isNotEmpty()) routeParts[0].trim() else ""
                        val dest = if (routeParts.size > 1) routeParts[1].trim() else ""
                        navController.navigate(
                            Destination.confirmReservation(
                                scheduleId = uiState.scheduleId,
                                origin = origin,
                                destination = dest,
                                scheduleTime = uiState.scheduleTime,
                                travelDate = uiState.travelDate,
                                selectedSeat = seat,
                                price = uiState.price,
                                driverId = uiState.driver?.id ?: "",
                                driverName = uiState.driver?.nombre ?: "",
                                vehiclePlate = uiState.vehicle?.plate ?: "",
                                vehicleModel = uiState.vehicle?.model ?: ""
                            )
                        )
                    }
                },
                onBackClick = { navController.popBackStack() },
                onTutorialDismiss = { viewModel.onTutorialDismiss() }
            )
        }

        composable(
            route = Destination.ConfirmReservation,
            arguments = listOf(
                navArgument("scheduleId") { type = NavType.StringType },
                navArgument("origin") { type = NavType.StringType },
                navArgument("destination") { type = NavType.StringType },
                navArgument("scheduleTime") { type = NavType.StringType },
                navArgument("travelDate") { type = NavType.StringType },
                navArgument("selectedSeat") { type = NavType.IntType },
                navArgument("price") { type = NavType.StringType },
                navArgument("driverId") { type = NavType.StringType },
                navArgument("driverName") { type = NavType.StringType },
                navArgument("vehiclePlate") { type = NavType.StringType },
                navArgument("vehicleModel") { type = NavType.StringType }
            )
        ) { backStackEntry ->
            val sId = backStackEntry.arguments?.getString("scheduleId") ?: ""
            val origin = backStackEntry.arguments?.getString("origin") ?: ""
            val destination = backStackEntry.arguments?.getString("destination") ?: ""
            val sTime = backStackEntry.arguments?.getString("scheduleTime") ?: ""
            val tDate = backStackEntry.arguments?.getString("travelDate") ?: ""
            val seat = backStackEntry.arguments?.getInt("selectedSeat") ?: 0
            val price = backStackEntry.arguments?.getString("price")?.toDoubleOrNull() ?: 12000.0
            val dId = backStackEntry.arguments?.getString("driverId") ?: ""
            val dName = backStackEntry.arguments?.getString("driverName") ?: ""
            val vPlate = backStackEntry.arguments?.getString("vehiclePlate") ?: ""
            val vModel = backStackEntry.arguments?.getString("vehicleModel") ?: ""

            val viewModel: ConfirmReservationViewModel = viewModel()
            val uiState by viewModel.uiState.collectAsState()

            LaunchedEffect(sId, seat) {
                viewModel.initData(
                    origin = origin,
                    destination = destination,
                    scheduleId = sId,
                    scheduleTime = sTime,
                    travelDate = tDate,
                    selectedSeat = seat,
                    price = price,
                    driverName = dName,
                    driverId = dId,
                    driverPhone = "",
                    vehiclePlate = vPlate,
                    vehicleModel = vModel,
                    estimatedTime = "60 min"
                )
            }

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

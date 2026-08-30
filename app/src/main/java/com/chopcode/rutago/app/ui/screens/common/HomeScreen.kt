package com.chopcode.rutago.app.ui.screens.common

import androidx.compose.foundation.ExperimentalFoundationApi
import androidx.compose.foundation.background
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.NotificationsActive
import androidx.compose.material.icons.filled.Schedule
import androidx.compose.material3.*
import androidx.compose.material3.TabRowDefaults.tabIndicatorOffset
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.chopcode.rutago.app.R
import com.chopcode.rutago.app.models.Reservation
import com.chopcode.rutago.app.models.Schedule
import com.chopcode.rutago.app.ui.components.molecules.*
import com.chopcode.rutago.app.ui.components.organisms.DriverStatsSection
import com.chopcode.rutago.app.ui.components.organisms.StatsCard
import com.chopcode.rutago.app.ui.theme.RutaGoTheme
import com.chopcode.rutago.app.ui.viewmodels.home.HomeUiState
import com.chopcode.rutago.app.utils.ui.FormatUtils

/**
 * 📱 SCREEN: HomeScreen (Unified)
 * Dashboard dinámico que adapta su contenido según el rol del usuario (Pasajero/Conductor).
 */
@OptIn(ExperimentalMaterial3Api::class, ExperimentalFoundationApi::class)
@Composable
fun HomeScreen(
    uiState: HomeUiState,
    onExpandLegend: () -> Unit,
    onTabSelected: (Int) -> Unit,
    onNavigate: (String) -> Unit,
    onLogoutConfirm: () -> Unit,
    onLogoutDismiss: () -> Unit,
    onTutorialDismiss: () -> Unit,
    onReserveClick: (Schedule) -> Unit,
    onConfirmReservation: (Reservation) -> Unit,
    onCancelReservation: (Reservation) -> Unit,
    onManageSeatsClick: (Schedule) -> Unit
) {
    if (uiState.showTutorial) {
        TutorialDialog(
            title = if (uiState.role == "usuario") stringResource(R.string.tut_home_title) else stringResource(R.string.tut_dr_home_title),
            message = if (uiState.role == "usuario") stringResource(R.string.tut_home_msg) else stringResource(R.string.tut_dr_home_msg),
            iconRes = if (uiState.role == "usuario") R.drawable.ic_bolt else R.drawable.ic_checklist,
            onUnderstandClick = onTutorialDismiss
        )
    }

    if (uiState.showLogoutDialog) {
        LogoutDialog(
            onConfirm = onLogoutConfirm,
            onDismiss = onLogoutDismiss
        )
    }

    val listState = rememberLazyListState()
    val schedules = if (uiState.selectedTab == 0) uiState.natagaSchedules else uiState.laPlataSchedules
    
    // Auto-scroll para Pasajero
    if (uiState.role == "usuario") {
        val isInitialComposition = androidx.compose.runtime.remember { androidx.compose.runtime.mutableStateOf(true) }
        LaunchedEffect(uiState.selectedTab) {
            if (isInitialComposition.value) {
                isInitialComposition.value = false
                return@LaunchedEffect
            }
            if (uiState.nextScheduleId != null && !uiState.isSchedulesLoading) {
                val index = schedules.indexOfFirst { it.id == uiState.nextScheduleId }
                if (index != -1) {
                    kotlinx.coroutines.delay(50)
                    if (index == 0) listState.animateScrollToItem(1)
                    else listState.animateScrollToItem(index + 2, scrollOffset = -180)
                }
            }
        }
    }

    Scaffold(
        topBar = {
            CenterAlignedTopAppBar(
                title = {
                    Icon(
                        painter = painterResource(id = R.drawable.logo_icon),
                        contentDescription = null,
                        tint = Color.Unspecified,
                        modifier = Modifier.size(32.dp)
                    )
                },
                colors = TopAppBarDefaults.centerAlignedTopAppBarColors(
                    containerColor = MaterialTheme.colorScheme.background
                )
            )
        },
        bottomBar = {
            RutaGoBottomBar(
                currentRoute = uiState.currentRoute,
                onNavigate = onNavigate
            )
        },
        containerColor = MaterialTheme.colorScheme.background
    ) { paddingValues ->
        LazyColumn(
            state = listState,
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues),
            contentPadding = PaddingValues(bottom = 24.dp)
        ) {
            // 1. Cabecera Común
            item {
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .background(if (isSystemInDarkTheme()) Color(0xFF0D1117) else MaterialTheme.colorScheme.surface)
                        .padding(horizontal = 24.dp, vertical = 24.dp)
                ) {
                    WelcomeHeader(
                        userName = uiState.user?.nombre ?: "Usuario",
                        avatarUrl = uiState.user?.photoUrl,
                        status = if (uiState.role == "usuario") "Pasajero Activo" else "Conductor Activo"
                    )
                    
                    Spacer(modifier = Modifier.height(24.dp))
                    
                    // --- BRANCHING DE ESTADÍSTICAS ---
                    if (uiState.role == "usuario") {
                        StatsCard(
                            confirmed = uiState.passengerStats.confirmedTrips,
                            cancelled = uiState.passengerStats.cancelledTrips,
                            total = uiState.passengerStats.totalTrips,
                            isExpanded = uiState.passengerStats.isLegendExpanded,
                            onExpandClick = onExpandLegend
                        )
                    } else {
                        DriverStatsSection(stats = uiState.driverStats)
                    }
                }
            }

            // 2. Módulo Conductor: Desglose de Rutas
            if (uiState.role != "usuario" && uiState.driverStats.routeBreakdown.isNotEmpty()) {
                item {
                    Column(modifier = Modifier.padding(top = 24.dp)) {
                        Text(
                            text = "DESGLOSE POR RUTA",
                            fontSize = 11.sp,
                            fontWeight = FontWeight.Bold,
                            color = MaterialTheme.colorScheme.onBackground.copy(alpha = 0.5f),
                            modifier = Modifier.padding(start = 24.dp, end = 24.dp, bottom = 12.dp),
                            letterSpacing = 1.sp
                        )
                        LazyRow(
                            contentPadding = PaddingValues(horizontal = 20.dp),
                            horizontalArrangement = Arrangement.spacedBy(12.dp)
                        ) {
                            items(uiState.driverStats.routeBreakdown) { stat ->
                                RouteStatCard(stat = stat)
                            }
                        }
                    }
                }
            }

            // 3. Módulo Conductor: Reservas Pendientes
            if (uiState.role != "usuario") {
                item {
                    SectionHeader(
                        title = "SOLICITUDES PENDIENTES",
                        icon = Icons.Default.NotificationsActive,
                        count = uiState.pendingReservations.size
                    )
                }

                if (uiState.pendingReservations.isEmpty()) {
                    item {
                        EmptyStatePlaceholder(
                            message = "No tienes solicitudes pendientes por ahora.",
                            icon = R.drawable.ic_checklist
                        )
                    }
                } else {
                    items(uiState.pendingReservations) { reservation ->
                        PendingReservationItem(
                            reservation = reservation,
                            onConfirm = { onConfirmReservation(reservation) },
                            onCancel = { onCancelReservation(reservation) },
                            modifier = Modifier.padding(horizontal = 16.dp, vertical = 6.dp)
                        )
                    }
                }
            }

            // 4. Módulo Pasajero: Lista de Horarios
            if (uiState.role == "usuario") {
                stickyHeader {
                    SchedulesTabHeader(
                        selectedTab = uiState.selectedTab,
                        onTabSelected = onTabSelected
                    )
                }

                val allSchedulesPast = schedules.isNotEmpty() && schedules.all { FormatUtils.esHorarioPasado(it.time) }

                if (uiState.isSchedulesLoading) {
                    item { LoadingPlaceholder() }
                } else if (schedules.isEmpty() || allSchedulesPast) {
                    item {
                        Column(modifier = Modifier.padding(16.dp)) {
                            JornadaCompletadaCard()
                        }
                    }
                } else {
                    items(schedules, key = { it.id ?: "" }) { schedule ->
                        val isPast = FormatUtils.esHorarioPasado(schedule.time)
                        val isNext = schedule.id == uiState.nextScheduleId
                        
                        ScheduleItem(
                            schedule = schedule,
                            isHighlighted = isNext,
                            isDisabled = isPast && !isNext,
                            onReserveClick = onReserveClick,
                            modifier = Modifier.padding(horizontal = 16.dp, vertical = 6.dp)
                        )
                    }
                }
            }

            // 5. Módulo Conductor: Itinerario (Próximas Rutas)
            if (uiState.role != "usuario") {
                item {
                    SectionHeader(
                        title = "MI ITINERARIO",
                        icon = Icons.Default.Schedule,
                        count = uiState.assignedSchedules.size
                    )
                }

                if (uiState.assignedSchedules.isEmpty()) {
                    item {
                        EmptyStatePlaceholder(
                            message = "No tienes rutas asignadas para hoy.",
                            icon = R.drawable.ic_time
                        )
                    }
                } else {
                    items(uiState.assignedSchedules) { schedule ->
                        ScheduleItem(
                            schedule = schedule,
                            onReserveClick = onManageSeatsClick, // El chofer gestiona, no reserva
                            modifier = Modifier.padding(horizontal = 16.dp, vertical = 6.dp)
                        )
                    }
                }
            }
        }
    }
}

@Composable
private fun SectionHeader(title: String, icon: androidx.compose.ui.graphics.vector.ImageVector, count: Int) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(start = 24.dp, end = 24.dp, top = 32.dp, bottom = 12.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Icon(icon, contentDescription = null, tint = MaterialTheme.colorScheme.primary, modifier = Modifier.size(18.dp))
        Spacer(modifier = Modifier.width(8.dp))
        Text(
            text = title,
            fontSize = 12.sp,
            fontWeight = FontWeight.Black,
            color = MaterialTheme.colorScheme.onBackground,
            modifier = Modifier.weight(1f),
            letterSpacing = 1.sp
        )
        if (count > 0) {
            Surface(
                color = MaterialTheme.colorScheme.primary,
                shape = CircleShape
            ) {
                Text(
                    text = count.toString(),
                    color = Color.White,
                    fontSize = 10.sp,
                    fontWeight = FontWeight.Bold,
                    modifier = Modifier.padding(horizontal = 8.dp, vertical = 2.dp)
                )
            }
        }
    }
}

@Composable
private fun LoadingPlaceholder() {
    Box(modifier = Modifier.fillMaxWidth().height(200.dp), contentAlignment = Alignment.Center) {
        CircularProgressIndicator(color = MaterialTheme.colorScheme.primary)
    }
}

@Composable
private fun EmptyStatePlaceholder(message: String, icon: Int) {
    Column(
        modifier = Modifier.fillMaxWidth().padding(40.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Icon(painterResource(icon), contentDescription = null, modifier = Modifier.size(48.dp), tint = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.1f))
        Spacer(modifier = Modifier.height(12.dp))
        Text(text = message, fontSize = 13.sp, color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.4f), textAlign = androidx.compose.ui.text.style.TextAlign.Center)
    }
}

@Composable
private fun SchedulesTabHeader(selectedTab: Int, onTabSelected: (Int) -> Unit) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .background(MaterialTheme.colorScheme.background)
            .padding(horizontal = 16.dp, vertical = 12.dp)
    ) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            Icon(imageVector = Icons.Default.Schedule, contentDescription = null, tint = MaterialTheme.colorScheme.primary, modifier = Modifier.size(24.dp))
            Text(text = stringResource(R.string.horarios_disponibles), color = MaterialTheme.colorScheme.onBackground, fontSize = 16.sp, fontWeight = FontWeight.Bold, modifier = Modifier.padding(horizontal = 10.dp))
        }
        Spacer(modifier = Modifier.height(12.dp))
        TabRow(
            selectedTabIndex = selectedTab,
            containerColor = Color.Transparent,
            contentColor = MaterialTheme.colorScheme.primary,
            divider = {},
            indicator = { tabPositions ->
                TabRowDefaults.Indicator(Modifier.tabIndicatorOffset(tabPositions[selectedTab]), color = MaterialTheme.colorScheme.primary)
            }
        ) {
            Tab(selected = selectedTab == 0, onClick = { onTabSelected(0) }, text = { Text("NATAGÁ → LA PLATA", fontSize = 11.sp, fontWeight = if(selectedTab == 0) FontWeight.Bold else FontWeight.Normal) })
            Tab(selected = selectedTab == 1, onClick = { onTabSelected(1) }, text = { Text("LA PLATA → NATAGÁ", fontSize = 11.sp, fontWeight = if(selectedTab == 1) FontWeight.Bold else FontWeight.Normal) })
        }
    }
}

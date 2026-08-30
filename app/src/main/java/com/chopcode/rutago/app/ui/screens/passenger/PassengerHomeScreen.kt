package com.chopcode.rutago.app.ui.screens.passenger

import androidx.compose.foundation.ExperimentalFoundationApi
import androidx.compose.foundation.background
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.material.icons.Icons
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
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.chopcode.rutago.app.R
import com.chopcode.rutago.app.ui.components.molecules.JornadaCompletadaCard
import com.chopcode.rutago.app.ui.components.molecules.LogoutDialog
import com.chopcode.rutago.app.ui.components.molecules.RutaGoBottomBar
import com.chopcode.rutago.app.ui.components.molecules.TutorialDialog
import com.chopcode.rutago.app.ui.components.molecules.WelcomeHeader
import com.chopcode.rutago.app.ui.components.molecules.ScheduleItem
import com.chopcode.rutago.app.ui.components.organisms.StatsCard
import com.chopcode.rutago.app.ui.theme.RutaGoTheme
import com.chopcode.rutago.app.ui.viewmodels.passenger.PassengerHomeUiState
import com.chopcode.rutago.app.utils.ui.FormatUtils

/**
 * 📱 SCREEN: PassengerHomeScreen
 * Dashboard principal del pasajero en Jetpack Compose con feedback inteligente.
 */
@OptIn(ExperimentalMaterial3Api::class, ExperimentalFoundationApi::class)
@Composable
fun PassengerHomeScreen(
    uiState: PassengerHomeUiState,
    onExpandLegend: () -> Unit,
    onTabSelected: (Int) -> Unit,
    onNavigate: (String) -> Unit,
    onLogoutConfirm: () -> Unit,
    onLogoutDismiss: () -> Unit,
    onTutorialDismiss: () -> Unit,
    onReserveClick: (com.chopcode.rutago.app.models.Schedule) -> Unit
) {
    if (uiState.showTutorial) {
        TutorialDialog(
            title = stringResource(R.string.tut_home_title),
            message = stringResource(R.string.tut_home_msg),
            iconRes = R.drawable.ic_bolt,
            onUnderstandClick = onTutorialDismiss
        )
    }

    val listState = rememberLazyListState()
    val schedules = if (uiState.selectedTab == 0) uiState.natagaSchedules else uiState.laPlataSchedules
    
    // Bandera para evitar el scroll en el primer renderizado y priorizar el Header
    val isInitialComposition = androidx.compose.runtime.remember { androidx.compose.runtime.mutableStateOf(true) }

    // Efecto de Scroll Inteligente: SOLO se activa al cambiar de Tab manualmente
    LaunchedEffect(uiState.selectedTab) {
        if (isInitialComposition.value) {
            isInitialComposition.value = false
            return@LaunchedEffect
        }

        if (uiState.nextScheduleId != null && !uiState.isSchedulesLoading) {
            val index = schedules.indexOfFirst { it.id == uiState.nextScheduleId }
            if (index != -1) {
                kotlinx.coroutines.delay(50)
                // Animación suave al cambiar de ruta, respetando el sticky header
                if (index == 0) {
                    listState.animateScrollToItem(1)
                } else {
                    listState.animateScrollToItem(index + 2, scrollOffset = -180)
                }
            } else {
                // Si no hay próximo (todos pasados), vamos al inicio de la lista
                listState.animateScrollToItem(1)
            }
        }
    }

    if (uiState.showLogoutDialog) {
        LogoutDialog(
            onConfirm = onLogoutConfirm,
            onDismiss = onLogoutDismiss
        )
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
        val allSchedulesPast = schedules.isNotEmpty() && schedules.all { FormatUtils.esHorarioPasado(it.time) }

        LazyColumn(
            state = listState,
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues),
            contentPadding = PaddingValues(bottom = 24.dp)
        ) {
            // 1. Header & Stats
            item {
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .background(if (isSystemInDarkTheme()) Color(0xFF0D1117) else MaterialTheme.colorScheme.surface)
                        .padding(horizontal = 24.dp, vertical = 24.dp)
                ) {
                    WelcomeHeader(
                        userName = uiState.userName,
                        avatarUrl = uiState.userAvatarUrl,
                        status = uiState.userStatus
                    )
                    
                    Spacer(modifier = Modifier.height(24.dp))
                    
                    StatsCard(
                        confirmed = uiState.confirmedTrips,
                        cancelled = uiState.cancelledTrips,
                        total = uiState.totalTrips,
                        isExpanded = uiState.isLegendExpanded,
                        onExpandClick = onExpandLegend
                    )
                }
            }

            // 2. Sticky Header: Title & Tabs
            stickyHeader {
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .background(MaterialTheme.colorScheme.background)
                        .padding(horizontal = 16.dp, vertical = 12.dp)
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(
                            imageVector = Icons.Default.Schedule,
                            contentDescription = null,
                            tint = MaterialTheme.colorScheme.primary,
                            modifier = Modifier.size(24.dp)
                        )
                        Text(
                            text = stringResource(R.string.horarios_disponibles),
                            color = MaterialTheme.colorScheme.onBackground,
                            fontSize = 16.sp,
                            fontWeight = FontWeight.Bold,
                            modifier = Modifier.padding(horizontal = 10.dp)
                        )
                    }
                    
                    Spacer(modifier = Modifier.height(12.dp))
                    
                    TabRow(
                        selectedTabIndex = uiState.selectedTab,
                        containerColor = Color.Transparent,
                        contentColor = MaterialTheme.colorScheme.primary,
                        divider = {},
                        indicator = { tabPositions ->
                            if (uiState.selectedTab < tabPositions.size) {
                                TabRowDefaults.Indicator(
                                    Modifier.tabIndicatorOffset(tabPositions[uiState.selectedTab]),
                                    color = MaterialTheme.colorScheme.primary
                                )
                            }
                        }
                    ) {
                        Tab(
                            selected = uiState.selectedTab == 0,
                            onClick = { onTabSelected(0) },
                            text = { Text("NATAGÁ → LA PLATA", fontSize = 12.sp, fontWeight = if(uiState.selectedTab == 0) FontWeight.Bold else FontWeight.Normal) }
                        )
                        Tab(
                            selected = uiState.selectedTab == 1,
                            onClick = { onTabSelected(1) },
                            text = { Text("LA PLATA → NATAGÁ", fontSize = 12.sp, fontWeight = if(uiState.selectedTab == 1) FontWeight.Bold else FontWeight.Normal) }
                        )
                    }
                }
            }

            // 3. Schedules List or Empty State
            if (uiState.isSchedulesLoading) {
                item {
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(200.dp),
                        contentAlignment = Alignment.Center
                    ) {
                        CircularProgressIndicator(color = MaterialTheme.colorScheme.primary)
                    }
                }
            } else if (schedules.isEmpty() || allSchedulesPast) {
                item {
                    Column(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(16.dp)
                    ) {
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
    }
}

@Preview(showBackground = true, name = "Light Mode")
@Composable
fun PassengerHomeScreenLightPreview() {
    val dummySchedules = listOf(
        com.chopcode.rutago.app.models.Schedule().apply {
            id = "1"
            route = "Natagá -> La Plata"
            time = "06:00 AM"
            price = "$12.000"
            availableSeats = 13
            setDriverName("ONIAS PEREZ")
        }
    )
    
    RutaGoTheme(darkTheme = false) {
        PassengerHomeScreen(
            uiState = PassengerHomeUiState(
                userName = "Brandon Light",
                confirmedTrips = 12,
                cancelledTrips = 2,
                totalTrips = 14,
                isLoading = false,
                isSchedulesLoading = false,
                natagaSchedules = dummySchedules
            ),
            onExpandLegend = {},
            onTabSelected = {},
            onNavigate = {},
            onLogoutConfirm = {},
            onLogoutDismiss = {},
            onTutorialDismiss = {},
            onReserveClick = {}
        )
    }
}

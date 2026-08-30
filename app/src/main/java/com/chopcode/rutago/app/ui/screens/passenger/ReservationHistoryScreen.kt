package com.chopcode.rutago.app.ui.screens.passenger

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.History
import androidx.compose.material.icons.filled.Search
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.chopcode.rutago.app.R
import com.chopcode.rutago.app.ui.components.molecules.LogoutDialog
import com.chopcode.rutago.app.ui.components.molecules.RatingDialog
import com.chopcode.rutago.app.ui.components.molecules.RutaGoBottomBar
import com.chopcode.rutago.app.ui.components.molecules.TutorialDialog
import com.chopcode.rutago.app.ui.components.molecules.ReservationItem
import com.chopcode.rutago.app.ui.components.molecules.StatItem
import com.chopcode.rutago.app.ui.theme.RutaGoTheme
import com.chopcode.rutago.app.ui.theme.SuccessGreen
import com.chopcode.rutago.app.ui.viewmodels.passenger.HistoryFilter
import com.chopcode.rutago.app.ui.viewmodels.passenger.ReservationHistoryUiState

/**
 * 📱 SCREEN: ReservationHistoryScreen
 * Historial de viajes del pasajero con filtros y búsqueda.
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ReservationHistoryScreen(
    uiState: ReservationHistoryUiState,
    onBackClick: () -> Unit,
    onFilterChange: (HistoryFilter) -> Unit,
    onSearchChange: (String) -> Unit,
    onNavigate: (String) -> Unit,
    onReserveNowClick: () -> Unit,
    onReservationClick: (com.chopcode.rutago.app.models.Reservation) -> Unit,
    onChatClick: (com.chopcode.rutago.app.models.Reservation) -> Unit,
    onRateClick: (com.chopcode.rutago.app.models.Reservation) -> Unit,
    onRatingConfirm: (Float, String) -> Unit,
    onRatingDismiss: () -> Unit,
    onLogoutConfirm: () -> Unit,
    onLogoutDismiss: () -> Unit,
    onTutorialDismiss: () -> Unit,
    modifier: Modifier = Modifier
) {
    if (uiState.showTutorial) {
        TutorialDialog(
            title = stringResource(R.string.tut_history_title),
            message = stringResource(R.string.tut_history_msg),
            iconRes = R.drawable.ic_history,
            onUnderstandClick = onTutorialDismiss
        )
    }

    if (uiState.showLogoutDialog) {
        LogoutDialog(
            onConfirm = onLogoutConfirm,
            onDismiss = onLogoutDismiss
        )
    }

    if (uiState.ratingReservation != null) {
        RatingDialog(
            driverName = uiState.ratingReservation.driver ?: "el conductor",
            onConfirm = onRatingConfirm,
            onDismiss = onRatingDismiss
        )
    }

    Scaffold(
        modifier = modifier,
        topBar = {
            TopAppBar(
                title = { Text("Historial de Viajes") },
                navigationIcon = {
                    IconButton(onClick = onBackClick) {
                        Icon(imageVector = Icons.Default.ArrowBack, contentDescription = "Back")
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MaterialTheme.colorScheme.primary,
                    titleContentColor = Color.White,
                    navigationIconContentColor = Color.White
                )
            )
        },
        bottomBar = {
            RutaGoBottomBar(
                currentRoute = "history",
                onNavigate = onNavigate
            )
        },
        containerColor = MaterialTheme.colorScheme.background
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
        ) {
            // 1. Filtros Rápidos (Chips)
            FilterSection(
                currentFilter = uiState.currentFilter,
                onFilterChange = onFilterChange
            )

            // 2. Búsqueda
            OutlinedTextField(
                value = uiState.searchQuery,
                onValueChange = onSearchChange,
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp, vertical = 8.dp),
                placeholder = { Text("Buscar por conductor o ruta...") },
                leadingIcon = { Icon(Icons.Default.Search, contentDescription = null) },
                shape = RoundedCornerShape(12.dp),
                colors = OutlinedTextFieldDefaults.colors(
                    focusedBorderColor = MaterialTheme.colorScheme.primary,
                    unfocusedBorderColor = MaterialTheme.colorScheme.outline.copy(alpha = 0.3f)
                ),
                singleLine = true
            )

            // 3. Resumen Estadístico
            HistorySummaryCard(
                confirmed = uiState.confirmedCount,
                cancelled = uiState.cancelledCount,
                total = uiState.totalCount
            )

            Text(
                text = "Viajes realizados",
                fontSize = 16.sp,
                fontWeight = FontWeight.Bold,
                color = MaterialTheme.colorScheme.onBackground,
                modifier = Modifier.padding(horizontal = 20.dp, vertical = 12.dp)
            )

            // 4. Lista de Reservas
            if (uiState.isLoading) {
                Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                    CircularProgressIndicator()
                }
            } else if (uiState.reservations.isEmpty()) {
                EmptyHistoryContent(onReserveNowClick)
            } else {
                LazyColumn(
                    modifier = Modifier.fillMaxSize(),
                    contentPadding = PaddingValues(start = 16.dp, end = 16.dp, bottom = 24.dp),
                    verticalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    items(uiState.reservations) { reservation ->
                        ReservationItem(
                            reservation = reservation,
                            modifier = Modifier.clickable { onReservationClick(reservation) },
                            onTicketClick = { onReservationClick(reservation) },
                            onChatClick = { onChatClick(reservation) },
                            onRateClick = { onRateClick(reservation) }
                        )
                    }
                }
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun FilterSection(
    currentFilter: HistoryFilter,
    onFilterChange: (HistoryFilter) -> Unit
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 12.dp, horizontal = 16.dp),
        horizontalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        val filters = listOf(
            HistoryFilter.ALL to "Todos",
            HistoryFilter.CONFIRMED to "Confirmados",
            HistoryFilter.CANCELLED to "Cancelados",
            HistoryFilter.THIS_MONTH to "Este Mes"
        )

        filters.forEach { (filter, label) ->
            FilterChip(
                selected = currentFilter == filter,
                onClick = { onFilterChange(filter) },
                label = { Text(label) },
                colors = FilterChipDefaults.filterChipColors(
                    selectedContainerColor = MaterialTheme.colorScheme.primary,
                    selectedLabelColor = Color.White
                )
            )
        }
    }
}

@Composable
private fun HistorySummaryCard(
    confirmed: Int,
    cancelled: Int,
    total: Int
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp, vertical = 8.dp),
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(12.dp),
            horizontalArrangement = Arrangement.SpaceEvenly
        ) {
            StatColumn(value = confirmed.toString(), label = "Confirmados", color = SuccessGreen)
            StatColumn(value = cancelled.toString(), label = "Cancelados", color = MaterialTheme.colorScheme.error)
            StatColumn(value = total.toString(), label = "Total", color = MaterialTheme.colorScheme.primary)
        }
    }
}

@Composable
private fun StatColumn(value: String, label: String, color: Color) {
    Column(horizontalAlignment = Alignment.CenterHorizontally) {
        Text(text = value, fontSize = 20.sp, fontWeight = FontWeight.Bold, color = color)
        Text(text = label, fontSize = 12.sp, color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.6f))
    }
}

@Composable
private fun EmptyHistoryContent(onReserveNowClick: () -> Unit) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(32.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Surface(
            modifier = Modifier.size(100.dp),
            shape = CircleShape,
            color = MaterialTheme.colorScheme.primary.copy(alpha = 0.1f)
        ) {
            Box(contentAlignment = Alignment.Center) {
                Icon(
                    imageVector = Icons.Default.History,
                    contentDescription = null,
                    tint = MaterialTheme.colorScheme.primary,
                    modifier = Modifier.size(50.dp)
                )
            }
        }
        
        Spacer(modifier = Modifier.height(24.dp))
        
        Text(
            text = "Sin viajes aún",
            fontSize = 18.sp,
            fontWeight = FontWeight.Bold,
            color = MaterialTheme.colorScheme.onBackground
        )
        
        Spacer(modifier = Modifier.height(8.dp))
        
        Text(
            text = "Parece que no tienes viajes registrados. ¡Comienza tu aventura con Ruta-Go!",
            fontSize = 14.sp,
            color = MaterialTheme.colorScheme.onBackground.copy(alpha = 0.6f),
            textAlign = TextAlign.Center
        )
        
        Spacer(modifier = Modifier.height(32.dp))
        
        Button(
            onClick = onReserveNowClick,
            modifier = Modifier.height(52.dp),
            shape = RoundedCornerShape(16.dp)
        ) {
            Text("Reservar ahora")
        }
    }
}

@Preview(showBackground = true)
@Composable
fun ReservationHistoryScreenPreview() {
    val dummyReservations = listOf(
        com.chopcode.rutago.app.models.Reservation().apply {
            origin = "Natagá"
            destination = "La Plata"
            departureTime = "06:00 AM"
            driver = "ONIAS PEREZ"
            price = 12000.0
            reservationStatus = "Confirmada"
            reservationDate = System.currentTimeMillis()
        }
    )

    RutaGoTheme {
        ReservationHistoryScreen(
            uiState = ReservationHistoryUiState(
                isLoading = false,
                reservations = dummyReservations,
                totalCount = 5,
                confirmedCount = 4,
                cancelledCount = 1
            ),
            onBackClick = {},
            onFilterChange = {},
            onSearchChange = {},
            onNavigate = {},
            onReserveNowClick = {},
            onReservationClick = {},
            onChatClick = {},
            onRateClick = {},
            onRatingConfirm = { _, _ -> },
            onRatingDismiss = {},
            onLogoutConfirm = {},
            onLogoutDismiss = {},
            onTutorialDismiss = {}
        )
    }
}

package com.chopcode.rutago.app.ui.screens.common

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.chopcode.rutago.app.R
import com.chopcode.rutago.app.ui.components.molecules.*
import com.chopcode.rutago.app.ui.theme.RutaGoTheme
import com.chopcode.rutago.app.ui.theme.SuccessGreen
import com.chopcode.rutago.app.ui.viewmodels.history.HistoryFilter
import com.chopcode.rutago.app.ui.viewmodels.history.ReservationHistoryUiState

/**
 * 📱 SCREEN: HistoryScreen (Unified)
 * Historial de viajes adaptable por rol (Pasajero/Conductor).
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HistoryScreen(
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
            driverName = uiState.ratingReservation.driverName.ifEmpty { "el conductor" },
            onConfirm = onRatingConfirm,
            onDismiss = onRatingDismiss
        )
    }

    Scaffold(
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
            // 1. Filtros
            FilterSection(
                currentFilter = uiState.currentFilter,
                onFilterChange = onFilterChange
            )

            // 2. Buscador
            OutlinedTextField(
                value = uiState.searchQuery,
                onValueChange = onSearchChange,
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp, vertical = 8.dp),
                placeholder = { Text(if (uiState.role == "usuario") "Buscar por conductor o ruta..." else "Buscar por pasajero o ruta...") },
                leadingIcon = { Icon(Icons.Default.Search, contentDescription = null) },
                shape = RoundedCornerShape(12.dp),
                singleLine = true,
                colors = TextFieldDefaults.outlinedTextFieldColors(
                    focusedBorderColor = MaterialTheme.colorScheme.primary,
                    unfocusedBorderColor = MaterialTheme.colorScheme.outline.copy(alpha = 0.3f)
                )
            )

            // 3. Estadísticas Rápidas
            StatsOverview(uiState)

            Spacer(modifier = Modifier.height(16.dp))
            
            Text(
                text = "Viajes realizados",
                fontSize = 16.sp,
                fontWeight = FontWeight.Bold,
                modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp)
            )

            // 4. Lista de Reservas
            if (uiState.isLoading) {
                Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                    CircularProgressIndicator()
                }
            } else if (uiState.reservations.isEmpty()) {
                EmptyHistoryContent(uiState.role, onReserveNowClick)
            } else {
                LazyColumn(
                    modifier = Modifier.fillMaxSize(),
                    contentPadding = PaddingValues(start = 16.dp, end = 16.dp, bottom = 24.dp),
                    verticalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    items(uiState.reservations) { reservation ->
                        ReservationItem(
                            reservation = reservation,
                            role = uiState.role,
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
private fun StatsOverview(uiState: ReservationHistoryUiState) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp),
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Row(
            modifier = Modifier
                .padding(16.dp)
                .fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceEvenly
        ) {
            StatItem(
                icon = Icons.Default.CheckCircle,
                value = uiState.confirmedCount.toString(),
                label = "Confirmados",
                iconColor = SuccessGreen
            )
            Divider(modifier = Modifier.height(40.dp).width(1.dp), color = MaterialTheme.colorScheme.outline.copy(alpha = 0.1f))
            StatItem(
                icon = Icons.Default.Cancel,
                value = uiState.cancelledCount.toString(),
                label = "Cancelados",
                iconColor = MaterialTheme.colorScheme.error
            )
            Divider(modifier = Modifier.height(40.dp).width(1.dp), color = MaterialTheme.colorScheme.outline.copy(alpha = 0.1f))
            StatItem(
                icon = Icons.Default.History,
                value = uiState.totalCount.toString(),
                label = "Total",
                iconColor = MaterialTheme.colorScheme.primary
            )
        }
    }
}

@Composable
private fun EmptyHistoryContent(role: String, onReserveNowClick: () -> Unit) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(40.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Icon(
            painter = painterResource(R.drawable.ic_history),
            contentDescription = null,
            tint = MaterialTheme.colorScheme.outline.copy(alpha = 0.3f),
            modifier = Modifier.size(80.dp)
        )
        Spacer(modifier = Modifier.height(24.dp))
        Text(
            text = "No hay viajes registrados",
            fontSize = 18.sp,
            fontWeight = FontWeight.Bold,
            color = MaterialTheme.colorScheme.onSurface
        )
        Text(
            text = if (role == "usuario") "Tus reservas confirmadas aparecerán aquí una vez realices tu primer viaje." else "Aquí aparecerá el historial de pasajeros que has transportado.",
            fontSize = 14.sp,
            textAlign = TextAlign.Center,
            color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.6f),
            modifier = Modifier.padding(top = 8.dp, bottom = 32.dp)
        )
        if (role == "usuario") {
            Button(
                onClick = onReserveNowClick,
                shape = RoundedCornerShape(12.dp)
            ) {
                Text("Reservar mi primer viaje")
            }
        }
    }
}

@Preview(showBackground = true)
@Composable
fun HistoryScreenPreview() {
    RutaGoTheme {
        HistoryScreen(
            uiState = ReservationHistoryUiState(
                isLoading = false,
                role = "conductor"
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

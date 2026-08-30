package com.chopcode.rutago.app.ui.screens.driver

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
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
import com.chopcode.rutago.app.ui.components.molecules.SeatItem
import com.chopcode.rutago.app.ui.components.molecules.TutorialDialog
import com.chopcode.rutago.app.ui.components.organisms.SeatGrid
import com.chopcode.rutago.app.ui.theme.RutaGoOrange
import com.chopcode.rutago.app.ui.theme.RutaGoTheme
import com.chopcode.rutago.app.ui.viewmodels.driver.ManageSeatsUiState

/**
 * 📱 SCREEN: ManageSeatsScreen
 * Panel táctico para que el conductor gestione la ocupación física del bus.
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ManageSeatsScreen(
    uiState: ManageSeatsUiState,
    onSeatClick: (Int) -> Unit,
    onConfirmBlock: () -> Unit,
    onConfirmFree: () -> Unit,
    onDismissDialogs: () -> Unit,
    onTutorialDismiss: () -> Unit,
    onBackClick: () -> Unit
) {
    if (uiState.showTutorial) {
        TutorialDialog(
            title = stringResource(R.string.tut_dr_seats_title),
            message = stringResource(R.string.tut_dr_seats_msg),
            iconRes = R.drawable.ic_cash,
            onUnderstandClick = onTutorialDismiss
        )
    }

    // Diálogos de Gestión
    uiState.seatToManage?.let { seat ->
        if (uiState.showBlockConfirmation) {
            AlertDialog(
                onDismissRequest = onDismissDialogs,
                title = { Text("Bloqueo Manual (A$seat)") },
                text = { Text("¿Deseas marcar este asiento como ocupado por venta física?") },
                confirmButton = {
                    Button(onClick = onConfirmBlock) { Text("BLOQUEAR") }
                },
                dismissButton = {
                    TextButton(onClick = onDismissDialogs) { Text("CANCELAR") }
                }
            )
        }
        if (uiState.showFreeConfirmation) {
            AlertDialog(
                onDismissRequest = onDismissDialogs,
                title = { Text("Liberar Asiento (A$seat)") },
                text = { Text("¿Deseas liberar este asiento marcado físicamente?") },
                confirmButton = {
                    Button(onClick = onConfirmFree) { Text("LIBERAR") }
                },
                dismissButton = {
                    TextButton(onClick = onDismissDialogs) { Text("CANCELAR") }
                }
            )
        }
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Gestión de Cupos", fontSize = 18.sp, fontWeight = FontWeight.Bold) },
                navigationIcon = {
                    IconButton(onClick = onBackClick) {
                        Icon(imageVector = Icons.Default.ArrowBack, contentDescription = "Back")
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MaterialTheme.colorScheme.background
                )
            )
        },
        containerColor = MaterialTheme.colorScheme.background
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
                .verticalScroll(rememberScrollState())
                .padding(horizontal = 24.dp)
        ) {
            // 1. Resumen Operativo
            HeaderCard(
                route = uiState.routeName,
                time = uiState.scheduleTime,
                available = uiState.availableCount
            )

            Spacer(modifier = Modifier.height(24.dp))

            // 2. Mapa Interactivo
            SeatGrid(
                capacity = uiState.totalCapacity,
                occupiedSeats = uiState.appOccupiedSeats,
                physicalOccupiedSeats = uiState.physicalOccupiedSeats,
                onSeatClick = onSeatClick
            )

            Spacer(modifier = Modifier.height(24.dp))

            // 3. Leyenda Especializada
            DriverSeatLegend()

            if (uiState.error != null) {
                Text(
                    text = uiState.error,
                    color = MaterialTheme.colorScheme.error,
                    fontSize = 12.sp,
                    textAlign = TextAlign.Center,
                    modifier = Modifier.fillMaxWidth().padding(top = 16.dp)
                )
            }
            
            Spacer(modifier = Modifier.height(40.dp))
        }
    }
}

@Composable
private fun HeaderCard(route: String, time: String, available: Int) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(24.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Column(modifier = Modifier.padding(20.dp)) {
            Text(text = route, fontSize = 16.sp, fontWeight = FontWeight.ExtraBold)
            Text(
                text = "HORARIO: $time",
                fontSize = 12.sp,
                color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.5f),
                fontWeight = FontWeight.Bold
            )
            
            Divider(modifier = Modifier.padding(vertical = 12.dp), color = MaterialTheme.colorScheme.outline.copy(alpha = 0.05f))
            
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(Icons.Default.Group, contentDescription = null, tint = MaterialTheme.colorScheme.primary, modifier = Modifier.size(16.dp))
                Spacer(modifier = Modifier.width(8.dp))
                Text(
                    text = "$available puestos disponibles para la App",
                    fontSize = 13.sp,
                    fontWeight = FontWeight.Medium,
                    color = MaterialTheme.colorScheme.primary
                )
            }
        }
    }
}

@Composable
private fun DriverSeatLegend() {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(20.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.2f))
    ) {
        Row(
            modifier = Modifier.padding(16.dp).fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceEvenly,
            verticalAlignment = Alignment.CenterVertically
        ) {
            LegendItem("App", MaterialTheme.colorScheme.error)
            LegendItem("Física", RutaGoOrange)
            LegendItem("Libre", MaterialTheme.colorScheme.secondary)
        }
    }
}

@Composable
private fun LegendItem(label: String, color: Color) {
    Row(verticalAlignment = Alignment.CenterVertically) {
        Box(modifier = Modifier.size(12.dp).background(color.copy(alpha = 0.6f), RoundedCornerShape(3.dp)).border(1.dp, color, RoundedCornerShape(3.dp)))
        Spacer(modifier = Modifier.width(6.dp))
        Text(text = label, fontSize = 11.sp, fontWeight = FontWeight.Bold, color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.6f))
    }
}

@Preview(showBackground = true)
@Composable
fun ManageSeatsScreenPreview() {
    RutaGoTheme {
        ManageSeatsScreen(
            uiState = ManageSeatsUiState(
                routeName = "Natagá -> La Plata",
                scheduleTime = "08:30 AM",
                availableCount = 5,
                appOccupiedSeats = setOf(1, 2),
                physicalOccupiedSeats = setOf(6, 7)
            ),
            onSeatClick = {},
            onConfirmBlock = {},
            onConfirmFree = {},
            onDismissDialogs = {},
            onTutorialDismiss = {},
            onBackClick = {}
        )
    }
}

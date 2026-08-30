package com.chopcode.rutago.app.ui.screens.passenger

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
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
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.chopcode.rutago.app.R
import com.chopcode.rutago.app.ui.components.atoms.RutaGoButton
import com.chopcode.rutago.app.ui.components.molecules.SeatLegend
import com.chopcode.rutago.app.ui.components.molecules.TutorialDialog
import com.chopcode.rutago.app.ui.components.molecules.TravelInfoCard
import com.chopcode.rutago.app.ui.components.molecules.VehicleInfoCard
import com.chopcode.rutago.app.ui.components.organisms.SeatGrid
import com.chopcode.rutago.app.ui.theme.RutaGoTheme
import com.chopcode.rutago.app.ui.viewmodels.passenger.CreateReservationUiState

/**
 * 📱 SCREEN: CreateReservationScreen
 * Rediseño "Light" para evitar fatiga visual y mejorar la UX.
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CreateReservationScreen(
    uiState: CreateReservationUiState,
    onSeatClick: (Int) -> Unit,
    onConfirmClick: () -> Unit,
    onBackClick: () -> Unit,
    onTutorialDismiss: () -> Unit
) {
    if (uiState.showTutorial) {
        TutorialDialog(
            title = stringResource(R.string.tut_seats_title),
            message = stringResource(R.string.tut_seats_msg),
            iconRes = R.drawable.ic_seat,
            onUnderstandClick = onTutorialDismiss
        )
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Reserva tu asiento", fontSize = 18.sp, fontWeight = FontWeight.Bold) },
                navigationIcon = {
                    IconButton(onClick = onBackClick) {
                        Icon(imageVector = Icons.Default.ArrowBack, contentDescription = "Back")
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MaterialTheme.colorScheme.background,
                    titleContentColor = MaterialTheme.colorScheme.onBackground,
                    navigationIconContentColor = MaterialTheme.colorScheme.onBackground
                )
            )
        },
        containerColor = MaterialTheme.colorScheme.background,
        bottomBar = {
            ReservationBottomBar(
                selectedSeat = uiState.selectedSeat,
                price = uiState.price,
                isReady = uiState.isReadyToConfirm,
                onConfirmClick = onConfirmClick
            )
        }
    ) { paddingValues ->
        if (uiState.isLoading && uiState.driver == null) {
            Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                CircularProgressIndicator()
            }
        } else {
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(paddingValues)
                    .verticalScroll(rememberScrollState())
                    .padding(horizontal = 20.dp)
            ) {
                // 1. Resumen Amigable del Viaje
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(24.dp),
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.primary.copy(alpha = 0.04f)),
                    elevation = CardDefaults.cardElevation(defaultElevation = 0.dp)
                ) {
                    Column(modifier = Modifier.padding(20.dp)) {
                        // Sección Ruta
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Surface(
                                color = MaterialTheme.colorScheme.primary.copy(alpha = 0.1f),
                                shape = CircleShape,
                                modifier = Modifier.size(36.dp)
                            ) {
                                Icon(
                                    Icons.Default.DirectionsBus, 
                                    contentDescription = null, 
                                    tint = MaterialTheme.colorScheme.primary,
                                    modifier = Modifier.padding(8.dp)
                                )
                            }
                            Spacer(modifier = Modifier.width(12.dp))
                            Column {
                                Text(
                                    text = "TU TRAYECTO",
                                    fontSize = 10.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = MaterialTheme.colorScheme.primary.copy(alpha = 0.7f),
                                    letterSpacing = 1.sp
                                )
                                Text(
                                    text = uiState.selectedRoute,
                                    fontSize = 18.sp,
                                    fontWeight = FontWeight.ExtraBold,
                                    color = MaterialTheme.colorScheme.onSurface
                                )
                            }
                        }

                        Divider(
                            modifier = Modifier.padding(vertical = 16.dp),
                            color = MaterialTheme.colorScheme.outline.copy(alpha = 0.05f)
                        )

                        // Fila de Fecha y Hora
                        Row(modifier = Modifier.fillMaxWidth()) {
                            InfoSection(
                                label = "FECHA DE SALIDA",
                                value = uiState.travelDate,
                                icon = Icons.Default.CalendarToday,
                                modifier = Modifier.weight(1.2f)
                            )
                            InfoSection(
                                label = "HORA",
                                value = uiState.scheduleTime,
                                icon = Icons.Default.Schedule,
                                modifier = Modifier.weight(0.8f)
                            )
                        }

                        Divider(
                            modifier = Modifier.padding(vertical = 16.dp),
                            color = MaterialTheme.colorScheme.outline.copy(alpha = 0.05f)
                        )

                        // Sección Conductor y Vehículo
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Surface(
                                color = MaterialTheme.colorScheme.secondary.copy(alpha = 0.1f),
                                shape = CircleShape,
                                modifier = Modifier.size(36.dp)
                            ) {
                                Icon(
                                    Icons.Default.SupportAgent, 
                                    contentDescription = null, 
                                    tint = MaterialTheme.colorScheme.secondary,
                                    modifier = Modifier.padding(8.dp)
                                )
                            }
                            Spacer(modifier = Modifier.width(12.dp))
                            Column {
                                Text(
                                    text = "CONDUCTOR Y VEHÍCULO",
                                    fontSize = 10.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = MaterialTheme.colorScheme.secondary.copy(alpha = 0.7f),
                                    letterSpacing = 1.sp
                                )
                                Text(
                                    text = uiState.driver?.nombre ?: "Asignando...",
                                    fontSize = 15.sp,
                                    fontWeight = FontWeight.Bold
                                )
                                Text(
                                    text = "${uiState.vehicle?.plate ?: "---"} • ${uiState.vehicle?.model ?: "---"}",
                                    fontSize = 12.sp,
                                    color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.5f)
                                )
                            }
                        }
                    }
                }

                Spacer(modifier = Modifier.height(24.dp))

                // 2. Título de Acción
                Text(
                    text = "Elige tu puesto favorito",
                    fontSize = 16.sp,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.onSurface,
                    modifier = Modifier.padding(start = 4.dp)
                )
                Text(
                    text = "Toca un asiento de color gris para seleccionarlo",
                    fontSize = 12.sp,
                    color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.5f),
                    modifier = Modifier.padding(start = 4.dp, bottom = 16.dp)
                )

                // 3. El Mapa (Optimizado)
                SeatGrid(
                    capacity = uiState.vehicle?.capacity ?: 13,
                    occupiedSeats = uiState.occupiedSeats,
                    selectedSeat = uiState.selectedSeat,
                    onSeatClick = onSeatClick
                )

                // 4. Leyenda
                SeatLegend()

                Spacer(modifier = Modifier.height(32.dp))
                
                if (uiState.error != null) {
                    Text(
                        text = uiState.error,
                        color = MaterialTheme.colorScheme.error,
                        fontSize = 13.sp,
                        modifier = Modifier.align(Alignment.CenterHorizontally)
                    )
                }
            }
        }
    }
}

@Composable
private fun InfoSection(
    label: String,
    value: String,
    icon: androidx.compose.ui.graphics.vector.ImageVector,
    modifier: Modifier = Modifier
) {
    Row(modifier = modifier, verticalAlignment = Alignment.CenterVertically) {
        Icon(
            imageVector = icon, 
            contentDescription = null, 
            tint = MaterialTheme.colorScheme.primary.copy(alpha = 0.4f),
            modifier = Modifier.size(16.dp)
        )
        Spacer(modifier = Modifier.width(8.dp))
        Column {
            Text(
                text = label,
                fontSize = 9.sp,
                fontWeight = FontWeight.Bold,
                color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.4f),
                letterSpacing = 0.5.sp
            )
            Text(
                text = value,
                fontSize = 13.sp,
                fontWeight = FontWeight.Bold,
                color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.8f)
            )
        }
    }
}

@Composable
private fun ReservationBottomBar(
    selectedSeat: Int?,
    price: Double,
    isReady: Boolean,
    onConfirmClick: () -> Unit
) {
    Surface(
        tonalElevation = 12.dp,
        color = MaterialTheme.colorScheme.surface,
        shape = RoundedCornerShape(topStart = 32.dp, topEnd = 32.dp),
        shadowElevation = 16.dp
    ) {
        Row(
            modifier = Modifier
                .padding(horizontal = 24.dp, vertical = 24.dp)
                .navigationBarsPadding(),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = if (selectedSeat != null) "TU ASIENTO" else "PASAJE",
                    fontSize = 11.sp,
                    fontWeight = FontWeight.Bold,
                    color = if (selectedSeat != null) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.outline,
                    letterSpacing = 1.sp
                )
                Row(verticalAlignment = Alignment.Bottom) {
                    Text(
                        text = "$${String.format("%,.0f", price)}",
                        fontSize = 24.sp,
                        fontWeight = FontWeight.Black,
                        color = MaterialTheme.colorScheme.onSurface
                    )
                    if (selectedSeat != null) {
                        Text(
                            text = " • A$selectedSeat",
                            fontSize = 16.sp,
                            fontWeight = FontWeight.Bold,
                            color = MaterialTheme.colorScheme.primary,
                            modifier = Modifier.padding(bottom = 3.dp, start = 4.dp)
                        )
                    }
                }
            }
            
            RutaGoButton(
                text = "RESERVAR",
                onClick = onConfirmClick,
                enabled = isReady,
                modifier = Modifier.width(150.dp)
            )
        }
    }
}

@Preview(showBackground = true)
@Composable
fun CreateReservationScreenPreview() {
    RutaGoTheme {
        CreateReservationScreen(
            uiState = CreateReservationUiState(
                selectedRoute = "Natagá -> La Plata",
                scheduleTime = "08:30 AM",
                travelDate = "29 Ago 2026",
                price = 12000.0,
                occupiedSeats = setOf(1, 2, 5)
            ),
            onSeatClick = {},
            onConfirmClick = {},
            onBackClick = {},
            onTutorialDismiss = {}
        )
    }
}

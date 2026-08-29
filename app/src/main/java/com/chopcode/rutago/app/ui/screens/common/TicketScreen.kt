package com.chopcode.rutago.app.ui.screens.common

import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.tween
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Chat
import androidx.compose.material.icons.filled.Share
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.chopcode.rutago.app.R
import com.chopcode.rutago.app.ui.components.organisms.TicketCard
import com.chopcode.rutago.app.ui.theme.RutaGoTheme
import com.chopcode.rutago.app.ui.viewmodels.common.TicketUiState

/**
 * 📱 SCREEN: TicketScreen
 * Visualización premium del tiquete con acciones de compartir y chat.
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun TicketScreen(
    uiState: TicketUiState,
    onBackClick: () -> Unit,
    onShareClick: () -> Unit,
    onChatClick: () -> Unit
) {
    var startAnimation by remember { mutableStateOf(false) }
    val alpha by animateFloatAsState(
        targetValue = if (startAnimation) 1f else 0f,
        animationSpec = tween(durationMillis = 600),
        label = "AlphaAnimation"
    )
    val translateY by animateFloatAsState(
        targetValue = if (startAnimation) 0f else 50f,
        animationSpec = tween(durationMillis = 600),
        label = "TranslateAnimation"
    )

    LaunchedEffect(Unit) {
        startAnimation = true
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Detalle de Reserva") },
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
        containerColor = MaterialTheme.colorScheme.background
    ) { paddingValues ->
        if (uiState.isLoading) {
            Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                CircularProgressIndicator()
            }
        } else if (uiState.reservation != null) {
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(paddingValues)
                    .verticalScroll(rememberScrollState())
                    .padding(20.dp)
                    .graphicsLayer(
                        alpha = alpha,
                        translationY = translateY
                    ),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                TicketCard(reservation = uiState.reservation)

                Spacer(modifier = Modifier.height(32.dp))

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    // Chat Button (Solo si no está cancelada)
                    if (uiState.reservation.reservationStatus?.lowercase() != "cancelada") {
                        Button(
                            onClick = onChatClick,
                            modifier = Modifier
                                .weight(1f)
                                .height(56.dp),
                            shape = androidx.compose.foundation.shape.RoundedCornerShape(16.dp)
                        ) {
                            Icon(Icons.Default.Chat, contentDescription = null)
                            Spacer(modifier = Modifier.width(8.dp))
                            Text("Chat")
                        }
                    }

                    // Share Button
                    OutlinedButton(
                        onClick = onShareClick,
                        modifier = Modifier
                            .weight(1.5f)
                            .height(56.dp),
                        shape = androidx.compose.foundation.shape.RoundedCornerShape(16.dp),
                        border = androidx.compose.foundation.BorderStroke(1.5.dp, MaterialTheme.colorScheme.primary)
                    ) {
                        Icon(Icons.Default.Share, contentDescription = null)
                        Spacer(modifier = Modifier.width(8.dp))
                        Text("Compartir")
                    }
                }
                
                Spacer(modifier = Modifier.height(24.dp))
            }
        } else if (uiState.error != null) {
            Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                Text(text = uiState.error, color = MaterialTheme.colorScheme.error)
            }
        }
    }
}

@Preview(showBackground = true)
@Composable
fun TicketScreenPreview() {
    RutaGoTheme {
        TicketScreen(
            uiState = TicketUiState(
                isLoading = false,
                reservation = com.chopcode.rutago.app.models.Reservation().apply {
                    origin = "Natagá"
                    destination = "La Plata"
                    departureTime = "08:30 AM"
                    driver = "Liye Daza"
                    name = "Brandon Daza"
                    price = 12000.0
                    reservationStatus = "Confirmada"
                    reservationDate = System.currentTimeMillis()
                    idReservation = "RES-408029E"
                }
            ),
            onBackClick = {},
            onShareClick = {},
            onChatClick = {}
        )
    }
}

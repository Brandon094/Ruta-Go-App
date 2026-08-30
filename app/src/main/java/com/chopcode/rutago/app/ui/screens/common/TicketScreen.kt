package com.chopcode.rutago.app.ui.screens.common

import androidx.compose.animation.core.Animatable
import androidx.compose.animation.core.tween
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Chat
import androidx.compose.material.icons.filled.Share
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.chopcode.rutago.app.ui.components.atoms.RutaGoButton
import com.chopcode.rutago.app.ui.components.organisms.TicketCard
import com.chopcode.rutago.app.ui.theme.SuccessGreen
import com.chopcode.rutago.app.ui.viewmodels.common.TicketUiState

/**
 * 📱 SCREEN: TicketScreen
 * Visualización premium del comprobante de viaje.
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun TicketScreen(
    uiState: TicketUiState,
    onBackClick: () -> Unit,
    onShareClick: () -> Unit,
    onChatClick: () -> Unit
) {
    val translateY = remember { Animatable(50f) }
    val alpha = remember { Animatable(0f) }

    LaunchedEffect(uiState.reservation) {
        if (uiState.reservation != null) {
            alpha.animateTo(1f, tween(600))
            translateY.animateTo(0f, tween(600))
        }
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Comprobante Digital") },
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
            val reservation = uiState.reservation
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(paddingValues)
                    .verticalScroll(rememberScrollState())
                    .padding(20.dp)
                    .graphicsLayer(
                        alpha = alpha.value,
                        translationY = translateY.value
                    ),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                TicketCard(reservation = reservation)

                Spacer(modifier = Modifier.height(32.dp))

                // 2. Acciones Rápidas
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    RutaGoButton(
                        text = "COMPARTIR",
                        onClick = onShareClick,
                        modifier = Modifier.weight(1f),
                        icon = Icons.Default.Share
                    )
                    
                    OutlinedButton(
                        onClick = onChatClick,
                        modifier = Modifier.weight(1f).height(56.dp),
                        shape = RoundedCornerShape(12.dp),
                        colors = ButtonDefaults.outlinedButtonColors(contentColor = MaterialTheme.colorScheme.primary)
                    ) {
                        Icon(Icons.Default.Chat, contentDescription = null)
                        Spacer(modifier = Modifier.width(8.dp))
                        Text("CHAT")
                    }
                }

                Spacer(modifier = Modifier.height(24.dp))

                // 3. Info Details
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 24.dp, vertical = 24.dp)
                ) {
                    Text(
                        text = "RESUMEN DE RESERVA",
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Bold,
                        color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.4f),
                        letterSpacing = 1.sp
                    )
                    Spacer(modifier = Modifier.height(16.dp))

                    TicketDetailRow("Pasajero", reservation.passengerName)
                    TicketDetailRow("Conductor", reservation.driverName.ifEmpty { "Por asignar" })
                    TicketDetailRow("Vehículo", "${reservation.vehiclePlate.ifEmpty { "---" }} (${reservation.vehicleModel.ifEmpty { "---" }})")
                    TicketDetailRow("Estado", reservation.status)
                    
                    TicketDetailRow("ID Reserva", reservation.id.uppercase())
                }
            }
        }
    }
}

@Composable
private fun TicketDetailRow(label: String, value: String) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 8.dp),
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        Text(
            text = label,
            fontSize = 13.sp,
            color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.5f)
        )
        Text(
            text = value,
            fontSize = 13.sp,
            fontWeight = FontWeight.Bold,
            color = MaterialTheme.colorScheme.onSurface
        )
    }
}

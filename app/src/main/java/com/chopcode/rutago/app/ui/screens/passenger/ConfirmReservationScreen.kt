package com.chopcode.rutago.app.ui.screens.passenger

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.clickable
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
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.chopcode.rutago.app.ui.components.atoms.RutaGoButton
import com.chopcode.rutago.app.ui.theme.RutaGoTheme
import com.chopcode.rutago.app.ui.viewmodels.passenger.ConfirmReservationUiState

/**
 * 📱 SCREEN: ConfirmReservationScreen
 * Resumen ejecutivo y confirmación final de la reserva.
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ConfirmReservationScreen(
    uiState: ConfirmReservationUiState,
    onPaymentMethodChange: (String) -> Unit,
    onConfirmClick: () -> Unit,
    onBackClick: () -> Unit
) {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Confirmar Reserva") },
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
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
                .verticalScroll(rememberScrollState())
                .padding(20.dp)
        ) {
            // 1. Resumen de Viaje
            SummaryCard(
                title = "Detalles del Viaje",
                icon = Icons.Default.DirectionsBus
            ) {
                Row(modifier = Modifier.fillMaxWidth()) {
                    Column(modifier = Modifier.weight(1f)) {
                        DetailItem("Origen", uiState.origin)
                        DetailItem("Fecha", uiState.travelDate)
                        DetailItem("Asiento", "A${uiState.selectedSeat}")
                    }
                    Column(modifier = Modifier.weight(1f)) {
                        DetailItem("Destino", uiState.destination)
                        DetailItem("Hora", uiState.scheduleTime)
                        DetailItem("Precio", "$${String.format("%,.0f", uiState.price)}")
                    }
                }
            }

            Spacer(modifier = Modifier.height(16.dp))

            // 2. Información del Operador
            SummaryCard(
                title = "Operador y Vehículo",
                icon = Icons.Default.Person
            ) {
                DetailItem("Conductor", uiState.driverName)
                DetailItem("Vehículo", "${uiState.vehiclePlate} (${uiState.vehicleModel})")
            }

            Spacer(modifier = Modifier.height(16.dp))

            // 3. Método de Pago
            SummaryCard(
                title = "Método de Pago",
                icon = Icons.Default.Payments
            ) {
                PaymentOption(
                    label = "Efectivo",
                    isSelected = uiState.paymentMethod == "efectivo",
                    onClick = { onPaymentMethodChange("efectivo") }
                )
            }

            Spacer(modifier = Modifier.height(32.dp))

            // 4. Botones de Acción
            RutaGoButton(
                text = if (uiState.isProcessing) "PROCESANDO..." else "CONFIRMAR RESERVA",
                onClick = onConfirmClick,
                enabled = !uiState.isProcessing,
                modifier = Modifier.fillMaxWidth()
            )

            Spacer(modifier = Modifier.height(12.dp))

            OutlinedButton(
                onClick = onBackClick,
                modifier = Modifier.fillMaxWidth().height(56.dp),
                shape = RoundedCornerShape(12.dp),
                border = BorderStroke(1.5.dp, MaterialTheme.colorScheme.outline.copy(alpha = 0.5f))
            ) {
                Text("CANCELAR", color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.6f))
            }
            
            if (uiState.error != null) {
                Text(
                    text = uiState.error,
                    color = MaterialTheme.colorScheme.error,
                    fontSize = 13.sp,
                    modifier = Modifier.padding(top = 16.dp).align(Alignment.CenterHorizontally)
                )
            }
        }
    }
}

@Composable
private fun SummaryCard(
    title: String,
    icon: androidx.compose.ui.graphics.vector.ImageVector,
    content: @Composable ColumnScope.() -> Unit
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(20.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Column(modifier = Modifier.padding(20.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(icon, contentDescription = null, tint = MaterialTheme.colorScheme.primary, modifier = Modifier.size(20.dp))
                Spacer(modifier = Modifier.width(10.dp))
                Text(text = title, fontSize = 15.sp, fontWeight = FontWeight.Bold, color = MaterialTheme.colorScheme.primary)
            }
            Divider(modifier = Modifier.padding(vertical = 12.dp), color = MaterialTheme.colorScheme.outline.copy(alpha = 0.1f))
            content()
        }
    }
}

@Composable
private fun DetailItem(label: String, value: String) {
    Column(modifier = Modifier.padding(vertical = 4.dp)) {
        Text(text = label, fontSize = 11.sp, color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.5f))
        Text(text = value, fontSize = 14.sp, fontWeight = FontWeight.Bold)
    }
}

@Composable
private fun PaymentOption(
    label: String,
    isSelected: Boolean,
    onClick: () -> Unit
) {
    Surface(
        onClick = onClick,
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(12.dp),
        color = if (isSelected) MaterialTheme.colorScheme.primary.copy(alpha = 0.1f) else Color.Transparent,
        border = BorderStroke(
            width = if (isSelected) 2.dp else 1.dp,
            color = if (isSelected) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.outline.copy(alpha = 0.2f)
        )
    ) {
        Row(
            modifier = Modifier.padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            RadioButton(selected = isSelected, onClick = onClick, colors = RadioButtonDefaults.colors(selectedColor = MaterialTheme.colorScheme.primary))
            Spacer(modifier = Modifier.width(8.dp))
            Text(text = label, fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Normal)
        }
    }
}

@Preview(showBackground = true)
@Composable
fun ConfirmReservationScreenPreview() {
    RutaGoTheme {
        ConfirmReservationScreen(
            uiState = ConfirmReservationUiState(
                origin = "Natagá",
                destination = "La Plata",
                travelDate = "29 Ago 2026",
                scheduleTime = "08:30 AM",
                price = 12000.0,
                driverName = "Liye Daza",
                vehiclePlate = "TBO550",
                vehicleModel = "Frontier"
            ),
            onPaymentMethodChange = {},
            onConfirmClick = {},
            onBackClick = {}
        )
    }
}

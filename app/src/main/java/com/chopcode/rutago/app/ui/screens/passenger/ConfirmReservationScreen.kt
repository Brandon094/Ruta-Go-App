package com.chopcode.rutago.app.ui.screens.passenger

import androidx.compose.foundation.BorderStroke
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
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.chopcode.rutago.app.R
import com.chopcode.rutago.app.ui.components.atoms.RutaGoButton
import com.chopcode.rutago.app.ui.components.molecules.ReservationSuccessDialog
import com.chopcode.rutago.app.ui.components.molecules.TutorialDialog
import com.chopcode.rutago.app.ui.theme.RutaGoTheme
import com.chopcode.rutago.app.ui.viewmodels.passenger.ConfirmReservationUiState

/**
 * 📱 SCREEN: ConfirmReservationScreen
 * Rediseño premium para el cierre de reserva con UX amigable y profesional.
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ConfirmReservationScreen(
    uiState: ConfirmReservationUiState,
    onPaymentMethodChange: (String) -> Unit,
    onConfirmClick: () -> Unit,
    onBackClick: () -> Unit,
    onSuccessDismiss: () -> Unit,
    onTutorialDismiss: () -> Unit
) {
    if (uiState.showTutorial) {
        TutorialDialog(
            title = stringResource(R.string.tut_confirm_title),
            message = stringResource(R.string.tut_confirm_msg),
            iconRes = R.drawable.ic_check,
            onUnderstandClick = onTutorialDismiss
        )
    }

    if (uiState.confirmationSuccess) {
        ReservationSuccessDialog(
            onConfirm = onSuccessDismiss
        )
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Verifica tu viaje", fontSize = 18.sp, fontWeight = FontWeight.Bold) },
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
        containerColor = MaterialTheme.colorScheme.background
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
                .verticalScroll(rememberScrollState())
                .padding(horizontal = 24.dp, vertical = 12.dp)
        ) {
            // 1. Mensaje de bienvenida/guía
            Text(
                text = "¡Casi listo!",
                fontSize = 24.sp,
                fontWeight = FontWeight.Black,
                color = MaterialTheme.colorScheme.onBackground
            )
            Text(
                text = "Revisa que los datos de tu reserva sean correctos antes de confirmar.",
                fontSize = 14.sp,
                color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.6f),
                modifier = Modifier.padding(top = 4.dp, bottom = 24.dp)
            )

            // 2. Resumen Ejecutivo (Trayecto)
            SummaryCard(
                title = "TRAYECTO",
                icon = Icons.Default.Route,
                accentColor = MaterialTheme.colorScheme.primary
            ) {
                Row(modifier = Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
                    Column(modifier = Modifier.weight(1f)) {
                        Text(text = uiState.origin, fontSize = 18.sp, fontWeight = FontWeight.ExtraBold)
                        Icon(Icons.Default.ArrowDownward, contentDescription = null, modifier = Modifier.size(16.dp).padding(vertical = 2.dp), tint = MaterialTheme.colorScheme.primary)
                        Text(text = uiState.destination, fontSize = 18.sp, fontWeight = FontWeight.ExtraBold)
                    }
                    Column(horizontalAlignment = Alignment.End) {
                        Surface(
                            color = MaterialTheme.colorScheme.primary.copy(alpha = 0.1f),
                            shape = RoundedCornerShape(8.dp)
                        ) {
                            Text(
                                text = "A${uiState.selectedSeat}",
                                modifier = Modifier.padding(horizontal = 12.dp, vertical = 6.dp),
                                fontSize = 16.sp,
                                fontWeight = FontWeight.Black,
                                color = MaterialTheme.colorScheme.primary
                            )
                        }
                        Text(text = "ASIENTO", fontSize = 9.sp, fontWeight = FontWeight.Bold, color = MaterialTheme.colorScheme.primary.copy(alpha = 0.6f))
                    }
                }
                
                Divider(modifier = Modifier.padding(vertical = 16.dp), color = MaterialTheme.colorScheme.outline.copy(alpha = 0.05f))
                
                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                    DetailRow(Icons.Default.CalendarToday, uiState.travelDate)
                    DetailRow(Icons.Default.Schedule, uiState.scheduleTime)
                }
            }

            Spacer(modifier = Modifier.height(16.dp))

            // 3. Información del Operador
            SummaryCard(
                title = "OPERADOR Y VEHÍCULO",
                icon = Icons.Default.SupportAgent,
                accentColor = MaterialTheme.colorScheme.secondary
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Surface(
                        modifier = Modifier.size(40.dp),
                        shape = CircleShape,
                        color = MaterialTheme.colorScheme.secondary.copy(alpha = 0.1f)
                    ) {
                        Icon(Icons.Default.Person, contentDescription = null, modifier = Modifier.padding(8.dp), tint = MaterialTheme.colorScheme.secondary)
                    }
                    Spacer(modifier = Modifier.width(12.dp))
                    Column {
                        Text(text = uiState.driverName, fontSize = 15.sp, fontWeight = FontWeight.Bold)
                        Text(text = "${uiState.vehiclePlate} • ${uiState.vehicleModel}", fontSize = 12.sp, color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.5f))
                    }
                }
            }

            Spacer(modifier = Modifier.height(16.dp))

            // 4. Método de Pago
            SummaryCard(
                title = "MÉTODO DE PAGO",
                icon = Icons.Default.Payments,
                accentColor = MaterialTheme.colorScheme.tertiary
            ) {
                PaymentOption(
                    label = "Efectivo",
                    description = "Paga directamente al conductor",
                    isSelected = uiState.paymentMethod == "efectivo",
                    onClick = { onPaymentMethodChange("efectivo") }
                )
            }

            Spacer(modifier = Modifier.height(24.dp))

            // 5. Información Importante (Rescatada de Java/XML)
            SummaryCard(
                title = stringResource(R.string.info_importante).uppercase(),
                icon = Icons.Default.Info,
                accentColor = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.6f)
            ) {
                Text(
                    text = stringResource(R.string.info_confirmacion_reserva),
                    fontSize = 12.sp,
                    color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.7f),
                    lineHeight = 20.sp,
                    modifier = Modifier.padding(bottom = 8.dp)
                )
            }

            Spacer(modifier = Modifier.height(32.dp))

            // 6. Botones de Acción
            RutaGoButton(
                text = if (uiState.isProcessing) "PROCESANDO..." else "CONFIRMAR RESERVA",
                onClick = onConfirmClick,
                enabled = !uiState.isProcessing,
                modifier = Modifier.fillMaxWidth()
            )

            Spacer(modifier = Modifier.height(12.dp))

            TextButton(
                onClick = onBackClick,
                modifier = Modifier.fillMaxWidth().height(52.dp)
            ) {
                Text("CANCELAR", color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.4f), fontWeight = FontWeight.Bold)
            }
            
            if (uiState.error != null) {
                Text(
                    text = uiState.error,
                    color = MaterialTheme.colorScheme.error,
                    fontSize = 13.sp,
                    textAlign = TextAlign.Center,
                    modifier = Modifier.fillMaxWidth().padding(top = 16.dp)
                )
            }

            Spacer(modifier = Modifier.height(24.dp))
        }
    }
}

@Composable
private fun SummaryCard(
    title: String,
    icon: androidx.compose.ui.graphics.vector.ImageVector,
    accentColor: Color,
    content: @Composable ColumnScope.() -> Unit
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(24.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Column(modifier = Modifier.padding(20.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(icon, contentDescription = null, tint = accentColor.copy(alpha = 0.6f), modifier = Modifier.size(16.dp))
                Spacer(modifier = Modifier.width(8.dp))
                Text(
                    text = title, 
                    fontSize = 10.sp, 
                    fontWeight = FontWeight.Bold, 
                    color = accentColor.copy(alpha = 0.6f),
                    letterSpacing = 1.sp
                )
            }
            Spacer(modifier = Modifier.height(16.dp))
            content()
        }
    }
}

@Composable
private fun DetailRow(icon: androidx.compose.ui.graphics.vector.ImageVector, value: String) {
    Row(verticalAlignment = Alignment.CenterVertically) {
        Icon(
            imageVector = icon, 
            contentDescription = null, 
            modifier = Modifier.size(14.dp), 
            tint = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.4f)
        )
        Spacer(modifier = Modifier.width(6.dp))
        Text(text = value, fontSize = 13.sp, fontWeight = FontWeight.Medium, color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.7f))
    }
}

@Composable
private fun PaymentOption(
    label: String,
    description: String,
    isSelected: Boolean,
    onClick: () -> Unit
) {
    Surface(
        onClick = onClick,
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(16.dp),
        color = if (isSelected) MaterialTheme.colorScheme.primary.copy(alpha = 0.05f) else Color.Transparent,
        border = BorderStroke(
            width = if (isSelected) 2.dp else 1.dp,
            color = if (isSelected) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.outline.copy(alpha = 0.1f)
        )
    ) {
        Row(
            modifier = Modifier.padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            RadioButton(
                selected = isSelected, 
                onClick = onClick, 
                colors = RadioButtonDefaults.colors(selectedColor = MaterialTheme.colorScheme.primary)
            )
            Spacer(modifier = Modifier.width(12.dp))
            Column {
                Text(text = label, fontWeight = FontWeight.ExtraBold, fontSize = 15.sp)
                Text(text = description, fontSize = 12.sp, color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.6f))
            }
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
                vehicleModel = "Frontier",
                selectedSeat = 5
            ),
            onPaymentMethodChange = {},
            onConfirmClick = {},
            onBackClick = {},
            onSuccessDismiss = {},
            onTutorialDismiss = {}
        )
    }
}

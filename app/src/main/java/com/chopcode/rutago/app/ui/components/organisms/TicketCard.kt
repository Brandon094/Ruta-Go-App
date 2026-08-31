package com.chopcode.rutago.app.ui.components.organisms

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.PathEffect
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.chopcode.rutago.app.data.models.Reservation
import com.chopcode.rutago.app.ui.components.atoms.AuthLogo
import com.chopcode.rutago.app.ui.components.molecules.TicketInfoItem
import com.chopcode.rutago.app.ui.theme.SuccessGreen
import java.text.SimpleDateFormat
import java.util.*

/**
 * 🧬 ORGANISM: TicketCard
 * Comprobante digital con diseño premium y efecto de tiquete.
 * Normalizado para usar las nuevas propiedades de Reservation.
 */
@Composable
fun TicketCard(
    reservation: Reservation,
    modifier: Modifier = Modifier
) {
    val statusColor = when (reservation.status.lowercase()) {
        "confirmada", "confirmado", "completada" -> SuccessGreen
        "cancelada" -> MaterialTheme.colorScheme.error
        else -> MaterialTheme.colorScheme.primary
    }

    Card(
        modifier = modifier.fillMaxWidth(),
        shape = RoundedCornerShape(24.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        elevation = CardDefaults.cardElevation(defaultElevation = 8.dp)
    ) {
        Column {
            // 1. Header (Primary Color)
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(MaterialTheme.colorScheme.primary)
                    .padding(24.dp),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                AuthLogo(size = 80.dp)
                Spacer(modifier = Modifier.height(12.dp))
                Text(
                    text = "TIQUETE DE VIAJE",
                    color = Color.White,
                    fontSize = 20.sp,
                    fontWeight = FontWeight.Bold
                )
                Surface(
                    color = Color.Black.copy(alpha = 0.2f),
                    shape = RoundedCornerShape(8.dp)
                ) {
                    Text(
                        text = reservation.status.uppercase(),
                        color = Color.White,
                        fontSize = 12.sp,
                        fontWeight = FontWeight.ExtraBold,
                        modifier = Modifier.padding(horizontal = 12.dp, vertical = 4.dp)
                    )
                }
            }

            // 2. Body
            Column(modifier = Modifier.padding(24.dp)) {
                Text(
                    text = "TRAYECTO",
                    fontSize = 12.sp,
                    color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.5f),
                    fontWeight = FontWeight.Bold
                )
                Text(
                    text = "${reservation.origin} → ${reservation.destination}",
                    fontSize = 20.sp,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.onSurface
                )

                Spacer(modifier = Modifier.height(24.dp))

                // Grid de Info
                Row(modifier = Modifier.fillMaxWidth()) {
                    val date = Date(reservation.reservationDate)
                    val format = SimpleDateFormat("dd MMM yyyy", Locale.getDefault())
                    TicketInfoItem(label = "Fecha", value = format.format(date), modifier = Modifier.weight(1f))
                    TicketInfoItem(label = "Hora", value = reservation.departureTime.ifEmpty { "--:--" }, modifier = Modifier.weight(1f))
                }

                Spacer(modifier = Modifier.height(16.dp))

                Row(modifier = Modifier.fillMaxWidth()) {
                    TicketInfoItem(
                        label = "Asiento", 
                        value = "A${reservation.reservedSeat}", 
                        valueColor = MaterialTheme.colorScheme.primary,
                        modifier = Modifier.weight(1f)
                    )
                    TicketInfoItem(
                        label = "Valor", 
                        value = "$${String.format("%,.0f", reservation.price)}", 
                        modifier = Modifier.weight(1f)
                    )
                }

                Divider(
                    modifier = Modifier.padding(vertical = 24.dp),
                    color = MaterialTheme.colorScheme.outline.copy(alpha = 0.1f)
                )

                // Viaje Details
                TicketDetailRow("Pasajero", reservation.passengerName.ifEmpty { "N/A" })
                TicketDetailRow("Conductor", reservation.driverName.ifEmpty { "Por asignar" })
                TicketDetailRow("Vehículo", "${reservation.vehiclePlate.ifEmpty { "---" }} (${reservation.vehicleModel.ifEmpty { "---" }})")
            }

            // 3. Separator (Punched Effect)
            DashedDivider()

            // 4. Footer
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.5f))
                    .padding(16.dp),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                Text(
                    text = "ID DE RESERVA",
                    fontSize = 10.sp,
                    color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.4f),
                    fontWeight = FontWeight.Bold
                )
                Text(
                    text = reservation.id.uppercase(),
                    fontSize = 11.sp,
                    color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.6f),
                    fontWeight = FontWeight.Bold
                )
            }
        }
    }
}

@Composable
private fun TicketDetailRow(label: String, value: String) {
    Row(modifier = Modifier.padding(vertical = 2.dp)) {
        Text(
            text = "$label: ",
            fontSize = 13.sp,
            color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.6f),
            fontWeight = FontWeight.Bold
        )
        Text(
            text = value,
            fontSize = 13.sp,
            color = MaterialTheme.colorScheme.onSurface
        )
    }
}

@Composable
private fun DashedDivider() {
    val color = MaterialTheme.colorScheme.outline.copy(alpha = 0.2f)
    Canvas(
        modifier = Modifier
            .fillMaxWidth()
            .height(1.dp)
    ) {
        drawLine(
            color = color,
            start = Offset(0f, 0f),
            end = Offset(size.width, 0f),
            pathEffect = PathEffect.dashPathEffect(floatArrayOf(10f, 10f), 0f)
        )
    }
}

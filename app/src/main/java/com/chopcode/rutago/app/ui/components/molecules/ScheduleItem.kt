package com.chopcode.rutago.app.ui.components.molecules

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Person
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.chopcode.rutago.app.R
import com.chopcode.rutago.app.data.models.Schedule

/**
 * 🧪 MOLECULE: ScheduleItem
 * Ítem premium que representa un turno de despacho con estados dinámicos y badge de esquina.
 */
@Composable
fun ScheduleItem(
    schedule: Schedule,
    isHighlighted: Boolean = false,
    isDisabled: Boolean = false,
    onReserveClick: (Schedule) -> Unit,
    modifier: Modifier = Modifier
) {
    val alpha = if (isDisabled) 0.5f else 1.0f
    val cardColor = when {
        isHighlighted -> MaterialTheme.colorScheme.primaryContainer
        isDisabled -> MaterialTheme.colorScheme.surface.copy(alpha = 0.8f)
        else -> MaterialTheme.colorScheme.surface
    }
    
    val borderColor = if (isHighlighted) MaterialTheme.colorScheme.primary else Color.Transparent

    Card(
        modifier = modifier
            .fillMaxWidth()
            .then(
                if (isHighlighted) Modifier.border(1.5.dp, borderColor, RoundedCornerShape(16.dp))
                else Modifier
            ),
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = cardColor),
        elevation = CardDefaults.cardElevation(defaultElevation = if (isHighlighted) 6.dp else 2.dp)
    ) {
        Box(modifier = Modifier.fillMaxWidth()) {
            // 🚩 Badge "SIGUIENTE" - Estilo Web/XML (Pegado al borde)
            if (isHighlighted && !isDisabled) {
                Surface(
                    color = MaterialTheme.colorScheme.primary,
                    shape = RoundedCornerShape(bottomStart = 12.dp, topEnd = 0.dp), // Ajustado para encajar en la esquina
                    modifier = Modifier.align(Alignment.TopEnd)
                ) {
                    Text(
                        text = "SIGUIENTE",
                        color = Color.White,
                        fontSize = 9.sp,
                        fontWeight = FontWeight.ExtraBold,
                        modifier = Modifier.padding(horizontal = 12.dp, vertical = 4.dp)
                    )
                }
            }

            Row(
                modifier = Modifier
                    .padding(14.dp)
                    .fillMaxWidth()
                    .graphicsLayer(alpha = alpha),
                verticalAlignment = Alignment.CenterVertically
            ) {
                // 🕒 Indicador de tiempo
                Column(
                    modifier = Modifier
                        .size(64.dp)
                        .border(
                            width = if (isDisabled) 1.dp else 2.dp, 
                            color = when {
                                isHighlighted -> MaterialTheme.colorScheme.primary
                                isDisabled -> MaterialTheme.colorScheme.outline.copy(alpha = 0.3f)
                                else -> MaterialTheme.colorScheme.primary.copy(alpha = 0.6f)
                            }, 
                            shape = CircleShape
                        )
                        .padding(4.dp),
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.Center
                ) {
                    val timeParts = schedule.time?.split(" ") ?: listOf("--:--", "")
                    Text(
                        text = timeParts[0],
                        color = if (isHighlighted) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.primary.copy(alpha = 0.8f),
                        fontSize = 16.sp,
                        fontWeight = FontWeight.ExtraBold
                    )
                    if (timeParts.size > 1) {
                        Text(
                            text = timeParts[1],
                            color = if (isHighlighted) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.primary.copy(alpha = 0.8f),
                            fontSize = 10.sp,
                            fontWeight = FontWeight.Bold
                        )
                    }
                }

                Spacer(modifier = Modifier.width(12.dp))
                
                Divider(
                    modifier = Modifier
                        .width(1.dp)
                        .height(32.dp),
                    color = MaterialTheme.colorScheme.outline.copy(alpha = 0.1f)
                )

                Spacer(modifier = Modifier.width(12.dp))

                // ℹ️ Información del turno
                Column(modifier = Modifier.weight(1f)) {
                    Text(
                        text = schedule.route ?: "Ruta no definida",
                        color = MaterialTheme.colorScheme.onSurface,
                        fontSize = 14.sp,
                        fontWeight = FontWeight.Bold
                    )
                    
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        modifier = Modifier.padding(top = 2.dp)
                    ) {
                        Icon(
                            imageVector = Icons.Default.Person,
                            contentDescription = null,
                            tint = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.6f),
                            modifier = Modifier.size(10.dp)
                        )
                        Text(
                            text = (schedule.driverName ?: "Conductor por asignar").uppercase(),
                            color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.6f),
                            fontSize = 10.sp,
                            fontWeight = FontWeight.Bold,
                            modifier = Modifier.padding(start = 4.dp)
                        )
                    }

                    Spacer(modifier = Modifier.height(6.dp))

                    // 💺 Asientos
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(
                            painter = painterResource(R.drawable.ic_seat),
                            contentDescription = null,
                            tint = MaterialTheme.colorScheme.primary.copy(alpha = 0.7f),
                            modifier = Modifier.size(14.dp)
                        )
                        Text(
                            text = "${schedule.availableSeats} asientos disponibles",
                            color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.7f),
                            fontSize = 11.sp,
                            modifier = Modifier.padding(start = 6.dp)
                        )
                    }

                    // 💵 Precio
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        modifier = Modifier.padding(top = 3.dp)
                    ) {
                        Icon(
                            painter = painterResource(R.drawable.ic_price),
                            contentDescription = null,
                            tint = MaterialTheme.colorScheme.primary.copy(alpha = 0.7f),
                            modifier = Modifier.size(14.dp)
                        )
                        Text(
                            text = schedule.price ?: "$0",
                            color = MaterialTheme.colorScheme.primary,
                            fontSize = 12.sp,
                            fontWeight = FontWeight.Bold,
                            modifier = Modifier.padding(start = 6.dp)
                        )
                    }
                }

                // 🔘 Acción
                if (!isDisabled) {
                    IconButton(
                        onClick = { onReserveClick(schedule) },
                        modifier = Modifier
                            .background(MaterialTheme.colorScheme.primary, CircleShape)
                            .size(36.dp)
                    ) {
                        Icon(
                            imageVector = Icons.Default.Add,
                            contentDescription = "Reservar",
                            tint = Color.White,
                            modifier = Modifier.size(20.dp)
                        )
                    }
                } else {
                    Text(
                        text = "PASADO",
                        fontSize = 9.sp,
                        fontWeight = FontWeight.ExtraBold,
                        color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.5f),
                        modifier = Modifier
                            .border(
                                width = 1.dp, 
                                color = MaterialTheme.colorScheme.outline.copy(alpha = 0.3f), 
                                shape = RoundedCornerShape(6.dp)
                            )
                            .padding(horizontal = 8.dp, vertical = 4.dp)
                    )
                }
            }
        }
    }
}

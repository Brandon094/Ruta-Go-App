package com.chopcode.rutago.app.ui.components.organisms

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AttachMoney
import androidx.compose.material.icons.filled.EventSeat
import androidx.compose.material.icons.filled.Star
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.chopcode.rutago.app.ui.viewmodels.home.DriverStats

/**
 * 🧬 ORGANISM: DriverStatsSection
 * Resumen financiero y operativo para el conductor.
 */
@Composable
fun DriverStatsSection(
    stats: DriverStats,
    modifier: Modifier = Modifier
) {
    Card(
        modifier = modifier.fillMaxWidth(),
        shape = androidx.compose.foundation.shape.RoundedCornerShape(24.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.primary),
        elevation = CardDefaults.cardElevation(defaultElevation = 8.dp)
    ) {
        Row(
            modifier = Modifier
                .padding(24.dp)
                .fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            DriverStatItem(
                label = "INGRESOS HOY",
                value = "$${String.format("%,.0f", stats.todayIncome)}",
                icon = Icons.Default.AttachMoney,
                modifier = Modifier.weight(1f)
            )
            
            Divider(
                modifier = Modifier.height(40.dp).width(1.dp),
                color = MaterialTheme.colorScheme.onPrimary.copy(alpha = 0.2f)
            )

            DriverStatItem(
                label = "CONFIRMADAS",
                value = stats.confirmedReservations.toString(),
                icon = Icons.Default.Star,
                modifier = Modifier.weight(1f)
            )

            Divider(
                modifier = Modifier.height(40.dp).width(1.dp),
                color = MaterialTheme.colorScheme.onPrimary.copy(alpha = 0.2f)
            )

            DriverStatItem(
                label = "PUESTOS LIBRES",
                value = stats.availableSeats.toString(),
                icon = Icons.Default.EventSeat,
                modifier = Modifier.weight(1f)
            )
        }
    }
}

@Composable
private fun DriverStatItem(
    label: String,
    value: String,
    icon: ImageVector,
    modifier: Modifier = Modifier
) {
    Column(
        modifier = modifier,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Icon(
            imageVector = icon,
            contentDescription = null,
            tint = MaterialTheme.colorScheme.onPrimary.copy(alpha = 0.8f),
            modifier = Modifier.size(20.dp)
        )
        Text(
            text = value,
            fontSize = 20.sp,
            fontWeight = FontWeight.Black,
            color = MaterialTheme.colorScheme.onPrimary
        )
        Text(
            text = label,
            fontSize = 9.sp,
            fontWeight = FontWeight.Bold,
            color = MaterialTheme.colorScheme.onPrimary.copy(alpha = 0.6f),
            letterSpacing = 0.5.sp
        )
    }
}

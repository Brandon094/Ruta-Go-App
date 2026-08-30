package com.chopcode.rutago.app.ui.components.molecules

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.chopcode.rutago.app.ui.viewmodels.home.RouteStat

/**
 * 🧪 MOLECULE: RouteStatCard
 * Card individual para el desglose de ocupación por ruta.
 */
@Composable
fun RouteStatCard(
    stat: RouteStat,
    modifier: Modifier = Modifier
) {
    Card(
        modifier = modifier.width(200.dp),
        shape = RoundedCornerShape(20.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(
                text = stat.name,
                fontSize = 12.sp,
                fontWeight = FontWeight.Bold,
                maxLines = 1,
                color = MaterialTheme.colorScheme.onSurface
            )
            
            Spacer(modifier = Modifier.height(12.dp))
            
            LinearProgressIndicator(
                progress = if (stat.occupied + stat.available > 0) 
                    stat.occupied.toFloat() / (stat.occupied + stat.available).toFloat() 
                    else 0f,
                modifier = Modifier.fillMaxWidth().height(6.dp),
                color = Color(stat.color),
                trackColor = Color(stat.color).copy(alpha = 0.1f),
                strokeCap = androidx.compose.ui.graphics.StrokeCap.Round
            )
            
            Spacer(modifier = Modifier.height(8.dp))
            
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                StatValue(label = "Ocupados", value = stat.occupied.toString())
                StatValue(label = "Libres", value = stat.available.toString())
            }
        }
    }
}

@Composable
private fun StatValue(label: String, value: String) {
    Column {
        Text(text = label, fontSize = 9.sp, color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.5f))
        Text(text = value, fontSize = 13.sp, fontWeight = FontWeight.Black)
    }
}

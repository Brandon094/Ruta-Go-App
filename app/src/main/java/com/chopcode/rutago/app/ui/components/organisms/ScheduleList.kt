package com.chopcode.rutago.app.ui.components.organisms

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.chopcode.rutago.app.R
import com.chopcode.rutago.app.models.Schedule
import com.chopcode.rutago.app.ui.components.molecules.ScheduleItem
import com.chopcode.rutago.app.ui.theme.RutaGoOrange

/**
 * 🧬 ORGANISM: ScheduleList
 * Lista de horarios con estados de carga y vacío.
 */
@Composable
fun ScheduleList(
    schedules: List<Schedule>,
    isLoading: Boolean,
    onReserveClick: (Schedule) -> Unit,
    modifier: Modifier = Modifier
) {
    if (isLoading) {
        Box(
            modifier = modifier.fillMaxWidth().height(200.dp),
            contentAlignment = Alignment.Center
        ) {
            CircularProgressIndicator(color = RutaGoOrange)
        }
    } else if (schedules.isEmpty()) {
        Column(
            modifier = modifier.fillMaxWidth().padding(24.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            Icon(
                painter = painterResource(R.drawable.ic_time),
                contentDescription = null,
                tint = RutaGoOrange,
                modifier = Modifier.size(64.dp)
            )
            Spacer(modifier = Modifier.height(16.dp))
            Text(
                text = stringResource(R.string.titulo_jornada_completada),
                color = RutaGoOrange,
                fontSize = 18.sp,
                fontWeight = FontWeight.Bold,
                textAlign = TextAlign.Center
            )
            Text(
                text = stringResource(R.string.desc_jornada_completada),
                color = Color.White.copy(alpha = 0.6f),
                fontSize = 14.sp,
                textAlign = TextAlign.Center
            )
        }
    } else {
        // Usamos Column en lugar de LazyColumn aquí porque la pantalla ya tiene un verticalScroll
        // Para evitar problemas de scroll anidado, si la lista es corta. 
        // Pero si es larga, es mejor usar un Modifier.heightIn o similar.
        // Por simplicidad en este Dashboard, lo pondremos directo en la Column del Screen.
        Column(
            modifier = modifier.fillMaxWidth(),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            schedules.forEach { schedule ->
                ScheduleItem(
                    schedule = schedule,
                    onReserveClick = onReserveClick
                )
            }
        }
    }
}

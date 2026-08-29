package com.chopcode.rutago.app.ui.components.organisms

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ExpandLess
import androidx.compose.material.icons.filled.ExpandMore
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.chopcode.rutago.app.R
import com.chopcode.rutago.app.ui.components.molecules.StatItem
import com.chopcode.rutago.app.ui.theme.RutaGoOrange

/**
 * 🧬 ORGANISM: StatsCard
 * Tarjeta de estadísticas con 3 indicadores y leyenda expandible.
 */
@Composable
fun StatsCard(
    confirmed: Int,
    cancelled: Int,
    total: Int,
    isExpanded: Boolean,
    onExpandClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    Card(
        modifier = modifier,
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface), 
        elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
    ) {
        Column(modifier = Modifier.padding(vertical = 12.dp)) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 12.dp),
                horizontalArrangement = Arrangement.SpaceEvenly
            ) {
                StatItem(
                    icon = painterResource(R.drawable.ic_check),
                    value = confirmed.toString(),
                    label = stringResource(R.string.confirmadas),
                    iconColor = MaterialTheme.colorScheme.primary,
                    modifier = Modifier.weight(1f)
                )
                StatItem(
                    icon = painterResource(R.drawable.ic_cancel),
                    value = cancelled.toString(),
                    label = stringResource(R.string.canceladas),
                    iconColor = MaterialTheme.colorScheme.error,
                    modifier = Modifier.weight(1f)
                )
                StatItem(
                    icon = painterResource(R.drawable.ic_checklist),
                    value = total.toString(),
                    label = stringResource(R.string.total),
                    iconColor = com.chopcode.rutago.app.ui.theme.SuccessGreen,
                    modifier = Modifier.weight(1f)
                )
            }

            Divider(
                modifier = Modifier.padding(top = 8.dp),
                color = MaterialTheme.colorScheme.outline.copy(alpha = 0.1f)
            )

            // Header de Leyenda
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .clickable { onExpandClick() }
                    .padding(horizontal = 16.dp, vertical = 12.dp),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Text(
                    text = stringResource(R.string.contador_leyenda),
                    color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.6f),
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Bold
                )
                Icon(
                    imageVector = if (isExpanded) Icons.Default.ExpandLess else Icons.Default.ExpandMore,
                    contentDescription = null,
                    tint = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.6f),
                    modifier = Modifier.size(20.dp)
                )
            }

            AnimatedVisibility(visible = isExpanded) {
                Column(
                    modifier = Modifier
                        .padding(horizontal = 16.dp)
                        .padding(bottom = 12.dp)
                ) {
                    LegendItem(MaterialTheme.colorScheme.primary, stringResource(R.string.leyenda_confirmadas_titulo), stringResource(R.string.leyenda_confirmadas_desc))
                    LegendItem(MaterialTheme.colorScheme.error, stringResource(R.string.leyenda_canceladas_titulo), stringResource(R.string.leyenda_canceladas_desc))
                    LegendItem(com.chopcode.rutago.app.ui.theme.SuccessGreen, stringResource(R.string.leyenda_total_titulo), stringResource(R.string.leyenda_total_desc))
                }
            }
        }
    }
}

@Composable
private fun LegendItem(color: Color, title: String, desc: String) {
    Row(
        verticalAlignment = Alignment.CenterVertically,
        modifier = Modifier.padding(vertical = 4.dp)
    ) {
        Box(
            modifier = Modifier
                .size(10.dp)
                .background(color, CircleShape)
        )
        Text(
            text = title,
            color = MaterialTheme.colorScheme.onSurface,
            fontSize = 12.sp,
            fontWeight = FontWeight.Bold,
            modifier = Modifier.padding(horizontal = 8.dp)
        )
        Text(
            text = desc,
            color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.6f),
            fontSize = 12.sp
        )
    }
}

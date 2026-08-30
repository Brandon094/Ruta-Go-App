package com.chopcode.rutago.app.ui.components.molecules

import androidx.compose.foundation.layout.*
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

/**
 * 🧪 MOLECULE: SeatLegend
 * Leyenda explicativa de los estados de los asientos (Paridad con Java/XML).
 */
@Composable
fun SeatLegend(
    modifier: Modifier = Modifier
) {
    Row(
        modifier = modifier
            .fillMaxWidth()
            .padding(vertical = 24.dp),
        horizontalArrangement = Arrangement.SpaceEvenly,
        verticalAlignment = Alignment.CenterVertically
    ) {
        LegendItem(label = "Libre", isOccupied = false, isSelected = false)
        LegendItem(label = "Tuyo", isOccupied = false, isSelected = true)
        LegendItem(label = "Ocupado", isOccupied = true, isSelected = false)
    }
}

@Composable
private fun LegendItem(
    label: String,
    isOccupied: Boolean,
    isSelected: Boolean
) {
    Row(verticalAlignment = Alignment.CenterVertically) {
        SeatItem(
            number = null,
            isOccupied = isOccupied,
            isSelected = isSelected,
            onClick = {},
            modifier = Modifier.size(36.dp)
        )
        Spacer(modifier = Modifier.width(8.dp))
        Text(
            text = label,
            fontSize = 12.sp,
            fontWeight = FontWeight.Medium,
            color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.6f)
        )
    }
}

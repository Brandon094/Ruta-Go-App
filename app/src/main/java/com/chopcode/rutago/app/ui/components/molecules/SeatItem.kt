package com.chopcode.rutago.app.ui.components.molecules

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.EventSeat
import androidx.compose.material.icons.filled.RadioButtonChecked
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.chopcode.rutago.app.ui.theme.RutaGoNavy
import com.chopcode.rutago.app.ui.theme.RutaGoOrange

/**
 * 🧪 MOLECULE: SeatItem
 * Representación visual premium de un asiento basada en los colores de Ruta-Go.
 */
@Composable
fun SeatItem(
    number: Int?,
    isOccupied: Boolean,
    isSelected: Boolean,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    isDriver: Boolean = false
) {
    // 🎨 Paleta de Colores Inteligente (Theme Aware)
    val backgroundColor = when {
        isDriver -> MaterialTheme.colorScheme.onSurface.copy(alpha = 0.03f)
        isOccupied -> MaterialTheme.colorScheme.error.copy(alpha = 0.08f)
        isSelected -> RutaGoOrange
        else -> MaterialTheme.colorScheme.secondary.copy(alpha = 0.08f)
    }

    val contentColor = when {
        isDriver -> MaterialTheme.colorScheme.onSurface.copy(alpha = 0.15f)
        isOccupied -> MaterialTheme.colorScheme.error.copy(alpha = 0.5f)
        isSelected -> Color.White
        else -> MaterialTheme.colorScheme.secondary.copy(alpha = 0.8f)
    }

    val borderColor = when {
        isDriver -> MaterialTheme.colorScheme.onSurface.copy(alpha = 0.1f)
        isOccupied -> MaterialTheme.colorScheme.error.copy(alpha = 0.2f)
        isSelected -> RutaGoOrange
        else -> MaterialTheme.colorScheme.secondary.copy(alpha = 0.2f)
    }

    Box(
        modifier = modifier
            .size(46.dp)
            .padding(4.dp)
            .clip(RoundedCornerShape(10.dp))
            .background(backgroundColor)
            .then(
                if (isDriver || isOccupied) Modifier 
                else Modifier.clickable { onClick() }
            )
            .border(1.dp, borderColor, RoundedCornerShape(10.dp)),
        contentAlignment = Alignment.Center
    ) {
        if (isDriver) {
            Box(contentAlignment = Alignment.Center) {
                // Silla del conductor (Sutil)
                Icon(
                    imageVector = Icons.Default.EventSeat,
                    contentDescription = "Silla Conductor",
                    tint = contentColor.copy(alpha = 0.15f),
                    modifier = Modifier.size(24.dp)
                )
                // Volante superpuesto (Más contrastado para visibilidad)
                Icon(
                    imageVector = Icons.Default.RadioButtonChecked,
                    contentDescription = "Volante",
                    tint = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.4f),
                    modifier = Modifier.size(16.dp).padding(bottom = 2.dp)
                )
            }
        } else {
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Icon(
                    imageVector = Icons.Default.EventSeat,
                    contentDescription = null,
                    tint = contentColor,
                    modifier = Modifier.size(16.dp)
                )
                if (number != null) {
                    Text(
                        text = number.toString(),
                        color = contentColor,
                        fontSize = 9.sp,
                        fontWeight = FontWeight.ExtraBold
                    )
                }
            }
        }
    }
}

package com.chopcode.rutago.app.ui.components.atoms

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

/**
 * ⚛️ ATOM: StatusBadge
 * Etiqueta de estado del usuario (ej: Pasajero Activo).
 */
@Composable
fun StatusBadge(
    text: String,
    backgroundColor: Color = MaterialTheme.colorScheme.primary.copy(alpha = 0.2f),
    textColor: Color = MaterialTheme.colorScheme.primary
) {
    Text(
        text = text.uppercase(),
        color = textColor,
        fontSize = 10.sp,
        fontWeight = FontWeight.Bold,
        modifier = Modifier
            .background(backgroundColor, RoundedCornerShape(12.dp))
            .padding(horizontal = 12.dp, vertical = 4.dp)
    )
}

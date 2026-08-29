package com.chopcode.rutago.app.ui.components.atoms

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import com.chopcode.rutago.app.ui.theme.RutaGoOrange

/**
 * ⚛️ ATOM: PagerIndicator
 * Puntos indicadores para el scroll horizontal.
 */
@Composable
fun PagerIndicator(
    count: Int,
    currentPage: Int,
    modifier: Modifier = Modifier,
    activeColor: Color = RutaGoOrange,
    inactiveColor: Color = Color.White.copy(alpha = 0.3f)
) {
    Row(
        modifier = modifier,
        horizontalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        repeat(count) { iteration ->
            val color = if (currentPage == iteration) activeColor else inactiveColor
            val width = if (currentPage == iteration) 24.dp else 8.dp
            
            Box(
                modifier = Modifier
                    .height(8.dp)
                    .width(width)
                    .clip(CircleShape)
                    .background(color)
            )
        }
    }
}

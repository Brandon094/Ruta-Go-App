package com.chopcode.rutago.app.ui.components.atoms

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.size
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Star
import androidx.compose.material.icons.filled.StarOutline
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import com.chopcode.rutago.app.ui.theme.WarningYellow

/**
 * ⚛️ ATOM: RatingStars
 * Visualización de estrellas para calificación.
 */
@Composable
fun RatingStars(
    rating: Float,
    modifier: Modifier = Modifier,
    maxStars: Int = 5,
    starSize: Dp = 18.dp,
    isEditable: Boolean = false,
    onRatingChange: (Float) -> Unit = {}
) {
    Row(modifier = modifier) {
        for (i in 1..maxStars) {
            val isSelected = i <= rating
            val icon = if (isSelected) Icons.Default.Star else Icons.Default.StarOutline
            val tint = if (isSelected) WarningYellow else MaterialTheme.colorScheme.outline.copy(alpha = 0.5f)
            
            Icon(
                imageVector = icon,
                contentDescription = null,
                tint = tint,
                modifier = Modifier
                    .size(starSize)
                    .then(
                        if (isEditable) Modifier.clickable { onRatingChange(i.toFloat()) }
                        else Modifier
                    )
            )
        }
    }
}

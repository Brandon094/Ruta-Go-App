package com.chopcode.rutago.app.ui.components.molecules

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.chopcode.rutago.app.ui.theme.RutaGoOrange

/**
 * 🧪 MOLECULE: AuthFooter
 * Texto en la parte inferior para navegar entre Login y Registro.
 */
@Composable
fun AuthFooter(
    message: String,
    actionText: String,
    onActionClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    Column(
        modifier = modifier.fillMaxWidth(),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = message,
            color = Color.White.copy(alpha = 0.7f),
            fontSize = 15.sp
        )
        Text(
            text = actionText,
            color = RutaGoOrange,
            fontSize = 15.sp,
            fontWeight = FontWeight.Bold,
            modifier = Modifier
                .clickable { onActionClick() }
                .padding(4.dp)
        )
    }
}

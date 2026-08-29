package com.chopcode.rutago.app.ui.components.molecules

import androidx.compose.foundation.layout.*
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.chopcode.rutago.app.R
import com.chopcode.rutago.app.ui.components.atoms.StatusBadge
import com.chopcode.rutago.app.ui.components.atoms.UserAvatar

/**
 * 🧪 MOLECULE: WelcomeHeader
 * Encabezado con avatar, bienvenida y nombre del usuario.
 */
@Composable
fun WelcomeHeader(
    userName: String,
    avatarUrl: String?,
    status: String,
    modifier: Modifier = Modifier
) {
    Row(
        modifier = modifier.fillMaxWidth(),
        verticalAlignment = Alignment.CenterVertically
    ) {
        UserAvatar(url = avatarUrl)
        
        Spacer(modifier = Modifier.width(16.dp))
        
        Column(modifier = Modifier.weight(1f)) {
            Text(
                text = stringResource(R.string.bienvenida),
                color = MaterialTheme.colorScheme.onBackground.copy(alpha = 0.8f),
                fontSize = 13.sp
            )
            Text(
                text = if (userName.isEmpty()) stringResource(R.string.cargando) else userName,
                color = MaterialTheme.colorScheme.onBackground,
                fontSize = 20.sp,
                fontWeight = FontWeight.Bold,
                maxLines = 1
            )
        }
        
        StatusBadge(text = status)
    }
}

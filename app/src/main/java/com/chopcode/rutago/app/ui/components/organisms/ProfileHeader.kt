package com.chopcode.rutago.app.ui.components.organisms

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AddAPhoto
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.chopcode.rutago.app.ui.components.atoms.StatusBadge
import com.chopcode.rutago.app.ui.components.atoms.UserAvatar

/**
 * 🧬 ORGANISM: ProfileHeader
 * Encabezado premium del perfil con avatar editable y nombre.
 */
@Composable
fun ProfileHeader(
    name: String,
    avatarUrl: String?,
    status: String,
    onAvatarClick: () -> Unit,
    onStatusClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    Box(
        modifier = modifier
            .fillMaxWidth()
            .height(310.dp)
    ) {
        // Background
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(270.dp)
                .background(MaterialTheme.colorScheme.primary)
        )

        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(top = 40.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            // Avatar con botón de cambio
            Box(contentAlignment = Alignment.BottomEnd) {
                UserAvatar(
                    url = avatarUrl,
                    size = 150.dp,
                    borderColor = Color.White
                )
                
                Surface(
                    onClick = onAvatarClick,
                    modifier = Modifier.size(36.dp),
                    shape = CircleShape,
                    color = MaterialTheme.colorScheme.secondary,
                    tonalElevation = 4.dp,
                    border = androidx.compose.foundation.BorderStroke(1.5.dp, Color.White)
                ) {
                    Box(contentAlignment = Alignment.Center) {
                        Icon(
                            imageVector = Icons.Default.AddAPhoto,
                            contentDescription = "Cambiar foto",
                            tint = Color.White,
                            modifier = Modifier.size(18.dp)
                        )
                    }
                }
            }

            Spacer(modifier = Modifier.height(12.dp))

            Text(
                text = name,
                color = Color.White,
                fontSize = 22.sp,
                fontWeight = FontWeight.Bold,
                modifier = Modifier.padding(horizontal = 24.dp)
            )

            Spacer(modifier = Modifier.height(8.dp))

            Box(modifier = Modifier.clickable { onStatusClick() }) {
                StatusBadge(text = status)
            }
        }
    }
}

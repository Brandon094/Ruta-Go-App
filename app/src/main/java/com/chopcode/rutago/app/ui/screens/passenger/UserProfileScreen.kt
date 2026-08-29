package com.chopcode.rutago.app.ui.screens.passenger

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Edit
import androidx.compose.material.icons.filled.Email
import androidx.compose.material.icons.filled.Phone
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.chopcode.rutago.app.ui.components.molecules.DeleteAccountDialog
import com.chopcode.rutago.app.ui.components.molecules.LogoutDialog
import com.chopcode.rutago.app.ui.components.molecules.ProfileInfoRow
import com.chopcode.rutago.app.ui.components.molecules.RutaGoBottomBar
import com.chopcode.rutago.app.ui.components.organisms.ProfileHeader
import com.chopcode.rutago.app.ui.components.organisms.ProfileStatsCard
import com.chopcode.rutago.app.ui.theme.RutaGoTheme
import com.chopcode.rutago.app.ui.viewmodels.passenger.UserProfileUiState

/**
 * 📱 SCREEN: UserProfileScreen
 * Pantalla de perfil del pasajero con información personal y estadísticas.
 */
@Composable
fun UserProfileScreen(
    uiState: UserProfileUiState,
    onAvatarClick: () -> Unit,
    onStatusClick: () -> Unit,
    onEditProfileClick: () -> Unit,
    onDeleteAccountClick: () -> Unit,
    onCancelDeletionClick: () -> Unit,
    onNavigate: (String) -> Unit,
    onLogoutConfirm: () -> Unit,
    onLogoutDismiss: () -> Unit,
    onDeleteConfirm: () -> Unit,
    onDeleteDismiss: () -> Unit
) {
    if (uiState.showLogoutDialog) {
        LogoutDialog(
            onConfirm = onLogoutConfirm,
            onDismiss = onLogoutDismiss
        )
    }

    if (uiState.showDeleteConfirmation) {
        DeleteAccountDialog(
            onConfirm = onDeleteConfirm,
            onDismiss = onDeleteDismiss
        )
    }

    Scaffold(
        bottomBar = {
            RutaGoBottomBar(
                currentRoute = "profile",
                onNavigate = onNavigate
            )
        },
        containerColor = MaterialTheme.colorScheme.background
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
                .verticalScroll(rememberScrollState())
        ) {
            // 1. Header (Avatar + Name)
            ProfileHeader(
                name = uiState.user?.nombre ?: "Usuario Ruta-Go",
                avatarUrl = uiState.user?.photoUrl,
                status = if (uiState.user?.status == "active") "Pasajero Activo" else "Inactivo",
                onAvatarClick = onAvatarClick,
                onStatusClick = onStatusClick
            )

            Column(
                modifier = Modifier
                    .padding(horizontal = 20.dp)
                    .offset(y = (-40).dp) // Superponer ligeramente sobre el header
            ) {
                // 2. Info Personal Card
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(20.dp),
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                    elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
                ) {
                    Column(modifier = Modifier.padding(20.dp)) {
                        Text(
                            text = "Información Personal",
                            color = MaterialTheme.colorScheme.primary,
                            fontSize = 16.sp,
                            fontWeight = FontWeight.Bold,
                            modifier = Modifier.padding(bottom = 12.dp)
                        )

                        ProfileInfoRow(
                            icon = Icons.Default.Email,
                            label = "Email",
                            value = uiState.user?.email ?: "correo@ejemplo.com"
                        )

                        ProfileInfoRow(
                            icon = Icons.Default.Phone,
                            label = "Teléfono",
                            value = uiState.user?.telefono ?: "+57 000 000 0000"
                        )

                        Spacer(modifier = Modifier.height(12.dp))

                        OutlinedButton(
                            onClick = onEditProfileClick,
                            modifier = Modifier.fillMaxWidth(),
                            shape = RoundedCornerShape(12.dp)
                        ) {
                            Icon(Icons.Default.Edit, contentDescription = null, modifier = Modifier.size(18.dp))
                            Spacer(modifier = Modifier.width(8.dp))
                            Text("Editar Perfil")
                        }
                    }
                }

                Spacer(modifier = Modifier.height(16.dp))

                // 3. Premium Stats Card
                ProfileStatsCard(
                    totalSpent = uiState.totalSpent,
                    loyaltyPoints = uiState.loyaltyPoints,
                    favoriteRoute = uiState.favoriteRoute,
                    isLoading = uiState.isStatsLoading
                )

                Spacer(modifier = Modifier.height(24.dp))

                // 4. Action Buttons
                if (uiState.user?.isSolicitudBorrado == true) {
                    Button(
                        onClick = onCancelDeletionClick,
                        modifier = Modifier.fillMaxWidth().height(52.dp),
                        colors = ButtonDefaults.buttonColors(containerColor = com.chopcode.rutago.app.ui.theme.SuccessGreen),
                        shape = RoundedCornerShape(12.dp)
                    ) {
                        Text("Cancelar solicitud de borrado", color = Color.White)
                    }
                }

                TextButton(
                    onClick = onDeleteAccountClick,
                    modifier = Modifier.align(Alignment.CenterHorizontally)
                ) {
                    Text(
                        text = "Solicitar borrar cuenta",
                        color = MaterialTheme.colorScheme.error,
                        fontSize = 13.sp
                    )
                }
                
                Spacer(modifier = Modifier.height(24.dp))
            }
        }
    }
}

@Preview(showBackground = true)
@Composable
fun UserProfileScreenPreview() {
    RutaGoTheme {
        UserProfileScreen(
            uiState = UserProfileUiState(
                isLoading = false,
                user = com.chopcode.rutago.app.models.User().apply {
                    nombre = "Brandon ChopCode"
                    email = "brandon@chopcode.com"
                    telefono = "+57 322 123 4567"
                    status = "active"
                },
                totalSpent = "$120.000",
                loyaltyPoints = "150 pts",
                favoriteRoute = "Natagá -> La Plata"
            ),
            onAvatarClick = {},
            onStatusClick = {},
            onEditProfileClick = {},
            onDeleteAccountClick = {},
            onCancelDeletionClick = {},
            onNavigate = {},
            onLogoutConfirm = {},
            onLogoutDismiss = {},
            onDeleteConfirm = {},
            onDeleteDismiss = {}
        )
    }
}

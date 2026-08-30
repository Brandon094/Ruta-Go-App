package com.chopcode.rutago.app.ui.screens.common

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.chopcode.rutago.app.R
import com.chopcode.rutago.app.ui.components.molecules.*
import com.chopcode.rutago.app.ui.components.organisms.ProfileHeader
import com.chopcode.rutago.app.ui.components.organisms.ProfileStatsCard
import com.chopcode.rutago.app.ui.theme.RutaGoTheme
import com.chopcode.rutago.app.ui.viewmodels.profile.UserProfileUiState

/**
 * 📱 SCREEN: ProfileScreen (Unified)
 * Pantalla de perfil adaptable por rol (Pasajero/Conductor).
 */
@Composable
fun ProfileScreen(
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
    onDeleteDismiss: () -> Unit,
    onTutorialDismiss: () -> Unit
) {
    if (uiState.showTutorial) {
        TutorialDialog(
            title = stringResource(R.string.tut_profile_title),
            message = stringResource(R.string.tut_profile_msg),
            iconRes = R.drawable.ic_driver,
            onUnderstandClick = onTutorialDismiss
        )
    }

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
                status = when (uiState.role) {
                    "conductor" -> "Conductor Activo"
                    "dueño" -> "Propietario"
                    else -> if (uiState.user?.status == "active") "Pasajero Activo" else "Inactivo"
                },
                onAvatarClick = onAvatarClick,
                onStatusClick = onStatusClick
            )

            Column(
                modifier = Modifier
                    .padding(horizontal = 20.dp)
                    .offset(y = (-40).dp) 
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
                            value = uiState.user?.email ?: "N/A"
                        )

                        ProfileInfoRow(
                            icon = Icons.Default.Phone,
                            label = "Teléfono",
                            value = uiState.user?.telefono ?: "N/A"
                        )
                        
                        if (uiState.role == "conductor") {
                            Divider(modifier = Modifier.padding(vertical = 12.dp), color = MaterialTheme.colorScheme.outline.copy(alpha = 0.05f))
                            ProfileInfoRow(
                                icon = Icons.Default.DirectionsCar,
                                label = "Vehículo",
                                value = "${uiState.vehiclePlate} (${uiState.vehicleModel})"
                            )
                        }

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

                // 3. Stats Card (Solo para Pasajeros por ahora, Conductores tienen dashboard)
                if (uiState.role == "usuario") {
                    ProfileStatsCard(
                        totalSpent = uiState.totalSpent,
                        loyaltyPoints = uiState.loyaltyPoints,
                        favoriteRoute = uiState.favoriteRoute,
                        isLoading = uiState.isStatsLoading
                    )
                    Spacer(modifier = Modifier.height(24.dp))
                }

                // 4. Action Buttons
                if (uiState.user?.solicitudBorrado == true) {
                    Button(
                        onClick = onCancelDeletionClick,
                        modifier = Modifier.fillMaxWidth().height(52.dp),
                        colors = ButtonDefaults.buttonColors(containerColor = com.chopcode.rutago.app.ui.theme.SuccessGreen),
                        shape = RoundedCornerShape(12.dp)
                    ) {
                        Text("CANCELAR SOLICITUD DE BORRADO", color = Color.White)
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
fun ProfileScreenPreview() {
    RutaGoTheme {
        ProfileScreen(
            uiState = UserProfileUiState(
                isLoading = false,
                role = "conductor",
                user = com.chopcode.rutago.app.models.User().apply {
                    nombre = "Liye Daza"
                    email = "liyedaza@gmail.com"
                    status = "active"
                },
                vehiclePlate = "TBO550",
                vehicleModel = "Frontier"
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
            onDeleteDismiss = {},
            onTutorialDismiss = {}
        )
    }
}

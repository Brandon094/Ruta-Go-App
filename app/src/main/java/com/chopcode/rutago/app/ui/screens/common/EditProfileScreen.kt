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
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.chopcode.rutago.app.ui.components.atoms.RutaGoButton
import com.chopcode.rutago.app.ui.components.atoms.RutaGoTextField
import com.chopcode.rutago.app.ui.theme.RutaGoTheme
import com.chopcode.rutago.app.ui.viewmodels.profile.EditProfileUiState

/**
 * 📱 SCREEN: EditProfileScreen (Unified)
 * Formulario de actualización de datos adaptable por rol.
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun EditProfileScreen(
    uiState: EditProfileUiState,
    onNameChange: (String) -> Unit,
    onPhoneChange: (String) -> Unit,
    onPlateChange: (String) -> Unit,
    onModelChange: (String) -> Unit,
    onSaveClick: () -> Unit,
    onBackClick: () -> Unit
) {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Editar Perfil") },
                navigationIcon = {
                    IconButton(onClick = onBackClick) {
                        Icon(imageVector = Icons.Default.ArrowBack, contentDescription = "Back")
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MaterialTheme.colorScheme.primary,
                    titleContentColor = Color.White,
                    navigationIconContentColor = Color.White
                )
            )
        },
        containerColor = MaterialTheme.colorScheme.background
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
                .verticalScroll(rememberScrollState())
                .padding(24.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            // 1. Info Actual Card
            CurrentInfoCard(uiState)

            Spacer(modifier = Modifier.height(24.dp))

            // 2. Form Card
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
            ) {
                Column(modifier = Modifier.padding(20.dp)) {
                    Text(
                        text = "Nuevos datos",
                        color = MaterialTheme.colorScheme.primary,
                        fontSize = 16.sp,
                        fontWeight = FontWeight.Bold,
                        modifier = Modifier.padding(bottom = 20.dp)
                    )

                    RutaGoTextField(
                        value = uiState.name,
                        onValueChange = onNameChange,
                        label = "Nombre completo",
                        leadingIcon = { Icon(Icons.Default.Person, contentDescription = null, tint = MaterialTheme.colorScheme.primary) },
                        modifier = Modifier.padding(bottom = 16.dp)
                    )

                    RutaGoTextField(
                        value = uiState.phone,
                        onValueChange = onPhoneChange,
                        label = "Número de teléfono",
                        leadingIcon = { Icon(Icons.Default.Phone, contentDescription = null, tint = MaterialTheme.colorScheme.primary) },
                        modifier = Modifier.padding(bottom = 16.dp)
                    )
                    
                    if (uiState.role != "usuario") {
                        RutaGoTextField(
                            value = uiState.vehiclePlate,
                            onValueChange = onPlateChange,
                            label = "Placa del vehículo",
                            leadingIcon = { Icon(Icons.Default.DirectionsCar, contentDescription = null, tint = MaterialTheme.colorScheme.primary) },
                            modifier = Modifier.padding(bottom = 16.dp)
                        )
                        RutaGoTextField(
                            value = uiState.vehicleModel,
                            onValueChange = onModelChange,
                            label = "Modelo/Línea",
                            leadingIcon = { Icon(Icons.Default.Badge, contentDescription = null, tint = MaterialTheme.colorScheme.primary) },
                            modifier = Modifier.padding(bottom = 16.dp)
                        )
                    }

                    Text(
                        text = "El correo electrónico no se puede modificar por seguridad.",
                        fontSize = 12.sp,
                        color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.5f),
                        modifier = Modifier.fillMaxWidth(),
                        lineHeight = 16.sp
                    )
                }
            }

            Spacer(modifier = Modifier.height(32.dp))

            // 3. Buttons
            RutaGoButton(
                text = if (uiState.isLoading) "Guardando..." else "Guardar Cambios",
                onClick = onSaveClick,
                enabled = uiState.isFormValid && !uiState.isLoading,
                modifier = Modifier.fillMaxWidth()
            )

            Spacer(modifier = Modifier.height(12.dp))

            OutlinedButton(
                onClick = onBackClick,
                modifier = Modifier.fillMaxWidth().height(56.dp),
                shape = RoundedCornerShape(12.dp)
            ) {
                Text("Cancelar")
            }
            
            if (uiState.error != null) {
                Text(
                    text = uiState.error,
                    color = MaterialTheme.colorScheme.error,
                    modifier = Modifier.padding(top = 16.dp)
                )
            }
        }
    }
}

@Composable
private fun CurrentInfoCard(uiState: EditProfileUiState) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        elevation = CardDefaults.cardElevation(defaultElevation = 1.dp)
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(
                text = "Información actual",
                color = MaterialTheme.colorScheme.primary,
                fontSize = 14.sp,
                fontWeight = FontWeight.Bold,
                modifier = Modifier.padding(bottom = 12.dp)
            )
            
            InfoRow(icon = Icons.Default.Person, text = uiState.currentName)
            InfoRow(icon = Icons.Default.Phone, text = uiState.currentPhone)
            InfoRow(icon = Icons.Default.Email, text = uiState.currentEmail)
            
            if (uiState.role != "usuario" && uiState.currentPlate.isNotEmpty()) {
                Divider(modifier = Modifier.padding(vertical = 8.dp), color = MaterialTheme.colorScheme.outline.copy(alpha = 0.05f))
                InfoRow(icon = Icons.Default.DirectionsCar, text = "${uiState.currentPlate} (${uiState.currentModel})")
            }
        }
    }
}

@Composable
private fun InfoRow(icon: androidx.compose.ui.graphics.vector.ImageVector, text: String) {
    Row(
        modifier = Modifier.padding(vertical = 4.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Icon(
            imageVector = icon,
            contentDescription = null,
            tint = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.4f),
            modifier = Modifier.size(18.dp)
        )
        Spacer(modifier = Modifier.width(12.dp))
        Text(
            text = text,
            fontSize = 13.sp,
            color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.7f)
        )
    }
}

@Preview(showBackground = true)
@Composable
fun EditProfileScreenPreview() {
    RutaGoTheme {
        EditProfileScreen(
            uiState = EditProfileUiState(
                currentName = "Brandon Daza",
                currentPhone = "+57 322 282 4941",
                currentEmail = "dazace94@gmail.com",
                role = "conductor",
                currentPlate = "TBO550",
                currentModel = "Frontier"
            ),
            onNameChange = {},
            onPhoneChange = {},
            onPlateChange = {},
            onModelChange = {},
            onSaveClick = {},
            onBackClick = {}
        )
    }
}

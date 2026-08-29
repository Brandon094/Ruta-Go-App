package com.chopcode.rutago.app.ui.screens.auth

import androidx.compose.animation.Crossfade
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.chopcode.rutago.app.R
import com.chopcode.rutago.app.ui.components.atoms.RutaGoButton
import com.chopcode.rutago.app.ui.components.atoms.RutaGoTextField
import com.chopcode.rutago.app.ui.components.molecules.AuthHeader
import com.chopcode.rutago.app.ui.components.organisms.AuthCard
import com.chopcode.rutago.app.ui.theme.RutaGoNavyDark
import com.chopcode.rutago.app.ui.theme.RutaGoTheme
import com.chopcode.rutago.app.ui.theme.SuccessGreen
import com.chopcode.rutago.app.ui.viewmodels.auth.ForgotPasswordUiState

/**
 * 📱 SCREEN: ForgotPasswordScreen
 * Flujo premium de recuperación de cuenta.
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ForgotPasswordScreen(
    uiState: ForgotPasswordUiState,
    onEmailChange: (String) -> Unit,
    onRecoverClick: () -> Unit,
    onBackClick: () -> Unit,
    onUnderstoodClick: () -> Unit
) {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(if (uiState.isSuccess) stringResource(R.string.todo_listo) else stringResource(R.string.recuperar_contrasena_title)) },
                navigationIcon = {
                    IconButton(onClick = onBackClick) {
                        Icon(imageVector = Icons.Default.ArrowBack, contentDescription = "Back")
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MaterialTheme.colorScheme.background,
                    titleContentColor = MaterialTheme.colorScheme.onBackground,
                    navigationIconContentColor = MaterialTheme.colorScheme.onBackground
                )
            )
        },
        containerColor = MaterialTheme.colorScheme.background
    ) { padding ->
        Crossfade(targetState = uiState.isSuccess, label = "ScreenState") { success ->
            if (success) {
                SuccessContent(padding, onUnderstoodClick)
            } else {
                RecoveryForm(
                    padding = padding,
                    email = uiState.email,
                    onEmailChange = onEmailChange,
                    onRecoverClick = onRecoverClick,
                    isLoading = uiState.isLoading,
                    error = uiState.error,
                    isFormValid = uiState.isFormValid,
                    emailError = uiState.emailError
                )
            }
        }
    }
}

@Composable
private fun RecoveryForm(
    padding: PaddingValues,
    email: String,
    onEmailChange: (String) -> Unit,
    onRecoverClick: () -> Unit,
    isLoading: Boolean,
    error: String?,
    isFormValid: Boolean,
    emailError: String?
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(padding)
            .padding(24.dp)
            .verticalScroll(rememberScrollState()),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        AuthHeader(
            title = stringResource(R.string.recuperar_contrasena_title),
            subtitle = stringResource(R.string.instrucciones_recuperar),
            modifier = Modifier.padding(bottom = 24.dp)
        )

        AuthCard {
            RutaGoTextField(
                value = email,
                onValueChange = onEmailChange,
                label = stringResource(R.string.correo),
                placeholder = "ejemplo@correo.com",
                isError = emailError != null || error != null,
                errorMessage = emailError,
                modifier = Modifier.padding(bottom = 24.dp)
            )

            if (error != null) {
                Text(
                    text = error,
                    color = MaterialTheme.colorScheme.error,
                    fontSize = 12.sp,
                    modifier = Modifier.padding(bottom = 16.dp)
                )
            }

            RutaGoButton(
                text = if (isLoading) stringResource(R.string.cargando) else stringResource(R.string.enviar_instrucciones),
                onClick = onRecoverClick,
                modifier = Modifier.fillMaxWidth(),
                enabled = isFormValid && !isLoading
            )
        }
    }
}

@Composable
private fun SuccessContent(
    padding: PaddingValues,
    onUnderstoodClick: () -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(padding)
            .padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        AuthCard {
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                modifier = Modifier.fillMaxWidth()
            ) {
                Icon(
                    imageVector = Icons.Default.CheckCircle,
                    contentDescription = null,
                    tint = SuccessGreen,
                    modifier = Modifier.size(80.dp)
                )

                Spacer(modifier = Modifier.height(24.dp))

                Text(
                    text = stringResource(R.string.correo_enviado),
                    color = MaterialTheme.colorScheme.onSurface,
                    fontSize = 22.sp,
                    fontWeight = FontWeight.Bold,
                    textAlign = TextAlign.Center
                )

                Spacer(modifier = Modifier.height(12.dp))

                Text(
                    text = stringResource(R.string.correo_enviado_detalle),
                    color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.7f),
                    fontSize = 14.sp,
                    textAlign = TextAlign.Center
                )

                Spacer(modifier = Modifier.height(32.dp))

                RutaGoButton(
                    text = "ENTENDIDO",
                    onClick = onUnderstoodClick
                )
            }
        }
    }
}

@Preview(showBackground = true)
@Composable
fun ForgotPasswordScreenPreview() {
    RutaGoTheme {
        ForgotPasswordScreen(
            uiState = ForgotPasswordUiState(),
            onEmailChange = {},
            onRecoverClick = {},
            onBackClick = {},
            onUnderstoodClick = {}
        )
    }
}

@Preview(showBackground = true)
@Composable
fun ForgotPasswordSuccessPreview() {
    RutaGoTheme {
        ForgotPasswordScreen(
            uiState = ForgotPasswordUiState(isSuccess = true),
            onEmailChange = {},
            onRecoverClick = {},
            onBackClick = {},
            onUnderstoodClick = {}
        )
    }
}

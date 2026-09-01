package com.chopcode.rutago.app.ui.screens.auth

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ErrorOutline
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.chopcode.rutago.app.R
import com.chopcode.rutago.app.ui.components.atoms.GoogleButton
import com.chopcode.rutago.app.ui.components.atoms.RutaGoButton
import com.chopcode.rutago.app.ui.components.atoms.RutaGoTextField
import com.chopcode.rutago.app.ui.components.molecules.AuthFooter
import com.chopcode.rutago.app.ui.components.molecules.AuthHeader
import com.chopcode.rutago.app.ui.components.organisms.AuthCard
import com.chopcode.rutago.app.ui.theme.RutaGoTheme
import com.chopcode.rutago.app.ui.viewmodels.auth.LoginUiState

/**
 * 📱 SCREEN: LoginScreen
 * Versión Premium de la pantalla de inicio de sesión en Jetpack Compose con feedback mejorado.
 */
@Composable
fun LoginScreen(
    uiState: LoginUiState,
    onEmailChange: (String) -> Unit,
    onPasswordChange: (String) -> Unit,
    onLoginClick: () -> Unit,
    onGoogleLoginClick: () -> Unit,
    onRegisterClick: () -> Unit,
    onForgotPasswordClick: () -> Unit
) {
    var passwordVisible by remember { mutableStateOf(false) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(MaterialTheme.colorScheme.background)
            .padding(24.dp)
            .verticalScroll(rememberScrollState()),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        AuthHeader(
            title = stringResource(id = R.string.inicioSesion),
            subtitle = "Tu conexión premium con el Huila",
            modifier = Modifier.padding(bottom = 24.dp)
        )

        AuthCard {
            RutaGoTextField(
                value = uiState.email,
                onValueChange = onEmailChange,
                label = stringResource(id = R.string.correo),
                placeholder = "ejemplo@correo.com",
                modifier = Modifier.padding(bottom = 12.dp),
                isError = uiState.emailError != null,
                errorMessage = uiState.emailError
            )

            RutaGoTextField(
                value = uiState.password,
                onValueChange = onPasswordChange,
                label = stringResource(id = R.string.contraseña),
                modifier = Modifier.padding(bottom = 4.dp),
                isError = uiState.passwordError != null,
                errorMessage = uiState.passwordError,
                visualTransformation = if (passwordVisible) VisualTransformation.None else PasswordVisualTransformation(),
                trailingIcon = {
                    val icon = if (passwordVisible) R.drawable.ic_visibility_on else R.drawable.ic_visibility_off
                    IconButton(onClick = { passwordVisible = !passwordVisible }) {
                        Icon(
                            painter = painterResource(id = icon),
                            contentDescription = "Toggle Password",
                            tint = Color.White.copy(alpha = 0.7f)
                        )
                    }
                }
            )

            Text(
                text = stringResource(id = R.string.forgot_password),
                color = MaterialTheme.colorScheme.primary,
                fontSize = 14.sp,
                fontWeight = FontWeight.Bold,
                modifier = Modifier
                    .align(Alignment.End)
                    .clickable { onForgotPasswordClick() }
                    .padding(vertical = 8.dp)
            )

            RutaGoButton(
                text = if (uiState.isLoading) stringResource(id = R.string.cargando) else stringResource(id = R.string.ingresar),
                onClick = onLoginClick,
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(top = 8.dp),
                enabled = uiState.isFormValid && !uiState.isLoading
            )
        }

        // --- 🔘 SEPARATOR ---
        Row(
            modifier = Modifier
                .padding(vertical = 20.dp)
                .fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Divider(modifier = Modifier.weight(1f), color = MaterialTheme.colorScheme.outline.copy(alpha = 0.1f))
            Text(
                text = stringResource(id = R.string.or),
                modifier = Modifier.padding(horizontal = 16.dp),
                color = MaterialTheme.colorScheme.onBackground.copy(alpha = 0.5f),
                fontSize = 14.sp
            )
            Divider(modifier = Modifier.weight(1f), color = MaterialTheme.colorScheme.outline.copy(alpha = 0.1f))
        }

        GoogleButton(
            onClick = onGoogleLoginClick,
            isLoading = uiState.isLoading
        )

        // 🚨 BANNER DE ERROR Y FEEDBACK CLEAR PARA EL USUARIO
        if (uiState.error != null) {
            Surface(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(top = 16.dp),
                shape = RoundedCornerShape(12.dp),
                color = MaterialTheme.colorScheme.errorContainer.copy(alpha = 0.2f),
                border = androidx.compose.foundation.BorderStroke(
                    1.dp, 
                    MaterialTheme.colorScheme.error.copy(alpha = 0.5f)
                )
            ) {
                Row(
                    modifier = Modifier.padding(12.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(
                        imageVector = Icons.Default.ErrorOutline,
                        contentDescription = null,
                        tint = MaterialTheme.colorScheme.error,
                        modifier = Modifier.size(20.dp)
                    )
                    Spacer(modifier = Modifier.width(10.dp))
                    Text(
                        text = uiState.error,
                        color = MaterialTheme.colorScheme.error,
                        fontSize = 13.sp,
                        fontWeight = FontWeight.Medium,
                        textAlign = TextAlign.Start,
                        modifier = Modifier.weight(1f)
                    )
                }
            }
        }

        Spacer(modifier = Modifier.height(24.dp))

        AuthFooter(
            message = stringResource(id = R.string.noTieneCuenta),
            actionText = stringResource(id = R.string.registrate),
            onActionClick = onRegisterClick
        )
    }
}

@Preview(showBackground = true)
@Composable
fun LoginScreenPreview() {
    RutaGoTheme {
        LoginScreen(
            uiState = LoginUiState(error = "Fallo al conectar con Google"),
            onEmailChange = {},
            onPasswordChange = {},
            onLoginClick = {},
            onGoogleLoginClick = { },
            onRegisterClick = { },
            onForgotPasswordClick = { }
        )
    }
}

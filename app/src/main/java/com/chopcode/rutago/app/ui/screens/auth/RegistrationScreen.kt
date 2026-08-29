package com.chopcode.rutago.app.ui.screens.auth

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
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
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.chopcode.rutago.app.R
import com.chopcode.rutago.app.ui.components.atoms.RutaGoButton
import com.chopcode.rutago.app.ui.components.atoms.RutaGoTextField
import com.chopcode.rutago.app.ui.components.molecules.AuthFooter
import com.chopcode.rutago.app.ui.components.molecules.AuthHeader
import com.chopcode.rutago.app.ui.components.molecules.LegalConsent
import com.chopcode.rutago.app.ui.components.organisms.AuthCard
import com.chopcode.rutago.app.ui.theme.RutaGoNavyDark
import com.chopcode.rutago.app.ui.theme.RutaGoTheme
import com.chopcode.rutago.app.ui.viewmodels.auth.RegistrationUiState

/**
 * 📱 SCREEN: RegistrationScreen
 * Interfaz premium para el registro de nuevos pasajeros.
 */
@Composable
fun RegistrationScreen(
    uiState: RegistrationUiState,
    onNameChange: (String) -> Unit,
    onEmailChange: (String) -> Unit,
    onPhoneChange: (String) -> Unit,
    onPasswordChange: (String) -> Unit,
    onConfirmPasswordChange: (String) -> Unit,
    onTermsAcceptedChange: (Boolean) -> Unit,
    onRegisterClick: () -> Unit,
    onLoginClick: () -> Unit,
    onShowTerms: () -> Unit,
    onShowPrivacy: () -> Unit
) {
    var passwordVisible by remember { mutableStateOf(false) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(RutaGoNavyDark)
            .padding(24.dp)
            .verticalScroll(rememberScrollState()),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        AuthHeader(
            title = stringResource(id = R.string.crearCuenta),
            subtitle = "Únete a la red de transporte más grande del Huila",
            modifier = Modifier.padding(top = 16.dp, bottom = 24.dp)
        )

        AuthCard {
            Text(
                text = "Información Personal",
                color = MaterialTheme.colorScheme.primary,
                fontSize = 14.sp,
                fontWeight = FontWeight.Bold,
                modifier = Modifier.padding(bottom = 12.dp)
            )

            RutaGoTextField(
                value = uiState.name,
                onValueChange = onNameChange,
                label = stringResource(id = R.string.nombreCompleto),
                placeholder = "Tu nombre aquí",
                modifier = Modifier.padding(bottom = 12.dp),
                isError = uiState.nameError != null || uiState.error != null,
                errorMessage = uiState.nameError
            )

            RutaGoTextField(
                value = uiState.email,
                onValueChange = onEmailChange,
                label = stringResource(id = R.string.correo),
                placeholder = "ejemplo@correo.com",
                modifier = Modifier.padding(bottom = 12.dp),
                isError = uiState.emailError != null || uiState.error != null,
                errorMessage = uiState.emailError
            )

            RutaGoTextField(
                value = uiState.phone,
                onValueChange = onPhoneChange,
                label = stringResource(id = R.string.telefono),
                placeholder = "322 000 0000",
                modifier = Modifier.padding(bottom = 20.dp),
                isError = uiState.phoneError != null || uiState.error != null,
                errorMessage = uiState.phoneError
            )

            Text(
                text = "Seguridad",
                color = MaterialTheme.colorScheme.primary,
                fontSize = 14.sp,
                fontWeight = FontWeight.Bold,
                modifier = Modifier.padding(bottom = 12.dp)
            )

            RutaGoTextField(
                value = uiState.password,
                onValueChange = onPasswordChange,
                label = stringResource(id = R.string.contraseña),
                modifier = Modifier.padding(bottom = 12.dp),
                isError = uiState.passwordError != null || uiState.error != null,
                errorMessage = uiState.passwordError,
                visualTransformation = if (passwordVisible) VisualTransformation.None else PasswordVisualTransformation(),
                trailingIcon = {
                    val icon = if (passwordVisible) R.drawable.ic_visibility_on else R.drawable.ic_visibility_off
                    IconButton(onClick = { passwordVisible = !passwordVisible }) {
                        Icon(painter = painterResource(id = icon), contentDescription = null, tint = Color.White.copy(alpha = 0.7f))
                    }
                }
            )

            RutaGoTextField(
                value = uiState.confirmPassword,
                onValueChange = onConfirmPasswordChange,
                label = stringResource(id = R.string.confirmarContraseña),
                modifier = Modifier.padding(bottom = 16.dp),
                isError = uiState.confirmPasswordError != null || uiState.error != null,
                errorMessage = uiState.confirmPasswordError,
                visualTransformation = if (passwordVisible) VisualTransformation.None else PasswordVisualTransformation()
            )

            LegalConsent(
                checked = uiState.termsAccepted,
                onCheckedChange = onTermsAcceptedChange,
                onShowTerms = onShowTerms,
                onShowPrivacy = onShowPrivacy,
                modifier = Modifier.padding(bottom = 20.dp)
            )

            if (uiState.error != null) {
                Text(
                    text = uiState.error,
                    color = MaterialTheme.colorScheme.error,
                    fontSize = 12.sp,
                    modifier = Modifier.padding(bottom = 12.dp)
                )
            }

            RutaGoButton(
                text = if (uiState.isLoading) stringResource(id = R.string.cargando) else stringResource(id = R.string.crear_mi_cuenta),
                onClick = onRegisterClick,
                modifier = Modifier.fillMaxWidth(),
                enabled = uiState.isFormValid && !uiState.isLoading
            )
        }

        Spacer(modifier = Modifier.height(24.dp))

        AuthFooter(
            message = stringResource(id = R.string.yaTieneCuenta),
            actionText = stringResource(id = R.string.iniciaSesion),
            onActionClick = onLoginClick
        )
        
        Spacer(modifier = Modifier.height(16.dp))
    }
}

@Preview(showBackground = true)
@Composable
fun RegistrationScreenPreview() {
    RutaGoTheme {
        RegistrationScreen(
            uiState = RegistrationUiState(),
            onNameChange = {},
            onEmailChange = {},
            onPhoneChange = {},
            onPasswordChange = {},
            onConfirmPasswordChange = {},
            onTermsAcceptedChange = {},
            onRegisterClick = { },
            onLoginClick = { },
            onShowTerms = { },
            onShowPrivacy = { }
        )
    }
}

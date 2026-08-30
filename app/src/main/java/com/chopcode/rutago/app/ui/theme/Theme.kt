package com.chopcode.rutago.app.ui.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

private val DarkColorScheme = darkColorScheme(
    primary = RutaGoOrange,
    secondary = RutaGoNavy,
    tertiary = SuccessGreen,
    background = RutaGoNavyDark,
    surface = RutaGoNavySurface,
    onPrimary = White,
    onSecondary = White,
    onTertiary = White,
    onBackground = White,
    onSurface = White,
    outline = Gray600,
    primaryContainer = RutaGoOrange.copy(alpha = 0.2f),
    onPrimaryContainer = White,
    secondaryContainer = RutaGoNavyDark,
    onSecondaryContainer = White,
    surfaceVariant = RutaGoNavySurface,
    onSurfaceVariant = Gray400,
    error = ErrorRed,
    onError = White
)

private val LightColorScheme = lightColorScheme(
    primary = RutaGoOrange,
    secondary = RutaGoNavy,
    tertiary = SuccessGreen,
    background = LightBackground,
    surface = LightSurface,
    onPrimary = White,
    onSecondary = White,
    onTertiary = White,
    onBackground = LightTextPrimary,
    onSurface = LightTextPrimary,
    outline = LightBorder,
    primaryContainer = RutaGoOrange.copy(alpha = 0.1f),
    onPrimaryContainer = RutaGoOrange,
    secondaryContainer = Color(0xFFF1F5F9),
    onSecondaryContainer = RutaGoNavy,
    surfaceVariant = Color(0xFFF1F5F9),
    onSurfaceVariant = LightTextSecondary,
    error = ErrorRed,
    onError = White
)

@Composable
fun RutaGoTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    val colorScheme = if (darkTheme) DarkColorScheme else LightColorScheme

    MaterialTheme(
        colorScheme = colorScheme,
        content = content
    )
}

package com.chopcode.rutago.app.ui.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.Composable

private val DarkColorScheme = darkColorScheme(
    primary = RutaGoOrange,
    secondary = RutaGoNavy,
    tertiary = SuccessGreen,
    background = RutaGoNavyDark,
    surface = RutaGoNavySurface,
    onPrimary = RutaGoNavyDark,
    onSecondary = White,
    onTertiary = White,
    onBackground = White,
    onSurface = White
)

@Composable
fun RutaGoTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    // Forzamos el esquema oscuro ya que Ruta-Go es nativamente oscuro
    val colorScheme = DarkColorScheme

    MaterialTheme(
        colorScheme = colorScheme,
        content = content
    )
}

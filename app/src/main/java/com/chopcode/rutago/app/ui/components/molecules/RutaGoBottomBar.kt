package com.chopcode.rutago.app.ui.components.molecules

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.History
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Logout
import androidx.compose.material.icons.filled.Person
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.chopcode.rutago.app.R
import com.chopcode.rutago.app.ui.theme.RutaGoNavyDark
import com.chopcode.rutago.app.ui.theme.RutaGoOrange

/**
 * 🧪 MOLECULE: RutaGoBottomBar
 * Barra de navegación inferior premium compartida.
 */
@Composable
fun RutaGoBottomBar(
    currentRoute: String,
    onNavigate: (String) -> Unit
) {
    NavigationBar(
        containerColor = MaterialTheme.colorScheme.surface,
        contentColor = MaterialTheme.colorScheme.primary,
        tonalElevation = 8.dp
    ) {
        val items = listOf(
            NavigationItem.Home,
            NavigationItem.History,
            NavigationItem.Profile,
            NavigationItem.Logout
        )

        items.forEach { item ->
            NavigationBarItem(
                selected = currentRoute == item.route,
                onClick = { onNavigate(item.route) },
                icon = {
                    Icon(
                        imageVector = item.icon,
                        contentDescription = stringResource(id = item.titleRes)
                    )
                },
                label = {
                    Text(
                        text = stringResource(id = item.titleRes),
                        fontSize = 10.sp
                    )
                },
                colors = NavigationBarItemDefaults.colors(
                    selectedIconColor = RutaGoOrange,
                    selectedTextColor = RutaGoOrange,
                    unselectedIconColor = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.6f),
                    unselectedTextColor = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.6f),
                    indicatorColor = RutaGoOrange.copy(alpha = 0.15f)
                )
            )
        }
    }
}

sealed class NavigationItem(val route: String, val icon: ImageVector, val titleRes: Int) {
    object Home : NavigationItem("home", Icons.Default.Home, R.string.nav_home)
    object History : NavigationItem("history", Icons.Default.History, R.string.nav_history)
    object Profile : NavigationItem("profile", Icons.Default.Person, R.string.nav_profile)
    object Logout : NavigationItem("logout", Icons.Default.Logout, R.string.nav_logout)
}

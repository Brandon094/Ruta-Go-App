package com.chopcode.rutago.app.ui.screens.auth

import androidx.compose.foundation.ExperimentalFoundationApi
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.pager.HorizontalPager
import androidx.compose.foundation.pager.rememberPagerState
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.snapshotFlow
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.chopcode.rutago.app.ui.components.atoms.PagerIndicator
import com.chopcode.rutago.app.ui.components.atoms.RutaGoButton
import com.chopcode.rutago.app.ui.components.molecules.OnboardingSlide
import com.chopcode.rutago.app.ui.theme.RutaGoNavyDark
import com.chopcode.rutago.app.ui.theme.RutaGoTheme
import com.chopcode.rutago.app.ui.viewmodels.auth.OnboardingUiState

/**
 * 📱 SCREEN: OnboardingScreen
 * Experiencia de bienvenida premium para el usuario.
 */
@OptIn(ExperimentalFoundationApi::class)
@Composable
fun OnboardingScreen(
    uiState: OnboardingUiState,
    onPageChanged: (Int) -> Unit,
    onNextClick: () -> Unit,
    onSkipClick: () -> Unit
) {
    val pagerState = rememberPagerState(pageCount = { uiState.pages.size })

    // Sincronizar el estado del pager con el ViewModel
    LaunchedEffect(pagerState) {
        snapshotFlow { pagerState.currentPage }.collect { page ->
            onPageChanged(page)
        }
    }

    // Efecto para navegar programáticamente al dar click en Next
    LaunchedEffect(uiState.currentPage) {
        if (pagerState.currentPage != uiState.currentPage) {
            pagerState.animateScrollToPage(uiState.currentPage)
        }
    }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(MaterialTheme.colorScheme.background)
    ) {
        HorizontalPager(
            state = pagerState,
            modifier = Modifier.fillMaxSize()
        ) { position ->
            OnboardingSlide(page = uiState.pages[position])
        }

        // --- 🔘 BOTTOM CONTROLS ---
        Row(
            modifier = Modifier
                .align(Alignment.BottomCenter)
                .fillMaxWidth()
                .padding(24.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            PagerIndicator(
                count = uiState.pages.size,
                currentPage = pagerState.currentPage
            )

            Row(verticalAlignment = Alignment.CenterVertically) {
                if (!uiState.isLastPage) {
                    TextButton(onClick = onSkipClick) {
                        Text(
                            text = "SALTAR",
                            color = MaterialTheme.colorScheme.onBackground.copy(alpha = 0.5f)
                        )
                    }
                }

                RutaGoButton(
                    text = if (uiState.isLastPage) "COMENZAR" else "SIGUIENTE",
                    onClick = onNextClick,
                    modifier = Modifier.width(if (uiState.isLastPage) 160.dp else 140.dp)
                )
            }
        }
    }
}

@Preview(showBackground = true)
@Composable
fun OnboardingScreenPreview() {
    RutaGoTheme {
        OnboardingScreen(
            uiState = OnboardingUiState(),
            onPageChanged = {},
            onNextClick = {},
            onSkipClick = {}
        )
    }
}

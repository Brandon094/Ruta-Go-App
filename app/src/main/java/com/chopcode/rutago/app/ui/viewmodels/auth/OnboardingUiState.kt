package com.chopcode.rutago.app.ui.viewmodels.auth

import androidx.annotation.DrawableRes

/**
 * 🚀 UI STATE: OnboardingUiState
 */
data class OnboardingUiState(
    val pages: List<OnboardingPage> = emptyList(),
    val currentPage: Int = 0,
    val isLastPage: Boolean = false,
    val navigateToLogin: Boolean = false
)

data class OnboardingPage(
    @DrawableRes val imageRes: Int,
    val title: String,
    val description: String
)

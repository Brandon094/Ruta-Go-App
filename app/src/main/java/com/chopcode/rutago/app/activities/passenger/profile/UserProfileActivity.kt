package com.chopcode.rutago.app.activities.passenger.profile

import android.content.Intent
import android.os.Bundle
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.lifecycle.viewmodel.compose.viewModel
import com.chopcode.rutago.app.activities.common.LoginActivity
import com.chopcode.rutago.app.activities.passenger.PassengerHomeActivity
import com.chopcode.rutago.app.activities.passenger.editProfile.EditProfileActivity
import com.chopcode.rutago.app.activities.passenger.history.ReservationHistoryActivity
import com.chopcode.rutago.app.ui.theme.RutaGoTheme
import com.chopcode.rutago.app.ui.screens.passenger.UserProfileScreen
import com.chopcode.rutago.app.ui.viewmodels.passenger.UserProfileViewModel

/**
 * 👤 ACTIVITY: UserProfileActivity
 * Punto central de gestión de cuenta para el pasajero.
 */
class UserProfileActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        enableEdgeToEdge()
        super.onCreate(savedInstanceState)

        setContent {
            RutaGoTheme {
                val viewModel: UserProfileViewModel = viewModel()
                val uiState by viewModel.uiState.collectAsState()
                
                val imagePickerLauncher = rememberLauncherForActivityResult(
                    contract = ActivityResultContracts.GetContent()
                ) { uri ->
                    uri?.let { viewModel.uploadProfilePicture(it) }
                }

                UserProfileScreen(
                    uiState = uiState,
                    onAvatarClick = { imagePickerLauncher.launch("image/*") },
                    onStatusClick = { viewModel.toggleUserStatus() },
                    onEditProfileClick = {
                        startActivity(Intent(this, EditProfileActivity::class.java))
                    },
                    onDeleteAccountClick = { viewModel.showDeleteConfirmation(true) },
                    onCancelDeletionClick = { viewModel.cancelAccountDeletion() },
                    onNavigate = { route ->
                        if (route == "logout") {
                            viewModel.onLogoutClick()
                        } else {
                            when(route) {
                                "home" -> {
                                    startActivity(Intent(this, PassengerHomeActivity::class.java).apply {
                                        flags = Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_SINGLE_TOP
                                    })
                                    overridePendingTransition(0, 0)
                                }
                                "history" -> {
                                    startActivity(Intent(this, ReservationHistoryActivity::class.java))
                                    overridePendingTransition(0, 0)
                                }
                            }
                        }
                    },
                    onLogoutConfirm = {
                        viewModel.logout()
                        startActivity(Intent(this, LoginActivity::class.java).apply {
                            flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
                        })
                        finish()
                    },
                    onLogoutDismiss = { viewModel.dismissLogoutDialog() },
                    onTutorialDismiss = { viewModel.onTutorialDismiss() },
                    onDeleteConfirm = {
                        viewModel.requestAccountDeletion()
                        viewModel.showDeleteConfirmation(false)
                    },
                    onDeleteDismiss = { viewModel.showDeleteConfirmation(false) }
                )
            }
        }
    }
}

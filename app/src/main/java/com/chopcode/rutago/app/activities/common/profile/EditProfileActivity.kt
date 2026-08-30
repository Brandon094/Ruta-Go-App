package com.chopcode.rutago.app.activities.common.profile

import android.os.Bundle
import android.widget.Toast
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.lifecycle.viewmodel.compose.viewModel
import com.chopcode.rutago.app.ui.screens.common.EditProfileScreen
import com.chopcode.rutago.app.ui.theme.RutaGoTheme
import com.chopcode.rutago.app.ui.viewmodels.profile.EditProfileViewModel

/**
 * 📝 ACTIVITY: EditProfileActivity (Unified)
 * Pantalla para que todos los usuarios actualicen sus datos de contacto.
 */
class EditProfileActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        enableEdgeToEdge()
        super.onCreate(savedInstanceState)

        setContent {
            RutaGoTheme {
                val viewModel: EditProfileViewModel = viewModel()
                val uiState by viewModel.uiState.collectAsState()

                if (uiState.updateSuccess) {
                    LaunchedEffect(Unit) {
                        Toast.makeText(this@EditProfileActivity, "Perfil actualizado con éxito", Toast.LENGTH_SHORT).show()
                        finish()
                    }
                }

                EditProfileScreen(
                    uiState = uiState,
                    onNameChange = { viewModel.onNameChange(it) },
                    onPhoneChange = { viewModel.onPhoneChange(it) },
                    onPlateChange = { viewModel.onPlateChange(it) },
                    onModelChange = { viewModel.onModelChange(it) },
                    onSaveClick = { viewModel.updateProfile() },
                    onBackClick = { finish() }
                )
            }
        }
    }
}

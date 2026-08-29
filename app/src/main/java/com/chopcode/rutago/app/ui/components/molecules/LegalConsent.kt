package com.chopcode.rutago.app.ui.components.molecules

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.material3.Checkbox
import androidx.compose.material3.CheckboxDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.chopcode.rutago.app.ui.theme.RutaGoNavyDark
import com.chopcode.rutago.app.ui.theme.RutaGoOrange

/**
 * 🧪 MOLECULE: LegalConsent
 * Combina un Checkbox con textos clickeables para términos y políticas.
 */
@Composable
fun LegalConsent(
    checked: Boolean,
    onCheckedChange: (Boolean) -> Unit,
    onShowTerms: () -> Unit,
    onShowPrivacy: () -> Unit,
    modifier: Modifier = Modifier
) {
    Row(
        modifier = modifier.fillMaxWidth(),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Checkbox(
            checked = checked,
            onCheckedChange = onCheckedChange,
            colors = CheckboxDefaults.colors(
                checkedColor = RutaGoOrange,
                uncheckedColor = Color.White.copy(alpha = 0.5f),
                checkmarkColor = RutaGoNavyDark
            )
        )
        
        Column {
            Text(
                text = "Acepto los términos y condiciones",
                color = Color.White.copy(alpha = 0.7f),
                fontSize = 12.sp,
                modifier = Modifier.clickable { onShowTerms() }
            )
            Text(
                text = "y las políticas de privacidad",
                color = Color.White.copy(alpha = 0.7f),
                fontSize = 12.sp,
                modifier = Modifier.clickable { onShowPrivacy() }
            )
        }
    }
}

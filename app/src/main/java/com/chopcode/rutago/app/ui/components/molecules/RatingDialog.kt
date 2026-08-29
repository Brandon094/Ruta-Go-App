package com.chopcode.rutago.app.ui.components.molecules

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.chopcode.rutago.app.ui.components.atoms.RatingStars
import com.chopcode.rutago.app.ui.theme.RutaGoNavyDark

/**
 * 🧪 MOLECULE: RatingDialog
 * Diálogo para calificar un viaje completado.
 */
@Composable
fun RatingDialog(
    driverName: String,
    onConfirm: (Float, String) -> Unit,
    onDismiss: () -> Unit
) {
    var rating by remember { mutableStateOf(0f) }
    var comment by remember { mutableStateOf("") }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = {
            Text(
                text = "Calificar Viaje",
                fontWeight = FontWeight.Bold,
                fontSize = 18.sp
            )
        },
        text = {
            Column(
                modifier = Modifier.fillMaxWidth(),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                Text(
                    text = "¿Cómo fue tu experiencia con $driverName?",
                    fontSize = 14.sp,
                    color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.7f),
                    modifier = Modifier.padding(bottom = 16.dp)
                )

                RatingStars(
                    rating = rating,
                    starSize = 32.dp,
                    isEditable = true,
                    onRatingChange = { rating = it }
                )

                Spacer(modifier = Modifier.height(20.dp))

                OutlinedTextField(
                    value = comment,
                    onValueChange = { comment = it },
                    label = { Text("Comentarios opcionales") },
                    modifier = Modifier.fillMaxWidth(),
                    maxLines = 3,
                    shape = androidx.compose.foundation.shape.RoundedCornerShape(12.dp)
                )
            }
        },
        confirmButton = {
            Button(
                onClick = { if (rating > 0) onConfirm(rating, comment) },
                enabled = rating > 0
            ) {
                Text("Enviar Calificación")
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) {
                Text("Cancelar")
            }
        },
        containerColor = MaterialTheme.colorScheme.surface,
        titleContentColor = MaterialTheme.colorScheme.onSurface,
        textContentColor = MaterialTheme.colorScheme.onSurface
    )
}

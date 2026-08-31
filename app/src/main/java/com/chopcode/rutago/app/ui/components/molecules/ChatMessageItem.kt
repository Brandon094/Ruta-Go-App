package com.chopcode.rutago.app.ui.components.molecules

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.chopcode.rutago.app.data.models.ChatMessage
import java.text.SimpleDateFormat
import java.util.*

/**
 * 🧪 MOLECULE: ChatMessageItem
 * Representa una burbuja de mensaje en el chat.
 */
@Composable
fun ChatMessageItem(
    message: ChatMessage,
    isMine: Boolean
) {
    val alignment = if (isMine) Alignment.CenterEnd else Alignment.CenterStart
    val bubbleColor = if (isMine) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.surface
    val contentColor = if (isMine) Color.White else MaterialTheme.colorScheme.onSurface
    val shape = if (isMine) {
        RoundedCornerShape(16.dp, 16.dp, 4.dp, 16.dp)
    } else {
        RoundedCornerShape(16.dp, 16.dp, 16.dp, 4.dp)
    }

    Box(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 4.dp),
        contentAlignment = alignment
    ) {
        Column(
            modifier = Modifier.widthIn(max = 280.dp),
            horizontalAlignment = if (isMine) Alignment.End else Alignment.Start
        ) {
            Surface(
                color = bubbleColor,
                shape = shape,
                tonalElevation = 2.dp
            ) {
                Text(
                    text = message.text ?: "",
                    modifier = Modifier.padding(horizontal = 12.dp, vertical = 8.dp),
                    color = contentColor,
                    fontSize = 15.sp
                )
            }
            
            val date = Date(message.timestamp)
            val format = SimpleDateFormat("hh:mm a", Locale.getDefault())
            Text(
                text = format.format(date),
                fontSize = 10.sp,
                color = MaterialTheme.colorScheme.onBackground.copy(alpha = 0.5f),
                modifier = Modifier.padding(top = 2.dp, start = 4.dp, end = 4.dp)
            )
        }
    }
}

package com.chopcode.rutago.app.ui.components.atoms

import androidx.compose.foundation.border
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import coil.compose.AsyncImage
import coil.request.ImageRequest
import com.chopcode.rutago.app.R
import com.chopcode.rutago.app.ui.theme.RutaGoNavyDark

/**
 * ⚛️ ATOM: UserAvatar
 * Imagen de perfil circular con borde premium.
 */
@Composable
fun UserAvatar(
    url: String?,
    size: Dp = 65.dp,
    borderColor: Color = RutaGoNavyDark
) {
    AsyncImage(
        model = ImageRequest.Builder(LocalContext.current)
            .data(url)
            .crossfade(true)
            .build(),
        placeholder = painterResource(R.drawable.ic_person),
        error = painterResource(R.drawable.ic_person),
        contentDescription = "User Avatar",
        contentScale = ContentScale.Crop,
        modifier = Modifier
            .size(size)
            .clip(CircleShape)
            .border(2.dp, borderColor, CircleShape)
    )
}

package com.chopcode.rutago.app.ui.components.organisms

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.chopcode.rutago.app.ui.components.molecules.SeatItem

/**
 * 🧬 ORGANISM: SeatGrid
 * Rediseño premium con silueta de vehículo, llantas y distribución real.
 */
@Composable
fun SeatGrid(
    capacity: Int,
    occupiedSeats: Set<Int>,
    selectedSeat: Int?,
    onSeatClick: (Int) -> Unit,
    modifier: Modifier = Modifier
) {
    Box(
        modifier = modifier.fillMaxWidth(),
        contentAlignment = Alignment.Center
    ) {
        // --- LLANTAS (Más visibles y reales) ---
        Wheel(Modifier.align(Alignment.TopStart).offset(x = 35.dp, y = 60.dp))
        Wheel(Modifier.align(Alignment.TopEnd).offset(x = (-35).dp, y = 60.dp))
        Wheel(Modifier.align(Alignment.BottomStart).offset(x = 35.dp, y = (-80).dp))
        Wheel(Modifier.align(Alignment.BottomEnd).offset(x = (-35).dp, y = (-80).dp))

        // --- CUERPO DE LA CAMIONETA ---
        Surface(
            modifier = Modifier
                .width(260.dp)
                .padding(vertical = 8.dp),
            shape = RoundedCornerShape(topStart = 40.dp, topEnd = 40.dp, bottomStart = 32.dp, bottomEnd = 32.dp),
            color = MaterialTheme.colorScheme.surface,
            border = BorderStroke(1.5.dp, MaterialTheme.colorScheme.outline.copy(alpha = 0.2f)),
            shadowElevation = 3.dp
        ) {
            Column(
                modifier = Modifier.padding(top = 40.dp, bottom = 32.dp, start = 16.dp, end = 16.dp),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                // Cabina Frontal...
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceEvenly,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    SeatItem(number = null, isOccupied = false, isSelected = false, onClick = {}, isDriver = true)
                    
                    Spacer(modifier = Modifier.width(12.dp))

                    Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                        if (capacity >= 1) SeatItemWrapper(1, occupiedSeats, selectedSeat, onSeatClick)
                        if (capacity >= 2) SeatItemWrapper(2, occupiedSeats, selectedSeat, onSeatClick)
                    }
                }

                Spacer(modifier = Modifier.height(24.dp))

                // --- FILA MEDIA ---
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceEvenly
                ) {
                    if (capacity >= 3) SeatItemWrapper(3, occupiedSeats, selectedSeat, onSeatClick)
                    if (capacity >= 4) SeatItemWrapper(4, occupiedSeats, selectedSeat, onSeatClick)
                    if (capacity >= 5) SeatItemWrapper(5, occupiedSeats, selectedSeat, onSeatClick)
                }

                // Pasillo visual sutil
                Spacer(modifier = Modifier.height(28.dp))
                Box(
                    modifier = Modifier
                        .fillMaxWidth(0.5f)
                        .height(1.dp)
                        .background(MaterialTheme.colorScheme.outline.copy(alpha = 0.05f))
                )
                Spacer(modifier = Modifier.height(24.dp))

                // --- ZONA TRASERA ---
                Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                    // Fila 1 Trasera
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.Center
                    ) {
                        Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                            if (capacity >= 6) SeatItemWrapper(6, occupiedSeats, selectedSeat, onSeatClick)
                            if (capacity >= 7) SeatItemWrapper(7, occupiedSeats, selectedSeat, onSeatClick)
                        }
                        
                        Spacer(modifier = Modifier.width(32.dp)) // PASILLO
                        
                        Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                            if (capacity >= 10) SeatItemWrapper(10, occupiedSeats, selectedSeat, onSeatClick)
                            if (capacity >= 11) SeatItemWrapper(11, occupiedSeats, selectedSeat, onSeatClick)
                        }
                    }

                    // Fila 2 Trasera
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.Center
                    ) {
                        Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                            if (capacity >= 8) SeatItemWrapper(8, occupiedSeats, selectedSeat, onSeatClick)
                            if (capacity >= 9) SeatItemWrapper(9, occupiedSeats, selectedSeat, onSeatClick)
                        }
                        
                        Spacer(modifier = Modifier.width(32.dp)) // PASILLO
                        
                        Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                            if (capacity >= 12) SeatItemWrapper(12, occupiedSeats, selectedSeat, onSeatClick)
                            if (capacity >= 13) SeatItemWrapper(13, occupiedSeats, selectedSeat, onSeatClick)
                        }
                    }
                }
            }
        }
    }
}

@Composable
private fun Wheel(modifier: Modifier = Modifier) {
    Box(
        modifier = modifier
            .size(width = 14.dp, height = 32.dp)
            .background(
                color = Color(0xFF1A1C1E), // Negro caucho real
                shape = RoundedCornerShape(4.dp)
            )
            .border(0.5.dp, Color.White.copy(alpha = 0.1f), RoundedCornerShape(4.dp))
    )
}

@Composable
private fun SeatItemWrapper(
    number: Int,
    occupiedSeats: Set<Int>,
    selectedSeat: Int?,
    onSeatClick: (Int) -> Unit
) {
    SeatItem(
        number = number,
        isOccupied = occupiedSeats.contains(number),
        isSelected = selectedSeat == number,
        onClick = { onSeatClick(number) }
    )
}

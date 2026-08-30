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
 * Distribución visual premium inspirada en Pinbus con silueta detallada del vehículo.
 * Soporta discriminación de asientos por tipo de ocupación (App vs Física).
 */
@Composable
fun SeatGrid(
    capacity: Int,
    occupiedSeats: Set<Int>,
    physicalOccupiedSeats: Set<Int> = emptySet(),
    selectedSeat: Int? = null,
    onSeatClick: (Int) -> Unit,
    modifier: Modifier = Modifier
) {
    Box(
        modifier = modifier.fillMaxWidth(),
        contentAlignment = Alignment.Center
    ) {
        // --- RUEDAS SUTILES ---
        Wheel(Modifier.align(Alignment.TopStart).offset(x = 55.dp, y = 80.dp))
        Wheel(Modifier.align(Alignment.TopEnd).offset(x = (-55).dp, y = 80.dp))
        Wheel(Modifier.align(Alignment.BottomStart).offset(x = 55.dp, y = (-120).dp))
        Wheel(Modifier.align(Alignment.BottomEnd).offset(x = (-55).dp, y = (-120).dp))

        // --- SILUETA DEL VEHÍCULO (Minimalista) ---
        Surface(
            modifier = Modifier
                .width(250.dp)
                .padding(vertical = 4.dp),
            shape = RoundedCornerShape(topStart = 100.dp, topEnd = 100.dp, bottomStart = 40.dp, bottomEnd = 40.dp),
            color = MaterialTheme.colorScheme.surface,
            border = BorderStroke(1.dp, MaterialTheme.colorScheme.outline.copy(alpha = 0.15f)),
            shadowElevation = 2.dp
        ) {
            Column(
                modifier = Modifier.padding(top = 48.dp, bottom = 40.dp, start = 16.dp, end = 16.dp),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                // --- CABINA FRONTAL ---
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceEvenly,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    SeatItem(number = null, isOccupied = false, isSelected = false, onClick = {}, isDriver = true)
                    
                    Spacer(modifier = Modifier.width(12.dp))

                    Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                        if (capacity >= 1) SeatItemWrapper(1, occupiedSeats, physicalOccupiedSeats, selectedSeat, onSeatClick)
                        if (capacity >= 2) SeatItemWrapper(2, occupiedSeats, physicalOccupiedSeats, selectedSeat, onSeatClick)
                    }
                }

                Spacer(modifier = Modifier.height(24.dp))

                // --- FILA MEDIA ---
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceEvenly
                ) {
                    if (capacity >= 3) SeatItemWrapper(3, occupiedSeats, physicalOccupiedSeats, selectedSeat, onSeatClick)
                    if (capacity >= 4) SeatItemWrapper(4, occupiedSeats, physicalOccupiedSeats, selectedSeat, onSeatClick)
                    if (capacity >= 5) SeatItemWrapper(5, occupiedSeats, physicalOccupiedSeats, selectedSeat, onSeatClick)
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
                            if (capacity >= 6) SeatItemWrapper(6, occupiedSeats, physicalOccupiedSeats, selectedSeat, onSeatClick)
                            if (capacity >= 7) SeatItemWrapper(7, occupiedSeats, physicalOccupiedSeats, selectedSeat, onSeatClick)
                        }
                        
                        Spacer(modifier = Modifier.width(32.dp)) // PASILLO
                        
                        Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                            if (capacity >= 10) SeatItemWrapper(10, occupiedSeats, physicalOccupiedSeats, selectedSeat, onSeatClick)
                            if (capacity >= 11) SeatItemWrapper(11, occupiedSeats, physicalOccupiedSeats, selectedSeat, onSeatClick)
                        }
                    }

                    // Fila 2 Trasera
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.Center
                    ) {
                        Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                            if (capacity >= 8) SeatItemWrapper(8, occupiedSeats, physicalOccupiedSeats, selectedSeat, onSeatClick)
                            if (capacity >= 9) SeatItemWrapper(9, occupiedSeats, physicalOccupiedSeats, selectedSeat, onSeatClick)
                        }
                        
                        Spacer(modifier = Modifier.width(32.dp)) // PASILLO
                        
                        Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                            if (capacity >= 12) SeatItemWrapper(12, occupiedSeats, physicalOccupiedSeats, selectedSeat, onSeatClick)
                            if (capacity >= 13) SeatItemWrapper(13, occupiedSeats, physicalOccupiedSeats, selectedSeat, onSeatClick)
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
            .size(width = 10.dp, height = 24.dp)
            .background(
                color = MaterialTheme.colorScheme.outline.copy(alpha = 0.2f),
                shape = RoundedCornerShape(3.dp)
            )
    )
}

@Composable
private fun SeatItemWrapper(
    number: Int,
    occupiedSeats: Set<Int>,
    physicalOccupiedSeats: Set<Int>,
    selectedSeat: Int?,
    onSeatClick: (Int) -> Unit
) {
    SeatItem(
        number = number,
        isOccupied = occupiedSeats.contains(number) || physicalOccupiedSeats.contains(number),
        isPhysicalSale = physicalOccupiedSeats.contains(number),
        isSelected = selectedSeat == number,
        onClick = { onSeatClick(number) }
    )
}

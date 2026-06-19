package com.chopcode.rutago.app.activities.common;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.models.Reservation;
import com.chopcode.rutago.app.utils.ui.FormatUtils;
import com.chopcode.rutago.app.utils.ui.ImageUtils;
import com.google.android.material.appbar.MaterialToolbar;
import com.google.android.material.card.MaterialCardView;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

/**
 * 🎟️ Ticket Activity
 * 
 * Muestra el comprobante digital de una reserva.
 * Puede ser abierta tanto por el pasajero como por el conductor.
 */
public class TicketActivity extends AppCompatActivity {

    private static final String TAG = "TicketActivity";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_ticket);

        setupToolbar();
        
        // Obtenemos los datos pasados (pueden ser campos individuales o el objeto serializado)
        // Por ahora usaremos campos individuales para mayor compatibilidad
        displayTicketData(getIntent());
    }

    private void setupToolbar() {
        MaterialToolbar toolbar = findViewById(R.id.topAppBar);
        setSupportActionBar(toolbar);
        if (getSupportActionBar() != null) getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        toolbar.setNavigationOnClickListener(v -> finish());
    }

    private void displayTicketData(Intent intent) {
        if (intent == null) return;

        TextView tvRoute = findViewById(R.id.tvTicketRoute);
        TextView tvStatus = findViewById(R.id.tvTicketStatus);
        TextView tvDate = findViewById(R.id.tvTicketDate);
        TextView tvTime = findViewById(R.id.tvTicketTime);
        TextView tvDuration = findViewById(R.id.tvTicketDuration);
        TextView tvSeat = findViewById(R.id.tvTicketSeat);
        TextView tvPrice = findViewById(R.id.tvTicketPrice);
        TextView tvPassenger = findViewById(R.id.tvTicketPassenger);
        TextView tvDriver = findViewById(R.id.tvTicketDriver);
        TextView tvVehicle = findViewById(R.id.tvTicketVehicle);
        TextView tvID = findViewById(R.id.tvTicketID);

        // Extraer datos
        String origin = intent.getStringExtra("origin");
        String dest = intent.getStringExtra("destination");
        String status = intent.getStringExtra("status");
        long timestamp = intent.getLongExtra("date", 0);
        String time = intent.getStringExtra("time");
        String duration = intent.getStringExtra("duration");
        int seat = intent.getIntExtra("seat", 0);
        double price = intent.getDoubleExtra("price", 0);
        String passengerName = intent.getStringExtra("passengerName");
        String driverName = intent.getStringExtra("driverName");
        String vehiclePlate = intent.getStringExtra("vehiclePlate");
        String vehicleModel = intent.getStringExtra("vehicleModel");
        String reservationId = intent.getStringExtra("reservationId");

        // Pintar UI
        tvRoute.setText(origin + " -> " + dest);
        tvStatus.setText(status != null ? status.toUpperCase() : "N/A");
        
        MaterialCardView ticketCard = findViewById(R.id.ticketCardMain);

        // 🔥 Animación Premium de Entrada centralizada
        com.chopcode.rutago.app.utils.ui.UIAnimationUtils.playCardEntryAnimation(ticketCard);

        View btnShare = findViewById(R.id.btnShareTicket);
        View btnChat = findViewById(R.id.btnChatTicket);

        com.chopcode.rutago.app.utils.ui.UIAnimationUtils.setClickAnimation(btnShare);
        com.chopcode.rutago.app.utils.ui.UIAnimationUtils.setClickAnimation(btnChat);

        // 🔥 Blindaje de Chat: Ocultar si la reserva está cancelada
        if ("cancelada".equalsIgnoreCase(status)) {
            btnChat.setVisibility(View.GONE);
        } else {
            btnChat.setVisibility(View.VISIBLE);
        }

        btnShare.setOnClickListener(v -> {
            if (ticketCard != null) {
                ImageUtils.shareViewAsImage(this, ticketCard, "Ticket_" + reservationId);
            }
        });

        btnChat.setOnClickListener(v -> {
            if ("cancelada".equalsIgnoreCase(status)) {
                Toast.makeText(this, "No se puede abrir el chat de una reserva cancelada", Toast.LENGTH_SHORT).show();
                return;
            }

            Intent chatIntent = new Intent(this, ChatActivity.class);
            chatIntent.putExtra("reservationId", reservationId);
            
            // Lógica de identidad para el chat
            String currentUid = com.chopcode.rutago.app.config.MyApp.getCurrentUserId();
            boolean isPassenger = currentUid != null && currentUid.equals(intent.getStringExtra("userId"));
            
            chatIntent.putExtra("receiverId", isPassenger ? intent.getStringExtra("driverId") : intent.getStringExtra("userId"));
            chatIntent.putExtra("receiverName", isPassenger ? driverName : passengerName);
            chatIntent.putExtra("senderName", isPassenger ? passengerName : driverName);
            chatIntent.putExtra("scheduleTime", time);
            startActivity(chatIntent);
        });

        if (timestamp > 0) {
            SimpleDateFormat sdf = new SimpleDateFormat("dd MMM yyyy", new Locale("es", "ES"));
            tvDate.setText(sdf.format(new Date(timestamp)));
        } else {
            tvDate.setText(R.string.hoy);
        }

        tvTime.setText(time != null ? time : "--:--");
        tvDuration.setText(duration != null ? duration : "");
        tvDuration.setVisibility(duration != null && !duration.isEmpty() ? View.VISIBLE : View.GONE);

        tvSeat.setText(FormatUtils.formatearAsiento(seat));
        tvPrice.setText(FormatUtils.formatearPrecio(price));
        tvPassenger.setText(getString(R.string.ticket_pasajero_label, passengerName != null ? passengerName : "N/A"));
        tvDriver.setText(getString(R.string.ticket_conductor_label, driverName != null ? driverName : "N/A"));
        tvVehicle.setText(getString(R.string.ticket_vehiculo_label, vehiclePlate != null ? vehiclePlate : "N/A", vehicleModel != null ? vehicleModel : "N/A"));
        tvID.setText(reservationId != null ? reservationId.toUpperCase() : "N/A");

        // Estilo del badge según estado unificado (Navy bg + Colored stroke + White text)
        if (status != null) {
            tvStatus.setTextColor(getColor(R.color.white));
            switch (status.toLowerCase()) {
                case "confirmada":
                case "completada":
                    tvStatus.setBackgroundResource(R.drawable.bg_estado_confirmado);
                    break;
                case "cancelada":
                    tvStatus.setBackgroundResource(R.drawable.bg_estado_cancelado);
                    break;
                default:
                    tvStatus.setBackgroundResource(R.drawable.bg_estado_pendiente);
                    break;
            }
        }
    }
}

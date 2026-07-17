package com.chopcode.rutago.app.activities.common;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.adapters.chat.ChatAdapter;
import com.chopcode.rutago.app.utils.ui.WindowUtils;
import com.chopcode.rutago.app.viewmodels.common.ChatViewModel;
import com.google.android.material.appbar.MaterialToolbar;
import com.google.android.material.floatingactionbutton.FloatingActionButton;

/**
 * 💬 Chat Activity
 * 
 * Pantalla de conversación en tiempo real vinculada a una reserva.
 */
public class ChatActivity extends AppCompatActivity {

    private ChatViewModel viewModel;
    private ChatAdapter adapter;
    private RecyclerView rvChat;
    private EditText etMessage;
    private android.widget.TextView tvEmptyChat;
    private FloatingActionButton btnSend;
    private String reservationId;
    private String receiverName, scheduleTime;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        EdgeToEdge.enable(this);
        super.onCreate(savedInstanceState);
        try {
            android.util.Log.e("ChatActivity", "🚩 onCreate INICIADO");
            setContentView(R.layout.activity_chat);
            handleIntent(getIntent());
        } catch (Exception e) {
            android.util.Log.e("ChatActivity", "❌ ERROR CRÍTICO EN ONCREATE: " + e.getMessage());
            e.printStackTrace();
            Toast.makeText(this, getString(R.string.error_opening_chat, e.getMessage()), Toast.LENGTH_LONG).show();
            finish();
        }
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        handleIntent(intent);
    }

    private void handleIntent(Intent intent) {
        if (intent == null) {
            android.util.Log.e("ChatActivity", "❌ Intent es NULL");
            return;
        }
        
        reservationId = intent.getStringExtra("reservationId");
        String receiverId = intent.getStringExtra("receiverId");
        String senderName = intent.getStringExtra("senderName");
        receiverName = intent.getStringExtra("receiverName");
        scheduleTime = intent.getStringExtra("scheduleTime");
        
        android.util.Log.e("ChatActivity", "🚀 handleIntent - resId: " + reservationId + ", receiver: " + receiverId);
        
        if (reservationId == null) {
            android.util.Log.e("ChatActivity", "❌ Faltan datos (reservationId es NULL)");
            return; 
        }

        try {
            if (viewModel == null) {
                android.util.Log.d("ChatActivity", "📦 Inicializando ViewModel y Views");
                viewModel = new ViewModelProvider(this).get(ChatViewModel.class);
                initViews();
                setupInsets();
                setupRecyclerView();
                setupObservers();
            }
            viewModel.initChat(reservationId, receiverId, senderName);
            updateToolbarInfo();
        } catch (Exception e) {
            android.util.Log.e("ChatActivity", "❌ Error en inicialización: " + e.getMessage());
        }
    }

    private void updateToolbarInfo() {
        MaterialToolbar toolbar = findViewById(R.id.topAppBar);
        if (toolbar != null) {
            if (receiverName != null) {
                toolbar.setTitle(receiverName);
            }
            if (scheduleTime != null) {
                toolbar.setSubtitle("Viaje: " + scheduleTime);
            }
        }
    }

    private void initViews() {
        MaterialToolbar toolbar = findViewById(R.id.topAppBar);
        setSupportActionBar(toolbar);
        if (getSupportActionBar() != null) getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        toolbar.setNavigationOnClickListener(v -> finish());
        
        rvChat = findViewById(R.id.rvChat);
        etMessage = findViewById(R.id.etMessage);
        btnSend = findViewById(R.id.btnSend);
        tvEmptyChat = findViewById(R.id.tvEmptyChat);

        // 🔥 Micro-interacción de Botón
        com.chopcode.rutago.app.utils.ui.UIAnimationUtils.setClickAnimation(btnSend);

        btnSend.setOnClickListener(v -> {
            String text = etMessage.getText().toString().trim();
            if (!text.isEmpty()) {
                viewModel.sendMessage(text);
                etMessage.setText("");
            }
        });
    }

    private void setupRecyclerView() {
        adapter = new ChatAdapter();
        LinearLayoutManager layoutManager = new LinearLayoutManager(this);
        layoutManager.setStackFromEnd(true); // El chat empieza desde abajo
        rvChat.setLayoutManager(layoutManager);
        rvChat.setAdapter(adapter);
    }

    private void setupObservers() {
        viewModel.getMessages().observe(this, messages -> {
            adapter.setMessages(messages);
            boolean isEmpty = messages == null || messages.isEmpty();
            if (tvEmptyChat != null) {
                tvEmptyChat.setVisibility(isEmpty ? android.view.View.VISIBLE : android.view.View.GONE);
            }
            
            if (!isEmpty) {
                rvChat.smoothScrollToPosition(adapter.getItemCount() - 1);
            }
        });

        viewModel.getError().observe(this, err -> {
            if (err != null) Toast.makeText(this, getString(R.string.error_prefijo, err), Toast.LENGTH_SHORT).show();
        });
    }

    /**
     * Gestiona los insets del sistema para evitar superposiciones con las barras de estado y navegación.
     */
    private void setupInsets() {
        WindowUtils.applyTopInsetPadding(findViewById(R.id.appBar));
        WindowUtils.applyBottomInsetMargin(findViewById(R.id.layoutInput));
    }
}

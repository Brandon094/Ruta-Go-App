package com.chopcode.rutago.app.activities.common;

import android.os.Bundle;
import android.widget.EditText;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import com.chopcode.rutago.app.R;
import com.chopcode.rutago.app.adapters.chat.ChatAdapter;
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
    private FloatingActionButton btnSend;
    private String reservationId;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_chat);

        reservationId = getIntent().getStringExtra("reservationId");
        String receiverId = getIntent().getStringExtra("receiverId");
        String senderName = getIntent().getStringExtra("senderName");
        
        // Log para debug
        android.util.Log.d("ChatActivity", "Opening chat. resId: " + reservationId + ", receiver: " + receiverId);
        
        if (reservationId == null) { finish(); return; }

        viewModel = new ViewModelProvider(this).get(ChatViewModel.class);
        
        initViews();
        setupRecyclerView();
        setupObservers();
        
        viewModel.initChat(reservationId, receiverId, senderName);
    }

    private void initViews() {
        MaterialToolbar toolbar = findViewById(R.id.topAppBar);
        setSupportActionBar(toolbar);
        if (getSupportActionBar() != null) getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        toolbar.setNavigationOnClickListener(v -> finish());
        
        rvChat = findViewById(R.id.rvChat);
        etMessage = findViewById(R.id.etMessage);
        btnSend = findViewById(R.id.btnSend);

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
            if (adapter.getItemCount() > 0) {
                rvChat.smoothScrollToPosition(adapter.getItemCount() - 1);
            }
        });

        viewModel.getError().observe(this, err -> {
            if (err != null) Toast.makeText(this, "Error: " + err, Toast.LENGTH_SHORT).show();
        });
    }
}

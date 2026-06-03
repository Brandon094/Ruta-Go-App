package com.chopcode.trasnportenataga_laplata.activities.driver;

import android.os.Bundle;
import android.util.Log;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import com.chopcode.trasnportenataga_laplata.R;
import com.chopcode.trasnportenataga_laplata.config.MyApp;
import com.chopcode.trasnportenataga_laplata.managers.analytics.ReservationAnalyticsHelper;
import com.chopcode.trasnportenataga_laplata.managers.seats.SeatManager;
import com.chopcode.trasnportenataga_laplata.managers.seats.dataprocessor.SeatsDataProcessor;
import com.chopcode.trasnportenataga_laplata.models.Reserva;
import com.chopcode.trasnportenataga_laplata.services.reservations.ReservaService;
import com.google.android.material.appbar.MaterialToolbar;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.ValueEventListener;

import java.util.HashSet;
import java.util.Set;

public class GestionarAsientosActivity extends AppCompatActivity implements SeatManager.SeatSelectionListener {

    private static final String TAG = "GestionarAsientos";
    
    private String horarioId, rutaNombre, horarioHora;
    private TextView tvRutaNombre, tvHorarioInfo, tvAsientosDispoInfo;
    private MaterialToolbar topAppBar;
    
    private SeatManager seatManager;
    private SeatsDataProcessor seatsDataProcessor;
    private ReservaService reservaService;
    private ReservationAnalyticsHelper analyticsHelper;
    
    private Set<Integer> asientosOcupadosApp = new HashSet<>();
    private Set<Integer> asientosOcupadosFisico = new HashSet<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_gestionar_asientos);
        
        obtenerDatosIntent();
        inicializarViews();
        setupManagers();
        
        cargarDatosAsientos();
    }

    private void obtenerDatosIntent() {
        horarioId = getIntent().getStringExtra("horarioId");
        rutaNombre = getIntent().getStringExtra("rutaNombre");
        horarioHora = getIntent().getStringExtra("horarioHora");
    }

    private void inicializarViews() {
        tvRutaNombre = findViewById(R.id.tvRutaNombre);
        tvHorarioInfo = findViewById(R.id.tvHorarioInfo);
        tvAsientosDispoInfo = findViewById(R.id.tvAsientosDispoInfo);
        topAppBar = findViewById(R.id.topAppBar);
        
        tvRutaNombre.setText("Ruta: " + (rutaNombre != null ? rutaNombre : "No disponible"));
        tvHorarioInfo.setText("Horario: " + (horarioHora != null ? horarioHora : "--:--"));
        
        setSupportActionBar(topAppBar);
        topAppBar.setNavigationOnClickListener(v -> finish());
    }

    private void setupManagers() {
        analyticsHelper = new ReservationAnalyticsHelper("GestionarAsientos");
        seatManager = new SeatManager(this, analyticsHelper);
        seatManager.setSeatSelectionListener(this);
        seatManager.configurarAsientos();
        
        seatsDataProcessor = new SeatsDataProcessor();
        reservaService = new ReservaService();
    }

    private void cargarDatosAsientos() {
        if (horarioId == null) return;
        
        // 1. Cargar asientos ocupados generales
        seatsDataProcessor.loadSeatsDataForSchedule(horarioId, new SeatsDataProcessor.SeatsDataCallback() {
            @Override
            public void onSeatsDataLoaded(Set<Integer> occupiedSeats, int availableSeats) {
                // 2. Cargar reservas de la app para diferenciar
                identificarTipoOcupacion(occupiedSeats, availableSeats);
            }

            @Override
            public void onError(String error) {
                Toast.makeText(GestionarAsientosActivity.this, "Error: " + error, Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void identificarTipoOcupacion(Set<Integer> allOccupied, int availableCount) {
        DatabaseReference reservasRef = MyApp.getDatabaseReference("reservas");
        
        reservasRef.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                asientosOcupadosApp.clear();
                asientosOcupadosFisico.clear();
                
                for (DataSnapshot ds : snapshot.getChildren()) {
                    Reserva r = ds.getValue(Reserva.class);
                    if (r != null && horarioId.equals(r.getHorarioId())) {
                        asientosOcupadosApp.add(r.getPuestoReservado());
                    }
                }
                
                // Los que están ocupados pero no tienen reserva en la app son físicos
                for (Integer seat : allOccupied) {
                    if (!asientosOcupadosApp.contains(seat)) {
                        asientosOcupadosFisico.add(seat);
                    }
                }
                
                seatManager.actualizarEstadoAsientos(asientosOcupadosApp, asientosOcupadosFisico, 13);
                tvAsientosDispoInfo.setText("Disponibles: " + availableCount);
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {
                Log.e(TAG, "Error cargando reservas: " + error.getMessage());
            }
        });
    }

    @Override
    public void onSeatSelected(int seatNumber) {
        if (asientosOcupadosApp.contains(seatNumber)) {
            mostrarDetallesReservaApp(seatNumber);
        } else if (asientosOcupadosFisico.contains(seatNumber)) {
            mostrarDialogoLiberarAsientoFisico(seatNumber);
        } else {
            mostrarDialogoReservarFisico(seatNumber);
        }
    }

    private void mostrarDetallesReservaApp(int seatNumber) {
        // Opcional: Mostrar quién compró por la app
        Toast.makeText(this, "Asiento ocupado por la App", Toast.LENGTH_SHORT).show();
    }

    private void mostrarDialogoReservarFisico(int seatNumber) {
        new AlertDialog.Builder(this)
                .setTitle("Reserva Física")
                .setMessage("¿Deseas marcar el asiento " + seatNumber + " como vendido físicamente?")
                .setPositiveButton("Sí, marcar", (dialog, which) -> {
                    marcarAsientoFisico(seatNumber);
                })
                .setNegativeButton("Cancelar", null)
                .show();
    }

    private void mostrarDialogoLiberarAsientoFisico(int seatNumber) {
        new AlertDialog.Builder(this)
                .setTitle("Liberar Asiento")
                .setMessage("¿Deseas liberar el asiento " + seatNumber + " (Venta física)?")
                .setPositiveButton("Sí, liberar", (dialog, which) -> {
                    liberarAsientoFisico(seatNumber);
                })
                .setNegativeButton("Cancelar", null)
                .show();
    }

    private void marcarAsientoFisico(int seatNumber) {
        seatsDataProcessor.reserveSeat(horarioId, seatNumber, new SeatsDataProcessor.SeatReservationCallback() {
            @Override
            public void onSuccess() {
                Toast.makeText(GestionarAsientosActivity.this, "Asiento bloqueado físicamente", Toast.LENGTH_SHORT).show();
                cargarDatosAsientos(); // Recargar UI
            }

            @Override
            public void onError(String error) {
                Toast.makeText(GestionarAsientosActivity.this, "Error: " + error, Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void liberarAsientoFisico(int seatNumber) {
        seatsDataProcessor.freeSeat(horarioId, seatNumber, new SeatsDataProcessor.SeatReservationCallback() {
            @Override
            public void onSuccess() {
                Toast.makeText(GestionarAsientosActivity.this, "Asiento liberado", Toast.LENGTH_SHORT).show();
                cargarDatosAsientos(); // Recargar UI
            }

            @Override
            public void onError(String error) {
                Toast.makeText(GestionarAsientosActivity.this, "Error: " + error, Toast.LENGTH_SHORT).show();
            }
        });
    }

    @Override
    public void onSeatDeselected(int seatNumber) {}

    @Override
    public void onExpandableSectionRequestedToCollapse() {}
}

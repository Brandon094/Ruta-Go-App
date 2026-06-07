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
import com.chopcode.trasnportenataga_laplata.fragments.BottomNavFragment;
import com.chopcode.trasnportenataga_laplata.models.Reserva;
import com.chopcode.trasnportenataga_laplata.services.reservations.ReservaService;
import com.google.android.material.appbar.MaterialToolbar;
import com.google.android.material.dialog.MaterialAlertDialogBuilder;
import com.google.android.material.snackbar.Snackbar;
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
        setupBottomNavigation();
        
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
        
        tvRutaNombre.setText(rutaNombre != null ? rutaNombre : "Ruta no disponible");
        tvHorarioInfo.setText("Horario: " + (horarioHora != null ? horarioHora : "--:--"));
        
        setSupportActionBar(topAppBar);
        topAppBar.setNavigationOnClickListener(v -> finish());
        
        topAppBar.setOnMenuItemClickListener(item -> {
            if (item.getItemId() == R.id.action_refresh) {
                cargarDatosAsientos();
                return true;
            }
            return false;
        });
    }

    private void setupManagers() {
        analyticsHelper = new ReservationAnalyticsHelper("GestionarAsientos");
        seatManager = new SeatManager(this, analyticsHelper);
        seatManager.setSeatSelectionListener(this);
        seatManager.configurarAsientos();
        
        seatsDataProcessor = new SeatsDataProcessor();
        reservaService = new ReservaService();
    }

    private void setupBottomNavigation() {
        getSupportFragmentManager().beginTransaction()
                .replace(R.id.bottom_nav_container, BottomNavFragment.newInstance(true))
                .commit();
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
                Snackbar.make(findViewById(android.R.id.content), "Error: " + error, Snackbar.LENGTH_LONG).show();
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
                
                long hoy = System.currentTimeMillis();
                long hace24h = hoy - (24 * 60 * 60 * 1000); // Ventana de 24 horas
                
                for (DataSnapshot ds : snapshot.getChildren()) {
                    Reserva r = ds.getValue(Reserva.class);
                    if (r != null && horarioId.equals(r.getHorarioId())) {
                        
                        // Solo considerar reservas recientes y válidas (no canceladas)
                        boolean esReciente = r.getFechaReserva() > hace24h;
                        boolean esValida = !"Cancelada".equalsIgnoreCase(r.getEstadoReserva());
                        
                        if (esReciente && esValida) {
                            asientosOcupadosApp.add(r.getPuestoReservado());
                        }
                    }
                }
                
                // Los que están ocupados pero no tienen reserva activa en la app son físicos
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
        Snackbar.make(findViewById(android.R.id.content), 
                "Asiento ocupado por la App (No se puede modificar)", 
                Snackbar.LENGTH_SHORT).show();
    }

    private void mostrarDialogoReservarFisico(int seatNumber) {
        new MaterialAlertDialogBuilder(this, R.style.AppDialogTheme)
                .setTitle("Confirmar Venta Física")
                .setMessage("¿Deseas bloquear el asiento " + seatNumber + " por venta física?")
                .setIcon(R.drawable.ic_seat)
                .setPositiveButton("Bloquear Asiento", (dialog, which) -> {
                    marcarAsientoFisico(seatNumber);
                })
                .setNegativeButton("Cancelar", null)
                .show();
    }

    private void mostrarDialogoLiberarAsientoFisico(int seatNumber) {
        new MaterialAlertDialogBuilder(this, R.style.AppDialogTheme)
                .setTitle("Liberar Asiento")
                .setMessage("¿Deseas liberar el asiento " + seatNumber + " marcado como venta física?")
                .setIcon(R.drawable.ic_clear)
                .setPositiveButton("Liberar Ahora", (dialog, which) -> {
                    liberarAsientoFisico(seatNumber);
                })
                .setNegativeButton("Cerrar", null)
                .show();
    }

    private void marcarAsientoFisico(int seatNumber) {
        seatsDataProcessor.reserveSeat(horarioId, seatNumber, new SeatsDataProcessor.SeatReservationCallback() {
            @Override
            public void onSuccess() {
                Snackbar.make(findViewById(android.R.id.content), 
                        "Asiento bloqueado correctamente", Snackbar.LENGTH_SHORT).show();
                cargarDatosAsientos();
            }

            @Override
            public void onError(String error) {
                Snackbar.make(findViewById(android.R.id.content), "Error: " + error, Snackbar.LENGTH_LONG).show();
            }
        });
    }

    private void liberarAsientoFisico(int seatNumber) {
        seatsDataProcessor.freeSeat(horarioId, seatNumber, new SeatsDataProcessor.SeatReservationCallback() {
            @Override
            public void onSuccess() {
                Snackbar.make(findViewById(android.R.id.content), 
                        "Asiento liberado y disponible", Snackbar.LENGTH_SHORT).show();
                cargarDatosAsientos();
            }

            @Override
            public void onError(String error) {
                Snackbar.make(findViewById(android.R.id.content), "Error: " + error, Snackbar.LENGTH_LONG).show();
            }
        });
    }

    @Override
    public void onSeatDeselected(int seatNumber) {}

    @Override
    public void onExpandableSectionRequestedToCollapse() {}
}

package com.chopcode.rutago.app.models;

/**
 * Modelo para las calificaciones de conductores
 */
public class Calificacion {
    private String id;
    private String pasajeroId;
    private String pasajeroNombre;
    private String conductorId;
    private String reservaId;
    private String ruta;
    private float rating;
    private String comentario;
    private long fecha;

    public Calificacion() {
        // Requerido por Firebase
    }

    public Calificacion(String pasajeroId, String pasajeroNombre, String conductorId, 
                        String reservaId, String ruta, float rating, String comentario) {
        this.pasajeroId = pasajeroId;
        this.pasajeroNombre = pasajeroNombre;
        this.conductorId = conductorId;
        this.reservaId = reservaId;
        this.ruta = ruta;
        this.rating = rating;
        this.comentario = comentario;
        this.fecha = System.currentTimeMillis();
    }

    // Getters y Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getPasajeroId() { return pasajeroId; }
    public void setPasajeroId(String pasajeroId) { this.pasajeroId = pasajeroId; }

    public String getPasajeroNombre() { return pasajeroNombre; }
    public void setPasajeroNombre(String pasajeroNombre) { this.pasajeroNombre = pasajeroNombre; }

    public String getConductorId() { return conductorId; }
    public void setConductorId(String conductorId) { this.conductorId = conductorId; }

    public String getReservaId() { return reservaId; }
    public void setReservaId(String reservaId) { this.reservaId = reservaId; }

    public String getRuta() { return ruta; }
    public void setRuta(String ruta) { this.ruta = ruta; }

    public float getRating() { return rating; }
    public void setRating(float rating) { this.rating = rating; }

    public String getComentario() { return comentario; }
    public void setComentario(String comentario) { this.comentario = comentario; }

    public long getFecha() { return fecha; }
    public void setFecha(long fecha) { this.fecha = fecha; }
}

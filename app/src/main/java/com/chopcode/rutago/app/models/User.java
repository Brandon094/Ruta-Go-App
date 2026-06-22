package com.chopcode.rutago.app.models;

import com.google.firebase.database.IgnoreExtraProperties;
import com.google.firebase.database.PropertyName;

@IgnoreExtraProperties
public class User {
    protected String id;
    protected String nombre;
    protected String telefono;
    protected String email;
    protected String password;
    protected String photoUrl;
    protected String status; // "active", "inactive", "blocked"
    protected boolean solicitudBorrado;
    protected Long fechaSolicitudBorrado;

    public User() { }

    public User(String id, String nombre, String telefono, String email, String password) {
        this.id = id;
        this.nombre = nombre;
        this.telefono = telefono;
        this.email = email;
        this.password = password;
    }

    public User(String id, String nombre, String telefono, String email) {
        this.id = id;
        this.nombre = nombre;
        this.telefono = telefono;
        this.email = email;
    }

    @PropertyName("id")
    public String getId() { return id; }
    @PropertyName("id")
    public void setId(String id) { this.id = id; }

    @PropertyName("nombre")
    public String getNombre() { return nombre; }
    @PropertyName("nombre")
    public void setNombre(String nombre) { this.nombre = nombre; }
    @PropertyName("name")
    public void setName(String name) { this.nombre = name; }

    @PropertyName("telefono")
    public String getTelefono() { return telefono; }
    @PropertyName("telefono")
    public void setTelefono(String telefono) { this.telefono = telefono; }
    @PropertyName("phone")
    public void setPhone(String phone) { this.telefono = phone; }

    @PropertyName("email")
    public String getEmail() { return email; }
    @PropertyName("email")
    public void setEmail(String email) { this.email = email; }

    @PropertyName("password")
    public String getPassword() { return password; }
    @PropertyName("password")
    public void setPassword(String password) { this.password = password; }

    @PropertyName("photoUrl")
    public String getPhotoUrl() { return photoUrl; }
    @PropertyName("photoUrl")
    public void setPhotoUrl(String photoUrl) { this.photoUrl = photoUrl; }

    @PropertyName("estado")
    public String getEstado() { return status; }
    @PropertyName("estado")
    public void setEstado(String status) { this.status = status; }
    @PropertyName("status")
    public String getStatus() { return status; }
    @PropertyName("status")
    public void setStatus(String status) { this.status = status; }

    @PropertyName("solicitudBorrado")
    public boolean isSolicitudBorrado() { return solicitudBorrado; }
    @PropertyName("solicitudBorrado")
    public void setSolicitudBorrado(boolean solicitudBorrado) { this.solicitudBorrado = solicitudBorrado; }

    @PropertyName("fechaSolicitudBorrado")
    public Long getFechaSolicitudBorrado() { return fechaSolicitudBorrado; }
    @PropertyName("fechaSolicitudBorrado")
    public void setFechaSolicitudBorrado(Long fechaSolicitudBorrado) { this.fechaSolicitudBorrado = fechaSolicitudBorrado; }
}

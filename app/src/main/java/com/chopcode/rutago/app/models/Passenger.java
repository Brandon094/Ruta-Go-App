package com.chopcode.rutago.app.models;

import com.google.firebase.database.IgnoreExtraProperties;

/**
 * Passenger Model
 *
 * Especialización de la clase User para pasajeros.
 * Representa al cliente final del ecosistema que realiza reservas de asientos.
 */
@IgnoreExtraProperties
public class Passenger extends User {

    private String role = "passenger";

    /**
     * Constructor vacío requerido por Firebase.
     */
    public Passenger() {
        super();
    }

    /**
     * Constructor para registro tradicional (Email/Password).
     */
    public Passenger(String id, String name, String phone, String email, String password) {
        super(id, name, phone, email, password);
    }

    /**
     * Constructor para autenticación social (Google).
     */
    public Passenger(String id, String name, String phone, String email){
        super(id, name, phone, email);
    }

    /**
     * @return El rol asignado por defecto ("passenger").
     */
    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "Passenger: "+
                "id=" + id +
                ", name=" + nombre +
                ", phone=" + telefono +
                ", email=" + email +
                ", role=" + role;
    }
}

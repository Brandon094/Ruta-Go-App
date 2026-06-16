package com.chopcode.rutago.app.models;

public class Passenger extends User {

    private String role = "passenger";

    public Passenger() {
        super();
    }
    // Constructor para Correo y contraseña
    public Passenger(String id, String name, String phone, String email, String password) {
        super(id, name, phone, email, password);
    }
    // Constructor para iniciar con google
    public Passenger(String id, String name, String phone, String email){
        super(id, name, phone, email);
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    // Metodo toString
    @Override
    public String toString() {
        return "Passenger: "+
                "id=" + id +
                "name=" + nombre +
                "phone=" + telefono +
                "email=" + email +
                "role=" + role;
    }

    // Métodos específicos para pasajeros, por ejemplo, para reservar asientos, pueden agregarse aquí.

}

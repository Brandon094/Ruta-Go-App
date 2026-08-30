package com.chopcode.rutago.app.models

import com.google.firebase.database.IgnoreExtraProperties

/**
 * 📦 MODEL: Passenger
 * Especialización de la clase User para pasajeros.
 */
@IgnoreExtraProperties
class Passenger : User {
    constructor() : super() {
        rol = "usuario"
    }

    constructor(id: String, name: String, phone: String, email: String) : super() {
        this.id = id
        this.nombre = name
        this.telefono = phone
        this.email = email
        this.rol = "usuario"
    }

    constructor(id: String, name: String, phone: String, email: String, password: String) : super() {
        this.id = id
        this.nombre = name
        this.telefono = phone
        this.email = email
        this.rol = "usuario"
        // password no se guarda en el objeto usualmente, pero se recibe en el constructor legacy
    }

    override fun toString(): String {
        return "Passenger: id=$id, name=$nombre, phone=$telefono, email=$email, role=$rol"
    }
}

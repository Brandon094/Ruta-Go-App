# 📖 Inmersión Técnica: Modelos de Datos (POJOs)

Este documento detalla la estructura, jerarquía y propósito de los modelos de datos en Ruta-Go, diseñados para una sincronización eficiente con Firebase Realtime Database.

---

## 🏗️ 1. Jerarquía de Usuarios
El sistema implementa un modelo de herencia para la gestión de identidades y roles:

*   **`User` (Base)**: Clase madre que contiene los atributos compartidos (UID, Nombre, Email, Teléfono, Foto y Estado de Borrado).
*   **`Passenger` extends `User`**: Especialización para el cliente final. Incluye el rol por defecto.
*   **`Driver` extends `User`**: Especialización operativa. Vincula al usuario con un vehículo (`vehicleId`) y una agenda de horarios.

---

## 🚌 2. Infraestructura del Vehículo
*   **`Vehicle`**: Contiene la ficha técnica (Placa, Marca, Modelo, Capacidad).
    *   *Nota*: El campo `capacity` es crítico, ya que el motor de UI lo utiliza para generar dinámicamente el Grid de asientos.

---

## 🕒 3. Planificación y Logística
*   **`Schedule`**: Representa un despacho en la planilla. Conecta una ruta, una hora, un precio y un conductor.
*   **`SeatAvailability`**: Monitorea el inventario de puestos en tiempo real para cada `Schedule`.

---

## 🎫 4. Transaccionalidad
*   **`Reservation`**: El modelo más complejo. Utiliza **Mapeo Dual** (Anotaciones `@PropertyName`) para permitir que la base de datos hable Español (`idReserva`) mientras el código Java utiliza Inglés (`idReservation`).
    *   Contiene la información de contacto de ambas partes para el chat.
    *   Rastrea el estado de la reserva (`Pendiente`, `Confirmada`, `Cancelada`).

---

## 💬 5. Comunicación y Feedback
*   **`ChatMessage`**: Estructura para el sistema de mensajería instantánea entre pasajero y conductor.
*   **`Rating`**: Captura la experiencia del usuario (puntuación y comentarios) tras finalizar un viaje.

---
**Chop Code Solutions - Documentación de Ingeniería v1.3.0**

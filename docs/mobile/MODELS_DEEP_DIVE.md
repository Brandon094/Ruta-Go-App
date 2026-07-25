# 📖 Inmersión Técnica: Modelos de Datos (POJOs) v1.9.9.5

Este documento detalla la estructura, jerarquía y propósito de los modelos de datos en la App Android, diseñados para una sincronización eficiente con Firebase Realtime Database y paridad con el Portal Web.

---

## 🏗️ 1. Jerarquía de Usuarios (SSO)
El sistema implementa un modelo de herencia para la gestión de identidades bajo el estándar de Identidad Única:

*   **`User` (Base)**: Clase madre con atributos compartidos (UID, Nombre, Email, Teléfono, Foto).
*   **`Passenger`**: Especialización para el cliente final. Incluye el contador de **Puntos Go**.
*   **`Driver`**: Especialización operativa. Vincula al usuario con un vehículo (`vehicleId`) y posee la propiedad `posicionEscalafon` para la rotación.
*   **`Owner`**: Rol administrativo para la visualización de flota y analíticas.

---

## 🚌 2. Infraestructura del Vehículo
*   **`Vehicle`**: Contiene la ficha técnica (Placa, Marca, Modelo, Capacidad).
    *   **Propiedad**: Incluye el campo `ownerId` para el aislamiento comercial en el Dashboard.

---

## 🕒 3. Planificación y Logística
*   **`Schedule`**: Representa un despacho. Conecta una ruta, hora, precio, conductor y ahora también el `vehiculoId` para una trazabilidad total.
*   **`SeatAvailability`**: Modelo reactivo que monitorea el inventario de puestos (libres vs ocupados).

---

## 🎫 4. Transaccionalidad (Mapeo Dual)
*   **`Reservation`**: Utiliza anotaciones `@PropertyName` para la compatibilidad bilingüe (Firebase en Español / Código en Inglés). Soporta los campos `userId` y `usuarioId` para garantizar la visibilidad histórica entre plataformas Android y Web.

---

## 💬 5. Comunicación y Reputación
*   **`ChatMessage`**: Estructura para la mensajería en tiempo real.
*   **`Rating`**: Captura el feedback del usuario y alimenta el estatus del conductor.

---
**Chop Code Solutions - Mobile Engineering 2026**

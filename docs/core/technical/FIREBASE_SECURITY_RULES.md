# 🛡️ Manual de Seguridad: Firebase Realtime Database (v1.9.9.5)

Este documento detalla la lógica de gobernanza de datos del ecosistema **Ruta-Go**, asegurando la privacidad del usuario, el aislamiento comercial entre socios y el cumplimiento con la Ley de Habeas Data.

---

## 🏛️ 1. Filosofía de Seguridad (RBAC)
El sistema utiliza un modelo de **Control de Acceso basado en Roles** y **UID-Locking**.

*   **Identidad Obligatoria**: `auth != null` es el requisito base para cualquier operación.
*   **Aislamiento de Perfiles**: Los datos personales están bloqueados por el UID del propietario.
*   **Jerarquía de Poder**: Admin Root > Dueño de Flota (Socio) > Operador (Conductor) > Pasajero.

---

## 🔐 2. Análisis de Nodos Críticos

### 👥 Perfiles y Búsqueda (/usuarios)
*   **Lectura Administrativa**: Tanto **Admins** como **Dueños** pueden leer la lista de usuarios para facilitar la búsqueda de conductores por email.
*   **Lectura de Perfil**: Cualquier usuario autenticado puede leer su propio perfil.
*   **Escritura Restringida**: Solo el Admin Root o el propio Usuario pueden modificar sus datos personales.

### 💼 Gestión de Socios (/dueños)
*   **Activación**: Solo el Admin Root puede otorgar el rango de Socio. Un usuario puede escribir su propio nodo solo si es para registro inicial (pendiente).
*   **Auditoría**: El portal web valida la existencia del UID en este nodo antes de permitir el acceso al Business Dashboard.

### 🚗 Control de Activos (/vehiculos)
*   **Propiedad Blindada**: La escritura está permitida si el `auth.uid` coincide con el `ownerId` registrado, o si el usuario es Admin.
*   **Integridad de Datos**: Los conductores pueden leer la información técnica de su bus asignado para la operación diaria.

### 🕒 Gestión de Horarios (/horarios)
*   **Operación Master**: Solo Admins y Dueños pueden modificar la estructura de turnos.
*   **Asignación de Operador**: Los conductores pueden vincularse a turnos vacíos, pero no pueden sobrescribir a otros compañeros.

### 💺 Motor de Disponibilidad (/disponibilidadAsientos)
*   **Transaccionalidad**: Escritura abierta para usuarios autenticados para permitir reservas en tiempo real.
*   **Blindaje de Capacidad**: La edición del campo `totalAsientos` (capacidad técnica) está restringida al Admin Root, al Dueño de la flota o al Conductor asignado al turno, evitando fraudes de sobrecupo.

### 🎫 Reservas y Privacidad (/reservas)
*   **Validación Cruzada**: Una reserva solo puede ser leída o escrita por los involucrados: el Pasajero, el Conductor, el Dueño del bus o el Admin Root.
*   **Indexación**: El nodo está optimizado para búsquedas por `driverId`, `scheduleId`, `userId` y `reservationDate`.

### 💬 Mensajería Instantánea (/chats)
*   **Privacidad Punto a Punto**: Solo el pasajero y el conductor de la reserva asociada pueden leer y escribir mensajes.
*   **Supervisión**: Admins y Dueños tienen acceso de lectura para resolución de disputas y soporte logístico.

### ⭐ Reputación y Feedback (/calificaciones_conductores)
*   **Transparencia**: Lectura pública para usuarios registrados.
*   **Protección de Reseña**: Solo se permite la creación de una nueva reseña (`!data.exists()`). No se permiten ediciones posteriores para garantizar la autenticidad del feedback.

### 📊 Protección Financiera (/estadisticas)
*   **Acceso Filtrado**: Los conductores solo pueden acceder a sus estadísticas del día actual. Admins y Dueños tienen visibilidad completa de los ingresos de su flota.

---
**ChopCode Solutions - Ingeniería de Seguridad 2026**

# 📖 Diccionario de Datos NoSQL - Ecosistema Go v1.3.0

Este documento detalla la estructura del esquema en Firebase Realtime Database, especificando el mapeo bilingüe entre los campos del código (Inglés) y los nodos de persistencia (Español).

---

## 👨‍✈️ 1. Nodo: `/conductores/`
Almacena el perfil profesional y el estado operativo de los conductores.

| Campo (Firebase) | Atributo (Java) | Tipo | Descripción |
|:---|:---|:---|:---|
| `nombre` | `name` | String | Nombre legal del operador. |
| `email` | `email` | String | Correo electrónico vinculado. |
| `telefono` | `phone` | String | Línea de contacto directo. |
| `placaVehiculo` | `vehiclePlate` | String | **(Legacy)** Referencia al activo. Se moverá a `/asignaciones/`. |
| `horariosAsignados` | `assignedSchedules` | List<String> | IDs de turnos activos para la jornada. |
| `status` | `status` | String | `active`, `inactive`, `blocked`. |
| `tokenFCM` | `tokenFCM` | String | Identificador para notificaciones Push. |
| `rating` | `rating` | Float | Calificación promedio histórica. |

---

## 👑 2. Nodo: `/dueños/` (Fase 2)
Centraliza la propiedad de los activos y el acceso al Dashboard Business.

| Campo (Firebase) | Atributo (Java) | Tipo | Descripción |
|:---|:---|:---|:---|
| `nombre` | `name` | String | Identidad del propietario. |
| `email` | `email` | String | Cuenta de acceso administrativo. |
| `vehiculos` | `vehicles` | List<String> | Lista de placas de su propiedad. |
| `plan` | `plan` | String | `freemium`, `premium`. |

---

## 🚌 3. Nodo: `/vehiculos/`
Especificaciones técnicas y vinculación de propiedad.

| Campo (Firebase) | Atributo (Java) | Tipo | Descripción |
|:---|:---|:---|:---|
| `placa` | `plate` | String | Identificador primario. |
| `modelo` | `model` | String | Marca y línea. |
| `capacidad` | `capacity` | Integer | Número máximo de plazas. |
| `dueñoId` | `ownerId` | String | UID del dueño (Referencia a `/dueños/`). |
| `conductorActual` | `currentDriver` | String | UID del conductor asignado dinámicamente. |

---

## 🕒 3. Nodo: `/horarios/`
Planilla maestra de despachos intermunicipales.

| Campo (Firebase) | Atributo (Java) | Tipo | Descripción |
|:---|:---|:---|:---|
| `hora` | `time` | String | Formato 12h (ej: 06:15 AM). |
| `ruta` | `route` | String | Trayecto (ej: Natagá → La Plata). |
| `conductorId` | `driverId` | String | UID del conductor que tiene el turno. |

---

## 💺 4. Nodo: `/disponibilidadAsientos/`
Motor de inventario en tiempo real. Organizado por `horarioId`.

| Campo (Firebase) | Atributo (Java) | Tipo | Descripción |
|:---|:---|:---|:---|
| `asientosDisponibles` | `availableSeats` | Integer | Cupos libres para reserva digital. |
| `totalAsientos` | `totalSeats` | Integer | Sincronizado con la capacidad del bus. |
| `asientosOcupados` | `occupiedSeats` | Map<String, Bool> | Mapa de estados por número de asiento. |

---

## 🎫 5. Nodo: `/reservas/`
Transacciones activas del sistema de transporte.

| Campo (Firebase) | Atributo (Java) | Tipo | Descripción |
|:---|:---|:---|:---|
| `usuarioId` | `userId` | String | UID del pasajero adquirente. |
| `conductorId` | `driverId` | String | UID del operador que presta el servicio. |
| `asientoReservado` | `reservedSeat` | Integer | Identificador físico del puesto. |
| `estadoReserva` | `reservationStatus` | String | `Pendiente`, `Confirmada`, `Cancelada`. |
| `precio` | `price` | Double | Valor pactado al momento de la compra. |
| `fechaReserva` | `reservationDate` | Long | Timestamp de creación. |

---

## 👥 6. Nodo: `/usuarios/`
Perfiles de pasajeros y metadatos de fidelización.

| Campo (Firebase) | Atributo (Java) | Tipo | Descripción |
|:---|:---|:---|:---|
| `nombre` | `name` | String | Identidad del cliente. |
| `email` | `email` | String | Correo de autenticación. |
| `tokenFCM` | `tokenFCM` | String | Canal para tiquetes y notificaciones. |
| `puntosGo` | `puntosGo` | Integer | Acumulado para beneficios Premium. |
| `solicitudBorrado` | `solicitudBorrado` | Boolean | Flag para cumplimiento legal (Derecho al olvido). |

---
**Chop Code Solutions - Data Architecture v1.3.0**

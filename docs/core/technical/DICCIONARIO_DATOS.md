# 📖 Diccionario de Datos NoSQL - Ecosistema Go v1.9.9.5

Este documento detalla la estructura del esquema en Firebase Realtime Database, especificando el mapeo bilingüe entre los campos del código (React/Java) y los nodos de persistencia (Español).

---

## 👑 1. Nodo: `/dueños/`
Control de acceso al portal empresarial y validación de roles de socios.

| Estructura | Tipo | Descripción |
|:---|:---|:---|
| `/$uid` | Boolean | `true` otorga acceso al Business Dashboard. |
| `/$uid` | String | `"pendiente"` indica registro exitoso esperando auditoría por el Admin Root. |

---

## 👨‍✈️ 2. Nodo: `/conductores/`
Almacena el perfil profesional y el estado operativo de los conductores.

| Campo (Firebase) | Atributo (JS/Java) | Tipo | Descripción |
|:---|:---|:---|:---|
| `nombre` | `name` | String | Nombre legal del operador. |
| `email` | `email` | String | Correo electrónico vinculado. |
| `placaVehiculo` | `vehiclePlate` | String | Referencia al activo vinculado actualmente. |
| `horariosAsignados` | `assignedSchedules` | List<String> | IDs de turnos activos para la jornada actual. |
| `status` | `status` | String | Estado operativo: `active`, `inactive`, `blocked`. |
| `tokenFCM` | `tokenFCM` | String | Identificador de dispositivo para notificaciones Push. |
| `posicionEscalafon`| `rankPosition` | Integer | Índice fijo para el algoritmo de rotación de turnos. |

---

## 🚌 3. Nodo: `/vehiculos/`
Especificaciones técnicas y vinculación de propiedad de los activos del holding.

| Campo (Firebase) | Atributo (JS/Java) | Tipo | Descripción |
|:---|:---|:---|:---|
| `placa` | `plate` | String | Identificador primario (Key del nodo). |
| `modelo` | `model` | String | Marca y línea del vehículo. |
| `capacidad` | `capacity` | Integer | Número máximo de plazas para pasajeros. |
| `ownerId` | `ownerId` | String | UID del dueño (Referencia a `/dueños/`). |
| `driverId` | `driverId` | String | UID del conductor asignado actualmente. |
| `ano` | `year` | String | Año del modelo del vehículo. |

---

## 🕒 4. Nodo: `/horarios/`
Planilla maestra de despachos intermunicipales entre Nátaga y La Plata.

| Campo (Firebase) | Atributo (JS/Java) | Tipo | Descripción |
|:---|:---|:---|:---|
| `hora` | `time` | String | Formato 12h de salida (ej: 06:15 AM). |
| `ruta` | `route` | String | Trayecto y sentido (ej: Nátaga ➔ La Plata). |
| `conductorId` | `driverId` | String | UID del conductor asignado a este turno. |
| `vehiculoId` | `vehicleId` | String | Placa del vehículo asignado a este turno. |

---

## 🎫 5. Nodo: `/reservas/`
Transacciones activas y registro histórico del sistema de transporte.

| Campo (Firebase) | Atributo (JS/Java) | Tipo | Descripción |
|:---|:---|:---|:---|
| `usuarioId` / `userId` | `userId` | String | UID del pasajero que realizó la reserva. |
| `driverId` / `conductorId`| `driverId` | String | UID del operador que presta el servicio. |
| `vehiculoId` / `plate` | `vehicleId` | String | Placa del bus asignado a la reserva. |
| `estadoReserva` | `reservationStatus` | String | `pendiente`, `confirmada`, `cancelada`, `completada`. |
| `puestoReservado` | `reservedSeat` | Integer | Número de asiento asignado (1-13). |
| `precio` | `price` | Double | Valor total cobrado por el pasaje. |

---

## 👥 6. Nodo: `/usuarios/`
Perfiles maestros de todos los actores y metadatos de fidelización.

| Campo (Firebase) | Atributo (JS/Java) | Tipo | Descripción |
|:---|:---|:---|:---|
| `nombre` | `name` | String | Identidad pública del usuario. |
| `email` | `email` | String | Correo principal de autenticación. |
| `rol` | `role` | String | Rol en el sistema: `pasajero`, `dueño`, `admin`. |
| `puntosGo` | `points` | Integer | Puntos acumulados para niveles de fidelidad. |
| `solicitudBorrado` | `deletionRequested` | Boolean | Flag para inicio del flujo de "Derecho al Olvido". |
| `fechaSolicitudBorrado`| `deletionDate` | Long | Timestamp del momento de la solicitud. |

---
**ChopCode Solutions - Data Architecture 2026**

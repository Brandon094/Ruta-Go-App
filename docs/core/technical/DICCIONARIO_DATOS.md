# 📖 Diccionario de Datos NoSQL - Ecosistema Go v1.5.0

Este documento detalla la estructura del esquema en Firebase Realtime Database, especificando el mapeo bilingüe entre los campos del código (React/Java) y los nodos de persistencia (Español).

---

## 👑 1. Nodo: `/dueños/`
Control de acceso al portal empresarial y validación de roles.

| Estructura | Tipo | Descripción |
|:---|:---|:---|
| `/$uid` | Boolean | `true` otorga acceso al Business Dashboard. |
| `/$uid` | String | `"pendiente"` indica registro exitoso esperando auditoría. |

---

## 👨‍✈️ 2. Nodo: `/conductores/`
Almacena el perfil profesional y el estado operativo de los conductores.

| Campo (Firebase) | Atributo (JS/Java) | Tipo | Descripción |
|:---|:---|:---|:---|
| `nombre` | `name` | String | Nombre legal del operador. |
| `email` | `email` | String | Correo electrónico vinculado. |
| `placaVehiculo` | `vehiclePlate` | String | Referencia al activo vinculado. |
| `horariosAsignados` | `assignedSchedules` | List<String> | IDs de turnos activos para la jornada. |
| `status` | `status` | String | `active`, `inactive`, `blocked`. |
| `tokenFCM` | `tokenFCM` | String | Identificador para notificaciones Push. |

---

## 🚌 3. Nodo: `/vehiculos/`
Especificaciones técnicas y vinculación de propiedad.

| Campo (Firebase) | Atributo (JS/Java) | Tipo | Descripción |
|:---|:---|:---|:---|
| `placa` | `plate` | String | Identificador primario (Key). |
| `modelo` | `model` | String | Marca y línea. |
| `capacidad` | `capacity` | Integer | Número máximo de plazas. |
| `ownerId` | `ownerId` | String | UID del dueño (Referencia a `/dueños/`). |
| `driverId` | `driverId` | String | UID del conductor asignado actualmente. |

---

## 🕒 4. Nodo: `/horarios/`
Planilla maestra de despachos intermunicipales.

| Campo (Firebase) | Atributo (JS/Java) | Tipo | Descripción |
|:---|:---|:---|:---|
| `hora` | `time` | String | Formato 12h (ej: 06:15 AM). |
| `ruta` | `route` | String | Trayecto (ej: Nátaga → La Plata). |
| `conductorId` | `driverId` | String | UID del conductor que tiene el turno. |

---

## 🎫 5. Nodo: `/reservas/`
Transacciones activas del sistema de transporte.

| Campo (Firebase) | Atributo (JS/Java) | Tipo | Descripción |
|:---|:---|:---|:---|
| `usuarioId` | `userId` | String | UID del pasajero adquirente. |
| `driverId` | `driverId` | String | UID del operador que presta el servicio. |
| `vehiculoId` | `vehicleId` | String | Placa del bus asignado a la reserva. |
| `estadoReserva` | `reservationStatus` | String | `confirmada`, `cancelada`, `completada`. |
| `precio` | `price` | Double | Valor pactado al momento de la compra. |

---

## 👥 6. Nodo: `/usuarios/`
Perfiles de pasajeros y metadatos de fidelización.

| Campo (Firebase) | Atributo (JS/Java) | Tipo | Descripción |
|:---|:---|:---|:---|
| `nombre` | `name` | String | Identidad del cliente. |
| `email` | `email` | String | Correo de autenticación. |
| `rol` | `role` | String | `pasajero`, `dueño`, `admin`. |
| `puntosGo` | `puntosGo` | Integer | Acumulado para beneficios Premium. |
| `solicitudBorrado` | `solicitudBorrado` | Boolean | Flag para Habeas Data. |

---
**ChopCode Solutions - Data Architecture 2026**

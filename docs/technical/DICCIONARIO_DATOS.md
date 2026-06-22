# 📖 Diccionario de Datos - Ruta-Go v1.2.3

Este documento detalla la estructura del esquema NoSQL en Firebase Realtime Database, especificando el mapeo entre los campos del código (Inglés) y los nodos de la base de datos (Español).

---

## 🏗️ Nodo 1: `/conductores/`
Almacena el perfil profesional y operativo de los choferes.

| Campo (Firebase) | Atributo (Java) | Tipo | Descripción |
|:---|:---|:---|:---|
| `nombre` | `name` | String | Nombre completo del conductor. |
| `email` | `email` | String | Correo electrónico de acceso. |
| `telefono` | `phone` | String | Número de contacto celular. |
| `placaVehiculo` | `vehiclePlate` | String | Placa del vehículo asignado. |
| `vehiculoId` | `vehicleId` | String | ID único del vehículo (generalmente la placa). |
| `horariosAsignados` | `assignedSchedules` | List<String> | IDs de los horarios de la planilla maestra. |
| `status` | `status` | String | Estado de cuenta: `active`, `inactive`, `blocked`. |
| `isPremium` | `isPremium` | Boolean | (Fase 3) Indica si el conductor tiene suscripción activa. |
| `rating` | `rating` | Float | Calificación promedio del conductor. |
| `photoUrl` | `photoUrl` | String | Link a la imagen en Firebase Storage. |

---

## 🚌 Nodo 2: `/vehiculos/`
Ficha técnica del activo móvil vinculado al conductor.

| Campo (Firebase) | Atributo (Java) | Tipo | Descripción |
|:---|:---|:---|:---|
| `placa` | `plate` | String | Identificador único del vehículo. |
| `modelo` | `model` | String | Marca y modelo (ej: Nissan Frontier). |
| `capacidad` | `capacity` | Integer | Número total de asientos disponibles. |
| `ano` | `year` | String | Año de fabricación del vehículo. |
| `conductorId` | `driverId` | String | UID del conductor propietario. |

---

## 🕒 Nodo 3: `/horarios/`
Planilla maestra de despachos diarios.

| Campo (Firebase) | Atributo (Java) | Tipo | Descripción |
|:---|:---|:---|:---|
| `hora` | `time` | String | Hora de salida formateada (ej: 06:15 AM). |
| `ruta` | `route` | String | Trayecto (ej: Natagá -> La Plata). |
| `conductorId` | `driverId` | String | UID del conductor que tiene el turno. |

---

## 💺 Nodo 4: `/disponibilidadAsientos/`
Control de ocupación por cada despacho.

| Campo (Firebase) | Atributo (Java) | Tipo | Descripción |
|:---|:---|:---|:---|
| `asientosDisponibles` | `availableSeats` | Integer | Conteo de puestos libres. |
| `totalAsientos` | `totalSeats` | Integer | Capacidad máxima según ficha técnica. |
| `asientosOcupados` | `occupiedSeats` | Map<String, Integer> | Lista de números de asientos vendidos físicamente. |

---

## 🎫 Nodo 5: `/reservas/`
Transacciones generadas por los pasajeros.

| Campo (Firebase) | Atributo (Java) | Tipo | Descripción |
|:---|:---|:---|:---|
| `userId` | `userId` | String | UID del pasajero que reserva. |
| `asientoSeleccionado` | `selectedSeat` | Integer | Número de puesto elegido (1-N). |
| `estado` | `status` | String | `Pendiente`, `Confirmada`, `Cancelada`. |
| `precio` | `price` | Double | Valor cobrado al momento de la reserva. |
| `fechaReserva` | `reservationDate` | Long | Timestamp del momento de creación. |

---

## 👥 Nodo 6: `/usuarios/`
Perfiles de pasajeros y su historial de fidelización.

| Campo (Firebase) | Atributo (Java) | Tipo | Descripción |
|:---|:---|:---|:---|
| `nombre` | `name` | String | Nombre del pasajero. |
| `email` | `email` | String | Correo de contacto. |
| `telefono` | `phone` | String | Teléfono de contacto. |
| `status` | `status` | String | `active`, `inactive`, `blocked`. |
| `puntosGo` | `puntosGo` | Integer | (Fase 3) Puntos acumulados por viajes. |
| `nivelEstatus` | `levelStatus` | String | (Fase 3) Rango del usuario: `Plata`, `Oro`, `Diamante`. |

---
**Chop Code Solutions - 2026**

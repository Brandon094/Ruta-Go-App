# 📖 Diccionario de Datos NoSQL Normalizado v2.0 - Ecosistema Ruta-Go

Este documento detalla el esquema NoSQL unificado en Firebase Realtime Database, especificando las llaves canónicas en **Inglés (camelCase)** que gobiernan la App Móvil Android en Kotlin y el Portal Web en React.

---

## 👥 1. Nodo Principal: `/users/` (Unificado para Pasajeros, Conductores, Dueños y Admins)
Almacena todos los perfiles del sistema bajo una sola colección. El acceso y las capacidades se discriminan según el atributo `role`.

| Campo (Firebase Key) | Tipo | Descripción |
|:---|:---|:---|
| `id` | String | UID de Firebase Authentication (Key del nodo). |
| `name` | String | Nombre completo del usuario. |
| `email` | String | Correo electrónico principal. |
| `phone` | String | Número celular de contacto. |
| `role` | String | Rol principal: `"admin"`, `"owner"`, `"driver"`, `"passenger"`. |
| `status` | String | Estado de cuenta: `"active"`, `"inactive"`, `"blocked"`. |
| `photoUrl` | String? | URL del avatar en Firebase Storage. |
| `fcmToken` | String? | Token de notificaciones nativas Android (FCM). |
| `fcmTokenWeb` | String? | Token de notificaciones para el Portal Web. |
| `registrationDate` | Long | Timestamp de creación de la cuenta. |
| `deletionRequested` | Boolean | Indicador de solicitud de borrado (Derecho al olvido). |
| `deletionRequestedDate`| Long? | Timestamp del inicio del periodo de gracia de borrado. |
| **Atributos de Conductor** *(Solo para `role: "driver"`)* | | |
| `vehicleId` / `vehiclePlate` | String? | Placa del vehículo vinculado al conductor. |
| `rankingPosition` | Integer | Índice fijo para el algoritmo de rotación nocturna de turnos. |
| `assignedSchedules` | List<String> | Lista de IDs de turnos asignados para el día (`["h007", "h017"]`). |

---

## 🚌 2. Nodo: `/vehicles/`
Ficha técnica y propiedad de los vehículos de la flota.

| Campo (Firebase Key) | Tipo | Descripción |
|:---|:---|:---|
| `id` / `plate` | String | Placa del vehículo (Key del nodo, ej: `"TBO550"`). |
| `model` | String | Modelo/Línea del vehículo (ej: `"Frontier"`). |
| `brand` | String | Marca (ej: `"Nissan"`). |
| `color` | String | Color registrado. |
| `year` | String | Año del modelo. |
| `capacity` | Integer | Capacidad total de pasajeros (ej: `13`). |
| `driverId` | String | UID del conductor asignado actualmente. |
| `ownerId` | String | UID del dueño (socio) vinculado. |
| `status` | String | Estado operativo: `"active"`, `"maintenance"`, `"inactive"`. |

---

## 🕒 3. Nodo: `/schedules/`
Planilla de itinerarios y despachos entre Nátaga y La Plata.

| Campo (Firebase Key) | Tipo | Descripción |
|:---|:---|:---|
| `id` | String | ID del turno (Key del nodo, ej: `"h001"`). |
| `route` | String | Trayecto (ej: `"Nátaga -> La Plata"`). |
| `time` | String | Hora de salida en formato 12h (ej: `"06:15 AM"`). |
| `duration` | String | Tiempo estimado de recorrido (ej: `"60 min"`). |
| `price` | String | Tarifa por pasaje en string/double (ej: `"12000"`). |
| `driverId` | String? | UID del conductor asignado a este turno. |
| `vehicleId` | String? | Placa del vehículo asignado a este turno. |
| `driverName` | String? | Nombre del conductor asignado. |

---

## 💺 4. Nodo: `/seatAvailability/`
Control dinámico en tiempo real de la ocupación de asientos por turno.

| Campo (Firebase Key) | Tipo | Descripción |
|:---|:---|:---|
| `totalSeats` | Integer | Total de plazas en el vehículo (ej: `13`). |
| `availableSeats` | Integer | Puestos libres disponibles para reserva. |
| `occupiedSeats` | Map<String, Boolean> | Mapa de asientos ocupados (ej: `{"1": true, "4": true}`). |

---

## 🎫 5. Nodo: `/reservations/`
Registro de reservas y pasajes expedidos.

| Campo (Firebase Key) | Tipo | Descripción |
|:---|:---|:---|
| `id` | String | UUID de la reserva (Key del nodo). |
| `userId` | String | UID del pasajero. |
| `driverId` | String | UID del conductor. |
| `scheduleId` | String | ID del turno reservado (ej: `"h009"`). |
| `origin` | String | Municipio de origen (ej: `"Nátaga"`). |
| `destination` | String | Municipio de destino (ej: `"La Plata"`). |
| `departureTime` | String | Hora de salida del viaje. |
| `estimatedDuration` | String | Tiempo estimado de viaje (`"60 min"`). |
| `status` | String | Estado: `"pending"`, `"confirmed"`, `"cancelled"`, `"completed"`. |
| `reservedSeat` | Integer | Número de puesto seleccionado (1-13). |
| `price` | Double | Tarifa cobrada por el tiquete. |
| `reservationDate` | Long | Timestamp del momento de la reserva. |
| `passengerName` | String | Nombre completo del pasajero. |
| `passengerPhone` | String | Celular del pasajero. |
| `driverName` | String | Nombre completo del conductor. |
| `vehiclePlate` | String | Placa del vehículo. |
| `vehicleModel` | String | Modelo del vehículo. |
| `paymentMethod` | String | Método de pago (`"efectivo"`). |
| `isRated` | Boolean | Si la reserva ya fue calificada por el pasajero. |
| `rating` | Float | Puntuación otorgada (1.0 - 5.0). |

---

## ⭐ 6. Nodo: `/driverRatings/`
Calificaciones y reseñas dejadas por pasajeros.

| Campo (Firebase Key) | Tipo | Descripción |
|:---|:---|:---|
| `id` | String | Key generada automáticamente por Firebase. |
| `driverId` | String | UID del conductor calificado. |
| `passengerId` | String | UID del pasajero que calificó. |
| `passengerName` | String | Nombre del pasajero. |
| `reservationId` | String | ID de la reserva vinculada. |
| `rating` | Float | Estrellas (1.0 a 5.0). |
| `comment` | String | Comentario u opinión escrita. |
| `date` | Long | Timestamp de la calificación. |

---

## 💰 7. Nodo: `/prices/`
Matriz de tarifas por origen y destino.

| Estructura | Tipo | Descripción |
|:---|:---|:---|
| `/prices/{origin}/{destination}` | Double / Int | Tarifa estándar del pasaje (ej: `"Nátaga"/"La Plata": 12000`). |

---

## 💬 8. Nodo: `/chats/`
Mensajería en tiempo real entre pasajero y conductor por reserva.

| Estructura | Tipo | Descripción |
|:---|:---|:---|
| `/chats/{reservationId}/messages/{messageId}` | Object | `id`, `senderId`, `text`, `timestamp`. |

---
**ChopCode Solutions - Data Architecture 2026**

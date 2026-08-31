# 📊 Plan y Estado de Normalización de Base de Datos: Ruta-Go v2.0

Este documento define la arquitectura y el estado de la estandarización del esquema NoSQL en Firebase Realtime Database, unificando la App Móvil Android (Kotlin) y el Portal Web bajo llaves en **Inglés** con la técnica de **Deserialización Pasiva**.

---

## 🎯 Objetivos de Normalización
1.  **Estandarización 100% en Inglés**: Usar únicamente **Inglés (camelCase)** para la serialización de llaves NoSQL.
2.  **Eliminación de Redundancia de Escritura**: Eliminar la duplicidad de campos (ej: guardar `nombre` y `name` en el mismo nodo).
3.  **Compatibilidad Pasiva Hacia Atrás**: Poder leer registros históricos creados con llaves en español sin alterar la escritura limpia de registros nuevos.
4.  **Consistencia de Tipos**: Fechas en `Long` (timestamps), montos en `Double`, estados en cadenas normalizadas.

---

## 🏗️ Modelos Normalizados (`com.chopcode.rutago.app.data.models`)

### 1. `Reservation` (`reservations`)
- **Escritura Normalizada**: `id`, `userId`, `driverId`, `scheduleId`, `origin`, `destination`, `departureTime`, `estimatedDuration`, `status`, `reservedSeat`, `price`, `reservationDate`, `isRated`, `rating`, `passengerName`, `passengerPhone`, `vehiclePlate`, `vehicleModel`, `driverName`, `paymentMethod`.
- **Lectura Legada**: `@PropertyName` setters para `idReservation`, `idReserva`, `usuarioId`, `conductorId`, `horarioId`, `nombre`, `telefono`, `conductor`, `estadoReserva`, `puestoReservado`, `precio`, `fechaReserva`, `calificada`, `calificacion`, `modeloVehiculo`, `vehiculoId`, `placa`, `tiempoEstimado`, `origen`, `destino`, `metodoPago`.

### 2. `User` (`users` / `usuarios`)
- **Escritura Normalizada**: `id`, `name`, `phone`, `email`, `photoUrl`, `status`, `role`, `deletionRequested`, `deletionRequestedDate`.
- **Lectura Legada**: Setters para `nombre`, `telefono`, `rol`, `solicitudBorrado`, `fechaSolicitudBorrado`.

### 3. `Driver` (`drivers` / `conductores`)
- **Escritura Normalizada**: `vehicleId`, `vehiclePlate`, `vehicleModel`, `vehicleCapacity`, `assignedSchedules`, `rankingPosition`.
- **Lectura Legada**: Setters para `vehiculoId`, `placaVehiculo`, `modeloVehiculo`, `capacidadVehiculo`, `horariosAsignados`, `posicionEscalafon`.

### 4. `Vehicle` (`vehicles` / `vehiculos`)
- **Escritura Normalizada**: `id`, `plate`, `model`, `brand`, `color`, `year`, `capacity`, `driverId`, `ownerId`, `status`.
- **Lectura Legada**: Setters para `placa`, `modelo`, `marca`, `ano`, `año`, `capacidad`, `conductorId`, `estado`.

### 5. `Schedule` (`schedules` / `horarios`)
- **Escritura Normalizada**: `id`, `route`, `time`, `duration`, `price`, `availableSeats`, `totalCapacity`, `driverId`, `vehicleId`, `driverName`.
- **Lectura Legada**: Setters para `ruta`, `hora`, `conductorId`, `vehiculoId`.

### 6. `Rating` (`driverRatings` / `calificaciones_conductores`)
- **Escritura Normalizada**: `id`, `passengerId`, `passengerName`, `driverId`, `reservationId`, `route`, `rating`, `comment`, `date`.
- **Lectura Legada**: Setters para `pasajeroId`, `pasajeroNombre`, `conductorId`, `reservaId`, `comentario`, `fecha`.

---

## 🛠️ Estado de la Migración

- [x] **Fase 1: Implementación de Deserialización Pasiva en Kotlin (COMPLETADO)**: Eliminados los getters duplicados en español y mantenidos únicamente setters pasivos sin getters. Las escrituras desde Android ahora generan JSONs 100% limpios en inglés.
- [x] **Fase 2: Unificación de Modelos Android y Web (COMPLETADO)**: Paridad total de nombres de variables entre Kotlin data classes y componentes React Web.
- [ ] **Fase 3: Script de Limpieza NoSQL (Opcional - Mantenimiento)**: Limpieza batch en Firebase de nodos antiguos para eliminar propiedades obsoletas en español.

---
**ChopCode Solutions - Data Engineering 2026**

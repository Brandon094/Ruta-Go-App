# 📊 Plan de Normalización de Base de Datos: Ruta-Go v2.0

Este documento define la estrategia para estandarizar el esquema de Firebase Realtime Database, eliminando inconsistencias bilingües y asegurando la paridad total entre la App Android (Kotlin) y el Portal Web.

## 🎯 Objetivos
1.  **Estandarización**: Usar únicamente **Inglés** para las llaves (keys) de los objetos (Estándar de industria).
2.  **Eliminación de Redundancia**: Suprimir campos duplicados (ej: `nombre` vs `name`).
3.  **Consistencia de Tipos**: Asegurar que fechas sean siempre `Long` (timestamps) y montos sean `Double` o `Long`.
4.  **CamelCase**: Todas las llaves deben seguir el formato `camelCase`.

---

## 🏗️ Esquema Propuesto (Normalizado)

### 1. `reservations` (Nodo Crítico)
Anteriormente: Mezcla de `idReserva`, `idReservation`, `conductor`, `driver`, etc.
```json
{
  "id": "uuid",
  "userId": "string",
  "driverId": "string",
  "scheduleId": "string",
  "origin": "string",
  "destination": "string",
  "departureTime": "string", // "08:30 AM"
  "estimatedDuration": "string", // "60 min"
  "status": "confirmed | cancelled | pending",
  "reservedSeat": "int",
  "price": "double",
  "reservationDate": "long",
  "isRated": "boolean",
  "rating": "float",
  "vehicleDetails": {
    "plate": "string",
    "model": "string"
  }
}
```

### 2. `drivers` (Anteriormente `conductores`)
```json
{
  "uid": {
    "name": "string",
    "phone": "string",
    "vehicleId": "string",
    "assignedSchedules": ["h001", "h011"],
    "status": "active | inactive",
    "rankingPosition": "int",
    "fcmToken": "string"
  }
}
```

### 3. `schedules` (Anteriormente `horarios`)
```json
{
  "id": {
    "driverId": "string",
    "time": "string",
    "route": "string",
    "vehicleId": "string"
  }
}
```

### 4. `seatAvailability` (Anteriormente `disponibilidadAsientos`)
```json
{
  "scheduleId": {
    "availableCount": "int",
    "totalCount": "int",
    "occupiedSeats": {
      "1": true,
      "5": true
    }
  }
}
```

---

## 🛠️ Ruta de Implementación (Migration Path)

> [!WARNING]
> La migración debe ser gradual para no romper la app en producción.

1.  **Fase 1: Escritura Dual (Actual)**: Los modelos ya tienen `@PropertyName` para leer ambos idiomas. Mantendremos esto durante el refactor de la UI.
2.  **Fase 2: Script de Limpieza**: Crear una Cloud Function o script de Node.js para renombrar llaves antiguas a las nuevas en una ventana de mantenimiento.
3.  **Fase 3: Depuración de Código**: Eliminar los setters/getters legacy en las clases Java/Kotlin una vez la base de datos esté limpia.

---
**ChopCode Solutions - Data Engineering 2026**

# ⚙️ Mapeo de Flujos Lógicos y Coreografías de Datos v2.0 NoSQL Normalizado

Este documento detalla la lógica de bajo nivel y las secuencias técnicas que gobiernan los procesos críticos de Ruta-Go en el ecosistema móvil y web.

---

## 🚀 1. Flujo de Inicialización y Resolución de Identidad
Determina el punto de entrada y los privilegios del usuario garantizando una transición sin fallos visuales.

### Proceso Unificado (React/Android):
1.  **Auth Check**: Escucha el estado de `FirebaseAuth`.
2.  **Splash Guard**: Mientras se resuelve el rol, se muestra el `SplashScreen` para evitar renderizar dashboards sin datos (Glitches).
3.  **Resolución Maestra**:
    *   Consulta el perfil unificado en `/users/{uid}`.
    *   Si `role === "admin"`, otorga privilegios de Administrador Root.
    *   Si `role === "owner"` (o si tiene vehículos vinculados en `/vehicles/`), otorga privilegios de Socio.
    *   Si `role === "driver"` (o en `/users/$uid/assignedSchedules`), otorga privilegios de Conductor.
    *   Si `role === "passenger"` (o por defecto), asigna rol de Pasajero.
4.  **Signal**: Una vez resuelto, se levantan los listeners de tiempo real específicos para el rol.

---

## 🎫 2. Flujo Transaccional de Reserva (Atomic Booking Engine)
Garantiza la exclusividad de los asientos bajo condiciones de alta concurrencia.

1.  **runTransaction()**: Se abre una transacción atómica sobre `/seatAvailability/{scheduleId}` (con fallback a `/disponibilidadAsientos/{scheduleId}`).
2.  **Validación de Ocupación**: Si el asiento solicitado ya está marcado como ocupado en `occupiedSeats`, la transacción se cancela y se notifica al usuario.
3.  **Sincronización de Inventario**: Al confirmar el asiento, se decrementa `availableSeats`.
4.  **Persistencia**: Se crea el registro en `/reservations` y se actualiza el nodo de `/stats` del conductor para reflejar el nuevo ingreso.

---

## 🔄 3. Algoritmo de Rotación y Agrupamiento (Escalafón)
Gobernanza de la planilla operativa automatizada.

### Lógica de Agrupamiento (Speed Mode):
*   **Standard Pairs**: Mapeo lógico de trayectos de ida y vuelta (ej: h001 + h011).
*   **Special Triple**: Agrupamiento operativo de h008, h018 y h010 (Regreso al día siguiente).
*   **Solo Entry**: h009 se trata como trayecto único de inicio de jornada.

### Rotación Cloud:
*   Ejecución diaria 19:00 COT.
*   Cálculo de `shiftIndex` basado en `rankingPosition` sobre los conductores registrados en `/users/` con `role === "driver"`.

---

## 💰 4. Inteligencia Analítica 360° (Contabilidad)
Motor de cálculo de ingresos para dueños y administradores.

1.  **Lookups en Tiempo Real**: El sistema cruza los datos de `/seatAvailability` con la tabla de `/prices`.
2.  **Fórmula Integral**: `Ingresos = (Total Seats - Available Seats) * Price`.
3.  **Hibridación**: Esta lógica suma automáticamente las ventas por App y las ventas físicas realizadas por el conductor en el bus, eliminando fugas de capital.
4.  **Detección de Trayecto**: El sistema extrae el destino final de la cadena de ruta para clasificar los ingresos por sentido (Nátaga -> La Plata vs La Plata -> Nátaga).

---

## 🧹 5. Protocolo de Borrado en Cascada (Compliance)
Cumplimiento técnico del "Derecho al Olvido" y políticas de Google Play.

1.  **Solicitud**: El usuario activa el flag `deletionRequested = true` en su perfil.
2.  **Periodo de Gracia**: 30 días bloqueados mediante Cloud Functions (`cleanupMarkedAccounts`).
3.  **Borrado Atómico**:
    *   Remoción de vehículos vinculados en `/vehicles/`.
    *   Eliminación de perfiles en `/users/`.
    *   Eliminación definitiva de la cuenta en Firebase Auth.

---
**ChopCode Solutions - Arquitectura de Sistemas 2026**

# ⚙️ Mapeo de Flujos Lógicos y Coreografías de Datos

Este documento detalla la lógica de bajo nivel y las secuencias técnicas que gobiernan los procesos críticos de Ruta-Go. Provee una visión profunda de cómo interactúan los componentes (App, RTDB, Functions) para garantizar integridad y reactividad.

---

## 🚀 1. Flujo de Inicialización y Resolución de Rol (Bootstrap)
Determina el punto de entrada del usuario mediante la persistencia híbrida.

1.  **Cold Start**: `SplashActivity` se inicia y activa el `SplashViewModel`.
2.  **Check de Identidad**: El ViewModel consulta `FirebaseAuth.getCurrentUser()`.
3.  **Resolución de Perfil**:
    *   Si hay UID: Se realiza una consulta paralela a `/usuarios/{uid}` y `/conductores/{uid}`.
    *   **Lógica de Prioridad**: Si el UID existe en `/conductores`, se asigna rol `DRIVER`. De lo contrario, `PASSENGER`.
4.  **Enrutamiento**:
    *   Si no hay UID: Redirige a `Onboarding` (si `isFirstTime` en SharedPreferences) o a `LoginActivity`.
    *   Si hay UID: Redirige al Home correspondiente inyectando el contexto de rol.

---

## 🎫 2. Flujo Transaccional de Reserva (Atomic Booking Engine)
Garantiza la exclusividad de los asientos bajo condiciones de alta concurrencia.

### Secuencia Técnica en `SeatDataProcessor.reserveSeat()`:
1.  **Disparador**: El usuario invoca `confirmReservation()`.
2.  **Apertura de Transacción**: Se inicia `runTransaction()` sobre el nodo `/disponibilidadAsientos/{horarioId}`.
3.  **Fase de Validación (Server-Side)**:
    *   Firebase descarga una instantánea local (`MutableData`).
    *   Se verifica `asientosOcupados/{seatNumber}`. Si el valor es `true`, el servidor lanza un **Abort**.
4.  **Fase de Aplicación**:
    *   Se marca el asiento como `true`.
    *   Se decrementa `asientosDisponibles` (usando `Math.max(0, current - 1)` para evitar números negativos).
5.  **Compromiso (Commit)**: El servidor guarda los cambios atómicamente.
6.  **Efecto Secundario**: Si el commit es exitoso, la App procede a crear el nodo en `/reservas` y dispara el `NotificationManager` (FCM v1).

---

## 🔄 3. Algoritmo de Rotación Nocturna (Cloud Strategy)
Proceso serverless programado para la orquestación de la logística regional.

### Cronología de `automatedRotation` (19:00 COT):
1.  **Carga de Universo**: La función lee simultáneamente los nodos maestros (`conductores`, `horarios`, `vehiculos`).
2.  **Cálculo de Escalafón**:
    *   **Day Counter**: Se obtiene `Math.floor(Date.now() / 86400000)`.
    *   **Shift Index**: Se calcula `(driver_sort_index + dayCounter) % 9`. Esto asegura que el descanso (Día 9) rote equitativamente entre todos.
3.  **Asignación de Activos**:
    *   Se vincula el `conductorId` al horario físico.
    *   Se recupera la `capacidad` del vehículo desde el nodo `/vehiculos/` para resetear el inventario técnico.
4.  **Reset de Inventario**: Se limpia el nodo de ocupación y se establece `totalAsientos = capacidad_real_del_bus`.
5.  **Limpieza de Huérfanos**: El sistema identifica qué horarios no recibieron asignación en el escalafón actual y limpia su `conductorId` e inventario para evitar datos residuales.
6.  **Notificación Multicast**: Se despacha un mensaje FCM v1 a todos los pasajeros informando la apertura de ventas.

---

## 💺 4. Gestión Híbrida de Asientos (Driver Logic)
Lógica de convivencia entre ventas digitales y ventas físicas (de calle).

1.  **Sincronización**: `ManageSeatsActivity` se suscribe a dos flujos en el `ManageSeatsViewModel`:
    *   `appOccupiedSeats`: Asientos marcados por pasajeros en la App (Inmutables para el conductor).
    *   `physicalOccupiedSeats`: Bloqueos manuales realizados por el conductor.
2.  **Conflicto de Interés**: Las [Reglas de Seguridad](./FIREBASE_SECURITY_RULES.md) impiden que un conductor libere un asiento ocupado por un pasajero digital.
3.  **Venta Física**: El conductor toca un asiento `Disponible` -> El sistema invoca `reservePhysical()` -> Se marca en la DB con un flag distinto para telemetría.

---

## 🧹 5. Protocolo de Borrado en Cascada (Compliance)
Cumplimiento técnico del "Derecho al Olvido".

1.  **Marcado**: El usuario activa el flag `solicitudBorrado` desde el `EditProfileActivity`.
2.  **Periodo de Gracia**: La lógica espera 30 días naturales.
3.  **Cascada de Eliminación (`cleanupMarkedAccounts`)**:
    *   **Nivel 1 (Activos)**: Se localiza la placa del vehículo (si es conductor) y se elimina el nodo en `/vehiculos/`.
    *   **Nivel 2 (Datos)**: Se remueve el perfil completo del nodo NoSQL.
    *   **Nivel 3 (Identidad)**: Se invoca `admin.auth().deleteUser(uid)`. Esta es la acción final e irreversible.

---

## 💬 6. Notificaciones Reactivas y Deep Linking
Ciclo de vida de un mensaje Push FCM v1.

1.  **Evento**: Cambio de estado en una reserva o nuevo mensaje de chat.
2.  **Payload JSON**: El emisor construye un objeto con `target_activity` (ej: "passenger_history") y metadatos (ej: `reservationId`).
3.  **Recepción**: `NotificationService.onMessageReceived()` intercepta el data-payload.
4.  **Resolución de Intent**:
    *   El servicio mapea el string del target a una clase Java (`.class`).
    *   Crea un `PendingIntent` con `TaskStackBuilder` para asegurar que el botón "Atrás" funcione correctamente tras abrir la notificación.
5.  **Renderizado**: Se muestra la notificación con el color naranja corporativo y alta prioridad.

---
**Chop Code Solutions - Documentación de Arquitectura de Sistemas v1.3.0**

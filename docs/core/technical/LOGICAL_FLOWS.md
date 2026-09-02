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

## 💬 3. Flujo de Mensajería y Chat en Tiempo Real
Permite la comunicación instantánea entre el pasajero y el conductor asignado al viaje.

1. **Apertura de Canal (`ChatModal.jsx`)**: Se identifica el ID de reserva (`reservationId = reservation.id || reservation.idReservation`) y el UID de la sesión activa (`role.uid`).
2. **Escritura Atómica (`chatService.sendMessage`)**: Escribe el mensaje en `/chats/${reservationId}/messages/${messageId}` con atributos `id`, `senderId`, `text` y `timestamp`.
3. **Escucha Reactiva (`chatService.listenMessages`)**: Listener `onValue` en tiempo real que renderiza los mensajes ordenados cronológicamente.
4. **Trigger de Notificación (Cloud Function `onChatMessageCreated`)**: Al crearse un mensaje en `/chats/{reservationId}/messages/{messageId}`, la Cloud Function dispara una notificación Push (FCM v1) al dispositivo móvil de la contraparte.

---

## 🔄 4. Algoritmo de Rotación y Agrupamiento (Escalafón Nátaga ➔ La Plata)
Gobernanza de la planilla operativa automatizada.

### Tabla Canónica Oficial de Nátaga (Con Pernocta en La Plata):
* **Turno 1**: `06:15 AM (Nátaga) ➔ 07:30 AM (La Plata)` *(Pos #7)*
* **Turno 2**: `07:15 AM (Nátaga) ➔ 09:15 AM (La Plata)` *(Pos #6)*
* **Turno 3**: `08:30 AM (Nátaga) ➔ 10:30 AM (La Plata)` *(Pos #5)*
* **Turno 4**: `09:30 AM (Nátaga) ➔ 11:45 AM (La Plata)` *(Pos #4)*
* **Turno 5 (Fijo / Dedicado)**: `10:00 AM (Nátaga) ➔ 02:00 PM (La Plata)` *(Inmune a rotación - No Rota)*
* **Turno 6**: `11:00 AM (Nátaga) ➔ 03:30 PM (La Plata)` *(Pos #3)*
* **Turno 7**: `01:00 PM (Nátaga) ➔ 05:00 PM (La Plata)` *(Pos #2)*
* **Turno 8 (Triple Especial)**: `03:30 PM (Nátaga) ➔ 06:00 PM (La Plata) (+ 07:30 AM AM)` *(Pernocta en La Plata)*
* **Turno 9 (Entrada)**: `05:00 PM (Nátaga - Trayecto Único)` *(Pos #0)*
* **Descanso**: `Mañana fuera de servicio` *(Pos #8)*

### Rotación Cloud Focalizada (Aislamiento de Ruta Principal):
* **Ejecución diaria 19:00 COT (`automatedRotation`)**:
* **Filtrado por Ruta**: Aislamiento exclusivo para los conductores y turnos pertenecientes al **Escalafón Nátaga ➔ La Plata**.
* **Preservación de Rutas Dinámicas**: Las rutas adicionales (ej: `Nátaga ➔ Neiva`, `La Plata ➔ Gallego`) y sus respectivos horarios no son alterados ni borrados durante el ciclo de rotación nocturno.
* **Cálculo de Posición**: Rotación del `shiftIndex` basado en `rankingPosition` sobre los 9 grupos del escalafón principal.

---

## 💰 5. Inteligencia Analítica 360° (Contabilidad)
Motor de cálculo de ingresos para dueños y administradores.

1.  **Lookups en Tiempo Real**: El sistema cruza los datos de `/seatAvailability` con la tabla de `/prices`.
2.  **Fórmula Integral**: `Ingresos = (Total Seats - Available Seats) * Price`.
3.  **Hibridación**: Esta lógica suma automáticamente las ventas por App y las ventas físicas realizadas por el conductor en el bus, eliminando fugas de capital.
4.  **Detección de Trayecto**: El sistema extrae el destino final de la cadena de ruta para clasificar los ingresos por sentido (Nátaga -> La Plata vs La Plata -> Nátaga).

---

## 🧹 6. Protocolo de Borrado en Cascada (Compliance)
Cumplimiento técnico del "Derecho al Olvido" y políticas de Google Play.

1.  **Solicitud**: El usuario activa el flag `deletionRequested = true` en su perfil.
2.  **Periodo de Gracia**: 30 días bloqueados mediante Cloud Functions (`cleanupMarkedAccounts`).
3.  **Borrado Atómico**:
    *   Remoción de vehículos vinculados en `/vehicles/`.
    *   Eliminación de perfiles en `/users/`.
    *   Eliminación definitiva de la cuenta en Firebase Auth.

---
**ChopCode Solutions - Arquitectura de Sistemas 2026**

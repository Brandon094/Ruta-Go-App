# ☁️ Especificación de Cloud Functions - Go-Core v2.2.0

Este documento constituye la especificación de ingeniería para las **Firebase Cloud Functions** en Node.js 22, las cuales orquestan la logística automatizada, notificaciones instantáneas y cumplimiento regulatorio del Ecosistema Ruta-Go.

---

## 🛠️ 1. Arquitectura de Funciones
Las funciones están implementadas en **Node.js 22 (2nd Gen)** utilizando el SDK de **Firebase Functions v2**. Se ejecutan en un entorno gestionado por Google Cloud Functions en la región `us-central1`.

*   **Directorio**: `/firebase_functions`
*   **Lenguaje**: JavaScript (CommonJS).
*   **Triggers**: Programados (Cron Schedules) vía Google Cloud Scheduler y disparadores por eventos NoSQL Realtime Database (`onValueCreated`, `onValueWritten`).

---

## 🔄 2. Rotación Nocturna Automática (`automatedRotation` v2.2.0)
Proceso crítico de preparación logística nocturna.

*   **Ejecución**: Todos los días a las **7:00 PM (19:00 COT)**.
*   **Clasificación Dinámica por Nombre de Ruta (`s.route`)**:
    *   Filtra y agrupa las salidas pertenecientes al corredor principal **Nátaga ➔ La Plata** en la rueda de escalafón canónica de 9 días (Turnos 1 al 9).
    *   **Protección de Rutas Adicionales (`Neiva`, `Gallego`, etc.)**: Mantiene intacto al Conductor (`driverId`) y Vehículo (`vehicleId`) asignados por el Admin o Socio.
    *   **Inmunidad del Turno 5 (Fijo / Dedicado)**: Mantiene la asignación del operador en `10:00 AM ➔ 02:00 PM` sin desplazarlo a días de descanso.
*   **Lógica de Escalafón Canónico**: Calcula el turno para los conductores de Nátaga (`(rankingPosition + dayCounter) % 9`) asignando las llaves Push reales del esquema NoSQL v2.0 (`-P0Pw0...`), incluyendo la pernocta en La Plata del **Turno 8 (Triple Especial: `03:30 PM ➔ 06:00 PM + 07:30 AM`)**.
*   **Reset Nocturno de Inventario**:
    *   Consulta la capacidad técnica de cada vehículo en `/vehicles/` (capacidad estándar: 13 puestos).
    *   Resetea `/seatAvailability/` liberando los asientos ocupados hoy (`occupiedSeats = null`, `availableSeats = capacity`, `totalSeats = capacity`) para todas las rutas.
*   **Notificaciones Push (FCM v1)**:
    *   Aviso personalizado a cada conductor con su itinerario asignado para mañana o notificación de día de descanso.
    *   Notificación masiva a los pasajeros activos anunciando la apertura del sistema de reservas para el día siguiente.

---

## 🧹 3. Limpieza de Cuentas (`cleanupMarkedAccounts`)
Garantiza el cumplimiento de la Ley de Protección de Datos (Habeas Data Ley 1581 de 2012) y las políticas de Google Play.

*   **Ejecución**: Todos los domingos a las **3:00 AM (03:00 COT)**.
*   **Periodo de Gracia**: Procesa cuentas con flag `deletionRequested = true` cuya solicitud supere los **30 días**.
*   **Borrado en Cascada Atómico**:
    1.  **Vehículo**: Elimina el registro del bus en `/vehicles/` si el usuario es conductor o socio.
    2.  **Base de Datos**: Remueve el perfil completo del nodo `/users/`.
    3.  **Identidad**: Ejecuta el borrado definitivo en **Firebase Auth**.

---

## 💬 4. Notificaciones de Chat (`onChatMessageCreated`)
Garantiza la mensajería instantánea reactiva con soporte para NoSQL v2.0 y compatibilidad legada.

*   **Trigger**: Creación de un nuevo mensaje en `/chats/{reservationId}/messages/{messageId}` (o `/chats/{reservationId}/mensajes/{messageId}`).
*   **Lógica de Despacho**:
    1.  Identifica al emisor (`senderId`) y consulta los datos de la reserva en `/reservations/{reservationId}`.
    2.  Determina el receptor (si el emisor es el pasajero, el receptor es `driverId`; si el emisor es el conductor, el receptor es `userId`).
    3.  Consulta los tokens FCM (`fcmToken` y `fcmTokenWeb`) del usuario receptor en `/users/{receiverUid}`.
    4.  Despacha la notificación Push vía FCM v1 con el texto del mensaje y carga útil de navegación.

---

## 🛡️ 5. Seguridad y Rendimiento
*   **Admin SDK**: Uso de `firebase-admin` para bypass seguro de reglas de seguridad en tareas de mantenimiento serverless.
*   **Asignación de Memoria**: Configurado con **256MiB** e instancia de baja latencia.
*   **Timezone**: Anclado a `America/Bogota`.

---
**ChopCode Solutions - Documentación de Ingeniería v2.2.0**

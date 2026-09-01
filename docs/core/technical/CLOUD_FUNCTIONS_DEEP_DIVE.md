---

## 🛠️ 1. Arquitectura de Funciones
Las funciones están implementadas en **Node.js 22** utilizando el SDK de **Firebase Functions v2**. Se ejecutan en un entorno gestionado por Google Cloud, lo que garantiza alta disponibilidad y escalabilidad automática.

*   **Entorno**: `/firebase_functions`
*   **Lenguaje**: JavaScript (CommonJS).
*   **Triggers**: Programados (Cron Schedules) vía Google Cloud Scheduler.

---

## 🔄 2. Rotación Nocturna Automática (`automatedRotation` v2.2.0)
Es el proceso más crítico del sistema. Se encarga de preparar la logística para el día siguiente.

*   **Ejecución**: Todos los días a las **7:00 PM** (Hora Bogotá).
*   **Clasificación Dinámica por Nombre de Ruta (`s.route`)**:
    *   Filtra y agrupa las salidas pertenecientes al corredor principal **Nátaga ➔ La Plata** en la rueda de escalafón de 9 días.
    *   **Protección de Rutas Adicionales (`Neiva`, `Gallego`, etc.)**: Mantiene intacto al Conductor (`driverId`) y Vehículo (`vehicleId`) asignados por el Admin o Socio.
*   **Lógica de Escalafón**: Calcula el turno de mañana para los conductores de Nátaga (`(rankingPosition + dayCounter) % 9`) asignando las llaves Push reales del esquema NoSQL v2.0 (`-P0Pw0...`).
*   **Reset Nocturno de Inventario**:
    *   Consulta la capacidad técnica de cada vehículo en el nodo `/vehicles/` (capacidad estándar: 13 puestos).
    *   Resetea `/seatAvailability/` liberando los asientos ocupados hoy (`occupiedSeats = null`, `availableSeats = capacity`, `totalSeats = capacity`) para todas las rutas.
*   **Notificaciones**:
    *   Envía notificaciones personalizadas a cada conductor informándole si trabaja o descansas.
    *   Despacha un aviso masivo a los pasajeros (en lotes de 500) anunciando la apertura de reservas para el día siguiente.

---

## 🧹 3. Limpieza de Cuentas (`cleanupMarkedAccounts`)
Garantiza el cumplimiento de la Ley de Protección de Datos (Habeas Data) y las políticas de Google Play.

*   **Ejecución**: Todos los domingos a las **3:00 AM**.
*   **Periodo de Gracia**: Solo procesa cuentas que solicitaron el borrado hace más de **30 días**.
*   **Borrado en Cascada**:
    1.  **Vehículo**: Elimina el registro del bus en `/vehiculos/` si el usuario es conductor.
    2.  **Base de Datos**: Remueve el perfil completo del nodo `/usuarios/` o `/conductores/`.
    3.  **Identidad**: Ejecuta el borrado definitivo en **Firebase Auth**. Una vez realizado este paso, el usuario ya no puede iniciar sesión.

---

## 💬 4. Notificaciones de Chat (`onChatMessageCreated`)
Garantiza que la mensajería instantánea sea reactiva en todo el ecosistema.

*   **Trigger**: Creación de un nuevo mensaje en `/chats/{reservationId}/mensajes/{messageId}`.
*   **Lógica de Despacho**:
    1.  Identifica al emisor y consulta los datos de la reserva para determinar el receptor.
    2.  Busca todos los tokens FCM registrados (móvil y web) del usuario receptor.
    3.  Envía la notificación push con el texto del mensaje y metadatos de navegación para que la App abra la pantalla de chat correcta.
*   **Beneficio**: Elimina la necesidad de que el cliente (Android o Web) envíe la notificación manualmente, ahorrando recursos y asegurando la entrega.

---

## 🛡️ 5. Seguridad y Rendimiento
*   **Permisos Administrativos**: Las funciones utilizan `firebase-admin`, lo que les permite saltarse las reglas de seguridad NoSQL para realizar tareas de mantenimiento.
*   **Optimización de Memoria**: Configurado con **256MiB** para manejar el procesamiento de listas de usuarios sin incurrir en costos elevados.
*   **Timezone**: Todas las ejecuciones están ancladas a `America/Bogota` para coincidir con la operación física de los buses.

---

## 📈 5. Monitoreo
Los logs de ejecución pueden consultarse en la **Firebase Console > Functions > Logs**. Se recomienda vigilar los errores de tipo "Error notif", los cuales suelen ocurrir cuando un token FCM ha expirado o el dispositivo ha desinstalado el app.

---
**Chop Code Solutions - Documentación de Ingeniería v2.2.0**

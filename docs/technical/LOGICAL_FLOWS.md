# ⚙️ Mapeo de Flujos Lógicos y Secuencias Técnicas

Este documento describe la coreografía de datos entre los diferentes componentes del sistema (App, Firebase Realtime Database y Cloud Functions) para los procesos más críticos del ecosistema.

---

## 🎫 1. Flujo Transaccional de Reserva (Atomic Booking)
Garantiza que dos pasajeros no puedan reservar el mismo asiento simultáneamente.

### Secuencia de Operaciones:
1.  **Selección**: El Pasajero toca un asiento en el `SeatManager`.
2.  **Validación Local**: El `SeatDataProcessor` verifica si el estado local no está marcado como ocupado.
3.  **Transacción Atómica (`runTransaction`)**:
    *   Se envía una solicitud al nodo `/disponibilidadAsientos/{horarioId}/asientosOcupados/{asientoId}`.
    *   **Servidor**: Verifica el valor actual. Si es `true`, aborta. Si es `false/null`, lo marca como `true`.
    *   **Contador**: En la misma operación, decrementa el valor de `asientosDisponibles`.
4.  **Confirmación**:
    *   Si la transacción tiene éxito: Se crea el registro en el nodo `/reservas`.
    *   Si falla: Se muestra un aviso de "Asiento ocupado por otro usuario" y se refresca el mapa.
5.  **Notificación**: Se dispara la lógica del `NotificationManager` para avisar al conductor mediante FCM.

---

## 🔄 2. Flujo de Rotación Nocturna (Cloud Rotation)
Proceso serverless encargado de preparar la logística de la siguiente jornada.

### Cronología (Todos los días 7:00 PM Bogotá):
1.  **Trigger**: Google Cloud Scheduler dispara la función `automatedRotation`.
2.  **Sincronización de Datos**: La función lee simultáneamente los nodos `conductores`, `horarios`, `vehiculos` y `usuarios`.
3.  **Algoritmo de Escalafón**:
    *   Calcula el `shiftIndex` usando un contador de días (`dayCounter % 9`).
    *   Asigna los IDs de horarios correspondientes a cada conductor en el arreglo cíclico.
4.  **Reset de Inventario Técnico**:
    *   Consulta la capacidad real del bus asignado.
    *   Limpia el historial de ocupación del día anterior.
    *   Establece `totalAsientos` y `asientosDisponibles` con la capacidad técnica del vehículo actual.
5.  **Persistencia Masiva**: Ejecuta un `db.ref().update()` multi-nodo para asegurar que los cambios sean visibles instantáneamente para todos los usuarios.
6.  **Despacho FCM**: Notifica a los conductores de su nuevo turno y a los pasajeros de la apertura de ventas.

---

## 🧹 3. Flujo de "Derecho al Olvido" (Account Cleanup)
Protocolo de cumplimiento legal para la eliminación de datos.

1.  **Solicitud**: El usuario activa `solicitudBorrado` en su perfil.
2.  **Marcado**: Se guarda el timestamp actual en el nodo del usuario.
3.  **Espera**: Transcurre el periodo de gracia de 30 días.
4.  **Limpieza (Domingos 3:00 AM)**:
    *   La función `cleanupMarkedAccounts` filtra usuarios con el flag activo.
    *   Verifica que `now - fechaSolicitud >= 30 días`.
    *   **Cascada**: Elimina el Vehículo (si aplica) -> Elimina Datos DB -> Elimina UID de Firebase Auth.

---

## 💬 4. Flujo de Mensajería Reactiva (Chat)
Lógica de comunicación directa vinculada a la reserva.

1.  **Apertura**: El ChatActivity se suscribe al nodo `/chats/{reservaId}/mensajes`.
2.  **Escritura**: El emisor añade un mensaje con su `senderId` y `timestamp`.
3.  **Validación**: Las [Reglas de Seguridad](./FIREBASE_SECURITY_RULES.md) verifican que el emisor sea el pasajero o el conductor de esa reserva específica.
4.  **Push**: Se envía una notificación Push silenciosa para despertar el app del receptor si está en segundo plano.

---
**Chop Code Solutions - Ingeniería de Sistemas v1.3.0**

# ⚙️ Manual de Administración y Operación - Ecosistema Go v1.3.0

Este documento guía al administrador en la gestión estratégica, operativa y técnica de la plataforma Ruta-Go, utilizando las herramientas nativas de Firebase para garantizar la continuidad del servicio.

---

## 💰 1. Gestión de Tarifas y Economía
Los precios son dinámicos y se sincronizan en tiempo real mediante el nodo `/precios/`.

1.  **Actualización**: Acceda a **Realtime Database > precios**.
2.  **Mapeo**: Los valores están segmentados por los identificadores normalizados de las rutas (ej: `nataga`, `la plata`).
3.  **Impacto**: Cualquier cambio afecta instantáneamente el cálculo de tiquetes en las pantallas de confirmación de los pasajeros.

---

## 🕒 2. Planilla Maestra de Horarios
La logística diaria reside en el nodo `/horarios/`. Aunque la rotación es automática, el administrador puede intervenir manualmente.

### Asignación de Contingencia:
*   Para asignar un conductor fuera del ciclo de rotación, reemplace el campo `conductorId` con el UID obtenido del nodo `/conductores/`.
*   Para liberar un turno (ej: bus averiado), deje el campo `conductorId` vacío (`""`). El app lo marcará como **"(Libre)"**.

---

## 👤 3. Gobierno de Usuarios (Seguridad)

### Bloqueo de Cuentas (Suspensión):
*   Localice el UID del usuario o conductor.
*   Cambie el atributo `status` a `blocked`. Esto impide el acceso al app y dispara el feedback visual de "Cuenta Suspendida".

### Gestión de Identidad:
*   **Verificación**: Antes de asignar horarios a un nuevo conductor, valide que su vehículo esté correctamente registrado en el nodo `/vehiculos/` con la capacidad técnica declarada.

---

## 🧹 4. Protocolos de Mantenimiento

### Tareas Serverless (Cloud Functions):
*   **Rotación Nocturna (7:00 PM)**: Prepara los turnos del día siguiente. Si falla, el administrador debe resetear manualmente los nodos en `/disponibilidadAsientos/`.
*   **Limpieza Semanal (Domingos 3:00 AM)**: Ejecuta el borrado definitivo de cuentas marcadas (Habeas Data).

### Gestión de Historial:
*   **Archivado**: Se recomienda exportar un JSON mensual del nodo `/reservas/` y mover los registros antiguos a un nodo de histórico para optimizar el rendimiento de los dispositivos de gama baja.

---

## 📊 5. Monitoreo y Salud del Sistema
*   **Firebase Crashlytics**: Monitorear diariamente para identificar fallos en nuevas versiones de Android (ej: SDK 35).
*   **Firebase Analytics**: Revisar el embudo de conversión (Dashboard -> Selección de Asiento -> Confirmación) para detectar abandonos.
*   **Auditoría Técnica**: Consulte periódicamente el [**Manual de Gestión de Datos**](../legal/DATA_MANAGEMENT_MANUAL.md) para asegurar el cumplimiento legal.

---
**Chop Code Solutions - Dirección de Operaciones v1.3.0**

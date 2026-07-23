# ⚙️ Manual de Administración y Operación - Ruta-Go v1.5.0 Ecosystem

Este documento guía al Admin Root en la gestión estratégica del ecosistema, utilizando la Firebase Console y el nuevo Portal Web Administrativo.

---

## 🌎 1. Centros de Mando
1.  **Firebase Console**: Para gestión de bajo nivel (nodos JSON, Auth, Cloud Functions).
2.  **Web Portal (Admin)**: Dashboard centralizado para monitoreo de ingresos, auditoría de dueños y vinculación de conductores.

---

## 💰 2. Gestión de Tarifas y Economía
Los precios residen en el nodo `/precios/`.
*   **Edición**: Solo permitida por el Admin Root.
*   **Segmentación**: Rutas identificadas como `nataga` y `la plata`.
*   **Nota**: Los cambios son reactivos; impactan inmediatamente en el cálculo de pasajes en la App.

---

## 💼 3. Gobernanza de Socios (Dueños)
El modelo v1.5.0 introduce la gestión de socios para escalar la flota.

### Activación de Socios:
1.  **Registro**: El socio se registra en el Portal Web. Queda en estado `"pendiente"` en el nodo `/dueños/`.
2.  **Habilitación**: El Admin Root cambia el valor en `/dueños/$uid` de `"pendiente"` a `true`.
3.  **Asignación de Activos**: En el nodo `/vehiculos/$placa`, añada el campo `ownerId` con el UID del socio para vincular el bus a su dashboard.

---

## 👨‍✈️ 4. Gestión Operativa
### Vinculación de Conductores:
*   Use el portal web para buscar conductores por Email.
*   Al vincular un conductor, el sistema actualiza atómicamente el campo `driverId` en el vehículo y `vehiclePlate` en el conductor.

### Planilla de Horarios:
*   Ubicación: Nodo `/horarios/`.
*   **Intervención**: Si la rotación automática falla, el Admin puede reasignar un `conductorId` manualmente desde la web o la consola.

---

## 🛡️ 5. Seguridad y Mantenimiento
*   **Bloqueo**: Cambie el `status` de un usuario a `blocked` para denegar acceso inmediato.
*   **Limpieza (Cloud Functions)**:
    *   `automatedRotation`: (7:00 PM) Prepara la planilla del día siguiente.
    *   `cleanupMarkedAccounts`: (Domingo 3:00 AM) Ejecuta el borrado legal de 30 días.
*   **Auditoría**: Monitoree **Crashlytics** para asegurar la estabilidad en Android 15.

---
**ChopCode Solutions - Dirección de Operaciones 2026**

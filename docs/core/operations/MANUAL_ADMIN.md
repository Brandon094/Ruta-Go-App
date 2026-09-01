# ⚙️ Manual de Administración y Operación - Ruta-Go v2.0.1-BETA Ecosystem

Este documento guía al Administrador Root y a los Socios en la gestión estratégica del ecosistema, utilizando la Firebase Console y el Portal Web de Alta Fidelidad.

---

## 🌎 1. Centros de Mando
1.  **Firebase Console**: Para gestión de bajo nivel (nodos JSON NoSQL, Auth, Cloud Functions).
2.  **Web Portal (Admin/Owner)**: Dashboard centralizado con inteligencia analítica 360°, monitoreo de ingresos (App + Calle) y gestión de flota.

---

## 💰 2. Gestión de Rutas, Tarifas y Economía
Las tarifas y rutas se administran desde la sección **"Rutas & Tarifas"** del Portal Web y residen en los nodos `/routes/` y `/prices/`.
*   **Creación de Nuevas Rutas (`AddRouteModal.jsx`)**: El Admin Root puede crear rutas personalizadas seleccionando Origen, Destino, Tarifa ($ COP) y Tiempo Estimado de Recorrido.
*   **Visualización Fiel de Rutas**: Cada ruta se despliega en su orientación exacta creada (`Origen ➔ Destino`).
*   **Edición Directa de Precios**: Los cambios de tarifas realizados en las tarjetas de precio actualizan inmediatamente la matriz `/prices/` y sincronizan el cobro en las reservas de la App Móvil y Web.

---

## 💼 3. Gobernanza de Socios y Flota
El portal permite escalar la operación mediante la figura de socios independientes.

### Flujo de Activación y Promoción Directa:
1.  **Registro o Ascenso Directo (`AddOwnerModal.jsx`)**:
    *   **Auto-Registro**: El socio se une mediante el flujo "Registrar mi Flota" (formulario o **Google Sign-In**).
    *   **Super-Poderes de Admin Root**: En la pestaña **Socios**, el Admin Root puede hacer clic en **"Ascender Socio por Correo"**, seleccionar a cualquier usuario registrado de un menú desplegable o escribir su correo, y promoverlo instantáneamente al rol de **Socio (`role: owner`)**.
2.  **Habilitación de Perfil**: El sistema le otorga `status: "active"` y habilita su **Dashboard de Socio**.
3.  **Vinculación de Activos**: En la pestaña "Vehículos", el Admin asigna el `ownerId`. Esto permite que el socio vea la telemetría, conductores e ingresos de sus buses de forma aislada.

---

## 👨‍✈️ 4. Gestión de Operadores y Programación de Horarios
### Programación y Edición de Horarios de Despacho (`AddScheduleModal.jsx` & `EditScheduleModal.jsx`):
*   **Selección de Ruta Creada**: Al programar un horario en la pestaña "Planilla", el modal ofrece un menú desplegable dinámico con todas las rutas creadas en el sistema y autodiligencia la tarifa correspondiente.
*   **Desacoplamiento de Asignación**: El Admin Root puede programar horarios de salida **sin necesidad de asignar un Conductor o Vehículo previo**. El horario quedará activo en la plataforma con estado "Sin Conductor Asignado" hasta que se vincule un operador.
*   **Edición y Eliminación de Horarios**: Cada tarjeta en la Planilla cuenta con un botón de edición (✏️) para cambiar en tiempo real la hora de salida, tarifa, recorrido, conductor o vehículo asignado, o eliminar el horario de la plataforma.
*   **Gestión de Conductores y Configuración por Ruta (`AddDriverModal.jsx` & `EditDriverModal.jsx`)**:
    *   En la pestaña **Conductores**, al vincular o editar un operador, la asignación de horarios se organiza en **2 pasos**:
        1. **Selección de Ruta**: El Admin o Socio elige la ruta de trabajo (`Nátaga ➔ La Plata`, `Nátaga ➔ Neiva`, `La Plata ➔ Gallego`).
        2. **Asignación de Horarios**:
           * **Ruta Nátaga ➔ La Plata**: Muestra la rueda de escalafón de 9 días con resolución automática por horas de salida reales (`06:15 AM ➔ 09:15 AM`, `07:15 AM ➔ 10:30 AM`, etc.). Incluye el **Turno 5 (Fijo / Dedicado)** de `10:00 AM ➔ 02:00 PM` que no entra en la rotación nocturna.
           * **Rutas Adicionales (`Neiva`, `Gallego`, etc.)**: Muestra las salidas registradas bajo esa ruta en formato de tarjetas seleccionables para asignaciones dedicadas.
*   **Pestañas Dinámicas en Planilla**: Planilla genera botones de navegación automáticamente para cada ruta registrada (`Nátaga ➔ La Plata`, `Nátaga ➔ Neiva`, etc.), facilitando la supervisión por trayecto o global.

---

## 🛡️ 5. Seguridad y Mantenimiento
*   **Moderación**: Botones rápidos en el directorio de pasajeros para **Banear** (status: `blocked`) o **Inactivar** cuentas.
*   **Derecho al Olvido**: Monitoreo de solicitudes de borrado en el nodo `/usuarios/`. La función `cleanupMarkedAccounts` ejecutará la eliminación definitiva tras 30 días.
*   **Monitoreo de Rendimiento**: Revisar periódicamente las métricas de Lighthouse para asegurar que la web se mantenga por encima de 90 en todos los rubros.

---
**ChopCode Solutions - Dirección de Operaciones 2026**

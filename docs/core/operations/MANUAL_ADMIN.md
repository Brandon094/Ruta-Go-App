# ⚙️ Manual de Administración y Operación - Ruta-Go v1.9.9.5 Ecosystem

Este documento guía al Administrador Root y a los Socios en la gestión estratégica del ecosistema, utilizando la Firebase Console y el Portal Web de Alta Fidelidad.

---

## 🌎 1. Centros de Mando
1.  **Firebase Console**: Para gestión de bajo nivel (nodos JSON, Auth, Cloud Functions).
2.  **Web Portal (Admin/Owner)**: Dashboard centralizado con inteligencia analítica 360°, monitoreo de ingresos (App + Calle) y gestión de flota.

---

## 💰 2. Gestión de Tarifas y Economía
Los precios residen en el nodo `/precios/`.
*   **Edición**: Exclusiva del Admin Root.
*   **Inteligencia de Ruta**: El sistema detecta automáticamente la dirección mediante el destino final (Nátaga <-> La Plata).
*   **Sincronización**: Los cambios impactan inmediatamente en el cálculo de pasajes y en el valor de las reservas en ambas plataformas.

---

## 💼 3. Gobernanza de Socios y Flota
El portal permite escalar la operación mediante la figura de socios independientes.

### Flujo de Activación:
1.  **Registro**: El socio se une mediante el flujo de "Registrar mi Flota".
2.  **Habilitación**: El Admin Root debe validar al socio en el nodo `/dueños/` cambiando su estado a `true`.
3.  **Vinculación de Activos**: En la pestaña "Vehículos", se asigna un `ownerId`. Esto permite que el socio vea la telemetría y finanzas de ese bus de forma aislada.

---

## 👨‍✈️ 4. Gestión de Operadores y Turnos
### Asignación de Turnos (Speed Mode):
*   **Parejas de Horarios**: El sistema agrupa automáticamente los turnos de Ida y Regreso (ej: `h001` + `h011`).
*   **Turnos Especiales**: El sistema respeta el algoritmo de rotación, agrupando el "Triple Turno 8" (`h008`, `h018`, `h010`) y el "Turno 9 Solo".
*   **Sincronización Automática**: Al asignar un conductor a un horario, el sistema resetea la capacidad a 13/13 (o la capacidad real del bus) en los nodos de disponibilidad.

---

## 🛡️ 5. Seguridad y Mantenimiento
*   **Moderación**: Botones rápidos en el directorio de pasajeros para **Banear** (status: `blocked`) o **Inactivar** cuentas.
*   **Derecho al Olvido**: Monitoreo de solicitudes de borrado en el nodo `/usuarios/`. La función `cleanupMarkedAccounts` ejecutará la eliminación definitiva tras 30 días.
*   **Monitoreo de Rendimiento**: Revisar periódicamente las métricas de Lighthouse para asegurar que la web se mantenga por encima de 90 en todos los rubros.

---
**ChopCode Solutions - Dirección de Operaciones 2026**

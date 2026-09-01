# 📖 Manual de Usuario - Ruta-Go v2.0.1-BETA Ecosystem

Bienvenido al Centro de Ayuda de **Ruta-Go**. Esta guía te ayudará a navegar por el ecosistema (App Android y Portal Web) según tu nivel de acceso.

---

## 🚶 1. Guía para Pasajeros
*   **Consulta de Horarios por Ruta**: Usa el nuevo **Selector de Origen y Destino** en la página principal o los chips de cambio rápido (`Nátaga ➔ La Plata`, `Nátaga ➔ Neiva`, etc.) para ver salidas en tiempo real para cualquier trayecto.
*   **Estatus del Viaje**: Los viajes próximos se resaltan con un borde naranja y la etiqueta **"SIGUIENTE"**.
*   **Proceso de Reserva**:
    1. Selecciona el horario deseado.
    2. En el mapa interactivo, toca un asiento libre (indicado en verde/blanco).
    3. Confirma tu reserva. El sistema bloqueará el puesto instantáneamente.
*   **PWA (iPhone)**: Para una mejor experiencia en iOS, abre el portal en Safari, toca "Compartir" y selecciona "Añadir a pantalla de inicio".

---

## 👨‍✈️ 2. Guía para Conductores
*   **Perfil Operativo**: Al ser vinculado a un vehículo (`vehiclePlate`), tu perfil pasa a rol conductor con estatus operativo (**En Ruta** cuando tienes turnos asignados o **Sin Turno** en periodo de descanso).
*   **Dashboard Analítico**: Visualiza la ocupación de tus rutas en tiempo real mediante barras de progreso dinámicas.
*   **Gestión de Asientos**:
    *   **Venta en Calle**: Usa el botón **(+)** para marcar asientos ocupados físicamente.
    *   **Confirmación**: Valida las reservas digitales de los pasajeros al momento del abordaje.
*   **Contabilidad Automática**: Tus ingresos diarios se calculan sumando tanto las reservas de la App como las ventas directas.

---

## 💼 3. Guía para Socios y Dueños
*   **Registro Fácil**: Puedes afiliarte como socio mediante el formulario web o con un solo clic usando **"Registrarse como Socio con Google"**.
*   **Control Room**: Monitorea toda tu flota desde un solo panel. Visualiza ingresos totales y el rendimiento de cada vehículo asignado.
*   **Gestión de Flota**: El Admin vincula tus buses a tu perfil (`ownerId`), permitiéndote ver a tus conductores y finanzas en tiempo real.

---

## 👑 4. Guía para Administrador Root
*   **Promoción Directa de Socios**: Haz clic en **"Ascender Socio por Correo"** en la pestaña **Socios** para otorgar rol de `owner` a cualquier usuario registrado mediante correo o menú desplegable.
*   **Gestión de Flota & Vinculación**: En la pestaña **Vehículos**, asigna de forma interactiva el **Socio / Dueño de Flota** y el **Conductor Asignado** a cada bus.
*   **Programación y Edición de Horarios**:
    *   Crea turnos sin requerir asignación previa de conductor o bus.
    *   Usa el ícono de lápiz (✏️) en las tarjetas de Planilla para modificar hora, tarifa, ruta, conductor, vehículo o eliminar el horario.
*   **Gestión de Tarifas y Rutas**: Crea rutas dinámicas en **Rutas & Tarifas** (`AddRouteModal.jsx`) y edita precios en tiempo real.

---
**ChopCode Solutions - Soporte: dazace94@gmail.com**

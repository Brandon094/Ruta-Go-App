# 🗺️ Arquitectura de Módulos - Ruta-Go v1.2.1 Stable

Este documento describe la interacción entre los componentes de la aplicación, el flujo de datos y las interfaces de comunicación que sostienen la plataforma.

---

## 🏗️ 1. Arquitectura General (MVVM Pattern)
La aplicación sigue el patrón **Model-View-ViewModel**, garantizando que la lógica de negocio esté separada de la interfaz de usuario.

*   **View (UI)**: Activities y Fragments (XML + Java). Observan al ViewModel.
*   **ViewModel**: Gestiona el estado de la UI y se comunica con los Services.
*   **Service (Repository)**: Encapsula las llamadas a Firebase (Auth, Database, Storage).
*   **Model**: Clases POJO (User, Driver, Schedule, etc.) con mapeo dual.

---

## 📦 2. Módulo de Identidad y Segregación (Auth-Module)
**Propósito**: Controlar el acceso y definir el rol del usuario sin ambigüedades.

*   **Entrada**: Credenciales (Email/Pass) o Google Token.
*   **Proceso**:
    1.  `LoginViewModel` recibe datos.
    2.  `UserRoleService` consulta secuencialmente:
        *   ¿Existe en `/conductores/`? -> `ROLE_DRIVER`
        *   ¿Existe en `/usuarios/`? -> `ROLE_PASSENGER`
*   **Salida**: UID autenticado + Redirección al Dashboard correspondiente.

---

## 📝 3. Módulo de Registro Autónomo (Driver-Provisioning)
**Propósito**: Alta técnica completa de un conductor y su activo (vehículo).

*   **Interfaces Clave**: `DriverRegistrationViewModel`
*   **Flujo de Datos**:
    1.  **Captura**: Datos personales + Ficha técnica bus + 2 Horarios.
    2.  **Escritura Atómica**:
        *   `Auth`: Crea la cuenta de acceso.
        *   `/conductores/$uid`: Perfil profesional.
        *   `/vehiculos/$placa`: Especificaciones técnicas (Enlace: `driverId`).
        *   `/horarios/$hId`: Sincroniza `conductorId = $uid`.
        *   `/disponibilidadAsientos/$hId`: Inicializa `totalAsientos` y `disponibles`.
*   **Sincronización**: Utiliza `updateChildren` para evitar datos parciales.

---

## 💺 4. Módulo de Reservas y Gestión de Asientos (Seat-Engine)
**Propósito**: Control de ocupación en tiempo real y ventas físicas.

*   **Componente Central**: `SeatManager` (Controlador visual de la grilla).
*   **Flujo de Datos (Reserva App)**:
    1.  `Pasajero` selecciona asiento -> `CreateReservationViewModel` envía a `/reservas/`.
    2.  `Firebase` dispara trigger a `/disponibilidadAsientos/`.
    3.  `FCM` envía notificación al `Conductor`.
*   **Flujo de Datos (Venta Física)**:
    1.  `Conductor` toca asiento -> `ManageSeatsViewModel` ejecuta `ServerValue.increment` en ingresos y resta en disponibles.
    2.  Actualiza `/disponibilidadAsientos/$hId/asientosOcupados`.

---

## 💰 5. Módulo Financiero y Precios (Dynamic-Price-Service)
**Propósito**: Gestión de tarifas sin necesidad de actualizar la App.

*   **Fuente de Verdad**: Nodo `/precios/`.
*   **Flujo de Consulta**:
    1.  `ScheduleService` solicita todos los precios al iniciar.
    2.  `FormatUtils` recibe el valor bruto y lo transforma a formato COP con abreviaciones (K/M).
    3.  La UI muestra el precio actualizado según el trayecto detectado.

---

## 💬 6. Módulo de Comunicación (Contextual-Chat)
**Propósito**: Mensajería segura vinculada a una transacción activa.

*   **Identificador**: El `idReserva` es la llave de cada chat.
*   **Flujo**:
    1.  `Sender` envía mensaje -> `/chats/$idReserva/mensajes/`.
    2.  `Receiver` observa el nodo mediante `ChatViewModel`.
    3.  Si la reserva se cancela, el módulo bloquea la escritura.

---

## 🛰️ 7. Capa de Integridad (Sanity-Check Layer)
**Propósito**: Garantizar que la planilla de horarios no tenga errores.

*   **Lógica**: `ScheduleService.loadSchedules()`.
*   **Validación**:
    1.  Cruza cada `conductorId` en `/horarios/` contra la lista de `/conductores/`.
    2.  Si el ID no existe en la lista de personal activo, la interfaz reemplaza el ID por el estado **"(Libre)"**.
    3.  Previene el error de "Conductores Fantasma" tras eliminaciones manuales.

---

## 🎢 8. Módulo de Animación y Feedback (UX-Core)
**Propósito**: Proveer una sensación de fluidez y profesionalismo.

*   **UIAnimationUtils**: Centraliza efectos.
    *   `playCardEntryAnimation`: Deslizamiento 300ms hacia arriba.
    *   `startLogoTiltAnimation`: Balanceo infinito de 15°.
    *   `animateNumericText`: Interpolación de valores (0 a N).
*   **Feedback System**:
    *   `HorarioFragment` -> Badge "Pendiente" si no hay conductor.
    *   `FeedbackCard` -> Se activa a las 7:00 PM o cuando la jornada termina.

---
*Documentación generada por el Agente de Desarrollo Ruta-Go - Chop Code Solutions 2026*

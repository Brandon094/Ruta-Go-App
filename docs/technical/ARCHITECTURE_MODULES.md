# 🗺️ Arquitectura de Módulos - Ruta-Go v1.2.3 Stable

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
    2.  `UserRoleService` consulta secuencialmente en nodos independientes.
*   **Salida**: UID autenticado + Redirección al Dashboard correspondiente.

---

## 📝 3. Módulo de Registro Autónomo (Driver-Provisioning)
**Propósito**: Alta técnica completa de un conductor y su activo (vehículo).

*   **Interfaces Clave**: `DriverRegistrationViewModel`
*   **Flujo de Datos**:
    1.  **Captura**: Datos personales + Ficha técnica bus + 2 Horarios iniciales.
    2.  **Sincronización**: Al guardar, se actualizan simultáneamente los nodos `/conductores/`, `/vehiculos/`, `/horarios/` y `/disponibilidadAsientos/`.
*   **Integridad**: El sistema establece la capacidad técnica del bus en los horarios seleccionados de forma atómica.

---

## 💺 4. Motor de Selección de Asientos (Seat Engine)
**Propósito**: Control de ocupación en tiempo real y ventas físicas.

*   **Ubicación**: `com.chopcode.rutago.app.engines.seats`
*   **Componentes**:
    *   `SeatManager`: Controlador visual de la grilla de asientos en la UI.
    *   `SeatDataProcessor`: Procesador de persistencia atómica en Firebase.

---

## 🎫 9. Motor de Reservas (Reservation Engine)
**Propósito**: Orquestar la validación y preparación de datos transaccionales.

*   **Ubicación**: `com.chopcode.rutago.app.engines.reservations`
*   **Componentes**:
    *   `ReservationDataProcessor`: Validador y preparador de datos para el flujo de confirmación.
*   **Estructura de Managers**: Los auxiliares de UI ahora se organizan por etapa (`creation`, `confirmation`, `common`).

---

## 💰 5. Módulo Financiero y Precios (Dynamic-Price-Service)
**Propósito**: Gestión de tarifas sin necesidad de actualizar la App.

*   **Fuente de Verdad**: Nodo remoto `/precios/`.
*   **Formateo**: `FormatUtils` transforma valores brutos a COP con abreviación financiera (K/M).

---

## 🎓 6. Módulo de Capacitación (Tutorial Hub)
**Propósito**: Guiar al usuario mediante una experiencia interactiva paso a paso.

*   **Componente Central**: `TutorialManager`.
*   **Lógica**: Desacoplada de las actividades. Muestra diálogos informativos basados en el contexto (Pasajero o Conductor) y guarda el estado en `SessionManager`.

---

## 🛰️ 7. Capa de Integridad (Sanity-Check Layer)
**Propósito**: Garantizar que la planilla de horarios no tenga errores.

*   **Detección**: Filtra conductores inexistentes comparando el `conductorId` de horarios contra el nodo maestro de conductores.
*   **Visibilidad**: Etiqueta automáticamente los turnos como "(Libre)" si el ID no es válido.

---

## 🎢 8. Módulo de Animación y Feedback (UX-Core)
**Propósito**: Proveer una sensación de fluidez y profesionalismo.

*   **Feedback System**: Muestra tarjetas de cierre ("Jornada Completada" / "Misión Cumplida") basadas en el tiempo del sistema y el estado de las rutas.
*   **UIAnimationUtils**: Centraliza efectos de entrada, pulsos y conteos numéricos.

---
*Documentación generada por el Agente de Desarrollo Ruta-Go - Chop Code Solutions 2026*

# 🏗️ Inmersión Técnica: Capa de Managers (Helpers)

Este documento detalla la arquitectura de los controladores auxiliares de Ruta-Go, divididos por responsabilidad entre lógica de sistema (Core) e interfaz de usuario (UI).

---

## 🏛️ 1. Filosofía de los Managers
Los Managers actúan como "Especialistas" que alivian la carga de los ViewModels y Activities. Siguen el principio de Responsabilidad Única (SRP):
*   **Abstracción**: Ocultan la complejidad de APIs externas (Firebase, Google Cloud, SharedPreferences).
*   **Reutilización**: Permiten que la misma lógica visual o de negocio se comparta entre múltiples pantallas.
*   **Mantenibilidad**: Facilitan la actualización de flujos sin tocar el núcleo de la vista.

---

## 🔐 2. Managers de Núcleo (Core)
Ubicados en `com.chopcode.rutago.app.managers.core`:

*   **`AuthManager`**: Único punto de verdad para el estado de la sesión y el UID del usuario.
*   **`PermissionManager`**: Gestiona el flujo de permisos de notificaciones para Android 13+.
*   **`SessionManager`**: Persistencia liviana de preferencias y estados de tutoriales.
*   **`RatingManager`**: Orquesta la reputación de conductores e integridad de reseñas.
*   **Analytics Helpers**: Centralizan la telemetría enviada a Firebase Analytics para Dashboard y Reservas.

---

## 🎨 3. Managers de Interfaz (UI)
Ubicados en `com.chopcode.rutago.app.managers.ui`:

*   **`ExpandableSectionManager`**: Maneja el estado y animaciones de los acordeones en la interfaz.
*   **`DashboardUIManager`**: Controla badges de estado y contadores animados en el tablero principal.
*   **`TutorialManager`**: Centraliza todos los pasos de capacitación interactiva para Pasajeros y Conductores.
*   **`Reservation Flows`**: Un conjunto de managers (`Navigation`, `State`, `User`, `Vehicle`) que orquestan la compleja interacción del embudo de reserva.

---

## 🔄 4. Flujo de Colaboración
1.  **Activación**: La Activity instancia el Manager (o lo obtiene vía Singleton).
2.  **Configuración**: Se inyectan las referencias a las vistas mediante métodos `setUIReferences()`.
3.  **Ejecución**: El Manager toma el control de las animaciones y validaciones de UI.
4.  **Notificación**: El Manager informa a la Activity o ViewModel mediante Callbacks de los resultados de la interacción.

---
**Chop Code Solutions - Documentación de Ingeniería v1.3.0**

# 🏗️ Inmersión Técnica: Capa de Managers (Helpers) v1.9.9.5

Este documento detalla la arquitectura de los controladores auxiliares de la App Android, divididos por responsabilidad entre lógica de sistema (Core) e interfaz de usuario (UI).

---

## 🏛️ 1. Filosofía de los Managers
Los Managers actúan como "Especialistas" que alivian la carga de los ViewModels y componentes de la UI. Siguen el principio de Responsabilidad Única (SRP):
*   **Abstracción**: Ocultan la complejidad de APIs externas (Firebase, Notificaciones, Insets del sistema).
*   **Mantenibilidad**: Facilitan la actualización de flujos globales sin tocar el núcleo de la vista o el ViewModel.

---

## 🔐 2. Managers de Núcleo (Core)
*   **`AuthManager`**: Único punto de verdad para el estado de la sesión y la identidad SSO.
*   **`NotificationManager`**: Orquestador de la estrategia FCM v1, encargado de la generación de tokens y despacho C2C.
*   **`SessionManager`**: Persistencia liviana de preferencias y estados de onboarding.
*   **`RatingManager`**: Orquesta el motor de reputación e integridad de las reseñas del pasajero.

---

## 🎨 3. Managers de Interfaz (UI)
*   **`WindowUtils`**: Manager crítico para la implementación de la experiencia **Edge-to-Edge** en Android 15, gestionando insets de forma dinámica.
*   **`DashboardUIManager`**: Controla badges de estado y transiciones visuales en el tablero principal.
*   **`Reservation Flows`**: Conjunto de gestores (`State`, `User`, `Vehicle`) que mantienen la integridad del embudo de reserva ante cambios de configuración.

---

## 🔄 4. Flujo de Colaboración
1.  **Inyección**: El ViewModel o la Activity obtienen la instancia del Manager.
2.  **Ejecución**: El Manager toma el control de las animaciones o las validaciones de bajo nivel.
3.  **Retroalimentación**: El Manager informa los resultados mediante observables o callbacks, manteniendo el flujo reactivo.

---
**Chop Code Solutions - Mobile Engineering 2026**

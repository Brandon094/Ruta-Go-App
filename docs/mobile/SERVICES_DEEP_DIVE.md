# 📖 Inmersión Técnica: Repositorios y Servicios (Data Layer) v1.9.9.5

Este documento detalla la lógica de la capa de datos de la App Android, encargada de la comunicación con Firebase y el cumplimiento de las reglas de negocio del Holding.

---

## 🏛️ 1. Arquitectura de Servicios
Los servicios actúan como Repositorios que abstraen la complejidad de Firebase RTDB. Siguen estos principios:
*   **Encapsulamiento**: Los ViewModels delegan toda la persistencia al servicio correspondiente.
*   **Gestión de Hilos**: Las operaciones de red se realizan fuera del hilo principal (Main Thread) para evitar congelamientos de UI.
*   **Sincronización Híbrida**: Los servicios están diseñados para reconocer tanto el esquema de datos móvil como el web (ej. mapeo `userId` vs `usuarioId`).

---

## 🔐 2. Servicios de Identidad (Auth)
*   **`EmailLoginService`**: Gestor de credenciales nativas con soporte para recuperación de contraseña.
*   **`GoogleLoginService`**: Integración de One Tap Auth con mapeo automático de perfiles al nodo `/usuarios`.
*   **`UserRoleService`**: Motor de detección de roles (SSO) que habilita las funciones administrativas en el móvil.

---

## 🎫 3. Gestión de Reservas y Logística
*   **`ReservationService`**: Orquestador del ciclo de vida del pasaje. Implementa lógica de **Transacciones Atómicas** para evitar duplicidad de asientos.
*   **`ScheduleService`**: Gestor de la planilla maestra. Sincroniza la "Regla de las 7 PM" para la disponibilidad de viajes futuros.
*   **`DriverReservationService`**: Provee el motor analítico para el Dashboard financiero de conductores, integrando ventas por App y ventas en calle.

---

## ☁️ 4. Infraestructura y Notificaciones
*   **`NotificationService`**: Implementación de **FCM v1** con soporte para notificaciones de prioridad alta para choferes y pasajeros.
*   **`StorageService`**: Pipeline de gestión de archivos multimedia para fotos de perfil y activos del bus.
*   **`PriceService`**: Resolutor de tarifas dinámicas sincronizado con el panel Root.

---

## 🛡️ 5. Patrones de Seguridad
1.  **Validación Server-Side**: Los servicios confían en las **Reglas de Seguridad de Firebase** para denegar accesos no autorizados.
2.  **Integridad de Datos**: Parsing defensivo de los objetos de Firebase para prevenir crashes por campos nulos o inesperados.

---
**Chop Code Solutions - Mobile Engineering 2026**

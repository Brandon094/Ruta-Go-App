# 📖 Inmersión Técnica: Repositorios y Servicios (Data Layer)

Este documento detalla la lógica de la capa de datos de Ruta-Go, encargada de la comunicación con Firebase y el cumplimiento de las reglas de negocio.

---

## 🏛️ 1. Arquitectura de Servicios
Los servicios actúan como Repositorios (Pattern Repository) que abstraen la complejidad de Firebase. Siguen estos principios:
*   **Encapsulamiento**: Los ViewModels no tocan `DatabaseReference` directamente; delegan al servicio.
*   **Asincronismo**: Todas las operaciones usan Callbacks para retornar resultados sin bloquear el hilo principal.
*   **Atomicidad**: Las operaciones críticas (como reservas) integran validaciones previas para asegurar la consistencia.

---

## 🔐 2. Servicios de Identidad (Auth)
*   **`EmailLoginService`**: Gestor de credenciales tradicionales.
*   **`GoogleLoginService`**: Implementación de One Tap Auth con auto-aprovisionamiento de perfiles.
*   **`UserRoleService`**: Motor de detección de roles con prioridad operativa para conductores.
*   **`RegistrationService`**: Orquestador de alta multi-nodo (Auth + DB).

---

## 🎫 3. Gestión de Reservas y Logística
*   **`ReservationService`**: Orquestador del ciclo de vida del pasaje. Implementa lógica de compensación (Rollback) en caso de fallos.
*   **`ScheduleService`**: Gestor de la planilla maestra. Integra un "Sanity Check" para ocultar conductores eliminados de Firebase.
*   **`DriverReservationService`**: Provee el motor analítico para el Dashboard financiero y registro contable de ventas físicas.

---

## ☁️ 4. Servicios de Infraestructura
*   **`ArchiveService`**: Ejecuta mantenimiento preventivo moviendo datos de más de 30 días al histórico frío.
*   **`NotificationService`**: Motor de FCM v1 con soporte para Deep Linking profundo.
*   **`StorageService`**: Pipeline de subida de imágenes con monitoreo de progreso.
*   **`PriceService`**: Resolutor de tarifas dinámicas con soporte para esquemas legacy y modernos.

---

## 🛡️ 5. Patrones de Seguridad
Cada servicio implementa seguridad en dos niveles:
1.  **Validación de Entrada**: Chequeo de nulos y IDs válidos antes de disparar la consulta.
2.  **Integridad de Salida**: Parsing seguro de DataSnapshots mediante bloques try-catch para evitar cierres inesperados por datos corruptos en la nube.

---
**Chop Code Solutions - Documentación de Ingeniería v1.3.0**

# 🚍 Ruta-Go (Transporte Nátaga - La Plata - Huila) | v2.0.1-BETA 🚀

**Ruta-Go** es una plataforma integral de vanguardia diseñada para profesionalizar y optimizar el transporte intermunicipal en la región del Huila (Colombia). Esta versión **v2.0.1-BETA** consolida la migración completa a **100% Kotlin + Jetpack Compose en Android** y un **Motor de Rutas e Itinerarios Dinámicos en React Web**, operando bajo el esquema NoSQL v2.0 Clean Schema con paridad total en tiempo real entre móvil y web. ✨

---

## 🏆 Hitos de la Suite Integral (v2.0.1-BETA)
*   📱 **UI 100% Jetpack Compose (100% Kotlin)**: Interfaz móvil Android declarativa construida bajo **Atomic Design System** y Material 3 (0 archivos Java en producción).
*   🗺️ **Motor de Rutas e Itinerarios Dinámicos**: Gestión interactiva de rutas y tarifas desde el Portal Web (`AddRouteModal.jsx`, `AddScheduleModal.jsx`, `EditScheduleModal.jsx`) con autocompletado de precios, tiempos y edición/eliminación en tiempo real.
*   👨‍✈️ **Asignación Canónica de Conductores por Ruta**: Modal en 2 pasos (`AddDriverModal.jsx`, `EditDriverModal.jsx`) con parejas de horarios canónicas oficiales (`06:15 AM ➔ 07:30 AM`, `07:15 AM ➔ 09:15 AM`, etc.), pernocta del **Turno 8 Triple Especial** e inmunidad de rotación para **Turno 5 Fijo**.
*   💬 **Mensajería Instantánea NoSQL v2.0 (`/chats`)**: Servicio de chat en tiempo real (`chatService.js` & `ChatModal.jsx`) con resolución dinámica de identidades y disparo de notificaciones Push en Cloud Functions.
*   🚍 **Silueta Física Interactiva de Camioneta (`SeatManagementModal.jsx`)**: Mapa de selección de asientos con chasis de minibus, parabrisas frontal, retrovisores, 4 ruedas/llantas laterales y distribución real de 13 puestos.
*   🔒 **Restricción de Seguridad sin Conductor**: Bloqueo inteligente con ícono de candado (🔒) y estado `disabled` cuando un horario no cuenta con operador asignado.
*   👑 **Ascenso Directo de Socios**: Herramienta de super-poderes para el Admin Root (`AddOwnerModal.jsx`) para promover cualquier usuario a Socio de Flota por correo o selección desplegable.
*   🌐 **Portal Web "Mirror Edition"**: Paridad 1:1 con la App móvil para pasajeros, conductores, dueños y administradores con Google Sign-In para Pasajeros y Socios.
*   🚀 **Android 16 (SDK 36) Ready**: Optimización total para la última versión de Android, incluyendo soporte Edge-to-Edge nativo.

---

## 🏗️ Stack Tecnológico e Ingeniería

### **Ecosistema Móvil (Android)**
*   **Lenguaje**: **100% Kotlin** (0 archivos Java en código de producción).
*   **UI Framework**: **100% Jetpack Compose** (Material Design 3).
*   **Arquitectura**: Single-Activity (`MainActivity.kt`) + Navigation Compose + MVVM desacoplado con Clean Architecture.
*   **Persistencia**: `SessionManager` sobre `SharedPreferences` (`"rutago_prefs"`).

### **Ecosistema Web (React/Vite)**
*   **Core**: React 18 + Vite (Atomic Design Architecture).
*   **Styling**: Tailwind CSS 3 con componentes atómicos reutilizables (Atoms, Molecules, Organisms).
*   **Performance**: Code Splitting (`React.lazy` & `Suspense`), React Transitions y subscripciones desacopladas NoSQL v2.0.

### **Infraestructura Backend (Firebase Cloud)**
*   **Database**: Realtime Database (RTDB) con latencia ultra-baja y llaves Clean English (`users`, `schedules`, `vehicles`, `reservations`, `seatAvailability`, `prices`, `routes`, `chats`).
*   **Serverless**: Cloud Functions v2.2.0 para orquestación logística y rotación nocturna de las 7:00 PM COT (Node.js 22).
*   **Security**: Reglas ABAC/RBAC de alta granularidad para aislamiento comercial.

---

## 📂 Biblioteca Técnica Integral (Documentación Master)

| Dominio | Documento Maestro | Propósito |
|:---|:---|:---|
| 🏛️ **General** | [**Enciclopedia Ruta-Go**](./docs/DOCUMENTACION.md) | Punto de entrada y visión general de la suite Go. |
| 🖥️ **Web** | [**Arquitectura Web**](./docs/web/WEB_PORTAL_ARCHITECTURE.md) | Detalle del stack React, Atomic Design y Roles. |
| 🏗️ **Arquitectura** | [**Arquitectura Móvil**](./docs/mobile/ARCHITECTURE_MODULES.md) | Diseño de módulos Android, Managers y Servicios. |
| ⚙️ **Lógica** | [**Flujos Técnicos**](./docs/core/technical/LOGICAL_FLOWS.md) | Radiografía de procesos (Reservas, Rotación, Login). |
| 🤖 **Ingeniería** | [**Guías de Desarrollo**](./docs/core/technical/DEVELOPER_GUIDELINES.md) | Estándares de código, Git semántico y reglas de oro. |
| 📖 **Manual** | [**Manual de Usuario**](./docs/core/product/USER_MANUAL.md) | Guía práctica para pasajeros, conductores y socios. |
| 🛡️ **Legal** | [**Gestión de Datos**](./docs/core/legal/DATA_MANAGEMENT_MANUAL.md) | Protocolos de privacidad y Habeas Data (Ley 1581). |
| 📜 **Historial** | [**Changelog Oficial**](./docs/core/operations/CHANGELOG.md) | Registro detallado de la evolución hacia la v2.0.1-BETA. |

---

## 📩 Contacto y Soporte
Desarrollado por **ChopCode Solutions**.

- **Desarrollador Lead:** Brandon Daza Cerquera
- **Email:** 📧 [dazace94@gmail.com](mailto:dazace94@gmail.com)
- **GitHub:** 🔗 [Brandon094](https://github.com/Brandon094)

---
*Engineering for Rural Productivity - 2026.* 🚌💨🎯🏁

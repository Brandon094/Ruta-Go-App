# 🚍 Ruta-Go (Transporte Nátaga - La Plata - Huila) | v2.0.1-BETA 🚀

**Ruta-Go** es una plataforma integral de vanguardia diseñada para profesionalizar y optimizar el transporte intermunicipal en la región del Huila (Colombia). Esta versión **v2.0.1-BETA** consolida la migración completa a **Jetpack Compose en Android** y un **Motor de Rutas e Itinerarios Dinámicos en React**, operando bajo el esquema NoSQL v2.0 Clean Schema con paridad total en tiempo real entre móvil y web. ✨

---

## 🏆 Hitos de la Suite Integral (v2.0.1-BETA)
*   📱 **UI 100% Jetpack Compose**: Interfaz móvil Android declarativa construida bajo **Atomic Design System** y Material 3.
*   🗺️ **Motor de Rutas e Itinerarios Dinámicos**: Gestión interactiva de rutas y tarifas desde el Portal Web (`AddRouteModal.jsx`, `AddScheduleModal.jsx`, `EditScheduleModal.jsx`) con autocompletado de precios, tiempos y edición/eliminación en tiempo real.
*   🧭 **Navegación Dinámica en Planilla & Home**: Selector dinámico de Origen y Destino (`PassengerOverview.jsx`) y pestañas reactivas por trayecto (`ScheduleDirectory.jsx`, `LandingSchedules.jsx`).
*   🚗 **Vinculación de Flota, Socios y Conductores**: Módulo de activos (`VehicleModal.jsx`) con selección interactiva de Socio (`ownerId`) y Conductor (`driverId`) con actualización bidireccional en `/users/` y `/vehicles/`.
*   👑 **Ascenso Directo de Socios**: Herramienta de super-poderes para el Admin Root (`AddOwnerModal.jsx`) para promover cualquier usuario a Socio de Flota por correo o selección desplegable.
*   ⚡ **Desacoplamiento de Flota**: Creación flexible de horarios para el Admin Root sin requerir vehículos o conductores asignados previamente.
*   🌐 **Portal Web "Mirror Edition"**: Paridad 1:1 con la App móvil para pasajeros, conductores, dueños y administradores con Google Sign-In para Pasajeros y Socios.
*   🚀 **Android 16 (SDK 36) Ready**: Optimización total para la última versión de Android, incluyendo soporte Edge-to-Edge nativo.

---

## 🏗️ Stack Tecnológico e Ingeniería

### **Ecosistema Móvil (Android)**
*   **Lenguajes**: Java 17 / Kotlin (Transición a Jetpack Compose iniciada).
*   **Patrón**: MVVM desacoplado con Clean Architecture.
*   **UI**: Material Design 3 con soporte dinámico para insets de sistema.

### **Ecosistema Web (React/Vite)**
*   **Core**: React 18 + Vite (Atomic Design Architecture).
*   **Performance**: Carga diferida (Lazy loading) y optimización masiva de activos (WebP).
*   **Sincronización**: Custom Hooks especializados para monitoreo de flota en tiempo real.

### **Infraestructura Backend (Firebase Cloud)**
*   **Database**: Realtime Database (RTDB) con latencia ultra-baja.
*   **Serverless**: Cloud Functions para orquestación logística y rotación nocturna (Node.js 22).
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

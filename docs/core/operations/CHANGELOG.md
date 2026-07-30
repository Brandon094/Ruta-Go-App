# 📜 Historial de Cambios (Changelog) - Ruta-Go

Todos los cambios notables en este proyecto serán documentados en este archivo siguiendo el estándar [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [1.9.10] - 2026-06-07 (UI Parity 1:1 & High-Fidelity Schedules)
*Esta versión alcanza la paridad visual absoluta entre Web y Mobile, optimizando la jerarquía de información y la experiencia de reserva en Android.*

### 📱 Ruta-Go Mobile (Android v1.5.3)
- **Resaltado de Próximo Viaje**: Implementación de borde naranja (`primary_500`) de 2dp y elevación de 8dp para destacar el turno vigente.
- **Estados de Horarios**: Aplicación de opacidad (0.5) y paleta de colores atenuada para turnos finalizados, mejorando el enfoque visual.
- **Rediseño de Badge "Siguiente"**: Migración a un formato de esquina flotante con bordes asimétricos, calcando el diseño premium del portal web.
- **Paridad UI (Conductores)**: Visualización del nombre del operador en las tarjetas de horarios y lógica de hidratación dinámica desde Firebase.

### 🌐 Ruta-Go Web (Portal v1.1.6)
- **Bloqueo Universal de Jornada**: Sincronización de la lógica de expiración para inhabilitar reservas en horarios pasados para todos los roles administrativos.

## [1.9.9.9] - 2026-06-06 (Centralized Driver Onboarding & Legacy Cleanup)
*Esta versión elimina definitivamente el auto-registro de conductores en Android, consolidando el flujo de afiliación administrativa exclusiva desde el Portal Web.*

### 📱 Ruta-Go Mobile (Android v1.5.2)
- **Deprecación de Registro Autónomo**: Eliminación completa de la interfaz y lógica de registro para conductores en la App.
- **Purgado de Deuda Técnica**: Borrado físico de `DriverRegistrationActivity`, `DriverRegistrationViewModel` y layouts asociados.
- **Login Optimizado**: Rediseño de la pantalla de inicio de sesión para un flujo de entrada más limpio.

### 🌐 Ruta-Go Web (Portal v1.1.6)
- **Hito de Paridad**: Consolidación como el único canal oficial para el alta de operadores en el ecosistema.

## [1.9.9.8] - 2026-06-05 (Read-Only Vehicle for Drivers & Profile Refactor)

## [1.9.9.7] - 2026-06-04 (Share Ticket Feature & Real-time Landing Fixes)

## [1.9.9.6] - 2026-06-03 (Android 16 API 36 Compliance & Fixed Driver Registration)

### 🔧 Go-Core (Backend & Logic)
- **Sincronización Transaccional**: Optimización de la lógica de servicios para garantizar la integridad de datos entre el portal y la App.

## [1.9.9.5] - 2026-07-24 (Fluid Navigation & Lead Magnet Integration)
*Esta versión erradica los glitches visuales durante la carga de módulos y lanza el primer "Lead Magnet" estratégico en la Landing Page para aumentar la conversión de pasajeros.*

### 📱 Ruta-Go Mobile (Android v1.4.0)
- **README Maestro High Fidelity**: Refactorización del archivo principal del proyecto con enlaces corregidos y visión estratégica actualizada.
- **Sincronización Total de Documentación**: Auditoría y actualización de más de 40 archivos MD en las carpetas Core, Mobile y Web.

### 🌐 Ruta-Go Web (Portal v1.0.0)
- **Lead Magnet de Horarios**: Nueva sección `LandingSchedules.jsx` en la página principal que muestra los despachos en tiempo real.
- **Estrategia de Conversión**: Botones de reserva que redirigen a usuarios no autenticados al flujo de registro.
- **Motor de Transiciones React 18**: Implementación del hook `useTransition` para gestionar cambios de estado pesados en la web.
- **Navegación Blindada**: Helpers `navigateTo` y `changeTab` para eliminando parpadeos y estados inconsistentes.

### Corregido
- **Eliminación definitiva de Glitches de Dashboard**: Sincronización con el `SplashScreen` para evitar mostrar Dashboards incorrectos durante la resolución de roles.

## [1.9.9.4] - 2026-07-24 (Accessibility AA & Image Format Optimization)
### Añadido
- **Accesibilidad Nivel AA (Segunda Intervención)**: Incremento de ratios de contraste y ampliación de objetivos táctiles (48px).
- **Optimización WebP**: Migración forzada a formato WebP para activos remotos.

## [1.9.9.3] - 2026-07-24 (Lighthouse Audit & Core Optimization)
### Añadido
- **Lighthouse Score > 90**: Implementación de `aria-label`, etiquetas semánticas `<main>` y redimensionamiento de imágenes hero.

## [1.9.9.2] - 2026-07-24 (Advanced Performance & Code Splitting)
### Añadido
- **React Lazy & Suspense**: Arquitectura de carga diferida para que la Landing Page vuele, descargando módulos administrativos bajo demanda.

## [1.9.9] - 2026-07-24 (Identity Resolution & SplashScreen Premium)
### Añadido
- **Molécula `SplashScreen.jsx`**: Experiencia de carga de alta fidelidad con animaciones orbitales y resolución de identidad blindada.

## [1.9.8] - 2026-07-24 (Driver UX Upgrade & Atomic Consistency)
### Añadido
- **Upgrade del Dashboard de Conductor**: Paridad 1:1 con la analítica de dueños usando el componente `RouteProgressCard.jsx`.

## [1.9.7] - 2026-07-24 (Rotation Algorithm Precision & Grouping Fix)
### Corregido
- **Sincronización de Horarios Especiales**: Refactorización de grupos lógicos para Turno 8 (Triple Especial) y Turno 9.

## [1.8.7] - 2026-07-24 (Critical Analytics Fix & Route Intelligence)
### Corregido
- **Fix de Ocupación Global**: Separación lógica de trayectos de ida y vuelta basada en el destino explícito en `useRealtimeData.js`.

## [1.8.3] - 2026-07-24 (Atomic Sidebar & Collapsible UX)
### Añadido
- **Sidebar Inteligente**: Secciones colapsables y auditoría global DRY en el 100% de la App de Gestión.

## [1.8.2] - 2026-07-24 (Explicit User Manuals & Atomic Help Center)
### Añadido
- **Manuales 360°**: Reescritura de guías para Pasajeros, Conductores y Socios con lenguaje humano y descriptivo.

## [1.8.1] - 2026-07-24 (Fix: Identidad MirrorHeader)
### Añadido
- **Badge de Estado**: Restauración de nombres y estatus ("Pasajero Activo") en la cabecera móvil.

## [1.8.0] - 2026-07-24 (Pricing Module Optimization & Atomic Refactor)
### Añadido
- **Molécula `PricingCard.jsx`**: Profesionalización de la gestión de tarifas con soporte para `FormatUtils`.

## [1.7.5] - 2026-07-24 (Management Architecture Unification & Directory Refactor)
### Añadido
- **Organismo `DirectoryHeader.jsx`**: Centralización de búsquedas y acciones en todos los directorios administrativos.

## [1.6.0] - 2026-07-24 (Full Web Parity & Atomic Architecture)
### Añadido
- **Tiquete Digital Mirror**: Implementación 1:1 de la interfaz de tiquete de Android para la web.
- **Sistema de Calificación (Rating)**: Motor de reputación espejo con sincronización automática de nodos.
- **Venta Asistida**: Los Dueños ahora pueden realizar reservas desde su Dashboard administrativo.

## [1.5.0] - 2026-07-22 (Ecosystem & Business Edition)
### Añadido
- **Soporte iPhone (PWA)**: Web App instalable con soporte para iconos nativos.
- **Identidad Única (SSO)**: Registro y Login unificado para todo el holding.

## [1.3.0] - 2026-07-13 (Android 15 Optimized Edition - Play Store Release)
### Añadido
- **Soporte Android 15 (SDK 35)**: Experiencia Edge-to-Edge y cumplimiento de políticas de Google Play.
- **Sprint de Documentación**: 10 manuales técnicos "Deep-Dive" y JavaDoc integral.

## [1.0.0] - 2025-05-01
- Lanzamiento inicial del ecosistema Ruta-Go.

---
**Chop Code Solutions - Evolucionando el transporte regional.**

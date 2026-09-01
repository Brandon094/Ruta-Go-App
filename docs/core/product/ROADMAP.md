# 🚀 Hoja de Ruta y Próximas Funcionalidades - Ruta-Go

Este documento describe la visión a futuro de la plataforma Ruta-Go, detallando los módulos y características que se implementarán en las siguientes fases de desarrollo para convertir el proyecto en una startup rentable y escalable en la región.

---

## ✅ Fase 1: Estabilización y Optimización (Completado)
*   [x] Arquitectura MVVM Reactiva y Motores Core.
*   [x] Registro Autónomo de Conductores y Gestión de Activos.
*   [x] Tutorial Hub Interactivo y Guías de Usuario.
*   [x] **Optimización Android 15 (SDK 35)**: Edge-to-Edge y 16 KB support.
*   [x] **Full Documentation Sprint**: Documentación técnica y legal v1.3.0.
*   [x] **Fix Core de Rotación y Notificaciones**: Estabilización de Cloud Functions y asignación de conductores.

---

## ✅ Fase 2: Consolidación y Dueños de Vehículos (Completado)
*Objetivo: Sentar las bases de escalabilidad mediante el desacoplamiento técnico y la creación del rol "Dueño".*

*   [x] **🚗 Desacoplamiento Vehículo-Conductor**: Nodo `/dueños/` centralizado y propiedad de activos blindada.
*   [x] **🌐 Ruta-Go Portal (v1.5.0)**: Lanzamiento del ecosistema web centralizado (Landing Page + Business App).
*   [x] **🍏 Soporte Universal (iPhone)**: Implementación de PWA para permitir que pasajeros y conductores de Apple usen la plataforma sin depender de la App Store.
*   [x] **👑 Go Business Dashboard**: Módulo para dueños con aislamiento de datos, monitor de flota e ingresos en tiempo real.
*   [x] **⚖️ Cumplimiento Legal Web**: Integración de Términos, Privacidad y Derecho al Olvido en el portal.
*   [x] **🚀 Activación Instantánea**: Flujo de registro automatizado para socios y administradores.
*   [x] **💎 Web Refactor & UI Mirror (v1.5.1)**:
    *   Arquitectura Singleton (`FirebaseManager`) y modularización de hooks.
    *   Estrategia de navegación dual (Mobile Mirror para Operativos / Sidebar para Gestión).
    *   Sincronización de capacidad real y auto-scroll inteligente.
    *   Módulo independiente de Gestión de Socios para Admin Root.

---

## ✅ Fase 3: Operación Web Total e Ingeniería de Alta Fidelidad (Completado)
*Objetivo: Alcanzar paridad de funciones con la App móvil y elevar el estándar técnico a nivel de Startup Silicon Valley.*

### 🛠️ 1. Motor de Reservas & Notificaciones
*   [x] **🎟️ Motor de Reservas Web (v1.6.0)**: Selección de asientos interactiva y generación de reserva oficial para usuarios de iPhone (Payload 1:1 con Android).
*   [x] **📸 Función Compartir Tiquete (v1.1.5)**: Implementación de captura visual (html2canvas) y Web Share API para paridad total con la experiencia móvil.
*   [x] **🔔 Centro de Notificaciones Web & Chat**: Implementación de Firebase Cloud Messaging (FCM) para enviar avisos de despacho, confirmaciones y mensajes de chat desde la web mediante Cloud Functions.

### 👑 2. Gobernanza Root Pro & Analítica Avanzada
*   [x] **👨‍💼 Vínculo Dueño-Conductor**: Interfaz para asignar jefes de flota a los conductores desde el panel Root.
*   [x] **🛡️ Control de Pasajeros**: Suite de moderación para **Banear, Inactivar o Borrar** cuentas.
*   [x] **🔄 Refactor de Rotación (Escalafón Fijo & ID Dinámico)**: Sincronización milimétrica con Cloud Functions para turnos triples y especiales (Turno 8 y 9).
*   [x] **📊 Motor de Inteligencia Analítica (v1.9.0)**: 
    *   Cálculo de ingresos basado en ocupación real (Digital + Venta Física).
    *   Detección inteligente de trayecto por destino final (Nátaga <-> La Plata).

### 🎫 3. Experiencia de Usuario "Premium" & Rendimiento (v1.9.10)
*   [x] **⚛️ Arquitectura Atómica & DRY**: Refactorización total del 100% del portal en Atoms, Molecules y Organisms.
*   [x] **🚀 Optimización Extreme Performance**:
    *   **React Lazy & Suspense**: Code splitting para carga instantánea de la Landing Page.
    *   **Motor de Transiciones React 18**: Navegación fluida sin parpadeos visuales ni glitches de identidad.
    *   **Auditoría Lighthouse**: Puntuación sobresaliente en Accesibilidad (AA), SEO y Best Practices.
*   [x] **✨ Identidad de Marca Unificada**:
    *   **SplashScreen Premium**: Experiencia de carga de alta fidelidad.
    *   **Átomo BrandLogo**: Centralización total de la imagen corporativa.
*   [x] **👨‍✈️ Upgrade Dashboard Conductor**: Visualización de progreso y porcentajes unificada con el panel de socios.
*   [x] **💎 Paridad Visual 1:1 (v1.9.10)**: Sincronización de tarjetas de horarios, resaltado de próximo viaje y estados de finalización entre plataformas.

---

## 📱 Fase 4: Modernización Android, Normalización NoSQL & Rutas Dinámicas (Completado)
*Objetivo: Migración a Compose, unificación NoSQL v2.0, gestor de rutas dinámicas y soporte multi-municipio.*

### 🏗️ 1. Modernización Nativa & UI Declarativa (Completado)
*   [x] **🎨 Transición 100% a Jetpack Compose**: UI declarativa en Single-Activity (`MainActivity.kt`) siguiendo Atomic Design y MVVM.
*   [x] **🔑 Autenticación Social Google One Tap**: Integración con `GoogleLoginService` e `IntentSenderRequest`.
*   [x] **💾 Persistencia de Sesión & Onboarding**: Almacenamiento local centralizado en `SessionManager` (`rutago_prefs`).
*   [x] **🗺️ Navegación Robusta de Reservas**: Flujo completo de Selección de Asientos ➔ Confirmación con `Uri.encode`.

### 📊 2. Unificación NoSQL v2.0 & Sincronización Web/Móvil (Completado)
*   [x] **🌐 Esquema Unificado en Inglés**: Normalización de llaves NoSQL (`users`, `schedules`, `vehicles`, `reservations`, `prices`, `seatAvailability`, `driverRatings`, `routes`).
*   [x] **👨‍✈️ Consolidación de Conductores**: Eliminación del nodo `/conductores/` integrando perfiles operativos en `/users/` bajo el atributo `role: "driver"`.
*   [x] **⚙️ Sincronización de Consultas Nativas & Web**:
    *   Ajustados `AuthRepositoryImpl`, `UserService`, `ScheduleService`, `PriceService` en Android para consumir `/users/`, `/prices/` y `/schedules/`.
    *   Ajustados hooks del Portal Web (`useRealtimeData`, `useRoleResolver`) para consumir `/users/`, `/schedules/`, `/prices/` y `/routes/` con subscripciones de nivel superior.

### 🗺️ 3. Rutas Dinámicas, Multi-Municipio & Registro con Google (Completado)
*   [x] **📍 Creador y Editor de Rutas e Itinerarios (CRUD)**:
    *   `AddRouteModal.jsx` y `AddScheduleModal.jsx` para la creación de rutas dinámicas y horarios sin requerir flota asignada previa.
    *   `EditScheduleModal.jsx` y `scheduleService.updateSchedule` para modificar o eliminar cualquier parámetro de horarios en tiempo real.
*   [x] **🔍 Buscador Universal de Viajes por Origen/Destino**:
    *   `PassengerOverview.jsx`: Selector desplegable de Origen/Destino y chips de cambio rápido.
    *   `LandingSchedules.jsx`: Agrupamiento en tiempo real de horarios para cualquier trayecto registrado.
*   [x] **🔑 Google Sign-In para Registro de Socios**: Botón de registro con Google en `Register.jsx` con asignación automática de `role: "owner"`.

---

## 📉 Fase 5: Diversificación y Expansión Regional (Próxima Fase)
*Objetivo: Solución integral de movilidad departamental, Android Auto y control definitivo del flujo de paquetería local.*

### 🚗 1. Ruta-Go In-Car (Android Auto)
*   [ ] **🎮 Interfaz Android Auto**: Panel de control simplificado para la pantalla del vehículo de la flota.
*   [ ] **✅ Gestión Manos Libres**: Permitir que el conductor acepte o cancele reservas con un solo toque desde el tablero.
*   [ ] **📢 Avisos por Voz**: Notificaciones de voz para nuevos pasajeros en tiempo real.

### 🚚 2. Logística & Servicios Extra
1.  **📦 Módulo de Encomiendas "Ruta-Go Cargo"**: Registro rápido de paquetes físicos y sistema de rastreo para el cliente.
2.  **🛡️ Seguro de Viaje Digital**: Integración de micro-seguros por trayecto.
3.  **📊 SaaS Contable Premium para Dueños**: Gestión completa de egresos (mantenimiento, combustible) y cálculo de utilidad neta.
4.  **🤖 IA de Predicción de Demanda**: Optimización de frecuencias basada en datos históricos.

---
**ChopCode Solutions - 2026**

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
*   [ ] **🔔 Centro de Notificaciones Web**: Implementación de Firebase Cloud Messaging (FCM) para enviar avisos de despacho y confirmaciones desde la web.

### 👑 2. Gobernanza Root Pro & Analítica Avanzada
*   [x] **👨‍💼 Vínculo Dueño-Conductor**: Interfaz para asignar jefes de flota a los conductores desde el panel Root.
*   [x] **🛡️ Control de Pasajeros**: Suite de moderación para **Banear, Inactivar o Borrar** cuentas.
*   [x] **🔄 Refactor de Rotación (Escalafón Fijo & ID Dinámico)**: Sincronización milimétrica con Cloud Functions para turnos triples y especiales.
*   [x] **📊 Motor de Inteligencia Analítica (v1.9.0)**: 
    *   Cálculo de ingresos basado en ocupación real (Digital + Venta Física).
    *   Detección inteligente de trayecto por destino final (Nátaga <-> La Plata).
*   [ ] **📦 Exportación de Reportes**: Generación de PDFs/Excel de despachos y contabilidad.

### 🎫 3. Experiencia de Usuario "Premium" & Rendimiento (v1.9.9.5)
*   [x] **⚛️ Arquitectura Atómica & DRY**: Refactorización total del 100% del portal en Atoms, Molecules y Organisms.
*   [x] **🚀 Optimización Extreme Performance**:
    *   **React Lazy & Suspense**: Code splitting para carga instantánea de la Landing Page.
    *   **Motor de Transiciones React 18**: Navegación fluida sin parpadeos visuales (glitches).
    *   **Auditoría Lighthouse**: 90+ en Accesibilidad y 100 en SEO / Best Practices.
*   [x] **✨ Identidad de Marca Unificada**:
    *   **SplashScreen Premium**: Experiencia de carga de alta fidelidad.
    *   **Átomo BrandLogo**: Centralización total de la imagen corporativa.
*   [x] **👨‍✈️ Upgrade Dashboard Conductor**: Visualización de progreso y porcentajes idéntica a la de los socios.

---

## 📱 Fase 4: Modernización Android & Proyectos Especiales (En Desarrollo)
*Objetivo: Migrar la App Android a Compose e integrar la tecnología en el vehículo mismo.*

### 🏗️ 1. Modernización Nativa
*   [ ] **🎨 Transición a Jetpack Compose**: UI declarativa para paridad total con React.
*   [ ] **🧩 Unificación de Motores**: Capa de servicios compartida (DRY) entre móvil y web.

### 🚗 2. Ruta-Go In-Car (Android Auto)
*   [ ] **🎮 Interfaz Android Auto**: Panel simplificado para la pantalla del vehículo.
*   [ ] **✅ Gestión Manos Libres**: Permitir que el conductor acepte o cancele reservas con un toque desde el tablero.
*   [ ] **📢 Avisos por Voz**: Notificaciones auditivas de nuevos pasajeros durante la ruta.

---

## 📉 Fase 5: Diversificación y Expansión Regional (Largo Plazo)
*Objetivo: Solución integral de movilidad departamental y control definitivo del flujo de paquetería local.*

### 🗺️ 1. Rutas Dinámicas & Multi-Municipio
*   [ ] **📍 Gestión de Localidades**: Módulo para que el Admin Root añada nuevos municipios al ecosistema (Paicol, Tesalia, Neiva, etc.).
*   [ ] **⚙️ Creador de Itinerarios CRUD**: Interfaz para generar nuevos turnos y rutas bajo demanda sin modificar el código base.
*   [ ] **🔍 Buscador Universal de Viajes**: Reemplazo de pestañas fijas por selectores de Origen/Destino en el Dashboard de pasajeros.

### 🚚 2. Logística & Servicios Extra
1.  **📦 Módulo de Encomiendas "Ruta-Go Cargo"**:
    *   Registro rápido de paquetes físicos por parte del conductor.
    *   Buscador de estado de guía para pasajeros con chat directo.
2.  **🛡️ Seguro de Viaje Digital**: Micro-seguros por trayecto integrados en la reserva.
3.  **📊 SaaS Contable Premium para Dueños**: Control de egresos (mantenimiento, gasolina) y cálculo de utilidad neta automatizado.
4.  **🤖 IA de Predicción de Demanda**: Sugerencias de turnos extra basadas en datos históricos regionales.

---
**ChopCode Solutions - 2026**

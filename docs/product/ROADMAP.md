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

## ✅ Fase 3: Operación Web Total y Monetización (Completado - Paridad Lograda)
*Objetivo: Alcanzar paridad de funciones con la App móvil y comenzar la captura de valor.*

### 🛠️ 1. Motor de Reservas & Notificaciones
*   [x] **🎟️ Motor de Reservas Web (v1.6.0)**: Selección de asientos interactiva y generación de reserva oficial para usuarios de iPhone (Payload 1:1 con Android).
*   [ ] **🔔 Centro de Notificaciones Web**: Implementación de Firebase Cloud Messaging (FCM) para enviar avisos de despacho y confirmaciones desde la web. (Pendiente)

### 👑 2. Gobernanza Root Pro (Control Maestro)
*   [x] **👨‍💼 Vínculo Dueño-Conductor**: Interfaz para asignar jefes de flota a los conductores desde el panel Root.
*   [x] **📑 Selector de Dueños**: Reemplazar ingreso manual de UIDs por una lista desplegable de socios aprobados al crear conductores.
*   [x] **🛡️ Control de Pasajeros**: Botones de acción en la tabla de usuarios para **Banear, Inactivar o Borrar** cuentas con un clic.
*   [x] **🔄 Refactor de Rotación (Escalafón Fijo)**: Eliminado el ordenamiento dinámico por ID en la Cloud Function `automatedRotation` y migrado a un sistema basado en la propiedad `posicionEscalafon` para evitar desincronización al añadir nuevos conductores.
*   [ ] **📈 Analítica Extendida**: Implementación de gráficas históricas de ingresos y ocupación (no solo diaria).
*   [ ] **📜 Registro de Auditoría**: Bitácora de cambios realizados por administradores para trazabilidad operativa.
*   [ ] **📦 Exportación de Reportes**: Generación de PDFs/Excel de despachos y contabilidad para dueños y admins.

### 🎫 3. Experiencia de Usuario "Premium" (Mirror 1:1)
*   [x] **📱 Suite de Viaje en Historial**:
    *   [x] Visualización de **Tiquete Digital** (diseño espejo de la App).
    *   [x] Módulo de **Chat en vivo** para coordinar con el conductor.
    *   [x] Sistema de **Calificación de Viaje** (1-5 estrellas).
*   [x] **✨ Micro-interacciones & Utils (Startup Grade)**: 
    *   [x] Implementación de `FormatUtils` y `AnimationUtils` (conteo animado de moneda, abreviaciones K/M).
    *   [x] **Bus Departure Animation**: El botón de reserva se transforma en bus y "arranca" cuando el viaje ha pasado.
    *   [x] **Seat Pop Animation**: Entrada escalonada y animada del mapa de asientos.
    *   [x] **Card Entry Effects**: Animaciones de aparición para tarjetas de historial y dashboards.
*   [ ] **🌟 Programa de Fidelización "Puntos Go"**: Implementación de niveles y redención de puntos.

---

## 📱 Fase 4: Modernización Android Nativa (Evolución Técnica)
*Objetivo: Migrar la App Android a una arquitectura DRY y Atomic Design para paridad total con la Web.*

### 🏗️ 1. Refactor de Arquitectura (DRY)
*   [ ] **🧩 Unificación de Motores**: Consolidar la lógica de negocios (precios, reservas, bloqueos) en una capa de servicios compartida entre los flujos de Pasajero y Conductor.
*   [ ] **⚛️ Atomic Design en XML**: Creación de una biblioteca de estilos y componentes reutilizables (Atoms/Molecules) para reducir la duplicidad de layouts.
*   [ ] **🎮 Lógica de Interfaz Dinámica**: Reemplazar Activities separadas por layouts inteligentes que adapten sus funciones según el rol del usuario (Mobile Mirror Logic).

### 🚀 2. Transición a Jetpack Compose
*   [ ] **🎨 UI Declarativa**: Migración gradual de vistas XML a Jetpack Compose para lograr una estructura de código "hermana" de React.
*   [ ] **🔄 Sincronización de Componentes**: Garantizar que el Mapa de Asientos y los Dashboards sean visualmente idénticos en Web y Android mediante el uso de componentes de UI unificados.

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

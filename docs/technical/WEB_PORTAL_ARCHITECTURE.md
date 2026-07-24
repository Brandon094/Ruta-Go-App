# 🖥️ Arquitectura y Ecosistema Web - Ruta-Go

Este documento detalla la estructura, flujo de datos y gobernanza del **Ruta-Go Web Portal** (v1.6.6), la plataforma centralizada para la gestión del Holding Tecnológico que conecta Nátaga y La Plata.

---

## 🏗️ 1. Stack Tecnológico (Modern SPA)
La plataforma utiliza una arquitectura de **Single Page Application** optimizada para rendimiento y SEO:

*   **Core**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/) (Build Engine).
*   **Diseño**: [Tailwind CSS 3](https://tailwindcss.com/) siguiendo principios de **Atomic Design**.
*   **Gestión Cloud**: Patrón **Singleton** mediante `FirebaseManager` para centralizar infraestructura.
*   **Estructura Atómica**:
    *   **Atoms**: `Button`, `Badge`, `Input`, `Modal`. Componentes básicos e indivisibles.
    *   **Molecules**: `SummaryMetric`, `IconRow`. Combinaciones de átomos con lógica visual.
    *   **Organisms**: `ExecutiveHeader`, `MirrorHeader`, `TicketModal`, `RatingModal`, `ChatModal`, `ScheduleTable`, `SeatManagementModal`. Piezas complejas de UI que orquestan la experiencia del usuario.
*   **Gestión de Activos**: Módulo independiente de Vehículos con lógica de vinculación dinámica a conductores y **sincronización automática de capacidad** en los nodos de disponibilidad.
*   **Capa de Utilidades**: `FormatUtils.js` y `AnimationUtils.js` para asegurar la paridad de comportamiento con Android (conteo de dinero, formatos moneda COP).
*   **Gestion de Activos**: Módulo independiente de Vehículos con lógica de vinculación dinámica a conductores y **sincronización automática de capacidad** (13/13) en los nodos de disponibilidad tras la asignación de turnos.
*   **Reactividad**: Custom Hooks especializados (`useRoleResolver`, `useRealtimeData`) coordinados por un orquestador central.
*   **Iconografía**: [Lucide React](https://lucide.dev/) (Consistencia con App móvil).
*   **Despliegue**: [Firebase Hosting](https://firebase.google.com/products/hosting).

---

## 🌎 2. Frontera Pública: Landing Page
La puerta de entrada (`LandingPage.jsx`) está diseñada como un embudo de conversión para los tres actores del sistema:

1.  **Pasajeros**: Propuesta de valor basada en **Puntos Go** y reservas sin incertidumbre. Link directo a Play Store.
2.  **Conductores**: Enfoque en **Estatus Estrella** y rentabilidad. Link directo a Play Store.
3.  **Dueños de Flota**: Acceso administrativo para control de activos. Link directo al Portal de Socios.
    *   *UX Adaptativa*: Grid de 3 columnas en Desktop / Slider animado automático en Mobile.

---

## 🔐 3. Motor de Roles y Estrategia de Navegación (RBAC)
El portal implementa un sistema de **Control de Acceso Basado en Roles** con una UX diferenciada por perfil:

### 📱 Experiencia Operativa (Passenger & Driver)
*   **Paridad Total**: El portal web ahora ofrece el 100% de las funcionalidades críticas de la App nativa (Android), incluyendo Reservas, Tiquetes, Chat y Calificaciones.
*   **Interfaz Mobile-First**: Eliminación total del Sidebar para maximizar el foco en la tarea.
*   **Navegación**: Exclusiva mediante **Bottom Nav** (Home, Historial, Perfil), replicando la ergonomía de la App nativa.

### 👑 Gestión Administrativa (Admin Root & Owner)
*   **Navegación**: Exclusiva mediante **Administrative Sidebar**. Sin barra inferior para evitar redundancias.
*   **Acceso Híbrido**: Capacidad de realizar reservas de usuario desde el menú lateral sin perder la sesión administrativa.
*   **Visibilidad Root**: Gestión total de Socios, Conductores y Pasajeros.

---

## 🛰️ 4. Sincronización y Módulos
La inteligencia del portal reside en la escucha selectiva de nodos de Firebase RTDB:

*   **`useRealtimeStats.js`**: Orquestador de suscripciones (`onValue`). Realiza el filtrado lógico de datos según el rol del usuario autenticado, gestiona el fallback de capacidad de vehículos y sincroniza los datos del perfil actual desde `/usuarios`.
*   **`driverService.js` / `chatService.js`**: Capa de servicios para operaciones atómicas y mensajería.
*   **Gestión de Perfil Unificada**: Lógica de escritura centralizada en el nodo `/usuarios` para garantizar el cumplimiento de las reglas de seguridad de Firebase en todos los roles (Admin/Owner/Driver/Passenger).
*   **Gobernanza Pro**: Motores de moderación de usuarios (Ban/Inactivar), lógica de vinculación de activos mediante selectores de dueños aprobados y **Gestión de Tarifas Centralizada** para el Admin Root.
*   **Visión de Expansión**: Infraestructura preparada para la transición de rutas estáticas a un modelo dinámico multi-municipio (Paicol, Tesalia, Neiva), permitiendo la creación de nuevos trayectos desde el panel administrativo.
*   **Gestión de Operadores**: Interfaz dividida en "Operando Hoy" y "Fuera de Servicio" para una rápida toma de decisiones.
*   **UI Mirror (Planilla)**: Motor de renderizado dinámico con soporte para **Auto-Scroll** al próximo despacho y visualización de cupos reales.

---

## ⚖️ 5. Cumplimiento Legal
Módulos integrados para transparencia y cumplimiento de normativas de Google Play:
*   **`Terms.jsx`**: Contrato unificado para el ecosistema, incluyendo cláusulas de confidencialidad para dueños.
*   **`Privacy.jsx`**: Política de tratamiento de datos personales (**Ley 1581 de 2012**).
*   **Derecho al Olvido**: Implementación visual y lógica para el flujo de eliminación de cuentas.

---

## 📂 6. Estructura de Proyecto
```text
web_portal/
├── public/assets/      # Logos oficiales (Naranja/Navy)
├── src/
│   ├── components/     # UI Atómica
│   │   ├── ui/         # Átomos: Input.jsx, Badge.jsx, Button.jsx (DRY Core)
│   │   ├── dashboard/  # Overviews analíticos por Rol
│   │   ├── owners/     # Gestión de Socios (Solo Admin)
│   │   ├── history/    # Historial de Reservas
│   │   ├── profile/    # Perfil y Gestión de Vehículos
│   │   └── common/     # Sidebar, Header
│   ├── hooks/          # Motores de Sincronización
│   │   ├── modules/    # useRoleResolver.js, useRealtimeData.js
│   │   └── useRealtimeStats.js # Orquestador
│   ├── services/       # Firebase Data Services
│   ├── firebase.js     # Singleton: FirebaseManager
│   ├── App.jsx         # Orquestador (Refactorizado v1.5.1)
│   ├── LandingPage.jsx # Ficha Pública
│   ├── Login.jsx       # Gateway de Acceso
│   └── Register.jsx    # Registro con Guía de Beneficios
└── index.html          # Punto de entrada
```

---
**ChopCode Solutions - Inteligencia de Gestión 2026**

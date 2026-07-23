# 🖥️ Arquitectura y Ecosistema Web - Ruta-Go

Este documento detalla la estructura, flujo de datos y gobernanza del **Ruta-Go Web Portal** (v1.5.0), la plataforma centralizada para la gestión del Holding Tecnológico que conecta Nátaga y La Plata.

---

## 🏗️ 1. Stack Tecnológico (Modern SPA)
La plataforma utiliza una arquitectura de **Single Page Application** optimizada para rendimiento y SEO:

*   **Core**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/) (Build Engine).
*   **Diseño**: [Tailwind CSS 3](https://tailwindcss.com/) (Atomic CSS) con extensiones de **Glassmorphism**.
*   **Reactividad**: Custom Hooks (`useRealtimeStats`) para sincronización bidireccional con RTDB.
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

## 🔐 3. Motor de Roles y Seguridad (RBAC)
El portal implementa un sistema de **Control de Acceso Basado en Roles** mediante la resolución dinámica en el hook `useRealtimeStats`:

### 👑 Admin Root (Propietario del Holding)
*   **Visibilidad**: 100% de los datos (Usuarios, Dueños, Conductores, Reservas Totales).
*   **Dashboard**: 5 KPIs maestros incluyendo métrica de Socios Activos.
*   **Permisos**: Gestión total de la base de datos y aprobación de nuevos conductores.

### 💼 Owner (Dueño de Flota)
*   **Aislamiento de Datos**: Solo visualiza vehículos, conductores y ganancias vinculadas a su `ownerId`.
*   **Privacidad Competitiva**: En la planilla de horarios, ve los nombres de otros conductores pero la ocupación de buses ajenos aparece como "Privado".
*   **Restricciones**: El tab de "Usuarios" (Pasajeros) está bloqueado por Habeas Data.

---

## 🛰️ 4. Sincronización y Módulos
La inteligencia del portal reside en la escucha selectiva de nodos de Firebase RTDB:

*   **`useRealtimeStats.js`**: Orquestador de suscripciones (`onValue`). Realiza el filtrado lógico de datos según el rol del usuario autenticado.
*   **`driverService.js`**: Capa de servicios para operaciones atómicas (vincular conductor a vehículo mediante búsqueda por Email).
*   **Gestión de Operadores**: Interfaz dividida en "Operando Hoy" y "Fuera de Servicio" para una rápida toma de decisiones.

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
│   ├── components/     # UI Atómica (Common, Dashboard, Drivers, Schedules, Users)
│   ├── hooks/          # Lógica de negocio (useRealtimeStats)
│   ├── services/       # Firebase Data Services
│   ├── App.jsx         # Orquestador de Vistas y Roles
│   ├── LandingPage.jsx # Ficha Pública
│   ├── Login.jsx       # Gateway de Acceso
│   └── Register.jsx    # Registro con Activación Instantánea
└── index.html          # Punto de entrada (SEO optimizado)
```

---
**ChopCode Solutions - Inteligencia de Gestión 2026**

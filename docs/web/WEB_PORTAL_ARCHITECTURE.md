# 🖥️ Arquitectura y Ecosistema Web - Ruta-Go v1.9.9.5

Este documento detalla la estructura, flujo de datos y gobernanza del **Ruta-Go Web Portal**, la plataforma centralizada para la gestión del Holding Tecnológico que conecta Nátaga y La Plata.

---

## 🏗️ 1. Stack Tecnológico (Modern SPA)
La plataforma utiliza una arquitectura de **Single Page Application** de alto rendimiento:

*   **Core**: React 18 + Vite (Build Engine).
*   **Diseño**: Tailwind CSS 3 bajo metodología de **Atomic Design**.
*   **Infraestructura**: Patrón **Singleton** mediante `FirebaseManager`.
*   **Estructura Atómica**:
    *   **Atoms**: `Button`, `Badge`, `Input`, `Modal`, `BrandLogo`.
    *   **Molecules**: `SummaryMetric`, `IconRow`, `ScheduleCard`, `ContactInfo`, `StatsCard`, `RouteProgressCard`, `SplashScreen`.
    *   **Organisms**: `ExecutiveHeader`, `MirrorHeader`, `ScheduleTable`, `Sidebar`, `DirectoryHeader`, `AuthLayout`.
*   **Optimización**: 
    *   **Code Splitting**: Uso de `React.lazy` y `Suspense` para carga modular.
    *   **Fluid UI**: Uso de `useTransition` para eliminar parpadeos en cambios de estado pesados.
*   **Utilidades**: `FormatUtils.js` y `AnimationUtils.js` sincronizados 1:1 con la lógica de Android.

---

## 🌎 2. Estrategia de Conversión y UX
El portal se divide en dos grandes áreas funcionales:

### A. Landing Page (Pública)
Diseñada como embudo de conversión con secciones para Pasajeros, Conductores y Socios. Puntuación Lighthouse > 95.

### B. Aplicación de Gestión (Privada)
Basada en **RBAC (Role Based Access Control)**:
*   **Pasajero/Conductor**: Interfaz "Mobile Mirror" con **Bottom Nav** y funciones operativas completas (Reservas, Chat, Tiquetes).
*   **Dueño/Admin**: Interfaz "Dashboard Pro" con **Sidebar** colapsable y herramientas de analítica avanzada.

---

## ⚙️ 3. Inteligencia de Datos y Sincronización
El portal no solo consume datos, los procesa para la toma de decisiones:

*   **Motor Analítico 360°**: Calcula la ocupación y los ingresos sumando reservas digitales y bloqueos manuales (ventas en calle).
*   **Detección de Trayecto**: Algoritmo que clasifica la información basándose en el destino final (`-> Destino`).
*   **Gestión de Flota**: Vínculo dinámico entre `ownerId`, `driverId` y `vehicleId` con reglas de seguridad que garantizan el aislamiento comercial.
*   **Asignación Inteligente**: Soporte para grupos de horarios (Turno 8 Triple) y reseteo automático de capacidad.

---

## 📂 4. Estructura del Proyecto
```text
web_portal/
├── public/             # Activos estáticos y Logos
├── src/
│   ├── components/     # Componentes Atómicos (Atoms, Molecules, Organisms)
│   ├── hooks/          # Reactividad y Lógica de Negocio (useRealtimeData)
│   ├── services/       # Servicios de Datos (Singleton)
│   ├── utils/          # Formateadores y Animaciones
│   ├── firebase.js     # Configuración y Manager
│   ├── App.jsx         # Orquestador Principal v1.9.9.5
│   └── ...             # Vistas principales (Landing, Login, Register)
└── index.html          # Punto de entrada
```

---
**ChopCode Solutions - Web Engineering 2026**

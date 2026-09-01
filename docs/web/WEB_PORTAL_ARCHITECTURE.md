# 🖥️ Arquitectura y Ecosistema Web - Ruta-Go v2.0.1-BETA

Este documento detalla la estructura, flujo de datos y gobernanza del **Ruta-Go Web Portal**, la plataforma centralizada para la gestión del Holding Tecnológico que conecta Nátaga, La Plata, Neiva y municipios intermunicipales del Huila.

---

## 🏗️ 1. Stack Tecnológico (Modern SPA)
La plataforma utiliza una arquitectura de **Single Page Application** de alto rendimiento:

*   **Core**: React 18 + Vite (Build Engine).
*   **Diseño**: Tailwind CSS 3 bajo metodología de **Atomic Design**.
*   **Infraestructura**: Patrón **Singleton** mediante `FirebaseManager`.
*   **Estructura Atómica**:
    *   **Atoms**: `Button`, `Badge`, `Input`, `Modal`, `BrandLogo`.
    *   **Molecules**: `SummaryMetric`, `IconRow`, `ScheduleCard`, `ContactInfo`, `StatsCard`, `RouteProgressCard`, `PricingCard`, `SplashScreen`.
    *   **Organisms**: `ExecutiveHeader`, `MirrorHeader`, `ScheduleTable`, `PricingDirectory`, `ScheduleDirectory`, `VehicleDirectory`, `DriverDirectory`, `OwnerDirectory`, `AddRouteModal`, `AddScheduleModal`, `EditScheduleModal`, `AddOwnerModal`, `AddDriverModal`, `EditDriverModal`, `VehicleModal`, `Sidebar`, `DirectoryHeader`, `AuthLayout`.
*   **Optimización**: 
    *   **Code Splitting**: Uso de `React.lazy` y `Suspense` para carga modular.
    *   **Fluid UI**: Uso de `useTransition` para eliminar parpadeos en cambios de estado pesados.
    *   **Subscripciones Desacopladas**: Subscripciones reactivas de nivel superior sin anidamiento para evitar fuga de listeners.
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
*   **Gestión Dinámica de Rutas y Horarios (CRUD Completo & UX Fija)**:
    *   `AddRouteModal.jsx` y `AddScheduleModal.jsx` para la creación de rutas dinámicas e itinerarios.
    *   `EditScheduleModal.jsx` y `scheduleService.updateSchedule` para modificar hora, tarifa, ruta, conductor o bus en tiempo real.
    *   `PassengerOverview.jsx` & `ScheduleDirectory.jsx`: Selector de Origen/Destino y **Barra Flotante Sticky de Chips de Ruta (`sticky top-0 z-20`)** de ~48px con vidrio esmerilado (`backdrop-blur-md bg-white/95`).
    *   **Restricción de Conductor Asignado**: Bloqueo automático del botón de reserva con icono Candado (🔒 / `Lock`) y estado `disabled` cuando un horario no cuenta con un operador vinculado (`!driverId`).
*   **Gobernanza de Flota y Promoción de Socios**:
    *   `AddOwnerModal.jsx` y `ownerService.promoteUserToOwnerByEmail`: Ascenso directo de cualquier usuario al rol `owner` por correo o selección desplegable.
    *   `VehicleModal.jsx` y `vehicleService`: Selección interactiva de Socio (`ownerId`) y Conductor (`driverId`) con actualización bidireccional en `/users/` y `/vehicles/`.
*   **Asignación Inteligente**: Soporte para grupos de horarios y reseteo automático de capacidad a 13/13 puestos.

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

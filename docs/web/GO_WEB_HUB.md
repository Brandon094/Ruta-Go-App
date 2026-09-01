# 🌐 Portal Web Central: Ruta-Go (Web v2.0.1-BETA)

Este documento define la estructura, evolución y despliegue del hub web centralizado que sirve como punto de anclaje para la plataforma **Ruta-Go** (Sincronizado con Suite v2.0.1-BETA).

---

## ✅ 1. Estado Actual (v2.0.1-BETA - Modern SPA & Dynamic Engine)
El sitio web ha sido elevado a un estándar de alta fidelidad con React 18, Vite, Tailwind CSS 3 y soporte NoSQL v2.0 Clean Schema con paridad total con la aplicación nativa Android (v2.0.1).

*   **URL Oficial**: [https://trasnporte-nataga---la-plata.web.app](https://trasnporte-nataga---la-plata.web.app)
*   **Hosting**: Firebase Hosting con despliegue de producción.
*   **Performance**: Implementación de Code Splitting (`React.lazy` & `Suspense`), React Transitions y subscripciones desacopladas de nivel superior.

---

## 📂 2. Módulos Implementados

### 🏠 Landing Page & Selector Dinámico de Rutas
*   **Lead Magnet & Grupos de Rutas**: Agrupamiento en tiempo real de horarios para cualquier ruta registrada en la BD (`Nátaga ➔ La Plata`, `Nátaga ➔ Neiva`, etc.).
*   **Selector Dinámico Origen/Destino**: Filtros desplegables y chips de cambio rápido en el panel de pasajeros.
*   **Diseño Atómico**: Interfaz construida sobre componentes reutilizables (Atoms, Molecules, Organisms).

### 💼 Go Business & Dashboard Pro
*   **Gestión de Rutas e Itinerarios (CRUD Completo)**:
    *   `AddRouteModal.jsx` y `AddScheduleModal.jsx` para la creación dinámica de rutas y horarios sin requerir flota asignada.
    *   `EditScheduleModal.jsx` y `scheduleService.updateSchedule` para editar o eliminar cualquier parámetro de turno en tiempo real.
    *   `PricingDirectory.jsx`: Mapeo explícito de todas las direcciones registradas sin deduplicación alfabética invertida.
*   **Autenticación Social Google Sign-In**: Botón de registro de flota con Google en `Register.jsx` con auto-creación del perfil `role: "owner"`.
*   **Inteligencia Analítica 360°**: Visualización de ingresos reales (App + Calle) y porcentaje de ocupación por trayecto.
*   **Sincronización NoSQL v2.0**: Subscripciones desacopladas en `useRealtimeData.js` para `/users/`, `/schedules/`, `/vehicles/`, `/reservations/`, `/prices/` y `/routes/`.

### ⚖️ Centro Legal & Compliance
*   **Privacidad Blindada**: Módulo de política de datos alineado con la Ley 1581 de 2012 (Habeas Data).
*   **Flujo de Borrado**: Sistema automatizado de solicitud de eliminación de cuenta con periodo de gracia de 30 días (`deletionRequested`).

---

## 🔗 3. Próximas Mejoras Web
1.  **Animaciones de Carga con Boneyard**: Integración de la librería `boneyard` para reemplazar los estados de carga con esqueletos animados (skeleton loading) y shimmers de alta fidelidad durante la sincronización reactiva NoSQL.
2.  **Módulo de Fidelización**: Visualización y gestión del programa "Puntos Go" en el portal.
3.  **Ruta-Go In-Car Link**: Integración de la telemetría del portal con el futuro sistema Android Auto.

---
**ChopCode Solutions - Web Division 2026**

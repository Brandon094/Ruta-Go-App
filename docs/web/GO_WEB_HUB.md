# 🌐 Portal Web Central: Ruta-Go (Web v1.1.0)

Este documento define la estructura, evolución y despliegue del hub web centralizado que sirve como punto de anclaje para la plataforma **Ruta-Go** (Sincronizado con Suite v1.9.9.6).

---

## ✅ 1. Estado Actual (v1.1.0 - High Fidelity)
El sitio web ha sido elevado a un estándar de alta fidelidad, con una auditoría Lighthouse sobresaliente y paridad total con la aplicación nativa (Android v1.5.0), incluyendo compatibilidad con los esquemas de datos de Android 16.

*   **URL Oficial**: [https://rutago-huila.web.app](https://rutago-huila.web.app)
*   **Hosting**: Firebase Hosting con despliegue sincronizado de Cloud Functions.
*   **Performance**: Implementación de Code Splitting y React Transitions para una carga instantánea.

---

## 📂 2. Módulos Implementados

### 🏠 Landing Page de Alta Conversión
*   **Propuesta de Valor**: Secciones optimizadas para Pasajeros, Conductores y Dueños de Flota.
*   **Optimización SEO**: Metadatos dinámicos y rendimiento optimizado para indexación en Google.
*   **Diseño Atómico**: Interfaz construida sobre componentes reutilizables (Atoms, Molecules, Organisms).

### 💼 Go Business: Dashboard Inteligente (v1.9.6+)
*   **Inteligencia Analítica 360°**: Visualización de ingresos reales (App + Calle) y porcentaje de ocupación por trayecto.
*   **Gestión de Flota Pro**: Directorio expansible de vehículos y conductores con vinculación por correo.
*   **Asignación "Speed Mode"**: Interfaz optimizada para que el Administrador Root asigne turnos en segundos usando grupos lógicos.
*   **Sincronización Mirror-Dual**: Las reservas creadas en la web ahora utilizan UUIDs y un mapeo de llaves bilingüe (Español/Inglés) idéntico al de Android para prevenir errores de puntero nulo en la App móvil.
*   **Experiencia Operativa Mirror**: Los pasajeros y conductores cuentan con una interfaz idéntica a la App móvil para reservas y gestión de ruta.

### ⚖️ Centro Legal & Compliance
*   **Privacidad Blindada**: Módulo de política de datos alineado con la Ley 1581 de 2012.
*   **Flujo de Borrado**: Sistema automatizado de solicitud de eliminación de cuenta con periodo de gracia de 30 días.

---

## 🔗 3. Próximos Pasos
1.  **Notificaciones Web (FCM)**: Implementación del Service Worker para alertas push en tiempo real.
2.  **Módulo de Fidelización**: Visualización y gestión del programa "Puntos Go" en el portal.
3.  **Ruta-Go In-Car Link**: Integración de la telemetría del portal con el futuro sistema Android Auto.

---
**ChopCode Solutions - Web Division 2026**

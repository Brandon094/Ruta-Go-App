# 🎨 Inmersión Técnica: Capa de Interfaz de Usuario (UI)

Este documento detalla la arquitectura de las vistas en Ruta-Go, explicando cómo las Activities, Fragments y Adapters colaboran para entregar una experiencia premium y reactiva.

---

## 🏛️ 1. Arquitectura de Vista (MVVM)
Ruta-Go sigue estrictamente el patrón **Model-View-ViewModel**. La capa de UI es "tonta": solo observa cambios en el `LiveData` y delega toda la lógica de negocio a los ViewModels y la lógica visual pesada a los [Managers](./MANAGERS_DEEP_DIVE.md).

### Flujo de Datos Típico:
1.  **Activity/Fragment**: Inicia la carga de datos en el ViewModel.
2.  **ViewModel**: Solicita datos al [Servicio](./SERVICES_DEEP_DIVE.md).
3.  **UI**: Reacciona a los cambios en el estado (Loading -> Success/Error).

---

## 📱 2. Actividades y Fragments
Las actividades actúan como orquestadores de alto nivel y contenedores de navegación.

*   **`SplashActivity`**: Motor de enrutamiento inicial y branding.
*   **Dashboards (`PassengerHome`, `DriverHome`)**: Tableros principales que centralizan múltiples flujos informativos.
*   **`HorarioFragment`**: Componente crítico que encapsula la lógica de visualización de turnos, permitiendo su reutilización en el ViewPager de rutas.
*   **`BottomNavFragment`**: Gestiona la barra de navegación persistente con el "Efecto Duolingo" para transiciones instantáneas.

---

## 🔄 3. Adaptadores y Listas (RecyclerView)
Los adaptadores en Ruta-Go no solo pintan datos, implementan lógica visual avanzada:

*   **`ScheduleAdapter`**:
    *   **Identificación Operativa**: Resalta automáticamente el próximo viaje por salir.
    *   **Animaciones**: Orquesta la animación de "Salida del Bus" para turnos finalizados.
*   **`ChatAdapter`**: Gestiona tipos de vista duales (Enviado/Recibido) para una conversación natural.
*   **`ReservationAdapter`**: Provee controles interactivos para que el conductor valide tiquetes digitales en tiempo real.

---

## ✨ 4. Experiencia de Usuario (UX) Premium
La capa de UI integra estándares de diseño modernos:
*   **Edge-to-Edge**: Uso total de la pantalla en Android 15 (SDK 35).
*   **Feedback Táctil**: Animaciones de escala en cada clic.
*   **Interpolación Numérica**: Los precios y contadores crecen progresivamente en lugar de cambiar bruscamente.
*   **Shimmer Effects**: Sustitución de las barras de carga tradicionales por esqueletos de contenido animados.

---

## 🛠️ 5. Persistencia de Estado
Se utiliza el **`ReservationStateManager`** para asegurar que si un usuario rota su teléfono mientras elige un asiento o llena sus datos, la información no se pierda. La UI se reconstruye a partir de un Bundle serializado, manteniendo la integridad del flujo.

---

## 👑 6. Dashboard de Dueños (Fase 2 - Prioridad)
Módulo administrativo diseñado para la gestión de flotas a gran escala.

*   **OwnerHomeActivity**: Centralizador de métricas financieras y estados de vehículos.
*   **VehicleDetailActivity**: Ficha técnica detallada (SOAT, Kilometraje, Próximo Mantenimiento).
*   **DriverAssignmentDialog**: Interfaz para vincular conductores a vehículos de forma dinámica.

---
**Chop Code Solutions - Documentación de Ingeniería v1.3.0**

# 🎨 Inmersión Técnica: Capa de Interfaz de Usuario (UI) v1.9.9.5

Este documento detalla la arquitectura de las vistas en la App Android, explicando la transición desde el sistema de Views tradicional hacia el paradigma declarativo de Jetpack Compose.

---

## 🏛️ 1. Arquitectura de Vista (MVVM)
Ruta-Go sigue el patrón **Model-View-ViewModel**. La capa de UI es reactiva: observa cambios en el estado expuesto por los ViewModels y delega toda la lógica de negocio a las capas inferiores.

### 🚀 Transición a Jetpack Compose (Fase 4)
Estamos migrando gradualmente la interfaz para lograr una paridad de código con el Portal Web (React):
*   **Composables**: Las nuevas pantallas (ej. Puntos Go) se construyen mediante funciones de Compose, eliminando archivos XML redundantes.
*   **Atomic Design en Mobile**: Al igual que en la web, estamos organizando la UI en Atoms, Molecules y Organisms dentro del código de Compose.

---

## 📱 2. Componentes de Navegación
*   **`SplashActivity`**: Orquestador inicial con branding unificado y lógica de enrutamiento por rol.
*   **Dashboards Móviles**: Optimizados para la ergonomía del conductor y el pasajero, priorizando el acceso con el pulgar (Bottom Navigation).
*   **BottomNav**: Implementación del "Efecto Duolingo" para asegurar transiciones instantáneas entre el Home, Historial y Perfil.

---

## 🔄 3. Adaptadores y Listas (Legacy XML)
Para las pantallas que aún utilizan `RecyclerView`, implementamos lógica visual avanzada:
*   **`ScheduleAdapter`**: Resalta el próximo viaje disponible y gestiona la animación de salida del bus.
*   **`ChatAdapter`**: Burbujas de mensaje direccionales con soporte para estados de envío en tiempo real.

---

## ✨ 4. Experiencia de Usuario (UX) Premium
*   **Edge-to-Edge Nativo**: Las vistas ocupan el 100% de la pantalla. Usamos `WindowUtils` para gestionar dinámicamente los insets (barras de estado y navegación).
*   **Feedback Táctil**: Micro-interacciones de escala y vibración en botones críticos para una sensación de robustez.
*   **Shimmer Effects**: Marcadores de posición animados que reducen la carga cognitiva durante la sincronización con Firebase.

---

## 🛠️ 5. Gestión de Estado y Persistencia
Se utiliza el **`ReservationStateManager`** para proteger la integridad del flujo de compra. Los datos temporales de la reserva se mantienen seguros incluso ante rotaciones de pantalla o cambios de tema (Claro/Oscuro), evitando que el usuario pierda su progreso.

---

## 🚗 6. Ruta-Go In-Car (Android Auto)
Nueva iniciativa de la Fase 4 para llevar la interfaz de gestión al tablero del vehículo:
*   **Template-based UI**: Uso de los estándares de seguridad de Android Auto para mostrar horarios y aceptar reservas con distracciones mínimas.

---
**Chop Code Solutions - Mobile UI Engineering 2026**

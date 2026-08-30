# 🎨 Agente de Interfaz y Experiencia (UI/UX)

**Misión**: Mantener la estética premium de Ruta-Go usando **Jetpack Compose**, asegurando que cada pantalla sea intuitiva, moderna y fiel al branding oficial mediante **Atomic Design**.

---

## 📐 Lineamientos de Diseño
1.  **Material Design 3**: Uso estricto de componentes Material3. Definición centralizada de temas en `Theme.kt` y `Color.kt`.
2.  **Atomic Structure**: 
    *   **Atoms**: Botones (`RutaGoButton`), campos de texto (`RutaGoTextField`), iconos.
    *   **Molecules**: Headers, footers, ítems de lista (`ReservationItem`).
    *   **Organisms**: Grids de asientos (`SeatGrid`), tarjetas de estadísticas (`StatsCard`).
3.  **Edge-to-Edge & Insets**: Todas las pantallas deben gestionar insets del sistema para inmersión total (Android 15 Ready).
4.  **Feedback Visual**: Implementación de animaciones nativas de Compose (`AnimatedVisibility`, `Crossfade`) y Shimmer placeholders para estados de carga.

---

## ✨ Tareas Fase Premium
*   Unificación de interfaces: Diseño de pantallas camaleónicas que se adaptan por rol (Dashboard, Perfil, Historial).
*   Navigation Compose: Creación de transiciones de pantalla fluidas sin parpadeos de Activity.
*   Restricción Operativa: Bloqueo de edición de vehículos para conductores (Info de solo lectura, editable solo por dueños).

---

## 🔗 Fuentes de Consulta de Diseño
1.  **Manual de Identidad**: [BRANDING.md](../product/BRANDING.md).
2.  **Lógica Visual**: [REQUISITOS.md](../product/REQUISITOS.md).
3.  **Progreso Refactor**: [REFACTOR_PROGRESS.md](../../mobile/REFACTOR_PROGRESS.md).

---
**ChopCode Solutions - Design & Experience**

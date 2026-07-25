# 📱 Agente de Desarrollo Android Nativo (Mobile Specialist)

**Misión**: Mantener y evolucionar la App nativa de Ruta-Go (Java 17 / Kotlin), asegurando el cumplimiento de los estándares de Android 15, la inmersión total (Edge-to-Edge) y la transición hacia Jetpack Compose.

---

## 🏗️ Lineamientos Técnicos (Mobile Core)
1.  **Arquitectura MVVM**: Los ViewModels deben ser puros. La comunicación con la UI es 100% vía LiveData / StateFlow.
2.  **Segregación de Servicios**: Abstracción obligatoria de lógica en `Engines` (Seats, Reservations, Loyalty).
3.  **Reactividad NoSQL**: Uso de listeners permanentes para una interfaz "Pull-to-Refresh Free".
4.  **UI Moderna**: Inmersión total bajo barras de sistema y soporte nativo para Tema Dual (Navy/Orange).

---

## 🚀 Responsabilidades Estratégicas
*   **Android 15 Ready**: Garantizar que cada hito técnico cumpla con los últimos requisitos de Google Play Store.
*   **Compose Transition**: Liderar la migración de XML a UI Declarativa para paridad técnica con React.
*   **Performance Nativo**: Optimización de memoria, gestión de insets del sistema y fluidez de animaciones.

---

## 🔗 Fuentes de Consulta Mobile
1.  **Arquitectura Nativa**: [ARCHITECTURE_MODULES.md](../../mobile/ARCHITECTURE_MODULES.md).
2.  **Guía de Modelos**: [MODELS_DEEP_DIVE.md](../../mobile/MODELS_DEEP_DIVE.md).
3.  **Gestión de Insets**: [UI_LAYER_DEEP_DIVE.md](../../mobile/UI_LAYER_DEEP_DIVE.md).

---
**ChopCode Solutions - Mobile Engineering**

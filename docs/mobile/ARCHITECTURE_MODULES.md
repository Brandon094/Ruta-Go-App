# 📱 Arquitectura de la Aplicación Android - Ruta-Go v1.5.2

Este documento detalla la arquitectura de ingeniería de la App nativa de Ruta-Go (Sincronizada con Suite v1.9.9.9), diseñada bajo un paradigma **Reactivo, Transaccional y Multicapa (MVVM)**, optimizado para el ecosistema móvil y compatible con las últimas APIs de Google.

---

## 🏛️ 1. Estructura de Capas (MVVM)
La aplicación sigue una separación estricta de responsabilidades para garantizar la estabilidad en dispositivos con recursos limitados:

### 1.1 UI Layer (View)
*   **Tecnología**: XML (Material Design 3) con transición activa hacia **Jetpack Compose**.
*   **Responsabilidad**: Observar el estado expuesto por los ViewModels y reaccionar a la entrada del usuario.
*   **Inmersión**: Uso de `WindowUtils` para una experiencia Edge-to-Edge nativa (Android 15+).
*   **Navegación**: Soporte para **Predictive Back** (`enableOnBackInvokedCallback`).

### 1.2 Presentation Layer (ViewModel)
*   **Componentes**: Clases que heredan de `ViewModel` de Android.
*   **Estado**: Uso de `LiveData` y `StateFlow` para emitir cambios reactivos desde Firebase.
*   **Ciclo de Vida**: Gestión automática de suscripciones para evitar memory leaks.

### 1.3 Data Layer (Repository & Services)
*   **Firebase RTDB**: Sincronización bidireccional en tiempo real para asientos y chat.
*   **Services**: Abstracción de llamadas a la base de datos (ej. `ReservationService`).
*   **Managers**: Orquestadores de lógica pesada como el motor de notificaciones y la persistencia local.

---

## ⚙️ 2. Motores Especializados (Engines)
Lógica de negocio desacoplada del framework de Android:

*   **Seat Engine**: Algoritmo para el mapeo y validación de asientos en tiempo real.
*   **Reservation Engine**: Gestión de transacciones atómicas para asegurar la integridad de la compra.
*   **Loyalty Engine**: Sistema de cálculo y redención de Puntos Go.

---

## 🔐 3. Seguridad y Privacidad (Android 15)
*   **Aislamiento de Perfiles**: El app filtra los datos locales basándose en el rol (Pasajero o Conductor).
*   **Protección de Código**: Implementación de reglas de **ProGuard** para blindar la comunicación con Google Auth y FCM.
*   **Compliance**: Flujo integrado de "Derecho al Olvido" (Eliminación de cuenta) cumpliendo con las políticas de Google Play.

---

## 🚀 4. Evolución Técnica (Fase 4)
*   **Migration**: Reemplazo gradual de Fragments por componentes funcionales de Compose.
*   **Sync**: Mantenimiento de la estrategia "Mirror" para asegurar que la App y la Web compartan la misma lógica de negocio 1:1.

---
**ChopCode Solutions - Mobile Architecture 2026**

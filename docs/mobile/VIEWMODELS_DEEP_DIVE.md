# 📖 Inmersión Técnica: Gestión de Estado (ViewModels) v1.5.3

Este documento detalla la arquitectura de la capa de presentación del Ecosistema Go, basada en el patrón MVVM y la programación reactiva para Android.

---

## 🏛️ 1. Filosofía Arquitectónica
Los ViewModels en Ruta-Go actúan como el cerebro de cada pantalla, desacoplando la lógica de negocio de la interfaz de usuario. Siguen estos principios:

*   **Independencia de la Vista**: No poseen referencias a `Context`, `Views` o `Resources`. Esta pureza facilita la futura migración a **Jetpack Compose**.
*   **Comunicación Unidireccional**: Exponen estados mediante `LiveData` o `StateFlow` que las vistas observan pasivamente.
*   **Persistencia de Estado**: Sobreviven a cambios de configuración gracias a la arquitectura de componentes de Android.

---

## 🏗️ 2. BaseViewModel (El Estándar)
Todos los ViewModels heredan de `BaseViewModel`, que centraliza la comunicación base:
*   `loadingLiveData`: Control global de Shimmers y ProgressBars (Sincronizado con el estándar visual de la web).
*   `errorLiveData`: Canal único para notificaciones de fallo al usuario.
*   `registrarEventoAnalitico()`: Integración nativa con Firebase Analytics.

---

## 👨‍✈️ 3. ViewModels de Conductor (Operativos)
Diseñados para el control total en ruta:
*   **`DriverStatsViewModel`**: Implementa la **Inteligencia Analítica 360°**, cruzando reservas de la App con ventas físicas para reportar ingresos reales.
*   **`ManageSeatsViewModel`**: Gestiona el mapa de asientos interactivo con bloqueo atómico.

---

## 🚶 4. ViewModels de Pasajero (Experiencia)
Enfocados en la reactividad y la consistencia "Mirror":
*   **`ScheduleViewModel`**: Mantiene la planilla de horarios sincronizada globalmente. Implementa la lógica de "Próximo Viaje" (Badge SIGUIENTE).
*   **`CreateReservationViewModel`**: Orquesta el proceso de compra con validaciones de disponibilidad en milisegundos.

---

## 🔄 5. Ciclo de Vida y Limpieza
Para garantizar un rendimiento óptimo:
1.  **Suscripción**: Se activa al inicializar el ViewModel mediante inyección de dependencias o métodos `init`.
2.  **Reactividad**: Los listeners de Firebase se mantienen activos mientras la vista está en primer plano.
3.  **Liberación**: El método `onCleared()` es responsable de remover todos los `ValueEventListener` activos, evitando memory leaks.

---
**Chop Code Solutions - Mobile Engineering 2026**

# 📖 Inmersión Técnica: Gestión de Estado (ViewModels)

Este documento detalla la arquitectura de la capa de presentación del Ecosistema Go, basada en el patrón MVVM y la programación reactiva.

---

## 🏛️ 1. Filosofía Arquitectónica
Los ViewModels en Ruta-Go actúan como el cerebro de cada pantalla, desacoplando la lógica de negocio de la interfaz de usuario. Siguen estos principios:

*   **Independencia de la Vista**: No poseen referencias a `Context`, `Views` o `Resources` (para evitar memory leaks y facilitar pruebas unitarias).
*   **Comunicación Unidireccional**: Exponen estados mediante `LiveData` que las Actividades observan pasivamente.
*   **Persistencia de Estado**: Sobreviven a cambios de configuración (como rotación de pantalla) gracias a la librería `androidx.lifecycle`.

---

## 🏗️ 2. BaseViewModel (El Estandar)
Todos los ViewModels heredan de `BaseViewModel`, que centraliza:
*   `loadingLiveData`: Control global de Shimmers y ProgressBars.
*   `errorLiveData`: Canal único para notificaciones de fallo al usuario.
*   `registrarEventoAnalitico()`: Método protegido para telemetría automática.

---

## 👨‍✈️ 3. ViewModels de Conductor (Operativos)
Diseñados para la eficiencia y el control financiero:
*   **`DriverStatsViewModel`**: Cruza datos de reservas y disponibilidad técnica para mostrar ingresos reales y ocupación.
*   **`ManageSeatsViewModel`**: Diferencia entre ocupación por App y bloqueos físicos de terminal.
*   **`DriverRegistrationViewModel`**: Orquesta la creación multi-nodo (Usuarios, Conductores, Vehículos).

---

## 🚶 4. ViewModels de Pasajero (Experiencia)
Enfocados en la reactividad y la facilidad de uso:
*   **`ScheduleViewModel`**: Mantiene la planilla de horarios sincronizada globalmente sin necesidad de recargar.
*   **`CreateReservationViewModel`**: Gestiona el mapa interactivo de asientos con validaciones atómicas.
*   **`PassengerProfileViewModel`**: Calcula en caliente los "Puntos Go" y métricas de fidelización.

---

## 🔄 5. Ciclo de Vida y Limpieza
Para garantizar un rendimiento óptimo, especialmente en dispositivos de gama baja:
1.  **Suscripción**: Se activa en el `onCreate` de la vista o mediante un método `init()`.
2.  **Escucha**: Firebase Realtime Database empuja cambios solo cuando ocurren.
3.  **Liberación**: El método `onCleared()` de cada ViewModel es responsable de remover todos los `ValueEventListener` activos.

---
**Chop Code Solutions - Documentación de Ingeniería v1.3.0**

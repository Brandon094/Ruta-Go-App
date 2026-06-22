# 🗺️ Arquitectura Técnica Detallada - Ruta-Go v1.2.3 Stable

Este documento proporciona una visión profunda de la ingeniería detrás de Ruta-Go, diseñada bajo estándares de **Clean Architecture** y patrones reactivos para garantizar escalabilidad, mantenibilidad y robustez transaccional.

---

## 🏗️ 1. Patrón Arquitectónico: MVVM Reactivo
La plataforma implementa **Model-View-ViewModel** con un flujo de datos unidireccional y reactivo mediante `LiveData` y `Firebase Realtime Database`.

### Componentes de la Capa:
*   **View (Activities/Fragments)**: Suscriptores pasivos al estado del ViewModel. Implementan lógica de renderizado y captura de eventos de usuario.
*   **ViewModel**: El orquestador de estado. No posee referencias a la UI (Context/Views). Utiliza `MutableLiveData` para exponer estados y `BaseViewModel` para estandarizar el manejo de errores y analíticas.
*   **Engines (Business Logic)**: Capa de procesamiento puro. Realiza cálculos, validaciones masivas y preparación de datos (DTOs) antes de persistir o navegar.
*   **Services (Data Layer)**: Fachadas (Facades) para la comunicación con Firebase. Implementan el patrón Repository para abstraer el origen de los datos.
*   **Managers**: Auxiliares especializados divididos en **Core** (lógica no visual) y **UI** (lógica visual compleja).

---

## 📦 2. Módulos Críticos: Profundidad Técnica

### 2.1 Módulo de Identidad y Segregación (Auth Engine)
**Responsabilidad**: Garantizar la integridad de los roles y la seguridad de acceso.
*   **Lógica de Detección**: Implementa un algoritmo de búsqueda secuencial en paralelo. Al autenticar, `UserRoleService` dispara consultas a `/conductores/$uid` y `/usuarios/$uid`. El sistema prioriza el nodo de conductores para evitar conflictos de identidad.
*   **Blindaje**: Utiliza `AuthManager` como Singleton para centralizar el estado de la sesión.
*   **Manejo de Errores**: Captura de errores de red y tokens expirados en `GoogleLoginService`.

### 2.2 Motor de Selección de Asientos (Seat Engine)
**Responsabilidad**: Gestión atómica de inventario móvil.
*   **Clases Core**: `SeatManager` (UI) y `SeatDataProcessor` (Data).
*   **Protocolo Transaccional**: Utiliza `DatabaseReference.runTransaction()` en Firebase. Esto garantiza que el decremento de `asientosDisponibles` y la marca en `asientosOcupados` ocurra de forma atómica. Si dos usuarios intentan tomar el mismo asiento al mismo milisegundo, Firebase rechaza uno automáticamente.
*   **Sincronización de Capacidad**: El método `syncVehicleCapacityToSchedules` propaga cambios técnicos del bus a todos los horarios asignados al conductor de forma masiva.

### 2.3 Motor de Reservas (Reservation Engine)
**Responsabilidad**: Preparación y validación de transacciones financieras/logísticas.
*   **Flujo Preparatorio**: `ReservationDataProcessor` actúa como un convertidor de datos. Toma estados de la UI, información del conductor y del usuario, y construye un `Intent` complejo enriquecido con extras para la actividad de confirmación.
*   **Validación de Requisitos**: Implementa un motor de reglas interno que impide avanzar si:
    1. No hay ruta seleccionada.
    2. El asiento no está marcado localmente.
    3. Los datos del conductor no han terminado de cargar (Sync Check).

### 2.4 Módulo de Integridad (Sanity Check)
**Responsabilidad**: Autolimpieza y normalización de la planilla de horarios.
*   **Lógica de Filtrado**: Al cargar horarios, `ScheduleService` cruza el `conductorId` contra la lista activa de conductores.
*   **Mitigación de Datos Huérfanos**: Si un administrador borra un conductor de Firebase, este módulo detecta que el ID en el horario ya no existe y lo "libera" visualmente marcándolo como **"(Libre)"**, evitando crashes por punteros nulos en el perfil del chofer.

### 2.5 Motor de Fidelización (Loyalty Engine - Fase 3)
**Responsabilidad**: Gestión de incentivos y estatus de usuario.
*   **Lógica**: Algoritmos de cálculo de puntos basados en el valor de la reserva y multiplicadores por nivel de estatus (Plata, Oro, Diamante).
*   **Integración**: Disparadores post-confirmación que actualizan el nodo `/usuarios/$uid/puntosGo`.

---

## 📊 3. Flujo de Datos (Data Flow Pipeline)

### Caso: Reserva de Pasajero
1.  **Trigger**: Usuario toca un asiento verde.
2.  **UI Level**: `SeatManager` captura el ID, dispara animación de selección y notifica al `CreateReservationViewModel`.
3.  **Validation**: El ViewModel consulta al `SeatDataProcessor` para validar disponibilidad en el servidor (Atomic Check).
4.  **Preparation**: `ReservationDataProcessor` empaqueta los datos.
5.  **Confirmation**: `ReservationService` ejecuta la escritura en `/reservas/` y actualiza la ocupación.
6.  **Notification**: Se dispara un trigger hacia el `NotificationManager` para enviar un Push V1 al conductor asignado.

---

## 🛡️ 4. Estándares de QA y Estabilidad (Senior Checklist)

### 4.1 Manejo de Nulos y Estados
*   **Shimmer Consistency**: El estado `isLoading` se controla estrictamente desde el ViewModel. El Shimmer solo se detiene cuando la respuesta de Firebase (éxito o error) es recibida.
*   **Safe Parsing**: Uso de `getStringSafely()` y conversiones de tipo robustas para evitar el error `ClassCastException` común al leer datos NoSQL dinámicos.

### 4.2 Optimización de Recursos
*   **Listener Lifecycle**: Todos los `ValueEventListener` se remueven en el método `onCleared()` del ViewModel o `onStop()` de la Activity para prevenir fugas de memoria (Memory Leaks).
*   **Disk Cache**: Implementación de Glide con `DiskCacheStrategy.ALL` para fotos de perfil y activos pesados.

---

## 📂 5. Jerarquía de Paquetes (Organización Industrial)

```plaintext
com.chopcode.rutago.app/
├── activities/     # Controladores de vista segmentados por Rol.
├── adapters/       # Adaptadores estandarizados en inglés por módulo.
├── engines/        # Lógica de negocio pesada (Seats, Reservations).
├── managers/
│   ├── core/       # Sistema: Auth, Analytics, Notif, Settings.
│   └── ui/         # Interfaz: Tutorials, Dashboard, Flows.
├── models/         # POJOs con anotaciones @PropertyName (Mapeo Dual).
├── services/       # Repositorios Firebase agrupados por dominio.
├── utils/          # Herramientas globales (Format, Network, UIAnim).
└── viewmodels/     # Gestión de estado reactiva por pantalla.
```

---
**Documentación de Ingeniería - Chop Code Solutions - QA Senior Certified**

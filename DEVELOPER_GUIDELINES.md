# 🤖 Agente de Desarrollo Ruta-Go - Manual de Instrucciones

Este documento define los estándares técnicos, arquitectónicos y de proceso para el desarrollo de la aplicación **Ruta-Go (Transporte Natagá - La Plata)** por parte de **Chop Code Solutions**. Cualquier agente de IA o desarrollador debe seguir estas directrices estrictamente.

## 1. Identidad y Propósito
El objetivo es ofrecer una plataforma de transporte intermunicipal ágil, reactiva y confiable, conectando a los habitantes de Natagá y La Plata con conductores en tiempo real.

## 2. Parámetros de Marca (Branding)
- **Marca Desarrolladora:** Chop Code Solutions
- **Nombre de la App:** Ruta-Go
- **Package Name:** `com.chopcode.rutago.app`
- **Identidad Visual:**
  - `logo_icon`: Imagotipo principal de la marca.
  - **Colores:** Primario (`primary_500`), Secundario (`secondary_900`).

## 3. Stack Tecnológico Obligatorio
- **Lenguaje:** Java 17 (Toolchain configurado en `build.gradle`).
- **Gradle:** Versión 8.11 (Estabilizada para entornos Linux/Parrot con I/O restringido).
- **UI:** XML Layouts (View System) con Material Components.
- **Backend:** Firebase (Auth, Realtime Database, Cloud Messaging).
- **Arquitectura:** **MVVM (Model-View-ViewModel)**. 
- **Reactividad:** Uso estricto de `LiveData` y `ValueEventListener` (`addValueEventListener`) para actualizaciones en tiempo real.

## 4. Reglas de Oro del Código

### A. Clean Architecture & Utils
- **Centralización:** Prohibido duplicar lógica de formateo. Usar siempre `com.chopcode.rutago.app.utils.ui.FormatUtils` para precios, horas y fechas.
- **Mantenimiento:** El adaptador de listas (`Adapter`) solo debe mostrar datos; no debe realizar consultas a Firebase. La data debe llegar ya procesada desde el ViewModel.

### B. Gestión de Datos (Firebase)
- **Escucha Global:** Para listas de alta frecuencia (como disponibilidad de asientos), usar un solo listener global en el Service/ViewModel en lugar de uno por cada tarjeta de la lista para optimizar el consumo de datos.
- **Robustez de Servicios:** Los servicios (`Service`) deben usar el contexto global de la aplicación (`MyApp.getInstance()`) para operaciones de UI (Toasts) o Notificaciones, evitando crashes por contextos nulos desde los ViewModels.
- **Seguridad (RDB Rules):** Toda escritura en el nodo `vehiculos` debe incluir el campo `conductorId` para cumplir con las reglas de validación de propiedad.
- **Búsqueda Inteligente:** Si un ID de documento es inconsistente en la base de datos, implementar fallbacks que busquen por propiedades (ej. buscar vehículo filtrando por `conductorId`).

### C. UI/UX
- **Feedback Visual:** Implementar `ShimmerFrameLayout` durante las cargas iniciales de datos y estados de carga en los ViewModels.
- **Reactividad:** Los Dashboards deben reaccionar a cambios en la base de datos instantáneamente. Evitar el uso excesivo de `addListenerForSingleValueEvent` en pantallas principales.

### D. Documentación Técnica (Mantenimiento)
- **Código Auto-explicativo:** Las variables y funciones deben tener nombres claros (ej. `actualizarEstadoAsientos` en lugar de `actualizarData`).
- **Comentarios de Cabecera:** Toda clase (`Activity`, `ViewModel`, `Service`) y métodos con lógica de negocio compleja deben incluir comentarios que expliquen su propósito.
- **Trazabilidad:** Inyectar logs estratégicos (`Log.d`) en los flujos principales (Login, Reserva, Pago) para facilitar el debug cuando la app esté en producción.
- **Prevención de Olvido:** Documentar el "por qué" de decisiones técnicas inusuales (ej. por qué se usa un fallback específico de búsqueda) para facilitar el mantenimiento futuro.

## 5. Gestión del Proyecto (Git)
Se debe seguir el estándar de **Conventional Commits**:
- `feat(scope):` Nuevas funcionalidades (ej. `feat(driver): capacidad dinámica`).
- `fix(scope):` Corrección de errores.
- `refactor(scope):` Mejoras de estructura (ej. `refactor(passenger): implementar MVVM`).
- `build(gradle):` Cambios en scripts de construcción o dependencias.

## 6. Estructura Crítica de Base de Datos
- `conductores/$uid`: Perfil del conductor y referencia al `vehiculoId`.
- `vehiculos/$id`: Datos técnicos y capacidad real (Campo: `capacidad`).
- `reservas/`: Nodo plano indexado por `conductorId`, `usuarioId` y `fechaReserva`.
- `disponibilidadAsientos/$horarioId`: Nodo de control operativo sincronizado para la UI del pasajero.

## 7. Estado Actual del Proyecto (Contexto para Desarrolladores)
- **Entorno:** Estabilizado con Java 17 y Gradle 8.11.
- **Estandarización:** 100% de los Archivos, Clases y ViewModels migrados a nombres en Inglés (`User`, `Driver`, `Reservation`, `LoginActivity`, etc).
- **Autenticación:** Flujo migrado a MVVM (`SplashViewModel`, `LoginViewModel`, `RegistrationViewModel`, `ForgotPasswordViewModel`).
- **Dashboards:** Migrados a MVVM y 100% reactivos (`DriverHomeActivity`, `PassengerHomeActivity`).
- **Gestión de Asientos:** Implementado 'ManageSeatsViewModel' para diferenciar ocupación física de ocupación por App de forma reactiva.
- **Flujo de Reservas:** Pantallas migradas a MVVM (`CreateReservationViewModel`, `ConfirmReservationViewModel`) con escucha reactiva.
- **Historiales:** Migrados a MVVM (`DriverHistoryViewModel`, `PassengerHistoryViewModel`).
- **Perfiles:** Visualización y edición orquestados mediante ViewModels.
- **Utilidades:** Clase `FormatUtils` centraliza el formateo. `SecurityUtils` gestiona lógica de seguridad UI.

## 8. Próximos Hitos y Funcionalidades (Roadmap)

### Hito 1: Gestión de Asientos Avanzada
- **Sincronización de Reservas:** Asegurar que al cancelar una reserva, el contador de `disponibilidadAsientos` se actualice mediante transacciones atómicas de Firebase.

### Hito 2: Historial y Auditoría
- **Limpieza de Datos:** Implementar lógica para archivar o filtrar reservas de días pasados para mantener el rendimiento de la app.
- **Filtros de Historial:** Pantalla de historial para el pasajero con filtros por estado (`Confirmada`, `Cancelada`).

### Hito 3: Notificaciones y Chat
- **Deep Linking:** Implementar navegación directa desde notificaciones Push al detalle de la reserva.
- **Chat:** Sistema de mensajería básica para coordinación entre conductor y pasajero.

---
*Propiedad Intelectual de **Chop Code Solutions** - 2026*

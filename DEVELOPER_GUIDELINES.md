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
- **Centralización:** Prohibido duplicar lógica de formateo o manipulación de strings. Usar siempre `com.chopcode.rutago.app.utils.ui.FormatUtils` para precios, horas, fechas y normalización de texto (ej. quitar tildes para comparaciones).
- **Mantenimiento:** El adaptador de listas (`Adapter`) solo debe mostrar datos; no debe realizar consultas a Firebase. La data debe llegar ya procesada desde el ViewModel.

### B. Gestión de Datos (Firebase)
- **Modelos Bilingües:** Los modelos deben usar `@PropertyName` para garantizar compatibilidad entre los datos históricos (Español) y el nuevo estándar del código (Inglés).
- **Escucha Global:** Para listas de alta frecuencia, usar un solo listener global en el Service/ViewModel para optimizar el consumo de datos.
- **Robustez de Servicios:** Los servicios (`Service`) deben usar el contexto global de la aplicación (`MyApp.getInstance()`) para operaciones de UI, evitando crashes.
- **Seguridad:** Toda escritura debe cumplir con las reglas de validación de Firebase (ej. incluir `conductorId` en vehículos).

### C. UI/UX
- **Feedback Visual:** Implementar `ShimmerFrameLayout` durante las cargas iniciales y estados de carga en los ViewModels.
- **Reactividad:** Los Dashboards deben reaccionar a cambios en la base de datos instantáneamente. Evitar `addListenerForSingleValueEvent` en pantallas principales.

### D. Documentación Técnica (Mantenimiento)
- **Código Auto-explicativo:** Variables y funciones con nombres claros en inglés.
- **Comentarios de Cabecera:** Toda clase y método complejo debe incluir comentarios explicando su propósito.
- **Trazabilidad:** Inyectar logs estratégicos (`Log.d`) en flujos principales para facilitar el debug en producción.

## 5. Gestión del Proyecto (Git)
Se debe seguir el estándar de **Conventional Commits** y los mensajes deben estar en **Español** para facilitar la comprensión del dueño del proyecto.

## 6. Estructura Crítica de Base de Datos
- `conductores/$uid`: Perfil del conductor, referencia al `vehiculoId` y `horariosAsignados`.
- `vehiculos/$id`: Datos técnicos y capacidad (Campo: `capacidad`).
- `reservas/`: Nodo plano indexado por `conductorId`, `usuarioId` y `fechaReserva`. Soporta llaves en ES/EN.
- `disponibilidadAsientos/$horarioId`: Control operativo sincronizado.

## 7. Estado Actual del Proyecto (Contexto para Desarrolladores)
- **Arquitectura:** 100% migrado a MVVM y LiveData.
- **Estandarización:** Código fuente 100% en Inglés. Modelos con soporte dual (ES/EN) para base de datos.
- **Dashboards:** Reactivos para Conductor y Pasajero.
- **Estadísticas:** Cálculo dinámico en ViewModels con normalización de rutas (ignora tildes/mayúsculas).
- **Utilidades:** `FormatUtils` centraliza formateo y normalización. `SecurityUtils` gestiona seguridad UI.

## 8. Próximos Hitos (Roadmap)
- **Hito 1:** Sincronización atómica de asientos (Transactions).
- **Hito 2:** Auditoría y archivado de reservas antiguas.
- **Hito 3:** Notificaciones Push con Deep Linking y Chat.

---
*Propiedad Intelectual de **Chop Code Solutions** - 2026*

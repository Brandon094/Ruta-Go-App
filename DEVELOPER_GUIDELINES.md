# 🤖 Agente de Desarrollo Ruta-Go - Manual de Instrucciones

Este documento define los estándares técnicos, arquitectónicos y de proceso para el desarrollo de la aplicación **Ruta-Go (Transporte Natagá - La Plata)** por parte de **Chop Code Solutions**. Cualquier agente de IA o desarrollador debe seguir estas directrices estrictamente.

## 1. Identidad y Propósito
El objetivo es ofrecer una plataforma de transporte intermunicipal ágil, reactiva y confiable, conectando a los habitantes de Natagá y La Plata con conductores en tiempo real.

## 2. Parámetros de Marca (Branding)
- **Marca Desarrolladora:** Chop Code Solutions
- **Nombre de la App:** Ruta-Go
- **Package Name:** `com.chopcode.rutago.app`
- **Identidad Visual:**
  - `logo_icon`: Imagotipo principal de la marca (Premium).
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
- **Recursos:** El 100% de los textos deben estar en `strings.xml` organizados por pantalla/módulo.

### B. Gestión de Datos (Firebase)
- **Modelos Bilingües:** Los modelos usan "Mapeo Dual" con `@PropertyName` y campos privados para garantizar compatibilidad entre datos históricos (Español) y el nuevo estándar del código (Inglés).
- **Escucha Global:** Para listas de alta frecuencia, usar un solo listener global en el Service/ViewModel para optimizar el consumo de datos.
- **Robustez de Servicios:** Los servicios (`Service`) deben usar el contexto global de la aplicación (`MyApp.getInstance()`) para operaciones de UI, evitando crashes.
- **Seguridad:** Toda escritura debe cumplir con las reglas de validación de Firebase (ej. incluir `driverId` en vehículos y cumplir con campos obligatorios).

### C. UI/UX
- **Feedback Visual:** Implementar `ShimmerFrameLayout` durante las cargas iniciales y estados de carga en los ViewModels.
- **Reactividad:** Los Dashboards deben reaccionar a cambios en la base de datos instantáneamente. Evitar `addListenerForSingleValueEvent` en pantallas principales.
- **Notificaciones:** Seguir el estándar Premium unificado en `NotificationService` con identidad visual oficial.

### D. Documentación Técnica (Mantenimiento)
- **Código Auto-explicativo:** Variables y funciones con nombres claros en inglés.
- **Documentación de Negocio:** Toda clase crítica (ViewModels, Services) debe incluir Javadoc explicando la lógica de negocio y decisiones arquitectónicas (ej. por qué se usa Sync Atómico).
- **Trazabilidad:** Inyectar logs estratégicos (`Log.d`) en flujos principales para facilitar el debug en producción.

### E. Gestión de Lanzamientos (Play Store)
- **Keystore Oficial:** El archivo de firma de producción (`key.jks`) reside exclusivamente en el entorno estabilizado (Linux/Parrot). **Prohibido borrar o mover sin backup externo.**
- **Versionamiento:** Seguir el estándar `versionCode` incremental (entero) y `versionName` semántico (ej. 1.2.0).
- **Huellas Digitales:** En caso de migración de entorno, se debe generar el certificado `.pem` y solicitar el restablecimiento de la "Clave de Carga" en la Play Console (proceso de 48 horas).
- **Consistencia SHA:** Las huellas SHA-1 de Google Play (App Signing) deben estar siempre vinculadas en Firebase Console para que Google Auth funcione en la versión de la tienda.

## 5. Gestión del Proyecto (Git)
Se debe seguir el estándar de **Conventional Commits** y los mensajes deben estar en **Español** para facilitar la comprensión del dueño del proyecto.

## 6. Estructura Crítica de Base de Datos
- `conductores/$uid`: Perfil del conductor, referencia al `vehiculoId` y `horariosAsignados`.
- `vehiculos/$id`: Datos técnicos y capacidad dinámica (Campo: `capacidad`).
- `reservas/`: Nodo plano indexado por `driverId`, `userId` y `reservationDate`.
- `reservas_archivadas/`: Nodo histórico para auditoría y rendimiento.
- `chats/`: Mensajería en tiempo real vinculada al `reservationId`.
- `disponibilidadAsientos/$horarioId`: Control operativo sincronizado. Campos: `asientosDisponibles`, `totalAsientos`, `asientosOcupados`.

## 7. Estado Actual del Proyecto (Contexto para Desarrolladores)
- **Arquitectura:** 100% migrado a MVVM y LiveData. Dashboards y historiales 100% reactivos.
- **Estandarización:** Código fuente y llaves de Firebase 100% en Inglés. Soporte bilingüe blindado en modelos.
- **Módulo de Autenticación:** Refactorizado. El antiguo `LoginService` se dividió en `EmailLoginService`, `GoogleLoginService` y `UserRoleService` para mayor granularidad y mantenimiento.
- **Mensajería:** Implementación del **Chat en Tiempo Real** (Bidireccional) para reservas confirmadas. Incluye notificaciones Push mediante `NotificationManager`. *Estado: Funcional con necesidad de optimización en Deep Linking.*
- **Atomicidad:** Implementado el uso de `runTransaction` para la reserva y liberación de asientos.
- **Rendimiento:** Implementado `ArchiveService` para limpieza automática de reservas antiguas y límites de carga inteligentes en UI (50 registros).
- **Tiquete Digital:** Implementada visualización de comprobante de viaje detallado con acceso directo al chat integrado.

## 8. Siguientes Pasos (Roadmap Actualizado)
- **Hito 1 (Pendiente):** Optimizar Deep Linking para asegurar navegación directa al chat desde cualquier estado de la app.
- **Hito 2:** Implementar sistema de pagos integrados (Pasarela de pagos).
- **Hito 3:** Panel de analíticas avanzadas para el dueño del proyecto.

---
*Propiedad Intelectual de **Chop Code Solutions** - 2026*

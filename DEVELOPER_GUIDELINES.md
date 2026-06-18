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
- **Compartición Segura:** El uso de `FileProvider` es obligatorio para compartir activos generados (como el tiquete digital) garantizando compatibilidad con Android 7.0+.

### D. Documentación Técnica (Mantenimiento)
- **Código Auto-explicativo:** Variables y funciones con nombres claros en inglés.
- **Documentación de Negocio:** Toda clase crítica (ViewModels, Services) debe incluir Javadoc explicando la lógica de negocio y decisiones arquitectónicas (ej. por qué se usa Sync Atómico).
- **Trazabilidad:** Inyectar logs estratégicos (`Log.d`) en flujos principales para facilitar el debug en producción.

### E. Gestión de Lanzamientos (Play Store)
- **Keystore Oficial:** El archivo de firma de producción (`key.jks`) reside exclusivamente en el entorno estabilizado (Linux/Parrot). **Prohibido borrar o mover sin backup externo.**
- **Versionamiento:** Seguir el estándar `versionCode` incremental (entero) y `versionName` semántico (ej. 1.2.0).
- **Huellas Digitales:** En caso de migración de entorno, se debe generar el certificado `.pem` y solicitar el restablecimiento de la "Clave de Carga" en la Play Console (proceso de 48 horas).
- **Integridad del Tiempo:** Prohibido recalcular horas de salida en la UI basándose en estimaciones. La `departureTime` (Hora de Salida) debe persistirse atómicamente en la reserva al momento de la creación para evitar errores de zona horaria o formato AM/PM.
- **Tarifas Dinámicas:** Prohibido hardcodear precios en el código. Se debe usar `PriceService` para consultar el nodo `precios/` en Firebase. Las llaves de origen y destino deben estar normalizadas (minúsculas y sin tildes).

## 5. Gestión del Proyecto (Git)
Se debe seguir el estándar de **Conventional Commits** y los mensajes deben estar en **Español** para facilitar la comprensión del dueño del proyecto.

## 6. Estructura Crítica de Base de Datos
- `conductores/$uid`: Perfil del conductor, referencia al `vehiculoId` y `horariosAsignados`.
- `vehiculos/$id`: Datos técnicos y capacidad dinámica (Campo: `capacidad`).
- `precios/$origen/$destino`: Nodo de tarifas dinámicas. Permite escalabilidad sin actualizar la App.
- `reservas/`: Nodo plano indexado por `driverId`, `userId` y `reservationDate`. Incluye campos `departureTime` y `rated` para consistencia operativa.
- `reservas_archivadas/`: Nodo histórico para auditoría y rendimiento.
- `chats/`: Mensajería en tiempo real vinculada al `reservationId`.
- `disponibilidadAsientos/$horarioId`: Control operativo sincronizado. Campos: `asientosDisponibles`, `totalAsientos`, `asientosOcupados`.

## 7. Estado Actual del Proyecto (v1.2.0 Stable)
- **Arquitectura:** 100% migrado a MVVM y LiveData. Dashboards y historiales 100% reactivos.
- **Estandarización:** Código fuente y llaves de Firebase 100% en Inglés. Soporte bilingüe blindado en modelos.
- **Módulo de Autenticación:** Refactorizado. El antiguo `LoginService` se dividió en `EmailLoginService`, `GoogleLoginService` y `UserRoleService` para mayor granularidad y mantenimiento.
- **Tarifas Dinámicas:** Implementado `PriceService`. Los precios ahora se gestionan centralizadamente desde la base de datos, soportando cambios en tiempo real sin despliegues.
- **Mensajería:** Implementación del **Chat en Tiempo Real** (Bidireccional) para reservas confirmadas. Incluye notificaciones Push mediante `NotificationManager`.
- **Atomicidad:** Implementado el uso de `runTransaction` para la reserva y liberación de asientos.
- **Rendimiento:** Implementado `ArchiveService` para limpieza automática de reservas antiguas y límites de carga inteligentes en UI (50 registros).
- **Tiquete Digital:** Implementada visualización de comprobante de viaje detallado con acceso directo al chat integrado y funcionalidad de **Compartir como Imagen (PNG)**.
- **Estabilidad de Datos:** Corregido bug de formato AM/PM mediante la normalización en `FormatUtils` y la persistencia de `departureTime`. Sistema de calificaciones estabilizado con refresco inmediato de UI.
- **UX Optimizada:** Navegación en historial centralizada en botones para evitar interacciones accidentales con la tarjeta completa.

## 8. Siguientes Pasos (Roadmap Actualizado)
- **Hito 1 (DONE):** Optimizar Deep Linking para asegurar navegación directa al chat desde cualquier estado de la app.
- **Hito 2:** Implementar sistema de pagos integrados (Pasarela de pagos).
- **Hito 3:** Panel de analíticas avanzadas para el dueño del proyecto.

---
*Propiedad Intelectual de **Chop Code Solutions** - 2026*

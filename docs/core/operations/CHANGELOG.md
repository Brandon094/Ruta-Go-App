# 📜 Historial de Cambios (Changelog) - Ruta-Go

Todos los cambios notables en este proyecto serán documentados en este archivo siguiendo el estándar [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [2.0.1-BETA] - 2026-08-31 (Dynamic Routes & Schedule Management Engine)
*Integración dinámica de rutas, autocompletado de tarifas, desacoplamiento de asignación de flota y optimización de reactividad NoSQL v2.0.*

### 🔧 Go-Core (Cloud Functions v2.2.0)
- **Aislamiento de Escalafón Nátaga ➔ La Plata (`index.js`)**: Refactorizada la función automatizada de rotación nocturna de las 7:00 PM (`automatedRotation`) para focalizarse exclusivamente en las salidas de Nátaga ➔ La Plata. Se implementó la preservación de conductores, buses y reseteo diario de cupos (13 libres) para todas las rutas dinámicas adicionales (`Neiva`, `Gallego`, etc.).

### 🌐 Ruta-Go Web (Portal v2.0)
- **Refactorización Integral del Panel y Funciones del Conductor (`DriverOverview.jsx`, `PendingReservationCard.jsx` & `ReservationHistoryCard.jsx`)**:
  - Corregida la filtración en el Dashboard del Conductor para consumir el atributo `driverId` y el estado `status: "pending"` del esquema NoSQL v2.0, desplegando inmediatamente las solicitudes de reserva entrantes con datos de pasajero (`passengerName`, `passengerPhone`, `origin ➔ destination`, `departureTime`, `seat`).
  - Corregido el mapeo de historial operativo (`HistoryDirectory.jsx` & `ReservationHistoryCard.jsx`) para clasificar correctamente el estado `status: "confirmed"` mostrando la etiqueta verde **"Confirmada"**, precio formateado, ruta y número de asiento.
  - Diseñada la silueta física interactiva de la camioneta/minibus (`SeatManagementModal.jsx`) con chasis metálico, parabrisas azul con luces frontales, retrovisores, 4 llantas laterales y distribución real de 13 asientos (Cabina 1-2 + 3-5, Filas intermedias con pasillo y Banca Trasera 10-13).
- **Configuración Canónica de Conductores por Ruta (`AddDriverModal.jsx` & `EditDriverModal.jsx`)**:
  - Implementada la selección de horarios en 2 pasos: filtrado previo por Ruta (`Nátaga ➔ La Plata`, `Neiva`, `Gallego`) e indexación dinámica por horas reales NoSQL v2.0 (`-P0Pw0...`).
  - Mapeo canónico exacto para los 9 turnos de Nátaga incluyendo la pernocta del **Turno 8 (Triple Especial: `03:30 PM ➔ 06:00 PM + 07:30 AM`)**, el **Turno 5 (Fijo/Dedicado: `10:00 AM ➔ 02:00 PM`)** que no rota, y la opción de **Descanso**.
- **Rediseño Atómico de la Landing Page (`LandingSchedules.jsx`)**:
  - Reemplazada la grilla vertical continua por una barra de pestañas/chips interactiva para selección de ruta (`Nátaga ➔ La Plata`, `Nátaga ➔ Neiva`, `Todas las Rutas`).
  - Rediseñadas las tarjetas de horario en una cuadrícula atómica de 3 columnas reutilizando los componentes `<Button/>`, `<Badge/>` y `FormatUtils.formatPrice()`, reduciendo la longitud vertical en un 70%.
- **Refactor de Permisos y Acciones en Planilla (`ScheduleDirectory.jsx`)**:
  - Restringidos los botones de gestión/edición en la pestaña **Planilla** exclusivamente para el **Admin Root** (`role: "admin"`).
  - Los **Socios (`role: "owner"`)** cuentan con una vista puramente informativa de auditoría en Planilla (Hora, Conductor, Bus, Cupos, Precio y Estado) sin posibilidad de ingresar a realizar reservas de pasajeros desde dicha interfaz.
- **Sincronización NoSQL de Conductores y Escalafón (`DriverCard.jsx`, `DriverDirectory.jsx`, `EditDriverModal.jsx` & `driverService.js`)**:
  - Corregido el mapeo de propiedades en `DriverCard.jsx` y `DriverDirectory.jsx` para soportar las llaves del esquema NoSQL v2.0 (`name`, `vehiclePlate`, `vehicleId`, `assignedSchedules`, `phone`) con soporte pasivo a campos legados.
  - Los conductores registrados que no tienen turnos aún asignados se agrupan en **"Registrados / Sin Turno"** mostrando su nombre completo ("Liye Daza"), correo, teléfono y bus vinculado ("TBO550").
  - Actualizado `driverService.js` para sincronizar atómicamente la asignación de turnos e itinerarios en `/users/${driverId}`, `/vehicles/${plate}` y `/schedules/${scheduleId}`.
- **Vinculación de Flota, Socios y Conductores (`VehicleModal.jsx`, `VehicleCard.jsx` & `vehicleService.js`)**:
  - Actualizado el modal de vehículos para permitir la selección interactiva de **Socio / Dueño de Flota** (`ownerId`) y **Conductor Asignado** (`driverId`).
  - Implementada sincronización bidireccional en `vehicleService.js`: al asignar un vehículo a un conductor, actualiza automáticamente los atributos `vehicleId` y `vehiclePlate` en `/users/${driverId}`.
  - Actualizada la tarjeta de vehículo (`VehicleCard.jsx`) para desplegar la información del Socio y Conductor vinculados.
- **Ascenso Directo de Socios por Correo y Selección (`AddOwnerModal.jsx`, `Input.jsx` & `ownerService.js`)**:
  - Creado el modal de promoción de socios con super-poderes de Admin Root, permitiendo ascender a cualquier usuario registrado al rol de Socio (`role: "owner"`) ingresando su correo electrónico o seleccionándolo directamente desde un menú desplegable de usuarios registrados.
  - Actualizado el átomo `<Input />` para propagar el atributo `list` (`<datalist>`) y propiedades adicionales hacia el elemento `<input>` nativo.
- **Edición y Eliminación de Horarios (`EditScheduleModal.jsx` & `scheduleService.js`)**: Creado el modal de edición e integrados botones de gestión rápida (`Pencil`) en las tarjetas de horario de la Planilla para permitir al Admin Root modificar la hora de salida, tarifa, duración, ruta, asignación de conductor o vehículo, o eliminar el horario.
- **Selector Dinámico de Origen y Destino en Home (`PassengerOverview.jsx`)**: Agregado un selector dinámico con desplegables de Origen y Destino y chips de cambio rápido (`Nátaga ➔ La Plata`, `Nátaga ➔ Neiva`, `La Plata ➔ Nátaga`, `Neiva ➔ Nátaga`, "Todas las Rutas") para filtrar cualquier itinerario disponible en la base de datos.
- **Visualización Dinámica de Rutas en Landing (`LandingSchedules.jsx`)**: Agrupamiento en tiempo real de todas las rutas de la base de datos, desplegando los horarios disponibles para cualquier trayecto.
- **Registro de Socios con Google (`Register.jsx`)**: Agregado el botón de autenticación social con Google en la pantalla de registro de flota, permitiendo crear cuentas de socio (`role: "owner"`) de forma instantánea mediante Google Popup.
- **Motor de Rutas Dinámicas (`PricingDirectory.jsx`)**: Eliminada la deduplicación alfabética de pares origen/destino que invertía los nombres de las ciudades. Ahora el portal muestra todas las rutas registradas en su orientación explícita (ej: `Nátaga ➔ La Plata`, `Nátaga ➔ Neiva`, `La Plata ➔ Nátaga`, `Neiva ➔ Nátaga`).
- **Navegación Dinámica en Planilla (`ScheduleDirectory.jsx`)**: Reemplazadas las pestañas estáticas de 2 direcciones por un orquestador dinámico que detecta automáticamente todas las rutas presentes en los horarios registrados y genera botones de filtro para cada trayecto, incluyendo una vista global ("Todas").
- **Creación Flexible de Horarios (`AddScheduleModal.jsx` & `scheduleService.js`)**:
  - Habilitada la programación de turnos de salida sin requerir asignación previa de conductor ni vehículo.
  - Corregido error `PERMISSION_DENIED` al separar las escrituras atómicas del esquema principal v2.0 (`/schedules/` y `/seatAvailability/`) de las escrituras en nodos legados (`/horarios/` y `/disponibilidadAsientos/`).
- **Optimización de Subscripciones Reactivas (`useRealtimeData.js`)**: Eliminado el anidamiento de listeners `onValue`, convirtiendo las suscripciones de `/users/`, `/vehicles/`, `/reservations/`, `/schedules/`, `/seatAvailability/`, `/prices/` y `/routes/` en suscriptores independientes de nivel superior para evitar fugas de memoria y bloqueos de callback.

### 📱 Ruta-Go Mobile (Kotlin/Compose)
- **Sincronización de Servicios de Tarifas (`PriceService.kt`)**: Actualizado `PriceService` para consultar directamente el nodo v2.0 `/prices/` con fallback pasivo a `/precios/`, implementando búsquedas normalizadas sin distinción de mayúsculas, minúsculas o tildes.
- **Visualización de Horarios e Itinerarios (`ScheduleService.kt` & `ScheduleCard.jsx`)**:
  - Actualizado `ScheduleService.kt` para integrar la búsqueda insensible a mayúsculas/tildes en el mapa de precios.
  - Actualizada `ScheduleCard.jsx` para soportar adecuadamente los campos en camelCase (`time`, `route`, `driverId`, `vehicleId`, `price`) y mostrar el estado "Sin Conductor Asignado" cuando el Admin crea turnos preliminares.

---

## [2.0.0-BETA] - 2026-08-31 (Full Navigation, Auth & Database Normalization)
*Corrección de los flujos principales de reserva, autenticación social, persistencia de sesión y normalización NoSQL en Jetpack Compose.*

### 📱 Ruta-Go Mobile (Kotlin/Compose)
- **Normalización de Base de Datos NoSQL**: Refactorización de todos los modelos de datos (`Reservation`, `User`, `Driver`, `Vehicle`, `Schedule`, `Rating`) mediante **Deserialización Pasiva**. Se eliminaron los getters legados en español para garantizar que todas las escrituras a Firebase se hagan 100% en **Inglés (camelCase)** sin duplicación de llaves, manteniendo setters pasivos para leer registros antiguos.
- **Unificación de Consultas de Perfil**: Actualizado `UserProfileViewModel.kt`, `AuthRepositoryImpl.kt` y `UserService.kt` para consultar directamente la colección unificada `/users/$uid` con discriminación de permisos según el atributo `role` (`"admin"`, `"owner"`, `"driver"`, `"passenger"`).
- **Flujo Reserva -> Confirmación**: Reparada la navegación desde la selección de asientos (`CreateReservationScreen`) hacia la confirmación de la reserva (`ConfirmReservationScreen`), transmitiendo dinámicamente el asiento seleccionado, origen, destino, horario, tarifa y datos del vehículo/conductor.
- **Autenticación con Google**: Implementado el servicio `GoogleLoginService` compatible con **Google One Tap** e `IntentSenderRequest` en Jetpack Compose, conectándolo con `LoginViewModel` y la autenticación de Firebase.
- **Google Sign-In en Portal Web**: Implementado el inicio de sesión emergente de Google en `Login.jsx` con auto-creación del perfil NoSQL en `/users/` y asignación de rol por defecto.
- **Módulo de Creación de Rutas e Itinerarios Web**: Implementados los modales `AddRouteModal.jsx` y `AddScheduleModal.jsx` en la sección "Rutas & Tarifas" del Portal Web para el Admin Root.
- **Persistencia de Sesión & Onboarding**: Unificado el almacenamiento local entre `SessionManager` y `SettingsRepositoryImpl` sobre `"rutago_prefs"`, solucionando la reaparición no deseada del tutorial y garantizando que la sesión de Firebase persista al reiniciar la app.
- **Navegación Robusta**: Implementada codificación `Uri.encode` en todas las rutas con parámetros dinámicos (`Destination.kt`) para evitar fallos por caracteres especiales o espacios.
- **Depuración de Recursos Layout XML**: Eliminados más de 40 archivos de diseño XML obsoletos en `res/layouts/` y deshabilitada la función `viewBinding` en `app/build.gradle` al estar la UI migrada en un 100% a Jetpack Compose.
- **Documentación**: Actualización de la guía de normalización (`DATABASE_NORMALIZATION.artifact.md`), diccionario de datos (`DICCIONARIO_DATOS.md`), reglas de seguridad (`FIREBASE_SECURITY_RULES.md`) y bitácora de refactorización (`REFACTOR_PROGRESS.md`).

## [2.0.0-ALPHA] - 2026-08-29 (Premium Refactor Phase 1)
*Inicio de la gran refactorización a Kotlin + Jetpack Compose para llevar la fluidez y mantenibilidad al estándar Silicon Valley.*

### 📱 Ruta-Go Mobile (Kotlin/Compose)
- **Migración de Lenguaje**: Preparación del ecosistema para soporte de Kotlin 1.9.
- **UI Declarativa**: Activación de Jetpack Compose en el módulo `app`.
- **Atomic Design Foundation**: Implementación del paquete `ui.theme` y creación de los primeros Átomos (`RutaGoButton`, `RutaGoTextField`).
- **Nueva Rama**: Apertura de la rama `feature/premium-refactor-compose` para desarrollo experimental.

## [1.9.13] - 2026-08-29 (Release Candidate - Full Parity)
*Esta versión finaliza la integración del Motor Espejo en la nube y prepara el despliegue oficial de la v1.6.0 en Android.*

### 📱 Ruta-Go Mobile (Android v1.6.0 - Final Build)
- **Generación de AAB**: Preparación de binarios para la Google Play Console bajo el nivel de API 36.
- **Validación de Notificaciones**: Sincronización final del `NotificationService` con los nuevos payloads de Cloud Functions.

### 🌐 Ruta-Go Web (Portal v1.2.0)
- **Versión de Producción**: Incremento a v1.2.0 con soporte nativo para notificaciones de chat y reservas.
- **Optimización de Hosting**: Configuración final para despliegue en Firebase Hosting.

### 🔧 Go-Core (Cloud Functions v2.2.0)
- **Motor Espejo (Mirror Engine)**: Implementación de la auto-reparación de llaves bilingües en tiempo real para garantizar paridad entre plataformas.
- **Identidad Visual Premium**: Unificación de iconos y colores corporativos en todas las notificaciones push.

## [1.9.12] - 2026-08-29 (FCM Cloud Automation & API 36 Release)
*Esta versión automatiza las notificaciones de chat mediante Cloud Functions, unifica el motor de mensajería y cumple con los estándares finales de Google para Android 16.*

### 📱 Ruta-Go Mobile (Android v1.6.0 - Release Oficial)
> ¡Ruta-Go v1.6.0: Sincronización Total! 🚀✨
>
> • 🚀 Soporte oficial Android 16 (API 36).
> • 🛠️ Fix Crítico: Corregido error en tiquetes web.
> • 👨‍✈️ Identidad: Nombre del conductor en horarios.
> • 🎨 Paridad 1:1 con el Portal Web.
> • 🎫 Reservas seguras con tecnología UUID.
> • 🏁 Rotación de turnos optimizada.
>
> ¡Conectando el Huila! 🚌💨🎯🏁

- **Cumplimiento API 36**: Actualización del SDK a Android 16 (Nivel 36) para cumplir con las políticas de Google Play.
- **Refactor de Chat**: Automatización 100% mediante Cloud Functions (v2.1.0).

### 🌐 Ruta-Go Web (Portal v1.1.8)
- **Configuración de Firebase**: Sincronización de API Keys con el nuevo ecosistema del proyecto.
- **Chat Notificable**: Los mensajes enviados desde la web ahora disparan notificaciones push automáticas a los celulares de los conductores/pasajeros.

### 🔧 Go-Core (Cloud Functions v2.1.0)
- **Trigger `onChatMessageCreated`**: Nueva función que monitorea el nodo de mensajes y orquestra el envío de notificaciones de chat en tiempo real.
- **Motor de Identidad de Chat**: Resolución inteligente de nombres (Emisor/Receptor) basada en el contexto de la reserva para notificaciones personalizadas.

## [1.9.10] - 2026-06-07 (UI Parity 1:1 & High-Fidelity Schedules)
*Esta versión alcanza la paridad visual absoluta entre Web y Mobile, optimizando la jerarquía de información y la experiencia de reserva en Android.*

### 📱 Ruta-Go Mobile (Android v1.5.3)
- **Resaltado de Próximo Viaje**: Implementación de borde naranja (`primary_500`) de 2dp y elevación de 8dp para destacar el turno vigente.
- **Estados de Horarios**: Aplicación de opacidad (0.5) y paleta de colores atenuada para turnos finalizados, mejorando el enfoque visual.
- **Rediseño de Badge "Siguiente"**: Migración a un formato de esquina flotante con bordes asimétricos, calcando el diseño premium del portal web.
- **Paridad UI (Conductores)**: Visualización del nombre del operador en las tarjetas de horarios y lógica de hidratación dinámica desde Firebase.

### 🌐 Ruta-Go Web (Portal v1.1.6)
- **Bloqueo Universal de Jornada**: Sincronización de la lógica de expiración para inhabilitar reservas en horarios pasados para todos los roles administrativos.

## [1.9.9.9] - 2026-06-06 (Centralized Driver Onboarding & Legacy Cleanup)
*Esta versión elimina definitivamente el auto-registro de conductores en Android, consolidando el flujo de afiliación administrativa exclusiva desde el Portal Web.*

### 📱 Ruta-Go Mobile (Android v1.5.2)
- **Deprecación de Registro Autónomo**: Eliminación completa de la interfaz y lógica de registro para conductores en la App.
- **Purgado de Deuda Técnica**: Borrado físico de `DriverRegistrationActivity`, `DriverRegistrationViewModel` y layouts asociados.
- **Login Optimizado**: Rediseño de la pantalla de inicio de sesión para un flujo de entrada más limpio.

### 🌐 Ruta-Go Web (Portal v1.1.6)
- **Hito de Paridad**: Consolidación como el único canal oficial para el alta de operadores en el ecosistema.

## [1.9.9.8] - 2026-06-05 (Read-Only Vehicle for Drivers & Profile Refactor)

## [1.9.9.7] - 2026-06-04 (Share Ticket Feature & Real-time Landing Fixes)

## [1.9.9.6] - 2026-06-03 (Android 16 API 36 Compliance & Fixed Driver Registration)

### 🔧 Go-Core (Backend & Logic)
- **Sincronización Transaccional**: Optimización de la lógica de servicios para garantizar la integridad de datos entre el portal y la App.

## [1.9.9.5] - 2026-07-24 (Fluid Navigation & Lead Magnet Integration)
*Esta versión erradica los glitches visuales durante la carga de módulos y lanza el primer "Lead Magnet" estratégico en la Landing Page para aumentar la conversión de pasajeros.*

### 📱 Ruta-Go Mobile (Android v1.4.0)
- **README Maestro High Fidelity**: Refactorización del archivo principal del proyecto con enlaces corregidos y visión estratégica actualizada.
- **Sincronización Total de Documentación**: Auditoría y actualización de más de 40 archivos MD en las carpetas Core, Mobile y Web.

### 🌐 Ruta-Go Web (Portal v1.0.0)
- **Lead Magnet de Horarios**: Nueva sección `LandingSchedules.jsx` en la página principal que muestra los despachos en tiempo real.
- **Estrategia de Conversión**: Botones de reserva que redirigen a usuarios no autenticados al flujo de registro.
- **Motor de Transiciones React 18**: Implementación del hook `useTransition` para gestionar cambios de estado pesados en la web.
- **Navegación Blindada**: Helpers `navigateTo` y `changeTab` para eliminando parpadeos y estados inconsistentes.

### Corregido
- **Eliminación definitiva de Glitches de Dashboard**: Sincronización con el `SplashScreen` para evitar mostrar Dashboards incorrectos durante la resolución de roles.

## [1.9.9.4] - 2026-07-24 (Accessibility AA & Image Format Optimization)
### Añadido
- **Accesibilidad Nivel AA (Segunda Intervención)**: Incremento de ratios de contraste y ampliación de objetivos táctiles (48px).
- **Optimización WebP**: Migración forzada a formato WebP para activos remotos.

## [1.9.9.3] - 2026-07-24 (Lighthouse Audit & Core Optimization)
### Añadido
- **Lighthouse Score > 90**: Implementación de `aria-label`, etiquetas semánticas `<main>` y redimensionamiento de imágenes hero.

## [1.9.9.2] - 2026-07-24 (Advanced Performance & Code Splitting)
### Añadido
- **React Lazy & Suspense**: Arquitectura de carga diferida para que la Landing Page vuele, descargando módulos administrativos bajo demanda.

## [1.9.9] - 2026-07-24 (Identity Resolution & SplashScreen Premium)
### Añadido
- **Molécula `SplashScreen.jsx`**: Experiencia de carga de alta fidelidad con animaciones orbitales y resolución de identidad blindada.

## [1.9.8] - 2026-07-24 (Driver UX Upgrade & Atomic Consistency)
### Añadido
- **Upgrade del Dashboard de Conductor**: Paridad 1:1 con la analítica de dueños usando el componente `RouteProgressCard.jsx`.

## [1.9.7] - 2026-07-24 (Rotation Algorithm Precision & Grouping Fix)
### Corregido
- **Sincronización de Horarios Especiales**: Refactorización de grupos lógicos para Turno 8 (Triple Especial) y Turno 9.

## [1.8.7] - 2026-07-24 (Critical Analytics Fix & Route Intelligence)
### Corregido
- **Fix de Ocupación Global**: Separación lógica de trayectos de ida y vuelta basada en el destino explícito en `useRealtimeData.js`.

## [1.8.3] - 2026-07-24 (Atomic Sidebar & Collapsible UX)
### Añadido
- **Sidebar Inteligente**: Secciones colapsables y auditoría global DRY en el 100% de la App de Gestión.

## [1.8.2] - 2026-07-24 (Explicit User Manuals & Atomic Help Center)
### Añadido
- **Manuales 360°**: Reescritura de guías para Pasajeros, Conductores y Socios con lenguaje humano y descriptivo.

## [1.8.1] - 2026-07-24 (Fix: Identidad MirrorHeader)
### Añadido
- **Badge de Estado**: Restauración de nombres y estatus ("Pasajero Activo") en la cabecera móvil.

## [1.8.0] - 2026-07-24 (Pricing Module Optimization & Atomic Refactor)
### Añadido
- **Molécula `PricingCard.jsx`**: Profesionalización de la gestión de tarifas con soporte para `FormatUtils`.

## [1.7.5] - 2026-07-24 (Management Architecture Unification & Directory Refactor)
### Añadido
- **Organismo `DirectoryHeader.jsx`**: Centralización de búsquedas y acciones en todos los directorios administrativos.

## [1.6.0] - 2026-07-24 (Full Web Parity & Atomic Architecture)
### Añadido
- **Tiquete Digital Mirror**: Implementación 1:1 de la interfaz de tiquete de Android para la web.
- **Sistema de Calificación (Rating)**: Motor de reputación espejo con sincronización automática de nodos.
- **Venta Asistida**: Los Dueños ahora pueden realizar reservas desde su Dashboard administrativo.

## [1.5.0] - 2026-07-22 (Ecosystem & Business Edition)
### Añadido
- **Soporte iPhone (PWA)**: Web App instalable con soporte para iconos nativos.
- **Identidad Única (SSO)**: Registro y Login unificado para todo el holding.

## [1.3.0] - 2026-07-13 (Android 15 Optimized Edition - Play Store Release)
### Añadido
- **Soporte Android 15 (SDK 35)**: Experiencia Edge-to-Edge y cumplimiento de políticas de Google Play.
- **Sprint de Documentación**: 10 manuales técnicos "Deep-Dive" y JavaDoc integral.

## [1.0.0] - 2025-05-01
- Lanzamiento inicial del ecosistema Ruta-Go.

---
**Chop Code Solutions - Evolucionando el transporte regional.**

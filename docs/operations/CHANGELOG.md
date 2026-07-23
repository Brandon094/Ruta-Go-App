# 📜 Historial de Cambios (Changelog) - Ruta-Go

Todos los cambios notables en este proyecto serán documentados en este archivo siguiendo el estándar [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [1.5.1] - 2026-07-23 (Web Refactor & UI Mirror Edition)
### Añadido
- **Auto-Scroll Inteligente**: La planilla web ahora se desplaza automáticamente hacia el próximo viaje disponible al cargar o cambiar de ruta, igualando la comodidad de la App móvil.
- **Sincronización de Capacidad Real**: Integración directa con el nodo `/vehiculos/` para mostrar la capacidad y asientos disponibles exactos de cada bus asignado.
- **Distribución Adaptativa Desktop**: Rediseño de la tarjeta de horarios para aprovechar el ancho de pantallas grandes, distribuyendo la información de forma horizontal sin perder la esencia móvil.
- **Flujo de Navegación Mejorado**: Botón de redirección al Dashboard desde el historial vacío para incentivar la primera reserva del pasajero.
- **Caja de Beneficios en Registro**: Nueva sección dinámica que explica las ventajas del perfil (Pasajero o Socio) seleccionado para guiar al usuario.
- **Centro de Ayuda Enriquecido**: Guía del pasajero expandida con descripciones detalladas sobre itinerarios, puntos de fidelidad y Web App en iPhone.

### Cambiado
- **Refactorización Atómica (DRY)**: Modularización total de `App.jsx` y creación de componentes atómicos (`Input`, `Badge`) para eliminar redundancia y facilitar el mantenimiento.
- **UI Mirror v1.5.1**: Actualización estética de la planilla web para ser un espejo fiel de Android, incluyendo el botón circular "+" y el sistema de badges de estado ("Finalizado", "Completado", "Disponible").
- **Optimización de Temas**: Eliminación de residuos visuales en el modo claro dentro de las secciones de Perfil e Historial, logrando una adaptabilidad del 100% a las preferencias del usuario.
- **Congelamiento de Acciones en Historial**: Botones de búsqueda y actualización deshabilitados visualmente para priorizar la visualización de datos en esta fase.

### Corregido
- **Blindaje de Componente Input**: Corrección de error crítico de renderizado de iconos (React objects as children) mediante un motor de renderizado seguro de átomos.
- **Lógica de Asientos (Fallback)**: Corregido error que mostraba 0 cupos cuando el campo de disponibilidad no existía en el horario; ahora usa la capacidad real del vehículo como base.
- **Inconsistencia de Fondos**: Corregidos contenedores con fondos oscuros "hardcoded" que afectaban la legibilidad en el Tema Claro.
- **Mapeo de Datos Dual**: Unificación de nomenclatura entre `puestoReservado` y `reservedSeat` en la lógica de visualización para asegurar consistencia total con la base de datos de la App móvil.

---

## [1.5.0] - 2026-07-22 (Ecosystem & Business Edition)
### Añadido
- **Soporte Universal iPhone (PWA)**: Implementación de Web App instalable para usuarios de Apple con soporte para iconos nativos y modo pantalla completa.
- **Identidad Única (SSO)**: Sistema de login y registro unificado para Pasajeros, Conductores y Socios desde un solo punto de entrada web.
- **Dashboard de Pasajeros Web**: Los usuarios de iPhone ahora pueden consultar horarios, estados de ocupación y su historial desde Safari.
- **Gestión de Conductores Web**: Los conductores ahora pueden gestionar sus turnos y realizar ventas físicas desde cualquier dispositivo móvil o PC con sincronización en tiempo real.
- **Motor de Reservas para Pasajeros**: Habilitada la selección de asientos y creación de reservas oficiales directamente desde la web (Especial para iPhone).
- **Clonación de UI (Mirroring)**: Rediseño total del portal web para replicar la estética Navy Deep y Naranja de la App de Android, incluyendo el soporte de **Tema Dual (Claro/Oscuro)** sincronizado con las preferencias del usuario.
- **Centro de Ayuda Contextual**: Implementada nueva sección de Ayuda en el Sidebar que muestra el manual de usuario adaptado al rol logueado (Pasajero, Conductor, Dueño o Admin).
- **Optimización de Contraste**: Refinamiento del tema claro con fondo `secondary-50` (#E1E8EB) para mejorar la profundidad visual y legibilidad en dispositivos móviles.
- **SEO & Visibilidad**: Integración de Sitemap, Robots y Meta-tags dinámicos para indexación en Google.

### Cambiado
- **Refactor de Roles**: El sistema ahora detecta automáticamente el rol (Admin/Owner/Driver/Passenger) tras el login y adapta la interfaz dinámicamente.
- **Estandarización Regional**: Corregida la ortografía de "Nátaga" en todos los metadatos y etiquetas de la plataforma.
- **Sincronización de Identidad**: El Dashboard de pasajeros ahora muestra el nombre real del usuario logueado.
- **Centro de Ayuda Contextual**: Implementada nueva sección de Ayuda en el Sidebar que muestra el manual de usuario adaptado al rol (Pasajero, Conductor, Dueño o Admin).
- **Consistencia Visual (UI Mirroring)**: Todas las nuevas vistas web (Ayuda, Planilla, Reservas) siguen el patrón estético Navy Deep y Naranja de la App nativa.

---

## [1.4.0] - 2026-07-16 (UI & Stability Master Edition)
### Añadido
- **Motor WindowUtils**: Nueva utilidad centralizada para la gestión de insets del sistema (Android 15 Ready).
- **Inmersión Total Edge-to-Edge**: Implementación de interfaz fluida en todas las pantallas de la suite.
- **Navegación Flotante Blindada**: Rediseño de la barra inferior con arquitectura de alturas fijas para evitar deformaciones en dispositivos con botones físicos.
- **Gestión Avanzada de Teclado (IME)**: El chat ahora desplaza automáticamente la interfaz y realiza scroll al abrir el teclado.

### Corregido
- **Contraste de Tiquetes**: Ajuste de paleta de colores en la TopBar del tiquete digital para mejor legibilidad.
- **Simetría de Interfaz**: Corregida la superposición de elementos con las barras de sistema en formularios de registro y edición de perfil.

---

## [1.3.0] - 2026-07-13 (Android 15 Optimized Edition - Play Store Release)
### Añadido
- **Soporte Android 15 (SDK 35)**: Cumplimiento total con las nuevas políticas de Google Play.
- **Experiencia Edge-to-Edge**: Implementación de pantalla de borde a borde para una interfaz moderna y fluida.
- **Alineación de 16 KB**: Soporte técnico para dispositivos de última generación.
- **Cumplimiento AD_ID**: Bloqueo explícito del ID de publicidad para máxima privacidad.
- **Sprint de Documentación Premium**:
    - JavaDoc completo en todas las capas (Models, ViewModels, Services, Engines, Managers, Utils, UI).
    - Creación de 10 manuales técnicos "Deep-Dive" de inmersión profunda.
    - Documentación de Reglas de Seguridad NoSQL y Gobernanza de Datos.
    - Guía de Integración FCM v1 y motor de Deep Linking.
    - Mapeo detallado de Flujos Lógicos (Bootstrap, Reservas, Rotación).
    - Manual de Gestión de Datos y Cumplimiento Legal (Habeas Data).

### Corregido
- **Deformación de Interfaz**: Implementado soporte integral *Edge-to-Edge* con gestión centralizada de insets vía `WindowUtils`. Corregidos problemas de superposición en TopBars y deformación en la barra de navegación inferior en dispositivos con botones físicos.
- **Pérdida de `conductorId`**: Corregida la colisión lógica en la Cloud Function `automatedRotation` mediante la implementación de un `Set` de asignaciones, evitando el borrado accidental de turnos válidos.
- **Fallo de Notificaciones en Release**: Implementadas reglas de ProGuard para proteger las librerías de Google Auth y OkHttp3, asegurando la funcionalidad C2C en AAB/APK firmados.
- **Error de Compilación Premium**: Implementado el método `getAdvancedStats` en `DriverReservationService` para corregir la colisión de símbolos en el historial del conductor.
- Error de autenticación Google Login (Error 10 [28444]) mediante forzado de WebClientID.
- Inconsistencias en el reset de asientos durante la rotación nocturna.
- Memory leaks potenciales mediante la limpieza de listeners en Managers y Adapters.

---

## [1.2.3] - 2026-05-24 (Stable Gold Master)
### Añadido
- **Tutorial Interactivo Hub**: Sistema de guías paso a paso centralizado para pasajeros y conductores.
- **Rescate de Cuenta**: Flujo de reactivación automática si el usuario intenta ingresar durante el periodo de gracia de borrado.
- **Borrado Automatizado (Gracia 30 días)**: Implementación de limpieza mensual programada (Domingos 3:00 AM) mediante Firebase Cloud Functions.
- **Símbolos de Depuración**: Inclusión de símbolos nativos para mejor análisis de crashes en Play Console.

### Cambiado
- **Arquitectura de Motores**: Desacoplamiento de lógica pesada en `Seat Engine` y `Reservation Engine`.
- **Refactor de Managers**: Reorganización jerárquica en `/core` (Sistema) y `/ui` (Interfaz).
- **Estandarización Técnica**: Unificación de nomenclatura en inglés para Adapters y carpetas del proyecto.
- **Seguridad de API**: Implementación de restricciones granulares para 9 APIs críticas de Google Cloud y Firebase.
- **Reactividad Total**: Refactorización de ViewModels para usar listeners permanentes en tiempo real.
- **Optimización de SDK**: Actualización a targetSdkVersion 35 (Android 15).

### Corregido
- Bloqueo de UI (Spinner infinito) durante la reactivación de cuentas en el Login.
- Error de validación de reglas de Firebase al intentar escribir tokens FCM en nodos cruzados.
- Sincronización de capacidad de asientos al registrar nuevos vehículos.

---

## [1.2.2] - 2026-05-24
### Cambiado
- Ajuste de targetSdkVersion a 35 para cumplimiento con políticas de Google Play.
- Incremento de versionCode para despliegue.

---

## [1.2.1] - 2026-05-23
### Añadido
- **Registro Autónomo de Conductores**: Los choferes ahora pueden registrarse, subir su vehículo y elegir horarios sin intervención administrativa.
- **Sanity Check**: Capa lógica para filtrar conductores inexistentes en la planilla de horarios.

### Corregido
- Error de "Shimmer Infinito" en el perfil de conductores.

---

## [1.2.0] - 2026-05-15
### Añadido
- **Segregación de Roles**: División física de los nodos `/usuarios/` y `/conductores/` en Firebase.
- **Login Inteligente**: Detección automática de rol tras autenticación con Google.

---

## [1.1.0] - 2026-03-10
### Añadido
- **Mapa de Asientos Interactivo**: Primera versión del motor de selección de puestos para pasajeros.
- **Venta Física**: Botón de bloqueo de asientos para conductores.
- **Tarifas Dinámicas**: Gestión de precios desde Firebase Realtime Database.

---

## [1.0.0] - 2025-05-01
### Añadido
- Lanzamiento inicial de la plataforma Ruta-Go.
- Consulta de horarios y trayectos básicos.
- Autenticación con correo y contraseña.

---
**Chop Code Solutions - Evolucionando el transporte regional.**

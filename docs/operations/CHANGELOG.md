# 📜 Historial de Cambios (Changelog) - Ruta-Go

Todos los cambios notables en este proyecto serán documentados en este archivo siguiendo el estándar [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [1.5.0] - 2026-07-22 (Ecosystem & Business Edition)
### Añadido
- **Ecosistema Web Portal**: Lanzamiento de la plataforma React para gestión empresarial y administrativa.
- **Landing Page Corporativa**: Interfaz pública responsiva con propuesta de valor y enlace directo a Play Store.
- **Dashboard de Dueños (Multi-inquilino)**: Implementado aislamiento de datos por `ownerId` para permitir que socios monitoreen solo sus activos.
- **Motor de Roles (RBAC)**: Nuevo sistema de permisos dinámicos (Admin Root vs. Socio) integrado en el Portal Web.
- **Módulos Legales Integrados**: Vistas dinámicas de Términos y Condiciones y Política de Privacidad (Habeas Data).
- **Activación Instantánea**: Flujo de registro automatizado para nuevos dueños de flota con escritura atómica en nodos maestros.

### Cambiado
- **Estandarización Regional**: Corregida la ortografía de "Nátaga" en toda la interfaz web, metadatos y documentos legales.
- **Seguridad NoSQL**: Actualizadas las reglas de Firebase para permitir búsqueda de operadores por Email conservando la privacidad de usuarios.

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
